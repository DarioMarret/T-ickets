import React from "react";
import {Toast} from "react-bootstrap"

const ViewToas =(props) =>{
    const {
      Toastestado,
      setDatoToas,
    }=props
    return(
        <>
        
        <Toast
        onClose={() => setDatoToas({...Toastestado,show:false})} show={Toastestado.show} delay={10000} autohide
        className="top-center"
        style={{
            position: 'fixed',
            top: 10,
            right: '5%',
            zIndex: 10000,
        }}>
       <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
       <strong className="mr-auto">{Toastestado.estado} </strong>
      <small></small>
    </Toast.Header>
        <Toast.Body className={ Toastestado.color +" text-white"} >{Toastestado.message}</Toast.Body>
        </Toast>
        </>
    )
}
export default ViewToas;