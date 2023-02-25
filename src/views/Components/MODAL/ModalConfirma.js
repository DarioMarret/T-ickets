import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { Form } from "react-bootstrap";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GetMetodo } from "utils/CarritoLocalStorang";
import { GetValores } from "utils/CarritoLocalStorang";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { useEffect, useState } from "react";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { PagoRapido } from "utils/Querycomnet";
import SweetAlert from "react-bootstrap-sweetalert";
import { registraPagos } from "utils/pagos/Queripagos";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { cambiarMetodo } from "utils/pagos/Queripagos";
import { useHistory } from "react-router";
export default function Pagarlink() {
    let history = useHistory()
    let usedispatch = useDispatch()
    const [estado, setEstado] = useState(false)
    const [alert, setAlert] = useState(null)
    const [spiner, setspiner] = useState("")
    const [comproba, setcomprobante] = useState({
        numeroTransaccion: "",
        link_comprobante: "",
        banco: "",
        total_pago: ""
    })
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let intervalo = useSelector((state) => state.SuscritorSlice.intervalo)
   // console.log(modal)


    function onhandelChange(e) {
        if (e.name == "comprobante") {
            setcomprobante({
                ...comproba,
                link_comprobante: e.value
            })
        } else {
            setcomprobante({
                ...comproba,
                [e.name]: e.value
            })
        }
    }

    async function onSubmitT(e) {
        e.preventDefault();
        if ([comproba.banco, comproba.numeroTransaccion].some(e => e)) {
            try {
                let datosTC = {
                    "id": modal.estado.id,
                    "forma_pago": "Tarjeta",
                    "numeroTransaccion": "",
                    "link_comprobante": "",
                    "total_pago": comproba.total_pago,
                }
                setEstado(true)
                cambiarMetodo(datosTC).then(e => {
                    if (e.success) {
                        setTimeout(async function () {
                            const reporte = {
                                "id_usuario": clienteInfo().id,
                                "forma_pago": "Deposito",
                                "link_pago": comproba.link_comprobante,
                                "id": modal.estado.id,
                                "numeroTransaccion": comproba.numeroTransaccion,
                                "cedula": modal.estado.cedula,
                                "estado": "Pagado",
                                "link_comprobante": comproba.link_comprobante,
                            }
                            console.log(reporte)
                            registraPagos(reporte).then(ouput => {
                                console.log(ouput)
                                if (ouput.success) {
                                    console.log(ouput)
                                    console.log(reporte)
                                    setEstado(false)
                                    usedispatch(setModal({ nombre: '', estado: '' }))
                                    usedispatch(setToastes({ show: true, message: 'Metodo de pago realizado con éxito ', color: 'bg-success', estado: 'Comprobante registrado' }))
                                    usedispatch(setModal({ nombre: '', estado: '' }))
                                    history.goBack()
                                }
                                else {
                                    //console.log("aqui",ouput)
                                    setEstado(false)
                                    usedispatch(setToastes({ show: true, message: ouput.message, color: 'bg-danger', estado: 'Hubo un error' }))
                                }
                            }).catch(erro => {
                                console.log(erro)
                                setEstado(true)
                                usedispatch(setToastes({ show: true, message: 'Hubo un error', color: 'bg-danger', estado: 'Hubo un error, intente mas tarde' }))
                            })

                            // console.log(reporte)
                            setEstado(false)
                        }, 2000)
                    } else {
                        setEstado(true)
                        usedispatch(setToastes({ show: true, message: 'Hubo un error', color: 'bg-danger', estado: 'Hubo un error, intente mas tarde' }))

                    }
                })


            } catch (error) {
                console.log(error)

            }
        }
    }

    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    useEffect(() => {
        setcomprobante({
            ...comproba,
            total_pago: modal.estado.total_pago
        })
        console.log(modal)
        $(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header",
                containment: "#root",
                scroll: false,
            })
        })
    }, [modal.nombre == "canjear" ? true : false])
    return (
        <>
            <Modal
                show={modal.nombre == "canjear" ? true : false}
                fullscreen={'md-down'}
                centered
            >
                <Modal.Header className=" d-flex  rounded-top-4 m-0   bg-dark   justify-content-between align-items-center">
                    <div className="d-flex  container   justify-content-center text-center" >
                        <h3 className=" p-2 ">
                            Confirmación de Pago TC
                        </h3>
                    </div>
                    <div className=" float-left " style={{ marginTop: '-45px' }}>
                        <button type="button" className="text-light" onClick={() => usedispatch(setModal({ nombre: "", estado: "" }))} >
                            X
                        </button>
                    </div>

                </Modal.Header>
                <Modal.Body className="d-flex align-items-center row">
                    <div className="container d-flex flex-column col-12 ">
                        <form onSubmit={(e) => onSubmitT(e)} className="was-validated">
                            <div className="p-1" >
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Ingrese el número de lote
                                </h5>
                                <input type="text" name="numeroTransaccion" id="numeroTransaccion"
                                    required
                                    value={comproba.numeroTransaccion}
                                    onChange={(e) => onhandelChange(e.target)}
                                    className="form-control"
                                />

                            </div>
                            <div className=" p-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Ingrese el link del Voaucher
                                </h5>
                                <input className=" form-control "
                                    name="link_comprobante"
                                    value={comproba.link_comprobante}
                                    required
                                    onChange={(e) => onhandelChange(e.target)}
                                    type={"text"}
                                />
                            </div>
                            <div className=" p-1">
                                <h5 style={{
                                    fontSize: "1.0em"
                                }}>
                                    Valor

                                </h5>
                                <input className=" form-control numero"
                                    name="total_pago"
                                    value={comproba.total_pago}
                                    required
                                    onChange={(e) => onhandelChange(e.target)}
                                    type={"text"} />

                            </div>


                            <div className="d-flex container justify-content-center  flex-column text-center">
                                <div>
                                    {comproba.banco != "Efectivo" && comproba.banco != "transferencia" ?

                                        !estado ? <button className=" btn p-2 btn-success">Confirmar Transferencia</button> : <button disabled className=" btn p-2 btn-success">Confirmar Transferencia</button>

                                        :
                                        ""

                                    }
                                    {
                                        comproba.banco == "transferencia" ? <button className=" btn btn-primary" >Reporte en transferencia </button> : ""
                                    }

                                </div>
                                <div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-12 text-center">

                    </div>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

