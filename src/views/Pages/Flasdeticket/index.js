import React, { useEffect, useState, useRef } from "react";
import { styleswiper, styleswipers } from "./styleswiper.js";
import { pasados, carrusel } from "./imagenstatctic.js";
let { icon, iconhead, valla, logofla, header } = carrusel
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
import { getDatosUsuariosLocalStorag, getCliente } from "utils/DatosUsuarioLocalStorag";
import { GetMetodo, getVerTienda, LimpiarLocalStore, Limpiarseleccion } from "utils/CarritoLocalStorang";
import { listarpreciolocalidad } from "utils/Querypanel";
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js";
import { cargarMapa } from "utils/MapaQuery/index.js";
import { Dias, DatosUsuariocliente, Eventoid, listaasiento, DatosUsuarioLocalStorang, Eventolocalidad, seleccionmapa } from "utils/constantes";
import ModalCarritov from "views/Components/MODAL/ModalCarritov";
import SweetAlert from "react-bootstrap-sweetalert";
import LocalidadmapViews from "views/Components/MODAL/Modallocalida";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from "@mui/material";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper";
import ResgistroView from "./ModalLogin/registro.js";
import { Button, Spinner } from "react-bootstrap";
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
import "./fechaefect.scss"
import "../../../assets/css/animate.css";
import "../../../assets/css/bootstrap.css";
import Iframe from "views/Components/IFrame/Iframe.js";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion.js";
import { quitarsilla } from "utils/Querypanelsigui.js";
import { correlativodelete } from "utils/Querypanelsigui.js";
import { ListaElimnaLCompleta } from "utils/CarritoLocalStorang.js";
import { Triangle } from "react-loader-spinner";
import ModalFacilitoView from "views/Components/MODAL/ModalFacilito.js";
import ReporteView from "views/Components/MODAL/Modalreporpago.js";
import { espacio } from "utils/constantes.js";
import { correlativosadd } from "utils/Querypanelsigui.js";
import { listarRegistropanel } from "utils/pagos/Queripagos.js";
import { setToastes } from "StoreRedux/Slice/ToastSlice.js";
import SubscrtitoViews from "./ModalLogin/Modalsubscrito.js";
import { Seleccionaruserlista } from "utils/userQuery.js";
import ReactGA from 'react-ga';
import { eliminarRegistro } from "utils/pagos/Queripagos.js";
import { bancos } from "utils/Imgenesutils";
let { atencion } = bancos
import Noticiamodal from "views/Components/MODAL/Modalnoti.js";
import { useGetEventosQuery } from "StoreRedux/Slicequery/querySlice.js";
import { useGetPubicidadQuery } from "StoreRedux/Slicequery/querySlice.js";
import Inframene from "views/Components/IFrame/index.js";
import PaginasView from "./Eventosindex/index.js";
import NavbarView from "./Navbarindex/index.js";
import { ListaPreciosEvent } from "utils/EventosQuery/index.js";
import { ListarEventosFinalizados } from "utils/EventosQuery/index.js";
import ModalFirma from "views/Components/MODAL/Modalfirma.js";
import ModalEfectivofACILITO from "views/Components/MODAL/Modalefectivo";
import FormasPagoMopadal from "views/Components/MODAL/ModalFormasPago.js";
import { isAfter, parse } from "date-fns";
import { setSpinersli } from "StoreRedux/Slice/SuscritorSlice.js";
const TRACKING_ID = "G-LJN507B5NX";
const IndexFlas = () => {
  ReactGA.initialize(TRACKING_ID);
  let usedispatch = useDispatch();
  const userauthi = useSelector((state) => state.SuscritorSlice)
  let modal = useSelector((state) => state.SuscritorSlice.modal)
  const spinercarga = useSelector((state) => state.SuscritorSlice.spinercarga)

  const [precios, setPrecios] = useState({
    precios: [],
    pathmapa: [],
    mapa: ''
  })
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
        // setDetalle(false)
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
    // setDetalle(false)
    setModalPago(false)
    setrepShow(false)
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    let array = ListaElimnaLCompleta()
    array.length > 0 ? quitarsilla({ "array": [...array] }).then(ouput => { console.log(ouput) }).catch(err => console.log(err)) : ''
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
  const succesAlert = (e, i) => {
    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        closeOnClickOutside={false}
        showCancel={false}
        showConfirm={false}
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
      >
        <div>
          <div className='col-12 pb-3'>
            <img src={atencion} className="img-fluid"
              style={{
                height: 100
              }}>

            </img>
          </div>
          <h5 >Tienes reportes Pendientes </h5>
          Deseas Reportar el pago o eliminar el reporte y continuar con la compra
          <div className='d-flex  justify-content-around py-4'>
            <div>
              <button className='btn btn-outline-danger  rounded-6' >

                <span style={{
                  fontWeight: "bold"
                }} onClick={continuar} >Reportar pago</span>
              </button>
            </div>
            <div>
              <button className=' btn btn-warning rounded-5'
                onClick={() => eliminaCompra(i, e)}
              >
                <span style={{
                  fontWeight: "bold"
                }}> Eliminar y continuar </span>
              </button>
            </div>

          </div>
        </div>
      </SweetAlert>
    )
  }
  function continuar() {
    setspinervi("d-none")
    SetSeleccion("Tickets")
    setAlert(null)
    usedispatch(setToastes({
      show: true,
      message: "Antes de realizar una compra nueva debes de completar el proceso de pago del anterior",
      color: 'bg-warning',
      estado: "Tienes una compra pendiente "
    }))
  }
  async function eliminaCompra(pams, e) {
    await eliminarRegistro({ "id": pams })
    setAlert(null)
    abrir(e)
  }
  const abrir = async (e) => {
    setspinervi("")
    LimpiarLocalStore()
    usedispatch(borrarseleccion({ vacio: [] }))
    sessionStorage.setItem(listaasiento, JSON.stringify([]))
    sessionStorage.setItem("estadoevento", e.estado)
    sessionStorage.setItem("infoevento", JSON.stringify(e))
    sessionStorage.removeItem("sillascorre")
    sessionStorage.setItem("random", Math.random().toString(36).slice(-10))
    if (!userauthi.login) {
      Abrirelevento(e)
      return
    }
    setspinervi("")
    try {

      let registro = await listarRegistropanel({ "cedula": getDatosUsuariosLocalStorag().cedula })
      let seleccionuser = await Seleccionaruserlista({ "cedula": getDatosUsuariosLocalStorag().cedula })
      // console.log(seleccionuser)
      //registro.success && registro.data.some(f => f.estado_pago == "Pendiente")
      if (registro.success && registro.data.some(f => f.estado_pago == "Pendiente")) {
        let comprapendiente = registro.data.find(f => f.estado_pago == "Pendiente")
        // Modal verifica 
        if (comprapendiente.forma_pago == "Efectivo") {
          setspinervi("d-none")
          $.alert("Tienes una compre pendiente por paga\nPueda Pagar desde la banca Guayaquil empresa comnnet-speed solo con tu cédula ")
          return
        }
        if (String(comprapendiente.forma_pago) == "Tarjeta") {
          setspinervi("d-none")
          SetSeleccion("Tickets")
          $.alert("Tienes una compre pendiente por paga ")
          return
        }
        succesAlert(e, comprapendiente.id)
        return
      }
      else {
        let id = sessionStorage.getItem(Eventoid)
        if (id != null && id != e.codigoEvento) {
          setspinervi("d-none")
          successAlert(e)
        }
        else {
          Abrirelevento(e)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function Abrirelevento(e) {
    try {
      setspinervi("")
      //usedispatch(setSpinersli({ spiner: false }))
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
        let newprecios = obten.data.filter(e => e != undefined).map((g, i) => {
          let color = localidad.filter((f, i) => f.nombre == g.localidad).filter(e => e != undefined)
          //console.log(color)
          if (color.length > 0) {
            g.color = color[0].color
            g.idcolor = color[0].id
            g.typo = color[0].tipo
            g.ideprecio = g.id
            g.espacio = color[0].espacio
            sessionStorage.setItem(espacio, color[0].espacio)
            return g
          }
        }).filter(e => e != undefined)

        let colornuevo = mapalocal.map((L) => {
          if (newprecios.filter(e => e != undefined).filter(e => e.espacio != undefined).findIndex(e => e.idcolor == L.id) != -1) {
            {
              L.localidaEspacio = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].nombre
              L.precio_descuento = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_descuento
              L.precio_discapacidad = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_discapacidad
              L.precio_normal = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_normal
              L.precio_tarjeta = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].precio_tarjeta
              L.ideprecio = newprecios[newprecios.findIndex(e => e.idcolor == L.id)].ideprecio
              L.espacioid = L.id_espacio
              return L
            }
          }
        })
        let pathnuevo = path.map((L) => {
          if (newprecios.filter(e => e != undefined).findIndex(e => e.idcolor == L.id) != -1) {
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
        sessionStorage.eventoid = e.codigoEvento
        setPrecios(nuevosdatos)
        setDatoscon(e)
        Cargarsillas([...colornuevo.filter((e) => e != undefined)]).then(outp => {
          setspinervi("d-none")
          velocidad()
          usedispatch(cargarsilla(outp))
          usedispatch(setModal({ nombre: 'ModalCarritov', estado: '' }))
          ReactGA.event({
            category: "Comprar",
            action: "Eventos",
            label: "" + e.codigoEvento,
          })
          //usedispatch(setSpinersli({ spiner: true }))
          if (true) {
            Seleccionaruserlista({ "cedula": getDatosUsuariosLocalStorag().cedula, "accion": "liverar" }).then(outp => {
              console.log(outp)
            }).catch(error => {
              console.log(error)
            })
          }

        }).catch(err => {
          console.log(err)
        })
      }
    } catch (err) {
      console.log(err)
      //usedispatch(setSpinersli({ spiner: false }))
      setspinervi("d-none")
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
  let { data: eventos = [], error: errorevento, isLoading } = useGetEventosQuery("ACTIVO")
  let { data: publici = [], error: errorPubli, isLoading: info } = useGetPubicidadQuery()
  const evento = () => {
    setfunc(false)
    try {
      if (!errorevento == undefined) {
        return
      }
      if (!errorPubli == undefined) {
        return
      }
      if (!eventos == null) { return }
      let datos = isLoading ? eventos : eventos.data
      let publicin = publici
      const filtro = datos != null ? datos.filter((e) => {
        //const fechaConcierto = new Date(e.fechaConcierto + "T23:59:59");
        //const fechaActual = new Date();
        // return fechaConcierto > fechaActual;
        const fechaConcierto = parse(e.fechaConcierto + " 23:59:59", 'yyyy-MM-dd HH:mm:ss', new Date());
        // Obtener la fecha actual
        const fechaActual = new Date();
        // Comparar las fechas
        return isAfter(fechaConcierto, fechaActual);
      }) : []
      const sorter = (a, b) => new Date(a.fechaConcierto) > new Date(b.fechaConcierto) ? 1 : -1;
      setfunc(true)
      isLoading ? "" : setEventos(filtro.sort(sorter))
      info ? "" : setpublicidad(publicin.data)
      // isLoading ? "" : setShear(filtro.sort(sorter))
    } catch (error) {
      console.log(error)
    }
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
    evento()
    $(document).keyup(function (evtobj) {
      if (!(evtobj.altKey || evtobj.ctrlKey || evtobj.shiftKey)) {
        if (evtobj.keyCode == 16) { return false; }
        if (evtobj.keyCode == 17) { return false; }
      }
    });
    //ListaPrecios();
    usedispatch(clearMapa({}))
    usedispatch(borrarseleccion({ estado: "seleccionado" }))
    Limpiarseleccion()

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

    /*ListarEventosFinalizados().then(oup => {
      if (oup.length > 0) {
        setFinal(oup)
        console.log()
      }
    }).catch(err => {
      console.log(err)
    })*/
    ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.set({
      username: localStorage.getItem('DatoCliente'),
    })


  }, [isLoading, info])
  seleccion == "" && final.length > 0 ?
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
    let datos = e
    console.log(e)
    let info = JSON.parse(datos)
    console.log(info)
    userauthi.login ? abrir({
      ...info,
    }) :
      abrir({
        ...info,
      })
    /*usedispatch(setModal({
      nombre: 'loginpage', estado: {
        ...info,
      }
    }))*/
    ReactGA.event({
      category: "Comprar",
      action: "carrusel",
      label: info.codigoEvento
    })
    return {
      ...info,
    }
  }
  const [visible, setVisible] = React.useState(false)
  function abrirNuevoTab() {
    // Abrir nuevo tab
    var win = window.open('https://api.whatsapp.com/send?phone=593980008000&text=Quiero%20informaci%C3%B3n%20', '_blank');
    // Cambiar el foco al nuevo tab (punto opcional)
    win.focus();
  }

  return (

    <>


      <ModalEfectivofACILITO
        detene={detenervelocidad}
        intervalo={intervalo}
        setDatoToas={setDatoToas}
        detener={detenervelocidad}
        comprar={sololimpiarlocal}
      />

      <NavbarView
        icon={icon}
        setVisible={setVisible}
        visible={visible}
        SetSeleccion={SetSeleccion}
        salir={salir}
      />
      {modal.nombre == "formasPago" ? <FormasPagoMopadal /> : ""}
      {/* header */}
      {publicidad != undefined && publicidad.length > 0 ?
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
                                    >{userauthi.login ? element.evento == null ? "Muy Pronto" : "Comprar" : "Registrate"}</button> :
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
        <div className="container-fluid ">
          <div className="row px-3 d-flex justify-content-center  align-items-center " >

            <div className="col-12 col-lg-9  d-flex justify-content-center">
              <div className=" col-9 col-md-6 col-lg-6 d-flex  justify-content-center ">
                <form className="form" action="">
                  <input className="input" type="search"
                    onChange={(e) => Cambiarbusqueda(e.target.value)}
                    placeholder="Buscar eventos ..." />
                  <i className="fass fa fa-search "></i>
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

              <div className="col-12 col-lg-9 col-sm-9 col-md-9 ">
                <div className="row  p-0">
                  {eventoslist.length > 0 ?
                    eventoslist.slice(userauthi.inicio, userauthi.final).map((e, i) => {
                      return (
                        <div className="col-12  mx-auto my-3 " id={"evento" + e.id} key={i}>
                          <a id={"headingThree" + e.id} className="collapsed eventos eventoss"

                            data-toggle="collapse"
                            data-target={"#collapseid" + e.id}
                            aria-controls={"#collapseid" + e.id} aria-expanded="false"
                          >
                            <div className="container rounded-7  d-flex justify-content-center px-0" >
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
                                  <div className=" col-12   pt-3"
                                    style={{
                                      bottom: 10,
                                    }}
                                  >
                                    {true ?
                                      <div className="row"
                                      >
                                        {/*

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
                                          </div> 

                                        */}

                                      </div>
                                      : ""}
                                    <div className=" text-center">

                                      {/*<p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                        className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? abrir(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                        Comprar Entrada</p>*/}
                                      {<p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                        className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => abrir(e)} >
                                        Comprar Entrada</p>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container col-12 col-md-6 rounded-7  px-0">
                                <img src={e.codigoEvento == "9EGM42" ? "https://api.ticketsecuador.ec/store/img/whatsapp%20image%202023-01-30%20at%2019.51.02.jpeg" : e.mapaConcierto} className="img-fluid rounded-7 shadow-md " alt="" />
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
                      <div className="col-12  mx-auto my-3 " id={"evento" + 1} >
                        <a id={"headingThree" + 1} className="collapsed eventos eventoss"

                          data-toggle="collapse"
                          data-target={"#collapseid" + 1}
                          aria-controls={"#collapseid" + 1} aria-expanded="false"
                        >
                          <div className="container rounded-7  d-flex justify-content-center px-0" >
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
                            <img src={"https://api.ticketsecuador.ec/store/img/mallapromo.png"}
                              className="img-fluid rounded-7 shadow-md  btn-hover img-evento "
                              alt="" />
                          </div>
                        </a>
                        <div className="collapse float-end container mt-4 px-0" aria-labelledby={"headingThree" + 1} id={"collapseid" + 1} data-parent="#accordion">
                          <div className="card row d-flex flex-row card-body rounded-7 py-5">
                            <div className="container col-12 col-md-6">
                              <div className="d-flex row d-none  btn-group-vertical ">
                                <div className="col-12" >
                                  <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold"></span> </h1>
                                  <h4 style={{ fontSize: '1.4em', }}><span id="tour"></span></h4>
                                  <div className="col-12 border border-bottom my-3"></div>
                                  <div classNAme='d-none' style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                    <p style={{ fontSize: '1.0em' }}>  <i className="bi bi-calendar-week-fill"></i>   <b>  Fecha:<span id="fechaEvento">2024-05-18</span></b></p>
                                    <div className="row" style={{ alignItems: 'stretch', lineHeight: '0', }} >
                                      <p className="col-12 pt-0" style={{ fontSize: '1.0em' }}><i className="bi bi-alarm-fill"></i> <b> Hora:<span id="horaEvento"> 16:00</span></b></p>
                                    </div>
                                    <p className="" style={{ fontSize: '1.0em', }}><i className="bi bi-geo-alt-fill"></i> <b>Lugar:<span id="lugarEvento">Guayaquil Coliseo Voltaire Paladines Polo</span></b></p>
                                    <div className="col-12 border border-bottom mb-3"></div>
                                    <div>
                                    </div>
                                  </div>
                                </div>
                                <div className=" col-12   pt-3"
                                  style={{
                                    bottom: 10,
                                  }}
                                >
                                  <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                    className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => usedispatch(setModal({ nombre: 'registro', estado: "" }))} >
                                    Registrate</p>

                                </div>
                              </div>
                            </div>
                            <div className="container col-12 col-md-6 rounded-7  px-0">
                              <img src="https://api.ticketsecuador.ec/store/img/promoprecio.jpeg" className="img-fluid rounded-7 shadow-md " alt="" />
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
                  <div className="col-12  border-bottom border-3 border-dark-sm mb-3">
                    <h4 className="text-capitalize font-weight-bolds">
                      <b className=""> Eventos Pasados</b>
                    </h4>
                  </div>
                  <section className="logos-slider slider d-flex flex-wrap">
                    {/*final.length > 0 ?
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
                      : ""*/}
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
                          <a id={"headingThree" + e.id} className="collapsed eventos eventoss" data-toggle="collapse" data-target={"#collapseid" + e.id} aria-controls={"#collapseid" + e.id} aria-expanded="false"
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
                              <img src={e.imagenConcierto} className="img-fluid rounded-7 shadow-md  btn-hover  " alt=""

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
                                    <div className=" text-center">
                                      <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                                        className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => userauthi.login ? abrir(e) : usedispatch(setModal({ nombre: 'loginpage', estado: e }))} >
                                        {e.estado == "ACTIVO" ? "Comprar Entrada" : "RESERVAR"}</p>
                                    </div>
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
                      <div className="container eventos eventoss  px-0">
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
                            <img
                              className="  rounded-7   "
                              style={{
                                height: '150px', width: '100%',
                                backgroundImage: "url('" + element + "')",
                                backgroundSize: 'cover',
                                backgroundRepeat: "no-repeat",
                              }}
                            >
                            </img>
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
      <div
        id="spinercarga"
        className={"d-none"}
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
          zIndex: '10000'
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

          <div class="  superpuesto" id="superpuestodos">
            <div class="loader">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                x="0px" y="0px" viewBox="0 0 1080 1080"


              >

                <g>
                  <g>
                    <path class="st0loander" fill="" d="M135.07,553.8l5.05-25.27h78.56l-5.05,25.27H135.07z M177.83,641c-8.15,0-15.1-1.65-20.85-4.95
			c-5.76-3.3-9.87-8.07-12.32-14.32c-2.46-6.25-2.84-13.65-1.16-22.22l19.59-98.57h32.86l-19.59,98.36
			c-0.84,4.77-0.35,8.57,1.47,11.37c1.82,2.81,5.19,4.21,10.11,4.21c2.24,0,4.53-0.35,6.85-1.05c2.32-0.7,4.46-1.68,6.42-2.95
			l4.84,23.38c-4.07,2.53-8.57,4.29-13.48,5.27C187.65,640.5,182.74,641,177.83,641z" />
                    <path class="st0loander"
                      d="M226.06,593.19l5.27-26.33h59.61l-5.27,26.33H226.06z" />
                    <path class="st0loander" d="M302.51,639.31L325.05,526h32.65l-22.54,113.31H302.51z M346.95,510.2c-5.76,0-10.39-1.65-13.9-4.95
			c-3.51-3.3-5.27-7.34-5.27-12.11c0-5.61,2-10.28,6-14.01c4-3.72,9.23-5.58,15.69-5.58c5.76,0,10.43,1.58,14.01,4.74
			c3.58,3.16,5.37,7.06,5.37,11.69c0,6.04-2,10.92-6,14.64C358.85,508.34,353.55,510.2,346.95,510.2z" />
                    <path class="st0loander"
                      d="M425.51,641c-11.66,0-21.8-2.11-30.43-6.32c-8.64-4.21-15.34-10.11-20.11-17.69
			c-4.77-7.58-7.16-16.5-7.16-26.75c0-12.64,2.95-23.91,8.85-33.8c5.9-9.9,14.04-17.72,24.43-23.48
			c10.39-5.76,22.33-8.64,35.81-8.64c12.07,0,22.54,2.49,31.38,7.48c8.85,4.99,15.38,12.04,19.59,21.17l-27.8,13.9
			c-2.39-5.33-5.72-9.23-10-11.69c-4.29-2.46-9.37-3.69-15.27-3.69c-6.46,0-12.22,1.58-17.27,4.74c-5.05,3.16-9.06,7.51-12.01,13.06
			c-2.95,5.55-4.42,11.97-4.42,19.27c0,7.72,2.28,13.87,6.85,18.43c4.56,4.56,11.06,6.85,19.48,6.85c5.76,0,11.02-1.23,15.8-3.69
			c4.77-2.46,8.77-6.28,12.01-11.48l24.22,15.16c-5.34,8.57-12.74,15.24-22.22,20.01C447.73,638.61,437.16,641,425.51,641z" />
                    <path class="st0loander" d="M489.33,639.31l31.17-156.28h32.86l-31.17,156.28H489.33z M522.18,616.57l7.16-40.65L590.21,526h42.76
			l-63.4,52.87l-18.32,13.48L522.18,616.57z M574.63,639.31l-29.07-47.6l22.96-25.06l44.23,72.66H574.63z" />
                    <path class="st0loander" d="M680.57,641c-11.79,0-22.01-2.11-30.65-6.32c-8.64-4.21-15.34-10.11-20.11-17.69
			c-4.77-7.58-7.16-16.5-7.16-26.75c0-12.64,2.84-23.91,8.53-33.8c5.69-9.9,13.55-17.72,23.59-23.48
			c10.04-5.76,21.59-8.64,34.65-8.64c11.09,0,20.64,2.07,28.64,6.21c8,4.14,14.22,9.9,18.64,17.27c4.42,7.37,6.63,16.18,6.63,26.43
			c0,2.95-0.18,5.9-0.53,8.85c-0.35,2.95-0.81,5.76-1.37,8.42h-93.73l3.37-19.17h74.98l-13.48,5.9c1.12-6.32,0.77-11.62-1.05-15.9
			c-1.83-4.28-4.77-7.58-8.85-9.9c-4.07-2.32-8.99-3.48-14.74-3.48c-7.16,0-13.24,1.72-18.22,5.16c-4.99,3.44-8.74,8.18-11.27,14.22
			c-2.53,6.04-3.79,12.85-3.79,20.43c0,8.71,2.42,15.2,7.27,19.48c4.84,4.28,12.18,6.42,22.01,6.42c5.76,0,11.3-0.91,16.64-2.74
			c5.33-1.82,9.9-4.42,13.69-7.79l13.69,21.69c-6.6,5.2-14.01,9.02-22.22,11.48C697.52,639.77,689.13,641,680.57,641z" />
                    <path class="st0loander" d="M755.97,553.8l5.06-25.27h78.56l-5.05,25.27H755.97z M798.72,641c-8.14,0-15.1-1.65-20.85-4.95
			c-5.76-3.3-9.87-8.07-12.32-14.32c-2.46-6.25-2.84-13.65-1.16-22.22l19.59-98.57h32.86l-19.59,98.36
			c-0.84,4.77-0.35,8.57,1.47,11.37c1.82,2.81,5.19,4.21,10.11,4.21c2.24,0,4.53-0.35,6.85-1.05c2.32-0.7,4.46-1.68,6.42-2.95
			l4.84,23.38c-4.07,2.53-8.57,4.29-13.48,5.27C808.55,640.5,803.64,641,798.72,641z" />
                    <path class="st0loander" d="M885.5,641c-9.97,0-19.34-1.13-28.12-3.37c-8.78-2.24-15.55-5.05-20.32-8.42l12.64-23.8
			c4.91,3.23,10.92,5.83,18.01,7.79c7.09,1.97,14.22,2.95,21.38,2.95c7.72,0,13.34-0.98,16.85-2.95c3.51-1.96,5.27-4.63,5.27-8
			c0-2.67-1.47-4.67-4.42-6c-2.95-1.33-6.67-2.42-11.16-3.26c-4.5-0.84-9.3-1.82-14.43-2.95c-5.13-1.12-9.97-2.7-14.53-4.74
			c-4.56-2.03-8.29-4.98-11.16-8.85c-2.88-3.86-4.32-8.95-4.32-15.27c0-8.56,2.42-15.8,7.27-21.69c4.84-5.9,11.58-10.39,20.22-13.48
			c8.64-3.09,18.43-4.63,29.38-4.63c7.86,0,15.51,0.84,22.96,2.53c7.44,1.69,13.76,4,18.96,6.95l-11.79,24.01
			c-5.34-3.37-10.92-5.65-16.74-6.85c-5.83-1.19-11.41-1.79-16.74-1.79c-7.72,0-13.31,1.09-16.74,3.26
			c-3.44,2.18-5.16,4.81-5.16,7.9c0,2.67,1.44,4.74,4.32,6.21c2.88,1.47,6.56,2.67,11.06,3.58c4.49,0.91,9.34,1.9,14.53,2.95
			c5.19,1.05,10.04,2.6,14.53,4.63c4.49,2.04,8.18,4.92,11.06,8.64c2.88,3.72,4.32,8.74,4.32,15.06c0,8.57-2.49,15.83-7.48,21.8
			c-4.99,5.97-11.76,10.43-20.32,13.37C906.21,639.52,896.45,641,885.5,641z" />
                  </g>
                  <path class="st1loander" d="M480.21,432.74c0,0,2.51,20.25,31.23,20.25l-119.19-0.51l42.36-265.66c0,0,0.72-17.23,24.05-17.59h85.8
		c0,0-15.8,41.64,17.95,57.8c33.75,16.16,80.42-8.98,80.06-57.8h78.98c0,0,19.39,1.08,16.87,20.1l-42,263.15H560.98
		c0,0-28.72,3.23-26.57-29.08l6.1-44.52h-21.18l3.23-18.67h21.54l3.59-23.69c0,0,1.08-4.67,5.39-5.39h21.18l-4.31,28.72h28.36
		l-2.51,19.39h-28.36l-5.74,36.98c0,0-4.31,14.36,12.92,16.51h100.52l39.13-245.92h-54.93c0,0-14,64.98-85.44,62.83
		c0,0-53.85-2.51-51.7-62.83h-63.54L419.89,433.1L480.21,432.74z" />
                  <path class="st1loander" d="M349.17,698.05L317.22,889.4c0,0-5.03,18.31,18.67,20.1h86.52c0,0-3.59-58.16,58.52-63.54
		c0,0,43.8,0.36,42.72,44.16c0,0,0,9.69-4.31,19.39h77.9c0,0,19.75,1.08,24.05-20.1l31.59-191.35h-23.34l-32.31,193.5h-56.72
		c0,0,7.9-54.57-53.49-62.83c0,0-63.18-3.59-81.49,63.54h-65.7l34.11-194.22H349.17z" />
                  <polygon class="st1loander"
                    points="387.22,698.05 383.99,717.07 419.62,717.07 423.57,698.05 	" />
                  <polygon class="st1loander"
                    points="436.05,698.05 432.82,717.07 468.45,717.07 472.4,698.05 	" />
                  <polygon class="st1loander"
                    points="483.8,698.05 480.57,717.07 516.2,717.07 520.15,698.05 	" />
                  <polygon class="st1loander"
                    points="532.95,698.05 529.72,717.07 565.35,717.07 569.3,698.05 	" />
                  <polygon class="st1loander"
                    points="581.77,698.05 578.54,717.07 614.17,717.07 618.12,698.05 	" />
                </g>
              </svg>
              <span></span>
            </div>

          </div>
          <span className=" text-light">Cargando....</span>

        </div>
      </div>
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

      <Noticiamodal />



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
      <ModalFirma />
      <Iframe
        setEstadoFrame={modal.nombre == "pago" ? true : false}
        url={modal.estado}
        intervalo={intervalo}
        detener={detenervelocidad}
      />




    </>

  )

}
export default IndexFlas;