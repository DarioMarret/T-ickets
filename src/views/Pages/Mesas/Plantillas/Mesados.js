import React from "react";
import { Stylesilla } from "./style";
const MesadosView =({text,list})=>{
  function Estado(e){
    var index = list.findIndex(obj => obj.silla==e);
    return list[index].estado  
  }
  function EstadoMEsa(val){
    //var index = Object.values(list.estado)
  }
    return(
        <div  style={{padding: '0.7px'}}>
        <div className="d-flex ">
          <div className=" "   style={Stylesilla.asientos}>
          </div>
          
            <div    style={Stylesilla.asientos}></div>
          
            <a className={text+"-s-1 sillas  " + Estado(text+"-s-1")}   style={Stylesilla.asientos}>
          </a>
          <div   style={Stylesilla.asientos}>
          </div>
        </div>
  
        <div className=" d-flex  align-items-center">
          <div className="d-flex flex-column">
            <div  style={Stylesilla.asientos}>
            </div>          
           
            <div  style={Stylesilla.asientos}>
            </div>   
          </div>
          <div className={text +"  Mesa  txt-white d-flex p-1"}   style={Stylesilla.mesas}>
          {text}
          </div>
          
          <div className="d-flex flex-column">
          <div  style={Stylesilla.asientos}>
            </div>           
            <div  style={Stylesilla.asientos}>
            </div>   
          </div>
        </div>
  
        <div className="d-flex ">
          <div className=" "   style={Stylesilla.asientos}>
          </div>
          
            <div    style={Stylesilla.asientos}></div>
          
          <a className={text+"-s-2 sillas  " + Estado(text+"-s-2")}   style={Stylesilla.asientos}>
          </a>
          <div   style={Stylesilla.asientos}>
          </div>
        </div>
      </div> 


        )

}

export default MesadosView;