import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { EstadosCosolidados } from "utils/pagos/Queripagos";

export default function ConsolidaRegistr() {
    let modal = useState(state => state.SuscritorSlice.modal)
    const [first, setfirst] = useState([])
    useEffect(() => {
        EstadosCosolidados().then(ouput => {
            console.log(ouput)
            setfirst(ouput)
        }).catch(error => {
            console.log(error)
        })
    }, [modal.nombre == "ConsolidaRegistr" ? true : false])

    return (
        <>
            <Modal
                show={modal.nombre == "ConsolidaRegistr" ? true : false}
            >
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    <div className=" container">
                        <div className="col-md-12">
                            <label  className="form-label">Comprobante Lote</label>
                            <input type="text" className="form-control" id="comprobante" value="" required />

                        </div>
                        <div className="col-md-12">
                            <label for="validationCustom02" className="form-label">Estado</label>

                        </div>


                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}