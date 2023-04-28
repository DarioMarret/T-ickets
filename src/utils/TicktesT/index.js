import axios from "axios";

export const EliminarTickteTercero = async(parms)=>{
    try {
        let { data } = await axios.post("https://flash.t-ickets.com/ms_login/delt_link_external_tickets",parms,{
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