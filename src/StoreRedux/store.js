import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import SuscritorSlice from "./Slice/SuscritorSlice";
import ToastSlice from "./Slice/ToastSlice";
import sillasSlice from "./Slice/sillasSlice";
import mapaLocalSlice from "./Slice/mapaLocalSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { sawerg } from "./Slicequery/ventasSlice";
export const store = configureStore({
    reducer: {
        SuscritorSlice: SuscritorSlice,
        ToastSlice: ToastSlice,
        sillasSlice: sillasSlice,
        mapaLocalSlice, mapaLocalSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sawerg.middleware),
})
setupListeners(store.dispatch)