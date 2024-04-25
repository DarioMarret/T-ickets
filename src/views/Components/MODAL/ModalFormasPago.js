import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addususcritor, setModal } from "StoreRedux/Slice/SuscritorSlice"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
import { GetMetodo, GetValores, getVerTienda } from "utils/CarritoLocalStorang"
import { DatosUsuariocliente, DatosUsuarioLocalStorang, Metodos } from "utils/constantes"
import { clienteInfo, getCedula } from "utils/DatosUsuarioLocalStorag"
import { buscarcliente } from "utils/Querypanelsigui"
import axios from "../../../../node_modules/axios/index"

export default function FormasPagoMopadal() {
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    const [listarCarritoDetalle, setListarCarritoDetalle] = useState([])
    let usedispatch = useDispatch()
    const [checked, setChecked] = useState({
        Efectivo: "",
        Fisico: "",
        Tarjeta: "",
        Deposito: "",
        Transferencia: ""
    })
    const userauthi = useSelector((state) => state.SuscritorSlice)
    const [check, setCheck] = useState(true)
    const [select, setSelecte] = useState("")
    function handelMetodopago(target, value) {
        console.log(target, value)
        if (target.name == "selctmet") {
            setSelecte(target.value)
            let names = target.value.replace("Efectivo-Local", "Fisico")
            setChecked({
                [names]: target.value,
            })
            sessionStorage.setItem(Metodos, target.value)
        } else {
            setChecked({
                [target.name]: value,
            })
            setSelecte(value)
            sessionStorage.setItem(Metodos, value)
            setCheck(false)
        }

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
    function ConsultarUsuaioconsultarcorreo() {
        //usedispatch(setModal({ nombre: 'loginpage', estado: "e" }))
        //return
        $.confirm({
            theme: 'supervan',
            closeIcon: true,
            title: 'Firma',
            content: 'Verificar que el voucher tenga la cédula correcta y firma',
            type: 'red',
            buttons: {
                tryAgain: {
                    text: 'Ver ',
                    btnClass: 'btn-red',
                    action: function () {
                        window.open(nombres.status_pg, "_blank")

                    }
                },
                aproba: {
                    text: "Aprobar ",
                    btnClass: 'btn-success',
                    action: function () {

                    }
                },
                rechaza: {
                    text: "Rechazar",
                    btnClass: 'btn-success',
                    action: function () {

                    }
                }
            }
        });
    }
    function consultarcorreo() {
        usedispatch(setModal({ nombre: '', estado: '' }))

        $.confirm({
            title: 'Por favor ingresé correo electrónico para continuar con su compra',
            theme: "material",
            content: '' +
                '<form action="" className="formName">' +
                '<div className="form-group">' +
                '<label>Ingrese su correo</label>' +
                '<input type="text" placeholder="correo" class="form-control correocodigo " required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.correocodigo').val();
                        if (!name) {
                            $.alert('Ingrese un correo valido');
                            return false;
                        }
                        buscarcliente({
                            "cedula": '',
                            "email": name
                        }).then(async e => {
                            console.log(e)
                            if (e.success) {
                                const cedula = await getCedula(e.data.cedula)
                                var hoy = new Date();
                                let client = {
                                    cedula: e.data.cedula,
                                    direccion: e.data.ciudad,
                                    whatsapp: e.data.movil,
                                    telefono: e.data.movil, name:
                                        e.data.nombreCompleto,
                                    email: e.data.email, hora: String(hoy),
                                    enable: e.data.enable, id: e.data.id,
                                    discapacidad: cedula.discapacidad || "",
                                    envio: ''
                                }

                                usedispatch(setToastes({
                                    show: true,
                                    message: "Bienvenido " + e.data.nombreCompleto,
                                    color: 'bg-info',
                                    estado: "Encontrado",
                                }))
                                LogeodeCedula(name)
                                //usedispatch(setModal({ nombre: 'ModalDetalle', estado: "e" }))
                                /* usedispatch(setModal({
                                     show: true,
                                     message: "Tienes 30 minutos para restablecer tu contraseña ",
                                     color: 'bg-success',
                                     estado: "Solicitud enviada",
                                 }))*/
                            } else {

                                // usedispatch(setModal({ nombre: 'registro', estado: "e" }))
                                //  return false;
                                usedispatch(setModal({ nombre: 'registro', estado: "e" }))
                                usedispatch(setToastes({
                                    show: true,
                                    message: "Registre el usuario",
                                    color: 'bg-danger',
                                    estado: "Usuario no encontrado ",
                                }))
                            }
                        })
                    }
                },
                cancel: function () {
                    usedispatch(setModal({ nombre: 'formasPago', estado: "e" }))
                }
            }
        })
    }
    function LogeodeCedula(cor) {
        $.confirm({
            title: 'Por favor ingresé la contraseña para continuar con la compra',
            theme: "material",
            content: '' +
                '<form action="" className="formName">' +
                '<div className="form-group">' +
                '<label>Ingrese su contraseña</label>' +
                '<input type="text" placeholder="contraseña" class="form-control passwor " required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Continuar',
                    btnClass: 'btn-blue',
                    action: async function () {
                        var name = this.$content.find('.passwor').val();
                        var hoy = new Date();
                        if (!name) {
                            $.alert('Ingrese un correo valido');
                            return false;
                        } else {

                            let randon = sessionStorage.getItem("random")
                            axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/auth_suscriptor", { email: String(cor).trim(), password: String(name).trim() }, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                                }
                            }).then(function (data) {
                                console.log(data);

                                if (data.data.success) {
                                    getCedula(data.data.data.cedula).then(cedula => {
                                        let client = {
                                            cedula: data.data.data.cedula,
                                            direccion: data.data.data.ciudad,
                                            whatsapp: data.data.data.movil,
                                            telefono: data.data.data.movil,
                                            name: data.data.data.nombreCompleto,
                                            email: data.data.data.email, hora: String(hoy),
                                            enable: data.data.data.enable, id: data.data.data.id,
                                            discapacidad: cedula.discapacidad,
                                            envio: ''
                                        }
                                        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(client))
                                        sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(client))
                                        usedispatch(addususcritor({ ...client }))
                                        usedispatch(setToastes({
                                            show: true,
                                            message: "Bienvenido " + data.data.data.nombreCompleto,
                                            color: 'bg-success',
                                            estado: "Inicio de sesión correcta",
                                        }))
                                        usedispatch(setModal({ nombre: 'ModalDetalle', estado: "e" }))

                                        if (randon) {
                                            axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/actulizar_identificacion_asiento",
                                                {
                                                    "random": randon,
                                                    "cedula": data.data.data.cedula
                                                }
                                            ).then(e => {
                                                console.log(e)
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        }

                                    }).catch(err => {
                                        console.log(err)
                                        usedispatch(setModal({ nombre: 'formasPago', estado: "e" }))
                                        //return false
                                    })

                                } else {

                                    $.alert("Hubo un error Verifique su contraseña e intente de nuevo")
                                    usedispatch(setModal({ nombre: 'formasPago', estado: "e" }))
                                }

                            }).catch(err => {
                                console.log(err)
                                $.alert("Hubo un error Verifique su contraseña e intente de nuevo")
                                usedispatch(setModal({ nombre: 'formasPago', estado: "e" }))
                            })
                            /*
                            const { data } = await Authsucrito({ email: credenciales.username.trim(), password: credenciales.pass.trim() },)
                            */
                            //console.info(data)


                        }

                    }
                },
                cancel: function () {
                    usedispatch(setModal({ nombre: 'formasPago', estado: "e" }))
                }
            }
        })
    }

    useEffect(() => {
        let metodoPago = GetMetodo()
        metodoPago != null ? setChecked({
            Fisico: metodoPago == "Efectivo-Local" ? "Efectivo-Local" : "",
            Efectivo: metodoPago == "Efectivo" ? "Efectivo" : "",
            Tarjeta: metodoPago == "Tarjeta" ? "Tarjeta" : "",
            Deposito: metodoPago == "Deposito" ? "Deposito" : "",
            Transferencia: metodoPago == "Transferencia" ? "Transferencia" : ""
        }) : handelMetodopago({ name: 'Tarjeta' }, "Tarjeta"), setCheck(false)
        console.log(GetValores())
        ListaPrecioset(GetValores())
        setListarCarritoDetalle(getVerTienda())
    }, [(modal.nombre == "formasPago"), select])
    const [hidecomision, sethideComision] = useState("d-none")
    let fechava = (new Date().getDay() != 6 && new Date().getDay() != 0)
    return (
        <>
            <Modal
                show={modal.nombre == "formasPago" ? true : false}
                fullscreen={'md-down'}
                centered
            >
                <Modal.Header className="py-3">
                    <h5>Seleccione la Formas de Pago</h5>
                    <button className="close " onClick={() => usedispatch(setModal({ nombre: "ModalCarritov", estado: "" }))}>X</button>
                </Modal.Header>
                <Modal.Body className="row  " >
                    <div className=" d-flex  ">
                        <div className=""
                        >
                            <strong> Método de pago</strong>

                            <div className="form-check">
                                <input className="v-check form-check-input" type="radio"
                                    checked={checked.Tarjeta == "Tarjeta" ? true : false}
                                    onChange={(e) => handelMetodopago({ name: e.target.name }, "Tarjeta")}
                                    name="Tarjeta" id="Tarjeta" />
                                <label className="form-check-label" htmlFor="Tarjeta">
                                    Tarjeta-credito
                                </label>
                            </div>
                            {clienteInfo() == null && fechava ?
                                <div className="form-check d-none">
                                    <input className="form-check-input d-none" type="radio"
                                        checked={checked.Transferencia == "Transferencia" ? true : false}
                                        onChange={(e) => handelMetodopago({ name: e.target.name }, "Transferencia")}
                                        name="Transferencia" id="Transferencia" />
                                    <label className="form-check-label" htmlFor="Transferencia">
                                        Transferencia/Deposito
                                    </label>
                                </div> : ""}

                            {
                                clienteInfo() == null && fechava ? <div className="form-check ">
                                    <input className="form-check-input" type="radio"
                                        checked={checked.Deposito == "Deposito" ? true : false}
                                        onChange={(e) => handelMetodopago({ name: e.target.name }, "Deposito")}
                                        name="Deposito" id="Deposito" />
                                    <label className="form-check-label" htmlFor="Deposito">
                                        Transferencia/Deposito
                                    </label>
                                </div> : ""}


                            {clienteInfo() == null ? <div className="form-check ">
                                <input className="v-check form-check-input" type="radio"
                                    name="Efectivo" id="Efectivo"
                                    checked={checked.Efectivo == "Efectivo" ? true : false}
                                    onChange={(e) => handelMetodopago(e.target, "Efectivo")}
                                />
                                <label className="form-check-label" htmlFor="Efectivo">
                                    Efectivo
                                </label>
                            </div> : ""}

                            {clienteInfo() != null ? <div className="form-check">
                                <input className="v-check form-check-input" type="radio"
                                    name="Fisico" id="Fisico"
                                    checked={checked.Fisico == "Efectivo-Local" ? true : false}
                                    onChange={(e) => handelMetodopago(e.target, "Efectivo-Local")}
                                />
                                <label className="form-check-label" htmlFor="Fisico">
                                    Efectivo punto de pagos
                                </label>
                            </div> : ""}
                            {/*
                                estdo != "ACTIVO" ? <div className="form-check ">
                                    <input className="form-check-input" type="radio"
                                        checked={checked.Deposito == "Deposito" ? true : false}
                                        onChange={(e) => handelMetodopago({ name: e.target.name }, "Deposito")}
                                        name="Deposito" id="Deposito" />
                                    <label className="form-check-label" htmlFor="Deposito">
                                        Reservar
                                    </label>
                                </div> : ""
                            */}
                            {clienteInfo() != null ?
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        checked={checked.Transferencia == "Transferencia" ? true : false}
                                        onChange={(e) => handelMetodopago({ name: e.target.name }, "Transferencia")}
                                        name="Transferencia" id="Transferencia" />
                                    <label className="form-check-label" htmlFor="Transferencia">
                                        Transferencia
                                    </label>
                                </div>
                                : ""}


                        </div>
                    </div>
                    <div className=" col-12">
                        <div className="container-fluid table-responsive px-0">
                            {<table className="resumen-table table ">
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
                                                        <td className="align-self-center">${item.discapacidad * item.cantidad}</td>
                                                    </tr>
                                                )
                                            })
                                            : <tr></tr>
                                    }
                                </tbody>
                            </table>}
                        </div>
                        <div>
                            <table className="table table-borderless ">
                                <tbody style={{
                                    lineHeight: 1
                                }}>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Subtotal:</td>
                                        <td className='text-center'>${parseFloat(listaPrecio.subtotal).toFixed(2)}</td>
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
                                    <tr className={select == "Tarjeta" ? '' : 'd-none'}>
                                        <th scope="row"></th>
                                        {<td className={" text-end"} >Comisión Bancaria:</td>}
                                        {<td className={" text-center"}>${parseFloat(listaPrecio.comision_bancaria).toFixed(2)}</td>}
                                    </tr>
                                    <tr>

                                        <th scope="row"></th>
                                        <td className='text-end' >Total</td>
                                        <td className='text-center'>${GetMetodo() === "Tarjeta" ? parseFloat(listaPrecio.total).toFixed(2) : (((parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.iva)).toFixed(2)))}</td>
                                    </tr >
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
                    </div>
                </Modal.Body>
                <Modal.Footer className=" justify-content-center">

                    <button onClick={() => (userauthi.login) ? usedispatch(setModal({ nombre: "ModalDetalle", estado: "" })) : consultarcorreo()} className=" btn btn-success"> Continuar </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}