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

const ModalEfectivo = (props) => {
    const { efectShow, intervalo, handleefectivoClose, detenervelocidad } = props;
    let user = clienteInfo()
    //console.log(user)
    let usedispatch = useDispatch()
    const modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [alert, setAlert] = useState(null)
    async function Guardarcompraefectivo() {
        try {
            //    const mensaje = await ReportarEfectivoCompra()
            const numero = await EnviarmensajeWhastapp(null)
            //const { msg } = mensaje
            if (numero != null) {

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
        usedispatch(setModal({ nombre: "", estado: "" }))
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
    const addFooters = doc => {
        const pageCount = doc.internal.getNumberOfPages()
        console.log(pageCount)
        //doc.setFont('helvetica', 'italic')
        // doc.setFontSize(8)
        for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i)
            doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width / 2, 270, {
                align: 'center'
            })
        }
    }
    function generaPago(){
        PagoRapido("").then(ouput=>{
            if(ouput.success){
            // console.log(ouput)
            //   usedispatch(setModal({ nombre: '', estado: valores }))
            //   usedispatch(setToastes({ show: true, message: 'Orden de pago generada', color: 'bg-success', estado: ouput.message }))
            }
            else{
            // usedispatch(setToastes({ show: true, message: 'Orden de pago generada', color: 'bg-success', estado: ouput.message }))
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    function creaComprobante() {
        let cliente = getDatosUsuariosLocalStorag()
        try {
            var opciones = {
                orientation: 'p',
                unit: 'mm',
                format: [240, 300]
            };

            var doc = new jsPDF('p', 'mm');
            let fecha = moment().format("DD/MM/YYYY HH:mm")
            let y, x;
            doc.setFontSize(10);
            doc.text(10, 30, 'Recibo de venta de t-ickets');
            doc.text(10, 35, "Comprobante No.: 000" + moment().format("DDMMYYYY"));
            doc.text(10, 40, "Cliente:" + cliente.name);
            doc.text(10, 45, "Operador: " + user.username);
            doc.text(10, 50, "Valor:");
            doc.text(20, 50, "" + GetMetodo() === "Tarjeta" ? GetValores().total : (parseFloat(GetValores().subtotal) + parseFloat(GetValores().comision)).toFixed(2));
            doc.text(10, 55, 'TBX: 242985290');
            doc.text(10, 60, "Fecha/Hora: " + fecha);
            doc.text(10, 75, '_______________________________');
            doc.text(10, 80, 'Recibí conforme');
            // doc.text(10, 250, 'Recibí conforme');
            let pageHeight = doc.internal.pageSize.height;
            /* y = 500 // Height position of new content
             if (y >= pageHeight) {
                 doc.addPage();
                 doc.text(10, 290, "value");
                 y = 0 // Restart height position
             }*/

            /* for (var i = 1; i <= 2; i++) {
                 //pdf.addPage(PDF_Width, PDF_Height);
                 doc.addPage();
 
                 /* let margin = -parseInt(PDF_Height * i) + parseInt(top_left_margin * 4);
                  if (i > 1) {
                      margin = parseInt(margin + i * 8);
                  }
                  pdf.addImage(imgData, 'JPG', top_left_margin, margin, canvas_image_width, canvas_image_height);*
             }*/
            addFooters(doc)
            // doc.save('comprobante.pdf');
            doc.autoPrint();
            //doc.output('bloburl')
            document.getElementById('main-iframe').setAttribute('src', doc.output('bloburl'));
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        detenervelocidad()
    }, [modalshow.nombre == "modalpago" ? true : false])
    return (
        <>
            {alert}
            <iframe className='d-none' id="main-iframe" ></iframe>
            <Modal
                show={modalshow.nombre == "modalpago" ? true : false}
            >
                <Modal.Header className='py-3'>
                    <h5><span className="text-danger" >{intervalo}</span> </h5>
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
                            <div className="container d-flex flex-column  text-between p-3">
                                <div className="row  d-flex  justify-content-between  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-items-cemter'>
                                        <h6 >Subtotal: </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 > <strong>${GetValores().subtotal}</strong>  </h6>
                                    </div>
                                </div>
                                <div className="row  d-flex justify-content-center  border rounded-6 m-1 p-2">
                                    <div className='col-6 d-flex  align-content-end'>
                                        <h6 >Comision: </h6>
                                    </div>
                                    <div className='col-6 d-flex align-content-end' >
                                        <h6 > <strong>${GetValores().comision}</strong> </h6>
                                    </div>
                                </div>
                                <div className="row  d-flex justify-content-center  border rounded-6 m-1 p-2">
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