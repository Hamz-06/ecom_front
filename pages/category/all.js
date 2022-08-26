
import React from "react"
import { useEffect, useState, useRef } from "react"
import { client } from "../../util/Shopify"
import { useTransition, animated, useSpring, config } from 'react-spring'
import Header from "../../Components/Header"
import Image from 'next/image'

function About({ products, collection }) {
  console.log(products)
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



  const Products=()=>{
    const [isHover, setHover] = useState(false)
    //loop through every product
    return products.map((product, index) => {

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


      console.log(product.productType)
      // console.log(JSON.parse(product.images[0]))
      return (<animated.div
        style={props}
        key={index}
        className='md:w-80 w-96 h-[430px] bg-gray-400 shadow-2xl rounded-md mt-5 p-2'>
        <div className="w-full h-full relative" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>

          {
            product.images[0]?.src !== undefined ?

              <Image src={product.images[0].src}
                width={400}
                height={400}
              />
              : <p className="w-[304px] h-[304px]"></p> //fix this
          }
          <p className="font-semibold">{product.handle}</p>
          {(product.productType !== '') ? <p>{product.productType}</p> : ''}
          {
            product.options.map((option, indexOption) => {
              if (option.name === 'Color') {
                return <p key={indexOption}>{option.values.length} Colors</p>
              }
            })
          }
          <p className="absolute bottom-0 text-lg font-semibold">
            £
            {
              product.variants[0].price
            }
          </p>
        </div>
      </animated.div>)
    })
  }

  function SecondaryHeader() {
    return (
      <div className="bg-red-300 w-full h-14 flex justify-between items-center sticky top-0 z-10">
        <div className="ml-5 text-lg font-bold">
          {category} ({products.length})
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
      <div className="flex flex-col text-center">
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



  return (
    <>
      <Header />
      <div className="w-screen h-full">
        {/* header for items */}
        <SecondaryHeader />
        {/* filters and products  */}
        <div className="w-full h-full flex">
          {/* remove products and display filters if on mobile screen */}
          <div id='products' className='flex flex-wrap justify-evenly w-full h-full' style={{ display: isMobile && filters ? 'none' : 'flex' }}>
            <Products />
          </div>

          {/* display filters if true  */}
          {filters ? (
            <div className="absolute w-full bg-yellow-600 h-screen md:w-1/4 md:relative">
              <Filters />
            </div>

          ) : ''}

        </div>
        <div className="h-screen w-full">

        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll()
  const collection = await client.collection.fetchAllWithProducts()
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      collection: JSON.parse(JSON.stringify(collection)),

    }
  }
}



export default About

