"use client"
import Navbar from "@/app/homepage/Navbar";
import stylesright from "@/app/checkout/cssfiles/rightside.module.css"
import stylesleft from "@/app/checkout/cssfiles/leftside.module.css"
import {useEffect, useState} from "react";
import Image from 'next/image';
import {Barlow} from "next/font/google";
import Link from "next/link";
import styles from "@/app/shop/[slug]/cssfiles/slug.module.css";
import {useFormState} from "react-dom";
import {checkout} from "@/app/checkout/serverAction";
const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow800 = Barlow({ weight: "800" ,subsets: ['latin'] })

export default function Checkout({params}){
    return(
    <div>
    <Navbar />
        <div style={{display :"flex",flexDirection:"row", flexBasis: "100px"}}>
            <LeftSide />
            <RightSide />
        </div>
    </div>
    );
}
function LeftSide(){
    const [state,formAction] = useFormState(checkout,null)
return(
    <div className={stylesleft.mainFlex}>
        <form action={formAction}>
            <div className={stylesleft.flexForSides}>
                <div className={stylesleft.sides}>
                    <div className={stylesleft.flexForItem}>
                        <label htmlFor="firstName" className={barlow400.className}>First Name</label>
                        <input type="text" name="firstName" className={styles.firstName}/></div>

                    <div className={stylesleft.flexForItem}>
                        <label htmlFor="lastName" className={barlow400.className}>Last Name</label>
                        <input type="text" name="lastName" className={styles.lastName}/></div>
                </div>
                <div className={stylesleft.sides}>
                    <div className={stylesleft.flexForItem}>
                        <label htmlFor="email" className={barlow400.className}>Email</label>
                        <input type="text" name="email" className={styles.email}/></div>

                    <div className={stylesleft.flexForItem}>
                        <label htmlFor="phoneNumber" className={barlow400.className}>Phone Number with Country
                            Code</label>
                        <div className={stylesleft.phoneNumberWithCode}>
                            <input type="text" name="phoneNumber" className={styles.countryCode}/>
                            <input type="text" name="phoneNumber" className={styles.phoneNumber}/></div>
                    </div>
                </div>
            </div>
            <div className={stylesleft.border}></div>
            <div className={stylesleft.flexForSides}>
                <div className={stylesleft.flexForItem}>
                    <div>
                    <label htmlFor="address1" className={barlow400.className}>Address 1</label>
                    <input type="text" name="address1" className={styles.address1}/></div>
                <div className={stylesleft.flexForItem}>
                    <label htmlFor="address2" className={barlow400.className}>Address 2</label>
                    <input type="text" name="address2" className={styles.address2}/></div>
                <div className={stylesleft.flexForItem}>
                    <label htmlFor="address3" className={barlow400.className}>Address 3</label>
                    <input type="text" name="address3" className={styles.address3}/></div></div>
            <div>
                <div className={stylesleft.flexForItem}>
                    <label htmlFor="state" className={barlow400.className}>State/Province/District/Parish</label>
                    <input type="text" name="state" className={styles.state}/></div>
                <div className={stylesleft.flexForItem}>
                    <label htmlFor="country" className={barlow400.className}>Country</label>
                    <input type="text" name="country" className={styles.country}/></div>
                <div className={stylesleft.flexForItem}>
                    <label htmlFor="pincode" className={barlow400.className}>Pincode</label>
                    <input type="text" name="pincode" className={styles.pincode}/></div></div></div>

        </form>

    </div>
);
}

function RightSide() {
    const [cartItems, setCartItems] = useState([])
    useEffect(() => {
        const getInfo = async () => {
            const cart = await JSON.parse(localStorage.getItem("cart")) || []
            setCartItems(cart)
        }
        getInfo()
    }, [])

    function removeButton(data) {
        const storage = JSON.parse(localStorage.getItem("cart"))
        let newArray = []
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].slug !== data.slug) {
                newArray.push(storage[i])
            }

        }
        localStorage.setItem("cart", JSON.stringify(newArray))
        setCartItems(newArray)
    }

    if (cartItems === undefined || cartItems.length === 0) {
        // Render loading state or fallback UI if painting or imageName is undefined
        return (
            <div className={stylesright.mainFlex}>
                <h3 className={stylesright.mainFlex}>The cart is empty</h3>
            </div>
        );
    }
    else
        {
        return (
            <div className={stylesright.mainFlex}>
                {cartItems.map((data, index) => (
                    <div className={stylesright.flexForItem} key={index}>
                        <Link href={`/shop/${data.slug}`}><Image src={data.imageName[0]} width={1000} height={1000}
                                                                 alt={"ImageOfProduct"}
                                                                 className={stylesright.image}></Image></Link>
                        <div className={stylesright.priceAndName}>
                            <Link href={`/shop/${data.slug}`}><h3 className={barlow400.className}>{data.artName}</h3>
                            </Link>
                            <Link href={`/shop/${data.slug}`}><h3 className={barlow400.className}>${data.price}</h3>
                            </Link>
                            <button className={`${barlow400.className} ${stylesright.remove}`}
                                    onClick={(e) => removeButton(data)}>Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}