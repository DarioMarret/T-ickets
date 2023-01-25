import { Chip } from "@mui/material"
import moment from "moment"
import { Badge } from "react-bootstrap"
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
        accessorKey: "cedula",
        header: "Cedula",
        size: 50
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
        accessorKey: "forma_pago",
        header: "Metodo",
        size: 50
    },
    {
        accessorKey: "total_pago",
        header: "Total",
        Cell: ({ cell }) => (
            <div>
                {
                    parseFloat(quitacomision(cell.row.original)).toFixed(0)+".00"
                }
            </div>



        ),
        size: 50
    }
]

function quitacomision(row) {
    if ((new Date("2023-01-22 07:00:00 ") > new Date(row.fechaCreacion))) {
        let valor = parseFloat(row.total_pago) * 0.05
        let total = parseFloat(row.total_pago) - valor
        return Math.round(total) 
    }
    else {
        let valor = parseFloat(row.total_pago) * 0.07
        let total = parseFloat(row.total_pago) - valor
        return Math.round(total) 
    }

}
