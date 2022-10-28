import React,{useState,useEffect} from "react"
import MesacuatroView from "./Plantillas/Mesacuatro";
import MesaochoView from "./Plantillas/Mesasocho";
import MesaseisView from "./Plantillas/Mesaseis";
import MesadosView from "./Plantillas/Mesados";
import MesacerView from "./Plantillas/Mesacer";
import MesadiesView from "./Plantillas/Mesasdies";
import './mesas.css'

function MesasView({ text, status,list }) {
      
    return (
      <div>
        {(() => {
          switch (status) {
           
            case 2:
              return <MesadosView text={text} list={list} />;
            case 4:
              return <MesacuatroView text={text} list={list}/>;
            case 6:
              return <MesaseisView text={text} list={list}/>;
            case 8:
              return <MesaochoView text={text} list={list} />;
            case 10:
              return <MesadiesView text={text} list={list}/>;
            default:
              return <MesacerView text={text} list={list}/>;
          }
        })()}
      </div>
    );
  }

export default MesasView