"use client"

import Image from "next/image";
import styles from "./cssfiles/slug.module.css"
import {useEffect, useState} from 'react'
import {Barlow} from "next/font/google";

const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow800 = Barlow({ weight: "800" ,subsets: ['latin'] })

export default function ItemPage({params}) {
    const [painting, setPaintings] = useState([]);
    const [biggerImage, setBiggerImage] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/shop/api/",
                {
                    method : "POST",
                    body : JSON.stringify({slug : params.slug})
                });
            let data = await response.json();
            setPaintings(data)
            setBiggerImage(data.imageName)
        }
        fetchData()},[])
    const handleImageClick = (image) => {
        setBiggerImage(image)
    };

    return (
        <div>
            {painting !== undefined ?
            <div className={styles.flex}>
                <div className={styles.innerFlex}>
                    <div>
                        <Image src={"/images/" + painting.imageName3} alt={"Image"} width={150} height={200}
                               className={styles.sideImage} onClick={() => handleImageClick(painting.imageName3)}/>
                        <Image src={"/images/" + painting.imageName4} alt={"Image"} width={150} height={200}
                               className={styles.sideImage} onClick={() => handleImageClick(painting.imageName4)}/>
                    </div>
                    <div className={styles.images}>
                        <Image src={"/images/" + painting.imageName} alt={"Image"} width={150} height={200}
                               className={styles.sideImage} onClick={() => handleImageClick(painting.imageName)}/>
                        <Image src={"/images/" + painting.imageName2} alt={"Image"} width={150} height={200}
                               className={styles.sideImage} onClick={() => handleImageClick(painting.imageName2)}/>
                    </div>
                </div>
                <Image src={`/images/${biggerImage}`} alt={"Image"} width={350} height={500}
                       className={styles.mainImage}/>

                <div className={styles.textSide}>

                    <h2 className={`${styles.artName} ${barlow600.className}`}>{painting.artName}</h2>
                    <h2 className={`${barlow400.className} ${styles.description}`}>{painting.description} HELLO HELLO
                        HELLO HELLO HELLO HELLO</h2>

                    <div className={styles.flex3}>
                        <h2 className={`${barlow400.className} ${styles.price}`}>${painting.price}</h2>
                        <button className={styles.button}>Buy Now</button>
                    </div>

                    <h2 className={`${barlow400.className} ${styles.additionalInfo}`}>Additional Information</h2>

                    <div className={styles.flex2}>
                        <h2 className={`${barlow800.className} ${styles.dimensions}`}>Dimensions</h2>
                        <h2 className={`${barlow400.className} ${styles.dimensions2}`}>10x20x100inches</h2>
                    </div>
                    <div className={styles.flex2}>
                        <h2 className={`${barlow800.className} ${styles.dimensions}`}>Frame</h2>
                        <h2 className={`${barlow400.className} ${styles.dimensions2}`}>Comes with a Frame</h2>
                    </div>
                </div>
            </div>
                : null}
        </div>
    );
}
