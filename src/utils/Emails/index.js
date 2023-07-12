import axios from "axios"
import { getVerTienda } from "utils/CarritoLocalStorang"
import { Bodyhtml, Headerhtml } from "./cuerpo"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"

export const Emailcontec = async (parms) => {
    try {
        let { data } = await axios.post("https://api.t-ickets.com/email/api/v1/sendEmail_html", {
            "to": parms.correo,
            "html": "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'><meta name='x-apple-disable-message-reformatting'><title></title><style>div,h1,p,table,td{font-family:Arial,sans-serif}</style></head><body style='margin:0;padding:0'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#fff'><tr><td align='center' style='padding:0'><table role='presentation' style='width:602px;border-collapse:collapse;border:1px solid #ccc;border-spacing:0;text-align:left'><tr><td align='center' style='padding:40px 0 30px 0;background:#311c7c'><img src='https://tickets.com.ec/static/media/50pixeles.b0ae9c3f8eef1c10fd90.png' alt='' width='200' style='height:150px;display:block'></td></tr><tr><td style='padding:36px 30px 42px 30px'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 36px 0'><p style='font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif'>Bienvenido(a) " + parms.nombre + " a <span style='font-weight:700'>Tickets Ecuador</span></p><p style='margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'>Te has suscrito a tickets.com.ec, Ahora puedes realizar la compra de entradas a tu evento favorito, ver tus compras y boletos. Además de recibir correos informativos de tus procesos de compras</p><p style='margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'><a href='https://tickets.com.ec/' style='color:#ee4c50;text-decoration:underline'>Visitar</a></p></td></tr></table></td></tr><tr><td style='padding:30px;background:#311c7c'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif'><tr><td style='padding:0;width:50%' align='left'><p style='margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#fff'>&reg; Visita nuestras redes sociales<br><a href='http://www.example.com' style='color:#fff;text-decoration:underline'></a></p></td><td style='padding:0;width:50%' align='right'><table role='presentation' style='border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 0 10px;width:38px'><a href='https://instagram.com/tickets.com.ec?igshid=YmMyMTA2M2Y=' target='_blank' style='color:#fff'><img src='https://api.t-ickets.com/store/img/instagram.png' alt='instagram' width='38' style='height:auto;display:block;border:0'></a></td><td style='padding:0 0 0 10px;width:38px'><a href='https://www.tiktok.com/@tickets.com.ec?_t=8Z2G1FTansT&_r=1' target='_blank' style='color:#fff'><img src='https://api.t-ickets.com/store/img/tictok.png' alt='TickTock' width='38' style='height:auto;display:block;border:0'></a></td><td style='padding:0 0 0 10px;width:38px'><a href='https://www.facebook.com/tickets.com.ec?mibextid=LQQJ4d' target='_blank' style='color:#fff'><img src='https://api.t-ickets.com/store/img/face.png' alt='Facebook' width='38' style='height:auto;display:block;border:0'></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>"
        }, {
            headers: {

                'x-api-key': '6tVIDRCb3k6BQ4zEB17kGo!sfHRjtZLd1dm4SR6lErwrqckBfboT249mhvkZPcBvievKkJVAEo38xTFeUJGhDWH3Ule68N9R8Z7S6UMMylFwUlzPeTXbHCIo'
            }
        })
        return data
    } catch (error) {
        return error
    }
}
/**
     * {
    "phone": "593984040380@s.whatsapp.net",
    "message": "prueba",
    "link": ""
}
     */
export const EnviaWhast = async (parms) => {

    let movil = "593" + parms.phone + "@s.whatsapp.net"
    // console.log(parms,movil)
    try {
        let { data } = await axios.post("https://api.t-ickets.com/whatsapp_qr/api/v1/send", {
            "phone": movil,
            "message": parms.mensaje,
            "link": parms.link
        },
            {
                headers: {

                    'x-api-key': 'qlwgcylehdn134x.ybfugexuhjnwedchvqkdcqu-rgfqbedjcqcxnejcbvqhrcjqrchberjc'
                }
            }
        )
        console.log(data)
        return data

    } catch (error) {
        console.log(error)
        return error

    }
}
export const EnviarDetalleCompras = async  () => {
    
    let nombres = getDatosUsuariosLocalStorag()
    let final = "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'><link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'><script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script><script src='https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js' integrity='sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1' crossorigin='anonymous'></script><script src='https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'><meta name='x-apple-disable-message-reformatting'><title></title><style>div,h1,p,table,td{font-family:Arial,sans-serif}</style></head><body style='margin:0;padding:0'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#fff'><tr><td align='center' style='padding:0'><table role='presentation' style='width:602px;border-collapse:collapse;border:1px solid #ccc;border-spacing:0;text-align:left'><tr><td align='center' style='padding:40px 0 30px 0;background:#311c7c'><img src='https://tickets.com.ec/static/media/50pixeles.b0ae9c3f8eef1c10fd90.png' alt='' width='200' style='height:150px;display:block'></td></tr><tr><td style='padding:36px 30px 42px 30px'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 36px 0'><p style='font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif'>Estimado<span style='font-weight:700'>{Tickets Ecuador}</span></p><p style='margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'>Este es un comprobante de compra en linea realizado el: {fecha y hora} Para el evento {evento}</p><p style='margin:0 0 10px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'>Fecha:{}<br>Hora:{}<br>Lugar:{}</p><p style='display:none;margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'><a href='https://tickets.com.ec/' style='color:#ee4c50;text-decoration:underline'>Visitar</a></p></td></tr></table></td></tr><tr><td><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;margin-top:-50px'><thead><tr classname='text-black'><th style='text-align:center;font-size:.8em'>Localidad</th><th style='text-align:center;font-size:.8em'>Cantidad</th><th style='text-align:center;font-size:.8em'>Total</th></tr></thead><tbody><tr classname='text-black'><td style='text-align:center;font-size:.8em;text-transform:lowercase'>LOCALIDAD</td><td style='text-align:center;font-size:.8em;text-transform:lowercase'>ASIENTO</td><td style='text-align:center;font-size:.8em;text-transform:lowercase'>TOTAL</td></tr></tbody></table></td></tr><tr><td style='display:flex;justify-content:end;padding-top:5px'><table style='width:100%;border-collapse:collapse;border:0;border-spacing:0;margin-top:25px;margin-bottom:15px;text-align:end;margin-right:45px'><tbody><tr><th scope='row'></th><td classname='text-end'>Subtotal:</td><td classname='text-end'>$25.00</td></tr><tr><th scope='row'></th><td>Comisión Bancaria:</td><td>$3.00</td></tr><tr><th scope='row'></th><td classname='text-end'>Comisión por Boleto:</td><td classname='text-center'>$28.00</td></tr></tbody></table></td></tr><tr><td style='padding:30px;background:#311c7c'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif'><tr><td style='padding:0;width:50%' align='left'><p style='margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#fff'>&reg; Visita nuestras redes sociales<br><a href='http://www.example.com' style='color:#fff;text-decoration:underline'></a></p></td><td style='padding:0;width:50%' align='right'><table role='presentation' style='border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 0 10px;width:38px'><a href='https://instagram.com/tickets.com.ec?igshid=YmMyMTA2M2Y=' target='_blank' style='color:#fff'><img src='https://api.t-ickets.com/store/img/instagram.png' alt='instagram' width='38' style='height:auto;display:block;border:0'></a></td><td style='padding:0 0 0 10px;width:38px'><a href='https://www.tiktok.com/@tickets.com.ec?_t=8Z2G1FTansT&_r=1' target='_blank' style='color:#fff'><img src='https://api.t-ickets.com/store/img/tictok.png' alt='TickTock' width='38' style='height:auto;display:block;border:0'></a></td><td style='padding:0 0 0 10px;width:38px'><a href='https://www.facebook.com/tickets.com.ec?mibextid=LQQJ4d' target='_blank' style='color:#fff'><img src='https://api.t-ickets.com/store/img/face.png' alt='Facebook' width='38' style='height:auto;display:block;border:0'></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>"
    console.log(nombres)
    let concieto = sessionStorage.getItem("consierto") 
        let cuerpouno = "</tr> <tr><td style='padding:36px 30px 42px 30px'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 36px 0'><p style='font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif'>Estimado<span style='font-weight:700'>" + nombres.name + "</span></p><p style='margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'>Este es un comprobante de compra en linea realizado el: {fecha y hora} Para el evento " + concieto + "</p><p style='display:none;margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'><a href='https://tickets.com.ec/' style='color:#ee4c50;text-decoration:underline'>Visitar</a></p></td></tr></table></td></tr><tr>"
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
     //  final= final   + Bodyhtml
        console.log(final)
        try {
            let { data } = await axios.post("https://api.t-ickets.com/email/api/v1/sendEmail_html", {
                "to":nombres.email,
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