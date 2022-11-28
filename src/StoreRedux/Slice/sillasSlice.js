import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    sillasSelecionadas: [],
}
const sorter = (a, b) => a.fila > b.fila ? 1 : -1;
function filtrarPodato(obj) {
    if ('id' in obj && typeof (obj.id) === 'number' && !isNaN(obj.id)) {
        return true;
    } else {
        //   entradasInvalidas++;
        return false;
    }
}
const sillasSlice = createSlice({
    name: 'sillasSlice',
    initialState,
    reducers: {
        addSillas: (state, action) => {
            state.sillasSelecionadas = [...state.sillasSelecionadas, action.payload]
        },
        deleteSillas: (state, action) => {
            state.sillasSelecionadas = state.sillasSelecionadas.filter((item) => item.seleccionmapa != action.payload.localidad + "-" + action.payload.silla);
        },
        deleteMesa: (state, action) => {
            state.sillasSelecionadas = state.sillasSelecionadas.filter((item) => item.seleccionmapa != action.payload.localidad)
        },
        setSillas: (state, action) => {
            let copia = state.sillasSelecionadas.findIndex((item) => item.silla == action.payload.silla);
            state.sillasSelecionadas[copia] = action.payload;
        },
        clearSillas: (state, action) => {
            state.sillasSelecionadas = state.sillasSelecionadas.filter((item) => item.localidad != action.payload.localidad);
        },
        cargarsilla: (state, action) => {
            state.sillasSelecionadas = action.payload
        },
        borrarseleccion: (state, action) => {
            state.sillasSelecionadas = state.sillasSelecionadas.filter((item) => item.estado != action.payload.estado);
        }
    }

})
export const { addSillas, deleteSillas, clearSillas, borrarseleccion, cargarsilla, deleteMesa } = sillasSlice.actions;
export default sillasSlice.reducer