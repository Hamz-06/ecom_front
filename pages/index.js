import Head from 'next/head'
import Image from 'next/image'
import Header from '../Components/Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'

import bts from '../Components/Index/bts.png'

export default function Home() {


  return (

    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

      </Head>
      {/* header content */}
      <Header />

      {/* Main Content */}
      <main className=''>
        {/* section one  */}
        <section className=' w-screen max-h-min md:h-screen bg-[#add8e6] dark:bg-black'>
          {/* mobile picture  */}
          <div className='absolute w-full h-full flex items-center justify-center z-0 md:hidden'>
            {/* <div className='w-[80%] h-[80%] top-0 relative' >
              <Image
                src={bts}
                layout="fill"
                objectFit='contain'
              />
            </div> */}
          </div>

          <div className='h-full w-[100%] md:w-[50%] inline-block '>
            <div className='w-full h-full'>
              <div className='flex w-full flex-col justify-evenly md:justify-center items-center h-full'>
                {/* template title  */}
                <div className='text-center font-internBold text-8xl md:text-7xl lg:text-8xl z-20 mt-5 md:mb-5'>
                  This is a <br />template!
                </div>

                {/* button  */}
                <div className='ml-auto mr-auto absolute md:contents z-20'>
                  <Link href="/category/all">
                    <button className='text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:bg-blue-400  p-4 rounded-3xl '>
                      View Products
                    </button>
                  </Link>
                </div>
                {/* image  */}
                <div className='w-[50vw] h-[50vh] top-0 relative md:hidden inline-block' >
                  <Image
                    src={bts}
                    layout="fill"
                    objectFit='contain'
                  />
                </div>
                {/* box  */}
                <div className='z-10  text-lg md:text-base md:font-normal bg-gradient-to-r from-cyan-500 to-blue-500  md:bg-transparent md:shadow-none rounded-3xl shadow-xl p-8 w-[80%] ml-auto mr-auto mt-5 mb-5'>
                  <div className='text-lg text-center'>
                    This is just a template and subject to change.
                  </div>

                  <div className='mt-5 text-lg text-center md:text-left underline underline-offset-4'>
                    Coming Soon v3..
                  </div>
                  <div className='mt-5 text-center md:text-left list-none md:list-disc'>
                    <li>Improved Landing page and style with animation</li>
                    <li>Crypto payment intergration</li>
                    <li>Sign in, sign out dashboard</li>
                    <li>Add more prod images of prod via Sanity</li>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-[100%] md:w-[50%] h-screen bg-background float-right -z-10 hidden md:flex items-center justify-center'>
            <div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl w-[80%] h-[80%] z-10 relative ' >
              <Image
                src={bts}
                layout="fill"
                objectFit='contain'
              />
            </div>
          </div>

          {/* email  */}
          <div className='absolute top-1/2 right-0 translate-x-1/2 mr-8 rotate-90 z-30'>
            Hamzah1010@hotmail.co.uk
          </div>

        </section>

      </main>

      {/* footer content */}
      <footer >

      </footer>
    </div >


  )
}
