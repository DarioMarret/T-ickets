import { Box, Typography,Chip } from '@mui/material';
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
      size:100,
      Cell: ({ cell, column }) => (
        <Chip label={cell.getValue()==0?'Habiliado':'Anulado'} color={cell.getValue()==0?'success':'error'}/>
      
      ),
    },

  ]
  export const Columnusuarios=[
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
      accessorKey:'fecha_creacion',
      header:'Fecha de Registro',
    },
  ]
  export const Columnevento=[
    
    { 
    accessorKey:'nombreConcierto',
    header:'Evento',  
  },
  {
    accessorKey:'lugarConcierto',
    header:'Lugar'
  },
  {
  accessorKey:'fechaConcierto',
  header:'Fecha',
    size:50
  },{
    accessorKey:'horaConcierto',
    header:'Hora',
    size:50
  }
  ]
  export  const columnsTicket = [
      
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
       {
           accessorKey: 'ciudad',
           header: 'Ciudad',      
       },       
   ]
   //cantidad fecha description estado
   export const ColumnaUsuarioid=[
    {
      accessorKey: "activity",
      header:"Actividad"
    },
    { 
      accessorKey:"cantidad",
      header:"Cantidad"
    },
    {
      accessorKey:"fecha",
      header:"Fecha",
    },
    {
      accessorKey:"description",
      header:"Description",
    },
    {
      accessorKey:"estado",
      header:"Estado",
      size:50,
      Cell: ({ cell, column }) => (
        <Chip label={cell.getValue()==0?'Habiliado':'Anulado'} color={cell.getValue()==0?'success':'error'}/>
      
      ),
    },
   ]