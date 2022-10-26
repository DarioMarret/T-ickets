

export function insertLocalidad(mapa,datos) {
    let nuevo = mapa.map((e,i)=>{
        if (datos.id == e.id) {
            e.fill=datos.fill
            return e; 
        }
         else {
            return e 
        }
    })
    localStorage.mapa = JSON.stringify(nuevo)



}
export function getMapacolor(){
    try {
        let iten = JSON.parse(localStorage.getItem("mapa"));
       // console.log(iten)
        if (iten != null) {
         return   iten
        } else return []
    } catch (error) {
        console.log(error)
    }

}
export function getLocalidadmapa(){
    try{
        let item = JSON.parse(localStorage.getItem("localidad"))
        if (item != null) {
            return item
        }else return[]

    }catch(error){
        console.log(error)
    }
}
