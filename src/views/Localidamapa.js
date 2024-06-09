import { useParams, Route, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react"
import MesaiView from "views/Pages/Mesas/Plantillas/indice"
import MesasView from "views/Pages/Mesas"
import { TiendaIten, getVerTienda, EliminarByStora, EliminarsilladeMesa } from "utils/CarritoLocalStorang";
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { filtrarlocali, settypo } from "StoreRedux/Slice/mapaLocalSlice";
import { addSillas, deleteSillas, clearSillas, deleteMesa } from "StoreRedux/Slice/sillasSlice"
import { EliminarSillas, AgregarAsiento, VerSillaslist, TotalSelecion } from "utils/CarritoLocalStorang"
import SweetAlert from "react-bootstrap-sweetalert";
//import "./localidas.css"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { seleccionmapa } from "utils/constantes";
import { enviasilla } from "utils/Querypanelsigui";
import { quitarsilla } from "utils/Querypanelsigui";
import { correlativosadd } from "utils/Querypanelsigui";
import moment from "moment";
import { Verificalocalidad } from "utils/CarritoLocalStorang";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { localidaandespacio } from "utils/Querypanel";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { updateboletos } from "StoreRedux/Slice/SuscritorSlice";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { bancos } from "utils/Imgenesutils";
import { Triangle } from "react-loader-spinner";
let { atencion } = bancos
import { setSpinersli } from "StoreRedux/Slice/SuscritorSlice";
import { cargarMapa } from "utils/MapaQuery";
import SVGView from "./Pages/Svgviewa/svgoptio";
export default function LocalidadMApView() {
    let { id, parms } = useParams()
    var mapath = useSelector((state) => state.mapaLocalSlice)
    const usedispatch = useDispatch()
    let [datos, setDatos] = useState("")
    let [colro, colroDatos] = useState({
        color: "",
        id: ""
    })
    const viewref = useRef()
    const sillasetado = (d) => {
        return d.estado.toLowerCase()
    }
    function Cargarlisat() {
        localidaandespacio(id, parms).then(ouput => {

            let nombre = ouput.data[0].espacio

            if (ouput.data.find(e => e.typo == "fila")) {

                usedispatch(settypo({ nombre: "", typo: "fila" }))
                let nuevoObjeto = []
                ouput.data.forEach(x => {
                    if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                        nuevoObjeto.push({ fila: x.fila, asientos: [{ silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula }] })
                    }
                    else {
                        let indixe = nuevoObjeto.findIndex(e => e.fila == x.fila)
                        nuevoObjeto[indixe].asientos.push({
                            silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula
                        })
                    }
                })
                usedispatch(filtrarlocali(nuevoObjeto))
                console.log(nuevoObjeto)
            } else if (ouput.data.find(e => e.typo == "mesa")) {
                cargarMapa().then(o => {
                    setDatos(o.data.filter(e => e.nombre_espacio == nombre)[0].nombre_mapa)
                    console.log(o.data.filter(e => e.nombre_espacio == nombre)[0].nombre_mapa)
                    //svginit()

                    usedispatch(settypo({ nombre: "", typo: "mesa" }))
                    let nuevoObjeto = []
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
                            silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula
                        })
                    })
                        : ''

                    usedispatch(filtrarlocali(nuevoObjeto))
                    console.log(JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].fill)
                    colroDatos({ "id": JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].path, color: "" + JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].fill + "" })
                    /* setTimeout(function () {
                         renderizarsvg(o, o)
                     }, 5)*/

                    //viewref.current. 

                    //}, 100)


                }).catch(er => {
                    console.log(er)
                })


            }
            else if (ouput.data.some(e => e.typo == "correlativo")) {
                usedispatch(settypo({ nombre: "", typo: "correlativo" }))
                usedispatch(filtrarlocali(ouput.data.filter(e => e.estado == "disponible")))

            }
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        Cargarlisat()
    }, [])

    function renderizarsvg(o, nombre) {
        //const va = document.getElementById("#mapas" + JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].path)
        //let svg = va.getElementsByTagName('svg')[0];       
        //  console.log(va)
        // va.svg.style.fill = JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].fill;
        datos == "" ? "" : $("#mapas" + JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].path).attr("fill", JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].fill)
        datos == "" ? "" : $("#mapas" + JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].path).removeAttr("class")
        //console.log(e.path)
        datos == "" ? "" : $("#mapas" + JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].path).attr("fill", JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].fill)
        datos == "" ? "" : $("#mapas" + JSON.parse(o.data.filter(e => e.nombre_espacio == nombre)[0].pathmap).filter(e => e.id == parms)[0].path).removeAttr("class")

    }
    function svginit() {
        return <SVGView text={datos} fu={colro.id} color={colro.color} />
    }
    return (
        <div style={{
            height: "100%"
        }}>
            <div className="d-flex flex-column justify-content-center align-items-center ">
                {datos == "" ? "" : <div className="h-25 d-none"> 
                <SVGView text={datos} fu={colro.id} colo={colro.color} />
                </div>}

                {mapath.typo == "fila" ?
                    <div className="section m-auto" >
                        {mapath.localidadespecica.length > 0 ?
                            mapath.localidadespecica.map((e, i) => {
                                {
                                    return (
                                        <div className='d-flex  px-3 p-1 justify-content-center ' key={"lista" + i}>
                                            <span className="d-inline-block " disabled >
                                                <div className="d-flex   mx-1 bg-primary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                                    <div className="d-flex justify-content-center">
                                                        <span style={{ fontSize: '0.7em' }}>    {e.fila} </span>
                                                    </div>
                                                </div>
                                            </span>
                                            <div className=' d-flex px-1 justify-content-lg-center  align-items-stretch ' style={{ width: '100%' }}>
                                                {e.asientos.map((silla, index) => {
                                                    let numero = index + 1
                                                    return (
                                                        <div key={"silla" + index} id={silla.idsilla}
                                                            className={silla.silla + '  d-flex  ' + sillasetado(silla) + '  rounded-5 sillasfila text-center  justify-content-center align-items-center '}
                                                            style={{ height: '30px', width: '30px', marginLeft: '1px', }}
                                                            onClick={() => Agregarsilla(silla)}
                                                        >
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
                {mapath.typo === "mesa" ?
                    <div className=" m-auto" >
                        <div className='d-flex  px-3 align-items-center' >
                            <div className='d-flex align-itmes-center pb-2' style={{ width: '80px' }}>

                            </div>
                            <div className='d-flex align-itmes-center pb-2' >

                            </div>
                        </div>
                        {
                            mapath.localidadespecica.length > 0 ?
                                mapath.localidadespecica.map((e, index) => {
                                    return (
                                        <div className='d-flex  PX-1 align-items-center' key={index}>

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
            </div>
        </div>
    )
}