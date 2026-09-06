// frontend/src/pages/Checkout.jsx

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useParams } from "react-router-dom";


function CheckoutPage() {

    const { orderId } = useParams();


    const cardRef = useRef(null);


    const [tracker, setTracker] =
        useState(null);

    const [authToken, setAuthToken] =
        useState(null);

    const [paymentId, setPaymentId] =
        useState(null);

    const [cardReady, setCardReady] =
        useState(false);

    const [error, setError] =
        useState(null);


    /*
    |--------------------------------------------------------------------------
    | CREATE PAYMENT SESSION
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const createSession = async () => {

            try {

                console.log(
                    "Creating SafePay payment session..."
                );


                const response =
                    await fetch(
                        `${import.meta.env.VITE_HOST}/api/payments/create-session`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    "Bearer " +
                                    localStorage.getItem(
                                        "token"
                                    ),
                            },

                            body: JSON.stringify({
                                orderId,
                            }),
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "SafePay session response:",
                    data
                );


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to create payment session"
                    );
                }


                if (!data.trackerToken) {

                    throw new Error(
                        "SafePay tracker token missing"
                    );
                }


                if (!data.authToken) {

                    throw new Error(
                        "SafePay authentication token missing"
                    );
                }


                setTracker(
                    data.trackerToken
                );

                setAuthToken(
                    data.authToken
                );

                setPaymentId(
                    data.paymentId
                );

            } catch (error) {

                console.error(
                    "Checkout setup error:",
                    error
                );

                setError(
                    error.message
                );
            }
        };


        createSession();

    }, [orderId]);


    /*
    |--------------------------------------------------------------------------
    | CONFIGURE SAFE PAY CARD ATOM
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            !tracker ||
            !authToken ||
            !cardRef.current
        ) {
            return;
        }


        const cardAtom =
            cardRef.current;


        console.log(
            "Configuring SafePay Card Atom..."
        );


        Object.assign(
            cardAtom,
            {

                environment:
                    "sandbox",

                tracker:
                    tracker,

                authToken:
                    authToken,

                validationEvent:
                    "submit",


                onReady: () => {

                    console.log(
                        "SafePay Card Atom READY"
                    );

                    setCardReady(true);
                },


                onError: (error) => {

                    console.error(
                        "SafePay Card Error:",
                        error
                    );

                    setError(
                        "SafePay card form failed to load."
                    );
                },


                onValidated: (data) => {

                    console.log(
                        "Card validated:",
                        data
                    );
                },


                onProceedToAuthentication:
                    (data) => {

                        console.log(
                            "Proceed to payer authentication:",
                            data
                        );

                        /*
                         * Payer authentication can be
                         * implemented here after the
                         * card has been successfully
                         * validated/captured.
                         */
                    },
            }
        );


    }, [
        tracker,
        authToken,
    ]);


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (
        !tracker ||
        !authToken
    ) {

        return (
            <div
                style={{
                    padding: "40px",
                }}
            >

                <h2>
                    Loading checkout...
                </h2>


                {error && (
                    <p
                        style={{
                            color: "red",
                        }}
                    >
                        {error}
                    </p>
                )}

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | PAYMENT PAGE
    |--------------------------------------------------------------------------
    */

    return (

        <div
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "24px",
            }}
        >

            <h2>
                Card Payment
            </h2>


            <p>
                Payment ID:{" "}
                {paymentId}
            </p>


            {error && (

                <div
                    style={{
                        marginBottom: "20px",
                        padding: "12px",
                        color: "red",
                        border:
                            "1px solid red",
                    }}
                >
                    {error}
                </div>
            )}


            <div
                style={{
                    width: "100%",
                    minHeight: "80px",
                    marginTop: "20px",
                }}
            >

                <safepay-card-atom
                    ref={cardRef}
                />

            </div>


            {!cardReady && (

                <p>
                    Loading secure card form...
                </p>
            )}


            {cardReady && (

                <p
                    style={{
                        marginTop: "15px",
                    }}
                >
                    Secure card form is ready.
                </p>
            )}

        </div>
    );
}


export default CheckoutPage;