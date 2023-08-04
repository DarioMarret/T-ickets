import axios from "axios"
import { data, post } from "jquery"
import { Host } from "./constantes"
import { clienteInfo, getDatosUsuariosLocalStorag } from "./DatosUsuarioLocalStorag"
//*api boletos
export const Listarticketporestado = async (parms) => {
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/ticket_usuario", {
            "cedula": parms
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        //console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}
//Compra/post_api_v1_liverar_asiento
export const Liverarasiento = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/liverar_asiento", {
            "id_ticket_usuarios": parms,
            ...parmspro
        }, {

        }, {

        })
        return data
    } catch (error) {
        return error
    }
}
//Ticket/get_ticket_admin
export const BoletosTiketsGlobal = async (parms) => {
    // console.log(parms)
    try {
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/ticket_admin",
            {
                "cedula": parms
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {
        return error
    }
}
//validar_existencia_asientos
export const GEnerarBoletos = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/validar_existencia_asientos",
            parmspro, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        }
        )
        return data
    } catch (error) {
        return error
    }
}
//post_api_v1_selecion_usuario
export const Seleccionaruserlista = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/selecion_usuario", {...parms,...parmspro}, {
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

//post_api_v1_actualisar_descripcion_evento
export const actualizarDescription = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/actualisar_descripcion_evento", {...parms,...parmspro}, {
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

//post_api_v1_actualisar_precio_localidad
export const actualizarPrecios = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/actualisar_precio_localidad", {...parms,...parmspro}, {
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

///api/v1/actualisar_descripcion_evento
export const Putdescriptionevent = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/actualisar_descripcion_evento",
            {...parms,...parmspro}, {
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
export const listar_beneficiariosocr = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ocr/api/v1/listar_beneficiarios",
            parms, {
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

export const actualizar_beneficiario = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ocr/api/v1/actualizar_beneficiario", {...parms,...parmspro}, {
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