
let localid = []
export function insertLocalidad(mapa) {
    Ver()
   
    const existe =  localid.some(iten => iten.path === mapa.path)
    if (existe) {
        console.log("existe",mapa,existe)
        const espacios = localid.map(iten => {
            if (iten.id === mapa.id) {              
                    iten.fill=mapa.fill
                    return iten; 

            } else {
                return iten 
            }
        })
        localid = [...espacios];
        localStorage.setItem("mapa", JSON.stringify(localid))
        let array = JSON.parse(localStorage.getItem("mapa"))
        return array
    } else {        
        let repetidos = localid.length>0? localid.filter(e=>e.id==mapa.id):[]
        if(repetidos.length>0){
            console.log("hay igual")
            let nuevo = repetidos.map(elem=>{
                elem.fill=mapa.fill
                return elem
            })
            localid = [...nuevo];
            localStorage.setItem("mapa", JSON.stringify([...localid, mapa]))
        }
        else
        console.log("no hay")
        localStorage.setItem("mapa", JSON.stringify([...localid, mapa]))
        let array = JSON.parse(localStorage.getItem("mapa"))
        return array
    }
}

function Ver() {
    try {
        let iten = JSON.parse(localStorage.getItem("mapa"));
        if (iten !== null) {
            localid = iten;
        }
    } catch (error) {
        console.log(error)
    }
}