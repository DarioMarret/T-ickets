import React from "react";
import { Toast } from "react-bootstrap"

const ViewToas = (props) => {
    const {
        Toastestado,
        setDatoToas,
    } = props
    return (
        <>

            <Toast
                onClose={() => setDatoToas({ ...Toastestado, show: false })} show={Toastestado.show} delay={16000} autohide
                className="top-center"
                style={{
                    position: 'fixed',
                    top: 80,
                    right: 5,
                    transform: 'translate(-50 %, 0 %)',
                    zIndex: 100000,
                }}>
                <Toast.Header closeButton={false}>
                    <div className={Toastestado.color + " rounded-3"} style={{ width: '20px', height: '20px', }}></div>
                    <strong className="mr-auto  px-1">{Toastestado.estado} </strong>
                    <small></small>

                    <button type="button" className="close"
                        onClick={() => setDatoToas({ ...Toastestado, show: false })} >
                        ×
                    </button>

                </Toast.Header>
                <Toast.Body className={Toastestado.color + " text-white"} >  {Toastestado.message}</Toast.Body>
            </Toast>
        </>
    )
}
export default ViewToas;