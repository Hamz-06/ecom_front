
import React from "react"
import { useEffect, useState, useRef } from "react"
import { stripe } from "../../util/Shopify"
import { useTransition, animated, useSpring, config } from 'react-spring'
import Header from "../../Components/Header"
import Image from 'next/image'
import Link from "next/link"
import { ColorSwatchIcon } from "@heroicons/react/solid"
import { useRouter } from 'next/router'

function About({ products }) {

  const router = useRouter()
  console.log(router)
  const [filters, updateFilters] = useState(true)
  const [category, updateCategory] = useState('all')
  const [color, updateColor] = useState('')
  const [size, updateSizes] = useState('')
  const [isMobile, setMobile] = useState()

  const categories = ['all', 'Flags', 'Cartoon']
  const colors = ['red', 'white', 'green', 'blue']
  const sizes = ['small', 'large']

  const props = useSpring({
    // from: {
    //   y: -400
    // },
    // to: {
    //   y: 0
    // }
  })



  function SecondaryHeader() {
    return (
      <div className="bg-red-300 w-full h-14 flex justify-between items-center sticky top-0 z-10" id='secondaryHeader'>
        <div className="ml-5 text-lg font-bold">
          {/* {category} ({products.length}) */}
        </div>
        <div className="flex mr-5">
          <p onClick={() => updateFilters(!filters)} className="mr-12">{filters ? 'Hide' : 'Show'} Filters</p>
          <p>Sort By</p>
        </div>
      </div>
    )
  }

  function Filters() {

    return (
      <div className="flex flex-col text-center sticky top-10" >
        {/* reset button */}
        <div className="mt-5">
          <p onClick={() => {
            updateColor('')
            updateSizes('')
          }}>Reset</p>
        </div>

        <div className="mt-5">
          {categories.map((category, index) => {
            return <p onClick={() => updateCategory(category)} key={index}>{category}</p>
          })}
        </div>

        <div className="mt-20">
          <p>Color</p>
          {colors.map((color, index) => {
            return <p onClick={() => updateColor(color)} key={index}>{color}</p>
          })}
        </div>

        <div className="mt-20">
          <p>sizes</p>
          {sizes.map((size, index) => {
            return <p onClick={() => updateSizes(size)} key={index}>{size}</p>
          })}
        </div>

      </div>
    )
  }

  useEffect(() => {
    resize()
    window.addEventListener('resize', resize)

    function resize() {
      if (window.innerWidth < 768) {
        updateFilters(false)
        setMobile(true)
      }
      else {
        setMobile(false)
      }
    }
  }, [])


  const Product = ({ product }) => {


    const [isHover, setHover] = useState(false)
    const [displayImage, updateDisplayImage] = useState(
      product?.images[0] !== undefined ?
        product?.images[0] : ''
    )
    const prodctNameClear = product.name.replace(/\s/g,'')
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
      <Link href={`/category/product/${prodctNameClear}-${productId}`}>
        <animated.div
          style={props}
          className='md:w-80 w-96 h-[430px] bg-gray-400 shadow-2xl rounded-md mt-5 p-2'>
          {/* <div className="w-full h-full relative"> */}
          <div className="w-full h-full relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

            {
              displayImage !== '' ?
                <Image src={displayImage}
                  width={400}
                  height={400}
                />
                : <p className="w-[304px] h-[304px]"></p> //fix this
            }

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
      </Link>
    )

  }


  return (
    <>
      <Header />
      <div className="w-screen h-full">
        {/* header for items */}
        <SecondaryHeader />
        {/* filters and products  */}
        <div className="w-full h-screen flex ">
          {/* remove products and display filters if on mobile screen */}
          <div id='products' className='flex flex-wrap justify-evenly w-full h-full' style={{ display: isMobile && filters ? 'none' : 'flex' }}>
            {
              products.map((product, index) => {

                return <Product product={product} key={index} />
              })
            }
          </div>

          {/* display filters if true  */}
          {filters ? (
            <div className="absolute w-full md:w-1/4 md:relative bg-slate-500">
              <Filters />
            </div>

          ) : ''}


        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const fetchProducts = await stripe.products.list();

  const fetchPrices = await stripe.prices.list();

  let products = fetchProducts.data.map((product, index) => {
    return { ...product, ...fetchPrices.data[index] }
  })

  return {
    props: {
      products

    }
  }
}


export default About

