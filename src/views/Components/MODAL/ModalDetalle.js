import React, { useEffect, useState } from 'react';
import { Modal, Spinner, InputGroup } from "react-bootstrap"
import { GetMetodo, GetValores } from 'utils/CarritoLocalStorang';
import { Envio, DatosUsuariocliente } from 'utils/constantes';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { DatosUsuariosLocalStorag, getCliente } from 'utils/DatosUsuarioLocalStorag';
import { getCedula } from 'utils/DatosUsuarioLocalStorag';
import { ValidarWhatsapp, GuardarDatosdelComprador, EnviarmensajeWhastapp, Authsucrito } from 'utils/Query';
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import { useDispatch, useSelector } from "react-redux";
import { addususcritor } from 'StoreRedux/Slice/SuscritorSlice';
import { getVerTienda, GetEstadousu } from 'utils/CarritoLocalStorang';

function ModalDetalle(props) {
    const {
        listarCarritoDetalle, setListarCarritoDetalle,

        setDatoToas, intervalo
    } = props
    const usedispatch = useDispatch()

    const modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [actualState, changeCheckState] = useState({
        check1: false,
        check2: false,
        check3: false
    });
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
        envio: '',
        direccion: '',
    })
    const detposito = () => usedispatch(setModal({ nombre: "modalpago", estado: "" }))
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
                setDatoToas({
                    show: true,
                    message: 'Ingrese un nuemro Válido',
                    color: 'bg-danger',
                    estado: 'Numero de Whatsapp inválido',
                })
                return false
            }
            else if (validarEmail(datosPerson.email)) {
                const { success, message } = await GuardarDatosdelComprador()
                if (success) {
                    const { data } = await Authsucrito(user)
                    var hoy = new Date();
                    let users = {
                        ...datos, cedula: data.cedula, direccion: data.ciudad, whatsapp: data.movil, telefono: data.movil, name: data.nombreCompleto,
                        email: data.email, hora: String(hoy), enable: data.enable, id: data.id, metodoPago: datosPerson.metodoPago, envio: datosPerson.envio,
                    }
                    DatosUsuariosLocalStorag({ users })
                    sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
                    usedispatch(addususcritor({ users }))

                    //setDetalle(!showDetalle)
                    usedispatch(setModal({ nombre: 'ModalPago', estado: '' }))
                    //setModalPago(true)
                }
                else {
                    setDatoToas({
                        show: true,
                        message: "Ingrese un correo diferente o inicie sección",
                        color: 'bg-danger',
                        estado: "Correo " + datosPerson.email + " Duplicado",
                    })
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
        //setDetalle(!showDetalle)
        usedispatch(setModal({ nombre: 'ModalPago', estado: '' }))
        //setModalPago(true)
    }
    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0
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
            console.log(datos)
            if (name) {
                DatosUsuariosLocalStorag({ ...datos, cedula: value, envio: datosPerson.envio, whatsapp: '', discapacidad: discapacidad })

                setPerson({
                    ...datosPerson,
                    email: email ? email : '',
                    name: name,
                    cedula: value,
                    direccion: direccion ? direccion : '',
                    envio: datosPerson.envio,
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
                    envio: datosPersonal.envio,
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
                envio: datosPersonal ? datosPersonal.envio : '',
                metodoPago: metodoPago,
                direccion: datosPersonal ? datosPersonal.direccion : ''
            })
            setChecked(false)
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
                envio: datosPersonal ? datosPersonal.envio : '',
                metodoPago: metodoPago,
            })

        }
        let mostrarcomision = GetMetodo()
        const mostrar = mostrarcomision != "Tarjeta" ? "d-none" : ""
        sethideComision(mostrar)
    }, [modalshow.nombre == "ModalDetalle" ? true : false, actualState])
    return (
        <Modal
            show={modalshow.nombre == "ModalDetalle" ? true : false}
            onHide={handleDetalleColse}
            size="lg"
            fullscreen={'md-down'}
            centered

        >
            <Modal.Header className='  text-light border  border-dark '

            >
                <h5 className="modal-title text-center py-3 justify-content-center" style={{ fontWeight: "bold" }}>Tiempo restante para la compra <span className="text-danger" >{intervalo} </span></h5>

                <button type="button" className="close text-white"
                    onClick={handleDetalleColse}>
                    X
                </button>
            </Modal.Header>

            <Modal.Body>

                <div className="container-fluid flex-wrap-reverse justify-content-center " style={{ height: "auto" }}>
                    <div className="row p-4 ">
                        <div className="col-12 col-lg-6">
                            <h3>Resumen de compra</h3>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-end">

                            <button className="btn d-none  btn-primary" onClick={handleDetalleColse}
                                data-backdrop="static" data-keyboard="false">  <i className="bi bi-caret-left-fill"></i>  REGRESAR</button>
                        </div>
                    </div>
                    <div className={"container-fluid row " + validationfrom} >


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


                            <span>Cedula DNI:</span>
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
                                <select className="form-select" required

                                    value={datosPerson.envio ? datosPerson.envio : ''} id="envio" name="envio" onChange={(e) => hanbleDatos(e)}>
                                    {
                                        Envio.map((item, index) => {
                                            return (
                                                <option key={index} value={item.value}>{item.envio}</option>
                                            )
                                        })
                                    }
                                </select>
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
                            <span>Direccion:</span>
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
                    </div>
                    <div className="container-fluid table-responsive">
                        <table className="resumen-table table ">
                            <thead>
                                <tr className="text-black">
                                    <th scope="col" className="text-black">CONCIENTO</th>
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
                                                    <td className="align-self-center">${GetEstadousu().discapacidad == "No" ? item.valor * item.cantidad : item.discapacidad * item.cantidad}</td>
                                                </tr>
                                            )
                                        })
                                        : <tr></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row p-1 float-rigth">
                        <div className="col-6 col-lg-8 text-end d-flex align-items-end flex-column  ">
                            <div>
                                <h4>Subtotal:</h4>
                            </div>
                            <div>
                                <p>Comision por Boleto:</p>
                            </div>
                            <div className={hidecomision}>
                                <p>Comision Bancaria:</p>
                            </div>
                            <div>
                                <h4>Total:</h4>
                            </div>
                        </div>
                        <div className="col-6 col-sm text-end align-items-end flex-column ">
                            <div className="container ">
                                <h4 className="subtotal">${parseInt(listaPrecio.subtotal).toFixed(2)} </h4>
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

                        </div>

                    </div>
                    <div className="row pb-3">
                        <div className="col-12 col-lg-10 text-end d-flex flex-column  ">
                            {!clienteauth ? <div className="d-flex text-end  flex-wrap-reverse ">
                                <div className="col-10 text-end">
                                    <p style={{ fontSize: "0.7em" }}>Acepto los <strong>Términos y condiciones</strong> emitidas por
                                        t-icket</p>
                                </div>
                                <div className="px-3">
                                    <input className="form-check-input terminoscheck"
                                        checked={actualState.check1}
                                        id="check1"
                                        name="check1"
                                        onChange={(e) => handleCheckboxChange(e.target)}
                                        type="checkbox" />
                                </div>
                            </div> : ""}

                            {!clienteauth ? <div className="d-flex text-end  flex-wrap-reverse ">
                                <div className="col-10 d-flex text-end">
                                    <p style={{ fontSize: "0.7em" }}>
                                        Acepto que para canjear los tickets, debo presentar la tarjeta con la que fue
                                        realizada la compra , caso contrario no podra retirar los boletos duros sin opcion a
                                        rembolso
                                    </p>
                                </div>
                                <div className="px-3">
                                    <input className="form-check-input terminoscheck" id="check2" type="checkbox"
                                        checked={actualState.check2}
                                        name="check2"
                                        onChange={(e) => handleCheckboxChange(e.target)}
                                    />
                                </div>
                            </div> : ""}
                            {!clienteauth ? <div className="d-flex text-end  flex-wrap-reverse ">
                                <div className="col-10 d-flex text-end">
                                    <strong>
                                        <p style={{ fontSize: "0.8em" }}>
                                            <strong> Acepto que se cree mi cuenta de usuario en el portal de flasthetickets, la misma que contiene mis datos persoanales, así como los
                                                datos de mis compras, tambien recibir las promociones por ese mismo medio.</strong>
                                        </p>
                                    </strong>
                                </div>
                                <div className="px-3">
                                    <input className="form-check-input terminoscheck" id="check3"
                                        checked={actualState.check3}
                                        name="check3" type="checkbox"
                                        onChange={(e) => handleCheckboxChange(e.target)} />
                                </div>
                            </div> : ""}

                        </div>
                        <div className="col-12 col-lg-2 text-center align-items-end ">
                            {
                                !clienteauth && datosPerson.metodoPago == "Tarjeta" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))}
                                        onClick={handlePago}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR </button> : ""
                            }
                            {
                                !clienteauth && datosPerson.metodoPago == "Efectivo" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))}
                                        onClick={() => { if (validarEmail(datosPerson.email)) { detposito() } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                !clienteauth && (datosPerson.metodoPago == "Deposito" || datosPerson.metodoPago == "Transferencia") ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(Object.values(datosPerson).every((d) => d) && Object.values(actualState).every((d) => d))}
                                        onClick={() => { if (validarEmail(datosPerson.email)) { handelReporShow() } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                !clienteauth && !datosPerson.metodoPago ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={true}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                clienteauth && datosPerson.metodoPago == "Tarjeta" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(datosPerson.envio != '')}
                                        onClick={abrirPago}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR </button> : ""
                            }
                            {
                                clienteauth && datosPerson.metodoPago == "Efectivo" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(datosPerson.envio != '')}
                                        onClick={() => { if (validarEmail(datosPerson.email)) { detposito() } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                clienteauth && (datosPerson.metodoPago == "Deposito" || datosPerson.metodoPago) == "Transferencia" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(datosPerson.envio != '')}
                                        onClick={() => { if (validarEmail(datosPerson.email)) { handelReporShow() } }}
                                    >
                                        <i className="fa fa-credit-card "> </i>PAGAR</button> : ""
                            }
                            {
                                datosPerson.metodoPago === null ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={true}
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