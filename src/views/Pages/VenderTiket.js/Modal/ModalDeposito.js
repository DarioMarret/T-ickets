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
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
const Reporte = (props) => {
    const { repShop, handlereportColse,
        setDatoToas, setrepShow, detener, intervalo,
    } = props
    let usedispatch = useDispatch()
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
                const { msg } = info
                console.log(info)
                if (msg != null) {
                    Salircliente()
                    usedispatch(setToastes({
                        show: true,
                        message: 'En breve uno de nuestros colaboradores se comunicar con usted',
                        color: 'bg-success',
                        estado: 'Se ha Guardado exitosamente su reporte',
                    }))
                    setrepShow(false)
                } else {
                    usedispatch(setToastes({
                        show: true,
                        message: 'Hubo un error',
                        color: 'bg-danger',
                        estado: '',
                    }))
                }
                //console.log(mensajes)
            } catch (error) {
                console.log(error)
            }

        } else {
            usedispatch(setToastes({
                show: true,
                message: 'La longitud del código debe ser mayor a 4 dígitos',
                color: 'bg-danger',
                estado: 'Formato ',
            }))

        }
    }
    const cerrar = () => {
        setrepShow(false)
        detener()
        hideAlert()
    }
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title={"Esta seguro de querer salir  "}
                onConfirm={() => hideAlert()}
                onCancel={() => cerrar()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Completar  Compra"
                cancelBtnText="Anular Compra"
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                Se borraran todos los datos Seleccionados
            </SweetAlert>
        )
    }
    const hideAlert = () => {
        setAlert(null)
    }
    function Confirmar() {
        usedispatch(setModal({ nombre: 'confirmar', estado: '' }))
        setrepShow(false)
    }

    return (
        <>
            {alert}
            <Modal
                show={repShop}
                onHide={succesAlert}
            >
                <Modal.Header  >
                    <div className='d-flex col-12 justify-content-between align-items-center' >
                        <h5 className="modal-title text-center justify-content-center" style={{ fontFamily: 'fantasy', fontSize: '1.2em' }}><span className="text-danger" > </span></h5>
                        <div><button className='btn btn-primary' onClick={handlereportColse} style={{ fontSize: '0.7em' }} >  <i className="bi bi-caret-left-fill"></i>  Regresar</button></div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid px-0">

                        <div className="d-flex flex-wrap px-0 justify-content-center align-items-center" >
                            <div className='d-flex px-0'>

                                <h5 className="modal-title pb-3 px-0 text-center " style={{ fontSize: '0.7em' }}>Para completar la compra, deberá transferir el valor total  a nombre de:
                                    <strong>TICKETSECUADOR S.A.</strong>   RUC No. <strong>0993377293001</strong>, a una de las siguientes cuentas:</h5>

                            </div>
                            <div className='d-fex border rounded-5' style={{ width: '90%' }}>
                                <div className='d-flex flex-column  '>
                                    <div className='  m-2'>
                                        <h4 style={{ fontSize: '0.7em' }}> CUENTA CORRIENTE BANCO DE GUAYAQUIL: 248875 </h4>
                                    </div>

                                    <div className='m-2' >
                                        <h4 style={{ fontSize: '0.7em' }}> CUENTA CORRIENTE BANCO PICHINCHA: 248875 </h4>
                                    </div>
                                    <div className='m-2'>
                                        <h4 style={{ fontSize: '0.7em' }}>
                                            CUENTA CORRIENTE BANCO PRODUBANCO: 248875
                                        </h4>

                                    </div>
                                </div>

                            </div>
                            <div className=' container d-flex   px-0 mx-0 justify-content-between ' style={{ width: '90%' }}>
                                <div className=''>
                                    <button className='btn btn-success m-2 ' style={{ fontSize: '0.7em' }} onClick={Confirmar} > CONFRIMAR DEPOSITO </button>

                                </div>
                                <div>
                                    <button className='btn  btn-danger m-2' style={{ fontSize: '0.7em' }} onClick={succesAlert}> CANCELAR COMPRA </button>
                                </div>
                            </div>
                        </div>

                    </div>



                </Modal.Body>

            </Modal>
        </>)

}
export default Reporte