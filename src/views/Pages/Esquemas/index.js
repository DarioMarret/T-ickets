
import { array } from "prop-types"
import React, { useEffect,useState } from "react"
import { Accordion } from "react-bootstrap"
import { ListarLocalidad } from "utils/Querypanel"
import Codigo from "../../../../src/assets/imagen/codigobarra.png"
import Imagen from "../../../../src/assets/imagen/Concert.png"
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
    /*     mapa.push(agrega)
         $('#ingreso').append(
            "<div class='espacio "+ titel +"  d-flex justify-content-center align-items-center border border-dark' style='position:relative; height:"+alto+"px;" +
           "width:"+ancho+"px; background:"+color+
           "'><h5 style='font-size:1.5em; color:#ffff' >"+titel+"</h5>   </div>")
           setDatosMap(mapa)
        // console.log(form)*/
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
    const [styletiket,setSttyle]=useState({
        bgticketespaciouni:'#D5583D'
    })
    function handelChangeuno(e){
        setSttyle({
            ...styletiket,
            [e.name]:e.value
        })
      //  console.log(e.value)

    }
     useEffect(()=>{
        ( async()=>{
            await ObtenLocalidad()
        })()

     },[])


    return (
        <>
        <div className="container-fluid">
            <div className="row  flex-wrap-reverse  ">

                <div className="col-12 col-md-4 ">
                <Accordion  defaultActiveKey="0" flush>
                      
                                <Accordion.Item eventKey={0} >
                            <Accordion.Header> Seccion 1 de ticket </Accordion.Header>
                            <Accordion.Body>
                            <div className="container-fluid row">        
                            <h5>Editar fondo</h5>   
                            <form className="container-fluid row" onSubmit={SubmitEspacio} >      
                            <div className="col-2">
                            <label>Color</label>
                            <input 
                            className="form-control form-control-color"
                            type="color" 
                            name="bgticketespaciouni"
                            value={styletiket.bgticketespaciouni}
                            onChange={(e) =>handelChangeuno(e.target) }
                            />
                            </div>
                            <div className="col-10">
                            <label>Nombre</label>
                            <input className="form-control"
                            placeholder=""
                            name="titel" />
                            </div>
                            <div className="pt-1">      
                            <label className="text-white">*</label>              
                            <button type="submit" className="btn btn-success col-12" >Agregar Espacio</button>
                            </div>    
                            </form> 
                            </div>                  
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                Seccion 2 del ticket
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-12">
                                        <h5 >Elemnto Seleccionado</h5>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>                                 
                                                   
                </div>
                <div className="col-12  col-md-8 p-0 mb-1">
                    <div >
                        <div className="d-flex flex-wrap justify-content-between">
                        <h5>Pantilla Ticket</h5>
                        
                        
                       
                        </div>
                        
                    </div>
                   
                    <div  className="d-flex justify-content-center container-fluid p-2 ">
                        <div className="shadow-md d-flex flex-row" style={{height:'18.0em',width:"70em",
                        
                    }}>                           
                                <div className="d-flex justify-content-center align-items-center" style={{
                                    height:'100%',width:'70%',      
                                    position:"relative",                           
                                    borderTopLeftRadius:'5px', 
                                    borderBottomLeftRadius:'5px' }}> 
                                    <div className="d-flex justify-content-center align-items-center " 
                                    style={{width:'100%', 
                                    zIndex:1,
                                    borderBottomLeftRadius:'5px' ,
                                    borderTopLeftRadius:'5px',
                                    backgroundColor:styletiket.bgticketespaciouni,
                                    backgroundImage:`url(${Imagen})`,
                                    opacity: 0.6,
                                    height:'100%',}}>                                       
                                    </div>
                                    <div 
                                        style={{
                                            position:"absolute",
                                            zIndex:2,
                                            width:"90%",
                                            height:"90%",
                                        }}
                                        >
                                            
                                            <div>
                                                <h4 
                                                style={{
                                                    position:'relative',
                                                    top:'20px',
                                                    left:"20px",
                                                    fontSize:"1.6em",
                                                    fontFamily:"Fantasy",
                                                    textTransform:"uppercase"
                                                }}>
                                                    titulo de ticket
                                                </h4>                                                
                                            </div>
                                            <div className="d-flex flex-column" style={{
                                                position:"absolute",
                                                bottom:"15px",
                                                left:"35px",
                                            }}>
                                                <small style={{
                                                    fontSize:"1.0em",
                                                    fontFamily:'fantasy'
                                                }}>
                                                   Descripción  breve en el boleto 
                                                  
                                                </small>
                                                <small class="" style={{
                                                    fontSize:'0.82em',
                                                    
                                            }}>
                                                  <strong> Descripción más breve del boleto
                                                  </strong>
                                                  </small>

                                            </div>
                                            <div 
                                            style={{
                                                position:"absolute",
                                                bottom:"15px",
                                                left:"35px",
                                            }}>
                                            
                                                <i className="bi bi-qr-code fa-3x"
                                               ></i>

                                            </div>
                                           

                                        </div>
                                </div>
                                <div className="d-flex justify-content-start  align-items-center " style={{                               
                                 height:'100%',width:'30%',      
                                borderLeftColor:'black', 
                                borderLeftStyle:'dashed',
                                }}>
                                    <div className="bg-danger p-1 d-flex justify-content-center bg-light align-items-center" style={{
                                        height:'100%', 
                                    width:'100%',
                                   
                                    
                                    }}>
                                        <div className="d-flex flex-column text-center   txt-dark   ">

                                            <div className="d-flex flex-column justify-content-between align-items-lg-stretch p-3" >
                                                <h5 style={{fontSize:"1.2em",
                                                fontFamily:'Fantasy',
                                                textTransform:'uppercase'                                            
                                            }}>Evento Ticket</h5>
                                                <h5 style={{fontSize:'1.0em',
                                             fontFamily:'Century Gothic'}}>Numero 32</h5>
                                           </div>
                                            <div className=" d-flex flex-column justify-content-between align-items-lg-stretch p-3" >
                                            <small class="text-muted" style={{
                                                    fontSize:'0.82em'                                                    
                                                    }}>$32</small>
                                                <h5 style={{
                                                    fontSize:"1.2em", 
                                                    fontFamily:'Fantasy',
                                                    textTransform:'uppercase'}}>Vip entre pass </h5>
                                                <small class="text-muted" style={{
                                                    fontSize:'0.82em',
                                                    
                                            }}>22/12/22</small>
                                                <small class="text-muted" style={{
                                                    fontSize:'0.82em'
                                                    
                                                    }}>21:36</small>
                                            </div>
                                            <i className="bi bi-qr-code-scan fa-2x"></i>
                                                
                                            
                                        </div>
                                            
                                    </div>
                                </div>                            
                        </div> 
                    </div>                
                </div> 

            </div>
        </div>
        </>

    )
}

export default EsquemaViews