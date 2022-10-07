import React,{useEffect,useState} from "react"
import { Modal,ProgressBar,OverlayTrigger,Tooltip,Button} from "react-bootstrap"
const TabunoView=()=>{
    const [nmobretabuno,setLocalidad]=useState({
        nombre:'',
        description:''
    })
    const [filass,setFilass]=useState({
        cantidad:'',
        inicial:'',
        fila:'',
        sillas:''

    })
    const [ListaFilas,setFilas]=useState([])
    const GeneraFilas=()=>{
        if(filass.inicial!=" "&& filass.cantidad!=" " ){
        const letrafilas = filass.inicial.replace(/[0-9]+/g, "")
        const numeroinicofilas= filass.inicial.replace(/[^0-9]+/g, "");        
        const repeticiones =parseInt(numeroinicofilas) + parseInt(filass.cantidad)      
        for(i= numeroinicofilas; i < repeticiones; i++){
            ListadeFilas.push({fila:letrafilas+""+i,sillas:0,asientos:[]});        
        }}
        setFilas(ListadeFilas)       
    }
     const AgregasSillasFila=()=>{ 
        ListadeFilas=ListaFilas
       // console.log(filass.fila,filass.sillas)
        let interar = parseInt(filass.sillas);
         if(filass.fila!=""&& filass.sillas !=""){          
           
            if(filass.fila==="Todas"){
               
                for(i=0; i< ListadeFilas.length; i++){            
                    ListadeFilas[i]["sillas"]=interar;
                    ListadeFilas[i]["asientos"]=[]
                 const numfila =ListadeFilas[i]["fila"]                
                    for(f=0; f< interar; f++ ){                               
                        ListadeFilas[i]["asientos"][f]={silla:numfila+"-s-"+f,estado:"disponible"};                         
                    }                   
                }               
                setFilas([])                  
                setFilasSillas(ListadeFilas)
                setFilas(ListadeFilas)               
                setFilasSillas([])     
            
            }else{
                let sillas=[]
                let interarr = parseInt(filass.sillas);
                var numero=0
                var index = ListadeFilas.findIndex(obj => obj.fila==filass.fila);
                var letra = ListadeFilas[index].fila
                ListadeFilas[index].sillas=interarr
                for(g=0; g< interarr;g++){                    
                    numero=1+g                   
                    sillas[g]={silla:letra+"-s-"+numero,estado:"disponible"}                  
                }
                
                ListadeFilas[index].asientos=[...sillas]
              
               
                
                setFilas([...ListadeFilas])               
                          
            }
         }         
     }
    function handelchangelocalidad(e){
        setLocalidad({
            ...localidaname,
            [e.name]:e.value
        })
    }
   return( <>
    <div className="d-flex">
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
                                                            value={nmobretabuno.nombre}
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
                                                            value={nmobretabuno.description}
                                                            onChange={(e)=>handelchangelocalidad(e.target)}
                                                            placeholder="Ingresa una descripción de la seccion" />
                                                            
                                                                                                        </div>
                                                    </div>
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
                                                                    <input type="number" className="form-control" id="nc_ca" placeholder="100" />
                                                                                                                        </div>
                                                            </div>

                                                            <div className="col-sm-6">
                                                                <label className="form-label"><b>Primer número</b></label>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend">
                                                                        <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                                    </div>
                                                                    <input type="number" className="form-control" id="nc_nombre" placeholder="100" />
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
                  <ProgressBar variant="danger"  now={50} key={1} />
                   <ProgressBar  variant="success" label={"500 "} now={450} key={2} />                    
               </ProgressBar>
               </div>
               <div className='col-2'>
               <button className='btn btn-primary' ><i className='fa fa-edit'></i> </button>
               </div>
           </div>
           <div className='d-flex flex-wrap'>
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
           </div>
               
            

           </div>

    </div>
    </>)

}
export default TabunoView