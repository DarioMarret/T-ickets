import React, { useEffect, useState } from 'react';
import { Modal, Container } from 'react-bootstrap';
import { Salircliente } from 'utils/constantes';
import metodos from "../../../assets/Banco_Internacional_Ecuador.png";
import { ReportarDepositoCompra, EnviarmensajeWhastapp } from "../../../utils/Query";
import { useSelector, useDispatch } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import { GetMetodo } from 'utils/CarritoLocalStorang';
import { GetValores } from 'utils/CarritoLocalStorang';
import { bancos } from 'utils/Imgenesutils';
import { PagoRapido } from 'utils/Querycomnet';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { clienteInfo } from 'utils/DatosUsuarioLocalStorag';
import ReactGA from "react-ga"
let { GUAYAQUIL, numero,
  pacifico, pichincha,
  produbanco, atencion } = bancos
const Reporte = (props) => {
  const {
    setDatoToas, setrepShow, detener, comprar, intervalo,
  } = props
  let usedispatch = useDispatch()
  let evento = sessionStorage.getItem("eventoid")
  let modalshow = useSelector((state) => state.SuscritorSlice.modal)
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
  const handlereportColse = () => usedispatch(setModal({ nombre: "ModalDetalle", estado: '' }))
  const cerrar = () => {
    setrepShow(false)
    detener()
    hideAlert()
  }

  const succesAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}


        closeOnClickOutside={false}
        showCancel={false}
        showConfirm={false}
        confirmBtnText="Completar  Compra"
        cancelBtnText="Anular Compra"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}

      >
        <div >
          <div className='col-12 pb-3'>
            <img src={atencion} className="img-fluid"
              style={{
                height: 100
              }}
            ></img>


          </div>
          <div>
            <h6 className=' col-9 col-md-12  mx-auto' style={{
              fontWeight: "bold",
              fontSize: "1.0rem"
            }}>¿Quieres abandonar tu proceso de compra?</h6>
            <p> No puedes guardar tu proceso y continuar luego. Si, abandonas perderás tus reservas
            </p>
            <p>  </p>
          </div>


        </div>
        <div className='d-flex  justify-content-around py-4'>
          <div>
            <button className='btn btn-outline-danger  rounded-6' onClick={() => cerrar()}>

              <span style={{
                fontWeight: "bold"
              }}>Anular Compra</span>
            </button>
          </div>
          <div>
            <button className=' btn btn-warning rounded-5' onClick={() => hideAlert()} >
              <span style={{
                fontWeight: "bold"
              }}> Completar Compra</span>
            </button>
          </div>

        </div>

      </SweetAlert>
    )
  }
  const succesAlertBanc = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={"Se generara al banco selecionado"}
        onConfirm={() => Confirmar(e)}
        onCancel={() => cerrar()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Completar  Compra"
        cancelBtnText="Anular Compra"
        closeOnClickOutside={false}
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
  function Confirmar(e) {
    let valores = GetValores()
    ReactGA.event({
      category: "Deposito",
      action: "pagos",
      label: e,
    })
    if (e == "pichincha") {
      // console.log(evento)

      PagoRapido("").then(oupt => {
        if (oupt.success) {
          comprar()
          usedispatch(setModal({
            nombre: e, estado: valores
          }))
          usedispatch(setToastes({
            show: true,
            message: 'Recuerda imprimir los datos de la cuenta y reportar el comprobante al WhatsApp o email indicado, tienes un tiempo 1 hora para reportarlo',
            color: 'bg-success',
            estado: 'Orden de Pago Generada '
          }))
          return
        }
        else {
          usedispatch(setToastes({
            show: true,
            message: 'Hubo un error al generar la orden intenta de nueavo',
            color: 'bg-wharning',
            estado: 'Orden de pago no generada '
          }))
        }
        //setrepShow(false)
        console.log(oupt)

      }).catch(error => {
        seTSpiners("d-none")
        console.log(error)
      })

      return
    }
    if (e == "guayaquil") {
      PagoRapido("").then(oupt => {
        if (oupt.success) {
          comprar()
          usedispatch(setModal({
            nombre: e, estado: valores
          }))
          usedispatch(setToastes({
            show: true,
            message: 'Recuerda imprimir los datos de la cuenta y reportar el comprobante al WhatsApp o email indicado, tienes un tiempo 1 hora para reportarlo',
            color: 'bg-success',
            estado: 'Orden de Pago Generada '
          }))


          return
        }
        else {
          usedispatch(setToastes({
            show: true,
            message: 'Hubo un error al generar la orden intenta de nueavo',
            color: 'bg-wharning',
            estado: 'Orden de pago no generada '
          }))
        }
        //setrepShow(false)
        console.log(oupt)

      }).catch(error => {
        seTSpiners("d-none")
        console.log(error)
        usedispatch(setToastes({
          show: true,
          message: 'Hubo un error ',
          color: 'bg-wharning',
          estado: 'Orden de pago no generada '
        }))
      })
      return
    }
    if (e == "produbanco") {
      PagoRapido("").then(oupt => {
        if (oupt.success) {
          comprar()
          /*evento != "9EGM42" && evento != "ANNKV7" ? usedispatch(setModal({
            nombre: e, estado: valores
          })) : usedispatch(setModal({
            nombre: "", estado: ""
          }))*/
          usedispatch(setModal({
            nombre: e, estado: valores
          }))
          usedispatch(setToastes({
            show: true,
            message: 'Recuerda imprimir los datos de la cuenta y reportar el comprobante al WhatsApp o email indicado, tienes un tiempo 1 hora para reportarlo',
            color: 'bg-success',
            estado: 'Orden de Pago Generada '
          }))
          return
        }
        else {
          usedispatch(setToastes({
            show: true,
            message: 'Hubo un error al generar la orden intenta de nueavo',
            color: 'bg-wharning',
            estado: 'Orden de pago no generada '
          }))
        }
        //setrepShow(false)
        console.log(oupt)
      }).catch(error => {
        seTSpiners("d-none")
        console.log(error)
      })
      return
    }
    if (e == "pacifico") {
      PagoRapido("").then(oupt => {
        if (oupt.success) {
          comprar()
          usedispatch(setModal({
            nombre: e, estado: valores
          }))
          usedispatch(setToastes({
            show: true,
            message: 'Recuerda imprimir los datos de la cuenta y reportar el comprobante al WhatsApp o email indicado, tienes un tiempo 1 hora para reportarlo',
            color: 'bg-success',
            estado: 'Orden de Pago Generada '
          }))
          /*evento != "9EGM42" && evento != "ANNKV7" ? usedispatch(setModal({
            nombre: e, estado: valores
          })) : usedispatch(setModal({
            nombre: "", estado: ""
          }))
          evento != "9EGM42" && evento != "ANNKV7" ? usedispatch(setToastes({
            show: true,
            message: 'Recuerda imprimir los datos de la cuenta y reportar el comprobante al WhatsApp o email indicado, tienes un tiempo 1 hora para reportarlo',
            color: 'bg-success',
            estado: 'Orden de Pago Generada '
          })) : usedispatch(setToastes({
            show: true,
            message: 'Recuerda estar pendiente de tu reserva, te informaremos de las cuentas al inicio de las ventas',
            color: 'bg-success',
            estado: 'Reserva Generada '
          }))*/
          return
        }
        else {
          usedispatch(setToastes({
            show: true,
            message: 'Hubo un error al generar la orden intenta de nueavo',
            color: 'bg-wharning',
            estado: 'Orden de pago no generada '
          }))
        }
        console.log(oupt)
      }).catch(error => {
        seTSpiners("d-none")
        console.log(error)
      })
      return
    }
    if (e == "transferencia") {
      PagoRapido("").then(oupt => {
        if (oupt.success) {
          comprar()
          usedispatch(setModal({
            nombre: "", estado: ""
          }))
          usedispatch(setToastes({
            show: true,
            message: 'Recuerda reportar el comprobante al WhatsApp o desde la opción tickets, tienes un tiempo de 2 hora para reportarlo',
            color: 'bg-success',
            estado: 'Orden de Pago Generada '
          }))
          return
        }
        else {
          usedispatch(setToastes({
            show: true,
            message: 'Hubo un error al generar la orden intenta de nueavo',
            color: 'bg-wharning',
            estado: 'Orden de pago no generada '
          }))
        }
        //setrepShow(false)
        console.log(oupt)
      }).catch(error => {
        seTSpiners("d-none")
        console.log(error)
      })
      return
    }
  }
  return (
    <>
      {alert}
      <Modal
        show={modalshow.nombre == "ModalReporte" ? true : false}
        onHide={succesAlert}
        size={GetMetodo() != "Transferencia" ? "lg" : ""}
        fullscreen={'md-down'}
        centered>
        <Modal.Header className=" d-flex  m-0  bg-dark   justify-content-between align-items-center"        >
          <div className="d-flex  container   justify-content-center text-center" >
            <h4 className=" p-1 text-light "
              style={{
                fontWeight: "bold"
              }}
            >
              {GetMetodo() != "Transferencia" ? "DEPOSITAR A LAS SIGUIENTES CUENTAS" : "TRANSFERIR A LAS SIGUIENTES CUENTAS "}
            </h4>
          </div>
          <div className=" float-left " style={{ marginTop: '-45px' }}>
            <button type="button" className=" text-secondary" onClick={() => clienteInfo() != null ? usedispatch(setModal({ nombre: 'ModalDetalle', estado: '' })) : succesAlert()}>
              X
            </button>
          </div>

        </Modal.Header>
        <Modal.Body>

          <div className="container-fluid px-0">
            {GetMetodo() != "Transferencia" ?
              <div className='row  flex-wrap-reverse'>
                <div className='col-12 col-md-6 d-flex flex-column align-items-center'>
                  <div className='pt-2 pagos' >
                    <img src={pichincha} className="img-fluid" onClick={() => Confirmar("pichincha")} />
                  </div>
                  <div className='py-2 pagos'>
                    <img src={GUAYAQUIL} className="img-fluid" onClick={() => Confirmar("guayaquil")} />
                  </div>

                  <div className='pagos'>
                    <img src={pacifico} className="img-fluid" onClick={() => Confirmar("pacifico")} />
                  </div>

                  <div className='py-2 pagos'>
                    <img src={produbanco} className="img-fluid" onClick={() => Confirmar("produbanco")} />
                  </div>

                </div>
                <div className='col-12 col-md-6' >
                  <div className='text-center'>
                    <p style={{
                      fontWeight: "bold"
                    }}>Tiempo restante <span className='text-danger'  >{intervalo}</span> </p>
                    <h5>
                      <strong
                      >  Pasos para Compra con Déposito</strong>

                    </h5>
                  </div>
                  <div>
                    <span>
                      <strong>1.</strong>   Dar click sobre la imgen Banco preferido
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong>2.</strong>   Generar la orden de pago
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong> 3.</strong>   Depositar en Ventanilla o corresponsal
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong> 4.</strong> Tomar una foto del comprobante
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong> 5.</strong> Reportar el comprobante
                    </span>
                  </div>
                  <div>
                    <span>
                      <strong> 6.</strong> Tus boletos llegaran al correo registrado
                    </span>
                  </div>
                  <div className='text-center pt-4 pb-0'>
                    <a href='https://t-ickets.net/3FynwiC' className=' nav-link' target="_blank" >
                      <h5 className='text-danger' href='https://t-ickets.net/3FynwiC' target="_blank" > <strong>REPORTAR EL PAGO AL </strong>
                      </h5>
                    </a>
                  </div>
                  <div className='   text-center'>
                    <a href='https://t-ickets.net/3FynwiC' target="_blank">
                      <img src={numero} className=" img-fluid shadow  border rounded-7" style={{
                        width: 270
                      }}></img>
                    </a>
                  </div>
                </div>

              </div>
              : <div className="d-flex flex-wrap px-0 justify-content-center align-items-center" >
                <div className='d-flex px-0'>

                  <h5 className="modal-title pb-3 px-0 text-center " style={{ fontSize: '0.7em' }}>Para completar la compra, deberá transferir el valor total <span className=' border rounded-5 p-1 text-danger'> <strong className='mx-2' style={{ fontSize: '1.5em' }}> ${GetMetodo() != "Tarjeta" ? (parseFloat(GetValores().subtotal) + parseFloat(GetValores().comision)).toFixed(2) : (GetValores().total).toFixed(2)} </strong> </span> <span className=' border rounded-5 p-1 text-danger'> <strong className='mx-2' style={{ fontSize: '1.5em' }}> {intervalo}</strong> </span> Minutos a nombre de:
                    <strong>COMPUTECNICSNET S.A.</strong> RUC No. <strong>0992782129001</strong>, a una de las siguientes cuentas:</h5>

                </div>
                <div className='d-fex border rounded-5' style={{ width: '90%' }}>
                  <div className='d-flex flex-column  '>
                    <div className='  m-2'>
                      <h4 style={{ fontSize: '0.7em' }}> CUENTA CORRIENTE BANCO DE GUAYAQUIL: 18018624 </h4>
                    </div>

                    <div className='m-2' >
                      <h4 style={{ fontSize: '0.7em' }}> CUENTA CORRIENTE BANCO PICHINCHA: 2100106995 </h4>
                    </div>
                    <div className='m-2' >
                      <h4 style={{ fontSize: '0.7em' }}> CUENTA CORRIENTE BANCO PACIFICO: 8069530 </h4>
                    </div>
                    <div className='m-2'>
                      <h4 style={{ fontSize: '0.7em' }}>
                        CUENTA CORRIENTE BANCO PRODUBANCO: 1058194005
                      </h4>

                    </div>
                  </div>

                </div>
                <div className=' container d-flex   px-0 mx-0 justify-content-between ' style={{ width: '90%' }}>
                  <div className=''>
                    <button className='btn btn-success m-2 ' style={{ fontSize: '0.7em' }} onClick={() => Confirmar("transferencia")} > CONFIMAR TRANSFERENCIA </button>

                  </div>
                  <div>
                    <button className='btn  btn-danger m-2' style={{ fontSize: '0.7em' }} onClick={succesAlert}><span className='text-danger'>......</span>   CANCELAR COMPRA <span className='text-danger'>......</span>  </button>
                  </div>
                </div>
              </div>}


          </div>



        </Modal.Body>

      </Modal>
    </>)

}
export default Reporte