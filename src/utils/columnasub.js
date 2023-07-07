import { Chip } from "@mui/material"
import moment from "moment"
import { Badge } from "react-bootstrap"
import { clienteInfo } from "./DatosUsuarioLocalStorag"
import { useDispatch } from "react-redux"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"
export const ticketproceso = [
    {
        accessorKey: "concierto",
        header: "Evento"
    },
    {
        accessorKey: "valor",
        header: "Valor",
        Cell: ({ cell }) => (
            <div>
                {
                    cell.row.original.detalle.map((g) => { return parseFloat(g.valor) }).reduce((a, b) => a + b, 0).toFixed(2)
                }
            </div>
        ),
        size: 50,
    },
    {
        accessorKey: "fechaCreacion",
        header: "Fecha",
    },
]
let estado = {
    "reservado": "Pendiente",
    "NO": "No Generado",
    "SI": "Generado",
    "null": "Sin generar",
    "Expirado": "Expirado"
}
let color = {
    "reservado": "warning",
    "ACTIVO": "success",
    "PROCESO": "secondary",
    "Pendiente": "warning",
    "Pagado": "success",
    null: "danger",
    "": "danger",
    "null": "danger",
    "SI": "success",
    "NO": "danger",
    "Expirado": "danger",
    "Consolidado": "success",
    "Sin Consolidar": "warning"
}
let estados = {
    null: "Sin Consolidar",
    "": "Sin Consolidar",
    "Consolidado": "Consolidado",
    "Sin Consolidar": "Sin Consolidar"
}
export const ticketprocesoapro = [
    {
        accessorKey: "concierto",
        header: "Evento",
        Cell: ({ cell }) => (
            <div>
                {cell.row.original.concierto + " localidad: " + cell.row.original.localidad}
            </div>
        )
    },
    {
        accessorKey: "cedula",
        header: "Cédula",
        size: 50
    },
    {
        accessorKey: "sillas",
        header: "Boleto #",
        Cell: ({ cell }) => (
            <div>
                {cell.row.original.sillas.padStart(10, 0)}
            </div>
        ),
        size: 23
    },
    {
        accessorKey: "valor",
        header: "Valor",
        size: 50,
    },
    {
        accessorKey: "fechaCreacion",
        header: "Fecha",
        size: 50
    },
    {
        accessorKey: "estado",
        header: "Estado",
        Cell: ({ cell }) => (
            <div>
                <Badge bg={color[cell.row.original.estado]}  >
                    {cell.row.original.estado}</Badge>
            </div>
        ),
    }

]

export const ticketsboletos = [
    {
        accessorKey: "concierto",
        header: "EVENTO",
        size: 50
    },
    {
        accessorKey: "cedula",
        header: "Cédula",
        size: 50
    },

    {
        accessorKey: "localidad",
        header: "localidad",

        size: 50
    },

    {
        accessorKey: "id_localidades_items",
        header: "Boleto",
        size: 30
    },


    {
        accessorKey: "estado",
        header: "Estado",
        Cell: ({ cell }) => (
            <div>
                <Badge bg={color[cell.row.original.estado]} >
                    {cell.row.original.estado}</Badge>
            </div>
        ),
        size: 50
    },
    {
        accessorKey: "canje",
        header: "Canjeado",
        size: 50
    },
    {
        accessorKey: "valor",
        header: "Valor",
        sixe: 15
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
        sixe: 50
    },
]
export const Consiliaregistro = [
    {
        accessorKey: "id",
        header: "ID",
        size: 50
    },
    {
        accessorKey: "comprobante",
        header: "#Comprobante",
        size: 50
    },
    {
        accessorKey: "cuenta",
        header: "Cuenta",
        size: 50
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
    },
    {
        accessorKey: "id_registro",
        header: "#Registro",
        size: 50,
    },
    {
        accessorKey: "imagen",
        header: "link",
        Cell: ({ cell }) => (
            <a className="btn btn-default btn-sm" href={cell.row.original.imagen} target="_blank">   <i className=" fa fa-check"> </i> </a>
        ),
        size: 50

    }, {
        accessorKey: "propietario",
        header: "Celuda",
        size: 50
    }
]
export const PreciosStore = () => {
    let datos = JSON.parse(sessionStorage.getItem("PreciosLocalidad"))
    if (datos != null) {
        return datos
    } else {
        return []
    }
}
function ListarPrecio(evento, localidad) {
    if (localidad == 9) {
        return precio[9]
    }
    if (localidad == 10) {
        return precio[10]
    }
    if (localidad == 11) {
        return precio[11]
    }
    if (localidad == 12) {
        return precio[12]
    }
    if (localidad == 13) {
        return precio[13]
    }
    if (localidad == 14) {
        return precio[14]
    }
    console.log(evento)
    return PreciosStore().filter(f => f.id == evento)[0].precio_normal
}

export const listaRegistro = [
    {
        accessorKey: "fechaCreacion",
        header: "Fecha",

    },
    {
        accessorKey: "estado_pago",
        header: "Estado",
        Cell: ({ cell }) => (
            <Badge bg={color[cell.row.original.estado_pago]}>
                {cell.row.original.estado_pago}</Badge>
        ),
        size: 50
    },


    {
        accessorKey: "cedula",
        header: "Cedula",
        size: 50
    },


    {
        accessorKey: "forma_pago",
        header: "Metodo",
        size: 50
    }
]

export const listartecero = [
    {
        accessorKey: "id",
        header: "Id",
        size:25
    },
    {
        accessorKey:"cedula",
        header:"Cédula",
        size:30
    },
    {
        accessorKey:"fecha",
        header:"Fecha",
        Cell: ({ cell }) => (
             moment(cell.row.original.fecha).format('L') 
        ),
    },
    {
        accessorKey:"observacion",
        header:"Observación"
    }
]

export const listaRegistrosuscri = [
    {
        accessorKey: "fechaCreacion",
        header: "Fecha",

    },
    {
        accessorKey: "estado_pago",
        header: "Estado",
        Cell: ({ cell }) => (
            <Badge bg={color[cell.row.original.estado_pago]}>
                {cell.row.original.estado_pago}</Badge>
        ),
        size: 50
    },


    {
        accessorKey: "cedula",
        header: "Cedula",
        size: 50
    },


    {
        accessorKey: "forma_pago",
        header: "Metodo",
        size: 50
    },
   
]
export const listaRegistrototal = [
    {
        accessorKey: "fechaReporte",
        header: "Fecha",
        size: 25
    },

    {
        accessorKey: "consolidado",
        header: "Consolidado",      
        size: 25
    },

    {
        accessorKey: "concierto",
        header: "Evento",
        size: 70
    },
    {
        accessorKey: "cedula",
        header: "Cedula",
        size: 50
    },
    {
        accessorKey: "forma_pago",
        header: "Metodo",
        Cell: ({ cell }) => {
            cell.row.original.forma_pago != "Tarjeta" ? cell.row.original.forma_pago : cell.row.original.link_pago == null ? "Sin link" : cell.row.original.forma_pago
        },
        size: 50
    }, {
        accessorKey: "estado_pago",
        header: "Estado",
        Cell: ({ cell }) => (
            <Badge bg={color[cell.row.original.estado_pago]}>
                {cell.row.original.estado_pago}</Badge>
        ),
        size: 50
    },
    {
        accessorKey: "total_pago",
        header: "Total",
        Cell: ({ cell }) => {
            { parseFloat(cell.row.original.total_pago).toFixed(2) }
        },
        size: 50
    },
    {
        accessorKey:"numerTransacion",
        header:"Comprobante",
        size:25
    },{
        accessorKey: "info_registro",
        header: "Tipo",
        Cell: ({ cell }) => (
            cell.row.original.info_registro.length == 0 ? "" : cell.row.original.info_registro[0].title + " " + cell.row.original.info_registro.length == 0 ? "" :  cell.row.original.info_registro[0].name
        ),
    }, 
    {
        accessorKey: "id_usuario",
        header: "user",
        Cell:({cell})=>(
            cell.row.original.info_registro.length == 0 ? "" :   cell.row.original.info_registro[0].title != "Suscriptor" ? cell.row.original.id_usuario : ""
        ),
        filterVariant: 'range',
        size:25
    }
]
let precio = {
    1: 20,
    2: 30,
    3: 40,
    4: 50,
    5: 80,
    9: 120,
    10: 65,
    11: 35,
    12: 120,
    13: 65,
    14: 35,
    22: 0,
    23: 0
}
let precioespacio = {
    9: 169,
    10: 171,
    11: 170,
    12: 174,
    13: 172,
    14: 173,
    15: 0,
    13: 0,
    22: 0,
    23: 0
}
//precioespacio[e.id_localidad]

function quitacomision(row) {
    // let tt = JSON.parse(row.info_concierto).map(e => { return parseFloat(precio[e.id_localidad] * parseFloat(e.cantidad) ) })
    // console.log(tt)
    let valores = JSON.parse(row.info_concierto).map(e => { return ListarPrecio(e.idespaciolocalida, e.id_localidad) * parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
    if ((new Date("2023-01-21 14:00:00 ") > new Date(row.fechaCreacion))) {
        let valor = parseFloat(valores) * 1.05
        return Math.round(valores)
    }
    else {
        // console.log(row.total_pago)
        let valor = parseFloat(valores) * 1.07
        return Math.round(valores)
    }

}
function cantidad(row) {
    let tt = JSON.parse(row.info_concierto).map(e => { return parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
    return tt
}


