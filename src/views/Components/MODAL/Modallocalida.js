import React, { useState, useEffect } from "react"
import MesaiView from "views/Pages/Mesas/Plantillas/indice"
import MesasView from "views/Pages/Mesas"
import SVGView from "views/Pages/Svgviewa/svgoptio.js";
import { TiendaIten, getVerTienda,EliminarByStora } from "utils/CarritoLocalStorang";
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addSillas, deleteSillas, clearSillas } from "StoreRedux/Slice/sillasSlice"
import { EliminarSillas, AgregarAsiento } from "utils/CarritoLocalStorang"
import "./localidas.css"
const LocalidadmapViews = (props) => {
    const { precios, showMapa, handleClosesop, setMapashow } = props
    let nombre = JSON.parse(localStorage.getItem("seleccionmapa"))
    const usedispatch = useDispatch()
    const [detalle, setDetalle] = useState([])
    const seleccion = useSelector((state) => state.sillasSlice.sillasSelecionadas.filter((e) => e.localidad == nombre.localodad))
    let mapath = useSelector((state) => state.mapaLocalSlice)
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
            nombreConcierto: localStorage.getItem("consierto"),
        }
        TiendaIten(producto)
        setDetalle(getVerTienda().filter(e => e.id == mapath.precio.id))
    }
    function restaprecio() {
        let producto = {
            cantidad: -1,
            localidad: mapath.precio.localodad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.id,
            fila: 0,
            valor: mapath.precio.precio_normal,
            nombreConcierto: localStorage.getItem("consierto"),
        }
        TiendaIten(producto)
        setDetalle(getVerTienda().filter(e => e.id == mapath.precio.id))

    }
    function Eliminar(e) {
        EliminarByStora(e.localidad)
        setDetalle([])
    }


    $(document).on('click', 'div.disponible', function (e) {
        e.preventDefault();
        if (this.classList.contains("disponible")) {
            if (!this.classList.contains('seleccionado')) {
                this.classList.remove('disponible')
                this.classList.add('seleccionado')
                let nombres = JSON.parse(localStorage.getItem("seleccionmapa"))
                //console.log("nuevo",{nombres})
                AgregarAsiento({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": localStorage.getItem("consierto"), "valor": nombres.precio_normal, "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" })
                usedispatch(addSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": localStorage.getItem("consierto"), "valor": nombres.precio_normal, "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" }))
            }
            return
        }

    })
    $(document).on('click', 'div.seleccionado', function (e) {
        e.preventDefault();
        if (this.classList.contains("seleccionado")) {
            if (!this.classList.contains('disponible')) {
                this.classList.remove('seleccionado')
                this.classList.add('disponible')
                let nombres = JSON.parse(localStorage.getItem("seleccionmapa"))
                EliminarSillas({ "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" })
                usedispatch(deleteSillas({ "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" }))
            }
            return
        }
    })
    $(document).on('click', 'li.cargados', function () {
        if (!this.classList.contains('disponible')) {
            $("div." + this.classList[0]).removeClass("seleccionado").addClass("disponible")
            let nombres = JSON.parse(localStorage.getItem("seleccionmapa"))
            //console.log("nuevo", { nombres })
            EliminarSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" })
            usedispatch(deleteSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "borrar" }))
        }
    })
    $(document).on('click', 'a.disponible', function () {

        if (!this.classList.contains('seleccionado')) {
            this.classList.remove('disponible')
            this.classList.add('seleccionado')
            let nombres = JSON.parse(localStorage.getItem("seleccionmapa"))            
            AgregarAsiento({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": localStorage.getItem("consierto"), "valor": nombres.precio_normal, "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" })
            usedispatch(addSillas({ "localidad": nombres.localodad, "localidaEspacio": nombres, "nombreConcierto": localStorage.getItem("consierto"), "valor": nombres.precio_normal, "seleccionmapa": nombres.localodad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" }))
        }
        return
    })
    $(document).on("click", "a.seleccionado", function () {
        if (!this.classList.contains('disponible')) {
            this.classList.remove('seleccionado')
            this.classList.add('disponible')
            let nombres = JSON.parse(localStorage.getItem("seleccionmapa"))            
            EliminarSillas({ "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" })
            usedispatch(deleteSillas({ "localidad": nombres.localodad, "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "disponible" }))
        }
        return
    })


    function cerrar() {
        setMapashow(false)
        handleClosesop(true)
    }

    useEffect(() => {
        getVerTienda().filter((e) => e.id == mapath.precio.id).length>0 ? setDetalle(getVerTienda().filter((e) => e.id == mapath.precio.id)) : setDetalle([])

        let selct = seleccion
        selct.length > 0 ?
            selct.map((e) => {
                $("div." + e.silla).removeClass("disponible").addClass("seleccionado");
            })
            : ''
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
                fullscreen={'lg-down'}
                onHide={cerrar}
            >
                <Modal.Header>
                    <h5 className="modal-title text-center justify-content-center">localidad</h5>
                    <button type="button" className="close" onClick={cerrar} >
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className='conatiner-fluid col-12'>
                        <div className="row ">
                            <div className="col-12 d-flex  flex-column">
                                <h5>{mapath.precio.localodad}</h5>
                                <h6 className="px-1">$ {mapath.precio.precio_normal} </h6>
                            </div>
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{ maxHeight: "250px" }}>
                                {showMapa ? <SVGView text={mapath.nombre} /> : ''}
                            </div>

                            {mapath.precio.typo != "correlativo" ?
                                <div className="col-12 d-flex  flex-wrap  ">
                                    <div className="d-flex precios flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-success text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }}>    </span>
                                            </div>
                                        </div>
                                        <span>Disponibles.<span className="text-white">...</span></span>
                                    </div>

                                    <div className="d-flex precios flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-warning text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }}>    </span>
                                            </div>
                                        </div>
                                        <span>Reservado.</span>
                                    </div>
                                    <div className="d-flex precios flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-secondary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }}>    </span>
                                            </div>
                                        </div>
                                        <span>Seleccionado.</span>
                                    </div>
                                    <div className="d-flex precios flex-row p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-danger text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }}>    </span>
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
                                                                <div className="d-flex   mx-1 bg-primary text-white justify-content-center align-items-center rounded-5  " style={{ height: e.anchor, width: e.anchor }} >
                                                                    <div className="d-flex justify-content-center">
                                                                        <span style={{ fontSize: '0.7em' }}>    {e.fila} </span>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                            <div className=' d-flex px-1  align-items-stretch ' style={{ width: '100%' }}>
                                                                {e.asientos.map((silla, index) => {
                                                                    //let mira= seleccion
                                                                    // $( "."+elm.silla).removeClass( "disponible" ).addClass( "seleccionado" ); 
                                                                    let numero = index + 1
                                                                    return (
                                                                        <div key={"silla" + index} className={silla.silla + '  d-flex  ' + silla.estado + '  rounded-5 text-center  justify-content-center align-items-center '}
                                                                            style={{ height: silla.anchor, width: silla.anchor, marginLeft: silla.marginLeft, marginRight: silla.marginRight }} >
                                                                            <div className={'px-3 d-flex   text-white justify-content-center  '} >
                                                                                <div className="d-flex justify-content-center">
                                                                                    <span style={{ fontSize: '0.7em' }}>    {numero} </span>
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
                    <div className=" container-fluid  text-dark  border-top justify-content-between p-3" style={{ maxHeight: '188px', width: '100%' }} >
                        {mapath.precio.typo != "correlativo" ?
                            <div className="col-12 ">
                                {mapath.precio.typo == "mesa" ? <h5>Numero de mesas y sillas seleccionadas</h5> : <h5>Sillas y Filas Selecionadas</h5>}
                                <div className="d-flex flex-wrap" style={{ height: '150px', overflowY: 'auto', overflowX: 'hide', }}>
                                    {
                                        seleccion.length > 0 ?
                                            seleccion.map((elm, id) => {
                                                return (
                                                    <li key={id} className={elm.silla + '  d-flex cargados  rounded-5  bg-success justify-content-center align-items-center '}
                                                        style={{ height: '50px', width: '50px', margin: '1px' }} >
                                                        <div className={'d-flex   text-white justify-content-center  '} >
                                                            <div className="d-flex flex-column justify-content-center text-center p-2">
                                                                <span style={{ fontSize: '0.9em' }}>{elm.silla.replace("-", " ").split(" ")[0]}</span>
                                                                <span style={{ fontSize: '0.9em' }}>{elm.silla.replace("-", " ").split(" ")[1]}</span>
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

export default LocalidadmapViews