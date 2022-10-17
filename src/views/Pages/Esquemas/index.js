
import React, { useEffect,useState } from "react"
import { Accordion } from "react-bootstrap"
import { ListarLocalidad } from "utils/Querypanel"
const EsquemaViews=()=>{

    let marginLetf=''
    let marginRight=''
    let Top=''
    let left=''
    let rigth=''
    let bottom=""
    let rotar='transform:rotate'
    const [dataMap,setDatosMap] = useState([])
    const [elemtoselet,setElemnto]=useState({
        className:"",
        tipo:"",
    })
    const [datosalterables,setDatos]=useState({
        height:'',
        width:'',
        top:'',
        left:'',
        bottom:'',
        rigth:'',
        rotar:'', 
    })
    async function ObtenLocalidad(){    
        try {
         const datos =await ListarLocalidad()
   const {success,data}=datos
   
         if(success){
         const filtrado = data.filter(e => e.espacio == 'Recinto ferial Santo Domingo')
         const obten = filtrado.map((e,i)=>{
           let dato = JSON.parse( e.mesas_array)      
           return {...e,tipo:dato.Typo,arry:dato}
         })
         console.log("localidada",obten)
        }
        } catch (error) {   
         console.log(error)
        }
     }
     function AgregarEspacio(){
        let arryestructuraespacio ={
            tipo:'espacio',
            nombre:'nombre ejemplo Tarima',
            height:'',
            width:'',
            top:'',
            left:'',
            bottom:'',
            rigth:'',
            rotar:'',
            color:'',
            marginleft:'',
            marginRight:'',            
        }       
        $('#ingreso').append(
            "<div class='bg-success border border-dark' style='position:relative; height:"+50+"px;" +
           "width:100px;'></div>")
     }
     function AgregagaLocalidad(){

     }
     function SubmitEspacio(e){

     }
     $(document).on("click",function(){

     })
     useEffect(()=>{

     },[])


    return (
        <>
        <div className="container-fluid">
            <div className="row">

                <div className="col-4">
                <Accordion  defaultActiveKey="0" flush>
                      
                                <Accordion.Item eventKey={0} >
                            <Accordion.Header> Agregar Espacio o localidad </Accordion.Header>
                            <Accordion.Body>
                            <div className="container-fluid row">        
                    <h5>Agraga Espacio</h5>            
                    <div className="col-6"> 
                    <label>Ancho</label>
                    <input className="form-control" 
                    type="number"
                    name="ancho" />
                    </div>
                    <div className="col-6">
                    <label>Alto</label>
                    <input className="form-control" 
                    name="alto"
                    type="number"
                    />
                    </div>
                    <div className="col-2">
                    <label>Color</label>
                    <input 
                    className="form-control form-control-color"
                    type="color" 
                    name="color"
                    />
                    </div>
                    <div className="col-10">
                    <label>Nombre</label>
                    <input className="form-control"
                    placeholder="Ecenario.. consola.. tarima.."
                    name="titel" />
                    </div>
                    <div className="pt-1">      
                    <label className="text-white">*</label>              
                    <button type="click" className="btn btn-success col-12" onClick={AgregarEspacio}>Agregar Espacio</button>
                    </div>    
                    </div>
                    <div className="container row">
                        <div className="pt-2">
                            <h5>Agregar localidad</h5>
                        </div>
                        <div className="col-7 pb-1">
                            
                            <select className="form-control">
                                <option value="localidad">localidad 1</option>
                            </select>
                        </div>
                        <div className="col-5">
                            <button type="click" className="btn btn-success col-12" onClick={AgregagaLocalidad} >Agregar</button>
                        </div>
                        
                    </div>  
                                
                          
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                Opciones
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-6">
                                        <label>Espaciar izquierda</label>
                                        <input 
                                         className="form-control"/>
                                    </div>
                                    <div className="col-6">
                                        <label>Mover Arriba </label>
                                        <input 
                                        type="number"
                                        className="form-control"/>                                        
                                    </div>
                                    <div className="col-6">
                                        <label>Mober Abajo</label>
                                        <input type="number" 
                                        className="form-control"
                                        />

                                    </div>

                                </div>

                            </Accordion.Body>



                        </Accordion.Item>
                       

                        
                        
                        </Accordion>                    
                    
                    <div className="row"></div>                                  
                </div>
                <div className="col-8 ">
                    <div >
                        <div className="d-flex flex-column">
                        <h5>Seleccion: S-A1-s2 localidadname ejemplo</h5>
                        <h5>Tipo: resolver el tipo </h5>
                        <button className="btn btn-danger">Quitar</button>
                        </div>
                        
                    </div>
                    <div id="ingreso" style={{position:'absolute'}} className="container-fluid border p-1 ">
                    </div>                
                </div> 

            </div>
        </div>
        </>

    )
}
export default EsquemaViews