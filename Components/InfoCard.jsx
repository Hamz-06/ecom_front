import { colors } from "@react-spring/shared";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect, memo } from "react";
import { useSpring, animated } from "react-spring";

const InfoCard = ({ title, image, firstPara, secondPara, refPage }) => {
  const infoCard = useRef();
  const [belowSecTwo, updateBelowSecTwo] = useState(false);
  //moves up the page- creates nice swipe animation
  //runs once
  const style = useSpring({
    from: {},
    to: {
      y: belowSecTwo ? 0 : 600,
    },
    delay: 0,
  });

  useEffect(() => {
    //observer runs once threshold reaches 50 percent
    const observer = new IntersectionObserver(
      (entries) => {
        //if we cross 50 percent of the page create swipe animation
        entries.forEach((entry) => {
          //below sec by 50 percent two create swipe up

          if (entry.intersectionRatio >= 0.65) {
            updateBelowSecTwo(true);
          } else {
            updateBelowSecTwo(false);
          }
        });
      },
      {
        threshold: 0.65,
      }
    );
    //observes the page we are on div
    observer.observe(refPage.current);
  }, []);

  return (
    <animated.div
      ref={infoCard}
      className="h-4/5 w-4/5 text-black flex items-center flex-col bg-white shadow-lg rounded-3xl p-5 md:w-4/5 md:shadow-none md:rounded-none md:bg-inherit"
      style={{ ...style }}>
      {/* title */}
      <div className="text-4xl mt-3">{title}</div>
      {/* image */}
      {/* <div>image</div> */}
      {/* first paragraph */}
      <div className="mt-3">{firstPara}</div>
      <div className="mt-3">{secondPara}</div>
    </animated.div>
  );
};
const InfoCards = memo(InfoCard);
export { InfoCards };
