import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";

const PreciosViews = (prop) => {
    let { showpr, setShowpr } = prop
    let valores = useSelector(state => state.SuscritorSlice.modal)
    let dispatch = useDispatch()
    const [precios, setPrecios] = useState({
      
        id_precios: '',
        precio_normal: '',
        precio_discapacidad: '',
        precio_tarjeta: '',
        precio_descuento: '',
        habilitar_cortesia: '',
        comision_boleto: '', 
    })
    function handelchangeLocalidad(e) {
        setPrecios({
            ...precios,
            [e.name]: e.value,
        })
    }
    function Guardarboletos(){
        
        console.log(precios)
    }
    useEffect(() => {   
       // console.log(valores)  
            setPrecios({ 
              
                id_precios:valores.estado.id_precios,
                precio_normal: valores.estado.precio_normal,
                precio_discapacidad: valores.estado.precio_discapacidad ,
                precio_tarjeta: valores.estado.precio_tarjeta ,
                precio_descuento: valores.estado.precio_descuento ,
                habilitar_cortesia: valores.estado.habilitar_cortesia  ,
                comision_boleto: valores.estado.comision_boleto ,
            })     
    }, [valores.nombre == "precios" ? true : false])
    return (
        <>
            <Modal
                show={valores.nombre =="precios"? true:false}

            
            >
                <Modal.Header>
                    <h5>Editar Precios </h5>
                    <button type="button" className="close"
                        onClick={() => dispatch(setModal({ nombre:"", estado:""})) }>
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12">
                        <h3>Localidad:{valores.estado.localidad} </h3>
                        <div className="row">
                            <div className="d-flex flex-wrap col-12 col-md-6">
                                <label className="form-label">PRECIO NORMAL</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-usd"></i>
                                        </span>
                                    </div>
                                    <input className="numero form-control " value={precios.precio_normal ? precios.precio_normal : 0} name="precio_normal" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                            </div>
                            <div className="d-flex flex-wrap col-12 col-md-6">

                                <label className="form-label">PRECIO DISCAPACIDA</label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-dollar"></i>
                                        </span>
                                    </div>
                                    <input className="numero form-control " value={precios.precio_discapacidad ? precios.precio_discapacidad : 0} name="precio_discapacidad" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="d-flex flex-wrap mb-2 col-12 col-md-6">

                                <label >PRECIO TC/TD </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-dollar"></i>
                                        </span>
                                    </div>
                                    <input className="numero form-control " value={precios.precio_tarjeta ? precios.precio_tarjeta : 0} name="precio_tarjeta" onChange={(e) => handelchangeLocalidad(e.target)} />

                                </div>
                            </div>
                            <div className="d-flex flex-wrap mb-2 col-12 col-md-6">

                                <label >PRECIO DESCUENTO </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-dollar"></i>
                                        </span>
                                    </div>
                                    <input className="numero form-control" value={precios.precio_descuento ? precios.precio_descuento : 0} name="precio_descuento" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                            </div>
                            <div className="d-flex flex-wrap mb-2 col-12 col-md-6 ">

                                <label >HABILITAR CORTESIA </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-dollar"></i>
                                        </span>
                                    </div>
                                    <input className="numero form-control " value={precios.habilitar_cortesia ? precios.habilitar_cortesia : 0} name="habilitar_cortesia" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                            </div>
                            <div className="d-flex flex-wrap mb-2 col-12 col-md-6">
                                <label> COMISION  </label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-dollar"></i>
                                        </span>
                                    </div>
                                    <input className="numero form-control " value={precios.comision_boleto ? precios.comision_boleto : 0} name="comision_boleto" onChange={(e) => handelchangeLocalidad(e.target)} />
                                </div>
                            </div>
                        </div>

                      

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex align-items-center mx-auto " >
                        <button className="btn btn-success ">Actualizar</button>
                    </div>
                    
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default PreciosViews