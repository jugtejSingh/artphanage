"use client"
import Navbar from "@/app/homepage/Navbar";
import styles from "@/app/adminDashboard/cssfiles/register.module.css";
import {useFormState} from "react-dom";
import {fetchingData, registered} from "@/app/adminDashboard/serverAction";
import {Barlow} from "next/font/google";
import {useEffect} from "react";

const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })

export default async function Page() {
    useEffect(() => {
        fetchingData()
    }, []);
    const [state,formAction] = useFormState(registered,null);
    return (
        <div>
            <Navbar />
            <form className={styles.form} action={formAction}>
                <h3 className={`${styles.registerTitle} ${barlow600.className}`}>Register</h3>
                <input type="text" name="name" placeholder="Name"
                       className={`${styles.name}  ${barlow400.className}`}/>
                <input type="text" name="email" placeholder="Email"
                       className={`${styles.email}  ${barlow400.className}`}/>
                <input type="password" name="password" placeholder="Password"
                       className={`${styles.password} ${barlow400.className}`}/>
                <button type="submit" className={`${styles.submit}  ${barlow600.className}`}>Register</button>
            </form>
        </div>
    );
}
