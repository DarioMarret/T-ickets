import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { Salircliente } from 'utils/constantes';
import { getVerTienda, GetValores, GetMetodo } from 'utils/CarritoLocalStorang';
import { ReportarEfectivoCompra, EnviarmensajeWhastapp } from 'utils/Query';
import { LimpiarLocalStore, Limpiarseleccion } from 'utils/CarritoLocalStorang';
import { clearMapa } from 'StoreRedux/Slice/mapaLocalSlice';
import { borrarseleccion } from 'StoreRedux/Slice/sillasSlice';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import SweetAlert from 'react-bootstrap-sweetalert';
import jsPDF from 'jspdf';
import moment from 'moment';
import { clienteInfo } from 'utils/DatosUsuarioLocalStorag';
import { getDatosUsuariosLocalStorag } from 'utils/DatosUsuarioLocalStorag';
import { Pagofisico } from 'utils/Querycomnet';
import { useHistory } from 'react-router';
import { PagoRapido } from 'utils/Querycomnet';

const ModalEfectivo = () => {

    let user = clienteInfo()
    let history = useHistory()
    let usedispatch = useDispatch()
    const [suelto, SetSuelto] = useState(0)
    const [spiner,setSpiner]= useState(false)
    const modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [alert, setAlert] = useState(null)

    function borrar() {
        Limpiarseleccion()
        LimpiarLocalStore()
        usedispatch(setModal({ nombre: "", estado: "" }))
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        // sessionStorage.removeItem("Eventolocalidad")
        // sessionStorage.removeItem("DatoCliente")
        // sessionStorage.removeItem("DatosUsuarioLocalStorang")
        hideAlert()
    }
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Esta seguro de cancelar la venta"
                closeOnClickOutside={false}
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
        );
    }
    const hideAlert = () => {
        setAlert(null)
    }

    function onchange(e) {
        let total = parseFloat(GetValores().subtotal) + parseFloat(GetValores().comision)
        let valor = parseFloat(total) - parseFloat(e.value)
        SetSuelto(valor)
    }
    function creaComprobante() {
        console.log("vender")
        setSpiner(true)
        PagoRapido("").then(ouput => {
            console.log(ouput)
            if (ouput.success) {
                usedispatch(setModal({ nombre: "", estado: "" }))
                usedispatch(setToastes({ show: true, message: 'Registro generado exitosamente verifica los Boletos como canjeados', color: 'bg-success', estado: "compra guardada" }))
                history.push("/admin/Aprobar/" + user.cedula)
                setSpiner(false)
                //history.push("/admin/suscritor/" + user.id + "")
                //usedispatch(setModal())
                // usedispatch(setModal({nombre:"",estado:""}))
            }
            else {
                usedispatch(setToastes({ show: true, message: 'Orden de pago no generado', color: 'bg-danger', estado: "error" }))
                setSpiner(false)
                // usedispatch(setModal({ nombre: "", estado: "" }))
            }
        }).catch(err => {
            setSpiner(false)
            console.log(err)
        })
    }
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789.".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });

    useEffect(() => {
        // detenervelocidad()
    }, [modalshow.nombre == "modalpago" ? true : false])
    return (
        <>
            {alert}
            <iframe className='d-none' id="main-iframe" ></iframe>
            <Modal
                show={modalshow.nombre == "modalpago" ? true : false}
            >
                <Modal.Header className='py-3'>
                    <h5><span className="text-danger" ></span> </h5>
                    <button type="button" className="close"
                        onClick={() => succesAlert()}>
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container ">
                        <div className='d-flex col-12 justify-content-end align-items-center px-0' >
                            <div><button className='close text-dark' onClick={() => usedispatch(setModal({ nombre: "ModalDetalle", estado: "" }))} >  <i className="bi bi-caret-left-fill"></i>  </button></div>
                        </div>
                        <div className="d-flex flex-column " >
                            <h3 className='text-center'> VALOR EFECTIVO </h3>
                            <div className='container'>
                                <input className='numero form-control'
                                    type="number"
                                    onChange={(e) => onchange(e.target)}
                                    placeholder='Obtener cambio'
                                >
                                </input>
                            </div>
                            <table className="table table-borderless ">
                                <tbody>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Subtotal:</td>
                                        <td className='text-center'>${GetValores().subtotal}</td>
                                    </tr>

                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Comisión por Boleto:</td>
                                        <td className='text-center'>${GetValores().comision}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Total:</td>
                                        <td className='text-center'>${GetMetodo() === "Tarjeta" ? GetValores().total : (parseFloat(GetValores().subtotal) + parseFloat(GetValores().comision)).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Suelto:</td>
                                        <td className='text-center'>${suelto.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="container d-flex flex-column  text-between p-3">
                                <div className="row  d-flex d-none   justify-content-between  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-items-cemter'>
                                        <h6 >Subtotal: </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 > <strong>${GetValores().subtotal}</strong>  </h6>
                                    </div>
                                </div>
                                <div className="row d-none   d-flex justify-content-center  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-content-end'>
                                        <h6 >Comision: </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 > <strong>${GetValores().comision}</strong> </h6>
                                    </div>
                                </div>
                                <div className="row d-none   d-flex justify-content-center  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-content-end'>
                                        <h6 >Total <span className=' text-white'>......</span>:  </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 >  <strong> ${GetMetodo() === "Tarjeta" ? GetValores().total : (parseFloat(GetValores().subtotal) + parseFloat(GetValores().comision)).toFixed(2)}  </strong></h6>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center pt-3  p-1">
                                    <button className="btn btn-primary 
                                    col-12"
                                        disabled={spiner}
                                        onClick={creaComprobante}
                                    >COBRAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )

}

export default ModalEfectivo;