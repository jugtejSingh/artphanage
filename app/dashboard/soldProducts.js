import styles from "@/app/dashboard/cssfiles/dashboardForOrphanages.module.css";
import {Barlow} from "next/font/google";

const barlow300 = Barlow({ weight: "300" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow500 = Barlow({ weight: "500" ,subsets: ['latin'] })
export default function SoldProducts() {
    return (
        <div>
            <h2 className={`${styles.currentProductsTitle} ${barlow500.className}`}>Sold Products</h2>
        </div>
    );
}