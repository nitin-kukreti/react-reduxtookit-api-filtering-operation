import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../products/productSlice"
// this is store for redux
const store=configureStore({
    reducer:{
        product:ProductReducer
    }
})

export default store;
