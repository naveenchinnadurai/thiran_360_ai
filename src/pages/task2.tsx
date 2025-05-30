import React, { useState } from 'react';

const Task2: React.FC = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => setIsDark(prev => !prev);

    return (
        <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} w-full min-h-screen p-6 transition-colors duration-300`}>
            <div className="flex justify-end mb-6">
                <button
                    onClick={toggleTheme}
                    className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 text-black"
                >
                    Toggle Theme
                </button>
            </div>

            <h1 className="text-2xl font-bold">Theme Toggle (Page Scoped)</h1>
            <p className="mt-4">
                This theme toggle only affects this page and doesn't use Tailwind's dark mode config.
            </p>
        </div>
    );
};

export default Task2;
