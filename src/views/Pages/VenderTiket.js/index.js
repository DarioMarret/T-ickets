import { useEffect, useState, useRef } from "react";
import { ListarTikets } from "utils/Querypanel";
import { Row, Card, Col, } from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { listarpreciolocalidad, ListarLocalidad } from "utils/Querypanel";
import { getDatosUsuariosLocalStorag, getCliente, DatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { GetMetodo, getVerTienda, LimpiarLocalStore, Limpiarseleccion } from "utils/CarritoLocalStorang";
import { GuardarDatosdelComprador, ValidarWhatsapp } from "utils/Query";
import { cargarEventoActivo, cargarMapa } from "utils/Querypanelsigui";
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice";
import { deletesuscrito } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { cargalocalidad, clearMapa } from "StoreRedux/Slice/mapaLocalSlice";
import { Authsucrito } from "utils/Query";
import { borrarseleccion } from "StoreRedux/Slice/sillasSlice";
import { Dias, DatosUsuariocliente, Eventoid, listaasiento } from "utils/constantes";
import ModalCarritoView from "views/Components/MODAL/ModalCarritov";
//import ModalCarritoView from "./Modal/ModalCarritoadmin";
import ModalLocalidamapViews from "./Modal/ModalloaclidadAdmin"
import ModalDetalle from "./Modal/ModalDetalle";
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
require('moment/locale/es.js')
export default function StoreTickesViews() {
    let usedispatch = useDispatch()
    const [Eventos, setEvento] = useState([])
    const [showMapa, setMapashow] = useState(false);
    const [showshop, handleClosesop] = useState(false);
    const [showDetalle, setDetalle] = useState(false)
    const [modalPago, setModalPago] = useState(false);
    const [precios, setPrecios] = useState({ precios: [], pathmapa: [], mapa: '' })
    const [datos, setDatoscon] = useState([])
    const [listarCarritoDetalle, setListarCarritoDetalle] = useState([])
    const [intervalo, setcrono] = useState("")
    const [listaPrecio, setListaPrecio] = useState({ total: 0, subtotal: 0, comision: 0, comision_bancaria: 0 })
    const [alert, setAlert] = useState(null);
    const handleContinuar = () => {
        handleClosesop(false)
        setDetalle(true)
    }
    const handleDetalleColse = () => {
        setDetalle(false)
        handleClosesop(true)
    }
    const [info, setInfo] = useState({ Ticket: 0, Activos: 0, Venta: 0, })

    const intervalRef = useRef(null);
    function velocidad() {
        let timer = 0
        var tiempo = 60 * 3
        timer = tiempo
        var minutos = 0, segundos = 0;
        console.log(intervalRef)
        intervalRef.current = setInterval(function () {
            minutos = parseInt(timer / 60, 10);
            segundos = parseInt(timer % 60, 10);
            minutos = minutos < 10 ? "0" + minutos : minutos;
            segundos = segundos < 10 ? "0" + segundos : segundos;
            if (timer === 0) {
                clearInterval(intervalRef.current);
                // usese setDatoToas({ show: true, message: 'Su tiempo de compra a finalizado', color: 'bg-danger', estado: 'Mensaje importante', })
                handleClosesop(false)
                setMapashow(false)
                setDetalle(false)
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
    const successAlert = (e) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Tiene un evento ya seleccionado"
                onConfirm={() => borrar(e)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Continuar"
                cancelBtnText="Cancelar"
                showCancel
            >
                Desea borrar los datos y continuar
            </SweetAlert>
        );
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

                //console.log(pathnuevo.filter((e)=>e!=undefined))
                // console.log()
                usedispatch(cargalocalidad([...colornuevo.filter((e) => e != undefined)]))
                let nuevosdatos = {
                    precios: newprecios,
                    pathmapa: pathnuevo.filter((e) => e != undefined),
                    mapa: mapa[0].nombre_mapa
                }
                // console.log(nuevosdatos)
                sessionStorage.eventoid = e.codigoEvento

                setPrecios(nuevosdatos)
                // console.log(obten)
                setDatoscon(e)
                handleClosesop(true)
                //velocidad()
                hideAlert()
            }

        } catch (err) {
            console.log(err)
        }

    }
    const evento = async () => {
        try {
            const data = await cargarEventoActivo()
            const Datos = await ListarTikets()
            //console.log(Datos)
            const filtro = data != null ? data.filter((e) => moment(e.fechaConcierto + " " + e.horaConcierto).format('DD MMMM YYYY HH:mm') > moment().format('DD MMMM YYYY HH:mm')) : []
            const sorter = (a, b) => new Date(a.fechaConcierto) > new Date(b.fechaConcierto) ? 1 : -1;
            //console.log("imprime", filtro)
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
    /*var decodeEntities = (function () {
         // this prevents any overhead from creating the object each time
         var element = document.createElement('div');
 
         function decodeHTMLEntities(str) {
             if (str && typeof str === 'string') {
                 //aqui ya lo trae como texto
 
                 str = str.replace("&lt;p&gt", '');
                 element.innerHTML = str;
                 str = element.textContent;
                 element.textContent = '';
             }
 
             return str;
         }
 
         return decodeHTMLEntities;
     })()*/
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
                //console.log(nuevosdatos)
                sessionStorage.eventoid = e.codigoEvento
                setPrecios(nuevosdatos)
                setDatoscon(e)
                handleClosesop(true)
                velocidad()
            }
        } catch (err) {
            console.log(err)
        }

    }

    const handelReporShow = async () => {
        let datos = await getDatosUsuariosLocalStorag()
        let nuemro = await ValidarWhatsapp()
        let user = { email: datos.email, password: datos.cedula }
        let clineteLogeado = await getCliente()
        try {
            if (clineteLogeado == null) {
                if (nuemro == null) {
                    setDatoToas({
                        show: true,
                        message: "Ingrese un numero de Whatsapp",
                        color: 'bg-danger',
                        estado: "Numero " + datos.whatsapp + " Invalido",
                    })
                    return
                }
                else {
                    const { success, message } = await GuardarDatosdelComprador()
                    if (success) {
                        const { data } = await Authsucrito(user)
                        var hoy = new Date();
                        let users = {
                            ...datos,
                            cedula: data.cedula, direccion: data.ciudad, whatsapp: data.movil,
                            telefono: data.movil, name: data.nombreCompleto,
                            email: data.email, hora: String(hoy),
                            enable: data.enable, id: data.id,
                        }
                        // DatosUsuariosLocalStorag({ ...datos, ...users })
                        //   sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
                        //   usedispatch(addususcritor({ users }))
                        //   setrepShow(true)
                        //   setDetalle(false)
                    }
                    else {

                    }
                }
            } else {

            }
        } catch (error) {
            setDatoToas({
                show: true,
                message: "Verifique su conexión o intente mas tarde",
                color: 'bg-danger',
                estado: "Hubo un error",
            })
            console.log("Error---", error)
        }
    }
    const handelefctivorShow = async () => {
        let datos = await getDatosUsuariosLocalStorag()
        let user = { email: datos.email, password: datos.cedula }
        let clineteLogeado = await getCliente()
        let nuemro = await ValidarWhatsapp()
        try {
            if (clineteLogeado == null) {
                if (nuemro == null) {
                    setDatoToas({
                        show: true,
                        message: "Ingrese un número de Whatsapp válido",
                        color: 'bg-danger',
                        estado: "Número " + datos.whatsapp + " Inválido",
                    })
                    return false
                }
                const { success, message } = await GuardarDatosdelComprador()
                if (success) {
                    const { data } = await Authsucrito(user)
                    var hoy = new Date();
                    let users = {
                        ...datos,
                        cedula: data.cedula, direccion: data.ciudad, whatsapp: data.movil,
                        telefono: data.movil, name: data.nombreCompleto,
                        email: data.email, hora: String(hoy),
                        enable: data.enable, id: data.id,
                    }
                    DatosUsuariosLocalStorag({ ...datos, ...users })
                    sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
                    usedispatch(addususcritor({ users }))
                    efectiOpShow(true)
                    setDetalle(false)
                }
                else {
                    setDatoToas({
                        show: true,
                        message: "Inicie sesión o Ingrese un correo diferente ",
                        color: 'bg-danger',
                        estado: "Correo " + datos.email + " Duplicado",
                    })
                }
            } else {
                efectiOpShow(true)
                setDetalle(false)
            }
        } catch (error) {
            setDatoToas({
                show: true,
                message: "Hubo un error correo duplicado o verifique su conexión",
                color: 'bg-danger',
                estado: "Hubo un error",
            })
        }
    }
    useEffect(() => {
        (async () => {
            await evento()
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
                setListaPrecio={setListaPrecio}
                setMapashow={setMapashow}
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

                    <div>
                        <button className="btn btn-success"  >empezar </button>
                        <button className="btn btn-danger" >detener</button>
                    </div>

                    <h4 style={{
                        fontFamily: 'fantasy'
                    }} > {intervalo} Conciertos Activos</h4>
                    <div className="col-8 border rounded-7">

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
                                        <SwiperSlide key={i}>
                                            <div className=" container-fluid mt-4 px-0">
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
                                                            <p className="btn btn-primary float-center" onClick={() => abrir(e)} > Vender entrada</p>
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
            <Row>


            </Row>
            <ModalDetalle
                showDetalle={showDetalle}
                intervalo={intervalo}
                setDetalle={setDetalle}
                handleDetalleColse={handleDetalleColse}

                handelReporShow={handelReporShow}
                listarCarritoDetalle={listarCarritoDetalle}
                handelefctivorShow={handelefctivorShow}
                setModalPago={setModalPago}
            //setDatoToas={setDatoToas}
            />
        </>

    )

}