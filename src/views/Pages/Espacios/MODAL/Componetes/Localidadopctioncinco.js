import React, { useEffect,useState } from "react"
import EcenarioDefView from "views/Components/MapaEcenarios/Ecenariodefalt"
import EcenarioEstaView from "views/Components/MapaEcenarios/Ecenarioestandar"
import EcenarioEstandar from "views/Components/MapaEcenarios/EcenariomesaEstandar"
import EcenarioGradoView from "views/Components/MapaEcenarios/Ecenariogrados"
import MiniEcenariosView from "views/Components/MapaEcenarios/MiniEcenarios"
import Ecenariouno from "../../../../../assets/Ecenarios/ecenariouno.JPG"
import Ecenariodos from "../../../../../assets/Ecenarios/ecenariodos.JPG"
import Ecenariotres from "../../../../../assets/Ecenarios/ecenariotres.JPG"
import Ecenariocuatro from "../../../../../assets/Ecenarios/ecenariocuatro.JPG"
const MapadelocalidadViews=(props)=>{
    const {localidaname}=props
    const [estadio,SetSelecion]=useState("")

useEffect(()=>{
//console.log("localidades",localidaname)
},[])

    return(
        <>
        <div className="d-flex flex-wrap">
            <div className="d-flex flex-column px-1 align-items-center col-12 col-sm-4 " style={{height:'800px',width:'100%',overflowY:'auto'}}>
                <h4>Ecenarios</h4>
            <div onClick={()=>SetSelecion("defecto")} className=" d-flex mt-1 justify-content-center align-items-center" style={{height: '360px', width: '300px'}}>
             
             <div className="d-flex ">
                 <img className="img-fluid" src={Ecenariouno} style={{height:'auto',width:'auto'}}></img>
             </div>
                </div>
                <hr></hr>
                <div onClick={()=>SetSelecion("simple")} className=" d-flex mt-1 justify-content-center align-items-center" style={{height: '360px', width: '300px'}}>
             
             <div className="d-flex ">
                 <img className="img-fluid" src={Ecenariodos} style={{height:'auto',width:'auto'}}></img>
             </div>
                </div>
                <hr></hr>
                <div onClick={()=>SetSelecion("grado")} className=" d-flex mt-1 justify-content-center align-items-center" style={{height: '360px', width: '300px'}}>
             
             <div className="d-flex ">
                 <img className="img-fluid" src={Ecenariotres} style={{height:'auto',width:'auto'}}></img>
             </div>
                </div>
                <hr></hr>
                <div onClick={()=>SetSelecion("estandar")} className=" d-flex mt-1 justify-content-center align-items-center" style={{height: '360px', width: '300px'}}>
             
             <div className="d-flex ">
                 <img className="img-fluid" src={Ecenariocuatro} style={{height:'auto',width:'auto'}}></img>
             </div>
                </div>
                <hr></hr>
             
               
               
            </div>
            <div className="container-fluid col-12 col-sm-8 d-flex  justify-content-center align-items-center bg-success"style={{height:'auto',width:'100%',overflowX:'auto'}}> 
            {estadio=="estandar"?<EcenarioEstandar localidaname={localidaname}/>:''}
            {estadio=="defecto"?<EcenarioDefView localidaname={localidaname}/>:''} 
            {estadio=="simple"?<EcenarioEstaView localidaname={localidaname}/>:''} 
            {estadio=="grado"?<EcenarioGradoView localidaname={localidaname}/>:''}                      
            </div>
        </div>
        </>
    )

}
export default MapadelocalidadViews