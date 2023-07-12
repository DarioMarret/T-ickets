import React, { useEffect, useState, useRef } from "react";
import { styleswiper, styleswipers } from "./styleswiper.js";
import { pasados, carrusel } from "./imagenstatctic.js";
let { icon, iconhead, uno, valla, prubasdos, principal, secundaria, tercero, logofla, mapa, portal, header, avatar, prubas } = carrusel
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
import { listarpreciolocalidad } from "utils/Querypanel";
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js";
import { cargarEventoActivo } from "utils/Querypanelsigui";
import { cargarMapa } from "utils/MapaQuery/index.js";
import { Dias, DatosUsuariocliente, Eventoid, listaasiento, DatosUsuarioLocalStorang, Eventolocalidad, seleccionmapa } from "utils/constantes";
import ModalCarritov from "views/Components/MODAL/ModalCarritov";
import SweetAlert from "react-bootstrap-sweetalert";
import LocalidadmapViews from "views/Components/MODAL/Modallocalida";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Drawer, List, ListItem, ListItemText, makeStyles, Skeleton } from "@mui/material";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import ResgistroView from "./ModalLogin/registro.js";
import { Button, Spinner } from "react-bootstrap";
import { Box } from "@mui/system";
import { Segment, Sidebar, Menu, Icon, Grid, ListIcon } from "semantic-ui-react";
import 'moment-timezone'
import 'moment/locale/es';
require('moment/locale/es.js')
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swipermedia.css"
import "./fechaefect.scss"
import "../../../assets/css/animate.css";
import "../../../assets/css/bootstrap.css";
import Iframe from "views/Components/IFrame/Iframe.js";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion.js";
import { quitarsilla } from "utils/Querypanelsigui.js";
import { correlativodelete } from "utils/Querypanelsigui.js";
import { ListaElimnaLCompleta } from "utils/CarritoLocalStorang.js";
import { Triangle } from "react-loader-spinner";
import { ListarNoticias } from "utils/Querypanelsigui.js";
import { setItervalo } from "StoreRedux/Slice/SuscritorSlice.js";
import ModalFacilitoView from "views/Components/MODAL/ModalFacilito.js";
import ReporteView from "views/Components/MODAL/Modalreporpago.js";
import Comprobante from "./comprobante/index.js";
import { espacio } from "utils/constantes.js";
import { correlativosadd } from "utils/Querypanelsigui.js";
import { listarRegistropanel } from "utils/pagos/Queripagos.js";
import { setToastes } from "StoreRedux/Slice/ToastSlice.js";
import SubscrtitoViews from "./ModalLogin/Modalsubscrito.js";
import { GeneraToken } from "utils/Querycomnet.js";
import { ValidarToken } from "utils/Querycomnet.js";
import { Seleccionaruserlista } from "utils/userQuery.js";
import ReactGA from 'react-ga';
import { eliminarRegistro } from "utils/pagos/Queripagos.js";
import addNotification from "react-push-notification";
import { Home } from "@mui/icons-material";
import Noticiamodal from "views/Components/MODAL/Modalnoti.js";
import { useGetEventosQuery } from "StoreRedux/Slicequery/querySlice.js";
import { useGetPubicidadQuery } from "StoreRedux/Slicequery/querySlice.js";
import { Listarticketporestado } from "utils/userQuery.js";
import { agregaReserva } from "utilsstile.js/guardarEventos.js";
import Inframene from "views/Components/IFrame/index.js";
import PaginasView from "./Eventosindex/index.js";
import NavbarView from "./Navbarindex/index.js";
import { ListaPreciosEvent } from "utils/EventosQuery/index.js";
import { EnviarDetalleCompras } from "utils/Emails/index.js";
import { ListarEventosFinalizados } from "utils/EventosQuery/index.js";
const TRACKING_ID = "G-LJN507B5NX";
const IndexFlas = () => {
  ReactGA.initialize(TRACKING_ID);
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
  const [spinervi, setspinervi] = useState("d-none")
  const [seleccion, SetSeleccion] = useState("");
  const [showshop, handleClosesop] = useState(false);
  const [datos, setDatoscon] = useState([])
  const [Toastestado, setDatoToas] = useState({ show: false, message: '', color: '', estado: '', })
  const [showLogin, setShowLogin] = useState(false)
  const [alert, setAlert] = useState(null);
  const [intervalo, setcrono] = useState("")
  const datatime = useRef(null);
  const intervalolista = useRef(null)
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
        }).catch(err => console.log(err)) : ''
        getVerTienda().filter(e => e.tipo == "correlativo").length > 0 ?
          getVerTienda().filter(e => e.tipo == "correlativo").map((elem, index) => {
            setTimeout(function () {
              correlativodelete({
                "id": elem.id,
                "estado": "disponible",
                "mas": "eliminar",
                "cedula": user.cedula,
                "cantidad": elem.cantidad
              }).then(ouput => {
                console.log(ouput)
              }).catch(err => {
                console.log(err)
              })
            }, 20 * index)
          }) : ''
        clearInterval(datatime.current);
        clearInterval(intervalolista.current)
        setDatoToas({ show: true, message: 'Su tiempo de compra a finalizado', color: 'bg-danger', estado: 'Mensaje importante', })
        handleClosesop(false)
        setMapashow(false)
        setDetalle(false)
        setModalPago(false)
        setrepShow(false)
        Limpiarseleccion()
        LimpiarLocalStore()
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        usedispatch(setModal({ nombre: '', estado: '' }))
        setcrono("00:00")
        //usedispatch(setItervalo({ intervalo: "00:00" }))
        $(".Mesa").removeClass("mesaocupado").addClass("mesadisponible")
        $(".Mesa").removeClass("mesareserva")
      }
      else {
        setcrono(minutos + ":" + segundos)
        //usedispatch(setItervalo({ intervalo: minutos + ":" + segundos }))
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

  function detenervelocidad() {
    let user = getDatosUsuariosLocalStorag()
    setcrono("")
    usedispatch(setModal({ nombre: "", estado: '' }))
    clearInterval(datatime.current)
    clearInterval(localidadtimer.current)
    setMapashow(false)
    setDetalle(false)
    setModalPago(false)
    setrepShow(false)
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    let array = ListaElimnaLCompleta()
    array.length > 0 ? quitarsilla({ "array": [...array] }).then(ouput => {
      console.log(ouput)
    }
    ).catch(err => console.log(err)) : ''
    getVerTienda().filter(e => e.tipo == e.tipo).length > 0 ?
      getVerTienda().map((elem, index) => {
        setTimeout(function () {
          console.log(elem, {
            "id": elem.id,
            "estado": "disponible",
            "mas": "menos",
            "cedula": user.cedula,
            "cantidad": elem.cantidad
          })
          correlativosadd({
            "id": elem.id,
            "estado": "disponible",
            "mas": "menos",
            "cedula": user.cedula,
            "cantidad": elem.cantidad
          }).then(ouput => {
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
  function detenercontador() {
    clearInterval(localidadtimer.current)
    clearInterval(datatime.current)
  }
  function sololimpiarlocal() {
    clearInterval(localidadtimer.current)
    clearInterval(datatime.current)
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    let array = ListaElimnaLCompleta()
    /* EnviarDetalleCompras().then(e => console.log(e)).catch(err=>{
       console.log(err)
     })*/
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
  function abrirCodigo(e) {
    e.codigoEvento == "9EGM42" || e.codigoEvento == "ANNKV7" ?
      $.confirm({
        title: 'Código Barcelona!',
        content: '' +
          '<form action="" className="formName">' +
          '<div className="form-group">' +
          '<label>Ingrese código de descuentos : Socio Barcelona</label>' +
          '<input type="text" placeholder="Código" className="codigo form-control" required />' +
          '</div>' +
          '</form>',
        buttons: {
          formSubmit: {
            text: 'Verificar',
            btnClass: 'btn-blue',
            action: function () {
              var name = this.$content.find('.codigo').val();
              if (!name) {
                $.alert('Ingrese un código');
                return false;
              }
              abrir(e)
            }
          },
          cancel: function () {

          },
          somethingElse: {
            text: 'Continuar ',
            btnClass: 'btn-blue',

            action: function () {
              abrir(e)
            }
          }
        }
      }) : abrir(e)
  }
  const abrir = async (e) => {

    if (e.codigoEvento == "6E1FO4" || e.codigoEvento == "ZKZX3U") {
      usedispatch(setModal({ nombre: "", estado: "" }))
      registraParticipante(e.codigoEvento, e.codigoEvento)

      return
    }

    sessionStorage.setItem("estadoevento", e.estado)
    setspinervi("")
    try {
      let registro = await listarRegistropanel({ "cedula": getDatosUsuariosLocalStorag().cedula })
      let seleccionuser = await Seleccionaruserlista({ "cedula": getDatosUsuariosLocalStorag().cedula })
      // console.log(seleccionuser)
      //registro.success && registro.data.some(f => f.estado_pago == "Pendiente")
      if (registro.success && registro.data.some(f => f.estado_pago == "Pendiente")) {
        setspinervi("d-none")
        SetSeleccion("Tickets")

        usedispatch(setToastes({
          show: true,
          message: "Antes de realizar una compra nueva debes de completar el proceso de pago del anterior",
          color: 'bg-warning',
          estado: "Tienes una compra pendiente "
        }))
        return
      }
      if (registro.success && registro.data.some(f => f.estado_pago == "Comprobar")){
        setspinervi("d-none")
        //SetSeleccion("Tickets")

        usedispatch(setToastes({
          show: true,
          message: "Espera a que un agente verifique tu transeferenciao deposito",
          color: 'bg-info',
          estado: "Tienes un reporte por combrobar"
        }))
        return
      }
      else {
        let id = sessionStorage.getItem(Eventoid)
        if (id != null && id != e.codigoEvento) {
          setspinervi("d-none")
          successAlert(e)
        }
        else {
          try {
            let obten = await listarpreciolocalidad(e.codigoEvento)
            const listalocal = await ListarLocalidad("")
            let localidades = await cargarMapa()
            sessionStorage.consierto = e.nombreConcierto
            // console.log(listalocal, localidades, obten)
            if (obten.data.length > 0) {
              let mapa = localidades.data.filter((L) => L.nombre_espacio == e.lugarConcierto)
              let mapalocal = listalocal.data.filter((K) => K.espacio == e.lugarConcierto)
              //   console.log(mapalocal, mapa)
              let localidad = JSON.parse(mapa[0].localidad)
              let path = JSON.parse(mapa[0].pathmap)
              //    console.log(obten.data)
              let newprecios = obten.data.map((g, i) => {
                let color = localidad.filter((f, i) => f.nombre == g.localidad)
                g.color = color[0].color
                g.idcolor = color[0].id
                g.typo = color[0].tipo
                g.ideprecio = g.id
                g.espacio = color[0].espacio
                sessionStorage.setItem(espacio, color[0].espacio)
                return g
              })
              let colornuevo = mapalocal.map((L) => {
                if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
                  L.localidaEspacio = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].nombre
                  L.precio_descuento = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_descuento
                  L.precio_discapacidad = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_discapacidad
                  L.precio_normal = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_normal
                  L.precio_tarjeta = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_tarjeta
                  L.ideprecio = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].ideprecio
                  L.espacioid = L.id_espacio
                  return L
                }
              })
              let pathnuevo = path.map((L) => {
                if (newprecios.findIndex(e => e.idcolor == L.id) != -1) {
                  return L
                }
              })
              sessionStorage.setItem(Eventolocalidad, JSON.stringify([...colornuevo.filter((e) => e != undefined).map((e => {
                return e
              }))]))
              usedispatch(cargalocalidad([...colornuevo.filter((e) => e != undefined)]))
              let nuevosdatos = {
                precios: newprecios,
                pathmapa: pathnuevo.filter((e) => e != undefined),
                mapa: mapa[0].nombre_mapa
              }
              // console.log(nuevosdatos)
              sessionStorage.eventoid = e.codigoEvento
              setPrecios(nuevosdatos)
              setDatoscon(e)
              //consultarlocalidad()
              Cargarsillas(colornuevo.filter((e) => e != undefined)).then(outp => {
                setspinervi("d-none")
                velocidad()
                usedispatch(cargarsilla(outp))
                usedispatch(setModal({ nombre: 'ModalCarritov', estado: '' }))
                ReactGA.event({
                  category: "Comprar",
                  action: "Eventos",
                  label: "" + e.codigoEvento,
                })
                // console.log(seleccionuser)
                if (seleccionuser.success) {
                  //console.log( registro.data.find(f => f.estado_pago == "Pendiente"))
                  Seleccionaruserlista({ "cedula": getDatosUsuariosLocalStorag().cedula, "accion": "liverar" }).then(outp => {
                    console.log(outp)
                  }).catch(error => {
                    console.log(error)
                  })
                }
                console.log(registro.data)
                /*if (registro.success){
                if (registro.data.some(f => f.estado_pago == "Pendiente")){
                  eliminarRegistro({ "id": registro.data.find(f => f.estado_pago == "Pendiente").id}).then(outp=>{
                    ReactGA.event({
                      category: "Elimino",
                      action: "registroCompra",
                      label: "Pendiente-TC",
                    })
                   // console.log(outp)
                  }).catch(err=>{
                    console.log(err)
                  })
                }
              }*/
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
    } catch (error) {
      console.log(error)
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
          let color = localidad.filter((f, i) => f.nombre == e.localidad)
          e.color = color[0].color
          e.idcolor = color[0].id
          e.typo = color[0].tipo
          return e
        })
        // console.log(mapa)
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
  const [listanueva, setShear] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [mostrar, setMostrar] = useState(true)
  var end = new Date('01/17/2023 7:00 PM');
  var _second = 1000;
  var _minute = _second * 60;
  var _hour = _minute * 60;
  var _day = _hour * 24;
  var time = useRef(null);;
  function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {
      clearInterval(time.current);
      console.log("terminio")
      document.getElementById('regeresion').innerHTML = " 0 :  00   :   00";
      document.getElementById('regeresiondos').innerHTML = " 0 :  00   :   00";;
      return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);
    console.log(days, hours, minutes, seconds)
    document.getElementById('regeresion').innerHTML = "  " + hours + " :  " + minutes + "  :  " + seconds + "";
    document.getElementById('regeresiondos').innerHTML = " " + hours + "  :  " + minutes + "  :  " + seconds;

  }
  //*aqui debe agregarse*/
  let { data: eventos = [], error: errorevento, isLoading } = useGetEventosQuery("ACTIVO")
  let { data: publici = [], error: errorPubli, isLoading: info } = useGetPubicidadQuery()
  function eventosmodal() {
    !(new Date("02/01/2023 19:10") < new Date()) ? usedispatch(setModal({ nombre: "noticia", estado: "" })) : ""
  }
  function registraParticipante(codigo, nombre) {
    let user = getDatosUsuariosLocalStorag().cedula
    Listarticketporestado(user).then(oup => {
      setspinervi("")
      if (!oup.success) {
        return
      }
      if (oup.data.length == 0) {
        agregaReserva(codigo, nombre).then(Ouput => {
          if (Ouput.success) {
            setTimeout(function () {
              setspinervi("d-none")
              //console.log("aqui")
              SetSeleccion("Tickets")
              usedispatch(setToastes({
                show: true,
                message: "Ya estas participando en Meet ",
                color: 'bg-success',
                estado: "Registro exitoso"
              }))
              usedispatch(setModal({ nombre: "pdfsshowpar", estado: "https://api.t-ickets.com/store/img/img_8242.jpg" }))

            }, 8000)
          } else {
            setspinervi("d-none")
          }
        }).catch(err => {
          console.log(err)
        })
        return
      }
      if (codigo == "ZKZX3U") {
        if (!oup.data.some(e => e.codigoEvento == "ZKZX3U")) {
          console.log(oup.data.some(e => e.codigoEvento == "ZKZX3U"))
          agregaReserva(codigo, nombre).then(Ouput => {
            if (Ouput.success) {
              setTimeout(function () {
                setspinervi("d-none")
                //console.log("jessy")
                SetSeleccion("Tickets")
                usedispatch(setToastes({
                  show: true,
                  message: "Ya estas participando en Meet & Greet Paola",
                  color: 'bg-success',
                  estado: "Registro exitoso"
                }))

                usedispatch(setModal({ nombre: "pdfsshowpar", estado: "https://api.t-ickets.com/store/img/img_8242.jpg" }))

              }, 8000)
            }
          }).catch(err => {
            console.log(err)
          })
          return
        }

        else {
          setspinervi("d-none")
          console.log("ya tiene boleos")
          SetSeleccion("Tickets")
          usedispatch(setToastes({
            show: true,
            message: "Ya estas participando en Meet & Greet Paola",
            color: 'bg-success',
            estado: "Ya tienes un registro "
          }))
        }
        return
      }
      if (codigo == "6E1FO4") {
        if (!oup.data.some(e => e.codigoEvento == "6E1FO4")) {
          console.log(oup.data.some(e => e.codigoEvento == "6E1FO4"))
          agregaReserva(codigo, nombre).then(Ouput => {
            if (Ouput.success) {
              setTimeout(function () {
                setspinervi("d-none")
                SetSeleccion("Tickets")
                usedispatch(setToastes({
                  show: true,
                  message: "Ya estas participando en Meet & Greet Jessi",
                  color: 'bg-success',
                  estado: "Registro exitoso"
                }))
                usedispatch(setModal({ nombre: "pdfsshowpar", estado: "https://api.t-ickets.com/store/img/img_8242.jpg" }))
              }, 8000)
            }
          }).catch(err => {
            console.log(err)
          })
          return
        }
        else {
          setspinervi("d-none")
          console.log("ya tiene boleos")
          SetSeleccion("Tickets")
          usedispatch(setToastes({
            show: true,
            message: "Ya estas participando en Meet & Greet Jessi",
            color: 'bg-success',
            estado: "Ya tienes un registro "
          }))
        }
        return
      }

    }).catch(err => {
      console.log(err)

    })

  }
  const filterNames = (nombre) => {
    return nombre.nombreConcierto.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };
  function Cambiarbusqueda(e) {
    if (e.length > 1) {
      setMostrar(false)
      setSearchValue(e)
    } else {
      setMostrar(true)
      setSearchValue(e)
    }

  }
  const ListaPrecios = async () => {
    try {
      const info = await ListaPreciosEvent();
      return info
      
    } catch (error) {
      return error
    }
    
  }
  const [estafun, setfunc] = useState(false)
  const [final, setFinal] = useState([])
  useEffect(() => {
    $(document).keyup(function (evtobj) {
      if (!(evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey)) {
        if (evtobj.keyCode == 16) { return false; }
        if (evtobj.keyCode == 17) { return false; }
       // $("body").append(evtobj.keyCode + " ");
      }
    });
    //time.current = setInterval(showRemaining, 1000);
    /* addNotification({
       title: 'Warning',
       subtitle: 'Recuerda ',
       message: '',
       theme: 'darkblue',
       native: true // when using native, your OS will handle theming.
     });*/
    ListaPrecios();
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    Limpiarseleccion()
    eventosmodal()
    const evento = () => {
      setfunc(false)
     try {
       console.log()
       /*if (errorPubli.status != undefined){
        return
       }*/
     //  console.log(isLoading, errorPubli)
    
   
        if (!errorevento == undefined) {
          return
        }
        if (!errorPubli == undefined) {
          return
        }
        if (!eventos == null) { return }
        let datos = isLoading ? eventos : eventos.data
        let publicin = publici
        const filtro = datos != null ? datos.filter((e) => new Date(e.fechaConcierto + " 23:59:59") > new Date()) : []
        const sorter = (a, b) => new Date(a.fechaConcierto) > new Date(b.fechaConcierto) ? 1 : -1;
        setfunc(true)
        isLoading ? "" : setEventos(filtro.sort(sorter))
        info ? "" : setpublicidad(publicin.data)
        isLoading ? "" : setShear(filtro.sort(sorter))
      } catch (error) {
        console.log(error)
      }
    }
    evento()
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

    ListarEventosFinalizados().then(oup => {
    // if(true) return
      if (oup.length > 0) {
        setFinal(oup)
        console.log()
      }
    }).catch(err => {
      console.log(err)
    })
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
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.set({
      username: localStorage.getItem('DatoCliente'),
    })
    /**aqui */
    

    /* userauthi.login ? (new Date("02/01/2023 19:00 ") > new Date())? addNotification({
       title: 'Recuerda',
       subtitle: 'Recuerda ',
       message: ' Eladio Carrión Guayaquil 1 de Febrero 19:00 PM',
       theme: 'darkblue',
       native: true // when using native, your OS will handle theming.
     }):"" : ""*/

    /* setTimeout(function () {
       usedispatch(setModal({ nombre: "", estado: "" }))
     }, 6000)*/


  }, [isLoading, info])
  seleccion == "" && final.length>0 ?
    setTimeout(function () {
      $('.logos-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1800,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
          breakpoint: 750,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 520,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    }, 1000) : ""
  function regsitronew() {
    usedispatch(setModal({ nombre: 'registro', estado: "" }))
    ReactGA.event({
      category: "Ver-Registrado",
      action: "abrir",
      label: "Button",
    })
  }
  function eventocarrusel(e) {
    let datos = e.split("-")
    userauthi.login ? abrir({
      "nombreConcierto": datos[2],
      "codigoEvento": datos[0],
      "lugarConcierto": datos[1],
    }) :
      usedispatch(setModal({
        nombre: 'loginpage', estado: {
          "nombreConcierto": datos[2],
          "codigoEvento": datos[0],
          "lugarConcierto": datos[1],
        }
      }))
    ReactGA.event({
      category: "Comprar",
      action: "carrusel",
      label: datos[0],
    })
    return {
      nombreConcierto: datos[2],
      codigoEvento: datos[0],
      lugarConcierto: datos[3]
    }
  }
  const styles = {
    paper: {
      background: "blue"
    }
  }
  const [visible, setVisible] = React.useState(false)
  function abrirNuevoTab() {
    // Abrir nuevo tab
  //  var win = window.open('https://t-ickets.net/3FynwiC', '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
   // win.focus();
  }

  return (

    <>
      <Noticiamodal />
      <NavbarView
        icon={icon}
        setVisible={setVisible}
        visible={visible}
        SetSeleccion={SetSeleccion}
        salir={salir}
      />

      
      <Inframene />
      {modal.nombre == "Modallocalida" ?
        <LocalidadmapViews
          intervalo={intervalo}
          intervalolista={intervalolista}
        /> : ''}
      {modal.nombre == "ModalCarritov" ?
        <ModalCarritov
          handleClosesop={detenervelocidad}
          setListarCarritoDetalle={setListarCarritoDetalle}
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
        comprar={sololimpiarlocal}
      />
      <ModalEfectivo
        intervalo={intervalo}
        detener={sololimpiarlocal}
        detenervelocidad={detenervelocidad}
      />
      <ReporteView
        setrepShow={setrepShow}
        comprar={sololimpiarlocal} />
      {alert}
      <ModalLogin
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        abrir={abrir}
      />
      <ModalFacilitoView />
      <Iframe
        setEstadoFrame={modal.nombre == "pago" ? true : false}
        url={modal.estado}
        intervalo={intervalo}
        detener={detenervelocidad}
      />
      {/* header */}
      {publicidad!=undefined&& publicidad.length > 0 ?
        <div className="container-fluid   px-0" style={{
          minHeight: '300px'
        }}>
          <Swiper
            className="AnimatedSlides"
            parallax={true}
            loop={publicidad.length > 1 ? true : false}
            autoHeight={true}

            pagination={true}
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
                      {/*className="d-none d-sm-none d-md-block"*/}
                      <div className="d-none d-sm-none d-md-block" style={{ width: "100%", height: "453px" }}>
                        <div style={{
                          backgroundImage: "url('" + element.link_img + "')",
                          ...styleswipers.slideimgcenter
                        }}></div>
                        <div style={{
                          backgroundImage: "url('" + element.link_img + "')",
                          ...styleswipers.slideimg
                        }} >
                          <div>
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
                                  >EVENTO - <span className=" text-danger font-weight-bold"> PRESENCIAL </span> </h5>
                                </div>
                              </div>
                              <div className="d-block d-sm-none" >
                                <div className="d-flex flex-row justify-content-center text-center">
                                  <i className="fa fa-volume-off fa-1x"> </i>
                                  <h5 className=" px-0"
                                    style={{
                                      fontSize: '0.9em',
                                    }}
                                  >EVENTO -  <span className=" text-danger font-weight-bold"> PRESENCIAL </span> </h5>
                                </div>
                              </div>
                              <h4 className=" font-weight-bold " style={styleswiper.titulo}>{element.encabezado}  </h4>
                              <span className="" style={styleswiper.subtitulo}>
                                {element.descripcion}
                              </span>
                              <div className="pt-2  ">
                                {
                                  element.evento == null ?
                                    <button className="btn border rounded-1  btn-lg btn-light "
                                      style={styleswiper.button}


                                      onClick={() => !userauthi.login ? regsitronew() : abrirNuevoTab()}
                                    >{userauthi.login ? element.evento == null ? "Muy Pronto": "Comprar" : "Registrate"}</button> :
                                    <button className="btn border rounded-1  btn-lg btn-light "
                                      onClick={() => eventocarrusel(element.evento)}
                                      style={styleswiper.button}
                                    >COMPRAR</button>

                                }
                              </div>
                            </div>
                          </div>
                          <div className=" contador  "

                          >
                            <div className="regeresion" >
                              <h5 className="tiempo" id="regeresion"></h5>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*//d-block d-sm-block d-md-none*/}
                      <div className="d-block d-sm-block d-md-none" style={{ width: "100%", height: "auto" }}>
                        <div className="slide-image" style={{
                          position: "relative",
                          width: "100%",
                          height: "auto",
                        }}>
                          {element.evento ? <div style={{
                            backgroundImage: "url('" + element.redirect + "')",
                            ...styleswiper.slideimg
                          }} >
                          </div> : < div style={{
                            backgroundImage: "url('" + element.redirect + "')",
                            ...styleswiper.slideimg
                          }} >
                          </div>}
                          <div style={styleswiper.fondo}>
                          </div>
                          <div className="descripciones">
                            <div className="d-flex  flex-column text-white" >
                              <div className="py-3 d-none d-sm-block   ">
                                <div className=" d-none row d-flex  align-items-center p-1">
                                  <i className="fa fa-volume-off fa-3x  col-2 ">  </i>
                                  <h5 className="col-10 px-0 pt-2"
                                    style={{
                                      fontSize: '0.9em'
                                    }}
                                  >EVENTO - <span className=" text-danger font-weight-bold"> PRESENCIAL </span> </h5>
                                </div>
                              </div>
                              <div className="d-block d-sm-none" >
                                <div className="d-flex flex-row d-none justify-content-center text-center">
                                  <i className="fa fa-volume-off fa-1x"> </i>
                                  <h5 className=" px-0"
                                    style={{
                                      fontSize: '0.9em',
                                    }}
                                  >EVENTO -  <span className=" text-danger font-weight-bold"> PRESENCIAL </span> </h5>
                                </div>
                              </div>
                              <h4 className=" font-weight-bold  text-danger" style={styleswiper.titulo}>{element.encabezado}  </h4>
                              <span className="d-none" style={styleswiper.subtitulo}>
                                {element.descripcion}
                              </span>
                              <div className="pt-2 ">
                                {
                                  element.evento == null ?
                                    <button className="btn border rounded-1  btn-lg btn-light "
                                      style={styleswiper.button}


                                      onClick={() => !userauthi.login ? regsitronew() : abrirNuevoTab()}
                                    >{userauthi.login ? element.evento == null ? "Muy Pronto" : "Comprar" : "Registrate"}</button> :
                                    <button className="btn border rounded-1  btn-lg btn-light "
                                      onClick={() => eventocarrusel(element.evento)}
                                      style={styleswiper.button}
                                    >COMPRAR</button>

                                }
                              </div>
                            </div>
                          </div>
                          <div className=" contadordos  "                >
                            <div className="regeresion">
                              <h5 className="tiempo" id="regeresiondos"></h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                }) : ''
            }
          </Swiper>
        </div> :
        <div className="container-fluid  p-0">
          <div className="col-12 mx-auto bg-header-boleteria" style={{ height: '300px', backgroundImage: `url(${header})` }}>
            <div className="container w-100 h-100 px-0">
              <div className="container btn-group-vertical  h-100 text-center px-0">
                <h1 className="text-white mx-auto" style={{ fontSize: '3.5em' }}>
                  <img src={iconhead} className="img-fluid" style={{ height: '150px' }} alt="" /></h1>
                <p className="mx-auto text-white d-none" style={{ fontSize: '1.2em' }}><b>Compra</b> tu entrada <b>fácil, rápido</b> y
                  <b>seguro</b>
                </p>
              </div>
            </div>
          </div>
        </div>}
      {/* eventos */}
      {seleccion == "" ?
        <div className="col-12 col-lg-9 py-2   d-flex justify-content-end">
          <div className=" col-12 col-md-6 ">
            <form className="form" action="">
              <input className="input" type="search"
                onChange={(e) => Cambiarbusqueda(e.target.value)}
                placeholder="Buscar eventos ..." />
              <i className="fass fa fa-search"></i>
            </form>
            <div className="input-group d-none">
              <input className=" form-control "
                type="search" name="buscar"
                placeholder="Buscar por nombre de Evento"
                onChange={(e) => Cambiarbusqueda(e.target.value)}
                value={searchValue}
              />
              <div className="input-group-prepend">
                <button className="input-group-text btn-primary text-white "
                  onClick={() => Cambiarbusqueda("")}
                >
                  {searchValue.length > 1 ? <i className="bi bi-x-lg"></i> :
                    <i className="bi bi-search"></i>
                  }</button>
              </div>
            </div>
          </div>

        </div> : ""}
      {/*Listar evento sin filtro  */}
      {seleccion == "" && mostrar ?
        <div className="container-fluid " id="nuevoseventos">
          <div className="container p-3">
            {eventoslist.length > 4 ?
              <div className="row mx-auto bg-gradient d-flex justify-content-center px-0 ">

                <div className="col-12 col-lg-12 border-dark mb-3 text-end ">
                  <h4 className=" ">
                    <b className="  "> Pagina: {userauthi.page} Eventos {eventoslist.slice(userauthi.inicio, userauthi.final).length} de {eventoslist.length} </b>
                  </h4>
                </div>
                {/* Paginacion del evento */}
                <PaginasView
                  eventoslist={eventoslist}
                />
              </div> :
              ""}
            {/* Listar Eventos */}
            <div className="row  justify-content-center" id="accordion">

              <div className="col-12 col-lg-9">
                <div className="row  p-0">
                  {eventoslist.length > 0 ?
                    eventoslist.slice(userauthi.inicio, userauthi.final).map((e, i) => {
                      return (
                        <div className="col-12  mx-auto my-3" id={"evento" + e.id} key={i}

                        >
                          <a id={"headingThree" + e.id} className="collapsed evento eventoss" data-toggle="collapse" data-target={"#collapseid" + e.id} aria-controls={"#collapseid" + e.id} aria-expanded="false"
                          >
                            <div className="container rounded-7  d-flex justify-content-center px-0">
                              <i className="  text-info btn-hover" style={{
                                position: "absolute",
                                margin: "auto",
                                bottom: -2,
                                width: 40,
                              }}>
                                <svg className="seudtres " xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1"
                                  style={{
                                    filter: "drop-shadow(1px 1px 3px #888)"
                                  }}
                                  viewBox="0 0 21000 15700">
                                  <g id="Capa_x0020_1">
                                    <polygon className="line1" fill="#A9ABAE" points="15706,1584 10507,6889 5309,1584 6932,-1 10507,3648 14083,-1 " />
                                    <polygon className="line3" fill="#E6E7E8" points="21008,4985 10507,15701 8,4985 1725,3307 10513,12281 19287,3305 " />
                                    <g id="_2060064090544">
                                    </g>
                                    <g id="_2060064092496">
                                    </g>
                                    <g id="_2060064090096">
                                    </g>
                                    <g id="_2060064090192">
                                    </g>
                                    <g id="_2060064090032">
                                    </g>
                                    <g id="_2060064089840">
                                    </g>
                                    <g id="_2060064089648">
                                    </g>
                                    <g id="_2060064088752">
                                    </g>
                                    <g id="_2060064087472">
                                    </g>
                                    <g id="_2060064087504">
                                    </g>
                                    <g id="_2060064086576">
                                    </g>
                                    <g id="_2060064086544">
                                    </g>
                                    <g id="_2060064087216">
                                    </g>
                                    <g id="_2060064087760">
                                    </g>
                                    <g id="_2060064084368">
                                    </g>
                                    <polygon className="line2" fill="#D2D3D5" points="4440,1615 10517,7827 16671,1547 18381,3233 10517,11278 2718,3313 " />
                                  </g>
                                </svg>
                              </i>
                              <Button className=" d-none btn  btn-outline-info  rounded-7 btn-hover "
                                style={{
                                  position: "absolute",
                                  margin: "auto",
                                  right: 25,
                                  bottom: 25,
                                  zIndex: 2
                                }}
                              >
                                <i className="bi bi-cart-fill"></i>
                                COMPRAR
                              </Button>
                              <img src={e.imagenConcierto} className="img-fluid rounded-7 shadow-md  btn-hover img-evento " alt=""

                              />
                            </div>
                          </a>
                          <div className="collapse float-end container mt-4 px-0" aria-labelledby={"headingThree" + e.id} id={"collapseid" + e.id} data-parent="#accordion">
                            <div className="card row d-flex flex-row card-body rounded-7 py-5">
                              {e.estado == "PROCESO" ?
                                <div className="col-12 col-lg-9  text-center pb-n2  ">
                                  <p className="" style={{ fontSize: '1.5em', }}><i className="bi bi-calendar-week-fill"></i> <b>Venta:<span >21 de Enero del 2023</span></b></p>
                                </div> : ""
                              }
                              <div className="container col-12 col-md-6">
                                <div className="d-flex row  btn-group-vertical ">

                                  <div className="col-12" >
                                    <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">{e.nombreConcierto}</span> </h1>
                                    <h4 style={{ fontSize: '1.4em', }}><span id="tour">{e.descripcionConcierto} </span></h4>
                                    <div className="col-12 border border-bottom my-3"></div>
                                    <div style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                      <p style={{ fontSize: '1.0em' }}>  <i className="bi bi-calendar-week-fill"></i>   <b>  Fecha:<span id="fechaEvento">{Dias[new Date(e.fechaConcierto).getDay()]}  {e.fechaConcierto} </span></b></p>
                                      <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                        <p className="col-12 pt-0" style={{ fontSize: '1.0em' }}><i className="bi bi-alarm-fill"></i> <b> Hora:<span id="horaEvento"> {e.horaConcierto}</span></b></p>
                                      </div>
                                      <p className="" style={{ fontSize: '1.0em', }}><i className="bi bi-geo-alt-fill"></i> <b>Lugar:<span id="lugarEvento">{e.lugarConcierto}</span></b></p>
                                      <div className="col-12 border border-bottom mb-3"></div>
                                      <div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" d-none col-12  h-50 w-100"
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
                                  <div className=" col-12   pt-3"
                                    style={{
                                      bottom: 10,
                                    }}
                                  >
                                    {true ?
                                      <div className="row"
                                      >
                                        {e.id == 17 ?

                                          <div style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                            <p style={{ fontSize: '0.8em' }}>    <b className="   "
                                              style={{
                                                fontWeight: "normal"

                                              }}
                                            >  <span style={{
                                              fontWeight: "bold"
                                            }}>PROMOTOR: </span>   <span id="fechaEvento" > ASB ENTERTAINMENT MUSIC</span></b></p>
                                            <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                              <p className="col-12 pt-0 mt-n2" style={{
                                                fontSize: '0.8em',
                                                fontWeight: "normal"
                                              }}

                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>WEB: </span> <span id="horaEvento">WWW.ASBEVENTOS.COM</span></p>
                                              <p className="col-12 pt-0 mt-n2" style={{
                                                fontSize: '0.8em',
                                                fontWeight: "normal"
                                              }}

                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>RESPONSABLE: </span><span id="lugarEvento">BLASCHKE SERRANO JOSE ENRIQUE</span></p>
                                              <p className="col-12 pt-0 mt-n2" style={{
                                                fontSize: '0.8em',
                                                fontWeight: "normal"
                                              }}

                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>RUC: </span><span id="lugarEvento">09910904614001</span></p>
                                            </div>


                                            <div>
                                            </div>
                                          </div> :
                                          e.id == 18 ?

                                            <div style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                              <p style={{ fontSize: '0.8em' }}>    <b className="   "
                                                style={{
                                                  fontWeight: "normal"

                                                }}
                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>PROMOTOR: </span>   <span id="fechaEvento" > ASB ENTERTAINMENT MUSIC</span></b></p>
                                              <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                                <p className="col-12 pt-0 mt-n2" style={{
                                                  fontSize: '0.8em',
                                                  fontWeight: "normal"
                                                }}

                                                >  <span style={{
                                                  fontWeight: "bold"
                                                }}>WEB: </span> <span id="horaEvento">WWW.ASBEVENTOS.COM</span></p>
                                                <p className="col-12 pt-0 mt-n2" style={{
                                                  fontSize: '0.8em',
                                                  fontWeight: "normal"
                                                }}

                                                >  <span style={{
                                                  fontWeight: "bold"
                                                }}>RESPONSABLE: </span><span id="lugarEvento   " className="  text-uppercase">Alan Israel Andrade Logacho </span></p>
                                                <p className="col-12 pt-0 mt-n2" style={{
                                                  fontSize: '0.8em',
                                                  fontWeight: "normal"
                                                }}

                                                >  <span style={{
                                                  fontWeight: "bold"
                                                }}>RUC: </span><span id="lugarEvento">1715820906001 </span></p>
                                              </div>


                                              <div>
                                              </div>
                                            </div> : ""

                                        }

                                      </div>
                                      : ""}
                                    <div className=" text-center">
                                      {/*e.estado == "PROCESO" ?
                                        <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? tokenvalida(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                          Comprar Entrada</p>
                                        : ""*/}
                                      {e.estado == "cancelar" ?
                                        <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? "" : usedispatch(setModal({ nombre: 'registro', estado: null }))} >
                                          {!userauthi.login ? "SUSCRÍBETE" : "YA ESTAS SUSCRITO"}</p> : ""}

                                      {e.codigoEvento == "6E1FO4" || e.codigoEvento == "ZKZX3U" ?
                                        userauthi.login ? <p className="btn btn-primary float-center" onClick={() => registraParticipante(e.codigoEvento, e.nombreConcierto)} >Participa </p> :
                                          <p className="btn btn-primary float-center" onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: { codigoEvento: e.codigoEvento, nombreConcierto: e.nombreConcierto } }))} >Participa </p>

                                        : <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? abrir(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                          {e.estado == "ACTIVO" ? "Comprar Entrada" : "RESERVAR"}</p>
                                      }


                                      {/*e.estado == "ACTIVO" ?
                                        <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? abrir(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                          {e.estado == "ACTIVO" ? "Comprar Entrada" : "RESERVAR"}</p>
                                        : ""*/}
                                      {/* 
                                        validar la hora de pago  cuando sea false permita comprar con token
                                        (new Date("01/20/2023 23:59 ")>new Date())
                                        */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container col-12 col-md-6 rounded-7  px-0">
                                <img src={e.codigoEvento == "9EGM42" ? "https://api.t-ickets.com/store/img/whatsapp%20image%202023-01-30%20at%2019.51.02.jpeg" : e.mapaConcierto} className="img-fluid rounded-7 shadow-md " alt="" />
                              </div>

                            </div>

                          </div>
                        </div>
                      )
                    })
                    : !estafun ? <div className="col-12  mx-auto my-5" >
                      <div>
                        <div className="container rounded-7-md px-0" style={{ height: 300 }}>

                          <Skeleton variant="rounded" width="100%" height="80%" />
                          <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
                          </Box>
                        </div>
                      </div>

                    </div> :
                      <div className="col-12  col-lg-6 mx-auto my-5" >
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
                      </div>}
                  {/* Aqui terminara el map siguente evento queda para poster Proximamente */}
                  <SubscrtitoViews />

                </div>
              </div>

            </div>
            {/* Paginacion del evento */}
            <PaginasView
              eventoslist={eventoslist}
            />
          </div>
          <div className="container p-3   d-xl-block">
            <div className="row d-flex justify-content-center " >
              <div className="col-12 col-lg-9 px-0 pb-3   ">

                <div className="row mx-auto bg-gradient d-flex justify-content-center px-0 ">
                  <div className="col-12  border-bottom border-3 border-dark mb-3">
                    <h4 className="text-capitalize font-weight-bolds">
                      <b className="  "> Eventos Pasados</b>
                    </h4>
                  </div>


                  <section className="logos-slider slider d-flex flex-wrap">

                    {final.length > 0 ?
                      [...final].filter(e => new Date(e.fechaConcierto + " 23:59:59") < new Date()).map((element, index) => {
                        return (
                          <div className="slide col-12 col-sm-6 col-md-4 px-0 pb-1" key={index} >
                            <div
                              className="  rounded-7   "
                              style={{
                                height: '150px', width: '100%',
                                backgroundImage: "url('" + element.imagenConcierto + "')",
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                            </div>
                          </div>
                        )
                      })

                      : ""}

                  </section>
                </div>
              </div>
            </div>

          </div>
        </div> : ''}
        {/*Listar evento con Filtro  */}
      {seleccion == "" && !mostrar ?
        <div className="container-fluid " id="nuevoseventos">
          <div className="container p-3">
            <div className="row  justify-content-center" id="accordion">
              <div className="col-12 col-lg-9">
                <div className="row  p-0">
                  {eventoslist.filter(filterNames).length > 0 ?
                    eventoslist.filter(filterNames).map((e, i) => {
                      return (
                        <div className="col-12  mx-auto my-3" id={"evento" + e.id} key={i}

                        >
                          <a id={"headingThree" + e.id} className="collapsed evento eventoss" data-toggle="collapse" data-target={"#collapseid" + e.id} aria-controls={"#collapseid" + e.id} aria-expanded="false"
                          >
                            <div className="container rounded-7  d-flex justify-content-center px-0">
                              <i className="  text-info btn-hover" style={{
                                position: "absolute",
                                margin: "auto",
                                bottom: -2,
                                width: 40,
                              }}>
                                <svg className="seudtres " xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1"
                                  style={{
                                    filter: "drop-shadow(1px 1px 3px #888)"
                                  }}
                                  viewBox="0 0 21000 15700">
                                  <g id="Capa_x0020_1">
                                    <polygon className="line1" fill="#A9ABAE" points="15706,1584 10507,6889 5309,1584 6932,-1 10507,3648 14083,-1 " />
                                    <polygon className="line3" fill="#E6E7E8" points="21008,4985 10507,15701 8,4985 1725,3307 10513,12281 19287,3305 " />
                                    <g id="_2060064090544">
                                    </g>
                                    <g id="_2060064092496">
                                    </g>
                                    <g id="_2060064090096">
                                    </g>
                                    <g id="_2060064090192">
                                    </g>
                                    <g id="_2060064090032">
                                    </g>
                                    <g id="_2060064089840">
                                    </g>
                                    <g id="_2060064089648">
                                    </g>
                                    <g id="_2060064088752">
                                    </g>
                                    <g id="_2060064087472">
                                    </g>
                                    <g id="_2060064087504">
                                    </g>
                                    <g id="_2060064086576">
                                    </g>
                                    <g id="_2060064086544">
                                    </g>
                                    <g id="_2060064087216">
                                    </g>
                                    <g id="_2060064087760">
                                    </g>
                                    <g id="_2060064084368">
                                    </g>
                                    <polygon className="line2" fill="#D2D3D5" points="4440,1615 10517,7827 16671,1547 18381,3233 10517,11278 2718,3313 " />
                                  </g>
                                </svg>
                              </i>
                              <Button className=" d-none btn  btn-outline-info  rounded-7 btn-hover "
                                style={{
                                  position: "absolute",
                                  margin: "auto",
                                  right: 25,
                                  bottom: 25,
                                  zIndex: 2
                                }}
                              >
                                <i className="bi bi-cart-fill"></i>
                                COMPRAR
                              </Button>
                              <img src={e.imagenConcierto} className="img-fluid rounded-7 shadow-md  btn-hover img-evento " alt=""

                              />
                            </div>
                          </a>
                          <div className="collapse float-end container mt-4 px-0" aria-labelledby={"headingThree" + e.id} id={"collapseid" + e.id} data-parent="#accordion">
                            <div className="card row d-flex flex-row card-body rounded-7 py-5">
                              {e.estado == "PROCESO" ?
                                <div className="col-12 col-lg-9  text-center pb-n2  ">
                                  <p className="" style={{ fontSize: '1.5em', }}><i className="bi bi-calendar-week-fill"></i> <b>Venta:<span >21 de Enero del 2023</span></b></p>
                                </div> : ""
                              }
                              <div className="container col-12 col-md-6">
                                <div className="d-flex row  btn-group-vertical ">

                                  <div className="col-12" >
                                    <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">{e.nombreConcierto}</span> </h1>
                                    <h4 style={{ fontSize: '1.4em', }}><span id="tour">{e.descripcionConcierto} </span></h4>
                                    <div className="col-12 border border-bottom my-3"></div>
                                    <div style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                      <p style={{ fontSize: '1.0em' }}>  <i className="bi bi-calendar-week-fill"></i>   <b>  Fecha:<span id="fechaEvento">{Dias[new Date(e.fechaConcierto).getDay()]}  {e.fechaConcierto} </span></b></p>
                                      <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                        <p className="col-12 pt-0" style={{ fontSize: '1.0em' }}><i className="bi bi-alarm-fill"></i> <b> Hora:<span id="horaEvento"> {e.horaConcierto}</span></b></p>
                                      </div>
                                      <p className="" style={{ fontSize: '1.0em', }}><i className="bi bi-geo-alt-fill"></i> <b>Lugar:<span id="lugarEvento">{e.lugarConcierto}</span></b></p>
                                      <div className="col-12 border border-bottom mb-3"></div>
                                      <div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className=" d-none col-12  h-50 w-100"
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
                                  <div className=" col-12   pt-3"
                                    style={{
                                      bottom: 10,
                                    }}
                                  >
                                    {true ?
                                      <div className="row"
                                      >
                                        {e.id == 17 ?

                                          <div style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                            <p style={{ fontSize: '0.8em' }}>    <b className="   "
                                              style={{
                                                fontWeight: "normal"

                                              }}
                                            >  <span style={{
                                              fontWeight: "bold"
                                            }}>PROMOTOR: </span>   <span id="fechaEvento" > ASB ENTERTAINMENT MUSIC</span></b></p>
                                            <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                              <p className="col-12 pt-0 mt-n2" style={{
                                                fontSize: '0.8em',
                                                fontWeight: "normal"
                                              }}

                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>WEB: </span> <span id="horaEvento">WWW.ASBEVENTOS.COM</span></p>
                                              <p className="col-12 pt-0 mt-n2" style={{
                                                fontSize: '0.8em',
                                                fontWeight: "normal"
                                              }}

                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>RESPONSABLE: </span><span id="lugarEvento">BLASCHKE SERRANO JOSE ENRIQUE</span></p>
                                              <p className="col-12 pt-0 mt-n2" style={{
                                                fontSize: '0.8em',
                                                fontWeight: "normal"
                                              }}

                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>RUC: </span><span id="lugarEvento">09910904614001</span></p>
                                            </div>


                                            <div>
                                            </div>
                                          </div> :
                                          e.id == 18 ?

                                            <div style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                              <p style={{ fontSize: '0.8em' }}>    <b className="   "
                                                style={{
                                                  fontWeight: "normal"

                                                }}
                                              >  <span style={{
                                                fontWeight: "bold"
                                              }}>PROMOTOR: </span>   <span id="fechaEvento" > ASB ENTERTAINMENT MUSIC</span></b></p>
                                              <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                                <p className="col-12 pt-0 mt-n2" style={{
                                                  fontSize: '0.8em',
                                                  fontWeight: "normal"
                                                }}

                                                >  <span style={{
                                                  fontWeight: "bold"
                                                }}>WEB: </span> <span id="horaEvento">WWW.ASBEVENTOS.COM</span></p>
                                                <p className="col-12 pt-0 mt-n2" style={{
                                                  fontSize: '0.8em',
                                                  fontWeight: "normal"
                                                }}

                                                >  <span style={{
                                                  fontWeight: "bold"
                                                }}>RESPONSABLE: </span><span id="lugarEvento   " className="  text-uppercase">Alan Israel Andrade Logacho </span></p>
                                                <p className="col-12 pt-0 mt-n2" style={{
                                                  fontSize: '0.8em',
                                                  fontWeight: "normal"
                                                }}

                                                >  <span style={{
                                                  fontWeight: "bold"
                                                }}>RUC: </span><span id="lugarEvento">1715820906001 </span></p>
                                              </div>


                                              <div>
                                              </div>
                                            </div> : ""

                                        }

                                      </div>
                                      : ""}
                                    <div className=" text-center">
                                      {/*e.estado == "PROCESO" ?
                                        <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? tokenvalida(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                          Comprar Entrada</p>
                                        : ""*/}
                                      {e.estado == "cancelar" ?
                                        <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? "" : usedispatch(setModal({ nombre: 'registro', estado: null }))} >
                                          {!userauthi.login ? "SUSCRÍBETE" : "YA ESTAS SUSCRITO"}</p> : ""}

                                      {e.codigoEvento == "6E1FO4" || e.codigoEvento == "ZKZX3U" ?
                                        userauthi.login ? <p className="btn btn-primary float-center" onClick={() => registraParticipante(e.codigoEvento, e.nombreConcierto)} >Participa </p> :
                                          <p className="btn btn-primary float-center" onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: { codigoEvento: e.codigoEvento, nombreConcierto: e.nombreConcierto } }))} >Participa </p>

                                        : <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? abrir(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                          {e.estado == "ACTIVO" ? "Comprar Entrada" : "RESERVAR"}</p>
                                      }


                                      {/*e.estado == "ACTIVO" ?
                                        <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? abrir(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                          {e.estado == "ACTIVO" ? "Comprar Entrada" : "RESERVAR"}</p>
                                        : ""*/}
                                      {/* 
                                        validar la hora de pago  cuando sea false permita comprar con token
                                        (new Date("01/20/2023 23:59 ")>new Date())
                                        */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container col-12 col-md-6 rounded-7  px-0">
                                <img src={e.codigoEvento == "9EGM42" ? "https://api.t-ickets.com/store/img/whatsapp%20image%202023-01-30%20at%2019.51.02.jpeg" : e.mapaConcierto} className="img-fluid rounded-7 shadow-md " alt="" />
                              </div>

                            </div>

                          </div>
                        </div>
                      )
                    })
                    : <div className="col-12  mx-auto my-5" >
                      <div>
                        <div className="container rounded-7-md px-0" style={{ height: 300 }}>
                          <h3>
                            Eventos no encontrados
                          </h3>

                        </div>
                      </div>

                    </div>}
                  {/* Aqui terminara el map siguente evento queda para poster Proximamente */}
                  <SubscrtitoViews />
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
              <div className="col-12 col-lg-9 px-0 pb-3   ">

                <div className="row mx-auto bg-gradient d-flex justify-content-center px-0 ">
                  <div className="col-12  border-bottom border-3 border-dark mb-3">
                    <h4 className="text-capitalize font-weight-bolds">
                      <b className="  "> Eventos Pasados</b>
                    </h4>
                  </div>

                  <div className="row d-none d-flex justify-content-center " >
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
      {userauthi.login && seleccion == "Tickets" ? <div className="container-fluid p-2"> <Tikes /></div> : ""}
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
    </>

  )

}
export default IndexFlas;