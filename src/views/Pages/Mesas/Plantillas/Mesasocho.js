import React from "react";
import { Stylesilla } from "./style";
import { useSelector } from "react-redux";
const MesaochoView = ({ text, list }) => {
  let nombre = JSON.parse(localStorage.getItem("seleccionmapa"))
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
    let asiento = []
    if (silla.length > 0) {
      var index = silla.filter(obj => obj.fila === e);
      index != null && index.length > 0 ?
        index.forEach((obj, i) => {
          asiento[i] = obj.estado
        }) : ''
      if (asiento.length === 8) {
        if (Object.values(asiento).every(isOcupado)) { return "bg-danger" }
        if (Object.values(asiento).every(isSeleccion)) { return "bg-secondary" }
        else
          return 'bg-secondary'
      }
      else {
        return 'bg-success'
      }
    } else {
      return "bg-success"
    }

  }
  return (
    <div style={{ padding: '0.7px' }}>
      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>

        <a className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}></a>

        <div className="" style={Stylesilla.asientos}>
        </div>
        <a className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
        </a>
      </div>

      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column">
          <a className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
          </a>

          <a className={text + "-s-4 sillas  " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div className={text + " " + list.length + "   Mesa  txt-white d-flex p-1 " + MesaEstado(text)} style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column">
          <a className={text + "-s-5 sillas  " + Estado(text + "-s-5")} style={Stylesilla.asientos}>
          </a>
          <a className={text + "-s-6 sillas  " + Estado(text + "-s-6")} style={Stylesilla.asientos}>
          </a>
        </div>
      </div>

      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>
        <a className={text + "-s-7 sillas  " + Estado(text + "-s-7")} style={Stylesilla.asientos}>
        </a>
        <div style={Stylesilla.asientos}>
        </div>
        <a className={text + "-s-8 sillas  " + Estado(text + "-s-8")} style={Stylesilla.asientos}>
        </a>
      </div>
    </div>


  )

}

export default MesaochoView;