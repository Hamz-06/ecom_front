import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { addToFav, fetchFav, removeFromFav } from "../../util/favProducts";
import { useDispatch } from "react-redux";
import { decrementFav, incrementFav } from "../../redux/slice/numOfFav";
const FavCard = ({ item, index, items }) => {
    const prodctNameClear = item.productName.replace(/\s/g, "");
    const productId = item.productID;
    const [isLike, setLike] = useState(false);
    const likeButton = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const favourites = fetchFav();
        favourites?.map((fav) => {
            fav.productID === item.productID ? setLike(true) : "";
        });
    }, []);
    const addToFavourite = () => {
        setLike(!isLike);

        const prod = {
            productName: item.productName,
            price: item.price,
            productID: item.productID,
            priceID: item.priceID,
            picture: item.picture,
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
    const updatePrice = () => {
        const priceOfProd = (item.price / 100).toFixed(2);
        return "£" + priceOfProd;
    };
    return (
        <div
            className="md:w-80 w-96 h-[430px] hover:bg-white hover:outline hover:outline-black bg-slate-100
             shadow-md mt-5 mb-5 ml-5 mr-5 p-2 relative"
            onClick={(e) =>
                likeButton.current.contains(e.target)
                    ? addToFavourite()
                    : router.push(`/category/product/${prodctNameClear}-${productId}`)
            }

        >

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

                    <Image src={item.picture} width={400} height={400} />

                }
            </div>
            {/* title  */}
            <p className="font-semibold">
                {item.productName}
                {/* <span className="text-red-600 font-bold">{metaData.info}</span> */}
            </p>

            <p>
                Click me
            </p>
            <p>
                go to checkout
            </p>

            {/* price  */}
            <div>
                <p className="absolute bottom-0 mb-2 text-lg font-semibold">
                    {updatePrice()}
                </p>
            </div>
        </div>

    )

}

export { FavCard }