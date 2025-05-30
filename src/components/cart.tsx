import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/store';

const ViewCart = () => {
    const [open, setOpen] = useState(false);
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const [total, setTotal] = useState(0);

    const handleQuantity = (id: number, type: 'inc' | 'dec') => {
    const item = cartItems.find(item => item.id === id);
    if (!item) return;

    if (type === 'dec' && item.count === 1) {
        removeFromCart(id);
    } else {
        const newCount = type === 'inc' ? item.count + 1 : item.count - 1;
        updateQuantity(id, newCount);
    }
};

    const handleBuy = () => {
        alert('Purchase successful!'); 
    };

    useEffect(() => {   
        let totalAmount = 0;
        cartItems.forEach(item => {
            const price = item.price.replace(/[^0-9.-]+/g, ''); 
            totalAmount += parseFloat(price) * item.count;
        });
        totalAmount = Math.round(totalAmount * 100) / 100; 
        if (isNaN(totalAmount)) totalAmount = 0; 
        if (totalAmount < 0) totalAmount = 0; 
        if (totalAmount === Infinity) totalAmount = 0;
        if (totalAmount < 0) totalAmount = 0;      

        setTotal(totalAmount);
    }
    , [cartItems]);



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <ShoppingCart />
                </Button>
            </DialogTrigger>

            <DialogContent className="p-0 w-[90%] sm:w-[400px] max-w-full min-h-[300px] h-fit m-0 rounded-md flex flex-col shadow-lg border">
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <h2 className="text-lg font-semibold">Your Cart</h2>
                </div>

                <div className="p-4 flex-1 overflow-y-auto space-y-4">
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
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
                                        <span>{item.count}</span>
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
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="px-4 py-3 border-t flex flex-col gap-2">
                        <div className="flex justify-between items-center text-lg font-medium">
                            <span>Total:</span>
                            <span>₹{total.toFixed(2)}</span>
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
