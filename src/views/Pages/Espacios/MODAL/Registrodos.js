import React from "react"
import {Modal} from "react-bootstrap"
import TabtresView from './Componetes/Localidadopctiontres'
import TabunoViews from './Componetes/Localidad.opctionuno'
import TabdosViews from './Componetes/Localidadopctiondos'
const RegistroViwstab =(props)=>{
    const {show,setShowToast} =props

    return(
        <>
        <Modal
        show={show}
        fullscreen={true}
        onHide={()=>setShowToast(false)}
        >
            <Modal.Header>
                Registro de Localidades
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
                                                        <a className="nav-link" data-toggle="tab" href="#correlativos"                                                        
                                                         >Localidades Agregadas</a>
                                                    </li>
                                                
               </ul>           
            </div>
            <div className="tab-content col-sm-12">
                                    <div className="tab-pane active container " id="filas">
                                    <TabunoViews/>
                                    </div>
                                    <div className="tab-pane  container " id="mesas">
                                    <TabdosViews/>

                                    </div>
                                    <div className="tab-pane  container " id="correlativos">
                                    <TabtresView/>

                                    </div>

         </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    )

}
export default RegistroViwstab