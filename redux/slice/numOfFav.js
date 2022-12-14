import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const numOfFav = createSlice({
    name: 'FavCounter',
    initialState,
    reducers: {
        incrementFav: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrementFav: (state) => {
            state.value -= 1
        },
        setValueFav: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { incrementFav, decrementFav, setValueFav } = numOfFav.actions

export default numOfFav.reducer