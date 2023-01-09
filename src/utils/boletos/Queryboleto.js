import axios from "axios";
import { Host } from "utils/constantes";

export const generarBoleto = async (parms)=>{
    try {
        let {data}= await axios.post(Host+"/api/v1/generaboleto"+parms,{
            Headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
            }
        })
        return data        
    } catch (error) {
        return error
    }
}