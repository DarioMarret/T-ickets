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
import { Consiliarcompra } from "utils/pagos/Queripagos"
import { ConsolidarReporte } from "utils/pagos/Queripagos"
import { ActualizaConciliacion } from "utils/pagos/Queripagos"
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
        id:"",
        comprobante: "",
        imagen: "",
        Valor: "",
        banco: "",
        cuenta: "",
        metodo: "",
        id_registro: "",
        usuario: "",
        propietario: "",
        forma_pago: ""
    })
    function HandeChange(e) {
        setDatos({
            ...datos,
            [e.name]: e.value
        })
        if (e.name == "banco" && e.value == "Pichincha") {
            setDatos({
                ...datos,
                banco: "Pichincha",
                comprobante: "2100106995"
            })
        }
        if (e.name == "banco" && e.value == "Pacifico") {

            setDatos({
                ...datos,
                banco: "Pacifico",
                comprobante: "8069530"
            })

        }
        if (e.name == "banco" && e.value == "Produbanco") {
            setDatos({
                ...datos,
                banco: "Produbanco",
                comprobante: "1058194005"
            })
        }
        if (e.name == "banco" && e.value == "Guayaquil") {
            setDatos({
                ...datos,
                banco: "Guayaquil",
                comprobante: "18018624"
            })
        }

    }

    function ConsolidarCompra() {
        const reporte =
        {
            "id_registraCompra": props.estado.id,
            "estado": "Consolidado"
        }
        ConsolidarReporte(reporte).then(ouput => {
            if (ouput.success) {
                usedispatch(setModal({ nombre: "", estado: "" }))
                history.goBack()
                return
            }
            $.alert("No se registro")
        }).catch(err => {
        })
    }
    async function guardarConsiliacion(e) {
        e.preventDefault()
        let parms = {
            id_operador: clienteInfo().id,
            id_registro: props.estado.id,
            banco: datos.banco,
            cuenta: datos.comprobante,
            total_pagado: datos.Valor,
            banco: datos.banco,
            forma_pago: props.estado.forma_pago
        }
        if (Object.values(parms).some(e => e == "")) {
            usedispatch(setToastes({ show: true, message: 'Faltan datos por completa', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        else {
            setEstatus(true)
            console.log(parms)
            Consiliarcompra(parms).then(salida => {
                setEstatus(false)
                console.log(salida)
                if (salida) {
                    ConsolidarCompra()
                    

                }
            }).cath(err => {
                setEstatus(false)
                console.log(err)
            })
        }
    }
    async function Actualizarconcilicacion(e){
        e.preventDefault()
        let parms = {
            id_operador: clienteInfo().id,
            id_registro: props.estado.id_registro,
            banco: datos.banco,
            cuenta: datos.comprobante,
            total_pagado: datos.Valor,           
            forma_pago: props.estado.forma_pago
        }
        if (Object.values(parms).some(e => e == "")) {
            usedispatch(setToastes({ show: true, message: 'Faltan datos por completa', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        else {
            setEstatus(true)
            console.log(parms)
            ActualizaConciliacion(parms,props.estado.id).then(salida => {
                setEstatus(false)
                console.log(salida)
                if (salida) {
                    history.goBack()
                 //   ConsolidarCompra()

                }
            }).cath(err => {
                setEstatus(false)
                console.log(err)
            })
        }
    }

    useEffect(() => {
        console.log(props)
        if (props.estado.forma_pago == "Deposito" && props.nombre != "actconsiliacion") {
            let valor = parseFloat(props.estado.total_pago) / 1.07
            //console.log(props)
            setDatos({
                comprobante: "",
                imagen: "",               
                banco: "",
                cuenta: "",
                metodo: "",
                id_registro: "",
                usuario: "",
                propietario: "",
                forma_pago: "",
                Valor: valor.toFixed(2)

            })
        }
        if (props.estado.forma_pago == "Deposito" && props.nombre == "actconsiliacion") {
            let valor = parseFloat(props.estado.total_pagado) 
            //console.log(props)
            setDatos({
                comprobante: props.estado.cuenta,
                imagen: "",
                banco: props.estado.banco,
                cuenta: props.estado.cuenta,
                metodo: "",
                id_registro: "",
                usuario: "",
                propietario: "",
                forma_pago: "",
                Valor: valor.toFixed(2)

            })
        }
        if (props.estado.forma_pago == "Tarjeta" && props.nombre == "actconsiliacion") {
            //let valor = parseFloat(props.total_pago) / 1.07
            setDatos({
                comprobante: props.estado.cuenta,
                imagen: "",
                banco: props.estado.banco,
                cuenta: props.estado.cuenta,
                metodo: "",
                id_registro: "",
                usuario: "",
                propietario: "",
                forma_pago: "",
                Valor: parseFloat(props.estado.total_pagado).toFixed(2)

            })
        }
        if (props.estado.forma_pago == "Tarjeta" && props.nombre == "actconsiliacion") {
            //let valor = parseFloat(props.total_pago) / 1.07
            setDatos({
                comprobante: props.estado.cuenta,
                imagen: "",
                banco: props.estado.forma_pago,
                cuenta: "",
                metodo: "",
                id_registro: "",
                usuario: "",
                propietario: "",
                forma_pago: "",
                Valor: parseFloat(props.estado.total_pago).toFixed(2)

            })
        }
        $(document).ready(function () {
            $(".modal-content").draggable({
                handle: ".modal-header",
                scroll: false,
                containment: "#root",
            })
        })
    }, [props.nombre == "consiliacion" ? true : false || props.nombre == "actconsiliacion" ? true : false])
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789x".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    return (
        <Modal
            show={(props.nombre == "consiliacion" || props.nombre == "actconsiliacion" ? true : false)}
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
                                Banco o Tarjeta
                            </h5>
                            {props.estado.forma_pago == "Tarjeta" ?
                                <select className=" form-select" value={datos.banco} required
                                    name="banco"
                                    id="banco"
                                    onChange={(e) => HandeChange(e.target)}>
                                    <option value={""} disabled></option>
                                    <option value={"Visa"}>Visa</option>
                                    <option value={"Discover"}>Discover</option>
                                    <option value={"Alias"}>Alias</option>
                                    <option value={"Diners"}>Diners</option>
                                    <option value={"Mastercar"}>Mastercar</option>
                                </select>
                                :
                                <select className=" form-select" value={datos.banco} required
                                    name="banco"
                                    id="banco"
                                    onChange={(e) => HandeChange(e.target)}>
                                    <option value={""} disabled></option>
                                    <option value={"Pichincha"}>Pichincha</option>
                                    <option value={"Produbanco"}>Produbanco</option>
                                    <option value={"Guayaquil"}>Guayaquil</option>
                                    <option value={"Pacífico"}>Pacífico</option>
                                </select>}
                        </div>
                        <div className="p-1" >
                            <h5 style={{ fontSize: '1.0em' }}>
                                Cuenta o Tarjeta
                            </h5>
                            {/**
                             * const cuentas = {
        "pichincha": "2100106995",
        "pacifico": "8069530",
        "produbanco": "1058194005",
        "guayaquil": "18018624"
    }
                             */}
                            {props.estado.forma_pago == "Deposito" ?
                                <select className=" form-select" value={datos.comprobante} required
                                    name="comprobante"
                                    id="comprobante"
                                >
                                    <option value={""} disabled></option>
                                    <option value={"2100106995"}>2100106995</option>
                                    <option value={"8069530"}>8069530</option>
                                    <option value={"1058194005"}>1058194005</option>
                                    <option value={"18018624"}>18018624</option>
                                </select> :
                                <input type="text" name="comprobante" id="comprobante"
                                    value={datos.comprobante}
                                    onChange={(e) => HandeChange(e.target)}
                                    required
                                    minLength={4}
                                    className="form-control numero"
                                />}
                        </div>
                        <div className="row">
                            <div className="col-12 py-1">
                                <h5 style={{ fontSize: '1.0em' }}>
                                    Monto del Pago
                                </h5>
                                <input className="form-control numero"
                                    name="Valor"
                                    value={datos.Valor}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="Valor"
                                    required
                                    type={"text"}
                                />
                            </div>
                        </div>
                        {props.nombre != "actconsiliacion"? 
                        <div className=" container-fluid px-0 py-2 text-end">
                            <button className="btn btn-default-su"
                                disabled={status}
                                onClick={guardarConsiliacion}> CONSOLIDAR </button>
                        </div>:
                            <div className=" container-fluid px-0 py-2 text-end">
                                <button className="btn btn-default-su"
                                    disabled={status}
                                    onClick={Actualizarconcilicacion}> Actualizar </button>
                            </div>
                        }


                    </form>
                </div>

            </Modal.Body>

        </Modal>
    )
}