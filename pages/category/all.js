
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
  const [type, updatetype] = useState('')
  const [size, updateSizes] = useState('')
  const [isMobile, setMobile] = useState()

  const types = ['flags', 'cartoon']

  const sizes = ['small', 'large', 'medium']

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



  function SecondaryHeader() {
    return (
      <div className="bg-red-300 w-full h-14 flex justify-between items-center sticky top-0 z-30" id='secondaryHeader'>
        <div className="ml-5 text-lg font-bold">
          {/* {type} ({products.length}) */}
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
            updatetype('')
            updateSizes('')
          }}>Reset</p>
        </div>

        <div className="mt-5">
          {types.map((typeLocal, index) => {
            return (
              <div key={index} className='flex justify-center'>
                <p onClick={() => updatetype(typeLocal)} className='inline'>{typeLocal}</p>
                {type === typeLocal ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                ) : ''}

              </div>)
          })}
        </div>


        <div className="mt-20">

          {sizes.map((sizeLocal, index) => {
            return (
              <div key={index} className='flex justify-center'>
                <p onClick={() => updateSizes(sizeLocal)} key={index}>{sizeLocal}</p>
                {size === sizeLocal ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                ) : ''}
              </div>

            )
          })}

        </div>

      </div>
    )
  }

  return (
    <>
      <Header />
      {type}
      {size}
      <div className="w-screen h-full">
        {/* header for items */}
        <SecondaryHeader />
        {/* filters and products  */}
        <div className="w-full h-screen flex ">
          {/* remove products and display filters if on mobile screen */}

          {/* <div id='products' className=' w-full h-full' style={{ display: isMobile && filters ? 'none' : 'flex' }}> */}
          <div id='products' className={`flex flex-wrap w-full h-full justify-center ${isMobile && filters ? 'invisible':'visible'}`}>
            {
              products.map((product, index) => {
                const metaData = product.metadata

                return (metaData.type === type || metaData.size === size || (size === '' && type === '')) ? (
                  <Product product={product} key={index} />
                ) : ''

              })
            }
          </div>

          {/* display filters if true  */}
          {filters ? (
            <div className="z-10 absolute bg-red-400 h-screen w-full md:w-1/4 md:relative ">
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

