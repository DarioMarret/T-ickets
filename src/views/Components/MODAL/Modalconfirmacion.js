import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { Form } from "react-bootstrap";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GetMetodo } from "utils/CarritoLocalStorang";
import { GetValores } from "utils/CarritoLocalStorang";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
const ModalConfima = (prop) => {
    const { setrepShow, pararcontador } = prop
    let usedispatch = useDispatch()

    let modal = useSelector((state) => state.SuscritorSlice.modal)
    function cerrar() {
        usedispatch(setModal({ nombre: 'ModalDetalle', estado: '' }))
        // setrepShow(true)
    }
    function confirmar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
        pararcontador()
        usedispatch(setToastes({ show: true, message: 'Datos del deposito Guardado ', color: 'bg-success', estado: 'Se guardo el numero de control' }))

    }


    return (
        <>
            <Modal
                show={modal.nombre == "confirmar2" ? true : false}
            >
                <Modal.Header className=" d-flex  rounded-top-4 m-0  bg-secondary  justify-content-between align-items-center">
                    <div className="d-flex  container   justify-content-center text-center" >
                        <h3 className=" p-2 ">
                            Confirmación de Pago
                        </h3>

                    </div>
                    <div className=" float-left " style={{ marginTop: '-45px' }}>
                        <button type="button" className="text-light" onClick={cerrar}>
                            ×
                        </button>
                    </div>

                </Modal.Header>
                <Modal.Body>
                    <div className="container d-flex flex-column">
                        <div className=" p-1">
                            <h5 style={{ fontSize: "1.0em" }}>
                                Selecione el banco al que realizó la transferencia
                            </h5>
                            <Form.Select className=" form-control">
                                <option disabled selected></option>
                                <option>Banco Pichincha</option>
                                <option>Banco Guayaquil</option>
                            </Form.Select>
                        </div>
                        <div className=" p-1">
                            <h5 style={{ fontSize: '1.0em' }}>
                                Ingrese el número de comprobante de la transferencia
                            </h5>
                            <input className=" form-control numero"
                                type={"text"}
                            />
                        </div>
                        <div className="p-1" >
                            <h5 style={{ fontSize: '1.0em' }}>
                                Adjuntar Comprobante ( imagen jpg ó png)
                            </h5>
                            <input type="file" accept="image/*" className="form-control" />
                        </div>
                        <div className=" p-1 ">
                            {modal.nombre == "confirmar" ? <span>
                                Una vez confirmado el deposito su ticket sera enviado  {
                                    GetValores().envio == "correo" ? "al: correo" + getDatosUsuariosLocalStorag().email : "al: Whatsapp " + getDatosUsuariosLocalStorag().whatsapp
                                }
                            </span> : ''}

                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex container justify-content-center ">
                        <div>
                            <button className=" btn p-2 btn-success" onClick={confirmar}>Confirmar Transferencia</button>
                        </div>

                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfima;