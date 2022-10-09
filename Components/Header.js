import React from 'react'
import { ColorSwatchIcon, LockClosedIcon, ViewGridIcon } from '@heroicons/react/solid'
import { FireIcon, HeartIcon, HiX, PlayIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon, ph } from '@heroicons/react/outline'
import { useState, useCallback } from 'react'
import { useEffect, memo } from 'react'
import Link from 'next/link'
import { app } from '../util/firebase'
import { fetchFav } from '../util/favProducts'
import { useSelector, useDispatch } from 'react-redux'
import { increment, setValue } from '../redux/slice/numOfFav'
const Header = () => {
  const [displaySideBar, updateSideBar] = useState(false)

  const numOfItems = useSelector(state => state.numOfFav.value)
  const dispatch = useDispatch()
  useEffect(() => {
    const favProd = fetchFav()
    const favProdLength = favProd.length
    dispatch(setValue(favProdLength))
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
    {
      name: 'Quality',
    }
  ]



  const sideBar = () => {

    return displaySideBar ? (
      <div className='h-screen w-3/4 fixed top-0 bg-slate-500 flex flex-col items-center justify-center text-xl'>

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
      <header className='h-[75px] md:h-[95px]'>
        {/* Header one  */}
        <div className=' bg-red-500 h-2/5 hidden items-center justify-evenly ml-auto w-1/4 md:flex md:justify-center text-sm'>

          <p> Sign In </p>

          <div className='h-5 border-l border-1 border-black mr-5 ml-5'></div>
          <Link href={'../sign_up'}>
            <p> Sign Up</p>
          </Link>


        </div>
        {/* header two */}
        <div className='h-full bg-slate-500 flex flex-row md:h-3/5'>
          {/* side button mobile */}
          <div className="basis-1/2 bg-purple-40 md:hidden flex items-center">

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} onClick={() => updateSideBar(!displaySideBar)} stroke="currentColor" className="w-11 h-11 ml-5 md:w-8 md:h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            {/* <p className='inline-block pl-5'>Custom Rugs</p> */}

            {sideBar()}
          </div>

          {/* Header for screen */}

          <div className="basis-1/4 bg-pink-600 hidden md:block">
            {/* could add logo in the futute */}
          </div>

          <div className="basis-1/2 hidden bg-pink-200 md:flex justify-evenly items-center ">
            {
              links.map((link, index) => {
                return (
                  <div key={index} className='text-base'>
                    <Link href={link.Link ? link.Link : ''}>
                      <p>{link.name}</p>
                    </Link>

                  </div>
                )
              }
              )
            }
          </div>

          <div className="basis-1/2 bg-green-200 md:basis-1/4 flex justify-center items-center">

            {/* fav icon  */}
            <div className="relative z-10 mr-7 md:mr-5">
              <Link href={'/favourite'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </Link>
              <div className='rounded-full bg-pink-600 w-5 h-5 absolute -top-1 -right-3 flex items-center justify-center text-xs'>
                {numOfItems}
              </div>
            </div>

            {/* cart  */}
            <div className='relative z-10'>
              <Link href={'/cart'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-11 h-11 md:w-8 md:h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
              </Link>
              <div className='rounded-full bg-pink-600 w-5 h-5 absolute -top-1 -right-3 flex items-center justify-center text-xs'>
                1
              </div>
            </div>

          </div>

        </div>

      </header>
    </>
  )
}

export default memo(Header)