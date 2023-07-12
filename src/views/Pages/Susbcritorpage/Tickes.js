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
import { registraPagos } from "utils/pagos/Queripagos.js";
import { listarRegistro } from "utils/pagos/Queripagos.js";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";


import ListaderegistroView from "../Flasdeticket/Listaregistro/index.js";
import DataTableBos from "components/ReactTable/Datatable.js/index.js";
import { ticketsboletos } from "utils/columnasub.js";
import TablasViwe from "layouts/Tablasdoc.js";
import { generaPDF } from "utils/boletos/Queryboleto.js";
import { generaTiketspdf } from "utils/Querycomnet.js";
import { Triangle } from "react-loader-spinner";
import Inframene from "views/Components/IFrame/index.js";
import { setToastes } from "StoreRedux/Slice/ToastSlice.js";
import axios from "axios";
let { cedericon } = bancos
function Example() {
    let usedispatch = useDispatch()
    const [tiketslist, setTikes] = useState([])
    const [tikesele, setTicket] = useState([])
    const [spiner, setSpiner] = useState("d-none")
    const [rowSelection, setRowSelection] = useState({});
    const tableInstanceRef = useRef(null);
    const [alert, setAlert] = useState(null)
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const abrirceder = (e) => {
        usedispatch(setModal({ nombre: 'ceder', estado: e }))
        hideAlert()
    }
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

    function generaPDF(row) {
        setSpiner("")
        generaTiketspdf({
            "cedula": row.cedula,
            "codigoEvento": row.codigoEvento,
            "id_ticket_usuarios": row.id
        }).then(ouput => {
            if (ouput.success) {
                usedispatch(setModal({ nombre: 'pdfsshow', estado: ouput.link }))
                // window.open(ouput.link, "_blank");
                setSpiner("d-none")

            } else {
                usedispatch(setToastes({
                    show: true,
                    message: "No te preocupes tu boleto ya está comprado los pdf se generará pronto, paciencia gracias",
                    color: 'bg-primary',
                    estado: "Hubo un error intenta mas tarder"
                }))
                setSpiner("d-none")
            }

        }).catch(eror => {
            setSpiner("d-none")
            usedispatch(setToastes({
                show: true,
                message: "No te preocupes tu boleto ya está comprado los pdf se generará pronto, paciencia gracias",
                color: 'bg-primary',
                estado: "Hubo un error intenta mas tarder"
            }))
            //console.log(eror)
        })
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
    const thead = () => {
        return (
            <thead className="">
                <tr className="border ">
                    <th  >Concierto</th>
                    <th className="text-xs text-center"  >Boleto</th>

                    <th className="text-xs text-center" >Localidad</th>

                    <th className="text-xs text-center">Fecha</th>
                    <th className="text-xs text-center">Estado</th>
                    <th className="text-center"> Aciones</th>

                </tr>
            </thead>
        )

    }
    const color = {
        "reservado": "label label-warning",
        "Disponible": "label label-success"
    }
    let precio = {
        "General": 1,
        "Preferencia": 1,
        "Butacas": 1,
        "Butacas VIP": 1,
        "Ranchenato BOX": 1,
        "SEN2 KBRN": 2,
        "SAUCES BOYZ": 2,
        "TODO O NADA": 1,
        "SEN2-KBRN": 2,
        "SAUCES BOYZ": 2,
        "TODO-O-NADA": 1,
        "participantes-jessi": 0,
        "participante-quito": 0
    }
    const showDatos = () => {
        try {
            return tiketslist.map((item, index) => {

                return (
                    <tr key={index}>

                        <td className="text-xs ">{item.concierto}</td>
                        <td className="text-xs text-center ">#{item.asientos["silla"] == null ? item.id_localidades_items :item.asientos["silla"]}</td>
                        <td className="text-xs text-center">{item.localidad}</td>
                        <td className="text-xs text-center">{item.fechaCreacion}</td>
                        <td className="text-xs text-center">
                            <span className={color[item.estado]}>  {item.estado} </span></td>
                        <td className="text-center ">
                            <div className=" btn-group  " >
                                {item.estado == "Pagado" && item.canje !="CANJEADO" ?
                                    <Tooltip className="" title="Ver Ticket" placement="top">
                                        <a
                                            className="btn btn-default-su btn-sm text-danger"
                                            onClick={() => generaPDF(item)}
                                        //href={item.pdf}
                                        //target="_black"
                                        >
                                            <i className="fa fa-download  "></i>

                                        </a>
                                    </Tooltip> :
                                    <a
                                        className=" btn btn-default btn-sm btn-disable"
                                        disabled

                                    >
                                        <i className="fa fa-download "></i>


                                    </a>
                                }
                                {item.estado == "Pagado" && item.pdf != null && item.cedido == "NO" ? <Tooltip title="Ceder ticket" placement="top-start">
                                    <a className=" btn btn-default btn-sm d-none"


                                        onClick={() => successAlert(item)}
                                    >
                                        <img src={cedericon}
                                            style={
                                                {
                                                    height: 20
                                                }
                                            }
                                        />
                                    </a>
                                </Tooltip> :
                                    <a
                                        className=" btn btn-default btn-sm btn-disable d-none"
                                        disabled

                                    >
                                        <img src={cedericon}
                                            style={
                                                {
                                                    height: 20
                                                }
                                            }
                                        />


                                    </a>
                                }




                            </div>

                        </td>

                    </tr>
                )
            });
        } catch (error) { }
    }
    const hideAlert = () => {
        setAlert(null)
    }
    const theads = () => {
        return (
            <thead className="">
                <tr className="border ">
                    <th  >#</th>
                    <th  >Concierto</th>
                    <th className="text-xs text-center"  >Boletos</th>
                    <th className="text-xs text-center"  >Cédulas</th>
                    <th className="text-xs text-center">Fecha</th>
                    <th className="text-center"> Aciones</th>
                </tr>
            </thead>
        )
    }
    const ShowFoder = () => {
        try {
            return tikesele.map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="text-xs text-center">{item.id}</td>
                        <td className="text-xs text-center">{item.observacion}</td>
                        <td className="text-xs text-center">Boletos terceros</td>
                        <td className="text-xs text-center ">{item.cedula}</td>
                        <td className="text-xs text-center">{moment(item.fecha).format('L')}</td>
                        <td className="text-center ">
                            <div className=" btn-group  " >
                                <Tooltip className="" title="Ver Compra" placement="top">
                                    <a
                                        className="btn btn-default-su btn-sm text-danger"
                                        href={item.link_external}
                                        target="_blank"
                                    >
                                        <i className="fa fa-print"></i>
                                    </a>
                                </Tooltip>
                            </div>

                        </td>

                    </tr>
                )
            });
        } catch (error) { }
    }

    function Pagar() {
        let valor = Object.keys(rowSelection).length > 0 ? tiketslist.find(e => e.codigoEvento == Object.keys(rowSelection)[0]).detalle : ''        //s console.log(valor)
    }
    const Listarfaci = async (parms) => {
        try {
            let { data } = await axios.post("https://api.t-ickets.com/ms_login/get_link_external_tickets", parms, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                }
            })
            return data
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        let user = getDatosUsuariosLocalStorag()
        Listarticketporestado(user.cedula).then(ouput => {
            //console.log(ouput)
            if (!ouput.success) {
                return
            }
            console.log(ouput)
            setTikes(ouput.data)
            //console.log(ouput.data.filter(e => e.canje != "CANJEADO"))
        }).catch(err => console.log(err))

        Listarfaci({ "cedula": user.cedula }).then(ouput => {
            if (ouput.success) {
                console.log(ouput)
                setTicket([...ouput.data])
            }
            console.log(ouput)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    function suma(item) {
        let tikets = tiketslist.find(e => e.codigoEvento == item).detalle.map((f) => { return parseFloat(f.valor) })
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
            <Inframene></Inframene>
            <ModalReporteViews />
            <div className="container-fluid">
                <Tabs value={value} onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Reportar Compras" {...a11yProps(1)} />
                    <Tab className="d-none" label="Tickets" {...a11yProps(0)} />
                    <Tab className="" label="Tickets "{...a11yProps(2)} />
                    <Tab className="" label="Otras compras  "{...a11yProps(3)} />

                </Tabs>

                <div className=" container-fluid py-2 px-0 ">
                    <TabPanel value={value} index={1} >

                        <MaterialReactTable
                            columns={ticketsboletos}
                            data={tiketslist}
                            enableRowActions
                            positionActionsColumn="last"
                            renderRowActions={({ row }) => (
                                <Box sx={{ display: 'flex' }}>
                                    {row.original.estado != "reservado" && row.original.pdf != null && row.original.forma_pago != "Efectivo-Local" ? <Tooltip className="" title="Ver Ticket" placement="top">
                                        <IconButton
                                            color="primary"
                                            arial-label="Enviar"
                                            disabled={(row.original.cedido == "SI")}
                                            href={row.original.pdf}
                                            target="_black"
                                        >

                                            <FileDownload />

                                        </IconButton>
                                    </Tooltip> : ''}
                                    <Tooltip title="Borrar" placement="top">
                                        <IconButton
                                            className=""
                                            color="error"
                                            aria-label="Bloquear">
                                            <Delete />
                                        </IconButton>
                                    </Tooltip>
                                    {row.original.estado == "Pagado" && row.original.pdf != null && row.original.cedido == "NO" ? <Tooltip title="Ceder ticket" placement="top-start">
                                        <IconButton
                                            color='success'

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
                                    {
                                        <Tooltip
                                            title="Eliminar"
                                            placement="top"
                                        >
                                            <IconButton
                                                color="danger"
                                            >
                                                <Delete />
                                            </IconButton>

                                        </Tooltip>
                                    }
                                </Box>
                            )}
                            localization={MRT_Localization_ES}
                        />

                        <div className=" container pb-3">
                            <div className=" d-flex justify-content-end ">
                                {
                                    Object.keys(rowSelection).length > 0 ? <div className="px-2 col-12 col-md-6 text-end border py-3">
                                        Valor Total de Selección:
                                        {" $" +
                                            suma(Object.keys(rowSelection)[0])}
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
                    </TabPanel>
                    <TabPanel value={value} index={0} >
                        <ListaderegistroView
                            cedula={getDatosUsuariosLocalStorag().cedula}
                        />

                    </TabPanel>
                    <TabPanel value={value} index={2} >

                        <TablasViwe
                            number={3}
                            thead={thead}
                            showDatos={showDatos}
                            Titel={"nuevo"}
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TablasViwe
                            number={3}
                            thead={theads}
                            showDatos={ShowFoder}
                            Titel={"OTROS TICKTES"}
                        />

                    </TabPanel>

                </div>

            </div>
            <div className={spiner}
                style={{
                    display: 'none',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000'
                }}
            >

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '10px',
                }}>
                    <Triangle
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                    <h4 className='text-light'>Cargando  PDF  ...</h4>


                </div>
            </div>
            <div className="card d-none card-primary card-outline text-left " style={{ minHeight: '250px' }} >
                <div className="card-header pb-2">
                    Tikets
                </div>
                <div className="card-body table-responsive">

                </div>

                <div className=" container">


                </div>

            </div>
            <CederView />
        </>
    );
}

export default Example;