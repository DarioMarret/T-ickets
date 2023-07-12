import axios from "axios"

/**
 * 
 * @returns 
 * status:200
 * mensage:"Mensaje enviado con exito"
 */
export const Whatsappsend= async(parms)=>{
    /**
     * {
    "phone": "593984040380@s.whatsapp.net",
    "message": "prueba",
    "link": ""
}
     */
    let movil = "593" + parms.movil +"@s.whatsapp.net"
    try {
        let { data } = await axios.post("https://api.t-ickets.com/whatsapp_qr/api/v1/send", {
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