"use client"
import styles from "./cssfiles/whatarewe.module.css";
import Image from "next/image"
import {Barlow} from "next/font/google";

const barlow700 = Barlow({ weight: "700" ,subsets: ['latin'], display: 'swap' })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'], display: 'swap' })

export default function WhatAreWe(){
    return(
      <div>
        <h1 className={`${styles.title} ${barlow700.className}`}>What are we?</h1>
          <div className={styles.flex}>
              <div className={styles.imageDiv}>
              <Image src={"/image2.jpg"} width={500} height={350} className={styles.image} alt={"Image"}></Image>
              </div>
              <div className={styles.mainTextDiv}>
                  <p className={`${styles.mainText} ${barlow400.className}`}>Artphanage empowers orphanages to sell any creative
                  work made by the children to the world. Each orphanage is verified by us to ensure the work is genuine and
                  majority of proceeds are directly given to the orphanage</p>
              </div>
          </div>
      </div>
    );
}