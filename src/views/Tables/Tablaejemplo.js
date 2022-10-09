import React, { useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ListarTikets } from 'utils/Querypanel';
import {Row}from 'react-bootstrap'


const TablasEjemplos = () => {
    const [data, setdata] = useState([])
    const columns = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 40,
        },
        {
            accessorKey: 'nombre',
            header: 'Nombre',
            size: 120,
        },
        {
            accessorKey: 'cedula',
            header: 'Cédula',
            size: 120,
        },
        {
            accessorKey: 'fecha',
            header: 'Company',
            size: 300,
        },
        {
            accessorKey: 'ciudad',
            header: 'Ciudad',
        },
        {
            accessorKey: 'concierto',
            header: 'Concierto',
            size: 220,
        },
        {
            accessorKey: 'protocolo',
            header: 'Protocolo',
            size: 220,
        },
        {
            accessorKey: 'link',
            header: 'Link',
            size: 220,
        },
        {
            accessorKey: 'qr',
            header: 'codigo QR',
            size: 220,
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
    useEffect(() => {
        (async () => {
            await ConsultarTikets()
        })()
        $(document).ready( function () {
                $('#Table').DataTable();
            } );

    }, [])
    return (
        <div>
         <Container fluid>
            <Row>
            <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Suscritos
                            </div>
                            <div className="card-body table-responsive">
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
                <table id="Table">
                    <thead>
                        <tr>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Cedula
                            </th>
                            <th>
                                Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length>0 ?
                            data.map((e, i) => {
                                return (
                                    <tr>
                                        <td>{e.cedulas}</td>
                                        <td>{e.cedulas}</td>
                                        <td>{e.cedulas}</td>

                                    </tr>
                                )
                            }) : ''
                        }
                        <tr>
                            <td>

                            </td>
                        </tr>
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