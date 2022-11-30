import React, { useEffect, useState } from 'react';
import { Modal, Spinner, InputGroup } from "react-bootstrap"
import { GetMetodo, GetValores, getVerTienda } from 'utils/CarritoLocalStorang';
import { Envio, DatosUsuariocliente } from 'utils/constantes';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { DatosUsuariosLocalStorag, getCliente } from 'utils/DatosUsuarioLocalStorag';
import { getCedula } from 'utils/DatosUsuarioLocalStorag';
import { cargarEventoActivo, cargarMapa, } from "utils/Querypanelsigui";
import { GetSuscritores, EliminarSuscrito } from "utils/Querypanel";
import { ValidarWhatsapp, GuardarDatosdelComprador, EnviarmensajeWhastapp, Authsucrito } from 'utils/Query';
import { useDispatch } from "react-redux";
import { addususcritor } from 'StoreRedux/Slice/SuscritorSlice';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { GetEstadousu } from 'utils/CarritoLocalStorang';

function ModalDetalle(props) {
    const { showDetalle, handleDetalleColse,
        listarCarritoDetalle, setListarCarritoDetalle,
        setModalPago, efectiOpShow,
        setDetalle, intervalo, pararcontador, setrepShow
    } = props
    const [suscritores, setsuscritor] = useState([])
    const usedispatch = useDispatch()
    const [actualState, changeCheckState] = useState({ check1: false, check2: false, check3: false });
    const [clienteauth, setChecked] = useState(false)
    const [spinervi, setspiner] = useState("d-none")
    const [hidecomision, sethideComision] = useState("d-none")
    const [validationfrom, setValidation] = useState("")
    const [datosPerson, setPerson] = useState({
        cedula: '', name: '', email: '', whatsapp: '',
        metodoPago: '', envio: '', direccion: '',
    })
    const nuevoevento = async () => {
        try {
            const data = await GetSuscritores()
            if (data.users.length > 0) {
                setsuscritor(data.users)

            }
        } catch (error) {
            console.log(error)
        }
    }
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
    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0
    })
    async function handelchange(e) {
        let metodoPago = GetMetodo()
        let datosPersonal = getDatosUsuariosLocalStorag()
        const { value, name } = e;
        setPerson({
            ...datosPerson,
            [name]: value
        })
        if (name === "cedula" && value.length == 10) {
            try {
                setspiner("")
                let infosubs = suscritores.find((e) => e.cedula == value)
                const datos = await getCedula(value)
                const { discapacidad } = datos
                if (infosubs != undefined) {
                    setChecked(true)
                    const { ciudad, email, movil, nombreCompleto } = infosubs
                    setspiner("d-none")
                    setPerson({
                        ...datosPerson, email: email, cedula: value, direccion: ciudad, envio: datosPerson.envio,
                        whatsapp: movil, metodoPago: metodoPago, name: nombreCompleto, metodoPago: metodoPago
                    })
                    DatosUsuariosLocalStorag({
                        ...datosPersonal, email: email, cedula: value, direccion: ciudad, envio: datosPerson.envio,
                        whatsapp: movil, metodoPago: metodoPago, name: nombreCompleto, metodoPago: metodoPago, discapacidad: discapacidad
                    })
                    //   setChecked(true)
                    ListaPrecioset(GetValores())
                    setListarCarritoDetalle(getVerTienda())
                }
                else {
                    setChecked(false)
                    const datos = await getCedula(value)
                    const { name, email, direccion, discapacidad } = datos
                    if (name) {
                        DatosUsuariosLocalStorag({ ...datos, cedula: value, envio: datosPerson.envio, whatsapp: '' })
                        setPerson({
                            ...datosPerson, email: email ? email : '', name: name,
                            cedula: value, direccion: direccion ? direccion : '',
                            envio: datosPerson.envio, whatsapp: '', metodoPago: metodoPago, discapacidad: discapacidad
                        })
                        setspiner("d-none")
                        ListaPrecioset(GetValores())
                        setListarCarritoDetalle(getVerTienda())
                    } else {
                        sessionStorage.removeItem("DatosUsuarioLocalStorang")
                        setPerson({
                            ...datosPerson,
                            email: '',
                            name: '',
                            direccion: '',
                        })
                        setspiner("d-none")
                        usedispatch(setToastes({
                            show: true,
                            message: 'Ingrese el número de cédula correcta o intente mas tarde',
                            color: 'bg-danger',
                            estado: 'No se encontraron datos',
                        }))
                        ListaPrecioset(GetValores())
                        setListarCarritoDetalle(getVerTienda())
                    }
                }
            } catch (error) {
                setspiner("d-none")
                console.log(error)
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
        if (datosPerson.whatsapp.length != 10 && datosPerson.whatsapp.substring(0, 1) != 0) {
            setValidation("was-validated")
            usedispatch(setToastes({
                show: true,
                message: 'Ingrese un formato de Whatsapp válido',
                color: 'bg-danger',
                estado: 'Numero de Whatsapp inválido',
            }))
            return false
        }
        else if (emailRegex.test(valor)) {
            return true
        } else {
            setValidation("was-validated")
            setPerson({
                ...datosPerson,
                email: ''
            })
            usedispatch(setToastes({
                show: true,
                message: 'Campos inconpletos o Formato de correo inválido ',
                color: 'bg-danger',
                estado: 'Complete la información',
            }))
            return false
        }
    }
    function GenerarPDF() {
        var element = document.getElementById('detalle');
        var opt = {
            margin: 1,
            filename: 'Compra.pdf',
            html2canvas: { scale: 2 },
        };
        html2pdf(element, opt);

    }
    const handelefctivorShow = async () => {
        let datos = await getDatosUsuariosLocalStorag()
        let nuemro = await ValidarWhatsapp()
        if (nuemro == null) {
            //GenerarPDF()
            efectiOpShow(true)
            //console.log(nuemro)
            //pararcontador()
            setDetalle(false)
            return
        }

    }

    async function handlePago() {
        let nuemro = await ValidarWhatsapp()
        if (nuemro == null) {
            // pararcontador()
            setDetalle(!showDetalle)
            setModalPago(true)
        }
    }
    const handelReporShow = async () => {
        let datos = await getDatosUsuariosLocalStorag()

        // let suscritor = suscritores.filter((e) => e.cedula == datosPerson.cedula)
        //   console.log(clienteauth)
        try {
            let nuemro = await ValidarWhatsapp()
            if (nuemro == null) {
                //  pararcontador()
                setrepShow(true)
                setDetalle(false)
            }
        } catch (error) {
            usedispatch(setToastes({
                show: true,
                message: "Verifique su conexión o intente mas tarde",
                color: 'bg-danger',
                estado: "Hubo un error",
            }))
            console.log("Error---", error)
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
        (async () => {
            await nuevoevento()
        })()
        let datosPersonal = getDatosUsuariosLocalStorag()
        let clineteLogeado = getCliente()
        setChecked(datosPersonal != null ? true : false)
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
                /* DatosUsuariosLocalStorag({
                     ...datosPersonal,
                     ['metodoPago']: metodoPago,
                     direccion: datosPersonal.direccion,
                 })*/
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
            /* DatosUsuariosLocalStorag({
                 ...datosPerson,
                 ['metodoPago']: metodoPago,
                 email: clineteLogeado ? clineteLogeado.email : '',
                 name: clineteLogeado ? clineteLogeado.name : '',
                 whatsapp: clineteLogeado ? clineteLogeado.whatsapp : '',
                 cedula: clineteLogeado ? clineteLogeado.cedula : '',
                 direccion: clineteLogeado ? clineteLogeado.direccion : '',
                 envio: datosPersonal ? datosPersonal.envio : '',
             })*/
        }
        let mostrarcomision = GetMetodo()
        const mostrar = mostrarcomision != "Tarjeta" ? "d-none" : ""
        sethideComision(mostrar)
    }, [showDetalle, actualState])
    return (
        <Modal
            show={showDetalle}
            onHide={handleDetalleColse}
            size="lg"
            fullscreen={'md-down'}
        >
            <Modal.Header >
                <h5 className="modal-title text-center justify-content-center" style={{ fontFamily: 'fantasy' }}> <span className="text-danger" > </span></h5>

                <button type="button" className="close"
                    onClick={handleDetalleColse}>
                    ×
                </button>
            </Modal.Header>

            <Modal.Body >

                <div className="container-fluid flex-wrap-reverse justify-content-center " style={{ height: "auto" }}>
                    <div className="row p-4 ">
                        <div className="col-12 col-lg-6">
                            <h3>Resumen de compra</h3>
                        </div>
                        <div className="col-12 col-lg-6 d-flex justify-content-end">

                            <button className="btn  btn-primary" onClick={handleDetalleColse}
                                data-backdrop="static" data-keyboard="false">CANCELAR COMPRA</button>
                        </div>
                    </div>
                    <div id="detalle">
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
                                <div className="col-12 border border-bottom mb-3"></div>


                                <span>Cedula DNI:</span>
                                <input type="text"
                                    className="numero form-control form-control-sm"
                                    id="dni"
                                    maxLength={10}
                                    disabled={true}
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
                            <div className="col-12 col-sm-6 d-flex flex-column">
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
                                        <option value={"fisico"}>{"Boleto Fisico"}</option>
                                    </select>
                                </div>
                                <div className="col-12 border border-bottom mb-3"></div>
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
                        <div className="row p-4 float-rigth">
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
                                    <h4 className="subtotal">${listaPrecio.subtotal} </h4>
                                </div>
                                <div className="container-fluid">
                                    <h4 className="comision-boleto text-end">${listaPrecio.comision} </h4>
                                </div>
                                <div className={"container-fluid " + hidecomision}>
                                    <h4 className="comision-boleto text-end">${listaPrecio.comision_bancaria} </h4>
                                </div>
                                <div className="container  ">
                                    <h4 className="total-text"> ${GetMetodo() === "Tarjeta" ? listaPrecio.total : (parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.comision)).toFixed(2)} </h4>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-12 col-lg-10 text-end d-flex flex-column  ">
                            {!clienteauth ? <div className="d-none d-flex text-end  flex-wrap-reverse ">
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

                            {!clienteauth ? <div className="d-none d-flex text-end  flex-wrap-reverse ">
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
                            {!clienteauth ? <div className="d-none d-flex text-end  flex-wrap-reverse ">
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
                        <div className=" col-12 col-lg-12  text-end align-items-end ">
                            {
                                datosPerson.metodoPago == "Tarjeta" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(Object.values(datosPerson).every((d) => d))}
                                        onClick={() => { if (validarEmail(datosPerson.email)) { handlePago() } }}
                                    >
                                        <i className="fa fa-credit-card mx-1"> </i>PAGAR</button> : ""
                            }
                            {
                                datosPerson.metodoPago == "Efectivo" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(Object.values(datosPerson).every((d) => d))}
                                        onClick={() => { if (validarEmail(datosPerson.email)) { handelefctivorShow() } }}
                                    >
                                        <i className="fa fa-credit-card mx-1"> </i>PAGAR</button> : ""
                            }
                            {
                                datosPerson.metodoPago == "Deposito" ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={!(Object.values(datosPerson).every((d) => d))}
                                        onClick={() => { if (validarEmail(datosPerson.email)) { handelReporShow() } }}
                                    >
                                        <i className="fa fa-credit-card mx-1"> </i>PAGAR</button> : ""
                            }
                            {
                                datosPerson.metodoPago === null ?
                                    <button id="pagarcuenta" className="btn btn-primary"
                                        disabled={true}
                                    ><i className="fa fa-credit-card mx-1"> </i>PAGAR</button> : ""
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