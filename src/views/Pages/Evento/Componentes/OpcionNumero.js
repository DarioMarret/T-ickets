import { useState } from "react";
import { Modal, ProgressBar } from "react-bootstrap";

export default function Viewcorrelativos(props) {
    let { localidades ,setItems} = props

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
    function Guardar(e) {}
    return (
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
                                        <select className=" form-select" name="" value={localidaname.nombre} onChange={(e)=> handelchangelocalidad(e.target)}>
                                            <option value={""} disabled required ></option>
                                            {localidades.length > 0 ?
                                                localidades.map(e => {
                                                    {
                                                        return(  <option value={e.id }>{e.nombre_localidad } </option>)
                                                      }
                                                })
                                                : ""}
                                        </select>{/*
                                        <input type="text" className="form-control" id="nombre" name="nombre"
                                            value={localidaname.nombre}
                                            onChange={(e) => handelchangelocalidad(e.target)}
                                            placeholder="Ingrese el nombre del espacio" />*/}
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
                                {/*datalocalidad.typo == "correlativo" ?
                                    <button className="btn btn-primary col-12" onClick={Actualiza}>Actualizar</button> : ''*/}
                                {true ?
                                    <button className="btn btn-primary" disabled={true} >
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        Guardando</button>
                                    : ''

                                }
                                {!false ? <button className="btn btn-success col-12" onClick={Guardar}>Guardar</button> : ''}
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

                </div>




            </div>

        </div>
    )
}