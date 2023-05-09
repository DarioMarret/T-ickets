import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Crearprecios } from "utils/EventosQuery";

export default function Modalpreciolocalidad() {
    let modal = useSelector(state => state.SuscritorSlice.modal)
    let usedispatch = useDispatch()
    let [disable, setDisable] = useState(false)
    let [precios, setPrecios] = useState(
        {
            
            "nombre_localidad": "",
            "precio_normal": 0,
            "precio_discapacidad": 0,
            "precio_tarjeta": 0,
            "precio_descuento": 0,
            "habilitar_cortesia": 0,
            "comision_boleto": 0,
            "descuento": 0,
            "habilitar": false
        }
    )
    function Handelchange(e) {
        setPrecios(
            {
                ...precios,
                [e.name]: e.value
            }
        )
    }
    function Handelcheck(e) {
        setPrecios({
            ...precios,
            [e.name]: e.checked
        })
    }
    function handleSubmit(e) {
       
        let {nombre_localidad,precio_normal,precio_discapacidad,precio_tarjeta,precio_descuento,habilitar_cortesia,comision_boleto,descuento} = precios
        if ([nombre_localidad, precio_normal, precio_discapacidad, precio_tarjeta, precio_descuento, habilitar_cortesia, comision_boleto, descuento].some(e => e=="")) {
            console.log(nombre_localidad, precio_normal, precio_discapacidad, precio_tarjeta, precio_descuento, habilitar_cortesia, comision_boleto, descuento)
            return
        }
        console.log("Completo")
        setDisable(true)
        Crearprecios({ ...precios, "id_evento": modal.estado.id, }).then(prec => {
            if(prec.success){
            console.log(prec)
            console.log({...precios, "id_evento": modal.estado.id})
            setDisable(false)
                setPrecios({

                    "nombre_localidad": "",
                    "precio_normal": 0,
                    "precio_discapacidad": 0,
                    "precio_tarjeta": 0,
                    "precio_descuento": 0,
                    "habilitar_cortesia": false,
                    "comision_boleto": 0,
                    "descuento": 0,
                    "habilitar": false
                })
                usedispatch(setToastes({
                    show: true,
                    message: 'Localidad Creada',
                    color: 'bg-success', estado: ''
                }))
        }
        }).catch(e => {
            setDisable(false)
            console.log("error de creacion precios", e)
        })
    }
    useEffect(()=>{
      // Listar_preciolocalidad(0).then(ouput)
    },[])

    return (
        <Modal
            show={(modal.nombre == "Modalpreciolocalidad")}
            size="lg"
        >
            <Modal.Body>
                <button className="close" >x</button>
            </Modal.Body>
            <Modal.Body>
                <div className="row">

                    <h3>Precios de Localidades </h3>
                    <div className="d-flex flex-wrap">
                        <div className="input-group mb-3 col-6">
                            <div className="input-group-prepend">

                            </div>

                        </div>


                    </div>
                    <div className="col-12 col-md-6">
                        <label >Nombre</label>
                        <div className="input-group mb-3">

                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="nombre_localidad" name="nombre_localidad"
                                onChange={(e) => Handelchange(e.target)}
                                value={precios.nombre_localidad}
                                placeholder="Nombre del Evento" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                        <label >PRECIO NORMAL</label>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="precio_normal" name="precio_normal"
                                onChange={(e) => Handelchange(e.target)}
                                value={precios.precio_normal}

                                placeholder="Precio Normal" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                        <label >PRECIO DISCAPACIDAD</label>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="precio_discapacidad" name="precio_discapacidad"
                                onChange={(e) => Handelchange(e.target)}
                                value={precios.precio_discapacidad}

                                placeholder="Precio Discapacidad" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                        <label >PRECIO TARJETA</label>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="precio_tarjeta" name="precio_tarjeta"
                                onChange={(e) => Handelchange(e.target)}
                                value={precios.precio_tarjeta}

                                placeholder="Precio Tarjeta" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                        <label >PRECIO DESCUENTO</label>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="precio_descuento" name="precio_descuento"
                                onChange={(e) => Handelchange(e.target)}
                                value={precios.precio_descuento}

                                placeholder="Precio Descuento" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                        <label >COMISION DEL BOLETO </label>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="comision_boleto" name="comision_boleto"

                                onChange={(e) => Handelchange(e.target)}

                                value={precios.comision_boleto}
                                placeholder="Comisión del Boleto" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                        <label >DESCUENTO  </label>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="descuento" name="descuento"
                                onChange={(e) => Handelchange(e.target)}

                                value={precios.descuento}

                                placeholder="Descuento" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">

                        <label ># Cortesia  </label>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa dollar"></i></span>
                            </div>
                            <input className="form-control" id="habilitar_cortesia" name="habilitar_cortesia"
                                onChange={(e) => Handelchange(e.target)}
                                value={precios.habilitar_cortesia}
                                placeholder="# de Cortesia" />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap mb-2">
                        
                        <div className=" d-flex  justify-content-center px-2">

                            <Form.Check className="py-1 pr-1"
                                type="switch"
                                id="habilitar"
                                name="habilitar"
                                onChange={e => Handelcheck(e.target)}
                                value="Stripe"
                                checked={precios.habilitar}

                            />
                            <label className=" ">Habilitar Cortesia </label>
                        </div>
                    </div>
                </div>
                <div className="d-flex  justify-content-end">
                    <div>
                        <button className="btn btn-success" disabled={disable} onClick={handleSubmit} >Crear precios </button>
                    </div>
                    <div>
                        <button className=" btn btn-primary ml-2" onClick={() => usedispatch(setModal({ nombre: "ListarPreciView",estado:modal.estado}))} >Ver localidades</button>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
}