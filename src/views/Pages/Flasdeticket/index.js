import React, { useEffect, useState, useRef } from "react";
import { styleswiper } from "./styleswiper.js";
import { pasados, carrusel } from "./imagenstatctic.js";
let { icon, valla, principal, secundaria, tercero, logofla, mapa, portal, header } = carrusel
import { useSelector, useDispatch } from "react-redux";
import { todossiler } from "./Modalterminos/silder.js";
let { cargalocalidad, cargarsilla, clearMapa, Cargarsillas, addususcritor, deletesuscrito, filtrarlocali, setModal, borrarseleccion } = todossiler

import ModalDetalle from "views/Components/MODAL/ModalDetalle";
import ModalPago from "views/Components/MODAL/ModalPago";
import ModalReport from "views/Components/MODAL/ModalReporte";
import ModalEfectivo from "views/Components/MODAL/Modalefectivo";
import TOAST from "views/Components/TOAST";
import Footer from "views/Components/Footer";
import Modalterminos from "./Modalterminos";
import ModalLogin from "./ModalLogin";
import Tikes from "../Susbcritorpage/Tickes";
import PerfilPage from "../Perfil";
import { getDatosUsuariosLocalStorag, getCliente, DatosUsuariosLocalStorag, getCedula } from "utils/DatosUsuarioLocalStorag";
import { GetMetodo, getVerTienda, LimpiarLocalStore, Limpiarseleccion } from "utils/CarritoLocalStorang";
import { GuardarDatosdelComprador, ValidarWhatsapp, Authsucrito } from "utils/Query";
import { listarpreciolocalidad, ListarLocalidad } from "utils/Querypanel";
import { cargarEventoActivo, cargarMapa } from "utils/Querypanelsigui";
import { Dias, DatosUsuariocliente, Eventoid, listaasiento, DatosUsuarioLocalStorang, Eventolocalidad, seleccionmapa } from "utils/constantes";
import ModalCarritov from "views/Components/MODAL/ModalCarritov";
import SweetAlert from "react-bootstrap-sweetalert";
import LocalidadmapViews from "views/Components/MODAL/Modallocalida";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from "@mui/material";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import ResgistroView from "./ModalLogin/registro.js";
import { Spinner } from "react-bootstrap";
import { Box } from "@mui/system";
import 'moment-timezone'
import 'moment/locale/es';
require('moment/locale/es.js')
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swipermedia.css"
import "../../../assets/css/animate.css";
import "../../../assets/css/bootstrap.css";
import Iframe from "views/Components/IFrame/Iframe.js";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion.js";
import { quitarsilla } from "utils/Querypanelsigui.js";
import { correlativodelete } from "utils/Querypanelsigui.js";
import { ListaElimnaLCompleta } from "utils/CarritoLocalStorang.js";
import { Triangle } from "react-loader-spinner";
import { ListarNoticias } from "utils/Querypanelsigui.js";
import ModalFacilitoView from "views/Components/MODAL/ModalFacilito.js";
import ReporteView from "views/Components/MODAL/Modalreporpago.js";
import Comprobante from "./comprobante/index.js";
const IndexFlas = () => {
  let usedispatch = useDispatch();
  const userauthi = useSelector((state) => state.SuscritorSlice)
  let modal = useSelector((state) => state.SuscritorSlice.modal)
  const [precios, setPrecios] = useState({
    precios: [],
    pathmapa: [],
    mapa: ''
  })
  const [showDetalle, setDetalle] = useState(false)
  const [repShop, setrepShow] = useState(false);
  //const [efectShow, efectiOpShow] = useState(false);
  const [spinervi, setspinervi] = useState("d-none")
  const [seleccion, SetSeleccion] = useState("");
  const [showshop, handleClosesop] = useState(false);
  const [datos, setDatoscon] = useState([])
  const [Toastestado, setDatoToas] = useState({ show: false, message: '', color: '', estado: '', })
  const [showLogin, setShowLogin] = useState(false)
  const [alert, setAlert] = useState(null);
  const [intervalo, setcrono] = useState("")
  const datatime = useRef(null);
  const localidadtimer = useRef(null);
  function velocidad() {
    let timer = 0
    var tiempo = 60 * 10
    timer = tiempo
    var minutos = 0, segundos = 0;
    datatime.current = setInterval(function () {
      minutos = parseInt(timer / 60, 10);
      segundos = parseInt(timer % 60, 10);
      minutos = minutos < 10 ? "0" + minutos : minutos;
      segundos = segundos < 10 ? "0" + segundos : segundos;
      if (timer === 0) {
        let array = ListaElimnaLCompleta()
        array.length > 0 ? quitarsilla({ "array": [...array] }).then(ouput => {
          console.log(ouput)
        }
        ).catch(err => console.log(err)) : ''
        getVerTienda().filter(e => e.tipo == "correlativo").length > 0 ?

          getVerTienda().filter(e => e.tipo == "correlativo").map((elem, index) => {
            setTimeout(function () {
              correlativodelete({ "id": elem.id, "protocol": elem.protocol, "cantidad": elem.cantidad }).then(ouput => {
                console.log(ouput)
              }).catch(err => {
                console.log(err)
              })
            }, 20 * index)
          })
          : ''
        clearInterval(datatime.current);
        setDatoToas({ show: true, message: 'Su tiempo de compra a finalizado', color: 'bg-danger', estado: 'Mensaje importante', })

        handleClosesop(false)
        setMapashow(false)
        setDetalle(false)
        //   efectiOpShow(false)
        setModalPago(false)
        setrepShow(false)
        Limpiarseleccion()
        LimpiarLocalStore()
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        usedispatch(setModal({ nombre: '', estado: '' }))
        $(".Mesa").removeClass("mesaocupado").addClass("mesadisponible")
        $(".Mesa").removeClass("mesareserva")
      }
      else {
        setcrono(minutos + ":" + segundos)
        if (--timer < 0) timer = tiempo;
      }
    }, 1000);
  }
  function filterlocal(id, consulta) {
    let nuevo = []
    id.forEach((elm, i) => {
      let espacifica = JSON.parse(sessionStorage.getItem(seleccionmapa)) ? JSON.parse(sessionStorage.getItem(seleccionmapa)) : { id: null }

      if (consulta.findIndex(f => f.id === elm) != -1) {
        nuevo[i] = consulta[consulta.findIndex(f => f.id === elm)]
        if (espacifica.id != null) {
          espacifica.idcolor === consulta[consulta.findIndex(f => f.id === elm)].id ?
            usedispatch(filtrarlocali(JSON.parse(consulta[consulta.findIndex(f => f.id === elm)].mesas_array).datos)) : ''
        }
      }
    })
    usedispatch(cargalocalidad(nuevo))
  }
  window.onbeforeunload = preguntarAntesDeSalir;
  function preguntarAntesDeSalir() {
    var bPreguntar = (getVerTienda().length > 0)
    var respuesta;
    if (modal.nombre != "pago" && bPreguntar) {
      respuesta = window.confirm('¿Seguro que quieres salir?');
      if (respuesta) {
        window.onunload = function () {
          return true;
        }
      } else {
        return false;
      }
    }
  }
  const consultarlocalidad = () => {
    let id = JSON.parse(sessionStorage.getItem(Eventolocalidad))
    localidadtimer.current = setInterval(function () {
      ListarLocalidad().then(ouput => {
        filterlocal(id, ouput.data)
      }
      ).catch(exit => console.log(exit))
    }, 2000);
  }

  function detenervelocidad() {
    usedispatch(setModal({ nombre: "", estado: '' }))
    clearInterval(datatime.current)
    clearInterval(localidadtimer.current)
    setMapashow(false)
    setDetalle(false)
    // efectiOpShow(false)
    setModalPago(false)
    setrepShow(false)
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    let array = ListaElimnaLCompleta()
    array.length > 0 ? quitarsilla({ "array": [...array] }).then(ouput => {
      console.log(ouput)
    }
    ).catch(err => console.log(err)) : ''
    getVerTienda().filter(e => e.tipo == "correlativo").length > 0 ?

      getVerTienda().filter(e => e.tipo == "correlativo").map((elem, index) => {
        setTimeout(function () {
          correlativodelete({ "id": elem.id, "protocol": elem.protocol, "cantidad": elem.cantidad }).then(ouput => {
            console.log(ouput)
          }).catch(err => {
            console.log(err)
          })
        }, 20 * index)
      })
      : ''
    Limpiarseleccion()
    LimpiarLocalStore()
  }
  function para() {
    clearInterval(datatime.current)
  }
  function paraenlace() {
    clearInterval(localidadtimer.current)
    setMapashow(false)
    setDetalle(false)
    // efectiOpShow(false)
    setModalPago(false)
    setrepShow(false)
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    let array = ListaElimnaLCompleta()
    array.length > 0 ? quitarsilla({ "array": [...array] }).then(ouput => {
      console.log(ouput)
    }
    ).catch(err => console.log(err)) : ''
    getVerTienda().filter(e => e.tipo == "correlativo").length > 0 ?

      getVerTienda().filter(e => e.tipo == "correlativo").map((elem, index) => {
        setTimeout(function () {
          correlativodelete({ "id": elem.id, "protocol": elem.protocol, "cantidad": elem.cantidad }).then(ouput => {
            console.log(ouput)
          }).catch(err => {
            console.log(err)
          })
        }, 20 * index)
      })
      : ''
    Limpiarseleccion()
    LimpiarLocalStore()
  }
  const abrir = async (e) => {
    setspinervi("")
    let id = sessionStorage.getItem(Eventoid)
    if (id != null && id != e.codigoEvento) {
      setspinervi("d-none")
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
          let newprecios = obten.data.map((g, i) => {
            let color = localidad.filter((f, i) => f.nombre == g.localodad)
            g.color = color[0].color
            g.idcolor = color[0].id
            g.typo = color[0].tipo
            return g
          })
          let colornuevo = mapalocal.map((L) => {
            if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
              L.localidaEspacio = newprecios[newprecios.findIndex(e => e.idcolor == L.id)]
              L.precio_descuento = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_descuento
              L.precio_discapacidad = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_discapacidad
              L.precio_normal = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_normal
              L.precio_tarjeta = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_tarjeta
              return L
            }
          })
          let pathnuevo = path.map((L) => {
            if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
              return L
            }
          })
          sessionStorage.setItem(Eventolocalidad, JSON.stringify([...colornuevo.filter((e) => e != undefined).map((e => {
            return e.id
          }))]))
          usedispatch(cargalocalidad([...colornuevo.filter((e) => e != undefined)]))
          let nuevosdatos = {
            precios: newprecios,
            pathmapa: pathnuevo.filter((e) => e != undefined),
            mapa: mapa[0].nombre_mapa
          }
          sessionStorage.eventoid = e.codigoEvento
          setPrecios(nuevosdatos)
          setDatoscon(e)

          consultarlocalidad()
          Cargarsillas(colornuevo.filter((e) => e != undefined)).then(outp => {
            setspinervi("d-none")
            velocidad()
            usedispatch(cargarsilla(outp))
            usedispatch(setModal({ nombre: 'ModalCarritov', estado: '' }))
          }).catch(err => {
            console.log(err)
          })
        }
      } catch (err) {
        console.log(err)
        setspinervi("d-none")
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
        setspinervi("d-none")
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
  const salir = () => {
    sessionStorage.removeItem(DatosUsuariocliente)
    sessionStorage.removeItem(DatosUsuarioLocalStorang)
    usedispatch(deletesuscrito({ ...userauthi }))
    SetSeleccion("")
  }
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
  const [publicidad, setpublicidad] = useState([])

  useEffect(() => {
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    Limpiarseleccion()
    const evento = async () => {
      try {
        const data = await cargarEventoActivo()
        const filtro = data != null ? data.filter((e) => new Date(e.fechaConcierto + " 23:59:59") > new Date()) : []
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
    ListarNoticias().then(ouput => {
      setpublicidad(ouput.data)
      //console.log(ouput)
    }).catch(err =>
      console.log(err)
    )
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
      }
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
    }
    /* (function (s, z, c, h, a, t) {
       s.webchat = s.webchat || function () {
         (s.webchat.q = s.webchat.q || []).push(arguments);
       };
       t = z.createElement(c),
         a = z.getElementsByTagName(c)[0]; t.async = 1;
       t.src = 'https://comnet.sz.chat/webchat/v2/webchat.js';
       a.parentNode.insertBefore(t, a);
       s.webchat('cid', '638bd42eabbe9a001766f854');
       s.webchat('host', h);
     })(window, document, 'script', 'https://comnet.sz.chat');
 
     window.addEventListener("message", function (event) {
       if (event.origin !== 'https://comnet.sz.chat') return;
     }, false)*/
  }, [])

  function eventocarrusel(e) {
    let datos = e.split("-")
    userauthi.login ? abrir({
      "nombreConcierto": datos[2],
      "codigoEvento": datos[0],
      "lugarConcierto": datos[1]
    }) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))
    /* abrir({
       "nombreConcierto": datos[2],
       "codigoEvento": datos[0],
       "lugarConcierto": datos[1]
     })
     return {
       nombreConcierto: datos[2],
       codigoEvento: datos[0],
       lugarConcierto: datos[3]
     }*/
  }
  return (
    <>
      {modal.nombre == "Modallocalida" ?
        <LocalidadmapViews
          handleClosesop={handleClosesop}
          showMapa={showMapa}
          intervalo={intervalo}
          setMapashow={setMapashow}
        /> : ''}
      {modal.nombre == "ModalCarritov" ?
        <ModalCarritov
          showshop={showshop}
          handleClosesop={detenervelocidad}
          detener={handleClosesop}

          setListarCarritoDetalle={setListarCarritoDetalle}
          datos={datos}
          precios={precios}
          intervalo={intervalo}

          setMapashow={setMapashow}
        /> : ''}
      {modal.nombre == "registro" ?
        <ResgistroView
          abrir={abrir}
          setDatoToas={setDatoToas} /> : ''}
      {modal.nombre == "ModalDetalle" ?
        <ModalDetalle

          intervalo={intervalo}

          setListarCarritoDetalle={setListarCarritoDetalle}
          listarCarritoDetalle={listarCarritoDetalle}
          setDatoToas={setDatoToas}
        /> : ''}

      {
        modal.nombre == "ModalPago" ? <ModalPago intervalo={intervalo} detenervelocidad={detenervelocidad} para={para} setModalPago={setModalPago} modalPago={modalPago} setDatoToas={setDatoToas} /> : null
      }
      <ModalReport
        repShop={repShop}
        intervalo={intervalo}
        setrepShow={setrepShow}
        setDatoToas={setDatoToas}
        detener={detenervelocidad}
      />
      <ModalEfectivo
        intervalo={intervalo}
        detener={paraenlace}
      />
      <ReporteView
        setrepShow={setrepShow} />
      {alert}
      <nav className="navbar navbar-expand-lg  justify-content-between navbar-dark bg-black  py-3">
        <div className="container-fluid col-lg-8    d-flex justify-content-between">
          <a className="navbar-brand " aria-label="TICKETS" href="#">
            <img src={icon} className="img-fluid" style={{ height: '50px' }} alt="" />
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

              {userauthi.login ?
                <li className="nav-item active" aria-current="page" onClick={() => SetSeleccion("Datos")}>
                  <a className="nav-link " >Datos</a>
                </li> : ""
              }
              {userauthi.login ?
                <li className="d-none nav-item active" aria-current="page" onClick={() => SetSeleccion("Tickets")}>
                  <a className="nav-link " href="#">Tickets</a>
                </li> : ""
              }
              {!userauthi.login ? <li className="  nav-item">
                <a className=" btn btn-outline-light  " href="#" onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: null }))}> Mi Cuenta <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                </svg></i> </a>
              </li> : <li className="  nav-item">
                <a className=" btn btn-outline-light  " href="#" onClick={salir}> Salir <i className="fa fa-window-close"></i> </a>
              </li>}
            </ul>

          </div>
        </div>
      </nav>
      <ModalLogin
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        abrir={abrir}
      />
      <ModalFacilitoView />
      {/* header */}
      {publicidad.length > 0 ? <div className="container-fluid  pt-2 px-0" style={{
        minHeight: '300px'
      }}>


        <Swiper
          className="AnimatedSlides "
          parallax={true}
          loop={publicidad.length > 1 ? true : false}
          autoHeight={true}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: true,
          }}
          modules={[Autoplay, EffectFade, Pagination]}>

          {
            publicidad.length > 0 ?
              publicidad.map((element, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div style={{ width: "100%", height: "400px" }}>
                      <div className="slide-image" style={{
                        position: "relative",
                        width: "100%",
                        height: "400px",
                      }}>

                        <div style={{
                          backgroundImage: "url('" + element.link_img + "')",
                          ...styleswiper.slideimg
                        }} >
                        </div>
                        <div style={styleswiper.fondo}>
                        </div>
                        <div className="descripciones ">
                          <div className="d-flex  flex-column text-white" >
                            <div className="py-3 d-none d-sm-block   ">
                              <div className=" d-none row d-flex  align-items-center p-1">
                                <i className="fa fa-volume-off fa-3x  col-2 ">  </i>
                                <h5 className="col-10 px-0 pt-2"
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
                            <h4 className=" " style={styleswiper.titulo}>{element.encabezado}  </h4>
                            <span style={styleswiper.subtitulo}>
                              {element.descripcion}
                            </span>
                            <div className="pt-2 ">
                              {
                                element.evento == null ?
                                  <a className="btn border rounded-1  btn-lg btn-outline-light "
                                    style={styleswiper.button}
                                    href={element.redirect}
                                    target="_blank"
                                  >VER MÁS</a> :
                                  <button className="btn border rounded-1  btn-lg btn-outline-light "
                                    onClick={() => eventocarrusel(element.evento)}
                                    style={styleswiper.button}
                                  >COMPRAR</button>

                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              }) : ''
          }

        </Swiper>
      </div> : <div className="container-fluid  p-0">
        <div className="col-12 mx-auto bg-header-boleteria" style={{ height: '400px', backgroundImage: `url(${header})` }}>
          <div className="container w-100 h-100 px-0">
            <div className="container btn-group-vertical  h-100 text-center px-0">
              <h1 className="text-white mx-auto" style={{ fontSize: '3.5em' }}><img src={logofla} className="img-fluid" style={{ height: '150px' }} alt="" /></h1>
              <p className="mx-auto text-white d-none" style={{ fontSize: '1.2em' }}><b>Compra</b> tu entrada <b>fácil, rápido</b> y
                <b>seguro</b>
              </p>
            </div>
          </div>
        </div>

      </div>}
      {/* eventos */}
      {seleccion == "" ?
        <div className="container-fluid " id="nuevoseventos">
          <div className="container p-3">
            <div className="row flex-wrap-reverse justify-content-center" id="accordion">
              <div className="col-12 col-lg-9">
                <div className="row  p-0">
                  {eventoslist.length > 0 ?
                    eventoslist.map((e, i) => {

                      return (
                        <div className="col-12 mx-auto my-3" id={"evento" + e.id} key={i}>
                          <a id={"headingThree" + e.id} className="collapsed evento" data-toggle="collapse" data-target={"#collapseid" + e.id} aria-controls={"#collapseid" + e.id} aria-expanded="false"
                          >
                            <div className="container rounded-7  d-flex justify-content-center px-0">
                              <img src={"https://flash.t-ickets.com/store/img/portadadeeventos.png"} className="img-fluid rounded-7 shadow-md " alt="" />
                            </div>
                          </a>
                          <div className="collapse container mt-4 px-0" aria-labelledby={"headingThree" + e.id} id={"collapseid" + e.id} data-parent="#accordion">
                            <div className="card row d-flex flex-row card-body rounded-7 py-5">
                              <div className="container col-12 col-md-6">
                                <div className="d-flex row  btn-group-vertical ">
                                  <div className="col-12" >
                                    <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">{e.nombreConcierto}</span> </h1>
                                    <h4 style={{ fontSize: '1.4em', }}><span id="tour">{e.descripcionConcierto} </span></h4>
                                    <div className="col-12 border border-bottom my-3"></div>
                                    <div style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                      <p style={{ fontSize: '1.0em' }}><b>Fecha:<span id="fechaEvento">{Dias[new Date(e.fechaConcierto).getDay()]}  {e.fechaConcierto} </span></b></p>
                                      <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                        <p className="col-12 pt-0" style={{ fontSize: '1.0em' }}><b>Hora:<span id="horaEvento"> {e.horaConcierto}</span></b></p>
                                      </div>
                                      <p className="" style={{ fontSize: '1.0em', }}><b>Lugar:<span id="lugarEvento">{e.lugarConcierto}</span></b></p>

                                      <div className="col-12 border border-bottom mb-3"></div>
                                      <div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 h-50 w-100"
                                    style={{
                                      height: 100,
                                      width: '100%'
                                    }} >
                                    <div>
                                      <div className="row" style={{ alignItems: 'stretch', lineHeight: '1', }} >
                                        <p className="col-12 pt-0" style={{ fontSize: '1.0em' }}><b>Datos de la empresa responsable<span id="horaEvento"></span></b></p>
                                        <div className="border"
                                          style={{
                                            height: 30,
                                            width: "90%",
                                            padding: 5
                                          }}
                                        >
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" col-12 text-center  pt-3"
                                    style={{
                                      bottom: 10,
                                    }}
                                  >
                                    <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                      className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? abrir(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >Comprar Entrada</p>
                                  </div>
                                </div>
                              </div>
                              <div className="container col-12 col-md-6 rounded-7  px-0">
                                <img src={e.mapaConcierto} className="img-fluid rounded-7 shadow-md " alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                    : <div className="col-12  mx-auto my-5" >
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
                  <div className="col-12 d-none col-lg-6 mx-auto my-5" >
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
          <div className="container p-3 d-none d-md-none  d-xl-block">
            <div className="row d-flex justify-content-center " >
              <div className="col-12 col-lg-9 px-0 ">
                <div className="row mx-auto bg-gradient d-flex justify-content-center px-0 ">
                  <h4 >
                    <b> EVENTOS PASADOS</b>
                  </h4>
                  <div className="row d-flex justify-content-center  " >
                    {
                      [...pasados].map((element, index) => {
                        return (
                          <div className="col-12 col-sm-6 col-md-4 px-1" key={index} >
                            <div
                              className="  rounded-7   "
                              style={{
                                height: '150px', width: '100%',
                                backgroundImage: "url('" + element + "')",
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                              }}

                            >

                            </div>

                          </div>
                        )
                      })

                    }

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


      <Modalterminos />
      <ModalConfima
        setrepShow={setrepShow}
        pararcontador={detenervelocidad}
      />
      <div className={spinervi}
        style={{
          display: 'none',
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000'
        }}
      >

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          padding: '10px',
        }}>
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
          <h4 className='text-light'>Cargando  evento  ...</h4>


        </div>
      </div>
      <TOAST
        Toastestado={Toastestado}
        setDatoToas={setDatoToas}
      />

      {modal.nombre == "pago" ? <Iframe
        setEstadoFrame={modal.nombre == "pago" ? true : false}
        url={modal.estado}
        intervalo={intervalo}
        detener={detenervelocidad}
      /> : ''}
      <div className="col-9" id="imprimecomprobante">

      </div>

    </>

  )

}
export default IndexFlas;