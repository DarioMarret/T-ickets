import axios from "axios";
import { Host } from "utils/constantes";


export const registraPagos = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/registraPagos ", parms, {
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
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/listarRegistros", parms, {
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
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/generarBoleto", parms, {
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
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/eliminarRegistro",
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
export const eliminartiket = async (parms) => {

    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/eliminarTicketrepetido",
            {
                "id_ticket_usuarios": parms
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
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/cambiandoMetodoPago", parms, {
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
export const ConsolidarReporte = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/ConsolidarCompra", parms, {
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
export const BuscarTransacion = async (parms) => {
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/BuscarNumeroTransaccion", parms, {
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
    try {
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/ActualizarNumeroTransaccion", parms, {
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
        let { data } = await axios.get("https://rec.netbot.ec/ms_login/api/v1/estados_consolidados",
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
        let { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/info_tarjeta", parms,
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