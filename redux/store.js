import { configureStore } from '@reduxjs/toolkit'
import numOfFav from './slice/numOfFav'
import numOfCart from './slice/numOfCart'

export const store = configureStore({
    reducer: {
        numOfFav: numOfFav,
        numOfCart: numOfCart
    },
})