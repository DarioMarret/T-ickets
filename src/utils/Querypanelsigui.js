import axios from "axios"
import { Host } from "./constantes"
export const ActualizaEstadoLocalidad= async(id,parms)=>{
    const {data} = await axios.put(Host+"actualizarevento_estado/"+id,parms,{
        header:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}