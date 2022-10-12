const removeFromFav = (prod) => {

    const getFav = fetchFav()
    const newFav = getFav.filter((fav) => fav.productID !== prod.productID)
    // console.log(getFav[0].productID, prod.productID)
    window.localStorage.setItem('FAVOURITE', JSON.stringify(newFav))
}
//fetch fav
const fetchFav = () => {
    const getFav = JSON.parse(window.localStorage.getItem('FAVOURITE'))
    return getFav

}

//add to fav
const addToFav = (prod) => {
    const getFav = fetchFav()


    if (getFav) {
        const isValueFound = getFav.some((fav) => fav.productName === prod.productName)
        if (!isValueFound) {
            getFav.push(prod)
            window.localStorage.setItem('FAVOURITE', JSON.stringify(getFav))
        }
    } else if (!getFav) {
        const getFavArr = []
        getFavArr.push(prod)
        window.localStorage.setItem('FAVOURITE', JSON.stringify(getFavArr))

    }

}

export { addToFav, fetchFav, removeFromFav } 