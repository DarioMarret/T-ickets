import React, { useEffect, useState, useRef } from "react"
import { Modal } from "react-bootstrap"
import { Metodos } from 'utils/constantes'
import SvgselectView from "views/Pages/Svgviewa/svgseleccion.js"
import { listarpreciolocalidad } from "utils/Querypanel"
import { GetMetodo, GetValores, getVerTienda, EliminarByStora, EliminarSillaLocal } from "utils/CarritoLocalStorang"
import { useDispatch, useSelector } from "react-redux"
import { cargarmapa, settypo, filtrarlocali } from "StoreRedux/Slice/mapaLocalSlice"
import { clearSillas, cargarsilla } from "StoreRedux/Slice/sillasSlice"
import SweetAlert from 'react-bootstrap-sweetalert';
import { GetEstadousu } from "utils/CarritoLocalStorang"
import { CarritoTicket } from "utils/constantes"
import { listaEliminasillas } from "utils/CarritoLocalStorang"
import { quitarsilla } from "utils/Querypanelsigui"
import { correlativodelete } from "utils/Querypanelsigui"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
import { localidaandespacio } from "utils/Querypanel"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { correlativosadd } from "utils/Querypanelsigui"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
import { listarLocalidadaEspeci } from "utils/Querypanelsigui"
import { espacio } from "utils/constantes"
import { Eventolocalidad } from "utils/constantes"
import { TiendaIten } from "utils/CarritoLocalStorang"
import { updateboletos } from "StoreRedux/Slice/SuscritorSlice"
import { Listarticketporestado } from "utils/userQuery"
import { Eventoid } from "utils/constantes"
import { Triangle } from "react-loader-spinner"
import { bancos } from "utils/Imgenesutils"
import moment from "moment"
let { atencion } = bancos
const ModalCarritoView = (prop) => {
    let usuario = getDatosUsuariosLocalStorag()
    const { handleClosesop, precios, setListarCarritoDetalle, intervalo, } = prop
    const sorter = (a, b) => a.precio_normal > b.precio_normal ? 1 : -1 && a.id < b.id ? 1 : -1;
    let estdo = sessionStorage.getItem("estadoevento")
    let CODIGO = sessionStorage.getItem("eventoid")
    let usedispatch = useDispatch()
    let sleccionlocalidad = useSelector((state) => state.SuscritorSlice.boletos)
    let seleciondesillas = useSelector((state) => state.sillasSlice.sillasSelecionadas)
    const modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [detalle, setDetalle] = useState([])
    const [alert, setAlert] = useState(null)
    const [spinervi, setSpiner] = useState("d-none")
    const [checked, setChecked] = useState({
        Efectivo: "",
        Fisico: "",
        Tarjeta: "",
        Deposito: "",
        Transferencia: ""
    })
    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0
    })
    const handleContinuar = () => usedispatch(setModal({ nombre: 'ModalDetalle', estado: '' }))
    const [check, setCheck] = useState(true)
    function handelMetodopago(target, value) {
        setChecked({
            [target.name]: value,
        })
        sessionStorage.setItem(Metodos, value)
        setCheck(false)
    }
    function Eliminar(e) {
        let user = getDatosUsuariosLocalStorag()
        let array = e.localidaEspacio["typo"] != "correlativo" ? listaEliminasillas(e.localidaEspacio
        ["idcolor"]) : ''
        console.log(array)
        e.localidaEspacio["typo"] != "correlativo" ? quitarsilla({ "array": [...array] }).then(ouput => {
            usedispatch(clearSillas(e))
            EliminarSillaLocal(e.localidad)
            console.log(e.localidaEspacio["idcolor"])
            $("div." + e.localidaEspacio["idcolor"] + "silla").removeClass("seleccionado").addClass("disponible");
            console.log(ouput)
        }
        ).catch(err => console.log(err)) :
            correlativosadd(
                {
                    "id": e.id,
                    "estado": "disponible",
                    "mas": "eliminar",
                    "cedula": user.cedula,
                    "cantidad": e.cantidad
                }
            ).then(oupt => {
                console.log(oupt)
            }).catch(err => {
                console.log(err)
            })
        e.localidaEspacio["typo"] == "correlativo" ? usedispatch(clearSillas(e)) : ''
        EliminarByStora(e.localidad)
        e.localidaEspacio["typo"] == "correlativo" ? EliminarSillaLocal(e.localidad) : ''
        setDetalle(getVerTienda())
        ListaPrecioset(GetValores())
        hideAlert()
    }
    function abrirlocalidad() {
        setSpiner("d-none")
        usedispatch(setModal({ nombre: "Modallocalida", estado: '' }))
    }


    useEffect(() => {
        //console.log("aqui")
        let user = getDatosUsuariosLocalStorag()
        setDetalle(getVerTienda())
        setListarCarritoDetalle(getVerTienda())
        let metodoPago = GetMetodo()
        metodoPago != null ? setChecked({
            Fisico: metodoPago == "Efectivo-Local" ? "Efectivo-Local" : "",
            Efectivo: metodoPago == "Efectivo" ? "Efectivo" : "",
            Tarjeta: metodoPago == "Tarjeta" ? "Tarjeta" : "",
            Deposito: metodoPago == "Deposito" ? "Deposito" : "",
            Transferencia: metodoPago == "Transferencia" ? "Transferencia" : ""
        }) : handelMetodopago({ name: 'Tarjeta' }, "Tarjeta"), setCheck(false)

        ListaPrecioset(GetValores())
        let asientos = JSON.parse(sessionStorage.getItem("asientosList"))
        asientos != null ? usedispatch(cargarsilla(asientos)) : ''
        precios.pathmapa.length > 0 ? precios.pathmapa.map((e, i) => {
            $("#" + e.path).attr("class", e.id + "  disponible " + e.tipo)
            $("#" + e.path).attr("fill", e.fill)
        }) : ''
        Listarticketporestado(user.cedula).then(oupt => {
            //console.log(oupt.data.filter(e => e.codigoEvento == sessionStorage.getItem(Eventoid) && e.estado == "Pagado").length)
            //console.log(oupt.data.filter(e => e.codigoEvento == sessionStorage.getItem(Eventoid) && moment(new Date(), "YYYY-MM-DD HH:mm:ss").diff(moment(e.fechaCreacion, "YYYY-MM-DD HH:mm:ss"), 'h') < 2 && e.estado == "reservados").length)
            usedispatch(updateboletos({
                disponibles: sleccionlocalidad.disponibles,
                proceso: 0,
                pagados: oupt.data.filter(e => e.codigoEvento == sessionStorage.getItem(Eventoid) && e.estado == "Pagado" || e.estado == "reservado").length,
                inpagos: oupt.data.filter(e => e.codigoEvento == sessionStorage.getItem(Eventoid) && e.estado == "reservado").length
            }))
            /*console.log({
                disponibles: 0,
                proceso: 0,
                pagados: oupt.data.filter(e => e.codigoEvento == sessionStorage.getItem(Eventoid) && moment(new Date(), "YYYY-MM-DD HH:mm:ss").diff(moment(e.fechaCreacion, "YYYY-MM-DD HH:mm:ss"), 'h') < 2).length
            })*/

        }).catch(err => {
            console.log(err)
        })
        /*listarLocalidadaEspeci(sessionStorage.getItem(espacio)).then(oupt => {
            console.log(oupt.data.filter(E => E.estado == "reservado" && E.pasado == "SIN PASAR" && E.cedula == user.cedula).length)
            let procesar = oupt.data.filter(E => E.estado == "reservado" && E.pasado == "SIN PASAR" && E.cedula == user.cedula).length;
            let disponible = oupt.data.filter(E => E.estado == "dispoible").length;

            /*  usedispatch(updateboletos({
                  disponibles: disponible,
                  proceso: procesar,
                  pagados: ""
              }))*

            let precioslocal = JSON.parse(sessionStorage.getItem(Eventolocalidad))
            let cantidad = oupt.data.filter(e => e.estado == "reservado" && e.typo == "correlativo").length
            precioslocal.map((elm, im) => {
                if (oupt.data.filter(el => el.id_localidades == elm.id).filter(e => e.estado == "reservado" && e.typo == "correlativo").length > 0) {
                    console.log(oupt.data.filter(el => el.id_localidades == elm.id).filter(e => e.estado == "reservado" && e.typo == "correlativo"))
                }
            })
        }
        ).catch(err => console.log(err))*/
    }, [modalshow.nombre == "ModalCarritov" ? true : false])
    function Abririlocalfirt(e) {
        console.log(e)
        // console.log(sleccionlocalidad.pagados )
        // console.log((sleccionlocalidad.pagados > 10))
        //console.log(sleccionlocalidad)
        //if (clienteInfo() == null && CODIGO == "9EGM42") {
        //clienteInfo() == null && CODIGO == "ANNKV7" && (new Date("02/02/2023 08:30") < new Date())
        if (e.idcolor == 4) {
            usedispatch(setToastes({
                show: true,
                message: "Esta localidad ya no tiene Disponibilidad",
                color: 'bg-primary',
                estado: "Todos ocupados"
            }))
            return
        }
        //clienteInfo() == null && CODIGO == "9EGM42" && (new Date("02/02/2023 08:30") < new Date())
        if (false) {
            usedispatch(setToastes({
                show: true,
                message: "Estaremos informando la fecha de canje de boletos",
                color: 'bg-success',
                estado: "!Páramos la venta, los 600 boletos se agotaron!"
            }))
            return
        }

        /* if (clienteInfo() == null && CODIGO == "9EGM42" && (new Date("02/01/2023 19:00 ") > new Date())) {
             usedispatch(setToastes({
                 show: true,
                 message: "Gauayaquil Disponible el 1 de febrero del 2023 19:00",
                 color: 'bg-danger',
                 estado: "Pronto Disponible"
             }))
             setSpiner("d-none")
             return
         }*/
        if (false) {
            usedispatch(setToastes({
                show: true,
                message: "Gauayaquil Disponible el 1 de febrero del 2023 19:00",
                color: 'bg-danger',
                estado: "Pronto Disponible"
            }))
            setSpiner("d-none")
            return
        }
        if (sleccionlocalidad.pagados >= 10) {
            console.log("aqui se quedo")
            usedispatch(setToastes({
                show: true,
                message: "Están en proceso, o llegaste al limite de compra",
                color: 'bg-primary',
                estado: "Has alcanzado el límite de boletos por evento"
            }))
            return
        }
        else {
            setSpiner("")
            // console.log(e)
            let color = precios.pathmapa.filter((E) => E.id == e.idcolor)
            console.log(e.espacio, e.idcolor)
            localidaandespacio(e.espacio, e.idcolor).then(ouput => {
                // console.log(e.espacio, e.idcolor)
                // console.log(ouput)
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
                    usedispatch(cargarmapa(color))
                    usedispatch(settypo({ nombre: precios.mapa, typo: e.tipo, precio: { ...e } }))
                    usedispatch(filtrarlocali(nuevoObjeto))
                    sessionStorage.seleccionmapa = JSON.stringify(e)
                    abrirlocalidad()

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
                    usedispatch(cargarmapa(color))
                    usedispatch(settypo({ nombre: precios.mapa, typo: e.tipo, precio: { ...e } }))
                    usedispatch(filtrarlocali(nuevoObjeto))
                    sessionStorage.seleccionmapa = JSON.stringify(e)
                    abrirlocalidad()

                }
                else if (ouput.data.find(e => e.typo == "correlativo")) {
                    usedispatch(filtrarlocali(ouput.data.filter(e => e.cedula != " " && e.cedula != null)))
                    ouput.data.filter(e => e.estado == "disponible").length == 0 ?
                        usedispatch(setToastes({
                            show: true,
                            message: "Estan en proceso o vendidos",
                            color: 'bg-primary',
                            estado: "Esta loclidad no tiene disponibles  "
                        })) : ''
                    usedispatch(cargarmapa(color))
                    usedispatch(settypo({ nombre: precios.mapa, typo: e.tipo, precio: { ...e } }))
                    console.log({
                        disponibles: ouput.data.filter(e => e.estado == "disponible").length,
                        proceso: ouput.data.filter(e => e.estado == "reservado").length,
                        inpagos: sleccionlocalidad.inpagos
                    })
                    usedispatch(updateboletos({
                        disponibles: ouput.data.filter(e => e.estado == "disponible").length,
                        proceso: ouput.data.filter(e => e.estado == "reservado").length,
                        inpagos: sleccionlocalidad.inpagos
                    }))
                    sessionStorage.seleccionmapa = JSON.stringify(e)
                    abrirlocalidad()
                }
            }
            ).catch(err =>
                console.log(err))
        }
    }
    const path = document.querySelectorAll('path.disponible,polygon.disponible,rect.disponible,ellipse.disponible')
    modalshow.nombre == "ModalCarritov" ? path.forEach(E => {
        E.addEventListener("click", function () {
            // console.log(sleccionlocalidad)
            //console.log(clienteInfo())
            let consulta = precios.precios.find((F) => F.idcolor == this.classList[0])
            console.log(this.classList[0], consulta)
            //clienteInfo() == null && CODIGO == "ANNKV7" && (new Date("02/02/2023 08:30") < new Date())
            if (consulta.idcolor == 4) {
                usedispatch(setToastes({
                    show: true,
                    message: "Esta localidad ya no tiene Disponibilidad",
                    color: 'bg-primary',
                    estado: "Todos ocupados"
                }))
                return
            }
            // clienteInfo() == null && CODIGO == "9EGM42" && (new Date("02/02/2023 08:30") < new Date())
            if (false) {
                usedispatch(setToastes({
                    show: true,
                    message: "Estaremos informando la fecha de canje de boletos",
                    color: 'bg-success',
                    estado: "!Páramos la venta, los 600 boletos se agotaron!"
                }))
                return
            }
            // if (clienteInfo() == null && CODIGO == "9EGM42") 
            // clienteInfo() == null && CODIGO == "9EGM42" && (new Date("02/01/2023 19:00 ") > new Date())
            if (false) {
                usedispatch(setToastes({
                    show: true,
                    message: "Gauayaquil Disponible el 1 de febrero del 2023 19:00",
                    color: 'bg-danger',
                    estado: "Pronto Disponible"
                }))
                setSpiner("d-none")
                return
            }
            if (sleccionlocalidad.pagados >= 10) {
                usedispatch(setToastes({
                    show: true,
                    message: "Están en proceso, o completaste la cantidad de compra",
                    color: 'bg-primary',
                    estado: "Has alcanzado el límite de boletos por evento"
                }))
                return
            }
            else {
                setSpiner("d-none")


                localidaandespacio(consulta.espacio, consulta.idcolor).then(ouput => {
                    console.log(consulta.espacio, consulta.idcolor)
                    console.log(ouput)
                    let color = precios.pathmapa.filter((E) => E.id == consulta.idcolor)
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
                        //console.log(nuevoObjeto)
                        usedispatch(cargarmapa(color))
                        usedispatch(settypo({ nombre: precios.mapa, typo: consulta.tipo, precio: { ...consulta } }))
                        usedispatch(filtrarlocali(nuevoObjeto))
                        sessionStorage.seleccionmapa = JSON.stringify(consulta)
                        setSpiner("d-none")
                        usedispatch(setModal({ nombre: "Modallocalida", estado: '' }))
                        return
                    } else if (ouput.data.find(e => e.typo == "mesa")) {
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
                        usedispatch(cargarmapa(color))
                        usedispatch(settypo({ nombre: precios.mapa, typo: consulta.tipo, precio: { ...consulta } }))
                        usedispatch(filtrarlocali(nuevoObjeto))
                        sessionStorage.seleccionmapa = JSON.stringify(consulta)
                        setSpiner("d-none")
                        usedispatch(setModal({ nombre: "Modallocalida", estado: '' }))
                        return
                    }
                    else if (ouput.data.find(e => e.typo == "correlativo")) {
                        usedispatch(cargarmapa(color))
                        usedispatch(settypo({ nombre: precios.mapa, typo: consulta.tipo, precio: { ...consulta } }))
                        //  usedispatch(filtrarlocali(nuevoObjeto))
                        filtrarlocali(ouput.data.filter(e => e.cedula != "" && e.cedula != null))
                        // console.log(ouput.data.filter(e => e.cedula != " " && e.cedula != null).length)
                        ouput.data.filter(e => e.estado == "disponible").length == 0 ? usedispatch(setToastes({
                            show: true,
                            message: "Estan en proceso o vendidos",
                            color: 'bg-primary',
                            estado: "Esta loclidad no tiene disponibles  "
                        })) : ''
                        // ouput.data.filter(e => e.cedula != " " && e.cedula != null).length
                        console.log(ouput.data.filter(e => e.estado == "reservado" && usuario.cedula).length)
                        usedispatch(updateboletos({
                            disponibles: ouput.data.filter(e => e.estado == "disponible").length,
                            proceso: ouput.data.filter(e => e.estado == "reservado" && usuario.cedula).length,
                            pagados: sleccionlocalidad.pagados,
                            inpagos: sleccionlocalidad.inpagos
                        }))
                        sessionStorage.seleccionmapa = JSON.stringify(consulta)
                        setSpiner("d-none")
                        usedispatch(setModal({ nombre: "Modallocalida", estado: '' }))
                        return

                    }
                }
                ).catch(err =>
                    console.log(err))
                return
            }
        })
    }) : ''
    function cerrar() {
        handleClosesop()
        hideAlert()
    }
    const successAlert = () => {
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
                    <div className="px-2">
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
                        <button className='btn btn-outline-danger  rounded-6' onClick={() => hideAlert()}>

                            <span style={{
                                fontWeight: "bold"
                            }}>Cancelar</span>
                        </button>
                    </div>
                    <div>
                        <button className=' btn btn-warning rounded-5' onClick={() => cerrar()} >
                            <span style={{
                                fontWeight: "bold"
                            }}> Aceptar</span>
                        </button>
                    </div>

                </div>

            </SweetAlert>
        )
    }
    const clickt=()=>{
        usedispatch(setToastes({
            show: true,
            message: "Toca el palco requerido en el mapa",
            color: 'bg-primary',
            estado: "Selecciona tu compra en el mapa"
        }))
    }

    const EliminaLocalidad = (e) => {
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
                <div>
                    <h5 style={{
                        fontWeight: "bold"
                    }}>
                        Estas Seguro?
                    </h5>
                </div>

                <div className="px-2" > Se Borraran Todas las selecciones de esta Localidad </div>
                <div className='d-flex  justify-content-around py-4 px-2'>
                    <div>
                        <button className='btn btn-outline-danger  rounded-6' onClick={() => hideAlert()}>

                            <span style={{
                                fontWeight: "bold"
                            }}>Cancelar</span>
                        </button>
                    </div>
                    <div>
                        <button className=' btn btn-warning rounded-5' onClick={() => Eliminar(e)} >
                            <span style={{
                                fontWeight: "bold"
                            }}> Aceptar</span>
                        </button>
                    </div>

                </div>
            </SweetAlert>
        );
    }
    const hideAlert = () => {
        setAlert(null);
    };
    let fechava = (new Date().getDay() != 6 && new Date().getDay() != 0)
    //console.log(fechava)
    return (
        <>
            {alert}
            <Modal
                show={modalshow.nombre == "ModalCarritov" ? true : false}
                size="lg"
                fullscreen={'md-down'}
                className="modalCarrito"
                centered
            >
                <Modal.Header className="pb-2  bg-dark  text-light">
                    <div className="d-flex col-6 justify-content-between  align-items-center " >
                        <div>
                            <h5 className="modal-title text-center justify-content-center"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "1.2em"
                                }}>BOLETERÍA </h5>
                        </div>
                    </div>
                    <div className=" float-end ">
                        <div className="d-none d-md-block d-xl-block" >
                            {intervalo ? <h5 className="modal-title text-center justify-content-center"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "1.2em",
                                    fontSizeAdjust: 0.5
                                }}>
                                Tiempo restante para la compra <span className="text-danger"
                                    style={{
                                        fontSize: '1.2em',
                                        fontWeight: "bold"
                                    }}
                                >{intervalo}</span> </h5> : ''}
                        </div>
                        <div className="d-block d-sm-block d-md-none " >
                            {intervalo ? <h5 className="modal-title text-center justify-content-center"
                                style={{
                                    fontWeight: "bold",
                                    fontSize: "0.8em",
                                    fontSizeAdjust: 0.5
                                }}>
                                Tiempo restante para la compra <span className="text-danger"
                                    style={{
                                        fontSize: '0.9em',
                                        fontWeight: "bold"
                                    }}
                                >{intervalo}</span> </h5> : ''}
                        </div>
                    </div>
                    <button type="button" className="close txt-white" onClick={detalle.length > 0 ? successAlert : cerrar} >
                        X
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-wrap-reverse justify-content-center p-0 container-fluid"  >
                        <div className="col-12 pt-0  col-lg-12" >
                            <div className="  ">
                                <div className="detalles-resumen"
                                >
                                    <div className="bg-secondary d-none p-2 d-sm-block  text-light flex-table row" role="rowgroup">
                                        <div className="row text-center p-0 header" role="rowgroup">
                                            <div className="flex-row text-center col-sm" role="columnheader">Localidad</div>
                                            {/*<div className=" flex-row  text-center col-2 col-md-2" role="columnheader">Asiento</div>*/}
                                            <div className="flex-row  text-center col-2" role="columnheader">Total</div>
                                            <div className="flex-row  text-center col-2" role="columnheader">Cantidad</div>
                                            <div className="flex-row  col-sm " role="columnheader">Acciones</div>
                                        </div>

                                    </div>
                                    <div className="bg-secondary p-1  text-light flex-table row d-block d-sm-none " >

                                        <h4>Seleccionados</h4>

                                    </div>
                                    <div className="px-2  list-group-flush " style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
                                        {detalle.length > 0 ?

                                            detalle.map((e, i) => {
                                                return (
                                                    <div className="d-flex flex-table text-center row list-group-item" role="rowgroup" key={"items" + i}>
                                                        <div className="flex-row first  d-none d-sm-block col-sm p-0"
                                                            style={{
                                                                fontSize: "0.9em",
                                                            }} >{e.localidad}</div>
                                                        <div className="d-none d-sm-block  flex-row text-center col-2">${GetEstadousu().discapacidad === "No" ? e.valor * e.cantidad : e.discapacidad * e.cantidad}</div>
                                                        <div className="d-none d-sm-block flex-row  text-center  col-2 mx-auto justify-content-center">{e.cantidad}</div>
                                                        <div className="d-none d-sm-block d-flex d-sm-flex flex-row   mx-auto  justify-content-center col-sm">
                                                            <button className=" d-none d-sm-block  btn btn-danger  btn-sm" onClick={() => EliminaLocalidad(e)} >
                                                                <i className="fa fa-trash fa-1x"></i>
                                                            </button>
                                                            <button className=" d-none d-sm-block btn btn-primary mx-1  btn-sm " onClick={() => Abririlocalfirt(e.localidaEspacio)} >
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                            {seleciondesillas.filter(item => item.localidad == e.localidad).length > 0 ? <button className=" d-none d-sm-block btn btn-success  btn-sm"
                                                                data-toggle="collapse" href={"#collapseExample" + i}
                                                                aria-expanded="false"
                                                                aria-controls={"#collapseExample" + i}
                                                            >
                                                                <i className="fa fa-eye fa-2xs"></i>
                                                            </button> : ''}
                                                        </div>


                                                        <div className="d-block d-sm-none col-6  col-6 d-flex flex-row ">
                                                            <div className="d-flex flex-column ">
                                                                <h5 className="card-title">{e.localidad}</h5>

                                                                <p className="card-subtitle">Valor ${e.valor * e.cantidad}</p>
                                                                <p className="card-subtitle">Cantidad {e.cantidad}</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-block d-sm-none col-6 d-flex flex-row justify-content-center align-items-center text-center">
                                                            <button className="d-block d-sm-none btn btn-danger  btn-sm" onClick={() => EliminaLocalidad(e)} >
                                                                <i className="fa fa-trash fa-1x"></i>
                                                            </button>
                                                            <button className="d-block d-sm-none btn btn-primary mx-1  btn-sm " onClick={() => Abririlocalfirt(e.localidaEspacio)} >
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                            {seleciondesillas.filter(item => item.localidad == e.localidad).length > 0 ? <button className="d-block d-sm-none btn btn-success  btn-sm"
                                                                data-toggle="collapse" href={"#collapseExample" + i}
                                                                aria-expanded="false"
                                                                aria-controls={"#collapseExample" + i}
                                                            >
                                                                <i className="fa fa-eye fa-2xs"></i>
                                                            </button> : ''}
                                                        </div>
                                                        <div className="collapse" id={"collapseExample" + i}>
                                                            <div className="d-flex flex-wrap">
                                                                {

                                                                    seleciondesillas.filter(item => item.localidad == e.localidad).length > 0 ?
                                                                        seleciondesillas.filter(item => item.localidad == e.localidad && item.estado == "seleccionado").map((elm, id) => {
                                                                            return (
                                                                                <div key={id} className={elm.silla + ' d-flex rounded-5  bg-success justify-content-center align-items-center '}
                                                                                    style={{ height: '30px', width: '60px', margin: '1px' }} >
                                                                                    <div className={'d-flex   text-white justify-content-center  '} >
                                                                                        <div className="d-flex flex-wrap justify-content-center text-center p-2">
                                                                                            <span className="mx-1" style={{ fontSize: '0.7em' }}>{elm.silla.replace("-", " ").split(" ")[0]}</span>
                                                                                            <span style={{ fontSize: '0.7em' }}>{elm.silla.replace("-", " ").split(" ")[1]}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            )
                                                                        }) :
                                                                        <div className="d-flex text-center" >

                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })
                                            : ''
                                        }
                                        <div className="d-flex   justify-content-center my-1 row list-group-item" role="rowgroup">
                                            {sleccionlocalidad.inpagos > 0 ? "Tienes " + sleccionlocalidad.inpagos + " boletos por pagar" : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-12  border rounded-5 pt-1 mb-2  px-0"
                            style={{ alignItems: 'stretch', lineHeight: '1', }}>
                            <div className="row ">
                                <div className="col-12  text-center">
                                    <h5 style={{ fontSize: '1.1em', fontWeight: "bold" }} >
                                        SELECCIONE LA LOCALIDAD EN EL MAPA O EN EL NOMBRE
                                    </h5>
                                    <div className="col-12 col-md-9  col-lg-10 mx-auto text-center " style={{
                                        height: "auto"
                                    }}>
                                        {modalshow.nombre == "ModalCarritov" ?
                                            <SvgselectView


                                                text={precios.mapa} />
                                            : ''}
                                    </div>

                                </div>
                                <div className="col-12">
                                    <div className=" container-fluid d-flex  py-2  col-12 flex-wrap pb-2 justify-content-between align-items-center px-0 p-0">
                                        {sessionStorage.getItem("eventoid") != "YZPQQ3" && precios.precios.length > 0 ?
                                            precios.precios.sort((a, b) => (a.precio_normal > b.precio_normal ? 1 : -1) && (a.id > b.id ? 1 : -1)).map((elm, i) => {
                                                return (
                                                    <div className="d-flex flex-row mx-3 mb-1 precios align-items-center" onClick={() => Abririlocalfirt(elm)} key={i}  >
                                                        <div id={"precios" + elm.id} className="mx-1  p-2 rounded-4" style={{ height: 20, width: 20, backgroundColor: elm.color }}></div>
                                                        <div className="d-flex flex-row" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '130px', maxWidth: '160px' }} >
                                                            <span className="" style={{ fontFamily: '', fontSize: '1.11em' }} >{elm.localidad} </span>
                                                            <span className="pl-1" style={{ fontFamily: '', fontSize: '1.11em' }} >${elm.precio_normal} </span>
                                                        </div>
                                                    </div>
                                                )
                                            }) :

                                            <div className="container-fluid d-flex  py-2  col-12 flex-wrap pb-2 justify-content-between align-items-center px-0 p-0">
                                                <div className="d-flex flex-row mx-3 mb-1 precios align-items-center" onClick={()=>clickt()}   >
                                                    <div id="" className="mx-1  p-2 rounded-4" style={{ height: 20, width: 20, backgroundColor: "#c69b30" }}></div>
                                                    <div className="d-flex flex-row" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '130px', maxWidth: '160px' }} >
                                                        <span className="" style={{ fontFamily: '', fontSize: '1.11em' }} >Golden x 10 </span>
                                                        <span className="pl-1" style={{ fontFamily: '', fontSize: '1.11em' }} >$750 </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row mx-3 mb-1 precios align-items-center" onClick={() => clickt()} >
                                                    <div id="" className="mx-1  p-2 rounded-4" style={{ height: 20, width: 20, backgroundColor: "#b2b2b2" }}></div>
                                                    <div className="d-flex flex-row" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '130px', maxWidth: '160px' }} >
                                                        <span className="" style={{ fontFamily: '', fontSize: '1.11em' }} >Platinum </span>
                                                        <span className="pl-1" style={{ fontFamily: '', fontSize: '1.11em' }} >$40 </span>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row mx-3 mb-1 precios align-items-center" onClick={() => clickt()} >
                                                    <div id="" className="mx-1  p-2 rounded-4" style={{ height: 20, width: 20, backgroundColor: "#609ffe" }}></div>
                                                    <div className="d-flex flex-row" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '130px', maxWidth: '160px' }} >
                                                        <span className="" style={{ fontFamily: '', fontSize: '1.11em' }} >Vip </span>
                                                        <span className="pl-1" style={{ fontFamily: '', fontSize: '1.11em' }} >$25 </span>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex  p-3 border-top  justify-content-between align-items-center">
                    <div className="d-flex  col-12 justify-content-center my-1" role="rowgroup">
                        {sleccionlocalidad.proceso > 0 ? "Tienes " + sleccionlocalidad.proceso + " boletos por pagar" : ''}
                    </div>
                    <div className="d-flex flex-column">
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
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        checked={checked.Transferencia == "Transferencia" ? true : false}
                                        onChange={(e) => handelMetodopago({ name: e.target.name }, "Transferencia")}
                                        name="Transferencia" id="Transferencia" />
                                    <label className="form-check-label" htmlFor="Transferencia">
                                        Transferencia
                                    </label>
                                </div> : ""}
                            {
                                clienteInfo() == null && fechava ? <div className="form-check ">
                                    <input className="form-check-input" type="radio"
                                        checked={checked.Deposito == "Deposito" ? true : false}
                                        onChange={(e) => handelMetodopago({ name: e.target.name }, "Deposito")}
                                        name="Deposito" id="Deposito" />
                                    <label className="form-check-label" htmlFor="Deposito">
                                        Deposito
                                    </label>
                                </div> : ""}

                            {clienteInfo() == null ? <div className="form-check d-none">
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
                    <div className="d-flex flex-row  align-items-center" >
                        <h4
                            style={{
                                fontSize: '1.5rem',

                            }}
                        >SUBTOTAL:</h4>
                        <h4
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                            }}
                            className="px-1 text-danger total-detalle"> {listaPrecio.subtotal ? "$" + listaPrecio.subtotal : null}</h4>

                    </div>
                    <div className="d-flex  mx-sm-auto   ">
                        <div className=" text-center ">
                            <div className="py-1 d-none" >
                                <div className="input-group">
                                    <input className=" form-control-sm " placeholder="Código Barcelona"></input>
                                    <button className="btn  btn-primary"> <i className=" "></i></button>
                                </div>
                            </div>

                            {detalle.length > 0 ?
                                <button className="btn btn-primary " disabled={check} onClick={handleContinuar}>Continuar</button> :
                                <button className="btn btn-primary  float-right" disabled={true} >Continuar</button>
                            }


                        </div>

                    </div>
                </Modal.Footer>
            </Modal>
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
                    zIndex: '10000'
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
                    <h4 className='text-light'>Cargando  localidad...</h4>


                </div>
            </div>
        </>
    )
}
export default ModalCarritoView