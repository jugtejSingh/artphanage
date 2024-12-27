import styles from "./cssfiles/navbar.module.css"
import Link from "next/link";
import {Barlow} from "next/font/google";

const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'], display: 'swap' })
const barlow200 = Barlow({ weight: "200" ,subsets: ['latin'], display: 'swap' })

export default async function Navbar() {
         return (
             <div>
                 <div className={styles.flexNav}>
                    <Link href="/shop" className={`${styles.shop} ${barlow600.className}`}>SHOP</Link>
                    <Link href="/blog" className={`${styles.blog} ${barlow600.className}`}>BLOG</Link>
                     <Link href="/"><img src={"/Logo.png"} width={250} className={styles.image} alt={"Image"}></img></Link>
                    <Link href={"/login"} className={`${styles.login} ${barlow200.className}`}>Login</Link>
                     <Link href={"/login"} className={`${styles.workWithUs} ${barlow200.className}`}>Work With Us</Link>
                 </div>
             </div>
        );
 }