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
import { bancos } from 'utils/Imgenesutils';
import ReactGA from 'react-ga';
let { atencion } = bancos
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
        ReactGA.event({
          category: "Pago",
          action: "Facilito",
          label: "plataforma",
        })
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
  const succesAlert = () => {
    setAlert(
      <SweetAlert

        style={{ display: "block", marginTop: "-100px" }}

        closeOnClickOutside={false}
        showCancel={false}
        showConfirm={false}
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}

      >
        <div className='col-12 pb-3'>
          <img src={atencion} className="img-fluid"
            style={{
              height: 100
            }}
          ></img>


        </div>
        <h6 className=' col-9 col-md-12  mx-auto' style={{
          fontWeight: "bold",
          fontSize: "1.0rem"
        }}>Desea continuar con la compra</h6>
        <p>Se generará una orden de pago con el cual deberá cancelar la compra</p>
        <div className='d-flex  justify-content-around py-4'>
          <div>
            <button className='btn btn-outline-danger  rounded-6' onClick={() => hideAlert()}>

              <span style={{
                fontWeight: "bold"
              }}>Cancelar</span>
            </button>
          </div>
          <div>
            <button className=' btn btn-warning rounded-5' onClick={() => comnetusernew()} >
              <span style={{
                fontWeight: "bold"
              }}>Comfirmar</span>
            </button>
          </div>

        </div>
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
        fullscreen={'md-down'}
      >
        <Modal.Header className='py-3  bg-dark ' >
          <div className='d-flex justify-content-between w-100' >
            <h5 className="modal-title text-center justify-content-center align-items-center" style={{ fontWeight: "bold", fontSize: '1.2em' }}>Tiempo restante de compra <span className="text-danger" >{intervalo} </span></h5>
            
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