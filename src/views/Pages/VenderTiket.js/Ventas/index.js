import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GetMetodo, GetValores, getVerTienda, LimpiarLocalStore, Limpiarseleccion, Limpiarselecciondos, TiendaIten, TotalSelecion } from "utils/CarritoLocalStorang";
import { AxioBoleteria, Axiosmikroserdos, mikroAxios } from "utils/index.js";
import { buscarcliente, correlativosadd } from "utils/Querypanelsigui";
import { useDispatch, useSelector } from "react-redux"
import { clienteInfo, DatosUsuariosLocalStorag, getCedula, getDatosUsuariosLocalStorag, setDatosUser, UpdateDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { DatosUsuariocliente, Eventolocalidad, Metodos } from "utils/constantes";
import ModalPago from "views/Components/MODAL/ModalPago";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { borrarseleccion } from "StoreRedux/Slice/sillasSlice";
import { cargarmapa, clearMapa, filtrarlocali, settypo } from "StoreRedux/Slice/mapaLocalSlice";
import ModalEfectivofACILITO from "views/Components/MODAL/Modalefectivo";
import ModalEfectivo from "../Modal/Modalefectivo";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
import ReporteView from "views/Components/MODAL/ModalReporte";
import { Emailcontec, formatearNumero } from "utils/Emails/index";
import { localidaandespacio } from "utils/Querypanel";
import LocalidadmapViews from "views/Components/MODAL/Modallocalida";
import axios from "axios";
import { logWithCallback } from "utilsstile.js/style";
function ventasView() {
    let usedispatch = useDispatch()
    let modalshow = useSelector((state) => state.SuscritorSlice)
    let sillas = useSelector((state) => state.sillasSlice.sillasSelecionadas)

    let [datos, setDausuario] = useState({
        nombreCompleto: '',
        ciudad: '',
        email: '',
        movil: '',
        resgistro: '',
        password: '',
        registro: 0
    })
    const [checked, setChecked] = useState({
        Efectivo: "",
        Fisico: "",
        Tarjeta: "",
        Deposito: "",
        Transferencia: ""
    })
    const checkds = useRef(null)
    const checkdss = useRef(null)
    const checkdsss = useRef(null)
    const [check, setCheck] = useState(false)
    function CambiarCheck() {
        let descuento = document.getElementById("descuento")
        let users = getDatosUsuariosLocalStorag()
        checkds.current.check = users.discapacidad ? false : (users.discapacidad == 'Si')
        UpdateDatosUsuariosLocalStorag({ discapacidad: (users.discapacidad == 'No' || users.discapacidad == undefined) ? 'Si' : 'No' })
        ListaPrecioset(GetValores())
    }
    function CambiarCheckss() {
        let users = getDatosUsuariosLocalStorag()
        checkdsss.current.check = (users.naipes == 'Si')
        let datos = UpdateDatosUsuariosLocalStorag({ naipes: users.naipes == 'No' ? 'Si' : 'No' })
    }
    const intervalolista = useRef(null)
    const [select, setSelecte] = useState("")
    let [evento, setEvento] = useState([])
    let [eventocoret, setEventoCortesia] = useState([])
    let { id } = useParams()
    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0,
        desc: 0,
        iva: 0,
        desctc: 0
    })


    function handelChange(e) {
        setDausuario({
            ...datos,
            [e.name]: e.value
        })
        DatosUsuariosLocalStorag({
            ...datos,
            [e.name]: e.value
        })
    }

    const ObtenerEventos = async () => {
        try {
            let { data } = await mikroAxios.get("Boleteria/Eventos/" + id)
            let array = data.data[0].map((el, inde) => {
                return {
                    ...el,
                    "precio_normal": "0",
                    "precio_discapacidad": "0.00",
                    "precio_descuento": "0.00",
                    "precio_tarjeta": "0.00",
                    "comision_boleto": "0.00",
                }
            })
            setEvento([...data.data[0]])
            setEventoCortesia([...array])
        } catch (error) {
            logWithCallback(error)
        }
    }
    async function buscarsuscritor() {
        // let naipe = document.getElementById("descuentos")
        let descuento = document.getElementById("descuento")

        document.getElementById("descuentoss").checked = false
        //naipe.checked = false
        checkds.current.check = false
        descuento.checked = false
        let nombre = $('#cedula').val()
        let informacion = {
            "cedula": !isNaN(nombre.trim()) ? nombre.trim() : '',
            "email": isNaN(nombre.trim()) ? nombre.trim().replace(/"/g, '@') : ''
        }
        checkds.current.check = false
        let { data } = await Axiosmikroserdos.get("api/Valida_Descuento/" + nombre.trim() + "/" + id)
        if (data.estado) {
            let datos = data.data
            let texto = "Nombre: " + datos.name + "\n edad: " + data.data.edad + "\n fecha: " + data.data.fecha_nacimiento + "\n" + data.mensaje
            usedispatch(setToastes({
                show: true,
                message: texto,
                color: 'bg-info',
                estado: "Verificar "
            }))
        }
        buscarcliente({ ...informacion }).then(ouput => {
            
            ListaPrecioset(GetValores())
            setSelecte("Transferencia")
            if (!ouput.success) {
                getCedula(nombre).then(salida => {
                    if (salida.success) {
                        usedispatch(setToastes({ show: true, message: ouput.message, color: 'bg-warning', estado:"No hubo ninguna coincidencia"}))
                        setDausuario({
                            ...datos,
                            nombreCompleto: '',
                            ciudad: '',
                            email: '',
                            movil: '',
                            resgistro: '',
                            password: '',
                            registro: 0,
                            cedula: nombre.trim(),
                        })
                        return
                    }
                    else {
                        setDausuario({
                            ...datos,
                            nombreCompleto: salida.name,
                            email: String(salida.name).replaceAll(" ", "") + "@gmail.com",
                            ciudad: salida.direccion,
                            cedula: nombre.trim(),
                            movil: salida.telefono ? salida.telefono : "0999999999",
                            registro: 0
                        })
                        $.alert("Recuerda solicitar Correo y número Celular")
                      //  usedispatch(setToastes({ show: true, message: "Ingresas los datos del usuario Correo - Telefono", color: 'bg-warning', estado: "No hubo ninguna coincidencia" }))
                        DatosUsuariosLocalStorag({
                            ...datos,
                            nombreCompleto: salida.name,
                            email: String(salida.name).replaceAll(" ", "") + "@gmail.com",
                            ciudad: id,
                            movil: salida.telefono ? salida.telefono : "0999999999",
                            password: salida.cedula,
                            cedula: nombre.trim()
                        })

                        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({
                            ...datos,
                            nombreCompleto: salida.name,
                            email: salida.email ? salida.email : String(salida.name).replaceAll(" ", "") + "@gmail.com",
                            ciudad: id,
                            movil: salida.telefono ? salida.telefono : "0999999999",
                            password: salida.cedula,
                            cedula: nombre.trim()
                        }))
                        UpdateDatosUsuariosLocalStorag({ menor: 'No', naipes: "No" })
                        $("#search").addClass("d-none")
                    }


                    ListaPrecioset(GetValores())
                }).catch(erro => {
                    UpdateDatosUsuariosLocalStorag({ ...datos, menor: 'No', naipes: "No", cedula: nombre.trim() })
                })


                return
            }
            else {
                setDausuario({
                    ...ouput.data,
                    registro: 1,
                    cedula: nombre.trim()
                })
                DatosUsuariosLocalStorag({ ...ouput.data, cedula: nombre.trim() })
                UpdateDatosUsuariosLocalStorag({ menor: 'No', naipes: "No", cedula: nombre.trim() })
            }

        }).catch(erro => {
            setDausuario({
                ...datos,
                registro: 1,
                cedula: nombre.trim()
            })
            DatosUsuariosLocalStorag({ ...datos, cedula: nombre.trim() })
            UpdateDatosUsuariosLocalStorag({ menor: 'No', naipes: "No", cedula: nombre.trim() })
        })
    }


    function restaprecio(e) {
        const valores = JSON.parse(sessionStorage.getItem(Eventolocalidad))
        let check = document.getElementById("ventas")

        let mapath = { precio: valores.find(el => el.id == e.ideprecio) }
        let user = getDatosUsuariosLocalStorag()
        let producto = {
            cantidad: -1,

            localidad: mapath.precio.localidad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            fila: 0,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto"),
        }
        if (check.checked) {
            getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": "protoco", tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })

            ListaPrecioset(GetValores())
            return
        }
        getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": "protoco", tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })

        ListaPrecioset(GetValores())
        correlativosadd({
            "id": mapath.precio.idcolor,
            "estado": "reservado",
            "cedula": user.cedula,
            "mas": "menos",
            random: sessionStorage.getItem("random"),
            "cantidad": 1
        }).then(oupt => {
            if (oupt.success) {

            }

        }).catch(err => {
            logWithCallback(err)
        })
        if (e.ideprecio == 433) {
            UpdateDatosUsuariosLocalStorag({ menor: 'No' })
        }

    }
    function agregar(e) {
        const valores = JSON.parse(sessionStorage.getItem(Eventolocalidad))
        let checks = document.getElementById("ventas")
        let user = getDatosUsuariosLocalStorag()
        logWithCallback(e)
        let mapath = { precio: valores.find(el => el.id == e.ideprecio) }
        logWithCallback({ mapath, valores })
        let protoco = moment().format("YYYYMMDDHHMMSS")

        let producto = {
            cantidad: 1,
            localidad: mapath.precio.localidad,
            localidaEspacio: check ? e : mapath.precio,
            id: mapath.precio.idcolor,
            tipo: "correlativo",
            fila: 0,
            discapacidad: mapath.precio.precio_discapacidad,
            valor: check ? e.precio_normal : mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto") ? sessionStorage.getItem("consierto") : '',
        }

        logWithCallback(producto)
        if (checks.checked) {
            getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": protoco, tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })
            ListaPrecioset(GetValores())
            return
        }
        if (TotalSelecion() < 10) {
            getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": protoco, tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })

            ListaPrecioset(GetValores())

            correlativosadd({
                "id": mapath.precio.idcolor,
                "estado": "reservado",
                "cedula": user.cedula,
                "mas": "mas",
                random: sessionStorage.getItem("random"),
                "cantidad": 1
            }).then(oupt => {

            }

            ).catch(erro => {
            })
            if (e.ideprecio == 433) {
                UpdateDatosUsuariosLocalStorag({ menor: 'Si' })
            }

        }
        else {

            $.confirm({
                title: 'Limite alcanzado',
                content: 'Solo puede registrar 10 boletos por compra',
                type: 'red',
                typeAnimated: true,
                buttons: {
                    close: function () {
                    }
                }
            });
            // succesLimit()
        }
    }
    function handelMetodopago(target, value) {
        if (target.name == "selctmet") {
            setSelecte(value)
            // let names = target.value.replace("Efectivo-Local", "Fisico")

            sessionStorage.setItem(Metodos, target.value)
            ListaPrecioset(GetValores())
        } else {
            setSelecte(value)
            sessionStorage.setItem(Metodos, value)
            ListaPrecioset(GetValores())
        }

    }
    useEffect(() => {

        let metodo = sessionStorage.getItem(Metodos)
        sessionStorage.setItem(Metodos, "Transferencia")
        setChecked({
            Fisico: "",
            Efectivo: "",
            Tarjeta: "",
            Deposito: "",
            Transferencia: "Transferencia"
        })
        ListaPrecioset(GetValores())
        setSelecte(metodo)
        ListaPrecioset(GetValores())
        ObtenerEventos()

    }, [])
    useEffect(() => {
        ListaPrecioset(GetValores())
    }, [sillas])
    function detenervelocidad() {
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        usedispatch(setModal({ nombre: "", estado: '' }))
        Limpiarselecciondos()
        LimpiarLocalStore()
        ListaPrecioset(GetValores())
        setDausuario({
            nombreCompleto: '',
            ciudad: '',
            email: '',
            movil: '',
            resgistro: '',
            password: '',
            registro: 0
        })
        setChecked({
            Fisico: "",
            Efectivo: "",
            Tarjeta: "",
            Deposito: "",
            Transferencia: "Transferencia"
        })
        sessionStorage.setItem(Metodos, "Transferencia")
        setSelecte("Transferencia")
        sessionStorage.setItem(Metodos, "Transferencia")
        ListaPrecioset(GetValores())

    }
    function para() {
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        usedispatch(setModal({ nombre: "", estado: '' }))
        Limpiarselecciondos()
        //LimpiarLocalStore()
        ListaPrecioset(GetValores())
        setDausuario({
            nombreCompleto: '',
            ciudad: '',
            email: '',
            movil: '',
            resgistro: '',
            password: '',
            registro: 0
        })
        setChecked({
            Fisico: "",
            Efectivo: "",
            Tarjeta: "",
            Deposito: "",
            Transferencia: "Transferencia"
        })
        sessionStorage.setItem(Metodos, "Transferencia")
        setSelecte("Transferencia")
        ListaPrecioset(GetValores())

    }

    async function Registrar() {
        try {

            let informacion = {
                "cedula": '',
                "email": String(datos.email).trim()
            }
            let data = datos.registro == 0 ? await buscarcliente({ ...informacion }) : false

            if (!data.success) {
                //return
                if (GetMetodo() == "Tarjeta") {
                    if (datos.resgistro == 0) {
                        nuevoUser()
                    }
                    usedispatch(setModal({ nombre: 'ModalPago', estado: '' }))

                    return
                }
                if (GetMetodo() == "Efectivo") {
                    if (datos.resgistro == 0) {
                        nuevoUser()
                    }
                    usedispatch(setModal({ nombre: "modalpagoFacilito", estado: "" }))

                    return
                }
                if (GetMetodo() == "Transferencia") {
                    if (datos.resgistro == 0) {
                        nuevoUser()
                    }
                    usedispatch(setModal({ nombre: 'ModalReporte', estado: '' }))

                    return
                }
                else {
                    if (datos.resgistro == 0) {
                        nuevoUser()
                    }
                    GetMetodo() == "Efectivo" ? usedispatch(setModal({ nombre: "modalpagoFacilito", estado: "" })) : usedispatch(setModal({ nombre: "modalpago", estado: "" }))
                }
            } else {
                alert("Correo ya esta regitrado actualice")
            }
        } catch (error) {

            $.alert(error)
        }


    }
    function Abririlocalfirt(e) {
        let user = getDatosUsuariosLocalStorag()

        if (user.id == 0) {
            $.alert({
                title: '',
                content: 'Complete los datos del cliente',
            });
            return
        }
        if (false) {
            usedispatch(setToastes({
                show: true,
                message: "Están en proceso, o llegaste al limite de compra",
                color: 'bg-primary',
                estado: "Has alcanzado el límite de boletos por evento"
            }))
            return
        }
        else {
            let user = getDatosUsuariosLocalStorag()

            localidaandespacio(e.id_espacio, e.id_localidad).then(ouput => {

                let nuevoObjeto = []
                if (ouput.data.find(e => e.typo == "fila")) {
                    ouput.data.forEach(x => {
                        if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                            nuevoObjeto.push({ fila: x.fila, asientos: [{ silla: x.silla, estado: x.estado, idsilla: x.id }] })
                        }
                        else {
                            let indixe = nuevoObjeto.findIndex(e => e.fila == x.fila)
                            nuevoObjeto[indixe].asientos.push({
                                silla: x.silla, estado: x.estado, idsilla: x.id
                            })
                        }
                    })
                    usedispatch(settypo({
                        nombre: e.localidad, typo: e.mesas_array, precio: {
                            ...e,

                            espacio: e.id_espacio, idcolor: e.id_localidad
                        }
                    }))
                    usedispatch(filtrarlocali(nuevoObjeto))
                    sessionStorage.seleccionmapa = JSON.stringify(e)
                    usedispatch(setModal({ nombre: "Modallocalida", estado: '' }))

                }
                else if (ouput.data.find(e => e.typo == "mesa")) {
                    ouput.data.forEach(x => {
                        if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                            nuevoObjeto.push({ fila: x.fila, Mesas: [] })
                        }
                    })
                    nuevoObjeto.length > 0 ? ouput.data.forEach(x => {
                        let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
                        if (nuevoObjeto[index].Mesas.findIndex(z => z.mesa == x.mesa) == -1) {
                            nuevoObjeto[index].Mesas.push({ mesa: x.mesa, asientos: [] })
                        }
                    }) : ''
                    nuevoObjeto.length > 0 ? ouput.data.forEach(x => {
                        let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
                        let sillas = nuevoObjeto[index].Mesas.findIndex(y => y.mesa == x.mesa)
                        nuevoObjeto[index].Mesas[sillas].asientos.push({
                            silla: x.silla, estado: x.estado, idsilla: x.id
                        })
                    }) : ''
                    usedispatch(cargarmapa([{
                        "path": "0",
                        "id": e.id_localidad,
                        "fill": "#a12121",
                        "espacio": e.id_espacio
                    }]))
                    usedispatch(settypo({ nombre: e.localidad, typo: "mesa", precio: { ...e, typo: "mesa", espacio: e.id_espacio, idcolor: e.id_localidad } }))
                    usedispatch(filtrarlocali(nuevoObjeto))
                    sessionStorage.seleccionmapa = JSON.stringify(e)
                    usedispatch(setModal({ nombre: "Modallocalida", estado: '' }))
                }

            }
            ).catch(err =>
                logWithCallback(err)
            )
        }
    }
    function nuevoUser() {
        let ciudad = JSON.parse(sessionStorage.getItem("infoevento")).cuidadConcert
        let data = {
            nombreCompleto: datos.nombreCompleto,
            email: datos.email,
            password: datos.cedula,
            movil: datos.movil,
            ciudad: ciudad ? ciudad : id,
            //ciudad: modal.estado == "Subscription" ? "Eladio Carrion" :"guayaquil",
            direccion: datos.direccion,
            cedula: datos.cedula,
        }
        AxioBoleteria.post("/api/v1/crear_suscriptor", data, {
            headers: {
                'Content-Type': 'application/json',
                'authorization-ticket': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }).then(sal => {
            //buscarcliente()
            setDausuario({
                ...datos,
                registro: 1
            })
            let texto = "*" + data.nombreCompleto + "*\nGracias por registrarse en Tickets.com.ec.\nLos datos de ingreso son:\n *Usuario*:" + data.email + "\n *Clave*:" + data.password.trim() + "\n\nPor favor, para validar tu cuenta digita la palabra *Si*";
            Emailcontec({ movil: [formatearNumero(data.movil)], nombre: data.nombreCompleto, password: data.password.trim(), email: data.email, text: texto }).then(sal => {
            }).catch(err => {
                
                setDausuario({
                    ...datos,
                    registro: 1
                })
            })
        }).catch(err => {
            

        })

        setDausuario({
            ...datos,
            registro: 1
        })

    }
    return (
        <>
            <div className=" container-fluid">
                <div className="">
                    <div className="col-12 mb-3">
                        <div className=" d-flex  justify-content-end">

                            <button className="btn btn-danger mx-3" onClick={buscarsuscritor}> <i className=" fa fa-search"></i> Buscar cliente </button>
                            {
                                !datos.resgistro ? <button className="d-none btn btn-success "  ><i className="fa fa-search "></i> Buscar cédula </button> : ''
                            }
                            {!datos.resgistro ? <button className="btn btn-success ml-3 d-none"  ><i className=" fa fa-plus-circle"></i> CREAR </button> :
                                <button className="btn btn-primary"  > <i className=" fa fa-check-circle"></i> </button>}
                        </div>
                    </div>
                    <form id="register" onSubmit={(e) => e.preventDefault()}  >
                        <div className="row">


                            <div className="co-6 ">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input id="cedula" type="text"
                                        className="form-control numero"
                                        name="cedula"
                                        minLength={10}

                                        placeholder={"Ingrese su número de identificación"} required />
                                </div>
                            </div>



                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6 ">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        id="nombreCompleto"
                                        value={datos.nombreCompleto}
                                        name="nombreCompleto"
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Ingrese su nombres completos" required />
                                    <div className="invalid-feedback">
                                        Ingrese sus nombres

                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-lg-6  ">
                                <div className="input-group mb-3  px-0 d-flex justify-content-center ">
                                    <div className="input-group mb-3" >
                                        <div className=" input-group-prepend">
                                            <span className=" input-group-text"> <i className="fa fa-phone
                                            "></i> </span>
                                        </div>
                                        <input
                                            name="movil" type="tel"
                                            className="m-0 form-control form-control-sm" id="movil"
                                            size={100}
                                            value={datos.movil}
                                            required
                                            onChange={(e) => handelChange(e.target)}
                                            placeholder="999 999 999" />

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="input-group mb-3" >
                                    <div className=" input-group-prepend">
                                        <span className=" input-group-text"> <i className="fa fa-map-marker"></i> </span>
                                    </div>
                                    <input type="text"
                                        className="form-control form-control-sm"
                                        id="ciudad"
                                        name="ciudad"
                                        maxLength={255}
                                        required
                                        value={datos.ciudad}
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Ingrese ciudad"
                                    />
                                    <div className="invalid-feedback">
                                        Ingrese ciudad

                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                    </div>

                                    <input id="email" type="email" className="form-control" name="email"
                                        value={datos.email}
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Email" />
                                    <div className="invalid-feedback">
                                        Correo incompleto

                                    </div>

                                </div>
                            </div>

                        </div>




                    </form>
                </div>
                <div className="p-1 ">
                    {clienteInfo() != null ?
                        <div className="container">
                            <input className="form-check-input" type="checkbox"

                                ref={checkds}
                                onChange={CambiarCheck}

                                name="descuento" id="descuento" />
                            <label className="form-check-label" htmlFor="descuento">
                                DESCUENTO DIS./TER. EDAD.- 50%
                            </label>
                        </div>

                        : ""}

                    <div className="container">
                        <input className="form-check-input" type="checkbox"

                            value={check}
                            onChange={(e) => setCheck(e.target.checked)}

                            name="cortesia" id="cortesia" />
                        <label className="form-check-label" htmlFor="cortesia">
                            Valor 0
                        </label>
                    </div>

                    {clienteInfo() != null ?
                        <div className="container">
                            <input className="form-check-input" type="checkbox"
                                ref={checkdsss}
                                onChange={CambiarCheckss}

                                name="descuentoss" id="descuentoss" />
                            <label className="form-check-label" htmlFor="descuentoss">
                                Naipes
                            </label>
                        </div>

                        : ""}
                    {clienteInfo() != null ?
                        <div className="container  ">
                            <input className="form-check-input" type="checkbox"



                                name="ventas" id="ventas" />
                            <label className="form-check-label" htmlFor="ventas">
                                Registro masivo
                            </label>
                        </div>

                        : ""}

                    <div>
                        <strong> Método de pago</strong>
                        <select className=" form-select form-select-lg" name="selctmet" value={select}
                            onChange={(e) => handelMetodopago(e.target)}
                        >
                            <option value={""}>

                            </option>
                            <option value={"Tarjeta"}>
                                Tarjeta credito
                            </option>
                            <option value={"Transferencia"}>
                                Transferencia
                            </option>
                            {<option value={"Efectivo-Local"}>
                                Efectivo-Local
                            </option>}
                            {<option value={"Tarjeta-Local"}>
                                Tarjeta-Local
                            </option>}
                            {<option value={"Efectivo-QR"}>
                                Efectivo-QR
                            </option>}
                            <option className=" d-none" value={"Recaidacion Terceros"}>
                                Recaidacion Terceros
                            </option>
                            <option className="" value={"Efectivo"}>Efectivo Speed</option>
                        </select>
                    </div>
                </div>
                <div className=" table-responsive d-none d-sm-none d-md-block">


                    <table className=" resumen-table  table " width={"100%"}>
                        <thead>
                            <tr className="text-black">
                                <th scope="col" className="text-black">CONCIERTO</th>
                                <th className="text-black">LOCALIDAD</th>

                                <th className="text-black" scope="col">Disponible</th>

                                <th className="text-black text-end " scope="col">Cantidad</th>
                                <th className="text-black text-end " scope="col">Valor</th>
                                <th className="text-black text-end " scope="col">TOTAL</th>
                                <th className="text-black text-end" scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ((check ? eventocoret : evento)).map((item, index) => {

                                    let tipo = String(item.mesas_array).replace('""', "");
                                    const tiendaItem = getVerTienda().find(ele => ele.id === item.id_localidad) || {};
                                    const cantidad = tiendaItem.cantidad || 0;
                                    
                                    const cantis = getVerTienda().length == 0 ? 0 : getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad) ? getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad).cantidad : 0
                                    const valor = "" + (parseFloat(item.precio_normal) - parseInt(item.comision_boleto)) + "+$" + parseInt(item.comision_boleto)
                                    const totales = getVerTienda().length == 0 ? 0 : getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad) ? parseFloat(parseInt(getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad).cantidad) * (parseFloat(item.precio_normal) - parseInt(item.comision_boleto))) : 0
                                    return (
                                        <tr key={index}>
                                            <td className="align-self-center">{item.nombreConcierto}</td>
                                            <td className="align-self-center">{item.nombre ? item.nombre : "" + " " + item.localidad ? item.localidad : ""}</td>
                                            <td className="align-self-center">{item.total}</td>
                                            <td className=" text-end">{cantidad}</td>
                                            <td className=" text-end">${valor}</td>
                                            <td className=" text-end">{totales}</td>
                                            <td className="align-self-center text-end">
                                                {
                                                    (tipo == 'correlativo') ?
                                                        <div>
                                                            <div className="btn-group btn-group-sm" role="group">

                                                                <button className="suma   btn-danger " disabled={(cantidad == 0)} onClickCapture={() => restaprecio(item)}>
                                                                    <i className="fa fa-minus"></i>
                                                                </button>
                                                                <button className="suma   btn-success " onClickCapture={() => agregar(item)}>
                                                                    <i className="fa fa-plus"></i>
                                                                </button>
                                                            </div>
                                                        </div> :
                                                        <button className=" btn-sm btn-success" onClick={() => Abririlocalfirt(item)}>Seleccionar</button>
                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
                <div className="d-block d-sm-block d-md-none">
                    <ul className="list-group">
                        {
                            (evento.length > 0 ? (check ? eventocoret : evento) : []).map((item, index) => {

                                const tiendaItem = getVerTienda().find(ele => ele.id === item.id_localidad) || {};
                                const cantidad = tiendaItem.cantidad || 0;
                                const precioBase = parseFloat(item.precio_normal) - parseInt(item.comision_boleto);
                                const totalPrecio = parseFloat(cantidad * precioBase);
                                let tipo = String(item.mesas_array).replace('""', "")
                                const cantis = getVerTienda().length == 0 ? 0 : getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad) ? getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad).cantidad : 0
                                const valor = "" + (parseFloat(item.precio_normal) - parseInt(item.comision_boleto)) + "+$" + parseInt(item.comision_boleto)
                                const totales = getVerTienda().length == 0 ? 0 : getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad) ? parseFloat(parseInt(getVerTienda().find(ele => ele.localidaEspacio.idcolor == item.id_localidad).cantidad) * (parseFloat(item.precio_normal) - parseInt(item.comision_boleto))) : 0

                                return (
                                    <li key={index} className="list-group-item d-flex flex-column">
                                        <strong>{item.nombreConcierto}</strong>
                                        <div className=" d-flex justify-content-between "><span>{item.nombre}</span> <span>Disponible: {item.total}</span></div>
                                        <span>Valor: ${valor}</span>

                                        <div className=" d-flex justify-content-between "><span>Cantidad: {cantis}</span>
                                            <span>Total Precio: {totales}</span></div>



                                        <div className="mt-2   ">
                                            {tipo === 'correlativo' ? (
                                                <div className="d-flex justify-content-between  " role="group">
                                                    <button disabled={(cantidad == 0)} className="btn btn-danger " onClick={() => restaprecio(item)}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                    <button className="btn btn-success " onClick={() => agregar(item)}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <button className="btn btn-sm btn-success" onClick={() => Abririlocalfirt(item)}>Seleccionar</button>
                                            )}
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className=" container-fluid">
                    <table className="table table-borderless " style={{
                        lineHeight: 1
                    }}>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td className='text-end' >Subtotal:</td>
                                <td className='text-end'>${parseFloat(listaPrecio.subtotal).toFixed(2)}</td>
                            </tr>

                            <tr>
                                <th scope="row"></th>
                                <td className='text-end' >Servicio Em. por Boleto:</td>
                                <td className='text-end'>${parseFloat(listaPrecio.comision).toFixed(2)}</td>
                            </tr>
                            <tr className=''>
                                <th scope="row"></th>
                                <td className='text-end' >Iva %:</td>
                                <td className='text-end'>${parseFloat(listaPrecio.iva).toFixed(2)}</td>
                            </tr>
                            <tr className=''>
                                <th scope="row"></th>
                                <td className='text-end' >Comision Bancaria:</td>
                                <td className='text-end'>${String(GetMetodo()).includes("Tarjeta") ? parseFloat(listaPrecio.comision_bancaria).toFixed(2) : "0.00"}</td>
                            </tr>
                            <tr>

                                <th scope="row"></th>
                                <td className='text-end' >Total</td>
                                <td className='text-end'>${String(GetMetodo()).includes("Tarjeta") ? parseFloat(listaPrecio.total).toFixed(2) : (parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.comision)).toFixed(2)}</td>
                            </tr >

                        </tbody>
                    </table>
                    <div className=" container-fluid px-0 text-end">

                        <button disabled={!datos.cedula} onClick={Registrar} className="btn btn-success">Pagar</button>
                    </div>
                </div>

            </div>
            {modalshow.modal.nombre == "modalpagoFacilito" ?

                <ModalEfectivofACILITO
                    detenervelocidad={() => detenervelocidad()}
                    intervalo={""}
                    detener={() => detenervelocidad()}
                /> : ""
            }
            {
                modalshow.modal.nombre == "ModalPago" ? <ModalPago intervalo={""} detenervelocidad={detenervelocidad} para={para} setModalPago={() => { }} modalPago={"true"} /> : null
            }
            {modalshow.modal.nombre == "modalpago" ?
                <ModalEfectivo
                    comprar={para}
                /> : ""}
            <ModalConfima />
            <ReporteView
                repShop={"repShop"}
                detener={() => logWithCallback()}
                setrepShow={() => { }}
                comprar={para}
            />
            {modalshow.modal.nombre == "Modallocalida" ?
                <LocalidadmapViews
                    intervalo={""}
                    intervalolista={intervalolista}
                /> : ''}
        </>
    )
}
export default ventasView