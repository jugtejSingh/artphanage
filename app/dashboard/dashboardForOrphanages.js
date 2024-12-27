"use client"
import styles from "./cssfiles/dashboardForOrphanages.module.css"
import {Barlow} from "next/font/google";
import {useState} from "react";
import AddProducts from "@/app/dashboard/addProducts";
import SoldProducts from "@/app/dashboard/soldProducts";
import CurrentProducts from "@/app/dashboard/currentProducts";

const barlow300 = Barlow({ weight: "300" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow500 = Barlow({ weight: "500" ,subsets: ['latin'] })

export function DashboardForOrphanages() {
    const [component, setComponent] = useState("currentProducts")
        return (
            <div>
                <div className={styles.flex}>
                    <div className={styles.sideBar}>
                        <h3 className={`${styles.items} ${barlow300.className}`} onClick={() => {
                            setComponent("currentProducts")
                        }}>Current Products</h3>
                        <h3 className={`${styles.items} ${barlow300.className}`}  onClick={() => {
                            setComponent("addProducts")
                        }}>Add Products</h3>
                        <h3 className={`${styles.items} ${barlow300.className}`}    onClick={() => {
                            setComponent("soldProducts")
                        }}>Sold Products</h3>
                    </div>
                    {component === "currentProducts" && <CurrentProducts />}
                    {component === "addProducts" && <AddProducts />}
                    {component === "soldProducts" && <SoldProducts />}
                </div>
            </div>
        );
}