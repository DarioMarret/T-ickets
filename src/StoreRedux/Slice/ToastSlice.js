import { createSlice } from "@reduxjs/toolkit";
const initialState={
      toastmsg:{
        show:false,
        message:'',
        color:'',
        estado:'',
      }
}

const  ToastSlice = createSlice({
    name:'ToastSlice',
    initialState,
    reducers:{
        setToastes:(state,action)=>{
            state.toastmsg={...action.payload}
        },
        
    }

})
export const { setToastes } =ToastSlice.actions;
export default ToastSlice.reducer