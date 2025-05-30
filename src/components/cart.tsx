import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/store';
import { productsData } from '@/lib/products';

const ViewCart = () => {
    const [open, setOpen] = useState(false);
    const { cartIds } = useCart();

    // Track quantities of items
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const handleQuantity = (id: number, type: 'inc' | 'dec') => {
        setQuantities((prev) => {
            const currentQty = prev[id] || 1;
            const newQty = type === 'inc' ? currentQty + 1 : Math.max(1, currentQty - 1);
            return { ...prev, [id]: newQty };
        });
    };



    const handleBuy = () => {
        alert('Purchase successful!'); // replace with actual logic
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <ShoppingCart />
                </Button>
            </DialogTrigger>

            <DialogContent
                className=" p-0 w-[90%] sm:w-[400px] max-w-full min-h-[300px] h-fit m-0 rounded-md flex flex-col shadow-lg border"
            >
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                </div>

                <div className="p-4 flex-1 overflow-y-auto space-y-4">
                    {cartIds.length === 0 ? (
                        <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
                    ) : (
                        productsData.map((item) =>
                            cartIds.includes(item.id) ? (
                                <div key={item.id} className="flex items-center gap-4 border-b pb-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex gap-3 justify-between w-full">
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-600">{item.price}</p>
                                        </div>
                                        <div className="flex gap-2 items-center h-fit">
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => handleQuantity(item.id, 'dec')}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span>{quantities[item.id] || 1}</span>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                onClick={() => handleQuantity(item.id, 'inc')}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        )
                    )}
                </div>

                {cartIds.length > 0 && (
                    <div className="px-4 py-3 border-t flex flex-col gap-2">
                        <div className="flex justify-between items-center text-lg font-medium">
                            <span>Total:</span>
                            <span>450</span>
                        </div>
                        <Button className="w-full" onClick={handleBuy}>
                            Buy Now
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ViewCart;
