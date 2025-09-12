import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";

import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useSocket } from '../../../hook/socket'
import { AxioBoleteria, boleteriaAxios, mikroAxios } from "utils/index";
import MesasViews from "../Mesas/Plantillas/indice";
import { SillasView } from "./SillasView.js"
import { logWithCallback } from "utilsstile.js/style";
const EventoStandView = () => {
    let { id } = useParams()
    let usehistory = useNavigate()
    let useradmin = clienteInfo()
    const [alert, setAlert] = useState(null)
    const [espacio, setEspacio] = useState([])
    const [items, setItem] = useState([])
    const [global, setGobal] = useState([])
    const [activeTab, setActiveTab] = useState("PRECIOS");
    const { connected, emit, on } = useSocket();

    useEffect(() => {
        on("stand", (msg) => {
            logWithCallback("📩", msg)
            Evento()
        });
    }, []);

    async function Evento() {
        try {
            let { data } = await boleteriaAxios.get("Boleteria/ListaPreciosLocalidades/" + id)

            const cargar = data.data
            const { data: precio } = await AxioBoleteria.get("ListaPreciosLocalidades/" + id)
            if (cargar) {
                let datos = [...cargar]

                await cargarlocalidad(datos, precio)

            }
        } catch (error) {
            //dispatch(setToastes({ show: true, message: 'Hubo un error en el procceso', color: 'bg-danger', estado: 'Error' }))
        }
    }
    async function cargarlocalidad(datos, precio) {
        try {
            const { data: espacios } = await AxioBoleteria.get("/api/v1/listar_espacios")
            let infoes = espacios.data.filter((e) => e.nombre == datos[0].lugarConcierto)
            const { data: disponibles } = await AxioBoleteria.get("/api/v1/listar_localidades_id_espacio_descripcion/" + datos[0].id_espacio)
            const { data: dat } = await AxioBoleteria.get("api/v1/listar_localidades/")
            let listo = dat.data.filter(e => e.id_espacio == datos[0].id_espacio)
            let filtros = disponibles.data.filter(e => e.id_espacio == infoes[0].id && e.espacio == infoes[0].nombre).map(el => {
                const nombre = listo.filter(e => e.id == el.id_localidades)[0].nombre || ''
                return { ...el, nombreLocalidad: nombre }
            })
            setItem(filtros)
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
            setGobal(resultado)
            setActiveTab(resultado[0].nombreMesa)
            const arrayMesas = Object.entries(acumuladorPorNombre).map(([nombreMesa, cantidad]) => {
                return { nombreMesa, cantidad };
            });
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
                                silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula, id_registraCompra: x.id_registraCompra
                            })
                        })
                    } else if (filtros.find(e => e.nombreLocalidad == elm.nombreMesa && e.typo == "correlativo")) {
                        nuevoObjeto = [{ total: filtros.filter(e => e.nombreLocalidad == elm.nombreMesa).length }]
                    } else {
                        filtros.filter(f => f.nombreLocalidad == elm.nombreMesa).forEach(x => {
                            if (!nuevoObjeto.some(e => e.fila == x.fila)) {
                                nuevoObjeto.push({ fila: x.fila, asientos: [{ silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula, id_registraCompra: x.id_registraCompra }] })
                            }
                            else {
                                let indixe = nuevoObjeto.findIndex(e => e.fila == x.fila)
                                nuevoObjeto[indixe].asientos.push({
                                    silla: x.silla, estado: x.estado, idsilla: x.id, cedula: x.cedula, id_registraCompra: x.id_registraCompra
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
    const succesLimit = (me, datos, cedulas, estado, id_registraCompra) => {
        if (useradmin.perfil === 'suscriptores') return;
        let estadoSeleccionado = estado;
        let detalle = id_registraCompra ?? '';
     
        let detal = datos.split("-")[0] + " Stand " + datos.split("-")[2]
        setAlert(
            <SweetAlert
                custom
                showCancel
                style={{ display: "block", marginTop: "-100px" }}
                title={"Cambiar estado de " + detal}
                onCancel={() => setAlert(null)}
                onConfirm={() => {
                    Actualizar({ params: [me], estado: estadoSeleccionado, cedula:"cedula", detalle });
                    setAlert(null)
                }}
                confirmBtnText="Guardar"
                cancelBtnText="Cancelar"
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
            >
                <div className="form-group text-left">
                    <label htmlFor="estado">Estado:</label>
                    <select
                        id="estado"
                        className="form-control"
                        defaultValue={estadoSeleccionado}
                        onChange={(e) => (estadoSeleccionado = e.target.value)}
                    >
                        <option value="Disponible">Disponible</option>
                        <option value="Ocupado">Ocupado</option>
                        <option value="RESERVADO">Reservado</option>

                    </select>
                </div>
               
                <div className="form-group text-left mt-3">
                    <label htmlFor="detalle">Detalle:</label>
                    <textarea
                        id="detalle"
                        className="form-control"
                        defaultValue={detalle}
                        placeholder="Agrega una nota o detalle..."
                        onChange={(e) => (detalle = e.target.value)}
                    />
                </div>

                <p className="mt-3">
                    <b>{datos.split(" ")[0]}</b>
                </p>
            </SweetAlert>
        );
    };
    function Actualizar({ params, estado, cedula, detalle }) {
        $.ajax({
            //   url: 'https://api.t-ickets.com/mikroti/Boleteria/item_localidad',
            "url": "https://api.t-ickets.com/mikroti/Boleteria/item_localidad",
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id_localidades": params,
                "estado": estado,
                "cedula": useradmin.username,
                "comentario": detalle 
            }),
            success: function (res) {
                $.alert('Comentario enviado correctamente.');

                //  window.location.reload();
            },
            error: function () {
                $.alert('Error al enviar el comentario.');
            }
        });
    }
    useEffect(() => {
        Evento()
    }, [])
    return (<div>
        {alert}
        <div className="tab-pane active" id="localidades">
            <p className="d-none">Estado: {connected ? "🟢 Conectado" : "🔴 Desconectado"}</p>
            {/* Localidades Nav Tabs */}
            <ul className="nav nav-tabs mb-3">

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
            <div className="tab-content">
                {/* PRECIOS */}

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
                                    <div className="d-flex ml-3 flex-row px-1 j align-items-stretch" style={{ width: '100%' }}>
                                        <SillasView
                                            mapa={e}
                                            succesLimit={succesLimit}
                                        />
                                    </div>
                                </div>
                            ))}
                        {el.typo === 'correlativo' && <div>Aforo {el.localidad[0].total}</div>}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === "PRECIOS" ? "show active" : ""}`} id="PRECIOS">
                    {espacio.length > 0 && espacio.map((el, ind) => (
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
                                                            setMapa={() => console.log("activeTab")}
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
                                        <div className="d-flex ml-3 flex-row px-1 j align-items-stretch" style={{ width: '100%' }}>
                                            {e.asientos.map((silla, index) => {
                                                let numero = String(silla.silla).split("-")[2];
                                                return (
                                                    <div key={"silla" + index} className={`d-flex  ${silla.estado == "none" ? "bg-none" : "bg-success"}   rounded-5 text-center  justify-content-center align-items-center `}
                                                        style={{ height: '30px', width: '30px', marginLeft: '1px' }} >
                                                        {silla.estado !== "none" && (<div className={'px-3 ' + silla.silla + 'd-flex   text-white justify-content-center  '} >
                                                            <div className="d-flex justify-content-center">
                                                                <span style={{ fontSize: '0.7em' }}>    {numero} </span>
                                                            </div>
                                                        </div>)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            {el.typo === 'correlativo' && <div>Aforo {el.localidad[0].total}</div>}
                        </div>
                    ))}
                </div>
                <div className={`tab-pane fade ${activeTab === "disponible" ? "show active" : ""}`}>
                    <MaterialReactTable
                        columns={[
                            {
                                accessorKey: "concierto",
                                header: "EVENTO",
                                size: 50
                            },
                            {
                                accessorKey: "silla",
                                header: "Numero",
                                size: 50
                            },

                            {
                                accessorKey: "nombreLocalidad",
                                header: "localidad",

                                size: 50
                            },
                            {
                                accessorKey: "id_registraCompra",
                                header: "referencia",
                                sixe: 30
                            },
                            {
                                accessorKey: "cedula",
                                header: "usuario",
                                sixe: 30
                            },
                            {
                                accessorKey: "estado",
                                header: "Estado",
                                sixe: 15
                            },

                        ]}
                        data={items.filter(el => el.estado != "none")}
                        muiTableProps={{ sx: { tableLayout: 'flex' } }}
                        initialState={{
                            columnVisibility: { ciudad: false, concierto: false, protocol: false, link: false, qr: false }
                        }}
                        muiTableBodyProps={{
                            sx: { columnVisibility: { nombre: false } }
                        }}

                        positionToolbarAlertBanner="bottom"
                        displayColumnDefOptions={{
                            'mrt-row-numbers': { enableHiding: true }
                        }}

                    />
                </div>
            </div>
        </div>

    </div>)
}

export default EventoStandView