import { createContext, useContext, useState, type ReactNode } from 'react';

type CartContextType = {
    cartIds: number[];
    addToCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartIds, setCartIds] = useState<number[]>([]);

    const addToCart = (id: number) => {
        console.log(cartIds);
        setCartIds(prev => (prev.includes(id) ? prev : [...prev, id]));
    };


    return (
        <CartContext.Provider value={{ cartIds, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
