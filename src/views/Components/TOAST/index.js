import React from "react";
import {Toast} from "react-bootstrap"

const Toast =(props) =>{
    const {setShow,show,estado,message,color}=props
    return(
        <>
        
        <Toast
        onClose={() => setShow(false)} show={show} delay={4000} autohide
        className="top-center"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 4
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