import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import DataTable from 'react-data-table-component';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ListarTikets } from 'utils/Querypanel';
import {Row,Container}from 'react-bootstrap'
import CustomMaterialPagination from './CustomMaterialPagination';
import { width } from '@mui/system';


const TablasEjemplos = () => {
    const [data, setdata] = useState([])
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            
        },
        {
            accessorKey: 'nombre',
            header: 'Nombre',
            flex: 1,
            muiTableHeadCellProps:{xs:{ display:'none'},md:{display: 'none'}}
        },
        {
            accessorKey: 'cedula',
            header: 'Cédula',
            flex: 1
        },
        {
            accessorKey: 'fecha',
            header: 'Company',
            flex: 1
        },
        {
            accessorKey: 'ciudad',
            header: 'Ciudad',
            render:(rowData)=>(
                rowData.ciudad),
            cellStyle:width==="xs"?{
                width:"100%",
                display:"flex",
                flexDirection:"column",
                borderBottom:0,
                        }:{},
        },
        {
            accessorKey: 'concierto',
            header: 'Concierto',
            flex: 1
        },
        {
            accessorKey: 'protocolo',
            header: 'Protocolo',
            flex: 1
        },
        {
            accessorKey: 'link',
            header: 'Link',
            flex: 1

        },
        {
            accessorKey: 'qr',
            header: 'codigo QR',
            flex: 1
        },
    ];
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
            const Datos = await ListarTikets()
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
            setdata(infor)
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
    useEffect(() => {
        (async () => {
            await ConsultarTikets()
        })()
        

    }, [])
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
                    positionToolbarAlertBanner="bottom"
                    renderTopToolbarCustomActions={({ table }) => (
                        <Box
                            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                        >
                            <Button
                                color="primary"
                                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)

                                startIcon={<FileDownloadIcon />}
                                variant="contained"
                            >
                                Export All Data
                            </Button>
                            <Button
                                disabled={table.getPrePaginationRowModel().rows.length === 0}
                                //export all rows, including from the next page, (still respects filtering and sorting)

                                startIcon={<FileDownloadIcon />}
                                variant="contained"
                            >
                                Export All Rows
                            </Button>
                            <Button
                                disabled={table.getRowModel().rows.length === 0}
                                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)

                                startIcon={<FileDownloadIcon />}
                                variant="contained"
                            >
                                Export Page Rows
                            </Button>
                            <Button
                                disabled={
                                    !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                                }
                                //only export selected rows
                                startIcon={<FileDownloadIcon />}
                                variant="contained"
                            >
                                Export Selected Rows
                            </Button>
                        </Box>
                    )}
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
                            <DataTable
                            columns={columnsdos}
                            data={data}
                            pagination 
                            paginationComponentOptions={CustomMaterialPagination} 
                            />
                 </div>
              </div>
            </Row>
            </Container>
        </div>
    );

}

export default TablasEjemplos