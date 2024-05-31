
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
import { Box } from '@mui/material';
import { Generar_Boleto_nuevos, Listarticketporestado } from "utils/userQuery";
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js";
import { ValidarToken } from "utils/Querycomnet";
import { eliminartiket } from "utils/pagos/Queripagos";
import { ticketsboletos } from "utils/columnasub";


import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { generaTiketspdf } from "utils/Querycomnet";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GEnerarBoletos } from "utils/userQuery";
import ModalConfirma from "views/Components/MODAL/ModalConfirma";
import { registraPagos } from "utils/pagos/Queripagos";
import { Liverarasiento } from "utils/userQuery";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { CanjearBoletoRegistro } from "utils/boletos/Queryboleto";
import ConsiliarView from "views/Components/MODAL/ModalConsilia";
import ExportToExcel from "utils/Exportelemin";
import { BuscarTransacion } from "utils/pagos/Queripagos";
import { ActualizarnumeroTransacion } from "utils/pagos/Queripagos";
import SweetAlert from "react-bootstrap-sweetalert";
import { infoTarjeta } from "utils/pagos/Queripagos";
import Iframe from "views/Components/IFrame/Iframe";
import { infoabimedia } from "utils/pagos/Queripagos";
import { ComentarioRegistro } from "utils/pagos/Queripagos";
import { updateRegistro } from "utils/pagos/Queripagos";
import { ListaPreciosEvent } from "utils/EventosQuery";
import WhastappWiev from "views/Components/MODAL/ModalWhast";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import jsPDF from "jspdf"
import { DateRangePicker } from "../../../../../node_modules/rsuite/esm/index";
import Bingo_tablas from "./components/Tablaspdf";
import ModalFirma from "views/Components/MODAL/Modalfirma";
import { Button } from "bootstrap";
import { Boleteria_voucher } from "utils/EventosQuery/index";
import { boleteriaAxios } from "utils/index";
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
    let nombres = JSON.parse(sessionStorage.getItem("Detalleuid"))
    console.log(nombres)
    let useradmin = clienteInfo()
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
    function generaComprobante() {
        const result2 = new Date().toLocaleString('en-GB', {
            hour12: false,
        });
        var opciones = {
            format: [69, 140]
        };
        var doc = new jsPDF(opciones)
        doc.setFontSize(7);
        doc.text(12, 3, 'T-ICKETS (TICKETSECUADOR S.A.)');
        doc.text(20, 12, 'RUC 0993377293001');
        doc.text(15, 15, 'Edifico City Officce Oficina 310');
        doc.text(3, 18, 'Fecha:' + result2);
        doc.text(3, 21, '*******************************************************************');
        doc.text(25, 23, 'DESCRIPCIÓN');
        doc.text(3, 26, '*******************************************************************');
        doc.text(3, 29, "Evento: " + nombres.info_concierto[0].nombreConcierto);
        let num = 29
        nombres.info_concierto.forEach(function (val, index) {
            num = num + 5
            doc.text(3, num, "Localidad:" + LocalidadPrecio(val.idespaciolocalida, val.id_localidad))
            doc.text(50, num, "Cantidad:" + val.cantidad)
        })
        // doc.text(3, 34, "Boletos:" + sumaCantidad);
        // doc.text(3, 38, "facturación del " + descri.factura.emitido + " " + descri.factura.vencimiento);

        //nombres.info_concierto[nombreConcierto]

        doc.text(3, 49, "*******************************************************************");
        //doc.text(35, 54, "DESCUENTO $0.00");
        doc.text(40, 58, "TOTAL: " + (parseFloat(nombres.total_pago)).toFixed(2));
        doc.text(40, 62, "SALDO: $0.00");
        doc.text(3, 65, "*******************************************************************");
        doc.text(4, 69, "CLIENTE")
        doc.text(3, 73, "Nombres: " + usuario.nombreCompleto)
        doc.text(3, 76, "Correo: " + usuario.email)
        doc.text(3, 79, "Cédula: " + usuario.cedula)
        doc.text(3, 84, "Fecha registro: " + nombres.fechaCreacion)
        doc.text(3, 88, "*******************************************************************");
        // doc.text(3, 94, "Operador " + nombres.usuario);
        doc.text(3, 92, "Impresión:" + result2);
        doc.text(3, 95, "*******************************************************************");
        if (nombres.forma_pago == "Tarjeta") {
            doc.text(25, 95, "Información de tarjeta ");
            doc.text(35, 105, "Forma de pago: " + nombres.forma_pago);
            doc.text(3, 105, tarjetadata.cardholder)
            doc.text(3, 110, tarjetadata.transmitter)
            doc.text(3, 115, tarjetadata.display_number)
            doc.text(3, 120, "Fecha pago :" + tarjetadata.payment_date)
            doc.text(3, 125, "*******************************************************************");
            doc.text(25, 130, "Recibí conforme:")
            doc.text(20, 135, "_____________________")
        } else if (nombres.forma_pago == "Deposito") {
            doc.text(35, 105, "Forma de pago: " + nombres.forma_pago);
            doc.text(8, 100, "Número de comprobate " + nombres.numerTransacion);
            doc.text(3, 110, "*******************************************************************");
            doc.text(25, 115, "Recibí conforme:")
            doc.text(20, 120, "_____________________")
        } else {
            doc.text(3, 100, "Forma de pago: " + nombres.forma_pago);
            doc.text(3, 105, "*******************************************************************");
            doc.text(25, 110, "Recibí conforme:")
            doc.text(20, 115, "_____________________")
        }
        doc.output('dataurlnewwindow');
    }
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
                            if (ouput.success) {
                                console.log(ouput)
                                history.goBack()
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
    function abrirfirma() {
        if (nombres.id_espacio_localida != null) {

            $.confirm({
                theme: 'supervan',
                closeIcon: true,
                title: 'Firma',
                content: 'Verificar que el voucher tenga la cédula correcta y firma',
                type: 'red',
                buttons: {
                    tryAgain: {
                        text: 'Ver ',
                        btnClass: 'btn-red',
                        action: function () {
                            window.open(nombres.status_pg, "_blank")

                        }
                    },
                    aproba: {
                        text: "Aprobar ",
                        btnClass: 'btn-success',
                        action: function () {
                            Boleteria_voucher({
                                "estado": 1,
                                "id": "" + nombres.id,
                                "link": nombres.status_pg
                            }).then(boleto => {
                                if (boleto.estado) {
                                    let boletos = JSON.stringify({ ...nombres, ...boleto.datos })
                                    sessionStorage.setItem("Detalleuid", boletos)
                                    window.location.reload()
                                }

                            })
                        }
                    },
                    rechaza: {
                        text: "Rechazar",
                        btnClass: 'btn-success',
                        action: function () {
                            Boleteria_voucher({
                                "estado": "",
                                "id": "" + nombres.id,
                                "link": nombres.status_pg
                            }).then(boleto => {
                                if (boleto.estado) {
                                    let boletos = JSON.stringify({ ...nombres, ...boleto.datos })
                                    sessionStorage.setItem("Detalleuid", boletos)
                                    window.location.reload()
                                }

                            })
                        }
                    }
                }
            });

        } else {
            usedispatch(setModal({ nombre: "firma", estado: { ...nombres } }))
            usedispatch(setModal({ nombre: "", estado: "" }))
            usedispatch(setModal({ nombre: "firma", estado: { ...nombres } }))
        }
    }
    const [alert, setAlert] = useState(null)
    function generaPDF(row) {

        generaTiketspdf({
            "cedula": row.cedula,
            "codigoEvento": row.codigoEvento,
            "id_ticket_usuarios": row.id
        }).then(ouput => {
            if (ouput.success) {
                window.open(ouput.link.replace("flash", "api"), "_blank");
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
        })
    }
    function agregarComentario() {
        let id = nombres.id
        let number = nombres.cedula
        let id_operador = clienteInfo()
        $.confirm({
            title: 'Observación',
            type: 'green',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>Agrege una comentario</label>' +
                '<textarea class="exampleFormControTextarea1 form-control" id="emControlTextarea1" rows="3"></textarea>' +
                '</div>' +
                '</form>',
            typeAnimated: true,
            buttons: {
                formSubmit: {
                    text: 'Comentar',
                    btnClass: 'btn-blue',
                    action: function () {
                        var name = document.getElementById('emControlTextarea1')
                        console.log(name.value);
                        if (!name.value) {
                            $.alert('Ingrese un Comentario');
                            return false;
                        }
                        ComentarioRegistro({
                            "id_registro": id,
                            "id_operador": id_operador.id,
                            "comentario": name.value
                        }).then(mensage => {
                            if (mensage.success) {
                                console.log(mensage)
                                buscarcliente({
                                    "cedula": !isNaN(number) ? number.trim() : '',
                                    "email": ''
                                }).then(oupt => {
                                    //console.log(informacion, oupt)
                                    $("#search").removeClass("d-none")
                                    if (oupt.data.nombreCompleto != undefined && oupt.data.nombreCompleto != null) {
                                        $('#cedulac').val("")
                                        sessionStorage.setItem("Suscritorid", JSON.stringify(oupt.data))
                                        history.push("/admin/suscritor/" + oupt.data.id + "")
                                        /*setDausuario({
                                          nombreCompleto: oupt.data.nombreCompleto,
                                          ciudad: oupt.data.direccion,
                                          email: oupt.data.email,
                                          id: oupt.data.cedula
                                        })*/
                                    }
                                    else {

                                        usedispatch(setToastes({
                                            show: true,
                                            message: 'Para ceder un ticket el usuario debe estar registrado',
                                            color: 'bg-danger', estado: 'Usuaario no encontraron'
                                        }))
                                    }

                                })
                                //history.goBack()
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
                },
            },
            onContentReady: function () {
                var jc = this;
                this.$content.find('form').on('submit', function (e) {
                    e.preventDefault();
                    jc.$$formSubmit.trigger('click');
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
        if (PreciosStore().filter(f => f.id == evento).length > 0) {

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
        if (PreciosStore().filter(f => f.id == evento).length > 0) {
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
    }
    let [estadotc, setEstadoTC] = useState(null)

    function nuevoPrecio() {
        let datos = nombres.info_concierto.map((item, i) => {
            let valor = item.cantidad * ListarComision(item.idespaciolocalida, item.id_localidad)
            return valor
        })
        return datos.reduce((a, b) => a + b, 0).toFixed(2)
    }
    const ListaPrecios = async () => {
        const info = await ListaPreciosEvent();
        return info
    }
    const listarConciliacion = async (id) => {
        try {
            let { data } = await boleteriaAxios.get("Boleteria/infoconcilia/" + id)
            console.log(data);
            return data
        } catch (error) {
            return error
        }
    }
    let [datoconcilia, setDatosConciloa] = useState(
        {
            "id": "",
            "id_operador": "",
            "id_registro": "",
            "banco": "",
            "cuenta": "",
            "total_pagado": "",
            "forma_pago": "",
            "tarjeta": "",
            "lote": "",
            "autorizacion": "",
            "total": "",
            "base": " ",
            "valor_pagado": "",
            "retencion": "",
            "comision": "",
            "comision_sin_iva": "",
            "emision_boleto": "",
            "evento": "",
            "total_sin_emision": ""
        }
    )
    useEffect(() => {
        ListaPrecios()
        let concer = nombres.info_concierto
        let datos = JSON.parse(sessionStorage.getItem("Detalleuid"))
        listarConciliacion(datos.id).then(res => {
            if (res.success) {
                setDatosConciloa(res.data[0])
            }
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
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
                            if (nombres.id_espacio_localida == "1") {
                                let comprobanteSpan = document.getElementById('comprobante');
                                comprobanteSpan.classList.add('label-success');
                                comprobanteSpan.textContent = 'Firma verificada';
                            }
                            if (nombres.id_espacio_localida == "0") {
                                let comprobanteSpan = document.getElementById('comprobante');
                                comprobanteSpan.classList.add('label-danger');
                                comprobanteSpan.textContent = 'Firma por verificar';
                            }
                            if (nombres.id_espacio_localida == null) {
                                let comprobanteSpan = document.getElementById('comprobante');
                                comprobanteSpan.classList.add('label-warning');
                                comprobanteSpan.textContent = 'no firmado';
                            }
                            console.log(ouput)
                            if (ouput.success) {
                                setDataTarjeta({ ...ouput.data })
                                console.log(nombres.nombreCompleto)
                                Verificarnomnbre(ouput.data.cardholder, ouputs.data.nombreCompleto)
                            }
                            else {
                                infoabimedia(nombres.token_pago).then(ouput => {
                                    if (ouput.data) {
                                        console.log(ouput)
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
            }
        }).catch(erro => {
            console.log(erro)
        })
        Listarticketporestado(datos.cedula).then(ouput => {
            if (ouput.success) {
                let boletos = ouput.data.map((e) => {
                    if (concer.find(f => f.nombreConcierto == e.concierto) != undefined) { return { ...e } }
                })
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
            nombres.numerTransacion != null && nombres.numerTransacion != "null" ?
                BuscarTransacion({
                    "numeroTransaccion": nombres.numerTransacion
                }).then(ouput => {
                    console.log(ouput)
                    if (ouput.success) {
                        if (ouput.data) {
                            let comprobanteSpan = document.getElementById('comprobante');
                            comprobanteSpan.classList.add('label-danger');
                            comprobanteSpan.textContent = 'Comprobante repetdo';
                            setRepetido(ouput.data)
                        }
                        else {
                            let comprobanteSpan = document.getElementById('comprobante');
                            comprobanteSpan.classList.add('label-success');
                            comprobanteSpan.textContent = 'Comprobante único';
                        }
                        return
                    }
                }).catch(err => {
                }) : ""
            : ""
    }, [])
    function verRegistro() {
        let selecion = document.getElementById("registro").value
        if (selecion.trim() === "") return
        let datos = repetidos.filter(e => e.id == selecion)[0]
        sessionStorage.setItem("Detalleuid", JSON.stringify({ ...datos }))
        history.push("/admin/Reporte/" + datos.id)
        window.location.reload()

    }
    function ValidarComprobante() {
        if (nombres.numerTransacion == " ") return
        BuscarTransacion({
            "numeroTransaccion": nombres.numerTransacion
        }).then(ouput => {
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
        }).catch(err => {
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
        $.confirm({
            title: 'Desea Aprobar este Registro',
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
                                history.goBack()
                            }
                        }).catch(err => {
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
        $.confirm({
            title: 'Generar de nuevo los Boletos',
            type: 'blue',
            content: '',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: function () {
                        Generar_Boleto_nuevos({
                            "id_registraCompra": nombres.id,
                            "cedula": nombres.cedula
                        }, nombres.id).then(ouput => {
                            ouput.success ? history.goBack() : ""
                        }).catch(errr => {
                            console.log(errr)
                        })
                    }
                },
                cancel: function () {
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
            "estado": "Pagado",
            "bancos": nombres.banco
        }
        if (nombres.forma_pago == "Deposito") {
            $.confirm({
                title: 'Desea Aprobar el pago',
                type: 'blue',
                content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label class="form-label">Seleccione el Banco </label>' +
                    '<select id="banco" class="name form-select">' +
                    '<option value="Pichincha">Pichincha</option>' +
                    '<option value="Guayaquil">Guayaquil</option>' +
                    '</select></form>',
                buttons: {
                    formSubmit: {
                        text: 'Aceptar',
                        btnClass: 'btn-blue',
                        action: function () {
                            var name = this.$content.find('.name').val();
                            // console.log(name)
                            // return
                            registraPagos({ ...reporte, "bancos": name }).then(ouput => {
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
        } else {
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
    async function voucherinvalido(e) {
        let boleto = await Boleteria_voucher({
            "estado": e,
            "id": "" + nombres.id,
            "link": nombres.status_pg
        })
        if (boleto.estado) {
            let boletos = JSON.stringify({ ...nombres, ...boleto.datos })
            sessionStorage.setItem("Detalleuid", boletos)
            window.location.reload()
        } else {
            let boletos = JSON.stringify({ ...nombres, ...boleto.datos })
            sessionStorage.setItem("Detalleuid", boletos)
            window.location.reload()
        }
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
                        CanjearBoletoRegistro({ "id_registraCompra": id, "canjeado": "CANJEADO" }).then(ouput => {
                            if (ouput.success) {
                                usedispatch(setToastes({
                                    show: true,
                                    message: ouput.message,
                                    color: 'bg-primary',
                                    estado: "Boletos actualizados"
                                }))
                                Listarticketporestado(datos.cedula).then(ouput => {
                                    if (ouput.success) {
                                        history.goBack()
                                        let boletos = ouput.data.map((e) => {

                                            if (cor.find(f => f.nombreConcierto == e.concierto) != undefined) {
                                                return { ...e }
                                            }
                                        }
                                        )
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
                <ModalFirma />
                <div className='container-fluid row p-0'>
                    <div className='col-12'>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#filas"
                                >Detalle</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#mesas"
                                >Boletos</a>
                            </li>
                            {nombres.codigo_boletos != null && JSON.parse(nombres.codigo_boletos).lengt > 0 ? <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#correlativos">id Boletos fisicos</a>
                            </li> : ""}
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#boletos">Tablas</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content col-sm-12">
                        <div className="tab-pane active container " id="filas">
                            <div className="row ">
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

                                <h1></h1>
                                {useradmin.perfil == "suscriptores" ? "" :
                                    <div className="col-12   d-flex  text-center justify-content-md-end  align-items-center">
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
                                                {nombres.id_espacio_localida != null ? <div className="dropdown">
                                                    <button className="btn btn-default btn-sm border dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Validar firma
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item" onClick={() => voucherinvalido(1)}>Aprobar</a>
                                                        <a className="dropdown-item" onClick={() => voucherinvalido(null)}>Anular firma</a>
                                                    </div>
                                                </div> : ""}

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
                                                    </a> : <a className="btn btn-default btn-sm"
                                                        data-toggle="tooltip" data-placement="top" title="Consolidar Deposito"
                                                        onClick={() => Generarnew()}
                                                    >
                                                        <i className="fa fa-info-circle">  </i>Recargar Boleto
                                                    </a>}
                                                {nombres.forma_pago != "Deposito" ? "" : <a className=" btn btn-default btn-sm" onClick={() => usedispatch(setModal({ nombre: "canjear", estado: { ...nombres } }))} ><i className="fa fa-check"></i> Cambiar Tarjeta </a>}



                                                {/*boletoscanje() ? "" : <a className=" btn btn-default btn-sm" onClick={Verificaexistencia} > <i className="fa fa-database"></i> Verificar boletos reservado </a>*/}

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

                                        {nombres.ticket_usuarios.length == 0 ? <a className=" rounded-circle btn-primary mx-2 p-2 text-white "
                                            data-toggle="tooltip" data-placement="top" title="Generar Boleto"
                                            onClick={() => Generarnew()}
                                        >
                                            <i className=" fa fa-spinner">  </i>
                                        </a> : ""}

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
                                            <span id="comprobante" className=" fw-bold   container-fluid px-5 mx-5 label">

                                            </span>
                                            <div className="col-12 col-md-4 border-bottom p-3">
                                                <div className="invoice-from">
                                                    <small>De</small>
                                                    <div className="m-t-5 m-b-5">
                                                        <strong className="text-inverse">COMNET - SPEED - T-ICKETS  (TICKETSECUADORS.A)</strong>
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
                                                        <br></br>
                                                        <span>{nombres.estado_autorizacion_sri||""}</span>
                                                        <br></br>
                                                        <span>{nombres.clave_acceso == null ? "" : nombres.clave_acceso}</span>
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
                                                                    nombres.clave_acceso != null ? "" : <a className=" btn btn-default btn-sm" onClick={ConsolidaBoleto}>
                                                                        <i className="fa fa-credit-card"></i> Aprobar deposito
                                                                    </a>
                                                                    : ""
                                                            }
                                                            <br></br>
                                                            {
                                                                nombres.forma_pago == "Deposito" || nombres.forma_pago == "Tarjeta" ?
                                                                    nombres.clave_acceso != null ? "" : <a className=" btn btn-default btn-sm" onClick={ComprobarBoleto}>
                                                                        <i className="fa fa-credit-card"></i> Cambiar a Comprobar deposito
                                                                    </a>
                                                                    : <a className=" btn btn-default btn-sm" >
                                                                        <i className="fa fa-credit-card"></i> Ya se genero autoriazaion
                                                                    </a>
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
                                                            {(nombres.id_espacio_localida != null) ?
                                                                < a className=" btn btn-default btn-sm"

                                                                    onClick={() =>// Abre una nueva ventana con la URL especificada
                                                                        window.open(nombres.status_pg, '_blank')}
                                                                    target="_blank">
                                                                    <i className="fa fa-credit-card"></i> voucher firmado
                                                                </a> : ""}
                                                            {
                                                                nombres.forma_pago == "Deposito" || nombres.forma_pago == "Tarjeta" ?
                                                                    nombres.clave_acceso != null ? "" : <a className=" btn btn-default btn-sm" onClick={ComprobarBoleto}>
                                                                        <i className="fa fa-credit-card"></i> Cambiar a Comprobar
                                                                    </a>
                                                                    : <a className=" btn btn-default btn-sm" >
                                                                        <i className="fa fa-credit-card"></i> Ya se genero autoriazaion
                                                                    </a>
                                                            }

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

                                                            {nombres.forma_pago == "Deposito" ? <PhotoView src={nombres.link_comprobante == null ? "data:image/png;base64,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" : nombres.link_comprobante}>
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
                                                                ${(item.localidad_precio) ? ((item.localidad_precio * parseInt(item.cantidad)) - parseFloat(item.comision_por_boleto)).toFixed(2) : (parseInt(item.cantidad) * parseFloat(ListarPrecio(item.idespaciolocalida, item.id_localidad))).toFixed(2)}
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
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className='text-end' >Subtotal:</td>
                                                    <td width="15%" className='text-center'>$ {nombres.subtotal}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className='text-end' >Iva: {nombres.info_concierto[0]["iva"]||""}</td>
                                                    <td width="15%" className='text-center'>$ {nombres.iva}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row"></th>
                                                    <td className='text-end' >Total neto :</td>
                                                    <td width="15%" className='text-center'>$ {(parseFloat(nombres.subtotal) + parseFloat(nombres.iva)).toFixed(2)}</td>
                                                </tr>
                                                <tr >
                                                    <th scope="row"></th>
                                                    {nombres.forma_pago != "Tarjeta" ? <td className={" text-end"} >Total</td> : <td className='text-end' >Total tarjeta:</td>}
                                                    <td className="text-center">${(parseFloat(nombres.total_pago)).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {nombres.conciliacion.length == 0 ? "" : nombres.forma_pago == "Tarjeta" ?
                                        <div className=" table-responsive">
                                            <table className="table  table-borderless ">
                                                <thead className="text-center">
                                                    <tr>
                                                        <th>Autorización</th>
                                                        <th>Banco</th>
                                                        <th>lote </th>
                                                        <th>total sin emision</th>
                                                        <th>valor pagado</th>
                                                        <th>Total pagado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-center">
                                                        <td>{datoconcilia.autorizacion || "No hay datos"}</td>
                                                        <td className="">
                                                            {datoconcilia.banco || "No hay datos"}
                                                        </td>
                                                        <td className="">
                                                            {datoconcilia.lote || "No hay datos"}
                                                        </td>
                                                        <td className="">
                                                            {datoconcilia.total_sin_emision || "No hay datos"}
                                                        </td>
                                                        <td className="">
                                                            {datoconcilia.valor_pagado || "No hay datos"}
                                                        </td>
                                                        <td className="">
                                                            {datoconcilia.total_pagado || "No hay datos"}
                                                        </td>
                                                    </tr>



                                                </tbody>
                                            </table>

                                        </div> : <div className=" table-responsive">
                                            <table className="table">
                                                <thead className="text-center">
                                                    <tr>
                                                        <th>Cuenta</th>
                                                        <th>Banco</th>
                                                        <th>lote </th>
                                                        <th>total sin emision</th>
                                                        <th>valor pagado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="text-center">
                                                        <td>{datoconcilia.cuenta || "No hay datos"}</td>
                                                        <td className="">
                                                            {datoconcilia.banco || "No hay datos"}
                                                        </td>
                                                        <td className="">
                                                            {datoconcilia.lote || "No hay datos"}
                                                        </td>
                                                        <td className="">
                                                            {datoconcilia.total_sin_emision || "No hay datos"}
                                                        </td>
                                                        <td className="">
                                                            {datoconcilia.total_pagado || "No hay datos"}
                                                        </td>
                                                    </tr>



                                                </tbody>
                                            </table>

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
                                        {nombres.forma_pago == "Tarjeta" ? <a className=" rounded-circle btn-success mx-2 p-2 text-white"
                                            onClick={abrirfirma}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </a> : ""}
                                        <a className="rounded-circle btn-success mx-2 p-2 text-white"
                                            onClick={generaComprobante}
                                        >
                                            <i className="bi bi-printer"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane  container " id="mesas">
                            {useradmin.perfil == "suscriptores" ? "" :
                                <div className=" container-fluid d-flex ">
                                    <div className=" invoice-from col-12">
                                        <div className="row d-none">
                                            <p className="col-12 col-md-6">
                                                <a className="btn btn-primary" data-toggle="collapse" href="#collapsever" role="button" aria-expanded="true" aria-controls="collapsever">
                                                    <i className=" fa fa-eye"></i>
                                                </a>
                                            </p>

                                        </div>
                                        <Iframe
                                            url={url}
                                            detener={() => console.log("")}
                                        />


                                        <MaterialReactTable
                                            columns={ticketsboletos}
                                            data={nombres.ticket_usuarios}
                                            muiTableProps={{
                                                sx: {
                                                    tableLayout: 'flex'
                                                }
                                            }}
                                            enableRowActions
                                            renderRowActions={({ row }) => (
                                                <Box sx={{ display: 'flex' }}>
                                                    <div className=" btn-group" ><a onClick={() => Eliminara(row.original.id)}
                                                        className="border  btn-default btn-sm">
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
                                                                >
                                                                    <i className="fa fa-download   "></i>
                                                                </a>
                                                            </Tooltip> :
                                                            <a
                                                                className=" btn btn-default btn-sm btn-disable"
                                                                disabled
                                                            ><i className="fa fa-download "></i></a>
                                                        }

                                                    </div>
                                                </Box>
                                            )}

                                            localization={MRT_Localization_ES}
                                        />
                                    </div>
                                </div>}
                        </div>
                        <div className="tab-pane  container " id="correlativos">
                            {nombres.codigo_boletos != null && JSON.parse(nombres.codigo_boletos).lengt > 0 ?
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Event</Th>
                                            <Th>Date</Th>
                                            <Th>Location</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Tr>
                                            <Td>Tablescon</Td>
                                            <Td>9 April 2019</Td>
                                            <Td>East Annex</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Capstone Data</Td>
                                            <Td>19 May 2019</Td>
                                            <Td>205 Gorgas</Td>
                                        </Tr>
                                        <Tr>
                                            <Td>Tuscaloosa D3</Td>
                                            <Td>29 June 2019</Td>
                                            <Td>Github</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>

                                : ""}

                        </div>
                        <div className=" tab-pane container" id="boletos">
                            {usuario.movil != "" ? "" : nombres.info_concierto[0].nombreConcierto == "AUTO BINGO " ? <Bingo_tablas
                                Bingo={nombres.ticket_usuarios}
                                cedula={nombres.cedula}
                                ID={id}
                            /> : ""}
                        </div>


                    </div>
                </div>


            </div>
        </PhotoProvider>
    )
}