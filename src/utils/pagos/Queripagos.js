import axios from "axios";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { Host } from "utils/constantes";


export const registraPagos = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id    
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(id),
        "id_operador": parseInt(idop)
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/registraPagos ", parmspro, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const listarRegistropanel = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/listarRegistros", parms, {
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
export const ListarRegistropaneFecha = async (ini, fin) => {
    console.log(fin, ini)
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/listarRegistros?fecha_init="+ini+"&fecha_fin="+fin+"",
            {
                "cedula": ""
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
export const listarRegistropanelComprobar = async (parms, estado) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/listarRegistros?estado=Expirado?estado=" + estado, parms, {
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
export const listarRegistroEvento = async (ini, fin, parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login//api/v1/listarRegistros?init=" + ini + "&size=" + fin + "", parms, {
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
export const generarBoleto = async () => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id    
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/generarBoleto", parmspro, {
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
export const eliminarRegistro = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/eliminarRegistro",
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
export const eliminartiket = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_ticket_usuarios": parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/eliminarTicketrepetido",
            {
               ...parmspro
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
export const cambiarMetodo = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id    
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/cambiandoMetodoPago", parmspro, {
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
export const Comprobanteocr = async (parms) => {
    try {
        let { data } = await axios.post("")
        return data
    } catch (error) {
        return error
    }
}
export const ConsolidarReporte = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/ConsolidarCompra", parmspro, {
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
export const Consiliarcompra = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/Conciliacion", {...parms,...parmspro}, {
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
export const ActualizaConciliacion = async (parms, id) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    console.log(id)
    try {
        let { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/api/v1/Conciliacion/" + id, {...parms,...parmspro}, {
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
export const ComentarioRegistro = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/Comentario_registro", parms, {
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
export const updateRegistro = async (parms, id) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        let { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/api/v1/Comentario_registro/" + id, {...parms,...parmspro}, {
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
export const BuscarTransacion = async (parms) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/BuscarNumeroTransaccion", { ...parms, ...parmspro }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data;
    } catch (error) {
        return error
    }
}
export const ActualizarnumeroTransacion = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/ActualizarNumeroTransaccion", parmspro, {
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
export const EstadosCosolidados = async () => {
    try {
        let { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/estados_consolidados",
            {
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
export const infoTarjeta = async (parms) => {
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/info_tarjeta", parms,
            {
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
export const infoabimedia = async (parms) => {
    try {
        let { data } = await axios.get("https://cloud.abitmedia.com/api/payments/status-transaction?access-token=2y-13-gi8r0tx2uwfjj4inqxfc2oyyivnx9wuz1-mt3n2ownqitrb6isc8elfmmdz7rirsh7z94xf2-&token=" + parms)
        return data
    } catch (error) {
        return error
    }
}