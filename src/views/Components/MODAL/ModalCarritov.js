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

const ModalCarritoView = (prop) => {
    const { showshop, handleClosesop, handleContinuar, setMapashow, precios, setListaPrecio, setListarCarritoDetalle, intervalo, detener } = prop
    let usedispatch = useDispatch()
    let sleccionlocalidad = useSelector((state) => state.mapaLocalSlice)
    let seleciondesillas = useSelector((state) => state.sillasSlice.sillasSelecionadas)
    const [detalle, setDetalle] = useState([])
    const [alert, setAlert] = useState(null)
    const [timer, setTimer] = useState(false)
    const [checked, setChecked] = useState({
        Efectivo: "",
        Tarjeta: "",
        Deposito: "",
    })

    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0
    })
    const [check, setCheck] = useState(true)
    function handelMetodopago(target, value) {
        setChecked({
            [target.name]: value,
        })
        sessionStorage.setItem(Metodos, value)
        setCheck(false)
    }
    function Eliminar(e) {
        let array = e.localidaEspacio["typo"] != "correlativo" ? listaEliminasillas(e.localidaEspacio
        ["idcolor"]) : ''
        console.log(array)
        e.localidaEspacio["typo"] != "correlativo" ? quitarsilla({ "array": [...array] }).then(ouput => {
            usedispatch(clearSillas(e))
            EliminarSillaLocal(e.localidad)
            console.log(e.localidaEspacio["idcolor"])
            $("div." + e.localidaEspacio["idcolor"] + "silla").removeClass("seleccionado").addClass("disponible");
            // var elems = document.querySelector("div." + e.localidaEspacio["idcolor"]);
            // elems !== null ? elems.classList.remove("seleccionado") : ''
            //  elems !== null ? elems.classList.add("disponible") : ''

            console.log(ouput)
        }
        ).catch(err => console.log(err)) : correlativodelete(
            {
                "id": e.id,
                "protocol": e.protocol,
                "cantidad": e.cantidad
            }
        ).then(oupt => {
            console.log(oupt)
        }).catch(err => {
            console.log(err)
        })
        // listaEliminasillas
        // listaEliminasillas(e.id)
        e.localidaEspacio["typo"] == "correlativo" ? usedispatch(clearSillas(e)) : ''
        EliminarByStora(e.localidad)
        e.localidaEspacio["typo"] == "correlativo" ? EliminarSillaLocal(e.localidad) : ''
        setDetalle(getVerTienda())
        ListaPrecioset(GetValores())
        hideAlert()
    }
    function abrirlocalidad() {
        setMapashow(true)
        detener(false)
    }



    /* window.addEventListener("beforeunload", (evento) => {
         let carriito = JSON.parse(sessionStorage.getItem(CarritoTicket))
         if (getVerTienda().length > 0) {
             evento.preventDefault();
             evento.returnValue = "";
             return "";
         }
        });*/

    useEffect(() => {
        setDetalle(getVerTienda())
        //console.log(getVerTienda())
        setListarCarritoDetalle(getVerTienda())
        let metodoPago = GetMetodo()
        metodoPago != null ? setChecked({
            Efectivo: metodoPago == "Efectivo" ? "Efectivo" : "",
            Tarjeta: metodoPago == "Tarjeta" ? "Tarjeta" : "",
            Deposito: metodoPago == "Deposito" ? "Deposito" : "",
        }) : handelMetodopago({ name: 'Tarjeta' }, "Tarjeta"), setCheck(false)

        ListaPrecioset(GetValores())
        let asientos = JSON.parse(sessionStorage.getItem("asientosList"))
        asientos != null ? usedispatch(cargarsilla(asientos)) : ''
        precios.pathmapa.length > 0 ? precios.pathmapa.map((e, i) => {
            $("#" + e.path).attr("class", e.id + "  disponible " + e.tipo)
            $("#" + e.path).attr("fill", e.fill)
        }) : ''

    }, [showshop])

    function Abririlocalfirt(e) {
        let color = precios.pathmapa.filter((E) => E.id == e.idcolor)
        let filtro = sleccionlocalidad.localidades.filter((G) => G.nombre == e.localodad)
        let espacio = JSON.parse(filtro[0].mesas_array)
        usedispatch(cargarmapa(color))
        usedispatch(settypo({ nombre: precios.mapa, typo: e.tipo, precio: { ...e } }))
        usedispatch(filtrarlocali(espacio.datos))
        sessionStorage.seleccionmapa = JSON.stringify(e)
        abrirlocalidad()
    }
    const path = document.querySelectorAll('path.disponible,polygon.disponible,rect.disponible')
    path.forEach(E => {
        E.addEventListener("click", function () {
            let consulta = precios.precios.filter((F) => F.idcolor == this.classList[0])
            let color = precios.pathmapa.filter((E) => E.id == consulta[0].idcolor)
            let filtro = sleccionlocalidad.localidades.filter((G) => G.nombre == consulta[0].localodad)
            let espacio = JSON.parse(filtro[0].mesas_array)
            usedispatch(cargarmapa(color))
            usedispatch(settypo({ nombre: precios.mapa, typo: consulta[0].tipo, precio: { ...consulta[0] } }))
            usedispatch(filtrarlocali(espacio.datos))
            sessionStorage.seleccionmapa = JSON.stringify(consulta[0])
            abrirlocalidad()
        })
    })
    function cerrar() {
        handleClosesop()
        hideAlert()
    }
    const successAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Estas Seguro de cerrar?"
                onConfirm={() => cerrar()}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showCancel

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                Se Borraran Todas las Localidades Seleccionadas
            </SweetAlert>
        );
    };
    const EliminaLocalidad = (e) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Estas Seguro?"
                onConfirm={() => Eliminar(e)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                Se Borraran Todas las selecciones de esta Localidad
            </SweetAlert>
        );
    }
    const hideAlert = () => {
        setAlert(null);
    };
    return (
        <>
            {alert}
            <Modal
                show={showshop}
                size="lg"
                fullscreen={'md-down'}
                className="modalCarrito"
            // fullscreen={true}
            >
                <Modal.Header >
                    <div className="d-flex col-6 justify-content-between  align-items-center " >
                        <div>
                            <h5 className="modal-title text-center justify-content-center"
                                style={{ fontFamily: 'fantasy' }}
                            >Boletería </h5>
                        </div>
                    </div>
                    <div className=" float-end ">
                        <div>
                            <h5 className="modal-title text-center justify-content-center"
                                style={{ fontFamily: 'fantasy' }}
                            >  Tiempo restante para la compra <span className="text-danger"
                                style={{
                                    fontFamily: 'fantasy',
                                    fontSize: '1.2em'
                                }}
                            >{intervalo}</span> </h5>
                        </div>
                    </div>
                    <button type="button" className="close" onClick={detalle.length > 0 ? successAlert : cerrar} >
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body  >
                    <div className="d-flex flex-wrap-reverse p-0 container-fluid"  >
                        <div className="col-12 pt-0  col-lg-6" >
                            <div className="  ">
                                <div className="detalles-resumen"
                                >
                                    <div className="bg-secondary d-none p-2 d-sm-block text-black flex-table row" role="rowgroup">
                                        <div className="row text-center p-0 header" role="rowgroup">
                                            <div className="flex-row text-center col-sm" role="columnheader">Localidad</div>
                                            {/*<div className=" flex-row  text-center col-2 col-md-2" role="columnheader">Asiento</div>*/}
                                            <div className="flex-row  text-center col-2" role="columnheader">Total</div>
                                            <div className="flex-row  text-center col-2" role="columnheader">Cantidad</div>
                                            <div className="flex-row  col-sm " role="columnheader">Acciones</div>
                                        </div>

                                    </div>
                                    <div className="bg-secondary p-1 text-black flex-table row d-block d-sm-none " >

                                        <h4>AGREGADOS</h4>

                                    </div>
                                    <div className="px-2  list-group-flush" style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
                                        {detalle.length > 0 ?
                                            detalle.map((e, i) => {
                                                return (
                                                    <div className="d-flex flex-table row list-group-item" role="rowgroup" key={"items" + i}>

                                                        <div className="flex-row first  d-none d-sm-block col-sm p-0"
                                                            style={{
                                                                fontSize: "0.9em",
                                                            }} >{e.localidad}</div>
                                                        <div className="d-none d-sm-block  flex-row text-center col-2">${GetEstadousu().discapacidad === "No" ? e.valor * e.cantidad : e.discapacidad * e.cantidad}</div>
                                                        <div className="d-none d-sm-block flex-row  text-center  col-2">{e.cantidad}</div>
                                                        <div className="d-none d-sm-block d-flex d-sm-flex flex-row    text-center align-items-center col-sm">
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
                                        <div className="d-flex flex-table row list-group-item" role="rowgroup"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 border rounded-5   px-0"
                            style={{ alignItems: 'stretch', lineHeight: '1', }}>
                            <div className="d-flex flex-column   justify-content-center  text-center p-0 d-sm-flex pb-0 " style={{ height: "400px" }}>
                                <h5 style={{ fontSize: '', fontFamily: 'fantasy' }} >
                                    SELECCIONE LA LOCALIDAD EN EL MAPA O NOMBRE
                                </h5>
                                <div className="">
                                    {showshop ?
                                        <SvgselectView

                                            text={precios.mapa} />
                                        : ''}
                                </div>
                            </div>
                            <div className=" container-fluid d-flex pt-1   col-12 flex-wrap pb-2 justify-content-between align-items-center px-0 p-0">
                                {precios.precios.length > 0 ?
                                    precios.precios.map((elm, i) => {
                                        return (
                                            <div className="d-flex flex-row mx-3 mb-1 precios align-items-center" onClick={() => Abririlocalfirt(elm)} key={i}  >
                                                <div id={"precios" + elm.id} className="mx-1  p-2 rounded-4" style={{ height: 10, width: 10, backgroundColor: elm.color }}></div>
                                                <div className="d-flex flex-row" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '130px', maxWidth: '130px' }} >
                                                    <span className="" style={{ fontFamily: '', fontSize: '0.8em' }} >{elm.localodad} </span>
                                                    <span className="" style={{ fontFamily: '', fontSize: '0.8em' }} >${elm.precio_normal} </span>
                                                </div>
                                            </div>
                                        )
                                    }) : ''
                                }
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="d-flex  p-3 border-top  justify-content-between align-items-cente">
                    <div className="d-flex flex-column">
                        <div className="px-5">
                            Método de pago
                            <div className="form-check">
                                <input className="v-check form-check-input" type="radio"
                                    checked={checked.Tarjeta == "Tarjeta" ? true : false}
                                    onChange={(e) => handelMetodopago(e.target, "Tarjeta")}
                                    name="Tarjeta" id="Tarjeta" />
                                <label className="form-check-label" >
                                    Tarjeta
                                </label>
                            </div>
                            <div className="form-check ">
                                <input className="form-check-input" type="radio"
                                    checked={checked.Deposito == "Deposito" ? true : false}
                                    onChange={(e) => handelMetodopago(e.target, "Deposito")}
                                    name="Deposito" id="Deposito" />
                                <label className="form-check-label" >
                                    Deposito-transferencia
                                </label>
                            </div>
                            <div className=" d-none form-check">
                                <input className="v-check form-check-input" type="radio"
                                    name="Efectivo" id="Efectivo"
                                    checked={checked.Efectivo == "Efectivo" ? true : false}
                                    onChange={(e) => handelMetodopago(e.target, "Efectivo")}
                                />
                                <label className="form-check-label">
                                    Efectivo
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className="d-flex flex-row  align-items-center" >
                        <h4
                            style={{
                                fontSize: '1.8rem',

                            }}
                        >SUBTOTAL:</h4>
                        <h4
                            style={{
                                fontSize: '1.7rem',
                                fontWeight: 'bold',
                            }}
                            className="px-1 text-danger total-detalle"> {listaPrecio.subtotal ? "$" + listaPrecio.subtotal : null}</h4>

                    </div>
                    <div className="">
                        {detalle.length > 0 ?
                            <button className="btn btn-primary" disabled={check} onClick={handleContinuar}>continuar</button> :
                            <button className="btn btn-primary" disabled={true} >continuar</button>
                        }

                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalCarritoView