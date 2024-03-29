import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { Salircliente } from 'utils/constantes';
import { ReportarEfectivoCompra, EnviarmensajeWhastapp } from "../../../utils/Query";
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { carrusel } from 'views/Pages/Flasdeticket/imagenstatctic';
let { facilito, redacti } = carrusel
import SweetAlert from 'react-bootstrap-sweetalert';
import { FacturaComnet } from 'utils/constantes';
import { Triangle } from 'react-loader-spinner';
import { GetValores } from 'utils/CarritoLocalStorang';
import { PagoRapido } from 'utils/Querycomnet';
const ModalEfectivo = (props) => {
  const { intervalo, detener, detenervelocidad } = props;
  let usedispatch = useDispatch()
  let Modalshow = useSelector((state) => state.SuscritorSlice.modal)
  //console.log(Modalshow)
  const [alert, setAlert] = useState(null)
  const [spinerst, seTSpiners] = useState("d-none")
  async function Guardarcompraefectivo() {
    try {
      const mensaje = await ReportarEfectivoCompra()
      //const numero = await EnviarmensajeWhastapp(null)
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
  function comnetusernew() {
    seTSpiners("")
    hideAlert()
    let valores = GetValores()
    PagoRapido("").then(ouput => {
      if (!ouput.success) {
        detener()
        usedispatch(setToastes({
          show: true, message: 'Hubo un error ', color: 'bg-warning', estado:
            "No se genero la orden intente de nuevo"
        }))
        seTSpiners("d-none")
        hideAlert()
        return
      }
      else {
        detener()
        sessionStorage.setItem(FacturaComnet, JSON.stringify(ouput.idfactura))
        usedispatch(setModal({ nombre: 'ordendepago', estado: valores }))
        usedispatch(setToastes({ show: true, message: 'Orden de pago generada', color: 'bg-success', estado: ouput.message }))
        // usedispatch(setToastes({nombre:""}))      
        console.log(ouput)
        seTSpiners("d-none")
        hideAlert()
      }
    }).catch(error => {
      seTSpiners("d-none")
      console.log(error)
    })
  }
  const cerrar = () => {
    // setDetalle(true)
    detenervelocidad()
    usedispatch(setModal({ nombre: '', estado: '' }))
    hideAlert()
  }

  const succesExit = () => {
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
  const succesAlert = () => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={" Desea continuar con la compra"}
        onConfirm={() => comnetusernew()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Aceptar"
        cancelBtnText="Cancelar"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel
      >Se generara una orden de pago con el cual debera cancelar la compra
      </SweetAlert>
    )
  }
  const hideAlert = () => {
    setAlert(null)
  }

  useEffect(() => {
    seTSpiners("d-none")
  }, [Modalshow.nombre == "modalpago" ? true : false])
  return (
    <>
      {alert}
      <Modal
        show={Modalshow.nombre == "modalpago" ? true : false}
      >
        <Modal.Header className='py-3' >
          <div className='d-flex justify-content-between w-100' >
            <h5 className="modal-title text-center justify-content-center align-items-center" style={{ fontWeight: "bold", fontSize: '1.2em' }}>Tiempo restante de compra <span className="text-danger" >{intervalo} </span></h5>
            <div><button className='d-none btn btn-primary' onClick={() => cerrar()}  >  <i className="fa fa-arrow-left">  </i>   </button></div>
          </div>
          <button type="button" className=" close"
            onClick={() => succesExit()} >
            X
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="container pt-5">
            <div className="d-flex flex-column " >
              <h3 className='text-center'> Puede terminar la compra en: </h3>
              <div className="container d-flex flex-column p-3">
                <div className="row  pagos d-flex justify-content-center   m-1 p-2">
                  <img src={facilito} className=" img-fluid"
                    onClick={succesAlert}
                  />

                </div>
                <div className="row pagos d-flex justify-content-center   m-1 p-2">
                  <img src={redacti} className=" img-fluid   " />
                </div>
                <div className="col-12  d-flex  justify-content-center  p-1 mt-2">
                </div>
              </div>
            </div>

          </div>
          <div>
            <div className={spinerst}
              style={{
                display: 'none',
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '1000'
              }}
            >

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '10px',
                padding: '10px',
              }}>
                <Triangle
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="triangle-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
                <h4 className='text-light'>Creando orden de pago</h4>


              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </>
  )

}

export default ModalEfectivo;