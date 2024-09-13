import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
import { Accordion, Badge } from "react-bootstrap"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Edit, Delete, Share } from '@mui/icons-material';
import { ExportToCsv } from 'export-to-csv';
import { columnsTicket } from "utils/ColumnTabla";
import { EliminareventoLocalidad, listarpreciolocalidad, ListarEventos } from "utils/Querypanel"
import Modalupdate from "./ModalupdateEvento"
import { useDispatch } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import PreciosViews from "./ModalPrecios";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Dias } from "utils/constantes";
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
import { Listarlocalidadid } from "utils/Querypanel";
import { ListarLocalidad } from "utils/LocalidadesQuery";
import { EventosActivos } from "utils/Querypanel";
import { Boleteria_Boletos, Boleteria_Nombre, Boleteria_canje } from "utils/EventosQuery/index";
import { Contactos_Boletos } from "utils/Querycomnet";
import { Axiosmikroserdos } from "utils/index";
require('moment/locale/es.js')

const EventoEspecifico = () => {
    let { id } = useParams()
    let usehistory = useHistory()
    let dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [alert, setAlert] = useState(null)
    const [showpr, setShowpr] = useState(false)
    const [precios, SetPrecios] = useState([])
    const [open, setOpen] = useState(true);
    const [dispoible, setDisponible] = useState([])
    const [global, setGobal] = useState([])
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
        LocalodadPrecios: []
    })
    async function Eliminar(e) {
        dispatch(setModal({ nombre: "precios", estado: { ...e } }))
        /* const elimnar = await EliminareventoLocalidad(e, f)
         if (elimnar.success) {
           hideAlert()
           console.log(elimnar, e, f)
           await Evento()
         }*/
    }
    function GetDay(e) {
        var da = new Date(e).getDay()
        return Dias[da]
    }

    async function Evento() {
        SetEvento({
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
            LocalodadPrecios: []
        })
        try {
            const cargar = await EventosActivos("PROCESO")
            const cargasd = await EventosActivos("ACTIVO")
            const cancelados = await EventosActivos("CANCELADO")
            const espacios = await ListarEspacios()
            const precio = await listarpreciolocalidad(id)
            const dat = await ListarLocalidad("")
            // ListarLocalidad
            if (cargar.success) {
                let datos = [...cargar.data.filter((e) => e.codigoEvento == id), ...cargasd.data.filter((e) => e.codigoEvento == id), ...cancelados.data.filter((e) => e.codigoEvento == id)]
                let infoes = espacios.data.filter((e) => e.nombre == datos[0].lugarConcierto)
                //console.log(infoes)
                let shortDate = new Date(datos[0].fechaConcierto);
                SetEvento({
                    ...datos[0], LocalodadPrecios: precio.data,
                })

                SetPrecios(precio.data)
                const disponibles = await listarLocalidadaEspeci(infoes[0].id)
                let filtros = disponibles.data.filter(e => e.id_espacio == infoes[0].id && e.espacio==infoes[0].nombre)
                let listo = dat.data.filter(e => e.id_espacio == infoes[0].id)
                const estadosPermitidos = new Set(["Pendiente", "Ocupado", "pendiente", "ocupado"]);
                const acumuladorPorNombre = filtros.reduce((acc, elemento) => {
                    if(!listo.filter(e => e.id == elemento.id_localidades).length==0){
                    const nombre = listo.filter(e => e.id == elemento.id_localidades)[0].nombre 
                    if (!estadosPermitidos.has(elemento.estado)) {
                        acc[nombre] = (acc[nombre] || 0) + 1;
                    }
                    return acc;}
                }, {});
                const acumuladorPorNombres = filtros.reduce((acc, elemento) => {
                    if(!listo.filter(e => e.id == elemento.id_localidades).length==0){
                    const nombre = listo.filter(e => e.id == elemento.id_localidades)[0].nombre //elemento.id_localidades;
                    acc[nombre] = (acc[nombre] || 0) + 1;

                    return acc;}
                }, {});

                console.log(acumuladorPorNombres)
                if(!acumuladorPorNombres) return
                const resultado = Object.entries(acumuladorPorNombres).map(([nombreMesa, cantidad]) => {
                    return { nombreMesa, cantidad };
                });
                const arrayMesas = Object.entries(acumuladorPorNombre).map(([nombreMesa, cantidad]) => {
                    return { nombreMesa, cantidad };
                });
                console.log(resultado, arrayMesas)
                setGobal(resultado)
                setDisponible(arrayMesas)
                let boletos_camjeados = await Boleteria_canje(id)
                let boletos_boleto = await Boleteria_Boletos(id)
                let boletos_eventos = await Boleteria_Nombre(datos[0].nombreConcierto)
                if (boletos_camjeados.estsdo && boletos_boleto.estsdo && boletos_eventos.estsdo) {
                    setReport({
                        canje: boletos_camjeados.data,
                        boleto: boletos_boleto.data,
                        valores: boletos_eventos.data
                    })
                }
                console.log(datos[0].nombreConcierto, boletos_camjeados, boletos_boleto, boletos_eventos)

            }
        } catch (error) {
            console.log(error)
            dispatch(setToastes({ show: true, message: 'Hubo un error en el procceso', color: 'bg-danger', estado: 'Error' }))
        }
    }

    function descarga() {

        Axiosmikroserdos.get('api/descargarcodigo/' + id, {
            responseType: 'blob'  // Important for handling binary data
        })
            .then(response => {
                console.log(response)
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'codigos.xlsx');
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
    const handleExportData = () => {
        //csvExporter.generateCsv(data);
    };

    const [datas, setDatas] = useState([])
    async function Cambiar(i) {
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
            console.log(error)
            dispatch(setToastes({ show: true, message: 'Hubo un error intente mas tarde', color: 'bg-danger', estado: 'Error' }))
        }
    }
    let [tickes, setTikes] = useState([])
    let [report, setReport] = useState({
        canje: [],
        boleto: [],
        valores: []
    })
    let { data: nuevos, isLoading: boletosloading } = useGetBoletosQuery()
    const options = {
        title: "Ventas Boletos",
        pieHole: 0.4,
        is3D: false,

    };
    useEffect(() => {
        (async () => {
            await Evento()

        })()
        boletosloading ? "" : setTikes(nuevos.data.filter(e => e.codigoEvento == id && e.estado == "Pagado"))
        //  if(boletosloading){
        // let mapa = nuevos.data.filter(e => e.codigoEvento == id && e.estado == "Pagado")
        let arrayIndividual = []
        //console.log(nuevos.data.filter(e => e.codigoEvento == id))
        // console.log(arayReallocalidad)
        boletosloading ? "" : nuevos.data.filter(e => e.codigoEvento == id && e.estado == "Pagado").forEach(elm => {
            if (arrayIndividual.some(e => e.id == elm.localidad)) {
                let dat = arrayIndividual.findIndex(e => e.id == elm.localidad)
                let tota = parseInt(arrayIndividual[dat].cantidad) + 1
                arrayIndividual[dat].cantidad = parseInt(tota)
            } else {
                arrayIndividual.push({ id: elm.localidad, localidad: elm.localidad, cantidad: 1 })
                // arrayIndividual.push({  })

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
        console.log(datas)
    }, [boletosloading])

    const successAlert = (i) => {
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
    const successAlertElimna = (e, i) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Estas Seguro?"
                onConfirm={() => Eliminar(e, i)}
                onCancel={() => cancelDetele()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                showCancel
            >
                Esta de acuerdo en Eliminar esta Localidad
            </SweetAlert>
        );
    }

    const cancelDetele = () => {
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
                //console.log(nuevos)

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
            <div className="d-flex mb-1 justify-content-end align-items-end" >
                <div>
                    <button className="btn btn-primary" onClick={ObtenerContactosquecompraron}>
                        <i className="fa fa-user" ></i>
                        Exportar Contactos
                    </button>
                </div>
                <div className="px-2">
                    <button className="btn btn-primary"
                        onClick={() => usehistory.push("/admin/Evento")} >
                        <i className="fa fa-arrow-left" ></i>
                        Regresar
                    </button>
                </div>

            </div>
            <div className="d-flex  justify-content-between  ">

                <h5 style={{ fontSize: '1.5em' }}>
                    <div className="d-flex flex-column  ">

                    </div>
                    Evento {evento.nombreConcierto} <Badge bg={color[evento.estado ? evento.estado : "danger"]}>{evento.estado}</Badge>  <button className="mx-2 btn btn-success">CODIGOS</button> </h5>
                <div className="d-flex flex-row">
                    <button className="btn btn-warning txt-white" onClick={() => successAlert("ACTIVO")} >ACTIVAR </button>
                    <button className="btn btn-secondary txt-white mx-1" onClick={() => successAlert("PROCESO")} >PROCESO</button>
                    {evento.codigoEvento != "CANCELAR" ? <button className="btn btn-danger txt-white mx-1" onClick={() => successAlert("CANCELADO")} >CANCELAR</button> : ""}
                </div>

            </div>
            <div className="conatiner row">
                <div className="row mx-auto p-0">
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4 mx-auto my-5" id="evento2">
                        <a href="#" onClick={() => setOpen(!open)}>
                            <div className="container rounded-7 shadow-md px-0">
                                <img src={evento.imagenConcierto ? evento.imagenConcierto : ''} className="img-fluid rounded-7 shadow-md " alt="" />
                            </div>
                        </a>
                        <Collapse in={!open} >
                            <div className=" container mt-4 px-0" id="collapseExample2">
                                <div className="card card-body rounded-7 py-5">
                                    <div className="container">
                                        <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold"> {evento.nombreConcierto}</span> </h1>
                                        <h4 style={{ fontSize: '1.4em' }}><span id="tour">{evento.descripcionConcierto} </span></h4>
                                        <div className="col-12 border border-bottom my-3"></div>
                                        <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento"> {GetDay(evento.fechaConcierto) + ' ' + evento.fechaConcierto}</span></p>
                                        <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento">{evento.lugarConcierto}</span></p>
                                        <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span >{evento.horaConcierto}</span></p>
                                        <div className="" >
                                            <button className=" btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => setShow(true)} >Editar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>

                    </div>
                    <div className="col-12 col-lg-8 mx-auto my-5" id="evento4">
                        <Accordion>
                            <Accordion.Item eventKey={0} >
                                <Accordion.Header>Precios </Accordion.Header>
                                <Accordion.Body>
                                    <Accordion defaultActiveKey="0" flush>
                                        {precios.length > 0 ?
                                            precios.map((e, i) => {
                                                return (
                                                    <Accordion.Item eventKey={i} key={i}>
                                                        <Accordion.Header>Localidad: {e.localidad}</Accordion.Header>
                                                        <Accordion.Body>
                                                            <div className="d-flex flex-row  justify-content-between">
                                                                <div className="d-flex flex-column">
                                                                    <div>
                                                                        <h5 >
                                                                            Precio normal : {e.precio_normal}
                                                                        </h5>
                                                                    </div>
                                                                    <div>
                                                                        <h5>
                                                                            Precio discapacida : {e.precio_discapacidad}
                                                                        </h5>
                                                                    </div>
                                                                    <div>
                                                                        <h5>
                                                                            Precio TC/TD : {e.precio_tarjeta}
                                                                        </h5>
                                                                    </div>
                                                                    <div>
                                                                        <h5>
                                                                            Precio Descuento : {e.precio_descuento}
                                                                        </h5>
                                                                    </div>
                                                                    <div>
                                                                        <h5>
                                                                            Habilitar Cortesia : {e.habilitar_cortesia}
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex flex-column ">
                                                                    <button className="btn btn-primary"
                                                                        onClick={() => Eliminar(e)}
                                                                    >Editar </button>
                                                                </div>
                                                            </div>


                                                        </Accordion.Body>
                                                    </Accordion.Item>

                                                )
                                            })
                                            : ''

                                        }

                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey={1} >
                                <Accordion.Header>Disponibles </Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th >Localidad</th>
                                                    <th >Disponible</th>
                                                    <th>Ocupado</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dispoible.length > 0 ? dispoible.map(e => {
                                                    return (
                                                        <tr>

                                                            <td>{e.nombreMesa}</td>
                                                            <td>{e.cantidad}</td>
                                                            <td>{parseInt(global.find(iten => iten.nombreMesa == e.nombreMesa).cantidad) - parseInt(e.cantidad)}</td>
                                                            <td>{global.find(iten => iten.nombreMesa == e.nombreMesa).cantidad}</td>
                                                        </tr>
                                                    )
                                                }) : <tr>

                                                    <td></td>
                                                    <td></td>
                                                </tr>}


                                            </tbody>
                                        </table>

                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>

                        </Accordion>

                    </div>
                </div>
                <div className="row" >
                    <div className="col-6">
                        <PiecharViews
                            options={options}
                            datas={datas}
                        />

                    </div>
                </div>
            </div>
            <div className="card">
                <div className='container-fluid row p-0'>
                    <div className='col-12'>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#filas"
                                >Boletos</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#mesas"
                                >Canjeados</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#correlativos">Valores variables </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#listas"
                                >Forma de pago</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content col-sm-12">
                        <div className="tab-pane active container " id="filas">
                            <div className="card-header pb-2">
                                <h5>Tickets</h5>
                            </div>
                            <MaterialReactTable
                                columns={ticketsboletos}
                                data={tickes}

                                muiTableProps={{
                                    sx: {
                                        tableLayout: 'flex'
                                    }
                                }}
                                initialState={
                                    {
                                        columnVisibility: { ciudad: false, concierto: false, protocol: false, link: false, qr: false }
                                    }
                                }
                                muiTableBodyProps={{
                                    sx: { columnVisibility: { nombre: false } }
                                }}
                                renderDetailPanel={({ row }) => (
                                    <Box
                                        sx={{
                                            display: 'flex flex-column',
                                            margin: 'auto',
                                            gridTemplateColumns: '1fr 1fr',
                                            width: '100%',
                                        }}
                                    >

                                        <Typography>ciudad : {row.original.ciudad} </Typography>
                                        <Typography>Concierto : {row.original.concierto} </Typography>
                                        <Typography>Protocolo : {row.original.protocolo} </Typography>
                                        <Typography>link : {row.original.link} </Typography>
                                        <Typography>QR : {row.original.qr} </Typography>


                                    </Box>
                                )}

                                /*enableRowActions
                               /*{ renderRowActions={({ row }) => (
                                  <Box sx={{ display: 'flex' }}>
                                    <IconButton
                                      color="success"
                                      arial-label="Enviar"
                                    >
                                      <Share />
                                    </IconButton>
                                    <IconButton
                                      color="error"
                                      aria-label="Bloquear"
                                    >
                                      <Delete />
                                    </IconButton>
                      
                                  </Box>
                                )}}*/
                                positionToolbarAlertBanner="bottom"
                                displayColumnDefOptions={{
                                    'mrt-row-numbers': {
                                        enableHiding: true, //now row numbers are hidable too
                                    },
                                }}
                                renderTopToolbarCustomActions={({ table }) => (
                                    <Box
                                        sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                                    >
                                        {tickes.length > 0 ? <ExportToExcel apiData={tickes.map(e => {
                                            e.valor.replace(".", ",")
                                            return { ...e }
                                        })}
                                            fileName={"Boletos: " + evento.nombreConcierto + " " + moment().format('MM/DD/YYYY')} label={"Boletos"}
                                        /> : ""}
                                        <div className="m-2">
                                            <button className="btn  btn-success  btn-sm"

                                                onClick={() =>
                                                    descarga()
                                                }


                                            >
                                                <i className="bi bi-file-earmark-arrow-down-fill"></i>    Exportar Códigos
                                            </button>
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
                        </div>
                        <div className="tab-pane  container " id="mesas">
                            <table class="table text-end">
                                <thead>
                                    <tr>


                                        
                                        <th scope="col" >Localidad</th>
                                        <th scope="col">Canjeado </th>
                                        <th scope="col">No Canjeado</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.canje.length > 0 ?
                                    
                                        Object.values(groupedData).map((elem, ind) => {
                                            return (
                                                <tr key={ind}>
                                                   
                                                    <td>{elem.localidad}</td>
                                                    <th >{elem.canjeado}</th>
                                                    <td>{elem.noCanjeado}</td>
                                                </tr>
                                            )
                                        })
                                        : ""}

                                </tbody>
                            </table>

                        </div>
                        <div className="tab-pane  container " id="correlativos">
                            <table class="table text-center">
                                <thead>
                                    <tr>

                                        <th scope="col">Total </th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Localidad</th>
                                        <th scope="col">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.boleto.length > 0 ?
                                        report.boleto.map((elem, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <th >${elem.total}</th>
                                                    <td>{elem.boleto}</td>
                                                    <td>{elem.localidad}</td>
                                                    <td>{elem.valor}</td>
                                                </tr>
                                            )
                                        })
                                        : ""}

                                </tbody>
                            </table>

                        </div>


                        <div className="tab-pane  container " id="listas">
                            <table class="table text-center">
                                <thead>
                                    <tr>

                                        <th scope="col">Total </th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col">iva</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Forma de PAgo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {report.valores.length > 0 ?
                                        report.valores.map((elem, ind) => {
                                            return (
                                                <tr key={ind}>
                                                    <th >${elem.tota}</th>
                                                    <td>{elem.subtotal}</td>
                                                    <td>{elem.iba}</td>
                                                    <td>{elem.boleto}</td>
                                                    <td>{elem.forma_pago}</td>
                                                </tr>
                                            )
                                        })
                                        : ""}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>



        </>
    )


}

export default EventoEspecifico