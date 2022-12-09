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
import { agregarNoticia } from "utils/Querypanelsigui";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { noticiasEvento } from "utils/Querypanelsigui";
import { ListarNoticias } from "utils/Querypanelsigui";
import { columnPublicidad } from "utils/ColumnTabla";
import { Eliminarpublici } from "utils/Querypanelsigui";
import SweetAlert from "react-bootstrap-sweetalert";
export default function NoticiasView() {
    const imagenes = {
        22: carrusel.principal,
        20: carrusel.secundaria
    }
    let fechamin = new Date().toISOString().slice(0, -14);
    const [Tipo, setTipo] = useState("Evento")
    const [show, setShowca] = useState(false)
    const [eventos, setEventos] = useState([])
    const [publicidad, setpublicidad] = useState([])
    const [img, setImg] = useState("")
    const [alert, setAlert] = useState(null)
    const [datos, setDatos] = useState({
        encabezado: '',
        descipcion: '',
        fechamax: '',
        link_img: '',
        mas: ''
    })
    const handelchange = (e) => {
        setTipo(e.value)
        setShowca(false)
        setImg("")
    }
    const handelchangeEvento = (e) => {
        console.log(eventos.find(el => el.id == e.value))
        setImg(eventos.find(el => el.id == e.value).imagenConcierto)
        setDatos({
            ...datos,
            encabezado: eventos.find(el => el.id == e.value).nombreConcierto,
            descipcion: eventos.find(el => el.id == e.value).descripcionConcierto,
            link_img: eventos.find(el => el.id == e.value).imagenConcierto,
            mas: { ...eventos.find(el => el.id == e.value) }

        })
        // setImg(imagenes[e.value])

    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        try {
            if (Object.values(Object.fromEntries(form.entries())).some(e => e)) {

                if (Tipo != "Evento") {
                    if (img == "") {
                        console.log("llenar datos")
                    }
                    else {
                        let link = await Obtenerlinkimagen(img)
                        console.log(Object.fromEntries(form.entries()))
                        let { encabezado, descipcion, fechamax, mas } = Object.fromEntries(form.entries())
                        let paramet = {
                            "encabezado": encabezado,
                            "descripcion": descipcion,
                            "link_img": link,
                            "fecha_presentacion": fechamax,
                            "redirect": mas
                        }
                    }
                    Evento()
                    let carruse = await agregarNoticia(paramet)
                    console.log(link, carruse)
                }
                else {
                    if (datos.mas == "" && datos.link_img == "") {
                        console.log("llenar datos")
                    }
                    else {
                        let { encabezado, descipcion, fechamax } = Object.fromEntries(form.entries())
                        console.log(Object.values(Object.fromEntries(form.entries())).some(e => e), Object.fromEntries(form.entries()))
                        let datas = {
                            "evento": datos.mas["codigoEvento"] + "-" + datos.mas["id"],
                            "encabezado": encabezado,
                            "descripcion": descipcion,
                            "link_img": datos.link_img,
                            "fecha_presentacion": fechamax,
                            "redirect": ''
                        }
                        console.log(datas)
                        let carruse = await noticiasEvento(datas)
                        Evento()
                        console.log(carruse)
                    }
                }
            } else {
                console.log("vacio")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handelchangedatos = (e) => {
        setDatos({
            ...datos,
            [e.name]: e.value
        })

    }
    function EliminaNoticias(e) {
        Eliminarpublici(e).then(oupt => {
            console.log(oupt)
            Evento()
            hideAlert()
        }).catch(err => {
            console.log(err)
        })
    }
    const successAlert = (e) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Estas Seguro de eliminar?"
                onConfirm={() => EliminaNoticias(e)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showCancel

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                Se Borraran este evento
            </SweetAlert>
        );
    };
    const hideAlert = () => setAlert(null)
    function handelchangeComposeventos(e) {
        let img = new Image()
        img.src = window.URL.createObjectURL(e.files[0])
        setImg(e.files[0])
    }
    const tipoevento = {
        Evento: <div className="row ">
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

            <div>
            </div>
        </div>,

        informativo:
            <div className="row">
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
                                    name="imagen-even"
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
                    <div className="row" >
                        <div className="col-12">
                            <label className="form-label"> Boton Ver información  </label>
                            <div className=" input-group mb-3">
                                <div className=" input-group-append ">
                                    <span className=" input-group-text "><i className="fa fa-info "></i></span>
                                </div>
                                <input className="  form-control"
                                    name="mas"
                                    value={datos.mas}
                                    onChange={(e) => handelchangedatos(e.target)}
                                />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
    }
    const tipobutton = {
        informativo: <button className="btn border rounded-1  btn-lg btn-outline-light "
            style={styleswiper.button}>VER Infomación</button>,
        Evento: <button className="btn border rounded-1  btn-lg btn-outline-light "
            style={styleswiper.button}>VER MÁS</button>,
        publicidad: <a className="btn border rounded-1  btn-lg btn-outline-light "
            style={styleswiper.button}
            href={datos.mas}
            target="_blank"
        >VER MÁS</a>
    }
    function Evento() {
        ListarNoticias().then(oupt => {
            setpublicidad(oupt.data)
            console.log(oupt)
        }).catch(err => console.log(err))

    }
    useEffect(() => {
        EventosActivos().then(oupt => {
            setEventos(oupt.data)
            console.log(oupt)
        }).catch(err => console.log(err))
        Evento()
    }, [])
    return (
        <>
            {alert}
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


                                            {tipobutton[Tipo]}
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
                                            <div className=" input-group mb-3">
                                                <div className="   input-group-append ">
                                                    <span className=" input-group-text" > <i className="fa fa-question "></i></span>
                                                </div>
                                                <select className="form-select" value={Tipo} onChange={(e) => handelchange(e.target)} required>
                                                    <option value="Evento">Evento </option>
                                                    <option value={"informativo"}>Informativo</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        tipoevento[Tipo]
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
                            {publicidad.length > 0 ? <MaterialReactTable
                                columns={columnPublicidad}
                                data={publicidad}
                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'fixed'
                                    }
                                }}
                                enableRowActions
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex' }}>
                                        <IconButton
                                            color="error"
                                            onClick={() => successAlert(row.original.id)}
                                        >
                                            <Delete />
                                        </IconButton>


                                    </Box>
                                )}
                                positionToolbarAlertBanner="bottom"
                                localization={MRT_Localization_ES}
                            /> : ''}

                        </div>
                    </div>
                </Row>

            </Container>
        </>
    )

}