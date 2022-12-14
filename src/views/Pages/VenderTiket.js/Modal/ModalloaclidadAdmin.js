import React, { useState, useEffect } from "react"
import MesaiView from "views/Pages/Mesas/Plantillas/indice"
import MesasView from "views/Pages/Mesas"
import SVGView from "views/Pages/Svgviewa/svgoptio.js";
import { TiendaIten, getVerTienda, EliminarByStora, EliminarsilladeMesa } from "utils/CarritoLocalStorang";
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addSillas, deleteSillas, clearSillas, deleteMesa } from "StoreRedux/Slice/sillasSlice"
import { EliminarSillas, AgregarAsiento, VerSillaslist, TotalSelecion } from "utils/CarritoLocalStorang"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { enviasilla } from "utils/Querypanelsigui";
import SweetAlert from "react-bootstrap-sweetalert";
import { quitarsilla } from "utils/Querypanelsigui";
import { filtrarlocali } from "StoreRedux/Slice/mapaLocalSlice";
const ModalLocalidamapViews = (props) => {
    const { precios, showMapa, handleClosesop, setMapashow, intervalo } = props
    var mapath = useSelector((state) => state.mapaLocalSlice)
    let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
    const usedispatch = useDispatch()
    const [detalle, setDetalle] = useState([])
    const seleccion = useSelector((state) => state.sillasSlice.sillasSelecionadas.filter((e) => e.localidad == mapath.precio.localodad))
    const maximocarro = useSelector((state) => state.sillasSlice.sillasSelecionadas)

    const [alert, setAlert] = useState(null);
    function cerrar() {
        handleClosesop(true)
        setMapashow(flase)
    }
    function agregar() {
        let producto = {
            cantidad: 1,
            localidad: mapath.precio.localodad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.id,
            fila: 0,
            valor: mapath.precio.precio_normal,
            discapacidad: mapath.precio.precio_discapacidad,
            nombreConcierto: sessionStorage.getItem("consierto") ? sessionStorage.getItem("consierto") : '',
        }
        if (TotalSelecion() != 10)
            TiendaIten(producto), setDetalle(getVerTienda().filter(e => e.id == mapath.precio.id))
        else
            succesLimit()
    }


    function MesaVerifica(M, C) {
        //  console.log(seleccion.some(e => e.seleccionmapa == "Mesas Golden-F1-A7-s-2"))
        hideAlert()
        for (let i = 1; i < parseInt(C) + 1; i++) {
            let valid = seleccion.some(e => e.seleccionmapa == nombre.localodad + "-" + M + "-s-" + i)
            if (valid) { }
            if (TotalSelecion() != 10) {
                $("." + M + "-s-" + i).hasClass('disponible') ? AgregarAsiento({ "localidad": nombre.localodad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal, "discapacidad": nombre.precio_discapacidad, "seleccionmapa": nombre.localodad + "-" + M + "-s-" + i, "fila": M, "silla": M + "-s-" + i, "estado": "seleccionado" }) : ''
                $("." + M + "-s-" + i).hasClass('disponible') ? usedispatch(addSillas({ "localidad": nombre.localodad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal, "discapacidad": nombre.precio_discapacidad, "seleccionmapa": nombre.localodad + "-" + M + "-s-" + i, "fila": M, "silla": M + "-s-" + i, "estado": "seleccionado" })) : ''
                $("." + M + "-s-" + i).hasClass('disponible') ? $("." + M + "-s-" + i).addClass('seleccionado') : ''
                $("." + M + "-s-" + i).hasClass('disponible') ? $("." + M + "-s-" + i).removeClass('disponible') : ''
            } else {
                succesLimit()
            }
        }
    }


    function restaprecio() {
        let producto = {
            cantidad: -1,
            localidad: mapath.precio.localodad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.id,
            fila: 0,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto"),
        }
        TiendaIten(producto)
        setDetalle(getVerTienda().filter(e => e.id == mapath.precio.id))
    }
    function Eliminar(e) {
        EliminarByStora(e.localidad)
        setDetalle([])
    }
    const obtenerdatosConcierto = () => {
        let datos = mapath
        console.log(datos)
        if (Object.values(datos.precio).every(e => e)) return datos.precio
        else return datos.precio
    }
    // obtenerdatosConcierto()

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
    const eliminarmesas = (M, C) => {
        for (let i = 1; i < parseInt(C) + 1; i++) {
            let valid = seleccion.some(e => e.seleccionmapa == nombre.localodad + "-" + M + "-s-" + i && e.estado == "seleccionado")
            if (valid) {
                usedispatch(deleteSillas({ "localidad": nombre.localodad, "fila": M, "silla": M + "-s-" + i, "estado": "seleccionado" }))
                EliminarsilladeMesa({ localodad: nombre.localodad + "-" + M + "-s-" + i })
                $("." + M + "-s-" + i).removeClass("seleccionado").addClass("disponible")
                $("." + M).removeClass("mesadisponible").addClass("mesaselecion")
            }
        }
        hideAlert()
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
        console.log({ estado: "disponible", "id": e.id, "silla": e.silla, "cedula": user.cedula })
        hideAlert()
        quitarsilla({ "array": [{ estado: "disponible", "id": e.id, "silla": e.silla, "cedula": user.cedula }] }).then(ouput => {
            EliminarSillas({ ...e })
            usedispatch(deleteSillas({ ...e }))
            console.log(ouput)
        }).catch(err => console.log(err))


    }
    $(document).on('click', 'div.disponible', function (e) {
        e.preventDefault();
        if (this.classList.contains("disponible")) {
            if (!this.classList.contains('seleccionado') && !this.classList.contains('ocupado') && !this.classList.contains("reservado")) {
                let nombres = JSON.parse(sessionStorage.getItem("seleccionmapa"))
                // console.log(obtenerdatosConcierto())
                if (TotalSelecion() != 10) {
                    this.classList.remove('disponible')
                    this.classList.add('seleccionado')
                    AgregarAsiento({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, "discapacidad": nombres.precio_discapacidad, "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" })
                    usedispatch(addSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, "discapacidad": nombres.precio_discapacidad, "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" }))
                    successAlert(this.classList[0], nombres.localodad, "Fila")
                    enviasilla({ id: nombres.idcolor, silla: this.classList[0] }).then(ouput => {
                        console.log(ouput)
                        usedispatch(filtrarlocali(ouput))
                        // console.log(ouput)
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
                let nombres = JSON.parse(sessionStorage.getItem("seleccionmapa"))
                succesElimAlert(this, { "id": nombres.idcolor, "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" })
            }
            return
        }
    })
    $(document).on('click', 'li.cargados', function () {
        if (!this.classList.contains('disponible')) {
            let nombres = JSON.parse(sessionStorage.getItem("seleccionmapa"))
            succesElimAlertli({ "localidad": nombres.localodad, "localidaEspacio": nombres, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "borrar" })
        }
        return
    })

    $(document).on('click', 'a.disponible', function () {
        if (!this.classList.contains('seleccionado')) {
            let nombres = JSON.parse(sessionStorage.getItem("seleccionmapa"))
            if (TotalSelecion() != 10) {
                this.classList.remove('disponible')
                this.classList.add('seleccionado')
                AgregarAsiento({
                    "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal,
                    "discapacidad": nombres.precio_discapacidad,
                    "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado"
                })
                usedispatch(addSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" }))
                successAlert(this.classList[0], nombres.localodad, "Mesa")
            } else {
                succesLimit()
            }
        }
        return
    })
    $(document).on("click", "a.seleccionado", function () {
        if (!this.classList.contains('disponible')) {
            let nombres = JSON.parse(sessionStorage.getItem("seleccionmapa"))

            succesElimAlert(this, { "id": nombres.idcolor, "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" })
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
            // console.log(this.classList[0], this.classList[1])
            Elimnamesa(this.classList[0], this.classList[1])
        }

    })

    function cerrar() {
        setMapashow(false)
        handleClosesop(true)
        hideAlert()
    }

    const hideAlert = () => {
        setAlert(null);
    };

    const sillasetado = (d) => {
        const user = getDatosUsuariosLocalStorag()
        if (d.cedula != undefined) {
            if (user != null && user.cedula == d.cedula) return "seleccionado"
            else
                return "reservado"
        }
        else
            return d.estado

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
        getVerTienda().filter((e) => e.id == mapath.precio.id).length > 0 ? setDetalle(getVerTienda().filter((e) => e.id == mapath.precio.id)) : setDetalle([])

        let selct = seleccion
        selct.length > 0 ?
            selct.map((e) => {
                $("div." + e.silla).removeClass("disponible").addClass("" + e.estado);
            })
            : '';
        mapath.pathmap.length > 0 ? mapath.pathmap.map((e, i) => {
            $("#mapas" + e.path).attr("fill", e.fill)
            $("#mapas" + e.path).removeAttr("class")
        }) : ''


    }, [showMapa])

    return (
        <>
            <Modal
                show={showMapa}
                size="lg"
                fullscreen={'md-down'}
                onHide={cerrar}
            >
                {alert}
                <Modal.Header>
                    <h5 className="modal-title text-center justify-content-center" style={{ fontWeight: "bold" }}> <span className="text-danger" > </span></h5>
                    <button className=" btn btn-primary" onClick={cerrar} >
                        <i className="bi bi-caret-left-fill">  </i>Regresar
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className='conatiner-fluid col-12'>
                        <div className="row ">
                            <div className="col-12 d-flex  flex-column justify-content-center text-center" style={{ fontWeight: "bold" }}>
                                <h5>{mapath.precio.localodad}</h5>
                                <h6 className="px-1">$ {mapath.precio.precio_normal} </h6>
                            </div>
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{ maxHeight: "200px" }}>
                                {showMapa ? <SVGView text={mapath.nombre} /> : ''}
                            </div>

                            {mapath.precio.typo != "correlativo" ?
                                <div className="col-12 d-flex  flex-wrap  ">
                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-success text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span id="disponible" style={{ fontSize: '0.7em' }}>    </span>
                                            </div>
                                        </div>
                                        <span>Disponibles.<span className="text-white">...</span></span>
                                    </div>

                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-warning text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span id="reservado" style={{ fontSize: '0.7em' }}>    </span>
                                            </div>
                                        </div>
                                        <span>Reservado.</span>
                                    </div>
                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-secondary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span id="seleccionado" style={{ fontSize: '0.7em' }}>    </span>
                                            </div>
                                        </div>
                                        <span>Seleccionado.</span>
                                    </div>
                                    <div className="d-flex flex-row p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-danger text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span id="ocupado" style={{ fontSize: '0.7em' }}>    </span>
                                            </div>
                                        </div>
                                        <span>Ocupados.</span>
                                    </div>

                                </div> : ''}
                            <div className="col-12 pt-1">
                                {mapath.precio.typo == "fila" ?
                                    <div style={{ maxHeight: '550px', minHeight: '250px', overflowY: 'auto', overflowX: 'auto', }}>
                                        {mapath.localidadespecica.length > 0 ?
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
                                                                            className={silla.silla + '  d-flex  ' + sillasetado(silla) + '  rounded-5 text-center  justify-content-center align-items-center '}
                                                                            style={{ height: '30px', width: '30px', marginLeft: '1px', marginRight: silla.marginRight }} >
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
                                {mapath.precio.typo === "mesa" ?
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
                                                        onClick={() => succesElimAlertli({ "localidad": elm.localidad, "localidaEspacio": elm.localidaEspacio, "fila": elm.silla.split("-")[0], "silla": elm.silla, "estado": "borrar" })}
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

                        <div className="col-2 d-none d-flex align-items-center justify-content-end" >
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

export default ModalLocalidamapViews