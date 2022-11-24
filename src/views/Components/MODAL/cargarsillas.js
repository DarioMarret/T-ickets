import { ListarLocalidad } from "utils/Querypanel"
import { AgregarAsiento } from "utils/CarritoLocalStorang"
import { useDispatch, useSelector } from "react-redux"
import { asientosList, concierto, Eventolocalidad } from "utils/constantes"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
export const Cargarsillas = (colornuevo) => {
    let usedispatch = useDispatch()
    const user = getDatosUsuariosLocalStorag()
    ListarLocalidad().then(ouput => {
        colornuevo.map((f) => {
            if (ouput.data.find(ins => ins.id == f.idcolor) != undefined) {
                if (JSON.parse(ouput.data.find(ins => ins.id == f.idcolor).mesas_array).Typo == "fila") {
                    JSON.parse(ouput.data.find(ind => ind.id == idcolor).mesas_array).datos.map((elm) => {
                        elm.asientos.filter(elm => elm.cedula == user.cedula).map(element => {
                            let listsillas = JSON.parse(sessionStorage.getItem(asientosList))
                            if (listsillas.findIndex(el => el.seleccionmapa == f.localodad + "" + element.silla) != -1) {
                                AgregarAsiento({
                                    "localidad": f.localodad,
                                    "localidaEspacio": f,
                                    "silla": element.silla,
                                    "fila": element.silla.split("-")[0],
                                    "estado": element.estado,
                                    "nombreConcierto": sessionStorage.getItem(concierto),
                                    "seleccionmapa": f.localodad + "" + element.silla,
                                    "valor": f.precio_normal
                                })
                            }
                        });
                    })
                } if (JSON.parse(ouput.data.find(ins => ins.id == f.idcolor).mesas_array).Typo == "mesa") {
                    JSON.parse(ouput.data.find(ins => ins.id == f.idcolor).mesas_array).datos.map((elm) => {
                        elm.Mesas.map(e => {
                            e.asientos.filter(asi => asi.cedula == user.cedula).map(sele => {
                                let listsillas = JSON.parse(sessionStorage.getItem(asientosList))
                                if (listsillas.findIndex(el => el.seleccionmapa == f.localodad + "" + sele.silla) != -1) {
                                    AgregarAsiento({
                                        "localidad": f.localodad,
                                        "localidaEspacio": f,
                                        "silla": sele.silla,
                                        "fila": sele.silla.split("-")[0],
                                        "estado": sele.estado,
                                        "nombreConcierto": sessionStorage.getItem(concierto),
                                        "seleccionmapa": f.localodad + "" + sele.silla,
                                        "valor": f.precio_normal
                                    })
                                }
                            })
                        })
                    })

                }
            }
        })
        //let listsillas = JSON.parse(sessionStorage.getItem(asientosList))

    }
    ).catch(exit => console.log(exit))
}