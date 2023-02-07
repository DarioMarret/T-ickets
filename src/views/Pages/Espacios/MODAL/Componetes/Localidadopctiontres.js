import React, { useEffect, useState } from "react"
import {  AptualizarLocalida } from "utils/Querypanel"
import { GuardarLocalidad } from "utils/LocalidadesQuery/index.js"
import { Modal, ProgressBar, OverlayTrigger, Tooltip, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
const TabtresView = (props) => {
    let usedispatch = useDispatch()
    const { datalocalidad, espacioname, SetDataloca } = props
    const [inputdisable, setdisable] = useState(false)
    const [localidaname, setLocalidad] = useState({
        nombre: '',
        description: '',
        cantidad: '',
        info: [],
        inicio: '',
        id: '',
    })
    function handelchangelocalidad(e) {
        setLocalidad({
            ...localidaname,
            [e.name]: e.value
        })
    }
    async function Actualiza() {
        if (localidaname.id != "" && localidaname.nombre != "" && localidaname.cantidad != "" && localidaname.inicio != "") {
            try {
                setdisable(true)
                const actualiza = await AptualizarLocalida({ "id": localidaname.id, "espacio": espacioname.nombre, "descripcion": localidaname.description, "nombre": localidaname.nombre, "mesas_array": JSON.stringify({ Typo: 'correlativo', datos: { cantidad: localidaname.cantidad, inicio: localidaname.inicio, info: localidaname.info } }) })
                if (actualiza.success) {
                    SetDataloca({
                        typo: '',
                        nombre: '',
                        description: '',
                        id: '',
                        array: ''
                    })
                    setLocalidad({
                        nombre: '',
                        description: '',
                        cantidad: 0,
                        inicio: 0,
                        id: '',
                    })
                    setdisable(false)
                    usedispatch(setToastes({ show: true, message: 'Localidad actualizada correctamente', color: 'bg-success', estado: 'Datos Actualizados' }))
                }
            } catch (error) {
                usedispatch(setToastes({ show: true, message: 'Hubo un error intente de nuevo', color: 'bg-danger', estado: 'Error' }))
                setdisable(false)
                console.log(error)
            }

        } else {
            usedispatch(setToastes({ show: true, message: 'Compete todos los campo', color: 'bg-warning', estado: 'Campos vacíos' }))

        }
    }
    async function Guardar() {
        console.log({ "espacio": espacioname.nombre, "id_espacio": espacioname.id, "descripcion": localidaname.description, "nombre": localidaname.nombre, "mesas_array": JSON.stringify({ Typo: 'correlativo', datos: { cantidad: localidaname.cantidad, inicio: localidaname.inicio, info: [] } }) })
        if (localidaname.nombre != "" && localidaname.description != "" && localidaname.cantidad != "" && localidaname.inicio != "") {
            try {
                setdisable(true)
                const guardar = await GuardarLocalidad({ "espacio": espacioname.nombre, "id_espacio": espacioname.id, "descripcion": localidaname.description, "nombre": localidaname.nombre, "mesas_array": JSON.stringify({ Typo: 'correlativo', datos: { cantidad: localidaname.cantidad, inicio: localidaname.inicio, info: [] } }) })
                if (guardar.success) {
                    SetDataloca({
                        typo: '',
                        nombre: '',
                        description: '',
                        id: '',
                        array: ''
                    })
                    setLocalidad({
                        nombre: '',
                        description: '',
                        id: '',
                        cantidad: '',
                        inicio: ''
                    })
                    setdisable(false)
                    usedispatch(setToastes({ show: true, message: 'Localidad creada correctamente', color: 'bg-success', estado: 'Datos guadados' }))
                }

            } catch (error) {
                setdisable(false)
                usedispatch(setToastes({ show: true, message: 'Hubo un error intente de nuevoa mas tarde', color: 'bg-success', estado: 'Datos guadados' }))
                console.log(error)
            }
        } else {
            usedispatch(setToastes({ show: true, message: 'complete todos los campos requeridos', color: 'bg-warning', estado: 'Advertencia' }))
        }
    }
    useEffect(() => {
        if (datalocalidad.typo == "correlativo") {
            setLocalidad({
                nombre: datalocalidad.nombre,
                description: datalocalidad.description,
                id: datalocalidad.id,
                cantidad: datalocalidad.array.cantidad ? datalocalidad.array.cantidad : '',
                inicio: datalocalidad.array.inicio ? datalocalidad.array.inicio : ''
            })
        }
    }, [datalocalidad])
    return (<>
        <div className="d-flex flex-column">
            <div className='row col-12 pt-2'>
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="form-label"><b>Nombre</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                        </div>
                                        <input type="text" className="form-control" id="nombre" name="nombre"
                                            value={localidaname.nombre}
                                            onChange={(e) => handelchangelocalidad(e.target)}
                                            placeholder="Ingrese el nombre del espacio" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="form-label"><b>Descripción</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-quote-right"></i></span>
                                        </div>
                                        <input type="text" className="form-control" id="descripcion" name="description"
                                            value={localidaname.description}
                                            onChange={(e) => handelchangelocalidad(e.target)}
                                            placeholder="Ingresa una descripción de la seccion" />

                                    </div>
                                </div>
                            </div>
                            <div className="d-flex text-end row">
                                {datalocalidad.typo == "correlativo" ?
                                    <button className="btn btn-primary col-12" onClick={Actualiza}>Actualizar</button> : ''}
                                {inputdisable ?
                                    <button className="btn btn-primary" disabled={true} >
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Guardando</button>
                                    : ''

                                }
                                {!inputdisable ? <button className="btn btn-success col-12" onClick={Guardar}>Guardar</button> : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" col-sm-7 row">
                    <div className="col-sm-6">
                        <label className="form-label"><b>Cantidad de asientos</b></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                            </div>
                            <input type="number" className="form-control"
                                name="cantidad"
                                value={localidaname.cantidad}
                                onChange={(e) => handelchangelocalidad(e.target)}
                                id="cantidad" placeholder="100" />
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <label className="form-label"><b>Primer número</b></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                            </div>
                            <input type="number" className="form-control"
                                name="inicio"
                                value={localidaname.inicio}
                                onChange={(e) => handelchangelocalidad(e.target)}
                                id="inicio" placeholder="100" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={"container-fluid col-sm-12 "} >

                <div className=' d-flex flex-wrap '>
                    <div className='col-3'>
                        <h3>
                            {localidaname.nombre}
                        </h3>
                    </div>
                    <div className='col-7'>
                        <ProgressBar
                            style={{ height: '40px' }}
                        >
                            <ProgressBar variant="danger" now={0} key={1} />
                            <ProgressBar variant="success" label={localidaname.cantidad} now={parseInt(localidaname.cantidad)} key={2} />
                        </ProgressBar>
                    </div>
                    {/*<div className='col-2'>
               <button className='btn btn-primary' ><i className='fa fa-edit'></i> </button>
               </div>*/}
                </div>
                {/* <div className='d-flex flex-wrap'>
               <div className='col-3'>
                   <h3>
                       Vip 
                   </h3>
               </div>
               <div className='col-7'>
               <ProgressBar 
               style={{height:'40px'}}
               >                  
                   <ProgressBar variant="danger"  now={50} key={1} />
                   <ProgressBar  variant="success" label={"500 "} now={450} key={2} />                  
               </ProgressBar>
               </div>
               <div className='col-2'>
               <button className='btn btn-primary' ><i className='fa fa-edit'></i> </button>
               </div>
             </div>*/}



            </div>

        </div>
    </>)

}
export default TabtresView