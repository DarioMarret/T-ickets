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
import { OCRApi } from "utils/Querycomnet";
const ModalConfima = (prop) => {
    const { pararcontador } = prop
    let usedispatch = useDispatch()
    const [estado, setEstado] = useState(false)
    const [alert, setAlert] = useState(null)
    const [spiner, setspiner] = useState("")
    const [comproba, setcomprobante] = useState({
        numeroTransaccion: "",
        link_comprobante: "",
        banco: ""
    })
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let intervalo = useSelector((state) => state.SuscritorSlice.intervalo)
    // console.log((parseFloat(modal.estado.total_pago) / 1.07).toFixed(2))
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
        // $("#valor").val()
        //console.log($("#valor").val())
        if ($("#valor").val() == "") {
            usedispatch(setToastes({ show: true, message: 'Ingrese monto', color: 'bg-danger', estado: 'Datos vacios' }))

            return
        }
        let datos = {
            "id": clienteInfo() ? modal.estado.id : modal.estado.id,
            "forma_pago": "Efectivo",
            "numeroTransaccion": "",
            "link_comprobante": "",
            "total_pago": $("#valor").val()
        }
        //console.log(datos)
        // if (comproba.numeroTransaccion.trim() == "") { return }
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
        // let img = new Image()

        //if(e.files.size)
        let tamaño = parseInt(e.files[0].size / 1024);
        if (tamaño < 1024 || tamaño == 1024) {
            //console.log(e.files[0].size)
            setcomprobante({
                ...comproba,
                link_comprobante: e.files
            })

        }
        else {


            // console.log(tamaño, e.files[0].size, (1024 <= tamaño))
            $("#comprobante").val(null);
            $.alert("Pasate el peso maximo")
            return
        }

        //img.src = window.URL.createObjectURL(e.files[0])



        //   console.log(e.files)
    }
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
    async function onSubmit(e) {
        e.preventDefault();
        // console.log(comproba.numeroTransaccion.trim().length < 3)
        /*if (comproba.numeroTransaccion.trim().length <= 3) {
            usedispatch(setToastes({ show: true, message: 'complete toda la información del número del recibo', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }*/

        if (comproba.banco == "") {
            usedispatch(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        if (comproba.link_comprobante[0] == undefined) {
            usedispatch(setToastes({ show: true, message: 'Adjunte una imagen del Comprobante', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        /* if (isNaN(comproba.numeroTransaccion.trim()) || !clienteInfo() == null) {
             usedispatch(setToastes({ show: true, message: 'solo debe Ingresar Números en el comprobantes ', color: 'bg-danger', estado: 'Datos vacios' }))
             return
         }*/
        else if ([comproba.banco].some(e => e)) {
            try {
                setEstado(true)
                const link = await Obtenerlinkimagen(comproba.link_comprobante[0])
               console.log(link)
                if(link==null){
                    usedispatch(
                        setToastes({
                            show: true,
                            message: 'La imagen no se pudo leer Comuníquese con un accesor al número  +593980008000/+593969305316',
                            color: 'bg-warning',
                            estado: 'Hubo un error'
                        }))
                        setEstado(false)
                    return;
                }
                setTimeout(async function () {
                    console.log(link)
                    OCRApi({
                        "cedulaBeneficiario": "0923980742",
                        "url": link,
                        "cedula": clienteInfo() ? modal.estado.id_usuario : getDatosUsuariosLocalStorag().id,
                        "valor_pagar": (parseFloat(modal.estado.total_pago) / 1.08).toFixed(2)
                    }).then(ocroupt => {
                        console.log(ocroupt)
                        if (ocroupt.success) {
                            let comprobante = ocroupt.data["numero_documento"]
                            let valor = ocroupt.data[valor]
                            const reporte = {
                                "id_usuario": clienteInfo() ? modal.estado.id_usuario : getDatosUsuariosLocalStorag().id,
                                "forma_pago": spiner,
                                "link_comprobante": link,
                                "id": clienteInfo() ? modal.estado.id : modal.estado.id,
                                "numeroTransaccion": comprobante,
                                "cedula": clienteInfo() != null ? modal.estado.cedula : getDatosUsuariosLocalStorag().cedula,
                                "estado": "Comprobar"
                            }
                            registraPagos(reporte).then(ouput => {
                                if (ouput.success) {
                                    setEstado(false)
                                    usedispatch(setModal({ nombre: '', estado: '' }))
                                    usedispatch(setToastes({ show: true, message: 'Su comprobante a sido registrado con exitó ', color: 'bg-success', estado: 'Comprobante registrado' }))
                                    usedispatch(setModal({ nombre: '', estado: '' }))
                                    setTimeout(function () {
                                        window.location.reload()
                                    }, 1000)
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
                        } else {
                            usedispatch(setToastes({
                                show: true, message: ocroupt.message + "\n \n"

                                    + "Beneficiario: " + ocroupt.data.beneficiario + "\n" + "Banco: " + ocroupt.data.banco + "\n" +"comprobante: "+ ocroupt.data.numero_documento + "\n"
                                    + "fecha: " + ocroupt.data.fecha, color: 'bg-danger', estado: 'Comuníquese con un acceso al número  +593980008000/+593969305316'
                        }))
                            setEstado(false)
                        }
                    }).catch(salid => {
                        usedispatch(setToastes({ show: true, message: 'Hubo un error', color: 'bg-danger', estado: "Comuníquese con un acceso al número  +593980008000/+593969305316" }))
                        console.log(salid)
                        setEstado(false)
                    })

                    //setEstado(true)
                }, 1000)

            } catch (error) {
                setEstado(false)
                console.log(error)

            }
        }
    }
    async function onSubmitT(e) {
        e.preventDefault();
        if (comproba.numeroTransaccion == "") {
            usedispatch(setToastes({ show: true, message: 'completes toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        if (comproba.banco == "") {
            usedispatch(setToastes({ show: true, message: 'complete toda la información', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        if (comproba.link_comprobante == "") {
            usedispatch(setToastes({ show: true, message: 'Escribe numero de lote', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        if (isNaN(comproba.numeroTransaccion.trim()) && clienteInfo() == null) {
            usedispatch(setToastes({ show: true, message: 'solo debe Ingresar Números en el comprobante ', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        else if ([comproba.banco, comproba.numeroTransaccion].some(e => e)) {
            try {
                setEstado(true)
                //  const link = await Obtenerlinkimagen(comproba.link_comprobante[0])
                setTimeout(async function () {
                    const reporte = {
                        "id_usuario": clienteInfo() ? modal.estado.id_usuario : getDatosUsuariosLocalStorag().id,
                        "forma_pago": "Deposito",
                        "link_comprobante": comproba.link_comprobante,
                        "id": clienteInfo() ? modal.estado.id : modal.estado.id,
                        "numeroTransaccion": comproba.numeroTransaccion,
                        "cedula": clienteInfo() != null ? modal.estado.cedula : getDatosUsuariosLocalStorag().cedula,
                        "estado": "Comprobar"
                    }

                    registraPagos(reporte).then(ouput => {
                        if (ouput.success) {
                            console.log(ouput)
                            setEstado(false)
                            usedispatch(setModal({ nombre: '', estado: '' }))
                            usedispatch(setToastes({ show: true, message: 'Su comprobante a sido registrado con exitó ', color: 'bg-success', estado: 'Comprobante registrado' }))
                            usedispatch(setModal({ nombre: '', estado: '' }))
                            setTimeout(function () {
                                //  window.location.reload()
                            }, 1000)

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

                    console.log(reporte)
                    setEstado(false)
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

    useEffect(() => {
        setspiner(modal.estado.forma_pago)
        $(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header",
                containment: "#root",
                scroll: false,
            })
        })
    }, [modal.nombre == "confirmar" ? true : false])
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
                        {spiner != "Tarjeta" ?
                            <form onSubmit={(e) => onSubmit(e)} className="  was-validated">
                                <div className=" p-1">
                                    <div className="d-none text-center"
                                    >
                                        <p style={{
                                            fontWeight: "bold"
                                        }}>Tiempo restante <span className=" text-danger"> {intervalo}</span> </p>

                                    </div>
                                    <h5 className=" font-weight-bold text-danger">Forma de Pagos</h5>
                                    {clienteInfo() != null ?
                                        <select className="form-select" value={spiner}
                                            onChange={(g) => setspiner(g.target.value)}
                                        >
                                            <option value={""} disabled required ></option>
                                            <option value={"Tarjeta"}>Tarjeta</option>
                                            <option value={"Deposito"}>Deposito</option>
                                            <option value={"Efectivo"}>Deposito Efectivo facilito</option>
                                            <option value={"Transferencia"}>Transeferencia</option>

                                        </select> : <select className="form-select" required value={spiner}
                                            onChange={(g) => setspiner(g.target.value)}>
                                            <option value={""} disabled></option>
                                            <option value={"Deposito"}>Deposito</option>

                                        </select>}
                                    <h5 className="mt-1" style={{ fontSize: "1.0em" }}>
                                        Selecione el banco al que realizó la transferencia
                                    </h5>
                                    {spiner != "Tarjeta" ? <select className="  form-select" required name="banco" value={comproba.banco} onChange={(g) => onhandelChange(g.target)} >
                                        <option value={""} disabled></option>
                                        <option value={"Pichincha"}>Banco Pichincha</option>
                                        <option value={"Guayaquil"}>Banco Guayaquil</option>
                                        <option value={"Produbanco"}>Banco Produbanco</option>
                                        <option value={"Pacifico"}>Banco Pacifico</option>
                                    </select> :
                                        <select className="  form-select" name="banco" required value={comproba.banco} onChange={(g) => onhandelChange(g.target)} ><option value={"Visa"}>Visa</option>
                                            <option value={""} disabled></option>
                                            <option value={"Master"}>Mastercar</option>
                                            <option value={"Diners"}>Diners club</option>
                                            <option value={"Discover"}>Discover</option>
                                            <option value={"America"}>America</option>
                                            <option value={"Alia"}>Alia</option>
                                        </select>}
                                </div>
                                {false ? <div className=" d-none p-1">
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        Número de comprobante
                                    </h5>
                                    <input className=" form-control numero"
                                        name="numeroTransaccion"
                                        value={comproba.numeroTransaccion}
                                        required
                                        onChange={(e) => onhandelChange(e.target)}
                                        type={"text"}
                                    />
                                </div> :
                                    ""}
                                {comproba.banco == "Efectivo" || comproba.banco == "transferencia" ? <div className=" p-1">
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        Valor a Cobrar
                                    </h5>
                                    <input className=" form-control numero"
                                        id="valor"
                                        placeholder="Dato por definir"
                                        required
                                        type={"text"}
                                    />
                                </div> : ""}
                                {spiner != "Tarjeta" ? <div className="p-1" >
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        Adjuntar Comprobante ( imagen jpg ó png)
                                    </h5>
                                    <input type="file" accept="image/*" name="comprobante" id="comprobante"
                                        onChange={(e) => onChange(e.target)}
                                        required
                                        className="form-control"
                                    />
                                    <span className=" text-danger">Tamaño Maximo de la imagen un  1MB</span>
                                </div>
                                    : <div className="p-1" >
                                        <h5 style={{ fontSize: '1.0em' }}>
                                            Link de voucher
                                        </h5>
                                        <input type="text" name="comprobante" id="comprobante"
                                            onChange={(e) => onhandelChange(e.target)} required
                                            className="form-control"
                                        />
                                        <span className=" text-danger">Tamaño Maximo de la imagen un  1MB</span>
                                    </div>
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

                                        }
                                        {
                                            comproba.banco == "transferencia" ? <button className=" btn btn-primary" >Reporte en transferencia </button> : ""
                                        }

                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </form> :
                            <form onSubmit={(e) => onSubmitT(e)} className="was-validated">
                                <div className=" p-1">
                                    <div className="d-none text-center"
                                    >
                                        <p style={{
                                            fontWeight: "bold"
                                        }}>Tiempo restante <span className=" text-danger"> {intervalo}</span> </p>

                                    </div>
                                    <h5 className=" font-weight-bold text-danger">Forma de Pago</h5>



                                    {clienteInfo() != null ?
                                        <select className="form-select" value={spiner} required
                                            onChange={(g) => setspiner(g.target.value)}
                                        >
                                            <option value={""} disabled></option>
                                            <option value={"Deposito"}>Deposito</option>
                                            <option value={"Transferencia"}>Transeferencia</option>

                                        </select> : <select className="form-select" value={spiner}
                                            onChange={(g) => setspiner(g.target.value)}>
                                            <option value={""} disabled></option>
                                            <option value={"Deposito"}>Deposito</option>
                                            <option value={"Transferencia"}>Transeferencia</option>

                                        </select>}
                                    <h5 className="mt-1" style={{ fontSize: "1.0em" }}>
                                        Selecione el banco al que realizó la transferencia
                                    </h5>
                                    {spiner != "Tarjeta" ? <select className="  form-select" required name="banco" value={comproba.banco} onChange={(g) => onhandelChange(g.target)} >
                                        <option value={""} disabled></option>
                                        <option value={"Pichincha"}>Banco Pichincha</option>
                                        <option value={"Guayaquil"}>Banco Guayaquil</option>
                                        <option value={"Produbanco"}>Banco Produbanco</option>
                                        <option value={"Pacifico"}>Banco Pacifico</option>
                                    </select> :
                                        <select className="  form-select" name="banco" required value={comproba.banco} onChange={(g) => onhandelChange(g.target)} >
                                            <option value={""} disabled></option>
                                            <option value={"Visa"}>Visa</option>

                                            <option value={"Master"}>Mastercar</option>
                                            <option value={"Diners"}>Diners club</option>
                                            <option value={"Discover"}>Discover</option>
                                            <option value={"America"}>America</option>
                                            <option value={"Alia"}>Alia</option>
                                        </select>}
                                </div>
                                {comproba.banco != "Efectivo" ? <div className=" p-1">
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        Ingrese el número de comprobante de la transferencia
                                    </h5>
                                    <input className=" form-control numero"
                                        name="numeroTransaccion"
                                        value={comproba.numeroTransaccion}
                                        minLength={4}
                                        required
                                        onChange={(e) => onhandelChange(e.target)}
                                        type={"text"}
                                    />
                                </div> :
                                    ""}
                                {comproba.banco == "Efectivo" || comproba.banco == "transferencia" ? <div className=" p-1">
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        Valor a Cobrar
                                    </h5>
                                    <input className=" form-control numero"
                                        id="valor"
                                        placeholder="Dato por definir"
                                        required
                                        type={"text"}
                                    />
                                </div> : ""}
                                {spiner != "Tarjeta" ? <div className="p-1" >
                                    <h5 style={{ fontSize: '1.0em' }}>
                                        Adjuntar Comprobante ( imagen jpg ó png)
                                    </h5>
                                    <input type="file" accept="image/*" name="comprobante" id="comprobante"
                                        required
                                        onChange={(e) => onChange(e.target)}
                                        className="form-control"
                                    />
                                    <span className=" text-danger">Tamaño Maximo de la imagen un  1MB</span>
                                </div>
                                    : <div className="p-1" >
                                        <h5 style={{ fontSize: '1.0em' }}>
                                            numero de lote
                                        </h5>
                                        <input type="text" name="comprobante" id="comprobante"
                                            required
                                            onChange={(e) => onhandelChange(e.target)}
                                            className="form-control"
                                        />
                                        <span className=" text-danger">Tamaño Maximo de la imagen un  1MB</span>
                                    </div>
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

                                        }
                                        {
                                            comproba.banco == "transferencia" ? <button className=" btn btn-primary" >Reporte en transferencia </button> : ""
                                        }

                                    </div>
                                    <div>
                                    </div>
                                </div>
                            </form>
                        }
                    </div>
                    <div className="col-12 text-center">
                        {clienteInfo() == null ? "" :
                            comproba.banco == "Efectivo" ? <button className=" btn btn-primary" onClick={confirmarefectivo}>Reporte en Efectivo </button> : ""
                        }
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

export default ModalConfima;