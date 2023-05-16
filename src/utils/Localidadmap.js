
export function insertLocalidad(mapa, datos) {
    let item = JSON.parse(sessionStorage.getItem("itmeslocalidad"))
    let nuevo = mapa.map((e, i) => {
        if (datos.id == e.id) {
            e.fill = datos.fill
            //e.espacio = datos.espacio
            return e;
        }
        else {
            return e
        }
    })  
    let newitem = item.map((e,i)=>{ 
        if(datos.id== e.id)
        {
            e.fill = datos.fill
            
            //e.espacio = datos.espacio
            return e;
        }else{
            e
        }
    })

    sessionStorage.mapa = JSON.stringify(nuevo.filter(e => e.path != null))
    sessionStorage.itmeslocalidad = JSON.stringify(newitem)
}
export function getMapacolor() {
    try {
        let iten = JSON.parse(sessionStorage.getItem("mapa"));
        // console.log(iten)
        if (iten != null) {
            return iten
        } else return []
    } catch (error) {
        console.log(error)
    }
}
function localidaditmes(){
  

}
export function getLocalidadmapa() {
    try {
        let item = JSON.parse(sessionStorage.getItem("localidad"))
        if (item != null) {
            return item
        } else return []
    } catch (error) {
        console.log(error)
    }
}