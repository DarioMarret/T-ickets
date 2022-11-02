import React from "react";
import { Stylesilla } from "./style";
import { useSelector } from "react-redux";
const MesacuatroView =({text,list})=>{
let nombre = JSON.parse( localStorage.getItem("seleccionmapa"))
   const seleccion= useSelector((state)=>state.sillasSlice.sillasSelecionadas.filter((e)=>e.localidad==nombre.localodad))
     let silla = seleccion
     function checkAvailability(arr, val) {
    return arr.some(function(arrVal) {
        return val === arrVal.silla;
    });
}  
  function Estado(e){  
    if(silla.length>0){
      var index = list.findIndex(obj => obj.silla==e);
    return  checkAvailability(seleccion,e)? silla[silla.findIndex(obj => obj.silla==e)].estado:list[index].estado 
  }
    var index = list.findIndex(obj => obj.silla==e);
    return  list[index].estado  
  }
    return(
        <div className=""  style={{padding: '0.7px'}}>
              <div className="d-flex">
                <div style={Stylesilla.asientos}>
                </div>
                
                <div style={Stylesilla.asientos}>
                </div>
                <div style={Stylesilla.asientos}>
                </div>
                <div style={Stylesilla.asientos}>
                </div>
              </div>
        
              <div className=" d-flex  align-items-center">
                <div className="d-flex flex-column align-items-center">
                  <a className={text+"-s-1 sillas  " + Estado(text+"-s-1")}  style={Stylesilla.asientos}>
                  </a>          
                 
                  <a className={text+"-s-2 sillas  " + Estado(text+"-s-2")}  style={Stylesilla.asientos}>
                  </a>
                </div>
                <div className={text +"  Mesa  txt-white d-flex p-1"} style={Stylesilla.mesas}>
                {text}
                </div>
                
                <div className="d-flex flex-column align-items-center">
                  <a className={text+"-s-3 sillas  " + Estado(text+"-s-3")}  style={Stylesilla.asientos}>
                  </a>         
                  <a className={text+"-s-4 sillas  " + Estado(text+"-s-4")} style={Stylesilla.asientos}>
                  </a>
                </div>
              </div>
        
              <div className="d-flex  ">
                <div  style={Stylesilla.asientos}>
                </div>
                <div   style={Stylesilla.asientos}>
                </div>
                <div  style={Stylesilla.asientos}>
                </div>
                <div  style={Stylesilla.asientos}>
                </div>
              </div>  
            </div> 
        )
       

}

export default MesacuatroView;