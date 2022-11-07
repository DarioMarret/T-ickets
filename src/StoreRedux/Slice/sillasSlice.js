import { createSlice } from "@reduxjs/toolkit";
const initialState={
      sillasSelecionadas:[],
    }
    const sorter = (a, b) => a.fila > b.fila? 1 : -1 ;
    function filtrarPodato(obj) {
    if ('id' in obj && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
        return true;
    } else {
        entradasInvalidas++;
        return false;
    }
    }
const  sillasSlice = createSlice({
    name:'sillasSlice',
    initialState,
    reducers:{
        addSillas:(state,action)=>{           
            state.sillasSelecionadas=[...state.sillasSelecionadas,action.payload]
        },
        deleteSillas:(state,action)=>{ 
            state.sillasSelecionadas= state.sillasSelecionadas.filter((item)=>item.seleccionmapa != action.payload.localidad+"-"+action.payload.silla );
        },  
        setSillas:(state,action)=>{
            let copia = state.sillasSelecionadas.findIndex((item)=>item.silla==action.payload.silla);
            state.sillasSelecionadas[copia] = action.payload;
        },
        clearSillas:(state,action)=>{
            state.sillasSelecionadas=state.sillasSelecionadas.filter((item)=>item.localidad != action.payload.localidad );
        },
        borrarseleccion:(state,action)=>{
            state.sillasSelecionadas=action.payload.vacio
        }
    }

})
export const { addSillas ,deleteSillas,clearSillas,borrarseleccion} =sillasSlice.actions;
export default sillasSlice.reducer