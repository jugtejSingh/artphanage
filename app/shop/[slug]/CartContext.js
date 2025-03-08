"use client";
import { createContext, useState } from "react";

export const CartAnimation = createContext(null);

export const CartProvider = ({ children }) => {
    const [isUpdated, setIsUpdated] = useState(false);

    return (
        <CartAnimation.Provider value={{ isUpdated, setIsUpdated }}>
            {children}
        </CartAnimation.Provider>
    );
};