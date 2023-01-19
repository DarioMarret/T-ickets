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
import { registraPagos } from "utils/pagos/Queripagos";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
const ModalConfima = (prop) => {
    const { pararcontador } = prop
    let usedispatch = useDispatch()
    const [estado, setEstado] = useState(true)
    const [alert, setAlert] = useState(null)
    const [comproba, setcomprobante] = useState({
        numeroTransaccion: "",
        link_comprobante: "",
        banco: ""
    })
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let intervalo = useSelector((state) => state.SuscritorSlice.intervalo)
    function cerrar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
     !clienteInfo()?   usedispatch(setToastes({
            show: true,
            message: "Tienes un tiempo límite para reportar el pago, puedes hacerlo desde la opción tickets",
            color: 'bg-primary',
            estado: "Recuerda "
        })):""
    }


    function confirmar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
        pararcontador()
        usedispatch(setToastes({ show: true, message: 'Datos del deposito Guardado ', color: 'bg-success', estado: 'Se guardo el numero de control' }))
    }
    const successAlert = () => {
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
    function onChange(e) {
        setcomprobante({
            ...comproba,
            link_comprobante: e.files
        })
        console.log(e.files)
    }
    function onhandelChange(e) {
        setcomprobante({
            ...comproba,
            [e.name]: e.value
        })
    }
    //SuscritorSlice.modal
    async function onSubmit(e) {
        //console.log(modal)
        e.preventDefault();
        if (comproba.numeroTransaccion == "") usedispatch(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
        if (comproba.banco == "") usedispatch(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
        if (comproba.link_comprobante[0] == undefined) usedispatch(setToastes({ show: true, message: 'Adjunte una imagen del Comprobante', color: 'bg-danger', estado: 'Datos vacios' }))
        if (isNaN(comproba.numeroTransaccion.trim())) usedispatch(setToastes({ show: true, message: 'solo debe Ingresar Números en el comprobante ', color: 'bg-danger', estado: 'Datos vacios' }))
        else if ([comproba.banco, comproba.numeroTransaccion].some(e => e)) {
            try {
                setEstado(false)
                const link = await Obtenerlinkimagen(comproba.link_comprobante[0])
                setTimeout(async function () {
                    const reporte = {
                        "id_usuario": clienteInfo() ? modal.estado.id_usuario : getDatosUsuariosLocalStorag().id, 
                        "forma_pago": "Deposito",
                        "link_comprobante": link,
                        "id": clienteInfo() ? modal.estado.id : modal.estado.id,
                        "numeroTransaccion": comproba.numeroTransaccion,
                        "cedula": clienteInfo() ? modal.estado.cedula : getDatosUsuariosLocalStorag().cedula,
                        "estado": clienteInfo() ? "Pagado" : "Comprobar"
                    }
                    //console.log(reporte)
                    registraPagos(reporte).then(ouput => {
                        if (ouput.success) {
                            setEstado(true)
                            usedispatch(setToastes({ show: true, message: 'Su comprobante a sido registrado con exitó ', color: 'bg-success', estado: 'Comprobante registrado' }))
                            usedispatch(setModal({ nombre: '', estado: '' }))
                        }
                        else {
                            setEstado(true)
                            usedispatch(setToastes({ show: true, message: ouput.message, color: 'bg-danger', estado: 'Hubo un error' }))
                        }
                    }).catch(erro => {
                        console.log(erro)
                        setEstado(true)
                        usedispatch(setToastes({ show: true, message: 'Hubo un error', color: 'bg-danger', estado: 'Hubo un error, intente mas tarde' }))
                    })
                    setEstado(true)
                }, 2000)

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
                                <select className="  form-select" name="banco" value={comproba.banco} onChange={(g) => onhandelChange(g.target)} >
                                    <option disabled value={""}></option>
                                    <option value={"Pichincha"}>Banco Pichincha</option>
                                    <option value={"Guayaquil"}>Banco Guayaquil</option>
                                    <option value={"Produbanco"}>Banco Produbanco</option>
                                    <option value={"Pacifico"}>Banco Pacifico</option>
                                </select>
                            </div>
                            <div className=" p-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Ingrese el número de comprobante de la transferencia
                                </h5>
                                <input className=" form-control numero"
                                    name="numeroTransaccion"
                                    value={comproba.numeroTransaccion}
                                    onChange={(e) => onhandelChange(e.target)}
                                    type={"text"}
                                />
                            </div>
                            <div className="p-1" >
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Adjuntar Comprobante ( imagen jpg ó png)
                                </h5>
                                <input type="file" accept="image/*" name="comprobante"
                                    onChange={(e) => onChange(e.target)}
                                    className="form-control"


                                />
                            </div>
                            <div className=" p-1 ">
                                {modal.nombre == "confirmar" && !clienteInfo()  ? <span>
                                    Una vez confirmado el deposito su ticket sera enviado  {
                                        GetValores()?"":   GetValores().envio == "correo " ? "al: correo " + getDatosUsuariosLocalStorag().email : "al: Whatsapp " + getDatosUsuariosLocalStorag().whatsapp
                                    }
                                </span> : ''}

                            </div>
                            <div className="d-flex container justify-content-center ">
                                <div>
                                    {estado ? <button className=" btn p-2 btn-success">Confirmar Transferencia</button>
                                        :
                                        <button className="btn btn-success p-2" disabled={true}>Confirmar Transferencia <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> </button>
                                    } </div>

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