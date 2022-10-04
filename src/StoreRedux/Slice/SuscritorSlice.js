import { createSlice } from "@reduxjs/toolkit";
const initialState={
    subscritor:{},
    login:false,
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
    }

})
export const { addususcritor,deletesuscrito } =SubscritorSlice.actions;
export default SubscritorSlice.reducer