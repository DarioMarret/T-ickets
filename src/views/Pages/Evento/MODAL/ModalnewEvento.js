import React,{useEffect,useState} from "react";
import {Modal,Alert,OverlayTrigger,Tooltip} from "react-bootstrap"
import { Localidades } from "utils/constantes";
import {ListarLocalidad,ListarEspacios } from "utils/Querypanel.js";
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
        
        var index = ArrayCopia.findIndex(obj => obj.Localidades==value.Localidades);      
      if (index == -1) {
        ArrayCopia.push(value);
      } else {
        ArrayCopia[index]={...value}     
      }
      //se agrega las localidades 
      setPreLocalidad(ArrayCopia)
      setPrecios({Localidades:'',
      precio:'',
      discapacidad:'',
      precioTC:'',
      precoDescuneto:'',
      HabilitarCortesia:''})
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
    {
      name:'',
      fecha:'',
      hora:'',
      imagen:'',
      espacio_id:'',
      
    })
 function handelchangeComposeventos(e){
    console.log(e.files)
    if(e.name=="imagen") {setNewEventos({...neweventos,imagen:e.files?{...e.files}:''})}
    else{setNewEventos({
        ...neweventos,
        [e.name]:e.value,
    })}

 }
  const [precios,setPrecios]=useState(
         {Localidades:'',
          precio:'',
          discapacidad:'',
          precioTC:'',
          precoDescuneto:'',
          HabilitarCortesia:''}
  )
  const [selectLocalidad,setLocalidad]=useState([])
        function handelchange(e){
            if(e.value!=""){
            var index = localidad.filter(obj => obj.espacio==e.value);
                console.log(Localidades[index])
                setLocalidad(index)
                setNewEventos({...neweventos,espacio_id:e.value})
                setPreLocalidad([])  
                setPrecios({Localidades:'',
                precio:'',
                discapacidad:'',
                precioTC:'',
                precoDescuneto:'',
                HabilitarCortesia:''})     
                }else{setLocalidad([])}
            
        }  
        function soloSelectespacio(e){
            var index = localidadPreci.findIndex(obj => obj.Localidades==e.value);
            setPrecios({
                precio:localidadPreci[index]?localidadPreci[index].precio:'',
                discapacidad:localidadPreci[index]?localidadPreci[index].discapacidad:'',
                precioTC:localidadPreci[index]?localidadPreci[index].precioTC:'',
                precoDescuneto:localidadPreci[index]?localidadPreci[index].precoDescuneto:'',
                HabilitarCortesia:localidadPreci[index]?localidadPreci[index].HabilitarCortesia:'',
                [e.name]:e.value,               
            })
            console.log(e.value)
            
            console.log(localidadPreci[index])
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
        })()
       // console.log("evento",neweventos)
       //console.log(!(selectLocalidad.length==localidadPreci.length))
        //console.log("localidada precios-->",localidadPreci)toggleValueInArray
        },[show])
    return(
    <Modal
    show={show}
    size='lg'
    onHide={()=>Setshow(false)}
    >
        <Modal.Header closeButton> 
           <Modal.Title>Registro Nuevo Evento</Modal.Title>
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
                                                <input type="text" className="form-control" id="name" name="name"
                                                value={neweventos.name}
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                placeholder="Nombre del evento" />
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                                </div>
                                                <input  className="form-control" id="fecha" name="fecha"
                                                value={neweventos.fecha} type="date"
                                                onChange={(e)=>handelchangeComposeventos(e.target)} placeholder="Fecha del evento"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                </div>
                                                <input type="time" className="form-control" id="hora" name="hora"
                                                value={neweventos.hora}
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
                                        
                                        
                                        

                                        <div className="col-12 col-md-12">
                                        <label className="form-label">Seleccione una imagen</label>
                                        <div className="input-group mb-3">
                                        
                                                <input type="file" accept="image/*" name="imagen" className="form-control "
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                id="imagen"  placeholder="Imagen del concierto"/>
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
                                                <select className="form-control"name="Localidades" value={precios.Localidades} onChange={(e)=>soloSelectespacio(e.target)}>
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
                                                <input className="numero form-control col-6" value={precios.precio} name="precio" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO DISCAPACIDA</label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.discapacidad} name="discapacidad" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO TC/TD </label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.precioTC} name="precioTC" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >PRECIO DESCUENTO </label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.precoDescuneto}  name="precoDescuneto" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>
                                            <div className="d-flex flex-wrap mb-2">
                                                <div className="px-2 col-4">
                                                    <label >HABILITAR CORTESIA </label>
                                                </div>
                                                <input className="numero form-control col-6" value={precios.HabilitarCortesia} name="HabilitarCortesia" onChange={(e)=>handelchangeLocalidad(e.target)}/>
                                            </div>

                                        </div>:""}



                                    </div>



                                    </div>
                                </div>
                                <div className="modal-footer"> 
                                <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">Salir</button>
                                {selectLocalidad.length>0&&selectLocalidad.length!=localidadPreci.length?
                                 <button disabled={true} className="btn btn-primary close-modal float-rigth">Grabar</button>:
                                 ""}     
                                 {!selectLocalidad.length>0&&Object.values(neweventos).every(e=>e)?
                                 <button disabled={true} className="btn btn-primary close-modal float-rigth">Grabar</button>:
                                 ""

                                 }   
                                 {selectLocalidad.length>0&&selectLocalidad.length==localidadPreci.length?                       
                                <button disabled={ !Object.values(neweventos).every(e=>e)} className="btn btn-primary close-modal float-rigth">Grabar</button>
                                :
                                 ""} 
                     </div>
                                         
            
            </Modal.Body>   
                    

                                        
                        
                
    </Modal>)

}
export default ModalNewEvento