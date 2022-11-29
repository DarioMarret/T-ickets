import React, { useEffect, useState } from 'react';
import { Modal } from "react-bootstrap";
import { Salircliente } from 'utils/constantes';
import { getVerTienda, GetValores, GetMetodo } from 'utils/CarritoLocalStorang';
import { ReportarEfectivoCompra, EnviarmensajeWhastapp } from 'utils/Query';
import { LimpiarLocalStore, Limpiarseleccion } from 'utils/CarritoLocalStorang';
import { clearMapa } from 'StoreRedux/Slice/mapaLocalSlice';
import { borrarseleccion } from 'StoreRedux/Slice/sillasSlice';
import { setToastes } from 'StoreRedux/Slice/ToastSlice';
import { useDispatch } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import jsPDF from 'jspdf';

const ModalEfectivo = (props) => {
    const { efectShow, efectiOpShow, intervalo, handleefectivoClose } = props;
    let usedispatch = useDispatch()
    const [alert, setAlert] = useState(null)
    async function Guardarcompraefectivo() {
        try {
            //    const mensaje = await ReportarEfectivoCompra()
            const numero = await EnviarmensajeWhastapp(null)
            //const { msg } = mensaje
            if (numero != null) {
                efectiOpShow(false)
                Salircliente()
                usedispatch(setToastes({
                    message: numero,
                    color: 'bg-success',
                    estado: 'En breve uno de nuestros colaboradores se comunicará con usted',
                }))
                /* setDatoToas({
                     message: 'En breve uno de nuestros colaboradores se comunicará con usted',
                     color: 'bg-success',
                     estado: "" + msg,
                 })*/
            }
        } catch (error) {
            usedispatch(setToastes({
                message: "" + error,
                color: 'bg-danger',
                estado: "hubo un error",
            }))
            console.log(error)
        }
    }
    function borrar() {
        Limpiarseleccion()
        LimpiarLocalStore()
        efectiOpShow(false)
        usedispatch(clearMapa({}))
        usedispatch(borrarseleccion({ estado: "seleccionado" }))
        hideAlert()
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
        );
    }
    const hideAlert = () => {
        setAlert(null)
    }

    function creaComprobante() {
        try {
            var opciones = {
                orientation: 'p',
                unit: 'mm',
                format: [240, 300]
            };

            var doc = new jsPDF();

            doc.setFontSize(10);
            doc.text(10, 30, 'Recibo de venta de orquídeas');
            doc.text(10, 35, 'Comprobante No.: 785654544');
            doc.text(10, 40, 'PDV: pablito ');
            doc.text(10, 45, 'Operador: 123654');
            doc.text(10, 55, 'Valor: 35.00');
            doc.text(10, 60, 'TBX: 242985290');
            doc.text(10, 65, 'Fecha/Hora: 2022-11-11 12:28:21');
            doc.text(10, 75, '_______________________________');
            doc.text(10, 80, 'Recibí conforme');



            // doc.save('comprobante.pdf');
            doc.autoPrint();
            //doc.output('bloburl')
            document.getElementById('main-iframe').setAttribute('src', doc.output('bloburl'));
            //   doc.output('dataurlnewwindow');
            /*   var string = doc.output('dataurlnewwindow');
               var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
               var x = window.open();
               x.document.open();
               x.document.write(embed);
               x.document.close();-*/

        } catch (error) {
            console.log(error)

        }

    }



    useEffect(() => {
    }, [efectShow])
    return (
        <>
            {alert}
            <iframe className='d-none' id="main-iframe" ></iframe>
            <Modal
                show={efectShow}

            >
                <Modal.Header >
                    <h5><span className="text-danger" >{intervalo}</span> </h5>
                    <button type="button" className="close"
                        onClick={() => succesAlert()}>
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container ">
                        <div className='d-flex col-12 justify-content-end align-items-center' >

                            <div><button className='btn btn-primary' onClick={handleefectivoClose} >  <i className="bi bi-caret-left-fill"></i>  Regresar</button></div>
                        </div>
                        <div className="d-flex flex-column " >

                            <h3 className='text-center'> VALOR EFECTIVO </h3>
                            <div className="container d-flex flex-column  text-center p-3">
                                <div className=" d-flex justify-content-center  text-center p-1">


                                    <h6 >Subtotal <strong>${GetValores().subtotal}</strong>  </h6>
                                </div>
                                <div className="d-flex justify-content-center text-center  p-1">
                                    <h6 >Comision <strong>${GetValores().comision}</strong> </h6>
                                </div>
                                <div className=" d-flex justify-content-center  p-1">
                                    <h6 >Total  <strong> ${GetMetodo() === "Tarjeta" ? GetValores().total : (parseFloat(GetValores().subtotal) + parseFloat(GetValores().comision)).toFixed(2)}  </strong></h6>
                                </div>
                                <div className="d-flex justify-content-center pt-3  p-1">

                                    <button className="btn btn-primary 
                                    col-12"
                                        onClick={creaComprobante}
                                    >Cobrar</button>

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