import { Chip } from "@mui/material"
let estado = {
    "reservado": "error"
}
export const ticketproceso = [
    {
        accessorKey: "concierto",
        header: "Evento"
    },
    {
        accessorKey: "localidad",
        header: "localidad"
    },
    {
        accessorKey: "sillas",
        header: "Boletos",

        size: 50,
    },
    {
        accessorKey: "valor",
        header: "Valor",
        size: 50,

    },
    {
        accessorKey: "fechaCreacion",
        header: "Fecha",
    },
    {
        accessorKey: "estado",
        header: "Estado",
        Cell: ({ cell, column }) => (
            <Chip label={cell.getValue()} color={estado[cell.getValue()]} />

        ),
    },
]