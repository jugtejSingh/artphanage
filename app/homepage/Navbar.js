"use client"
import styles from "./cssfiles/navbar.module.css"
import Link from "next/link";
import {Barlow} from "next/font/google";
import {useContext, useEffect, useRef, useState} from "react";
import Image from "next/image"
import {CartAnimation} from "@/app/shop/[slug]/page";

const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'], display: 'swap' })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'], display: 'swap' })
const barlow200 = Barlow({ weight: "200" ,subsets: ['latin'], display: 'swap' })
const barlow300 = Barlow({ weight: "300" ,subsets: ['latin'], display: 'swap' })

export default function Navbar() {
    const {isUpdated} = useContext(CartAnimation)
    const [isSidenavOpen, setIsSidenavOpen] = useState(false);
    const sidenavRef = useRef(null);
    const menuIconRef = useRef(null);
    const cartRef = useRef(null);

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
    useEffect(() => {
        if (isUpdated){
            cartRef.current.style.display ="none"
        }
    }, [isUpdated]);

         return (
             <div>
                 <div className={styles.flexNav}>
                     <Link href="/" className={`${styles.home} ${barlow600.className}`}>HOME</Link>
                     <Link href="/shop" className={`${styles.shop} ${barlow600.className}`}>SHOP</Link>
                     <Link href="/blog" className={`${styles.blog} ${barlow600.className}`}>BLOG</Link>
                     <img src={"/Logo.png"} width={250} className={styles.image} alt={"Image"}></img>
                     <div className={styles.flexInner}>
                         <Link href="/checkout"><Image src={"/shopping-cart.png"} width={300} height={300}
                                                       alt={"ShoppingCart"} className={styles.cart}
                                                       ref={cartRef}></Image></Link>
                         <Link href={"/login"} className={` ${styles.login} ${barlow200.className}`}>Login</Link>
                     </div>
                 </div>
                 <div className={styles.sidenav} style={{width: isSidenavOpen ? '35vw' : '0'}} ref={sidenavRef}>
                     <Link href={"/"} className={ `${styles.homeMobile} ${barlow400.className}`}>Home</Link>
                     <Link href={"/shop"} className={ `${styles.shopMobile} ${barlow400.className}`}>Shop</Link>
                     <Link href={"/blog"} className={ `${styles.blogMobile} ${barlow400.className}`}>Blog</Link>
                     <div className={styles.border}></div>
                     <Link href={"/login"} className={`${styles.loginMobile} ${barlow400.className}`}>Login</Link>
                 </div>
                 <div className={styles.flexNavMobile}>
                     <img src={"/menu.png"} width={50} className={styles.menuMobile} ref={menuIconRef}
                          alt={"menu"} onClick={(e) => {
                         toggleSidenav()
                     }}></img>
                     <img src={"/Logo.png"} width={250} className={styles.imageMobile} alt={"logo"}></img>
                     <Link href="/checkout"><Image src={"/shopping-cart.png"} width={300} height={300}
                                                   alt={"ShoppingCart"} className={styles.cartMobile}></Image></Link>
                 </div>
             </div>
         );
}