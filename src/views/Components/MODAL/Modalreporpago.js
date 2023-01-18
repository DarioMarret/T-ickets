import { Container, Modal } from "react-bootstrap";
import { bancosdetall } from "utils/Imgenesutils";
import { bancos } from "utils/Imgenesutils";
import { useDispatch, useSelector } from "react-redux";
import { GetValores } from "utils/CarritoLocalStorang";
import { useState } from "react";
import { useEffect } from "react";
import metodos from "../../../assets/Banco_Internacional_Ecuador.png";
import SweetAlert from "react-bootstrap-sweetalert";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
let { atencion } = bancos
import jsPDF from "jspdf";
let { bancoguyaquil,
    bancopacifico,
    produbancoguayaquil,
    vecino } = bancosdetall
export default function ReporteView(prop) {
    let { setrepShow, comprar } = prop
    let usedispatch = useDispatch()
    let modalshow = useSelector((state) => state.SuscritorSlice.modal)
    const [alert, setAlert] = useState(null)

    const imagenes = {
        "pichincha": vecino,
        "pacifico": bancopacifico,
        "produbanco": produbancoguayaquil,
        "guayaquil": bancoguyaquil
    }
    const color = {
        "pichincha": "#feda00",
        "pacifico": "#169eda",
        "produbanco": "#003da7",
        "guayaquil": "#d2006e"
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
            let pdf = new jsPDF('p', 'mm', 'a5'); // a5 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
        });

    }
    function compartir() {
        html2canvas(document.querySelector("#COMPROBANTE")).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // a5 size page of PDF
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
    const imprime = () => {
        nuevo()
        usedispatch(setModal({ nombre: '', estado: '' }))
        hideAlert()
    }
    const Cerrar = () => {
        usedispatch(setModal({ nombre: '', estado: '' }))
        hideAlert()
    }
    const hideAlert = () => setAlert(null)
    const succesAlert = () => {
        setAlert(
            <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}
                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                <div>
                    <div className='col-12 pb-3'>
                        <img src={atencion} className="img-fluid"
                            style={{
                                height: 100
                            }}>

                        </img>
                    </div>
                    <h5 >Antes de cerrar </h5>
                    Recuerda imprimir la información de la cuenta a depositar
                    <div className='d-flex  justify-content-around py-4'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => imprime()}>

                                <span style={{
                                    fontWeight: "bold"
                                }}>Imprimir y cerrar</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => Cerrar()} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Cerrar</span>
                            </button>
                        </div>

                    </div>
                </div>
            </SweetAlert>
        )
    }


    useEffect(() => {
        //modalshow.nombre == "transferencia" || modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ? ListaPrecioset(GetValores()) : ''
        //  modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ? console.log((parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.comision)).toFixed(2)) : ''

    }, [modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ?
        true : false])
    return (
        <>
            {alert}
            <Modal
                show={
                    modalshow.nombre == "transferencia" || modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ?
                        true : false}
                size="lg"
                fullscreen={'md-down'}
            >
                <Modal.Header className=" d-flex  m-0  bg-dark  bg-secondary  justify-content-between align-items-center"

                >
                    <div className="d-flex  container    justify-content-center text-center" >
                        <h4 className=" p-2  text-light"
                            style={{
                                fontWeight: "bold"
                            }}
                        >{modalshow.nombre == "transferencia" ?
                            " ORDEN DE PAGO" : 'REPORTAR PAGO'}
                        </h4>
                    </div>
                    <div className=" float-left  " style={{ marginTop: '-45px' }}>
                        <button type="button" className=" text-secondary" onClick={succesAlert} >
                            X
                        </button>
                    </div>
                </Modal.Header>
                {modalshow.nombre == "pichincha" || modalshow.nombre == "pacifico" || modalshow.nombre == "produbanco" || modalshow.nombre == "guayaquil" ? <Modal.Body
                >
                    <div>
                        <div id="COMPROBANTE" className="container   px-0"
                            style={{
                                borderStyle: "solid",
                                borderWidth: "2px",
                                borderRadius: 20,
                                borderColor: color[modalshow.nombre],
                            }}
                        >
                            <div className={"  d-flex justify-content-center py-2   h-25 "}
                                style={{
                                    backgroundColor: color[modalshow.nombre],
                                    borderTopLeftRadius: 15,
                                    borderTopRightRadius: 15
                                }}
                            >
                                <div className="px-0 ">
                                    <img src={imagenes[modalshow.nombre]} className=" " style={{

                                    }}></img>
                                </div>
                            </div>
                            <div className=" container pt-2">
                                <h5><strong> Tipo de cuenta: </strong><span> Corriente</span></h5>
                                <h5><strong> Número de cuenta: </strong> <span>{cuentas[modalshow.nombre]}  </span>  </h5>
                                <h5><strong> Titular de la Cuenta : </strong> <span>COMPUTECNICSNET S.A.</span> </h5>
                                <h5><strong> RUC: </strong> <span>0992782129001</span></h5>
                                <h5><strong> Email: </strong> <span>recaudacion@t-ickets.com</span> </h5>
                                <h5><strong> Whastapp: </strong> <span>0969200247</span> </h5>

                                <h5><strong> Valor a Dépositar </strong>{"$" + (parseFloat(modalshow.estado.subtotal) + parseFloat(modalshow.estado.comision)).toFixed(2)}</h5>
                            </div>

                            <div >
                            </div>
                        </div>
                    </div>

                    <div className=" d-flex  flex-row  justify-content-center pt-3">

                        <div className="p-1 d-none d-md-block ">
                            <button className="btn btn-dark" onClick={nuevo}> IMPRIMIR</button>
                        </div>
                        <div className="p-1 d-d-block d-sm-block d-md-none">
                            <button className="btn btn-dark" onClick={compartir}>COMPARTIR </button>
                        </div>

                    </div>
                </Modal.Body> : ''}
                {modalshow.nombre == "transferencia" ?
                    <Modal.Body> <Container>
                        <div className="container ">
                            <div className='d-flex col-12 justify-content-between align-items-center' >
                                <h5 className="modal-title d-none text-center justify-content-center" style={{ fontWeight: 'bold', fontSize: '1.2em' }}>Tiempo restante de compra <span className="text-danger" >{/*/intervalo/*/} </span></h5>
                            </div>
                            <div className="d-flex flex-wrap justify-content-center align-items-center" >
                                <div className='d-flex flex-column text-center justify-content-center align-items-center'>

                                    <h3 className="modal-title pb-3 ">PARA DEPOSITO O TRANSFERENCIA</h3>
                                    <img src={metodos} className="img-fluid" style={{ width: '300px' }} alt="" />
                                    <h3>Numero de Cuenta</h3>
                                    <h3> <strong>1500618760</strong> </h3>
                                </div>
                                <div className="d-flex flex-wrap">
                                    <div className="col-12 col-lg-6 d-flex flex-column p-3">
                                        <select className="form-control " name="banco" defaultValue={"Banco Internacional"} aria-label="Selecione el Banco">
                                            <option value="Banco Internacional"> Banco Internacional</option>
                                        </select>
                                        <label >Numero de Control</label>
                                        <input className="form-control" type="text" name="control"
                                        />
                                    </div>
                                    <div className="col-12 col-lg-6 d-flex flex-column p-3 align-items-end" >
                                        <h5 >LUEGO DE REALIZAR LA TRANSACCIÓN
                                            POR FAVOR REPORTAR EL PAGO
                                        </h5>

                                        <button className="btn btn-danger col-6 float-end"

                                        >
                                            Reportar Pago
                                        </button>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </Container></Modal.Body> : ''

                }

            </Modal>
        </>
    )
}