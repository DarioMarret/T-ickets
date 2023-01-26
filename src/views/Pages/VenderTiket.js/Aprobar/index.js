import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tabs, Tooltip, Tab, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send, CheckBox, Summarize, Preview, } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import { AprobarTiket } from "utils/Querycomnet";
import { bancos } from "utils/Imgenesutils";
import { ticketprocesoapro } from "utils/columnasub";
import moment from "moment";
import ModalAprobarViews from "./Modalventas";
import ModalBoletoApro from "./Modalboleto";
import ListaderegistroView from "views/Pages/Flasdeticket/Listaregistro";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
import { listaRegistro } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useHistory } from "react-router";
import { setdetalle } from "StoreRedux/Slice/SuscritorSlice";
import { eliminarRegistro } from "utils/pagos/Queripagos";
import ExportToExcel from "utils/Exportelemin";
import { ExportToCsv } from 'export-to-csv';
let { cedericon, atencion } = bancos
export default function AprobarView() {
    let usedispatch = useDispatch()
    let history = useHistory()
    let modal = useSelector((state) => state.SuscritorSlice.modal)

    const [data, setData] = React.useState([]);
    const [tiketslist, setTikes] = useState([])
    const [selecions, setselcion] = useState({})
    const [value, setValue] = React.useState(0);

    const [alert, setAlert] = useState(null)
    const abrirceder = (e) => { usedispatch(setModal({ nombre: 'ceder', estado: e })), hideAlert() }
  
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <div>
                        <span>{children}</span>
                    </div>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const succesLimit = () => {
        setAlert(
            <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}

                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                <div>
                    <div className='col-12 pb-3'>
                        <img src={atencion} className="img-fluid"
                            style={{
                                height: 100
                            }}
                        ></img>
                    </div>
                    <h5>Has alcanzado la cantidad límite de entradas</h5>
                    Deseas continuar editando la selección
                    <div className='d-flex  justify-content-around py-4 px-2'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => cerrar()}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>Ir al carrito</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => hideAlert()} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Si, Continuar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </SweetAlert>
        )
    }
  
    const hideAlert = () => {
        setAlert(null)
    }
    useEffect(() => {
        listarRegistropanel({ "cedula": "" }).then(e => {
            // console.log(e)
            if (e.data) {

                setTikes(e.data)
                return
            }
            //setTikes([])
        }).catch(err => {
            console.log(err)
        })
    },
        [])
  
    const Deliminarregistro = (parms) => {
        console.log(parms)

        $.confirm({
            title: 'Desea eliminar Este registro de compra ',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Eliminar',
                    btnClass: 'btn-red',
                    action: function () {
                        eliminarRegistro({ "id": parms.id }).then(ouput => {
                            console.log(ouput)
                            console.log(parms.id)
                            if (!ouput.success) { return $.alert("" + ouput.message) }
                            listarRegistropanel({ "cedula": "" }).then(e => {
                                // console.log(e)
                                if (e.data) {

                                    setTikes(e.data)
                                    return
                                }
                                //setTikes([])
                            }).catch(err => {
                                console.log(err)
                            })

                            $.alert("Registro Eliminado correctamente")

                        }).catch(error => {
                            $.alert("hubo un error no se pudo eliminar este registro")
                        })
                    }
                },
                close: function () {
                }
            }
        });

    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log(newValue)
    };
    function Aprobarvarios() {
        usedispatch(setModal({ nombre: "Aprobar", estado: data }))
    }
    function Aprobar(e) {
        //console.log(e)
        usedispatch(setModal({ nombre: "boleto", estado: e }))

    }
    function abrirModal(e) {
        usedispatch(setModal({ nombre: "confirmar", estado: e }))
    }
    function detalle(e) {
        //  console.log(e)
        sessionStorage.setItem("Detalleuid", JSON.stringify({ ...e }))
        history.push("/admin/Reporte/" + e.id)

    }
    function detalledos(e) {
        history.push("/admin/Aprobar/" + e.cedula)
    }
    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        filename: 'Ticket vendidos',
        useKeysAsHeaders: false,
    };
    const csvExporter = new ExportToCsv(csvOptions);
    const handleExportRows = (rows) => {
        csvExporter.generateCsv(rows.map((row) => row.original));
    };

    return (
        <>
            {alert}
            {
                modal.nombre == "Aprobar" ?
                    <ModalAprobarViews /> : ""}
            {
                modal.nombre == "boleto" ?
                    <ModalBoletoApro /> : ""
            }
            <ModalConfima />
            <div className="container d-flex flex-wrap">
                <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Pagados")} fileName={"Todos Pendientes"} label={"Pagados"} />
                <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Pendiente")} fileName={"Todos Pendientes"} label={"Pendientes"} />
                <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Expirado")} fileName={"Todos Pendientes"} label={"Expirados"} />
                <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Comprobar")} fileName={"Todos Pendientes"} label={"Comprobar"} />
            </div>
           <div className="   " style={{ minHeight: '250px' }} >
                <div className='container-fluid  p-0'>
                    <Tabs value={value} onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label={"Reportes Pagados: " + tiketslist.filter(e => e.estado_pago == "Pagado").length} {...a11yProps(0)} />
                        <Tab label={"Reportes Pendientes: " + tiketslist.filter(e => e.estado_pago == "Pendiente").length}{...a11yProps(1)} />
                        <Tab label={"Reportes expirado: " + tiketslist.filter(e => e.estado_pago == "Expirado").length} {...a11yProps(2)} />
                        <Tab label={"Reportes comprobar: " + tiketslist.filter(e => e.estado_pago == "Comprobar").length} {...a11yProps(3)} />


                    </Tabs>
                    <div className=" text-center  py-2  ">
                        <TabPanel value={value} index={0} className="text-center">
                            <MaterialReactTable
                                columns={listaRegistro}
                                data={tiketslist.filter(e => e.estado_pago == "Pagado")}
                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'flex'
                                    }
                                }}
                                enableRowActions
                                positionActionsColumn="first"
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex' }}>
                                        {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" && row.original.estado_pago != "Expirado" ?
                                            <Tooltip title="Reportar" placement="top">
                                                <IconButton
                                                    color="error"
                                                    aria-label="Bloquear"
                                                    onClick={() => abrirModal(row.original)}
                                                >
                                                    <Summarize />
                                                </IconButton>
                                            </Tooltip> : <IconButton
                                                disabled={true}
                                                color="error"
                                                aria-label="Consolidar"

                                            >
                                                <Summarize />
                                            </IconButton>}
                                        <Tooltip
                                            title="Comprobar" placement="top"
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={() => detalle(row.original)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="especifico" placement="top"
                                        >
                                            <IconButton
                                                color="success"
                                                onClick={() => detalledos(row.original)}
                                            >
                                                <Preview />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip
                                            title="Borrar"
                                            placement="top"
                                        >
                                            <IconButton
                                                onClick={() => Deliminarregistro(row.original)}
                                                color="error">
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>

                                    </Box>
                                )}
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1} className="text-center">
                            <MaterialReactTable
                                columns={listaRegistro}
                                data={tiketslist.filter(e => e.estado_pago == "Pendiente")}
                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'flex'
                                    }
                                }}
                                enableRowActions
                                positionActionsColumn="first"
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex' }}>
                                        <Tooltip title="Reportar" placement="top">
                                            <IconButton
                                                color="error"
                                                aria-label="Bloquear"
                                                onClick={() => abrirModal(row.original)}
                                            >
                                                <Summarize />
                                            </IconButton>
                                        </Tooltip>
                                        {clienteInfo() && row.original.link_comprobante == null ? <Tooltip
                                            title="Comprobar" placement="top"
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={() => detalle(row.original)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip> : ""}
                                        <Tooltip
                                            title="Borrar"
                                            placement="top"

                                        >
                                            <IconButton
                                                onClick={() => Deliminarregistro(row.original)}
                                                color="error">
                                                <Delete />
                                            </IconButton>


                                        </Tooltip>
                                        <Tooltip
                                            title="Boletos especificos" placement="top"
                                        >
                                            <IconButton
                                                color="success"
                                                onClick={() => detalledos(row.original)}
                                            >
                                                <Preview />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2} className="text-center" >
                            <MaterialReactTable
                                columns={listaRegistro}
                                data={tiketslist.filter(e => e.estado_pago == "Expirado")}
                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'flex'
                                    }
                                }}
                                enableRowActions
                                positionActionsColumn="first"
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex' }}>
                                        <IconButton
                                            color="error"
                                            aria-label="Bloquear"
                                            onClick={() => abrirModal(row.original)}
                                        >
                                            <Summarize />
                                        </IconButton>
                                        {clienteInfo() && row.original.link_comprobante == null ? <Tooltip
                                            title="Comprobar" placement="top"
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={() => detalle(row.original)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip> : ""}
                                        <Tooltip
                                            title="Borrar"
                                            placement="top"

                                        >
                                            <IconButton
                                                onClick={() => Deliminarregistro(row.original)}
                                                color="error">
                                                <Delete />
                                            </IconButton>


                                        </Tooltip>
                                        <Tooltip
                                            title="Boletos especificos" placement="top"
                                        >
                                            <IconButton
                                                color="success"
                                                onClick={() => detalledos(row.original)}
                                            >
                                                <Preview />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={3} className="text-center" >
                            <MaterialReactTable
                                columns={listaRegistro}
                                data={tiketslist.filter(e => e.estado_pago == "Comprobar")}
                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'flex'
                                    }
                                }}
                                enableRowActions
                                positionActionsColumn="first"
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex' }}>

                                        <Tooltip
                                            title="Comprobar" placement="top"
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={() => detalle(row.original)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>


                                    </Box>
                                )}
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>

                    </div>
                </div>

            </div>
        </>
    );
}

