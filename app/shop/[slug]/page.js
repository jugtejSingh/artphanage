"use client"

import Navbar from "@/app/homepage/Navbar";
import ItemPage from "@/app/shop/[slug]/ItemPage";
import {Suspense} from "react";

export default function Page({params}) {
    return (
        <div>
            <Navbar />
            <Suspense fallback={<h2>Loading...........</h2>}>
            <ItemPage params={params} />
            </Suspense>
        </div>
    );
}
