import React from "react";
import { Toast } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
const ToastViews =() => {
    const usedispatch=useDispatch()
    let selector = useSelector((state)=>state.ToastSlice.toastmsg)
    function cerrar(){
        usedispatch(setToastes({show:false,message:'',color:'', estado:''}))
    }
   // console.log(selector)

    return (<>
    <Toast
        onClose={cerrar} show={selector.show} delay={8000} autohide
        className="top-center"
        style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 10000,
        }}>
       <Toast.Header>
        <div className={selector.color+" rounded-3"} style={{width:'20px',height:'20px',}}></div>
        <strong className="mr-auto  px-1">{selector.estado} </strong>
      <small></small> 
      <button type="button" className="close"
                       onClick={cerrar} >
                        ×
                    </button>

    </Toast.Header>
        <Toast.Body className={ selector.color +" text-white"} >{selector.message}</Toast.Body>
        </Toast>
    
    </>)
}
export default ToastViews