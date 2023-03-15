import jsPDF from "jspdf";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { GetValores } from "utils/CarritoLocalStorang";
import { FacturaComnet } from "utils/constantes";
import { carrusel } from "views/Pages/Flasdeticket/imagenstatctic";
import SweetAlert from "react-bootstrap-sweetalert";
import { alertClasses } from "@mui/material";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
let { facilitodos } = carrusel
export default function ModalFacilitoView() {
    let usedispatch = useDispatch()
    let Modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [alert, setAlert] = useState(null)
    let user = getDatosUsuariosLocalStorag()

    //console.log(user)
    function codigoregistro() {
        const codigoregistro = JSON.parse(sessionStorage.getItem(FacturaComnet))
        if (codigoregistro != null) return codigoregistro
        else return "00000"
    }
    const Cerrar = () => {
        hideAlert()
        usedispatch(setModal({ nombre: '', estado: '' }))

    }
    //   let arrr = document.
    function imprime() {

        html2canvas(document.querySelector("#comprobantepago")).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            //   alert(imgHeight)
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // A4 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
        });
        hideAlert()
        usedispatch(setModal({ nombre: '', estado: '' }))
    }
    function compartir() {
        html2canvas(document.querySelector("#comprobantepago")).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            //   alert(imgHeight)
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // A4 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            var pdfs = new File([pdf.output('blob')], "doc_name" + ".pdf", { type: "application/pdf" });
            var filesToShare = [pdfs];
            try {
                navigator.share({ title: "reporte" + ".pdf", files: filesToShare });
            } catch (error) {
                console.log(error)
            }

        });
    }
    const hideAlert = () => setAlert(null)
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title={"Antes de cerrar"}
                onConfirm={() => Cerrar()}
                onCancel={() => imprime()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                closeOnClickOutside={false}
                confirmBtnText="Cerrar "
                cancelBtnText="Imprimir y cerrar"
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            > Recuerda imprimir la infromación de la orden de pago
            </SweetAlert>
        )
    }
    return (
        <>
            {alert}
            <Modal
                show={Modalshow.nombre == "ordendepago" ? true : false}
                size="lg"
                fullscreen={'md-down'}
                centered>
                <Modal.Header className="bg-dark  text-light py-4  text-white">
                    <button className="close text-light" onClick={succesAlert}> X</button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row border text-center">
                        <div className=" col-12 col-md-6 py-2">
                            <img src={facilitodos} className=""
                                style={{
                                    height: 50
                                }}
                            ></img>
                        </div>
                        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                            <h3 style={{

                            }}>Información para tu pago</h3>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="d-flex   flex-column ">
                            <div id="comprobantepago">
                                <div className="col-8">
                                    <h4 style={{ fontSize: '0.9em' }}>orden Generada correctamente: <span style={{
                                        fontWeight: "bold"
                                    }}>{Modalshow.nombre == "ordendepago" ? codigoregistro() : ''}</span>  </h4>
                                </div>
                                <div className=" d-flex  flex-wrap  justify-content-center">
                                    <div className="col-12 px-0  d-flex justify-content-center"

                                    >
                                        <h5
                                            style={{
                                                fontSize: "0.82em",
                                                fontWeight: "bold"
                                            }}>¡Estas a punto de finalizar tu compra en t-ickets.com!</h5>
                                    </div>
                                    <div>


                                    </div>
                                    <div className=" col-12 border px-0  d-flex flex-column  ">
                                        <div className=" d-flex flex-wrap bg-black  text-light justify-content-center align-items-center   col-12 text-center"
                                        >
                                            <div className="pt-3  text-light"  ><p style={{

                                                fontWeight: "bold"
                                            }}>Servicio Recaudación   </p></div>
                                        </div>
                                        <div className=" d-flex flex-wrap   bg-secondary justify-content-center align-items-center   col-12 text-center"
                                            style={{

                                                height: 30
                                            }}
                                        >
                                            <div className="    text-light "><p> Empres: Comnet - Speed - T-ickets    </p></div>

                                        </div>
                                        <div className="row py-2">
                                            <div className="col-6 d-flex  justify-content-center">
                                                <div>
                                                    <h5
                                                        style={{
                                                            fontSize: "1.0em",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        CODIGO DE PAGO
                                                    </h5>
                                                    <h5 className="text-danger text-center"
                                                        style={{
                                                            fontSize: "1.0em",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        {user ? user.cedula : ""}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="col-6 d-flex  justify-content-center">
                                                <div>
                                                    <h5
                                                        style={{
                                                            fontSize: "1.0em",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        MONTO A PAGAR
                                                    </h5>
                                                    <h5 className="text-danger  text-center"
                                                        style={{
                                                            fontSize: "1.0em",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        {Modalshow.nombre == "ordendepago" ? "$" + Math.round( parseFloat(Modalshow.estado.total).toFixed(2) / 1.07) : '$0.00'}
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className=" d-flex flex-column  align-items-center">
                                <div className="row py-3 col-9  d-flex justify-content-center ">
                                    <div className=" d-none col-3 d-flex justify-content-end">
                                        <button className=" btn btn-primary">
                                            Enviar:
                                        </button>
                                    </div>
                                    <div className="d-none ">
                                        <select className=" form-select">
                                            <option>Whastapp</option>
                                            <option>Correo</option>
                                        </select>
                                    </div>
                                    <div className=" d-flex justify-content-center">
                                        <div className="p-1"> <button className=" btn btn-primary d-none d-md-block" onClick={imprime}> imprimir</button></div>
                                        <div className="p-1"> <button className="btn btn-primary" onClick={compartir}>compartir</button></div>

                                    </div>
                                </div>
                                <div className="col-10">
                                    <div className="">
                                        <h5
                                            style={{

                                                fontWeight: "bold"
                                            }}
                                        >
                                            Como Realizar el Pago
                                        </h5>
                                        <p style={{ fontSize: '0.9em' }}> <span
                                            style={{

                                                fontWeight: "bold"
                                            }}
                                        >1.</span>  Indica que vas realizar un pago a la empresa: COMNET - SPEED - T-ICKETS</p>
                                        <p style={{ fontSize: '0.9em' }}>  <span
                                            style={{

                                                fontWeight: "bold"
                                            }}
                                        >2.</span> Indica el número de cedula del cliente, comprador del boleto</p>
                                        <p style={{ fontSize: '0.9em' }}>    <span
                                            style={{

                                                fontWeight: "bold"
                                            }}
                                        >3.</span> Una vez realizado el pago tus boletos llegaran al correo registrado</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </Modal.Body>


            </Modal>
        </>
    )
}