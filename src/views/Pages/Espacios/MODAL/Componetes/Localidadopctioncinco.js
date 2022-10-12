import React, { useEffect } from "react"
import EcenarioDefView from "views/Components/MapaEcenarios/Ecenariodefalt"
import EcenarioEstaView from "views/Components/MapaEcenarios/Ecenarioestandar"
import EcenarioEstandar from "views/Components/MapaEcenarios/EcenariomesaEstandar"
import EcenarioGradoView from "views/Components/MapaEcenarios/Ecenariogrados"
import MiniEcenariosView from "views/Components/MapaEcenarios/MiniEcenarios"
const MapadelocalidadViews=(props)=>{
    const {localidaname}=props


useEffect(()=>{
console.log("localidades",localidaname)
},[])

    return(
        <>
        <div className="d-flex flex-wrap">
            <div className="d-flex flex-column px-1 align-items-center col-12 col-sm-4 " style={{height:'800px',width:'100%',overflowY:'auto'}}>
                
               
                <MiniEcenariosView/>
                <hr></hr>
             
               
               
            </div>
            <div className="col-12 col-sm-8 d-flex  justify-content-center align-items-center bg-primary"> 
            <EcenarioEstandar/>             
            </div>
        </div>
        </>
    )

}
export default MapadelocalidadViews