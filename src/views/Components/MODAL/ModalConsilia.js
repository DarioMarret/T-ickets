import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
import { TextField, InputLabel, InputAdornment, FormControl, OutlinedInput } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"
import { PhotoView } from "react-photo-view"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
import axios from "axios"
import { useHistory } from "react-router"
export const DatosConsolidar = async (parms) => {
    try {
        let { data } = await axios.post("https://brisana.netbot.ec/js/consolidar.php", parms)
        return data
    } catch (error) {
        return error
    }
}

export default function ConsiliarView() {
    let usedispatch = useDispatch()
    let history = useHistory()
    let [status, setEstatus] = useState(false)
    let props = useSelector(state => state.SuscritorSlice.modal)
    let user = clienteInfo()
    let [datos, setDatos] = useState({
        comprobante: "",
        imagen: "",
        Valor: "",
        banco: "",
        cuenta: "",
        metodo: "",
        id_registro: "",
        usuario: "",
        propietario: ""
    })
    function HandeChange(e) {
        // console.log(e.name, e.value)
        setDatos({
            ...datos,
            [e.name]: e.value
        })
    }
    async function guardarConsiliacion(e) {
        e.preventDefault()
        let parm = {
            usuario: user.id,
            comprobante: datos.comprobante,
            imagen: datos.imagen,
            Valor: datos.Valor,
            id_registro: props.estado.id,
            cuenta: datos.cuenta,
            banco: datos.banco,
            propietario: datos.propietario,
            metodo: datos.metodo
        }

        if (Object.values(parm).some(e => e == "")) {
            usedispatch(setToastes({ show: true, message: 'Faltan datos por completa', color: 'bg-danger', estado: 'Datos vacios' }))
            console.log(parm)
            return
        }
        else {
            setEstatus(true)
            console.log(parm)

            $.ajax({
                type: "POST",
                url: "https://brisana.netbot.ec/js/consolidar.php",
                data: { ...parm },
                success: function (success) {
                    
                    if (success.status) {
                         usedispatch(setModal({ nombre: "", estado: "" }))
                     
                        $.alert("" + JSON.stringify(success))
                    }
                    else {
                        //$.alert("" + JSON.stringify(success))
                        usedispatch(setToastes({ show: true, message: success.result, color: 'bg-warning', estado: 'Datos vacios' }))
                        setEstatus(false)
                    }
                },
                error: function (error) {
                    console.log(error)
                    setEstatus(false)
                }
            })
        }
    }
    useEffect(() => {
        setDatos({
            comprobante: props.estado.numerTransacion,
            imagen: props.estado.link_comprobante ? props.estado.link_comprobante : props.estado.link_pago,
            metodo: props.estado.forma_pago,
            Valor: props.estado.total_pago,
            banco: "",
            cuenta: "",
            id_registro: props.estado.id,
            usuario: user.id,
            propietario: ""
        })
        $(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header",
                scroll: false,
                containment: "#root",
            })
        })
    }, [props.nombre == "consiliacion" ? true : false])
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    return (
        <Modal
            show={(props.nombre == "consiliacion")}
        >
            <Modal.Header className=" py-3">
                <h5>
                    Consolidar Pago
                </h5>
                <button className="close" onClick={() => usedispatch(setModal({ nombre: "", estado: "" }))} >X</button>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <form className="was-validated">
                        <div className="p-1">
                            <h5 style={{
                                fontSize: '1.0em'
                            }} >
                                Forma de pago
                            </h5>
                            <select className=" form-select" value={datos.metodo} required
                                name="metodo"
                                id="metodo"
                                onChange={(e) => HandeChange(e.target)}>
                                <option value={""} disabled></option>
                                <option value={"Tarjeta"}>Tarjeta</option>
                                <option value={"Deposito"}>Deposito</option>
                            </select>
                        </div>
                        <div className="p-1" >
                            <h5 style={{ fontSize: '1.0em' }}>
                                Ingrese el número de comprobante o lote
                            </h5>
                            <input type="text" name="comprobante" id="comprobante"
                                value={datos.comprobante}
                                onChange={(e) => HandeChange(e.target)}
                                required
                                minLength={4}
                                className="form-control numero"
                            />
                        </div>
                        <div className=" p-1">
                            <h5 style={{ fontSize: '1.0em' }}>
                                link del comprobante o Pago
                            </h5>
                            <input className="form-control"
                                value={datos.imagen}
                                onChange={(e) => HandeChange(e.target)}
                                name="imagen"
                                required
                                type={"text"}
                            />
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 py-1">
                                {datos.metodo == "Deposito" ?<h5 style={{ fontSize: '1.0em' }}>
                                    Banco
                                </h5> : 
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Tarjeta
                                </h5>}
                                {datos.metodo == "Deposito" ? <select className=" form-control form-select" required
                                    value={datos.banco}
                                    name="banco"
                                    onChange={(e) => HandeChange(e.target)}
                                >
                                    <option value={""}></option>
                                    <option value="Pichincha" >Pichincha</option>
                                    <option value="Produbanco" >Produbanco</option>
                                    <option value="Pacifico" >Pacifico</option>
                                    <option value="Guayaquil" >Pacifico</option>
                                </select> :
                                    <select className=" form-control form-select" required
                                        value={datos.banco}
                                        name="banco"
                                        onChange={(e) => HandeChange(e.target)}
                                    >
                                        <option value={""}></option>
                                        <option value="Visa" >Visa</option>
                                        <option value="Master card" >Master card</option>
                                        <option value="Alias" >Alias</option>
                                        <option value="Guayaquil" >Pacifico</option>
                                    </select>}
                            </div>
                            <div className="col-12 col-md-6  py-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Monto del Pago
                                </h5>
                                <input className=" form-control numero"
                                    name="Valor"
                                    value={datos.Valor}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="Valor"
                                    required
                                    type={"text"}
                                />
                            </div>
                        </div>
                        <div className="py-1">
                            <h5 style={{ fontSize: '1.0em' }}>
                                Numero del Cuenta
                            </h5>
                            <input className=" form-control numero"
                                value={datos.cuenta}
                                name="cuenta"
                                id="cuenta"
                                onChange={(e) => HandeChange(e.target)}
                                minLength={5}
                                required
                                type={"text"}
                            />
                        </div>
                        <div className="py-1">
                            <h5 style={{ fontSize: '1.0em' }}>
                                propietario
                            </h5>
                            <input className=" form-control "
                                name="propietario"
                                value={datos.propietario}
                                id="propietario"
                                onChange={(e) => HandeChange(e.target)}
                                minLength={5}
                                required
                                type={"text"}
                            />
                        </div>

                        <div className=" container-fluid px-0 py-2 text-end">
                            <button className="btn btn-default-su"
                                disabled={status}
                                onClick={guardarConsiliacion}> CONSOLIDAR </button>
                        </div>


                    </form>
                </div>

            </Modal.Body>

        </Modal>
    )
}