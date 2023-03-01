import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Tooltip, } from '@mui/material';
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
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import SweetAlert from "react-bootstrap-sweetalert";
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

    const successAlert = (re) => {
        setAlert(
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}>
                <div>
                    <div className="px-2 d-flex  justify-content-center align-items-center">
                        <div className="col-md-8">
                            <label className="form-label">Cargar Comprobante</label>
                            <select className="form-select" aria-label="Default select example" id="registro">
                                <option value="" >Selecione el registro</option>
                                {re.length > 0 ?
                                    re.map((e, i) => {
                                        return (
                                            <option value={e.id} key={i}>{e.id}</option>)
                                    }) : ""}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='d-flex  justify-content-between py-4'>
                    <div>
                        <button className='btn btn-outline-danger  rounded-6'>
                            <span style={{
                                fontWeight: "bold"
                            }}>Ver</span>
                        </button>
                    </div>
                    <div>
                        <button className=' btn btn-warning rounded-5'  >
                            <span style={{
                                fontWeight: "bold"
                            }}> Eliminar</span>
                        </button>
                    </div>
                    <div  >
                        <button className=' btn btn-secondary rounded-5' onClick={hideAlert} >
                            <span style={{
                                fontWeight: "bold"
                            }}> Cerrar</span>
                        </button>
                    </div>
                </div>
            </SweetAlert>
        )
    }
    const hideAlert = () => {
        setAlert(null);
    };
    function abrirvoucher(row) {
        if (row.link_pago != null) {
            (row.link_pago.includes('cloud.abitmedia.com')) ? usedispatch(setModal({ nombre: 'pago', estado: row.link_comprobante })) : usedispatch(setModal({ nombre: 'pago', estado: row.link_pago.replace("k/", "k/voucher/") }))
        } if (row.link_comprobante) {
            usedispatch(setModal({ nombre: 'pago', estado: row.link_comprobante }))

        }
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
                                    </IconButton>
                                </Tooltip> :
                                ""
                            }
                            {row.original.estado_pago != "Pagado" && row.original.forma_pago == "Tarjeta" || row.original.forma_pago == "Payphone" ?
                                row.original.link_pago != null ?
                                    <a className=" btn btn-default btn-sm"

                                        onClick={() => usedispatch(setModal({ nombre: 'pago', estado: row.original.link_pago }))}
                                    >
                                        <i className="fa fa-credit-card" ></i>
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
                                <a className=" btn btn-default btn-sm "
                                    style={{
                                        fontWeight: "bold"
                                    }}

                                    onClick={() => abrirvoucher(row.original)}
                                >
                                    <i className="fa fa-print" > </i>Imprimir voucher
                                </a>

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
            />



        </>
    )
}