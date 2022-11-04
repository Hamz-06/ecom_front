import Image from 'next/image'
import React from 'react'
import Header from '../../../Components/Header'
import { useRouter } from 'next/router'
import { stripe } from '../../../util/Shopify'
import { addToFav, fetchFav, removeFromFav } from '../../../util/favProducts'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { decrementFav, incrementFav } from '../../../redux/slice/numOfFav'
import { addToBag } from '../../../util/cartProducts'
import { incrementCart } from '../../../redux/slice/numOfCart'
function product({ product, price }) {


    const [isLike, setLike] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (product) return;
        router.push('/category/all')
    }, [])

    useEffect(() => {
        const favourites = fetchFav()
        favourites?.map((fav) => {
            fav.productID === product.id ? setLike(true) : ''
        })
    }, [])

    //add to fav func
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
            dispatch(incrementFav())

        } else {
            console.log('remove from fav')
            removeFromFav(prod)
            dispatch(decrementFav())
        }
    }
    //add to bag func
    const addToBagLocal = () => {
        addToBag({
            productName: product.name,
            price: price.unit_amount,
            productID: product.id,
            priceID: price.id,
            picture: product.images[0],
            quantity: 1
        })
        dispatch(incrementCart())
    }

    const updatePrice = (price) => {
        var updatedPrice = (price / 100).toFixed(2)
        updatedPrice = '£' + updatedPrice
        return updatedPrice
    }

    return (
        //check if product exists 
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

                    {/* left hand side of screen - used for image  */}
                    <div className='h-[80vh] md:h-[90vh] md:w-[50%] bg-slate-500'>

                        <div className='relative w-full h-[80%] p-16'>
                            {/* fav button on top of img */}
                            <div className='top-0 right-0 absolute z-10'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={isLike ? 'red' : 'none'} onClick={() => addToFavourite()} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-12 h-12 rounded-full p-1 mt-5 mr-5 z-10 bg-white`} >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>

                            </div>
                            {/* image of product */}

                            <div className='relative w-full h-full'>

                                <Image
                                    src={product.images[0]}
                                    layout="fill"
                                    objectFit='contain'
                                />
                            </div>

                        </div>
                        {/* could be used to scroll through the differnt images  */}
                        <div className="h-[20%] w-full bg-slate-400 flex items-center">
                            {/* Could be created using a map once stripe adds multiple images  */}
                            <div className='w-28 h-[80%] bg-red-400 ml-5 mr-5 relative rounded-md'>
                                <Image
                                    src={product.images[0]}
                                    layout="fill"
                                    objectFit='contain'
                                />
                            </div>
                        </div>
                    </div>
                    {/* right hand side of the screen  */}
                    <div className='h-[90vh] md:h-[90vh] md:w-[50%] bg-amber-500'>

                        <div className='hidden md:block mt-10 pl-10'>
                            <p className='text-5xl font-semibold'>{product.name}</p>
                            <p className='text-red-700'>{product.metadata.info}</p>
                            <p className='mt-2'>{updatePrice(price.unit_amount)}</p>
                        </div>


                        <div className='mt-10 mb-10 left-0 pl-10'>
                            <p className='text-lg font-medium'>Product Description</p>
                            <p>{product.description}</p>
                        </div>

                        <div className='bg-blue-400 w-52 h-12 flex items-center justify-center rounded-md 
                        font-medium text-lg shadow-md hover:bg-blue-300 ml-auto mr-auto'>
                            <button
                                //add the item to the bag - local storage, save this object locally 
                                onClick={() =>
                                    addToBagLocal()
                                }>
                                Add to Bag
                            </button>
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
