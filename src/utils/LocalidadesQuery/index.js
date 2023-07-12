import axios from "axios";

export const GuardarLocalidad = async (parms) => {
    try{
        const { data } = await axios.post("https://api.t-ickets.com/ms_login/api/v1/guardar_localidad", parms, {
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
        const { data } = await axios.get("https://api.t-ickets.com/ms_login/api/v1/listar_localidades/" + parms, {
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