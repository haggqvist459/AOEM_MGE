import { configureStore } from "@reduxjs/toolkit";
import dayOneReducer from './dayOneSlice'; 

export const store = configureStore({
    reducer: {
        dayOne: dayOneReducer, // register reducers 
    }
})

export default store