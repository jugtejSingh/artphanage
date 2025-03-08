"use client"
import Navbar from "@/app/homepage/Navbar";
import styles from "./cssfiles/pages.module.css"
import {useEffect, useRef, useState} from "react";
import Image from 'next/image';
import {Barlow} from "next/font/google";
import Link from "next/link";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "@/app/checkout/checkoutForm";
import {checkoutFormForOrders, checkoutFormServerAction} from "@/app/checkout/serverAction";
import TrashCan from "@/app/extra/trashCan";


const barlow600 = Barlow({ weight: "600" ,subsets: ['latin'] })
const barlow400 = Barlow({ weight: "400" ,subsets: ['latin'] })
const barlow800 = Barlow({ weight: "800" ,subsets: ['latin'] })

export default function Checkout() {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHED_STRIPE_KEY);
    const [cartItems, setCartItems] = useState([])
    const [total,setTotal] = useState(0)
    const personalInfoRef = useRef(null);
    const innerPersonalInfoRef = useRef(null);
    const addressRef = useRef(null);
    const addressInnerRef = useRef(null);
    const [errorMessageForPersonalInformation,setErrorMessageForPersonalInformation] = useState("")
    const [errorMessageForAddressInformation,setErrorMessageForAddressInformation] = useState("")
    const [clientSecret,setClientSecret] = useState("")
    const [userInformation,setUserInformation] = useState({
        name : "",
        email : "",
        phoneNumber: "",
        address : "",
        city : "",
        state: "",
        country: "",
        pincode: "",
    })
    useEffect(() => {
        const getInfo = async () => {
            const cart = await JSON.parse(localStorage.getItem("cart")) || []
            setCartItems(cart)
            let value = 0
            for(let i = 0; i < cart.length; i++){
                value = value + parseInt(cart[i].price)
            }
            value = value + 15
            setTotal(value);
        }
        getInfo()
    }, [])
    useEffect(() => {
        const secret = async () => {
            if (userInformation.pincode !== "") {
                setClientSecret(await checkoutFormServerAction(convertToSubCurrency(total), userInformation,cartItems))
            }
        }
        secret()
    }, [userInformation, cartItems]);
    function removeButton(data) {
        const storage = JSON.parse(localStorage.getItem("cart"))
        let newArray = []
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].slug !== data.slug) {
                newArray.push(storage[i])
            }
        }
        setCartItems(newArray)
        localStorage.setItem("cart", JSON.stringify(newArray))
        }
    function personalInformationNext() {
        personalInfoRef.current.style.transition = "1s ease-out";
        personalInfoRef.current.style.minHeight = "10vh";

        innerPersonalInfoRef.current.style.opacity = "0";
        innerPersonalInfoRef.current.style.transition = "opacity 0.3s ease-out";

        addressRef.current.style.transition = "1s ease-out";

        addressInnerRef.current.style.display = "block";
        addressInnerRef.current.style.opacity = "1";
        addressInnerRef.current.style.transition = "opacity 2s ease-out";
        setTimeout( () => {
            innerPersonalInfoRef.current.style.display = "none";
        },400);

    }
    function addressNextClicked() {
        addressRef.current.style.transition = "1s ease-out";
        addressRef.current.style.height = "10vh";

        addressInnerRef.current.style.opacity = "0";
        addressInnerRef.current.style.transition = "opacity 0.3s ease-out";
        setTimeout( () => {
            addressInnerRef.current.style.display = "none";
        },400);
    }
    function convertToSubCurrency(amount,factor = 100){
        return Math.round(amount*factor);
    }
    function nameInformation(event){
        event.preventDefault();
        const formData = new FormData(event.target)
        const firstName = formData.get("firstName")
        const lastName = formData.get("lastName")
        const email = formData.get("email")
        const phoneCode =  formData.get("phoneCode")
        const phoneNumber = formData.get("phoneNumber")

        if (firstName === ""){
        setErrorMessageForPersonalInformation("The First Name is empty")
            return null
        }
        if (lastName === ""){
            setErrorMessageForPersonalInformation("The Last Name is empty")
            return null
        }
        if (email === ""){
            setErrorMessageForPersonalInformation("The Email is empty")
            return null
        }
        if (phoneCode === ""){
            setErrorMessageForPersonalInformation("The Phone Code is empty")
            return null
        }
        if (phoneNumber === ""){
            setErrorMessageForPersonalInformation("The Phone Number is empty")
            return null
        }
        setUserInformation((userInformation) => ({
            ...userInformation,
            name : `${firstName} ${lastName}`,
            email: email,
            phoneNumber: `+${phoneCode}${phoneNumber}`,
        }));
        personalInformationNext()
    }
    function addressInformation(event){
        event.preventDefault();
        const formData = new FormData(event.target)
        const address = formData.get("address1")
        const address2 = formData.get("address2")
        const city = formData.get("city")
        const state = formData.get("state")
        const country = formData.get("country")
        const pincode = formData.get("pincode")
        if (address === ""){
            setErrorMessageForAddressInformation("The Address is empty")
            return null
        }
        if (city === ""){
            setErrorMessageForAddressInformation("The City is empty")
            return null
        }
        if (state === ""){
            setErrorMessageForAddressInformation("The State/County/Parish is empty")
            return null
        }
        if (country === ""){
            setErrorMessageForAddressInformation("The Country is empty")
            return null
        }
        if (pincode === ""){
            setErrorMessageForAddressInformation("The Pincode is empty")
            return null
        }
        setUserInformation((userInformation) => ({
            ...userInformation,
            address : `${address} ${address2}`,
            city: city,
            state: state,
            country: state,
            pincode: state,
        }));
        addressNextClicked()
    }
    console.log(cartItems)
    if (cartItems === undefined || cartItems.length === 0) {
        return (
            <div>
            <Navbar />
            <div className={styles.noItemFlex}>
                <Image src={"/shopping-cart.png"} alt={"img"} width={200} height={200} unoptimized={true}
                       className={styles.cartImage} priority={true}/>
                <h2 className={barlow400.className}>Your Cart is Empty</h2>
            </div>
            </div>
        );
    } else {
        return (
            <div>
                <Navbar/>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <div className={styles.mainDiv}>
                        <div className={styles.myBag}>
                            <h3 className={`${styles.myBagText} ${barlow400.className}`}>Your Cart is Empty</h3>
                        </div>
                        {/*Cart Bit*/}
                        <div className={styles.cart}>
                            {cartItems.map((data, index) => (
                                <div className={styles.flexForItem} key={index}>
                                    <Link href={`/shop/${data.slug}`}><Image src={data.imageName[0]} width={1000}
                                                                             height={1000}
                                                                             alt={"ImageOfProduct"}
                                                                             className={styles.image}></Image></Link>
                                    <div>
                                        <h3 className={`${barlow400.className} ${styles.artName}`}>{data.artName}</h3>
                                        <div className={styles.flexRow}>
                                            <div className={styles.trashCan} onClick={() => removeButton(data)}>
                                                <TrashCan></TrashCan>
                                            </div>
                                            <h3 className={`${barlow400.className} ${styles.price}`}>${data.price}</h3>
                                        </div>
                                    </div>
                                    <div className={styles.totalRemover}>
                                    </div>
                                </div>))}
                        </div>
                        <div className={styles.sideDivMobile}>
                            <div className={styles.sideDivInner}>
                                <h3 className={`${barlow400.className} ${styles.totalPriceBreakdown}`}>Total Price
                                    Breakdown</h3>
                                <h3 className={barlow400.className}>Your items: {total - 15}</h3>
                                <h3 className={barlow400.className}>Standard Delivery Fee : $15</h3>
                                <h3 className={barlow400.className}>Your Total Bill is: {total}</h3>
                            </div>
                        </div>
                        {/*Personal Infomration Bit*/}
                        <div className={styles.address1} ref={personalInfoRef}>
                            <h3 className={`${barlow400.className} ${styles.personalInformation}`}>Personal
                                Information</h3>
                            <form onSubmit={nameInformation} ref={innerPersonalInfoRef}>
                                <div className={styles.flexRow}>
                                    <div className={styles.flexColumn}>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="firstName">First Name</label>
                                        <input type="text" className={styles.inputName} name="firstName"></input>
                                    </div>
                                    <div className={styles.flexColumn}>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="lastName">Last Name</label>
                                        <input type="text" className={styles.inputName} name="lastName"></input>
                                    </div>
                                </div>
                                <div className={styles.flexRow}>
                                    <div className={styles.flexColumn}>
                                        <label className={`${styles.labelForInput} ${barlow400.className}`}
                                               htmlFor="email">Email</label>
                                        <input type="text" className={styles.inputName} name="email"></input>
                                    </div>
                                    <div className={styles.flexColumn}>
                                        <label className={`${styles.labelForInput} ${barlow400.className}`}
                                               htmlFor="phoneNumber">Phone Number</label>
                                        <div>
                                            <label className={styles.plus} htmlFor="phoneNumber">+</label>
                                            <input type="text" className={styles.phoneCode} name="phoneCode"></input>
                                            <input type="text" className={styles.phoneNumber}
                                                   name="phoneNumber"></input>
                                        </div>
                                    </div>
                                </div>
                                <h3 className={`${styles.errorMessage} ${barlow400.className}`}>{errorMessageForPersonalInformation !== "" ? errorMessageForPersonalInformation : null}</h3>
                                <button type="submit" className={styles.next}>Next</button>
                            </form>
                        </div>
                        {/*Address Bit*/}
                        <div className={styles.address2} ref={addressRef}>
                            <h3 className={`${barlow400.className} ${styles.addressTitle}`}>Address</h3>
                            <form className={styles.innerAddress2} onSubmit={addressInformation} ref={addressInnerRef}>
                                <div className={styles.flexRow}>
                                    <div className={styles.flexColumn}>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="address1">Address 1</label>
                                        <input type="text" className={styles.inputName} name="address1"></input>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="address2">Address 2</label>
                                        <input type="text" className={styles.inputName} name="address2"></input>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="state">State/County/Parish</label>
                                        <input type="text" className={styles.inputName} name="state"></input>
                                    </div>
                                    <div className={styles.flexColumn}>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="city">City</label>
                                        <input type="text" className={styles.inputName} name="city"></input>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="country">Country</label>
                                        <input type="text" className={styles.inputName} name="country"></input>
                                        <label className={`${styles.labelForInput}  ${barlow400.className}`}
                                               htmlFor="pincode">Pin code/ ZIP code</label>
                                        <input type="text" className={styles.inputName} name="pincode"></input>
                                    </div>
                                </div>
                                <h3 className={`${barlow400.className} ${styles.errorMessage}`}>{errorMessageForAddressInformation !== "" ? errorMessageForAddressInformation : ""}</h3>
                                <button type="submit" className={styles.next}>Next</button>
                            </form>
                        </div>
                        {/*Payment Bit*/}
                        <div className={styles.paymentSection}>
                            <h3 className={`${barlow400.className} ${styles.paymentSectionTitle}`}>Payment</h3>
                            <div>
                                {/*THE FORM*/}
                                {<Elements
                                    stripe={stripePromise}
                                    options={{
                                        mode: "payment",
                                        amount: convertToSubCurrency(total),
                                        currency: "usd",
                                    }}>
                                    <CheckoutForm clientSecret={clientSecret} amount={total}/>
                                </Elements>}
                            </div>
                        </div>
                    </div>
                    {/*Side Div Code*/}
                    <div className={styles.sideDiv}>
                        <div className={styles.sideDivInner}>
                            <h3 className={`${barlow400.className} ${styles.totalPriceBreakdown}`}>Total Price
                                Breakdown</h3>
                            <h3 className={barlow400.className}>Your items: {total - 15}</h3>
                            <h3 className={barlow400.className}>Standard Delivery Fee : $15</h3>
                            <h3 className={barlow400.className}>Your Total Bill is: {total}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}