import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { Form } from "react-bootstrap";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GetMetodo } from "utils/CarritoLocalStorang";
import { GetValores } from "utils/CarritoLocalStorang";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { useState } from "react";
import { Obtenerlinkimagen } from "utils/Querypanel";
import { PagoRapido } from "utils/Querycomnet";
import SweetAlert from "react-bootstrap-sweetalert";
export default function ModalReporteViews() {
    let usedispatch = useDispatch()
    const [banco, setBanco] = useState("")

    let modal = useSelector((state) => state.SuscritorSlice.modal)
    function cerrar() {
        usedispatch(setModal({ nombre: '', estado: '' }))

    }

    function confirmar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
        usedispatch(setToastes({ show: true, message: 'Datos del deposito Guardado ', color: 'bg-success', estado: 'Se guardo el numero de control' }))
    }
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789,.".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    async function onSubmit(e) {
        e.preventDefault();

        const form = new FormData(e.target)
        console.log(Object.fromEntries(form.entries()))
        const { codigo, comprobante } = Object.fromEntries(form.entries())
        //if([codigo,comprobante.name])
        console.log(comprobante)
        console.log([codigo, comprobante.name].some(e => e))
        if ([codigo, comprobante.name].some(e => e)) usedispatch(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
        if (banco == "") usedispatch(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
        else if (![codigo, comprobante.name].some(e => e) && banco != "") {
            try {
                // const link = await Obtenerlinkimagen(comprobante)
                const reporte = {
                    "banco": banco,
                    "codigo": codigo,
                    "comprobante": "link"
                }
                console.log(reporte)
                //console.log  PagoRapido().then(ouput=>console.log(e))
            } catch (error) {
                console.log(error)

            }
        }

    }

    return (
        <>
            <Modal
                show={modal.nombre == "pagarcomprobante" ? true : false}
                fullscreen={'md-down'}
                centered
            >
                <Modal.Header className=" d-flex  rounded-top-4 m-0  bg-secondary  justify-content-between align-items-center">
                    <div className="d-flex  container   justify-content-center text-center" >
                        <h3 className=" p-2 ">
                            REPORTAR
                        </h3>
                    </div>
                    <div className="d-flex  float-left " >
                        <button type="button" className="text-light" onClick={cerrar}>
                            X
                        </button>
                    </div>

                </Modal.Header>
                <Modal.Body>
                    <div className="container d-flex flex-column">
                        <form onSubmit={(e) => onSubmit(e)}>


                            <div className=" p-1">
                                <div className="d-none text-center"
                                >
                                    <p style={{
                                        fontWeight: "bold"
                                    }}>Tiempo restante  </p>

                                </div>
                                <h5 style={{ fontSize: "1.0em" }}>
                                    Selecione el banco al que realizó la transferencia
                                </h5>
                                <select className="  form-select" id="banco" name="banco" value={banco} onChange={(e) => setBanco(e.target.value)}>
                                    <option disabled value={""}>Seleccione el Banco</option>
                                    <option value={"Pichincha"}>Banco Pichincha</option>
                                    <option value={"Guayaquil"}>Banco Guayaquil</option>
                                    <option value={"Produbanco"}>Banco Guayaquil</option>
                                    <option value={"Produbanco"}>Banco Guayaquil</option>

                                </select>
                            </div>
                            <div className=" p-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Ingrese el número de comprobante de la transferencia
                                </h5>
                                <input className="numero form-control "
                                    name="codigo"
                                    id="codigo"
                                    type={"text"}
                                />
                            </div>
                            <div className="p-1" >
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Adjuntar Comprobante ( imagen jpg ó png)
                                </h5>
                                <input type="file" accept="image/*" id="comprobante" name="comprobante" className="form-control" />
                            </div>
                            <div className=" p-1 ">
                                {modal.nombre == "confirmar" ? <span>
                                    Una vez confirmado el deposito su ticket sera enviado  {
                                        GetValores().envio == "correo " ? "al: correo " + getDatosUsuariosLocalStorag().email : "al: Whatsapp " + getDatosUsuariosLocalStorag().whatsapp
                                    }
                                </span> : ''}

                            </div>
                            <div className="d-flex container justify-content-center ">
                                <div>
                                    <button className=" btn p-2 btn-success">CONFIRMAR </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

