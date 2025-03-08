import {useEffect,useState} from "react";
import {useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import styles from "./cssfiles/checkout.module.css"

export default function CheckoutForm(params) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage,setErrorMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState()

        useEffect(() => {
            if (params.clientSecret) {
                setClientSecret(params.clientSecret.clientSecret);
                setErrorMessage("");  // Clear errors when clientSecret is set
            } else {
                setErrorMessage("There has been an error");
            }
        }, [params.clientSecret]);

        const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        if (!stripe || !elements) {
            return;
        }
        const {submitError} = await elements.submit()
        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }
        const returnUrl = typeof window !== "undefined" ? `${window.location.origin}/paymentCompleted` : "";
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: returnUrl
            },
        })
        if (error) {
            setErrorMessage(error.message)
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit} className={styles.checkoutForm}>
                {clientSecret && <PaymentElement />}
                {errorMessage}
                <button disabled={!stripe || loading} className={styles.button}>
                    {!loading ? `Pay $${params.amount}`: "Processing..."}
                </button>
            </form>

        </div>
    );
}
