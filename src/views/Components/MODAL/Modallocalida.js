import React, { useState, useEffect, useRef } from "react"
import MesaiView from "views/Pages/Mesas/Plantillas/indice"
import MesasView from "views/Pages/Mesas"
import SVGView from "views/Pages/Svgviewa/svgoptio.js";
import { TiendaIten, getVerTienda, EliminarByStora, EliminarsilladeMesa } from "utils/CarritoLocalStorang";
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { filtrarlocali } from "StoreRedux/Slice/mapaLocalSlice";
import { addSillas, deleteSillas, clearSillas, deleteMesa } from "StoreRedux/Slice/sillasSlice"
import { EliminarSillas, AgregarAsiento, VerSillaslist, TotalSelecion } from "utils/CarritoLocalStorang"
import SweetAlert from "react-bootstrap-sweetalert";
import "./localidas.css"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { seleccionmapa } from "utils/constantes";
import { enviasilla } from "utils/Querypanelsigui";
import { quitarsilla } from "utils/Querypanelsigui";
import { correlativosadd } from "utils/Querypanelsigui";
import moment from "moment";
import { Verificalocalidad } from "utils/CarritoLocalStorang";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { localidaandespacio } from "utils/Querypanel";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { updateboletos } from "StoreRedux/Slice/SuscritorSlice";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { bancos } from "utils/Imgenesutils";
import { Triangle } from "react-loader-spinner";
import { setSpinersli } from "StoreRedux/Slice/SuscritorSlice";
let { atencion } = bancos
const LocalidadmapViews = (props) => {
    const { intervalo, intervalolista } = props
    var mapath = useSelector((state) => state.mapaLocalSlice)
    let nombre = JSON.parse(sessionStorage.getItem(seleccionmapa))
    const usedispatch = useDispatch()
    const [detalle, setDetalle] = useState([])
    const seleccion = useSelector((state) => state.sillasSlice.sillasSelecionadas.filter((e) => e.localidad == mapath.precio.localidad))
    const modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const spinervi = useSelector((state) => state.SuscritorSlice.spiner)

    const [alert, setAlert] = useState(null);
    let sleccionlocalidad = useSelector((state) => state.SuscritorSlice.boletos)
    console.log(sleccionlocalidad)

    const eliminarmesas = (M, C) => {
        let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
        let user = getDatosUsuariosLocalStorag()
        let nuevo = []
        for (let i = 1; i < parseInt(C) + 1; i++) {
            let valid = seleccion.some(e => e.seleccionmapa == nombre.localidad + "-" + M + "-s-" + i && e.estado == "seleccionado")
            if (valid) {
                nuevo.push({ id: nombres.idcolor, silla: M + "-s-" + i })
            }
        }
        nuevo.length > 0 ? nuevo.map((elm, index) => {
            setTimeout(() => {
                quitarsilla({ "array": [{ estado: "disponible", "id": elm.id, "silla": elm.silla, "cedula": user.cedula }] }).then(ouput => {
                    usedispatch(deleteSillas({ "localidad": nombre.localidad, "fila": elm.silla.split("-")[0], "silla": elm.silla, "estado": "seleccionado" }))
                    EliminarsilladeMesa({ localidad: nombre.localidad + "-" + elm.silla })
                }).catch(err => console.log(err))


            }, 25 * index)

        }) : ''
        hideAlert()
    }
    function restaprecio() {
        let user = getDatosUsuariosLocalStorag()
        let producto = {
            cantidad: -1,
            localidad: mapath.precio.localidad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            fila: 0,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto"),
        }
        setDisable(true)

        usedispatch(setSpinersli({ spiner: false }))
        getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? '' : 
        correlativosadd({
            "id": mapath.precio.idcolor,
            "estado": "reservado",
            "cedula": user.cedula,
            "mas": "menos",
            "cantidad": 1
        }).then(oupt => {
            console.log(oupt)
            if (oupt.success) {

                console.log(oupt)
                getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? '' : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })
                setDetalle(getVerTienda().filter(e => e.id == mapath.precio.idcolor))
                setDisable(false)
                setTimeout(function () {

                    usedispatch(setSpinersli({ spiner: true }))
                }, 3000)
                return
            }
            usedispatch(setSpinersli({ spiner: true }))
            console.log({
                "id": mapath.precio.idcolor,
                "estado": "reservado",
                "cedula": user.cedula,
                "mas": "menos",
                "cantidad": 1
            })
        }).catch(err => {
            setDisable(false)
            console.log(err)
        })
    }
    const [disable, setDisable] = useState(false)
    function agregar() {
        let user = getDatosUsuariosLocalStorag()

        if (sleccionlocalidad.disponibles == 0) {
            usedispatch(setToastes({
                show: true,
                message: "No hay más disponibilida en la localidad",
                color: 'bg-danger',
                estado: "Localidad llena"
            }))
            return
        }
        if ((sleccionlocalidad.pagados + TotalSelecion()) == 10) {
            succesLimit()
            return
        }
        let protoco = moment().format("YYYYMMDDHHMMSS")
        let producto = {
            cantidad: 1,
            localidad: mapath.precio.localidad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            tipo: "correlativo",
            fila: 0,
            discapacidad: mapath.precio.precio_discapacidad,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto") ? sessionStorage.getItem("consierto") : '',
        }

        if (TotalSelecion() < 10) {
            setDisable(true)
            usedispatch(setSpinersli({ spiner: false }))
            correlativosadd({
                "id": mapath.precio.idcolor,
                "estado": "reservado",
                "cedula": user.cedula,
                "mas": "mas",
                "cantidad": 1
            }).then(oupt => {
                if (oupt.success) {
                    getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": protoco, tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })
                    setDetalle(getVerTienda().filter(e => e.id == mapath.precio.idcolor))
                    setTimeout(function () {
                        setDisable(false)
                        usedispatch(setSpinersli({ spiner: true }))
                    }, 3000)

                    return
                }
                usedispatch(setSpinersli({ spiner: true }))
                /*usedispatch(setToastes({
                    show: true,
                    message: "No hay más disponibilida en la localidad",
                    color: 'bg-danger',
                    estado: "Localidad llena"
                }))*/
                console.log({
                    "id": mapath.precio.idcolor,
                    "estado": "reservado",
                    "cedula": user.cedula,
                    "mas": "mas",
                    "cantidad": 1
                })
                console.log(oupt)
            }

            ).catch(erro => {
                setDisable(false)
                console.log(erro)
            })
        }
        else {
            setDisable(false)
            succesLimit()
        }
    }
    function Eliminar(e) {
        EliminarByStora(e.localidad)
        setDetalle([])
    }
    const successAlert = (e, f, c) => {
        let silla = e.replace("-", " ").split(" ")[1]
        return setAlert(
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Se agrego"
                onConfirm={() => hideAlert()}
                onCancel={() => cerrar()}
                confirmBtnBsStyle="success"
                closeOnClickOutside={false}
                cancelBtnBsStyle="danger"
                confirmBtnText="Seguir Agregando"
                cancelBtnText="Ir al carrito"
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                <div className="d-flex flex-row justify-content-center text-center">
                    <div className="d-flex">
                        <h4 style={{ fontSize: '0.9em' }} >
                            De la Localidad {f} En la {c}:  {e.replace("-", " ").split(" ")[0]} la Silla #{silla.split("-")[1]}  </h4>
                    </div>
                </div>
            </SweetAlert>
        );

    };
    const succesElimAlert = (e, f) => {
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
                    <h5 >Desea quitar este Asiento del carrito </h5>
                    <div className='d-flex  justify-content-around py-4'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => hideAlert()}>

                                <span style={{
                                    fontWeight: "bold"
                                }}>Cancelar</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => eliminaLista(e, f)} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Si, Continuar</span>
                            </button>
                        </div>

                    </div>
                </div>
            </SweetAlert>
        )
    }
    const succesElimAlertli = (e) => {
        setAlert(
            <SweetAlert
                warning
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
                    <h5 >Desea quitar este Asiento del carrito </h5>
                    <div className='d-flex  justify-content-around py-4'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => hideAlert()}>

                                <span style={{
                                    fontWeight: "bold"
                                }}>Cancelar</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => eliminaListadiv(e)} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Si, Continuar</span>
                            </button>
                        </div>

                    </div>
                </div>
            </SweetAlert>
        )
    }
    const succesLimit = () => {
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
                            }}
                        ></img>
                    </div>
                    <h5>Has alcanzado la cantidad límite de entradas</h5>
                    Deseas continuar editando la selección
                    <div className='d-flex  justify-content-around py-4 px-2'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => cerrar()}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>Ir al carrito</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => hideAlert()} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Si, Continuar</span>
                            </button>
                        </div>

                    </div>
                </div>
            </SweetAlert>
        )
    }
    const Alertmesas = (e, f) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Desea selecionar los asientos dispobles de esta mesa"
                onConfirm={() => ConsolidacionView.log(e, f)}
                onCancel={() => cerrar()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Continuar"
                cancelBtnText="Ir al carrito"
                closeOnClickOutside={false}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel>
                Deseas Continuar editando la selección
            </SweetAlert>
        )
    }
    const Elimnamesa = (e, f) => {
        setAlert(
            <SweetAlert
                warning
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
                    <h5 >Desea quitar los asientos seleccionados de esta mesa </h5>
                    <div className='d-flex  justify-content-around py-4'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => cerrar()}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>Cancelar</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => eliminarmesas(e, f)} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Si, Continuar</span>
                            </button>
                        </div>

                    </div>
                </div>
            </SweetAlert>
        )
    }

    const eliminaListadiv = (e) => {
        let user = getDatosUsuariosLocalStorag()
        e.tipo != "mesa" ? $("div." + e.silla).removeClass("seleccionado").addClass("disponible") : $("a." + e.silla).removeClass("seleccionado").addClass("disponible");
        quitarsilla({ "array": [{ estado: "disponible", "id": e.id, "silla": e.silla, "cedula": user.cedula }] }).then(ouput =>
            console.log(ouput)).catch(err => console.log(err))
        hideAlert()
        EliminarSillas({ ...e })
        usedispatch(deleteSillas({ ...e }))
    }
    const eliminaLista = (d, e) => {
        let user = getDatosUsuariosLocalStorag()
        d.classList.remove('seleccionado')
        d.classList.add('disponible')
        hideAlert()
        quitarsilla({ "array": [{ estado: "disponible", "id": e.id, "silla": e.silla, "cedula": user.cedula }] }).then(ouput => {
            EliminarSillas({ ...e })
            usedispatch(deleteSillas({ ...e }))
        }).catch(err => console.log(err))
    }
    function sillasselecion(e) {
        let user = getDatosUsuariosLocalStorag()
        let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
        if (e.cedula == user.cedula) {

        }
        else if (e.estado.toLowerCase() == "disponible") {

        } else {

        }
        /*  
          setAlert(
              <SweetAlert
                  success
                  style={{ display: "block", marginTop: "-100px" }}
                  title="Se agrego"
                  onConfirm={() => hideAlert()}
                  onCancel={() => cerrar()}
                  confirmBtnBsStyle="success"
                  cancelBtnBsStyle="danger"
                  confirmBtnText="Seguir Agregando"
                  cancelBtnText="Ir al carrito"
                  closeOnClickOutside={false}
                  closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                  showCancel
              >
                  <div className="d-flex flex-row justify-content-center text-center">
                      <div className="d-flex">
                          <h4 style={{ fontSize: '0.9em' }} >
                              De la Localidad {nombres.localidad} En la Fila:  {e.silla.replace("-", " ").split(" ")[0]} la Silla #{e.silla.split("-")[1]}  </h4>
                      </div>
                  </div>
              </SweetAlert>
          )
         /* enviasilla({ id: nombres.idcolor, silla: e.silla }).then(ouput => {
              setAlert(
                  <SweetAlert
                      success
                      style={{ display: "block", marginTop: "-100px" }}
                      title="Se agrego"
                      onConfirm={() => hideAlert()}
                      onCancel={() => cerrar()}
                      confirmBtnBsStyle="success"
                      cancelBtnBsStyle="danger"
                      confirmBtnText="Seguir Agregando"
                      cancelBtnText="Ir al carrito"
                      closeOnClickOutside={false}
                      closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                      showCancel
                  >
                      <div className="d-flex flex-row justify-content-center text-center">
                          <div className="d-flex">
                              <h4 style={{ fontSize: '0.9em' }} >
                                  De la Localidad {nombres.localidad} En la Fila:  {e.silla.replace("-", " ").split(" ")[0]} la Silla #{e.silla.split("-")[1]}  </h4>
                          </div>
                      </div>
                  </SweetAlert>
              )
              // usedispatch(filtrarlocali(ouput))
              AgregarAsiento({ "localidad": nombres.localidad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, seleccionmapa: nombres.localidad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" })
              usedispatch(addSillas({ "localidad": nombres.localidad, "localidaEspacio": nombres, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombres.precio_normal, seleccionmapa: nombres.localidad + "-" + this.classList[0], "fila": this.classList[0].split("-")[0], "silla": this.classList[0], "estado": "seleccionado" }))
  
          }
          ).catch(exit => {
              console.log(exit)
          })*/
    }
    function Agregarsilla(e) {
        console.log(e)
        let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
        let user = getDatosUsuariosLocalStorag()
        let variant = document.getElementById(e.idsilla)
        variant.classList.remove('disponible')
        variant.classList.add('seleccionado')
        if (e.estado.toLowerCase() != "disponible" && e.cedula != user.cedula) {

            return
        }
        let datos = {
            "cedula": info.cedula,
            "estado": "disponible",
            "mesa": [
                {
                    id_silla: e.idsilla,
                    id: mapath.pathmap[0].id,
                    "cedula": user.cedula,
                    estado: "",
                    ...e
                }
            ]
        }
        usedispatch(setSpinersli({ spiner: false }))
        correlativosadd(datos).then(ou => {
            if (ou.success) {
                ou.insert.map((g => {
                    let asiento = e
                    AgregarAsiento({
                        "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
                        seleccionmapa: nombre.localidad + "-" + asiento.silla,
                        "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado", "ids": e.idsilla, "cedula": user.cedula
                    })
                    usedispatch(addSillas({
                        "localidad": nombre.localidad, "localidaEspacio": nombre,
                        "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
                        seleccionmapa: nombre.localidad + "-" + asiento.silla, "fila": asiento.silla.split("-")[0],
                        "silla": asiento.silla, "estado": "seleccionado"
                    }))
                    let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
                    setAlert(
                        <SweetAlert
                            success
                            style={{ display: "block", marginTop: "-100px" }}
                            title="Se agrego"
                            onConfirm={() => hideAlert()}
                            onCancel={() => cerrar()}
                            confirmBtnBsStyle="success"
                            cancelBtnBsStyle="danger"
                            confirmBtnText="Seguir Agregando"
                            cancelBtnText="Ir al carrito"
                            closeOnClickOutside={false}
                            closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                            showCancel
                        >
                            <div className="d-flex flex-row justify-content-center text-center">
                                <div className="d-flex">
                                    <h4 style={{ fontSize: '0.9em' }} >
                                        De la Localidad {nombres.localidad} En la Fila:  {e.silla.replace("-", " ").split(" ")[0]} la Silla #{e.silla.split("-")[1]}  </h4>
                                </div>
                            </div>
                        </SweetAlert>
                    )
                }))
                ou.update.map((g => {
                    let asiento = e
                    usedispatch(deleteSillas({
                        "localidad": nombre.localidad,
                        "fila": asiento.silla.split("-")[0],
                        "silla": asiento.silla,
                        "estado": "seleccionado"
                    }))
                    EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento.silla })
                    let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
                    setAlert(
                        <SweetAlert
                            success
                            style={{ display: "block", marginTop: "-100px" }}
                            title="Se elimino"
                            onConfirm={() => hideAlert()}
                            onCancel={() => cerrar()}
                            confirmBtnBsStyle="success"
                            cancelBtnBsStyle="danger"
                            confirmBtnText="Seguir Agregando"
                            cancelBtnText="Ir al carrito"
                            closeOnClickOutside={false}
                            closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                            showCancel
                        >
                            <div className="d-flex flex-row justify-content-center text-center">
                                <div className="d-flex">
                                    <h4 style={{ fontSize: '0.9em' }} >
                                        De la Localidad {nombres.localidad} En la Fila:  {e.silla.replace("-", " ").split(" ")[0]} la Silla #{e.silla.split("-")[1]}  </h4>
                                </div>
                            </div>
                        </SweetAlert>
                    )
                }))
                setTimeout(function () {

                    usedispatch(setSpinersli({ spiner: true }))
                }, 3000)
                return
            }
            usedispatch(setSpinersli({ spiner: true }))
            console.log(ou)
        }).catch(err => {
            console.log(err)
        })
        console.log(datos)
    }
    const hideAlert = () => {
        setAlert(null);
    }
    const sillasetado = (d) => {
        const user = getDatosUsuariosLocalStorag()
        let nombres = JSON.parse(sessionStorage.getItem(seleccionmapa))
        //  console.log(d.estado)
        if (d.cedula != undefined) {
            if (user.cedula == d.cedula) return "seleccionado  " + nombres.idcolor + "silla"
            else
                return d.estado.toLowerCase() == "seleccionado" ? "reservado" : d.estado.toLowerCase()
        }
        else return d.estado.toLowerCase()
    }
    $(document).ready(function () {
        let disponible = document.querySelectorAll("div.disponible, a.disponible")
        let reservado = document.querySelectorAll("div.reservado, a.reservado")
        let seleccion = document.querySelectorAll("div.seleccionado, a.seleccionado")
        let ocupado = document.querySelectorAll("div.ocupado, a.ocupado")
        $("#disponible").text(disponible.length)
        $("#ocupado").text(ocupado.length)
        $("#reservado").text(reservado.length)
        $("#seleccionado").text(seleccion.length)
    })

    function Cargarlisat() {
        const user = getDatosUsuariosLocalStorag()

        intervalolista.current = setInterval(function () {
            modalshow.nombre == "Modallocalida" ? '' : clearInterval(intervalolista.current);
            localidaandespacio(mapath.precio.espacio, mapath.precio.idcolor).then(ouput => {

                if (ouput.data.find(e => e.typo == "fila")) {
                    let nuevoObjeto = []
                    ouput.data.forEach(x => {
                        if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                            nuevoObjeto.push({ fila: x.fila, asientos: [{ silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula }] })
                        }
                        else {
                            let indixe = nuevoObjeto.findIndex(e => e.fila == x.fila)
                            nuevoObjeto[indixe].asientos.push({
                                silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula
                            })
                        }
                    })
                    mapath.precio.typo == "fila" ? usedispatch(filtrarlocali(nuevoObjeto)) : ''
                    console.log(nuevoObjeto)
                } else if (ouput.data.find(e => e.typo == "mesa")) {
                    let nuevoObjeto = []
                    ouput.data.forEach(x => {
                        if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                            nuevoObjeto.push({ fila: x.fila, Mesas: [] })
                        }
                    })
                    nuevoObjeto.length > 0 ? ouput.data.forEach(x => {
                        let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
                        if (nuevoObjeto[index].Mesas.findIndex(z => z.mesa == x.mesa) == -1) {
                            nuevoObjeto[index].Mesas.push({ mesa: x.mesa, asientos: [] })
                        }
                    }) : ''
                    nuevoObjeto.length > 0 ? ouput.data.forEach(x => {
                        let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
                        let sillas = nuevoObjeto[index].Mesas.findIndex(y => y.mesa == x.mesa)
                        nuevoObjeto[index].Mesas[sillas].asientos.push({
                            silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula
                        })
                    })
                        : ''
                    //  console.log("aqui")
                    mapath.precio.typo == "mesa" ? usedispatch(filtrarlocali(nuevoObjeto)) : ''
                    //console.log(nuevoObjeto)
                }
                else if (ouput.data.some(e => e.typo == "correlativo")) {
                    mapath.precio.typo == "correlativo" ? usedispatch(filtrarlocali(ouput.data.filter(e => e.estado == "disponible"))) : ''
                    //    console.log(ouput.data.filter(e => e.estado == "disponible").length)
                    let dispo = ouput.data.filter(e => e.estado == "disponible").length
                    // console.log(ouput.data.filter(e=>e.cedula!=""))
                    // console.log(ouput.data.filter(e=>e.cedula!=null).length)
                    //console.log(ouput.data)
                    usedispatch(updateboletos({
                        disponibles: ouput.data.filter(e => e.estado == "disponible").length,
                        proceso: ouput.data.filter(e => e.estado == "reservado" && e.cedula == user.cedula).length,
                        pagados: sleccionlocalidad.pagados,
                        inpagos: sleccionlocalidad.inpagos
                    }))
                    /* console.log({
                         disponibles: ouput.data.filter(e => e.cedula != " " && e.cedula != null).length,
                         proceso: ouput.data.filter(e => e.estado == "reservado" && e.cedula == user.cedula).length,
                         pagados: sleccionlocalidad.pagados,  inpagos: sleccionlocalidad.inpagos
                     })*/
                }
            }).catch(err => {
                console.log(err)
            })

        }, 4000)
    }
    useEffect(() => {
        let user = getDatosUsuariosLocalStorag()
        mapath.localidadespecica != undefined && mapath.pathmap.length > 0 ? mapath.pathmap.map((e, i) => {
            if (sessionStorage.getItem("eventoid") != "YZPQQ3") {
                $("#mapas" + e.path).attr("fill", e.fill)
                $("#mapas" + e.path).removeAttr("class")
                // console.log(e.path)
                $("#mapas" + e.path).attr("fill", e.fill)
                $("#mapas" + e.path).removeAttr("class")
            }
            else {
                $("#mapas" + e.path).attr("fill", "red")
                $("#mapas" + e.path).removeAttr("class")
                // console.log(e.path)
                $("#mapas" + e.path).attr("fill", "red")
                $("#mapas" + e.path).removeAttr("class")
            }
        }) : ''
        let producto = {
            localidad: mapath.precio.localidad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            fila: 0, tipo: "correlativo",
            discapacidad: mapath.precio.precio_discapacidad,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto") ? sessionStorage.getItem("consierto") : '',
        }
        let cantidad = mapath.localidadespecica.info != undefined ? mapath.localidadespecica.info.length > 0 ? mapath.localidadespecica.info.filter(ced => ced.cedula == user.cedula) : [] : []
        mapath.localidadespecica.info != undefined ? mapath.localidadespecica.info.length > 0 ? cantidad.length > 0 ? setDetalle(Verificalocalidad(producto, cantidad).filter((e) => e.id == mapath.precio["idcolor"])) : '' : '' : ''
        getVerTienda().filter((e) => e.id == mapath.precio.idcolor).length > 0 ? setDetalle(getVerTienda().filter((e) => e.id == mapath.precio.idcolor)) : setDetalle([])
        Cargarlisat()
    }, [modalshow.nombre == "Modallocalida" ? true : false])

    function cerrar() {

        clearInterval(intervalolista.current);
        sessionStorage.removeItem(seleccionmapa)
        usedispatch(setModal({ nombre: 'ModalCarritov', estado: '' }))
        usedispatch(filtrarlocali([]))
        hideAlert()




    }
    modalshow.nombre != "Modallocalida" ? clearInterval(intervalolista.current) : ''
    return (
        <>
            {alert}
            <Modal
                show={modalshow.nombre == "Modallocalida" ? true : false}
                size="lg"
                fullscreen={'md-down'}
                onHide={cerrar}
                centered
            >

                <Modal.Header className=" bg-dark  text-light py-4">

                    <h5 className="modal-title text-center justify-content-center" style={{ fontWeight: "bold" }}>Tiempo restante de compra <span className="text-danger" >{intervalo} </span></h5>
                    <div className="pl-0" >
                        <button className=" d-none btn btn-outline-light" onClick={() => cerrar()} >
                            <i className="fa fa-arrow-left">  </i>
                        </button>
                        <button className=" btn  btn-outline-light mx-1" onClick={() => cerrar()} >
                            <i className="fa fa-shopping-cart">  </i>
                        </button>
                    </div>

                </Modal.Header>
                <Modal.Body className={mapath.precio.typo === "correlativo" ? " d-flex align-items-center mx-auto" : ""}>

                    <div className='conatiner-fluid col-12'>
                        <div className="row  ">
                            <div className="col-12 d-flex  flex-column justify-content-center text-center" style={{ fontWeight: "bold" }}>
                                <h5 className="d-none">Libres: {sleccionlocalidad.disponibles}</h5>
                                <h5 style={{
                                    fontWeight: "bold"
                                }}>{mapath.precio.localidad}</h5>
                                <h6 className="px-1"
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: "0.8em"
                                    }}
                                >$ {mapath.precio.precio_normal} </h6>
                            </div>
                            <div className="col-12 d-flex justify-content-center align-items-center" style={{ maxHeight: "200px" }}>
                                {modalshow.nombre == "Modallocalida" ? <SVGView text={mapath.nombre} /> : ''}
                            </div>

                            {modalshow.nombre == "Modallocalida" && mapath.precio.typo != "correlativo" ?
                                <div className="col-12 d-flex  flex-wrap  ">
                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-success text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >

                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }} id="disponible" >  0   </span>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <span>Disponibles.<span className="text-white">...</span></span>

                                        </div>

                                    </div>

                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-warning text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em', color: 'black' }} id="reservado">   0 </span>
                                            </div>
                                        </div>
                                        <span>En Proceso.</span>
                                    </div>
                                    <div className="d-flex  flex-row  p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-secondary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }} id="seleccionado" >   0 </span>
                                            </div>
                                        </div>
                                        <span>Seleccionado.</span>
                                    </div>
                                    <div className="d-flex flex-row p-2  align-items-center" >
                                        <div className="d-flex   mx-1 bg-danger text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                            <div className="d-flex justify-content-center">
                                                <span style={{ fontSize: '0.7em' }} id="ocupado" >   0 </span>
                                            </div>
                                        </div>
                                        <span>Ocupados.</span>
                                    </div>

                                </div> : ''}
                            <div className="col-12 pt-1">
                                {modalshow.nombre == "Modallocalida" && mapath.precio.typo == "fila" ?
                                    <div className="section" style={{ maxHeight: '550px', minHeight: '250px', overflowY: 'auto', overflowX: 'auto', }}>
                                        {modalshow.nombre == "Modallocalida" && mapath.localidadespecica.length > 0 ?
                                            mapath.localidadespecica.map((e, i) => {
                                                {
                                                    return (
                                                        <div className='d-flex  px-3 p-1 justify-content-ce ' key={"lista" + i}>
                                                            <span className="d-inline-block " disabled >
                                                                <div className="d-flex   mx-1 bg-primary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                                                    <div className="d-flex justify-content-center">
                                                                        <span style={{ fontSize: '0.7em' }}>    {e.fila} </span>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                            <div className=' d-flex px-1  align-items-stretch ' style={{ width: '100%' }}>
                                                                {e.asientos.map((silla, index) => {
                                                                    let numero = index + 1
                                                                    return (
                                                                        <div key={"silla" + index} id={silla.idsilla}
                                                                            className={silla.silla + '  d-flex  ' + sillasetado(silla) + '  rounded-5 sillasfila text-center  justify-content-center align-items-center '}
                                                                            style={{ height: '30px', width: '30px', marginLeft: '1px', }}
                                                                            onClick={() => Agregarsilla(silla)}
                                                                        >
                                                                            <div className={'px-3 d-flex   text-white justify-content-center  '} >
                                                                                <div className="d-flex justify-content-center">
                                                                                    <span style={{ fontSize: '0.7em' }}> {numero} </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                            : ""}
                                    </div> : ''}
                                {modalshow.nombre == "Modallocalida" && mapath.precio.typo === "mesa" ?
                                    <div className="col-sm-12 text-center " style={{ maxHeight: '550px', minHeight: '250px', overflowY: 'auto', overflowX: 'auto', }}>
                                        <div className='d-flex  px-3 align-items-center' >
                                            <div className='d-flex align-itmes-center pb-2' style={{ width: '80px' }}>
                                                <h5>Filas</h5>
                                            </div>
                                            <div className='d-flex align-itmes-center pb-2' >
                                                <h5>Mesas</h5>
                                            </div>
                                        </div>
                                        {
                                            mapath.localidadespecica.length > 0 ?
                                                mapath.localidadespecica.map((e, index) => {
                                                    return (
                                                        <div className='d-flex  PX-1 align-items-center' key={index}>
                                                            <div className='d-flex pb-2'>
                                                                <MesaiView
                                                                    text={e.fila}
                                                                />
                                                            </div>
                                                            <div className='d-flex  pb-2' >
                                                                {e.Mesas.length > 0 ?
                                                                    e.Mesas.map((e, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                <MesasView
                                                                                    status={e.asientos.length}
                                                                                    text={e.mesa}
                                                                                    list={e.asientos}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }) : ''}
                                                            </div>
                                                        </div>

                                                    )
                                                }) : ''
                                        }
                                    </div> : ''}
                                {mapath.precio.typo === "correlativo" ?
                                    <div className="d-flex flex-wrap justify-content-center align-items-center">
                                        <div className="text-center d-flex justify-content-end align-items-center">



                                            {detalle.length > 0 ? <button className="resta  btn-danger rounded-circle "
                                                onClick={restaprecio}
                                                disabled={disable}
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button> : <button className="resta btn-disable border rounded-circle "

                                                disabled={false}
                                            >
                                                <i className="fa fa-minus"></i>
                                            </button>}
                                            <hr className="mx-2" ></hr>
                                            <button className="suma   btn-success rounded-circle"
                                                disabled={disable}
                                                onClick={agregar}

                                            >
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>

                                    </div> : ''

                                }

                            </div>

                        </div>

                    </div>

                    {spinervi ? "" :
                        <div
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
                                <h4 className='text-light'>Seleccionando ...</h4>


                            </div>
                        </div>}
                </Modal.Body>
                <Modal.Footer className="px-0 bg" >
                    <div className=" container-fluid  text-dark  border-top justify-content-between p-3" style={{ minHeight: '50px', maxHeight: '188px', width: '100%' }} >
                        {mapath.precio.typo != "correlativo" ?
                            <div className="col-12 ">
                                {mapath.precio.typo == "mesa" ? <h5>Numero de mesas y sillas seleccionadas</h5> : <h5>Sillas y Filas Selecionadas</h5>}
                                <div className="d-flex flex-wrap" style={{ minHeight: '10px', maxHeight: '150px', overflowY: 'auto', overflowX: 'hide', }}>
                                    {
                                        seleccion.length > 0 ?
                                            seleccion.filter((e) => e.estado == "seleccionado").map((elm, id) => {
                                                return (
                                                    <li key={id} className={elm.silla + '  d-flex agregados rounded-5  bg-success justify-content-center align-items-center '}
                                                        onClick={() => console.log({ /*"localidad": elm.localidad, tipo: mapath.precio.typo, "localidaEspacio": elm.localidaEspacio, "fila": elm.silla.split("-")[0], "silla": elm.silla, "estado": "borrar" */ })}
                                                        style={{ height: '30px', width: '80px', margin: '1px' }} >
                                                        <div className={'d-flex   text-white justify-content-center  '} >
                                                            <div className="d-flex  justify-content-center text-center p-2">
                                                                <span className="mx-1" style={{ fontSize: '0.8em' }}>{elm.silla.replace("-", " ").split(" ")[0]}</span>
                                                                <span style={{ fontSize: '0.8em' }}> {elm.silla.replace("-", " ").split(" ")[1]}</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }) : ''
                                    }
                                </div>
                            </div> : <div>


                            </div>}
                        <div className="px-0">
                            {mapath.precio.typo === "correlativo" ?
                                <div className="d-flex px-0  justify-content-center " >

                                    <div className="flex-row first text-center col-sm " role="cell"
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >Localidad</div>
                                    {/* <div className="flex-row d-none d-sm-block  text-center col-2 col-md-2">{e.fila}</div>*/}

                                    <div className="flex-row  text-center  col-5"
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >Total tickets </div>
                                    <div className="flex-row   text-center col-sm"
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >Valor </div>


                                </div>
                                : ''

                            }
                            {
                                mapath.precio.typo === "correlativo" && detalle.length > 0 ?

                                    detalle.map((e, i) => {
                                        return (
                                            <div className="d-flex  justify-content-center " role="rowgroup" key={"items" + i}>

                                                <div className="flex-row first text-center col-sm " role="cell"> {e.localidad}</div>
                                                {/* <div className="flex-row d-none d-sm-block  text-center col-2 col-md-2">{e.fila}</div>*/}

                                                <div className="flex-row  text-center  col-5"> {e.cantidad}</div>
                                                <div className="flex-row   text-center col-sm"> ${(e.valor * e.cantidad).toFixed(2)}</div>


                                            </div>
                                        )
                                    })



                                    : ''

                            }
                            {
                                mapath.precio.typo === "correlativo" && detalle.length > 0 ? <div className="text-center ">
                                    <button className="btn btn-primary mt-2" onClick={cerrar} > Continuar </button>


                                </div> : ''}
                        </div>



                    </div>

                </Modal.Footer>

            </Modal>

        </>
    )

}

export default LocalidadmapViews