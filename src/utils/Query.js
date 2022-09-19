import axios from "axios"
import qs from "qs";


export const GenerarLinkPagoMedios = async () => {

    // var data = qs.stringify({
    //     'companyType': 'Persona Natural',
    //     'document': '0927177345',
    //     'documentType': '01',
    //     'fullName': 'Dario Marret',
    //     'address': 'Salinas',
    //     'mobile': '0993713942',
    //     'email': 'javier_dario_marret@hotmail.com',
    //     'reference': '08as5efdwfawf324fq34',
    //     'description': 'Descripción del pago a realizar',
    //     'amount': '1',
    //     'amountWithTax': '0',
    //     'amountWithoutTax': '1',
    //     'tax': '0',
    //     'gateway': '3'
    // });
    const { data } = await axios.post("https://cloud.abitmedia.com/api/payments/create-payment-request", {
        'companyType': 'Persona Natural',
        'document': '0927177345',
        'documentType': '01',
        'fullName': 'Dario Marret',
        'address': 'Salinas',
        'mobile': '0993713942',
        'email': 'javier_dario_marret@hotmail.com',
        'reference': '08as5efdwfawf324fw34',
        'description': 'Descripción del pago a realizar',
        'amount': '1',
        'amountWithTax': '0',
        'amountWithoutTax': '1',
        'tax': '0',
        'gateway': '3'
    }, {
        headers: {
            'Authorization': 'Bearer 2y-13-tx-zsjtggeehkmygjbtsf-51z5-armmnw-ihbuspjufwubv4vxok6ery7wozao3wmggnxjgyg',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return data
}