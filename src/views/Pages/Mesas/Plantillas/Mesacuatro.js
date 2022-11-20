import React from "react";
import { Stylesilla } from "./style";
import { useSelector } from "react-redux";
const MesacuatroView = ({ text, list }) => {
  let nombre = JSON.parse(sessionStorage.getItem("seleccionmapa"))
  const seleccion = useSelector((state) => state.sillasSlice.sillasSelecionadas.filter((e) => e.localidad == nombre.localodad))
  let silla = seleccion
  function checkAvailability(arr, val) {
    return arr.some(function (arrVal) {
      return val === arrVal.silla;
    });
  }
  function Estado(e) {
    if (silla.length > 0) {
      var index = list.findIndex(obj => obj.silla == e);
      return checkAvailability(seleccion, e) ? silla[silla.findIndex(obj => obj.silla == e)].estado : list[index].estado
    }
    var index = list.findIndex(obj => obj.silla == e);
    return list[index].estado
  }
  function MesaEstado(e) {
    const isSeleccion = (currentValue) => currentValue == "seleccionado";
    const isOcupado = (currentValue) => currentValue == "ocupado";
    const isReserva = (currentValue) => currentValue == "reservado";
    let asiento = []
    if (silla.length > 0) {
      var index = silla.filter(obj => obj.fila === e);
      index != null && index.length > 0 ?
        index.forEach((obj, i) => {
          asiento[i] = obj.estado
        }) : ''
      if (asiento.length === 4) {
        if (Object.values(asiento).every(isOcupado)) { return "mesaocupado" }
        if (Object.values(asiento).every(isReserva)) { return "mesareserva" }
        if (Object.values(asiento).every(isSeleccion)) { return "mesaselecion" }
        else
          return 'mesaselecion'
      }
      else {
        return 'mesadisponible'
      }
    } else {
      return "mesadisponible"
    }
  }
  return (
    <div className="" style={{ padding: '0.7px' }}>
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
          <a className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}>
          </a>

          <a className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)} style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column align-items-center">
          <a className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
          </a>
          <a className={text + "-s-4 sillas  " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
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