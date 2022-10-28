import { configureStore } from "@reduxjs/toolkit";
import SuscritorSlice from "./Slice/SuscritorSlice";
import ToastSlice from "./Slice/ToastSlice";
import sillasSlice from "./Slice/sillasSlice";
export const store = configureStore({
    reducer:{
        SuscritorSlice:SuscritorSlice,
        ToastSlice:ToastSlice,
        sillasSlice:sillasSlice,
    }
})