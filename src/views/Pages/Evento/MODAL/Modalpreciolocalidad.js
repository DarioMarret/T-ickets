import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function Modalpreciolocalidad(){
    let modal = useSelector(state => state.SuscritorSlice.modal)
    let usedispatch= useDispatch()
    let [precios,setPrecios]=useState(
        {
            "id_evento": 0,
            "nombre_localidad": "string",
            "precio_normal": 0,
            "precio_discapacidad": 0,
            "precio_tarjeta": 0,
            "precio_descuento": 0,
            "habilitar_cortesia": false,
            "comision_boleto": 0,
            "descuento": 0,
            "habilitar": false
        }
    )

    return(
        <Modal
            show={(modal.nombre == "Modalpreciolocalidad")}
            size="lg"
        >
            <Modal.Body>
                <button className="close" onClick={()=>usedispatch(setModal({nombre:"",estado:""}))}>x</button>
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


                                placeholder="Descuento" />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap mb-2">
                        
                        
                        <div className=" d-flex  justify-content-center px-2">

                            <Form.Check className="py-1 pr-1"
                                type="switch"
                                id="habilitar_cortesia"
                                name="habilitar_cortesia"
                                value="Stripe"
                               
                               
                            />
                            <label className=" ">Habilitar Cortesia</label>
                        </div>
                        <div className=" d-flex  justify-content-center px-2">

                            <Form.Check className="py-1 pr-1"
                                type="switch"
                                id="habilitar"
                                name="habilitar"
                                value="Stripe"


                            />
                            <label className=" ">Habilitar </label>
                        </div>
                    </div>        
                </div> 
                <div className="d-flex  justify-content-end">
                    <div>
                        <button className="btn btn-success" >Crear precios </button>
                    </div>
                    <div>
                        <button className=" btn btn-primary ml-2">Continuar</button>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
}