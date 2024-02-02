import { Modal } from "react-bootstrap"

const CuentaId = (props) => {
    let { show, cuentaId, nombre, numero } = props
    return (
        <div>
            <Modal show={show}>
                <Modal.Body>
                    <h3>{nombre}</h3>
                    <p>Número de cuenta: {numero}</p>
                    <div className="group">
                        <label className=" form-label"></label>
                        <input type="text" id="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            name="" />
                    </div>
                    <div>
                        <button className="btn btn-primary">Cargar</button>
                    </div>
                </Modal.Body>


            </Modal>

        </div>
    )
}
export default CuentaId