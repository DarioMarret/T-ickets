import { Box, Typography, Chip } from '@mui/material';
import { Badge } from 'react-bootstrap';
import moment from "moment";
import 'moment-timezone'
import 'moment/locale/es';
require('moment/locale/es.js')
export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre',

  },
  {
    accessorKey: 'descripcion',
    header: 'Descripcion',
  }
];
export const columnespacio = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 10
  },
  {
    accessorKey: 'nombre',
    header: 'Nombre'
  },
  {
    accessorKey: 'descripcion',
    header: 'Decripción'
  }, {
    accessorKey: 'espacio',
    header: 'Espacio'
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo'
  },
  {
    accessorKey: 'mesas_array',
    header: 'Array',
    enableHiding: false
  },

]
export const Columnasubcrito = [
  {
    accessorKey: 'nombreCompleto',
    header: 'Nombre'
  },
  {
    accessorKey: 'cedula',
    header: 'Cédula',
    size: 100,
  }, {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'movil',
    header: 'Télefono',
  },
  {
    accessorKey: 'ciudad',
    header: 'Dirección',
  }, {
    accessorKey: 'enable',
    header: 'Estado',
    size: 100,
    Cell: ({ cell, column }) => (
      <Badge bg={cell.getValue() == 0 ? 'success' : 'danger'}>{cell.getValue() == 0 ? 'Habilitado' : 'Anulado'}</Badge>
    ),
  },

]
export const Columnusuarios = [
  {
    accessorKey: "id",
    header:"ID",
    size:100
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'perfil',
    header: 'Perfil',

  },
  {
    accessorKey: 'fecha_creacion',
    header: 'Fecha de Registro',
  },
]
let color = {
  "ACTIVO": "success",
  "PROCESO": "secondary",
  "CANCELADO": "danger",
  "EXPIRO": "warning"
}
export const columnPublicidad = [
  {
    accessorKey: 'encabezado',
    header: 'Encabezado',
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripcion',
  },
  {
    accessorKey: 'evento',
    header: 'Tipo',

    Cell: ({ cell, column }) => (
      cell.getValue() != null ? 'Evento' : 'Informativo'
    ),
  },
  {
    accessorKey: 'fecha_presentacion',
    header: 'Fecha expocision',
  },

]

export const Columnevento = [
  {
    accessorKey: 'fechaConcierto',
    header: 'Fecha',
    size: 50
  },
  {
    accessorKey: 'nombreConcierto',
    header: 'Evento',
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    Cell: ({ cell, column }) => (
      <Badge bg={new Date(cell.row.original.fechaConcierto + " 23:59:59") > new Date() ? color[cell.getValue()] : color["EXPIRO"]}  >

        {new Date(cell.row.original.fechaConcierto + " 23:59:59") > new Date() ? cell.getValue() : "FINALIZO"}</Badge>
    ),
  },
  {
    accessorKey: 'lugarConcierto',
    header: 'Lugar'
  },
   {
    accessorKey: 'horaConcierto',
    header: 'Hora',
    size: 50
  }
]
export const EventosporAprobar = [
  {
    accessorKey: 'nombre',
    header: 'Evento',
  },
  {
    accessorKey: 'cedula',
    header: 'Fecha ',

  },
  {
    accessorKey: 'fecha',
    header: 'Estado',
  },
]
export const columnsTicket = [

  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'cedula',
    header: 'Cédula',

  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
  },
]
export const ColumnaUsuarioid = [
  {
    accessorKey: "activity",
    header: "Actividad"
  },
  {
    accessorKey: "cantidad",
    header: "Cantidad"
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    size: 50,
    Cell: ({ cell, column }) => (
      <Chip label={cell.getValue() == 0 ? 'Habiliado' : 'Anulado'} color={cell.getValue() == 0 ? 'success' : 'error'} />

    ),
  },
]