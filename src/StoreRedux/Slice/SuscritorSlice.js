import { createSlice } from "@reduxjs/toolkit";
let dias = -2
let fin = new Date()
fin.setDate(fin.getDate() + dias);
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
    data: [],
    tiketslist: [],
    ticket: true,
    spiner: true,
    inicio: 0,
    final: 4,
    page: 1,
    tabps: 0,
    labels: [],
    compras: [],
    fecha: [{
        startDate: new Date(JSON.stringify(fin).replace('"', '').replace('"', '')),
        endDate: new Date(),
        key: 'selection'
    }]
}
//JSON.stringify

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
        setdetalle: (state, action) => {
            state.subscritor = { ...action.payload }
        },
        setTabs: (state, action) => {
            state.tabps = action.payload.number
        },
        setLabels: (state, action) => {
            state.labels = action.payload.labels
            state.data = action.payload.labels
        },
        setCompras: (state, action) => {
            state.compras = action.payload.compras
        },
        setPagination: (state, action) => {
            state.inicio = action.payload.inicio,
                state.final = action.payload.final,
                state.page = action.payload.page
        },
        setFecha: (state, action) => {
            state.fecha = action.payload.fecha
        },
        setTicket: (state, actions) => {
            state.tiketslist = actions.payload.tiketslist
        },
        setlisticket: (state, action) => {
            state.ticket = action.payload.ticket
        },
        setSpinersli: (state, action) => {
            state.spiner = action.payload.spiner
        }
    }

})
export const {
    addususcritor, setTicket, setlisticket,
    setLabels, setFecha, setSpinersli, setPagination,
    setCompras, deletesuscrito, setModal, updateboletos,
    setItervalo, addLocalidad, setTabs, deleteloclidad, setdetalle
} = SubscritorSlice.actions;
export default SubscritorSlice.reducer