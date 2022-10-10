import React, { useMemo,useState, useEffect } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit,Delete } from '@mui/icons-material';
import { ListarLocalidad } from '../../../../../utils/Querypanel';
import { columnespacio } from 'utils/ColumnTabla';
const LocalidadesagreViews=(props)=>{
    const{localidaname,show}=props
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

    useEffect(()=>{
      (async()=>{
        await ObtenLocalidad()
      })()
     


    },[show])
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
                          >
                            <Edit/>
                          </IconButton>
                          <IconButton  
                          color="error"
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