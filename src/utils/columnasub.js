import { Chip } from "@mui/material"
import moment from "moment"
import { Badge } from "react-bootstrap"
let estado = {
    "reservado": "error",
    "NO": "No Generado",
    "SI":"Generado",
    "null": "Sin generar"
}
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

                    cell.row.original.detalle.map((g, i) => { return parseFloat(g.valor) }).reduce((a, b) => a + b, 0).toFixed(2)
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
export const ticketprocesoapro = [
    {
        accessorKey: "concierto",
        header: "Evento"
    },
    {
        accessorKey: "cedula",
        header: "Cédula"
    },

    {
        accessorKey: "valor",
        header: "Valor",
        Cell: ({ cell }) => (
            <div>
                {

                    cell.row.original.detalle.map((g, i) => { return parseFloat(g.valor) }).reduce((a, b) => a + b, 0).toFixed(2)
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
export const ticketsboletos = [
    {
        accessorKey: "sillas",
        header: "Boleto"
    },
    {
        accessorKey: "localidad",
        header: "Detalle",
        Cell: ({ cell }) => (
            <div>
                {
                    cell.row.original.concierto + " Localidad:" + cell.row.original.localidad
                }
            </div>
        ),
    },
    {
        accessorKey: "valor",
        header: "Valor"
    },
    {
        accessorKey: "fecha",
        header: "Fecha"
    },
    {
        accessorKey: "estado",
        header: "Estado"
    },
]
let color = {
    "ACTIVO": "success",
    "PROCESO": "secondary",
    null: "danger",
    "null": "danger",
    "SI":"success",
    "NO":"danger"
}

export const listaRegistro = [
    {
        accessorKey: "cedula",
        header: "Cedula"
    },
    {
        accessorKey: "fechaReporte",
        header: "Fecha"
    },
    {
        accessorKey: "pdf",
        header: "Ticket",
        Cell: ({ cell }) => (
            <div>
                <Badge bg={color[cell.row.original.pdf]}  >

                    {estado[cell.row.original.pdf]}</Badge>

            </div>
        ),
    },
    {
        accessorKey: "forma_pago",
        header: "Metodo"
    },
    {
        accessorKey: "estado_pago",
        header: "Estado"
    }
]