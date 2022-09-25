import React from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
import Image from "next/image";
import { useState } from "react";
import { TrashIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import { stripe } from "../util/shopify";
import axios from "axios";
function Cart() {

    const [items, updateItems] = useState([])
    const tester = [{ x: 'lol' }, { x: 'lol' }, { x: 'lol' },
    { x: 'lol' },
    { x: 'lol' },
    { x: 'lol' },
    { x: 'lol' },
    ]
    

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


    const checkOut = () => {
        var updatedItems = items ? (items.map((item) => {
            return {
                price: item.priceID,
                quantity: item.quantity
            }
        })) : ''
        updatedItems = JSON.stringify(updatedItems)
        // console.log(updatedItems)
        return updatedItems
    }

    //create item func
    const CreateItem = ({ item, index }) => {
        const [quantity, updQuantity] = useState(item.quantity)
        const options = []
        //create 10 quantity options
        for (let i = 0; i < 10; i++) {
            options.push(i + 1)
        }

        const quantityHandler = (e) => {
            //update text for quantity
            updQuantity(e.target.value)
            //updating the local storage -> no need to update items state
            items[index].quantity = e.target.value
            //update local storage
            window.localStorage.setItem('BASKET', JSON.stringify(items))
        }
        const removeItemHandler = (index) => {
            //update items and local storage 
            const newItems = items.filter((_x, ind) => ind !== index)
            console.log(newItems)
            window.localStorage.setItem('BASKET', JSON.stringify(newItems))
            updateItems(newItems)
            // updateItems(items.splice(index,1))
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
                        <select className="bg-transparent" value={quantity} onChange={quantityHandler}>
                            {
                                options.map((optionLoop, index) => {

                                    return <option key={index} value={optionLoop.toString()}>{optionLoop}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <TrashIcon className="h-6 w-6" onClick={() => removeItemHandler(index)} />
                        <ArrowSmLeftIcon className="h-6 w-6" onClick={() => console.log(index)} />
                    </div>
                </div>
            </div>
        )

    }

    return (
        <>
            <Header />
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
                        <input type="hidden" name='lineItems' value={checkOut()} />
                        {/* hide checkout button if there are no items  */}
                        <button type="submit" role='link' hidden={items.length===0}>
                            Checkout
                        </button>
                    </form>


                </div>
            </div>
        </>
    )
}
export default Cart