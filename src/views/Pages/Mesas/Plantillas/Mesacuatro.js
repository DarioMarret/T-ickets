import React from "react";
import { Stylesilla } from "./style";
import { useSelector } from "react-redux";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import SweetAlert from "react-bootstrap-sweetalert";
import { useState } from "react";
const MesacuatroView = ({ text, list }) => {
  let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
  const [alert, setAlert] = useState(null)
  let user = getDatosUsuariosLocalStorag()
  const modalshow = useSelector((state) => state.SuscritorSlice.modal)

  function Estado(e) {
    let estado = list.find(f => f.silla == e)
    if (estado.cedula != undefined && estado.cedula != "") {
      if (user != null && estado.cedula == user.cedula) return "seleccionado"
      else return "reservado"
    }
    else return estado.estado
  }
  function MesaEstado(e) {
    let asiento = list.map(function (k) {
      {
        if (k.cedula != undefined) {
          if (user != undefined && k.cedula == user.cedula) {
            return ["seleccionado"];
          }
          else { return k.estado }
        }
        else return [k.estado]
      }
    });
    const isSeleccion = (currentValue) => currentValue == "seleccionado";
    const isOcupado = (currentValue) => currentValue == "ocupado";
    const isReserva = (currentValue) => currentValue == "reservado";
    const isDispon = (currentValue) => currentValue == "disponible";
    if (Object.values(asiento).every(isDispon)) { return "mesadisponible" }
    if (Object.values(asiento).every(isOcupado)) { return "mesaocupado" }
    if (Object.values(asiento).every(isReserva)) { return "mesareserva" }
    if (Object.values(asiento).every(isSeleccion)) { return "mesaselecion" }
    return "mesadisponible"
  }
  function obtenerid(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    return estado

  } function enviarsillas(text) {
    modalshow.nombre == "Modallocalida" ? succesLimit(text) : ''
    modalshow.nombre == "Modallocalida" ? console.log(list) : ''
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
  function timeposlimites() {
    list.map((e, i) => {
      setTimeout(function () {
        console.log(e)
      }, 1000 * i)
    })

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
          <a id={obtenerid(text + "-s-1")} className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}>
          </a>

          <a id={obtenerid(text + "-s-2")} className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)} style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column align-items-center">
          <a id={obtenerid(text + "-s-3")} className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-4")} className={text + "-s-4 sillas  " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
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