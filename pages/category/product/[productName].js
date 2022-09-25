import Image from 'next/image'
import React from 'react'
import Header from '../../../Components/Header'
import { useRouter } from 'next/router'
import { stripe } from '../../../util/Shopify'
function product({ product, price }) {

    console.log(product)
    // console.log(product.images[0])

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
                else if (bag.productName !== prod.productName && index===(getBag.length-1)) {
                    
                    console.log('not found')
                    getBag.push(prod)
                    window.localStorage.setItem('BASKET', JSON.stringify(getBag))

                }
            })
        }

    }

    const addToFav = (prod) => {
        const getFav = JSON.parse(window.localStorage.getItem('FAVOURITE'))


        if (getFav) {
            const isValueFound = getFav.some((fav) => fav.productName === prod.productName)

            if (!isValueFound) {
                getFav.push(prod)
                window.localStorage.setItem('FAVOURITE', JSON.stringify(getFav))
            }


        } else if (!getFav) {
            const getFavArr = []
            getFavArr.push(prod)
            window.localStorage.setItem('FAVOURITE', JSON.stringify(getFavArr))

        }

    }

    return (
        //if product is not null
        product ? (
            <>
                <Header />
                <div className='h-10 flex items-center'></div>
                <h1>lol</h1>

                <div className=' flex flex-col md:flex-row'>

                    <div className='h-[10vh] w-full bg-rose-500 md:hidden'>
                        {product.name}
                        <br />
                        {price.unit_amount}
                    </div>

                    <div className='h-[80vh] md:h-[100vh] md:w-[60%] bg-slate-500'>

                        <div className='relative w-full h-[80%]'>
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
                                    priceID:price.id,
                                    picture:product.images[0],
                                    quantity: 1
                                })
                                }>
                                Add to Bag
                            </button>
                        </div>
                        <div className=''>
                            <button onClick={() => {
                                addToFav({
                                    productName: product.name,
                                    price: price.unit_amount,
                                    productID: product.id
                                })
                            }}>
                                Add to Favourites
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
