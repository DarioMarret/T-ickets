import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, AttachMoney, Summarize, Visibility, ContactsOutlined, Share, FileDownload, Send } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";

import { useDispatch, useSelector } from "react-redux";
import { listaRegistro } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";

export default function ListaderegistroView(props) {
    let { cedula } = props
    let usedispatch = useDispatch()
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    const [datos, setDatos] = useState([])
    useEffect(() => {
        listarRegistropanel({ "cedula": cedula }).then(
            e => {
                console.log(e)

                setDatos(e.data.sort((a, b) => {
                    if (a.estado_pago > b.estado_pago) { return -1; }
                    if (a.estado_pago < b.estado_pago) { return 1; }
                    return 0;
                }))

            }
        ).catch(err => console.log(err))

    }, [])
    function abrirModal(row) {
        usedispatch(setModal({ nombre: "confirmar", estado: { cedula: row.original.cedula, numeroTransaccion: row.original.numeroTransaccion } }))
        console.log({ cedula: row.original, numeroTransaccion: row.numeroTransaccion })
        //confirmar
    }

    return (
        <>

            <MaterialReactTable
                columns={listaRegistro}
                data={datos}
                muiTableProps={{
                    sx: {
                        tableLayout: 'flex'
                    }
                }}
                muiTableBodyProps={{
                    sx: { columnVisibility: { nombre: false } }
                }}

                displayColumnDefOptions={{
                    'mrt-row-numbers': {
                        enableHiding: true,
                    },
                }}
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex' }}>

                        {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" ? <Tooltip title="Reportar" placement="top">
                            <IconButton

                                color="error"
                                aria-label="Bloquear"
                                onClick={() => abrirModal(row)}
                            >
                                <Summarize />
                            </IconButton>
                        </Tooltip> : <IconButton
                            disabled={true}
                            color="error"
                            aria-label="Bloquear"
                            onClick={() => abrirModal(row)}
                        >
                            <Summarize />
                        </IconButton>}

                    </Box>
                )}
                localization={MRT_Localization_ES}
            />




        </>
    )
}