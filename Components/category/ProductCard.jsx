import React, { memo } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { animated, useSpring } from "react-spring";
import Image from "next/image";
import { useRef } from "react";
import Router, { useRouter } from "next/router";
import { addToFav, fetchFav, removeFromFav } from "../../util/favProducts";
import { useDispatch } from "react-redux";
import { decrementFav, incrementFav } from "../../redux/slice/numOfFav";

const Products = ({ product, displayInfo }) => {
  const props = useSpring({
    // from: {
    //   y: -400
    // },
    // to: {
    //   y: 0
    // }
  });
  const { type } = displayInfo;
  const dispatch = useDispatch();
  const metaData = product.metadata;
  const [isHover, setHover] = useState(false);
  const [isLike, setLike] = useState(false);
  const [displayImage, updateDisplayImage] = useState(
    product?.images[0] !== undefined ? product?.images[0] : ""
  );
  const likeButton = useRef();
  const router = useRouter();
  const prodctNameClear = product.name.replace(/\s/g, "");
  const productId = product.product;
  //loop through every product

  // const productOptions = product.options

  // productOptions.map((productOption) => {
  //   const variantName = productOption.name
  //   const varientValues = productOption.values
  //   // console.log(varientValues)
  //   // const contains = varientValues.map((varientVal) => {
  //   //   if (varientVal.value === color || varientVal.value === size) {
  //   //     return {true:varientVal.value }
  //   //   } else { return {false:varientVal.value}  }
  //   // })

  //   // console.log(contains)
  //   const correct = varientValues.filter((val) => {

  //     // console.log(val.value,color)
  //     const isSize = size.includes(val.value)
  //     const isColor = color.includes(val.value)
  //     return isSize || isColor
  //     // console.log(isColor,val.value, index)
  //   })

  //   console.log('')
  //   console.log(correct, variantName, index)

  // })
  // useEffect(()=>{
  //   product.images[0]?.src !== undefined ?
  //   updateDisplayImage(product.images[0].src):updateDisplayImage('')
  // },[])

  useEffect(() => {
    // console.log(product);
  }, []);
  const addToFavourite = () => {
    setLike(!isLike);
    const prod = {
      productName: product.name,
      price: product.unit_amount,
      productID: product.product,
      priceID: product.id,
      picture: product.images[0],
    };
    if (!isLike) {
      console.log("add to fav");
      addToFav(prod);
      dispatch(incrementFav());
    } else {
      console.log("remove from fav");
      removeFromFav(prod);
      dispatch(decrementFav());
    }
  };
  useEffect(() => {
    const favourites = fetchFav();
    favourites?.map((fav) => {
      fav.productID === product.product ? setLike(true) : "";
    });
  }, []);

  //update Price and add currency sign
  const updatePrice = () => {
    const priceOfProd = (product.unit_amount / 100).toFixed(2);
    return "£" + priceOfProd;
  };
  //display second image on hover
  useEffect(() => {
    //if hover display second image

    if (isHover) {
      if (product?.images[1]) {
        updateDisplayImage(product.images[1]);
      }
    } else {
      if (product?.images[0]) {
        updateDisplayImage(product.images[0]);
      }
    }
  }, [isHover]);

  //http://localhost:3000/category/product/lol

  return metaData.type === type || type === "" ? (
    // <Link href={!isLike?`/category/product/${prodctNameClear}-${productId}`:{}}>
    <animated.div
      style={props}
      className="md:w-80 w-96 h-[430px] bg-gray-400 shadow-md mt-5 mb-5 ml-5 mr-5 p-2 relative"
      onClick={(e) =>
        likeButton.current.contains(e.target)
          ? addToFavourite()
          : router.push(`/category/product/${prodctNameClear}-${productId}`)
      }
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {/* Favourites    */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLike ? "red" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        ref={likeButton}
        className={`w-9 h-9 top-0 right-0 absolute rounded-full p-1 mt-3 mr-3 z-10 bg-white`}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <div className="w-[304px] h-[304px] ml-auto mr-auto">
        {
          displayImage !== "" ? (
            <Image src={displayImage} width={400} height={400} />
          ) : (
            ""
          ) //fix this
        }
      </div>
      {/* title  */}
      <p className="font-semibold">
        {product.name} {metaData.info ? "-" : ""}{" "}
        <span className="text-red-800">{metaData.info}</span>
      </p>

      {/* type */}
      <p>{metaData.type}</p>

      {/* size */}
      {metaData.size}

      {/* price  */}
      <div>
        <p className="absolute bottom-0 mb-2 text-lg font-semibold">
          {updatePrice()}
        </p>
      </div>
    </animated.div>
  ) : (
    ""
  );
};

export const Product = memo(Products);
