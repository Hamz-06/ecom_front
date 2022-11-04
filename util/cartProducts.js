//fetch bag 
export const fetchBag = () => {
    const getBag = JSON.parse(window.localStorage.getItem('BASKET'))
    return getBag
}
//fetch quantity in cart 
export const fetchBagQuantity = () => {
    const getBag = fetchBag()
    var totalQuantity = 0;
    getBag.map((bag) => {
        totalQuantity += bag.quantity
    })
    return totalQuantity
}
//quantity handler 
export const quantityHandler = (e, updQuantity, items, index) => {
    //update text for quantity
    updQuantity(e.target.value)
    //updating the local storage -> no need to update items state
    // console.log(typeof e.target.value)
    items[index].quantity = parseInt(e.target.value)
    //update local storage
    window.localStorage.setItem('BASKET', JSON.stringify(items))
}
//remove items
export const removeItemHandler = (items, updateItems, index) => {
    //update items and local storage 
    const newItems = items.filter((_x, ind) => ind !== index)
    console.log(newItems)
    window.localStorage.setItem('BASKET', JSON.stringify(newItems))
    updateItems(newItems)
    // updateItems(items.splice(index,1))
}
export const addToBag = (prod) => {
    // console.log(prod)

    const getBag = JSON.parse(window.localStorage.getItem('BASKET'))
    console.log(getBag.length)
    // if bag is null create empty arr and push
    if (getBag === null) {
        const bag = []
        bag.push(prod)
        window.localStorage.setItem('BASKET', JSON.stringify(bag))
        // if contenets already inside bag add 
    } else if (getBag.length > 0) {
        getBag.map((bag, index) => {

            if (bag.productName === prod.productName) {
                console.log('found')
                const updatedQuantity = bag.quantity + 1
                getBag[index].quantity = updatedQuantity
                window.localStorage.setItem('BASKET', JSON.stringify(getBag))
            }
            else if (bag.productName !== prod.productName && index === (getBag.length - 1)) {

                console.log('not found')
                getBag.push(prod)
                window.localStorage.setItem('BASKET', JSON.stringify(getBag))

            }
        })
        //rare case if there is arr with length 0 add prod
    } else {
        getBag.push(prod)
        window.localStorage.setItem('BASKET', JSON.stringify(getBag))
    }

}