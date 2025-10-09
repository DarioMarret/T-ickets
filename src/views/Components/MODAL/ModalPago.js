import React, { useEffect, useState } from 'react';
//import { CrearLinkPagoPayPhone } from 'utils/Query';
import Pagos from "../../../assets/imagen/pagosmedios.jpeg"
let Dunas = "https://www.deuna.uanataca.ec/assets/images/deunalogo.png"
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
import ReactGA from 'react-ga4';
import { clienteInfo } from 'utils/DatosUsuarioLocalStorag';
import { bancos } from 'utils/Imgenesutils';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { Metodos } from 'utils/constantes';
import { logWithCallback } from 'utilsstile.js/style';
let { atencion, diners, visas, paypal } = bancos

const TRACKING_ID = "G-LJN507B5NX";
function ModalPago(props) {
    ReactGA.initialize(TRACKING_ID);
    const { setModalPago, modalPago, detenervelocidad, intervalo } = props
    let usedispatch = useDispatch();
    let metodo = GetMetodo()
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
        /*$(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header"
                ,
                containment: "#root",
            })
        })*/
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
    function esMovil() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    const hideAlert = () => {
        setAlert(null)
    }
    function CrearPagoMedio() {
        let user = clienteInfo()
        setSpiner("")
        PagoRapido("").then(ouput => {
            if (user == null) {
                if (ouput.success) {

                    logWithCallback(ouput)

                    window.gtag('event', 'begin_checkout', {
                        transaction_id: "T_" + ouput.idRegistro,  // ID único de la transacción
                        value: ouput.valores.subtotal, // Valor total
                        tax: ouput.valores.iva,
                        affiliation: "Pagomedias", // Nombre de la tienda o sitio
                        currency: 'USD', // Moneda                       
                        items: ouput.concierto.map(item => ({
                            item_name: item.localidad_nombre,
                            item_id: item.id_localidad,
                            price: item.localidad_precio,
                            item_list_name: item.nombreConcierto,
                            quantity: item.cantidad,
                            item_category: item.nombreConcierto,
                        }))
                    });


                    window.gtag('event', 'purchase', {
                        transaction_id: "T_" + ouput.idRegistro,  // ID único de la transacción
                        value: ouput.valores.subtotal, // Valor total
                        tax: ouput.valores.iva,
                        affiliation: "Pagomedio", // Nombre de la tienda o sitio
                        currency: 'USD', // Moneda

                        items: ouput.concierto.map(item => ({
                            item_name: item.localidad_nombre,
                            item_id: item.id_localidad,
                            price: item.localidad_precio,
                            item_list_name: item.nombreConcierto,
                            quantity: item.cantidad,
                            item_category: item.nombreConcierto,
                        }))
                    });
                    if (metodo == "Duna") {
                        if (esMovil()) {
                            // Opción 2 (Recomendada): Abrir en una nueva pestaña (para que no pierda tu app)
                           // window.open(ouput.url, '_blank');
                            usedispatch(setModal({ nombre: '', estado: "" }))
                            setSpiner("d-none")
                            LimpiarLocalStore()
                            Limpiarseleccion()
                            const botonDunaHTML = `
    <div style="text-align: center; padding: 20px;">
        <p style="color: #333; font-size: 1.1em; margin-bottom: 25px; font-weight: 500;">
            Continúa el pago en tu dispositivo móvil:
        </p>

        <a 
            href="${ouput.url}" 
            target="_blank" 
            style="
                display: inline-block; /* Importante para que el padding y estilos se apliquen */
                text-decoration: none; 
                padding: 15px 30px; /* Hace el botón grande */
                border: 2px solid #007bff; /* Borde azul */
                border-radius: 12px; 
                background-color: #f0f8ff; /* Fondo muy claro */
                box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Sombra para darle profundidad */
                transition: background-color 0.3s;
            "
            onmouseover="this.style.backgroundColor='#e3f2fd'" /* Efecto hover */
            onmouseout="this.style.backgroundColor='#f0f8ff'"
            title="Abrir app de pago Duna"
        >
            <img 
                src="https://www.deuna.uanataca.ec/assets/images/deunalogo.png" 
                alt="Logo de Deuna" 
                style="
                    max-width: 120px; 
                    height: auto; 
                    display: block; 
                    margin: 0 auto;
                " 
            />
        </a>

        <p style="font-size: 0.9em; color: #888; margin-top: 25px;">
            Se abrirá en una nueva pestaña para que puedas volver fácilmente.
        </p>
    </div>
`;

                            // 2. Llamada a JQuery-Confirm.js para mostrar el botón
                            $.confirm({
                                title: 'Pagar con Duna',
                                content: botonDunaHTML, // Inyecta el HTML con el botón
                                type: 'blue',
                                icon: 'fas fa-mobile-alt',
                                closeIcon: true,
                                animation: 'zoom',
                                closeAnimation: 'scale',
                                // Quitamos los botones de confirm, solo dejamos el icono de cerrar 'x'
                                buttons: {
                                    // Puedes dejar esto vacío o eliminarlo si quieres que solo se cierre con el icono 'x'
                                    // Si lo dejas, solo aparecerá el botón 'Cerrar'
                                    cerrar: {
                                        text: 'Cerrar',
                                        btnClass: 'btn-default',
                                        action: function () { }
                                    }
                                },
                                backgroundDismiss: true,
                            });
                            return
                        }
                        usedispatch(setModal({ nombre: '', estado: "" }))
                        setSpiner("d-none")
                        LimpiarLocalStore()
                        Limpiarseleccion()
                        const qrContentHTML = `
    <div style="text-align: center; padding: 10px;">
        <img 
            src="https://www.deuna.uanataca.ec/assets/images/deunalogo.png" 
            alt="Logo de Deuna" 
            style="max-width: 100px; height: auto; margin-bottom: 15px;" 
        />
        <p style="color: #555; font-size: 1.1em; margin-bottom: 20px; font-weight: 400;">
            Escanea para pagar al instante
        </p>
        <img 
            src="${ouput.url}" 
            alt="Código de Pago QR" 
            style="max-width: 90%; height: auto; display: block; margin: 0 auto;" 
        />
    </div>
`;
                        setSpiner("d-none");
                        LimpiarLocalStore();
                        Limpiarseleccion();
                        // 1. Limpieza inicial
                        // Si estás en React, mantienes estas llamadas:
                        usedispatch(setModal({ nombre: '', estado: "" }));
                        setSpiner("d-none"); // Oculta el spinner principal
                        LimpiarLocalStore();
                        Limpiarseleccion();

                        // 2. Llamada a JQuery-Confirm.js para mostrar el QR
                        $.confirm({
                            title: 'Pago con Duna', // Título del modal
                            content: qrContentHTML, // Inyecta el HTML del QR
                            type: 'blue', // Color del encabezado (opcional: 'green', 'red', 'orange', etc.)
                            icon: 'fas fa-qrcode', // Ícono (si usas Font Awesome)
                            closeIcon: true, // Muestra el botón de cerrar (x)
                            animation: 'zoom', // Animación de apertura (ej: 'opacity', 'zoom', 'scale')
                            closeAnimation: 'scale', // Animación de cierre
                            buttons: {
                                // Solo necesitamos un botón para cerrar
                                cerrar: {
                                    text: 'Cerrar',
                                    btnClass: 'btn-primary',
                                    action: function () {
                                        // Aquí puedes añadir lógica si necesitas hacer algo al cerrar.
                                        // Por ahora, solo cerramos.
                                    }
                                }
                            },
                            // Configuración para permitir cerrar al hacer clic fuera
                            backgroundDismiss: true,
                            // Oculta el título del botón si solo quieres que se vea el icono 'x'
                            // Esto es opcional y depende del estilo de tu aplicación:
                            // closeIconClass: 'fas fa-times' 
                        });

                    }
                    if (metodo != "Duna") {
                        usedispatch(setModal({ nombre: 'pago', estado: ouput.url }))

                        setSpiner("d-none")
                        LimpiarLocalStore()
                        Limpiarseleccion()
                    }

                    //detenervelocidad()
                }
                else {
                    ReactGA.event({
                        category: "error",
                        action: "Pagomedia-error",
                        label: Math.random().toString(36).slice(-10),
                    })
                    usedispatch(setToastes({
                        show: true,
                        message: "Lo sentimos la plataforma no género el link  intente más tarde",
                        color: 'bg-primary',
                        estado: "Hubo un error departe de Pagomedio"
                    }))

                    usedispatch(setModal({ nombre: '', estado: "" }))
                    LimpiarLocalStore()
                    Limpiarseleccion()
                    usedispatch(clearMapa())


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
            ReactGA.event({
                category: "error",
                action: "Pagomedia-error",
                label: "Pendiente-TC",
            })
            usedispatch(setModal({ nombre: '', estado: "" }))
            usedispatch(setToastes({
                show: true,
                message: "Lo sentimos la platadorma de Pagomedia no genero el link",
                color: 'bg-primary',
                estado: "Hubo un error de Pagomedio"
            }))

            setSpiner("d-none")
        })
        /*const data = await GenerarLinkPagoMedios()

        if (data.status === 200) {

            

        }*/

    }
    function CrearPyhome() {
        sessionStorage.setItem(Metodos, "Payphone")
        let user = clienteInfo()

        setSpiner("")
        setTimeout(function () {
            PagoRapido("").then(ouput => {

                if (user == null) {
                    if (ouput.success) {
                        window.gtag('event', 'begin_checkout', {
                            transaction_id: "T_" + ouput.idRegistro,  // ID único de la transacción
                            value: ouput.valores.subtotal, // Valor total
                            tax: ouput.valores.iva,
                            affiliation: "Tienda Online", // Nombre de la tienda o sitio
                            currency: 'USD', // Moneda

                            items: ouput.concierto.map(item => ({
                                item_name: item.localidad_nombre,
                                item_id: item.id_localidad,
                                price: item.localidad_precio,
                                item_list_name: item.nombreConcierto,
                                quantity: item.cantidad,
                                item_category: "COMNET"
                            }))
                        });
                        usedispatch(setModal({ nombre: 'pago', estado: ouput.url }))

                        setSpiner("d-none")
                        LimpiarLocalStore()
                        Limpiarseleccion()

                    }
                    else {
                        usedispatch(setToastes({
                            show: true,
                            message: "Lo sentimos la plataforma de Payphome no género el link intente más tarde",
                            color: 'bg-primary',
                            estado: "Hubo un error departe de Pagomedio"
                        }))

                        ReactGA.event({
                            category: "error",
                            action: "Pyhome-error",
                            label: "Pendiente-TC",
                        })
                        usedispatch(setModal({ nombre: '', estado: "" }))
                        LimpiarLocalStore()
                        Limpiarseleccion()
                        usedispatch(clearMapa())

                    }
                }
                else {
                    popUp(ouput.url)

                    usedispatch(setModal({ nombre: '', estado: "" }))
                    setSpiner("d-none")
                }
                // setModalPago(false)
            }).catch(errro => {
                ReactGA.event({
                    category: "error",
                    action: "Pyhome-erro",
                    label: "Pendiente-TC",
                })
                usedispatch(setModal({ nombre: '', estado: "" }))
                usedispatch(setToastes({
                    show: true,
                    message: "Lo sentimos la platadorma de Pagomedia no genero el link",
                    color: 'bg-primary',
                    estado: "Hubo un error de Pagomedio"
                }))
                setSpiner("d-none")
            })
        }, 1000)

    }
    function popUp(URL) {
        if (metodo == "Duna") {
            window.open(URL, 'Pagos Medios', "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=1000,height=800,left = 390,top = 50");
            LimpiarLocalStore()
            Limpiarseleccion()
            usedispatch(clearMapa())
            detenervelocidad()
            usedispatch(setModal({ nombre: '', estado: "" }))
        }
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
                                        src={metodo == "Duna" ? "https://www.deuna.uanataca.ec/assets/images/deunalogo.png" : Pagos}
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
                                        src={metodo == "Duna" ? Dunas : Pagos}
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