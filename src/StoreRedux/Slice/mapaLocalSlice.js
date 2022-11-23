import { createSlice } from "@reduxjs/toolkit";
import { seleccionmapa } from "utils/constantes";
let idseleccion = sessionStorage.getItem(seleccionmapa)
const initialState = {
    pathmap: [],
    localidades: [],
    localidadespecica: [],
    nombre: '',
    typo: '',
    precio: {},
}
const sorter = (a, b) => a.fila > b.fila ? 1 : -1;
const mapaLocalSlice = createSlice({
    name: 'mapaLocalSlice',
    initialState,
    reducers: {
        cargarmapa: (state, action) => {
            state.pathmap = action.payload
        },
        settypo: (state, action) => {
            state.nombre = action.payload.nombre;
            state.typo = action.payload.typo;
            state.precio = action.payload.precio;
        },
        clearmapa: (state, action) => {
            state.sillasSelecionadas = []
        },
        cargalocalidad: (state, action) => {
            state.localidades = action.payload
        },
        filtrarlocali: (state, action) => {
            state.localidadespecica = action.payload
        },
        filteridlocalidad: (state, action) => {
            let consulta = state.localidades[state.localidades.findIndex(e => e.id == action.payload.id)].mesas_array = action.payload.mesas
            //console.log(consulta)
            state.localidades = [...state.localidades, consulta]
        },
        clearMapa: (state, action) => {
            state.pathmap = []
            state.localidades = []
            state.localidadespecica = []
            state.nombre = ''
            state.precio = {}
        }
    }

})
export const { cargarmapa, settypo, filteridlocalidad, clearmapa, cargalocalidad, filtrarlocali, clearMapa } = mapaLocalSlice.actions;
export default mapaLocalSlice.reducer  