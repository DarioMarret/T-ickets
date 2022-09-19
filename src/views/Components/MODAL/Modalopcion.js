import React, { useEffect, useState } from 'react';
import {Modal} from "react-bootstrap";
import visa from "../../../assets/imagen/visa.png"
import metodos from "../../../assets/imagen/todas-tc.png"


const Deposito =(props)=>{
  const {opsShow} = props;
    return(
        <>
        <Modal 
        show={opsShow}
        >
 <Modal.Header closeButton >
                    
                    </Modal.Header>
                    <Modal.Body>
        <div className="container ">
    <div className="d-flex flex-wrap justify-content-center align-items-center pt-5" >
      <h5>Escoja la opcion deseada</h5>
     <div className="container d-flex flex-column p-3">
        <a className="col-12  d-flex  p-3 list-group-item" href="#">
          
          <h5 className='px-3'>Payphome</h5>
          <img src={visa} alt=""/>
        </a>
        <a className="col-12  d-flex flex-wrap  p-3 list-group-item" href="#">
          
          <h5 className='px-3 ' >PagoMedio</h5>
          <img src={metodos} alt=""/>
        </a>
        
      </div>
    </div>

  </div>

  </Modal.Body>
            
        </Modal>

        </>
    )

}



export default Deposito;