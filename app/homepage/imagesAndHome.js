import Image from "next/image"
import styles from "./cssfiles/imagesAndHome.module.css"
import {Barlow} from "next/font/google";

const barlow700 = Barlow({ weight: "700" ,subsets: ['latin'], display: 'swap' })
const barlow500 = Barlow({ weight: "500" ,subsets: ['latin'], display: 'swap' })

export default function ImagesAndHome() {
    return (
        <div className={styles.highestContainer}>
            <div className={styles.flex2}>
                <Image src={"/home/1.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image1}></Image>
                <div className={styles.spacingwidth}></div>
                <Image src={"/home/2.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image2}></Image>
                <div className={styles.spacingwidth}></div>
                <Image src={"/home/7.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image7}></Image>
                <div className={styles.spacingwidth}></div>
                <Image src={"/home/9.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image9}></Image>
                <div className={styles.spacingwidth}></div>
                <Image src={"/home/8.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image8}></Image>
                <div className={styles.spacingwidth}></div>
                <Image src={"/home/10.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image10}></Image>
                {/*<Image src={"/home/3.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image3}></Image>*/}
            </div>
            <div className={styles.titleDiv}>
            <h1 className={`${barlow700.className} ${styles.title}`}>Artphanage</h1>
                <h3 className={`${barlow500.className} ${styles.heading}`}>Empower the next-generation with us</h3>
            </div>
            <div className={styles.spacingheight}></div>
            <div className={styles.flex}>

                <Image src={"/home/4.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image4}></Image>
                <div className={styles.spacingwidth}></div>
                <Image src={"/home/5.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image5}></Image>
                <div className={styles.spacingwidth}></div>
                <Image src={"/home/11.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image11}></Image>
                <Image src={"/home/6.jpg"} width={2000} height={2000} alt={"1.jpg"} className={styles.image6}></Image>

            </div>
        </div>
    );
}
