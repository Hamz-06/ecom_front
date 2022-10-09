import Image from 'next/image'
import React from 'react'
import Header from '../../../Components/Header'
import { useRouter } from 'next/router'
import { stripe } from '../../../util/Shopify'
import { addToFav, fetchFav, removeFromFav } from '../../../util/favProducts'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { decrement, increment } from '../../../redux/slice/numOfFav'
function product({ product, price }) {


    const [isLike, setLike] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const favourites = fetchFav()
        favourites?.map((fav) => {
            fav.productID === product.id ? setLike(true) : ''
        })
    }, [])

    const addToFavourite = () => {
        setLike(!isLike)
        const prod = {
            productName: product.name,
            price: price.unit_amount,
            productID: product.id,
            priceID: price.id,
            picture: product.images[0],
        }
        if (!isLike) {
            console.log('add to fav')
            addToFav(prod)
            dispatch(increment())

        } else {
            console.log('remove from fav')
            removeFromFav(prod)
            dispatch(decrement())
        }

    }
    const addToBag = (prod) => {
        // console.log(prod)

        const getBag = JSON.parse(window.localStorage.getItem('BASKET'))
        if (getBag === null) {
            const bag = []
            bag.push(prod)
            window.localStorage.setItem('BASKET', JSON.stringify(bag))

        } else {
            getBag.map((bag, index) => {

                if (bag.productName === prod.productName) {
                    console.log('found')
                    const updatedQuantity = bag.quantity + 1
                    getBag[index].quantity = updatedQuantity
                    window.localStorage.setItem('BASKET', JSON.stringify(getBag))
                }
                else if (bag.productName !== prod.productName && index === (getBag.length - 1)) {

                    console.log('not found')
                    getBag.push(prod)
                    window.localStorage.setItem('BASKET', JSON.stringify(getBag))

                }
            })
        }

    }


    return (
        //if product is not null
        product ? (
            <>
                <Header />
                <div className='h-10 flex items-center'></div>

                <div className=' flex flex-col md:flex-row'>

                    <div className='h-[10vh] w-full bg-rose-500 md:hidden'>
                        {product.name}
                        <br />
                        {price.unit_amount}
                    </div>

                    <div className='h-[80vh] md:h-[100vh] md:w-[60%] bg-slate-500'>

                        <div className='relative w-full h-[80%]'>
                            <div className='top-0 right-0 absolute z-10'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={isLike ? 'red' : 'none'} onClick={() => addToFavourite()} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-12 h-12 rounded-full p-1 mt-5 mr-5 z-10 bg-white`} >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>

                            </div>
                            <Image
                                src={product.images[0]}
                                layout="fill"
                                objectFit='contain'
                            />
                        </div>
                        <div className="h-[20%] w-full bg-slate-400"></div>

                    </div>

                    <div className='h-[90vh] md:h-[100vh] md:w-[40%] bg-amber-500 flex items-center flex-col'>

                        <div className='hidden md:inline-block text-center'>
                            {product.name}
                            <br />
                            {price.unit_amount}
                        </div>
                        <div className=''>
                            <button
                                //add the item to the bag - local storage, save this object locally 
                                onClick={() => addToBag({
                                    productName: product.name,
                                    price: price.unit_amount,
                                    productID: product.id,
                                    priceID: price.id,
                                    picture: product.images[0],
                                    quantity: 1
                                })
                                }>
                                Add to Bag
                            </button>
                        </div>

                        <div>
                            {product.description}
                        </div>

                    </div>
                </div>
            </>
        ) : ''
    )
}

export async function getServerSideProps(context) {

    var price = null //default
    var product = null
    const prodName = context.query.productName
    const prodNameArr = prodName.split('-')  //[ 'GraffitiBart', 'prod_MMosUXL6pP8SwN' ]

    try {
        product = await stripe.products.retrieve(
            prodNameArr[1]
        );
    } catch (err) {

    }

    //if price is null then retrieve prices
    if (product) {
        price = await stripe.prices.retrieve(
            product.default_price
        );

    }
    return {
        props: {
            product,
            price
        }
    }
}

export default product
