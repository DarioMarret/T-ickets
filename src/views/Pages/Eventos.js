import React ,{useEffect,useState}from "react";

const EventosViews =()=>{
   /*informacion de los enventos nuevos */
   const [newEvento,setNewEvento]=({
    fecha:'',
    hora:'',
    lugar:'',
    nombre:'',
    descripcion:'',
    imagen:'',
    idUsuario:'',
    codigoEvento:'preguntar, se genera despues?',
    general:'cantidad de localidades generales, opcional',
    vip:'cantidad de localidades vip opcional',
    silla:'cantidad de localidades sillas opcional',
    mesas:'cantidad de localidades mesas opcional',
    coretecia:'cantidad de localidades cortecia, opcional',
    porcentajeDiscapacidad:'porcentaje discapacidad, opcional',
    porcentajeDescuneto:'porcentaje discapacidad, opcional',
    porcentajecero:'Porcentaje cero opcional'})
    return(
        <div className="container-fluid">
                


                        <div className="row justify-content-center align-items-center">
                            <div className="col-sm-7">
                                <div className="card" style={{backgroundColor: 'gray', color: 'white'}}>
                                    <div className="card-body text-center">
                                        <br/>
                                        <b>ESCENARIO</b>
                                        <br/>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>

                    <div className="row">
                        <div className="col-sm-2">
                            <h2 className="pb-2 border-bottom">MESAS</h2>
                        </div>
                        <div className="col-sm-9" style={{textAlign: 'right'}}>
                            <span className="badge badge-danger">Pagados</span>
                            <span className="badge badge-warning">Reservados</span>
                            <span className="badge badge-success">Libres</span>
                            <span className="badge badge-secondary">Seleccionados</span>
                        </div>
                    </div>














                <div className="row">

                
                <div  className="modal fade" id="eventoModal"  role="dialog" aria-labelledby="eventoModal" aria-hidden="true" data-keyboard="false">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="eventoModal">Registrar evento</h5>
                            </div>

                                        <form method="POST">
                                            <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                        <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="nombre" placeholder="Nombre del concierto" />
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="fech"  placeholder="Fecha del concierto"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="hora"  placeholder="Hora del concierto"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="lugar"  placeholder="Lugar del concierto"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-info-circle"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="descrip"  placeholder="Descripcion del evento"/>
                                                                            </div>

                                        </div>
                                        
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-info-circle"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="vip" placeholder="Vip"/>
                                                                            </div>

                                        </div>

                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-info-circle"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="sillas"  placeholder="sillas"/>
                                                                            </div>

                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-info-circle"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="mesa"  placeholder="mesa localidad"/>
                                                                            </div>

                                        </div>
                                        
                                        

                                        <div className="col-12 col-md-12">
                                        <label className="form-label">Seleccione una imagen</label>
                                        <div className="input-group mb-3">
                                        
                                                <input type="file" className="form-control " id="imagen"  placeholder="Imagen del concierto"/>
                                                                            </div>
                                        </div>

                                        </div>
                                            
                                        
                                            
                                            
                                            <hr/>
                                            
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-dollar-sign"></i></span>
                                                </div>
                                                <input disabled="" type="text" className="form-control" id="user_id"  placeholder="usuario que creo el evento"/>
                                                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">Salir</button>
                                                            <button type="submit" className="btn btn-primary close-modal">Grabar</button>
                                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
                <script>
                    
                </script>  
                    <div className="col-md-12">
                        

                        <button  className="btn btn-success" data-toggle="modal" data-target="#eventoModal"><i className="mr-2 fa fa-plus"></i> Nuevo evento</button>

                        <br/><br/>

                        <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Eventos
                            </div>
                            <div className="card-body">

                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Descripcion</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Lugar</th>
                                            <th scope="col">Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Evento 1</th>
                                            <td>1</td>
                                            <td>Otto</td>
                                            <td><span className="badge me-1 bg-success text-white">Emitido</span></td>
                                            <td><a href="#">Descargar</a></td>
                                            <td>
                                                <a className="btn btn-primary btn-sm" href="#" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                                <a className="btn btn-primary btn-sm" target="_blank" href="#" data-toggle="tooltip" title="Ver mapa"><i className="fa fa-sitemap"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Evento 2</th>
                                            <td>2</td>
                                            <td>Thornton</td>
                                            <td><span className="badge me-1 bg-danger text-white">Usado</span></td>
                                            <td><a href="#">Descargar</a></td>
                                            <td>
                                                <a className="btn btn-primary btn-sm" href="#" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                                <a className="btn btn-primary btn-sm" target="_blank" href="#" data-toggle="tooltip" title="Ver mapa"><i className="fa fa-sitemap"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Evento 3</th>
                                            <td>3</td>
                                            <td>Thornton</td>
                                            <td><span className="badge me-1 bg-dark text-white">Anulado</span></td>
                                            <td><a href="#">Descargar</a></td>
                                            <td>
                                                <a className="btn btn-primary btn-sm" href="#" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                                <a className="btn btn-primary btn-sm" target="_blank" href="#" data-toggle="tooltip" title="Ver mapa"><i className="fa fa-sitemap"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )

}
export default EventosViews;