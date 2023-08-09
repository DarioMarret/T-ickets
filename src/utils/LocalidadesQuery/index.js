import axios from "axios";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";

export const GuardarLocalidad = async (parms) => {
    let id = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    //                                      getDatosUsuariosLocalStorag
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(id),
    }
    try{
        const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/guardar_localidad", {...parms,...parmspro}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='


            }
        })
        return data
    }catch(err){
        return err
    }
   
}
export const ListarLocalidad = async (parms) => {
    try{
        const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/listar_localidades/" + parms, {
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data
    }catch(err){
        return err
    }
  
}