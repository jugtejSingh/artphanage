import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from "@/lib/databaseConnector"

const stripe = new Stripe(process.env.STRIPE_API_KEY);

export async function POST(request) {
    console.log("testing");
    const sig = request.headers.get('stripe-signature');
    const body = await request.text();

    let event;

    try {
        event = stripe.webhooks.constructEvent
        (body, sig, process.env.ENDPOINT_SECRET);
    } catch (err) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!');
            console.log(paymentIntent.metadata)
            let items = paymentIntent.metadata.items.split(",")
            prisma.order.create({
                data:{
                    email: paymentIntent.metadata.email,
                    name: paymentIntent.metadata.name,
                    phoneNumber: paymentIntent.metadata.phoneNumber,
                    address: paymentIntent.metadata.address,
                    country: paymentIntent.metadata.country,
                    city: paymentIntent.metadata.city,
                    state:paymentIntent.metadata.state,
                    pincode: paymentIntent.metadata.pincode

                }
            })
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ message: 'Entry Made Successfully' }, { status: 200 })
}