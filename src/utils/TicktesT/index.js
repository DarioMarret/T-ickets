import axios from "axios";

export const EliminarTickteTercero = async(parms)=>{
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        ...parms,
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    try {
        let { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/delt_link_external_tickets",{...parms,...parmspro},{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    } catch (error) {
        return error
    }
}