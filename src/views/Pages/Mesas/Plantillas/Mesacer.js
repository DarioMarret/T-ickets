import React from "react";
import { Stylesilla } from "./style";
const MesacerView = ({ text }) => {

  /* function MesaEstado(e) {
     const isSeleccion = (currentValue) => currentValue == "seleccionado";
     const isOcupado = (currentValue) => currentValue == "ocupado";
     const isReserva = (currentValue) => currentValue == "reservado";
     let asiento = []
     if (false) {
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
   }*/
  return (
    <div style={{ padding: '0.7px' }}>
      <div className="d-flex">
        <div style={Stylesilla.asientos}>
        </div>

        <div style={Stylesilla.asientos}></div>

        <div style={Stylesilla.asientos}>
        </div>
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
        <div className="bg-success txt-white d-flex p-1" style={Stylesilla.mesas}>
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
        <div style={Stylesilla.asientos}>
        </div>

        <div style={Stylesilla.asientos}></div>

        <div style={Stylesilla.asientos}></div>
        <div style={Stylesilla.asientos}>
        </div>
      </div>
    </div>


  )

}

export default MesacerView;