"use client"
import styles from "./cssfiles/cards.module.css"
import Image from 'next/image'
import Link from "next/link";
import {Barlow} from "next/font/google";

const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'], display: 'swap' })

export default function Cards({painting}){
    console.log(painting)
    return(

        <div className={styles.outerFlex}>
            {painting.map(function(data,index){
                console.log(data.imageName[0])
                return(
                    <div>
                        <div key={data.id} className={`${styles.innerFlex} ${index > 3? styles.noTopBorder : ""} ${index = 0 || index % 4 === 0 ? styles.noLeftSide : ""}`}>
                            <Link href={`/shop/${data.slug}`}><div className={styles.images}>
                                    <Image src={data.imageName[0]} width={300} height={400} alt={data.artName} className={`${styles.innerImage}`}/>
                                </div></Link>
                                <Link href={`/shop/${data.slug}`} className={styles.removeUnderline}><h3 className={`${barlow400.className} ${styles.artName}`}>{data.artName}</h3></Link>
                                <Link href={`/shop/${data.slug}`} className={styles.removeUnderline}><div className={styles.buttonAndPrice}>
                                    <h3 className={`${barlow400.className} ${styles.price}`}>{"$" + data.price}</h3>
                                    <button className={styles.button}>Buy Now</button>
                        </div></Link>
                    </div>


                        <div>
                            <div key={data.id}
                                 className={`${styles.innerFlexMobile}`}>
                                <Link href={`/shop/${data.slug}`}><div className={styles.imagesMobile}>
                                    <Image src={data.imageName[0]} width={300} height={400} alt={data.artName} className={`${styles.innerImageMobile}`}/>
                                </div></Link>
                                <div className={styles.mobileDiv}>
                                    <Link href={`/shop/${data.slug}`} className={styles.artNameMobile}><h3 className={`${barlow400.className} ${styles.artNameMobile}`}>{data.artName}</h3></Link>
                                    <Link href={`/shop/${data.slug}`} className={styles.priceMobile}><h3 className={`${barlow400.className} ${styles.priceMobile}`}>{"$" + data.price}</h3></Link>
                                </div>
                            </div>

                        </div>
                    </div>

                );
            })
            }
        </div>
    );
}