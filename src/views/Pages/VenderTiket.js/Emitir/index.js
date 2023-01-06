import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send, CheckBox } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";

import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import { EventosporAprobar } from "utils/ColumnTabla";
import { ticketproceso } from "utils/columnasub";
import { AprobarTiket } from "utils/Querycomnet";
import { bancos } from "utils/Imgenesutils";
import { ticketprocesoapro } from "utils/columnasub";
import moment from "moment";
import { Form } from "react-bootstrap";
import EmitirmodlView from "./ModalEmitir/Modalconsolidar";
import ModalBoletoApro from "../Aprobar/Modalboleto";
let { cedericon } = bancos
export default function EmitirboView() {
    let usedispatch = useDispatch()
    let showmodal = useSelector((state) => state.SuscritorSlice.modal)
    const [data, setData] = React.useState([]);
    const [tiketslist, setTikes] = useState([])
    const [selecions, setselcion] = useState({

    })
    const [alert, setAlert] = useState(null)
    const abrirceder = (e) => { 
        usedispatch(setModal({ nombre: 'ceder', estado: e })),
         hideAlert() 
    }
    

    const successAlert = (e) => {

        setAlert(
            <SweetAlert
                info
                style={{ display: "block", marginTop: "-100px" }}
                title={"Estas Seguro?"}
                onConfirm={() => abrirceder(e)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                closeOnClickOutside={false}
                confirmBtnText="Si, Ceder"
                cancelBtnText="Cancelar"

                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                <div className="d-flex flex-row justify-content-center text-center">
                    <div className="d-flex">
                        <h4 style={{ fontSize: '0.9em' }} >
                            Desea ceder este boleto a otro usuario</h4>
                    </div>
                </div>
            </SweetAlert>
        );
    };
    function selecion(cod, seleccionado) {
        let info = data
        if (info.some(e => e.uid == cod)) {
            if (info.some(g => g.sillas === seleccionado.sillas)) {
                let nuevo = selecions
                setData(info.filter(h => h.sillas != seleccionado.sillas))
            } else {
                info.push({ ...seleccionado })
                setselcion({
                    ...selecions,
                    [seleccionado.sillas]: true
                })
                setData(info)
            }
        } else {
            setselcion({})
            let datos = info.filter(f => f.ui == cod)
            datos.push({ ...seleccionado })
            setData(datos)
            setselcion({ [seleccionado.sillas]: true })
        }

    }
    const hideAlert = () => {
        setAlert(null)
    }
    function abriremitir(e){       
        usedispatch(setModal({ nombre:"Emitir",estado:e}))
    }
    function Aprobar(e){
        console.log(e)
        usedispatch(setModal({ nombre: "boleto", estado: e }))
    }
    useEffect(() => {
        AprobarTiket().then(oupt => {
            let datos = oupt.data.filter(e => moment(new Date(), "YYYY-MM-DD HH:mm:ss").diff(moment(e.fechaCreacion, "YYYY-MM-DD HH:mm:ss"), 'h') < 2 && e.estado === "reservado")
            let nuevo = datos.map((e) => {
                e.uid = e.codigoEvento + "-" + e.cedula
                return e
            })
            let nuevogrupo = []
            nuevo.forEach(element => {
                if (!nuevogrupo.some(e => e.uid == element.uid)) {
                    nuevogrupo.push({
                        codigoEvento: element.codigoEvento,
                        concierto: element.concierto,
                        cedula: element.cedula,
                        estado: element.estado,
                        valor: element.valor,

                        fechaCreacion: element.fechaCreacion,
                        tokenPago: element.tokenPago,
                        uid: element.uid,
                        detalle: []
                    })
                }
            });
            nuevogrupo.length > 0 ? nuevo.map((elm, idex) => {
                let index = nuevogrupo.findIndex(f => f.uid == elm.uid)
                let fecha = elm.fechaCreacion
                if (!nuevogrupo[index].detalle.some(h => h.sillas === elm.sillas)) {
                    nuevogrupo[index].detalle.push({
                        sillas: elm.sillas,
                        localidad: elm.localidad, fechaCreacion: fecha,
                        cedula: elm.cedula,
                        tokenPago: elm.tokenPago,
                        estado: elm.estado,
                        uid: elm.uid,
                        valor: elm.valor, codigoEvento: elm.codigoEvento,
                    })
                }
            }) : ''

            setTikes([...nuevogrupo])
        }).catch(err => {
            console.log(err)
        })
    },
        [])
    function suma() {
        let tikets = data.map((f) => { return parseFloat(f.valor) })
        try {
            let valo = tikets.reduce((a, b) => a + b, 0).toFixed(2)
            return valo

        } catch (error) {
            console.log(error)

        }

    }
    return (
        <>
            {alert}
            {showmodal.nombre=="Emitir"? 
            <EmitirmodlView/>:""
            }
            {showmodal.nombre =="boleto" ?<ModalBoletoApro/>:""}
            <div className="card card-primary card-outline text-left " style={{ minHeight: '250px' }} >
                <div className="card-header pb-2">
                    Emitir boleto
                </div>
                <div className="row px-3">
                    <div className="col-10 text-end  ">
                        <div className="">
                            {data.length > 0 ? "$" + suma() : ''}
                        </div>


                    </div>
                    <div className="col-sm ">
                        {data.length > 0 ? <button className="btn btn-success"> Pagar</button> : ''}
                    </div>

                </div>
                <div className="card-body table-responsive">
                    <MaterialReactTable
                        columns={ticketprocesoapro}
                        data={tiketslist}
                        muiTableProps={{
                            sx: {
                                tableLayout: 'flex'
                            }
                        }}
                        muiTableBodyProps={{
                            sx: { columnVisibility: { nombre: false } }
                        }}
                        renderDetailPanel={({ row }) => (
                            <div className=" ">
                                {row.original.detalle ? row.original.detalle.map((e, i) => {
                                    return (
                                        <div className="row  border-bottom pb-1 align-items-center  rounded-1" key={"cons" + i}>
                                            <div className="col-sm d-none">
                                                <div className=" text-center">
                                                    <label className="form-check-label" >
                                                    </label>
                                                    <input className="form-check-input" type="checkbox" name={e.sillas}
                                                        checked={data.some(f => f.sillas == e.sillas)}
                                                        onChange={() => selecion(e.uid, e)}
                                                        id="flexCheckIndeterminate" />
                                                </div>
                                            </div>
                                            <div className="col-sm  d-flex align-items-center   btn-group">                                                
                                                <button className="btn  btn-success btn-sm"
                                                    data-bs-toggle="tooltip" 
                                                    data-bs-placement="top" 
                                                    title="Emitir"
                                                    onClick={() => abriremitir(e)}
                                                > <i className="fa fa-paper-plane fa-xs"></i> </button>
                                                <button className="btn btn-danger btn-sm"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Aprobar"
                                                    onClick={() => Aprobar(e)}
                                                >
                                                    <i className=" fa fa-edit  fa-xs" ></i>
                                                </button>

                                            </div>
                                            <div className="col-2 col-md-2 ">
                                                boleto   {e.sillas}
                                            </div>
                                            <div className="col-2 col-md-3">
                                                Localidad:  {e.localidad}
                                            </div>
                                            <div className="col-sm">
                                                ${e.valor}
                                            </div>

                                            <div className="col-sm col-md-3">
                                                {e.fechaCreacion}
                                            </div>
                                            <div className="col-sm">
                                                {row.original.codigoEvento}
                                            </div>
                                            <div className=" col-sm">
                                                {row.original.estado}
                                            </div>
                                        </div>
                                    )
                                }) : ''}

                            </div>
                        )}
                        positionToolbarAlertBanner="bottom"
                        displayColumnDefOptions={{
                            'mrt-row-numbers': {
                                enableHiding: true,
                            },
                        }}
                        localization={MRT_Localization_ES}
                    />
                </div>
            </div>
        </>
    );
}

