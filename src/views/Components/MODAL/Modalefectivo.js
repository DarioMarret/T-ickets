import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { Salircliente } from 'utils/constantes';
import { ReportarEfectivoCompra, EnviarmensajeWhastapp } from "../../../utils/Query";
import SweetAlert from 'react-bootstrap-sweetalert';
const ModalEfectivo = (props) => {
  const { efectShow, handleefectivoClose, efectiOpShow, setDatoToas, intervalo, detener } = props;
  const [alert, setAlert] = useState(null)
  async function Guardarcompraefectivo() {
    try {
      const mensaje = await ReportarEfectivoCompra()
      const numero = await EnviarmensajeWhastapp(null)
      const { msg } = mensaje
      if (msg != null) {
        efectiOpShow(false)
        Salircliente()
        setDatoToas({
          message: 'En breve uno de nuestros colaboradores se comunicará con usted',
          color: 'bg-success',
          estado: "" + msg,
        })
        detener()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const cerrar = () => {
    efectiOpShow(false)
    detener()
    hideAlert()
  }
  const succesAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={"Esta seguro de querer salir  "}
        onConfirm={() => hideAlert()}
        onCancel={() => cerrar()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Completar  Compra"
        cancelBtnText="Anular Compra"

        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel
      >
        Se borraran todos los datos Seleccionados
      </SweetAlert>
    )
  }
  const hideAlert = () => {
    setAlert(null)
  }

  useEffect(() => {
  }, [efectShow])
  return (
    <>
      {alert}
      <Modal
        show={efectShow}
        onHide={succesAlert}
      >
        <Modal.Header >
          <div className='d-flex justify-content-between w-100' >
            <h5 className="modal-title text-center justify-content-center align-items-center" style={{ fontFamily: 'fantasy', fontSize: '1.2em' }}>Tiempo restante de compra <span className="text-danger" >{intervalo} </span></h5>
            <div><button className='btn btn-primary' onClick={handleefectivoClose} >  <i className="bi bi-caret-left-fill"></i> Regresar  </button></div>
          </div>
          <button type="button" className="close "
            onClick={succesAlert}>
            ×
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container pt-5">
            <div className="d-flex flex-column " >


              <h3 className='text-center'> Puede terminar la compra en: </h3>
              <div className="container d-flex flex-column p-3">
                <div className="row  d-flex justify-content-center  border rounded-6 m-1 p-2">
                  <div className='col-4 d-flex justify-content-end align-content-end'>
                    <i className="fa fa-map-marker text-primary"> </i>
                  </div>
                  <div className='col-8 d-flex align-content-end' >
                    <h6 >  <strong> De Mujeres </strong></h6>
                  </div>

                </div>
                <div className="row  d-flex justify-content-center  border rounded-6 m-1 p-2">
                  <div className='col-4 d-flex justify-content-end align-content-end'>
                    <i className="fa fa-map-marker text-primary"> </i>
                  </div>
                  <div className='col-8 d-flex align-content-end' >
                    <h6 >  <strong> De Mujeres </strong></h6>
                  </div>

                </div>
                <div className="row  d-flex justify-content-center  border rounded-6 m-1 p-2">
                  <div className='col-4 d-flex justify-content-end align-content-end'>
                    <i className="fa fa-map-marker text-primary"> </i>
                  </div>
                  <div className='col-8 d-flex align-content-end' >
                    <h6 >  <strong> De Mujeres </strong></h6>
                  </div>

                </div>
                <div className="col-12  d-flex  justify-content-center  p-1 mt-2">

                  <button className="btn btn-primary col-12  "
                    onClick={Guardarcompraefectivo}
                  >QUIERO QUE ME LLAME UN VENDEDOR</button></div>




              </div>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )

}

export default ModalEfectivo;