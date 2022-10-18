
import { array } from "prop-types"
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
    const [localidad,setLocalidad]= useState([])
    const [dataMap,setDatosMap] = useState([])
    const [elemtoselet,setElemnto]=useState({
        nombre:"",
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
         const obten = data.map((e,i)=>{
           let dato = JSON.parse( e.mesas_array)      
           return {...e,tipo:dato.Typo,arry:dato}
         })
         setLocalidad(obten)
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
    const SubmitEspacio =e=>{
         e.preventDefault();    
         //dataMap,setDatosMap
         let mapa = dataMap
         const form = new FormData(e.target)
         const {ancho,alto,color,titel} = Object.fromEntries(form.entries())
         let agrega = {
            tipo:"espacio",
            alto:alto,
            color:color,
            nombre:titel
         }
         mapa.push(agrega)
         $('#ingreso').append(
            "<div class='espacio "+ titel +"  d-flex justify-content-center align-items-center border border-dark' style='position:relative; height:"+alto+"px;" +
           "width:"+ancho+"px; background:"+color+
           "'><h5 style='font-size:1.5em; color:#ffff' >"+titel+"</h5>   </div>")
           setDatosMap(mapa)
        // console.log(form)
     }
     const SubmitLocalidad =e=>{
        e.preventDefault();
        const form = new FormData(e.target)
       //const {ancho,alto,color,titel} = Object.fromEntries(form.entries())

     }
    // $("p").css({"background-color": "yellow", "font-size": "200%"});
     const ChangerSelect=e=>{
        let arr = localidad
        let index  = arr.findIndex(a=>a.id==e.target.value)
        let {id, nombre,arry,typo} = arr[index]
       console.log(arry)
       if(typo=="fila") return
       $( "div" ).remove("."+id )
       $('#ingreso').append("<div id='"+id+"' class='localidad  "+id +" "+nombre+" border border-dark  ' style='position:relative; height:fit-content;width:fit-content;'></div>")
       let incrustar ="<div class='localidad  "+nombre+"  bg-danger ' style='position:relative; padding:2px;'>"
       arry.datos.map((e,i)=>{
        incrustar = "<div class='d-flex  px-3 p-1 justify-content-ce '>"
        incrustar = incrustar + "<span class='d-inline-block' disabled >"
        incrustar = incrustar + "<div class='d-flex   mx-1 bg-primary text-white justify-content-center align-items-center rounded-5  ' style='height:"+e.anchor+";width:"+e.anchor+"' >"
        incrustar = incrustar + " <div className='d-flex justify-content-center'>"
        incrustar= incrustar + "<span style='font-size:0.7em;'>   "+e.fila+" </span></div></div></span>"
        incrustar= incrustar +"<div class=' d-flex px-1  align-items-stretch '>"
        
        e.asientos.map((elm,ind)=>{
            let numero = ind +1
            incrustar = incrustar + "<div  class='"+elm.estado+"  "+elm.silla+" d-flex  bg-success   rounded-5 text-center  justify-content-center align-items-center '"
            incrustar = incrustar + "style='height:"+elm.anchor+";width:"+elm.anchor+";margin-left:"+elm.marginLeft+";margin-right:"+elm.marginRight+"; ' >"
            incrustar = incrustar + " <div className='"+ elm.silla +" d-flex px-3  text-white justify-content-center  ' >"
            incrustar = incrustar + " <div className='d-flex justify-content-center'>"
            incrustar = incrustar + " <span style='font-size:0.7em;'>   "+ numero+" </span> </div></div></div>"       
        })
        incrustar = incrustar + "</div></div>"        
        $("#"+id).append(incrustar)
       
       })


     }

     $(document).on("click","div.espacio",function(){
        //console.log(this.classList)
        setElemnto({
            nombre:this.classList[1],
            tipo:this.classList[0],
        })
     })
     /*$(document).on("click","div.localidad",function(e){
        const id = e.target.id;
       console.log(id)
        console.log(this.classList)
     })*/
     $(document).on("click","div.disponible",function(){
        console.log(this.classList)
        $("."+this.classList).css({"background-color": "yellow", "font-size": "200%"});

     })
     const Quitar=()=>{
        if(elemtoselet.nombre!=""){
            $( "div" ).remove("."+elemtoselet.nombre )
            setElemnto({
                nombre:"",
                tipo:"",
            })
        }
     }
    
     useEffect(()=>{
        ( async()=>{
            await ObtenLocalidad()
        })()

     },[])


    return (
        <>
        <div className="container-fluid">
            <div className="row">

                <div className="col-12 col-md-4">
                <Accordion  defaultActiveKey="0" flush>
                      
                                <Accordion.Item eventKey={0} >
                            <Accordion.Header> Agregar Espacio o localidad </Accordion.Header>
                            <Accordion.Body>
                            <div className="container-fluid row">        
                    <h5>Agraga Espacio</h5>   
                    <form className="container-fluid row" onSubmit={SubmitEspacio} >        
                    <div className="col-6"> 
                    <label>Ancho</label>
                    <input className="form-control" 
                    defaultValue={50}
                    minLength="50"
                    type="number"
                    name="ancho" />
                    </div>
                    <div className="col-6">
                    <label>Alto</label>
                    <input className="form-control" 
                    defaultValue={50}
                    name="alto"
                    minLength={50}
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
                    <button type="submit" className="btn btn-success col-12" >Agregar Espacio</button>
                    </div>    
                    </form> 
                    </div>
                    <div className="container row">
                        <div className="pt-2">
                            <h5>Agregar localidad</h5>
                        </div>
                        <div className="col-7 pb-1">
                            
                            <select className="form-control" name="localidad"
                            onChange={ChangerSelect}
                            >
                                <option value=""></option>
                                {localidad.length>0?
                                localidad.map((item, i) => {
                                    return (
                                    <option key={i} value={item.id} >{item.nombre}</option>)
                                })
                                :''}
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
                                <div className="col-12">
                                        <h5 >Elemnto Seleccionado</h5>

                                    </div>
                                    <div className="col-6">
                                        <label>Espaciar izquierda</label>
                                        <input 
                                         type="number"
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
                                        minLength={1}
                                        className="form-control"                                       
                                        />
                                    </div>
                                    <div className="col-6">
                                        <label>Rotar </label>
                                        <input 
                                        type="number"
                                        minLength={1}
                                        maxLength={10}     
                                        className="form-control"                                  
                                        />
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>                
                    
                    <div className="row">
                        </div>                                  
                </div>
                <div className="col-12  col-md-8">
                    <div >
                        <div className="d-flex flex-wrap justify-content-between">
                        <h5>Seleccion: {elemtoselet.nombre}</h5>
                        <h5>Tipo: {elemtoselet.tipo} </h5>
                        
                        <button className="btn btn-danger" onClick={Quitar} >Quitar</button>
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