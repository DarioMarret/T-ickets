import React, { useEffect, useState } from 'react';
import { Modal, Container } from 'react-bootstrap';
import { Salircliente } from 'utils/constantes';
import metodos from "../../../assets/Banco_Internacional_Ecuador.png";
import { ReportarDepositoCompra, EnviarmensajeWhastapp } from "../../../utils/Query";
import SweetAlert from 'react-bootstrap-sweetalert';
const Reporte = (props) => {
  const { repShop, handlereportColse,
    setDatoToas, setrepShow, detener, intervalo,
  } = props
  const [codigo, setCodigo] = useState("")
  const [alert, setAlert] = useState(null)
  function handelchange(e) {
    setCodigo(e.target.value)
  }
  async function reportarComprobante() {
    if (codigo.length > 4) {
      try {
        const info = await ReportarDepositoCompra(codigo)
        const mensajes = await EnviarmensajeWhastapp(codigo)
        const { msg } = info
        console.log(info)
        if (msg != null) {
          Salircliente()
          setDatoToas({
            show: true,
            message: 'En breve uno de nuestros colaboradores se comunicar con usted',
            color: 'bg-success',
            estado: 'Se ha Guardado exitosamente su reporte',
          })
          setrepShow(false)
        } else {
          setDatoToas({
            show: true,
            message: 'Hubo un error',
            color: 'bg-success',
            estado: '',
          })
        }

        //console.log(mensajes)
      } catch (error) {
        console.log(error)
      }

    } else {
      setDatoToas({
        show: true,
        message: 'La longitud del código debe ser mayor a 4 dígitos',
        color: 'bg-danger',
        estado: 'Formato ',
      })

    }
  }
  const cerrar = () => {
    setrepShow(false)
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

  return (
    <>
      {alert}
      <Modal
        show={repShop}
        onHide={succesAlert}
        size="lg"
      >
        <Modal.Header  >
          <button type="button" className="close"
            onClick={succesAlert}>
            ×
          </button>

        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="container ">
              <div className='d-flex col-12 justify-content-between align-items-center' >
                <h5 className="modal-title text-center justify-content-center" style={{ fontFamily: 'fantasy', fontSize: '1.2em' }}>Tiempo restante de compra <span className="text-danger" >{intervalo} </span></h5>
                <div><button className='btn btn-primary' onClick={handlereportColse} >  <i className="bi bi-caret-left-fill"></i>  Regresar</button></div>
              </div>
              <div className="d-flex flex-wrap justify-content-center align-items-center" >
                <div className='d-flex flex-column text-center justify-content-center align-items-center'>

                  <h3 className="modal-title pb-3 ">PARA DEPOSITO O TRANSFERENCIA</h3>
                  <img src={metodos} className="img-fluid" style={{ width: '300px' }} alt="" />
                  <h3>Numero de Cuenta</h3>
                  <h3> <strong></strong> </h3>
                </div>



                <div className="d-flex flex-wrap">
                  <div className="col-12 col-sm-6 d-flex flex-column p-3">
                    <select className="form-control " name="banco" defaultValue={"Banco Internacional"} aria-label="Selecione el Banco">
                      <option value="Banco Internacional"> Banco Internacional</option>
                    </select>
                    <label >Numero de Control</label>
                    <input className="form-control" type="text" name="control"
                      value={codigo ? codigo : ''}
                      onChange={(e) => handelchange(e)}
                    />
                  </div>
                  <div className="col-12 col-sm-6 d-flex flex-column p-3 align-items-end" >
                    <h5 >LUEGO DE REALIZAR LA TRANSACCIÓN
                      POR FAVOR REPORTAR EL PAGO
                    </h5>

                    <button className="btn btn-danger col-6 float-end"
                      onClick={reportarComprobante}
                    >
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