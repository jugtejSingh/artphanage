"use client"

import Navbar from "@/app/homepage/Navbar";
import ItemPage from "@/app/shop/[slug]/ItemPage";
import {createContext, Suspense, useContext, useState} from "react";

export const CartAnimation = createContext(null)

export default function Page({params}) {
    const [isUpdated, setIsUpdated] = useState(false);
    return (
        <div>
            <CartAnimation.Provider value={{isUpdated, setIsUpdated}}>
                <Navbar/>
                <ItemPage params={params}/>
            </CartAnimation.Provider>
        </div>
    );
}