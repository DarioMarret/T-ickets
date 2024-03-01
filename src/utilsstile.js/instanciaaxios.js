
import axios from "axios";
//let tocken = sessionStorage("")
export const InstanciaAxio=axios.create({
    baseURL:"https://api.ticketsecuador.ec/back_dev_tickets/",
    headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
        
    },
    timeout:1000
})
export const InstanciaGETAxios = axios.create({
    baseURL: "https://api.ticketsecuador.ec/back_dev_tickets/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ',

    },
    timeout: 1000
})
export const IVA = 0.12