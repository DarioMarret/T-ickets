import axios from "axios"
import { Host } from "./constantes"

export const GetSuscritores = async ()=>{    
    const { data } = await axios.get(Host+"api/v1/listas_suscriptor", {
        headers: {
          'Content-Type': 'application/json',
                  'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
      })
      return data    
}
export const GetUserList= async()=>{
    const {data}= await axios.get(Host+"api/v1/listas_user",{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ==' 
        }
    })
    return data;
}
export const GetRoles =async()=>{
    
    const {data} = await axios.get(Host+"api/v1/listar_roles",{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    

    return data
}
export const EditUser =async(id,parms)=>{
    const {data} = await axios.put(Host+"api/v1/actualizar_user/"+id,parms,{ 
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
export const CrearUser =async (parms)=>{
    const {data} = await axios.post(Host+"api/v1/crear_user",parms,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='            
        }
    })
    return data
}