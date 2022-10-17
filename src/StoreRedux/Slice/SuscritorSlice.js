import { createSlice } from "@reduxjs/toolkit";
const initialState={
    subscritor:{},
    login:false,
    localidad:{},    
}

const  SubscritorSlice = createSlice({
    name:'suscritor',
    initialState,
    reducers:{
        addususcritor:(state,action)=>{
            state.subscritor={...action.payload};
            state.login=true;
        },
        deletesuscrito:(state,action)=>{
            state.subscritor={};
            state.login=false;            
        },
        addLocalidad:(state,action)=>{
            state.localidad=action.payload;
        },
        deleteloclidad:(state,action)=>{
            state.localidad={}
        }
        
    }

})
export const { addususcritor,deletesuscrito,addLocalidad,deleteloclidad } =SubscritorSlice.actions;
export default SubscritorSlice.reducer