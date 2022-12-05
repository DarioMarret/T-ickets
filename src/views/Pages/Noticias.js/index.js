import { useEffect } from "react"
import { useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send } from '@mui/icons-material';

import { Container, Row } from "react-bootstrap"
import { EventosActivos } from "utils/Querypanel"
import { styleswiper } from "../Flasdeticket/styleswiper"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import { carrusel } from "../Flasdeticket/imagenstatctic"
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { columnsTicket } from "utils/ColumnTabla";
export default function NoticiasView() {

    const imagenes = {
        22: carrusel.principal,
        20: carrusel.secundaria
    }
    let fechamin = new Date().toISOString().slice(0, -14);
    const [Tipo, setTipo] = useState("Evento")
    const [show, setShowca] = useState(false)
    const [eventos, setEventos] = useState([])
    const [img, setImg] = useState("")
    const [datos, setDatos] = useState({
        encabezado: '',
        descipcion: '',
        fechamax: ''
    })
    const handelchange = (e) => {
        setTipo(e.value)
        setShowca(false)
        setImg("")
    }
    const handelchangeEvento = (e) => {
        setImg(imagenes[e.value])

    }
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(e)
    }
    const handelchangedatos = (e) => {
        setDatos({
            ...datos,
            [e.name]: e.value
        })

    }
    function handelchangeComposeventos(e) {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.files[0])
        setImg(img.src)
    }
    useEffect(() => {
        EventosActivos().then(oupt => {
            setEventos(oupt.data)
            console.log(oupt)
        }).catch(err => console.log(err))

    }, [])


    return (
        <>
            <Row className={show ? "" : "d-none" + " container-fluid pb-2 "}>
                <Swiper >
                    <SwiperSlide>
                        <div style={{ width: "100%", height: "400px" }}>
                            <div className="slide-image" style={{
                                position: "relative",
                                width: "100%",
                                height: "400px",
                            }}>
                                <div style={{
                                    backgroundImage: "url('" + img + "')",
                                    ...styleswiper.slideimg
                                }} >
                                </div>
                                <div style={styleswiper.fondo}>
                                </div>
                                <div className="descripciones ">

                                    <div className="d-flex  flex-column text-white" >
                                        <div className="py-3 d-none d-sm-block   ">
                                            <div className=" row d-flex  align-items-center p-1">
                                                <i className="fa fa-volume-off fa-3x  col-2 ">  </i>
                                                <h5 className="col-10 px-1 pt-2"
                                                    style={{
                                                        fontSize: '0.9em'
                                                    }}
                                                >EVENTO -  <span className=" text-danger font-weight-bold"> PRESENCIAL </span> </h5>
                                            </div>

                                        </div>
                                        <div className="d-block d-sm-none" >
                                            <div className="d-flex flex-row justify-content-center text-center">
                                                <i className="fa fa-volume-off fa-1x"> </i>
                                                <h5 className=" px-0"
                                                    style={{
                                                        fontSize: '0.9em'
                                                    }}
                                                >EVENTO -  <span className=" text-danger font-weight-bold"> PRESENCIAL </span> </h5>
                                            </div>
                                        </div>
                                        <h4 className=" " style={styleswiper.titulo}>{datos.encabezado} </h4>
                                        <span style={styleswiper.subtitulo}>
                                            {datos.descipcion}
                                        </span>
                                        <div className="pt-2 ">
                                            <button className="btn border rounded-1  btn-lg btn-outline-light "
                                                style={styleswiper.button}
                                            >VER MÁS</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>

            </Row>
            <Container fluid className="pt-3">
                <Row>
                    <div className="">
                        <div className="card">
                            <div className="d-flex  justify-content-end p-3">
                                {img ? <button className=" btn btn-primary"
                                    onClick={() => setShowca(!show)}
                                > <i className=" fa fa-eye"></i> </button> : ''}
                            </div>

                            <div className="row p-2">
                                <form className="row " onSubmit={onSubmit} >
                                    <div className="col-md-12">
                                        <div className="col-6 px-0">
                                            <label className="form-label">Tipo de noticia </label>
                                            <select className="form-select" value={Tipo} onChange={(e) => handelchange(e.target)} required>
                                                <option value="Evento">Evento </option>
                                                <option value={"informativo"}>Informativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    {Tipo != "Evento" ? <div className="row">
                                        <div className="col-6">
                                            <label className="form-label">Encabezado </label>

                                            <div className="input-group mb-3">

                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fab fa-leanpub"></i></span>
                                                </div>

                                                <input type="text"
                                                    className="form-control numero"
                                                    name="encabezado"
                                                    value={datos.encabezado}
                                                    onChange={(e) => handelchangedatos(e.target)}
                                                />  </div>
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label" >Breve descripción </label>
                                            <div className=" input-group mb-3">
                                                <div className="   input-group-append ">
                                                    <span className=" input-group-text" > <i className="fab fa-leanpub "></i></span>
                                                </div>
                                                <input className=" form-control"
                                                    name="descipcion"
                                                    value={datos.descipcion}
                                                    onChange={(e) => handelchangedatos(e.target)}
                                                ></input>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="row" >
                                                <div className="col-6">
                                                    <label className=" form-label " > Imagen del Evento </label>
                                                    <div className="custom-file" >
                                                        <input className="  form-control" type="file"
                                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <label className=" form-label">Fecha maxima de presentación</label>
                                                    <div className=" input-group mb-3">
                                                        <div className=" input-group-append ">
                                                            <span className=" input-group-text "><i className=" fa fa-calendar "></i></span>
                                                        </div>
                                                        <input className=" form-control"
                                                            name="fechamax"
                                                            min={fechamin}
                                                            type="date"
                                                            onChange={(e) => handelchangedatos(e.target)}

                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div> :
                                        <div className="row ">
                                            <div className="row col-12">
                                                <div className="col-6 ">
                                                    <label className="form-label">Seleccione un evento </label>

                                                    <div className="input-group mb-3">

                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                                                        </div>

                                                        <select className="form-select" defaultValue={""} onChange={(e) => handelchangeEvento(e.target)} >
                                                            <option disabled value="">Seleccione el el evento </option>
                                                            {
                                                                eventos.length > 0 ? eventos.map((el, i) => {
                                                                    return (
                                                                        <option key={i} value={el.id} >{el.nombreConcierto}</option>
                                                                    )
                                                                }) : ''

                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row " >
                                                <div className="col-6">
                                                    <label className="form-label">Encabezado </label>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fab fa-leanpub"></i></span>
                                                        </div>
                                                        <input type="text"
                                                            className="form-control numero"
                                                            name="encabezado"
                                                            value={datos.encabezado}
                                                            onChange={(e) => handelchangedatos(e.target)}
                                                        />  </div>
                                                </div>
                                                <div className="col-6">
                                                    <label className="form-label" >Breve descripción </label>
                                                    <div className=" input-group mb-3">
                                                        <div className="   input-group-append ">
                                                            <span className=" input-group-text" > <i className="fab fa-leanpub "></i></span>
                                                        </div>
                                                        <input className=" form-control"
                                                            name="descipcion"
                                                            value={datos.descipcion}
                                                            onChange={(e) => handelchangedatos(e.target)}
                                                        ></input>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row" >
                                                <div className="col-6">
                                                    <label className=" form-label " > Imagen del Evento </label>
                                                    <div className="custom-file" >
                                                        <input className="  form-control" type="file"
                                                            onChange={(e) => handelchangeComposeventos(e.target)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <label className=" form-label">Fecha maxima de presentación</label>
                                                    <div className=" input-group mb-3">
                                                        <div className=" input-group-append ">
                                                            <span className=" input-group-text "><i className=" fa fa-calendar "></i></span>
                                                        </div>
                                                        <input className=" form-control"
                                                            name="fechamax"
                                                            min={fechamin}
                                                            type="date"
                                                            onChange={(e) => handelchangedatos(e.target)}

                                                        ></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    }
                                    <div className="col-12 d-flex justify-content-end">
                                        <button className="btn btn-primary mx-1"  >Guardar</button>
                                    </div>
                                </form>


                            </div>

                        </div>

                    </div>
                </Row>
                <Row>
                    <div >
                        <div className="card">
                            <div className="  card-header">
                                <h5>Eventos del carrusel</h5>

                            </div>
                            <MaterialReactTable
                                columns={columnsTicket}
                                data={[]}
                                localization={MRT_Localization_ES}
                            />

                        </div>
                    </div>
                </Row>

            </Container>
        </>
    )

}