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
    },
    tabps:0,
    labels:[]
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
        },
        setdetalle:(state,action)=>{
            state.subscritor = { ...action.payload }
        },
        setTabs:(state,action)=>{
            state.tabps= action.payload.number
        },
        setLabels:(state,action)=>{
            state.labels= action.payload.labels
        }

    }

})
export const { addususcritor,setLabels, deletesuscrito, setModal, updateboletos, setItervalo, addLocalidad,setTabs, deleteloclidad, setdetalle } = SubscritorSlice.actions;
export default SubscritorSlice.reducer