import { ListarLocalidad } from "utils/LocalidadesQuery/index.js"
import { AgregarAsiento } from "utils/CarritoLocalStorang"
import { asientosList, concierto, } from "utils/constantes"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"

export const Cargarsillas = (colornuevo) => {
    const user = getDatosUsuariosLocalStorag()
    return ListarLocalidad().then(ouput => {
        // console.log(colornuevo, user)
        colornuevo.map((f) => {
            if (ouput.data.find(ins => ins.id == f.id) != undefined) {
                if (JSON.parse(ouput.data.find(ins => ins.id == f.id).mesas_array).Typo == "fila") {
                    //console.log(JSON.parse(ouput.data.find(ind => ind.id == f.id).mesas_array))
                    JSON.parse(ouput.data.find(ind => ind.id == f.id).mesas_array).datos.map(filas => {
                        filas.asientos.filter(elm => elm.cedula == user.cedula).map(element => {
                            let listsillas = JSON.parse(sessionStorage.getItem(asientosList)) == null ? [] : JSON.parse(sessionStorage.getItem(asientosList))

                            if (listsillas.findIndex(el => el.seleccionmapa == f.localidad + "-" + element.silla) == -1) {
                                AgregarAsiento({
                                    "localidad": f.nombre,
                                    "localidaEspacio": f.localidaEspacio,
                                    "silla": element.silla,
                                    "fila": element.silla.split("-")[0],
                                    "estado": "seleccionado",
                                    "nombreConcierto": sessionStorage.getItem(concierto),
                                    "seleccionmapa": f.nombre + "-" + element.silla,
                                    "valor": f.precio_normal
                                })
                            }
                        });
                        //aqui eliminar
                    })
                }
                if (JSON.parse(ouput.data.find(ins => ins.id == f.id).mesas_array).Typo == "mesa") {
                    JSON.parse(ouput.data.find(ind => ind.id == f.id).mesas_array).datos.map(mesa => {
                        mesa.Mesas.map(e => {
                            e.asientos.filter(asi => asi.cedula == user.cedula).map(sele => {
                                let listsillas = JSON.parse(sessionStorage.getItem(asientosList)) == null ? [] : JSON.parse(sessionStorage.getItem(asientosList))
                                if (listsillas != null && listsillas.findIndex(el => el.seleccionmapa == f.localidad + "-" + sele.silla) == -1) {
                                    AgregarAsiento({
                                        "localidad": f.nombre,
                                        "localidaEspacio": f.localidaEspacio,
                                        "silla": sele.silla,
                                        "fila": sele.silla.split("-")[0],
                                        "estado": "seleccionado",
                                        "nombreConcierto": sessionStorage.getItem(concierto),
                                        "seleccionmapa": f.nombre + "-" + sele.silla,
                                        "valor": f.precio_normal
                                    })
                                }
                            })
                            //aqui eliminar
                        })
                    })

                }
                if (JSON.parse(ouput.data.find(ins => ins.id == f.id).mesas_array).Typo == "correlativo") {
                    if (!JSON.parse(ouput.data.find(ins => ins.id == f.id).mesas_array).datos["info"] != undefined) {
                        //    console.log(
                        //      JSON.parse(ouput.data.find(ins => ins.id == f.id).mesas_array).datos["info"].find(corr => corr.cedula == user.cedula))
                        //aqui info
                    }

                }
            }
        })
        let listsillas = JSON.parse(sessionStorage.getItem(asientosList))
        return listsillas != null ? JSON.parse(sessionStorage.getItem(asientosList)) : []

    }
    ).catch(exit => {
        console.log(exit)
        return exit
    })
}