import React, { memo } from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { animated, useSpring } from "react-spring"
import Image from "next/image"
import { useRef } from "react"
import Router, { useRouter } from "next/router"
import { addToFav,fetchFav,removeFromFav } from "../../util/favProducts"

const Products = ({ product }) => {
    
    const props = useSpring({
        // from: {
        //   y: -400
        // },
        // to: {
        //   y: 0
        // }
    })
    
    const [isHover, setHover] = useState(false)
    const [isLike, setLike] = useState(false)
    const [displayImage, updateDisplayImage] = useState(
        product?.images[0] !== undefined ? product?.images[0] : ''
    )
    const likeButton = useRef()
    const router = useRouter()
    const prodctNameClear = product.name.replace(/\s/g, '')
    const productId = product.product
    //loop through every product


    // const productOptions = product.options

    // productOptions.map((productOption) => {
    //   const variantName = productOption.name
    //   const varientValues = productOption.values
    //   // console.log(varientValues)
    //   // const contains = varientValues.map((varientVal) => {
    //   //   if (varientVal.value === color || varientVal.value === size) {
    //   //     return {true:varientVal.value }
    //   //   } else { return {false:varientVal.value}  }
    //   // })

    //   // console.log(contains)
    //   const correct = varientValues.filter((val) => {

    //     // console.log(val.value,color)
    //     const isSize = size.includes(val.value)
    //     const isColor = color.includes(val.value)
    //     return isSize || isColor
    //     // console.log(isColor,val.value, index)
    //   })

    //   console.log('')
    //   console.log(correct, variantName, index)

    // })
    // useEffect(()=>{
    //   product.images[0]?.src !== undefined ?
    //   updateDisplayImage(product.images[0].src):updateDisplayImage('')
    // },[])

    useEffect(()=>{
        // console.log(product)
    },[])
    const addToFavourite = () =>{
        setLike(!isLike)
        const prod = {
            productName: product.name,
            price: product.unit_amount,
            productID: product.product,
            priceID: product.id,
            picture: product.images[0],
        }
        if (!isLike){
            console.log('add to fav')
            addToFav(prod)
        }else{
            console.log('remove from fav')
            removeFromFav(prod)
        }
        
    }
    useEffect(()=>{
        const favourites = fetchFav()
        favourites?.map((fav)=>{

            fav.productID===product.product?setLike(true):''
        })
    },[])

    useEffect(() => {
        //if hover display second image

        if (isHover) {
            if (product?.images[1]) {

                updateDisplayImage(product.images[1])
            }
        } else {
            if (product?.images[0]) {

                updateDisplayImage(product.images[0])
            }
        }

    }, [isHover])

    //http://localhost:3000/category/product/lol

    return (
        // <Link href={!isLike?`/category/product/${prodctNameClear}-${productId}`:{}}>

        <animated.div
            style={props}
            className='md:w-80 w-96 h-[430px] bg-gray-400 shadow-md mt-5 mb-5 ml-5 mr-5 p-2'
            onClick={(e) => likeButton.current.contains(e.target) ? addToFavourite() : router.push(`/category/product/${prodctNameClear}-${productId}`)}>

            <div className="w-full h-full relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>


                <svg xmlns="http://www.w3.org/2000/svg" fill={isLike ? 'red' : 'none'} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" ref={likeButton} className={`w-9 h-9 top-0 right-0 absolute rounded-full p-1 mt-1 z-10 bg-white`} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>

                {
                    displayImage !== '' ?
                        <Image src={displayImage}
                            width={400}
                            height={400}
                        />
                        : <p className="w-[304px] h-[304px]"></p> //fix this
                }
                {/* create fav button */}

                {/* title  */}
                <p className="font-semibold">{product.name}</p>
                <div className="h-14">
                    {/* type of item-can be seen in shopify (could break with multiple product types) */}
                    {/* {(product.productType !== '') ? <p>{product.productType}</p> : ''} */}
                    {/* //number of color options  */}


                    <p className="absolute bottom-0 text-lg font-semibold">
                        £
                        {
                            product.unit_amount
                        }
                    </p>
                </div>
            </div>
        </animated.div>

    )
}

export const Product = memo(Products)