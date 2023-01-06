import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
export default function EmitirmodlView() {
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let usedispatch = useDispatch()
    function salir() {
        usedispatch(setModal({ nombre: "", estado: "" }))
    }
    //console.log(modal)
    function onChange() {

    }

    return (
        <>
            <Modal
                show={modal.nombre === "Emitir" ? true : false}
            >
                <Modal.Header className="py-3">
                    Emitir
                    <button className=" close" onClick={salir} > X </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid row px-0">
                        <div className="col-md-6">
                            <label className="form-label">Cédula</label>
                            <input type="text" className="form-control" id="validationCustom01"
                                value={modal.estado.cedula}
                                onChange={() => onChange()}
                                required />
                        </div>
                        <div className="col-md-6">
                            <label className=" form-label"> Boleto </label>
                            <input className=" form-control " value={modal.estado.sillas}
                                onChange={() => onChange()} />
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
                        <div className="col-md-6">
                            <label className="form-label"> Fecha selección</label>
                            <input className=" form-control" type="text "
                                value={modal.estado.fechaCreacion.split(" ")[0]}
                                onChange={() => onChange()}
                            ></input>
                        </div>
                        <div className="col-12 py-3 text-end">
                            <button className="btn btn-outline-success ">Emitir Boleto</button>

                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}