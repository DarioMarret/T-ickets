import { configureStore } from "@reduxjs/toolkit";
import SuscritorSlice from "./Slice/SuscritorSlice";
import ToastSlice from "./Slice/ToastSlice";
import sillasSlice from "./Slice/sillasSlice";
import mapaLocalSlice from "./Slice/mapaLocalSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { sawerg } from "./Slicequery/querySlice";
export const store = configureStore({
    reducer: {
        SuscritorSlice: SuscritorSlice,
        ToastSlice: ToastSlice,
        sillasSlice: sillasSlice,
        mapaLocalSlice, mapaLocalSlice,
        [sawerg.reducerPath]:sawerg.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(sawerg.middleware),
})
//setupListeners(store.dispatch)