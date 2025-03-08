"use client"
import styles from "./cssfiles/login.module.css"
import Image from "next/image";
import {Barlow} from "next/font/google";
const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
import {submitted} from "@/app/login/serverActions";
import {useFormState} from "react-dom"
import {useRouter} from "next/navigation";
import {useActionState} from "react";


export default function Login(){
    const [state,formAction] = useActionState(submitted,null);
    const router = useRouter()
    return(
        <div>
            <div className={styles.main}>
                    <Image src={"/back.svg"} width={38} height={30} className={styles.back} onClick={() => {
                        router.push("/")
                    }} alt={"Back Button"}></Image>
                <form className={styles.form} action={formAction}>
                    <h2 className={`${styles.forOrphanages} ${barlow600.className}`}>For Orphanages Only</h2>
                    <h3 className={`${styles.loginTitle} ${barlow600.className}`}>Login</h3>
                    <div className={styles.emailAndPassword}>
                    <label htmlFor="email" className={barlow400.className}>Email</label>
                    <input type="text" name="email" placeholder="Email"
                           className={`${styles.email}  ${barlow400.className}`}/>
                    </div>
                    <div className={styles.emailAndPassword}>
                    <label htmlFor="password" className={`${styles.labelPassword} ${barlow400.className}`}>Password</label>
                    <input type="password" name="password" placeholder="Password"
                           className={`${styles.password} ${barlow400.className}`}/>
                    </div>
                    <button type="submit" className={`${styles.submit}  ${barlow600.className}`}>Login</button>
                    <h4 className={`${styles.error} ${barlow400.className}`}>{state?.message}</h4>
                </form>
            </div>
        </div>
    );
}