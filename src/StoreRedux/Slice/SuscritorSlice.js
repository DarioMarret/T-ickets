import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    subscritor: {},
    login: false,
    localidad: {},
    intervalo: "",
    modal: { nombre: '', estado: '' },
    boletos: {
        disponibles: "",
        proceso: "",
        pagados: "",
        inpagos: ""
    }
}

const SubscritorSlice = createSlice({
    name: 'suscritor',
    initialState,
    reducers: {
        addususcritor: (state, action) => {
            state.subscritor = { ...action.payload };
            state.login = true;
        },
        updateboletos: (state, action) => {
            state.boletos = { ...state.boletos, ...action.payload }
        },
        deletesuscrito: (state, action) => {
            state.subscritor = {};
            state.login = false;
        },
        addLocalidad: (state, action) => {
            state.localidad = action.payload;
        },
        deleteloclidad: (state, action) => {
            state.localidad = {}
        },
        setModal: (state, action) => {
            state.modal = { ...action.payload }
        },
        setItervalo: (state, action) => {
            state.intervalo = action.payload.intervalo
        }

    }

})
export const { addususcritor, deletesuscrito, setModal, updateboletos, setItervalo, addLocalidad, deleteloclidad } = SubscritorSlice.actions;
export default SubscritorSlice.reducer