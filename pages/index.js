import Head from 'next/head'
import Image from 'next/image'
import Header from '../Components/Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useTransition, animated, useSpring } from 'react-spring'
import { InfoCards } from '../Components/InfoCard'
import { useMemo } from 'react'
import { CreateItem } from '../Components/IndexPage_Comp/CreateItem'
export default function Home() {
  const [belowCustom, updateCustom] = useState(false)

  const secTwo_pageOne = useRef()
  const secTwo_pageTwo = useRef()
  const secTwo_pageThird = useRef()
  
  const titleTimer = useRef([])
  const [titles, updateTitle] = useState([])

  const sectionOne = useRef()
  const custom_Word = useRef()
  const rug_Word = useRef()
  const sectionTwo_title = useRef()

  const sectionThree = useRef()
  const sectionThree_shape = useRef()

  // function isMobileScreen() {
  //   if (sectionOne.current.clientWidth <= 640) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const rug_Word_style = useSpring({
    from: {
      x: -700,
    },
    to: {
      x: 0,
      // opacity: !belowCustom ? 1 : 0,
      color: belowCustom ? '#8fa5b6' : '#8fa523',
      y: belowCustom ? (sectionOne.current.clientHeight - rug_Word.current.offsetTop - rug_Word.current.clientHeight)
        + (custom_Word.current.clientHeight + sectionTwo_title.current.clientHeight) : 0,

      // transform: belowCustom ? 'translateY(100%)' : 'translateY(0%)'
    },
  })


  const resetTitle_rug = useCallback(() => {

    titleTimer.current.forEach(clearTimeout)
    titleTimer.current = []
    titleTimer.current.push(setTimeout(() => updateTitle(['Apples']), 200))
    titleTimer.current.push(setTimeout(() => updateTitle(['sadness']), 5000))
    titleTimer.current.push(setTimeout(() => updateTitle(['Bananas']), 8000))

    return () => titleTimer.current.forEach(clearTimeout)
  }, [])



  const transitions = useTransition(belowCustom, {

    from: {

      x: -500,
      opacity: 0,
      transform: 'perspective(600px) rotateX(0deg)',
    }, enter: [

      { x: 0, opacity: 1, },
      { transform: 'perspective(600px) rotateX(180deg)' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: {

      x: 500,
      opacity: 0
    }

  })

  

  //transform:belowCustom?'translateY(100%)':''


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.target === custom_Word.current) {
          if (entry.intersectionRatio >= 0.5) {
            updateCustom(false)
          } else if (entry.intersectionRatio < 0.5) {
            updateCustom(true)
          }
        }
      })

    }, {
      threshold: 0.5
    })

    observer.observe(custom_Word.current)

  }, [])


  useEffect(() => {
    if (belowCustom) {
      resetTitle_rug()
    }
  }, [belowCustom])

  const [translateY, updateTranslateY] = useState()
  const translateYY = useRef()

  useEffect(() => {
    console.log(sectionThree.current.offsetTop)
    
    document.addEventListener('scroll',()=>{
      var sectionThree_height = sectionThree.current.clientHeight
      var sectionThree_offsetTop = sectionThree.current.offsetTop
      var sectionThree_offsetBottom = window.pageYOffset+sectionThree.current.clientHeight
      
      if(sectionThree_offsetTop<sectionThree_offsetBottom ){
        var sectionThree_percent=(sectionThree_offsetBottom-sectionThree_offsetTop)/sectionThree_height
        var shape_height = sectionThree.current.clientHeight*sectionThree_percent*0.75 + 'px'
        var shape_width = sectionThree.current.clientWidth*sectionThree_percent*0.75 + 'px'
        sectionThree_shape.current.style.height = shape_height
        sectionThree_shape.current.style.width = shape_width
        // updateTranslateY(h)
        // sectionThree_shape.current

      }

    })
  }, [])



  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet"></link>

        
      </Head>
      {/* header content */}

      <Header />

      {/* Main Content */}
      <main className='overflow-x-hidden font-internRegular'>

        <section className='flex w-full 
        h-screen md:flex-row-reverse flex-col' ref={sectionOne}>
          {/* <button onClick={()=>updateCustom(!belowCustom)}>Click me</button> */}
          {/* text title */}
          <div className='basis-1/2 flex flex-col items-center md:justify-center md:items-start  
            md:flex-col z-10 relative'>

            <div className='text-center md:text-left mt-20 md:mt-0 text-7xl font-internExtraBold'>
              <p ref={custom_Word} >CUSTOM</p>
              <animated.div style={{ ...rug_Word_style }}
                ref={rug_Word} className='bg-gray-900'>
                Rugs
              </animated.div>
            </div>
            {/* <div className=''>lol</div> */}
            <p className='mt-5 md:mt-10 pl-9 pr-9 text-center md:pl-0 md:text-left'>This is an Example We plan to become the best in the world we have the best website in the world</p>
            <p className='mt-5 md:mt-10 pl-9 pr-9 text-center md:pl-0 md:text-left'>Check out or product line</p>
            <button className='mt-5 md:mt-10 md:text-xl'>Check Us</button>
          </div>

          {/* svg image of guitar */}
          {/* 789 */}
          <div className='-z-10 basis-1/2 flex md:items-center justify-center md:justify-end'>
            <svg height="330" viewBox="0 0 230 208" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_16_4)" filter="url(#filter0_d_16_4)">

                <path d="M78.143 73.1149C79.8225 73.1164 81.384 72.2645 82.0369 70.9026C82.5308 69.8727 82.4842 68.8845 82.1147 68.0373C82.2336 67.994 82.3515 67.9488 82.4732 67.9105C82.2944 67.8467 82.1206 67.7746 81.9469 67.7025C81.3418 66.6412 80.1819 65.871 78.8003 65.6839C77.089 64.0706 76.0372 61.9089 76.0262 59.5297C76.0036 54.6264 80.5231 50.5306 86.0929 50.413C86.1368 50.412 86.1806 50.4113 86.2243 50.4109C88.7184 50.3856 90.981 51.6135 92.2446 53.5061C92.982 54.6105 94.3445 55.3519 95.9056 55.3519C97.1007 55.3519 98.1789 54.917 98.9496 54.2176C100.629 52.6936 102.731 51.5596 105.111 51.2117C106.673 50.9833 108.29 50.8971 109.945 50.9695C121.272 51.465 131.017 60.3002 131.259 70.2789C131.528 81.3931 121.372 90.4772 108.805 90.4772C102.265 90.4772 96.3819 88.0161 92.2787 84.0901C90.457 82.3472 87.9042 81.3708 85.2135 81.395C85.1861 81.3952 85.1587 81.3954 85.1312 81.3954C80.7731 81.3954 77.2401 78.286 77.2401 74.4504C77.2401 74.2377 77.2521 74.0276 77.2747 73.8202C77.3168 73.4323 77.7003 73.1145 78.143 73.1149L78.143 73.1149Z" fill="#6C63FF" />
                <path d="M40.8196 55.4855L39.9091 54.6841C39.9091 54.6841 35.9635 53.0814 35.9635 52.8143C35.9635 52.6471 30.1373 50.9103 25.7783 49.6342C23.3438 48.9215 20.7729 50.3318 20.4262 52.569L19.88 56.0945C19.5534 58.2025 21.3606 60.0999 23.776 60.185L34.446 60.5606L39.6056 59.4921L40.8196 55.4855V55.4855Z" fill="#6C63FF" />
                <path d="M166.256 10.3984L143.327 15.8801L146.663 28.9743C145.585 28.3372 144.287 27.9648 142.89 27.9648C139.145 27.9648 136.109 30.6368 136.109 33.9327C136.109 37.2286 139.145 39.9005 142.89 39.9005C146.635 39.9005 149.671 37.2286 149.671 33.9327C149.671 32.7871 149.298 31.7207 148.662 30.8119L146.017 20.4304L165.798 14.9571L167.607 22.6903C166.521 22.0402 165.21 21.6596 163.798 21.6596C160.053 21.6596 157.017 24.3315 157.017 27.6274C157.017 30.9234 160.053 33.5953 163.798 33.5953C167.543 33.5953 170.579 30.9234 170.579 27.6274C170.579 26.4696 170.198 25.3925 169.55 24.4775L166.256 10.3984V10.3984Z" fill="#6C63FF" />
                <path d="M188.744 22.6387C185.037 22.6387 182.033 25.2829 182.033 28.5446C182.033 29.4666 182.28 30.3358 182.708 31.1134L186.538 45.0177L188.712 44.5539L185.758 33.8278C186.658 34.2227 187.669 34.4505 188.744 34.4505C192.45 34.4505 195.454 31.8063 195.454 28.5446C195.454 25.2829 192.45 22.6387 188.744 22.6387Z" fill="#6C63FF" />
                <path d="M216.052 53.2836L212.25 39.9005L209.942 40.378L212.916 50.8461C212.001 50.4816 210.985 50.2721 209.908 50.2721C205.974 50.2721 202.784 52.9941 202.784 56.3519C202.784 59.7096 205.974 62.4316 209.908 62.4316C213.843 62.4316 217.033 59.7096 217.033 56.3519C217.033 55.2313 216.672 54.185 216.052 53.2836Z" fill="#6C63FF" />
                <path d="M100.162 196.753L94.9462 196.753L92.465 179.047L100.163 179.047L100.162 196.753Z" fill="#A0616A" />
                <path d="M82.2918 196.649C82.1294 196.89 82.0437 197.667 82.0437 197.947C82.0437 198.807 82.8363 199.505 83.814 199.505H99.967C100.634 199.505 101.175 199.029 101.175 198.442V197.85C101.175 197.85 101.974 196.071 100.329 193.879C100.329 193.879 98.2839 195.595 95.2286 192.906L94.3276 191.47L87.8058 195.668L84.1908 196.059C83.3999 196.145 82.6987 196.046 82.2919 196.649H82.2918V196.649Z" fill="#2F2E41" />
                <path d="M76.7923 196.753L71.5764 196.753L69.0952 179.047L76.7933 179.047L76.7923 196.753Z" fill="#A0616A" />
                <path d="M58.922 196.649C58.7596 196.89 58.6739 197.667 58.6739 197.947C58.6739 198.807 59.4665 199.505 60.4442 199.505H76.5972C77.2641 199.505 77.8049 199.029 77.8049 198.442V197.85C77.8049 197.85 78.6039 196.071 76.9588 193.879C76.9588 193.879 74.9141 195.595 71.8588 192.906L70.9578 191.47L64.4359 195.668L60.821 196.059C60.0301 196.145 59.3289 196.046 58.9221 196.649H58.922V196.649Z" fill="#2F2E41" />
                <path d="M100.61 85.6692L105.466 96.6208L101.672 184.1H91.0496L81.4892 105.168L79.2129 184.367L68.8937 184.1L57.6641 96.2201L65.0999 88.3403L100.61 85.6692Z" fill="#2F2E41" />
                <path d="M77.6954 23.5655L90.4425 22.7641L94.3881 28.3735L106.225 31.3117L101.824 58.4237L106.528 98.8913C106.528 98.8913 89.532 96.7544 88.318 101.028C87.104 105.302 57.3606 96.7544 57.3606 96.7544L67.528 69.1082L66.6174 47.4721L63.8859 34.9178L76.3296 29.8426L77.6954 23.5655V23.5655Z" fill="#E6E6E6" />
                <path d="M71.9288 31.5788C71.9288 31.5788 61.7709 31.4453 60.4004 35.1849C59.0298 38.9244 54.4773 64.8344 54.4773 64.8344L50.987 76.1867L66.6174 69.3753L63.2789 64.8417L74.2051 46.4036L71.9288 31.5788H71.9288Z" fill="#E6E6E6" />
                <path d="M115.482 67.2384L39.9091 54.6841L39.6056 59.4921L114.571 75.2518L115.482 67.2384Z" fill="#6C63FF" />
                <path d="M115.33 68.7075L115.51 68.0421L39.8892 55.3185L39.7573 56.1532L115.33 68.7075Z" fill="#3F3D56" />
                <path d="M115.157 69.9711L115.33 69.2418L39.807 56.6356L39.7573 57.4888L115.157 69.9711Z" fill="#3F3D56" />
                <path d="M114.983 71.4853L115.026 70.3102L39.7477 57.5944L39.7573 58.2901L114.983 71.4853Z" fill="#3F3D56" />
                <path d="M114.782 73.244L114.723 72.18L39.6379 58.5531L39.5733 58.8139L114.782 73.244Z" fill="#3F3D56" />
                <path d="M114.78 74.3104L114.723 73.5156L39.7508 58.9939L39.6835 59.2543L114.78 74.3104Z" fill="#3F3D56" />
                <path d="M71.3552 29.8758L75.1156 28.0433L76.7466 57.3552L76.1778 60.9612C76.1778 60.9612 66.6844 37.9224 71.3552 29.8758H71.3552Z" fill="#3F3D56" />
                <path d="M84.2207 20.7608C89.417 20.7608 93.6293 17.0535 93.6293 12.4803C93.6293 7.9071 89.417 4.1998 84.2207 4.1998C79.0245 4.1998 74.8121 7.9071 74.8121 12.4803C74.8121 17.0535 79.0245 20.7608 84.2207 20.7608Z" fill="#A0616A" />
                <path d="M76.1778 17.4219L78.4271 19.0022L75.8743 10.4769C75.8743 10.4769 83.0067 10.3434 83.6137 6.87091C83.6137 6.87091 89.2285 6.73736 90.7461 6.73736C92.2636 6.73736 92.9483 15.5746 92.9483 15.5746C92.9483 15.5746 95.9056 8.34003 92.8706 4.60045C89.8355 0.860874 90.8978 3.13134 90.2908 1.79577C89.6838 0.460208 83.4619 -0.768092 79.5164 0.593764C75.5708 1.95562 75.4191 3.89692 74.2051 3.9148C72.9911 3.93267 68.742 9.27493 72.6875 13.5487C76.6331 17.8225 76.1778 17.4219 76.1778 17.4219V17.4219Z" fill="#2F2E41" />
                <path d="M104.922 71.7603C106.037 70.9772 106.859 70.0373 107.322 69.1083L118.481 62.2386L114.611 57.661L103.708 65.1225C102.576 65.3136 101.353 65.8102 100.237 66.5933C97.6897 68.3823 96.6731 70.9893 97.9667 72.4161C99.2603 73.843 102.374 73.5493 104.922 71.7603V71.7603Z" fill="#A0616A" />
                <path d="M62.1696 61.3108C61.3422 62.3336 60.8458 63.4361 60.6908 64.4414L52.1087 73.7471L57.2594 77.2116L65.4106 67.3989C66.4392 66.9411 67.4606 66.1676 68.2881 65.1447C70.1785 62.808 70.3412 60.0555 68.6517 58.9968C66.9621 57.9381 64.06 58.9741 62.1696 61.3108L62.1696 61.3108Z" fill="#A0616A" />
                <path d="M101.369 33.048C101.369 33.048 104.1 29.0413 106.832 31.4453C108.993 33.3476 120.847 45.4524 125.7 50.4221C127.039 51.7926 127.774 53.5387 127.774 55.3459C127.774 58.1412 126.02 60.7081 123.215 62.0191L108.046 69.1082L103.797 63.4988L116.847 55.2183L96.8161 45.6023L101.369 33.048V33.048Z" fill="#E6E6E6" />
                <path d="M53.4031 69.9711L50.987 76.1867L57.9676 79.392L63.2789 76.1867L66.6175 69.3753L56.7536 66.8377" fill="#E6E6E6" />

              </g>
              <defs>
                <filter id="filter0_d_16_4" x="0" y="0" width="230" height="208" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_16_4" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_16_4" result="shape" />
                </filter>
                <clipPath id="clip0_16_4">
                  <rect width="222" height="200" fill="white" transform="translate(4)" />
                </clipPath>
              </defs>
            </svg>
          </div>
          {/* background box image */}
          <div className='w-full h-full absolute flex items-center justify-center'>
            <div className='h-80 w-80 md:h-96 md:w-96 absolute bg-lime-300 
           -z-20'>
            </div>

          </div>
        </section>

        {/* section two */}
        <section className='h-screen'>
          <div className='flex h-full flex-col '>

            <div className='text-7xl h-48 md:h-60 bg-orange-800'>
              {/* changing title for section two */}

              <div className='h-20 md:h-24' ref={sectionTwo_title}>

                {transitions((styles, belowCustom) => {
                  return belowCustom && (<animated.div style={styles}
                    className='text-7xl text-center md:text-8xl md:p-5 p-2'>

                    <p className='text-7xl'>{titles}</p>
                  </animated.div>)
                })}
              </div>

            </div>
            {/* three differnt boards  */}
            <div className="basis-full bg-lime-300 grid grid-flow-col
             overflow-x-auto overscroll-x-inline-contain snap-mandatory snap-x
             overflow-y-hidden">


              <div ref={secTwo_pageOne} className='w-screen md:w-full h-full bg-pink-200 snap-start
                flex items-center justify-center' >
                <InfoCards
                  title={'Welcome'}
                  image={''}
                  firstPara={'hello this is good because'}
                  secondPara={'this is not real'}
                  refPage={secTwo_pageOne}
                />

              </div>

              <div ref={secTwo_pageTwo} className='w-screen md:w-full h-full bg-pink-600 snap-start
                flex items-center justify-center'>
                <InfoCards
                  title={'Welcome'}
                  image={''}
                  firstPara={'hello this is good because'}
                  secondPara={'this is not real'}
                  refPage={secTwo_pageTwo}
                />

              </div>

              {/* <div ref={secTwo_pageThird} className='w-screen md:w-full h-full bg-green-200 snap-start
                flex items-center justify-center'>

                <InfoCards
                  title={'Welcome'}
                  image={''}
                  firstPara={'hello this is good because'}
                  secondPara={'this is not real'}
                  refPage={secTwo_pageThird}
                />
              </div> */}
            </div>
          </div>
        </section>

        <section>

          <div ref={sectionThree} className='w-screen h-screen bg-red-600 flex items-center justify-center'>
            {
              
            }
            <div ref={sectionThree_shape} className='h-10 bg-blue-400 w-10 rounded'></div>
              
                

          </div>

        </section>

        <section>
          <div className="bg-black w-screen h-screen"></div>
        </section>



        {/* follow buttons bottom right */}
        {
          // useMemo(
          //   () => {
          //     return (
          //       <section>
          //         <div className="fixed bottom-0 right-0 mr-5 mb-5 w-20 h-36 bg-orange-500 flex flex-col
          //             items-center justify-evenly">
          //           {/* <FacebookLogo height={5}/> */}

          //           <FontAwesomeIcon icon={faFacebook} className='h-14' />
          //           <FontAwesomeIcon icon={faTwitter} className='h-14' />

          //         </div>
          //       </section>)
          //   },
          //   [],
          // )
        }
      </main>


      {/* footer content */}
      <footer >

      </footer>
    </div>
  )
}
