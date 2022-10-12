import React, { useMemo,useState, useEffect } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit,Delete } from '@mui/icons-material';
import { ListarLocalidad } from '../../../../../utils/Querypanel';
import { columnespacio } from 'utils/ColumnTabla';
import { EliminarLocalidad } from '../../../../../utils/Querypanel';
import { useSelector,useDispatch } from 'react-redux';
import { addLocalidad,deleteloclidad } from 'StoreRedux/Slice/SuscritorSlice';
const LocalidadesagreViews=(props)=>{
  let usedispatch=useDispatch()
    const{localidaname,show,SetDataloca,datalocalidad}=props
  //  console.log(localidaname)
  const [datas,setData]=useState([])
  async function ObtenLocalidad(){    
     try {
      const datos =await ListarLocalidad()
const {success,data}=datos

      if(success){
      const filtrado = data.filter(e => e.espacio == localidaname.nombre)
      console.log(filtrado)
      setData(filtrado)
     }
     
     } catch (error) {   
      console.log(error)
     }
  }
  async function Eliminar(parms){
    console.log(parms)
  
    try {
      const accion = await EliminarLocalidad(parms)
      const {success}=accion
      if(success){
       await ObtenLocalidad()
       alert("Localidad Eliminada")
      }
    } catch (error) {
      console.log(error)
      alert(error)
      
    }
  }
  function Editar(parms){
    let tipo = JSON.parse(parms.mesas_array)
    console.log(tipo.Typo)
    if(tipo.Typo=="fila"){
    SetDataloca({typo:'fila',
        nombre:parms.nombre,
        description:parms.descripcion,
        id:parms.id,
        array:tipo.datos})
  console.log(parms)
    $("#listas").removeClass("active")
   $("#filas").addClass("active")
   $('[href*="filas"]').addClass('active');
   $('[href*="listas"]').removeClass('active');   
  }else if(tipo.Typo=="mesa"){
    SetDataloca({typo:'mesa',
    nombre:parms.nombre,
    description:parms.descripcion,
    id:parms.id,
    array:tipo.datos})
console.log(parms)
$("#listas").removeClass("active")
$("#mesas").addClass("active")
$('[href*="mesas"]').addClass('active');
$('[href*="listas"]').removeClass('active');  

  }else if(tipo.Typo=="correlativo"){
    SetDataloca({typo:'correlativo',
    nombre:parms.nombre,
    description:parms.descripcion,
    id:parms.id,
    array:tipo.datos})
    $("#listas").removeClass("active")
$("#correlativos").addClass("active")
$('[href*="correlativos"]').addClass('active');
$('[href*="listas"]').removeClass('active');  

  }
  }

    useEffect(()=>{
      (async()=>{
        await ObtenLocalidad()
      })()
     


    },[datalocalidad])
    return(


    <div className="container-fluid">
     
 <MaterialReactTable
                    columns={columnespacio}
                    data={datas}
                   
                    muiTableProps={{
                      sx:{
                        tableLayout:'flex'
                      }
                    }}
                    initialState={
                      {
                        columnVisibility:{mesas_array:false}
                      }
                    }
                    muiTableBodyProps={{
                      sx:{ columnVisibility:{nombre:false}}
                    }}
                    renderDetailPanel={({row})=>(
                      <Box 
                      sx={{
                        display:'flex flex-column',
                        margin:'auto',
                        gridTemplateColumns:'1fr 1fr',
                        width:'100%',
                      }}
                      >
                        <Typography>Array Localidad :{ JSON.stringify(row.original.mesas_array)} </Typography>
                        
                        
                        

                      </Box>
                    )}
                   
                    enableRowActions
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex' }}>
                          <IconButton 
                          color="primary"  
                          onClick={()=>Editar(row.original)}
                          >
                            <Edit/>
                          </IconButton>
                          <IconButton  
                          color="error"
                          onClick={()=>Eliminar(row.original.id)}
                          >
                          <Delete/>
                          </IconButton>
                          
                        </Box>
                      )}
                    positionToolbarAlertBanner="bottom"
                   
                    localization={MRT_Localization_ES }
                    
                />
    </div>)

}

export default LocalidadesagreViews