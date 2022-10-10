import React, { useMemo,useState, useEffect } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import DataTable from 'react-data-table-component';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Edit,Delete } from '@mui/icons-material';
import {Row,Container}from 'react-bootstrap'
import { ListarTikets ,FiltrarConcierto} from "utils/Querypanel";
import { ExportToCsv } from 'export-to-csv';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
const EventosViews =()=>{
    const [TiktesList,setTikes]=useState([])
    const [DatosGlobal,setDatosGloabl]=useState([])
    const [Evento,setEvento]=useState([])
    const [slidetitem,SetSlidet]=useState([])
        async function ConsultarTikets(){
            try {
                const Datos = await ListarTikets()
                const infor = Datos.data.map((e,i)=>{
                    return {
                        id: e.id,
                        nombre: e.nombre,
                        cedula: e.cedula,
                        celular:e.celular,
                        fecha:e.actual,
                        ciudad: e.cuidadconcert,
                        concierto: e.nombreconcert,
                        protocolo:e.protocol,
                        link:e.link,
                        qr:e.qr,
                       
                      };
                })
                setDatosGloabl(infor)
                const Filtrar = Datos.data.map((e,i)=>{
                  return {nombre:e.nombreconcert,ciudad:e.cuidadconcert,fecha:e.actual}
                })
                const ids = Filtrar.map(o => o.nombre)
                const filtered = Filtrar.filter(({nombre}, index) => !ids.includes(nombre, index + 1))
                setEvento(filtered)
                const concierto = infor.filter(e => e.concierto == filtered[0].nombre)
               // setTikes(concierto)
               
               
              await  Concietos(filtered[0].nombre)
            } catch (error) {
                console.log(error)
                
            }
         
        }

        async function Concietos (e){ 
          try {
              const datos= await FiltrarConcierto(e)
              const infor = datos.map((e,i)=>{
                return {
                    id: e.id,
                    nombre: e.nombre,
                    cedula: e.cedula,
                    celular:e.celular,
                    fecha:e.actual,
                    ciudad: e.cuidadconcert,
                    concierto: e.nombreconcert,
                    protocolo:e.protocol,
                    link:e.link,
                    qr:e.qr,
                   
                  };
            })
              setTikes(infor)
            //  console.log(datos)            
          } catch (error) {
            console.log(error)
          }

        }
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
             },
             {
                 accessorKey: 'cedula',
                 header: 'Cédula',
                 
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

         const csvOptions = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalSeparator: '.',
          showLabels: true,
          useBom: true,
          useKeysAsHeaders: false,
          headers: columns.map((c) => c.header),
        };
        
        const handleExportRows = (rows) => {
          csvExporter.generateCsv(rows.map((row) => row.original));
        };
      
        const handleExportData = () => {
          csvExporter.generateCsv(data);
        };

    useEffect(()=>{
        (async()=>{
           await ConsultarTikets()
        })()
        console.log(slidetitem)

    },[])
return(
    <div className="container-fluid">
                
<div className="row">
    <div className="col-md-12">
      
        <div className="card text-left">
            <div className="card-header">
                Eventos y Tickets
            </div>
            <div className="card-body">
            <Swiper navigation={true}   modules={[Navigation]} 
          
           
           onSlideChange={ async (swiperCore) => {
             const {
               activeIndex,
               snapIndex,
               previousIndex,
               realIndex,
             } = swiperCore;
             console.log(Evento[realIndex].nombre)
             var arraycopia = DatosGlobal
             //const concierto = arraycopia.filter(e => e.concierto == Evento[realIndex].nombre)
              Concietos(Evento[realIndex].nombre)
           //  console.log(DatosGlobal)
             //setTikes(concierto)
            // console.log(Evento[realIndex]) 
            // console.log({ activeIndex, snapIndex, previousIndex, realIndex });
         }}
              onSwiper={e => {
                const {
                  activeIndex,
                  snapIndex,
                  previousIndex,
                  realIndex,
                } =e
                console.log(Evento[realIndex]) 
              }}
            //onSwiper={swiper =>{ console.log(swiper)}}
            className="mySwiper">
              {Evento.length>0?
              Evento.map((e,i)=>{
                return(
                  <SwiperSlide key={i}>
                  <div className=" container mt-4 px-0">
                    <div className="card card-body rounded-7 py-5">
                      <div className="container">
                        <h1 style={{fontSize: '1.6em'}}><span id="artista" className="fw-bold">{e.nombre}</span> </h1>
                        <div className="col-12 border border-bottom my-3"></div>
                        <p style={{fontSize: '1.2em'}}><b>Fecha:</b><span id="fechaEvento"> Miercoles 28-10-2022</span></p>
                        <p style={{fontSize: '1.2em'}}><b>Lugar:</b><span id="lugarEvento"> Estadio Alberto Spencer</span></p>
                        <p style={{fontSize: '1.2em'}}><b>Hora:</b><span id="horaEvento"> 22:30</span></p>                       
                      </div>
                    </div>
                  </div>
                  </SwiperSlide>
                )
              })
              :""}
       
      </Swiper>
                

      <MaterialReactTable
                    columns={columns}
                    data={TiktesList}
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
                        {console.log(row.original)}
                        <Typography>ciudad : {row.original.ciudad} </Typography>
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
                            handleExportRows(table.getPrePaginationRowModel().rows)
                          }
              
                          startIcon={<FileDownloadIcon />}
                          
                        >
                          Export Todas las filas
                        </Button>
                        <Button
                          disabled={table.getRowModel().rows.length === 0}
                          //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                          onClick={() => handleExportRows(table.getRowModel().rows)}
                          startIcon={<FileDownloadIcon />}
                          
                        >
                          Export Filas de página
                        </Button>
                        <Button
                          disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                          }
                          //only export selected rows
                          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
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
    </div>
</div>
            </div>
)
}

export default EventosViews;