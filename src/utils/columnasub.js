import { Chip } from "@mui/material"
import moment from "moment"
import { Badge } from "react-bootstrap"
import { clienteInfo } from "./DatosUsuarioLocalStorag"
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
    "null": "danger",
    "SI": "success",
    "NO": "danger",
    "Expirado": "danger",


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
        accessorKey: "sillas",
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
    },
    {
        accessorKey: "total_pago",
        header: "Total boletos",
        Cell: ({ cell }) => (
            <div>
                {
                    !clienteInfo() ? parseFloat(cantidad(cell.row.original)) : parseFloat(quitacomision(cell.row.original)).toFixed(0) + ".00"
                }
            </div>



        ),
        size: 50
    }
]
export const listaRegistrototal = [
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
        size: 50
    },
    {
        accessorKey:"Valortotal",
        header:"Total",
        Cell:({cell})=>{
            { parseFloat(cell.row.original.Valortotal).toFixed(2) }
        },
        size:50
    },
    {
        accessorKey: "cantidad",
        header:"Cantidad",
        size:25
    },
    

]


let precio = {
    1: 21,
    2: 31,
    3: 41.5,
    4: 51.5,
    5: 82,
    9: 122,
    10: 67,
    11: 36,
    12: 122,
    13: 67,
    14: 36,
}
let precioespacio = {
    9: 169,
    10: 171,
    11: 170,
    12: 174,
    13: 172,
    14: 173,
}
//precioespacio[e.id_localidad]

function quitacomision(row) {
    // let tt = JSON.parse(row.info_concierto).map(e => { return parseFloat(precio[e.id_localidad] * parseFloat(e.cantidad) ) })
    // console.log(tt)
    let valores = JSON.parse(row.info_concierto).map(e => { return parseFloat(precio[e.id_localidad]) * parseFloat(e.cantidad) }).reduce((a, b) => a + b, 0)
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


