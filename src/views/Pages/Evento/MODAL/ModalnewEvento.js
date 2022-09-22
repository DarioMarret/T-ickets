import React,{useEffect,useState} from "react";
import {Modal} from "react-bootstrap"
import { Localidades } from "utils/constantes";

const ModalNewEvento =(props)=>{
    const {show,Setshow} = props;

      /*informacion de los enventos nuevos */
const [neweventos,setNewEventos]=useState(
    {
      name:'',
      fecha:'',
      hora:'',
      imagen:'link?',
      espacio_id:'',
      espacio:[
        {localidad:'',
          precio:'',
          discapacidad:'',
          precioTC:'',
          precoDescuneto:'',
          HabilitarCortesia:''}
      ] 
    }
    
  )
  const [selectLocalidad,setLocalidad]=useState([])
  function handelchange(e){
   // let 
    if(e.value!=""){
    var index = Localidades.findIndex(obj => obj.id==e.value);
   //console.log(Localidades[index])
    setLocalidad(Localidades[index].localidad)
    console.log(selectLocalidad)
}else{setLocalidad([])}
    //setLocalidad(e.value)
  }  
    useEffect(()=>{

        },[show])
    return(
    <Modal
    show={show}
    size='lg'
    onHide={()=>Setshow(false)}
    >
        <Modal.Header closeButton>    
        </Modal.Header>
         <Modal.Body>
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
                                                <input type="text" className="form-control" id="name" name="name" placeholder="Nombre del evento" />
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="fecha" name="fecha" placeholder="Fecha del evento"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="hora" name="hora"  placeholder="hora del evento"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <select className="form-control" name="localidad" onChange={(e)=>handelchange(e.target)} placeholder="Seleccione localidad">
                                                    <option value={""} selected> Selecione una localidad</option>
                                                    {Localidades.map((e,i)=>{
                                                    return(
                                                    <option value={e.id}>{e.nombre}</option>
                                                    )
                                                    })}
                                                    

                                                </select>
                                               
                                                                            </div>
                                        </div>
                                        
                                        
                                        

                                        <div className="col-12 col-md-12">
                                        <label className="form-label">Seleccione una imagen</label>
                                        <div className="input-group mb-3">
                                        
                                                <input type="file" className="form-control " id="imagen"  placeholder="Imagen del concierto"/>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"></span>
                                                </div>
                                                                            </div>
                                        </div>

                                        </div>
                                            
                                            
                                            <div className="input-group mb-3 ">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-dollar-sign"></i></span>
                                                </div>
                                                <input disabled={true} type="text" className="form-control" id="user_id"  placeholder="usuario que creo el evento"/>
                                            </div>
                                        {
                                          selectLocalidad.length?  
                                        <div className="col-12">

                                            <h3>Precios de Localidades </h3>
                                             <div className="input-group mb-3 col-6">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <select className="form-control">
                                                    {selectLocalidad.map((e,i)=>{
                                                        return(
                                                            <option value={e.nombre}>{e.nombre}</option>
                                                        )
                                                    })


                                                    }
                                                   
                                                </select>                                              
                                            </div>
 
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO NORMAL</label>
                                                </div>
                                                <input className="form-control col-6"/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO DISCAPACIDA</label>
                                                </div>
                                                <input className="form-control col-6"/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO TC/TD Normal</label>
                                                </div>
                                                <input className="form-control col-6"/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO DECUNTO </label>
                                                </div>
                                                <input className="form-control col-6"/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >HABILITAR CORTESIA </label>
                                                </div>
                                                <input className="form-control col-6"/>
                                            </div>

                                        </div>:""}



                                    </div>



                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">Salir</button>
                                                            <button type="submit" className="btn btn-primary close-modal">Grabar</button>
                                                    </div>
                                         </form>
            
            </Modal.Body>   
                    

                                        
                        
                
    </Modal>)

}
export default ModalNewEvento