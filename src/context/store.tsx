import { createContext, useContext, useState, type ReactNode } from 'react';

type CartItem = {
    id: number;
    name: string;
    price: string;
    image: string;
    count: number;
};

type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: Omit<CartItem, 'count'>) => void;
    updateQuantity: (id: number, count: number) => void;
    removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: Omit<CartItem, 'count'>) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.id === item.id);
            if (existingItem) return prevItems;
            return [...prevItems, { ...item, count: 1 }];
        });
    };

    const updateQuantity = (id: number, count: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, count: count < 1 ? 1 : count } : item
            )
        );
    };

    const removeFromCart = (id: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
