"use client";

import Navbar from "@/app/homepage/Navbar";
import ItemPage from "@/app/shop/[slug]/ItemPage";
import { CartProvider } from "@/app/shop/[slug]/CartContext"; // Import the provider

export default function Page({ params }) {
    return (
        <CartProvider>
            <Navbar />
            <ItemPage params={params} />
        </CartProvider>
    );
}