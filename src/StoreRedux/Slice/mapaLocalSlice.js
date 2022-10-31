import { createSlice } from "@reduxjs/toolkit";
const initialState={
      pathmap:[],
      nombre:'',
      typo:'',
      precio:'',
    }
    const sorter = (a, b) => a.fila > b.fila? 1 : -1 ;
const  mapaLocalSlice = createSlice({
    name:'mapaLocalSlice',
    initialState,
    reducers:{
        cargarmapa:(state,action)=>{           
            state.pathmap=[action.payload]
        },
        settypo:(state,action)=>{
            state.nombre= action.payload.nombre;
            state.typo=  action.payload.typo;
            state.precio= action.payload.precio;
        },
        clearmapa:(state,action)=>{
            state.sillasSelecionadas=[]
        }      
    }

})
export const { cargarmapa,settypo,clearmapa} =mapaLocalSlice.actions;
export default mapaLocalSlice.reducer