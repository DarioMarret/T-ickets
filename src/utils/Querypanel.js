import axios from "axios"
import { Host } from "./constantes"

/**Listar Suscritorea */
export const GetSuscritores = async ()=>{    
    const { data } = await axios.get(Host+"api/v1/listas_suscriptor", {
        headers: {
          'Content-Type': 'application/json',
                  'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
      })
      return data    
}
/**Listar Usuarios */
export const GetUserList= async()=>{
    const {data}= await axios.get(Host+"api/v1/listas_user",{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ==' 
        }
    })
    return data;
}
/**Listar Roles */
export const GetRoles =async()=>{
    const {data} = await axios.get(Host+"api/v1/listar_roles",{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })   
    return data
}
/** Editar Usuarios */
export const EditUser =async(id,parms)=>{
    const {data} = await axios.put(Host+"api/v1/actualizar_user/"+id,parms,{ 
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
        }
    })
    return data
}
/**Crear nuevo usuario */
export const CrearUser =async (parms)=>{
    const {data} = await axios.post(Host+"api/v1/crear_user",parms,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='            
        }
    })
    return data
}
/**Eliminar Usuario */
export const EliminaUser = async(id)=>{
    const {data} =await axios.delete(Host+"api/v1/eliminar/"+id,{
        headers:{
            'Content-Type':'aplication/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ==' 
        }
    })
    return data
}
/**Login de usuario */
export const Loginadmin=async(parms)=>{
    const {data}= await axios.post(Host+"api/v1/auth_admin",parms,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='   
        }
    })
    return data
}

/**Editar subscritores */
export const EditarSuscrito=async(id,parms)=>{
    const {data}=await axios.put(Host+"api/v1/actualizar_suscriptor/"+id,parms,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='  
        }
    })
    console.log(parms,data)
    return data
}
/**
 * * Eliminar suscritor especifico
 */
export const EliminarSuscrito =async(id)=>{
    const {data} = await axios.delete(Host+"api/v1/eliminar_suscriptor/"+id,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='  
        }
    })
    return data

}
/**
 * Crear nuevo suscritor
 */
export const CrearSuscritor= async(parms)=>{
   // console.log(parms)
    const {data}= await axios.post(Host+"api/v1/crear_suscriptor",parms,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='  
        }
    })
   // console.log(data)
    return data
}
export const CancelarSubscriptor= async(id)=>{
    //console.log("query",id)   
    const {data} = await axios.put(Host+"api/v1/cancelation_suscriptor/"+id,{ 
        headers:{            
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                              
         }
    })
  //console.log("query",data)
    return data
}
export const ListarTikets=async()=>{
    const {data} =await axios.get("https://rec.netbot.ec/pdfqr/api/v1/szchat/listar/")
    return data
}
export const ListarConcierto =async(parms)=>{
    const {data}= await axios.post(Host+"api/v1/filtrar_concierto",parms,{
        headers:{            
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                              
         }   
    })
    return data
}

export const GuardarEspacio = async(parms)=>{
    const {data}=await axios.post(Host+"api/v1/gusdar_espacio",parms,{
        headers:{            
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                              
         }
    })
    return data
}

export const ListarEspacios = async ()=>{
    const {data}=await axios.get(Host+"api/v1/listar_espacios",{
        headers:{            
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                              
         }
    })
    return data
}
/** Verificar error 500 internal server error */
export const EliminarEspacios = async (parms)=>{
    const {data}= await axios.delete(Host+"api/v1/eliminar_espacio",{
        'id':""+parms
    },{
        headers:{            
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                              
         }
    })
    return data
}
export const ActualizarEspacio = async (parms)=>{
    const {data}= await axios.put(Host+"api/v1/actualizar_espacio",parms,{
        headers:{            
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                              
         }
    })
    return data
}
/** Error 500 */
export const GuardarLocalidad = async (parms)=>{
    console.log(parms)
    const {data}= await axios.post(Host+"api/v1/guardar_localidad",parms,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                        

        }
    })
    return data
}
export const ListarLocalidad  = async ()=>{
    const {data} = await axios.get(Host+"api/v1/listar_localidades",{
        header:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                        
        }
    })
    return data
}
export const AptualizarLocalida = async(parms)=>{
    const {data}= await axios.put(Host+"api/v1/listar_localidades",parms,{
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                        
        }
    })
    return data
}
export const EliminarLocalidad = async(parms)=>{
    const {data}= await axios.delete(Host+"api/v1/eliminar_localidad",parms,{
        headers:{
            '':'',
        }
    })
    return data
}
/** Error500 */
export const FiltrarConcierto = async(parms)=>{
    const {data}= await axios.post(Host+"api/v1/filtrar_concierto",{"nombreconcert":parms},{
        headers:{            
            'Content-Type':'application/json',
            'Authorization':'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='      
                              
         }
    })
    return data
}