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

        <Toast
            onClose={cerrar} show={selector.show} delay={16500} autohide

            className="top-center"
            style={{
                position: 'fixed',
                top: 80,
                right: 2,
                transform: 'translate(-50 %, 0 %)',
                zIndex: 100000,
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
    </>)
}
export default ToastViews