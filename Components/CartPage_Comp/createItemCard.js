import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { TrashIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { addToFav, fetchFav, removeFromFav } from "../../util/favProducts";
import { useDispatch, useSelector } from "react-redux";
import { decrementFav, incrementFav } from "../../redux/slice/numOfFav";
import { fetchBagQuantity, quantityHandler, removeItemHandler } from "../../util/cartProducts";
import { setValueCart } from "../../redux/slice/numOfCart";
//create item func
const CreateItem = ({ item, index, items, updateItems }) => {
    const [quantity, updQuantity] = useState(item.quantity)
    const [isLike, setLike] = useState(false)
    const options = []
    const prodctNameClear = item.productName.replace(/\s/g, "");
    const productId = item.productID;
    const dispatch = useDispatch()

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

    const updatePrice = (price) => {
        var updatedPrice = (price / 100).toFixed(2)
        updatedPrice = '£' + updatedPrice
        return updatedPrice
    }

    return (

        <div className="bg-secondground  p-2 m-2 flex hover:bg-white">
            <Link href={`/category/product/${prodctNameClear}-${productId}`}>
                <div className="w-32 h-32 bg-background relative">
                    <Image
                        src={item.picture}
                        layout="fill"
                        objectFit='contain'
                    />
                </div>
            </Link>

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

export { CreateItem }