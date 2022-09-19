import React, { useEffect, useState } from 'react';
import {Modal} from "react-bootstrap";


const ModalEfectivo =()=>{
    return(
        <>
        <Modal>
        


        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
        <div className="container pt-5">
    <div className="d-flex flex-column " >
      <h3> Puede terminar la compra en: </h3>
     <div className="container d-flex flex-column p-3">
        <div className="col-12  d-flex  p-3">
          
          <h6 >Mall del SOL </h6>
          
        </div>
        <div className="col-12  d-flex  p-3">
          
          <h6 >Mall del SUR </h6>
          
        </div>
        <div className="col-12  d-flex  p-3">
          
          <h6 >De Mujeres</h6>
          
        </div>
        <div className="col-12  d-flex  p-3">
          
          <button className="btn btn-primary">QUIERO QUE ME LLAME UN VENDEDOR</button>
          
        </div>
        
      </div>
    </div>

  </div>
        </Modal.Body>
        </Modal>
        </>
    )

}

export default ModalEfectivo;