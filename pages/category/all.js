
import React from "react"
import { useEffect, useState, useRef } from "react"
import { stripe } from "../../util/Shopify"
import { useTransition, animated, useSpring, config } from 'react-spring'
import Header from "../../Components/Header"
import Image from 'next/image'
import Link from "next/link"
import { ColorSwatchIcon } from "@heroicons/react/solid"
import { Product } from "../../Components/category/ProductCard"


function About({ products }) {
  
  const [filters, updateFilters] = useState(true)
  const [category, updateCategory] = useState('all')
  const [color, updateColor] = useState('')
  const [size, updateSizes] = useState('')
  const [isMobile, setMobile] = useState()

  const categories = ['all', 'Flags', 'Cartoon']
  const colors = ['red', 'white', 'green', 'blue']
  const sizes = ['small', 'large']



  function SecondaryHeader() {
    return (
      <div className="bg-red-300 w-full h-14 flex justify-between items-center sticky top-0 z-20" id='secondaryHeader'>
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



  return (
    <>
      <Header />
      <div className="w-screen h-full">
        {/* header for items */}
        <SecondaryHeader />
        {/* filters and products  */}
        <div className="w-full h-screen flex ">
          {/* remove products and display filters if on mobile screen */}

          {/* <div id='products' className=' w-full h-full' style={{ display: isMobile && filters ? 'none' : 'flex' }}> */}
          <div id='products' className='flex flex-wrap w-full h-full justify-center'>
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
    return { ...product, ...fetchPrices.data[index], metadata: fetchProducts.data[index].metadata }
  })
  
  
  return {
    props: {
      products
    }
  }
}


export default About

