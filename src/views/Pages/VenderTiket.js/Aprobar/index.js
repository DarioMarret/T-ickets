import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tabs, Tooltip, Tab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Delete, Visibility, Summarize, Preview, } from '@mui/icons-material';

import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import ModalAprobarViews from "./Modalventas";
import ModalBoletoApro from "./Modalboleto";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
import { listaRegistrototal } from "utils/columnasub";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useHistory } from "react-router";
import { eliminarRegistro } from "utils/pagos/Queripagos";
import ExportToExcel from "utils/Exportelemin";
import { setTabs } from "StoreRedux/Slice/SuscritorSlice";
import { setLabels } from "StoreRedux/Slice/SuscritorSlice";
import { DateRangePicker, defaultStaticRanges, defaultInputRanges, DateRange } from "react-date-range";
import * as locales from 'react-date-range/dist/locale'
import { setCompras } from "StoreRedux/Slice/SuscritorSlice";
import PiecharViewsSlect from "views/Components/Piechar/Piecharselect";
import { ListaPreciosEvent } from "utils/EventosQuery";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { setFecha } from "StoreRedux/Slice/SuscritorSlice";
import { ListarRegistropaneFecha } from "utils/pagos/Queripagos";
import moment from "moment";
import { setTicket } from "StoreRedux/Slice/SuscritorSlice";
import { setlisticket } from "StoreRedux/Slice/SuscritorSlice";
import { ExampleSlideout, Slideout } from "views/Components/slider";
import { Contactos_Boletos } from "utils/Querycomnet";
moment.defaultFormat = "MM-DD-YYYY ";

export const PreciosStore = () => {
    let datos = JSON.parse(sessionStorage.getItem("PreciosLocalidad"))
    if (datos != null) {
        return datos
    } else {
        return []
    }
}
export default function AprobarView() {
    let usedispatch = useDispatch()
    let history = useHistory()
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let value = useSelector((state) => state.SuscritorSlice.tabps)
    let compras = useSelector((state) => state.SuscritorSlice.compras)
    let labelne = useSelector((state) => state.SuscritorSlice.labels)
    let states = useSelector((state) => state.SuscritorSlice.fecha)
    let ticket = useSelector((state) => state.SuscritorSlice)
    let datas = useSelector(state => state.SuscritorSlice.data)
    let tiketslist = useSelector(state => state.SuscritorSlice.compras)
    const [alert, setAlert] = useState("")
    const [metodos, setMetodo] = useState("")
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
    function refrescar() {
        ListarRegistropaneFecha(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format().replace(" ", ""), "0" + states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).then(e => {
            console.log(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-"), e)
            console.log(e)
            if (!e.success) {
                usedispatch(setToastes({
                    show: true,
                    message: e.message,
                    color: 'bg-warning',
                    estado: "Todos ocupados"
                }))
                return
            }
            if (e.data) {
                let newdatos = e.data.map(row => {
                    let nombre = row.info_concierto.map(e => { return e.nombreConcierto })
                    let valor = row.info_concierto.map(e => {
                        return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                    }).reduce((a, b) => a + b, 0)
                    let cantida = row.info_concierto.map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                    row.Valortotal = parseFloat(valor)
                    row.cantidad = cantida
                    row.concierto = nombre[0]
                    return { ...row }
                })
                let order = newdatos.sort(sorter)
                usedispatch(setCompras({ compras: order }))
                usedispatch(setTicket({ tiketslist: order }))
                console.log(newdatos)
                let arayReallocalidad = []
                let arrprueb = []
                newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                    elm.ticket_usuarios.map(item => {
                        // cantidad: loc.cantidad, precio: precio[loc.id_localidad],
                        /*if (arrprueb.length == 0) {
                            arrprueb.push({ localidad: item.localidad, cantidad: 1, precio: item.valor, concierto: item.concierto, codigoEvento: item.codigoEvento })
                        }*/
                        //  console.log(item, arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento))
                        arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)
                        if (arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)) {
                            //        console.log(arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento))
                            // let cantidad = arrprueb.filter(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)[0].cantidad + 1
                            let index = arrprueb.findIndex(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)
                            let cantidad = arrprueb[index].cantidad + 1
                            arrprueb[index].cantidad = cantidad
                        } else {
                            arrprueb.push({ localidad: item.localidad, cantidad: 1, precio: item.valor, concierto: item.concierto, codigoEvento: item.codigoEvento })
                        }
                    })
                })

                let arrayIndividual = []
                // console.log(consulat)
                console.log(arayReallocalidad, arrprueb)
                /* arayReallocalidad.forEach(elm => {
                     if (arrayIndividual.some(e => e.id == elm.id)) {
                         let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                         let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                         arrayIndividual[dat].cantidad = tota
                     }
                     else {
                         arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad, precio: elm.precio })
                     }
                 })*/
                //console.log(arrayIndividual)
                let datos = arrprueb.map(f => {
                    return [f.localidad, f.concierto, parseInt(f.cantidad)]
                })


                let nuevo = arrprueb.map(f => {
                    return [f.localidad, f.concierto, parseInt(f.cantidad)]
                })
                setDts([
                    ["Localidad", "evento", "cantidad"],
                    ...nuevo
                ])
                usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                usedispatch(setlisticket({ ticket: false }))
                return
            }
        }).catch(err => {
            console.log(err)
        })
    }
    let [datos, stDatos] = useState([])
    useEffect(() => {
        // ListaPrecios()
        //console.log(ticket.ticket)
        setFechaRange(moment(states[0].startDate.toLocaleDateString("en-US")).format("MM/DD/YYYY") + " - " + moment(states[0].endDate.toLocaleDateString("en-US")).format("MM/DD/YYYY"))
        !ticket.ticket ? "" :
            ListarRegistropaneFecha(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format().replace(" ", ""), "0" + states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).then(e => {
                //console.log(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-"), e)
                //console.log(e)
                if (!e.success) {
                    usedispatch(setToastes({
                        show: true,
                        message: e.message,
                        color: 'bg-warning',
                        estado: "Todos ocupados"
                    }))
                    return
                }
                if (e.data) {
                    const nombresUnicos = new Set();
                    stDatos(e.data)
                    e.data.filter(fe => moment(fe.fechaCreacion.split(" ")[0]).format() >= moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() && moment(fe.fechaCreacion.split(" ")[0]).format() <= states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).forEach(item => {
                        nombresUnicos.add(item.info_concierto[0].nombreConcierto);
                    });
                    //console.log(e.data)
                    const nombresArray = Array.from(nombresUnicos);
                    setDatas(nombresArray)
                    //console.log(nombresArray);
                    let newdatos = e.data.filter(fe => moment(fe.fechaCreacion).format() >= moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() && moment(fe.fechaCreacion.split(" ")[0]).format() <= moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format()).map(row => {
                        let nombre = row.info_concierto.map(e => { return e.nombreConcierto })
                        let valor = row.info_concierto.map(e => {
                            return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                        }).reduce((a, b) => a + b, 0)
                        let cantida = row.info_concierto.map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                        row.Valortotal = parseFloat(valor)
                        row.cantidad = cantida
                        row.concierto = nombre[0]
                        return { ...row }
                    })
                    let order = newdatos.sort(sorter)
                    usedispatch(setCompras({ compras: order }))
                    usedispatch(setTicket({ tiketslist: order }))
                    //console.log(newdatos)
                    let arrprueb = []
                    newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                        elm.ticket_usuarios.map(item => {
                            if (arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)) {
                                let index = arrprueb.findIndex(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)
                                let cantidad = arrprueb[index].cantidad + 1
                                arrprueb[index].cantidad = cantidad
                            } else {
                                arrprueb.push({ localidad: item.localidad, cantidad: 1, precio: item.valor, concierto: item.concierto, codigoEvento: item.codigoEvento })
                            }
                        })
                    })
                    let datos = arrprueb.map(f => {
                        return [f.localidad, f.concierto, parseInt(f.cantidad)]
                    })

                    let nuevo = arrprueb.map(f => {
                        return [f.localidad, f.concierto, parseInt(f.cantidad)]
                    })
                    setDts([
                        ["Localidad", "evento", "cantidad"],
                        ...nuevo
                    ])
                    usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                    usedispatch(setlisticket({ ticket: false }))
                    return
                }
            }).catch(err => {
                console.log(err)
            })
    }, [ticket.ticket])
    let precio = {
        1: 20,
        2: 30,
        3: 40,
        4: 50,
        5: 80,
        9: 120,
        10: 65,
        11: 35,
        12: 120,
        13: 65,
        14: 35,
        23: 0,
        22: 0
    }
    const [fecha, setFechaRange] = useState()
    $(function () {
        $('input[name="datefilter"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                cancelLabel: 'Clear',
                "applyLabel": "Aceptar",
                "cancelLabel": "Cancelar", "daysOfWeek": [
                    "Dom",
                    "Lun",
                    "Mar",
                    "Mie",
                    "Jue",
                    "Vie",
                    "Sáb"
                ],
                "monthNames": [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
            }
        });
        $('input[name="datefilter"]').on('apply.daterangepicker', function (ev, picker) {
            console.log(picker)
            let startDate = moment(picker.startDate.format('MM-DD-YYYY'))
            let endDate = moment(picker.endDate.format('MM-DD-YYYY'))
            let fechastart = new Date(startDate._i)
            let fechaend = new Date(endDate._i)
            let items = {
                "selection": {
                    "startDate": fechastart,
                    "endDate": fechaend,
                    "key": "selection"
                }
            }
            // usedispatch(setCompras({ compras: compras }))
            //usedispatch(setLabels({ labels: [...labelne] }))
            usedispatch(setlisticket({ ticket: true }))
            usedispatch(setFecha({ fecha: [items.selection] }))
            //console.log(moment(item.selection.startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format())
            //return
            console.log(items)
            setFechaRange(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'))
            $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
            setAlert("")
            setMetodo("")
            ListarRegistropaneFecha(moment(picker.startDate.format('MM-DD-YYYY')).format().replace(" ", ""), picker.endDate.format('MM/DD/YYYY')).then(e => {
                //console.log(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-"), e)
                //console.log(e)
                if (!e.success) {
                    usedispatch(setToastes({
                        show: true,
                        message: e.message,
                        color: 'bg-warning',
                        estado: "Todos ocupados"
                    }))
                    return
                }
                if (e.data) {
                    const nombresUnicos = new Set();
                    stDatos(e.data)
                    e.data.filter(fe => moment(fe.fechaCreacion.split(" ")[0]).format() >= moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() && moment(fe.fechaCreacion.split(" ")[0]).format() <= states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).forEach(item => {
                        nombresUnicos.add(item.info_concierto[0].nombreConcierto);
                    });
                    //console.log(e.data)
                    const nombresArray = Array.from(nombresUnicos);
                    setDatas(nombresArray)
                    //console.log(nombresArray);
                    let newdatos = e.data.filter(fe => moment(fe.fechaCreacion).format() >= moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() && moment(fe.fechaCreacion.split(" ")[0]).format() <= moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format()).map(row => {
                        let nombre = row.info_concierto.map(e => { return e.nombreConcierto })
                        let valor = row.info_concierto.map(e => {
                            return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                        }).reduce((a, b) => a + b, 0)
                        let cantida = row.info_concierto.map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                        row.Valortotal = parseFloat(valor)
                        row.cantidad = cantida
                        row.concierto = nombre[0]
                        return { ...row }
                    })
                    let order = newdatos.sort(sorter)
                    usedispatch(setCompras({ compras: order }))
                    usedispatch(setTicket({ tiketslist: order }))
                    //console.log(newdatos)
                    let arrprueb = []
                    newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                        elm.ticket_usuarios.map(item => {
                            if (arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)) {
                                let index = arrprueb.findIndex(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)
                                let cantidad = arrprueb[index].cantidad + 1
                                arrprueb[index].cantidad = cantidad
                            } else {
                                arrprueb.push({ localidad: item.localidad, cantidad: 1, precio: item.valor, concierto: item.concierto, codigoEvento: item.codigoEvento })
                            }
                        })
                    })
                    let datos = arrprueb.map(f => {
                        return [f.localidad, f.concierto, parseInt(f.cantidad)]
                    })

                    let nuevo = arrprueb.map(f => {
                        return [f.localidad, f.concierto, parseInt(f.cantidad)]
                    })
                    setDts([
                        ["Localidad", "evento", "cantidad"],
                        ...nuevo
                    ])
                    usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                    usedispatch(setlisticket({ ticket: false }))
                    return
                }
            }).catch(err => {
                console.log(err)
            })
        });

        $('input[name="datefilter"]').on('cancel.daterangepicker', function (ev, picker) {
            setFechaRange(moment(item.selection.startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() - moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format())
            usedispatch(setlisticket({ ticket: true }))
            usedispatch(setFecha({ fecha: [item.selection] }))
            $(this).val('');
        });

    });


    const [datas1, setDatas] = useState([])
    const [dtos, setDts] = useState([])
    const sorter = (a, b) => new Date(a.fechaCreacion) < new Date(b.fechaCreacion) ? 1 : -1;

    const Deliminarregistro = (parms) => {
        $.confirm({
            title: 'Deseas eliminar Este registro de compra ',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Eliminar',
                    btnClass: 'btn-red',
                    action: function () {
                        console.log(parms.id)
                        eliminarRegistro({ "id": parms.id }).then(ouput => {
                            console.log(ouput)
                            console.log(parms.id)
                            if (!ouput.success) { return $.alert("" + ouput.message) }
                            ListarRegistropaneFecha(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format().replace(" ", ""), "0" + states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).then(e => {
                                console.log(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-"), e)
                                if (!e.success) {
                                    usedispatch(setToastes({
                                        show: true,
                                        message: e.message,
                                        color: 'bg-warning',
                                        estado: "Todos ocupados"
                                    }))
                                    return
                                }
                                if (e.data) {
                                    let newdatos = e.data.map(row => {
                                        let nombre = row.info_concierto.map(e => { return e.nombreConcierto })
                                        //    console.log(nombre)
                                        let valor = row.info_concierto.map(e => {
                                            return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                                        }).reduce((a, b) => a + b, 0)
                                        let cantida = row.info_concierto.map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                                        row.Valortotal = parseFloat(valor)
                                        row.cantidad = cantida
                                        row.concierto = nombre[0]
                                        return { ...row }
                                    })//.filter(e => e.forma_pago =="Deposito")
                                    //sessionStorage.setItem("datoscompras", JSON.stringify(newdatos))
                                    console.log(newdatos)
                                    let order = newdatos.sort(sorter)
                                    usedispatch(setTicket({ tiketslist: order }))
                                    // setTikes(order)
                                    usedispatch(setCompras({ compras: order }))
                                    let nuevosValores = []
                                    let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                                    let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                                    let arayReallocalidad = []
                                    let arrprueb = []
                                    /* newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                                         elm.info_concierto.map(loc => {
                                             // cantidad: loc.cantidad, precio: precio[loc.id_localidad],
                                             arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto, codigo: elm.codigoEvento })
                                         })
                                     })*/
                                    newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                                        elm.ticket_usuarios.map(item => {
                                            // cantidad: loc.cantidad, precio: precio[loc.id_localidad],
                                            if (arrprueb.length == 0) {
                                                arrprueb.push({ localidad: item.localidad, cantidad: 1, precio: item.valor, concierto: item.concierto, codigoEvento: item.codigoEvento })
                                            }
                                            //  console.log(item, arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento))
                                            if (arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)) {
                                                //        console.log(arrprueb.some(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento))
                                                // let cantidad = arrprueb.filter(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)[0].cantidad + 1
                                                let index = arrprueb.findIndex(e => e.localidad == item.localidad && e.codigoEvento == item.codigoEvento)
                                                let cantidad = arrprueb[index].cantidad + 1
                                                arrprueb[index].cantidad = cantidad
                                            } else {
                                                arrprueb.push({ localidad: item.localidad, cantidad: 1, precio: item.valor, concierto: item.concierto, codigoEvento: item.codigoEvento })
                                            }
                                        })
                                    })

                                    let arrayIndividual = []
                                    // console.log(consulat)
                                    console.log(arayReallocalidad, arrprueb)
                                    /* arayReallocalidad.forEach(elm => {
                                         if (arrayIndividual.some(e => e.id == elm.id)) {
                                             let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                                             let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                                             arrayIndividual[dat].cantidad = tota
                                         }
                                         else {
                                             arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad, precio: elm.precio })
                                         }
                                     })*/
                                    //console.log(arrayIndividual)
                                    let datos = arrprueb.map(f => {
                                        return [f.localidad, f.concierto, parseInt(f.cantidad)]
                                    })


                                    let nuevo = arrprueb.map(f => {
                                        return [f.localidad, f.concierto, parseInt(f.cantidad)]
                                    })
                                    setDts([
                                        ["Localidad", "evento", "cantidad"],
                                        ...nuevo
                                    ])
                                    usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))

                                    usedispatch(setlisticket({ ticket: false }))
                                    return
                                }
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
        usedispatch(setTabs({ number: newValue }))
    };
    function abrirModal(e) {
        usedispatch(setModal({ nombre: "confirmar", estado: e }))
    }
    function detalle(e) {
        sessionStorage.setItem("Detalleuid", JSON.stringify({ ...e }))
        history.push("/admin/Reporte/" + e.id)
    }
    const options = {
        title: "Ventas Globales Aprobadas",
        pieHole: 0.4,
        is3D: false,
    };
    function filtrarArray(array, fechaInicio, fechaFin, nombre, forma_pago) {
        return array.filter((element) => {
            const fechaElemento = new Date(element.fechaCreacion.split(" ")[0]);
            const cumpleRangoFecha = (!fechaInicio || fechaElemento >= new Date(fechaInicio)) &&
                (!fechaFin || fechaElemento <= new Date(fechaFin));
            const cumpleNombre = !nombre || element.concierto === nombre;
            const cumpleFormaPago = !forma_pago || element.forma_pago === forma_pago;
            //return cumpleRangoFecha && cumpleNombre && cumpleFormaPago;
            return cumpleNombre && cumpleFormaPago;
        });

    }
    function filtrarPorNombre(array, nombre) {
        console.log(array)
        if (!nombre) {
            return array;
        }
        return [["Localida", "evento", "ganancias"], ...array.filter(subarray => subarray[1] === nombre)];
    }
    function ExportatContactos() {
        $.confirm({
            theme: 'supervan',
            closeIcon: true,
            title: 'Exportar',
            content: 'Desea Descargar  los contactos?',
            type: 'red',
            buttons: {
                aproba: {
                    text: "Aceptar",
                    btnClass: 'btn-success',
                    action: function () {
                        Contactos_Boletos(alert).then(salida => {
                            console.log(salida)
                            if (salida.estado && salida.data.length) {
                                let nuevos = salida.data.filter(e => e.movil).map(Element => {
                                    let nuevos = formatearNumero("" + Element["movil"])
                                    return { "contactos": nuevos }
                                }).filter(e => e.contactos)
                                console.log(nuevos)
                                var myFile = alert + "Contactos.xlsx";
                                var myWorkSheet = XLSX.utils.json_to_sheet(nuevos);
                                var myWorkBook = XLSX.utils.book_new();
                                XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
                                XLSX.writeFile(myWorkBook, myFile);
                                console.log(nuevos)

                            }
                        }).catch(err => {

                        })
                    }
                },
                rechaza: {
                    text: "Rechazar",
                    btnClass: 'btn-success',
                    action: function () { }
                }
            }
        });

    }
    function formatearNumero(numero) {
        const regex = /^\+?593\d{9}$/;
        let dato = numero.trim()
        // Comprobar si el número coincide con la expresión regular
        if (regex.test(dato)) {
            return dato.replace("+", "")
        }
        else if (dato.length === 9) {
            return "593" + dato
        } else return undefined;
    }
    const locale = 'es'
    const label = {
        0: "Hoy",
        1: "Ayer",
        2: "Esta semana",
        3: "Ultima semana",
        4: "Este mes",
        5: "Ultimo mes"
    }
    let labels = {
        0: "Días hasta hoy",
        1: "Días a partir de hoy"
    }
    defaultInputRanges.map((e, i) => {
        e.label = labels[i]
        return { ...e }
    })
    return (
        <>


            {
                modal.nombre == "Aprobar" ?
                    <ModalAprobarViews /> : ""}
            {
                modal.nombre == "boleto" ?
                    <ModalBoletoApro /> : ""
            }
            <ModalConfima />
            <div className=" container-fluid">
                <div className="pb-2" >
                    <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                        data-toggle="atras " data-placement="top" title="atras"
                        onClick={refrescar}

                    >
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </a>
                    <Slideout

                        btnText="Filtrar"
                        title="Eventos"
                    >
                        <div className="row col-12">
                            <div className="col-12 my-2">
                                <label className=" form-label">Rango de Fecha</label>
                                <input className=" form-control" name="datefilter" value={fecha} />
                            </div>
                            <div className=" col-12 mb-2">
                                <label className=" form-label">Lista de eventos</label>
                                <select
                                    onChange={(e) => setAlert(e.target.value)}
                                    className=" form form-control"
                                    value={alert}
                                >
                                    <option className=" form-label" value={""}>
                                        Todos
                                    </option>
                                    {
                                        Object.keys(Object.groupBy(filtrarArray(tiketslist.filter(e => e.estado_pago == "Pagado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), ''), ({ info_concierto }) => info_concierto[0].nombreConcierto), metodos).length > 0 ?
                                            Object.keys(Object.groupBy(filtrarArray(tiketslist.filter(e => e.estado_pago == "Pagado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), ''), ({ info_concierto }) => info_concierto[0].nombreConcierto), metodos).map((e, i) => {
                                                if (e) {
                                                    return (

                                                        <option key={i} className=" form-label" value={e}>
                                                            {e}
                                                        </option>)
                                                }
                                            })
                                            : ""
                                    }
                                </select>

                            </div>
                            {alert == "" ? "" :
                                <div className="col-12 mb-2">
                                    <label className=" form-label">Importar todos los contactos de {alert}</label>
                                    <button className="  btn btn-sm btn-success" onClick={ExportatContactos}  >
                                        <i className=" fa fa-file-excel"></i> Exportar Contactos
                                    </button>
                                </div>}
                            <div className=" col-12 mb-2">
                                <label className=" form-label">Metodos de Pagos</label>
                                <select
                                    onChange={(e) => setMetodo(e.target.value)}
                                    className=" form form-control"
                                    value={metodos}
                                >
                                    <option className=" form-label" value={""}>
                                        Todos
                                    </option>
                                    <option className=" form-label" value={"Tarjeta"}>
                                        Tarjeta
                                    </option>
                                    <option className=" form-label" value={"Efectivo-Local"}>
                                        Efectivo-Local
                                    </option>
                                    <option className=" form-label" value={"Deposito"}>
                                        Deposito
                                    </option>
                                </select>
                            </div>
                            <div className="col-12">

                                <div className="card">
                                    <div className=" card-body">
                                        {datas.length > 0 ?
                                            <PiecharViewsSlect
                                                datas={
                                                    filtrarPorNombre(datas, alert)
                                                }
                                                options={options}

                                            /> : ""}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Slideout>
                </div>
            </div>
            <div className="row py-5 d-none">
                <div className="col-12 col-md-8 d-flex justify-content-center ">
                </div>

            </div>
            <div className=" container row"  >
            </div>
            {tiketslist.length > 0 ? <div className="container d-flex flex-wrap">
                {tiketslist.filter(e => e.estado_pago == "Pagado").length > 0 ? <ExportToExcel apiData={filtrarArray(tiketslist.filter(e => e.estado_pago == "Pagado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos).map(f => {
                    const texto = f.comentarios.reduce((acumulador, elemento) => {
                        return acumulador + ' ' + elemento.comentario;
                    }, '');
                    return {
                        ID_Registro: f.id,
                        ID_USUARIO: f.id_usuario,
                        ID_Operador: f.id_operador,
                        EVENTO: f.info_concierto[0].nombreConcierto,
                        CEDULA: f.cedula,
                        METODO: f.forma_pago,
                        iva: f.iva,
                        TOTAL_COMISION: f.comision_boleto,
                        TOTAL: f.subtotal == "" ? 0 : (parseFloat(f.subtotal) + parseFloat(f.iva)),
                        Subtotal: parseFloat(String(f.subtotal).replace('.', ',')),
                        cantida: f.info_concierto.reduce((total, concierto) => {
                            return total + parseInt(concierto.cantidad, 10);
                        }, 0),
                        MEDIO: f.canal,
                        CREACION: f.fechaCreacion,
                        ESTADO: (f.forma_pago == "Tarjeta") && (f.estado_pago == "Expirado" || f.estado_pago == "Pendiente") ?
                            f.estado_pago :
                            (f.forma_pago == "Tarjeta" && f.id_espacio_localida != 1) ?
                                (f.id_espacio_localida == 0) ?
                                    (f.estado_pago == "Expirado") ?

                                        f.estado_pago
                                        :
                                        " Por revisar" :
                                    "Sin Firmar" :
                                f.estado_pago,
                        Cosiliacion: (f.estado_autorizacion_sri != null) ? f.estado_autorizacion_sri : f.consolidado,
                        NumerTransacion: f.numerTransacion,
                        Banco: f.conciliacion.length > 0 ? f.conciliacion[0].banco : "",
                        Total_Conciliaciones: f.conciliacion.length > 0 ? f.conciliacion[0].total_pagado : "",
                        Concili_Forma: f.conciliacion.length > 0 ? f.conciliacion[0].forma_pago : "",
                        cuenta: f.conciliacion.length > 0 ? f.conciliacion[0].cuenta : "",
                        comentario: (f.comentarios.length > 0),
                        asuntos: f.comentarios.length > 0 ? texto : "",
                        PAGOMEDIO_LINK: f.link_pago,
                        COMPROBANTE_LINK: f.link_comprobante,
                        FIRMADO: (f.id_espacio_localida != null) ? 'SI' : 'NO',

                    }
                })} fileName={"Todos Pagados"} label={"Pagados"} />
                    : ""
                }
                {
                    tiketslist.filter(e => e.estado_pago == "Pendiente").length > 0 ?
                        <ExportToExcel apiData={filtrarArray(tiketslist.filter(e => e.estado_pago == "Pendiente", moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos)).map(f => {
                            return {
                                ID_Registro: f.id,
                                ID_USUARIO: f.id_usuario,
                                EVENTO: f.concierto,
                                CEDULA: f.cedula,
                                METODO: f.forma_pago,

                                TOTAL_COMISION: f.Valortotal,
                                MEDIO: f.detalle,
                                TOTAL: f.total_pago,
                                CREO: f.info_registro.length > 0 ? f.info_registro[0].name : "",
                                TIPO: f.info_registro.length > 0 ? f.info_registro[0].title : "",
                                CREACION: f.fechaCreacion,
                                ESTADO: (f.forma_pago == "Tarjeta") && (f.estado_pago == "Expirado" || f.estado_pago == "Pendiente") ?
                                    f.estado_pago :
                                    (f.forma_pago == "Tarjeta" && f.id_espacio_localida != 1) ?
                                        (f.id_espacio_localida == 0) ?
                                            (f.estado_pago == "Expirado") ?

                                                f.estado_pago
                                                :

                                                " Por revisar" :
                                            "Sin Firmar" :
                                        f.estado_pago,
                                PAGOMEDIO_LINK: f.link_pago,
                                COMPROBANTE_LINK: f.link_comprobante,
                                NumerTransacion: f.numerTransacion
                            }
                        })} fileName={"Todos Pendientes"} label={"Pendientes"} /> : ""
                }
                {
                    tiketslist.filter(e => e.estado_pago == "Expirado").length > 0 ?
                        <ExportToExcel apiData={filtrarArray(tiketslist.filter(e => e.estado_pago == "Expirado", moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos)).map(f => {
                            return {
                                ID_Registro: f.id,
                                ID_USUARIO: f.id_usuario,
                                EVENTO: f.concierto,
                                CEDULA: f.cedula,
                                METODO: f.forma_pago,

                                TOTAL_COMISION: f.Valortotal,
                                MEDIO: f.detalle,
                                TOTAL: f.total_pago.replace(".", ","),
                                CREO: f.info_registro.length > 0 ? f.info_registro[0].name : "",
                                TIPO: f.info_registro.length > 0 ? f.info_registro[0].title : "",
                                CREACION: f.fechaCreacion,
                                ESTADO: f.estado_pago,
                                PAGOMEDIO_LINK: f.link_pago,
                                COMPROBANTE_LINK: f.link_comprobante,
                                NumerTransacion: f.numerTransacion
                            }
                        })} fileName={"Todos Expirados"} label={"Expirados"} /> :
                        ""}
                {tiketslist.filter(e => e.estado_pago == "Comprobar").length > 0 ?
                    <ExportToExcel apiData={filtrarArray(tiketslist.filter(e => e.estado_pago == "Comprobar",'')).map(f => {
                        return {
                            ID_Registro: f.id,
                            ID_USUARIO: f.id_usuario,
                            EVENTO: f.concierto,
                            CEDULA: f.cedula,
                            METODO: f.forma_pago,
                            CANTIDAD: f.cantidad,
                            TOTAL_COMISION: f.Valortotal,
                            MEDIO: f.detalle,
                            TOTAL: f.total_pago,
                            CREO: f.info_registro.length > 0 ? f.info_registro[0].name : "",
                            TIPO: f.info_registro.length > 0 ? f.info_registro[0].title : "",
                            CREACION: f.fechaCreacion,
                            ESTADO: f.estado_pago,
                            PAGOMEDIO_LINK: f.link_pago,
                            COMPROBANTE_LINK: f.link_comprobante,
                            NumerTransacion: f.numerTransacion
                        }
                    })} fileName={"Todos Comprobar"} label={"Comprobar"} /> :
                    ""}
                <ExportToExcel
                    apiData={dtos}
                    fileName={"Todos Eventos"}
                    label={"Cantidad"}
                />
            </div> : ""}
            <div
                style={{ minHeight: '250px' }} >
                <div className='container-fluid  p-0'>
                    <Tabs value={value} onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label={"Pagados: " + filtrarArray(tiketslist.filter(e => e.estado_pago == "Pagado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos).length + " Cons " + filtrarArray(tiketslist.filter(e => e.estado_pago == "Pagado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos).filter(f => f.consolidado == "Consolidado").length} {...a11yProps(0)} />
                        <Tab label={"Pendientes: " + filtrarArray(tiketslist.filter(e => e.estado_pago == "Pendiente"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos).length}{...a11yProps(1)} />
                        <Tab label={"Expirado: " + filtrarArray(tiketslist.filter(e => e.estado_pago == "Expirado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos).length} {...a11yProps(2)} />
                        <Tab label={"Comprobar: " + filtrarArray(tiketslist.filter(e => e.estado_pago == "Comprobar"), alert, metodos).length} {...a11yProps(3)} />
                    </Tabs>
                    <div className=" text-center  py-2  ">
                        <TabPanel value={value} index={0} className="text-center">
                            <MaterialReactTable
                                columns={listaRegistrototal}
                                data={filtrarArray(tiketslist.filter(e => e.estado_pago == "Pagado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos)}
                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'flex'
                                    }
                                }}
                                enableRowActions
                                initialState={{ showColumnFilters: false }} //show filters by default
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

                                        {/*
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
                                        </Tooltip>*/}

                                    </Box>
                                )}
                                enableGlobalFilterModes //enable the user to choose between multiple search filter modes
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1} className="text-center">
                            <MaterialReactTable
                                columns={listaRegistrototal}
                                data={filtrarArray(tiketslist.filter(e => e.estado_pago == "Pendiente"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos)}
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
                                        {clienteInfo() ? <Tooltip
                                            title="Comprobar" placement="top"
                                        >
                                            <IconButton
                                                color="error"
                                                onClick={() => detalle(row.original)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip> : ""}
                                        {/* <Tooltip
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
                                        */}

                                    </Box>
                                )}
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2} className="text-center" >
                            <MaterialReactTable
                                columns={listaRegistrototal}
                                data={filtrarArray(tiketslist.filter(e => e.estado_pago == "Expirado"), moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), alert, metodos)}
                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'flex'
                                    }
                                }}
                                enableRowActions
                                positionActionsColumn="first"
                                renderRowActions={({ row }) => (
                                    <Box sx={{ display: 'flex' }}>
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
                                        {/*<Tooltip
                                            title="Boletos especificos" placement="top"
                                        >
                                            <IconButton
                                                color="success"
                                                onClick={() => detalledos(row.original)}
                                            >
                                                <Preview />
                                            </IconButton>
                                        </Tooltip>*/}
                                    </Box>
                                )}
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={3} className="text-center" >
                            <MaterialReactTable
                                columns={listaRegistrototal}
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
                                                color="success"
                                                onClick={() => detalle(row.original)}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </Tooltip>
                                        {/*<Tooltip
                                            title="Borrar"
                                            placement="top"

                                        >
                                            <IconButton
                                                onClick={() => Deliminarregistro(row.original)}
                                                color="error">
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>*/}
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

