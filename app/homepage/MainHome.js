'use client';
import styles from "./cssfiles/mainhome.module.css"
import Image from "next/image"
import {useEffect, useRef} from "react";
import {Barlow} from "next/font/google";

const barlow900 = Barlow({ weight: "700" ,subsets: ['latin'], display: 'swap' })

export default function Homepage() {
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref =    useRef(null);
    useEffect(() =>{
        //TEXT2
        const animationElement1 = text1Ref.current;
        animationElement1.addEventListener("animationend",()=> {
            animationElement1.style.borderWidth = "0px";
        });
        const animationElement2 = text2Ref.current;
        animationElement2.addEventListener("animationend",()=> {
            animationElement2.style.opacity = "1";
            animationElement2.style.borderWidth = "0px";
        });
        const animationElement3 = text3Ref.current;
        animationElement3.addEventListener("animationend",()=> {
            animationElement3.style.opacity = "1";
        });
    },[])

    return (
        <div>
            <div className={styles.imageAndText}>
            <div className={styles.left}>
                <div className={styles.marginRight}>
                <h3 ref={text1Ref} className={`${styles.text1} ${barlow900.className}`}>Art With A Purpose.</h3>
                </div>
                <div className={styles.marginRight2}>
                <h3 ref={text2Ref} className={`${styles.text2} ${barlow900.className}`}>Art That You Can Trust.</h3>
                </div>
                <div>
                <h3 ref={text3Ref} className={`${styles.text3} ${barlow900.className}`}>Art That Helps The Helpless.</h3>
                </div>
            </div>
                <Image src={"/image2.jpg"} width={700} height={400} className={styles.image} alt={"Image"}></Image>
            </div>
        </div>
    );
}