import React, { useCallback } from 'react'
import { ColorSwatchIcon, LockClosedIcon, ViewGridIcon } from '@heroicons/react/solid'
import { FireIcon, HeartIcon, HiX, PlayIcon, PlusCircleIcon, PlusIcon, ShoppingBagIcon, StarIcon } from '@heroicons/react/outline'
import { useState } from 'react'
const Header=()=> {
  const [displaySideBar, updateSideBar] = useState(false)
  const links = [

    {
      name: 'About Us',
      Link: 'Google.com',

    }
    ,
    {
      name: 'Product',
      Link: 'Product.com',
    },
    {
      name: 'Quality',
    }
  ]

  // return (

  //   <>
  //     <header className='h-28'>

  //       <div className='h-2/5 bg-red-500 hidden items-center justify-evenly ml-auto w-1/4 md:flex'>
  //         <p> Sign In</p>

  //         <p>Join Us</p>
  //       </div>

  //       {/* FLEX THE CART AND LEFT */}
  //       <div className='h-3/5 bg-gray-300'>
  //         {/* header for sidebar */}
  //         {/* show sidebar if true*/}

  //         <ViewGridIcon className='h-16 basis-1/4 hover:text-red-50 pl-5 md:hidden' onClick={() => updateSideBar(!displaySideBar)} />
  //         {/* Cart  */}
  //         <div className='basis-1/4 flex justify-end md:hidden'>
  //           <ShoppingBagIcon className='h-8 pr-4' />
  //           <StarIcon className='h-8 pr-8' />
  //         </div>
  //         {
  //           displaySideBar ? (
  //             <div className='h-screen w-3/4 absolute top-0 bg-slate-500 flex flex-col items-center justify-center'>
  //               <div className='p-2 absolute top-5 right-5 bg-white rounded-full' onClick={() => updateSideBar(!displaySideBar)}>
  //                 <PlusIcon className='origin-center rotate-45 h-10' />
  //               </div>

  //               {
  //                 links.map((link, index) => {
  //                   return (
  //                     <div key={index} className='text-center mt-10 text-2xl'>
  //                       <p>{link.name}</p>
  //                       <p></p>
  //                     </div>
  //                   )
  //                 }
  //                 )
  //               }

  //             </div>
  //           ) : ''

  //         }

  //         {/* header for mid LINKS, LOGO, CART*/}
  //         <div className='hidden md:flex items-center h-full flex-row'>
  //           {/* logo */}
  //           <div className='basis-1/4 flex justify-start'>
  //             <FireIcon className='h-8 pl-8' />

  //           </div>
  //           {/* Links */}
  //           <div className='basis-2/4 flex justify-evenly'>
  //             {
  //               links.map((link, index) => {
  //                 return (
  //                   <div key={index} className='text-base font-light lg:text-lg'>
  //                     <p>{link.name}</p>
  //                     <p></p>
  //                   </div>
  //                 )
  //               }
  //               )
  //             }
  //           </div>
  //           {/* Cart  */}
  //           <div className='basis-1/4 flex justify-end'>
  //             <ShoppingBagIcon className='h-8 pr-4' />
  //             <StarIcon className='h-8 pr-8' />
  //           </div>
  //         </div>
  //       </div>

  //     </header>
  //   </>
  // )
  const sideBar = () => {

    return displaySideBar ? (
      <div className='h-screen w-3/4 absolute top-0 bg-slate-500 flex flex-col items-center justify-center'>
        <div className='p-2 absolute top-5 right-5 bg-white rounded-full' onClick={() => updateSideBar(!displaySideBar)}>
          <PlusIcon className='origin-center rotate-45 h-10' />
        </div>

        {
          links.map((link, index) => {
            return (
              <div key={index} className='mt-10 text-2xl'>
                <p>{link.name}</p>
                <p></p>
              </div>
            )
          })
        }
        <div className='mt-10 text-2xl'>Sign In</div>
        <div className='mt-10 text-2xl'>Join Us</div>
      </div>
    ) : ''


  }
  return (
    <>
      <header className='h-20 md:h-28'>
        {/* Header one  */}
        <div className=' bg-red-500 h-2/5 hidden items-center justify-evenly ml-auto w-1/4 md:flex '>
          <p> Sign In</p>
          <p>Join Us</p>
        </div>
        {/* header two */}
        <div className='h-full bg-slate-500 flex flex-row md:h-3/5'>
          {/* side button mobile */}
          <div className="basis-1/2 bg-purple-40 md:hidden flex items-center">
            <ViewGridIcon className='hover:text-red-50 icon-size pl-5 inline-block' onClick={() => updateSideBar(!displaySideBar)} />
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
                    <p>{link.name}</p>
                    <p></p>
                  </div>
                )
              }
              )
            }
          </div>

          <div className="basis-1/2 bg-green-200 md:basis-1/4 flex items-center">
            <HeartIcon className='icon-size ml-auto pr-5' />
            <ShoppingBagIcon className='icon-size pr-5' />
          </div>

        </div>
      </header>
    </>
  )
}

export default Header