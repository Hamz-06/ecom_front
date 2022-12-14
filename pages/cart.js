import React from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
import Image from "next/image";
import { useState } from "react";
import { stripe } from "../util/stripe";
import { OrderPlaced } from "../Components/CartPage_Comp/cartPopUp";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { CreateItem } from "../Components/CartPage_Comp/createItemCard";


function Cart({ session }) {

    const [items, updateItems] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const getBag = JSON.parse(window.localStorage.getItem('BASKET'))
        getBag ? updateItems(getBag) : ''
    }, [])

    const calcCostOfAllItems = () => {
        var totalCost = 0
        items?.map((item) => {
            totalCost += (item.price * item.quantity)

        })
        totalCost
        return totalCost
    }
    const calcDelivery = () => {
        const totalDel = 0
        return totalDel
    }

    //update price 
    const updatePrice = (price) => {
        var updatedPrice = (price / 100).toFixed(2)
        updatedPrice = '£' + updatedPrice
        return updatedPrice
    }


    function checkOut() {
        setLoading(true)
        var updatedItems = items ? (items.map((item) => {
            return {
                price: item.priceID,
                quantity: item.quantity
            }
        })) : ''

        updatedItems = JSON.stringify(updatedItems)
        fetch('api/hello', {
            method: 'POST',
            body: updatedItems,
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setLoading(false)
                router.push(res.url)
            })
            .catch((err) => console.log(err))
    }

    const checkOutLoading = () => {
        return isLoading ?
            <div className="top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2">
                <div className="animate-spin w-[120px] h-[120px] rounded-full 
                border-8 border-background border-t-green-500">
                </div>
            </div> : ""
    }

    return (
        <>

            <Header />

            {checkOutLoading()}
            {
                session ? (<OrderPlaced
                    customerName={session.customer}
                    isPaid={session.payment_status}
                    customerEmail={session.customer_email}
                />) : ''
            }
            {/* only for mobile top */}
            {/* <div className="h-32 w-full bg-lime-300 md:hidden">
                Bag
            </div> */}

            <div className="flex flex-col h-[100vh] md:h-full bg-secondground md:flex-row">
                {/* left side with picture  */}
                <div className="w-[100%] max-h-[80vh] bg-background overflow-y-auto overflow-x-hidden md:w-[60%] md:max-h-[95vh] lg:pl-10 ">


                    {
                        items ? (
                            items.map((item, index) => {
                                return <CreateItem item={item} index={index} key={index} updateItems={updateItems} items={items} />
                            })) : ''
                    }
                </div>
                {/* right side with summary  */}
                <div className="w-[100%] h-max md:h-[95vh] bg-secondground md:w-[40%] p-8 border-l-2 md:border-black">
                    <div className="font-bold text-lg">
                        Summary
                    </div>
                    {/* subtotal div */}
                    <div className="flex mt-5">
                        <p>Subtotal</p>
                        <p className="ml-auto">
                            {
                                updatePrice(calcCostOfAllItems())
                            }
                        </p>
                    </div>
                    {/* delivery div  */}
                    <div className="flex mt-2">
                        <p>Estimated Delivery & Handling</p>
                        <p className="ml-auto">
                            {
                                calcDelivery()
                            }
                        </p>
                    </div>
                    {/* total cost div  */}
                    <div className="flex mt-2">
                        <p>Total</p>
                        <p className="ml-auto">{updatePrice(calcCostOfAllItems() + calcDelivery())}</p>
                    </div>

                    {/* <button onClick={() => checkOut()}>CHECK</button> */}

                    <hr className="border-black opacity-70 mt-5" />

                    <button className="mt-8 block bg-gray-300 hover:bg-gray-600 p-2 rounded-3xl ml-auto mr-auto" onClick={() => checkOut()}>Checkout</button>


                </div>
            </div>
        </>
    )
}



export async function getServerSideProps(context) {
    // console.log(context.query.session_id)
    //fetch session id
    const isSessionId = context.query.session_id
    //set session initially to null as it might not exist 
    var session = null
    //if there is a session coming from query url then run
    if (isSessionId) {
        //if session save it else make it null
        try {
            session = await stripe.checkout.sessions.retrieve(
                isSessionId
            );

        } catch (err) {
            session = null
        }
    }
    //return 
    return {
        props: {
            session: session
        }
    }
}

export default Cart