import { Modal } from "react-bootstrap";
import { bancosdetall } from "utils/Imgenesutils";
import { bancos } from "utils/Imgenesutils";
import { useDispatch, useSelector } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GetValores } from "utils/CarritoLocalStorang";
import { useState } from "react";
import { useEffect } from "react";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import jsPDF from "jspdf";
let { bancoguyaquil,
    bancopacifico,
    produbancoguayaquil,
    vecino } = bancosdetall
export default function ReporteView(prop) {
    let { setrepShow } = prop
    let usedispatch = useDispatch()
    let modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0
    })
    const imagenes = {
        "pichincha": vecino,
        "pacifico": bancopacifico,
        "produbanco": produbancoguayaquil,
        "guayaquil": bancoguyaquil
    }
    const cuentas = {
        "pichincha": "2100106995",
        "pacifico": "8069530",
        "produbanco": "1058194005",
        "guayaquil": "18018624"
    }
    const nuevo = () => {
        html2canvas(document.querySelector("#COMPROBANTE")).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // A4 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
        });

    }
    const Cerrar = () => {
        usedispatch(setModal({ nombre: 'ModalReporte', estado: '' }))
        setrepShow(true)
    }
    useEffect(() => {
        modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ? ListaPrecioset(GetValores()) : ''
        //  modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ? console.log((parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.comision)).toFixed(2)) : ''

    }, [modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ?
        true : false])
    return (
        <>
            <Modal
                show={
                    modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ?
                        true : false}
                size="lg"
            >
                <Modal.Header className=" d-flex  m-0  bg-dark  bg-secondary  justify-content-between align-items-center"

                >
                    <div className="d-flex  container    justify-content-center text-center" >
                        <h4 className=" p-2  text-light"
                            style={{
                                fontWeight: "bold"
                            }}
                        >
                            ORDEN DE PAGO
                        </h4>
                    </div>
                    <div className=" float-left  " style={{ marginTop: '-45px' }}>
                        <button type="button" className=" text-secondary" onClick={Cerrar} >
                            X
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body
                >
                    <div>
                        <div id="COMPROBANTE" className="container   px-0"

                            style={{
                                borderStyle: "solid",
                                borderWidth: "2px",
                                borderRadius: 20,
                                borderColor: modalshow.estado,

                            }}
                        >
                            <div className={"  d-flex justify-content-center py-2   h-25 "}
                                style={{
                                    backgroundColor: modalshow.estado,
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15
                                }}
                            >
                                <div className="px-0 ">
                                    <img src={imagenes[modalshow.nombre]} className="" style={{

                                    }}></img>
                                </div>
                            </div>
                            <div className=" container pt-2">
                                <h5><strong> Tipo de cuenta: </strong><span> Corriente</span></h5>
                                <h5><strong> Número de cuenta: </strong> <span>{cuentas[modalshow.nombre]}  </span>  </h5>
                                <h5><strong> Titular de la Cuenta : </strong> <span>COMPUTECNICSNET S.A.</span> </h5>
                                <h5><strong> RUC: </strong> <span>0992782129001</span></h5>
                                <h5><strong> Email: </strong> <span>recaudacion@t-ickets.com</span> </h5>
                                <h5><strong> Valor a Dépositar </strong>{"$" + (parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.comision)).toFixed(2)}</h5>
                            </div>

                            <div >
                            </div>
                        </div>
                    </div>

                    <div className=" d-flex  flex-row  justify-content-center pt-3">

                        <div>
                            <button className="btn btn-dark" onClick={nuevo}> IMPRIMIR</button>
                        </div>

                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}