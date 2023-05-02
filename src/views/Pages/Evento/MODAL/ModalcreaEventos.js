import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { ListarEspacios } from "utils/EspaciosQuery";
import { CrearEvento } from "utils/EventosQuery";
import {listar_promotores} from "utils/PromotorQuerys"
import { ObtenerEstadosforEventos } from "utils/QueryUser";
import { Obtenerlinkimagen } from "utils/Querypanel";
export default function ModalcreaEventoView() {
    let user = clienteInfo()
    let modal = useSelector(state=>state.SuscritorSlice.modal)
    const [evento, setEventos] = useState(
        {
            "nombreConcierto": "",
            "fechaConcierto": "",
            "horaConcierto": "",
            "lugarConcierto": "",
            "cuidadConcert": "",
            "descripcionConcierto": "",
            "imagenConcierto": "",
            "id_espacio": 0,
            "promotor_eventosId": 0,
            "id_username": user.id,
            "id_estado": 0,
            "mapaConcierto": ""
        }
    )
    const [espacios, setListaEspa] = useState([])
    const [promotor,setPromotor]= useState([])
    const [estados,setEstados]=useState([])
    const [disable,setdisable]=useState(false)
    function handelchangeComposeventos(e) {
        let img = new Image()
        if (e.name == "imagenConcierto") {
            setEventos({
                ...evento, imagenConcierto: e.files[0] ? e.files[0] : '' })
            /* 
             img.src = window.URL.createObjectURL(e.files[0])
             img.onload = () => {
                 setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })
                  if (img.width < 750 || img.height < 500) {
                      e.value = ""
                      usedispatch(setToastes({ show: true, message: 'La dimensión de la imagen no es validad, necesita un alto mínimo de 500px y máximo 600px, un ancho mínimo de 750px y máximo de 900px', color: 'bg-warning', estado: 'Advertencia' }))
                  }
                  if (img.width > 900 || img.height > 620) {
                      e.value = ""                                                                                                    // alto de 3662px y un ancho minimo de 13830px
                      usedispatch(setToastes({ show: true, message: 'La dimensión de la imagen no es validad, necesita un alto mínimo de 3662px y máximo 3762px, un ancho mínimo de 750px y máximo de 900px', color: 'bg-warning', estado: 'Advertencia' }))
                  } else setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })
             }
             img.onerror = () => {
                 setNewEventos({ ...neweventos, imagenConcierto: '' })
             }*/
        } else if (e.name == "mapaConcierto") {
            setEventos({...evento, mapaConcierto: e.files[0] ? e.files[0] : '' })
            /* 
              img.src = window.URL.createObjectURL(e.files[0])
              img.onload = () => {
                  setNewEventos({ ...neweventos, mapaConcierto: e.files[0] ? e.files[0] : '' })
                  /* if (img.width < 13830 || img.height < 3662) {
                       e.value = ""
                       setNewEventos({ ...neweventos, imagenConcierto: '' })
                       usedispatch(setToastes({ show: true, message: 'Las dimensión de la imagen no es validad, necesita un alto de 3662px y un ancho minimo de 13830px', color: 'bg-warning', estado: 'Advertencia' }))
                   }
                   else setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })*
              }
              img.onerror = () => {
                  setNewEventos({ ...neweventos, mapaConcierto: '' })
              }*/
        } 
        else {
             setEventos({
                 ...evento,
                 [e.name]: e.value,
             })
        }
    }
    function handelchange(e){
        setEventos({
            ...evento,
            [e.name]: e.value,
        })
    }
    let usedispatch = useDispatch();
  async  function Guardar(){
        console.log(evento)
      if (Object.values(evento).some(e => e == "")) {
          usedispatch(setToastes({
              show: true,
              message: "Falta información por completar",
              color: 'bg-primary',
              estado: "Campos vacios"
          }))
          return
      }
      if (evento.imagenConcierto == undefined || evento.imagenConcierto=="") {
          usedispatch(setToastes({ show: true, message: 'Adjunte una imagen del   Evento', color: 'bg-danger', estado: 'Datos vacios' }))
          return
      }
      if (evento.mapaConcierto == undefined || evento.mapaConcierto == "")  {
          usedispatch(setToastes({ show: true, message: 'Adjunte una imagen del al  Evento', color: 'bg-danger', estado: 'Datos vacios' }))
          return
      }
      setdisable(true)
      Obtenerlinkimagen(evento.imagenConcierto).then(img=>{
        if(img!=null){
            Obtenerlinkimagen(evento.mapaConcierto).then(imgdos=>{
                if(imgdos!=null){
                    let parms={
                        ...evento,
                        imagenConcierto:img,
                        mapaConcierto: imgdos
                    }
                    CrearEvento(parms).then(output => {
                        console.log(output)
                        usedispatch(setModal({ nombre:"Modalpreciolocalidad",estado:output.data}))
                        setdisable(false)
                    }).catch(err => {
                        setdisable(false)
                        console.log(err)
                    })
                }
            }).catch(err=>{
                setdisable(false)
                console.log(err)
            })
        }
      }).catch(err=>{
        setdisable(false)
        console.log(err)
      })
      
    }
    
    useEffect(()=>{
        ListarEspacios().then(salida=>{
            //console.log(salida)
            if (salida.data.length >0){
                setListaEspa(salida.data)
            }
        }).catch(err=>{
            console.log(err)
        })
        listar_promotores().then(output=>{
            if (output.message.length>0){
                setPromotor(output.message)
            }
            //console.log(output)
        }).catch(errr=>{
            console.log(errr)
        })
        ObtenerEstadosforEventos().then(output=>{
            if(output.data.length>0){
                setEstados(output.data)

            }
            console.log(output)
        }).catch(err=>{
            console.log(err)
        })
            
    }, [(modal.nombre =="ModalcreaEventoView")])
    return (

        <Modal
            show={(modal.nombre == "ModalcreaEventoView")}
            size='lg'
        >
            <Modal.Header>
                <button className="close" onClick={(e)=> usedispatch(setModal({nombre:"",estado:""}))}  >x</button>
            </Modal.Header>
            <Modal.Body>
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
                                                value={evento.nombreConcierto}
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                placeholder="Nombre del evento" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-calendar"></i></span>
                                            </div>
                                            <input className="form-control" id="fechaConcierto" name="fechaConcierto"
                                            value={evento.fechaConcierto}
                                                type="date"
                                                onChange={(e) => handelchangeComposeventos(e.target)} placeholder="Fecha del evento" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-clock"></i></span>
                                            </div>
                                            <input type="time" className="form-control" id="horaConcierto" name="horaConcierto"
                                                value={evento.horaConcierto}
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                placeholder="hora del evento" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-map"></i></span>
                                            </div>
                                            <select className="form-control" name="id_espacio" id="id_espacio" onChange={(e) => handelchange(e.target)} placeholder="Seleccione localidad">
                                                <option value={""}>Seleccione espacio</option>
                                                {espacios.map((e, i) => {
                                                    return (
                                                        <option value={e.id} key={i + "n" + e.id}>{e.nombre}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-map"></i></span>
                                            </div>
                                            <select className="form-control" name="promotor_eventosId" id="promotor_eventosId" onChange={(e) => handelchange(e.target)} placeholder="Seleccione localidad">
                                                <option value={""}>Seleccione el promotor</option>
                                                {promotor.map((e, i) => {
                                                    return (
                                                        <option value={e.id} key={i + "n" + e.id}>{e.promotor}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-map"></i></span>
                                            </div>
                                            <select className="form-control" name="id_estado" id="id_estado" onChange={(e) => handelchange(e.target)} placeholder="Seleccione localidad">
                                                <option value={""}>Seleccione el estado</option>
                                                {estados.map((e, i) => {
                                                    return (
                                                        <option value={e.id} key={i + "n" + e.id}>{e.estado}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Descriptión</label>
                                        <div className="input-group mb-3">
                                           <input type="text" name="descripcionConcierto" className="form-control "
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                id="descripcionConcierto" placeholder="Descriptión del concierto" />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Lugar</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-map"></i></span>
                                            </div>
                                            <input type="text" name="lugarConcierto" className="form-control "
                                               value={evento.lugarConcierto}
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">Ciudad </label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-map"></i></span>
                                            </div>
                                            <input type="text" name="cuidadConcert" className="form-control "
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                id="cuidadConcert" placeholder="ciudad del concierto" />
                                        </div>
                                    </div>      
                                    <div className="col-12 col-md-6">
                                        <label className="form-label">
                                            {true ? "Hay una imagen Cargada " : "Seleccione una imagen"}</label>
                                        <div className="input-group mb-3">

                                            <input type="file" accept="image/*" name="imagenConcierto" className="form-control "
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                id="imagenConcierto" placeholder="Imagen del concierto" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12">
                                        <label className="form-label"> {true ? "Hay un mapa Cargada " : "Subir imagen del mapa"}</label>
                                        <div className="input-group mb-3">

                                            <input type="file" accept="image/*" name="mapaConcierto" className="form-control "
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                id="mapaConcierto" placeholder="Imagen del mapa" />

                                        </div>
                                    </div>
                                </div>
                                <div className=" d-flex justify-content-end">
                                    <button className="btn btn-success"  disabled={disable}  onClick={Guardar} >Guardar</button>
                                </div>
                            </div>



                        </div>
                    </div>


                </Modal.Body>

            </Modal.Body>
        </Modal>

    )
}