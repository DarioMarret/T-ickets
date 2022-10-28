import { createSlice } from "@reduxjs/toolkit";
const initialState={
      sillasSelecionadas:[],
    }
    const sorter = (a, b) => a.fila > b.fila? 1 : -1 ;
const  sillasSlice = createSlice({
    name:'sillasSlice',
    initialState,
    reducers:{
        addSillas:(state,action)=>{           
            state.sillasSelecionadas=[...state.sillasSelecionadas,action.payload]
        },
        deleteSillas:(state,action)=>{
            state.sillasSelecionadas= state.sillasSelecionadas.filter((item)=>item.silla != action.payload.silla);
        },  
        setSilas:(state,action)=>{
            let copia = state.sillasSelecionadas.findIndex((item)=>item.silla==action.payload.silla);
            state.sillasSelecionadas[copia] = action.payload;
        },
        clearSillas:(state,action)=>{
            state.sillasSelecionadas=[]
        }      
    }

})
export const { addSillas ,deleteSillas,clearSillas} =sillasSlice.actions;
export default sillasSlice.reducer