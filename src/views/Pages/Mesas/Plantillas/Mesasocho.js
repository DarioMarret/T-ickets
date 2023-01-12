import React from "react";
import { Stylesilla } from "./style";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
const MesaochoView = ({ text, list }) => {
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
  function obtenerid(e) {
    let estado = list.find(f => f.silla == e).idsilla != undefined ? "silla-" + list.find(f => f.silla == e).idsilla : ""
    return estado
  }
  return (
    <div style={{ padding: '0.7px' }}>
      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>

        <a id={obtenerid(text + "-s-1")} 
          onClick={() => sillasid(text + "-s-1")}
        className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}></a>

        <div className="" style={Stylesilla.asientos}>
        </div>
        <a id={obtenerid(text + "-s-2")} 
          onClick={() => sillasid(text + "-s-2")}
        className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
        </a>
      </div>

      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-3")} 
            onClick={() => sillasid(text + "-s-3")}
          className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
          </a>

          <a id={obtenerid(text + "-s-4")}
            onClick={() => sillasid(text + "-s-4")}
          className={text + "-s-4 sillas  " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div className={text + " " + list.length + "   Mesa  txt-white d-flex p-1 " + MesaEstado(text)} style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-5")} 
            onClick={() => sillasid(text + "-s-5")}
          className={text + "-s-5 sillas  " + Estado(text + "-s-5")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-6")} 
            onClick={() => sillasid(text + "-s-6")}
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