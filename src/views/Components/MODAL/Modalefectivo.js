import React, { useEffect, useState } from 'react';
import {Modal} from "react-bootstrap";


const ModalEfectivo =(props)=>{
  const {efectShow,handleefectivoClose,handleClosefectivo} =props;
    return(
        <>
        <Modal 
        show={efectShow}
        onHide={handleefectivoClose}
        >       
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
        <div className="container pt-5">
              <div className="d-flex flex-column " >
                <h3 className='text-center'> Puede terminar la compra en: </h3>
                  <div className="container d-flex flex-column p-3">
                  <div className="col-12  d-flex  p-1">                    
                      <h6 > <i className="fa fa-map "> </i> <strong>Mall del SOL</strong>  </h6>                        
                      </div>
                      <div className="col-12  d-flex  p-1">                        
                        <h6 > <i className="fa fa-map "> </i> <strong>Mall del SUR</strong> </h6>                        
                      </div>
                      <div className="col-12  d-flex  p-1">                        
                        <h6 > <i className="fa fa-map "> </i> <strong>De Mujeres </strong></h6>                        
                      </div>
                      <div className="col-12  d-flex  p-1">
                        
                        <button className="btn btn-primary col-12">QUIERO QUE ME LLAME UN VENDEDOR</button>
                        
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