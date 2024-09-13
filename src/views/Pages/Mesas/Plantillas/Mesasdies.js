import React from "react";
import { Stylesilla } from "./style";
const MesadiesView = ({ text, list, obtenerid, alert, succesSilla, Estado, MesaEstado, enviarsillas }) => {
 
  return (
    <div style={{ padding: '0.7px' }}>
      {alert}
      <div className="d-flex">
        <div className=" " style={{ margin: '0.1px', height: '5px', width: '15px', borderRadius: '5px' }}>
        </div>

        <a id={obtenerid(text + "-s-1")}
          data-toggle="tooltip" data-placement="top" 
          onClick={() => succesSilla(text + "-s-1")}
          className={text + "-s-1 sillas   " + Estado(text + "-s-1")} style={Stylesilla.asientos}></a>

        <a id={obtenerid(text + "-s-2")}
          data-toggle="tooltip" data-placement="top" 
          onClick={() => succesSilla(text + "-s-2")}
          className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
        </a>
        <a id={obtenerid(text + "-s-3")}
          data-toggle="tooltip" data-placement="top" 
          onClick={() => succesSilla(text + "-s-3")}
          className={text + "-s-3 sillas  " + Estado(text + "-s-3")} style={Stylesilla.asientos}>
        </a>
      </div>
      <div className=" d-flex  align-items-center">
        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-4")}
            onClick={() => succesSilla(text + "-s-4")}
            data-toggle="tooltip" data-placement="top" 
            className={text + "-s-4 sillas " + Estado(text + "-s-4")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-5")}
            data-toggle="tooltip" data-placement="top" 
            onClick={() => succesSilla(text + "-s-5")}
            className={text + "-s-5 sillas  " + Estado(text + "-s-5")} style={Stylesilla.asientos}>
          </a>
        </div>
        <div id={text} className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)}
          onClick={() => enviarsillas(text)}
          style={Stylesilla.mesas}>
          {text}
        </div>
        <div className="d-flex flex-column">
          <a id={obtenerid(text + "-s-6")}
            data-toggle="tooltip" data-placement="top" 
            onClick={() => succesSilla(text + "-s-6")}
            className={text + "-s-6 sillas  " + Estado(text + "-s-6")} style={Stylesilla.asientos}>
          </a>
          <a id={obtenerid(text + "-s-7")}
            data-toggle="tooltip" data-placement="top" 
            onClick={() => succesSilla(text + "-s-7")}
            className={text + "-s-7 sillas  " + Estado(text + "-s-7")} style={Stylesilla.asientos}>
          </a>
        </div>
      </div>

      <div className="d-flex ">
        <div className=" " style={{ margin: '0.1px', height: '5px', width: '15px', borderRadius: '5px' }}>
        </div>
        <a id={obtenerid(text + "-s-8")}
          data-toggle="tooltip" data-placement="top" 
          onClick={() => succesSilla(text + "-s-8")}
          className={text + "-s-8 sillas  " + Estado(text + "-s-8")} style={Stylesilla.asientos}>
        </a>
        <a id={obtenerid(text + "-s-9")}
          onClick={() => succesSilla(text + "-s-9")}
          data-toggle="tooltip" data-placement="top" 
          className={text + "-s-9 sillas  " + Estado(text + "-s-9")} style={Stylesilla.asientos}>
        </a>
        <a id={obtenerid(text + "-s-10")}
          onClick={() => succesSilla(text + "-s-10")}
          data-toggle="tooltip" data-placement="top" 
          className={text + "-s-10 sillas  " + Estado(text + "-s-10")} style={Stylesilla.asientos}>
        </a>
      </div>
    </div >


  )

}

export default MesadiesView;