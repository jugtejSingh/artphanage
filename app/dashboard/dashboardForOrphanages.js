"use client"
import styles from "./cssfiles/dashboardForOrphanages.module.css"
import {Barlow} from "next/font/google";
import {useState} from "react";
const barlow300 = Barlow({ weight: "300" ,subsets: ['latin'] })
const barlow500 = Barlow({ weight: "500" ,subsets: ['latin'] })


export function DashboardForOrphanages() {
    const [component, setComponent] = useState(currentProducts)
        return (
            <div>
                <div className={styles.flex}>
                    <div className={styles.sideBar}>
                        <h3 className={`${styles.items} ${barlow300.className}`} onClick={() => {
                            setComponent(currentProducts)
                        }}>Current Products</h3>
                        <h3 className={`${styles.items} ${barlow300.className}`}  onClick={() => {
                            setComponent(addProducts)
                        }}>Add Products</h3>
                        <h3 className={`${styles.items} ${barlow300.className}`}    onClick={() => {
                            setComponent(soldProducts)
                        }}>Sold Products</h3>
                    </div>
                    <h2>{component}</h2>
                </div>
            </div>
        );
}

function currentProducts(){
    return(
        <div>
            <h2 className={`${styles.currentProductsTitle} ${barlow500.className}`}>Current Products</h2>
        </div>
    );
}
function addProducts(){
    return(
        <div >
            <h2 className={`${styles.currentProductsTitle} ${barlow500.className}`}>Add Products</h2>
        </div>
    );
}
function soldProducts(){
    return(
        <div>
            <h2 className={`${styles.currentProductsTitle} ${barlow500.className}`}>Sold Products</h2>
        </div>
    );
}