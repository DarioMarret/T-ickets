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
import { agregarNoticia, ListarNoticias, Actualizarpublicdad, Eliminarpublici } from "utils/PublicidadQuery";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { noticiasEvento } from "utils/Querypanelsigui";
import { columnPublicidad } from "utils/ColumnTabla";
import SweetAlert from "react-bootstrap-sweetalert";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useDispatch, useSelector } from "react-redux";
import { ListarEventos } from "utils/Querypanel";
export default function NoticiasView() {
    let usedispatch = useDispatch()
    let fechamin = new Date().toISOString().slice(0, -14);
    const [cargando, setCargando] = useState(false)
    const [Tipo, setTipo] = useState("Evento")
    const [show, setShowca] = useState(false)
    const [eventos, setEventos] = useState([])
    const [publicidad, setpublicidad] = useState([])
    const [img, setImg] = useState("");
    const [imgen, setimagen] = useState("");
    const [imgmovil, setImagenMo] = useState("");
    const [alert, setAlert] = useState(null)
    const [datos, setDatos] = useState({
        encabezado: '',
        descipcion: '',
        fechamax: '',
        link_img: '',
        mas: '',
        id: ''
    })
    const handelchange = (e) => {
        setTipo(e.value)
        setShowca(false)
        setImg("")
        setDatos({
            encabezado: '',
            descipcion: '',
            fechamax: '',
            link_img: '',
            mas: '',
            id: ''
        })
    }
    const handelchangeEvento = (e) => {
        setDatos({
            ...datos,
            encabezado: eventos.find(el => el.id == e.value).nombreConcierto,
            descipcion: eventos.find(el => el.id == e.value).descripcionConcierto,
            link_img: "",
            mas: { ...eventos.find(el => el.id == e.value) }
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        if (Object.values(Object.fromEntries(form.entries())).some(e => e)) {
            let { encabezado, descipcion, fechamax, mas } = Object.fromEntries(form.entries())
            if (Tipo != "Evento") {
                if (imgen == "" || ![encabezado, descipcion, fechamax, mas].some(e => e)) {
                    usedispatch(setToastes({ show: true, message: 'Complete todos los campos ', color: 'bg-warning', estado: 'información faltante' }))
                }
                else {
                    try {
                        setCargando(true)
                        let link = await Obtenerlinkimagen(imgen)
                        console.log(Object.fromEntries(form.entries()))
                        let { encabezado, descipcion, fechamax, mas } = Object.fromEntries(form.entries())
                        console.log(link)
                        setTimeout(async function () {
                            if (link == null) {
                                usedispatch(setToastes({ show: true, message: "La imagen tiene un peso de " + Math.floor(imgen.size / 1000000) + "MB", color: 'bg-warning', estado: 'Imagen demasiada pesada' }))
                                setCargando(false)
                                return
                            }                    
                            let mobil = await Obtenerlinkimagen(imgmovil)
                            setTimeout(async function(){
                                console.log(mobil)
                                let parametr = {
                                    "encabezado": encabezado,
                                    "descripcion": descipcion,
                                    "link_img": link,
                                    "fecha_presentacion": fechamax,
                                    "redirect": mobil
                                }
                                let carruse = await agregarNoticia(parametr)
                                Evento()
                                setCargando(false)
                            },3000)
                            
                        }, 3000)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            else if (Tipo == "Evento") {
                if (encabezado == "" || descipcion == "" || fechamax == "" || imgen == "" || imgmovil == "") {
                    usedispatch(setToastes({ show: true, message: 'Complete todos los campos ', color: 'bg-warning', estado: 'información faltante' }))
                }
                else {
                    try {
                        setCargando(true)
                        let link = await Obtenerlinkimagen(imgen)
                        let { encabezado, descipcion, fechamax } = Object.fromEntries(form.entries())
                        setTimeout(async function () {
                            let mobil = await Obtenerlinkimagen(imgmovil)
                            if (mobil) {
                                let datas = {
                                    "evento": datos.mas["codigoEvento"] + "-" + datos.mas["lugarConcierto"] + "-" + datos.mas["nombreConcierto"] + "-" + datos.mas["estado"],
                                    "encabezado": encabezado,
                                    "descripcion": descipcion,
                                    "link_img": link,
                                    "fecha_presentacion": fechamax,
                                    "redirect": mobil
                                }
                                console.log(datas)
                                let carruse = await noticiasEvento(datas)
                                Evento()
                                setCargando(false)
                            }
                        }, 3000)
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        } else {
            usedispatch(setToastes({ show: true, message: 'Complete todos los campos ', color: 'bg-warning', estado: 'información faltante' }))
        }
    }
    const onaPutbmit = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        let { encabezado, descipcion, fechamax, mas } = Object.fromEntries(form.entries())
        console.log(Object.fromEntries(form.entries()), imgen)
        if (!Object.values(Object.fromEntries(form.entries())).some(e => e)) {
            usedispatch(setToastes({ show: true, message: 'Complete todos los campos ', color: 'bg-warning', estado: 'información faltante' }))
            return
        }
        if (Tipo == "Evento") {
            try {
                if (imgen == "" || imgmovil == "" || ![encabezado, descipcion, fechamax, mas].some(e => e)) {
                    usedispatch(setToastes({ show: true, message: 'Complete todos los campos ', color: 'bg-warning', estado: 'información faltante' }))
                    return
                }
                else {
                    let link = await Obtenerlinkimagen(imgen)
                    if (link) {
                        let { encabezado, descipcion, fechamax } = Object.fromEntries(form.entries())
                        setTimeout(async function () {
                            let mobil = await Obtenerlinkimagen(imgmovil)
                            if (mobil) {
                                let parametr = {
                                    "evento": datos.mas["codigoEvento"] + "-" + datos.mas["lugarConcierto"] + "-" + datos.mas["nombreConcierto"] + "-" + datos.mas["estado"],
                                    "encabezado": encabezado,
                                    "descripcion": descipcion,
                                    "link_img": link,
                                    "fecha_presentacion": fechamax,
                                    "redirect": mobil
                                }
                                let noticia = await Actualizarpublicdad(parametr)
                                //    console.log("Eventos", parametr)
                                if (noticia.success) {
                                    setDatos({
                                        encabezado: '',
                                        descipcion: '',
                                        fechamax: '',
                                        link_img: '',
                                        mas: '',
                                        id: ''
                                    })
                                    setimagen("")
                                    usedispatch(setToastes({ show: true, message: 'Evento actualizados', color: 'bg-success', estado: 'Actualizado' }))
                                }
                            }
                        })

                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                if (imgen == "" || ![encabezado, descipcion, fechamax, mas].some(e => e)) {
                    usedispatch(setToastes({ show: true, message: 'Complete todos los campos ', color: 'bg-warning', estado: 'información faltante' }))
                    return
                }
                let link = await Obtenerlinkimagen(imgen)
                setTimeout(async () => {
                    let mobil = await Obtenerlinkimagen(imgmovil)
                    let parametr = {
                        "encabezado": encabezado,
                        "descripcion": descipcion,
                        "link_img": link,
                        "fecha_presentacion": fechamax,
                        "redirect": mobil
                    }
                    let actualizapublicida = await Actualizarpublicdad(datos.id, parametr)
                    // console.log(parametr)
                    Evento()
                    setDatos({
                        encabezado: '',
                        descipcion: '',
                        fechamax: '',
                        link_img: '',
                        mas: '',
                        id: ''
                    })
                    setimagen("")
                    usedispatch(setToastes({ show: true, message: 'Publicidad actualizada', color: 'bg-success', estado: 'Actualizado' }))

                }, 1000);

                //console.log("actualiza publicida", parametr)
            } catch (error) {
                console.log(error)
            }
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
        if (e.files) {
            let img = new Image()
            img.src = window.URL.createObjectURL(e.files[0])

            setImg(img.src)
            setimagen(e.files[0])
            let totalBytes = e.files[0].size;
            console.log(totalBytes)
            if (totalBytes < 1000000) {
                var _size = Math.floor(totalBytes / 1000) + 'KB';
                console.log(_size);
            } else {
                var _size = Math.floor(totalBytes / 1000000) + 'MB';
                console.log(_size);
            }
        }
        else {

            setImg("")
            setimagen("")
            setShowca(false)
        }
    }
    function handelchangeCompos(e) {
        if (e.files) {
            //  let img = new Image()
            //  img.src = window.URL.createObjectURL(e.files[0])

            //    setImg(img.src)
            setImagenMo(e.files[0])
            let totalBytes = e.files[0].size;
            console.log(totalBytes)
            if (totalBytes < 1000000) {
                var _size = Math.floor(totalBytes / 1000) + 'KB';
                console.log(_size);
            } else {
                var _size = Math.floor(totalBytes / 1000000) + 'MB';
                console.log(_size);
            }
        }
        else {

            //  setImg("")
            //   setimagen("")
            //  setShowca(false)
        }
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
                            value={datos.fechamax}
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
                <div className="col-6 ">
                    <label className=" form-label " > Imagen version movil  </label>
                    <div className="custom-file" >
                        <input className="  form-control" type="file"
                            name="redirect"
                            onChange={(e) => handelchangeCompos(e.target)}
                        />
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
                                    value={datos.fechamax}
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
                            <div className="col-6 ">
                                <label className=" form-label " > Imagen version movil  </label>
                                <div className="custom-file" >
                                    <input className="  form-control" type="file"
                                        name="redirect"
                                        onChange={(e) => handelchangeCompos(e.target)}
                                    />
                                </div>
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
            // console.log(oupt)
        }).catch(err => console.log(err))

    }
    function obtenervento(e) {
        console.log(e)
        /*{
            "id": 34,
                "evento": "CU1E1Q-Medio Estadio Atahualpa -ELADIO CARRION",
                    "encabezado": "ELADIO CARRION",
                        "descripcion": "Evento Bahia",
                            "link_img": "https://api.t-ickets.com/store/img/cabecera.png",
                                "fecha_presentacion": "2022-12-31",
                                    "redirect": ""
        }
         {
            "id": 35,
            "evento": null,
            "encabezado": "ELADIO CARRION",
            "descripcion": "Evento Bahia",
            "link_img": "https://api.t-ickets.com/store/img/cabecera.png",
            "fecha_presentacion": "2022-12-22",
            "redirect": ""
        }
        */
        if (e.evento == null) {
            setTipo("informativo")
            setDatos({
                encabezado: e.encabezado,
                descipcion: e.descripcion,
                fechamax: e.fecha_presentacion,
                link_img: e.link_img,
                mas: e.redirect,
                id: e.id
            })
        } else {
            setTipo("Evento")
            setDatos({
                encabezado: e.encabezado,
                descipcion: e.descripcion,
                fechamax: e.fecha_presentacion,
                link_img: e.link_img,
                mas: e.redirect,
                id: e.id
            })
        }
    }
    useEffect(() => {
        ListarEventos("").then(oupt => {
            setEventos(oupt.data.filter(e => e.estado == "PROCESO" || e.estado == "ACTIVO"))
            console.log(oupt.data.filter(e => e.estado == "PROCESO" || e.estado == "ACTIVO"))
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
                                {img != "" ? <div style={{
                                    backgroundImage: "url('" + img + "')",
                                    ...styleswiper.slideimg
                                }} >
                                </div> : ''}
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
                            <div className=" container-fuild">
                                <div className="d-flex  justify-content-end p-3">
                                    {img ? <button className=" btn btn-primary"
                                        onClick={() => setShowca(!show)}
                                    > <i className=" fa fa-eye"></i> </button> : ''}
                                </div>

                                <div className="  row ml-1 p-2">
                                    <form className="row " onSubmit={datos.id == "" ? onSubmit : onaPutbmit} >
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
                                        <div className="py-2 col-12 d-flex justify-content-end">
                                            {datos.id == "" ? <button className="btn btn-primary mx-1" disabled={cargando} >Guardar </button> :
                                                <button className="btn btn-primary mx-1"  >Actualizar </button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row>
                    <div >
                        {publicidad.length > 0 ? <div className="card " >
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
                                        <IconButton
                                            color="success"
                                            onClick={() => obtenervento(row.original)}
                                        >
                                            <Edit />

                                        </IconButton>
                                    </Box>
                                )}
                                positionToolbarAlertBanner="bottom"
                                localization={MRT_Localization_ES}
                            /> : ''}

                        </div> : ""}
                    </div>
                </Row>
            </Container>
        </>
    )

}