
import React from "react"
import { useEffect, useState } from "react"
import { client } from "../../util/Shopify"
import { useTransition, animated, useSpring, config } from 'react-spring'
import Header from "../../Components/Header"

function About({ products, collection }) {
  console.log(products)
  const [filters, updateFilters] = useState(true)
  const [category, updateCategory] = useState('all')
  const [color, updateColor] = useState('')
  const [size, updateSizes] = useState('')

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

  function Products() {
    const lol = []
    //loop through every product
    products.map((product, index) => {

      const productOptions = product.options

      productOptions.map((productOption) => {
        const variantName = productOption.name
        const varientValues = productOption.values
        // console.log(varientValues)
        // const contains = varientValues.map((varientVal) => {
        //   if (varientVal.value === color || varientVal.value === size) {
        //     return {true:varientVal.value }
        //   } else { return {false:varientVal.value}  }
        // })

        // console.log(contains)
        const correct = varientValues.filter((val) => {

          // console.log(val.value,color)
          const isSize = size.includes(val.value)
          const isColor = color.includes(val.value)
          return isSize || isColor
          // console.log(isColor,val.value, index)
        })

        console.log('')
        console.log(correct, variantName, index)

        if (correct.length !== 0 && !lol.includes(index)) {
          lol.push(index)
        }
      })



      // return (<animated.div
      //   style={props}
      //   key={index}
      //   className='md:w-72 w-96 h-96 bg-gray-400 shadow-2xl rounded-md m-2 p-2'>
      //   <div className="">
      //     {product.handle}
      //   </div>
      // </animated.div>)

      //  const isFilter = productOptions.filter((productOption)=>{

      //  })

    })
    console.log('')
    console.log(lol, products[lol])
    return products.map((product, index) => {
      if (lol.includes(index) && lol.length !== 0) {
        return (<animated.div
          style={props}
          key={index}
          className='md:w-72 w-96 h-96 bg-gray-400 shadow-2xl rounded-md m-2 p-2'>
          <div className="">
            {product.handle}
          </div>
        </animated.div>)


      } else if (lol.length === 0) {

        return (<animated.div
          style={props}
          key={index}
          className='md:w-72 w-96 h-96 bg-gray-400 shadow-2xl rounded-md m-2 p-2'>
          <div className="">
            {product.handle}
          </div>
        </animated.div>)
      }
    })
  }
  function SecondaryHeader() {
    return (
      <div className="bg-red-300 w-full h-14 flex justify-between items-center">
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
          <p onClick={()=>{
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
          <div className='flex flex-wrap justify-evenly w-full h-full'>
            <Products />
          </div>

          {/* display filters if true  */}
          {filters ? (
            <div className="absolute w-full bg-yellow-300 h-screen md:w-1/3 md:relative">
              <Filters />
            </div>

          ) : ''}

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

