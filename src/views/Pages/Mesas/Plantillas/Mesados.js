import React from "react";
import { Stylesilla } from "./style";
import { useSelector } from "react-redux";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
const MesadosView = ({ text, list }) => {
  let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
  let user = getDatosUsuariosLocalStorag()

  function Estado(e) {
    let estado = list.find(f => f.silla == e)
    /*if (silla.length > 0) {
      //let valor = 
      //console.log(checkAvailability(seleccion,e))
      //var index = ;
      var index = list.findIndex(obj => obj.silla == e);
      return checkAvailability(seleccion, e) ? silla[silla.findIndex(obj => obj.silla == e)].estado : list[index].estado
    }
    var index = list.findIndex(obj => obj.silla == e);
    return list[index].estado*/
    if (estado.cedula != undefined && estado.cedula != "") {
      if (user != null && estado.cedula == user.cedula) return "seleccionado"
      else return "reservado"
      // return "seleccionado"
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
  return (
    <div style={{ padding: '0.7px' }}>
      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>

        <div style={Stylesilla.asientos}></div>

        <a className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}>
        </a>
        <div style={Stylesilla.asientos}>
        </div>
      </div>

      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column">
          <div style={Stylesilla.asientos}>
          </div>

          <div style={Stylesilla.asientos}>
          </div>
        </div>
        <div className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)} style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column">
          <div style={Stylesilla.asientos}>
          </div>
          <div style={Stylesilla.asientos}>
          </div>
        </div>
      </div>

      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>

        <div style={Stylesilla.asientos}></div>

        <a className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
        </a>
        <div style={Stylesilla.asientos}>
        </div>
      </div>
    </div>


  )

}

export default MesadosView;