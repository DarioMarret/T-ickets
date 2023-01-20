import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, Typography, Tabs, Tab, } from '@mui/material';
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [value, setValue] = React.useState(0);
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
    const canjear = (e) => {
        $.confirm({
            title: 'Canjear boleto!',
            type: 'blue',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="container form-group">' +
                '<label></label>' +
                '<input  type="text" placeholder="" value="' + e.cedula + '" class="form-control name" required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Canjear',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.name').val();
                        if (!name) {
                            $.alert('provide a valid name');
                            return false;
                        }

                        $.alert(' ' + name);
                    }
                },
                cancel: function () {
                    //close
                },
            },
            onContentReady: function () {
                // bind to events
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    // if the user submits the form by pressing enter in the fiel
                    console.log(e)
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    }
    const eliminar = (e) => {
        $.confirm({
            title: 'Desea eliminar Este boleto # ' + e.sillas + '',
            content: 'De <span class="txt-capitalize"> ' + e.concierto + '</span> en la localidad:  ' + e.localidad + ' ',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Eliminar',
                    btnClass: 'btn-red',
                    action: function () {
                    }
                },
                close: function () {
                }
            }
        });

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
                <Tabs value={value} onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab className="" label="Boletos Pagados sin canjear  "{...a11yProps(0)} />
                    <Tab label="Boletos Reservados no Canjeado " {...a11yProps(1)} />      
                    <Tab label="Boletos Canjeados " {...a11yProps(2)} />                
                </Tabs>
                <TabPanel value={value} index={0} className="text-center" >
                    <MaterialReactTable
                        columns={ticketsboletos}
                        data={tiketslist.filter(e => e.canje == "NO CANJEADO" && e.estado =="Pagado")}
                        muiTableProps={{
                            sx: {
                                tableLayout: 'flex'
                            }
                        }}
                        enableRowActions
                        positionActionsColumn="first"
                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex' }}>

                                <div className=" btn-group  " >
                                    {row.original.estado != "reservado" && row.original.pdf != null && row.original.link == "SI" ?
                                        <Tooltip className="" title="Ver Ticket" placement="top">
                                            <a
                                                className=" border  btn-default btn-sm"

                                                href={row.original.pdf}
                                                target="_black"
                                            >
                                                <i className="fa fa-download text-primary"></i>
                                            </a>
                                        </Tooltip> :
                                        <a
                                            className="border  btn-default btn-sm btn-disable"
                                            disabled

                                        >
                                            <i className="fa fa-download "></i>


                                        </a>
                                    }
                                    {row.original.estado == "Pagado" && row.original.pdf != null && row.original.cedido == "NO" ? <Tooltip title="Ceder ticket" placement="top-start">
                                        <a className=" btn btn-default btn-sm btn-disable"
                                        //  onClick={() => console.log(row.original)}
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
                                            className="border  btn-default btn-sm btn-disable"
                                            disabled                                        >
                                            <img src={cedericon}
                                                style={
                                                    {
                                                        height: 20
                                                    }
                                                }
                                            />
                                        </a>
                                    }
                                    {row.original.estado != "Pagado" ?<Tooltip
                                        title="Eliminar"
                                        placement="top"
                                    >
                                        <a
                                            onClick={() => eliminar(row.original)}
                                            className="border  btn-default btn-sm  "


                                        >
                                            <i className="fa fa-trash text-danger "></i>


                                        </a>
                                    </Tooltip>:""}
                                    {row.original.canje == "NO CANJEADO" ? <Tooltip
                                        title="Canjear"
                                        placement="top"
                                    >
                                        <a
                                            className="border  btn-default btn-sm "
                                        onClick={() => canjear(row.original)}

                                        >
                                            <i className="fa fa-check-circle text-success" aria-hidden="true"></i>


                                        </a>
                                    </Tooltip> : ""
                                    }
                                </div>
                            </Box>
                        )}
                        localization={MRT_Localization_ES}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} className="text-center" >
                    <MaterialReactTable
                        columns={ticketsboletos}
                        data={tiketslist.filter(e => e.canje == "NO CANJEADO" && e.estado == "reservado")}
                        muiTableProps={{
                            sx: {
                                tableLayout: 'flex'
                            }
                        }}
                        enableRowActions
                        positionActionsColumn="first"
                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex' }}>

                                <div className=" btn-group  " >
                                    {row.original.estado != "reservado" && row.original.pdf != null && row.original.link == "SI" ?
                                        <Tooltip className="" title="Ver Ticket" placement="top">
                                            <a
                                                className=" border  btn-default btn-sm"

                                                href={row.original.pdf}
                                                target="_black"
                                            >
                                                <i className="fa fa-download text-primary"></i>


                                            </a>
                                        </Tooltip> :
                                        <a
                                            className="border  btn-default btn-sm btn-disable"
                                            disabled

                                        >
                                            <i className="fa fa-download "></i>


                                        </a>
                                    }
                                    {row.original.estado == "Pagado" && row.original.pdf != null && row.original.cedido == "NO" ? <Tooltip title="Ceder ticket" placement="top-start">
                                        <a className=" btn btn-default btn-sm btn-disable"


                                        //  onClick={() => console.log(row.original)}
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
                                            className="border  btn-default btn-sm btn-disable"
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
                                    {row.original.estado == "reservado" ? <Tooltip
                                        title="Eliminar"
                                        placement="top"
                                    >
                                        <a
                                            onClick={() => eliminar(row.original)}
                                            className="border  btn-default btn-sm  "


                                        >
                                            <i className="fa fa-trash text-danger "></i>


                                        </a>
                                    </Tooltip>:""}
                                    {row.original.canje == "NO CANJEADO" ? <Tooltip
                                        title="Canjear"
                                        placement="top"
                                    >
                                        <a
                                            className="border  btn-default btn-sm   btn-disable"
                                       // onClick={() => canjear(row.original)}

                                        >
                                            <i className="fa fa-check-circle text-success" aria-hidden="true"></i>


                                        </a>
                                    </Tooltip> : ""
                                    }
                                </div>
                            </Box>
                        )}
                        localization={MRT_Localization_ES}
                    />
                </TabPanel>
                <TabPanel value={value} index={2} className="text-center" >
                    <MaterialReactTable
                        columns={ticketsboletos}
                        data={tiketslist.filter(e => e.canje != "NO CANJEADO" )}
                        muiTableProps={{
                            sx: {
                                tableLayout: 'flex'
                            }
                        }}
                        enableRowActions
                        positionActionsColumn="first"
                        renderRowActions={({ row }) => (
                            <Box sx={{ display: 'flex' }}>

                                <div className=" btn-group  " >
                                    {row.original.estado != "reservado" && row.original.pdf != null && row.original.link == "SI" ?
                                        <Tooltip className="" title="Ver Ticket" placement="top">
                                            <a
                                                className=" border  btn-default btn-sm"

                                                href={row.original.pdf}
                                                target="_black"
                                            >
                                                <i className="fa fa-download text-primary"></i>


                                            </a>
                                        </Tooltip> :
                                        <a
                                            className="border  btn-default btn-sm btn-disable"
                                            disabled

                                        >
                                            <i className="fa fa-download "></i>


                                        </a>
                                    }
                                    {row.original.estado == "Pagado" && row.original.pdf != null && row.original.cedido == "NO" ? <Tooltip title="Ceder ticket" placement="top-start">
                                        <a className=" btn btn-default btn-sm btn-disable"


                                        //  onClick={() => console.log(row.original)}
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
                                            className="border  btn-default btn-sm btn-disable"
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
                                    {row.original.estado == "Pagado" ? <Tooltip
                                        title="Eliminar"
                                        placement="top"
                                    >
                                        <a
                                            onClick={() => eliminar(row.original)}
                                            className="border  btn-default btn-sm  "


                                        >
                                            <i className="fa fa-trash text-danger "></i>


                                        </a>
                                    </Tooltip>:""}
                                    {row.original.canje == "NO CANJEADO" ? <Tooltip
                                        title="Canjear"
                                        placement="top"
                                    >
                                        <a
                                            className="border  btn-default btn-sm "
                                        onClick={() => canjear(row.original)}

                                        >
                                            <i className="fa fa-check-circle text-success" aria-hidden="true"></i>


                                        </a>
                                    </Tooltip> : ""
                                    }
                                </div>
                            </Box>
                        )}
                        localization={MRT_Localization_ES}
                    />
                </TabPanel>
            </div>
        </>
    );
}

