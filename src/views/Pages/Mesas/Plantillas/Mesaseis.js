import React from "react";
import { Stylesilla } from "./style";
const MesaseisView =({text})=>{
    return(
        <div  style={{padding: '0.7px'}}>
              <div className="d-flex ">
                <div style={Stylesilla.asientos}>
                </div>
                
                  <div style={Stylesilla.asientos}></div>
                
                  <a className={text+"-s-1 sillas bg-success "}   style={Stylesilla.asientos}>
                </a>
                <div   style={Stylesilla.asientos}>
                </div>
              </div>
        
              <div className=" d-flex  align-items-center">
                <div className="d-flex flex-column">
                <a className={text+"-s-2 sillas bg-success "}  style={Stylesilla.asientos}>
                  </a>          
                 
                  <a className={text+"-s-3 sillas bg-success "}   style={Stylesilla.asientos}>
                  </a>
                </div>
                <div className={text +" Mesa bg-success d-flex  p-1" } style={Stylesilla.mesas}>
                {text}
                </div>
                
                <div className="d-flex flex-column">
                <a className={text+"-s-4 sillas bg-success "}   style={Stylesilla.asientos}>
                  </a>         
                  <a className={text+"-s-5 sillas bg-success "}   style={Stylesilla.asientos}>
                  </a>
                </div>
              </div>
        
              <div className="d-flex ">
          <div   style={Stylesilla.asientos}>
          </div>
          
            <div style={Stylesilla.asientos}></div>
          
            <a className={text+"-s-5 sillas bg-success "}  style={Stylesilla.asientos}>
          </a>
          <div style={Stylesilla.asientos}>
          </div>
        </div>
            </div> 


        )

}

export default MesaseisView;