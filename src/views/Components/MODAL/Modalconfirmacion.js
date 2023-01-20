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
import { cambiarMetodo } from "utils/pagos/Queripagos";
const ModalConfima = (prop) => {
    const { pararcontador } = prop
    let usedispatch = useDispatch()
    const [estado, setEstado] = useState(false)
    const [alert, setAlert] = useState(null)
    const [spiner,setspiner]=useState(true)
    const [comproba, setcomprobante] = useState({
        numeroTransaccion: "",
        link_comprobante: "",
        banco: ""
    })
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let intervalo = useSelector((state) => state.SuscritorSlice.intervalo)
    function cerrar() {
        usedispatch(setModal({ nombre: '', estado: '' }))
        !clienteInfo() ? usedispatch(setToastes({
            show: true,
            message: "Tienes un tiempo límite para reportar el pago, puedes hacerlo desde la opción tickets",
            color: 'bg-primary',
            estado: "Recuerda "
        })) : ""
    }


    function confirmarefectivo() {
        let datos = {
            "id": clienteInfo() ? modal.estado.id : modal.estado.id,
            "forma_pago": "Efectivo",
            "numeroTransaccion": "",
            "link_comprobante": "",
            "total_pago": comproba.numeroTransaccion
        }
        //console.log(datos)
        if (comproba.numeroTransaccion.trim() == "") { return }
        cambiarMetodo(datos).then(ouput => {
            console.log(ouput)
            usedispatch(setToastes({ show: true, message: 'Reporte pagado ', color: 'bg-success', estado: 'Se guardo el numero de control' }))
          
        }).catch(err => {
            console.log(err)
            $.alert("hubo un error")
        })

        //  usedispatch(setModal({ nombre: '', estado: '' }))
        //  pararcontador()
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
                setEstado(true)
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
                    registraPagos(reporte).then(ouput => {
                        if (ouput.success) {
                            setEstado(false)
                            usedispatch(setModal({ nombre: '', estado: '' }))
                            usedispatch(setToastes({ show: true, message: 'Su comprobante a sido registrado con exitó ', color: 'bg-success', estado: 'Comprobante registrado' }))
                            usedispatch(setModal({ nombre: '', estado: '' }))
                            setTimeout(function(){
                                window.location.reload()
                            },1000)
                            
                        }
                        else {
                            setEstado(false)
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
    async function reportarTransferencia() {
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
                        "forma_pago": "Efectivo",
                        "link_comprobante": link,
                        "id": clienteInfo() ? modal.estado.id : modal.estado.id,
                        "numeroTransaccion": comproba.numeroTransaccion,
                        "cedula": clienteInfo() ? modal.estado.cedula : getDatosUsuariosLocalStorag().cedula,
                        "estado": "Pagado"
                    }
                    cambiarMetodo(reporte).then(ouput => {
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
                <Modal.Body className="d-flex align-items-center row">
                    <div className="container d-flex flex-column col-12 ">
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
                                {!clienteInfo() ? <select className="  form-select" name="banco" value={comproba.banco} onChange={(g) => onhandelChange(g.target)} >
                                    <option disabled value={""}></option>
                                    <option value={"Pichincha"}>Banco Pichincha</option>
                                    <option value={"Guayaquil"}>Banco Guayaquil</option>
                                    <option value={"Produbanco"}>Banco Produbanco</option>
                                    <option value={"Pacifico"}>Banco Pacifico</option>
                                   

                                </select> : <select className="  form-select" name="banco" value={comproba.banco} onChange={(g) => onhandelChange(g.target)} >
                                    <option disabled value={""}></option>
                                    <option value={"Efectivo"}>Cambiar a Efectivo</option>
                                    <option value={"Pichincha"}>Banco Pichincha</option>
                                    <option value={"Guayaquil"}>Banco Guayaquil</option>
                                    <option value={"Produbanco"}>Banco Produbanco</option>
                                    <option value={"Pacifico"}>Banco Pacifico</option>
                                    <option value={"transferencia"}>Transferencia</option>
                                </select>}
                            </div>
                            {comproba.banco != "Efectivo" ? <div className=" p-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Ingrese el número de comprobante de la transferencia
                                </h5>
                                <input className=" form-control numero"
                                    name="numeroTransaccion"
                                    value={comproba.numeroTransaccion}
                                    onChange={(e) => onhandelChange(e.target)}
                                    type={"text"}
                                />
                            </div> :
                                <div className=" p-1">
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        campo por definir
                                    </h5>
                                    <input className=" form-control numero"
                                        name="numeroTransaccion"
                                        placeholder="Dato por definir"
                                        value={comproba.numeroTransaccion}
                                        onChange={(e) => onhandelChange(e.target)}
                                        type={"text"}
                                    />
                                </div>}
                            {comproba.banco != "Efectivo" ? <div className="p-1" >
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Adjuntar Comprobante ( imagen jpg ó png)
                                </h5>
                                <input type="file" accept="image/*" name="comprobante"
                                    onChange={(e) => onChange(e.target)}
                                    className="form-control"
                                />
                            </div>
                                : ""
                            }
                            <div className=" p-1 ">
                                {modal.nombre == "confirmar" && !clienteInfo() ? <span>
                                    Una vez confirmado el deposito su ticket sera enviado  {
                                        GetValores() ? "" : GetValores().envio == "correo " ? "al: correo " + getDatosUsuariosLocalStorag().email : "al: Whatsapp " + getDatosUsuariosLocalStorag().whatsapp
                                    }
                                </span> : ''}

                            </div>
                            <div className="d-flex container justify-content-center  flex-column text-center">
                                <div>
                                    {comproba.banco != "Efectivo" && comproba.banco != "transferencia" ? 
                                    
                                        !estado ? <button className=" btn p-2 btn-success">Confirmar Transferencia</button> : <button disabled className=" btn p-2 btn-success">Confirmar Transferencia</button>

                                        :
                                        ""
                                    } </div>
                                <div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 text-center">
                        {clienteInfo() == null ? "" :
                            comproba.banco == "Efectivo" ? <button className=" btn btn-primary" onClick={confirmarefectivo}>Reporte en Efectivo </button> : ""
                        }
                    </div>
                    <div className="col-12 text-center">
                        {clienteInfo() == null ? "" :
                            comproba.banco == "transferencia" ? <button className=" btn btn-primary" onClick={reportarTransferencia}>Reporte en transferencia </button> : ""
                        }
                    </div>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfima;