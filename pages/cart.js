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
import { useDispatch, useSelector } from "react-redux";
import { setValueCart } from "../redux/slice/numOfCart";
import { HeartIcon } from "@heroicons/react/solid";
import { decrementFav, incrementFav } from "../redux/slice/numOfFav";
import { addToFav, fetchFav, removeFromFav } from "../util/favProducts";
import { useCallback } from "react";
import { useMemo } from "react";

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

    //create item func
    const CreateItem = ({ item, index }) => {
        const [quantity, updQuantity] = useState(item.quantity)
        const [isLike, setLike] = useState(false)
        const options = []
        //create 10 quantity options
        for (let i = 0; i < 10; i++) {
            options.push(i + 1)
        }

        useEffect(() => {
            const favourites = fetchFav()
            favourites?.map((fav) => {
                fav.productID === item.productID ? setLike(true) : ''
            })

        }, [])
        //update quantity for item 
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
        //add to fav func
        const addToFavourite = () => {
            setLike(!isLike)
            const prod = {
                productName: item.productName,
                price: item.price,
                productID: item.productID,
                priceID: item.priceID,
                picture: item.picture,
            }
            if (!isLike) {
                console.log('add to fav')
                addToFav(prod)
                dispatch(incrementFav())

            } else {
                console.log('remove from fav')
                removeFromFav(prod)
                dispatch(decrementFav())
            }
        }


        return (
            <div className="bg-red-700 p-2 m-2 flex" >
                <div className="w-32 h-32 bg-emerald-700 relative">
                    <Image
                        src={item.picture}
                        layout="fill"
                        objectFit='contain'
                    />
                </div>

                <div className="flex-grow ml-5">
                    <div className="flex">
                        <p className="font-medium">{item.productName}</p>
                        <p className="ml-auto">{updatePrice(item.price * item.quantity)}</p>
                    </div>

                    <div className="flex items-center mt-2" >
                        Quantity
                        <select className="bg-transparent" value={quantity} onChange={updateQuantityHandler}>
                            {
                                options.map((optionLoop, index) => {

                                    return <option key={index} value={optionLoop}>{optionLoop}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="">
                        <TrashIcon className="h-6 w-6 inline-block" onClick={() => removeItem()} />

                        <svg className="h-6 w-6 inline-block ml-2" onClick={() => addToFavourite()} xmlns="http://www.w3.org/2000/svg" fill={isLike ? 'red' : 'none'} viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                    </div>
                </div>
            </div>
        )

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
                border-8 border-gray-500 border-t-green-800">
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

                    <button className="mt-8 block bg-gray-300 p-2 rounded-3xl ml-auto mr-auto" onClick={() => checkOut()}>Checkout</button>


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