import React, { useEffect, useState } from "react"
import {Modal} from "react-bootstrap"
import TabtresView from './Componetes/Localidadopctiontres'
import TabunoViews from './Componetes/Localidad.opctionuno'
import TabdosViews from './Componetes/Localidadopctiondos'
import LocalidadesagreViews from "./Componetes/Localidadopcioncuatro"
const RegistroViwstab =(props)=>{
    const {show,setShowToast,localidaname} =props
    //console.log(localidaname)
    const [datalocalidad,SetDataloca]=useState({
        id:'',
        typo:'',
        nombre:'',
        description:'',
        array:[]
    })
    useEffect(()=>{
        SetDataloca({ 
            id:'',
            typo:'',
            nombre:'',
            description:'',
            array:[]
        })
    },[show])

    return(
        <>
        <Modal
        show={show}
        fullscreen={true}
        onHide={()=>setShowToast(false)}
        >
            <Modal.Header>
            <h5> Registro de Localidades en Espacion {localidaname.nombre}</h5> 
                <button type="button" className="close"
                        onClick={()=>setShowToast(false)}>
                        ×
                    </button>
            </Modal.Header>
            <Modal.Body>
            
          <div className='container-fluid row p-0'>
            <div className='col-12'>                     
            <ul className="nav nav-tabs">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-toggle="tab" href="#filas"
                                                        >Filas y Asientos</a>
                                                    </li>
                                                                                    
                                                    <li className="nav-item">
                                                        <a className="nav-link " data-toggle="tab" href="#mesas"                                                       
                                                         >Mesas y sillas</a>
                                                    </li>                                                
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-toggle="tab" href="#correlativos">Números Correlativos</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-toggle="tab" href="#listas"                                                        
                                                         >Localidades Agregadas</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link" data-toggle="tab" href="#"                                                        
                                                         >Diseñar Mapa</a>
                                                    </li>
                                                
               </ul>           
            </div>
            <div className="tab-content col-sm-12">
                                    <div className="tab-pane active container " id="filas">
                                    <TabunoViews localidaname={localidaname}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                     />
                                    </div>
                                    <div className="tab-pane  container " id="mesas">
                                    <TabdosViews 
                                    localidanames={localidaname}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                    />

                                    </div>
                                    <div className="tab-pane  container " id="correlativos">
                                    <TabtresView
                                    localidaname={localidaname}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                    />

                                    </div>
                                    
                                    <div className="tab-pane  container " id="listas">
                                    <LocalidadesagreViews
                                     show={show}
                                     SetDataloca={SetDataloca}
                                    localidaname={localidaname} />

                                    </div> 

         </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    )

}
export default RegistroViwstab