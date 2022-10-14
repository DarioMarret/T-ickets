import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Accordion } from "react-bootstrap"
import { ListarEventos } from "utils/Querypanel"
import { EliminareventoLocalidad } from "utils/Querypanel"
import Modalupdate from "./ModalupdateEvento"


const EventoEspecifico=()=>{
    let {id} =useParams()
    const[show,setShow] = useState(false)
    const [precios,SetPrecios]=useState([])
    const [evento,SetEvento] = useState({
        id: '',
        nombreConcierto: '',
        fechaConcierto: '',
        horaConcierto: '',
        lugarConcierto:'',
        cuidadConcert: '',
       descripcionConcierto: '',
        imagenConcierto: '',
        idUsuario:'',
        estado: '',
        codigoEvento: '',
        fechaCreacion: '',
        LocalodadPrecios: []
    })
    console.log(id)
    async function Eliminar(e,f){
       const elimnar = await EliminareventoLocalidad(e,f)
        
       console.log(elimnar,e,f)

    }
    async function Evento(){
        try {
            const cargar = await ListarEventos("PROCESO")
            console.log(cargar)
            if(cargar.success){ SetEvento({...cargar.data})
            SetPrecios(cargar.data.LocalodadPrecios)
        }
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        (async()=>{
            await Evento()
        })()

    },[])
        return(
            <>
            <div className="conatiner row">
            <div className="row mx-auto p-0">
                <div className="col-12 col-lg-4 mx-auto my-5" id="evento2">
                  <p>
                    <div className="container rounded-7 shadow-md px-0">
                      <img src={'http://localhost:3000/static/media/gpiminel.7e0ffaa26c9a5de2f66a.jpeg'} className="img-fluid rounded-7 shadow-md " alt="" />
                    </div>
                  </p>
                  <div className=" container mt-4 px-0" id="collapseExample2">
                    <div className="card card-body rounded-7 py-5">
                      <div className="container">
                        <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">{evento.nombreConcierto}</span> </h1>
                        <h4 style={{ fontSize: '1.4em' }}><span id="tour">{evento.descripcionConcierto} </span></h4>
                        <div className="col-12 border border-bottom my-3"></div>
                        <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento"> {evento.fechaConcierto}</span></p>
                        <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento">{evento.lugarConcierto}</span></p>
                       <p                           
                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => setShow(true)} >Editar</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8 mx-auto my-5" id="evento4">
                     <Accordion defaultActiveKey="0" flush>
                        {precios.length>0?
                        precios.map((e,i)=>{
                            return(
                                <Accordion.Item eventKey={i} key={i}>
                            <Accordion.Header>Localidad: {e.localodad}</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex flex-row  justify-content-between">
                                <div className="d-flex flex-column">
                                <div>
                                    <h5>
                                        Precio normal : {e.precio_normal}
                                    </h5>
                                </div>
                                <div>
                                    <h5>
                                        Precio discapacida : {e.precio_discapacidad}
                                    </h5>
                                </div>
                                <div>                            
                                    <h5>
                                        Precio TC/TD : {e.precio_tarjeta}
                                    </h5>
                                </div>
                                <div>
                                <h5>
                                    Precio Descuento : {e.precio_descuento}
                                </h5>
                                </div>
                                <div>
                                    <h5>
                                    Habilitar Cortesia : {e.habilitar_cortesia}
                                    </h5>
                                 </div>    
                                </div>
                                <div className="d-flex flex-column ">
                                    <button className="btn btn-danger"
                                    onClick={()=>Eliminar(e.codigoEvento,e.id)}
                                    >Eliminar </button>
                                    <button className="d-none btn btn-success">Editar </button>
                                </div>
                                </div>
                                
                          
                            </Accordion.Body>
                        </Accordion.Item>
                       

                            )
                        })
                        :''
                        
                        }
                        
                        </Accordion>
                </div>
              </div>
            </div>
            <Modalupdate
             show={show}
             Setshow={setShow}
             evento={evento}
            />

            </>
        )


}

export default EventoEspecifico