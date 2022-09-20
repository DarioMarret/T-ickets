import React from "react";
import {Toast} from "react-bootstrap"

const ViewToas =(props) =>{
    const {setShow,showToast,estado,message,color}=props
    return(
        <>
        
        <Toast
        onClose={() => setShow(false)} show={showToast} delay={4000} autohide
        className="top-center"
        style={{
            position: 'fixed',
            top: 10,
            right: '5%',
            zIndex: 10000,
        }}>
       <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
      <strong className="mr-auto">{estado} </strong>
      <small></small>
    </Toast.Header>
        <Toast.Body className={ color +" text-white"} >{message}</Toast.Body>
        </Toast>
        </>
    )
}
export default ViewToas;