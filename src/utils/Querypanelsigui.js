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
export const cargarEventoActivo = async ()=>{
    try {
        const {data} = await axios.get(Host+"listareventos/ACTIVO",{
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        if(data.data==0)return null
        return data.data    
    } catch (error) {
        return error
        
    }
    
}