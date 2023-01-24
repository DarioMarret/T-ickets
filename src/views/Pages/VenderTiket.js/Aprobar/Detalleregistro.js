import moment from "moment";
import "moment"
import 'moment/locale/es';
import { useState } from "react"
import { useEffect } from "react"
import { PhotoProvider, PhotoView } from "react-photo-view"
import "react-photo-view/dist/react-photo-view.css"
import { useHistory, useParams } from "react-router"
import { buscarcliente } from "utils/Querypanelsigui"
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography, Tabs, Tab, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, Summarize } from '@mui/icons-material';
import { Listarticketporestado } from "utils/userQuery";
import { carrusel } from "views/Pages/Flasdeticket/imagenstatctic";
import { ChangeCircle } from "@mui/icons-material";
import { ListarLocalidad } from "utils/Querypanel";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { ValidarToken } from "utils/Querycomnet";
import { eliminartiket } from "utils/pagos/Queripagos";
import { ticketsboletos } from "utils/columnasub";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { generaTiketspdf } from "utils/Querycomnet";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GEnerarBoletos } from "utils/userQuery";
import ModalConfirma from "views/Components/MODAL/ModalConfirma";
export default function DetalleCompraView() {
    let { id } = useParams()
    let history = useHistory()
    let usedispatch = useDispatch()
    let nombres = JSON.parse(sessionStorage.getItem("Detalleuid"))
    let info = JSON.parse(sessionStorage.getItem("Suscritorid"))
    //console.log(nombres)
    const [usuario, setUser] = useState({
        "id": "",
        "cedula": "",
        "nombreCompleto": "",
        "email": "",
        "password": "",
        "movil": "",
        "fechaCreacion": "",
        "enable": "",
        "ciudad": "",
        "direccion": ""
    })
    let estado = {
        "reservado": "bg-warning",
        "NO": "Generar",
        "SI": "Generado",
        "null": "Sin generar",
        "Expirado": "Expirado",
        "Pendiente": "label label-warning",
        "Pagado": "label label-success",
        "Expirado": "label label-danger"
    }

    const Eliminara = (parm) => {
        console.log(parm)
        $.confirm({
            title: 'Desea eliminar este boleto ',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Eliminar',
                    btnClass: 'btn-red',
                    action: function () {
                        eliminartiket([parm]).then(ouput => {
                            // console.log(ouput)

                            if (ouput.success) {
                                console.log(ouput)
                                window.location.reload()
                                //setTikes(ouput.data)
                            }
                            if (!ouput.success) {
                                return $.alert("" + ouput.message)
                            }

                        }).catch(error => {
                            console.log(error)
                            $.alert("hubo un error no se pudo eliminar este registro")
                        })
                    }
                },
                close: function () {
                }
            }
        });

    }
    const [tiketslist, setTikes] = useState([])
    const [setDatos, setlocalida] = useState()
    function generaPDF(row) {

        generaTiketspdf({
            "cedula": row.cedula,
            "codigoEvento": row.codigoEvento,
            "id_ticket_usuarios": row.id
        }).then(ouput => {
            if (ouput.success) {
                window.open(ouput.link, "_blank");


            } else {
                usedispatch(setToastes({
                    show: true,
                    message: "No te preocupes tu boleto ya está comprado los pdf se generará pronto, paciencia gracias",
                    color: 'bg-primary',
                    estado: "Hubo un error intenta mas tarder"
                }))

            }

        }).catch(eror => {

            usedispatch(setToastes({
                show: true,
                message: "No te preocupes tu boleto ya está comprado los pdf se generará pronto, paciencia gracias",
                color: 'bg-primary',
                estado: "Hubo un error intenta mas tarder"
            }))
            //console.log(eror)
        })
    }

    useEffect(() => {
        let id = JSON.parse(nombres.info_concierto)
        console.log(id)
        // console.log(nombres.cedula)

        let datos = JSON.parse(sessionStorage.getItem("Detalleuid"))
        //  console.log(datos)
        setlocalida(setlocalida(JSON.parse(nombres.info_concierto)))
        buscarcliente({
            "cedula": datos.cedula,
            "email": ""
        }).then(ouput => {
            if (ouput.success) setUser({ ...ouput.data })
            // console.log(ouput)
        }).catch(erro => {
            console.log(erro)
        })
        Listarticketporestado(datos.cedula).then(ouput => {
            if (ouput.success) {
                let boletos = ouput.data.map((e) => {
                    if (id.find(f => f.nombreConcierto == e.concierto) != undefined) {
                        return { ...e }
                    }
                }
                )
                // console.log(boletos.filter(e=>e!= undefined))
                setTikes(boletos.filter(e => e != undefined))
            }
        }).catch(err => {
            console.log(err)
        })

        /*Listarticketporestado(info.cedula).then(ouput => {
            if (ouput.success) {
                console.log(ouput)
                setTikes(ouput.data)
            }
        }).catch(err => {
            console.log(err)
        })*/
        //console.log(info)

        // JSON.parse(nombres.info_concierto)
        /* nombres.info_concierto ? JSON.parse(nombres.info_concierto).map(e => {
             // console.log(e)
             listarRegistropanel({ "cedula": datos[0].cedula })
             return ListarLocalidad("" + e.id_localidad).then(ouput => {
                 //  return ouput
                 return ouput.data[0].nombre
             }).catch(err => {
                 return e.id_localidad
             })
 
         }) : ""*/
    }, [])
    //ValidarToken
    function validar() {
        console.log(nombres.id)
        $.confirm({
            title: 'Desea Aprobar el este Registro',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Aceptar',
                    btnClass: 'btn-red',
                    action: function () {
                        ValidarToken(nombres.id).then(ouput => {
                            if (ouput.success) {
                                // window.location.reload()
                                history.goBack()
                                //console.log(ouput)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                },
                close: function () {
                }
            }
        });

    }
    async function nombre(id) {
        let data = await ListarLocalidad("" + id)
        if (data.success) {
            $.alert(" Localidada " + data.data[0].nombre)
        } else {
            return id
        }
    }
    function Generarnew() {
        console.log(nombres)
        $.confirm({
            title: 'Generar de nuevo los Boletos',
            type: 'blue',
            content: '',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: function () {
                        GEnerarBoletos({
                            "id_registraCompra": nombres.id,
                            "cedula": nombres.cedula
                        }).then(ouput => {
                            ouput.success ? history.goBack() : ""
                            // console.log(ouput)
                        }).catch(errr => {
                            console.log(errr)
                        })



                    }
                },
                cancel: function () {
                    //close
                },
            },
        });
    }

    console.log(nombres)

    return (
        <PhotoProvider>
            <div>
                <ModalConfima />
                <ModalConfirma />
                <div className="row ">
                    <h1></h1>
                    <div className="d-flex justify-content-end  px-3">

                        <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                            data-toggle="tooltip" data-placement="top" title="Generar Boleto"
                            onClick={() => Generarnew()}
                        >
                            <i className=" fa fa-spinner">  </i>
                        </a>
                        <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                            data-toggle="tooltip" data-placement="top" title="Reportar"
                            onClick={() => usedispatch(setModal({ nombre: "confirmar", estado: { ...nombres } }))}
                        >
                            <i className=" fa fa-file">  </i>
                        </a>

                        {nombres.forma_pago == "Tarjeta" ?
                            <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                                data-toggle="tooltip" data-placement="top" title="Aprobar Tarjeta"
                                onClick={() => validar()}
                            >
                                <i className=" fa fa-check">  </i>
                            </a> : ""}
                        <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                            data-toggle="tooltip" data-placement="top" title="atras"
                            onClick={() => history.goBack()}
                        >
                            <i className=" fa fa-arrow-left">  </i>
                        </a>
                    </div>
                    <div className="row ">
                        <div className="col-12">
                            <div className=" px-0 py-2 w-100  bg-white ">
                                <div className=" d-flex flex-wrap flex-wrap-reverse">
                                    <div className="  col-12 col-md-6 ">
                                        <div className="px-3 d-flex align-items-center ">
                                            <h4 className="px-2  "
                                                style={{
                                                    fontWeight: "bold"
                                                }}
                                            >{usuario.nombreCompleto}</h4>
                                            <div>
                                                <span className={estado[nombres.estado_pago]}>
                                                    {nombres.estado_pago}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 d-flex  text-center justify-content-md-end  align-items-center">
                                        <div className="px-2">
                                            <div className="btn-group" >
                                                {
                                                    nombres.pdf == "SI" ? <a className=" btn btn-default btn-sm"><i className="bi bi-file-earmark-pdf text-danger"></i>
                                                        {estado[nombres.pdf]}
                                                    </a> : ""
                                                }
                                                {nombres.estado_pago == "Pagado" ? <a className=" btn btn-default btn-sm"><i className="bi bi-file-earmark-pdf"></i> Imprimir </a> : ""}
                                                <a className=" btn btn-default btn-sm" onClick={() => usedispatch(setModal({ nombre: "canjear", estado: { ...nombres } }))} ><i className="fa fa-usd"></i> Canjear </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 bg-secondary-sm">
                            <div className="d-flex flex-wrap pt-3 datos px-0 ">
                                <div className="col-12 col-md-4 border-bottom p-3">
                                    <div className="invoice-from">
                                        <small>De</small>
                                        <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">COMNET - SPEED - T-ICKETS  (COMPUTECNICSNET S.A)</strong>
                                            <small>
                                                <br></br>
                                                Edificio City Officce Oficina 301 <br></br>
                                                Indentificación: 092782129001<br></br>
                                                Teléfono: 0980850287 / 042599100<br></br>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 border-bottom p-3" >
                                    <div className="invoice-from">
                                        <small>Para</small>
                                        <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">{usuario.nombreCompleto}</strong><br></br>
                                            <small>
                                                {"Email: " + usuario.email}<br></br>
                                                {"Cédula: " + usuario.cedula}<br></br>
                                                {"Teléfono " + usuario.movil}<br></br>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-4 text-md-end border-bottom p-3 ">
                                    <div className="invoice-date">
                                        <small>Registro</small>
                                        <div className="m-t-5 m-b-5">
                                            <small className="text-inverse">
                                                Fecha de creación</small><br></br>
                                            {nombres.fechaCreacion} <br></br>
                                            #{id} <br></br>
                                            {nombres.forma_pago}<br></br>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="d-flex col-12  flex-wrap   ">
                            <div className="col-12 col-md-6 p-3" >
                                <div className="invoice-from">
                                    <small>Informacion de Pago</small>
                                    {nombres.forma_pago != "Tarjeta" ? <div className="m-t-5 m-b-5">
                                        <strong className="text-inverse">{nombres.banco == null ? "No hay Deposito reportado" : nombres.banco}</strong><br></br>
                                        <small>
                                            Comprobante# {nombres.numerTransacion} <br></br>
                                            <br></br>
                                            <br></br>
                                        </small>
                                      
                                    </div> :

                                        <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">Pago con Tarjeta</strong><br></br>
                                            <small>
                                                <a className=" btn btn-default btn-sm">
                                                    <i className="fa fa-credit-card"></i> Link de pago
                                                </a>
                                                <br></br>
                                                <br></br>
                                                <br></br>
                                            </small>
                                        </div>}
                                </div>
                            </div>
                            {nombres.forma_pago != "Tarjeta" ? <div className="col-12  col-md-6 text-md-end p-3 text-center ">
                                <div className="invoice-from text-center ">
                                    <small>Comprobante</small>
                                    <br></br>
                                    {nombres.link_comprobante == null ? "" : <a className=" btn btn-default btn-sm">
                                        <i className="fa fa-copy"></i> copy
                                    </a>}
                                    <br></br>
                                    <div className="m-t-5 m-b-5 rounded-4  ">

                                    </div>
                                    <PhotoView src={nombres.link_comprobante == null ? "data:image/png;base64,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" : nombres.link_comprobante}>
                                        <img className="img-fluid" src={nombres.link_comprobante == null ? "data:image/png;base64,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" : nombres.link_comprobante} alt="" />
                                    </PhotoView>
                                </div>
                            </div> : ""}
                            {nombres.forma_pago == "Tarjeta" ?
                                <div className="invoice-from text-center">



                                </div> : ""
                            }
                        </div>
                        <div className=" table-responsive">
                            <table className="table table-invoice">
                                <thead>
                                    <tr>
                                        <th>DESCRIPCION</th>
                                        <th className="text-center">CANT.</th>
                                        <th className="text-center" width="15%">loc id</th>
                                        <th className="text-right" width="15%">espacioid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {JSON.parse(nombres.info_concierto).length > 0 ? JSON.parse(nombres.info_concierto).map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{item.nombreConcierto}</td>
                                                <td className="text-center">{item.cantidad}</td>
                                                <td className="text-center">
                                                    <a className="btn btn-primary btn-sm " onClick={() => nombre(item.id_localidad)}>  <i className="fa fa-eye text-white"></i></a>
                                                </td>
                                                <td className="text-right">{item.idespaciolocalida}</td>
                                            </tr>
                                        )
                                    }) : ''}

                                </tbody>
                            </table>

                        </div>
                        <div className=" d-flex col-12  pb-3 border-top pt-2">
                            <div className=" invoice-from col-12">
                                <p>
                                    <a className="btn btn-primary" data-toggle="collapse" href="#collapsever" role="button" aria-expanded="false" aria-controls="collapsever">
                                        <i className=" fa fa-eye"></i>
                                    </a>
                                </p>
                                <div className="collapse" id="collapsever">
                                    <div className="container-fluid">
                                        <MaterialReactTable
                                            columns={ticketsboletos}
                                            data={tiketslist}
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

                                                        <Tooltip
                                                            title="Eliminar"
                                                            placement="top"
                                                        >
                                                            <a
                                                                onClick={() => Eliminara(row.original.id)}
                                                                className="border  btn-default btn-sm  "


                                                            >
                                                                <i className="fa fa-trash text-danger "></i>


                                                            </a>
                                                        </Tooltip>

                                                        {row.original.estado == "Pagado" ?
                                                            <Tooltip className="" title="Ver Ticket" placement="top">
                                                                <a
                                                                    className=" btn btn-default-su btn-sm "
                                                                    onClick={() => generaPDF(row.original)}
                                                                //href={item.pdf}
                                                                //target="_black"
                                                                >
                                                                    <i className="fa fa-download   "></i>

                                                                </a>
                                                            </Tooltip> :
                                                            <a
                                                                className=" btn btn-default btn-sm btn-disable"
                                                                disabled

                                                            >
                                                                <i className="fa fa-download "></i>


                                                            </a>
                                                        }

                                                    </div>
                                                </Box>
                                            )}



                                            localization={MRT_Localization_ES}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 pt-2  border-top text-center ">
                            <span > CONTACTANOS </span>
                            <div className="d-flex justify-content-center align-items-center pb-2">
                                <a className=' nav-link  px-0 mx-1  nav-icons  text-black' >
                                    <i className="bi bi-phone"></i>
                                    <span className=" " style={{ fontFamily: '', }} > T:0980850287 / 042599100 </span>
                                </a><div> </div>
                                <a className=' nav-link  px-0  mx-1 nav-icons  text-black' >
                                    <i className="bi bi-envelope"></i>
                                    <span className=" " style={{ fontFamily: '', }} > facturacion@comnet.ec </span>
                                </a>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </PhotoProvider>
    )
}