import React from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
import Image from "next/image";
import { useState } from "react";
import { TrashIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import { stripe } from "../util/shopify";
import { OrderPlaced } from "../Components/CartPage_Comp/CartPage_popUp";
import { useRouter } from "next/router";
import { fetchBagQuantity, quantityHandler, removeItemHandler } from "../util/cartProducts";
import { useDispatch } from "react-redux";
import { setValueCart } from "../redux/slice/numOfCart";

function Cart({ session }) {

    const [items, updateItems] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    // console.log(session)
    useEffect(() => {
        const getBag = JSON.parse(window.localStorage.getItem('BASKET'))
        getBag ? updateItems(getBag) : ''
    }, [])

    const calcCost = () => {
        var totalCost = 0
        items?.map((item) => {
            totalCost += (item.price * item.quantity)

        })
        totalCost /= 100
        return totalCost
    }
    const calcDelivery = () => {
        const totalDel = 0
        return totalDel
    }

    //create item func
    const CreateItem = ({ item, index }) => {
        const [quantity, updQuantity] = useState(item.quantity)
        const options = []
        //create 10 quantity options
        for (let i = 0; i < 10; i++) {
            options.push(i + 1)
        }

        //i
        const updateQuantityHandler = (e) => {
            quantityHandler(e, updQuantity, items, index)
            const cartQuantity = fetchBagQuantity()
            dispatch(setValueCart(cartQuantity))
        }
        //item handler 
        const removeItem = () => {
            removeItemHandler(items, updateItems, index)
            const cartQuantity = fetchBagQuantity()
            dispatch(setValueCart(cartQuantity))
        }

        return (
            <div className="bg-red-700 p-2 m-2 flex" >
                <div className="w-32 h-32 bg-emerald-700">

                </div>

                <div className="flex-grow">
                    <div className="flex">
                        <p className="">{item.productName}</p>
                        <p className="ml-auto">{(item.price * item.quantity) / 100}</p>
                    </div>
                    <div className="flex items-center" >
                        Quantity
                        <select className="bg-transparent" value={quantity} onChange={updateQuantityHandler}>
                            {
                                options.map((optionLoop, index) => {

                                    return <option key={index} value={optionLoop}>{optionLoop}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <TrashIcon className="h-6 w-6" onClick={() => removeItem()} />
                        <ArrowSmLeftIcon className="h-6 w-6" onClick={() => console.log(index)} />
                    </div>
                </div>
            </div>
        )

    }



    function checkOut() {
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
                router.push(res.url)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Header />
            {
                session ? (<OrderPlaced
                    customerName={session.customer}
                    isPaid={session.payment_status}
                    customerEmail={session.customer_email}
                />) : ''
            }

            <div className="h-32 w-full bg-lime-300 md:hidden">
                Bag
            </div>
            <div className="flex flex-col md:flex-row">


                <div className="w-[100%] max-h-[80vh] bg-yellow-500 overflow-y-auto overflow-x-hidden md:w-[60%] md:max-h-[95vh] lg:pl-10 ">

                    {
                        items ? (
                            items.map((item, index) => {
                                return <CreateItem item={item} index={index} key={index} />
                            })) : ''
                    }

                </div>

                <div className="w-[100%] h-[95vh] bg-red-300 md:w-[40%] p-8">
                    <div>
                        Summary
                    </div>
                    <div className="flex">
                        <p>Subtotal</p>
                        <p className="ml-auto">
                            {
                                calcCost()
                            }
                        </p>
                    </div>
                    <div className="flex">
                        <p>Estimated Delivery & Handling</p>
                        <p className="ml-auto">
                            {
                                calcDelivery()
                            }
                        </p>
                    </div>
                    <div className="flex">
                        <p>Total</p>
                        <p className="ml-auto">{calcCost() + calcDelivery()}</p>
                    </div>

                    {/* <button onClick={() => checkOut()}>CHECK</button> */}

                    <form action="/api/hello" method="POST" >
                        {/* <input type="hidden" name='lineItems' value={checkOut()} /> */}
                        {/* hide checkout button if there are no items  */}
                        {/* <button type="submit" role='link' hidden={items.length === 0}>
                            Checkout
                        </button> */}
                    </form>

                    <button onClick={() => checkOut()}>lol</button>

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