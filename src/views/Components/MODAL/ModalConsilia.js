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
import { buscarcliente } from "utils/Querypanelsigui"
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
       
        Valor: "",
        banco: "",
        cuenta: "",
        metodo: "",

        usuario: "",
        propietario: "",
        

        lote: "",
        autorizacion: "",
        total: "",
        base: "",
        valor_pagado: "",
        retencion: "",
        comision: "",
        comision_sin_iva: "",
        emision_boleto: "",
        total_sin_emision: "",
        transmitter: ""

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
                cuenta: "2100106995"
            })
        }
        if (e.name == "banco" && e.value == "Pacifico") {

            setDatos({
                ...datos,
                banco: "Pacifico",
                cuenta: "8069530"
            })

        }
        if (e.name == "banco" && e.value == "Produbanco") {
            setDatos({
                ...datos,
                banco: "Produbanco",
                cuenta: "1058194005"
            })
        }
        if (e.name == "banco" && e.value == "Guayaquil") {
            setDatos({
                ...datos,
                banco: "Guayaquil",
                cuenta: "18018624"
            })
        }
        if (e.name == "banco" && e.value =="PACIFICARD" ){
            setDatos({
                ...datos,               
                cuenta: "18018624"
            })
        }
        if (e.name == "banco" && e.value == "DINERS CLUB") {
            setDatos({
                ...datos,
                cuenta: "18018624"
            })
        }
        if (e.name == "banco" && e.value == "BANCO GUAYAQUIL") {
            setDatos({
                ...datos,
                cuenta: "18018624"
            })
        }
        if (e.name == "banco" && e.value == "Efectivo") {
            setDatos({
                ...datos,
                banco: "Efectivo",
                cuenta: "efectivo"
            })
        }
        

    }

    function ConsolidarCompra() {
        const reporte =
        {
            "id_registraCompra": props.estado.id_registro,
            "estado": "Consolidado"
        }
        ConsolidarReporte(reporte).then(ouput => {
            if (ouput.success) {
                usedispatch(setModal({ nombre: "", estado: "" }))
                let informacion = {
                    "cedula": props.estado.cedula,
                    "email": ""
                }
                console.log(reporte)
                buscarcliente({ ...informacion }).then(oupt => {                   
                    console.log(informacion)
                    if (oupt.data.nombreCompleto != undefined && oupt.data.nombreCompleto != null) {                        
                        sessionStorage.setItem("Suscritorid", JSON.stringify(oupt.data))
                        history.push("/admin/suscritor/" + oupt.data.id + "")
                    }
                    else {

                        usedispatch(setToastes({
                            show: true,
                            message: 'Hubo un error',
                            color: 'bg-danger', estado: 'Hubo un error'
                        }))
                       // history.goBack()
                    }

                }

                ).catch(err => {
                    usedispatch(setToastes({
                        show: true,
                        message: 'Usuario no encontrado ',
                        color: 'bg-danger', estado: 'Hubo un error'
                    }))
                    console.log(err)
                })

                return
            }
            $.alert("No se registro")
        }).catch(err => {
        })
    }
    async function guardarConsiliacion(e) {
        e.preventDefault()

        /**
         * forma de pago cuando es tarjeta automaticamente pacifico
         * lote
         * autorizacion
         * total 
         * base
         * valor pagado 
         * retencion fuente
         * comision
         * comision iva
         * 
         *
         *  let parms = {
            id_operador: clienteInfo().id,
            id_registro: props.estado.id,
            banco: datos.banco,
            tarjeta:
            cuenta: datos.comprobante,
            total_pagado: datos.Valor,           
            lote:
            autorizacion:
            total:tarjeta
            base:
            valor_pagado;
            retencion:
            comision:
            comision_sin_iva;
            emision_boleto:
            total_sin_emision:
            evento:
            forma_pago: props.estado.forma_pago
        }
         */
        let parms = {
            id_operador: clienteInfo().id,
            id_registro: props.estado.id_registro,
            banco: datos.banco,
            cuenta: datos.cuenta,
            total_pagado: datos.Valor,
            evento:props.estado.concierto,
            banco: datos.banco,
            forma_pago: props.estado.forma_pago
        }
        console.log(parms)
      
        if (Object.values(parms).some(e => e == "")) {
            usedispatch(setToastes({ show: true, message: 'Faltan datos por completa', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        else {
            setEstatus(true)
            console.log(parms)
            Consiliarcompra({...parms,...datos}).then(salida => {
                setEstatus(false)
                console.log(salida)
                if (salida.message =="Consolidado guardado") {
                    ConsolidarCompra()
                }
            }).cath(err => {
                setEstatus(false)
                console.log(err)
            })
        }
    }
    async function Actualizarconcilicacion(e) {
        e.preventDefault()
        let parms = {
            id_operador: clienteInfo().id,
            id_registro: props.estado.id_registro,
            banco: datos.banco,
            cuenta: datos.cuenta,
            total_pagado: datos.Valor,
            evento: props.estado.concierto,
            forma_pago: props.estado.forma_pago,
            
        }
        console.log({...parms, ...datos})
        if (Object.values(parms).some(e => e == "")) {
            usedispatch(setToastes({ show: true, message: 'Faltan datos por completa', color: 'bg-danger', estado: 'Datos vacios' }))
            return
        }
        else {
            setEstatus(true)
            //console.log(parms, ...datos)
            ActualizaConciliacion({ ...parms, ...datos }, props.estado.id).then(salida => {
                setEstatus(false)
                console.log(salida)
                if (salida) {
                   // history.goBack()
                }
            }).cath(err => {
                setEstatus(false)
                console.log(err)
            })
        }
    }

    useEffect(() => {
        console.log(props)
        if (props.estado.forma_pago == "Deposito" && props.nombre == "actconsiliacion") {
            let valor = parseFloat(props.estado.total_pagado) 
            console.log(valor.toFixed(2))
            setDatos({
                ...datos,
                banco: props.estado.banco,
                cuenta: props.estado.cuenta,
                metodo: "",
              
                Valor: parseFloat(valor.toFixed(2))

            })
          
        }
        if (props.estado.forma_pago == "Deposito" && props.nombre == "consiliacion") {
            let valor = parseFloat(props.estado.total_pago) / 1.08
            console.log(valor.toFixed(2))
            //console.log(props)
            setDatos({
                ...datos,
                Valor: valor.toFixed(2)

            })
           
        }
        if (props.estado.forma_pago == "Tarjeta" && props.nombre == "consiliacion") {
            let valor = parseFloat(props.estado.total_pago)
            setDatos({
               
                ...datos,
                banco: "Pacifico",
                cuenta: "8069530",
                autorizacion: props.estado.auth_code,
                lote: props.estado.batch,
                tarjeta: props.estado.transmitter,
                
                Valor: valor.toFixed(2)
            })
            // console.log(valor)
            
        }
       if (props.estado.forma_pago == "Tarjeta" && props.nombre == "actconsiliacion") {
           let valor = parseFloat(props.estado.total_pagado) 
              setDatos({
                  cuenta: props.estado.cuenta,
                  autorizacion: props.estado.auth_code,
                 lote: props.estado.batch,
                  tarjeta: props.estado.transmitter,
                  banco: props.estado.banco,                 
                  ...datos,
                  Valor: valor.toFixed(2)
  
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
            size="lg"
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
                        
                        <div className="row">
                            <div className="col-6 py-1">
                                <h5 style={{
                                    fontSize: '1.0em'
                                }} >
                                   {props.estado.forma_pago!="Tarjeta" ?"Banco":" Banco adquiriente"}
                                </h5>

                                <select className=" form-select" value={datos.banco} required
                                    name="banco"
                                    id="banco"
                                    onChange={(e) => HandeChange(e.target)}>
                                    <option value={""} disabled></option>
                                    <option value={"Pichincha"}>Pichincha</option>
                                    <option value={"Produbanco"}>Produbanco</option>
                                    <option value={"Guayaquil"}>Guayaquil</option>
                                    <option value={"Pacifico"}>Pacífico</option>
                                    <option value={"Efectivo"}>Efectivo</option>
                                    <option value={"BANCO GUAYAQUIL"}>BANCO GUAYAQUIL</option>
                                    <option value={"DINERS CLUB"}>DINERS CLUB</option>
                                    <option value={"PACIFICARD"}>DINERS CLUB</option>
                                </select>
                            </div>
                            <div className="col-6 py-1">
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
                        <div className="p-1" >
                            {
                                props.estado.forma_pago == "Tarjeta" ? "" : <h5 style={{ fontSize: '1.0em' }}>
                                Cuenta
                            </h5> }                            
                                <select className=" d-none form-select" value={datos.cuenta} required
                                    name="cuenta"
                                    id="cuenta"
                                >
                                    <option value={""} disabled></option>
                                    <option value={"2100106995"}>2100106995</option>
                                    <option value={"8069530"}>8069530</option>
                                    <option value={"1058194005"}>1058194005</option>
                                    <option value={"18018624"}>18018624</option>
                                <option value={"efectivo"}>efectivo</option>
                                </select>
                        </div>
                        
                        {props.estado.forma_pago == "Deposito" || props.estado.forma_pago == "Efectivo-Local" ? "" : <div className="form-row">
                            <div className="form-group col-md-6">
                                <label >lote</label>
                                <input type="" className="form-control"
                                    value={datos.lote}
                                    onChange={(e) => HandeChange(e.target)}
                                    name="lote" id="lote" placeholder="lote" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="">Autorización</label>
                                <input type="" className="form-control"
                                    value={datos.autorizacion}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="autorizacion" name="autorizacion" placeholder="autorizacion" />
                            </div>
                        </div>}
                        {props.estado.forma_pago == "Deposito" || props.estado.forma_pago =="Efectivo-Local" ? "" : <div className="form-row">
                            <div className="form-group col-md-6">
                                <label >Tarjeta</label>
                                <input type=""
                                    value={datos.tarjeta}
                                    onChange={(e) => HandeChange(e.target)}
                                    className="form-control" name="tarjeta" id="tarjeta" placeholder="tarjeta" />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Base</label>
                                <input type="" className="form-control"
                                    value={datos.base}
                                    onChange={(e) => HandeChange(e.target)}
                                    name="base" id="base" placeholder="base" />


                            </div>
                        </div>}
                        {props.estado.forma_pago == "Deposito" || props.estado.forma_pago == "Efectivo-Local" ? "" : <div className="form-row">
                            <div className="form-group col-md-6">

                                <label >Comision iva T/C</label>
                                <input type="" className="form-control"
                                    value={datos.comision_sin_iva}
                                    onChange={(e) => HandeChange(e.target)}
                                    name="comision_sin_iva" id="comision_sin_iva" placeholder="Comision iva" />

                            </div>
                            <div className="form-group col-md-6">
                                <label for="">Valor Pagado T/C</label>
                                <input type="" className="form-control"
                                    value={datos.valor_pagado}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="valor_pagado" name="valor_pagado" placeholder="valor_pagado" />
                            </div>
                        </div>}
                        {props.estado.forma_pago == "Deposito" || props.estado.forma_pago == "Efectivo-Local" ? "" : <div className="form-row">
                            <div className="form-group col-md-6">
                                <label >Retencion T/C</label>
                                <input type="" className="form-control" name="retencion"
                                    value={datos.retencion}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="retencion" placeholder="retencion" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="">comision T/C</label>
                                <input type="" className="form-control"
                                    value={datos.comision}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="comision" name="comision" placeholder="comision" />
                            </div>
                        </div>}
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="">Total de compra sin emision</label>
                                <input type="" className="form-control"
                                    value={datos.total_sin_emision}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="total_sin_emision" name="total_sin_emision" placeholder="Total base" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="">Emision boleto</label>
                                <input type="" className="form-control"
                                    value={datos.emision_boleto}
                                    onChange={(e) => HandeChange(e.target)}
                                    id="emision_boleto" name="emision_boleto" placeholder="Total de emisión" />
                            </div>
                            
                        </div>
                        {props.nombre != "actconsiliacion" ?
                            <div className=" container-fluid px-0 py-2 text-end">
                                <button className="btn btn-default-su"
                                    disabled={status}
                                    onClick={guardarConsiliacion}> CONSOLIDAR </button>
                            </div> :
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