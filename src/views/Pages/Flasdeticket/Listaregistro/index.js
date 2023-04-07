import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Tooltip, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Delete,  Summarize, Visibility, } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux";
import { listarRegistropanel } from "utils/pagos/Queripagos";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import { clienteInfo } from "utils/DatosUsuarioLocalStorag";
import { useHistory } from "react-router";
import { eliminarRegistro } from "utils/pagos/Queripagos";
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import SweetAlert from "react-bootstrap-sweetalert";
import { listaRegistrosuscri } from "utils/columnasub";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
export default function ListaderegistroView(props) {
    let { cedula } = props
    let usedispatch = useDispatch()
    let history = useHistory()
    const [datos, setDatos] = useState([])
    const [alert, setAlert] = useState(null);
    useEffect(() => {
        let user = getDatosUsuariosLocalStorag()
        listarRegistropanel({ "cedula": user.cedula }).then(
            e => {
                if (!e.success) {
                    return
                }
                console.log(e.data[0])
                setDatos(e.data)
            }
        ).catch(err =>
            console.log(err)
        )
    }, [])
    function detalle(e) {
        sessionStorage.setItem("Detalleuid", JSON.stringify({ ...e }))
        history.push("/admin/Reporte/" + e.id)
    }
    function abrirModal(row) {
        usedispatch(setModal({ nombre: "confirmar", estado: { ...row } }))
    }
    const eliminarregistro = (row) => {
        //console.log(row)
        $.confirm({
            title: 'Desea eliminar el registro de compra ',
            content: '',
            type: 'red',
            typeAnimated: true,
            buttons: {
                tryAgain: {
                    text: 'Eliminar',
                    btnClass: 'btn-red',
                    action: function () {

                        eliminarRegistro({ "id": row.id }).then(ouput => {
                            console.log(ouput)
                            console.log(row.id)
                            if (!ouput.success) { return $.alert("" + ouput.message) }
                            listarRegistropanel({ "cedula": cedula }).then(e => {
                                //console.log(e)
                                if (e.data) {
                                    setDatos(e.data)
                                    return
                                }
                                //setTikes([])
                            }).catch(err => {
                                console.log(err)
                            })
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
    function abrirvoucher(row) {
        usedispatch(setToastes({
            show: true,
            message: "Muy pronto te anunciaremos en canje de los boletos a través de redes",
            color: 'bg-success',
            estado: "Tu boleto ya están pagados"
        }))
        if (row.link_pago != null) {
            (row.link_pago.includes('cloud.abitmedia.com')) ? usedispatch(setModal({ nombre: 'pago', estado: row.link_comprobante })) : usedispatch(setModal({ nombre: 'pago', estado: row.link_pago.replace("k/", "k/voucher/") }))
        } if (row.link_comprobante) {
            usedispatch(setModal({ nombre: 'pago', estado: row.link_comprobante }))
        }
    }
    return (
        <>
            <MaterialReactTable
                columns={listaRegistrosuscri}
                data={datos}
                muiTableProps={{
                    sx: {
                        tableLayout: 'flex'
                    }
                }}
                enableRowActions
                positionActionsColumn="last"
                renderRowActions={({ row }) => {
                    return (

                        <Box sx={{ display: 'flex' }}>
                            {row.original.forma_pago == "Deposito" && row.original.estado_pago != "Pagado" && row.original.estado_pago != "Comprobar" ?
                                <Tooltip
                                    title="Reportar pago" placement="top"
                                >
                                    <IconButton
                                        onClick={() => abrirModal(row.original)}
                                        color="error"
                                        aria-label="Consolidar"
                                    >
                                        <Summarize />

                                        Reportar pago
                                    </IconButton>
                                </Tooltip> :
                                ""
                            }
                            {row.original.estado_pago!="Expirado" &&row.original.estado_pago != "Pagado" && row.original.forma_pago == "Tarjeta" || row.original.forma_pago == "Payphone" ?
                                row.original.link_pago != null ?
                                    <a className=" btn btn-default btn-sm"

                                        onClick={() => usedispatch(setModal({ nombre: 'pago', estado: row.original.link_pago }))}
                                    >
                                        <i className="fa fa-credit-card" ></i> Pagar
                                    </a>
                                    : row.original.estado_pago != "Pagado" ?
                                        <Tooltip
                                            title="Eliminar" placement="top">
                                            <Button
                                                color="error"

                                                onClick={() => eliminarregistro(row.original)}
                                            >
                                                <Delete /> <span>Eliminar</span>
                                            </Button>
                                        </Tooltip> : "" :
                                row.original.estado_pago!="Pagado" || row.original.forma_pago !="Tarjeta"?"":
                                <a className=" btn btn-default btn-sm "
                                    style={{
                                        fontWeight: "bold"
                                    }}

                                    onClick={() => abrirvoucher(row.original)}
                                >
                                    <i className="fa fa-print" > </i>Imprimir voucher
                                </a>

                            }
                            {clienteInfo() && row.original.forma_pago == "Deposito"  && row.original.link_comprobante == null ?
                                <Tooltip
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