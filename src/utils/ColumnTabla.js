import { Box, Typography } from '@mui/material';
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
  export const columnespacio=[
    {
      accessorKey: 'id',
      header: 'ID',      
      size:10
    },
    { accessorKey:'nombre',
    header:'Nombre'
  },
  {
    accessorKey:'descripcion',
    header:'Decripción'
  },{
    accessorKey:'espacio',
    header:'Espacio'
  },
{
    accessorKey:'tipo',
    header:'Tipo'
  },
  {
  accessorKey:'mesas_array',
  header:'Array',
  enableHiding:false
  },

  ]
  export const Columnasubcrito=[
    {
      accessorKey: 'id',
      header: 'ID',      
      enableHiding:false
    },
    { accessorKey:'nombreCompleto',
    header:'Nombre'
  },
  {
    accessorKey:'cedula',
    header:'Cédula'
  },{
    accessorKey:'email',
    header:'Email'
  },
  {
  accessorKey:'movil',
  header:'Télefono',
  },
  {
    accessorKey:'ciudad',
    header:'Dirección',
    },{
      accessorKey:'enable',
      header:'Estado',
      Cell: ({ cell, column }) => (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
          sx={{
            backgroundColor: cell.getValue()==0?'green':'red' ,
          }}
        >
          {cell.getValue()==0?'Habiliado':'Anulado'}
        </Box>
      ),
    },

  ]
  export const columnusuarios=[
    {
      accessorKey: 'id',
      header: 'ID',      
      enableHiding:false
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
    ,
    {
      accessorKey: 'perfil',
      header: 'Perfil',

    },{
      accessorKey:'fecha_creacion',
      header:'Fecha de Registro'
    },{
      accessorKey:'password',
      header:'Fecha '
    }
  ]