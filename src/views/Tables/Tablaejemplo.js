import React, { useMemo,useState, useEffect } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import DataTable from 'react-data-table-component';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Edit,Delete } from '@mui/icons-material';
import { ListarTikets } from 'utils/Querypanel';
import {Row,Container}from 'react-bootstrap'
import CustomMaterialPagination from './CustomMaterialPagination';


const TablasEjemplos = () => {
    let valores=[]
    const [data, setdata] = useState([])
    const columns = useMemo(
     ()=>[
        {
            accessorKey: 'id',
            header: '',
            enableHiding:false,
            
        },
        {
            accessorKey: 'nombre',
            header: 'Nombre',
            muiTableHeadCellProps: ({ column }) => ({
                sx: {
                    hidden: true,
                },
              }),
        },
        {
            accessorKey: 'cedula',
            header: 'Cédula',
            muiTableBodyCellProps:({cell})=>({
              onClick:()=>{
                  console.log(cell.getIsVisible)
              },
            })
            ,Cell:({cell})=>{
             
            }
        },
        {
            accessorKey: 'fecha',
            header: 'Company',
            
        },
        {
            accessorKey: 'ciudad',
            header: 'Ciudad',
            
        },
        {
            accessorKey: 'concierto',
            header: 'Concierto',
            enableHiding:false,
        },
        {
            accessorKey: 'protocolo',
            header: 'Protocolo',
            enableHiding:false,
        },
        {
            accessorKey: 'link',
            header: 'Link',
            enableHiding:false,

        },
        {
            accessorKey: 'qr',
            header: 'codigo QR',
            enableHiding:false,
        },
    ] ,
    [],)
    const columnsdos = [
        {
            name: 'id',
            selector: row=>row.id,
           
        },
        {
            name: 'nombre',
            selector: row=>row.nombre,
        },
        {
            name: 'cedula',
            selector: row=>row.cedula,
           
        },
        {
            name: 'fecha',
            selector: row=>row.fecha,
            
        },
        {
            name: 'ciudad',
            selector: row=>row.ciudad,
            hide: 'md',
        },
        {
            name: 'concierto',
            selector: row=>row.concierto,
            hide: 'md',
            
        },
        {
            name: 'protocolo',
            selector: row=>row.protocolo,
            hide: 'md',
        },
        {
            name: 'link',
            selector: row=>row.link,
            sortable: true,

        },
        {
            name: 'qr',
            selector: row=>row.qr,
            sortable: true,
        },
    ];
    async function ConsultarTikets() {
        try {
           /* const Datos = await ListarTikets()
            const infor = Datos.data.map((e, i) => {
                return {
                    id: e.id,
                    nombre: e.nombre,
                    cedula: e.cedula,
                    celular: e.celular,
                    fecha: e.actual,
                    ciudad: e.cuidadconcert,
                    concierto: e.nombreconcert,
                    protocolo: e.protocol,
                    link: e.link,
                    qr: e.qr,

                };
            })
            setdata(infor)*/
        } catch (error) {
            console.log(error)

        }

    }
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    const handleExportRows = ( filas ) => {       
       // exportador csv . generarCsv ( filas . mapa ( ( fila ) => fila . original ) ) ; 
      };
    
    
      const handleExportData = () => {
        csvExporter.generateCsv(data);
      };
    
   
    useEffect(() => {
        (async () => {
            await ConsultarTikets()
            
        })()
        
           
       

    }, [])
    $(document).ready(function () {
            $('#example').DataTable();
        })
    return (
        <div>
         <Container fluid>
            <Row>
            <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Suscritos
                            </div>
                            <div className="table-responsive">
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableRowSelection
                    muiTableProps={{
                      sx:{
                        tableLayout:'flex'
                      }
                    }}
                    initialState={
                      {
                        columnVisibility:{id:false,ciudad:false,concierto:false,protocol:false,link:false,qr:false}
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
                        {console.log(row)}
                        <Typography>ciudad : {row.original.ciudad } </Typography>
                        <Typography>Concierto : {row.original.concierto} </Typography>
                        <Typography>Protocolo : {row.original.protocolo} </Typography>                        
                        <Typography>link : {row.original.link} </Typography>
                        <Typography>QR : {row.original.qr} </Typography>
                        

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
                    displayColumnDefOptions={{
                        'mrt-row-numbers': {
                          enableHiding: true, //now row numbers are hidable too
                        },
                      }}
                    renderTopToolbarCustomActions={({ table }) => (
                        <Box
                        sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                      >
                        <Button
                          color="primary"
                          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                          onClick={handleExportData}
                          startIcon={<FileDownloadIcon />}
                          
                        >
                          Export Todos los Datos
                        </Button>
                        <Button
                          disabled={table.getPrePaginationRowModel().rows.length === 0}
                          //export all rows, including from the next page, (still respects filtering and sorting)
                          onClick={() =>
                            handleExportRows()
                          }
                          startIcon={<FileDownloadIcon />}
                          
                        >
                          Export Todas las filas
                        </Button>
                        <Button
                          disabled={table.getRowModel().rows.length === 0}
                          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                          onClick={() => handleExportRows()}
                          startIcon={<FileDownloadIcon />}
                          
                        >
                          Export Filas de página
                        </Button>
                        <Button
                          disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                          }
                          //only export selected rows
                          onClick={() => handleExportRows()}
                          startIcon={<FileDownloadIcon />}
                          
                        >
                          Export Fila Seleccionada
                        </Button>
                      </Box>
                    )}
                    localization={MRT_Localization_ES }
                    
                />
                </div>
              </div>
                </Row>
            <Row>
            <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Suscritos
                            </div>
                            <div className="card-body table-responsive">
                           { /*<DataTable
                            columns={columnsdos}
                            data={data}
                            pagination 
                            paginationComponentOptions={CustomMaterialPagination} 
                            />*/}
                            <table id="example" className="display" >
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Office</th>
                <th>Age</th>
                <th>Start date</th>
                <th>Salary</th>
            </tr>
        </thead>
        <tbody>
            {/*data.length>0? data.map((e,i)=>{
                                    return(
                                        
                                      <tr key={e.id+""+i}>
                                      <td >{e.nombre}</td>
                                      <td>{e.cedula}</td>
                                      <td>{e.ciudad}</td>
                                      <td>{e.link} </td>
                                      <td>{e.qr} </td>
                                      
                                        
                                 </tr>

                                    )
                                  }):''*/}
        </tbody>
       
    </table>
                 </div>
              </div>
            </Row>
            </Container>
        </div>
    );

}

export default TablasEjemplos