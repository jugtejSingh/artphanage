"use client"
import styles from "@/app/dashboard/cssfiles/currentProducts.module.css"
import {Barlow} from "next/font/google";
import {useEffect, useState} from "react";
import {gettingData} from "@/app/dashboard/serverActions";
const barlow300 = Barlow({ weight: "300" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow500 = Barlow({ weight: "500" ,subsets: ['latin'] })
export default function CurrentProducts(){
    const [paintings,setPaintings] = useState([])
    useEffect(() => {
        const fetchData = async () => {
        const painting = await gettingData()
        setPaintings(painting);
        console.log(painting)
    }
    fetchData()
        }
    ,[])
    return(
        <div>
            <h2 className={`${styles.currentProductsTitle} ${barlow500.className}`}>Current Products</h2>
            <div className={styles.currentProductsDiv}>
                {paintings.map((data,index) => {
                    {data.id}
                    }
                )}
            </div>
        </div>
    );
}