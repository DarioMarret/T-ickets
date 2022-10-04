import { configureStore } from "@reduxjs/toolkit";
import SuscritorSlice from "./Slice/SuscritorSlice";
export const store = configureStore({
    reducer:{
        SuscritorSlice:SuscritorSlice,
    }
})