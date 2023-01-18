import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, Typography,Tab } from '@mui/material';
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
import { ticketsboletos } from "utils/columnasub";
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

    const hideAlert = () => {
        setAlert(null)
    }
    function abriremitir(e) {
        usedispatch(setModal({ nombre: "Emitir", estado: e }))
    }
    function Aprobar(e) {
        console.log(e)
        usedispatch(setModal({ nombre: "boleto", estado: e }))
    }
    useEffect(() => {
        AprobarTiket().then(oupt => {
            console.log(oupt)
            let datos = oupt.data
            let nuevo = datos.map((e) => {
                e.uid = e.codigoEvento + "-" + e.cedula
                return e 
            })
            setTikes([...nuevo])            
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
            {showmodal.nombre == "Emitir" ?
                <EmitirmodlView /> : ""
            }
            {showmodal.nombre == "boleto" ? <ModalBoletoApro /> : ""}
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
                        columns={ticketsboletos}
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

                            <div className="row  border-bottom pb-1 align-items-center  rounded-1" >
                                {row.original.cedido=="NO"? <div className="col-sm  d-flex align-items-center   btn-group">
                                    <button className="btn btn-danger btn-sm"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                       
                                        title="edit"
                                        onClick={() => Aprobar(row.original)}
                                    >
                                        <i className=" fa fa-edit  fa-xs" ></i> opciones por definir?
                                    </button>
                                    <button className="btn  btn-success btn-sm"
                                        data-bs-toggle="tooltip"
                                        disabled={true}
                                        data-bs-placement="top"
                                        title="Emitir"
                                        onClick={() => abriremitir(row.original)}
                                    > <i className="fa fa-paper-plane fa-xs"></i> opciones por definir? </button>
                                    

                                </div>:""}
                                <div className="col-sm ">
                                  
                                    boleto   {row.original.sillas}
                                </div>

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

