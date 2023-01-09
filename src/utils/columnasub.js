import { Chip } from "@mui/material"
import moment from "moment"
import { Badge } from "react-bootstrap"
let estado = {
    "reservado": "error",
    "GENERAR":"Generar",
    "null":"Sin generar"
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
let color = {
    "ACTIVO": "success",
    "PROCESO": "secondary",
    null: "danger",
    "null": "danger"
}

export const listaRegistro=[
    {
        accessorKey: "cedula",
        header: "Cedula"
    },
    {
        accessorKey:"fechaReporte",
        header:"Fecha"
    },
    { accessorKey:"generar_pdf",
        header:"PDF" ,
        Cell: ({ cell }) => (
            <div>
                <Badge bg={color[cell.row.original.generar_pdf]}  >

                    {estado[cell.row.original.generar_pdf]}</Badge>

            </div>
        ),      
},
    {
        accessorKey:"forma_pago",
        header:"Metodo"
    },
    {
        accessorKey: "estado_pago",
        header: "Estado"
    }
]