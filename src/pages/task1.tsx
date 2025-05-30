import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Task1 = () => {
    const [likeCount, setLikeCount] = useState(0);
    const [unlikeCount, setUnlikeCount] = useState(0);
    const [isDark, setIsDark] = useState(false);

    const handleLike = () => setLikeCount(prev => prev + 1);
    const handleUnlike = () => setUnlikeCount(prev => prev + 1);
    const toggleTheme = (checked: boolean) => setIsDark(checked);

    return (
        <div
            className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black' } w-full h-screen transition-colors duration-300 py-10 px-6`}
        >
            <div className="flex justify-end items-center gap-2 mb-8">
                <Switch checked={isDark} onCheckedChange={toggleTheme} className='cursor-pointer'/>
            </div>

            <div className="flex flex-col justify-center items-center gap-5 h-[600px]">
                <h1 className="text-2xl font-semibold">Like and Unlike</h1>

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg ${isDark ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-600'
                            }`}
                    >
                        <ThumbsUp
                            size={20}
                            className={isDark ? 'text-blue-300 fill-blue-500' : 'text-blue-500 fill-blue-500'}
                        />
                        <span>{likeCount}</span>
                    </button>

                    <button
                        onClick={handleUnlike}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg ${isDark ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-500'
                            }`}
                    >
                        <ThumbsDown
                            size={20}
                            className={isDark ? 'text-red-300 fill-red-500' : 'text-red-500 fill-red-500'}
                        />
                        <span>{unlikeCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task1;
