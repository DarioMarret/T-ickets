import React from "react";
import { Stylesilla } from "./style";
const MesaiView =({text})=>{
    return(
        <div  style={{padding: '0.7px'}}>
        <div className="d-flex">
          <div   style={Stylesilla.asientos}>
          </div>
          
            <div   style={Stylesilla.asientos}></div>
          
          <div   style={Stylesilla.asientos}>
          </div>
          
        </div>
  
        <div className=" d-flex  align-items-center">
          
          <div className="bg-primary txt-white d-flex p-1"  style={Stylesilla.mesas}>
          {text}
          </div>
          
          
        </div>
  
        <div className="d-flex ">
          <div style={Stylesilla.asientos}>
          </div>
          
            <div   style={Stylesilla.asientos}></div>
          
            <div   style={Stylesilla.asientos}></div>
          
        </div>
      </div> 


        )

}

export default MesaiView;