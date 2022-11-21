import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";
import { styleswiper } from "./styleswiper.js";
import header from "../../../assets/header.jpeg";
import logofla from "../../../assets/imagen/LOGO-WEB.png";
import principal from "../../../assets/imagen/eventoprincip.jpeg";
import secundaria from "../../../assets/imagen/segundo.jpeg";
import tercero from "../../../assets/imagen/concierto.jpeg"
import icon from "../../../assets/imagen/50pixeles.png";
import valla from "../../../assets/imagen/valla-proximo-evento.png";
import "../../../assets/css/animate.css";
import "../../../assets/css/bootstrap.css";
import ModalCarrito from "views/Components/MODAL/ModalCarrito";
import ModalDetalle from "views/Components/MODAL/ModalDetalle";
import ModalPago from "views/Components/MODAL/ModalPago";
import ModalReport from "views/Components/MODAL/ModalReporte";
import ModalEfectivo from "views/Components/MODAL/Modalefectivo";
import TOAST from "views/Components/TOAST";
import Footer from "views/Components/Footer/Footer";
import { useHistory } from "react-router";
import Modalterminos from "./Modalterminos";
import ModalLogin from "./ModalLogin";
import Tikes from "../Susbcritorpage/Tickes";
import PerfilPage from "../Perfil";
import { getDatosUsuariosLocalStorag, getCliente, DatosUsuariosLocalStorag, getCedula } from "utils/DatosUsuarioLocalStorag";
import { GetMetodo, getVerTienda, LimpiarLocalStore, Limpiarseleccion } from "utils/CarritoLocalStorang";
import { GuardarDatosdelComprador, ValidarWhatsapp } from "utils/Query";
import { useSelector, useDispatch } from "react-redux";
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice";
import { deletesuscrito } from "StoreRedux/Slice/SuscritorSlice";
import { cargalocalidad, clearMapa } from "StoreRedux/Slice/mapaLocalSlice";
import { Authsucrito } from "utils/Query";
import { borrarseleccion } from "StoreRedux/Slice/sillasSlice";
import { listarpreciolocalidad, ListarLocalidad } from "utils/Querypanel";
import { cargarEventoActivo, cargarMapa } from "utils/Querypanelsigui";
import { Dias, DatosUsuariocliente, Eventoid, listaasiento } from "utils/constantes";
import ModalCarritov from "views/Components/MODAL/ModalCarritov";
import SweetAlert from "react-bootstrap-sweetalert";
import LocalidadmapViews from "views/Components/MODAL/Modallocalida";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from "@mui/material";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import { Box } from "@mui/system";
import moment from "moment";
import 'moment-timezone'
import 'moment/locale/es';
require('moment/locale/es.js')
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swipermedia.css"
const IndexFlas = () => {
  let usedispatch = useDispatch();
  let history = useHistory();
  const userauthi = useSelector((state) => state.SuscritorSlice)
  const [precios, setPrecios] = useState({
    precios: [],
    pathmapa: [],
    mapa: ''
  })
  const [showDetalle, setDetalle] = useState(false)
  const [repShop, setrepShow] = useState(false);
  const [efectShow, efectiOpShow] = useState(false);
  const [userauth, setUserauth] = useState(false)
  const [seleccion, SetSeleccion] = useState("");
  const [showshop, handleClosesop] = useState(false);
  const [datos, setDatoscon] = useState([])
  const [Toastestado, setDatoToas] = useState({ show: false, message: '', color: '', estado: '', })
  const [showLogin, setShowLogin] = useState(false)
  const [alert, setAlert] = useState(null);
  const [intervalo, setcrono] = useState("")
  const datatime = useRef(null);

  function velocidad() {
    let timer = 0
    var tiempo = 60 * 3
    timer = tiempo
    var minutos = 0, segundos = 0;
    console.log(datatime)
    datatime.current = setInterval(function () {
      minutos = parseInt(timer / 60, 10);
      segundos = parseInt(timer % 60, 10);
      minutos = minutos < 10 ? "0" + minutos : minutos;
      segundos = segundos < 10 ? "0" + segundos : segundos;
      if (timer === 0) {
        clearInterval(datatime.current);
        setDatoToas({ show: true, message: 'Su tiempo de compra a finalizado', color: 'bg-danger', estado: 'Mensaje importante', })
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
    clearInterval(datatime.current)
    setMapashow(false)
    setDetalle(false)
    Limpiarseleccion()
    LimpiarLocalStore()
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
  }
  function abrircarro() {
    handleClosesop(true)
    velocidad()
  }
  async function cedulaget() {
    if (JSON.parse(sessionStorage.getItem(DatosUsuariosLocalStorag))) {
      const datos = await getCedula(JSON.parse(sessionStorage.getItem(DatosUsuariosLocalStorag).cedula))
      const { discapacidad } = datos
      DatosUsuariosLocalStorag({
        ...datosPerson, discapacidad: discapacidad
      })
    }
  }
  const abrir = async (e) => {
    let id = sessionStorage.getItem(Eventoid)
    if (id != null && id != e.codigoEvento) {
      successAlert(e)
    }
    else {
      try {
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
          velocidad()
        }
      } catch (err) {
        console.log(err)
      }

    }
  }
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
          // console.log("1", localidad)
          // console.log("2", color)
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
        velocidad()
        hideAlert()
      }

    } catch (err) {
      console.log(err)
    }

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
  const [showMapa, setMapashow] = useState(false);
  const [modalPago, setModalPago] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleContinuar = () => {
    handleClosesop(false)
    setDetalle(true)
  }
  const handleDetalleColse = () => {
    setDetalle(false)
    handleClosesop(true)
  }
  const salir = () => {
    sessionStorage.removeItem(DatosUsuariocliente)
    sessionStorage.removeItem(getDatosUsuariosLocalStorag)
    usedispatch(deletesuscrito({ ...userauthi }))
    SetSeleccion("")
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
            DatosUsuariosLocalStorag({ ...datos, ...users })
            sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
            usedispatch(addususcritor({ users }))
            setrepShow(true)
            setDetalle(false)
          }
          else {
            setDatoToas({
              show: true,
              message: "Ingrese un correo diferente o inicie sección",
              color: 'bg-danger',
              estado: "Correo " + datos.email + " Duplicado",
            })
          }
        }
      } else {
        setrepShow(true)
        setDetalle(false)
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
  const handlereportColse = async () => {
    setrepShow(false)
    setDetalle(true)
  };
  const closedeposito = () => {
    setrepShow(false)
    setDetalle(true)
  }
  const handleefectivoClose = () => {
    efectiOpShow(false)
    setDetalle(true)
  };

  const [listaPrecio, setListaPrecio] = useState({
    total: 0,
    subtotal: 0,
    comision: 0,
    comision_bancaria: 0
  })

  //localStorage.setItem("data", JSON.stringify("a:16:{s:6:\"olt_id\";s:1:\"2\";s:8:\"pon_type\";s:4:\"gpon\";s:5:\"board\";s:1:\"0\";s:4:\"port\";s:1:\"7\";s:2:\"sn\";s:12:\"HWTC3549C29C\";s:4:\"vlan\";s:3:\"100\";s:8:\"onu_type\";s:7:\"HG8240H\";s:4:\"zone\";s:22:\"PANCHO JACOME SECTOR A\";s:3:\"odb\";s:0:\"\";s:4:\"name\";s:12:\"ANDRES TAPIA\";s:18:\"address_or_comment\";s:0:\"\";s:8:\"onu_mode\";s:7:\"Routing\";s:15:\"onu_external_id\";s:4:\"1270\";s:11:\"onu_type_id\";s:2:\"50\";s:25:\"upload_speed_profile_name\";s:10:\"PLAN-SPEED\";s:27:\"download_speed_profile_name\";s:10:\"PLAN-SPEED\";}")
  localStorage.setItem("dataspedd", JSON.stringify("{s:6:\"olt_id\";s:1:\"2\";s:8:\"pon_type\";s:4:\"gpon\";s:5:\"board\";s:1:\"0\";s:4:\"port\";s:1:\"7\";s:2:\"sn\";s:12:\"HWTC3549C29C\";s:4:\"vlan\";s:3:\"100\";s:8:\"onu_type\";s:7:\"HG8240H\";s:4:\"zone\";s:22:\"PANCHO JACOME SECTOR A\";s:3:\"odb\";s:0:\"\";s:4:\"name\";s:12:\"ANDRES TAPIA\";s:18:\"address_or_comment\";s:0:\"\";s:8:\"onu_mode\";s:7:\"Routing\";s:15:\"onu_external_id\";s:4:\"1270\";s:11:\"onu_type_id\";s:2:\"50\";s:25:\"upload_speed_profile_name\";s:10:\"PLAN-SPEED\";s:27:\"download_speed_profile_name\";s:10:\"PLAN-SPEED\";}"))
  const dataendpoit = JSON.parse(localStorage.getItem("dataspedd"))
  //console.log(dataendpoit.split(";"))
  //localStorage.nuevodat = dataendpoit
  dataendpoit.replace("{", "").replace("}", "").split(";").forEach((element, i) => {

    console.log(element.replace("s:", "").split(":")[1])
  });
  //console.log(dataendpoit) 

  //const str = dataendpoit.split(" \ ")[0]
  //console.log
  //const str1 = str.split(" \ ")
  //console.log(str1)
  //console.log(JSON.parse(str))
  //!dataendpoit ? dataendpoit.map((e, i) => {
  // console.log(e)
  //}) : ''
  //console.log()




  const [listarCarritoDetalle, setListarCarritoDetalle] = useState([])
  const [datosPerson, setPerson] = useState({
    cedula: '',
    name: '',
    email: '',
    whatsapp: '',
    metodoPago: '',
    envio: '',
    direccion: '',
    edad: '',
    fecha: ''
  })
  const [eventoslist, setEventos] = useState([])
  useEffect(() => {
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    Limpiarseleccion()
    LimpiarLocalStore()
    const evento = async () => {
      try {
        const data = await cargarEventoActivo()
        const filtro = data != null ? data.filter((e) => moment(e.fechaConcierto + " " + e.horaConcierto).format('DD MMMM YYYY HH:mm') > moment().format('DD MMMM YYYY HH:mm')) : []
        const sorter = (a, b) => new Date(a.fechaConcierto) > new Date(b.fechaConcierto) ? 1 : -1;
        if (data != null) {
          setEventos(filtro.sort(sorter))
        }
        else if (data == null) setEventos([])
      } catch (error) {
        console.log(error)
      }
    }
    evento()
    var popUp = window.open('url', '', 'options');
    if (popUp == null || typeof (popUp) == 'undefined') {
      //  popUp.close();     
      setDatoToas({
        show: true,
        message: 'Por favor habilite las ventanas emergentes antes de continuar y actualice la pagina',
        color: 'bg-danger',
        estado: 'Mensaje importante',
      })
    } else {
      popUp.close();
    }

    let datosPersonal = getDatosUsuariosLocalStorag()
    let clineteLogeado = getCliente()
    let metodoPago = GetMetodo()
    if (clineteLogeado == null) {
      if (datosPersonal !== null) {
        setPerson({
          ...datosPerson,
          email: datosPersonal.email,
          name: datosPersonal.name,
          whatsapp: datosPersonal.whatsapp,
          cedula: datosPersonal.cedula,
          metodoPago: metodoPago,
          envio: datosPersonal.envio,
          fecha: datosPersonal.fecha_nacimiento,
          direccion: datosPersonal.direccion,
          edad: datosPersonal.edad
        })
        setUserauth(false)
      }
      setUserauth(false)
    } else {
      setPerson({
        ...datosPerson,
        email: clineteLogeado.email,
        name: clineteLogeado.name,
        whatsapp: clineteLogeado.whatsapp,
        cedula: clineteLogeado.cedula,
        metodoPago: metodoPago,
        envio: clineteLogeado.envio,
        direccion: clineteLogeado.direccion,
        fecha: clineteLogeado.fecha_nacimiento,
        edad: clineteLogeado.edad
      })
      usedispatch(addususcritor({ ...clineteLogeado }))
      setUserauth(true)
    }
  }, [])
  return (
    <>
      <LocalidadmapViews
        handleClosesop={handleClosesop}
        showMapa={showMapa}
        intervalo={intervalo}
        setMapashow={setMapashow}
      />
      <ModalCarritov
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
      <nav className="navbar navbar-expand-lg  justify-content-between navbar-dark bg-black  py-3">
        <div className="container-fluid col-lg-8    d-flex justify-content-between">
          <a className="navbar-brand " aria-label="TICKETS" href="#">
            <img src={icon} className="img-fluid" style={{ height: 'auto' }} alt="" />
          </a>
          <button className="navbar-toggler justify-content-center " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className=" navbar-nav  mb-2 mb-lg-0 navbar-nav  ml-md-auto  d-md-flex">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" onClick={() => SetSeleccion("")}>Inicio</a>
              </li>
              <li className="nav-item active" aria-current="page" onClick={() => SetSeleccion("")}>
                <a className=" nav-link" href="#nuevoseventos">Eventos</a>
              </li>
              <li className="nav-item active" aria-current="page">
                <a className="nav-link " href="#" onClick={() => getVerTienda().length > 0 ? abrircarro() : ""}>Comprar
                  {getVerTienda().length > 0 ? <span className="position-absolute bottom-0 start-50 translate-middle p-1 bg-danger border border-light rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span> : ""}
                </a>
              </li>
              {userauthi.login ?
                <li className="nav-item active" aria-current="page" onClick={() => SetSeleccion("Datos")}>
                  <a className="nav-link " >Datos</a>
                </li> : ""
              }
              {userauthi.login ?
                <li className="nav-item active" aria-current="page" onClick={() => SetSeleccion("Tickets")}>
                  <a className="nav-link " href="#">Tickets</a>
                </li> : ""
              }
              {!userauthi.login ? <li className="  nav-item">
                <a className=" btn btn-outline-light  " href="#" onClick={() => setShowLogin(true)}> Mi Cuenta <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                </svg></i> </a>
              </li> : <li className="  nav-item">
                <a className=" btn btn-outline-light  " href="#" onClick={salir}> Salir <i className="fa fa-window-close"></i> </a>
              </li>}
            </ul>
            {/*<ul className=" navbar-nav  mb-2 mb-lg-0 navbar-nav  ml-md-1   justify-content-center ">
              <li className="  nav-item">
                <a className="btn btn-outline-light" href="#" > 0983832112 <i className="fab fa-whatsapp fa-lg ml-1 justify-content-center"></i> </a>
              </li>
            </ul>*/}
          </div>
        </div>
      </nav>
      <ModalLogin
        showLogin={showLogin}
        setUserauth={setUserauth}
        setShowLogin={setShowLogin}
      />
      {/* header */}
      <div className="container-fluid  p-0">
        {/*<div className="col-12 mx-auto bg-header-boleteria" style={{ height: '400px', backgroundImage: `url(${header})` }}>
          <div className="container w-100 h-100 px-0">
            <div className="container btn-group-vertical  h-100 text-center px-0">
              <h1 className="text-white mx-auto" style={{ fontSize: '3.5em' }}><img src={logofla} className="img-fluid" style={{ height: '150px' }} alt="" /></h1>
              <p className="mx-auto text-white d-none" style={{ fontSize: '1.2em' }}><b>Compra</b> tu entrada <b>fácil, rápido</b> y
                <b>seguro</b>
              </p>
            </div>
          </div>
        </div>*/}
        <Swiper
          className="AnimatedSlides"
          parallax={true}
          loop={true}
          autoHeight={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, EffectFade, Pagination]}>
          <SwiperSlide >
            <div style={{ widows: "100%", height: "400px" }}>
              <div style={{
                backgroundImage: "url('" + principal + "')",
                ...styleswiper.slideimgcenter
              }}></div>
              <div style={{
                backgroundImage: "url('" + principal + "')",
                ...styleswiper.slideimg
              }} >
                <div style={styleswiper.fondo}>
                </div>
                <div className="descripciones">
                  <div className="d-flex flex-column text-white" >
                    <h4 style={styleswiper.titulo}>Descripción de la imagen 1 </h4>
                    <span style={styleswiper.subtitulo}>
                      Sub descripción
                    </span>
                    <div className="">
                      <button className="btn btn-success"
                        style={styleswiper.button}
                      >Ver lista</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div style={{ widows: "100%", height: "400px" }}>
              <div style={{
                backgroundImage: "url('" + secundaria + "')",
                ...styleswiper.slideimgcenter
              }}></div>
              <div style={{
                backgroundImage: "url('" + secundaria + "')",
                ...styleswiper.slideimg
              }} >
                <div style={styleswiper.fondo}>
                </div>
                <div className="descripciones">
                  <div className="d-flex flex-column text-white" >
                    <h4 style={styleswiper.titulo}>Descripción de la imagen 2 </h4>
                    <span style={styleswiper.subtitulo}>
                      Sub descripción
                    </span>
                    <div>
                      <button className="btn btn-success"
                        style={styleswiper.button}
                      >Ver lista</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide >
            <div style={{ width: "100%", height: "400px" }}>
              <div className="slide-image" style={{
                position: "relative",
                width: "100%",
                height: "400px",
              }}>
                <div style={{
                  backgroundImage: "url('" + tercero + "')",
                  ...styleswiper.slideimgcenter
                }}></div>
                <div style={{
                  backgroundImage: "url('" + tercero + "')",
                  ...styleswiper.slideimg
                }} >
                </div>
                <div style={styleswiper.fondo}>
                </div>
                <div className="descripciones">
                  <div className="d-flex flex-column text-white" >
                    <h4 style={styleswiper.titulo}>Descripción de la imagen 3 </h4>
                    <span style={styleswiper.subtitulo}>
                      Sub descripción
                    </span>
                    <div className="">
                      <button className="btn btn-success"
                        style={styleswiper.button}
                      >Ver lista</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* eventos */}
      {seleccion == "" ?
        <div className="container " id="nuevoseventos">
          <div className="container p-3">
            <div className="row flex-wrap-reverse justify-content-center">
              <div className="col-12 col-lg-9">
                <div className="row mx-auto p-0">
                  {eventoslist.length > 0 ?
                    eventoslist.map((e, i) => {
                      return (
                        <div className="col-12 col-lg-6 mx-auto my-5" id={"evento" + e.id} key={i}>
                          <a className="" data-bs-toggle="collapse" href={"#collapseid" + e.id} role="button" aria-expanded="false"
                            aria-controls="collapseExample2">
                            <div className="container rounded-7 shadow-md px-0">
                              <img src={e.imagenConcierto} className="img-fluid rounded-7 shadow-md " alt="" />
                            </div>
                          </a>
                          <div className="collapse container mt-4 px-0" id={"collapseid" + e.id}>
                            <div className="card card-body rounded-7 py-5">
                              <div className="container">
                                <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">{e.nombreConcierto}</span> </h1>
                                <h4 style={{ fontSize: '1.4em', height: '55px' }}><span id="tour">{e.descripcionConcierto} </span></h4>
                                <div className="col-12 border border-bottom my-3"></div>
                                <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento">{Dias[new Date(e.fechaConcierto).getDay()]}  {e.fechaConcierto}</span></p>
                                <p style={{ fontSize: '1.2em', height: "55px" }}><b>Lugar:</b><span id="lugarEvento">{e.lugarConcierto}</span></p>
                                <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span id="horaEvento"> {e.horaConcierto}</span></p>
                                {true ? <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                  className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => abrir(e)} >Comprar Entrada</p> : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                    : <div className="col-12 col-lg-6 mx-auto my-5" >
                      <div>
                        <div className="container rounded-7-md px-0" style={{ height: 300 }}>

                          <Skeleton variant="rounded" width="100%" height="80%" />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </div>
                      </div>

                    </div>}


                  {/* Aqui terminara el map siguente evento queda para poster Proximamente */}
                  <div className="col-12 col-lg-6 mx-auto my-5" >
                    <div className="" aria-label="coll" data-bs-toggle="collapse" role="button" aria-expanded="false"
                      aria-controls="collapseExample">
                      <div className="container  px-0">
                        <img src={valla} className="img-fluid  " alt="" />
                      </div>
                    </div>
                    <div className="collapse container mt-4 px-0" id="collapseExample4">
                      <div className="card card-body rounded-7 py-5">
                        <div className="container ">
                          <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">Proximo evento</span> </h1>
                          <h4 style={{ fontSize: '1.4em' }}></h4>
                          <div className="col-12 border border-bottom my-3"></div>
                          <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento">Proximamente</span></p>
                          <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento"> Proximamente</span></p>
                          <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span id="horaEvento"> Proximamente</span></p>
                          <p href="#" className="evento d-none btn btn-primary fw-bold px-3 py-2 rounded-6" id="comprar">
                            Proximamente</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> : ''}

      {userauthi.login && seleccion == "Tickets" ? <div className="container p-2"> <Tikes /></div> : ""}
      {userauthi.login && seleccion == "Datos" ? <div className="container p-2"><PerfilPage datosPerson={datosPerson} setDatoToas={setDatoToas} /></div> : ""}

      {/* flotter*/}
      <Footer logofla={logofla} />

      <ModalCarrito
        show={show}
        handleClose={handleClose}
        handleContinuar={handleContinuar}
        listaPrecio={listaPrecio}
        setListaPrecio={setListaPrecio}
        setListarCarritoDetalle={setListarCarritoDetalle}
        datosPerson={datosPerson}
        setPerson={setPerson}
      />
      <Modalterminos />
      <ModalDetalle
        showDetalle={showDetalle}
        intervalo={intervalo}
        setDetalle={setDetalle}
        handleDetalleColse={handleDetalleColse}
        setListarCarritoDetalle={setListarCarritoDetalle}
        handelReporShow={handelReporShow}
        listarCarritoDetalle={listarCarritoDetalle}
        handelefctivorShow={handelefctivorShow}
        setModalPago={setModalPago}
        setDatoToas={setDatoToas}
      />

      {
        modalPago ? <ModalPago setModalPago={setModalPago} modalPago={modalPago} setDatoToas={setDatoToas} /> : null
      }
      <ModalReport
        repShop={repShop}
        setrepShow={setrepShow}
        handlereportColse={handlereportColse}
        setDatoToas={setDatoToas}

      />
      <ModalEfectivo
        efectShow={efectShow}
        handleefectivoClose={handleefectivoClose}
        efectiOpShow={efectiOpShow}

        setDatoToas={setDatoToas}
      />
      <TOAST

        Toastestado={Toastestado}
        setDatoToas={setDatoToas}
      />


    </>

  )

}
export default IndexFlas;