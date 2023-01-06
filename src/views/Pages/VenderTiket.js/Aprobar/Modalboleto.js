import moment from "moment"
import { useState } from "react"
import { Modal } from "react-bootstrap"
import { useDispatch,useSelector } from "react-redux"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"
import SweetAlert from "react-bootstrap-sweetalert"
import { bancos } from "utils/Imgenesutils"
let { atencion } = bancos
export default function ModalBoletoApro() {
let usedispatch = useDispatch()
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    const[alert,setAlert] = useState(null)
    const [datos,setDatos]= useState({
        cedula:"",
        codigoEvento:"",
        estado:"",
        fechaCreacion:"",
        localidad:"",
        sillas:"",
        tokenPago:"",
        uid:"",
        valor:""
    })
    function salir(){
        usedispatch(setModal({ nombre: "", estado :""}))
    }
    function onChange(){

    }
    const succesLimit = () => {
        setAlert(
            <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}
                title=""
                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                <div>
                    <div className='col-12 pb-3'>
                        <img src={atencion} className="img-fluid"
                            style={{
                                height: 100
                            }}
                        ></img>
                    </div>
                    <h5>Deseas reportar este Boleto</h5>
                  <div className="text-center"> 
                       #{modal.estado.sillas}
                  </div>
                    <div className='d-flex  justify-content-around py-4 px-2'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => hideAlert()}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>Cancelar</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => hideAlert()} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Si, Continuar</span>
                            </button>
                        </div>

                    </div>
                </div>
            </SweetAlert>
        )
    }
    const hideAlert = ()=>setAlert(null)
    return (
        <>
        {alert}
        <Modal
        show={modal.nombre=="boleto"?true:false}
        size="lg"
        >
            <Modal.Header className="py-3">
                <h5>
                    Aprobar Boletos 
                </h5>

                <button className="close" onClick={salir}> X</button>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">

                        <div className="row g-3 needs-validation" >
                            <div className="col-md-6">
                                <label className="form-label">Cédula</label>
                                <input type="text" className="form-control" id="validationCustom01"
                                value={ modal.estado.cedula}
                                    onChange={() => onChange()}
                                required/>
                                    <div className="valid-feedback">
                                    </div>
                            </div>                            
                            <div className="col-md-6">
                                <label className="form-label">Fecha de seleccion</label>
                                <input className="form-control" type="text" 
                                    value={modal.estado.fechaCreacion.split(" ")[0]}
                                    onChange={() => onChange()}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Boleto</label>
                                <input className="form-control" name="sillas"
                                    value={modal.estado.sillas}
                                    onChange={() => onChange()}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className=" form-label"> Localidad </label>
                                <input className=" form-control"  
                                    value={modal.estado.localidad}
                                    onChange={() => onChange()}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">
                                    Valor
                                </label>
                                <input className=" form-control"
                                    value={modal.estado.valor}
                                    onChange={() => onChange()}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label"> Estado</label>
                                <input className=" form-control" type="text "
                                    value={modal.estado.estado}
                                    onChange={() => onChange()}
                                ></input>
                            </div>
                            <div className="col-12 text-center">
                                <button className="btn btn-success" onClick={succesLimit} >
                                    Aprobar Boleto
                                </button>
                            </div>
                            </div>

                </div>

            </Modal.Body>
        </Modal>
        </>
    )
}