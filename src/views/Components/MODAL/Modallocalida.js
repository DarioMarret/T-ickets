import React, { useState, useEffect } from "react"
import MesaiView from "views/Pages/Mesas/Plantillas/indice"
import MesasView from "views/Pages/Mesas"
import SVGView from "views/Pages/Svgviewa/svgoptio.js";
import { TiendaIten, getVerTienda, EliminarByStora, EliminarsilladeMesa } from "utils/CarritoLocalStorang";
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { filtrarlocali } from "StoreRedux/Slice/mapaLocalSlice";
import { addSillas, deleteSillas, clearSillas, deleteMesa } from "StoreRedux/Slice/sillasSlice"
import { EliminarSillas, AgregarAsiento, VerSillaslist, TotalSelecion } from "utils/CarritoLocalStorang"
import SweetAlert from "react-bootstrap-sweetalert";
import "./localidas.css"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { seleccionmapa } from "utils/constantes";
import { enviasilla } from "utils/Querypanelsigui";
import { CarritoTicket } from "utils/constantes";
import { listaEliminasillas } from "utils/CarritoLocalStorang";
import { quitarsilla } from "utils/Querypanelsigui";
import { correlativosadd } from "utils/Querypanelsigui";
import moment from "moment";
import { correlativodelete } from "utils/Querypanelsigui";
import { Verificalocalidad } from "utils/CarritoLocalStorang";
const LocalidadmapViews = (props) => {
    const { precios, showMapa, handleClosesop, setMapashow, intervalo } = props
    var mapath = useSelector((state) => state.mapaLocalSlice)
    let nombre = JSON.parse(sessionStorage.getItem(seleccionmapa))

    const usedispatch = useDispatch()
    const [detalle, setDetalle] = useState([])
    const seleccion = useSelector((state) => state.sillasSlice.sillasSelecionadas.filter((e) => e.localidad == mapath.precio.localodad))
    const maximocarro = useSelector((state) => state.sillasSlice.sillasSelecionadas)
    const [alert, setAlert] = useState(null);
    function cerrar() {
        handleClosesop(true)
        setMapashow(flase)
    }
    function MesaVerifica(M, C) {
        let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
        hideAlert()
        let nuevo = []
        for (let i = 1; i < parseInt(C) + 1; i++) {
            let valid = seleccion.some(e => e.seleccionmapa == nombre.localodad + "-" + M + "-s-" + i)
            if (valid) { }
            nuevo.push({ id: nombres.idcolor, silla: M + "-s-" + i })
        }
        nuevo.length > 0 && TotalSelecion() < 10 ? nuevo.map((e, index) => {
            setTimeout(() => {
                $("." + e.silla).hasClass('disponible') ? enviasilla({ ...e }).then(ouput => {
                    AgregarAsiento({ "localidad": nombre.localodad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal, seleccionmapa: nombre.localodad + "-" + e.silla, "fila": e.silla.split("-")[0], "silla": e.silla, "estado": "seleccionado" })
                    usedispatch(addSillas({ "localidad": nombre.localodad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal, seleccionmapa: nombre.localodad + "-" + e.silla, "fila": e.silla.split("-")[0], "silla": e.silla, "estado": "seleccionado" }))
                }
                ).catch(exit => {
                    console.log(exit)
                }) : ''
            }, 20 * index)

        }) : succesLimit()

    }
    const eliminarmesas = (M, C) => {
        let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
        let user = getDatosUsuariosLocalStorag()
        let nuevo = []
        for (let i = 1; i < parseInt(C) + 1; i++) {
            let valid = seleccion.some(e => e.seleccionmapa == nombre.localodad + "-" + M + "-s-" + i && e.estado == "seleccionado")
            if (valid) {
                nuevo.push({ id: nombres.idcolor, silla: M + "-s-" + i })
            }
        }
        nuevo.length > 0 ? nuevo.map((elm, index) => {
            setTimeout(() => {
                quitarsilla({ "array": [{ estado: "disponible", "id": elm.id, "silla": elm.silla, "cedula": user.cedula }] }).then(ouput => {
                    usedispatch(deleteSillas({ "localidad": nombre.localodad, "fila": elm.silla.split("-")[0], "silla": elm.silla, "estado": "seleccionado" }))
                    EliminarsilladeMesa({ localodad: nombre.localodad + "-" + elm.silla })
                    // console.log(user.cedula, ouput)
                }).catch(err => console.log(err))


            }, 25 * index)

        }) : ''
        hideAlert()
    }
    function restaprecio() {
        let producto = {
            cantidad: -1,
            localidad: mapath.precio.localodad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            fila: 0,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto"),
        }
        getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? '' : correlativodelete({
            "id": mapath.precio.idcolor,
            "protocol": getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol,
            "cantidad": 1
        }).then(oupt => {
            //console.log(oupt)
        }).catch(err => {
            console.log(err)
        })
        getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? '' : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })
        setDetalle(getVerTienda().filter(e => e.id == mapath.precio.idcolor))
    }
    function agregar() {
        let user = getDatosUsuariosLocalStorag()
        let protoco = moment().format("YYYYMMDDHHMMSS")
        let producto = {
            cantidad: 1,
            localidad: mapath.precio.localodad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            tipo: "correlativo",
            fila: 0,
            discapacidad: mapath.precio.precio_discapacidad,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto") ? sessionStorage.getItem("consierto") : '',
        }
        if (TotalSelecion() < 10) {
            getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": protoco, tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })
            setDetalle(getVerTienda().filter(e => e.id == mapath.precio.idcolor))
            correlativosadd({
                "id": mapath.precio.idcolor,
                "estado": "seleccion",
                "cedula": user.cedula,
                "protocol": getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? protoco : getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol,
                "cantidad": getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? 1 : getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).cantidad
            }).then(oupt => {
                //  console.log(oupt)
            }

            ).catch(erro => console.log(erro))
        }
        else
            succesLimit()
    }
    function Eliminar(e) {
        EliminarByStora(e.localidad)
        setDetalle([])
    }
    const successAlert = (e, f, c) => {
        let silla = e.replace("-", " ").split(" ")[1]
        setAlert(
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title={"Se agrego   "}
                onConfirm={() => hideAlert()}
                onCancel={() => cerrar()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Seguir Agregando"
                cancelBtnText="Ir al carrito"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                <div className="d-flex flex-row justify-content-center text-center">
                    <div className="d-flex">
                        <h4 style={{ fontSize: '0.9em' }} >
                            De la Localidad {f} En la {c}:  {e.replace("-", " ").split(" ")[0]} la Silla #{silla.split("-")[1]}  </h4>
                    </div>
                </div>
            </SweetAlert>
        );
    };
    const succesElimAlert = (e, f) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Desea quitar este Asiento del carrito"
                onConfirm={() => eliminaLista(e, f)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Continuar"
                cancelBtnText="Cancelar"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel>
            </SweetAlert>
        )
    }
    const succesElimAlertli = (e) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Desea quitar este Asiento del carrito"
                onConfirm={() => eliminaListadiv(e)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Continuar"
                cancelBtnText="Cancelar"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel>
            </SweetAlert>
        )
    }
    const succesLimit = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Has alcanzado la cantidad límite de entradas"
                onConfirm={() => hideAlert()}
                onCancel={() => cerrar()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Continuar"
                cancelBtnText="Ir al carrito"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel>
                Deseas Continuar editando la selección
            </SweetAlert>
        )
    }
    const Alertmesas = (e, f) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Desea selecionar los asientos dispobles de esta mesa"
                onConfirm={() => MesaVerifica(e, f)}
                onCancel={() => cerrar()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Continuar"
                cancelBtnText="Ir al carrito"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel>
                Deseas Continuar editando la selección
            </SweetAlert>
        )
    }
    const Elimnamesa = (e, f) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Desea quitar los asientos seleccionados de esta mesa"
                onConfirm={() => eliminarmesas(e, f)}
                onCancel={() => cerrar()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Continuar"
                cancelBtnText="Ir al carrito"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel>
                Deseas Continuar editando la selección
            </SweetAlert>
        )
    }

    const eliminaListadiv = (e) => {
        let user = getDatosUsuariosLocalStorag()
        e.tipo != "mesa" ? $("div." + e.silla).removeClass("seleccionado").addClass("disponible") : $("a." + e.silla).removeClass("seleccionado").addClass("disponible");
        quitarsilla({ "array": [{ estado: "disponible", "id": e.id, "silla": e.silla, "cedula": user.cedula }] }).then(ouput =>
            console.log(ouput)).catch(err => console.log(err))
        hideAlert()
        EliminarSillas({ ...e })
        usedispatch(deleteSillas({ ...e }))
    }
    const eliminaLista = (d, e) => {
        let user = getDatosUsuariosLocalStorag()
        d.classList.remove('seleccionado')
        d.classList.add('disponible')
        hideAlert()
        quitarsilla({ "array": [{ estado: "disponible", "id": e.id, "silla": e.silla, "cedula": user.cedula }] }).then(ouput => {
            EliminarSillas({ ...e })
            usedispatch(deleteSillas({ ...e }))
        }).catch(err => console.log(err))


    }
    $(document).on('click', 'div.disponible', function (e) {
        e.preventDefault();
        if (this.classList.contains("disponible")) {
            if (!this.classList.contains('seleccionado') && !this.classList.contains('ocupado') && !this.classList.contains("reservado")) {
                let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
                if (TotalSelecion() < 10) {
                    this.classList.remove('disponible')
                    this.classList.add('seleccionado')
                    this.classList.add("" + nombres.idcolor + "silla")
                    successAlert(this.classList[0], nombres.localodad, "Fila")
                    AgregarAsiento({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, seleccionmapa: nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" })
                    usedispatch(addSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, seleccionmapa: nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" }))
                    enviasilla({ id: nombres.idcolor, silla: this.classList[0] }).then(ouput => {
                        usedispatch(filtrarlocali(ouput))
                    }
                    ).catch(exit => {
                        console.log(exit)
                    })
                } else
                    succesLimit()
            }
            return
        }
    })
    $(document).on('click', 'div.seleccionado', function (e) {
        e.preventDefault();
        if (this.classList.contains("seleccionado")) {
            if (!this.classList.contains('disponible')) {
                let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
                //                
                succesElimAlert(this, { "id": nombres.idcolor, "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" })

            }
            return
        }
    })
    $(document).on('click', 'a.disponible', function () {
        if (!this.classList.contains('seleccionado')) {
            let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
            if (TotalSelecion() < 10) {
                this.classList.remove('disponible')
                this.classList.add('seleccionado')
                AgregarAsiento({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, seleccionmapa: nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" })
                usedispatch(addSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, seleccionmapa: nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" }))
                successAlert(this.classList[0], nombres.localodad, "Mesa")
                //console.log({ id: nombres.idcolor, silla: this.classList[0] })
                enviasilla({ id: nombres.idcolor, silla: this.classList[0] }).then(ouput => {
                    //console.log(ouput)
                    usedispatch(filtrarlocali(ouput))
                    // console.log(ouput)
                }
                ).catch(exit => console.log(exit))
            } else {
                succesLimit()
            }
        }
        return
    })
    $(document).on("click", "a.seleccionado", function () {
        if (!this.classList.contains('disponible')) {
            let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))

            succesElimAlert(this, { id: nombres.idcolor, "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" })
        }
        return
    })
    $(document).on("click", "div.mesadisponible", function () {
        if (!this.classList.contains("mesaselecion")) {
            if (TotalSelecion() != 10) {
                Alertmesas(this.classList[0], this.classList[1])
            }
            else
                succesLimit()
        }
        return
    })
    $(document).on("click", "div.mesaselecion", function () {
        if (!this.classList.contains("mesadisponible")) {
            Elimnamesa(this.classList[0], this.classList[1])
        }
    })
    function cerrar() {
        setMapashow(false)
        handleClosesop(true)
        hideAlert()
        sessionStorage.removeItem(seleccionmapa)
    }
    const hideAlert = () => {
        setAlert(null);
    }
    const sillasetado = (d) => {
        const user = getDatosUsuariosLocalStorag()
        let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
        if (d.cedula != undefined) {
            if (user != null && user.cedula == d.cedula) return "seleccionado  " + nombres.idcolor + "silla"
            else
                return d.estado == "seleccionado" ? "reservado" : d.estado
        }
        else return d.estado
    }
    $(document).ready(function () {
        let disponible = document.querySelectorAll("div.disponible, a.disponible")
        let reservado = document.querySelectorAll("div.reservado, a.reservado")
        let seleccion = document.querySelectorAll("div.seleccionado, a.seleccionado")
        let ocupado = document.querySelectorAll("div.ocupado, a.ocupado")
        $("#disponible").text(disponible.length)
        $("#ocupado").text(ocupado.length)
        $("#reservado").text(reservado.length)
        $("#seleccionado").text(seleccion.length)
    })
    useEffect(() => {
        getVerTienda().filter((e) => e.id == mapath.precio.idcolor).length > 0 ? setDetalle(getVerTienda().filter((e) => e.id == mapath.precio.idcolor)) : setDetalle([])
        mapath.localidadespecica != undefined && mapath.pathmap.length > 0 ? mapath.pathmap.map((e, i) => {
            $("#mapas" + e.path).attr("fill", e.fill)
            $("#mapas" + e.path).removeAttr("class")
        }) : ''


        let producto = {
            localidad: mapath.precio.localodad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            fila: 0, tipo: "correlativo",
            discapacidad: mapath.precio.precio_discapacidad,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto") ? sessionStorage.getItem("consierto") : '',
        }
        let cantidad = mapath.localidadespecica.info != undefined ? mapath.localidadespecica.info : ''
        mapath.localidadespecica.info != undefined && mapath.localidadespecica.info.length > 0 ? setDetalle(Verificalocalidad(producto, cantidad).filter((e) => e.id == mapath.precio.idcolor)) : ''


    }, [showMapa])
    return (
        <>
            <Modal
                show={showMapa}
                size="lg"
                fullscreen={'md-down'}
                onHide={cerrar}
                className="rounded-7"
            >
                {alert}
                <Modal.Header>
                    <h5 className="modal-title text-center justify-content-center" style={{ fontFamily: 'fantasy' }}>Tiempo restante de compra <span className="text-danger" >{intervalo} </span></h5>
                    <button className=" btn btn-primary" onClick={cerrar} >
                        <i className="bi bi-caret-left-fill">  </i>Regresar
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className='conatiner-fluid col-12'>
                        <div className="row ">
                            <div className="col-12 d-flex  flex-column justify-content-center text-center" style={{ fontFamily: 'fantasy' }}>
                                <h5>{mapath.precio.localodad}</h5>
                                <h6 className="px-1">$ {mapath.precio.precio_normal} </h6>
                            </div>
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{ maxHeight: "200px" }}>
                                {showMapa ? <SVGView text={mapath.nombre} /> : ''}
                            </div>

                            {showMapa && mapath.precio.typo != "correlativo" ?
                                <div className="col-12 d-flex  flex-wrap  ">
                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-success text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >

                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }} id="disponible" >  0   </span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <span>Disponibles.<span className="text-white">...</span></span>

                                        </div>

                                    </div>

                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-warning text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em', color: 'black' }} id="reservado">   0 </span>
                                            </div>
                                        </div>
                                        <span>En Proceso.</span>
                                    </div>
                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-secondary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }} id="seleccionado" >   0 </span>
                                            </div>
                                        </div>
                                        <span>Seleccionado.</span>
                                    </div>
                                    <div className="d-flex flex-row p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-danger text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }} id="ocupado" >   0 </span>
                                            </div>
                                        </div>
                                        <span>Ocupados.</span>
                                    </div>

                                </div> : ''}
                            <div className="col-12 pt-1">
                                {showMapa && mapath.precio.typo == "fila" ?
                                    <div className="section" style={{ maxHeight: '550px', minHeight: '250px', overflowY: 'auto', overflowX: 'auto', }}>
                                        {showMapa && mapath.localidadespecica.length > 0 ?
                                            mapath.localidadespecica.map((e, i) => {
                                                {
                                                    return (
                                                        <div className='d-flex  px-3 p-1 justify-content-ce ' key={"lista" + i}>
                                                            <span className="d-inline-block " disabled >
                                                                <div className="d-flex   mx-1 bg-primary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                                                    <div className="d-flex justify-content-center">
                                                                        <span style={{ fontSize: '0.7em' }}>    {e.fila} </span>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                            <div className=' d-flex px-1  align-items-stretch ' style={{ width: '100%' }}>
                                                                {e.asientos.map((silla, index) => {
                                                                    let numero = index + 1
                                                                    return (
                                                                        <div key={"silla" + index}
                                                                            className={silla.silla + '  d-flex  ' + sillasetado(silla) + '  rounded-5 sillasfila text-center  justify-content-center align-items-center '}
                                                                            style={{ height: '30px', width: '30px', marginLeft: '1px', }} >
                                                                            <div className={'px-3 d-flex   text-white justify-content-center  '} >
                                                                                <div className="d-flex justify-content-center">
                                                                                    <span style={{ fontSize: '0.7em' }}> {numero} </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                            : ""}
                                    </div> : ''}
                                {showMapa && mapath.precio.typo === "mesa" ?
                                    <div className="col-sm-12 text-center " style={{ maxHeight: '550px', minHeight: '250px', overflowY: 'auto', overflowX: 'auto', }}>
                                        <div className='d-flex  px-3 align-items-center' >
                                            <div className='d-flex align-itmes-center pb-2' style={{ width: '80px' }}>
                                                <h5>Filas</h5>
                                            </div>
                                            <div className='d-flex align-itmes-center pb-2' >
                                                <h5>Mesas</h5>
                                            </div>
                                        </div>
                                        {
                                            mapath.localidadespecica.length > 0 ?
                                                mapath.localidadespecica.map((e, index) => {
                                                    return (
                                                        <div className='d-flex  PX-1 align-items-center' key={index}>
                                                            <div className='d-flex pb-2'>
                                                                <MesaiView
                                                                    text={e.Fila}
                                                                />
                                                            </div>
                                                            <div className='d-flex  pb-2' >
                                                                {e.Mesas.length > 0 ?
                                                                    e.Mesas.map((e, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                <MesasView
                                                                                    status={e.asientos.length}
                                                                                    text={e.mesa}
                                                                                    list={e.asientos}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }) : ''}
                                                            </div>
                                                        </div>

                                                    )
                                                }) : ''
                                        }
                                    </div> : ''}
                                {mapath.precio.typo === "correlativo" ?
                                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <div className="text-center d-flex justify-content-end align-items-center">
                                            <button className="resta btn btn-danger rounded-7 "
                                                onClick={restaprecio}
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>
                                            <hr className="mx-2" ></hr>
                                            <button className="suma btn btn-success rounded-7"
                                                onClick={agregar} >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>

                                    </div> : ''

                                }

                            </div>

                        </div>

                    </div>


                </Modal.Body>
                <Modal.Footer className="" >
                    <div className=" container-fluid  text-dark  border-top justify-content-between p-3" style={{ minHeight: '50px', maxHeight: '188px', width: '100%' }} >
                        {mapath.precio.typo != "correlativo" ?
                            <div className="col-12 ">
                                {mapath.precio.typo == "mesa" ? <h5>Numero de mesas y sillas seleccionadas</h5> : <h5>Sillas y Filas Selecionadas</h5>}
                                <div className="d-flex flex-wrap" style={{ minHeight: '10px', maxHeight: '150px', overflowY: 'auto', overflowX: 'hide', }}>
                                    {
                                        seleccion.length > 0 ?
                                            seleccion.filter((e) => e.estado == "seleccionado").map((elm, id) => {
                                                return (
                                                    <li key={id} className={elm.silla + '  d-flex agregados rounded-5  bg-success justify-content-center align-items-center '}
                                                        onClick={() => succesElimAlertli({ "localidad": elm.localidad, tipo: mapath.precio.typo, "localidaEspacio": elm.localidaEspacio, "fila": elm.silla.split("-")[0], "silla": elm.silla, "estado": "borrar" })}
                                                        style={{ height: '30px', width: '80px', margin: '1px' }} >
                                                        <div className={'d-flex   text-white justify-content-center  '} >
                                                            <div className="d-flex  justify-content-center text-center p-2">
                                                                <span className="mx-1" style={{ fontSize: '0.8em' }}>{elm.silla.replace("-", " ").split(" ")[0]}</span>
                                                                <span style={{ fontSize: '0.8em' }}> {elm.silla.replace("-", " ").split(" ")[1]}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }) : ''
                                    }
                                </div>
                            </div> : <div>


                            </div>}
                        <div>
                            {
                                mapath.precio.typo === "correlativo" && detalle.length > 0 ?
                                    detalle.map((e, i) => {
                                        return (
                                            <div className="d-flex flex-table row justify-content-center " role="rowgroup" key={"items" + i}>
                                                <div className="flex-row first text-center col-3 col-md-3" role="cell">{e.localidad}</div>
                                                {/* <div className="flex-row d-none d-sm-block  text-center col-2 col-md-2">{e.fila}</div>*/}
                                                <div className="flex-row   text-center col-2 col-md-2">${e.valor * e.cantidad}</div>
                                                <div className="flex-row  text-center  col-2 col-md-2">{e.cantidad}</div>
                                                <div className="flex-row  text-center col-3 col-md-3">
                                                    <button className="btn btn-danger" onClick={() => Eliminar(e)} >Eliminar</button>
                                                </div>
                                            </div>
                                        )
                                    }) : ''
                            }
                        </div>

                        <div className="  d-none  col-2 align-items-center justify-content-end" >
                            <div>
                                <button className="btn btn-primary " onClick={() => usedispatch(clearSillas({}))} > <i className="fa fa-plus" ></i> </button>
                            </div>

                        </div>

                    </div>

                </Modal.Footer>

            </Modal>
        </>
    )

}

export default LocalidadmapViews