import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tabs, Tooltip, Tab, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send, CheckBox, Summarize, Preview, } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import { bancos } from "utils/Imgenesutils";
import ModalAprobarViews from "./Modalventas";
import ModalBoletoApro from "./Modalboleto";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
import { listaRegistrototal } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";
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
import { useGetLocalidadQuery } from "StoreRedux/Slicequery/querySlice";
import { retry } from "@reduxjs/toolkit/dist/query";
import { ListaPreciosEvent } from "utils/EventosQuery";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { setFecha } from "StoreRedux/Slice/SuscritorSlice";
import { ListarRegistropaneFecha } from "utils/pagos/Queripagos";
import moment from "moment";
moment.defaultFormat = "MM-DD-YYYY ";
let { cedericon, atencion } = bancos

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

    //console.log(state)
    const [data, setData] = React.useState([]);
    const [tiketslist, setTikes] = useState([])

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


    const hideAlert = () => {
        setAlert(null)
    }

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
    let localidades = {
        1: "General",
        2: "Preferencia",
        3: "Butacas",
        4: "Butacas VIP",
        5: "Ranchenato BOX",
        9: "SEN2 KBRN-G",
        10: "SAUCES BOYZ-G",
        11: "TODO O NADA-G",
        12: "SEN2 KBRN-Q",
        13: "SAUCES BOYZ-Q",
        14: "TODO-O-NADA-Q",
        23: "participantes-jessi",
        22: "participante-quito"
    }
    let Eventos = {
        1: "Ranchenato",
        2: "Ranchenato",
        3: "Ranchenato",
        4: "Ranchenato",
        5: "Ranchenato",
        9: "Eladio Carrión Guayaquil",
        10: "Eladio Carrión Guayaquil",
        11: "Eladio Carrión Guayaquil",
        12: "Eladio Carrión Quito",
        13: "Eladio Carrión Quito",
        14: "Eladio Carrión Quito",
    }
    let { data: publici = [], error: errorPubli, isLoading: info } = useGetLocalidadQuery()
    function localidada(evento, localidad) {
        if (evento == "Eladio Carrión Guayaquil") {
            if (localidad == 9 || localidad == 12) {
                return "SEN2 KBRN-Guayaquil"
            }
            if (localidad == 10 || localidad == 13) {
                return "SAUCES BOYZ-Guayaquil"
            }
            if (localidad == 11 || localidad == 14) {
                return "TODO-O-NADA-Guayaquil"
            }

        } else if (evento == "Eladio Carrión Quito") {
            if (localidad == 9 || localidad == 12) {
                return "SEN2 KBRN-Quito"
            }
            if (localidad == 10 || localidad == 13) {
                return "SAUCES BOYZ-Quito"
            }
            if (localidad == 11 || localidad == 14) {
                return "TODO-O-NADA-Quito"
            }
        }
        else {
            return localidades[localidad]
        }
    }
    function LocalidadPrecio(evento, localidad) {
        if (localidad == 9) {
            return "SEN2 KBRN-Guayaquil"
        }
        if (localidad == 10) {
            return "SAUCES BOYZ-Guayaquil"
        }
        if (localidad == 11) {
            return "TODO-O-NADA-Guayaquil"
        }
        if (localidad == 12) {
            return "SEN2 KBRN-Quito"
        }
        if (localidad == 13) {
            return "SAUCES BOYZ-Quito"
        }
        if (localidad == 14) {
            return "TODO-O-NADA-Quito"
        }
        return PreciosStore().filter(f => f.id == evento)[0].localidad
    }
    function ListarPrecio(evento, localidad) {
        if (localidad == 9) {
            return precio[9]
        }
        if (localidad == 10) {
            return precio[10]
        }
        if (localidad == 11) {
            return precio[11]
        }
        if (localidad == 12) {
            return precio[12]
        }
        if (localidad == 13) {
            return precio[13]
        }
        if (localidad == 14) {
            return precio[14]
        }
        return PreciosStore().filter(f => f.id == evento)[0].precio_normal
    }
    const [datas, setDatas] = useState([])
    const [dtos, setDts] = useState([])
    const sorter = (a, b) => new Date(a.fechaCreacion) < new Date(b.fechaCreacion) ? 1 : -1;
    function rango(item) {
        if (item.selection.endDate == item.selection.startDate) {
            setTikes(compras)
            setDatas([...labelne])
            //    setState([item.selection])
            usedispatch(setFecha({ fecha: [item.selection] }))
            console.log(moment(item.selection.startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format())
            /*ListarRegistropaneFecha(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(item.selection.endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format()).then(e => {
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
                        let nombre = JSON.parse(row.info_concierto).map(e => { return e.nombreConcierto })
                        let valor = JSON.parse(row.info_concierto).map(e => {
                            return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                        }).reduce((a, b) => a + b, 0)
                        let cantida = JSON.parse(row.info_concierto).map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                        row.Valortotal = parseFloat(valor)
                        row.cantidad = cantida
                        row.concierto = nombre[0]
                        return { ...row }
                    })//.filter(e => e.forma_pago =="Deposito")
                    sessionStorage.setItem("datoscompras", JSON.stringify(newdatos))
                    console.log(newdatos)
                    let nuevosValores = []
                    let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                    let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                    let arayReallocalidad = []
                    newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                        JSON.parse(elm.info_concierto).map(loc => {
                            // cantidad: loc.cantidad, precio: precio[loc.id_localidad],
                            arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                        })
                    })
                    let arrayIndividual = []
                    console.log(consulat)
                    console.log(arayReallocalidad)
                    arayReallocalidad.forEach(elm => {
                        if (arrayIndividual.some(e => e.id == elm.id)) {
                            let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                            let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                            arrayIndividual[dat].cantidad = tota
                        }
                        else {
                            arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad, precio: elm.precio })
                        }
                    })
                    console.log(arrayIndividual)
                    let datos = arrayIndividual.map(f => {
                        return [f.localidad, f.evento, parseInt(f.cantidad)]
                    })
                    setDatas([
                        ["Localida", "evento", "ganancias"],
                        ...datos
                    ])

                    let nuevo = arrayIndividual.map(f => {
                        return [f.localidad, f.evento, parseInt(f.cantidad), parseInt(f.precio)]
                    })
                    setDts([
                        ["Localidad", "evento", "cantidad", "precio"],
                        ...nuevo
                    ])
                    usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                    let order = newdatos.sort(sorter)
                    setTikes(order)
                    usedispatch(setCompras({ compras: order }))
                    return
                }
            }).catch(err => {
                console.log(err)
            })*/
            return
        }
        else {
            usedispatch(setFecha({ fecha: [item.selection] }))
            let newdatos = compras.filter(e => new Date(e.fechaCreacion) >= new Date(item.selection.startDate) && new Date(e.fechaCreacion) <= new Date(item.selection.endDate))
            let nuevosValores = []
            let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
            let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
            let arayReallocalidad = []
            newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                JSON.parse(elm.info_concierto).map(loc => {
                    arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                    if (parseInt(loc.id_localidad) == 10) {
                        nuevosValores.push(loc.id_localidad, loc.nombreConcierto, elm.cedula)
                    }
                })

            })
            console.log(nuevosValores)
            let arrayIndividual = []
            console.log(consulat)
            console.log(arayReallocalidad)
            arayReallocalidad.forEach(elm => {
                if (arrayIndividual.some(e => e.id == elm.id)) {
                    let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                    let tota = parseInt(arrayIndividual[dat].cantidad) + parseInt(elm.cantidad)
                    arrayIndividual[dat].cantidad = tota
                }
                else {
                    arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad, precio: precio[elm.id] })
                }
            })
            console.log(arrayIndividual)
            let datos = arrayIndividual.map(f => {
                return [f.localidad, f.evento, parseInt(f.cantidad)]
            })
            let nuevo = arrayIndividual.map(f => {
                return [f.localidad, f.evento, parseInt(f.cantidad), parseInt(f.precio)]
            })
            setDts([
                ["Localidad", "evento", "cantidad", "precio"],
                ...nuevo
            ])
            setDatas([
                ["Localida", "evento", "ganancias"],
                ...datos
            ])
            let order = newdatos.sort(sorter)
            setTikes(order)
        }
        console.log(item)
    }
    const ListaPrecio = async () => {
        const info = await ListaPreciosEvent();

        return info
    }
    useEffect(() => {
        if (errorPubli != undefined) {
            return
        }
        // LocalidadPrecio()
        //console.log(publici.data) 
        //   ListaPrecio()
        console.log(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-"))

        ListarRegistropaneFecha(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), "0" + states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).then(e => {
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
                    let nombre = JSON.parse(row.info_concierto).map(e => { return e.nombreConcierto })
                    let valor = JSON.parse(row.info_concierto).map(e => {
                        return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                    }).reduce((a, b) => a + b, 0)
                    let cantida = JSON.parse(row.info_concierto).map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                    row.Valortotal = parseFloat(valor)
                    row.cantidad = cantida
                    row.concierto = nombre[0]
                    return { ...row }
                })//.filter(e => e.forma_pago =="Deposito")
                sessionStorage.setItem("datoscompras", JSON.stringify(newdatos))
                console.log(newdatos)
                let nuevosValores = []
                let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                let arayReallocalidad = []
                newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                    JSON.parse(elm.info_concierto).map(loc => {
                        // cantidad: loc.cantidad, precio: precio[loc.id_localidad],
                        arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                    })
                })
                let arrayIndividual = []
                // console.log(consulat)
                // console.log(arayReallocalidad)
                arayReallocalidad.forEach(elm => {
                    if (arrayIndividual.some(e => e.id == elm.id)) {
                        let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                        let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                        arrayIndividual[dat].cantidad = tota
                    }
                    else {
                        arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad, precio: elm.precio })
                    }
                })
                //console.log(arrayIndividual)
                let datos = arrayIndividual.map(f => {
                    return [f.localidad, f.evento, parseInt(f.cantidad)]
                })
                setDatas([
                    ["Localida", "evento", "ganancias"],
                    ...datos
                ])

                let nuevo = arrayIndividual.map(f => {
                    return [f.localidad, f.evento, parseInt(f.cantidad), parseInt(f.precio)]
                })
                setDts([
                    ["Localidad", "evento", "cantidad", "precio"],
                    ...nuevo
                ])
                usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                let order = newdatos.sort(sorter)
                setTikes(order)
                usedispatch(setCompras({ compras: order }))
                return
            }
        }).catch(err => {
            console.log(err)
        })
        /* listarRegistropanel({ "cedula": "" }).then(e => {
             if(!e.success){
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
                     let nombre = JSON.parse(row.info_concierto).map(e => { return e.nombreConcierto })
                     let valor = JSON.parse(row.info_concierto).map(e => {
                         return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                     }).reduce((a, b) => a + b, 0)
                     let cantida = JSON.parse(row.info_concierto).map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                     row.Valortotal = parseFloat(valor)
                     row.cantidad = cantida
                     row.concierto = nombre[0]
                     return { ...row }
                 })//.filter(e => e.forma_pago =="Deposito")
                 sessionStorage.setItem("datoscompras",JSON.stringify(newdatos))
                 console.log(newdatos)
                 let nuevosValores = []
                 let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                 let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                 let arayReallocalidad = []
                 newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                     JSON.parse(elm.info_concierto).map(loc => {
                        // cantidad: loc.cantidad, precio: precio[loc.id_localidad],
                         arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                     })
                 })
                 let arrayIndividual = []
                 console.log(consulat)
                 console.log(arayReallocalidad)
                 arayReallocalidad.forEach(elm => {
                     if (arrayIndividual.some(e => e.id == elm.id)) {
                         let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                         let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                         arrayIndividual[dat].cantidad = tota
                     }
                     else {
                         arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad, precio: elm.precio })
                     }
                 })
                 console.log(arrayIndividual)
                 let datos = arrayIndividual.map(f => {
                     return [f.localidad, f.evento, parseInt(f.cantidad)]
                 })
                 setDatas([
                     ["Localida", "evento", "ganancias"],
                     ...datos
                 ])
 
                 let nuevo = arrayIndividual.map(f => {
                     return [f.localidad, f.evento, parseInt(f.cantidad), parseInt(f.precio)]
                 })
                 setDts([
                     ["Localidad", "evento", "cantidad", "precio"],
                     ...nuevo
                 ])
                 usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                 let order = newdatos.sort(sorter)
                 setTikes(order)
                 usedispatch(setCompras({ compras: order }))
                 return
             }
         }).catch(err => {
             console.log(err)
         })*/
    },
        [states])

    const Deliminarregistro = (parms) => {
        console.log(parms.id)

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
                        console.log(parms.id)
                        eliminarRegistro({ "id": parms.id }).then(ouput => {
                            console.log(ouput)
                            console.log(parms.id)
                            if (!ouput.success) { return $.alert("" + ouput.message) }
                            ListarRegistropaneFecha(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), "0" + states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).then(e => {
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
                                        let nombre = JSON.parse(row.info_concierto).map(e => { return e.nombreConcierto })
                                        let valor = JSON.parse(row.info_concierto).map(e => {
                                            return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad)
                                        }).reduce((a, b) => a + b, 0)
                                        let cantida = JSON.parse(row.info_concierto).map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                                        row.Valortotal = parseFloat(valor)
                                        row.cantidad = cantida
                                        row.concierto = nombre[0]
                                        return { ...row }
                                    })//.filter(e => e.forma_pago =="Deposito")
                                    sessionStorage.setItem("datoscompras", JSON.stringify(newdatos))
                                    console.log(newdatos)
                                    let nuevosValores = []
                                    let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                                    let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                                    let arayReallocalidad = []
                                    newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                                        JSON.parse(elm.info_concierto).map(loc => {
                                            // cantidad: loc.cantidad, precio: precio[loc.id_localidad],
                                            arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                                        })
                                    })
                                    let arrayIndividual = []
                                    // console.log(consulat)
                                    // console.log(arayReallocalidad)
                                    arayReallocalidad.forEach(elm => {
                                        if (arrayIndividual.some(e => e.id == elm.id)) {
                                            let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                                            let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                                            arrayIndividual[dat].cantidad = tota
                                        }
                                        else {
                                            arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad, precio: elm.precio })
                                        }
                                    })
                                    //console.log(arrayIndividual)
                                    let datos = arrayIndividual.map(f => {
                                        return [f.localidad, f.evento, parseInt(f.cantidad)]
                                    })
                                    setDatas([
                                        ["Localida", "evento", "ganancias"],
                                        ...datos
                                    ])

                                    let nuevo = arrayIndividual.map(f => {
                                        return [f.localidad, f.evento, parseInt(f.cantidad), parseInt(f.precio)]
                                    })
                                    setDts([
                                        ["Localidad", "evento", "cantidad", "precio"],
                                        ...nuevo
                                    ])
                                    usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                                    let order = newdatos.sort(sorter)
                                    setTikes(order)
                                    usedispatch(setCompras({ compras: order }))
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
        // setValue(newValue);
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

    const options = {
        title: "Ventas Globales Aprobadas",
        pieHole: 0.4,
        is3D: false,
    };
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    }
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [locale, setLocale] = React.useState('es');
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
    let [fitro, setFiltro] = useState("")
    defaultInputRanges.map((e, i) => {
        e.label = labels[i]
        return { ...e }
    })
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
            <div className="row py-5">
                <div className="col-12 col-md-8 d-flex justify-content-center ">
                    <div className="card">
                        <div className="card-body d-none d-sm-none d-md-block">
                            <DateRangePicker
                                editableDateInputs={false}
                                onChange={item => rango(item)}
                                moveRangeOnFirstSelection={false}
                                retainEndDateOnFirstSelection={false}
                                ranges={states}
                                months={1}
                                locale={locales[locale]}
                                staticRanges={[
                                    ...defaultStaticRanges.map((e, i) => {
                                        e.label = label[i]
                                        return { ...e }
                                    }),
                                ]}
                            />
                        </div>
                        <div className="card-body d-block d-sm-block d-md-none">
                            <DateRange
                                editableDateInputs={false}
                                onChange={item => rango(item)}
                                moveRangeOnFirstSelection={false}
                                ranges={states}
                                locale={locales[locale]}
                            />

                        </div>

                    </div>

                </div>
                <div className="col-12 col-sm-12 col-md-4">
                    <div className="card">
                        <div className=" card-body">
                            {datas.length > 0 ?
                                <PiecharViewsSlect
                                    datas={datas}
                                    options={options}

                                /> : ""}
                        </div>
                    </div>

                </div>
            </div>
            <div className=" container row"  >
            </div>
            {tiketslist.length > 0 ? <div className="container d-flex flex-wrap">
                {tiketslist.filter(e => e.estado_pago == "Pagado").length > 0 ? <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Pagado").map(f => {
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
                        CREO: f.info_registro.length>0? f.info_registro[0].name:"",
                        TIPO: f.info_registro.length>0? f.info_registro[0].title:"",
                        CREACION: f.fechaCreacion,
                        ESTADO: f.estado_pago,
                        Cosiliacion: f.consolidado,
                        PAGOMEDIO_LINK: f.link_pago,
                        COMPROBANTE_LINK: f.link_comprobante,
                        NumerTransacion: f.numerTransacion
                    }
                })} fileName={"Todos Pagados"} label={"Pagados"} />
                    : ""
                }
                {
                    tiketslist.filter(e => e.estado_pago == "Pendiente").length > 0 ?
                        <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Pendiente").map(f => {
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
                                CREO: f.info_registro.length>0? f.info_registro[0].name:"",
                                TIPO: f.info_registro.length>0? f.info_registro[0].title:"",
                                CREACION: f.fechaCreacion,
                                ESTADO: f.estado_pago,
                                PAGOMEDIO_LINK: f.link_pago,
                                COMPROBANTE_LINK: f.link_comprobante,
                                NumerTransacion: f.numerTransacion
                            }
                        })} fileName={"Todos Pendientes"} label={"Pendientes"} /> : ""
                }
                {
                    tiketslist.filter(e => e.estado_pago == "Expirado").length > 0 ?
                        <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Expirado").map(f => {
                            return {
                                ID_Registro: f.id,
                                ID_USUARIO: f.id_usuario,
                                EVENTO: f.concierto,
                                CEDULA: f.cedula,
                                METODO: f.forma_pago,
                                CANTIDAD: f.cantidad,
                                TOTAL_COMISION: f.Valortotal,
                                MEDIO: f.detalle,
                                TOTAL: f.total_pago.replace(".",","),
                                CREO: f.info_registro.length>0? f.info_registro[0].name:"",
                                TIPO: f.info_registro.length>0? f.info_registro[0].title:"",
                                CREACION: f.fechaCreacion,
                                ESTADO: f.estado_pago,
                                PAGOMEDIO_LINK: f.link_pago,
                                COMPROBANTE_LINK: f.link_comprobante,
                                NumerTransacion: f.numerTransacion
                            }
                        })} fileName={"Todos Expirados"} label={"Expirados"} /> :
                        ""}
                {tiketslist.filter(e => e.estado_pago == "Comprobar").length > 0 ?
                    <ExportToExcel apiData={tiketslist.filter(e => e.estado_pago == "Comprobar").map(f => {
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
                            CREO: f.info_registro.length>0? f.info_registro[0].name:"",
                            TIPO: f.info_registro.length>0? f.info_registro[0].title:"",
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
                                columns={listaRegistrototal}
                                data={tiketslist.filter(e => e.estado_pago == "Pagado")}
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
                                enableGlobalFilterModes //enable the user to choose between multiple search filter modes
                                localization={MRT_Localization_ES}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1} className="text-center">
                            <MaterialReactTable
                                columns={listaRegistrototal}
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
                                columns={listaRegistrototal}
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

