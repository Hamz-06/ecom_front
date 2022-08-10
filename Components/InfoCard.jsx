import { colors } from '@react-spring/shared'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

export function InfoCard({ title, image, firstPara, secondPara, refPage }) {
    const infoCard = useRef()
    const [belowSecTwo, updateBelowSecTwo] = useState(false)
    //moves up the page- creates nice swipe animation
    //runs once 
    const style = useSpring({
        from: {
        },
        to: {
            y: belowSecTwo ? 0 : 600,
            color: '#8fa523'
        },
        delay: 0
    })

    useEffect(() => {
        //observer runs once threshold reaches 50 percent 
        const observer = new IntersectionObserver((entries) => {

            //if we cross 50 percent of the page create swipe animation
            entries.forEach((entry) => {
                //below sec by 50 percent two create swipe up
                if (entry.intersectionRatio >= 0.5) {

                    updateBelowSecTwo(true)
                }else{
                    updateBelowSecTwo(false)
                }
            })

        }, {
            threshold: 0.5
        })
        //observes the page we are on div 
        observer.observe(refPage.current)

    }, [])

    return (
        <animated.div ref={infoCard} className='h-96 w-96 md:w-60 lg:w-80 bg-white shadow-lg rounded-3xl p-5'
            style={{ ...style }}>
            {/* title */}
            <div className="text-4xl">
                {title}
            </div>
            {/* image */}
            <div>
                image
            </div>
            {/* first paragraph */}
            <div>
                {firstPara}
            </div>


        </animated.div>
    )
}
