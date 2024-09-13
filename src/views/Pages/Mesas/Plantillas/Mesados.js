import { Stylesilla } from "./style";
const MesadosView = ({ text, list, obtenerid, alert, succesSilla, Estado, MesaEstado, enviarsillas }) => {
  
  return (
    <div style={{ padding: '0.7px' }}>
      {alert}
      <div className="d-flex ">
        <div className=" " style={Stylesilla.asientos}>
        </div>
        <div style={Stylesilla.asientos}></div>
        <a id={obtenerid(text + "-s-1")}
          onClick={() => succesSilla(text + "-s-1")}
          className={text + "-s-1 sillas  " + Estado(text + "-s-1")} style={Stylesilla.asientos}>
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
        <div id={text} className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)}
          onClick={() => enviarsillas(text)}
          style={Stylesilla.mesas}>
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
        <a id={obtenerid(text + "-s-2")}
          onClick={() => succesSilla(text + "-s-2")}
          className={text + "-s-2 sillas  " + Estado(text + "-s-2")} style={Stylesilla.asientos}>
        </a>
        <div style={Stylesilla.asientos}>
        </div>
      </div>
    </div>

  )

}

export default MesadosView;