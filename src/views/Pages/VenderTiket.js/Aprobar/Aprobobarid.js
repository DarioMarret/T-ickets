import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tabs, Tooltip, Tab, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send, CheckBox, Summarize, } from '@mui/icons-material';
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
import { useHistory, useParams } from "react-router";
import { setdetalle } from "StoreRedux/Slice/SuscritorSlice";
import { eliminarRegistro } from "utils/pagos/Queripagos";

let { cedericon, atencion } = bancos
export default function AprobarViewid() {
    let { id } = useParams()
    console.log(id)
    let usedispatch = useDispatch()
    let history = useHistory()
    let modal = useSelector((state) => state.SuscritorSlice.modal)

    const [data, setData] = React.useState([]);
    const [tiketslist, setTikes] = useState([])
    const [selecions, setselcion] = useState({})
    const [value, setValue] = React.useState(0);

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
    function selecion(cod, seleccionado) {
        let info = data
        if (info.some(e => e.uid == cod)) {
            if (info.some(g => g.sillas === seleccionado.sillas)) {
                let nuevo = selecions
                setData(info.filter(h => h.sillas != seleccionado.sillas))
                // delete nuevo.seleccionado.sillas;
                // setselcion({...nuevo})

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
    // console.log(data)
    useEffect(() => {
        listarRegistropanel({ "cedula": id }).then(e => {
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
    function suma() {
        let tikets = data.map((f) => { return parseFloat(f.valor) })
        try {
            let valo = tikets.reduce((a, b) => a + b, 0).toFixed(2)
            return valo

        } catch (error) {
            console.log(error)

        }
    }
    const eliminarregistro = (parms) => {
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
                            listarRegistropanel({ "cedula": id }).then(e => {
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
        usedispatch(setdetalle({ ...e }))
        history.push("/admin/Reporte/" + e.id)
    }

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
            <div className="  text-center " style={{ minHeight: '250px' }} >

                <div className='container-fluid  p-0'>
                    <Tabs value={value} onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label={"Reportes Pagados: " + tiketslist.filter(e => e.estado_pago == "Pagado").length} {...a11yProps(0)} />
                        <Tab label={"Reportes Pendiente: " + tiketslist.filter(e => e.estado_pago == "Pendiente").length}{...a11yProps(2)} />
                        <Tab label={"Reportes expirado : " + tiketslist.filter(e => e.estado_pago == "Expirado").length} {...a11yProps(1)} />
                      

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
                                                    onClick={() => abrirModal(row)}
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
                                        <Tooltip title="Borrar" placement="top">
                                            <IconButton
                                                onClick={() => eliminarregistro(row.original)}
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
                                        {row.original.estado_pago == "Pendiente" ? <Tooltip
                                            title="Borrar"
                                            placement="top"

                                        >
                                            <IconButton
                                                onClick={() => eliminarregistro(row.original)}
                                                color="error">
                                                <Delete />
                                            </IconButton>


                                        </Tooltip> : ""}
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
                                        {row.original.estado_pago == "Expirado" ? <Tooltip
                                            title="Borrar"
                                            placement="top"

                                        >
                                            <IconButton
                                                onClick={() => eliminarregistro(row.original)}
                                                color="error">
                                                <Delete />
                                            </IconButton>


                                        </Tooltip> : ""}
                                        <Tooltip title="Reportar" placement="top">
                                            <IconButton
                                                color="error"
                                                aria-label="Bloquear"
                                                onClick={() => abrirModal(row.original)}
                                            >
                                                <Summarize />
                                            </IconButton>
                                        </Tooltip> 
                                        <Tooltip title="Borrar" placement="top">
                                            <IconButton
                                                onClick={() => eliminarregistro(row.original)}
                                                color="error">
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                )}
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        
                    </div>
                </div>
                <div className="   d-flex justify-content-end align-items-end p-3">
                    <a className=" rounded-circle btn-primary p-2 text-white"
                        onClick={() => history.goBack()}
                    >
                        <i className=" fa fa-arrow-left"></i>
                    </a>

                </div>
            </div>
        </>
    );
}

