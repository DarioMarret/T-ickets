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
const ModalConfima = (prop) => {
    const { pararcontador } = prop
    let usedispatch = useDispatch()
    const [banco, setBanco] = useState("")
    const [alert, setAlert] = useState(null)
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let intervalo = useSelector((state) => state.SuscritorSlice.intervalo)
    function cerrar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
        usedispatch(setToastes({
            show: true,
            message: "Tienes un tiempo límite para reportar el pago, puedes hacerlo desde la opción tickets",
            color: 'bg-primary',
            estado: "Recuerda "
        }))
    }

    function confirmar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
        pararcontador()
        usedispatch(setToastes({ show: true, message: 'Datos del deposito Guardado ', color: 'bg-success', estado: 'Se guardo el numero de control' }))
    }
    const successAlert=()=>{

        setAlert(
            <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}


                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
                confirmBtnText="Completar  Compra"
                cancelBtnText="Anular Compra"
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}

            >
                <div >
                    <div className='col-12 pb-3'>
                        <img src={atencion} className="img-fluid"
                            style={{
                                height: 100
                            }}
                        ></img>


                    </div>
                    <div>
                        <h6 className=' col-9 col-md-12  mx-auto' style={{
                            fontWeight: "bold",
                            fontSize: "1.0rem"
                        }}>¿Quieres abandonar tu proceso de compra?</h6>
                        <p> No puedes guardar tu proceso y continuar luego. Si, abandonas perderás tus reservas
                        </p>
                        <p>  </p>
                    </div>


                </div>
                <div className='d-flex  justify-content-around py-4'>
                    <div>
                        <button className='btn btn-outline-danger  rounded-6' onClick={() => cerrar()}>

                            <span style={{
                                fontWeight: "bold"
                            }}>Anular Compra</span>
                        </button>
                    </div>
                    <div>
                        <button className=' btn btn-warning rounded-5' onClick={() => hideAlert()} >
                            <span style={{
                                fontWeight: "bold"
                            }}> Completar Compra</span>
                        </button>
                    </div>

                </div>

            </SweetAlert>
        )
    }

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
                show={modal.nombre == "confirmar" ? true : false}
                fullscreen={'md-down'}
                centered
            >
                <Modal.Header className=" d-flex  rounded-top-4 m-0   bg-dark   justify-content-between align-items-center">
                    <div className="d-flex  container   justify-content-center text-center" >
                        <h3 className=" p-2 ">
                            Confirmación de Pago
                        </h3>
                    </div>
                    <div className=" float-left " style={{ marginTop: '-45px' }}>
                        <button type="button" className="text-light" onClick={cerrar}>
                            X
                        </button>
                    </div>

                </Modal.Header>
                <Modal.Body className="d-flex align-items-center">
                    <div className="container d-flex flex-column  ">
                        <form onSubmit={(e) => onSubmit(e)}>


                            <div className=" p-1">
                                <div className="d-none text-center"
                                >
                                    <p style={{
                                        fontWeight: "bold"
                                    }}>Tiempo restante <span className=" text-danger"> {intervalo}</span> </p>

                                </div>
                                <h5 style={{ fontSize: "1.0em" }}>
                                    Selecione el banco al que realizó la transferencia
                                </h5>
                                <select className="  form-select" id="banco" name="banco" value={banco} onChange={(e) => setBanco(e.target.value)}>
                                    <option disabled value={""}></option>
                                    <option value={"Pichincha"}>Banco Pichincha</option>
                                    <option value={"Guayaquil"}>Banco Guayaquil</option>
                                </select>
                            </div>
                            <div className=" p-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Ingrese el número de comprobante de la transferencia
                                </h5>
                                <input className=" form-control numero"
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
                                    <button className=" btn p-2 btn-success">Confirmar Transferencia</button>
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

export default ModalConfima;