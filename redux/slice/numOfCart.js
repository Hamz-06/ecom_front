import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const numOfCart = createSlice({
    name: 'FavCounter',
    initialState,
    reducers: {
        incrementCart: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrementCart: (state) => {
            state.value -= 1
        },
        setValueCart: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementCart, decrementCart, setValueCart } = numOfCart.actions

export default numOfCart.reducer