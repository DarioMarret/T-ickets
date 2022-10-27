import React from "react";
import { Stylesilla } from "./style";
const MesaochoView =({text,list})=>{
  function Estado(e){
    var index = list.findIndex(obj => obj.silla==e);
    return list[index].estado  
  }
    return(
        <div  style={{padding: '0.7px'}}>
              <div className="d-flex ">
                <div className=" "   style={Stylesilla.asientos}>
                </div>
                
                <a className={text+"-s-1 sillas bg-success "+  Estado(text+"-s-1")}   style={Stylesilla.asientos}></a>
                
                <div className=""   style={Stylesilla.asientos}>
                </div>
                <a className={text+"-s-2 sillas bg-success "+Estado(text+"-s-2")}   style={Stylesilla.asientos}>
                </a>
              </div>
        
              <div className=" d-flex  align-items-center">
                <div className="d-flex flex-column">
                <a className={text+"-s-3 sillas bg-success "+ Estado(text+"-s-3")}  style={Stylesilla.asientos}>
                  </a>          
                 
                  <a className={text+"-s-4 sillas bg-success "+Estado(text+"-s-4")}   style={Stylesilla.asientos}>
                  </a>
                </div>
                <div className={text +"  Mesa bg-success txt-white d-flex p-1"}  style={Stylesilla.mesas}>
                {text}
                </div>
                
                <div className="d-flex flex-column">
                <a className={text+"-s-5 sillas bg-success "+ Estado(text+"-s-5")}  style={Stylesilla.asientos}>
                  </a>         
                  <a className={text+"-s-6 sillas bg-success "+Estado(text+"-s-6")}   style={Stylesilla.asientos}>
                  </a>
                </div>
              </div>
        
              <div className="d-flex ">
                <div className=" "   style={Stylesilla.asientos}>
                </div>
                <a className={text+"-s-7 sillas bg-success "+Estado(text+"-s-7")}   style={Stylesilla.asientos}>
                </a>
                <div    style={Stylesilla.asientos}>
                </div>
                <a className={text+"-s-8 sillas bg-success "+Estado(text+"-s-8")}   style={Stylesilla.asientos}>
                </a>
              </div>  
            </div> 


        )

}

export default MesaochoView;