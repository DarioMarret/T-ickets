import { Modal } from "react-bootstrap"
import Wizard from "views/Forms/Wizard/Wizard";
export default function ModalFacturacionView(props) {
    let { show, setShow } = props
    return (
        <Modal
            show={show}
            size=""
        >
            <Modal.Header>
                <button className="close" onClick={() => setShow(!show)}><i className=" fa fa-close"></i></button>
            </Modal.Header>
            <Modal.Body>
                <div>
                   {/* <Wizard />*/}
                    <form >
                        <div className="row">
                            <div className="col-12 ">
                                <div className="group">
                                    <input type="text"
                                        name="razon_social"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Rason social</label>
                                </div>
                            </div>
                            <div className="col-6 ">
                                <div className="group">
                                    <input type="number"
                                        name="Rruc"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>RUC:</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <select type="text"
                                        name="ambiente"
                                        placeholder="Ambiente"
                                        className="textbox" required >
                                        <option value="" disabled></option>
                                        <option value="1">Producion</option>
                                        <option value="2">Prueba</option>
                                    </select>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Ambiente</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <select type="text"
                                        name="tipo_emision"
                                        placeholder="Emision"
                                        className="textbox" required >
                                        <option value="" disabled></option>
                                        <option value="1">Producion</option>
                                        <option value="2">Prueba</option>
                                    </select>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Tipo Emision</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="establecimiento"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Establecimiento</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="number"
                                        name="punto_emision"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Emisión</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="tipo_comprobante"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Tipo Comproante</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="numero_secuencial"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Secuencial</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="whastapp"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>whastapp</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="correo"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Correo</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="logo"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Logo_empresa</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="group">
                                    <input type="text"
                                        name="cedula"
                                        className="textbox" required />
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Cédula</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 px-1">
                            <button className="bg-dark w-100 p-2 text-center text-white"> REGISTRAR</button>
                        </div>

                    </form>
                </div>

            </Modal.Body>
        </Modal>
    )
}