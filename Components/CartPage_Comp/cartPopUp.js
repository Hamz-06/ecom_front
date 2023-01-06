import React from "react"
import { useEffect } from "react"
import { memo } from "react"

const PopUp = memo(({ customerName, isPaid, customerEmail }) => {
    //if paid remove from local storage
    useEffect(() => {
        isPaid === 'paid' ? window.localStorage.removeItem("BASKET") : ''
    }, [])

    //CHANGE TO PAID 
    return (isPaid === 'paid') ?
        <div className="w-screen h-screen absolute top-0 flex items-center justify-center ">
            <div className="fixed h-80 w-96 bg-blue-100">
                {customerName} {isPaid}
            </div>
        </div>
        : ''

})
const OrderPlaced = memo(PopUp)
export { OrderPlaced }