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
import { setTicket } from "StoreRedux/Slice/SuscritorSlice";
import { setlisticket } from "StoreRedux/Slice/SuscritorSlice";
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
    let ticket = useSelector((state) => state.SuscritorSlice)
    let datas = useSelector(state => state.SuscritorSlice.data)
    let tiketslist = useSelector(state => state.SuscritorSlice.compras)
    //console.log(state)



    const [alert, setAlert] = useState(null)
    

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


    function refrescar(){
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
                let order = newdatos.sort(sorter)
                usedispatch(setCompras({ compras: order }))
                usedispatch(setTicket({ tiketslist: order }))
                //sessionStorage.setItem("datoscompras", JSON.stringify(newdatos))
                console.log(newdatos)
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
                    return [f.localidad, f.concierto, parseInt(f.cantidad), parseInt(f.precio)]
                })
                setDts([
                    ["Localidad", "evento", "cantidad", "precio"],
                    ...nuevo
                ])
                usedispatch(setLabels({ labels: [["Localida", "evento", "ganancias"], ...datos] }))
                
                // setTikes(order)
                
                usedispatch(setlisticket({ ticket: false }))
                return
            }
        }).catch(err => {
            console.log(err)
        })
    }
    let [datos,stDatos]=useState([])
    useEffect(() => {
        // ListaPrecios()
        console.log(ticket.ticket)
        console.log(moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format())

        !ticket.ticket ? "" : 
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
                const nombresUnicos = new Set();
                stDatos(e.data)
                // Itera a través del JSON y agrega los nombres al conjunto
                e.data.filter(fe => moment(fe.fechaCreacion.split(" ")[0]).format() >= moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() && moment(fe.fechaCreacion.split(" ")[0]).format() <= states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).forEach(item => {
                    nombresUnicos.add(item.info_concierto[0].nombreConcierto);
                });
                console.log(e.data)
                // Convierte el conjunto de nombres únicos en un array
                const nombresArray = Array.from(nombresUnicos);
                setDatas(nombresArray)
                console.log(nombresArray);
                let newdatos = e.data.filter(fe => moment(fe.fechaCreacion).format() >= moment(states[0].startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() && moment(fe.fechaCreacion.split(" ")[0]).format() <=moment( states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format() ).map(row => {
                    console.log(moment(row.fechaCreacion).format())
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
                let order = newdatos.sort(sorter)
                usedispatch(setCompras({ compras: order }))
                usedispatch(setTicket({ tiketslist: order }))
                //sessionStorage.setItem("datoscompras", JSON.stringify(newdatos))
                console.log(newdatos)
                let nuevosValores = []
                let consulat = newdatos.filter(e => e.estado_pago == "Pagado").map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
                let consultados = newdatos.filter(e => e.estado_pago == "Pagado").filter(f => f.concierto == "Eladio Carrión Quito").map(g => { return parseFloat(g.Valortotal) }).reduce((a, b) => a + b, 0)
                let arayReallocalidad = []
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
                    return [f.localidad, f.concierto, parseInt(f.cantidad), parseInt(f.precio)]
                })
                setDts([
                    ["Localidad", "evento", "cantidad", "precio"],
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
    
  
    const [datas1, setDatas] = useState([])
    const [dtos, setDts] = useState([])
    const sorter = (a, b) => new Date(a.fechaCreacion) < new Date(b.fechaCreacion) ? 1 : -1;
    function rango(item) {
        if (item.selection.endDate == item.selection.startDate) {
            usedispatch(setCompras({ compras: compras }))
            usedispatch(setLabels({ labels: [...labelne] }))
            usedispatch(setFecha({ fecha: [item.selection] }))
            console.log(moment(item.selection.startDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format(), moment(states[0].endDate.toLocaleDateString("en-US").replace("/", "-").replace("/", "-")).format())
            return
        }
        else {
            usedispatch(setlisticket({ ticket: true }))
            usedispatch(setFecha({ fecha: [item.selection] }))
        }
        console.log(item)
    }
    const ListaPrecio = async () => {
        const info = await ListaPreciosEvent();
        return info
    }
    const Deliminarregistro = (parms) => {
       // console.log(parms.id)
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
                                        return [f.localidad, f.concierto, parseInt(f.cantidad), parseInt(f.precio)]
                                    })
                                    setDts([
                                        ["Localidad", "evento", "cantidad", "precio"],
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
        // setValue(newValue);
        // console.log(newValue)
    };
    function abrirModal(e) {
        usedispatch(setModal({ nombre: "confirmar", estado: e }))
    }
    function detalle(e) {    
        sessionStorage.setItem("Detalleuid", JSON.stringify({ ...e }))
        history.push("/admin/Reporte/" + e.id)
    }
    function detalledos(e) {
        history.push("/admin/Aprobar/" + e.cedula)
    }

    const options = {
        title: "Ventas Globales Aprobadas",
        pieHole: 0.4,
        is3D: false,
    };

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
            <div className=" container-fluid">
                <div >
                    <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                        data-toggle="atras " data-placement="top" title="atras"
                        onClick={refrescar}

                    >
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
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
                {tiketslist.filter(e => e.estado_pago == "Pagado").length > 0 ? <ExportToExcel apiData={datos.filter(e => e.estado_pago == "Pagado").map(f => {
                    return {
                        ID_Registro: f.id,
                        ID_USUARIO: f.id_usuario,
                        EVENTO: f.info_concierto[0].nombreConcierto,
                        CEDULA: f.cedula,
                        METODO: f.forma_pago,
                        iva: f.iva,
                        TOTAL_COMISION: f.comision_boleto,
                        TOTAL:f.subtotal==""?0:(parseFloat(f.subtotal)+parseFloat(f.iva)) ,
                        //CREO: f.info_registro.length > 0 ? f.info_registro[0].name : "",
                       // TIPO: f.info_registro.length > 0 ? f.info_registro[0].title : "",
                        Subtotal: f.subtotal,

                        MEDIO: f.detalle,
                        CREACION: f.fechaCreacion,
                        ESTADO: f.estado_pago,
                        Cosiliacion: f.consolidado,
                        PAGOMEDIO_LINK: f.link_pago,
                        COMPROBANTE_LINK: f.link_comprobante,
                        NumerTransacion: f.numerTransacion,
                        comentario: (f.comentarios.length > 0),
                        asuntos: JSON.stringify(f.comentarios)
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
            <div className="   " style={{ minHeight: '250px' }} >
                <div className='container-fluid  p-0'>
                    <Tabs value={value} onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label={"Pagados: " + tiketslist.filter(e => e.estado_pago == "Pagado").length + " Cons " + tiketslist.filter(e => e.estado_pago == "Pagado").filter(f => f.consolidado == "Consolidado").length} {...a11yProps(0)} />
                        <Tab label={"Pendientes: " + tiketslist.filter(e => e.estado_pago == "Pendiente").length}{...a11yProps(1)} />
                        <Tab label={"Expirado: " + tiketslist.filter(e => e.estado_pago == "Expirado").length} {...a11yProps(2)} />
                        <Tab label={"Comprobar: " + tiketslist.filter(e => e.estado_pago == "Comprobar").length} {...a11yProps(3)} />
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


                                        </Tooltip>*/}
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

