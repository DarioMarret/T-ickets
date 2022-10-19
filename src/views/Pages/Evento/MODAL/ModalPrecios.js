import React,{useState,useEffect} from "react";
import { Modal } from "react-bootstrap";

const PreciosViews =(prop) => {
    let {showpr,setShowpr,valores}= prop
    const [precios,setPrecios]=useState({localodad:'',
    precio_normal:'',
    precio_discapacidad:'',
    precio_tarjeta:'',
    precio_descuento:'',
    id: '',
    localodad: '',
    habilitar_cortesia:''})

    function handelchangeLocalidad(e){
        setPrecios({
            ...precios,
            [e.name]:e.value,               
        })      
    }
    useEffect(()=>{
        if(valores){
                   setPrecios({...valores})
        }

    },[showpr])

    return(
        <>
        <Modal
        show={showpr}
        
    onHide={()=>setShowpr(false)}
        
        >
            <Modal.Header>
                <h5>Editar Precios </h5>
                <button type="button" className="close"
                        onClick={()=>setShowpr(false)}>
                        ×
                    </button>
            </Modal.Header>
            <Modal.Body>
            <div className="col-12">

                        <h3>Localidad:{precios.localodad} </h3>                      

                        <div className="row">
                        <div className="d-flex flex-wrap col-12 col-md-6">
                        <label className="form-label">PRECIO NORMAL</label>
                         <div className="input-group mb-3">                           
                         <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                    <i className="fa fa-usd"></i>
                                                    </span>
                                                </div>
                            <input className="numero form-control " value={precios.precio_normal?precios.precio_normal:0} name="precio_normal" onChange={(e)=>handelchangeLocalidad(e.target)}/>
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
                            <input className="numero form-control " value={precios.precio_discapacidad?precios.precio_discapacidad:0} name="precio_discapacidad" onChange={(e)=>handelchangeLocalidad(e.target)}/>
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
                            <input className="numero form-control " value={precios.precio_tarjeta?precios.precio_tarjeta:0} name="precio_tarjeta" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                            
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
                            <input className="numero form-control" value={precios.precio_descuento?precios.precio_descuento:0}  name="precio_descuento" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                            </div>
                        </div>
                        </div>
                       
                        <div className="d-flex flex-wrap mb-2 col-12">
                            
                                <label >HABILITAR CORTESIA </label>
                                <div className="input-group mb-3">                           
                         <div className="input-group-prepend">
                         <span className="input-group-text">
                                                    <i className="fa fa-dollar"></i>
                                                    </span>
                                                </div>
                            <input className="numero form-control " value={precios.habilitar_cortesia?precios.habilitar_cortesia:0} name="habilitar_cortesia" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                        </div>
                        </div>

                        </div>

            </Modal.Body>
            <Modal.Footer>
                <button type="button"></button>
                <button className="btn btn-success float-end">Actualizar</button>
            </Modal.Footer>
        </Modal>
        </>
    )

}

export default PreciosViews