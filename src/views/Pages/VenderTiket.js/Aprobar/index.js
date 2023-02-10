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
import {  DateRangePicker, defaultStaticRanges, defaultInputRanges } from "react-date-range";
import * as locales from 'react-date-range/dist/locale'
import { setCompras } from "StoreRedux/Slice/SuscritorSlice";
import PiecharViewsSlect from "views/Components/Piechar/Piecharselect";
import { useGetLocalidadQuery } from "StoreRedux/Slicequery/querySlice";
import { retry } from "@reduxjs/toolkit/dist/query";
let { cedericon, atencion } = bancos
export default function AprobarView() {
    let usedispatch = useDispatch()
    let history = useHistory()
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    let value = useSelector((state) => state.SuscritorSlice.tabps)
    let compras = useSelector((state) => state.SuscritorSlice.compras)
    let labelne = useSelector((state) => state.SuscritorSlice.labels)

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

    let precio = {
        1: 21,
        2: 31,
        3: 41.5,
        4: 51.5,
        5: 82,
        9: 122,
        10: 67,
        11: 36,
        12: 122,
        13: 67,
        14: 36,
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
    const [datas, setDatas] = useState([])
    const sorter = (a, b) => new Date(a.fechaCreacion) < new Date(b.fechaCreacion) ? 1 : -1;
    function rango(item) {
        if (item.selection.endDate == item.selection.startDate) {
            setTikes(compras)
            setDatas([...labelne])
            setState([item.selection])
            return
        }
        else {
            setState([item.selection])
            let newdatos = compras.filter(e => new Date(e.fechaCreacion) >= new Date(item.selection.startDate) && new Date(e.fechaCreacion) <= new Date(item.selection.endDate))
            let nuevosValores = []
            let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
            let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
            let arayReallocalidad = []
            newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                JSON.parse(elm.info_concierto).map(loc => {
                    // arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                    // arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: Eventos[loc.id_localidad] })
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
                    arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad })
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
            let order = newdatos.sort(sorter)
            setTikes(order)
        }
        console.log(item)
    }
    useEffect(() => {
        if (errorPubli!=undefined){
            return
        }
        console.log(publici.data)
        listarRegistropanel({ "cedula": "" }).then(e => {
            if (e.data) {
                let newdatos = e.data.map(row => {
                    let nombre = JSON.parse(row.info_concierto).map(e => { return e.nombreConcierto })

                    let valor = JSON.parse(row.info_concierto).map(e => { 
                        
                        return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                    let cantida = JSON.parse(row.info_concierto).map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                    row.Valortotal = parseFloat(valor)
                    row.cantidad = cantida
                    row.concierto = nombre[0]
                    return { ...row }
                })//.filter(e => e.forma_pago =="Efectivo-Local")
                console.log(newdatos)
                let nuevosValores = []
                let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)

                let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                let arayReallocalidad = []
                newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                    JSON.parse(elm.info_concierto).map(loc => {

                        // arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                        // arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: Eventos[loc.id_localidad] })
                    //    console.log(publici.data.filter(e => e.id == loc.id_localidad)[0].localidad)
                        arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })

                        /*  if (parseInt(loc.id_localidad) == 10) {
                              nuevosValores.push(loc.id_localidad, loc.nombreConcierto, elm.cedula)
                          }*/
                    })

                })
                //  console.log(nuevosValores)
                let arrayIndividual = []
                console.log(consulat)
                console.log(arayReallocalidad)
                arayReallocalidad.forEach(elm => {
                    if (arrayIndividual.some(e => e.id == elm.id)) {
                        let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                        //  let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.precio)
                        let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                        arrayIndividual[dat].cantidad = tota
                    }
                    else {
                        //    arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.precio })
                        arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad })
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
                usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                let order = newdatos.sort(sorter)
                setTikes(order)
                usedispatch(setCompras({ compras: order }))
                return
            }
            //setTikes([])
        }).catch(err => {
            console.log(err)
        })
        //"dias hasta hoy"
        //"días a partir de hoy"

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
                                    let newdatos = e.data.map(row => {
                                        let nombre = JSON.parse(row.info_concierto).map(e => { return e.nombreConcierto })
                                        let valor = JSON.parse(row.info_concierto).map(e => { return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                                        let cantida = JSON.parse(row.info_concierto).map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                                        row.Valortotal = parseFloat(valor)
                                        row.cantidad = cantida
                                        row.concierto = nombre[0]
                                        return { ...row }
                                    })//.filter(e => e.forma_pago =="Efectivo-Local")
                                    console.log(newdatos)
                                    let nuevosValores = []
                                    let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)

                                    let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                                    let arayReallocalidad = []
                                    newdatos.filter(e => e.estado_pago == "Pagado").map(elm => {
                                        JSON.parse(elm.info_concierto).map(loc => {

                                            // arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })
                                            // arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: Eventos[loc.id_localidad] })

                                            arayReallocalidad.push({ id: loc.id_localidad, localidad: localidades[loc.id_localidad], cantidad: loc.cantidad, precio: precio[loc.id_localidad], concierto: loc.nombreConcierto })

                                            /*  if (parseInt(loc.id_localidad) == 10) {
                                                  nuevosValores.push(loc.id_localidad, loc.nombreConcierto, elm.cedula)
                                              }*/
                                        })

                                    })
                                    //  console.log(nuevosValores)
                                    let arrayIndividual = []
                                    console.log(consulat)
                                    console.log(arayReallocalidad)
                                    arayReallocalidad.forEach(elm => {
                                        if (arrayIndividual.some(e => e.id == elm.id)) {
                                            let dat = arrayIndividual.findIndex(e => e.id == elm.id)
                                            //  let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.precio)
                                            let tota = parseFloat(arrayIndividual[dat].cantidad) + parseFloat(elm.cantidad)
                                            arrayIndividual[dat].cantidad = tota
                                        }
                                        else {
                                            //    arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.precio })
                                            arrayIndividual.push({ id: elm.id, localidad: elm.localidad, evento: elm.concierto, cantidad: elm.cantidad })
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
                                    usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                                    let order = newdatos.sort(sorter)
                                    setTikes(order)
                                    usedispatch(setCompras({ compras: order }))
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
                <div className=" d-flex align-items-center justify-content-center ">
                    <DateRangePicker
                        editableDateInputs={false}
                        onChange={item => rango(item)}
                        moveRangeOnFirstSelection={false}
                        retainEndDateOnFirstSelection={false}
                        ranges={state}
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
                <div className="d-flex flex-wrap align-items-center justify-content-center mb-5 pb-5 ">
                    {datas.length > 0 ?
                        <PiecharViewsSlect
                            datas={datas}
                            options={options}

                        /> : ""}
                    {datas.length > 0 ?
                        <PiecharViewsSlect
                            datas={datas}
                            options={options}
                        /> : ""}
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
                        CREACION: f.fechaCreacion,
                        ESTADO: f.estado_pago,
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
                                TOTAL: f.total_pago,
                                CREACION: f.fechaCreacion,
                                ESTADO: f.estado_pago,
                                PAGOMEDIO_LINK: f.link_pago,
                                COMPROBANTE_LINK: f.link_comprobante,
                                NumerTransacion: f.numerTransacion
                            }
                        })} fileName={"Todos Expirados"} label={"Expirados"} /> :
                        ""}
                {tiketslist.filter(e => e.estado_pago == "Comprobar").length>0?
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
                        CREACION: f.fechaCreacion,
                        ESTADO: f.estado_pago,
                        PAGOMEDIO_LINK: f.link_pago,
                        COMPROBANTE_LINK: f.link_comprobante,
                        NumerTransacion: f.numerTransacion
                    }
                })} fileName={"Todos Comprobar"} label={"Comprobar"} />:
                ""}
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

