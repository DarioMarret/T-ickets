import React from "react";
import { Stylesilla } from "./style";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { useDispatch, useSelector } from "react-redux";
import { correlativosadd } from "utils/Querypanelsigui";
import { AgregarAsiento } from "utils/CarritoLocalStorang";
import { addSillas } from "StoreRedux/Slice/sillasSlice";
import { deleteSillas } from "StoreRedux/Slice/sillasSlice";
import { EliminarsilladeMesa } from "utils/CarritoLocalStorang";
import { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { setSpinersli } from "StoreRedux/Slice/SuscritorSlice";
import { TotalSelecion } from "utils/CarritoLocalStorang";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
const MesaochoView = ({ text, list }) => {
  let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
  let usedispatch = useDispatch();
  const [alert, setAlert] = useState(null)
  let user = getDatosUsuariosLocalStorag()
  const modalshow = useSelector((state) => state.SuscritorSlice.modal)
  var mapath = useSelector((state) => state.mapaLocalSlice.pathmap)
  function Estado(e) {
    let estado = list.find(f => f.silla == e)
    if (estado.cedula != null && estado.cedula != "") {
      if (user != null && estado.cedula == user.cedula) return "seleccionado"
      else return "reservado"
    }
    else return estado.estado.toLowerCase()
  }
  //*estado de mesa
  function MesaEstado(e) {
    if (list.length == 0) {
      return
    }
    let asiento = list.map(function (k) {
      {
        if (k.cedula != "") {
          // console.log(k.cedula)
          if (user == undefined) {
            return k.estado
          }
          if (k.cedula == user.cedula) {
            // console.log(k.cedula, user.cedula)
            return ["seleccionado"];
          }
          else { return k.estado }
        }
        else return [k.estado]
      }
    });
    //console.log(asiento)
    const isSeleccion = (currentValue) => currentValue == "seleccionado";
    const isOcupado = (currentValue) => currentValue == "ocupado";
    const isReserva = (currentValue) => currentValue == "RESERVADO" || currentValue == "reservado";
    const isDispon = (currentValue) => currentValue == "disponible" || currentValue == "DISPONIBLE";
    if (Object.values(asiento).every(isDispon)) { return "mesadisponible" }
    if (Object.values(asiento).every(isOcupado)) { return "mesaocupado" }
    if (Object.values(asiento).every(isReserva)) { return "mesareserva" }
    if (Object.values(asiento).every(isSeleccion)) { return "mesaselecion" }
    return "mesadisponible"
  }
  /*  obtener sillas  */
  function obtenerid(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    return estado

  }

  function sillasid(e) {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    let silla = list.find(f => f.silla == e)
    if (info == undefined) {
      return
    }
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula != silla.cedula)) {
      return
    }
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula == silla.cedula)) {
      let datos = {
        "cedula": info.cedula,
        "estado": "disponible",
        "mesa": [
          {
            id_silla: silla.idsilla,
            id: mapath[0].id,
            cedula: info.cedula,
            estado: "",
            ...silla
          }
        ]
      }
      hideAlert()
      correlativosadd(datos).then(ou => {
        usedispatch(setSpinersli({ spiner: false }))
        if (ou.success) {
          //console.log(ou)
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla,
              "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado", "cedula": info.cedula
            })
            usedispatch(addSillas({
              "localidad": nombre.localidad, "localidaEspacio": nombre,
              "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla, "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla, "estado": "seleccionado"
            }))

          }))
          ou.update.map((e) => {
            let asiento = silla
            usedispatch(deleteSillas({
              "localidad": nombre.localidad,
              "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla,
              "estado": "seleccionado"
            }))
            EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento.silla })
          })
          usedispatch(setSpinersli({ spiner: true }))
          // hideAlert()

        }
      }).catch(err => {
        console.log(err)
      })
      return
    }

    if (silla.estado.toLowerCase().includes("disponible")) {
      let datos = {
        "cedula": info.cedula,
        "estado": "disponible",
        "mesa": [
          {
            id_silla: silla.idsilla,
            id: mapath[0].id,
            cedula: info.cedula,
            estado: "",
            ...silla
          }
        ]
      }
      hideAlert()
      correlativosadd(datos).then(ou => {

        usedispatch(setSpinersli({ spiner: false }))
        if (ou.success) {
          console.log(ou)
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla,
              "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
            })
            usedispatch(addSillas({
              "localidad": nombre.localidad, "localidaEspacio": nombre,
              "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla, "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla, "estado": "seleccionado"
            }))

          }))
          ou.update.map((e) => {
            let asiento = silla
            usedispatch(deleteSillas({
              "localidad": nombre.localidad,
              "fila": asiento.silla.split("-")[0],
              "silla": asiento.silla,
              "estado": "seleccionado"
            }))
            EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento.silla })
          })

          usedispatch(setSpinersli({ spiner: true }))

        }
      }).catch(err => {
        console.log(err)
      })
    }

    console.log(estado, list.find(f => f.silla == e))
    // console.log("%c%s", "color: red; background: yellow; font-size: 24px;", "ADVERTENCIA")
  }
  function enviarsillas(text) {
    let datos = document.getElementById(text).classList.value
    if (datos.includes("mesareserva")) {
      return
    }
    if (datos.includes("mesaselecion")) {
      modalshow.nombre == "Modallocalida" ? succesDesmar(text) : ''
      return
    }
    //console.log(datos.includes("mesareserva"))
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    if (TotalSelecion() >= 9) {

      usedispatch(setToastes({
        show: true,
        message: 'Debes desmarcar la selección anterior para poder comprar la mesa completa',
        color: 'bg-warning', estado: 'Límite alcanzado'
      }))

      return
    }
    //console.log(list.filter(es => es.estado == "disponible" || es.cedula == "DISPONIBLE").length)
    modalshow.nombre == "Modallocalida" ? succesLimit(text) : ''
  }
  const succesLimit = (me) => {
    if (TotalSelecion() >= 3) {
      usedispatch(setToastes({
        show: true,
        message: 'Has alcanzado el limite de selección',
        color: 'bg-warning', estado: 'No puedes seleccionar toda la mesa'
      }))
      return
    }
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Deseas selecionar todas las sillas"
        onConfirm={() => timeposlimites()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Si, Continuar"
        cancelBtnText="Cancelar"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel>
        En la mesa  {me}
      </SweetAlert>
    )

  }
  const succesSilla = (e) => {
    /**/
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let silla = list.find(f => f.silla == e)
    if (info == undefined) {
      return
    }
    // console.log(silla)
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula != silla.cedula)) {
      return
    }
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula == silla.cedula)) {

      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={"Deseas desmarcar "}
          onConfirm={() => sillasid(e)}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Si, Continuar"
          cancelBtnText="Cancelar"
          closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
          showCancel>
          {"la sillas " + e}
        </SweetAlert>)

      return
    }
    //console.log((TotalSelecion() < 10))
    if (TotalSelecion() < 10) {
      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title={"Deseas selecionar "}
          onConfirm={() => sillasid(e)}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText="Si, Continuar"
          cancelBtnText="Cancelar"
          closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
          showCancel>
          {"la sillas " + e}
        </SweetAlert>)
    }
  }
  const succesDesmar = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={"Deseas desmarcar toda la seleccion de esta mesa "}
        onConfirm={() => reservas(e)}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Si, Continuar"
        cancelBtnText="Cancelar"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel>
        {"la sillas " + e}
      </SweetAlert>)
  }
  function timeposlimites() {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let nuevo = list.filter(es => es.estado == "disponible" || es.estado == "DISPONIBLE").map(({ idsilla, ...e }) => {
      let id = idsilla
      return {
        id_silla: id,
        id: mapath[0].id,
        cedula: info.cedula,
        estado: "",
        ...e
      }
    })

    let datos = {
      "cedula": info.cedula,
      "estado": "disponible",
      "mesa": [
        ...nuevo
        // , ...data
      ]
    }
    hideAlert()
    usedispatch(setSpinersli({ spiner: false }))
    correlativosadd(datos).then(ou => {
      if (ou.success) {
        //console.log(ou)
        ou.insert.map((e => {
          let asiento = list.filter(ef => ef.idsilla == e)
          // console.log(asiento, e)
          AgregarAsiento({
            "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla,
            "fila": asiento[0].silla.split("-")[0], "silla": asiento[0].silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
          })
          usedispatch(addSillas({
            "localidad": nombre.localidad, "localidaEspacio": nombre,
            "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla, "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla, "estado": "seleccionado"
          }))
        }))
        ou.update.map((e) => {
          let asiento = list.filter(ef => ef.idsilla == e)
          //console.log(asiento)
          usedispatch(deleteSillas({
            "localidad": nombre.localidad,
            "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla,
            "estado": "seleccionado"
          }))
          EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento[0].silla })
        })
        usedispatch(setSpinersli({ spiner: true }))

      }
      usedispatch(setSpinersli({ spiner: true }))
    }).catch(err => {
      usedispatch(setSpinersli({ spiner: true }))
      console.log(err)
    })
    //console.log(datos)

  }
  function reservas() {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let nuevo = list.filter(es => es.cedula == info.cedula).map(({ idsilla, ...e }) => {
      let id = idsilla
      return {
        id_silla: id,
        id: mapath[0].id,
        cedula: info.cedula,
        estado: "",
        ...e
      }
    })

    let datos = {
      "cedula": info.cedula,
      "estado": "disponible",
      "mesa": [
        ...nuevo
        // , ...data
      ]
    }
    hideAlert()
    usedispatch(setSpinersli({ spiner: false }))
    correlativosadd(datos).then(ou => {

      if (ou.success) {
        // console.log(ou)
        ou.insert.map((e => {
          let asiento = list.filter(ef => ef.idsilla == e)
          //console.log(asiento, e)
          AgregarAsiento({
            "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla,
            "fila": asiento[0].silla.split("-")[0], "silla": asiento[0].silla, "estado": "seleccionado", "ids": asiento.idsilla, "cedula": info.cedula
          })
          usedispatch(addSillas({
            "localidad": nombre.localidad, "localidaEspacio": nombre,
            "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla, "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla, "estado": "seleccionado"
          }))
        }))
        ou.update.map((e) => {
          let asiento = list.filter(ef => ef.idsilla == e)
          //console.log(asiento)
          usedispatch(deleteSillas({
            "localidad": nombre.localidad,
            "fila": asiento[0].silla.split("-")[0],
            "silla": asiento[0].silla,
            "estado": "seleccionado"
          }))
          EliminarsilladeMesa({ localidad: nombre.localidad + "-" + asiento[0].silla })
        })
        usedispatch(setSpinersli({ spiner: true }))

      }
      usedispatch(setSpinersli({ spiner: true }))
    }).catch(err => {
      usedispatch(setSpinersli({ spiner: true }))
      console.log(err)
    })
    // console.log(datos)

  }
  const hideAlert = () => setAlert(null)
  return (
    <div style={{ padding: '0.7px' }}>
      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>
        {alert}
        <a id={obtenerid(text + "-s-1")}
          onClick={() => succesSilla(text + "-s-1")}
          className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}></a>

        <div className="" style={Stylesilla.asientos}>
        </div>
        <a id={obtenerid(text + "-s-2")}
          onClick={() => succesSilla(text + "-s-2")}
          className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
        </a>
      </div>

      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-3")}
            onClick={() => succesSilla(text + "-s-3")}
            className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
          </a>

          <a id={obtenerid(text + "-s-4")}
            onClick={() => succesSilla(text + "-s-4")}
            className={text + "-s-4 sillas  " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div id={text} className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)}
          onClick={() => enviarsillas(text)}
          style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-5")}
            onClick={() => succesSilla(text + "-s-5")}
            className={text + "-s-5 sillas  " + Estado(text + "-s-5")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-6")}
            onClick={() => succesSilla(text + "-s-6")}
            className={text + "-s-6 sillas  " + Estado(text + "-s-6")} style={Stylesilla.asientos}>
          </a>
        </div>
      </div>

      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>
        <a id={obtenerid(text + "-s-7")}
          onClick={() => sillasid(text + "-s-7")}
          className={text + "-s-7 sillas  " + Estado(text + "-s-7")} style={Stylesilla.asientos}>
        </a>
        <div style={Stylesilla.asientos}>
        </div>
        <a id={obtenerid(text + "-s-8")}
          onClick={() => sillasid(text + "-s-8")}
          className={text + "-s-8 sillas  " + Estado(text + "-s-8")} style={Stylesilla.asientos}>
        </a>
      </div>
    </div>
  )

}

export default MesaochoView;