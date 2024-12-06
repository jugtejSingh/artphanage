"use client"
import styles from "./cssfiles/login.module.css"
import Image from "next/image";
import {Barlow} from "next/font/google";
const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
import {submitted} from "@/app/login/serverActions";
import {useFormState} from "react-dom"
import {useRouter} from "next/navigation";


export default function Login(){
    const [state,formAction] = useFormState(submitted,null);
    const router = useRouter()
    return(
        <div>
            <div className={styles.main}>
                <Image src={"/back.svg"} width={38} height={30} className={styles.back} onClick={() => {
                    router.push("/")
                }}></Image>
                <div>
                    <form className={styles.form} action={formAction}>
                        <h2 className={`${styles.forOrphanages} ${barlow600.className}`}>For Orphanages Only</h2>
                        <h3 className={`${styles.loginTitle} ${barlow600.className}`}>Login</h3>
                        <input type="text" name="email" placeholder="Email"
                               className={`${styles.email}  ${barlow400.className}`}/>
                        <input type="password" name="password" placeholder="Password"
                               className={`${styles.password} ${barlow400.className}`}/>
                        <button type="submit" className={`${styles.submit}  ${barlow600.className}`}>Login</button>
                        <h4 className={`${styles.error} ${barlow400.className}`}>{state?.message}</h4>
                    </form>
                </div>
                <Image src={"/testing.jpg"} width={200} height={200} className={styles.image}/>
            </div>

        </div>
    );
}