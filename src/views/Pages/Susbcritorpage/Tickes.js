import React, { useEffect, useRef, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";
import { QRCodeCanvas } from 'qrcode.react';
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import { columnsTicket } from "utils/ColumnTabla";
import TableWiev from "./TableFunc.js"
import { buscarcliente } from "utils/Querypanelsigui.js";
import { ListarTikets } from "utils/Querypanel.js";
import CederView from "./Modal/CederView.js";
import ToastViews from "views/Components/TOAST/toast.js";
import { Listarticketporestado } from "utils/userQuery.js";
import { ticketproceso } from "utils/columnasub.js";
import { bancos } from "utils/Imgenesutils.js";
import ModalReporteViews from "views/Components/MODAL/ReportarPago.js";
import moment from "moment";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag.js";
let { cedericon } = bancos
function Example() {
    let usedispatch = useDispatch()
    const [tiketslist, setTikes] = useState([])
    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const [alert, setAlert] = useState(null)
    const abrirceder = (e) => { usedispatch(setModal({ nombre: 'ceder', estado: e })), hideAlert() }
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

    const hideAlert = () => {
        setAlert(null)
    }

    function Pagar() {
        let valor = Object.keys(rowSelection).length > 0 ? tiketslist.find(e => e.codigoEvento == Object.keys(rowSelection)[0]).detalle :  ''
        
        console.log(valor)
    }
    useEffect(() => {
        let user = getDatosUsuariosLocalStorag()
        Listarticketporestado(user.cedula).then(ouput => {
            let nuevogrupo = []
            console.log(ouput)
            ouput.data.forEach(element => {
                if (!nuevogrupo.some(e => e.codigoEvento == element.codigoEvento)) {
                    //console.log(!nuevogrupo.some(e => e.codigoEvento == element.codigoEvento))
                    let filtro = ouput.data.filter(e => e.codigoEvento == element.codigoEvento)
                    nuevogrupo.push({
                        codigoEvento: element.codigoEvento,
                        concierto: element.concierto,
                        estado: element.estado,
                        valor: element.valor,
                        cedula: element.cedula,
                        fechaCreacion: element.fechaCreacion,
                        tokenPago: element.tokenPago,
                        detalle: []
                    })
                }

            });           
            nuevogrupo.length > 0 ? ouput.data.map((elm, idex) => {
                let index = nuevogrupo.findIndex(f => f.codigoEvento == elm.codigoEvento)
                let fecha = elm.fechaCreacion
                console.log(elm.fechaCreacion)
                nuevogrupo[index].detalle.push({
                    sillas: elm.sillas,
                    localidad: elm.localidad, fechaCreacion: fecha,
                    cedula: elm.cedula,
                    tokenPago: elm.tokenPago,
                    estado: elm.estado,
                    valor: elm.valor, codigoEvento: elm.codigoEvento,
                })              
            }) : ''
            console.log(nuevogrupo.length)
            setTikes([...nuevogrupo])

        }).catch(err => console.log(err))
    },
        [])
    /*
      console.log(
        Object.keys(rowSelection).map((g, i) => { return parseFloat(tiketslist.find(e => e.id == g).valor) }).reduce((a, b) => a + b, 0).toFixed(2)
      )*/
    console.log(Object.keys(rowSelection).map((g) => { return tiketslist.find(e => e.codigoEvento == g).detalle }))
   // console.log(Object.keys(rowSelection))
  ////  console.log(Object.keys(rowSelection).length > 0 ? suma(Object.keys(rowSelection)[0]):'')
        function suma (item){
         let tikets=   tiketslist.find(e => e.codigoEvento == item).detalle.map((f) => { return parseFloat( f.valor) })
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
            <CederView />
            <ModalReporteViews />
            <div className="card card-primary card-outline text-left " style={{ minHeight: '250px' }} >
                <div className="card-header pb-2">
                    Tikets
                </div>
                <div className="card-body table-responsive">
                    <MaterialReactTable
                        columns={ticketproceso}
                        data={tiketslist.sort(e => e.fechaCreacion)}
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
                                        <div className="row  border-bottom  align-items-center  rounded-1" key={"cons"+i}>
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
                                            <div className="col-sm">
                                                <Tooltip title="Ceder ticket" placement="top-start">
                                                    <IconButton
                                                        color='success'
                                                        onClick={() => successAlert(e.id)}
                                                    >
                                                        <img src={cedericon}
                                                            style={
                                                                {
                                                                    height: 30
                                                                }
                                                            }
                                                        />
                                                    </IconButton>
                                                </Tooltip>

                                            </div>
                                        </div>
                                    )
                                }) : ''}
                                
                            </div>
                        )}
                        enableSelectAll={false}
                        enableMultiRowSelection={false}
                        enableRowSelection

                        enableRowActions
                        positionActionsColumn="last"
                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex' }}>
                                {row.original.estado != "reservado" ? <Tooltip className="" title="Ver Ticket" placement="top">
                                    <IconButton
                                        color="success"
                                        arial-label="Enviar"
                                    >
                                        <a href={row.original.link}
                                            target="_blank"
                                        >
                                            <FileDownload />
                                        </a>
                                    </IconButton>
                                </Tooltip> : ''}
                                <Tooltip title="Borrar" placement="top">
                                    <IconButton
                                        color="error"
                                        aria-label="Bloquear">
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                                {row.original.estado != "reservado" ? <Tooltip title="Ceder ticket" placement="top-start">
                                    <IconButton
                                        color='success'
                                        onClick={() => successAlert(row.original)}
                                    >
                                        <img src={cedericon}
                                            style={
                                                {
                                                    height: 30
                                                }
                                            }
                                        />
                                    </IconButton>
                                </Tooltip> : ''}
                            </Box>
                        )}
                     
                        getRowId={(row) => row.codigoEvento}
                        muiSelectCheckboxProps={({ row }) => ({
                            disabled: row.original.estado != "reservado",
                            disabled: moment(new Date(), "YYYY-MM-DD HH:mm:ss").diff(moment(row.original.fechaCreacion, "YYYY-MM-DD HH:mm:ss"), 'h') < 2
                        })}
                        tableInstanceRef={tableInstanceRef}
                        positionToolbarAlertBanner="bottom"
                        displayColumnDefOptions={{
                            'mrt-row-numbers': {
                                enableHiding: true,
                            },
                        }}
                        onRowSelectionChange={setRowSelection}
                        state={{ rowSelection }}
                        localization={MRT_Localization_ES}
                    />
                </div>
                <div className=" container pb-3">
                    <div className=" d-flex justify-content-end ">
                        {
                            
                
                        
                        Object.keys(rowSelection).length > 0 ? <div className="px-2 col-12 col-md-6 text-end border py-3">
              Valor Total de Selección:
              {" $" +
                                        suma(Object.keys(rowSelection)[0])     }
            </div> : ''}
                    </div>
                    <div className="d-flex justify-content-end pt-2">

                        {Object.keys(rowSelection).length > 0 ? <div className=" px-2">
              <button className=" btn btn-success"
                onClick={Pagar}
              >
                PAGAR
              </button>
            </div> : ''}
                    </div>
                </div>

            </div>
        </>
    );
}

export default Example;