import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ListarEspacios } from "utils/EspaciosQuery";
export default function ModalcreaEventoView() {
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
            "id_username": 0,
            "id_estado": 0,
            "mapaConcierto": ""
        }
    )
    const [espacios, setListaEspa] = useState([])
    const [promotor,setPromotor]= useState([])
    const [estados,setEstados]=useState([])
    function handelchangeComposeventos(e) {
        let img = new Image()
        if (e.name == "imagenConcierto") {
            // setNewEventos({ ...neweventos, imagenConcierto: e.files[0] ? e.files[0] : '' })
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
            //  setNewEventos({ ...neweventos, mapaConcierto: e.files[0] ? e.files[0] : '' })
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
        } else if (e.name == "autorizacion") {
            /* setNewEventos({
                 ...neweventos,
                 [e.name]: e.value,
                 codigo: e.value == "preventa" ? 'preventa' : '',
             })*/
        }
        else {
            /* setNewEventos({
                 ...neweventos,
                 [e.name]: e.value,
             })*/
        }
    }
    useEffect(()=>{
        ListarEspacios().then(salida=>{
            console.log(salida)
            if(salida.data>0){
                setListaEspa(salida.data)
            }
        }).catch(err=>{
            console.log(err)
        })
    },[])
    return (

        <Modal
            show={true}
            size='lg'
        >
            <Modal.Header>
                <button className="close">x</button>
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
                                                        <option value={e.id} key={i + "n" + e.id}>{e.nombre}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
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
                                    <div className="col-12 col-md-6">
                                        <label className="form-label"> {true ? "Hay un mapa Cargada " : "Subir imagen del mapa"}</label>
                                        <div className="input-group mb-3">

                                            <input type="file" accept="image/*" name="mapaConcierto" className="form-control "
                                                onChange={(e) => handelchangeComposeventos(e.target)}
                                                id="mapaConcierto" placeholder="Imagen del mapa" />

                                        </div>
                                    </div>
                                </div>
                                <div className=" d-flex justify-content-end">
                                    <button className="btn btn-success">Guardar</button>
                                </div>
                            </div>



                        </div>
                    </div>


                </Modal.Body>

            </Modal.Body>
        </Modal>

    )
}