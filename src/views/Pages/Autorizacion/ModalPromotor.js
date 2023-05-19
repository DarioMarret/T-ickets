import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CrearPromotor } from "utils/PromotorQuerys";

export default function ModalPromotor({...props}) {
    let usedispatch = useDispatch()
    let [campos, setCampso] = useState({
        "promotor": "",
        "responsable": "",
        "web": "",
        "ruc": "",
        "email": "",
        "descripcion": "",
        "direccion": ""
    })

    function handelChange(e) {
        setCampso({
            ...campos,
            [e.name]: e.value
        })
    }
    function handleSubmit(e) {
        //e.preventdefault()
        if (!Object.values(campos).every(e => e)) return
        CrearPromotor(campos).then(outpot => {
            if (outpot.success) {
                props.setShow(false)
                usedispatch(setModal({nombre:"",estado:""}))
                usedispatch(setToastes({}))
                
            }
            if (!outpot.success && ouput.error != "jwt expired") {

            }
            if (!outpot.success && ouput.error == "jwt expired") {
                removeDatosUsuario()
                history.push("/")
            }
        }).catch(err => {
            console.log(err)
        })
        console.log(campos)
    }



    return (
        <Modal
            show={props.show}>
            <Modal.Header className="py-3">
                <button className="close" onClick={() => props.setShow(false)}>x</button>
            </Modal.Header>
            <Modal.Body>
                <div className="row ">
                    <div className=" ">
                        <h5>Datos del Promotor</h5>

                    </div>
                    <div className="col-12 card-body d-flex flex-row" >
                        <div className="">
                            <div className="row ">

                                <div className="col-12 col-md-6">
                                    <label className="form-label">Promotor </label>
                                    <input type="text" className="form-control" id="promotor" name="promotor" required
                                        value={campos.promotor}
                                        onChange={(e) => handelChange(e.target)}
                                    />

                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label">Responsable</label>
                                    <input type="text" className="form-control" id="responsable" name="responsable" required
                                        onChange={(e) => handelChange(e.target)}
                                        value={campos.responsable}
                                    />

                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label">Dirección Web</label>
                                    <input type="text" className="form-control" id="web" name="web" required
                                        onChange={(e) => handelChange(e.target)}
                                        value={campos.web}
                                    />

                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label">Ruc</label>
                                    <input type="text" className="form-control" id="ruc" name="ruc" required
                                        onChange={(e) => handelChange(e.target)}
                                        value={campos.ruc}
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Correo</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="email">@</span>
                                        <input type="text" className="form-control" id="email" name="email" required
                                            onChange={(e) => handelChange(e.target)}
                                            value={campos.email}
                                        />
                                        <div className="invalid-feedback">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label">Descripciónn</label>
                                    <input type="text" className="form-control" id="descripcion" name="descripcion" required
                                        onChange={(e) => handelChange(e.target)}
                                        value={campos.descripcion}
                                    />

                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Dirección</label>
                                    <input type="text" className="form-control" id="direccion" name="direccion" required
                                        onChange={(e) => handelChange(e.target)}
                                        value={campos.direccion}
                                    />
                                    <div className="invalid-feedback">

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">teléfono</label>
                                    <input className=" form-control" />

                                </div>

                                <div className="col-12 py-3 d-flex  justify-content-end ">
                                    <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Guardar </button>
                                </div>


                            </div>
                        </div>



                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
}
