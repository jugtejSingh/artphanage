"use client"

import Image from "next/image";
import styles from "./cssfiles/slug.module.css"
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {Barlow} from "next/font/google";
import {gettingData} from "@/app/shop/[slug]/serverAction";
import {CartAnimation} from "@/app/shop/[slug]/CartContext";

const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow800 = Barlow({ weight: "800" ,subsets: ['latin'] })

export default function ItemPage({params}) {
    const { setIsUpdated } = useContext(CartAnimation);
    const [painting, setPainting] = useState([]);
    const [biggerImage, setBiggerImage] = useState();
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isImageClicked, setIsImageClicked] = useState(false);
    const [changeBuyButton, setChangeBuyButton] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            const paintingData = await gettingData(await params.slug)
            if (paintingData)
            setPainting(paintingData)
            setBiggerImage(await paintingData.imageName[0])
        }
        fetchData()
    }, []);

    useEffect(() => {
        const checkData = async () => {
            const storage = localStorage.getItem("cart")
            for (let i = 0; i < storage.length; i++){
                if (storage[i].slug === painting.slug){
                    setChangeBuyButton(true)
                    break
                }
            }
        }
        checkData()
    }, []);


    const handleImageClick = (image) => {
        setBiggerImage(image)
    };
    if (!painting || !painting.imageName || painting.imageName.length === 0) {
        // Render loading state or fallback UI if painting or imageName is undefined
        return <Image src={"/loading.gif"} width={1000} height={1000} alt={"Loading"} className={styles.loading}/>
    }
    const handleTouchStart = (e) => {
        const touchStartPosition = e.touches[0].clientX; // Get the x position of the first touch
        setTouchStart(touchStartPosition);
    };
    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 20) {
            // Swiped left
            goToNextImage();
        }

        if (touchEnd - touchStart > 20) {
            // Swiped right
            goToPreviousImage();
        }
    };
    const handleTouchMove = (e) => {
        const touchEndPosition = e.touches[0].clientX; // Get the current x position of the touch
        setTouchEnd(touchEndPosition);
    };
    function goToNextImage (){
        for (let i = 0; i < painting.imageName.length; i++) {
            if (biggerImage === painting.imageName[i]){
                if (i === painting.imageName.length-1){
                setBiggerImage(painting.imageName[0])}
                else{
                    setBiggerImage(painting.imageName[i+1])
                }
            }
        }
    }
    function goToPreviousImage (){
        for (let i = 0; i < painting.imageName.length; i++) {
            if (biggerImage === painting.imageName[i]){
                if (i === 0){
                    setBiggerImage(painting.imageName[painting.imageName.length-1])}
                else{
                    setBiggerImage(painting.imageName[i-1])
                }
            }
        }
    }
    function buttonClicked(painting) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(painting)
        let jsonString = JSON.stringify(cart);
        localStorage.setItem('cart', jsonString);
        setIsUpdated(true)
        setChangeBuyButton(true)
        }

    return (
        <div>
            <div className={styles.flex}>
                <div className={styles.innerFlex}>
                    {painting.imageName.map((data, index) => (
                        <Image src={data} alt={"Image"} width={1000} height={1000} key={index}
                               className={styles.sideImage} onClick={() => handleImageClick(data)}/>
                    ))}
                </div>
                <div className={styles.mainImageFill}>
                    <Image src={biggerImage} alt={"Image"} fill={true}
                           className={`${styles.mainImage} ${isImageClicked ? styles.imageAnimation : ''}`}/>
                </div>
                <div className={styles.textSide}>

                    <h2 className={`${styles.artName} ${barlow600.className}`}>{painting.artName}</h2>
                    <h2 className={`${barlow400.className} ${styles.description}`}>{painting.description}</h2>

                    <div className={styles.flex3}>
                        <h2 className={`${barlow400.className} ${styles.price}`}>${painting.price}</h2>
                        {changeBuyButton ? <button className={styles.button}>Cant Buy</button>:
                            <button className={styles.button} onClick={(e) =>
                            buttonClicked(painting)}>Buy Now</button>}
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

            {/*////////////////////MOBILE CODE*/}

            <div className={styles.flexMobile}>
                <h2 className={`${styles.artName} ${barlow600.className}`}>{painting.artName}</h2>
                <div className={styles.mainImageFill}>
                    <Image src={biggerImage} alt={"Image"} fill={true} className={styles.mainImage}
                           onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchMove={handleTouchMove}/>
                </div>
                <div className={styles.dots}>
                    {painting.imageName.map((data, index) => (
                        <Image src={"/halfdot.png"} alt={"Image"} width={15} height={15} key={index}
                               className={styles.dots}/>
                    ))}
                </div>
                <div className={styles.textSide}>
                    <h2 className={`${barlow400.className} ${styles.description}`}>{painting.description}</h2>

                    <div className={styles.flex3}>
                        <h2 className={`${barlow400.className} ${styles.price}`}>${painting.price}</h2>
                        <button className={styles.button} onClick={(e) => buttonClicked(painting)}>Buy Now</button>
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
