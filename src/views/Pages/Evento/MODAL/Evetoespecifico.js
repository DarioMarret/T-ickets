import React, { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Accordion, Badge } from "react-bootstrap"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv';
import { listarpreciolocalidad } from "utils/Querypanel"
import Modalupdate from "./ModalupdateEvento"
import { useDispatch } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import PreciosViews from "./ModalPrecios";
import SweetAlert from 'react-bootstrap-sweetalert';
import { ActualizaEstadoLocalidad } from "utils/Querypanelsigui";
import Collapse from 'react-bootstrap/Collapse';
import moment from "moment";
import 'moment-timezone'
import 'moment/locale/es';
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { useGetBoletosQuery } from "StoreRedux/Slicequery/querySlice";
import { ticketsboletos } from "utils/columnasub";
import PiecharViews from "views/Components/Piechar";
import ExportToExcel from "utils/Exportelemin";
import { ListarEspacios } from "utils/EspaciosQuery";
import { listarLocalidadaEspeci } from "utils/Querypanelsigui";
import { ListarLocalidad } from "utils/LocalidadesQuery";
import { Boleteria_Boletos, Boleteria_Nombre, Boleteria_canje, Boleteria_medios } from "utils/EventosQuery/index";
import { Contactos_Boletos } from "utils/Querycomnet";
import { Axiosmikroserdos, boleteriaAxios, mikroAxios } from "utils/index";
import MesasViews from "views/Pages/Mesas/Plantillas/indice";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
require('moment/locale/es.js')
import ExtendedForms from "views/Forms/ExcelTable";
import HotTableView from "views/Forms/HotTableView"
const EventoEspecifico = () => {
    let { id } = useParams()
    let usehistory = useNavigate()
    let useradmin = clienteInfo()
    let dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [alert, setAlert] = useState(null)
    const [showpr, setShowpr] = useState(false)
    const [precios, SetPrecios] = useState([])
    const [open, setOpen] = useState(true);
    const [dispoible, setDisponible] = useState([])
    const [global, setGobal] = useState([])
    const [comentarios, SetCometarios] = useState([])
    const [activeTab, setActiveTab] = useState("PRECIOS");
    const [valores, setvalores] = useState({
        localidad: '',
        precio_normal: '',
        precio_discapacidad: '',
        precio_tarjeta: '',
        precio_descuento: '',
        codigoEvento: "",
        id: '',
        localidad: '',
        habilitar_cortesia: ''
    })
    const [espacio, setEspacio] = useState([])
    const [evento, SetEvento] = useState({
        id: '',
        nombreConcierto: '',
        fechaConcierto: '',
        horaConcierto: '',
        lugarConcierto: '',
        cuidadConcert: '',
        descripcionConcierto: '',
        imagenConcierto: '',
        idUsuario: '',
        estado: '',
        codigoEvento: '',
        fechaCreacion: '',
        "botNumber": '',
        iva: "",
        LocalodadPrecios: []
    })
    async function Eliminar(e) {
        dispatch(setModal({ nombre: "precios", estado: { ...e } }))
    }
    async function Evento(event) {
        try {
            let { data } = await boleteriaAxios.get("Boleteria/ListaPreciosLocalidades/" + id)
            console.log(data)
            const cargar = data.data
            const precio = await listarpreciolocalidad(id)
            if (cargar) {
                let datos = [...cargar]
                SetEvento({
                    ...datos[0], LocalodadPrecios: precio.data,
                })
                await cargarlocalidad(datos, precio)

            }
        } catch (error) {
            //dispatch(setToastes({ show: true, message: 'Hubo un error en el procceso', color: 'bg-danger', estado: 'Error' }))
        }
    }
    async function cargarlocalidad(datos, precio) {
        try {
            const espacios = await ListarEspacios()
            let infoes = espacios.data.filter((e) => e.nombre == datos[0].lugarConcierto)
            SetPrecios(precio.data)
            const disponibles = await listarLocalidadaEspeci(infoes[0].id)
            const dat = await ListarLocalidad("")
            let listo = dat.data.filter(e => e.id_espacio == infoes[0].id)
            let filtros = disponibles.data.filter(e => e.id_espacio == infoes[0].id && e.espacio == infoes[0].nombre).map(el => {
                //console.log("filto", el.typo)
                const nombre = listo.filter(e => e.id == el.id_localidades)[0].nombre || ''
                return { ...el, nombreLocalidad: nombre }
            })
            const agrupadoPorLocalidadess = filtros.reduce((acc, item) => {

                if (!acc[item.id_localidades]) {
                    acc[item.id_localidades] = {
                        typo: item.typo,
                        codigoEvento: id,
                        id_localidades: item.id_localidades,
                        localidad: item.nombreLocalidad,
                        id_espacio: item.id_espacio,

                        cantidad: 0
                    }
                }
                acc[item.id_localidades].cantidad += 1;
                return acc;

            }, {});
            const mesasComentadas = await mikroAxios.post("Boleteria/itemlocalidad", {
                "id_localidades": "",
                "espacio": filtros[0].id_espacio
            })
            SetCometarios(mesasComentadas.data.localidades || [])
            const estadosPermitidos = new Set(["Pendiente", "Ocupado", "pendiente", "ocupado"]);
            const acumuladorPorNombre = filtros.reduce((acc, elemento) => {
                if (!listo.filter(e => e.id == elemento.id_localidades).length == 0) {
                    const nombre = listo.filter(e => e.id == elemento.id_localidades)[0].nombre
                    if (!estadosPermitidos.has(elemento.estado)) {
                        acc[nombre] = (acc[nombre] || 0) + 1;
                    }
                    return acc;
                }
            }, {});
            const acumuladorPorNombres = filtros.reduce((acc, elemento) => {
                if (!listo.filter(e => e.id == elemento.id_localidades).length == 0) {
                    const nombre = listo.filter(e => e.id == elemento.id_localidades)[0].nombre //elemento.id_localidades;
                    acc[nombre] = (acc[nombre] || 0) + 1;
                    return acc;
                }
            }, {});
            if (!acumuladorPorNombres) return
            const resultado = Object.entries(acumuladorPorNombres).map(([nombreMesa, cantidad]) => {
                let id = Object.values(agrupadoPorLocalidadess).find(el => el.localidad == nombreMesa)

                return { nombreMesa, cantidad, localidad: id.id_localidades, espacio: id.id_espacio, typo: id.typo };
            });
            const arrayMesas = Object.entries(acumuladorPorNombre).map(([nombreMesa, cantidad]) => {
                return { nombreMesa, cantidad };
            });
            //console.log("arrayMesas", resultado)
            setGobal(resultado)
            setDisponible(arrayMesas)

            let localidas = []
            resultado.map(elm => {
                let nuevoObjeto = []
                if (filtros.find(e => e.nombreLocalidad == elm.nombreMesa)) {
                    if (filtros.find(e => e.nombreLocalidad == elm.nombreMesa && e.typo == "mesa")) {
                        filtros.filter(e => e.nombreLocalidad == elm.nombreMesa).forEach(x => {
                            if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                                nuevoObjeto.push({ fila: x.fila, Mesas: [] })
                            }
                        })
                        filtros.filter(e => e.nombreLocalidad == elm.nombreMesa).forEach(x => {
                            let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
                            if (nuevoObjeto[index].Mesas.findIndex(z => z.mesa == x.mesa) == -1) {
                                nuevoObjeto[index].Mesas.push({ mesa: x.mesa, asientos: [] })
                            }
                        })
                        filtros.filter(e => e.nombreLocalidad == elm.nombreMesa).forEach(x => {
                            let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
                            let sillas = nuevoObjeto[index].Mesas.findIndex(y => y.mesa == x.mesa)
                            nuevoObjeto[index].Mesas[sillas].asientos.push({
                                silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula
                            })
                        })
                    } else if (filtros.find(e => e.nombreLocalidad == elm.nombreMesa && e.typo == "correlativo")) {
                        nuevoObjeto = [{ total: filtros.filter(e => e.nombreLocalidad == elm.nombreMesa).length }]
                    } else {
                        filtros.filter(f => f.nombreLocalidad == elm.nombreMesa).forEach(x => {
                            if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                                nuevoObjeto.push({ fila: x.fila, asientos: [{ silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula }] })
                            }
                            else {
                                let indixe = nuevoObjeto.findIndex(e => e.fila == x.fila)
                                nuevoObjeto[indixe].asientos.push({
                                    silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula
                                })
                            }
                        })
                    }
                }
                localidas.push({ nombre: elm.nombreMesa, localidad: nuevoObjeto, typo: filtros.filter(e => e.nombreLocalidad == elm.nombreMesa)[0].typo })
            })
            setEspacio(localidas)
        } catch (error) {

        }
    }
    async function Obtener_valores() {
        let boletos_camjeados = await Boleteria_canje(id)
        let boletos_boleto = await Boleteria_Boletos(id)
        let boletos_eventos = await Boleteria_Nombre(id)
        let { data: datos } = await Axiosmikroserdos.get("api/registros_porEvento/" + id)
        //console.log(datos)
        let boletos = await Boleteria_medios(id)
        //  console.log("nuevos", boletos)
        setReport({
            canje: boletos_camjeados.data,
            boleto: boletos_boleto.data,
            valores: boletos_eventos.data.map(elem => {
                return {
                    estado: elem.estado_pago,
                    forma_pago: elem.forma_pago,
                    cantidad: elem.cantidad,
                    boleto: elem.boleto,
                    comision_boleto: elem.comision_boleto,
                    iva: elem.iba,
                    subtotal: elem.subtotal,
                    comision_bancaria: elem.comision_bancaria,
                    total: elem.total
                }
            }),
            FormaPago: datos.data,
            pagos: datos.pagos,
            localidades: boletos.data.map(elem => {
                return {
                    localidad: elem.localidad,
                    forma_pago: elem.forma_pago,
                    precios: elem.valor,
                    total: elem.Total,
                    cantidad: elem.Cantidad
                }
            })
        })
    }
    function descarga(ids, nombre) {
        if (useradmin.perfil == 'suscriptores') return
        Axiosmikroserdos.get('api/codigoslocalidad/' + ids, {
            responseType: 'blob'  // Important for handling binary data
        })
            .then(response => {
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', nombre.replace(" ", "_") + 'codigos.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => console.error('There was a problem with the Axios request:', error));

    }
    function descargas(ids, nombre) {
        if (useradmin.perfil == 'suscriptores') return
        Axiosmikroserdos.get('api/descargalocalidad/' + ids, {
            responseType: 'blob'  // Important for handling binary data
        })
            .then(response => {
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', nombre.replace(" ", "_") + 'codigos.xlsx');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch(error => console.error('There was a problem with the Axios request:', error));

    }
    function DecargarRegistors() {
        if (useradmin.perfil == 'suscriptores') return
        Axiosmikroserdos.get('api/reporte_evento/' + id, {
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', evento.nombreConcierto.replace(" ", "_") + '.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
            .catch(error => console.error('There was a problem with the Axios request:', error));

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

    const [datas, setDatas] = useState([])
    async function Cambiar(i) {
        if (useradmin.perfil == 'suscriptores') return
        let info = {
            estado: i
        }
        try {
            const update = await ActualizaEstadoLocalidad(id, info)
            if (update.success) {
                //  console.log(update)
                hideAlert()
                dispatch(setToastes({ show: true, message: 'Evento actualizado correctamente', color: 'bg-success', estado: 'Exito' }))
                await Evento()
            }
        } catch (error) {
            // console.log(error)
            dispatch(setToastes({ show: true, message: 'Hubo un error intente mas tarde', color: 'bg-danger', estado: 'Error' }))
        }
    }
    let [tickes, setTikes] = useState([])
    let [report, setReport] = useState({
        canje: [],
        boleto: [],
        valores: [],
        localidades: [],
        FormaPago: [],
        pagos: [],
    })
    let { data: nuevos, isLoading: boletosloading } = useGetBoletosQuery()
    const options = {
        title: "Ventas Boletos",
        pieHole: 0.4,
        is3D: false,
        pieSliceText: "labels",

    };
    useEffect(() => {
        (async () => {
            Obtener_valores()
            boletosloading ? "" : setTikes(nuevos.data.filter(e => e.codigoEvento == id && e.estado == "Pagado"))
            let arrayIndividual = []
            boletosloading ? "" : nuevos.data.filter(e => e.codigoEvento == id && e.estado == "Pagado").forEach(elm => {
                if (arrayIndividual.some(e => e.id == elm.localidad)) {
                    let dat = arrayIndividual.findIndex(e => e.id == elm.localidad)
                    let tota = parseInt(arrayIndividual[dat].cantidad) + 1
                    arrayIndividual[dat].cantidad = parseInt(tota)
                } else {
                    arrayIndividual.push({ id: elm.localidad, localidad: elm.localidad, cantidad: 1 })
                }
            })

            boletosloading ? "" : console.log(arrayIndividual)
            //  }
            let newdatos = boletosloading ? [] : arrayIndividual.map(f => {
                return [f.localidad, parseInt(f.cantidad)]
            })
            boletosloading ? [] : setDatas([
                ["Localida", "ganancias"],
                ...newdatos
            ])
            await Evento()
        })()
    }, [boletosloading])
    const successAlert = (i) => {
        if (useradmin.perfil == 'suscriptores') return
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Estas Seguro?"
                onConfirm={() => Cambiar(i)}
                onCancel={() => cancelDetele()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showCancel
            >
                Esta deacuerdo en actualizar el estado de este evento
            </SweetAlert>
        );
    };

    const cancelDetele = () => {
        if (useradmin.perfil == 'suscriptores') return
        setAlert(
            <SweetAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Cancelado"
                onConfirm={() => hideAlert()}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
            >
                Se a cancelado la acción
            </SweetAlert>
        );
    };
    function ObtenerContactosquecompraron() {
        if (useradmin.perfil == 'suscriptores') return
        Contactos_Boletos(evento.nombreConcierto).then(salida => {
            console.log(salida)
            if (salida.estado && salida.data.length) {
                let nuevos = salida.data.filter(e => e.movil).map(Element => {

                    let nuevos = formatearNumero("" + Element["movil"])
                    return { "contactos": nuevos }
                }).filter(e => e.contactos)
                var myFile = evento.codigoEvento + "Contactos.xlsx";
                var myWorkSheet = XLSX.utils.json_to_sheet(nuevos);
                var myWorkBook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
                XLSX.writeFile(myWorkBook, myFile);
            }
        }).catch(err => {
            console.log(err)
        })

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
    let color = {
        "ACTIVO": "success",
        "PROCESO": "secondary",
        "CANCELADO": "danger"
    }
    const hideAlert = () => {
        setAlert(null);
    };

    const groupedData = report.canje.reduce((acc, curr) => {
        const localidad = curr.localidad;

        if (!acc[localidad]) {
            acc[localidad] = {
                localidad,
                canjeado: 0,
                noCanjeado: 0
            };
        }

        if (curr.canje === "CANJEADO") {
            acc[localidad].canjeado += curr.total;
        } else if (curr.canje === "NO CANJEADO") {
            acc[localidad].noCanjeado += curr.total;
        }

        return acc;
    }, {});
    const Actualizar = async (eventos) => {
        if (useradmin.perfil == 'suscriptores') return
        let param = {
            "botNumber": eventos,
            "codigoEvento": id
        }
        // console.log(evento)
        SetEvento({
            ...evento,
            "botNumber": eventos != "0980008000" ? "0980008000" : "",
        })
        await Axiosmikroserdos.post("api/botevent", param)

    }
    return (
        <>
            <PreciosViews
                showpr={showpr}
                setShowpr={setShowpr}
                valores={valores}
            />
            <Modalupdate
                show={show}
                Setshow={setShow}
                evento={evento}
            />
            {alert}
            <div className="container-fluid py-3">
                {/* Main Tabs */}
                <div className='col-12'>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#evento">
                                Evento
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link " data-toggle="tab" href="#reportes">
                                Reportes
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content col-sm-12">
                    {/* Evento Tab */}
                    <div className="tab-pane active" id="evento">
                        {/* Top Actions */}
                        <div className="row mb-3">
                            <div className="col-12 d-flex justify-content-end gap-2">
                                <button className="btn btn-primary" onClick={ObtenerContactosquecompraron}>
                                    <i className="fa fa-user"></i> Contactos
                                </button>
                                <button className="btn btn-primary" onClick={() => usehistory("/admin/Evento")}>
                                    <i className="fa fa-arrow-left"></i> Regresar
                                </button>
                                <button className="btn btn-success" onClick={DecargarRegistors}>
                                    <i className="fa fa-download"></i> Reporte
                                </button>
                            </div>
                        </div>
                        {/* Evento Info */}
                        <div className="row mb-3">
                            <div className="col-md-6 mb-2">
                                <h5>
                                    Evento {evento.nombreConcierto}{" "}
                                    <Badge bg={color[evento.estado ? evento.estado : "danger"]}>{evento.estado}</Badge>
                                    {evento.botNumber !== "0980008000" ? (
                                        <button className="mx-2 btn btn-success" onClick={() => Actualizar(evento.botNumber)}>
                                            HABILITAR VENTA DE BOT
                                        </button>
                                    ) : (
                                        <button className="mx-2 btn btn-danger" onClick={() => Actualizar(evento.botNumber)}>
                                            DESABILITAR VENTA EN BOT
                                        </button>
                                    )}
                                </h5>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end align-items-center gap-2">
                                <button className="btn btn-warning txt-white" onClick={() => successAlert("ACTIVO")}>ACTIVAR</button>
                                <button className="btn btn-secondary txt-white" onClick={() => successAlert("PROCESO")}>PROCESO</button>
                                {evento.codigoEvento !== "CANCELAR" && (
                                    <button className="btn btn-danger txt-white" onClick={() => successAlert("CANCELADO")}>CANCELAR</button>
                                )}
                            </div>
                        </div>
                        {/* Pie Chart */}
                        <div className="row mb-3">
                            <div className="col-12">
                                <PiecharViews options={options} datas={datas} />
                            </div>
                        </div>
                        {/* Sub Tabs */}
                        <div className="card">
                            <div className="card-body p-0">
                                <ul className="nav nav-tabs mb-3">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#filas">Boletos</a>
                                    </li>
                                    {comentarios.length > 0 && (
                                        <li className="nav-item">
                                            <a className="nav-link" data-toggle="tab" href="#refrencia">Ref: Mesas</a>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#mesas">Canjeados</a>
                                    </li>
                                    <li className="nav-item d-none">
                                        <a className="nav-link" data-toggle="tab" href="#correlativos">Valores variables</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#listas">Forma de pago</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#localidades">Localidades</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#info">Info</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    {/* Boletos */}
                                    <div className="tab-pane fade show active" id="filas">
                                        <div className="card-header pb-2">
                                            <h5>Tickets</h5>
                                        </div>
                                        {tickes && (
                                            <MaterialReactTable
                                                columns={ticketsboletos}
                                                data={tickes}
                                                muiTableProps={{ sx: { tableLayout: 'flex' } }}
                                                initialState={{
                                                    columnVisibility: { ciudad: false, concierto: false, protocol: false, link: false, qr: false }
                                                }}
                                                muiTableBodyProps={{
                                                    sx: { columnVisibility: { nombre: false } }
                                                }}
                                                renderDetailPanel={({ row }) => (
                                                    <Box sx={{ display: 'flex flex-column', margin: 'auto', gridTemplateColumns: '1fr 1fr', width: '100%' }}>
                                                        <Typography>ciudad : {row.original.ciudad} </Typography>
                                                        <Typography>Concierto : {row.original.concierto} </Typography>
                                                        <Typography>Protocolo : {row.original.protocolo} </Typography>
                                                        <Typography>link : {row.original.link} </Typography>
                                                        <Typography>QR : {row.original.qr} </Typography>
                                                    </Box>
                                                )}
                                                positionToolbarAlertBanner="bottom"
                                                displayColumnDefOptions={{
                                                    'mrt-row-numbers': { enableHiding: true }
                                                }}
                                                renderTopToolbarCustomActions={({ table }) => (
                                                    <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
                                                        {(tickes.length > 0 && (useradmin.perfil !== 'suscriptores')) && (
                                                            <ExportToExcel
                                                                apiData={tickes.map(e => {
                                                                    e.valor.replace(".", ",");
                                                                    return { ...e };
                                                                })}
                                                                fileName={"Boletos: " + evento.nombreConcierto + " " + moment().format('MM/DD/YYYY')}
                                                                label={"Boletos"}
                                                            />
                                                        )}
                                                        <div className="m-2">
                                                            {(useradmin.perfil === 'suscriptores') ? "" : (
                                                                <div className="d-flex">
                                                                    {global.length > 0 && [global[0]].map(ele => (
                                                                        <button className="btn btn-success btn-sm mx-1"
                                                                            key={"codigos-" + ele.espacio}
                                                                            onClick={() => descarga(ele.espacio, evento.nombreConcierto)}>
                                                                            <i className="bi bi-file-earmark-arrow-down-fill"></i> {evento.nombreConcierto} Códigos
                                                                        </button>
                                                                    ))}
                                                                    {global.length > 0 && global.map(ele => (
                                                                        <button className="btn btn-success btn-sm mx-1"
                                                                            key={"codigos-" + ele.localidad}
                                                                            onClick={() => descargas(ele.localidad, ele.nombreMesa)}>
                                                                            <i className="bi bi-file-earmark-arrow-down-fill"></i> {ele.nombreMesa + "-" + ele.localidad} Códigos
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <Button className="d-none"
                                                            disabled={table.getRowModel().rows.length === 0}
                                                            onClick={() => handleExportRows(table.getRowModel().rows)}
                                                            startIcon={<FileDownloadIcon />}
                                                        >
                                                            Export Filas de página
                                                        </Button>
                                                        <Button className="d-none"
                                                            disabled={
                                                                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                                            }
                                                            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                                                            startIcon={<FileDownloadIcon />}
                                                        >
                                                            Export Fila Seleccionada
                                                        </Button>
                                                    </Box>
                                                )}
                                                localization={MRT_Localization_ES}
                                            />
                                        )}
                                    </div>
                                    {/* Ref: Mesas */}
                                    <div className="tab-pane fade" id="refrencia">
                                        {comentarios.length > 0 && (
                                            <MaterialReactTable
                                                columns={[
                                                    { accessorKey: 'id_registraCompra', header: 'Sugerencia' },
                                                    { accessorKey: 'Localidad', header: 'Localidad' },
                                                    { accessorKey: 'fila', header: 'Fila' },
                                                    { accessorKey: 'silla', header: 'Silla' },
                                                    { accessorKey: 'estado', header: 'Estado' },
                                                    { accessorKey: 'cedula', header: 'Cédula' },
                                                    { accessorKey: 'mesa', header: 'Mesa' },
                                                ]}
                                                initialState={{ density: 'compact' }}
                                                data={comentarios}
                                            />
                                        )}
                                    </div>
                                    {/* Canjeados */}
                                    <div className="tab-pane fade" id="mesas">
                                        <ExtendedForms data={Object.values(groupedData)} />
                                        <table className="table text-end d-none">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Localidad</th>
                                                    <th scope="col">Canjeado</th>
                                                    <th scope="col">No Canjeado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {report.canje.length > 0 &&
                                                    Object.values(groupedData).map((elem, ind) => (
                                                        <tr key={ind}>
                                                            <td>{elem.localidad}</td>
                                                            <th>{elem.canjeado}</th>
                                                            <td>{elem.noCanjeado}</td>
                                                        </tr>
                                                    ))}
                                                <th>Total:</th>
                                                <th>{report.canje.length > 0 ? Object.values(groupedData).reduce((acc, elem) => acc + parseFloat(elem.canjeado), 0) : 0}</th>
                                                <th>{report.canje.length > 0 ? Object.values(groupedData).reduce((acc, elem) => acc + parseFloat(elem.noCanjeado), 0) : 0}</th>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Correlativos */}
                                    <div className="tab-pane fade" id="correlativos">
                                        <table className="table text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Cantidad</th>
                                                    <th scope="col">Localidad</th>
                                                    <th scope="col">Precio</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {report.boleto.length > 0 &&
                                                    report.boleto.map((elem, ind) => (
                                                        <tr key={ind}>
                                                            <th>${elem.total}</th>
                                                            <td>{elem.boleto}</td>
                                                            <td>{elem.localidad}</td>
                                                            <td>{elem.valor}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* Forma de pago */}
                                    <div className="tab-pane fade" id="listas">
                                        <ExtendedForms data={report.valores} />
                                    </div>
                                    {/* Localidades */}
                                    <div className="tab-pane fade" id="localidades">
                                        <div className="mb-2">
                                            <button onClick={() => Evento(activeTab)} className="btn btn-success">Actualizar</button>
                                        </div>
                                        {/* Localidades Nav Tabs */}
                                        <ul className="nav nav-tabs mb-3">
                                            <li className="nav-item">
                                                <a className={`nav-link ${activeTab === "PRECIOS" ? "active" : ""}`} onClick={() => setActiveTab("PRECIOS")}>
                                                    PRECIOS
                                                </a>
                                            </li>
                                            {global.map((el, ind) =>
                                                el.typo !== "correlativo" && (
                                                    <li className="nav-item" key={ind}>
                                                        <a
                                                            className={`nav-link ${activeTab === el.nombreMesa ? "active" : ""}`}
                                                            onClick={() => setActiveTab(el.nombreMesa)}
                                                        >
                                                            {el.nombreMesa}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                            <li className="nav-item">
                                                <a className={`nav-link ${activeTab === "disponible" ? "active" : ""}`} onClick={() => setActiveTab("disponible")}>
                                                    DISPONIBILIDAD
                                                </a>
                                            </li>
                                        </ul>
                                        {/* Localidades Tab Content */}
                                        <div className="tab-content">
                                            {/* PRECIOS */}
                                            <div className={`tab-pane fade ${activeTab === "PRECIOS" ? "show active" : ""}`} id="PRECIOS">
                                                <div className="d-flex flex-column">
                                                    <Accordion>
                                                        {precios.length > 0 &&
                                                            precios.map((e, i) => (
                                                                <Accordion.Item eventKey={i} key={i}>
                                                                    <Accordion.Header>Localidad: {e.localidad}</Accordion.Header>
                                                                    <Accordion.Body>
                                                                        <div className="d-flex flex-row justify-content-between">
                                                                            <div className="d-flex flex-column">
                                                                                <h5>Precio normal : {e.precio_normal}</h5>
                                                                                <h5>Precio discapacida : {e.precio_discapacidad}</h5>
                                                                                <h5>Precio TC/TD : {e.precio_tarjeta}</h5>
                                                                                <h5>Precio Descuento : {e.precio_descuento}</h5>
                                                                                <h5>Habilitar Cortesia : {e.habilitar_cortesia}</h5>
                                                                            </div>
                                                                            <div className="d-flex flex-column">
                                                                                {useradmin.perfil !== 'suscriptores' && (
                                                                                    <button className="btn btn-primary" onClick={() => Eliminar(e)}>
                                                                                        Editar
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            ))}
                                                    </Accordion>
                                                </div>
                                            </div>
                                            {/* Localidad Mesas/Fila/Correlativo */}
                                            {espacio.map((el, ind) => (
                                                <div
                                                    key={ind}
                                                    className={`tab-pane fade ${activeTab === el.nombre ? "show active" : ""}`}
                                                    id={el.nombre}
                                                >
                                                    {el.typo === 'mesa' &&
                                                        el.localidad.map((e, index) => (
                                                            <div className="d-flex align-items-center mb-2" key={index}>
                                                                <div className="d-flex pb-2">
                                                                    {e.Mesas.length > 0 &&
                                                                        e.Mesas.map((mesa, i) => (
                                                                            <div key={i}>
                                                                                <MesasViews
                                                                                    setMapa={() => Evento(activeTab)}
                                                                                    status={mesa.asientos.length}
                                                                                    text={mesa.mesa}
                                                                                    list={mesa.asientos}
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    {el.typo === 'fila' &&
                                                        el.localidad.map((e, i) => (
                                                            <div className="d-flex flex-row justify-content-around px-3 p-1" key={"lista" + i}>
                                                                <span>
                                                                    <div className="d-flex mx-1 bg-primary text-white justify-content-center align-items-center rounded-5" style={{ height: '25px', width: '25px' }}>
                                                                        <span style={{ fontSize: '0.5em' }}>{e.fila}</span>
                                                                    </div>
                                                                </span>
                                                                <div className="d-flex ml-3 flex-row px-1 justify-content-lg-center align-items-stretch" style={{ width: '100%' }}>
                                                                    {e.asientos.map((silla, index) => {
                                                                        let numero = String(silla.silla).split("-")[2];
                                                                        return (
                                                                            <div key={"silla" + index} id={silla.idsilla}
                                                                                className={silla.silla + ' d-flex rounded-5 sillasfila text-center justify-content-center align-items-center'}
                                                                                style={{ height: '20px', width: '20px', marginLeft: '1px' }}>
                                                                                <div className="px-3 d-flex text-white justify-content-center">
                                                                                    <span style={{ fontSize: '0.5em' }}>{numero}</span>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    {el.typo === 'correlativo' && <div>Aforo {el.localidad[0].total}</div>}
                                                </div>
                                            ))}
                                            {/* DISPONIBILIDAD */}
                                            <div className={`tab-pane fade ${activeTab === "disponible" ? "show active" : ""}`} id="disponible">
                                                <div className="row">
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Localidad</th>
                                                                <th>Disponible</th>
                                                                <th>Ocupado</th>
                                                                <th>Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dispoible.length > 0 ? dispoible.map(e => (
                                                                <tr key={e.nombreMesa}>
                                                                    <td>{e.nombreMesa}</td>
                                                                    <td>{e.cantidad}</td>
                                                                    <td>{parseInt(global.find(iten => iten.nombreMesa === e.nombreMesa).cantidad) - parseInt(e.cantidad)}</td>
                                                                    <td>{global.find(iten => iten.nombreMesa === e.nombreMesa).cantidad}</td>
                                                                </tr>
                                                            )) : (
                                                                <tr>
                                                                    <td colSpan={4}></td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Info */}
                                    <div className="tab-pane fade" id="info">
                                        <div className="row justify-content-center my-5">
                                            <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                                                <a href="#" onClick={() => setOpen(!open)}>
                                                    <div className="container rounded-7 shadow-md px-0">
                                                        <img src={evento.imagenConcierto ? evento.imagenConcierto : ''} className="img-fluid rounded-7 shadow-md" alt="" />
                                                    </div>
                                                </a>
                                                <Collapse in={false}>
                                                    <div className="container mt-4 px-0" id="collapseExample2">
                                                        <div className="card card-body rounded-7 py-5">
                                                            <div className="container">
                                                                <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">{evento.nombreConcierto}</span></h1>
                                                                <h4 style={{ fontSize: '1.4em' }}><span id="tour">{evento.descripcionConcierto}</span></h4>
                                                                <div className="col-12 border border-bottom my-3"></div>
                                                                <p style={{ fontSize: '1.2em' }}><b>Fecha:</b> <span id="fechaEvento">{evento.fechaConcierto + ' ' + evento.fechaConcierto}</span></p>
                                                                <p style={{ fontSize: '1.2em' }}><b>Lugar:</b> <span id="lugarEvento">{evento.lugarConcierto}</span></p>
                                                                <p style={{ fontSize: '1.2em' }}><b>Hora:</b> <span>{evento.horaConcierto}</span></p>
                                                                <div>
                                                                    <button className="btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => (useradmin.perfil === 'suscriptores') ? "" : setShow(true)}>Editar</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="container mt-4 px-0">
                                                    <div className="card card-body row d-flex flex-row rounded-7 py-5">
                                                        <div className="container col-12 col-md-6">
                                                            <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">{evento.nombreConcierto}</span></h1>
                                                            <h4 style={{ fontSize: '1.4em' }}><span id="tour">{evento.descripcionConcierto}</span></h4>
                                                            <div className="col-12 border border-bottom my-3"></div>
                                                            <p style={{ fontSize: '1.2em' }}><b>Fecha:</b> <span id="fechaEvento">{evento.fechaConcierto + ' ' + evento.fechaConcierto}</span></p>
                                                            <p style={{ fontSize: '1.2em' }}><b>Lugar:</b> <span id="lugarEvento">{evento.lugarConcierto}</span></p>
                                                            <p style={{ fontSize: '1.2em' }}><b>Hora:</b> <span>{evento.horaConcierto}</span></p>
                                                            <div></div>
                                                            <button className="btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => (useradmin.perfil === 'suscriptores') ? "" : setShow(true)}>Editar</button>
                                                        </div>
                                                    </div>
                                                    <div className="container col-12 col-md-6 rounded-7 px-0">
                                                        <img loading="lazy" src={evento.mapaConcierto} className="img-fluid rounded-7 shadow-md" style={{ height: "350px" }} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reportes Tab */}
                    <div className="tab-pane " id="reportes">
                        <div className="ht-theme-main-dark-auto"></div>
                        <div className="row">
                            <div className="col-12 p-2">
                                <ExtendedForms data={report.valores} />
                            </div>
                            <div className="col-12 p-2 text-center">
                                {report.FormaPago.length > 0 && (
                                    <HotTableView
                                        data={report.FormaPago}
                                        preventOverflow="horizontal"
                                        rowHeaders={true}
                                        colHeaders={['forma', 'localidad', 'cantidad', 'comision_total']}
                                        nestedRows={true}
                                        contextMenu={true}
                                        bindRowsWithHeaders={true}
                                        autoWrapRow={true}
                                        autoWrapCol={true}
                                        height="auto"
                                        licenseKey="non-commercial-and-evaluation"
                                    />
                                )}
                            </div>
                            <div className="col-12 text-center">
                                {report.pagos.length > 0 && (
                                    <HotTableView
                                        data={report.pagos}
                                        preventOverflow="horizontal"
                                        rowHeaders={true}
                                        colHeaders={['LOCALIDADES', 'LOCALIDAD', 'VALOR U.', 'CANTIDAD', 'COMISION TOTAL', 'TOTAL']}
                                        nestedRows={true}
                                        contextMenu={true}
                                        bindRowsWithHeaders={true}
                                        autoWrapRow={true}
                                        autoWrapCol={true}
                                        height="auto"
                                        licenseKey="non-commercial-and-evaluation"
                                    />
                                )}
                            </div>
                            <div className="col-12 p-2 d-none text-center">
                                <ExtendedForms data={report.localidades} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


}

export default EventoEspecifico