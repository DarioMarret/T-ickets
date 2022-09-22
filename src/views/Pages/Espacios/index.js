import React, {useEffect,useState} from  "react";
import Modalregistroespacio from "./MODAL/REGISTROSECCION.js";
//import ModalnewEvento from "./D"


const EventosViews =()=>{
    const [show,setShowToast] =useState(false)
   let ListadeFilas=[]
   let Listasillas=[] 
   let i=0
   let f=0
  function  AgregasSillasMesa(){
        setShowToast(true)
}
    useEffect(()=>{
       
    },[])
 
    return(
        <div className="container-fluid">        
            <div className="row">       
            <Modalregistroespacio
            show={show}
            setShowToast={setShowToast}            
            />      
            <div className="modal fade" id="espacioModal"  role="dialog" aria-labelledby="espacioModal" aria-hidden="true" data-keyboard="false">
                <div className="modal-dialog" role="document">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h5 className="modal-title" id="espacioModal">Registrar espacio</h5>
                        </div>

                                    <form  method="POST">
                                        <div className="modal-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className="form-label"><b>Nombre</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre del espacio" />
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
                                            <textarea className="form-control" name="descripcion" id="descripcion" cols="30" rows="4"  placeholder="Ingresa una descripción del espacio"></textarea>
                                                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                
                                <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">Salir</button>
                                                        <button className="btn btn-primary close-modal">Grabar</button>
                                                </div>
                        </form>
                    </div>
                </div>
            </div>    
          
                <div>
                </div>
                <div className="col-md-12">
                <button  className="btn btn-success" data-toggle="modal" data-target="#espacioModal" ><i className="mr-2 fa fa-plus"></i> Nuevo espacio</button>
                   
                <button  className="btn btn-success" onClick={AgregasSillasMesa}><i className="mr-2 fa fa-plus"></i>Sillas</button>
                    

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
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Descripcion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Estadio modelo</td>
                                        <td>dedededede</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-toggle="modal" data-target="#seccionesModal" className="btn btn-primary btn-sm"><i className="fa fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Estadio modelo</td>
                                        <td>dedededede</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-toggle="modal" data-target="#seccionesModal" className="btn btn-primary btn-sm"><i className="fa fa-edit"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Estadio modelo</td>
                                        <td>dedededede</td>
                                        <td>
                                            <div className="btn-group" role="group" aria-label="Basic example">
                                                <button data-toggle="modal" data-target="#seccionesModal" className="btn btn-primary btn-sm"><i className="fa fa-edit"></i></button>
                                            </div>
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
export default EventosViews