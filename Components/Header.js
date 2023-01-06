import React from 'react'
import { ColorSwatchIcon, LockClosedIcon, ViewGridIcon } from '@heroicons/react/solid'
import { FireIcon, HeartIcon, HiX, PlayIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon, ph } from '@heroicons/react/outline'
import { useState, useCallback } from 'react'
import { useEffect, memo } from 'react'
import Link from 'next/link'
import { app } from '../util/firebase'
import { fetchfavQuantity } from '../util/favProducts'
import { useSelector, useDispatch } from 'react-redux'
import { setValueFav } from '../redux/slice/numOfFav'
import { fetchBag, fetchBagQuantity } from '../util/cartProducts'
import { setValueCart } from '../redux/slice/numOfCart'
import { useMemo } from 'react'

const Header = () => {

  const [displaySideBar, updateSideBar] = useState(false)
  const dispatch = useDispatch()

  const numOfFav = useSelector(state => state.numOfFav.value)
  const numOfCart = useSelector(state => state.numOfCart.value)

  useEffect(() => {

    const cartProdQuantity = fetchBagQuantity()
    const favProdLength = fetchfavQuantity()

    dispatch(setValueFav(favProdLength))
    dispatch(setValueCart(cartProdQuantity))
  }, [])


  const links = [
    {
      name: 'HomePage',
      Link: '/'
    }
    ,
    {
      name: 'Product',
      Link: '/category/all',
    },

  ]

  // header for sign in and out
  const headerOne = useMemo(() => {

    {/* Header one  */ }
    return (
      <div className=' bg-red-500 h-2/5 hidden items-center justify-evenly ml-auto w-1/4 md:flex md:justify-center text-sm'>

        <p> Sign In </p>

        <div className='h-5 border-l border-1 border-black mr-5 ml-5'></div>
        {/* <Link href={'../sign_up'}> */}
        <p> Sign Up</p>
        {/* </Link> */}
      </div>
    )
  }, [])

  const sideBar = () => {

    return displaySideBar ? (
      <div className='h-screen w-2/4 fixed top-0 bg-foreground flex flex-col items-center justify-center text-xl z-50 border-r-2 border-solid border-black'>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 absolute top-5 right-5" onClick={() => updateSideBar(!displaySideBar)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        {
          links.map((link, index) => {
            return (

              <div key={index} className='mt-14'>
                <Link href={link.Link ? link.Link : ''}>
                  <p>{link.name}</p>
                </Link>

              </div>
            )
          })
        }
        <div className='mt-14 '>Sign In</div>
        <div className='mt-14'>Join Us</div>
      </div>
    ) : ''

  }


  return (
    <>
      <header className='h-[75px] md:h-[65px] border-solid border-black border-b-2 font-roboto'>
        {/* header one */}
        {/* {headerOne} */}

        {/* header two */}
        <div className='h-full bg-foreground border-black border-t-2 flex flex-row '>
          {/* side button mobile */}
          <div className="basis-1/2 bg-purple-40 md:hidden flex items-center">

            <div className='ml-10 w-14 h-14 flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={() => updateSideBar(!displaySideBar)} stroke="currentColor" className="w-11 h-11">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>

            {/* <p className='inline-block pl-5'>Custom Rugs</p> */}

            {sideBar()}
          </div>

          {/* Header for screen */}

          <div className="basis-1/4 hidden md:flex items-center justify-center">
            {/* could add logo in the futute */}
            <div className='font-internBold'>
              V2
            </div>
          </div>
          {/* links for web  */}
          <div className="basis-1/2 hidden md:flex border-l-2 border-black border-solid justify-evenly items-center ">
            {
              links.map((link, index) => {
                return (
                  <div key={index} className='text-base hover:border-b-2 hover:border-b-background '>
                    <Link href={link.Link ? link.Link : ''}>
                      <p>{link.name}</p>
                    </Link>

                  </div>
                )
              }
              )
            }
          </div>

          <div className="basis-1/2 border-l-0 md:border-l-2 border-black md:basis-1/4 flex justify-end md:justify-center items-center">

            {/* fav icon  */}
            <div className="relative z-10 mr-7 md:mr-5 w-14 h-14 mt-2 flex items-center justify-center">
              <Link href={'/favourite'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </Link>
              <div className='rounded-full bg-pink-600 w-6 h-6 absolute top-0 -right-1 flex items-center justify-center text-xs'>
                {numOfFav}
              </div>
            </div>

            {/* cart  */}
            <div className='relative z-10 w-14 h-14 mt-2 mr-7 flex items-center justify-center'>
              <Link href={'/cart'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
              </Link>
              <div className='rounded-full bg-pink-600 w-6 h-6 absolute top-0 -right-1 flex items-center justify-center text-xs'>
                {numOfCart}
              </div>
            </div>

          </div>

        </div>

      </header>
    </>
  )
}

export default memo(Header)