import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../products/productSlice"
const store=configureStore({
    reducer:{
        product:ProductReducer
    }
})

export default store;
