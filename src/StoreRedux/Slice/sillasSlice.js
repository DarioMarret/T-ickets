import { createSlice } from "@reduxjs/toolkit";
const initialState={
      sillasSelecionadas:[],
    }

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
        clearSillas:(state,action)=>{
            state.sillasSelecionadas=[]
        }      
    }

})
export const { addSillas ,deleteSillas,clearSillas} =sillasSlice.actions;
export default sillasSlice.reducer