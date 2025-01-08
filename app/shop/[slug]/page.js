"use client"

import Navbar from "@/app/homepage/Navbar";
import ItemPage from "@/app/shop/[slug]/ItemPage";
import {Suspense} from "react";

export default function Page({params}) {
    return (
        <div>
            <Navbar />
            <ItemPage params={params} />
        </div>
    );
}
