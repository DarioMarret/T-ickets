import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { Metodos } from 'utils/constantes'
import SvgselectView from "views/Pages/Svgviewa/svgseleccion.js"
import { listarpreciolocalidad } from "utils/Querypanel"
import { TiendaIten, GetValores, getVerTienda, EliminarByStora, EliminarSillaLocal } from "utils/CarritoLocalStorang"
import { useDispatch, useSelector } from "react-redux"
import { cargarmapa, settypo, filtrarlocali } from "StoreRedux/Slice/mapaLocalSlice"
import { clearSillas,cargarsilla } from "StoreRedux/Slice/sillasSlice"
import mapa from '../../../assets/img/mapa.png'
const ModalCarritoView = (prop) => {
    const { showshop, handleClosesop, handleContinuar, setMapashow, precios, setListaPrecio, setListarCarritoDetalle, intervalo,detener } = prop
    let usedispatch = useDispatch()
    let sleccionlocalidad = useSelector((state) => state.mapaLocalSlice)
    const [detalle, setDetalle] = useState([])
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
        localStorage.setItem(Metodos, value)
        setCheck(false)
    }
    function Eliminar(e) {
        usedispatch(clearSillas(e))
        EliminarByStora(e.localidad)
        EliminarSillaLocal(e.localidad)
        setDetalle(getVerTienda())
    }
    function abrirlocalidad() {
        setMapashow(true)
        detener(false)
    }
    
    useEffect(() => {
        setDetalle(getVerTienda())
        //console.log(getVerTienda())
        setListarCarritoDetalle(getVerTienda())
        ListaPrecioset(GetValores())
        let asientos = JSON.parse( localStorage.getItem("asientosList"))
        //console.log(asientos)
       asientos!=null? usedispatch(cargarsilla(asientos)) : ''
        // console.log(precios.pathmapa)
       
        console.log("veces")
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
        localStorage.seleccionmapa = JSON.stringify(e)
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
            localStorage.seleccionmapa = JSON.stringify(consulta[0])

            abrirlocalidad()
        })
    })



    return (
        <>
            {/* <div className="bg-danger" style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            zIndex: 10000
        }}>
        </div>*/}
            <Modal
                show={showshop}
                size="lg"
                style={{ height: "100%", width: "100%" }}
                fullscreen={true}
                //onHide={}
                >
                   
                <Modal.Header >
                    <div className="d-flex justify-content-between  align-items-center " >
                        <div>
                            <h5 className="modal-title text-center justify-content-center">Boleteria -</h5>
                        </div>
                    
                    <div>
                        <h5 className="modal-title text-center justify-content-center">  Tiempo restante de compra <span className="text-danger" >{intervalo}</span> </h5>
                    </div>
                    
                    </div>
                    
                    <button type="button" className="close" onClick={() => handleClosesop()} >
                        ×
                    </button>
                </Modal.Header>

                <Modal.Body  >
                    <div className="d-flex flex-wrap-reverse" >
                        <div className="col-12 col-lg-6" >

                            <div className="  ">
                                <div className="detalles-resumen  "
                                >
                                    <div className="bg-secondary p-2 d-none d-sm-block text-black flex-table row" role="rowgroup">

                                        <div className="row text-center header" role="rowgroup">
                                            <div className="flex-row text-center col-2 col-md-3" role="columnheader">Localidad</div>
                                            {/*<div className=" flex-row  text-center col-2 col-md-2" role="columnheader">Asiento</div>*/}
                                            <div className="flex-row  text-center col-2 col-md-2" role="columnheader">Total</div>
                                            <div className="flex-row  text-center col-2 col-md-2" role="columnheader">Cantidad</div>
                                            <div className="flex-row  text-center col-2 col-md-3" role="columnheader">Acciones</div>
                                        </div>

                                    </div>
                                    <div className="bg-secondary p-1 text-black flex-table row d-block d-sm-none " >

                                        <h4>AGRAGADOS</h4>

                                    </div>
                                    <div className=" px-2  list-group-flush" style={{ maxHeight: '500px', overflowY: 'auto', overflowX: 'hidden' }}>
                                        {
                                            detalle.length > 0 ?
                                                detalle.map((e, i) => {
                                                    return (
                                                        <div className="d-flex flex-table row list-group-item" role="rowgroup" key={"items" + i}>
                                                            <div className="flex-row first  d-none d-sm-block col-3 col-md-3" role="cell">{e.localidad}</div>
                                                            {/* <div className="flex-row d-none d-sm-block  text-center col-2 col-md-2">{e.fila}</div>*/}
                                                            <div className="flex-row d-none d-sm-block  text-center col-2 col-md-2">${e.valor * e.cantidad}</div>
                                                            <div className="flex-row d-none d-sm-block text-center  col-2 col-md-2">{e.cantidad}</div>
                                                            <div className="d-flex d-none d-sm-block   text-center justify-content-end align-items-center col-3 col-md-3">
                                                                <button className="btn btn-danger" onClick={() => Eliminar(e)} >
                                                                    <i className="fa fa-trash"></i>
                                                                    </button>
                                                                <button className="btn btn-primary mx-1" onClick={() => Abririlocalfirt(e.localidaEspacio)} > 
                                                                <i className="fa fa-eye"></i>
                                                                 </button>
                                                            </div>
                                                            <div className=" col-6 d-block d-sm-none col-6 d-flex flex-row ">
                                                                <div className="d-flex flex-column ">
                                                                    <h5 className="card-title">{e.localidad}</h5>
                                                                    <p className="card-subtitle">fila {e.fila}</p>
                                                                    <p className="card-subtitle">Valor ${e.valor * e.cantidad}</p>
                                                                    <p className="card-subtitle">Cantidad {e.cantidad}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-6 d-block d-sm-none text-center d-flex  justify-content-end align-items-center"

                                                            >
                                                                <button className="btn btn-danger" onClick={() => Eliminar(e)} >
                                                                     <i className="fa fa-trash"></i>
                                                                </button>
                                                                <button className="btn btn-primary mx-1" onClick={() => Abririlocalfirt(e.localidaEspacio)} >  <i className="fa fa-eye"></i></button>
                                                            </div>

                                                            {/*<hr className=" border bg-dark" style={{height:'1px',marginLeft:0,marginRight:0 }} ></hr>*/}

                                                        </div>
                                                    )
                                                })
                                                : ''

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 ">
                            <div className="d-flex justify-content-center"  style={{height:"200px"}}>

                                {showshop ?
                                    <SvgselectView text={precios.mapa} />
                                    : ''}
                            </div>
                            <div className="d-flex col-12 flex-wrap justify-content-center p-3 ">
                                {precios.precios.length > 0 ?
                                    precios.precios.map((elm, i) => {
                                        return (
                                            <div className="d-flex flex-row mx-3 mb-1 precios align-items-center" onClick={() => Abririlocalfirt(elm)} key={i}  >
                                                <div id={"precios" + elm.id} className="mx-1  rounded-4" style={{ height: 30, width: 30, backgroundColor: elm.color }}></div>
                                                <div className="row" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '150px', maxWidth: '150px' }} >
                                                    <span className="pb-0" >{elm.localodad}</span>
                                                    <span className="pt-0" >${elm.precio_normal}</span>
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
                                    name="Efectivo" id="Efectivo"
                                    checked={checked.Efectivo == "Efectivo" ? true : false}
                                    onChange={(e) => handelMetodopago(e.target, "Efectivo")}
                                />
                                <label className="form-check-label" >
                                    Efectivo
                                </label>
                            </div>
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
                        </div>

                    </div>
                    <div className="d-flex flex-column" >
                        <h4
                            style={{
                                fontSize: '2rem',
                            }}
                        >SUBTOTAL:</h4>
                        <h4
                            style={{
                                fontSize: '2rem',
                                fontWeight: 'bold',
                            }}
                            className="px-1 total-detalle"> {listaPrecio.subtotal ? "$" + listaPrecio.subtotal : null}</h4>

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