import { useEffect, useState, useRef } from "react";
import { ListarTikets } from "utils/Querypanel";
import { Row, Card, Col, } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { listarpreciolocalidad, ListarLocalidad } from "utils/Querypanel";
import { LimpiarLocalStore, Limpiarseleccion } from "utils/CarritoLocalStorang";
import { cargarEventoActivo, cargarMapa } from "utils/Querypanelsigui";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { cargalocalidad, clearMapa } from "StoreRedux/Slice/mapaLocalSlice";
import { borrarseleccion } from "StoreRedux/Slice/sillasSlice";
import { Eventoid, listaasiento } from "utils/constantes";
import ModalCarritoView from "./Modal/ModalCarritoadmin";
import ModalPago from "views/Components/MODAL/ModalPago";
import ModalLocalidamapViews from "./Modal/ModalloaclidadAdmin"
import ModalDetalle from "./Modal/ModalDetalle";
import ModalEfectivo from "./Modal/Modalefectivo";
import Reporte from "./Modal/ModalDeposito";
import ListaSuscritor from "./Modal/Modalselectsunscritor";
import "swiper/css/effect-flip";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import { EffectFlip, Pagination, Navigation, EffectCards } from "swiper";
import SweetAlert from "react-bootstrap-sweetalert";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import 'moment-timezone'
import 'moment/locale/es';
import de from "date-fns/locale/de/index";
import { DatosUsuarioLocalStorang } from "utils/constantes";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
require('moment/locale/es.js')
export default function StoreTickesViews() {
    let usedispatch = useDispatch()
    let modalshow = useSelector((state) => state.SuscritorSlice)
    const [Eventos, setEvento] = useState([])
    const [showMapa, setMapashow] = useState(false);
    const [showshop, handleClosesop] = useState(false);
    const [repShop, setrepShow] = useState(false);
    const [showDetalle, setDetalle] = useState(false)
    const [efectShow, efectiOpShow] = useState(false);
    const [modalPago, setModalPago] = useState(false);
    const [precios, setPrecios] = useState({ precios: [], pathmapa: [], mapa: '' })
    const [datos, setDatoscon] = useState([])
    const [listarCarritoDetalle, setListarCarritoDetalle] = useState([])
    const [intervalo, setcrono] = useState("")
    const [alert, setAlert] = useState(null);
    const handleContinuar = () => {
        handleClosesop(false)
        setDetalle(true)
    }
    const handleDetalleColse = () => {
        setDetalle(false)
        handleClosesop(true)
    }
    const handleefectivoClose = () => {
        efectiOpShow(false)
        setDetalle(true)
    };
    const [info, setInfo] = useState({ Ticket: 0, Activos: 0, Venta: 0, })
    const intervalRef = useRef(null);
    function velocidad() {
        let timer = 0
        var tiempo = 60 * 3
        timer = tiempo
        var minutos = 0, segundos = 0;
        intervalRef.current = setInterval(function () {
            minutos = parseInt(timer / 60, 10);
            segundos = parseInt(timer % 60, 10);
            minutos = minutos < 10 ? "0" + minutos : minutos;
            segundos = segundos < 10 ? "0" + segundos : segundos;
            if (timer === 0) {
                clearInterval(intervalRef.current);
                usedispatch(setToastes({ show: true, message: 'El tiempo de compra a finalizado', color: 'bg-danger', estado: 'Mensaje importante', }))
                handleClosesop(false)
                setMapashow(false)
                setDetalle(false)
                efectShow(false)
                Limpiarseleccion()
                LimpiarLocalStore()
                usedispatch(clearMapa({}))
                usedispatch(borrarseleccion({ estado: "seleccionado" }))
                $(".Mesa").removeClass("mesaocupado").addClass("mesadisponible")
                $(".Mesa").removeClass("mesareserva")
            }
            else {
                setcrono(minutos + ":" + segundos)
                if (--timer < 0) timer = tiempo;
            }
        }, 1000);
    }
    function detenervelocidad() {
        handleClosesop(false)
        clearInterval(intervalRef.current)
        setMapashow(false)
        setDetalle(false)
        Limpiarseleccion()
        LimpiarLocalStore()
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
    }
    function para() {
        clearInterval(intervalRef.current)
    }
    const handlereportColse = async () => {
        setrepShow(false)
        setDetalle(true)
    };
    const hideAlert = () => {
        setAlert(null);
    };
    const borrar = async (e) => {
        try {
            setPrecios({
                precios: [],
                pathmapa: [],
                mapa: ''
            })

            LimpiarLocalStore()
            usedispatch(borrarseleccion({ vacio: [] }))
            sessionStorage.setItem(listaasiento, JSON.stringify([]))
            let obten = await listarpreciolocalidad(e.codigoEvento)
            sessionStorage.consierto = e.nombreConcierto
            const listalocal = await ListarLocalidad()
            let localidades = await cargarMapa()
            sessionStorage.eventoid = e.codigoEvento
            if (obten.data.length > 0) {
                let mapa = localidades.data.filter((L) => L.nombre_espacio == e.lugarConcierto)
                let mapalocal = listalocal.data.filter((K) => K.espacio == e.lugarConcierto)
                let localidad = JSON.parse(mapa[0].localidad)
                let path = JSON.parse(mapa[0].pathmap)
                let newprecios = obten.data.map((e, i) => {
                    let color = localidad.filter((f, i) => f.nombre == e.localodad)
                    e.color = color[0].color
                    e.idcolor = color[0].id
                    e.typo = color[0].tipo
                    return e
                })
                let colornuevo = mapalocal.map((L) => {
                    if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
                        return L
                    }
                })
                let pathnuevo = path.map((L) => {
                    if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
                        return L
                    }
                })
                usedispatch(cargalocalidad([...colornuevo.filter((e) => e != undefined)]))
                let nuevosdatos = {
                    precios: newprecios,
                    pathmapa: pathnuevo.filter((e) => e != undefined),
                    mapa: mapa[0].nombre_mapa
                }
                sessionStorage.eventoid = e.codigoEvento
                setPrecios(nuevosdatos)
                setDatoscon(e)
                handleClosesop(true)
                hideAlert()
            }

        } catch (err) {
            console.log(err)
        }

    }
    const venderevento = (e) => {
        usedispatch(setModal({ nombre: "suscritor", estado: { ...e } }))
    }
    const evento = async () => {
        try {
            const data = await cargarEventoActivo()
            const Datos = await ListarTikets()
            const filtro = data != null ? data.filter((e) => new Date(e.fechaConcierto + " 23:59:59") > new Date()) : []

            const sorter = (a, b) => new Date(a.fechaConcierto) > new Date(b.fechaConcierto) ? 1 : -1;
            if (data != null) {
                setEvento(filtro.sort(sorter))
                if (Datos.data) setInfo({
                    ...info,
                    Ticket: Datos.data.length,
                    Activos: filtro.sort(sorter).length,
                    Venta: 0
                })
            }
            else if (data == null) setEvento([])
        } catch (error) {
            console.log(error)
        }
    }
    const abrir = async (e) => {
        let id = sessionStorage.getItem(Eventoid)

        if (id != null && id != e.codigoEvento) {
            borrar(e)
        }
        try {
            borrar(e)
            let obten = await listarpreciolocalidad(e.codigoEvento)
            const listalocal = await ListarLocalidad()
            let localidades = await cargarMapa()
            sessionStorage.consierto = e.nombreConcierto
            if (obten.data.length > 0) {
                let mapa = localidades.data.filter((L) => L.nombre_espacio == e.lugarConcierto)
                let mapalocal = listalocal.data.filter((K) => K.espacio == e.lugarConcierto)
                let localidad = JSON.parse(mapa[0].localidad)
                let path = JSON.parse(mapa[0].pathmap)
                let newprecios = obten.data.map((e, i) => {
                    let color = localidad.filter((f, i) => f.nombre == e.localodad)
                    e.color = color[0].color
                    e.idcolor = color[0].id
                    e.typo = color[0].tipo
                    return e
                })
                let colornuevo = mapalocal.map((L) => {
                    if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
                        return L
                    }
                })
                let pathnuevo = path.map((L) => {
                    if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
                        return L
                    }
                })
                usedispatch(cargalocalidad([...colornuevo.filter((e) => e != undefined)]))
                let nuevosdatos = {
                    precios: newprecios,
                    pathmapa: pathnuevo.filter((e) => e != undefined),
                    mapa: mapa[0].nombre_mapa
                }
                sessionStorage.eventoid = e.codigoEvento
                setPrecios(nuevosdatos)
                setDatoscon(e)
                handleClosesop(true)
                usedispatch(setModal({ nombre: '', estado: '' }))
                //velocidad()
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        (async () => {
            await evento()
            Limpiarseleccion()
            LimpiarLocalStore()
            usedispatch(clearMapa({}))
            usedispatch(borrarseleccion({ estado: "seleccionado" }))
        })()
    }, [])
    return (
        <>
            <ModalLocalidamapViews
                handleClosesop={handleClosesop}
                showMapa={showMapa}
                intervalo={intervalo}
                setMapashow={setMapashow}
            />
            <ModalCarritoView
                showshop={showshop}
                handleClosesop={detenervelocidad}
                detener={handleClosesop}
                handleContinuar={handleContinuar}
                setListarCarritoDetalle={setListarCarritoDetalle}
                datos={datos}
                precios={precios}
                intervalo={intervalo}
                setMapashow={setMapashow}
            />
            <ModalEfectivo
                intervalo={intervalo}
                efectShow={efectShow}
                efectiOpShow={efectiOpShow}
                handleefectivoClose={handleefectivoClose}
            />
            {alert}
            <Row>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-chart text-warning"></i>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Tickes Vendidos</p>
                                        <Card.Title as="h4">{info.Ticket}</Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                                <i className="fas fa-redo mr-1"></i>
                                {moment().format('DD MMMM YYYY')}
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-light-3 text-success"></i>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Conciertos Activos</p>
                                        <Card.Title as="h4">{info.Activos}</Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                                <i className="far fa-calendar-alt mr-1"></i>
                                {moment().format('DD MMMM YYYY')}
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-vector text-danger"></i>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Ventas eventos activos</p>
                                        <Card.Title as="h4">{info.Venta}</Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                                <i className="far fa-calendar-alt mr-1"></i>
                                {moment().format('DD MMMM YYYY ')}
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col lg="3" sm="6">
                    <Card className="card-stats">
                        <Card.Body >
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-favourite-28 text-primary"></i>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">Suscriptores nuevos</p>
                                        <Card.Title as="h4">0</Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                                <i className="fas fa-redo mr-1"></i>
                                {moment().format('DD MMMM YYYY ')}
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Row>
                <div className="col-12 d-flex flex-column align-items-center "  >
                    <h4 style={{
                        fontFamily: 'fantasy'
                    }} >Conciertos Activos</h4>
                    <div className="col-8 border rounded-7 bg-black bg-opacity-10">
                        <Swiper
                            effect={"flip"}
                            grabCursor={true}
                            pagination={true}
                            navigation={true}
                            modules={[EffectFlip, Pagination, Navigation]}
                            onSlideChange={async (swiperCore) => {
                                const {
                                    activeIndex,
                                    snapIndex,
                                    previousIndex,
                                    realIndex,
                                } = swiperCore;

                            }}
                            className="mySwiper">
                            {Eventos.length > 0 ?
                                Eventos.map((e, i) => {
                                    return (
                                        <SwiperSlide key={i} >
                                            <div className=" container-fluid  mt-4 px-0">
                                                <div className=" card-body  py-5"

                                                >
                                                    <div className="row" >
                                                        <div className="col-6" >
                                                            <div className="d-flex justify-content-end pl-4">
                                                                <img src={e.imagenConcierto} className="img-fluid rounded-7 shadow-md  " alt="" />
                                                            </div>

                                                        </div>
                                                        <div className="container col-6" >
                                                            <h1 style={{ fontSize: '1.6em' }}><span id="artista" className="fw-bold">{e.nombreConcierto}</span> </h1>
                                                            <div className="col-12 border border-bottom my-3"></div>

                                                            <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento">{e.fechaConcierto}</span></p>
                                                            <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento"> {e.lugarConcierto + " " + e.lugarConcierto} </span></p>
                                                            <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span id="horaEvento"> {e.horaConcierto}  </span></p>
                                                            <p className="btn btn-primary float-center" onClick={() => venderevento(e)} > Vender entrada</p>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                                : ""}

                        </Swiper>

                    </div>
                </div>
            </Row>
            {modalshow.modal.nombre == "suscritor" ? <ListaSuscritor abrir={abrir} /> : ''}
            {
                modalPago ? <ModalPago
                    intervalo={intervalo}
                    detenervelocidad={detenervelocidad}
                    para={para}
                    setModalPago={setModalPago} modalPago={modalPago} /> : null
            }
            <ModalDetalle
                showDetalle={showDetalle}
                intervalo={intervalo}
                setDetalle={setDetalle}
                handleDetalleColse={handleDetalleColse}
                listarCarritoDetalle={listarCarritoDetalle}
                pararcontador={detenervelocidad}
                setListarCarritoDetalle={setListarCarritoDetalle}
                setModalPago={setModalPago}
                setrepShow={setrepShow}
                efectiOpShow={efectiOpShow}
            />
            <Reporte
                intervalo={intervalo}
                repShop={repShop}
                pararcontador={detenervelocidad}
                setrepShow={setrepShow}
                handlereportColse={handlereportColse}
            />

        </>

    )

}