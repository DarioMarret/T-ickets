import { refType } from "@mui/utils";
import axios from "axios";
import { GetMetodo, GetValores, getVerTienda } from "./CarritoLocalStorang";
import { Host, token } from "./constantes";
import { clienteInfo, getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag";
import { Bodyhtml, Headerhtml } from "./Emails/cuerpo";
import { BuscarTransacion } from "./pagos/Queripagos";
/** reportar Pago */
export const PagoRapido = async (transaccion) => {
    let codigoEvento = sessionStorage.getItem('eventoid')
    let randon = sessionStorage.getItem("random");
    let Eventoinfo = JSON.parse(sessionStorage.getItem('infoevento'))
    let codicontry = sessionStorage.getItem("codicontry") ? sessionStorage.getItem("codicontry") : false
    let asientos = sessionStorage.getItem("asientosList") != null ? JSON.parse(sessionStorage.getItem("asientosList")).map(e => { return e.ids }) : []
    let array = sessionStorage.getItem("sillascorre") != null ? JSON.parse(sessionStorage.getItem("sillascorre")) : []
    let tiktefisic = sessionStorage.getItem("ticktesfisio") != null ? JSON.parse(sessionStorage.getItem("ticktesfisio")) : []
    let datosPersonal = getDatosUsuariosLocalStorag().cedula
    let discapacidad = getDatosUsuariosLocalStorag().discapacidad
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let metodo = GetMetodo() == "Transferencia" ? "Deposito" : GetMetodo()
    //let tienda= getVerTienda();
    let cantidadTotal = getVerTienda().reduce((total, concierto) => {
        return total + concierto.cantidad;
    }, 0);
    let sillas = [...asientos, ...array]
    //  si discrimino lo tengo que guardar  let total = GetMetodo() == "Tarjeta" ? parseFloat(GetValores().total) : parseFloat(GetValores().comision) + parseFloat(GetValores().subtotal)
    let concierto = getVerTienda().map((e) => {
        return {
            "nombreConcierto": Eventoinfo.nombreConcierto,
            "id_localidad": e.localidaEspacio["idcolor"] || e.localidaEspacio["id_localidad"],
            "idespaciolocalida": e.localidaEspacio["ideprecio"] || e.localidaEspacio["ideprecio"],
            "CODIGEVENTO": codigoEvento,
            "cantidad": e.cantidad,
            "localidad_nombre": e.localidad || e.localidaEspacio["nombre"],
            "localidad_precio": (discapacidad == 'Si'  && (clienteInfo() != null)) ? parseFloat(e.localidaEspacio["precio_discapacidad"]) : parseFloat(e.valor),
            "discapacida": (discapacidad == 'Si'  && (clienteInfo() != null)),
            menor: (parseInt(e.localidaEspacio["idcolor"]) == 308),
            naipes: getDatosUsuariosLocalStorag().naipes ? (getDatosUsuariosLocalStorag().naipes == 'Si') : null,
            "comision_por_boleto": parseInt(e.cantidad) * parseFloat(e.localidaEspacio["comision_boleto"]),
            "id_sillas": cantidadTotal == sillas.length ? [...sillas] : [],
            "iva": Eventoinfo.iva,
            "post": Eventoinfo.post ? Eventoinfo.post : ""
        }
    })
    // console.log(concierto)
    let datos = {
        "cedula": datosPersonal,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
        "forma_pago": metodo,
        "concierto": [...concierto],
        "valores": {
            "total": parseFloat(GetValores().total),
            "comision": parseFloat(GetValores().comision),
            "subtotal": parseFloat(GetValores().subtotal),
            "comision_bancaria": parseFloat(GetValores().comision_bancaria),
            "description": GetValores().description,
            "iva": GetValores().iva
        },
        "random": randon,
        "codigo_boletos": [...tiktefisic],
        "idfactura": "",
        "transaccion": transaccion
    }

    // console.log(datos, concierto)
    try {

        console.log(datos)

        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/registraCompra ", datos, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )

        console.log(data)

        return { ...data, id: data.idRegistro, ...datos };
        // await EnviarDetalleCompra(email, parm)

    } catch (error) {
        return error

    }

}
const EnviarDetalleCompra = async (email, parms) => {
    let concieto = sessionStorage.getItem("consierto")
    let cuerpouno = "</tr> <tr><td style='padding:36px 30px 42px 30px'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 36px 0'><p style='font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif'>Estimado<span style='font-weight:700'>" + parms + "</span></p><p style='margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'>Este es un comprobante de compra en linea realizado el: {fecha y hora} Para el evento " + concieto + "</p><p style='display:none;margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'><a href='https://tickets.com.ec/' style='color:#ee4c50;text-decoration:underline'>Visitar</a></p></td></tr></table></td></tr><tr>"
    let tabla = "<td><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;margin-top:-50px'><thead><tr classname='text-black'><th style='text-align:center;font-size:.8em'>Localidad</th><th style='text-align:center;font-size:.8em'>Cantidad</th><th style='text-align:center;font-size:.8em'>Total</th></tr></thead><tbody>"
    getVerTienda().map((e) => {
        tabla = tabla + "<tr classname='text-black' ><td style='text-align:center;font-size:.8em;text-transform:lowercase'>" + e.localidad + "</td><td style='text-align:center;font-size:.8em;text-transform:lowercase'>" + parseInt(e.cantidad) + "</td><td style='text-align:center;font-size:.8em;text-transform:lowercase'>" + (parseFloat(e.valor) * parseInt(e.cantidad)) + "</td></tr >"
        /* return {
             "nombreConcierto": e.nombreConcierto,
             "id_localidad": e.localidad,
             "idespaciolocalida": parseFloat(e.valor).toFixed(2),
             "cantidad": parseInt(e.cantidad),
         }*/
    })
    tabla = tabla + "</tbody></table></td></tr>"
    let final = Headerhtml + cuerpouno + tabla + Bodyhtml
    try {
        let { data } = await axios.post("https://api.t-ickets.com/email/api/v1/sendEmail_html", {
            "to": email,
            "html": final
        },
            {
                headers: {
                    'x-api-key': '6tVIDRCb3k6BQ4zEB17kGo!sfHRjtZLd1dm4SR6lErwrqckBfboT249mhvkZPcBvievKkJVAEo38xTFeUJGhDWH3Ule68N9R8Z7S6UMMylFwUlzPeTXbHCIo'
                }
            }
        )
        return data
    } catch (error) {
        return error
    }

}
/** OCRAPI */
export const OCRApi = async (parms) => {
    try {
        //https://api.t-ickets.com/ocr/api/v1/ocr_space
        let { data } = await axios.post("https://api.flashchat.chat/backflash/comprobantes_scaner/48", parms)
        let datos = await BuscarTransacion({
            "numeroTransaccion": data.data["numero_documento"]
        })
        console.log(data)
        if (datos.success) {
            return { ...data, success: false, data: { "beneficiario": data.data["destinatario"], ...data.data.data, "numero_documento": "Comprobante ya registrado" } }
        }
        return data
    } catch (error) {
        return error
    }
}

/** Listar todos los reportes de tickes */
export const AprobarTiket = async () => {
    try {
        let { data } = await axios.get("https://api.t-ickets.com/ms_login/ticket_admin", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
/**  */
export const ConsolidaBoleto = async () => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/boletos", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const Contactos_Boletos = async (parmas) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/mikroti/Boleteria/Contactos", {
            "evento": parmas
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
export const cederboleto = async (ceder) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...ceder,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/ceder_boleto", parmspro, {

        }, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        console.log(data)
    } catch (error) {
        console.log(error)

    }
}

export const GeneraToken = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/generar_token", parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (err) {
        return err
    }
}
export const ValidarToken = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id": parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/confirmarpago", {
            ...parmspro
        }
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                }
            })
        return data
    } catch (error) {
        return error
    }
}
export const generaTiketspdf = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/ticket/api/v1/ticket_pdf_link", parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        // console.log(data)
        return data
    } catch (error) {
        return error
    }
}
export const generaTiketsBingo = async (parms, id) => {
    try {
        let { data } = await axios.put("https://api.t-ickets.com/mikroti/Boleteria/bingo/" + id, parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}
//verificar pago tarjeta 
export const CambiarPagoTC = async (parms) => {
    try {
        let { data } = await axios.post("", parms, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error

    }
}

//https://api.t-ickets.com/ms_login/doc/static/index.html#/Compra/post_api_v1_liverar_asiento
//https://api.t-ickets.com/ms_login/doc/static/index.html#/Compra/post_api_v1_generarBoleto     