import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Summarize, Visibility, } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { listaRegistro } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useHistory } from "react-router";
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice";

export default function ListaderegistroView(props) {
    let { cedula } = props
    let usedispatch = useDispatch()
    let history = useHistory()
   // let modal = useSelector((state) => state.SuscritorSlice.modal)
    const [datos, setDatos] = useState([])
    useEffect(() => {
        listarRegistropanel({ "cedula": cedula }).then(
            e => {
                setDatos(e.data.sort((a, b) => {
                    if (a.estado_pago > b.estado_pago) { return -1; }
                    if (a.estado_pago < b.estado_pago) { return 1; }
                    return 0;
                }))
            }
        ).catch(err => console.log(err))

    }, [])
    function detalle(e){
        usedispatch(addususcritor({...e}))
        history.push("/admin/Reporte/"+e.id)
    }
    function abrirModal(row) {
        usedispatch(setModal({ nombre: "confirmar", estado: { cedula: row.original.cedula, id: row.original.id_usuario, forma_pago: row.original.forma_pago } }))
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
                enableRowActions
                positionActionsColumn="first"
                renderRowActions={({ row }) => (
                    <Box sx={{ display: 'flex' }}>
                        {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" && row.original.estado_pago != "Expirado" ?
                            <Tooltip title="Reportar" placement="top">
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
                                aria-label="Consolidar"
                                onClick={() => abrirModal(row)}
                            >
                                <Summarize />
                            </IconButton>}
                        {clienteInfo() && row.original.forma_pago == "Deposito" && row.original.link_comprobante == null ? <Tooltip
                            title="Comprobar" placement="top"
                        >
                            <IconButton
                                color="error"
                                onClick={() => detalle(row.original)}
                            >
                                <Visibility />
                            </IconButton>
                        </Tooltip> : ""}
                    </Box>
                )}
                localization={MRT_Localization_ES}
            />




        </>
    )
}