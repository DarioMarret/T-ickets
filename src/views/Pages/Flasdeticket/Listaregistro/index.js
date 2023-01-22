import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Delete, Edit, Summarize, Visibility, } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { listaRegistro } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useHistory } from "react-router";
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice";
import { eliminarRegistro } from "utils/pagos/Queripagos";

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

        usedispatch(setModal({ nombre: "confirmar", estado: { ...row } }))
        //console.log({ cedula: row.original, numeroTransaccion: row.numeroTransaccion })
        //confirmar
    } const eliminarregistro = (row) => {
        //console.log(row)

        $.confirm({
            title: 'Desea eliminar el registro de compra ',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Eliminars',
                    btnClass: 'btn-red',
                    action: function () {
                        eliminarRegistro({ "id": row.id }).then(ouput => {
                            console.log(ouput)
                            console.log(row.id)
                            if (!ouput.success) { return $.alert("" + ouput.message) }

                            /* listarRegistropanel({ "cedula": cedula }).then(e => {
                                  //console.log(e)
                                 if (e.data) {
 
                                     setDatos(e.data)
                                     return
                                 }
                                 //setTikes([])
                             }).catch(err => {
                                 console.log(err)
                             })*/

                            $.alert("Registro eliminado correctamente")
                            setTimeout(function () {
                                window.location.reload()
                            }, 1000)


                        }).catch(error => {
                            $.alert("hubo un error no se pudo eliminar este registro")
                        })

                    }
                },
                close: function () {
                }
            }
        });

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
                            {row.original.forma_pago == "Deposito" ?
                                <Tooltip
                                    title="Reportar pago" placement="top"
                                >
                                    <IconButton
                                        onClick={() => abrirModal(row.original)}
                                        color="error"
                                        aria-label="Consolidar"
                                    >
                                        <Summarize />
                                    </IconButton>
                                </Tooltip> :
                                ""
                            }
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
                            {row.original.estado_pago == "Pendiente" && (row.original.forma_pago == "Deposito" || row.original.forma_pago == "Efectivo") ?
                                <Tooltip title="Borrar" placement="right">
                                    <IconButton
                                        //disabled={}
                                        color="error"
                                        onClick={() => eliminarregistro(row.original)}
                                        aria-label="Bloquear">
                                        <Delete />
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