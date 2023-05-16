let items = "itmeslocalidad"
export const  Agregaitemsmap=(parms) =>{
    let mpaitems = JSON.parse( sessionStorage.getItem(items))
    if(parms==null){
        return
    }
    if(mpaitems!=undefined){ 
        if (mpaitems.filter(e => e.id == parms.id).length>0) {
            console.log(mpaitems.filter(e => e.id == parms.id))
            return
        }
        else{
            let datos = [...mpaitems,
             parms]
             sessionStorage.setItem(items,JSON.stringify([...datos]) )
        }
        return
    }else{
        sessionStorage.setItem(items, JSON.stringify([parms]))
        return
    }
}
export const GetlistPrecios= ()=>{
    let mpaitems = JSON.parse(sessionStorage.getItem(items))
    if (mpaitems == undefined) {
        return []
    }
    return mpaitems

}