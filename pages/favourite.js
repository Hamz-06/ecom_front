import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../Components/Header";
import { FavCard } from "../Components/FavPage_Comp/createFavCard";

const favourite = () => {
    const [fav, updateFav] = useState()
    useEffect(() => {
        const getFav = JSON.parse(window.localStorage.getItem('FAVOURITE'))

        getFav ? updateFav(getFav) : ''
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex flex-col md:flex-row items-center">
                {/* {JSON.stringify(fav, 5)} */}
                {fav ? fav.map((item, index) => {
                    return <FavCard item={item} index={index} key={index} items={fav} updateItems={updateFav} />
                }) : ''}
            </div>
        </div>
    )
}

export default favourite 