"use client"
import styles from "./cssfiles/navbar.module.css"
import Link from "next/link";
import {Barlow} from "next/font/google";
import {useEffect, useRef, useState} from "react";
import Image from "next/image"

const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'], display: 'swap' })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'], display: 'swap' })
const barlow200 = Barlow({ weight: "200" ,subsets: ['latin'], display: 'swap' })
const barlow300 = Barlow({ weight: "300" ,subsets: ['latin'], display: 'swap' })

export default function Navbar() {
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);

    const sidenavRef = useRef(null);
    const menuIconRef = useRef(null);

    // Toggle sidenav visibility
    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the clicked target is outside the sidenav and menu icon
            if (sidenavRef.current && !sidenavRef.current.contains(event.target) && !menuIconRef.current.contains(event.target)) {
                setIsSidenavOpen(false); // Close the sidenav
            }
        };

        // Add event listener for clicks on the entire document
        document.addEventListener("click", handleClickOutside);

        // Cleanup event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

         return (
             <div>
                 <div className={styles.flexNav}>
                     <Link href="/" className={`${styles.home} ${barlow600.className}`}>HOME</Link>
                     <Link href="/shop" className={`${styles.shop} ${barlow600.className}`}>SHOP</Link>
                     <Link href="/blog" className={`${styles.blog} ${barlow600.className}`}>BLOG</Link>
                     <Link href="/"><img src={"/Logo.png"} width={250} className={styles.image}
                                         alt={"Image"}></img></Link>
                     <div style={{marginLeft : "20vw"}}>
                     <Link href="/checkout"><Image src={"/shopping-cart.png"} width={30} height={30} alt={"ShoppingCart"} className={styles.cart}></Image></Link>
                     <Link href={"/login"} className={`${styles.login} ${barlow200.className}`}>Login</Link></div>
                 </div>
                 <div className={styles.sidenav} style={{width: isSidenavOpen ? '20vw' : '0'}} ref={sidenavRef}>
                     <Link href={"/"} className={styles.loginText}><h3 className={barlow400.className}>Home</h3></Link>
                     <Link href={"/shop"} className={styles.loginText}><h3 className={barlow400.className}>Shop</h3></Link>
                     <Link href={"/blog"} className={styles.loginText}><h3 className={barlow400.className}>Blog</h3></Link>
                     <div className={styles.border}></div>
                     <Link href={"/login"} className={styles.loginText}><h3 className={barlow400.className}>Login</h3></Link>
                     <Link href={"/"} className={styles.loginText}><h3 className={barlow400.className}>Work With Us</h3></Link>
                 </div>
                 <div className={styles.flexNavMobile}>
                     <img src={"/menu.png"} width={50} className={styles.menuMobile} ref={menuIconRef} alt={"menu"} onClick={(e) => {
                         toggleSidenav()
                     }}></img>
                     <Link href="/"><img src={"/Logo.png"} width={250} className={styles.imageMobile}
                                         alt={"logo"}></img></Link>
                 </div>
             </div>
         );
}