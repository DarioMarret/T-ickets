import axios from "axios"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { clienteInfo } from "utils/DatosUsuarioLocalStorag"
/**Crear nuevo usuario */
export const CrearUser = async (parms) => {
    const { data } = await axios.post("https://api.ticketsecuador.ec/ms_login/api/v1/crear_user", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Listar usuarios */
export const GetUserList = async () => {
    const { data } = await axios.get("https://api.ticketsecuador.ec/ms_login/api/v1/listas_user", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data;
}
/**Editar User
 * @id id de usuario a editar
 * @parms campos a editar
 */
export const EditUser = async (id, parms) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    const { data } = await axios.put("https://api.ticketsecuador.ec/ms_login/api/v1/actualizar_user/" + id, {...parms,...parmspro}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Eliminar Usuario por el is */
export const EliminaUser = async (id) => {
    let ids = clienteInfo() != null ? clienteInfo().id : 0
    let idop = clienteInfo() != null ? 0 : getDatosUsuariosLocalStorag().id
    let parmspro = {
        "id_usuario": parseInt(idop),
        "id_operador": parseInt(ids),
    }
    const { data } = await axios.delete("https://api.ticketsecuador.ec/ms_login/api/v1/eliminar/" + id,parmspro,{
        headers: {
            'Content-Type': 'aplication/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}