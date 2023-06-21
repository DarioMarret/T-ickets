import React from "react";
import { Stylesilla } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import SweetAlert from "react-bootstrap-sweetalert";
import { useState } from "react";
import { correlativosadd } from "utils/Querypanelsigui";
import { AgregarAsiento } from "utils/CarritoLocalStorang";
import { addSillas } from "StoreRedux/Slice/sillasSlice";
import { deleteSillas } from "StoreRedux/Slice/sillasSlice";
import { EliminarsilladeMesa } from "utils/CarritoLocalStorang";
import { setSpinersli } from "StoreRedux/Slice/SuscritorSlice";
const MesacuatroView = ({ text, list }) => {
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
  function MesaEstado(e) {
    //console.log(user.cedula)
    //console.log("Aqui-->",list)
    if (list.length == 0) {
      return
    }
    let asiento = list.map(function (k) {
      {
        if (k.cedula != "") {
          // console.log(k.cedula)
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
  function obtenerid(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    return estado

  }

  function sillasid(e) {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    let silla = list.find(f => f.silla == e)
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
          console.log(ou)
          ou.insert.map((e => {
            let asiento = silla
            AgregarAsiento({
              "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
              seleccionmapa: nombre.localidad + "-" + asiento.silla,
              "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado"
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
              "fila": asiento.silla.split("-")[0], "silla": asiento.silla, "estado": "seleccionado"
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
      modalshow.nombre == "Modallocalida" ? succesLimit(text) : ''
      return
    }
    //console.log(datos.includes("mesareserva"))
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    console.log(list.filter(es => es.estado == "disponible" || es.cedula == "DISPONIBLE").length)
    modalshow.nombre == "Modallocalida" ? succesLimit(text) : ''
  }
  const succesLimit = (list) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Deseas selecionar todas las sillas disponible"
        onConfirm={() => timeposlimites()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Si, Continuar"
        cancelBtnText="Cancelar"
        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel>
        En la mesa  {list}
      </SweetAlert>
    )
  }
  const succesSilla = (e) => {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let silla = list.find(f => f.silla == e)
    if (silla.estado.toLowerCase().includes("reservado") && (info.cedula != silla.cedula)) {
      return
    }
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={"Deseas selecionar/desmarcar "}
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
  function timeposlimites() {
    let info = JSON.parse(sessionStorage.getItem("DatoCliente"))
    let nuevo = list.filter(es => es.estado == "disponible" || es.estado == "DISPONIBLE").map(({ idsilla, ...e }) => {
      // console.log(idsilla)
      let id = idsilla
      return {
        id_silla: id,
        id: mapath[0].id,
        cedula: info.cedula,
        estado: "",
        ...e
      }
    })
    let data = list.filter(es => es.estado == "reservado" || es.estado == "RESERVADO" && es.cedula == info.cedula).map(({ idsilla, ...e }) => {
      return {
        id_silla: idsilla,
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
        , ...data
      ]
    }
    hideAlert()
    correlativosadd(datos).then(ou => {
      usedispatch(setSpinersli({ spiner: false }))
      
      if (ou.success) {

        console.log(ou)
        ou.insert.map((e => {
          let asiento = list.filter(ef => ef.idsilla == e)
          console.log(asiento, e)
          AgregarAsiento({
            "localidad": nombre.localidad, "localidaEspacio": nombre, "nombreConcierto": sessionStorage.getItem("consierto"), "valor": nombre.precio_normal,
            seleccionmapa: nombre.localidad + "-" + asiento[0].silla,
            "fila": asiento[0].silla.split("-")[0], "silla": asiento[0].silla, "estado": "seleccionado"
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
          console.log(asiento)
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
    }).catch(err => {
      console.log(err)
    })
    console.log(datos)

  }
  const hideAlert = () => setAlert(null)
  return (
    <div style={{ padding: '0.7px' }}>
      {alert}
      <div className="d-flex">
        <div style={Stylesilla.asientos}>
        </div>

        <div style={Stylesilla.asientos}>
        </div>
        <div style={Stylesilla.asientos}>
        </div>
        <div style={Stylesilla.asientos}>
        </div>
      </div>

      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column align-items-center">
          <a id={obtenerid(text + "-s-1")}
            onClick={() => succesSilla(text + "-s-1")}
            className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-2")}
            onClick={() => succesSilla(text + "-s-2")}
            className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div id={text} className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)}
       
          onClick={() => enviarsillas(text)}
          style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column align-items-center">
          <a id={obtenerid(text + "-s-3")}
            onClick={() => succesSilla(text + "-s-3")}
            className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-4")}
            onClick={() => succesSilla(text + "-s-4")}
            className={text + "-s-4 sillas  " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
          </a>
        </div>
      </div>

      <div className="d-flex  ">
        <div style={Stylesilla.asientos}>
        </div>
        <div style={Stylesilla.asientos}>
        </div>
        <div style={Stylesilla.asientos}>
        </div>
        <div style={Stylesilla.asientos}>
        </div>
      </div>
    </div>
  )


}

export default MesacuatroView;