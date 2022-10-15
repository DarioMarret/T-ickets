import React,{useEffect,useState} from "react";
import {Modal,Alert,OverlayTrigger,Tooltip} from "react-bootstrap"
import { Localidades } from "utils/constantes";
import {ListarLocalidad,ListarEspacios,GuardarEvento } from "utils/Querypanel.js";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
const ModalNewEvento =(props)=>{
    const {show,Setshow} = props;
    let user =clienteInfo()
    
    const [alertnone,showAlernone]= useState("d-none")
    const [espacios,setListaEspa]=useState([])
    //Array donde se crearan las localidades con sus precios
    const [localidadPreci,setPreLocalidad]=useState([])
    const [localidad,setLocalidades]=useState([])
    const [localidadfiltrada,setFiltra]=useState([])
    async function Lista (){
        const datos =await ListarLocalidad()
  const cargarLista = await ListarEspacios() 

  const{success,data}= cargarLista
  console.log(data)
  if(success){
    setListaEspa(data) 
    setLocalidades(datos.data)
}
}
    function toggleValueInArray(array, value) {
        //copia de array de localidades
        let ArrayCopia=array;
        
        var index = ArrayCopia.findIndex(obj => obj.localodad==value.localodad);      
      if (index == -1) {
        ArrayCopia.push(value);
      } else {
        ArrayCopia[index]={...value}     
      }
      //se agrega las localidades 
      //console.log(ArrayCopia)
      setPreLocalidad(ArrayCopia)
      setPrecios({localodad:'',
      precio_normal:'',
      precio_discapacidad:'',
      precio_tarjeta:'',
      precio_descuento:'',
      habilitar_cortesia:''})
    }
    // PROCESO  ACTIVO - CANCELADO
    let defauldata2 ={
        "nombreConcierto": "Aesa1222",
        "fechaConcierto": "10-11-2022",
        "horaConcierto": "09:09:pm",
        "lugarConcierto": "santo domingo",
        "cuidadConcerto": "santo domingo",
        "descripcionConcierto": "ejemlo",
        "imagenConcierto": "lonk ejemplo",
        "idUsuario": "12",
        "LocalodadPrecios": [
          {
            "localodad": "viene",
            "precio_normal": "1",
            "precio_discapacidad": "2",
            "precio_tarjeta": "3",
            "precio_descuento": "4",
            "habilitar_cortesia": "5"
          },
          {
            "localodad": "va",
            "precio_normal": "1",
            "precio_discapacidad": "2",
            "precio_tarjeta": "3",
            "precio_descuento": "4",
            "habilitar_cortesia": "5"
          }
        ]
      }
     async function gaurdaPrueba(){
        let defauldata ={
            ...neweventos,
            "LocalodadPrecios": [
                ...localidadPreci
            ]
          }
          console.log(defauldata)
        try {
            const data = await GuardarEvento(defauldata)
            console.log(data)
            if(data.success){
                alert("datos guardados")
                Setshow(false)
            }
            
        } catch (error) {
            console.log(error)
            
        }

      }
    
    
    $(document).ready(function() {
        $(".numero").keypress(function(e) {
          var n = (e = e || window.event).keyCode || e.which,
            t = -1 != "0123456789,.".indexOf(String.fromCharCode(n));
          (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })     
      });
                /*informacion de los enventos nuevos */
            const [neweventos,setNewEventos]=useState(
                {nombreConcierto:'',
                fechaConcierto:'',
                horaConcierto:'',
                lugarConcierto:'',
                cuidadConcert:'',
                descripcionConcierto:'',
                imagenConcierto:'',
                fechacreacion:'22-22-2022',
                idUsuario:""+user.id,
                })
 function handelchangeComposeventos(e){
    //console.log(e.files)
    //console.log(e.value)
    if(e.name=="imagenConcierto") {setNewEventos({...neweventos,imagenConcierto:e.value?e.value:''})}
    else{setNewEventos({
        ...neweventos,
        [e.name]:e.value,
    })}

 }
  const [precios,setPrecios]=useState(
         {localodad:'',
         precio_normal:'',
         precio_discapacidad:'',
         precio_tarjeta:'',
         precio_descuento:'',
         habilitar_cortesia:''}
  )
  const [selectLocalidad,setLocalidad]=useState([])
       
  function handelchange(e){
            if(e.value!=""){
            var index = localidad.filter(obj => obj.espacio==e.value);
                console.log(index)
                setLocalidad(index)
                setPreLocalidad([])  
                setPrecios({localodad:'',
                precio_normal:'',
                precio_discapacidad:'',
                precio_tarjeta:'',
                precio_descuento:'',
                habilitar_cortesia:''})     
                }else{setLocalidad([])}
            
        }  
        function soloSelectespacio(e){
            var index = localidadPreci.findIndex(obj => obj.localodad==e.value);
            console.log(index,localidadPreci[index])
            setPrecios({
                precio_normal:localidadPreci[index]?localidadPreci[index].precio_normal:'',
                precio_discapacidad:localidadPreci[index]?localidadPreci[index].precio_discapacidad:'',
                precio_tarjeta:localidadPreci[index]?localidadPreci[index].precio_tarjeta:'',
                precio_descuento:localidadPreci[index]?localidadPreci[index].precio_descuento:'',
                habilitar_cortesia:localidadPreci[index]?localidadPreci[index].habilitar_cortesia:'',
                [e.name]:e.value,               
            })
            //console.log(e.value)
            
            //console.log(localidadPreci[index],localidadPreci)
        }
        function handelchangeLocalidad(e){
            setPrecios({
                ...precios,
                [e.name]:e.value,               
            })          
        }
        function Agregarprecios(){
            toggleValueInArray(localidadPreci,precios)
            showAlernone("")
            setTimeout(() => {
                showAlernone("d-none")
              }, "1500")
           
        }

    useEffect(()=>{
        (async ()=>{
            await Lista()
           // await  Listar()
        })()
      //  console.log("evento",neweventos)
       //console.log(!(selectLocalidad.length==localidadPreci.length))
       // console.log("localidada precios-->",localidadPreci)//toggleValueInArray
        },[show])
    return(
    <Modal
    show={show}
    size='lg'
    onHide={()=>Setshow(false)}
    >
        <Modal.Header > 
           <Modal.Title>Registro Nuevo Evento</Modal.Title> 
           <button type="button" className="close"
                        onClick={()=>Setshow(false)}>
                        ×
                    </button>
        </Modal.Header>
         <Modal.Body>      
                    <div className="modal-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                        <div className="row">
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="nombreConcierto" name="nombreConcierto"
                                                value={neweventos.nombreConcierto}
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                placeholder="Nombre del evento" />
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                                </div>
                                                <input  className="form-control" id="fechaConcierto" name="fechaConcierto"
                                                value={neweventos.fechaConcierto} type="date"
                                                onChange={(e)=>handelchangeComposeventos(e.target)} placeholder="Fecha del evento"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                </div>
                                                <input type="time" className="form-control" id="horaConcierto" name="horaConcierto"
                                                value={neweventos.horaConcierto}
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                 placeholder="hora del evento"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <select className="form-control" name="localidad" onChange={(e)=>handelchange(e.target)} placeholder="Seleccione localidad">
                                                    <option value={""}>Seleccione espacio</option>
                                                    {espacios.map((e,i)=>{
                                                    return(
                                                    <option value={e.nombre} key={i+"n"+e.id}>{e.nombre}</option>
                                                    )
                                                    })}                                                   
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 col-md-6">
                                        <label className="form-label">Lugar</label>
                                        <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <input type="text"  name="lugarConcierto" className="form-control "
                                                value={neweventos.lugarConcierto}
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                 placeholder="Imagen del concierto"/>
                                               
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <label className="form-label">Ciudad </label>
                                        <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <input type="text" name="cuidadConcert" className="form-control "
                                                value={neweventos.cuidadConcert}
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                id="cuidadConcert"  placeholder="ciudad del concierto"/>
                                               
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-12">
                                        <label className="form-label">Descripcion </label>
                                        <div className="input-group mb-3">
                                        
                                                <input type="text" name="descripcionConcierto" className="form-control "
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                value={neweventos.descripcionConcierto}
                                                id="descripcionConcierto"  placeholder="Descriptión del concierto"/>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"></span>
                                                </div>
                                                                            </div>
                                        </div>
                                        

                                        <div className="col-12 col-md-12">
                                        <label className="form-label">Seleccione una imagen</label>
                                        <div className="input-group mb-3">
                                        
                                                <input type="file" accept="image/*" name="imagenConcierto" className="form-control "
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                id="imagenConcierto"  placeholder="Imagen del concierto"/>
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"></span>
                                                </div>
                                                                            </div>
                                        </div>

                                        </div>
                                            
                                            
                                            <div className="input-group mb-3 d-none">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-dollar-sign"></i></span>
                                                </div>
                                                <input disabled={true} type="text" className="d-none form-control" id="user_id"  placeholder="usuario que creo el evento"/>
                                            </div>
                                        {
                                          selectLocalidad.length?  
                                        <div className="col-12">

                                            <h3>Precios de Localidades </h3>
                                            <div className="d-flex flex-wrap">
                                             <div className="input-group mb-3 col-6">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <select className="form-control"name="localodad" value={precios.localodad} onChange={(e)=>soloSelectespacio(e.target)}>
                                                <option value={""}>Seleccione localidad</option>
                                                    {selectLocalidad.map((e,i)=>{
                                                        <option></option>
                                                        return(
                                                            <option value={e.nombre} key={i+"op"+e.nombre}>{e.nombre}</option>
                                                        )
                                                    })


                                                    }
                                                   
                                                </select>                                              
                                            </div>
                                            <div className="col-4">
                                                <button className="numero btn btn-success" onClick={(e)=>Agregarprecios()} disabled={!Object.values(precios).every((e)=>e)} >  Agregar precios</button>
                                            </div>
                                            <div className="col-6">
                                            <Alert className={alertnone} variant="success">
                                                 Precios Agregados a la Localidad
                                               
                                                </Alert>

                                            </div>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO NORMAL</label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.precio_normal?precios.precio_normal:0} name="precio_normal" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO DISCAPACIDA</label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.precio_discapacidad?precios.precio_discapacidad:0} name="precio_discapacidad" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO TC/TD </label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.precio_tarjeta?precios.precio_tarjeta:0} name="precio_tarjeta" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO DESCUENTO </label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.precio_descuento?precios.precio_descuento:0}  name="precio_descuento" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >HABILITAR CORTESIA </label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.habilitar_cortesia?precios.habilitar_cortesia:0} name="habilitar_cortesia" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>

                                        </div>:""}



                                    </div>



                                    </div>
                                </div>
                                <div className="modal-footer"> 
                                <button type="button" className="btn btn-secondary close-btn" onClick={gaurdaPrueba}>Salir</button>
                                {selectLocalidad.length>0&&selectLocalidad.length!=localidadPreci.length?
                                 <button disabled={true} className="btn btn-primary close-modal float-rigth">Grabar1</button>:
                                 ""}     
                                 {!selectLocalidad.length>0&&Object.values(neweventos).every(e=>e)?
                                 <button disabled={true} className="btn btn-primary close-modal float-rigth">Grabar2</button>:
                                 ""

                                 }   
                                 {selectLocalidad.length>0&&selectLocalidad.length==localidadPreci.length?                       
                                <button disabled={ !Object.values(neweventos).every(e=>e)} 
                               onClick={gaurdaPrueba}
                                className="btn btn-primary close-modal float-rigth">Grabar3</button>
                                :
                                 ""} 
                     </div>
                                         
            
            </Modal.Body>   
                    

                                        
                        
                
    </Modal>)

}
export default ModalNewEvento