import { createSlice } from "@reduxjs/toolkit";
const initialState={
      pathmap:[],
      localidades:[],
      localidadespecica:[],
      nombre:'',
      typo:'',
      precio:{},
    }
    const sorter = (a, b) => a.fila > b.fila? 1 : -1 ;
const  mapaLocalSlice = createSlice({
    name:'mapaLocalSlice',
    initialState,
    reducers:{
        cargarmapa:(state,action)=>{           
            state.pathmap=action.payload
        },
        settypo:(state,action)=>{
            state.nombre= action.payload.nombre;
            state.typo=  action.payload.typo;
            state.precio= action.payload.precio;
        },
        clearmapa:(state,action)=>{
            state.sillasSelecionadas=[]
        },
        cargalocalidad:(state,action)=>{
            state.localidades=action.payload
        },   
        filtrarlocali:(state,action)=>{
            state.localidadespecica= action.payload
        },
    }

})
export const { cargarmapa,settypo,clearmapa,cargalocalidad,filtrarlocali} =mapaLocalSlice.actions;
export default mapaLocalSlice.reducer  