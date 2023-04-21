import axios from "axios"

export const Emailcontec = async (parms) =>{
    try {
        let { data } = await axios.post("https://rec.netbot.ec/email/api/v1/sendEmail_html",{
            "to": parms.correo,
            "html": "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml' xmlns:o='urn:schemas-microsoft-com:office:office'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'><meta name='x-apple-disable-message-reformatting'><title></title><style>div,h1,p,table,td{font-family:Arial,sans-serif}</style></head><body style='margin:0;padding:0'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#fff'><tr><td align='center' style='padding:0'><table role='presentation' style='width:602px;border-collapse:collapse;border:1px solid #ccc;border-spacing:0;text-align:left'><tr><td align='center' style='padding:40px 0 30px 0;background:#311c7c'><img src='https://tickets.com.ec/static/media/50pixeles.b0ae9c3f8eef1c10fd90.png' alt='' width='200' style='height:150px;display:block'></td></tr><tr><td style='padding:36px 30px 42px 30px'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 36px 0'><p style='font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif'>Bienvenido(a) " + parms.nombre +" a <span style='font-weight:700'>Tickets Ecuador</span></p><p style='margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'>Te has suscrito a tickets.com.ec, Ahora puedes realizar la compra de entradas a tu evento favorito, ver tus compras y boletos. Además de recibir correos informativos de tus procesos de compras</p><p style='margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif'><a href='https://tickets.com.ec/' style='color:#ee4c50;text-decoration:underline'>Visitar</a></p></td></tr></table></td></tr><tr><td style='padding:30px;background:#311c7c'><table role='presentation' style='width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif'><tr><td style='padding:0;width:50%' align='left'><p style='margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#fff'>&reg; Visita nuestras redes sociales<br><a href='http://www.example.com' style='color:#fff;text-decoration:underline'></a></p></td><td style='padding:0;width:50%' align='right'><table role='presentation' style='border-collapse:collapse;border:0;border-spacing:0'><tr><td style='padding:0 0 0 10px;width:38px'><a href='https://instagram.com/tickets.com.ec?igshid=YmMyMTA2M2Y=' target='_blank' style='color:#fff'><img src='https://flash.t-ickets.com/store/img/instagram.png' alt='instagram' width='38' style='height:auto;display:block;border:0'></a></td><td style='padding:0 0 0 10px;width:38px'><a href='https://www.tiktok.com/@tickets.com.ec?_t=8Z2G1FTansT&_r=1' target='_blank' style='color:#fff'><img src='https://flash.t-ickets.com/store/img/tictok.png' alt='TickTock' width='38' style='height:auto;display:block;border:0'></a></td><td style='padding:0 0 0 10px;width:38px'><a href='https://www.facebook.com/tickets.com.ec?mibextid=LQQJ4d' target='_blank' style='color:#fff'><img src='https://flash.t-ickets.com/store/img/face.png' alt='Facebook' width='38' style='height:auto;display:block;border:0'></a></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>"
        },{ headers: {
           
            'x-api-key': '6tVIDRCb3k6BQ4zEB17kGo!sfHRjtZLd1dm4SR6lErwrqckBfboT249mhvkZPcBvievKkJVAEo38xTFeUJGhDWH3Ule68N9R8Z7S6UMMylFwUlzPeTXbHCIo'
        }})
        return data
    } catch (error) {
        return error
    }
}
export const EnviaWhast = async (parms) => {
    /**
     * {
    "phone": "593984040380@s.whatsapp.net",
    "message": "prueba",
    "link": ""
}
     */
    let movil = "593" + parms.movil + "@s.whatsapp.net"
    try {
        let { data } = await axios.post("https://rec.netbot.ec/whatsapp_qr/api/v1/send", {
            "phone": movil,
            "message": "prueba",
            "link": ""
        },
            {
                headers: {

                    'x-api-key': 'qlwgcylehdn134x.ybfugexuhjnwedchvqkdcqu-rgfqbedjcqcxnejcbvqhrcjqrchberjc'
                }
            }
        )
        return data

    } catch (error) {
        return error

    }
}