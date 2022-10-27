import React,{useState,useEffect} from "react"
import MesacuatroView from "./Plantillas/Mesacuatro";
import MesaochoView from "./Plantillas/Mesasocho";
import MesaseisView from "./Plantillas/Mesaseis";
import MesadosView from "./Plantillas/Mesados";
import MesacerView from "./Plantillas/Mesacer";
import MesadiesView from "./Plantillas/Mesasdies";


function MesasView({ text, status,list }) {
      
    return (
      <div>
        {(() => {
          switch (status) {
           
            case 2:
              return <MesadosView text={text} list={list} />;
            case 4:
              return <MesacuatroView text={text} />;
            case 6:
              return <MesaseisView text={text} />;
            case 8:
              return <MesaochoView text={text} list={list} />;
            case 10:
              return <MesadiesView text={text} />;
            default:
              return <MesacerView text={text}/>;
          }
        })()}
      </div>
    );
  }

export default MesasView