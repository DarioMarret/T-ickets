import axios from "axios"
/**Crear nuevo usuario */
export const CrearUser = async (parms) => {
    const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/crear_user", parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Listar usuarios */
export const GetUserList = async () => {
    const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listas_user", {
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
    const { data } = await axios.put("https://api.t-ickets.com/ms_login/api/v1/actualizar_user/" + id, parms, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Eliminar Usuario por el is */
export const EliminaUser = async (id) => {
    const { data } = await axios.delete("https://api.t-ickets.com/ms_login/api/v1/eliminar/" + id, {
        headers: {
            'Content-Type': 'aplication/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}