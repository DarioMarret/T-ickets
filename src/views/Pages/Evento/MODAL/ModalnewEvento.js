import React,{useEffect,useState} from "react";
import {Modal} from "react-bootstrap"
import { Localidades } from "utils/constantes";

const ModalNewEvento =(props)=>{
    const {show,Setshow} = props;
    //Array donde se crearan las localidades con sus precios
    const [localidadPreci,setPreLocalidad]=useState([])
    function toggleValueInArray(array, value) {
        let ArrayCopia=array;
        //console.log(array)
        var index = ArrayCopia.findIndex(obj => obj.Localidades==value.Localidades);
      //var index = array.indexOf(value);
      if (index == -1) {
        ArrayCopia.push(value);
      } else {
        ArrayCopia[index]={...value}     
      }
      console.log(ArrayCopia) 
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
      imagen:'link?',
      espacio_id:'',
      espacio:[]
    })
 function handelchangeComposeventos(e){
    setNewEventos({
        ...neweventos,
        [e.name]:e.value,
    })

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
            var index = Localidades.findIndex(obj => obj.id==e.value);
                console.log(Localidades[index])
                setLocalidad(Localidades[index].localidad)
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
           
        }

    useEffect(()=>{
       // console.log(neweventos)
       // console.log(selectLocalidad)
        
        },[show,toggleValueInArray])
    return(
    <Modal
    show={show}
    size='lg'
    onHide={()=>Setshow(false)}
    >
        <Modal.Header closeButton>    
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
                                                onChange={(e)=>handelchangeComposeventos(e.target)}
                                                placeholder="Nombre del evento" />
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                                </div>
                                                <input  className="form-control" id="fecha" name="fecha" type="date" placeholder="Fecha del evento"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                                </div>
                                                <input type="time" className="form-control" id="hora" name="hora" placeholder="hora del evento"/>
                                                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-map"></i></span>
                                                </div>
                                                <select className="form-control" name="localidad" onChange={(e)=>handelchange(e.target)} placeholder="Seleccione localidad">
                                                    <option value={""}>Seleccione localidad</option>
                                                    {Localidades.map((e,i)=>{
                                                    return(
                                                    <option value={e.id} key={i+"n"+e.id}>{e.nombre}</option>
                                                    )
                                                    })}
                                                    

                                                </select>
                                               
                                                                            </div>
                                        </div>
                                        
                                        
                                        

                                        <div className="col-12 col-md-12">
                                        <label className="form-label">Seleccione una imagen</label>
                                        <div className="input-group mb-3">
                                        
                                                <input type="file" accept="image/*" className="form-control " id="imagen"  placeholder="Imagen del concierto"/>
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
                                                    <label >PRECIO DECUNTO </label>
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
                                                            <button disabled={!Object.values(neweventos).every(e=>e)} className="btn btn-primary close-modal">Grabar</button>
                                                    </div>
                                         
            
            </Modal.Body>   
                    

                                        
                        
                
    </Modal>)

}
export default ModalNewEvento