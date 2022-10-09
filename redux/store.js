import { configureStore } from '@reduxjs/toolkit'
import numOfFav from './slice/numOfFav'
export const store = configureStore({
    reducer: {
        numOfFav: numOfFav,
    },
})