import React, { useEffect, useState } from 'react';
import {Toast,Modal ,Container} from 'react-bootstrap';
import metodos from "../../../assets/imagen/todas-tc.png"

const Reporte =(props) => {
    const { repShop, handlereportColse } = props
   return (
   <>
    <Modal 
    show={repShop}
                onHide={handlereportColse}
                size="lg"
                >
    <Modal.Header closeButton >
                    
                </Modal.Header>
                <Modal.Body>
                <Container>
                <div className="container ">
    <div className="d-flex flex-wrap justify-content-center align-items-center" >
    <div className='d-flex flex-column text-center justify-content-center align-items-center'>
    <h5 className="modal-title  ">PARA DEPOSITO O TRANSFERENCIA</h5>
    <img src={metodos} className="img-fluid" alt=""/>

    </div>



      <div className="d-flex flex-wrap">
        <div className="col-12 col-sm-6 d-flex flex-column p-3">
          <select className="form-control " name="banco"  aria-label="Selecione el Banco"> 
            <option selected>Seleccione un Banco</option>
            <option value={"Pichincha"}>Pichincha</option>
            <option value={"Guayaquil"}>Guayaquil</option>
            <option value={"Solidarios"}>Solidarios</option>
          </select>
          <label >Numero de Control</label>
          <input className="form-control" type="text" name="control"/>
        </div>
        <div className="col-12 col-sm-6 d-flex flex-column p-3 align-items-end" >
          <h5 >LUEGO DE REALIZAR LA TRANSACCIÓN 
            POR FAVOR REPORTAR EL PAGO
          </h5>

          <button className="btn btn-danger col-6 float-end">
            Reportar Pago
          </button> 

        </div>
        
      </div>
    </div>

  </div>

                </Container>

                </Modal.Body>
    </Modal>
    </>)

}
export default Reporte