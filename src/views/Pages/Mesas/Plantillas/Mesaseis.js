import React from "react";
import { Stylesilla } from "./style";
const MesaseisView = ({ text, list, obtenerid, alert,succesSilla, Estado, MesaEstado, enviarsillas }) => {
  
  return (
    <div style={{ padding: '0.7px' }}>
      {alert}
      <div className="d-flex ">
        <div style={Stylesilla.asientos}>
        </div>

        <div style={Stylesilla.asientos}></div>

        <a id={obtenerid(text + "-s-1")}
          onClick={() => succesSilla(text + "-s-1")}
        className={text + "-s-1 sillas   " + Estado(text + "-s-1")} style={Stylesilla.asientos}>
        </a>
        <div style={Stylesilla.asientos}>
        </div>
      </div>

      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-2")} 
            onClick={() => succesSilla(text + "-s-2")}
          className={text + "-s-2 sillas   " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
          </a>

          <a id={obtenerid(text + "-s-3")} 
            onClick={() => succesSilla(text + "-s-3")}
          className={text + "-s-3 sillas   " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div id={text} className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)}
          onClick={() => enviarsillas(text)}
          style={Stylesilla.mesas}>
          {text}
        </div>

        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-4")}
            onClick={() => succesSilla(text + "-s-4")}
          className={text + "-s-4 sillas   " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-5")} 
            onClick={() => succesSilla(text + "-s-5")}
          className={text + "-s-5 sillas   " + Estado(text + "-s-5")} style={Stylesilla.asientos}>
          </a>
        </div>
      </div>

      <div className="d-flex ">
        <div style={Stylesilla.asientos}>
        </div>

        <div style={Stylesilla.asientos}></div>

        <a id={obtenerid(text + "-s-6")}
          onClick={() => succesSilla(text + "-s-6")}
        className={text + "-s-6 sillas   " + Estado(text + "-s-6")} style={Stylesilla.asientos}>
        </a>
        <div style={Stylesilla.asientos}>
        </div>
      </div>
    </div>


  )

}

export default MesaseisView;