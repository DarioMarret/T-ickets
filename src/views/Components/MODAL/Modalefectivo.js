import React, { useEffect, useState } from 'react';
import {Modal} from "react-bootstrap";
import {ReportarEfectivoCompra,EnviarmensajeWhastapp} from "../../../utils/Query";

const ModalEfectivo =(props)=>{
  const {efectShow,handleefectivoClose,handleClosefectivo,
    setDatoToas
  } =props;
   
   async  function  Guardarcompraefectivo(){
        try {
         
      //  const data =await ReportarEfectivoCompra()
       //  const {success} =data
         const mensaje =await ReportarEfectivoCompra()
         const {message} =mensaje
        
         //handleefectivoClose()
       console.log(mensaje)
        if(message!=null){
          handleClosefectivo()
        //setShow(true)
        setDatoToas({ 
          message:'En breve uno de nuestros colaboradores se comunicará con usted',
          color:'bg-success',
          estado:""+message,
        })}
       
         //console.log(data)
        } catch (error) {
          console.log(error)
          console.log(error)
          
        }
      
    }
    useEffect(()=>{
    },[efectShow])
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
                      <h6 > <i className="fa fa-map "> </i> <strong> Mall del SOL</strong>  </h6>                        
                      </div>
                      <div className="col-12  d-flex  p-1">                        
                        <h6 > <i className="fa fa-map "> </i> <strong> Mall del SUR</strong> </h6>                        
                      </div>
                      <div className="col-12  d-flex  p-1">                        
                        <h6 > <i className="fa fa-map "> </i> <strong> De Mujeres </strong></h6>                        
                      </div>
                      <div className="col-12  d-flex  p-1">
                        
                        <button className="btn btn-primary col-12"  
                        onClick={Guardarcompraefectivo}
                        >QUIERO QUE ME LLAME UN VENDEDOR</button>
                        
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