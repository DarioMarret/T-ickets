import axios from "axios"


export const GenerarLinkPagoMedios = async () => {

    const { data } = await axios.post("https://cloud.abitmedia.com/api/payments/create-payment-link", {
        "companyType": "Persona Natural",
        "document": "0927177345",
        "documentType": "01",
        "fullName": "Dario Marret",
        "address": "Salinas",
        "mobile": "0993713942",
        "email": "javier_dario_marret@hotmail.com",
        "reference": "08as5efdwfawf324fq34",
        "description": "Descripción del pago a realizar",
        "amount": 10.00,
        "amountWithTax": 0,
        "amountWithoutTax": 10.00,
        "tax": 0,
        "notifyUrl": null,
        "gateway": "1"
    }, {
        headers: {
            'Authorization': 'Bearer 2y-13-tx-zsjtggeehkmygjbtsf-51z5-armmnw-ihbuspjufwubv4vxok6ery7wozao3wmggnxjgyg',
            'Content-Type': 'application/json'
        }
    })
    return data
}