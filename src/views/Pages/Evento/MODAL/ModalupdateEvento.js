import React,{useEffect,useState} from "react";
import {Modal,Alert,OverlayTrigger,Tooltip} from "react-bootstrap"
import {ListarLocalidad,ListarEspacios,GuardarEvento, ActualizarLocalidad } from "utils/Querypanel.js";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useDispatch,useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import moment from "moment";
const Modalupdate=(props)=>{
    const {show,Setshow,evento} = props;
    let usedispatch= useDispatch()
    
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
        console.log("datos",value,array)
        var index = ArrayCopia.findIndex(obj => obj.id==value.id);     
         
      if (index == -1) {
        ArrayCopia.push(value);
      } else {
        ArrayCopia[index]={...value}     
      }     
      setPreLocalidad(ArrayCopia)
      setPrecios({localodad:'',
      precio_normal:'',
      precio_discapacidad:'',
      precio_tarjeta:'',
      precio_descuento:'',
      habilitar_cortesia:''})
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
                fechacreacion:'',
                idUsuario:""+user.id,
                })
 function handelchangeComposeventos(e){   
                setNewEventos({
                    ...neweventos,
                    [e.name]:e.value,
                })
 }
  const [precios,setPrecios]=useState({localodad:'',
         precio_normal:'',
         precio_discapacidad:'',
         precio_tarjeta:'',
         precio_descuento:'',
         id: '',
         localodad: '',
         habilitar_cortesia:''})
  const [selectLocalidad,setLocalidad]=useState([])
       
        function soloSelectespacio(e){
            let array = selectLocalidad
            var index = array.findIndex(obj => obj.localodad==e.value);
            console.log(array)
            console.log(array[index])
            setPrecios({
                precio_normal:array[index]?array[index].precio_normal:'',
                precio_discapacidad:array[index]?array[index].precio_discapacidad:'',
                precio_tarjeta:array[index]?array[index].precio_tarjeta:'',
                precio_descuento:array[index]?array[index].precio_descuento:'',
                habilitar_cortesia:array[index]?array[index].habilitar_cortesia:'',
                id: array[index]?array[index].id:'',
                localodad: array[index]?array[index].localodad:'',          
            })           
        }
        function handelchangeLocalidad(e){
            setPrecios({
                ...precios,
                [e.name]:e.value,               
            })          
        }
        function Agregarprecios(){
            toggleValueInArray(selectLocalidad,precios)
            showAlernone("")
            setTimeout(() => {
                showAlernone("d-none")
              }, "1500")           
        }
      async function Actualizar(){
       // console.log(Object.values(neweventos).every((d) => d))
        console.log(neweventos)
        let guarda ={
            ...neweventos,
            estado:"PROCESO",
            "LocalodadPrecios": localidadPreci
        }
        console.log(guarda)
        try {
        const actualiza = await ActualizarLocalidad(evento.codigoEvento,guarda)
         console.log(actualiza)
         Setshow(false)
         usedispatch(setToastes({show:true,message:'Datos de eventos Actalizados',color:'bg-success', estado:'Actualizado'}))            
        } catch (error) {
            console.log(error)
        }
           
        }

    useEffect(()=>{
        (async ()=>{
           // await Lista()
           // await  Listar()
        })()
       console.log(evento)
        setNewEventos(
            {nombreConcierto:evento.nombreConcierto?evento.nombreConcierto:'',
            fechaConcierto:evento.fechaConcierto?new Date(evento.fechaConcierto).toISOString().slice(0, 10):'',
            horaConcierto:evento.horaConcierto?evento.horaConcierto:'',
            lugarConcierto:evento.lugarConcierto?evento.lugarConcierto:'',
            cuidadConcert:evento.cuidadConcert?evento.cuidadConcert:'',
            descripcionConcierto:evento.descripcionConcierto?evento.descripcionConcierto:'',
            imagenConcierto:evento.imagenConcierto?evento.imagenConcierto:'',
            idUsuario:""+user.id,
            })
        setLocalidad(evento.LocalodadPrecios)
        },[show])
    return(
    <Modal
    show={show}
    size='lg'
    onHide={()=>Setshow(false)}
    >
        <Modal.Header > 
           <h5>Editar</h5> 
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
                                        <label className="form-label">Hora</label>
                                        <div className="input-group mb-3"> 
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                </div>
                                                <input type="time" className="form-control" id="horaConcierto" name="horaConcierto"
                                                value={moment(neweventos.horaConcierto, ["h:mm A"]).format("HH:mm")}
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                 placeholder="hora del evento"/>
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
                                                id="cuidadConcert"  placeholder="Ciudad "/>
                                               
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <label className="form-label">Descriptión </label>
                                        <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                    <i className="fa fa-bookmark"></i>
                                                    </span>
                                                </div>
                                                <input type="text" name="descripcionConcierto" className="form-control "
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                value={neweventos.descripcionConcierto}
                                                id="descripcionConcierto"  placeholder="Descriptión del concierto"/>
                                                
                                                                            </div>
                                        </div>
                                        

                                        <div className="col-12 col-md-12">
                                        <label className="form-label">Seleccione una imagen</label>
                                        <div className="input-group mb-3">
                                        
                                                <input type="file" accept="image/*" name="imagenConcierto" className="form-control "
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                id="imagenConcierto"  placeholder="Imagen del concierto"/>
                                                
                                                                            </div>
                                        </div>

                                        </div>
                                            
                                            
                                            <div className="input-group mb-3 d-none">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-dollar-sign"></i></span>
                                                </div>
                                                <input disabled={true} type="text" className="d-none form-control" id="user_id"  placeholder="usuario que creo el evento"/>
                                            </div>
                                       
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
                                                            <option value={e.localodad} key={i+"op"+e.localodad}>{e.localodad}</option>
                                                        )
                                                    })


                                                    }
                                                   
                                                </select>                                              
                                            </div>
                                            <div className="col-4">
                                                <button className="numero btn btn-success" onClick={(e)=>Agregarprecios()} disabled={!Object.values(precios).every((e)=>e)} >  Actualizar precios</button>
                                            </div>
                                            <div className="col-6">
                                            <Alert className={alertnone} variant="success">
                                                 Precios actualizados a la Localidad
                                               
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

                                        </div>



                                    </div>



                                    </div>
                                </div>
                                <div className="modal-footer"> 
                                <button type="button" className="btn btn-secondary close-btn" onClick={Actualizar} >Salir</button> 
                                <button className="btn btn-success" disabled={!Object.values(neweventos).every((d) => d)} onClick={Actualizar}>Editar</button>
                              
                     </div>
                                         
            
            </Modal.Body>   
                    

                                        
                        
                
    </Modal>)

}
export default Modalupdate