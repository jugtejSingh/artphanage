"use server";
import Stripe from 'stripe';
import {randomUUID} from "crypto";

const stripe = new Stripe(`${process.env.STRIPE_API_KEY}`);

export async function checkoutFormServerAction(amount, userInformation,items) {
    try {
        let itemsStringify = ""
        for (let i = 0; i < items.length; i++){
            if (i === 0){
                itemsStringify = items[i].id
            }
            else{
                itemsStringify = itemsStringify + "," + items[i].id
            }
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata:{
                id : randomUUID(),
                name : userInformation.name,
                email : userInformation.email,
                phoneNumber : userInformation.phoneNumber,
                address : userInformation.address,
                city : userInformation.city,
                state : userInformation.state,
                country : userInformation.country,
                pincode : userInformation.pincode,
                items : itemsStringify
            }
        });
        return {clientSecret :paymentIntent.client_secret}; // Return only the clientSecret string
    } catch (error) {
        return {error: error}
    }
}
export async function checkoutFormForOrders(userInformation){
    console.log(userInformation)
}