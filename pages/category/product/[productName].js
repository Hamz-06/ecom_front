import React from 'react'
import Header from '../../../Components/Header'
import { useRouter } from 'next/router'
import { stripe } from '../../../util/Shopify'
function product({ product, price }) {

    console.log(price, product)

    return (
        //if product is not null
        product?(
        <>
            <Header />
            <div className='h-10 flex items-center'></div>
            <h1>lol</h1>
            <div className='h-screen w-screen'>
                <div className='h-[70%] bg-slate-500'>
                    
                </div>
            </div>
        </>
        ):''
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
            product, price

        }
    }
}

export default product
