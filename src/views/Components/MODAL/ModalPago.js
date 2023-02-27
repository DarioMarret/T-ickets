import React, { useEffect, useState } from 'react';
//import { CrearLinkPagoPayPhone } from 'utils/Query';
import Pagos from "../../../assets/imagen/pagosmedios.jpeg"
import { GenerarLinkPagoMedios, EnviarEmail, EnviarmensajeWhastapp } from 'utils/Query';
import { LimpiarLocalStore, Limpiarseleccion } from '../../../utils/CarritoLocalStorang';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { GetMetodo } from '../../../utils/CarritoLocalStorang';
import { Modal, Spinner } from 'react-bootstrap';
import { clearMapa } from 'StoreRedux/Slice/mapaLocalSlice';
import { borrarseleccion } from 'StoreRedux/Slice/sillasSlice';
import { useDispatch, useSelector } from "react-redux"
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import SweetAlert from 'react-bootstrap-sweetalert';
import { PagoRapido } from 'utils/Querycomnet';
import ReactGA from "react-ga"
import { clienteInfo } from 'utils/DatosUsuarioLocalStorag';
import { bancos } from 'utils/Imgenesutils';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { Metodos } from 'utils/constantes';
let { atencion, diners, visas, paypal } = bancos
function ModalPago(props) {
    const { setModalPago, modalPago, detenervelocidad, intervalo } = props
    let usedispatch = useDispatch();
    const [spinerst, setSpiner] = useState("d-none")
    const [alert, setAlert] = useState(null)
    const [cargar, setCargar] = useState(false)
    const [datosPerson, setPerson] = useState({
        cedula: '',
        name: '',
        email: '',
        whatsapp: '',
        metodoPago: '',
        envio: '',
        direccion: '',
    })
    useEffect(() => {
        let datosPersonal = getDatosUsuariosLocalStorag()
        if (datosPersonal !== null) {
            setPerson({
                ...datosPerson,
                direccion: datosPersonal.direccion,
                email: datosPersonal.email,
                name: datosPersonal.name,
                whatsapp: datosPersonal.whatsapp,
                envio: datosPersonal.envio,
                cedula: datosPersonal.cedula,
            })
        }
        setCargar(!cargar)
        $(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header"
                ,
                containment: "#root",
            })
        })
    }, [modalPago])

    const closedeposito = () => {
        setAlert(
            <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}


                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
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
                        <button className='btn btn-outline-danger  rounded-6' onClick={() => borrar()}>

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
    const borrar = () => {


        detenervelocidad()
        //Limpiarseleccion()
        //LimpiarLocalStore()
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        setModalPago(false)
        hideAlert()
    }
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Estas seguro de cancelar la compra"
                onConfirm={() => hideAlert()}
                onCancel={() => borrar()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Continuar"
                cancelBtnText="Salir y Borrar"
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
    function CrearPagoMedio() {
        let user = clienteInfo()
        //console.log(user)
        setSpiner("")
        PagoRapido("").then(ouput => {
            //console.log(ouput)
            if (user == null) {
                if (ouput.success) {
                    console.log(ouput)
                    usedispatch(setModal({ nombre: 'pago', estado: ouput.url }))

                    setSpiner("d-none")
                    LimpiarLocalStore()
                    Limpiarseleccion()
                    ReactGA.event({
                        category: "Pago",
                        action: "pagomedia",
                        label: "Pendiente-TC",
                    })
                    //detenervelocidad()
                }
                else {
                    usedispatch(setToastes({
                        show: true,
                        message: "Lo sentimos la plataforma de Pagomedio no género el link intente más tarde",
                        color: 'bg-primary',
                        estado: "Hubo un error departe de Pagomedio"
                    }))

                    usedispatch(setModal({ nombre: '', estado: "" }))
                    LimpiarLocalStore()
                    Limpiarseleccion()
                    usedispatch(clearMapa())

                    ReactGA.event({
                        category: "error",
                        action: "pagomedia",
                        label: "Pendiente-TC",
                    })
                    detenervelocidad()
                }
            }
            else {
                popUp(ouput.url)
                usedispatch(setModal({ nombre: '', estado: "" }))
                setSpiner("d-none")
            }
            // setModalPago(false)
        }).catch(errro => {
            usedispatch(setModal({ nombre: '', estado: "" }))
            usedispatch(setToastes({
                show: true,
                message: "Lo sentimos la platadorma de Pagomedia no genero el link",
                color: 'bg-primary',
                estado: "Hubo un error de Pagomedio"
            }))
            //  console.log(errro)
            setSpiner("d-none")
        })
        /*const data = await GenerarLinkPagoMedios()

        if (data.status === 200) {

            

        }*/

    }
    function CrearPyhome() {
        sessionStorage.setItem(Metodos, "Payphone")
        let user = clienteInfo()
        //console.log(user)
        setSpiner("")
        setTimeout(function () {
            PagoRapido("").then(ouput => {
                console.log(ouput)
                if (user == null) {
                    if (ouput.success) {
                        usedispatch(setModal({ nombre: 'pago', estado: ouput.url }))
                        console.log(ouput)
                        setSpiner("d-none")
                        LimpiarLocalStore()
                        Limpiarseleccion()
                        ReactGA.event({
                            category: "Pago",
                            action: "Pyhome-exito",
                            label: "Pendiente-TC",
                        })
                    }
                    else {
                        usedispatch(setToastes({
                            show: true,
                            message: "Lo sentimos la plataforma de Payphome no género el link intente más tarde",
                            color: 'bg-primary',
                            estado: "Hubo un error departe de Pagomedio"
                        }))
                        usedispatch(setModal({ nombre: '', estado: "" }))
                        LimpiarLocalStore()
                        Limpiarseleccion()
                        usedispatch(clearMapa())
                       
                        ReactGA.event({
                            category: "error",
                            action: "Pyhomeerr",
                            label: "Pendiente-TC",
                        })
                    }
                }
                else {
                    popUp(ouput.url)
                    console.log(ouput)
                    usedispatch(setModal({ nombre: '', estado: "" }))
                    setSpiner("d-none")
                }
                // setModalPago(false)
            }).catch(errro => {
                usedispatch(setModal({ nombre: '', estado: "" }))
                usedispatch(setToastes({
                    show: true,
                    message: "Lo sentimos la platadorma de Pagomedia no genero el link",
                    color: 'bg-primary',
                    estado: "Hubo un error de Pagomedio"
                }))
                console.log(errro)
                ReactGA.event({
                    category: "error",
                    action: "Pyhomeerr",
                    label: "Pendiente-TC",
                })
                //  console.log(errro)
                setSpiner("d-none")
            })
        }, 1000)

    }
    /*  async function CrearLinkPayPhone() {
          setSpiner("")
          const data = await CrearLinkPagoPayPhone()
          if (data.success) {
              setUrl(data.url)
              setEstadoFrame(!estadoFrame)
              setSpiner("d-none")
          }
          setSpiner("d-none")
      }*/
    function popUp(URL) {
        window.open(URL, 'Pagos Medios', "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=1000,height=800,left = 390,top = 50");
        LimpiarLocalStore()
        Limpiarseleccion()
        usedispatch(clearMapa())
        detenervelocidad()
    }

    return (
        <>
            {alert}
            <Modal
                show={true}
                fullscreen={'md-down'}
            >
                <Modal.Header className=" d-flex  rounded-top-4   bg-dark pb-2
                 justify-content-between align-items-center">
                    <div className="d-flex flex-lg-row pb-2 container justify-content-between text-center" >
                        <h5 className=' text-white' style={{ fontWeight: "bold", fontSize: '1.37em' }}>{intervalo ? "Tiempo restante para la compra" : ""}  </h5>
                        <h5 style={{ fontWeight: "bold", fontSize: '1.7em' }}><span className=' text-danger' > {intervalo ? intervalo : ""} </span> </h5>
                        <div><button className='close text-light' onClick={closedeposito} >X</button></div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <div className='d-flex flex-column pb-3' style={{ textAlign: '', fontWeight: '' }}>
                            <h5 style={{ fontSize: '1.1em', textTransform: '' }}>Una vez realizado el pago los boletos seran enviados a:
                            </h5>
                            <span className=' pt-2' style={{ fontWeight: '', fontSize: '1.1em' }}>
                                {datosPerson.envio != "whatsapp" ? "Correo: " : "Whastapp: "}     <span>{datosPerson.envio != "whatsapp" ? datosPerson.email : datosPerson.whatsapp}</span>
                            </span>
                        </div>
                        <label className='' htmlFor="pagoMedio"
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <div className='m-3 '>
                                <div className='px-0 pagos'
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '5px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={CrearPagoMedio}
                                >
                                    {/**
                             * 
                             * https://codigomarret.online/img/whatsapp image 2022-09-18 at 15.12.28.jpeg
                             */}
                                    <img className=' image-fluid'
                                        src={Pagos}
                                        width={420}
                                        alt="Pagos medios"
                                    />
                                </div>
                            </div>
                            <div className='m-3 d-none'>
                                <div className='px-0 pagos' style={{
                                    display: 'flex',
                                    alignItems: "start",
                                    padding: '5px',
                                    cursor: 'pointer'
                                }}
                                    onClick={CrearPagoMedio}
                                >
                                    <img src={diners}
                                        height={50} />
                                </div>


                            </div>
                            <div className='m-3 d-none'>
                                <div className='px-0 pagos' style={{
                                    display: 'flex',
                                    alignItems: "start",

                                    padding: '5px',
                                    cursor: 'pointer'
                                    
                                }}
                                    onClick={CrearPyhome}
                                >
                                    <img src={visas}
                                        height={50}

                                    />
                                </div>
                            </div>
                            <div className='m-3 d-none'>
                                <div className='px-0 pagos' style={{
                                    display: 'flex',
                                    alignItems: "start",

                                    padding: '5px',
                                    cursor: 'pointer'
                                }}>
                                    <img src={paypal}
                                        height={50} />
                                </div>


                            </div>
                            <div className='m-3 d-none'>
                                <div className='px-0 pagos '
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '5px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={CrearPyhome}
                                >
                                    {/**
                             * 
                             * https://codigomarret.online/img/whatsapp image 2022-09-18 at 15.12.28.jpeg
                             */}
                                    <img className=' image-fluid  '
                                        src={Pagos}
                                        width={420}
                                        alt="Pagos medios"
                                    />
                                </div>
                            </div>
                        </label>
                        <div className='d-flex  justify-content-center'>
                            <div className=' container d-flex   px-0 mx-0 justify-content-between text-center ' style={{ width: '90%' }}>
                                <div className='d-none px-'>
                                    <button className='btn btn-primary btn-lg   ' style={{ fontSize: '' }} onClick={CrearPagoMedio}  >  SEGUIR
                                        <span className='  text-primary '></span>
                                    </button>

                                </div>
                                <div className='col-12 text-center'>
                                    <button className='btn  btn-outline-danger btn-lg ' style={{ fontSize: '' }} onClick={succesAlert}> ELIMINAR COMPRA </button>
                                </div>
                            </div>
                        </div>

                        <div className=' d-none'
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <div>
                                <button type="button" className='btn btn-primary btn-lg'
                                >


                                </button>
                            </div>

                            <button className='btn  btn-outline-primary btn-sm'

                                onClick={succesAlert}
                            >CANCELAR</button>
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
                                    <Spinner animation="border" variant="light" size='120'></Spinner>
                                    <h4 className='text-light'>Generando Link de Pago</h4>


                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <div className='d-none'
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
                {alert}
                <div
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        padding: '20px',
                        alignItems: 'center',
                    }}
                >
                    <div className='d-flex h-25 bg-azul1'>

                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '3px solid #000000',
                        borderRadius: '10px',
                        padding: '10px',
                    }}>

                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-primary' onClick={closedeposito} > <i className="bi bi-caret-left-fill"></i>  Regresar  </button>
                        </div>
                        <div className='d-flex flex-column pb-3' style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            <h6 style={{ fontWeight: "bold", fontSize: '1.2em' }}>{intervalo ? "Tiempo restante" : ""} <span className=' text-secondary ' > {intervalo ? intervalo : ""} </span>  </h6>
                            <strong>
                                <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Una vez confirmado el pago se enviara los boletos a :
                                </span>

                            </strong>
                            <strong>
                                <span className='text-primary pt-2' style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
                                    {datosPerson.envio != "whatsapp" ? datosPerson.email : datosPerson.whatsapp}

                                </span></strong>
                        </div>

                        {/* //PAGO CON PAGO MEDIO */}
                        <label className='pt-3' htmlFor="pagoMedio"
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px',
                                    cursor: 'pointer'
                                }}
                                onClick={CrearPagoMedio}
                            >
                                {/**
                             * 
                             * https://codigomarret.online/img/whatsapp image 2022-09-18 at 15.12.28.jpeg
                             */}
                                <img
                                    src={Pagos}
                                    width={340}
                                    alt="Pagos medios"
                                />
                            </div>
                        </label>


                        {/* //PAGO CON PAYPHONE */}
                        {/*<label htmlFor="payPhone"
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={() => CrearLinkPayPhone()}
                        >
                            <img
                                src="https://codigomarret.online/img/payphone.jpeg"
                                width={300}
                                alt="Pagos medios"
                            />
                        </div>
                        {/* 
                    <ButtonPago cargar={cargar} /> }
                    </label> */}


                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <button className='btn btn-primary text-white'
                                style={{
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '10px',

                                }}
                                onClick={succesAlert}
                            >Cancelar</button>
                        </div>

                    </div>
                </div>
                <div>
                    <div className={""}
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
                            <Spinner animation="border" variant="light" size='120'></Spinner>
                            <h4 className='text-light'>Generando Link de Pago</h4>


                        </div>
                    </div>
                </div>

                {/* {
                estadoFrame ?
                    <Iframe
                        setEstadoFrame={setEstadoFrame}
                        url={url}
                    />
                    : null

            } */}
            </div>
        </>
    );
}


export default ModalPago;