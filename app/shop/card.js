"use client"
import styles from "./cssfiles/cards.module.css"
import Image from 'next/image'
import {redirect} from "next/navigation";
import Link from "next/link";
import {useEffect} from "react";

export default function Cards({painting}){
    console.log(painting)
    return(

        <div className={styles.outerFlex}>
            {painting.map(function(data,index){
                return(
                    <div key={data.id} className={`${styles.innerFlex} ${index > 3? styles.noTopBorder : ""} ${index = 0 || index % 4 === 0 ? styles.noLeftSide : ""}`}>
                        <div className={styles.images}>
                        <Image src={data.imageName[0]} width={300} height={400} alt={data.artName} className={styles.innerImage}/>
                        </div>
                        <h3 className={styles.artName}>{data.artName}</h3>
                        <div className={styles.buttonAndPrice}>
                            <h3 className={styles.price}>{data.price}</h3>
                            <Link href={`/shop/${data.slug}`}><button className={styles.button}>Buy Now</button></Link>
                        </div>
                    </div>
                );})
            }
        </div>
    );
}