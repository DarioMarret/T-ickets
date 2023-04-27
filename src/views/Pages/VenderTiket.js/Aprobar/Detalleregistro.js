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
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js";
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
import { registraPagos } from "utils/pagos/Queripagos";
import { Liverarasiento } from "utils/userQuery";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import addNotification from "react-push-notification";
import { Seleccionaruserlista } from "utils/userQuery";
import { CanjearBoletoRegistro } from "utils/boletos/Queryboleto";
import { ConsolidarReporte } from "utils/pagos/Queripagos";
import ConsiliarView from "views/Components/MODAL/ModalConsilia";
import axios from "axios";
import ExportToExcel from "utils/Exportelemin";
import { BuscarTransacion } from "utils/pagos/Queripagos";
import ConsolidaRegistr from "./ModalesAp/CosolidaRegis";
import { ActualizarnumeroTransacion } from "utils/pagos/Queripagos";
import SweetAlert from "react-bootstrap-sweetalert";
import { infoTarjeta } from "utils/pagos/Queripagos";
import Inframene from "views/Components/IFrame";
import Iframe from "views/Components/IFrame/Iframe";
import { infoabimedia } from "utils/pagos/Queripagos";
import { eliminarRegistro } from "utils/pagos/Queripagos";
import { ComentarioRegistro } from "utils/pagos/Queripagos";
import { updateRegistro } from "utils/pagos/Queripagos";
import { ListaPreciosEvent } from "utils/EventosQuery";
import WhastappWiev from "views/Components/MODAL/ModalWhast";
export const PreciosStore = () => {
    let datos = JSON.parse(sessionStorage.getItem("PreciosLocalidad"))
    if (datos != null) {
        return datos
    } else {
        return []
    }
}
export default function DetalleCompraView() {
    let { id } = useParams()
    let history = useHistory()
    let usedispatch = useDispatch()
    let modal = useSelector(state => state.SuscritorSlice.modal)
    let nombres = JSON.parse(sessionStorage.getItem("Detalleuid"))
    let info = JSON.parse(sessionStorage.getItem("Suscritorid"))
    let useradmin = clienteInfo()
    console.log(nombres)
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
        "Expirado": "label label-danger",
        "Comprobar": "label label-warning"
    }
    const [coniliacion, setConsilia] = useState({
        Valor: "",
        banco: "",
        comprobante: "", cuenta: "",
        fecha: "",
        id: "",
        id_registro: "",
        imagen: "",
        metodo: "",
        propietario: "",
        usuario: ""
    })
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
    const [boletos, setlocalida] = useState([])
    const [repetidos, setRepetido] = useState([])
    const [tarjetadata, setDataTarjeta] = useState({
        acquirer: "",
        cardholder: "",
        display_number: "",
        grand_total: "",
        installments: "",
        message: "",
        payment_date: "",
        transmitter: "",
        card_brand: ""
    })
    function Abrirwhastapp() {
        usedispatch(setModal({ nombre: "whastapp", estado: usuario }))
    }
    const [alert, setAlert] = useState(null)
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
    function agregarComentario() {
        let id = nombres.id
        let id_operador = clienteInfo()
        $.confirm({
            title: 'Observación',
            type: 'green',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Agrege una comentario</label>' +
                '<textarea class="exampleFormControlTextarea1 form-control" id="exampleFormControlTextarea1" rows="3"></textarea>' +
                '</div>' +
                '</form>',
            typeAnimated: true,
            buttons: {
                formSubmit: {
                    text: 'Comentar',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.exampleFormControlTextarea1').val();
                        if (!name) {
                            $.alert('Ingrese un Comentario');
                            return false;
                        }
                        ComentarioRegistro({
                            "id_registro": id,
                            "id_operador": id_operador.id,
                            "comentario": name
                        }).then(mensage => {
                            if (mensage.success) {
                                console.log(mensage)
                                history.goBack()
                            }
                            console.log(mensage)
                        }).catch(err => {
                            console.log(err)
                        })
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
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    }
    function editarComentario(e) {
        let id = nombres.id
        let id_operador = clienteInfo()
        $.confirm({
            title: 'Aptualizar Observación',
            type: 'green',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Editar comentario</label>' +
                '<textarea class="editarcoment form-control" id="exampleFormControlTextarea1" rows="3"></textarea>' +
                '</div>' +
                '</form>',
            typeAnimated: true,
            buttons: {
                formSubmit: {
                    text: 'Comentar',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.editarcoment').val();
                        if (!name) {
                            $.alert('Ingrese un Comentario');
                            return false;
                        }
                        updateRegistro({
                            "id_registro": id,
                            "id_operador": id_operador.id,
                            "comentario": name
                        }, e).then(mensage => {
                            console.log(mensage)
                            if (mensage.success) {
                                console.log(mensage)
                                history.goBack()
                            }
                            console.log(mensage)
                        }).catch(err => {
                            console.log(err)
                        })
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
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    }
    function LocalidadPrecio(evento, localidad) {
        if (localidad == 9) {
            return "SEN2 KBRN Guayaquil"
        }
        if (localidad == 10) {
            return "SAUCES BOYZ Guayaquil"
        }
        if (localidad == 11) {
            return "TODO O NADA Guayaquil"
        }
        if (localidad == 12) {
            return "SEN2 KBRN Quito"
        }
        if (localidad == 13) {
            return "SAUCES BOYZ Quito"
        }
        if (localidad == 14) {
            return "TODO-O-NADA Quito"
        }
        if (PreciosStore().filter(f => f.id == evento).length>0) {

            return PreciosStore().filter(f => f.id == evento)[0].localidad;
        }
        return localidad
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
        if (PreciosStore().filter(f => f.id == evento).length > 0){
            return PreciosStore().filter(f => f.id == evento)[0].precio_normal
        }
        return 0
    }
    function ListarComision(evento, localidad) {
        if (localidad == 9) {
            return 2
        }
        if (localidad == 10) {
            return 2
        }
        if (localidad == 11) {
            return 1
        }
        if (localidad == 12) {
            return 2
        }
        if (localidad == 13) {
            return 2
        }
        if (localidad == 14) {
            return 1
        }
        if (PreciosStore().filter(f => f.id == evento).length > 0) {
            return parseFloat(PreciosStore().filter(f => f.id == evento)[0].comision_boleto)
        }
        return 0
    }
    function Verificarnomnbre(e, f) {
        let nuew = []
        let listtarje = e.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ")
        let listnombre = f.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ")
        listnombre.forEach(element => {
            nuew.push(listtarje.some(e => e == element))

        });
        if (listtarje.length == nuew.filter(e => e == true).length) {
            setEstadoTC(
                <div>
                    <span className={" label label-success"}>
                        TC Propia
                    </span>
                </div>
            )
            return
        }
        if (nuew.filter(e => e == true).length == 2) {
            setEstadoTC(
                <div>
                    <span className={" label label-warning"}>
                        Considencia minima tc
                    </span>
                </div>
            )
        }
        if (nuew.filter(e => e == true).length == 1) {
            setEstadoTC(<div>
                <span className={"label label-warning"}>
                    Solo una Considencia tc
                </span>
            </div>)
        }
        if (nuew.filter(e => e == true).length == 0) {
            setEstadoTC(<div>
                <span className={" label label-danger"}>
                    TC de tercero
                </span>
            </div>)

        }
        console.log(listnombre, listtarje, nuew)
        console.log(listnombre, listtarje, nuew)
    }
    let [estadotc, setEstadoTC] = useState(null)
    function creaComprobante() {
        var opciones = {
            orientation: 'p',
            unit: 'mm',
            format: [240, 300]
        };
        var doc = new jsPDF(opciones);
        let pagnum = 80
        doc.setFontSize(10);
        doc.text(10, 30, 'Recibo de venta de tickets');
        doc.text(10, 35, 'Registro No.: ' + nombres.id);
        doc.text(10, 40, 'Operador: 123654');
        doc.text(10, 55, 'Valor: ' + nombres.valor);
        doc.text(10, 65, 'Fecha Registro' + nombres.fechaCreacion);
        doc.text(10, 75, '_______________________________');
        doc.text(10, 80, 'Recibí conforme');
        doc.text(10, 80, 'Concierto       LOC	CANT.');
        nombres.info_concierto.map(e => {
            doc.text(10, pagnum + 5, "" + LocalidadPrecio(e.idespaciolocalida, e.id_localidad) + "       " + parseInt(e.cantidad) * parseFloat(ListarPrecio(e.idespaciolocalida, e.id_localidad))
            );
        })
        doc.autoPrint({ variant: 'non-conform' });
        doc.save('comprobante.pdf');
        doc.autoPrint();
        doc.output('dataurlnewwindow', { filename: 'comprobante.pdf' });
    }
    function nuevoPrecio() {
        let datos = nombres.info_concierto.map((item, i) => {
            let valor = item.cantidad * ListarComision(item.idespaciolocalida, item.id_localidad)
            return valor
        })
        return datos.reduce((a, b) => a + b, 0).toFixed(2)
    }
    const ListaPrecios = async () => {
        const info = await ListaPreciosEvent();
        console.log(info)

        return info
    }
    useEffect(() => {
        ListaPrecios()
        let concer = nombres.info_concierto
        let datos = JSON.parse(sessionStorage.getItem("Detalleuid"))
        buscarcliente({
            "cedula": datos.cedula,
            "email": ""
        }).then(ouputs => {
            if (ouputs.success) {
                setUser({ ...ouputs.data })
                nombres.forma_pago == "Tarjeta" && nombres.link_pago != null ?
                    !nombres.link_pago.includes("cloud.abitmedia.com") ?
                        infoTarjeta({
                            "token": nombres.token_pago
                        }).then(ouput => {
                            console.log(ouput.data)
                            if (ouput.success) {
                                setDataTarjeta({ ...ouput.data })
                                console.log(nombres.nombreCompleto)
                                Verificarnomnbre(ouput.data.cardholder, ouputs.data.nombreCompleto)
                            }
                            else {
                                infoabimedia(nombres.token_pago).then(ouput => {
                                    if (ouput.data) {
                                        let data = {
                                            ...ouput.data,
                                            "payment_date": ouput.data.transactionDate,
                                            "status": 1,
                                            "payment_id": "",
                                            "merchant_transaction_id": "",
                                            "auth_code": ouput.data.authorizationCode,
                                            "display_number": ouput.data.cardNumber,
                                            "message": "Transaccion aprobada",
                                            "card_brand": ouput.data.cardBrand,
                                            "installments": "CORRIENTE",
                                            "batch": "230225",
                                            "credit_type": "00",
                                            "cardholder": ouput.data.cardHolder,
                                            "acquirer_code": "04",
                                            "acquirer": "",
                                            "reference": null,
                                            "created_at": ouput.data.transactionDate,
                                            "interest": "0.00",
                                            "transmitter": ouput.cardBrand,
                                            "grand_total": "130.54",
                                        }
                                        setDataTarjeta({ ...data })
                                        if (usuario.nombreCompleto != " ") {
                                            setTimeout(() => {
                                                let nuew = []

                                                let listtarje = ouput.data.cardHolder.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ")
                                                let listnombre = usuario.nombreCompleto.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ")
                                                listnombre.forEach(element => {
                                                    nuew.push(listtarje.some(e => e == element))

                                                });
                                                console.log(nuew)
                                                if (listtarje.length == nuew.filter(e => e == true).length) {
                                                    setEstadoTC(
                                                        <span className={"pb-1 label label-successtc"}>
                                                            TC propio
                                                        </span>

                                                    )
                                                    return
                                                }
                                                if (nuew.filter(e => e == true).length == 2) {
                                                    setEstadoTC(

                                                        <span className={"pb-1 label label-warning"}>
                                                            Considencia minima tc
                                                        </span>

                                                    )
                                                }
                                                if (nuew.filter(e => e == true).length == 1) {
                                                    setEstadoTC(
                                                        <span className={"pb-1 label label-warning"}>
                                                            Solo una Considencia tc
                                                        </span>
                                                    )
                                                }
                                                if (nuew.filter(e => e == true).length == 0) {
                                                    setEstadoTC(
                                                        <span className={"pb-1 label label-danger"}>
                                                            TC de tercero
                                                        </span>
                                                    )

                                                }
                                                console.log(listnombre, listtarje, nuew)
                                            }, 5000);

                                        }
                                        console.log(ouput)
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                            }
                        }).catch(err => {
                            console.log(err)
                        }) : infoabimedia(nombres.token_pago).then(ouput => {
                            if (ouput.data) {
                                let data = {

                                    "payment_date": ouput.data.transactionDate,
                                    "status": 1,
                                    "payment_id": "",
                                    "merchant_transaction_id": "",
                                    "auth_code": ouput.data.authorizationCode,
                                    "display_number": ouput.data.cardNumber,
                                    "message": "Transaccion aprobada",
                                    "card_brand": ouput.data.cardBrand,
                                    "installments": "CORRIENTE",
                                    "batch": "230225",
                                    "credit_type": "00",
                                    "cardholder": ouput.data.cardHolder,
                                    "acquirer_code": "04",
                                    "acquirer": "",
                                    "reference": null,
                                    "created_at": ouput.data.transactionDate,
                                    "interest": "0.00",
                                    "transmitter": ouput.cardBrand,
                                    "grand_total": "130.54",
                                }
                                setDataTarjeta({ ...data })
                                if (ouputs.data.nombreCompleto != " ") {
                                    setTimeout(() => {
                                        let nuew = []

                                        let listtarje = ouput.data.cardHolder.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ")
                                        let listnombre = ouputs.data.nombreCompleto.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(" ")
                                        listnombre.forEach(element => {
                                            nuew.push(listtarje.some(e => e == element))

                                        });
                                        if (listtarje.length == nuew.filter(e => e == true).length) {
                                            setEstadoTC(
                                                <div>
                                                    <span className={"pb-1 label label-successtc"}>
                                                        TC propio
                                                    </span>
                                                </div>
                                            )
                                            return
                                        }
                                        if (nuew.filter(e => e == true).length == 2) {
                                            setEstadoTC(

                                                <span className={"pb-1 label label-warning"}>
                                                    Considencia minima tc
                                                </span>

                                            )
                                        }
                                        if (nuew.filter(e => e == true).length == 1) {
                                            setEstadoTC(<div>
                                                <span className={"pb-1 label label-warning"}>
                                                    Solo una Considencia tc
                                                </span>
                                            </div>)
                                        }
                                        if (nuew.filter(e => e == true).length == 0) {
                                            setEstadoTC(
                                                <span className={"pb-1 label label-danger"}>
                                                    TC de tercero
                                                </span>
                                            )

                                        }

                                        console.log(listnombre.length, listtarje, nuew.filter(e => e == true).length)
                                    }, 500);

                                }
                                console.log(ouput)
                            }
                        }).catch(err => {
                            console.log(err)
                        }) : ""
                console.log(ouputs)
            }
        }).catch(erro => {
            console.log(erro)
        })
        Listarticketporestado(datos.cedula).then(ouput => {
            if (ouput.success) {
                let boletos = ouput.data.map((e) => {
                    if (concer.find(f => f.nombreConcierto == e.concierto) != undefined) { return { ...e } }
                })
                //   console.log(boletos.filter(e => e != undefined))
                setTikes(boletos.filter(e => e != undefined))
                setlocalida(boletos.filter(e => e != undefined).map(e => {
                    return {
                        Comprador: usuario.nombreCompleto,
                        Cedula: e.cedula,
                        Evento: e.concierto,
                        Localidad: e.localidad,
                        Valor: e.valor,
                        Estado: e.estado,
                        Canje: e.canje,
                        Numero: e.sillas
                    }
                }))
            }
        }).catch(err => {
            console.log(err)
        })
        nombres.forma_pago == "Deposito" ?
            nombres.numerTransacion != null ?
                BuscarTransacion({
                    "numeroTransaccion": nombres.numerTransacion
                }).then(ouput => {
                    console.log(ouput)
                    if (ouput.success) {
                        if (ouput.data) {
                            usedispatch(setToastes({
                                show: true,
                                message: "número de comprobante repetidos",
                                color: 'bg-danger',
                                estado: "Atentos"
                            }))
                            setRepetido(ouput.data)
                        }
                        else {
                            usedispatch(setToastes({
                                show: true,
                                message: "número de comprobante único",
                                color: 'bg-success',
                                estado: "Atentos"
                            }))
                        }
                        return
                    }
                    //$.alert(JSON.stringify(ouput))
                }).catch(err => {
                    console.log(err)
                }) :
                usedispatch(setToastes({
                    show: true,
                    message: "número de comprobante no registrado",
                    color: 'bg-warning',
                    estado: "Atentos"
                }))
            : ""

    }, [])
    const [first, setfirst] = useState("")
    function verRegistro() {
        let selecion = document.getElementById("registro").value
        if (selecion.trim() === "") return

        let datos = repetidos.filter(e => e.id == selecion)[0]
        console.log(datos)
        sessionStorage.setItem("Detalleuid", JSON.stringify({ ...datos }))
        history.push("/admin/Reporte/" + datos.id)
        window.location.reload()

    }
    function ValidarComprobante() {
        BuscarTransacion({
            "numeroTransaccion": nombres.numerTransacion
        }).then(ouput => {
            console.log(ouput)
            if (ouput.success) {
                if (ouput.data) {
                    setRepetido(ouput.data)
                    successAlert(ouput.data)
                }
                else {
                    $.alert(ouput.message + " Único")
                }
                return
            }
            //$.alert(JSON.stringify(ouput))
        }).catch(err => {
            console.log(err)
        })

    }

    const successAlert = (re) => {

        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}>
                <div>
                    <div className="px-2 d-flex  justify-content-center align-items-center">
                        <div className="col-md-8">
                            <label className="form-label">Comprobantes repetidos</label>
                            <select className="form-select" aria-label="Default select example" id="registro"
                            >
                                <option value="" >Selecione el registro</option>
                                {re.length > 0 ?
                                    re.map((e, i) => {
                                        return (
                                            <option value={e.id} key={i}>{e.id} : {e.cedula}</option>)
                                    }) : ""}
                            </select>
                            <label className="form-label" id="cedulare">{$("#registro").val()}</label>
                        </div>
                    </div>
                </div>
                <div className='d-flex  justify-content-between py-4'>
                    <div>
                        <button className='btn btn-outline-danger  rounded-6'
                            onClick={verRegistro}
                        >
                            <span style={{
                                fontWeight: "bold"
                            }}>Ver</span>
                        </button>
                    </div>
                    <div>
                        <button className=' btn btn-warning rounded-5'  >
                            <span style={{
                                fontWeight: "bold"
                            }}> Eliminar</span>
                        </button>
                    </div>
                    <div  >
                        <button className=' btn btn-secondary rounded-5' onClick={hideAlert} >
                            <span style={{
                                fontWeight: "bold"
                            }}> Cerrar</span>
                        </button>
                    </div>
                </div>
            </SweetAlert>
        )
    }
    const hideAlert = () => {
        setAlert(null);
    };
    function validar() {
        // console.log(nombres.id)
        // $.alert("Este boton ya no se debe usar ")
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
    function ConsolidaBoleto() {
        const reporte = {
            "id_usuario": clienteInfo().id,
            "forma_pago": nombres.forma_pago,
            "link_comprobante": nombres.link_comprobante,
            "id": nombres.id,
            "numeroTransaccion": nombres.numerTransacion,
            "cedula": nombres.cedula,
            "estado": "Pagado"
        }
        $.confirm({
            title: 'Desea Aprobar el pago',
            type: 'blue',
            content: '',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: function () {
                        registraPagos(reporte).then(ouput => {
                            if (ouput.success) {
                                history.goBack()
                                return
                            }
                            $.alert("No se registro")
                        }).catch(err => {
                        })
                    }
                },
                cancel: function () {
                },
            },
        });

    }
    function ComprobarBoleto() {
        const reporte = {
            "id_usuario": clienteInfo().id,
            "forma_pago": nombres.forma_pago,
            "link_comprobante": nombres.link_comprobante,
            "id": nombres.id,
            "numeroTransaccion": nombres.numerTransacion,
            "cedula": nombres.cedula,
            "estado": "Comprobar"
        }
        $.confirm({
            title: 'Desea cambiar a comprobar',
            type: 'red',
            content: '',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-red',
                    action: function () {
                        registraPagos(reporte).then(ouput => {
                            if (ouput.success) {
                                history.goBack()
                                return
                            }
                            $.alert("No se registro")
                        }).catch(err => {
                        })
                    }
                },
                cancel: function () {
                    //close
                },
            },
        });

    }
    function linkcopy(row) {
        //  var text = document.getElementById("content").value;
        if (row == null) {
            $.alert('No se registra imegen de comprobante')
            return
        }

        navigator.clipboard.writeText(row)
            .then(() => {
                $.alert('Link Copiado');
            })
            .catch(err => {
                $.alert('Error no se  copio : ', err);
            });
    }
    const Licerarrasientos = (parms) => {
        $.confirm({
            title: 'Liberar asiento',
            type: 'blue',
            content: '',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: function () {
                        Liverarasiento(parms).then(ouput => {
                            if (ouput.success) {
                                window.location.reload()
                                return
                            }
                            $.alert("No se registro")


                        }).catch(err => {

                        })


                    }
                },
                cancel: function () {
                    //close
                },
            },
        });


    }

    function boletoscanje() {
        if (nombres.ticket_usuarios.length > 0) {
            return nombres.ticket_usuarios.every(e => e.canje == "CANJEADO")
        }
        return false
    }
    function CanjeBole() {
        let datos = JSON.parse(sessionStorage.getItem("Detalleuid"))
        let cor = nombres.info_concierto
        // console.log(id)
        $.confirm({
            title: 'Canjear boletos de este registro',
            type: 'yellow',
            content: '',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: function () {
                        CanjearBoletoRegistro({ "id_registraCompra": id }).then(ouput => {
                            if (ouput.success) {
                                usedispatch(setToastes({
                                    show: true,
                                    message: ouput.message,
                                    color: 'bg-primary',
                                    estado: "Boletos actualizados"
                                }))
                                Listarticketporestado(datos.cedula).then(ouput => {
                                    if (ouput.success) {
                                        let boletos = ouput.data.map((e) => {
                                            if (cor.find(f => f.nombreConcierto == e.concierto) != undefined) {
                                                return { ...e }
                                            }
                                        }
                                        )
                                        //  console.log(boletos.filter(e=>e!= undefined))
                                        setTikes(boletos.filter(e => e != undefined))
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                            }
                            else {
                                usedispatch(setToastes({
                                    show: true,
                                    message: ouput.message,
                                    color: 'bg-warning',
                                    estado: "Boletos"
                                }))
                            }


                        }).catch(err => {
                            console.log(err)
                        })
                        console.log(id)
                    }
                },
                cancel: function () {
                },
            },
        });
    }
    let [url, setUrl] = useState("")
    function abririnframe(e, f) {
        if (nombres.estado_pago == "Pagado") {
            if (nombres.link_pago != null) {
                setUrl(e.replace("k/", "k/voucher/"))
                usedispatch(setModal({ nombre: "pago", estado: e.replace("k/", "k/voucher/") }))
            }
            if (nombres.link_comprobante != null) {
                setUrl(nombres.link_comprobante)
                usedispatch(setModal({ nombre: "pago", estado: nombres.link_comprobante }))
            }
        } else {
            window.open(e, '_blank');
        }
    }
    function CambiarComprobante() {
        $.confirm({
            title: 'Comprobante o lote!',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Ingrese el numero del comprobante</label>' +
                '<input type="text" placeholder="numero" class="name form-control" required />' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Actualizar',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = this.$content.find('.name').val();
                        if (!name) {
                            $.alert('Ingrere Comprobante');
                            return false;
                        }
                        ActualizarnumeroTransacion(
                            {
                                "id_registraCompra": nombres.id,
                                "numeroTransaccion": name
                            }
                        ).then(ouput => {
                            console.log(ouput)
                            if (ouput.success) {
                                history.goBack()
                            }

                        }).catch(err => {
                            console.log(err)
                        })
                    }
                },
                cancel: function () {
                    //close
                },
            },
            onContentReady: function () {

                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    // if the user submits the form by pressing enter in the field.
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click'); // reference the button and click it
                });
            }
        });
    }
    const [rowSelection, setRowSelection] = useState({});
    function quitarrepetifod() {
        console.log(Object.keys(rowSelection))
        let datos = nombres.ticket_usuarios.map(e => {
            if (!Object.keys(rowSelection).some(f => f == e.id)) {
                return e.id
            }
        }).filter(g => g != undefined)
        console.log(datos)
        if (datos.length > 0) {
            eliminartiket([datos]).then(ouput => {
                // console.log(ouput)

                if (ouput.success) {
                    console.log(ouput)
                    window.location.reload()
                    //setTikes(ouput.data)
                }
                if (!ouput.success) {
                    console.log(ouput)
                    return
                }

            }).catch(error => {
                console.log(error)
                $.alert("hubo un error no se pudo eliminar este registro")
            })
        }
    }
    function Verificaexistencia() {
        Seleccionaruserlista({ "cedula": nombres.cedula }).then(ouput => {
            if (ouput.success) {
                if (ouput.data) {
                    $.alert("Tiene " + ouput.data.length + "  boletos selecion")

                }
            } else {
                $.alert("No se encontró boleto seleccionado")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    function conciliacion() {
        if (nombres.conciliacion == undefined) return
        if (Object.keys(nombres.conciliacion).length > 0) return
        usedispatch(setModal({ nombre: "consiliacion", estado: { concierto: nombres.info_concierto[0].nombreConcierto, ...nombres, id_registro: nombres.id, ...tarjetadata } }))
    }

    return (
        <PhotoProvider>
            <div>
                {alert}

                <WhastappWiev />
                <ConsiliarView {...nombre} />
                <ModalConfima />
                <ModalConfirma />
                <div className="row ">
                    <h1></h1>
                    {useradmin.perfil == "suscriptores" ? "" : <div className="col-12   d-flex  text-center justify-content-md-end  align-items-center">
                        <div className="px-2">
                            <div className="" >
                                {boletoscanje() ? <a className=" btn btn-default-su btn-sm bg-success  text-white p-3">

                                    <span className=" font-weight-bold"> Registro Canjedo  </span>

                                </a> : <a className=" btn btn-default btn-sm" onClick={CanjeBole} ><i className=" bi bi-ticket-detailed"> </i> Canjear Boletos</a>}
                                {
                                    nombres.pdf == "SI" ?
                                        <a className=" btn btn-default btn-sm ">
                                            <i className="bi bi-file-earmark-pdf text-danger"></i>
                                            {estado[nombres.pdf]}
                                        </a> : ""
                                }

                                {nombres.estado_pago == "Pagado" && nombres.conciliacion.length == 0 ?
                                    <a className=" btn btn-default btn-sm  "
                                        onClick={() => conciliacion()}
                                    >
                                        <i className="bi bi-check"></i> Consolidar </a>
                                    : ""}

                                {nombres.conciliacion.length > 0 ?
                                    <a className=" btn btn-default btn-sm  "
                                        onClick={() => usedispatch(setModal({ nombre: "actconsiliacion", estado: { concierto: nombres.info_concierto[0].nombreConcierto, ...nombres.conciliacion[0], id_registro: nombres.id, ...tarjetadata } }))}
                                    >
                                        <i className="bi bi-check"></i> Actualizar conciliación </a>
                                    : ""}
                                {nombres.forma_pago == "Deposito" ?
                                    <a className=" btn btn-default btn-sm d-none"
                                        onClick={ComprobarBoleto}
                                    ><i className="bi bi-exclamation-octagon text-warning "></i> Cambiar a Comprobar </a>
                                    : ""}

                                {nombres.forma_pago == "Deposito" || nombres.forma_pago == "Tarjeta" ?
                                    boletoscanje() ? "" : <a className="btn btn-default btn-sm"
                                        data-toggle="tooltip" data-placement="top" title="Consolidar Deposito"
                                        onClick={() => Generarnew()}
                                    >
                                        <i className="fa fa-info-circle">  </i>Recargar Boleto
                                    </a> : ""}
                                {nombres.forma_pago != "Deposito" ? "" : <a className=" btn btn-default btn-sm" onClick={() => usedispatch(setModal({ nombre: "canjear", estado: { ...nombres } }))} ><i className="fa fa-check"></i> Cambiar Tarjeta </a>}

                                {boletoscanje() ? "" : <a className=" btn btn-default btn-sm" onClick={Verificaexistencia} > <i className="fa fa-database"></i> Verificar boletos reservado </a>}

                            </div>
                        </div>
                    </div>}
                    {
                        useradmin.perfil == "suscriptores" ? "" : <div className="d-flex justify-content-end  px-3  pt-1">
                            {nombres.forma_pago == "Deposito" || nombres.forma_pago == "Tarjeta" ?
                                <a className="  rounded-circle btn-danger mx-2 p-2 text-white"
                                    data-toggle="tooltip" data-placement="top" title="Consolidar Deposito"
                                    onClick={() => !nombres.conciliacion.length > 0 ? usedispatch(setModal({ nombre: "actconsiliacion", estado: { concierto: nombres.info_concierto[0].nombreConcierto, ...nombres.conciliacion[0], id_registro: nombres.id, ...tarjetadata } })) : usedispatch(setModal({ nombre: "consiliacion", estado: { concierto: nombres.info_concierto[0].nombreConcierto, id_registro: nombres.id, ...nombres, ...tarjetadata } }))}
                                >
                                    <i className="fa fa-info-circle">  </i>
                                </a> : ""}

                            <a className=" rounded-circle btn-primary mx-2 p-2 text-white d-none"
                                data-toggle="tooltip" data-placement="top" title="Generar Boleto"
                                onClick={() => Generarnew()}
                            >
                                <i className=" fa fa-spinner">  </i>
                            </a>

                            <a className=" rounded-circle btn-primary mx-2 p-2 text-white d-none"
                                data-toggle="tooltip" data-placement="top" title="Reportar"
                                onClick={() => usedispatch(setModal({ nombre: "confirmar", estado: { ...nombres } }))}
                            >
                                <i className=" fa fa-file">  </i>
                            </a>

                            {nombres.forma_pago == "Tarjeta" ?
                                boletoscanje() ? "" : <a className="  rounded-circle btn-primary mx-2 p-2 text-white"
                                    data-toggle="tooltip" data-placement="top" title="Aprobar Tarjeta"
                                    onClick={() => validar()}
                                >
                                    <i className=" fa fa-check">  </i>
                                </a> : ""}
                            <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                                data-toggle=" " data-placement="top" title="atras"
                                onClick={() => history.goBack()}
                            >
                                <i className=" fa fa-arrow-left">  </i>
                            </a>
                        </div>}
                    <div className="row d-flex justify-content-center ">
                        <div className="col-12 ">
                            <div className=" px-0 py-2 w-100  bg-white ">
                                <div className=" d-flex flex-wrap flex-wrap-reverse">
                                    <div className="  col-12 col-md-6 ">
                                        <div className="px-3 d-flex align-items-center ">
                                            <h4 className="px-2  "
                                                style={{
                                                    fontWeight: "bold"
                                                }}
                                            >{usuario.nombreCompleto}</h4>
                                            <div className="d-flex  flex-wrap ">
                                                <div>
                                                    <span className={estado[nombres.estado_pago]}>
                                                        {nombres.estado_pago}
                                                    </span>
                                                </div>

                                                {nombres.forma_pago == "Tarjeta" ? <div >
                                                    {estadotc}
                                                </div> : ""}

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
                                            {nombres.forma_pago == "Tarjeta" && nombres.link_pago == null ? "Cambio de Deposito a Tarjeta" : ""}
                                            {true ?
                                                <span className={nombres.conciliacion.length > 0 ? "p-1 label label-success" : "label label-danger"}>
                                                    {nombres.conciliacion.length > 0 ? "Consolidado" : "Sin Consolidar"}
                                                </span> :
                                                ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex col-12  flex-wrap   ">
                            <div className="col-12 col-md-6 p-3" >
                                <div className="invoice-from">
                                    <small>Informacion de Pago</small>
                                    {nombres.forma_pago != "Tarjeta" ?
                                        useradmin.perfil == "suscriptores" ? "" : <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">{nombres.banco == null ? "No hay Deposito reportado" : nombres.banco}</strong><br></br>
                                            <small>
                                                Comprobante# {nombres.numerTransacion} <br></br>
                                                <br></br>

                                                {
                                                    nombres.forma_pago == "Deposito" ?
                                                        <a className=" btn btn-default btn-sm" onClick={ConsolidaBoleto}>
                                                            <i className="fa fa-credit-card"></i> Aprobar deposito
                                                        </a>
                                                        : ""
                                                }
                                                <br></br>
                                                {
                                                    nombres.forma_pago == "Deposito" ?
                                                        <a className=" btn btn-default btn-sm" onClick={ComprobarBoleto}>
                                                            <i className="fa fa-credit-card"></i> Cambiar a Comprobar deposito
                                                        </a>
                                                        : ""
                                                }
                                                <br></br>


                                                <a className=" btn btn-default btn-sm" onClick={() => linkcopy(nombres.link_comprobante)}>
                                                    <i className="fa fa-credit-card"></i> Copiar link de imagen
                                                </a>

                                                <br></br>

                                                <PhotoView src={nombres.link_comprobante == null ? "data:image/png;base64,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" : nombres.link_comprobante}>
                                                    <a className=" btn btn-default btn-sm">
                                                        <i className="fa fa-credit-card"></i> Ver
                                                    </a>
                                                </PhotoView>
                                            </small>

                                        </div> :


                                        useradmin.perfil == "suscriptores" ? "" : <div className="m-t-5 m-b-5">
                                            <strong className="text-inverse">Pago con Tarjeta</strong><br></br>
                                            <small>
                                                {nombres.link_pago != null || nombres.link_comprobante != null ?


                                                    <a className=" btn btn-default btn-sm"
                                                        onClick={() => abririnframe(nombres.link_pago, nombres.link_comprobante)}>
                                                        <i className="fa fa-credit-card"></i> Link de pago
                                                    </a>
                                                    : <a className=" btn btn-default btn-sm"><i className="fa fa-credit-card"></i> Sin Link</a>}

                                                {
                                                    nombres.forma_pago == "Deposito" ?
                                                        <a className=" btn btn-default btn-sm">
                                                            <i className="fa fa-credit-card"></i> Consolidar
                                                        </a>
                                                        : ""
                                                }
                                                <br></br>

                                                <a className=" btn btn-default btn-sm"
                                                    onClick={() => linkcopy(nombres.link_pago != null ? nombres.link_pago : nombres.link_comprobante)}>
                                                    <i className="fa fa-credit-card"></i>Copy Link de pago
                                                </a>
                                                {nombres.forma_pago == "Deposito" ? <a className=" btn btn-default btn-sm" onClick={() => linkcopy(nombres.link_comprobante)}>
                                                    <i className="fa fa-credit-card"></i> Copiar link de imagen
                                                </a> : ""}

                                                <br></br>

                                                {nombres.forma_pago == "Deposito" ? <PhotoView src={nombres.link_comprobante == null ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAARVBMVEX///+wsbHu8PH39/jy9PSsra2ys7PExcXv7+/s7Oz7+/uqq6u4ubnT1NTGx8e0tbXn5+fb29u8vb3U1dXMzc3h4eGkpaXPa21KAAAHrElEQVR4nO2di5qcKBBGIYDITS5Cv/+jbhVqXyadTTZr98xo/V+mnSitcgSqgMJhjETqsvLMsp2B+PHZ9/GJ+rEx+MxS+MkiBsQARQyIAYoYEAMUMSAGKGJADFDEgBigiAExQBEDYoAiBsQARQyIAYoYEAMUMSAGKGJADFDEgBigiAExQBEDYoAiBsQARQyIAYoYEAMUMSAGKGJADFDEgBigiMEXZSDHTfYdl/uKDGQZVvH0jut9RQZj5KsUMSAG52bAnepy7rQM7Bw2yXdc740MbNB/qOkqPb/BOr6RQVX8v0vV10N4H4Nx+AsEnA+vrw7vY2D+ksH48jsjBp/LoNu/MzNQFz+FPNfi3MN+d9XRGSg/i3W/beXuQGxbl9H4YzNQtbf20vQM2nw74q9mwBZ1YAbKgwssc+ntgQ8j9pbVEwZHLgcR8pk9NocDNowxWCb0uRhEw+yk1FDbKGSaAUYRTPi1CZzbqnzg9kBlZsFtnrYHLgJHCGarKFcd2C4U7DmocHckD0rDTv5Uh2TQmFGqPhzKWDjkeRhAsa8ufugMauXh4ywMoBLICE/9UWlwhrWnfvMRGWTWunF8VFEzG89SDgbDgis/jYtMamLSn4QBBwaXD2NDNbAZLMOpGcTCwqkYJDZ/qAsWLOWp6kJvEx/zNbvEPOw3zxAckkGF5w1G4KYUi03cSZbPYhuxYwg+0jaAwiD7agQfCTzo8gzBIRmoBl6xm/plbQvFeQNWAZqJ8fnQ4hEZcPCK57XDMC5jatBdmM7VZ8LGoDpXElxZQp0w0IsEQ9GeIzgmAzSPtirHNQ6fpjoopwUT8VwMMKogFe4uKKdiuw85OAkDjrkWbSqRR68zdKCM/+Vcy1EZgF3AnFk59lfayn+bkT4sA66GmhYfwZo5/tuE23EZQFFQvtRai+fuF7k/PgNOc65/LGJwMAbPhwt/z+BIsTgsOPXf5ebfn/j/6p2xefP0p8F5tyi9j6Pwr9BXjNF8t4gBMUARA2KAIgZfiIEYxe8TvUZvZJA8uL22dt+3LoszxLTOOKUyxKFITFQ8KLDWPQNZ2utv7J0MLgYuxDFTdpjXXUtvIKuY24whe81p6FHXzDJHJ1n+FKrwAr2TgQMGxmn89TL1XdrV5chWHoDB2kdqF0x4SAZN4RzTfOnTrqP3fcZJ82vH6MbA8XxQBnVQjdkSe67nkhxmNE7XRM21sUfwZp65OSaDMpWJGTXjClYbZxahxBveI/X60t7mhoFjyFZWMhR7RAYihsRFiNLPS7kPTmwMLg7+D+XAJGCFDGypgh+PgVFNxKYnBv+YhkZhhAc9LnVB5s5gbQ+AAUtQH47HoMHPFMEIhmhH7sEKDgCicLEk+MCABeWOx2CG3DYMT4YswjMGVZVYXkxk+4mBLZeDMQAfSXso81j9k2p+sQY4DT+50lIunUFAMsgFLUc6WjmIo9XY+qGjLMrkF3+5FvjIZRi8bpgIXWVfWVtWMoRjMbCQqT6/KPqHlLfd8DmaZbv8WUmx7mb2DT2pL9Nv/EQRA2KAIgbEAEUM9mewnG61aGNrtxlTa4xZ3/m0GMfUMBRFwu71j0wzs6W/JetnwjTi7ryw7drp9RA7MxAa+3zg52PwoVbD3XssGk6hxoz5GqYehhWdtstMbEF3qafnmD5p/JIFT4kFcK5HjNbonafil3NlxXecj92ZgfXo9S0MimrjOLttfKSpbNJ0qSsD741MDTPZTPMYruc5pA+YwPRewo2BCsZUfEfOlQHPuAx0p9CEvctBueDDQQZN9SHhsL3jqPVfZtc6g3HrCAQMMBBRw7PtCStPzDg13jPog01DuGOwa2TG7gxiNAuDaVnAtw6QbAyE0p2B3JY4dgasFKt9r+xGzcDAQ4/6kQEONHwPBnDfebDIwA56ObNftisDW+JSF6pbZho6AxnrNqhouQYGqdT7ulBTK8jsVhdCnvNeb8zZncFkfUAGQq15Knq5xMKA6Wg7A1GVqgIzmcakXZLDWjCGAgyMUYbd2kRfPA/ivk0chqHs1Z3anwEU3TYDA/6UwbUcwMMPDor/7LhysUF9XxvPoZcDNg/ysT2I3t7VhWT3sowvYcBqrNza9X7HuD7ftT3gZWMAWYHMBZ4TGn+xshp57Qys1w8M2Hwx36U9mJa3eFhWVXcV2jY6vjBokJ8rAwHlP2yBZ5X39BnMCTKAxtQ9MGiX9I0Y4MJ2C3nok2VxW9/dGSReJLPY/GFRTsDnymDss3BjhPrRGbDuKlwZWO3k92CAhp5hGJ5FV6CEyq+vA22uTN71uWdoKqz3c8XB1aC27NzSm0tvOnq9UsigzLUvhiuqR6vJ7Apud5qT3rsc1F7ylzn1pH2p1wdmpmmqza6JbIaD2NS3em3er+lH3b+VwLNocCZZ8atYU8LyMj2Zlu3XZLBp6zrZh332/uh28C6Jtfb+632z/jyeaD3DTjdLfWdigCIGxABFDIgBihgQAxQxIAYoYkAMUMSAGKCIATFAEQNigCIGxABFDIgBihgQAxQxIAYoYkAMUMSAGKCIATFAEQNigCIGxABFDIgBihgQAxQxIAYoYkAMUMSAGKCIATFAEQNigCIGxABFDO4YnFnbKrwza7fV46Tvrn8A2Mt2m9dX3zgAAAAASUVORK5CYII=" : nombres.link_comprobante}>
                                                    <a className=" btn btn-default btn-sm">
                                                        <i className="fa fa-credit-card"></i> Ver
                                                    </a>
                                                </PhotoView> : ""}
                                                <br></br>
                                            </small>
                                        </div>}
                                </div>
                            </div>
                            {useradmin.perfil == "suscriptores" ? "" : nombres.forma_pago != "Tarjeta" ?
                                <div className="col-12  col-md-6 text-md-end p-3 text-center ">
                                    <div className="invoice-from text-center ">
                                        <small>Comprobante</small>
                                        <br></br>
                                        {nombres.link_comprobante == null ? "" :
                                            <a className=" btn btn-default btn-sm">
                                                <i className="fa fa-copy"></i> copy
                                            </a>}
                                        <br></br>

                                        <a className=" btn btn-default btn-sm"
                                            onClick={CambiarComprobante}
                                        >
                                            <i className=" fa fa-spinner"></i>Cambiar # comprobante
                                        </a>

                                        <br></br>
                                        <a className="btn btn-default btn-sm"
                                            onClick={ValidarComprobante}
                                        >
                                            <i className="fa fa-check"></i>Verificar el Comprobante
                                        </a>
                                        <br></br><br></br>
                                        <div className="m-t-5 m-b-5 rounded-4  ">

                                        </div>
                                        <PhotoView src={nombres.link_comprobante == null ? "data:image/png;base64,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" : nombres.link_comprobante}>
                                            <img className="img-fluid" style={{ height: 150 }} src={nombres.link_comprobante == null ? "data:image/png;base64,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" : nombres.link_comprobante} alt="" />
                                        </PhotoView>
                                    </div>
                                </div> :
                                <div className="col-12 col-md-6 text-end  ">
                                    <div className="invoice-date">
                                        <small className="text-inverse">
                                            {tarjetadata.cardholder}  </small><br></br>

                                        <div className=" ">


                                            {tarjetadata.transmitter} <br></br>
                                            <span>
                                                {tarjetadata.card_brand}
                                            </span>
                                            <br></br>
                                            <span >
                                                {tarjetadata.display_number}
                                            </span>

                                            <br></br>
                                            {tarjetadata.created_at ? "Fecha creación:" + tarjetadata.created_at : ""} <br></br>
                                            {tarjetadata.payment_date ? " Fecha pago:" + tarjetadata.payment_date : ""} <br></br>
                                            <p style={
                                                {
                                                    fontWeight: "bold"
                                                }
                                            }> {tarjetadata.message} </p>
                                            {estadotc}
                                        </div>
                                    </div>
                                </div>}
                            {
                                useradmin.perfil == "suscriptores" && nombres.forma_pago == "Tarjeta" ?
                                    <div className="col-12 col-md-6 text-end  ">
                                        <div className="invoice-date">
                                            <small className="text-inverse">
                                                {tarjetadata.cardholder}  </small><br></br>

                                            <div className=" ">


                                                {tarjetadata.transmitter} <br></br>
                                                <span>
                                                    {tarjetadata.card_brand}
                                                </span>
                                                <br></br>
                                                <span >
                                                    {tarjetadata.display_number}
                                                </span>

                                                <br></br>
                                                {tarjetadata.created_at ? "Fecha creación:" + tarjetadata.created_at : ""} <br></br>
                                                {tarjetadata.payment_date ? " Fecha pago:" + tarjetadata.payment_date : ""} <br></br>
                                                <p style={
                                                    {
                                                        fontWeight: "bold"
                                                    }
                                                }> {tarjetadata.message} </p>
                                                {estadotc}
                                            </div>
                                        </div>
                                    </div> : ""
                            }
                            {nombres.forma_pago == "Tarjeta" ?
                                <div className="invoice-from text-center">



                                </div> : ""
                            }
                        </div>
                        <div className="d-flex">
                            {boletos.length > 0 ?
                                <ExportToExcel apiData={boletos.map(e => {
                                    e.Comprador = usuario.nombreCompleto
                                    e.Metodos = nombres.forma_pago
                                    return {
                                        ...e,
                                    }
                                })} fileName={"Boletos: " + usuario.nombreCompleto} label={"Boletos"} />
                                : ""}
                        </div>
                        <div className=" table-responsive">
                            <table className="table table-invoice">
                                <thead>
                                    <tr>
                                        <th>DESCRIPCION</th>
                                        <th className="text-center" width="30%">loc </th>
                                        <th className="text-center">CANT.</th>
                                        <th className=" text-center" width="15%" >Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nombres.info_concierto.length > 0 ? nombres.info_concierto.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{item.nombreConcierto}</td>
                                                <td className="text-center">
                                                    {LocalidadPrecio(item.idespaciolocalida, item.id_localidad)}
                                                </td>
                                                <td className="text-center">{item.cantidad}</td>
                                                <td className="text-center">
                                                    {"$" + parseInt(item.cantidad) * parseFloat(ListarPrecio(item.idespaciolocalida, item.id_localidad))}
                                                </td>
                                            </tr>
                                        )
                                    }) : ''}

                                </tbody>
                            </table>

                        </div>
                        <div>
                            <table className="table table-borderless ">
                                <tbody>
                                    <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Comisión por Boleto:</td>
                                        <td width="15%" className='text-center'>$ {nombres.info_concierto.length > 0 ? nuevoPrecio() : ""}</td>
                                    </tr>
                                    {nombres.forma_pago == "Deposito" ? <tr >
                                        <th scope="row"></th>
                                        <td className={" text-end"} >Total</td>
                                        <td className="text-center">${(parseFloat(nombres.total_pago) / 1.08).toFixed(2)}</td>
                                    </tr> : ""}

                                    {nombres.forma_pago == "Tarjeta" ? <tr>
                                        <th scope="row"></th>
                                        <td className='text-end' >Total tarjeta:</td>
                                        <td className='text-center'>$ {nombres.total_pago}</td>
                                    </tr> : ""}




                                </tbody>
                            </table>
                        </div>

                        <div className=" table-responsive">
                            <table className="table table-invoice">
                                <thead>
                                    <tr>
                                        <th>Observación</th>
                                        <th width="50%" >Usuario </th>
                                        <th width="" >Editar </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {nombres.comentarios != undefined && Object.keys(nombres.comentarios).length > 0 ?
                                        nombres.comentarios.map((item, i) => {
                                            return (
                                                <tr key={"l" + i}>
                                                    <td>{item.comentario.toLowerCase()}</td>

                                                    <td className="">
                                                        {item.operador != undefined ? item.operador.toLowerCase() : item.name.toLowerCase()}
                                                    </td>

                                                    <td className="">
                                                        {
                                                            useradmin.id == item.id ?
                                                                "" :
                                                                useradmin.perfil == "suscriptores" ?
                                                                    <a className="btn btn-default btn-sm btn-disable" ><i className="fa fa-edit"></i></a>
                                                                    :
                                                                    <a className="btn btn-default btn-sm" onClick={() => editarComentario(item.id)} ><i className="fa fa-edit"></i></a>}
                                                    </td>
                                                </tr>
                                            )
                                        }) : ''}

                                </tbody>
                            </table>

                        </div>
                        {useradmin.perfil == "suscriptores" ? "" : <div className=" d-flex col-12  pb-3 border-top pt-2">
                            <div className=" invoice-from col-12">
                                <div className="row">
                                    <p className="col-12 col-md-6">
                                        <a className="btn btn-primary" data-toggle="collapse" href="#collapsever" role="button" aria-expanded="false" aria-controls="collapsever">
                                            <i className=" fa fa-eye"></i>
                                        </a>
                                    </p>
                                    {Object.keys(rowSelection).length > 0 ?
                                        <div className="col-12 col-md-6 text-center">
                                            <button className=" btn btn-success" onClick={quitarrepetifod}  >Quitar los repetidos</button>

                                        </div>
                                        : ""}
                                </div>
                                <Iframe
                                    url={url}
                                    detener={() => console.log("")}
                                />
                                <div className="collapse" id="collapsever">
                                    <div className="container-fluid">
                                        <MaterialReactTable
                                            columns={ticketsboletos}
                                            data={nombres.ticket_usuarios}
                                            muiTableProps={{
                                                sx: {
                                                    tableLayout: 'flex'
                                                }
                                            }}
                                            enableRowActions
                                            enableRowSelection
                                            positionActionsColumn="first"
                                            renderRowActions={({ row }) => (
                                                <Box sx={{ display: 'flex' }}>

                                                    <div className=" btn-group  " >


                                                        <a
                                                            onClick={() => Eliminara(row.original.id)}
                                                            className="border  btn-default btn-sm  "


                                                        >
                                                            Eliminar


                                                        </a>

                                                        <a
                                                            onClick={() => Licerarrasientos(row.original.id)}
                                                            className="border  btn-default btn-sm  "


                                                        >
                                                            Liberar


                                                        </a>

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
                                            getRowId={(row) => row.id}

                                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                                            state={{ rowSelection }}


                                            localization={MRT_Localization_ES}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>}
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

                    <div
                        className="sticky-bottom w-100 ">
                        <div className="d-flex  justify-content-end">
                            <a className=" rounded-circle btn-primary mx-2 p-2 text-white"
                                data-toggle="atras " data-placement="top" title="atras"
                                onClick={() => history.goBack()}
                            >
                                <i className=" fa fa-arrow-left">  </i>
                            </a>


                            {/*nombres.comentarios==undefined || Object.keys(nombres.comentarios).length == 0  ? <a className=" rounded-circle btn-success mx-2 p-2 text-white"
                                data-toggle=" " data-placement="top" title="Agregar Comentario"
                                onClick={agregarComentario}
                            >
                                <i className=" fa fa-comments">  </i>
                            </a>:""
                                 */}
                            {useradmin.perfil == "suscriptores" ? "" : <a className=" rounded-circle btn-success mx-2 p-2 text-white"
                                data-toggle=" " data-placement="top" title="Agregar Comentario"
                                onClick={agregarComentario}
                            >
                                <i className=" fa  fa-commenting">  </i>
                            </a>}
                            {useradmin.perfil == "suscriptores" ? "" :
                                <a className="rounded-circle btn-success mx-2 p-2 text-white"
                                    onClick={Abrirwhastapp}
                                >
                                    <i className="bi bi-whatsapp"></i>
                                </a>}
                        </div>


                    </div>
                </div>

            </div>
        </PhotoProvider>
    )
}