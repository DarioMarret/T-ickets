import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Tooltip, } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Delete, Summarize, Visibility, } from '@mui/icons-material';
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
import moment from "moment";
export default function ListaderegistroView(props) {
    let { cedula } = props
    let usedispatch = useDispatch()
    let history = useHistory()
    const [datos, setDatos] = useState([])
    const [alert, setAlert] = useState(null);
    useEffect(() => {
        const fechaActual = new Date();

        // Calcula la fecha límite (hoy menos dos días)
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaActual.getDate() - 1);
        let user = getDatosUsuariosLocalStorag()
        console.log(fechaLimite)
        listarRegistropanel({ "cedula": user.cedula }).then(
            e => {
                if (!e.success) {
                    return
                }
                console.log(e)
                /*e.data.forEach(element => {
                    console.log(moment(element.fechaCreacion).format() +"aqui"+ moment( fechaLimite).format())
                    console.log(moment(element.fechaCreacion).format()> moment(fechaLimite).format())
                })*/
                /*/.filter(e => moment(e.fechaCreacion).format() > moment(fechaLimite).format())*/
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
    function abrirfirma(row) {
        usedispatch(setModal({ nombre: "firma", estado: { ...row } }))
        usedispatch(setModal({ nombre: "", estado: "" }))
        usedispatch(setModal({ nombre: "firma", estado: { ...row } }))
    }
    function abrirvoucher(row) {
        /*usedispatch(setToastes({
            show: true,
            message: "Muy pronto te anunciaremos el canje de los boletos a través de redes",
            color: 'bg-success',
            estado: "Tu boleto ya están pagados"
        }))*/
        if (row.link_pago != null) {
            (row.link_pago.includes('cloud.abitmedia.com')) ? usedispatch(setModal({ nombre: 'pago', estado: row.link_comprobante })) : usedispatch(setModal({ nombre: 'firma', estado: {  ...row } }))
        } if (row.link_comprobante) {
            usedispatch(setModal({ nombre: 'pago', estado: row.link_comprobante }))
        }
    }
    return (
        <>
            {datos.length > 0 ?
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
                                {/*((row.original.id_espacio_localida==null)||(row.original.id_espacio_localida==0))?
                                <Tooltip 
                                title=""
                                >

                                </Tooltip>
                                :""

                                */}
                                {row.original.estado_pago != "Expirado" && row.original.estado_pago != "Pagado" && row.original.forma_pago == "Tarjeta" || row.original.forma_pago == "Payphone" ?
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
                                    (row.original.estado_pago != "Pagado" || row.original.forma_pago != "Tarjeta") ?
                                        "" :
                                        (row.original.id_espacio_localida == null || row.original.id_espacio_localida == 0) ?
                                            <a className=" btn btn-default btn-sm "
                                                style={{
                                                    fontWeight: "bold"
                                                }}
                                                onClick={() => abrirvoucher(row.original)}
                                            >
                                                <i className="fa fa-print" > </i>Firmar voucher
                                            </a> : ""

                                }
                                {clienteInfo() && row.original.forma_pago == "Deposito" && row.original.link_comprobante == null ?
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
                /> : ""}



        </>
    )
}