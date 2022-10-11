import React,{useEffect,useState} from "react"
import { Modal,ProgressBar,OverlayTrigger,Tooltip,Button} from "react-bootstrap"
const TabtresView=(props)=>{

    const {datalocalidad,espacioname}=props
    const [localidaname,setLocalidad]=useState({
        nombre:'',
        description:'',
        cantidad:'',
        inicio:'',
        id:'',
    })
    function handelchangelocalidad(e){
        setLocalidad({
            ...localidaname,
            [e.name]:e.value
        })
        console.log({[e.name]:e.value})
    }
async function Guardar(){
    if(localidaname.nombre!="" && localidaname.description!="" && localidaname.cantidad!="" && localidaname.inicio!=""){
    console.log({"espacio":espacioname.nombre,"descripcion":localidaname.description,"nombre":localidaname.nombre,"mesas_array":JSON.stringify({Typo:'correlativo',datos: {cantidad:localidaname.cantidad,inicio:localidaname.inicio}})}) 
     }else{
        alert("verifique la informacion ingresada")
     }
}
    useEffect(()=>{
        if(datalocalidad.typo=="correlativo"){
            console.log("Relativo",datalocalidad)
            setLocalidad({
                nombre:datalocalidad.nombre,
                description:datalocalidad.description,
                id:datalocalidad.id,
                cantidad:datalocalidad.datos["cantidad"],
                inicio:datalocalidad.datos["inicio"]                
            })
           
        }
    },[datalocalidad])
   return( <>
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
                                                            onChange={(e)=>handelchangelocalidad(e.target)}
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
                                                            <input type="text" className="form-control" id="descripcion"name="description"
                                                            value={localidaname.description}
                                                            onChange={(e)=>handelchangelocalidad(e.target)}
                                                            placeholder="Ingresa una descripción de la seccion" />
                                                            
                                                                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex text-end row">
                                                <button className="btn btn-primary col-12">Actualizar</button>
                                                <button className="btn btn-success col-12" onClick={Guardar}>Guardar</button>
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
                                                                    onChange={(e)=>handelchangelocalidad(e.target)}
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
                                                                    onChange={(e)=>handelchangelocalidad(e.target)}
                                                                    id="inicio" placeholder="100" />
                                                                                                                        </div>
                                                            </div>
                                                        </div>
                                                        </div>

           <div className={"container-fluid col-sm-12 " } >
           
           <div className=' d-flex flex-wrap '>
               <div className='col-3'>
                   <h3>
                       General 
                   </h3>
               </div>
               <div className='col-7'>
               <ProgressBar 
               style={{height:'40px'}}
               >                  
                  <ProgressBar variant="danger"  now={0} key={1} />
                   <ProgressBar  variant="success" label={localidaname.cantidad} now={parseInt(localidaname.cantidad)} key={2} />                    
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