
import axios from "axios";
let tocken = sessionStorage.getItem("SeccionToken")
let tockendos = "j!-2XiKj/!uj7QKKgh2hSNXM5PqEIlRl9Djaca0?ORN5LuduPw/GAOBrWYDBQkUu6JiwezgyGbgX3pRvUhCV75ZyklHx8-d8O!cipZX/vTdvjJFmFZ5luvsRU3E3K=oYmPQZBBqZKGnC2s6bPKPbd27oxD2Htg=upG0srxj8KS10BbXMW0Hw2rZDg2k!!4RHLL6bBDvv2dYtkD4GM0o9xHcR=lo=fFLSDRsau87yAy5g0/MHJKB6kZZRWb4u=g0w"
export const InstanciaAxio = axios.create({
    baseURL: "https://rec.netbot.ec/back_dev_tickets/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tocken,

    },
    validateStatus:function(status){
        return status>=200&&status<500
    }
})
export const InstanciaGETAxios = axios.create({
    baseURL: "https://rec.netbot.ec/back_dev_tickets/",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + tockendos,

    }
})