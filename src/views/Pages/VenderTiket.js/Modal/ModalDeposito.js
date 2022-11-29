import React, { useEffect, useState } from 'react';
import { Modal, Container } from 'react-bootstrap';
import { Salircliente } from 'utils/constantes';
import { Metodos } from 'utils/constantes';
//import metodo from "../../../../assets/"
import metodos from "../../../../assets/Banco_Internacional_Ecuador.png";
import { ReportarDepositoCompra, EnviarmensajeWhastapp } from 'utils/Query';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
const Reporte = (props) => {
    const { repShop,
        setrepShow, intervalo, handlereportColse, pararcontador
    } = props
    const usedispatch = useDispatch()
    const [codigo, setCodigo] = useState("")
    const [alert, setAlert] = useState(null)
    function handelchange(e) {
        setCodigo(e.target.value)
    }
    async function reportarComprobante() {
        if (codigo.length > 4) {
            try {
                const info = await ReportarDepositoCompra(codigo)
                const mensajes = await EnviarmensajeWhastapp(codigo)
                //const { msg } = info
                console.log(info)
                if (msg != null) {
                    Salircliente()
                    usedispatch(setToastes({
                        show: true, message: 'En breve uno de nuestros colaboradores se comunicar con usted',
                        color: 'bg-success', estado: 'Se ha Guardado exitosamente su reporte',
                    }))
                    setrepShow(false)
                    pararcontador()
                } else {
                    usedispatch(setToastes({
                        show: true,
                        message: 'Verifique que el numero de transaccion ',
                        color: 'bg-danger',
                        estado: 'Hubo un error',
                    }))
                }
            } catch (error) {
                console.log(error)

                usedispatch(setToastes({
                    show: true,
                    message: 'Compruebe su conexión e intente mas tarde',
                    color: 'bg-danger',
                    estado: 'Hubo un erro ',
                }))
            }

        } else {
            usedispatch(setToastes({
                show: true,
                message: 'La longitud del código debe ser mayor a 4 dígitos',
                color: 'bg-danger',
                estado: 'Formato',
            }))


        }
    }
    function borrar() {
        setrepShow(false)
        setAlert(null)
    }
    const hideAlert = () => {
        setAlert(null)
    }
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Esta seguro de cancelar la venta"
                onConfirm={() => borrar()}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Si, Borrar"
                cancelBtnText="Cancelar"
                showCancel

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                Desea borrar los datos y continuar

            </SweetAlert>

        )
    }


    return (
        <>
            {alert}
            <Modal
                show={repShop}
                size="lg"
            >
                <Modal.Header  >
                    <h6>{intervalo} </h6>
                    <button type="button" className="close"
                        onClick={succesAlert}
                    >
                        ×
                    </button>

                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="container ">
                            <div className='d-flex col-12 justify-content-end align-items-center' >

                                <div><button className='btn btn-primary' onClick={succesAlert} >  <i className="bi bi-caret-left-fill"></i>  Regresar</button></div>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center align-items-center" >
                                <div className='d-flex flex-column text-center justify-content-center align-items-center'>
                                    <h3 className="modal-title pb-3 ">PARA DEPOSITO O TRANSFERENCIA</h3>
                                    <img src={metodos} className="img-fluid" style={{ width: '300px' }} alt="" />
                                    <h3>Numero de Cuenta</h3>
                                    <h3> <strong>1500618760</strong> </h3>
                                </div>



                                <div className="d-flex flex-wrap">
                                    <div className="col-12 col-sm-6 d-flex flex-column p-3">
                                        <select className="form-control " name="banco" defaultValue={"Banco Internacional"} aria-label="Selecione el Banco">
                                            <option value="Banco Internacional"> Banco Internacional</option>
                                        </select>
                                        <label >Numero de Control</label>
                                        <input className="form-control" type="text" name="control"
                                            value={codigo ? codigo : ''}
                                            onChange={(e) => handelchange(e)}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6 d-flex flex-column p-3 align-items-end" >
                                        <h5 >LUEGO DE REALIZAR LA TRANSACCIÓN
                                            POR FAVOR REPORTAR EL PAGO
                                        </h5>

                                        <button className="btn btn-danger col-6 float-end"
                                            onClick={reportarComprobante}
                                        >
                                            Reportar Pago
                                        </button>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </Container>

                </Modal.Body>
            </Modal>
        </>)

}
export default Reporte