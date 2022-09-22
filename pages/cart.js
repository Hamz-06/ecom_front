import React from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
import Image from "next/image";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
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
        updateItems(getBag)
    }, [])

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

        return (
            <div className="bg-red-700 p-2 m-2 flex" >
                <div className="w-32 h-32 bg-emerald-700">

                </div>

                <div className="flex-grow">
                    <div className="flex">
                        <p className="">{item.productName}</p>
                        <p className="ml-auto">{(item.price * item.quantity) / 100}.00</p>
                    </div>
                    <div className="flex items-center" >
                        Quantity
                        <select className="bg-transparent" value={quantity} onChange={quantityHandler}>
                            {
                                options.map((optionLoop,index)=>{
                                    
                                    return <option key ={index} value={optionLoop.toString()}>{optionLoop}</option>
                                })
                            }
                        </select>
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


                <div className="w-[100vw] max-h-[80vh] bg-yellow-500 overflow-y-auto overflow-x-hidden md:max-h-[95vh] lg:pl-5">

                    {
                        items.map((item, index) => {
                            return <CreateItem item={item} index={index} key={index} />
                        })
                    }

                </div>

                <div className="w-[100vw] h-[95vh] bg-red-300">


                </div>
            </div>
        </>
    )
}
export default Cart