import { useState } from "react"
import "./index.css"
import ModalFacturacionView from "./Modalfactura"
export default function FacturaView() {
    let [show,setShow]=useState(false)
    return (
        <div className=" container-fluid">
            <div className='col-12 mx-auto' aria-controls="example-collapse-text">
                <div className="cardt cardt-dark boxshadow  ">
                    <div className="pt-2">
                        <div className='row '>
                            <div className=' col-8 my-auto '>
                                <h5 className="card-title">RUC: 098506604646465</h5>
                                <p className="card-text pr-2 pt-2">City Oficce 310 </p>
                                <p className="card-text pr-2 pt-2">contabilidad </p>        
                            </div>
                            <div className='col-3  mx-auto '>
                                <div className='   float-end  ms-3 mb-1 rounded-3 shadow' style={{
                                    width: "78px",
                                    height: "78px",
                                    zIndex: 2
                                }}>
                                    <img src="https://api.t-ickets.com/store/img/tckets-texto-azul.png" className="p-2 img-fluid" />
                                </div>
                            </div>
                        </div>
                        
                        <div className=" row m-auto  h-100 ">                            
                            <div className="card-body px-0 col-12 col-md-6">
                                <h5 className="card-title">Razón social : tickets.com</h5>
                                <div className="d-flex flex-wrap px-0">
                                    <p className="card-text pr-2 pt-2">Tipo Comprobante: 12</p>
                                    <p className="card-text pr-2 pt-2">matriz : 0001</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p className="card-text pr-2 pt-2">Punto de emision: </p>
                                    <p className="card-text pr-2 pt-2">numero secuencial : 0001</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p className="card-text pr-2 pt-2 text-white">. </p>                                   
                                </div>                              
                                <p className="card-text"><small className="text-muted">Entidad certificante</small></p>
                            </div>
                            <div className="card-body px-0 col-6 d-md-flex flex-column align-items-end">
                                <h5 className="card-title">Corre : tickets@g,ail.com</h5>
                                <div className="d-flex flex-wrap px-0">
                                    <p className="card-text pr-2 pt-2">Tipo de emision: 1</p>
                                    <p className="card-text pr-2 pt-2">whatsapp : 09875454545</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p className="card-text pr-2 pt-2">Ambiente: 1</p>
                                    <p className="card-text pr-2 pt-2">clave: 0001</p>
                                    <p className="card-text pr-2 pt-2">firma: 0001</p>
                                </div>
                                <div className="d-flex flex-wrap px-0">
                                    <p className="card-text pr-2 pt-2">Tarifa: </p>
                                    <p className="card-text pr-2 pt-2">Tarifa: </p>

                                </div>

                                <p className="card-text"><small className="text-muted">fechaemision:  fecha_vencimiento :</small></p>

                            </div>

                        </div>
                        <div className=" float-end">
                            <button className=" btn btn-primary" onClick={()=> setShow(!show)} ><i className=" fa fa-edit"></i></button>
                        </div>
                    </div>
                </div>

            </div>

            <ModalFacturacionView
            show={show}
            setShow={setShow}
            />

        </div>
    )
}