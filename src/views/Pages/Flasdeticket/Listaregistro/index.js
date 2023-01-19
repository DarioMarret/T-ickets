import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Summarize, Visibility, } from '@mui/icons-material';
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
                console.log(e.data)
                setDatos(e.data.sort((a, b) => {
                    if (a.estado_pago > b.estado_pago) { return -1; }
                    if (a.estado_pago < b.estado_pago) { return 1; }
                    return 0;
                }))
            }
        ).catch(err => console.log(err))

    }, [])
    function detalle(e) {
        usedispatch(addususcritor({ ...e }))
        history.push("/admin/Reporte/" + e.id)
    }
    function abrirModal(row) {
        // console.log(row)
        let data = JSON.parse(row.info_concierto).map(e => { return e.nombreConcierto })
        //console.log(Object.values(data).includes("Eladio Carrión Quito"),data)
        if (Object.values(data).includes("Eladio Carrión Guayaquil")) {
            //console.log("guay")
            return
        }
        if (Object.values(data).includes("Eladio Carrión Quito")) {
            //console.log("gu")
            return
        }
        usedispatch(setModal({ nombre: "confirmar", estado: { ...row } }))
        //console.log({ cedula: row.original, numeroTransaccion: row.numeroTransaccion })
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
                renderRowActions={({ row }) => {
                    let info = JSON.parse(row.original.info_concierto).map(e => { return e.nombreConcierto })


                    return (

                        <Box sx={{ display: 'flex' }}>
                            {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Deposito" && row.original.estado_pago != "Expirado " ?
                                <IconButton
                                    onClick={() => abrirModal(row.original)}
                                    color="error"
                                    aria-label="Consolidar"
                                >
                                    <Summarize />
                                </IconButton> :
                                <IconButton
                                    disabled={true}
                                    color="error"
                                    aria-label="Consolidar"
                                    onClick={() => abrirModal(row.original)}
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
                    )
                }}
                localization={MRT_Localization_ES}
            />




        </>
    )
}