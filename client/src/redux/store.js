import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import filterReducer from "./slices/filterSlice"
import productReducer from "./slices/productSlice"
export const store=configureStore({
    reducer:{
    user:userReducer,
    filter:filterReducer,
    product:productReducer
    }
})