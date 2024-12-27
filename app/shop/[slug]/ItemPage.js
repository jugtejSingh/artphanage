"use client"

import Image from "next/image";
import styles from "./cssfiles/slug.module.css"
import {useEffect, useState} from 'react'
import {Barlow} from "next/font/google";
import {gettingData} from "@/app/shop/[slug]/serverAction";

const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow800 = Barlow({ weight: "800" ,subsets: ['latin'] })

export default function ItemPage({params}) {
    const [painting, setPaintings] = useState([]);
    const [biggerImage, setBiggerImage] = useState();
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching Data")
            const paintingData = await gettingData(params.slug)
            console.log("Fetched Data", paintingData);
            setPaintings(paintingData)
            setBiggerImage(await paintingData.imageName[0])
        }
        fetchData()
    }, [params.slug]);

    const handleImageClick = (image) => {
        setBiggerImage(image)
    };
    if (!painting || !painting.imageName || painting.imageName.length === 0) {
        // Render loading state or fallback UI if painting or imageName is undefined
        return <Image src={"/loading.gif"} width={80} height={80} alt={"Loading"} className={styles.loading}/>
    }
    return (
        <div>
            <div className={styles.flex}>
                <div className={styles.innerFlex}>
                    {painting.imageName.map((data,index)=> (
                    <Image src={data} alt={"Image"} width={90} height={130} key={index}
                     className={styles.sideImage} onClick={() => handleImageClick(data)}/>
                ))}
                </div>
                <div className={styles.mainImageFill}>
                <Image src={biggerImage} alt={"Image"} fill={true}
                       className={styles.mainImage}/>
                </div>
                <div className={styles.textSide}>

                    <h2 className={`${styles.artName} ${barlow600.className}`}>{painting.artName}</h2>
                    <h2 className={`${barlow400.className} ${styles.description}`}>{painting.description}</h2>

                    <div className={styles.flex3}>
                        <h2 className={`${barlow400.className} ${styles.price}`}>${painting.price}</h2>
                        <button className={styles.button}>Buy Now</button>
                    </div>

                    <h2 className={`${barlow400.className} ${styles.additionalInfo}`}>Additional Information</h2>
                    <div className={styles.flex2}>
                        <h2 className={`${barlow800.className} ${styles.dimensions}`}>Artist</h2>
                        <h2 className={`${barlow400.className} ${styles.dimensions2}`}>{painting.childName}</h2>
                    </div>
                    <div className={styles.flex2}>
                        <h2 className={`${barlow800.className} ${styles.dimensions}`}>Orphanage</h2>
                        <h2 className={`${barlow400.className} ${styles.dimensions2}`}>{painting.orphanage}</h2>
                    </div>
                    <div className={styles.flex2}>
                        <h2 className={`${barlow800.className} ${styles.dimensions}`}>Location</h2>
                        <h2 className={`${barlow400.className} ${styles.dimensions2}`}>{painting.location}</h2>
                    </div>
                    <div className={styles.flex2}>
                        <h2 className={`${barlow800.className} ${styles.dimensions}`}>Dimensions</h2>
                        <h2 className={`${barlow400.className} ${styles.dimensions2}`}>{painting.size}</h2>
                    </div>
                    <div className={styles.flex2}>
                        <h2 className={`${barlow800.className} ${styles.dimensions}`}>Frame</h2>
                        <h2 className={`${barlow400.className} ${styles.dimensions2}`}>{painting.frame}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
