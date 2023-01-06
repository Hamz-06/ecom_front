
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

  const [filters, updateFilters] = useState(false)
  const [type, updatetype] = useState('')
  const types = ['flags', 'cartoon']
  const [isMobile, setMobile] = useState()
  // const [size, updateSizes] = useState('')
  // const sizes = ['small', 'large', 'medium']

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
      <div className="bg-foreground w-full h-12 border-b-2 border-black flex justify-between items-center sticky top-0 z-30" id='secondaryHeader'>
        <div className="ml-5 text-lg font-bold">
          {/* {type} ({products.length}) */}
        </div>
        <div className="flex mr-5">
          <p onClick={() => updateFilters(!filters)} className="mr-12">{filters ? 'Hide' : 'Show'} Filters</p>
        </div>
      </div>
    )
  }

  function Filters() {

    return (
      <div className="flex flex-col text-center sticky top-10 bg-foreground border-l-2 border-black w-3/5 md:w-2/5 h-screen ml-auto text-2xl" >
        {/* reset button */}
        <div className="mt-20 hover:border-l-8 hover:border-rose-600">
          <p onClick={() => {
            updatetype('')
            // updateSizes('')
          }}>Reset</p>
        </div>

        <div className="mt-10">
          {types.map((typeLocal, index) => {
            return (
              <div key={index} className='flex justify-center mt-5 hover:border-l-8 hover:border-background'>
                <p onClick={() => updatetype(typeLocal)} className='inline'>{typeLocal}</p>
                {type === typeLocal ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : ''}
              </div>)
          })}
        </div>


      </div>
    )
  }

  return (
    <>
      <Header />

      <div className={`w-screen h-full ${filters ? 'fixed' : ''}`}>
        {/* header for items */}
        <SecondaryHeader />
        {/* filters and products  */}
        <div className="w-full min-h-screen flex bg-background ">
          {/* remove products and display filters if on mobile screen */}

          {/* <div id='products' className=' w-full h-full' style={{ display: isMobile && filters ? 'none' : 'flex' }}> */}
          <div id='products' className={`flex flex-wrap w-full h-full justify-center md:justify-start`}>
            {
              products.map((product, index) => {

                return <Product product={product} key={index} displayInfo={{ type: type }} />

              })
            }
          </div>

          {/* display filters if true  */}
          {filters ? (
            <div className="z-20 w-screen h-screen fixed">
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

