import React from "react";
import { Toast } from "react-bootstrap";
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch, useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
const ToastViews = () => {
    const usedispatch = useDispatch()
    let selector = useSelector((state) => state.ToastSlice.toastmsg)
    function cerrar() {
        usedispatch(setToastes({ show: false, message: '', color: '', estado: '' }))
    }
    // console.log(selector)

    return (<>
        <div className="  d-flex justify-content-center text-center ">

            <Toast
                onClose={cerrar} show={selector.show} delay={16500} autohide

                className=" "

                style={{
                    position: 'fixed',
                    left: '50%',
                    transform: 'translate(-50 %, -50 %)',

                    zIndex: 10000,
                }}>
                <Toast.Header closeButton={false}>
                    <div className={selector.color + " rounded-3"} style={{ width: '20px', height: '20px', }}></div>
                    <strong className="mr-auto  px-1">{selector.estado} </strong>
                    <small></small>
                    <button type="button" className="close"
                        onClick={cerrar} >
                        ×
                    </button>

                </Toast.Header>
                <Toast.Body className={selector.color + " text-white"} >{selector.message}</Toast.Body>
            </Toast>

        </div>
    </>)
}
export default ToastViews