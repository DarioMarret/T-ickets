import { Chip } from "@mui/material"
import moment from "moment"
let estado = {
    "reservado": "error"
}
export const ticketproceso = [
    {
        accessorKey: "concierto",
        header: "Evento"
    },
    
   
    {
        accessorKey: "valor",
        header: "Valor",
        Cell: ({ cell}) => (
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