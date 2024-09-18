import React, { useEffect, useState } from 'react';
import { Modal, Spinner, InputGroup } from "react-bootstrap"
import { GetMetodo, GetValores } from 'utils/CarritoLocalStorang';
import { Envio, Envioadmin, DatosUsuariocliente } from 'utils/constantes';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { DatosUsuariosLocalStorag, getCliente } from 'utils/DatosUsuarioLocalStorag';
import { getCedula } from 'utils/DatosUsuarioLocalStorag';
import { ValidarWhatsapp, GuardarDatosdelComprador, EnviarmensajeWhastapp, Authsucrito } from 'utils/Query';
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import { useDispatch, useSelector } from "react-redux";
import { addususcritor } from 'StoreRedux/Slice/SuscritorSlice';
import { getVerTienda, GetEstadousu } from 'utils/CarritoLocalStorang';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { clienteInfo } from 'utils/DatosUsuarioLocalStorag';
import { index } from 'utilsstile.js/style';
import { Consultar_codigos } from 'utils/index';

function ModalDetalle(props) {
    const {
        listarCarritoDetalle, setListarCarritoDetalle,
        setDatoToas, intervalo
    } = props
    const usedispatch = useDispatch()
    let admin = clienteInfo()
    const modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const userauthi = useSelector((state) => state.SuscritorSlice)
    const [actualState, changeCheckState] = useState({
        check1: false,
        check2: false,
        check3: false
    });
    let codigoEvento = sessionStorage.getItem('eventoid')
    const [valorTotal, SetValor] = useState(0)
    const [clienteauth, setChecked] = useState(false)
    const [spinervi, setspiner] = useState("d-none")
    const [hidecomision, sethideComision] = useState("d-none")
    const [validationfrom, setValidation] = useState("")
    const [datosPerson, setPerson] = useState({
        cedula: '',
        name: '',
        email: '',
        whatsapp: '',
        metodoPago: '',
        envio: "Portal web",
        direccion: '',
    })
    const detposito = () => {
        datosPerson.metodoPago == "Efectivo" ?
            usedispatch(setModal({ nombre: "modalpagoFacilito", estado: "" })) :usedispatch(setModal({ nombre: "modalpago", estado: "" }))

    }
    const handelReporShow = () => usedispatch(setModal({ nombre: 'ModalReporte', estado: '' }))
    const handleDetalleColse = () => usedispatch(setModal({ nombre: 'ModalCarritov', estado: '' }))
    const handleCheckboxChange = (event) => {
        const { name, checked } = event
        if (checked) {
            changeCheckState({
                ...actualState,
                [name]: true
            })
        }
        else {
            changeCheckState({
                ...actualState,
                [name]: false
            })
        }
    }
    async function handlePago() {
        let user = { email: datosPerson.email, password: datosPerson.cedula }
        let datos = getDatosUsuariosLocalStorag()
        if (!clienteauth) {
            const numero = await ValidarWhatsapp()
            if (numero == null) {
                usedispatch(
                    setToastes({
                        show: true,
                        message: 'Ingrese un nuemro Válido',
                        color: 'bg-danger',
                        estado: 'Numero de Whatsapp inválido',
                    }))
                return false
            }
            else if (validarEmail(datosPerson.email)) {
                const { success, message } = await GuardarDatosdelComprador()
                if (success) {
                    const { data } = await Authsucrito(user)
                    var hoy = new Date();
                    let users = {
                        ...datos, cedula: data.cedula, direccion: data.ciudad, whatsapp: data.movil, telefono: data.movil, name: data.nombreCompleto,
                        email: data.email, hora: String(hoy), enable: data.enable, id: data.id, metodoPago: datosPerson.metodoPago, envio: "Portal web",
                    }
                    DatosUsuariosLocalStorag({ users })
                    sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
                    usedispatch(addususcritor({ users }))

                    //setDetalle(!showDetalle)
                    usedispatch(setModal({ nombre: 'ModalPago', estado: '' }))
                    //setModalPago(true)
                }
                else {
                    usedispatch(
                        setToastes({
                            show: true,
                            message: 'Ingrese un nuemro Válido',
                            color: 'bg-danger',
                            estado: 'Numero de Whatsapp inválido',
                        }))
                }
            }
        }
        else {
            //            setDetalle(!showDetalle)
            usedispatch(setModal({ nombre: 'ModalPago', estado: '' }))
            //  setModalPago(true)
        }
    }
    function abrirPago() {
        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(datosPerson))
        usedispatch(setModal({ nombre: 'ModalPago', estado: '' }))
    }
    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0,
        desc: 0,
        iva: 0,
        desctc: 0
    })
    async function handelchange(e) {
        let metodoPago = GetMetodo()
        const { value, name } = e;

        setPerson({
            ...datosPerson,
            [name]: value
        })
        if (name === "cedula" && value.length == 10) {
            setspiner("")
            const datos = await getCedula(value)
            const { name, email, direccion, whatsapp, discapacidad } = datos
            //console.log(datos)
            if (name) {
                DatosUsuariosLocalStorag({ ...datos, cedula: value, envio: "Portal web", whatsapp: '', discapacidad: discapacidad })
                setPerson({
                    ...datosPerson,
                    email: email ? email : '',
                    name: name,
                    cedula: value,
                    direccion: direccion ? direccion : '',
                    envio: "Portal web",
                    whatsapp: '',
                    metodoPago: metodoPago
                })
                setspiner("d-none")
                ListaPrecioset(GetValores())
                setListarCarritoDetalle(getVerTienda())
            } else {
                setPerson({
                    ...datosPerson,
                    email: '',
                    name: '',
                    direccion: '',
                })
                setspiner("d-none")
                setDatoToas({
                    show: true,
                    message: 'Ingrese el número de cédula correcta o intente mas tarde',
                    color: 'bg-danger',
                    estado: 'No se encontraron datos',
                })
            }
        }
    }
    let CODIGO = sessionStorage.getItem("eventoid")
    function hanbleDatos(e) {
        setPerson({
            ...datosPerson,
            [e.target.name]: e.target.value
        })
        let datosPersonal = getDatosUsuariosLocalStorag()
        DatosUsuariosLocalStorag({
            ...datosPersonal,
            [e.target.name]: e.target.value
        })
    }
    function validarEmail(valor) {
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if (userauthi.login != true) return true
        if (emailRegex.test(valor)) {
            return true
        } else {
            setValidation("was-validated")
            setPerson({
                ...datosPerson,
                email: ''
            })
            setDatoToas({
                show: true,
                message: 'Campos inconpletos o Formato de correo inválido ',
                color: 'bg-danger',
                estado: 'Complete la información',
            })
            return false
        }
    }
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    useEffect(() => {
        let datosPersonal = getDatosUsuariosLocalStorag()
        let clineteLogeado = getCliente()
        let metodoPago = GetMetodo()
        ListaPrecioset(GetValores())
        if (clineteLogeado == null) {
            if (datosPersonal != null) {
                setPerson({
                    ...datosPerson,
                    direccion: datosPersonal.direccion,
                    email: datosPersonal.email,
                    name: datosPersonal.name,
                    whatsapp: datosPersonal.whatsapp,
                    envio: "Portal web",
                    cedula: datosPersonal.cedula,
                    metodoPago: metodoPago
                })
                setChecked(false)
            }
            setPerson({
                ...datosPerson,
                email: datosPersonal ? datosPersonal.email : '',
                name: datosPersonal ? datosPersonal.name : '',
                whatsapp: datosPersonal ? datosPersonal.whatsapp : '',
                cedula: datosPersonal ? datosPersonal.cedula : '',
                envio: "Portal web",
                metodoPago: metodoPago,
                direccion: datosPersonal ? datosPersonal.direccion : ''
            })
            setChecked(false)
            console.log(datosPersonal)
        } else {
            setChecked(true)
            setPerson({
                ...datosPerson,
                email: clineteLogeado ? clineteLogeado.email : '',
                name: clineteLogeado ? clineteLogeado.name : '',
                whatsapp: clineteLogeado ? clineteLogeado.whatsapp : '',
                cedula: clineteLogeado ? clineteLogeado.cedula : '',
                metodoPago: metodoPago,
                direccion: clineteLogeado ? clineteLogeado.direccion : '',
                envio: "Portal web",
                metodoPago: metodoPago,
            })
        }
        let mostrarcomision = GetMetodo()
        const mostrar = mostrarcomision != "Tarjeta" ? "d-none" : ""
        sethideComision(mostrar)
    }, [modalshow.nombre == "ModalDetalle" ? true : false, actualState])
    function CodigoValido() {
        this.preventDefault()
        let codigos = document.getElementById("basic-codigo");
        
        if (CODIGO =="WDXMMF"){
            if (codigos.value ==="URBAN2024") return
            if (codigos.value == "") return
            $.confirm({
                theme: 'supervan',
                closeIcon: true,
                title: 'Validar código',
                content: 'Una vez validado el codigo no podra volver a ser usado',
                type: 'red',
                buttons: {
                    tryAgain: {
                        text: 'Aceptar ',
                        btnClass: 'btn-red',
                        action: function () {
                            let datosPersonal = getDatosUsuariosLocalStorag()
                           
                            Consultar_codigos({ cedula: datosPersonal.cedula, codigo: codigos.value,radio:true }).then(ou => {
                                if (ou.estado) {
                                    let co = document.getElementById("codigocontry")
                                    let co1 = document.getElementById("codigocontry")
                                    let eventoinfo = JSON.parse(sessionStorage.getItem("infoevento"))
                                    sessionStorage.setItem("codicontry", "true")
                                    console.log(ou)
                                    let clineteLogeado = getCliente()
                                    let metodoPago = GetMetodo()
                                    ListaPrecioset(GetValores())
                                    console.log({ ...eventoinfo, post: ou.codigo })
                                    sessionStorage.setItem("infoevento", JSON.stringify({ ...eventoinfo, post: ou.codigo }))
                                    co.classList.add("d-none")
                                    co1.classList.add("d-none")
                                    /*setDatoToas({
                                        show: true,
                                        message: ou.mensaje,
                                        color: 'bg-success',
                                        estado: 'Verificación validad',
                                    })*/
                                    $.confirm({
                                        title: 'Verificación validad',
                                        content: ou.mensaje,
                                        type: 'green',
                                        typeAnimated: true,
                                        buttons: {
                                            tryAgain: {
                                                text: 'cerrar',
                                                btnClass: 'btn-green',
                                                action: function () {
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    /*setDatoToas({
                                        show: true,
                                        message: ou.mensaje,
                                        color: 'bg-danger',
                                        estado: 'Verificación invalidad',
                                    })*/
                                    console.log(ou)
                                    $.confirm({
                                        title: 'Verificación invalidad',
                                        content: ou.mensaje,
                                        type: 'red',
                                        typeAnimated: true,
                                        buttons: {
                                            tryAgain: {
                                                text: 'cerrar',
                                                btnClass: 'btn-red',
                                                action: function () {
                                                }
                                            }
                                        }
                                    });
                                }
                            }).catch(erro => {
                                setDatoToas({
                                    show: true,
                                    message: "Por favor intente más tarde",
                                    color: 'bg-danger',
                                    estado: 'Hubo un error',
                                })
                            })
                        }
                    },
                    aproba: {
                        text: "Cancelar ",
                        btnClass: 'btn-success',
                        action: function () {
                        }
                    }
                }
            });
            return
        }
        if (codigos.value == "") return
        if (codigos.value === "PLAZACORONEL") return
        $.confirm({
            theme: 'supervan',
            closeIcon: true,
            title: 'Validar código',
            content: 'Una vez validado el codigo no podra volver a ser usado',
            type: 'red',
            buttons: {
                tryAgain: {
                    text: 'Aceptar ',
                    btnClass: 'btn-red',
                    action: function () {
                        let datosPersonal = getDatosUsuariosLocalStorag()
                        Consultar_codigos({ cedula: datosPersonal.cedula, codigo: codigos.value, radio: true }).then(ou => {
                            if (ou.estado) {
                                let co = document.getElementById("codigocontry")
                                let co1 = document.getElementById("codigocontry")
                                let eventoinfo = JSON.parse(sessionStorage.getItem("infoevento"))
                                sessionStorage.setItem("codicontry", "true")
                                console.log(ou)
                                let clineteLogeado = getCliente()
                                let metodoPago = GetMetodo()
                                ListaPrecioset(GetValores())
                                console.log(ou)
                                sessionStorage.setItem("infoevento", JSON.stringify({ ...eventoinfo, post: ou.codigo }))
                                co.classList.add("d-none")
                                co1.classList.add("d-none")
                                /*setDatoToas({
                                    show: true,
                                    message: ou.mensaje,
                                    color: 'bg-success',
                                    estado: 'Verificación validad',
                                })*/
                                $.confirm({
                                    title: 'Verificación validad',
                                    content: ou.mensaje,
                                    type: 'green',
                                    typeAnimated: true,
                                    buttons: {
                                        tryAgain: {
                                            text: 'cerrar',
                                            btnClass: 'btn-green',
                                            action: function () {
                                            }
                                        }
                                    }
                                });
                            } else {
                                /*setDatoToas({
                                    show: true,
                                    message: ou.mensaje,
                                    color: 'bg-danger',
                                    estado: 'Verificación invalidad',
                                })*/
                                $.confirm({
                                    title: 'Verificación invalidad',
                                    content: ou.mensaje,
                                    type: 'red',
                                    typeAnimated: true,
                                    buttons: {
                                        tryAgain: {
                                            text: 'cerrar',
                                            btnClass: 'btn-red',
                                            action: function () {
                                            }
                                        }
                                    }
                                });
                            }
                        }).catch(erro => {
                           console.log(erro)
                        })
                    }
                },
                aproba: {
                    text: "Cancelar ",
                    btnClass: 'btn-success',
                    action: function () {
                    }
                }
            }
        });
    }
    function sonPrimerosCuatroDigitosAmericanExpress(numeroTarjeta) {
        const primerosCuatroDigitos = numeroTarjeta
        return /^(34|37)/.test(primerosCuatroDigitos);
    }
    function tarjetaValido() {
        let codigos = document.getElementById("basic-codigo1");
        //console.log(codigos.value)
        if (codigos.value == "") return
        $.confirm({
            theme: 'supervan',
            closeIcon: true,
            title: 'Validar código',
            content: 'Una vez validado el codigo no podra volver a ser usado',
            type: 'red',
            buttons: {
                tryAgain: {
                    text: 'Aceptar ',
                    btnClass: 'btn-red',
                    action: function () {
                        let datosPersonal = getDatosUsuariosLocalStorag()
                        if (sonPrimerosCuatroDigitosAmericanExpress(codigos.value)) {
                            let co = document.getElementById("codigocontry1")
                            let co1 = document.getElementById("codigocontry")
                            let eventoinfo = JSON.parse(sessionStorage.getItem("infoevento"))
                            sessionStorage.setItem("codicontry", "true")
                            //console.log(ou)
                            let clineteLogeado = getCliente()
                            let metodoPago = GetMetodo()
                            ListaPrecioset(GetValores())
                            //console.log({ ...eventoinfo, post: ou.codigos.codigo })
                            //sessionStorage.setItem("infoevento", JSON.stringify({ ...eventoinfo, post: ou.codigos.codigo }))
                            co.classList.add("d-none")
                            co1.classList.add("d-none")
                            /*setDatoToas({
                                show: true,
                                message: ou.mensaje,
                                color: 'bg-success',
                                estado: 'Verificación validad',
                            })*/
                            $.confirm({
                                title: 'Verificación validad',
                                content: '',
                                type: 'green',
                                typeAnimated: true,
                                buttons: {
                                    tryAgain: {
                                        text: 'cerrar',
                                        btnClass: 'btn-green',
                                        action: function () {
                                        }
                                    }
                                }
                            });
                        } else {
                            /*setDatoToas({
                                show: true,
                                message: ou.mensaje,
                                color: 'bg-danger',
                                estado: 'Verificación invalidad',
                            })*/
                            $.confirm({
                                title: 'Verificación invalidad',
                                content: '',
                                type: 'red',
                                typeAnimated: true,
                                buttons: {
                                    tryAgain: {
                                        text: 'cerrar',
                                        btnClass: 'btn-red',
                                        action: function () {
                                        }
                                    }
                                }
                            });
                        }
                    }
                },
                aproba: {
                    text: "Cancelar ",
                    btnClass: 'btn-success',
                    action: function () {
                    }
                }
            }
        });
    }
    return (
        <Modal
            show={modalshow.nombre == "ModalDetalle" ? true : false}
            onHide={handleDetalleColse}
            size="lg"
            fullscreen={'md-down'}
            centered
        >
            <Modal.Header className=' py-3 text-light  bg-dark  '
                style={{
                    backgroundColor: '#311C7C'
                }}
            >
                {intervalo ? <h5 className="modal-title text-center py-3 justify-content-center" style={{ fontWeight: "bold" }}>Tiempo restante para la compra <span className="text-danger" >{intervalo} </span></h5> : ''}
                <button type="button" className="close text-white"
                    onClick={handleDetalleColse}>
                    X
                </button>
            </Modal.Header>
            <Modal.Body>

                <div className="container-fluid px-0 flex-wrap-reverse justify-content-center " style={{ height: "auto" }}>
                    <div className="row p-4 ">
                        <div className="col-12 col-lg-6">
                            <h3>Resumen de compra</h3>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-end">

                            <button className="btn d-none  btn-primary" onClick={handleDetalleColse}
                                data-backdrop="static" data-keyboard="false">  <i className="bi bi-caret-left-fill"></i>  REGRESAR</button>
                        </div>
                    </div>
                    {userauthi.login ? <div className={"container-fluid row " + validationfrom} >


                        <div className="col-12 col-sm-6 d-flex flex-column">
                            <span>Forma de Pago:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                name="metodoPago"
                                value={datosPerson.metodoPago ? datosPerson.metodoPago : ''}
                                id="formaPago" disabled={true}
                                placeholder="forma de pago Selecionada"
                            />
                            <div className="d-none col-12  border border-bottom mb-3"></div>


                            <span>Cédula DNI:</span>
                            <input type="text"
                                className="numero form-control form-control-sm"
                                id="dni"
                                maxLength={10}
                                disabled={clienteauth}
                                name='cedula'
                                value={datosPerson.cedula ? datosPerson.cedula : ''}
                                onChange={(e) => handelchange(e.target)}
                                placeholder="Ingrese su numero de identificacion"
                            />

                            <span>Nombre Completo:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="name"
                                disabled={(clienteauth && datosPerson.name != ' ')}
                                name="name"
                                value={datosPerson.name ? datosPerson.name : ''}
                                onChange={(e) => hanbleDatos(e)}

                                placeholder="Ingrese su nombre completo"
                            />
                        </div>
                        <div className="col-12 col-sm-6 d-flex flex-column   ">
                            <span>Forma de envío:</span>
                            <div>
                                <input
                                    className='form-control'
                                    disabled
                                    value={datosPerson.envio}
                                    id="envio" name="envio"
                                />

                            </div>

                            <div className=" d-none col-12 border border-bottom mb-3"></div>

                            <span>Correo:</span>
                            <input type="email"
                                className="form-control form-control-sm"
                                id="email"
                                name='email'
                                disabled={(clienteauth && datosPerson.email != '')}
                                required
                                value={datosPerson.email ? datosPerson.email : ''}
                                onChange={(e) => hanbleDatos(e)}
                                placeholder="Ingrese su correo electrónico"
                            />

                            <span>Whatsapp Contacto:</span>
                            <input type="text"
                                className="numero form-control form-control-sm"
                                id="whatsapp"
                                name="whatsapp"
                                minLength={10}
                                maxLength={10}
                                required
                                disabled={true}
                                value={datosPerson.whatsapp ? datosPerson.whatsapp : ''}
                                onChange={(e) => hanbleDatos(e)}
                                placeholder="Ingrese su whatsapp o numero de contacto"
                            />

                        </div>
                        <div className="col-12 col-sm-12 d-flex flex-column">
                            <span>Dirección:</span>
                            <input type="text"
                                className="form-control form-control-sm"
                                id="direccion"
                                name="direccion"
                                maxLength={255}
                                required
                                disabled={(clienteauth && datosPerson.direccion != '')}
                                value={datosPerson.direccion ? datosPerson.direccion : ''}
                                onChange={(e) => hanbleDatos(e)}
                                placeholder="Ingrese su direccion"
                            />
                        </div>
                    </div> : ""}
                    <div className="container-fluid table-responsive px-0">
                        <table className="resumen-table table ">
                            <thead>
                                <tr className="text-black">
                                    <th scope="col" className="text-black">CONCIERTO</th>
                                    <th className="text-black">LOCALIDAD</th>

                                    <th className="text-black" scope="col">ASIENTO</th>
                                    <th className="text-black" scope="col">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listarCarritoDetalle.length > 0 ?
                                        listarCarritoDetalle.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="align-self-center">{item.nombreConcierto}</td>
                                                    <td className="align-self-center">{item.localidad}</td>
                                                    <td className="align-self-center">{item.cantidad}</td>
                                                    <td className="align-self-center">${GetEstadousu().discapacidad == "No" ? (item.valor * item.cantidad) - (parseFloat(item.localidaEspacio.comision_boleto * item.cantidad)) : item.discapacidad * item.cantidad}</td>
                                                </tr>
                                            )
                                        })
                                        : <tr></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table className="table table-borderless " style={{
                            lineHeight: 1
                        }}>
                            <tbody>
                                <tr>
                                    <th scope="row"></th>
                                    <td className='text-end' >Subtotal:</td>
                                    <td className='text-center'>${parseFloat(listaPrecio.subtotal).toFixed(2)}</td>
                                </tr>
                                <tr className={hidecomision}>
                                    <th scope="row"></th>
                                    <td className={hidecomision + " text-end"} >Comisión Bancaria:</td>
                                    <td className={hidecomision + " text-center"}>${parseFloat(listaPrecio.comision_bancaria).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th scope="row"></th>
                                    <td className='text-end' >Servicio Em. por Boleto:</td>
                                    <td className='text-center'>${parseFloat(listaPrecio.comision).toFixed(2)}</td>
                                </tr>
                                <tr className=''>
                                    <th scope="row"></th>
                                    <td className='text-end' >Iva %:</td>
                                    <td className='text-center'>${parseFloat(listaPrecio.iva).toFixed(2)}</td>
                                </tr>
                                <tr>

                                    <th scope="row"></th>
                                    <td className='text-end' >
                                        {codigoEvento == "9EGM42" || codigoEvento == "ANNKV7" ?

                                            "Total con Descuento" : "Total"}</td>
                                    <td className='text-center'>${parseFloat(listaPrecio.total).toFixed(2) }</td>
                                </tr >
                                {codigoEvento == "9EGM42" || codigoEvento == "ANNKV7" ?
                                    <tr className="d-none">
                                        <th scope="row d-none"></th>
                                        <td className='text-end' >Total Desc:</td>
                                        <td className='text-center'>${GetMetodo() === "Tarjeta" ? parseFloat(listaPrecio.desctc).toFixed(2) : parseFloat(listaPrecio.desc).toFixed(2)}</td>
                                    </tr> : ""}
                            </tbody>
                        </table>
                    </div>
                    <div className="row p-1 d-none float-rigth">
                        <div className="col-6 col-lg-8 text-end d-flex align-items-end flex-column  ">
                            <div>
                                <h4>Subtotal:</h4>
                            </div>
                            <div>
                                <p>Comisión por Boleto:</p>
                            </div>
                            <div>
                                <p>Iva:</p>
                            </div>
                            <div className={hidecomision}>
                                <p>Comisión Bancaria:</p>
                            </div>
                            <div>
                                <h4>Total</h4>
                            </div>
                            <div className=''>
                                <h4></h4>
                            </div>Total Desc:
                        </div>
                        <div className="col-6 col-sm text-end align-items-end flex-column ">
                            <div className="container ">
                                <h4 className="subtotal">${parseInt(listaPrecio.subtotal).toFixed(2)} </h4>
                            </div>
                            <div className="container-fluid">
                                <h4 className="comision-boleto text-end">${parseInt(listaPrecio.comision).toFixed(2)} </h4>
                            </div>
                            <div className="container-fluid">
                                <h4 className="comision-boleto text-end">${parseInt(listaPrecio.comision).toFixed(2)} </h4>
                            </div>
                            <div className={"container-fluid " + hidecomision}>
                                <h4 className="comision-boleto text-end">${parseFloat(listaPrecio.comision_bancaria).toFixed(2)} </h4>
                            </div>
                            <div className="container  ">
                                <h4 className="total-text"> ${GetMetodo() === "Tarjeta" ? parseFloat(listaPrecio.total).toFixed(2) : (parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.comision)).toFixed(2)} </h4>
                            </div>
                            <div className="container -none ">
                                <h4 className="total-text"> ${GetMetodo() === "Tarjeta" ? parseFloat(listaPrecio.desctc).toFixed(2) : parseFloat(listaPrecio.desc).toFixed(2)} </h4>
                            </div>

                        </div>

                    </div>
                    <div className="row pb-3">

                        <div className="col-11  text-center text-lg-end align-items-end ">
                            <div className="d-flex  justify-content-end pb-2">
                                <div>
                                    {CODIGO == "CDKH71" ?
                                        (JSON.parse(sessionStorage.getItem("codicontry")) != true) ? <div className="input-group" id='codigocontry' >
                                            <label className='form-label px-2'>Ingrese el código de descuento</label>
                                            <input className="form-control" id="basic-codigo" placeholder="Codigo Country Club" />
                                            <button class="input-group-text btn-success" onClick={CodigoValido}>validar</button>
                                        </div> : ""
                                        : ""}
                                    {CODIGO == "WDXMMF" || CODIGO =="4433LG"?
                                        <div className="input-group" id='codigocontry' >
                                            <div class="d-block d-sm-block d-md-none col-12">Ingrese el código de Radio</div>
                                            <label className='form-label px-2 d-none d-sm-none d-md-block'>Ingrese el código de Radio</label>
                                            <input className="form-control" id="basic-codigo" placeholder="Codigo" />
                                            <button class="input-group-text btn-success" onClick={CodigoValido}>validar</button>
                                        </div>:""

                                    }
                                    {
                                        CODIGO == "CDKH71" && GetMetodo() == "Tarjeta" ?
                                            (JSON.parse(sessionStorage.getItem("codicontry")) != true) ? <div className="input-group pt-1 
                                             
                                            " id='codigocontry1' >
                                                <div className='col-12'> <p>Diquite el codigo</p> </div>
                                                <label className='form-label px-2 '>Digita los 6 primeros números de tu tarjeta</label>
                                              
                                                <input className="form-control" id="basic-codigo1" placeholder="Descuento American express" />
                                                <button class="input-group-text btn-success" onClick={tarjetaValido}>validar</button>
                                            </div> : ""
                                            : ""

                                    }

                                </div>
                            </div>
                            {
                                !clienteauth && datosPerson.metodoPago == "Tarjeta" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        onClick={() => (userauthi.login) ? handlePago() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" }))}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR </button> : ""
                            }
                            {
                                !clienteauth && datosPerson.metodoPago == "Efectivo"  ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        onClick={() => { if (validarEmail(datosPerson.email)) { (userauthi.login) ? detposito() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" })) } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                /** disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))} */
                                !clienteauth && datosPerson.metodoPago == "Deposito" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        onClick={() => { if (validarEmail(datosPerson.email)) { (userauthi.login) ? handelReporShow() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" })) } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {/* disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))} */
                                !clienteauth && datosPerson.metodoPago == "Transferencia" ?
                                    <button id="pagarcuenta" className="btn btn-primary"

                                        onClick={() => { if (validarEmail(datosPerson.email)) { (userauthi.login) ? handelReporShow() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" })) } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                !clienteauth && !datosPerson.metodoPago ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: "e" }))}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                clienteauth && datosPerson.metodoPago == "Tarjeta" ?
                                    <button id="pagarcuenta" className="btn btn-primary"

                                        onClick={() => (userauthi.login) ? abrirPago() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" }))}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR  </button> : ""
                            }
                            {
                                clienteauth && datosPerson.metodoPago == "Efectivo" ?
                                    <button id="pagarcuenta" className="btn btn-primary"

                                        onClick={() => { if (validarEmail(datosPerson.email)) { (userauthi.login) ? detposito() : usedispatch(setModal({ nombre: 'loginpage', estado: " e" })) } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                clienteauth && datosPerson.metodoPago == "Deposito" ?
                                    <button id="pagarcuenta" className="btn btn-primary"

                                        onClick={() => { if (validarEmail(datosPerson.email)) { (userauthi.login) ? handelReporShow() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" })) } }}
                                    >
                                        <i className="fa fa-credit-card me-2"> </i>PAGAR </button> : ""
                            }
                            {
                                /*  disabled = {!(datosPerson.envio != '')}
                                   */
                                clienteauth && datosPerson.metodoPago == "Transferencia" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        onClick={() => { if (validarEmail(datosPerson.email)) { (userauthi.login) ? handelReporShow() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" })) } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                datosPerson.metodoPago === null ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: "e" }))}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                (datosPerson.metodoPago === "Efectivo-Local" || datosPerson.metodoPago ==="Recaidacion Terceros") ?
                                    <button id="pagarcuenta" className="btn btn-primary"

                                        onClick={() => { if (validarEmail(datosPerson.email)) { (userauthi.login) ? detposito() : usedispatch(setModal({ nombre: 'loginpage', estado: "e" })) } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }




                        </div>
                    </div>
                </div>
                <div className={spinervi}
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
                        <h4 className='text-light'>Consultando datos ...</h4>


                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalDetalle;