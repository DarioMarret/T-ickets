import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send, CheckBox } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import { AprobarTiket } from "utils/Querycomnet";
import { bancos } from "utils/Imgenesutils";
import { ticketprocesoapro } from "utils/columnasub";
import moment from "moment";
import ModalAprobarViews from "./Modalventas";
import ModalBoletoApro from "./Modalboleto";
import ListaderegistroView from "views/Pages/Flasdeticket/Listaregistro";
import ModalConfima from "views/Components/MODAL/Modalconfirmacion";
let { cedericon, atencion } = bancos
export default function AprobarView() {
    let usedispatch = useDispatch()
    let modal = useSelector((state) => state.SuscritorSlice.modal)

    const [data, setData] = React.useState([]);
    const [tiketslist, setTikes] = useState([])
    const [selecions, setselcion] = useState({

    })


    const [alert, setAlert] = useState(null)
    const abrirceder = (e) => { usedispatch(setModal({ nombre: 'ceder', estado: e })), hideAlert() }
    const successAlert = (e) => {
        setAlert(
            <SweetAlert
                info
                style={{ display: "block", marginTop: "-100px" }}
                title={"Estas Seguro?"}
                onConfirm={() => abrirceder(e)}
                onCancel={() => hideAlert()}
                confirmBtnBsStyle="success"
                cancelBtnBsStyle="danger"
                closeOnClickOutside={false}
                confirmBtnText="Si, Ceder"
                cancelBtnText="Cancelar"
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                showCancel
            >
                <div className="d-flex flex-row justify-content-center text-center">
                    <div className="d-flex">
                        <h4 style={{ fontSize: '0.9em' }} >
                            Desea ceder este boleto a otro usuario</h4>
                    </div>
                </div>
            </SweetAlert>
        );
    };
    const succesLimit = () => {
        setAlert(
            <SweetAlert
                style={{ display: "block", marginTop: "-100px" }}

                closeOnClickOutside={false}
                showCancel={false}
                showConfirm={false}
                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
            >
                <div>
                    <div className='col-12 pb-3'>
                        <img src={atencion} className="img-fluid"
                            style={{
                                height: 100
                            }}
                        ></img>
                    </div>
                    <h5>Has alcanzado la cantidad límite de entradas</h5>
                    Deseas continuar editando la selección
                    <div className='d-flex  justify-content-around py-4 px-2'>
                        <div>
                            <button className='btn btn-outline-danger  rounded-6' onClick={() => cerrar()}>
                                <span style={{
                                    fontWeight: "bold"
                                }}>Ir al carrito</span>
                            </button>
                        </div>
                        <div>
                            <button className=' btn btn-warning rounded-5' onClick={() => hideAlert()} >
                                <span style={{
                                    fontWeight: "bold"
                                }}> Si, Continuar</span>
                            </button>
                        </div>

                    </div>
                </div>
            </SweetAlert>
        )
    }
    function selecion(cod, seleccionado) {
        let info = data
        if (info.some(e => e.uid == cod)) {
            if (info.some(g => g.sillas === seleccionado.sillas)) {
                let nuevo = selecions
                setData(info.filter(h => h.sillas != seleccionado.sillas))
                // delete nuevo.seleccionado.sillas;
                // setselcion({...nuevo})

            } else {
                info.push({ ...seleccionado })
                setselcion({
                    ...selecions,
                    [seleccionado.sillas]: true
                })
                setData(info)
            }
        } else {
            setselcion({})
            let datos = info.filter(f => f.ui == cod)
            datos.push({ ...seleccionado })
            setData(datos)
            setselcion({ [seleccionado.sillas]: true })
        }

    }
    const hideAlert = () => {
        setAlert(null)
    }
   // console.log(data)
    useEffect(() => {
       /* AprobarTiket().then(oupt => {
            let datos = oupt.data.filter(e => moment(new Date(), "YYYY-MM-DD HH:mm:ss").diff(moment(e.fechaCreacion, "YYYY-MM-DD HH:mm:ss"), 'h') < 2 && e.estado === "reservado")
            // console.log(datos)
            let nuevo = datos.map((e) => {
                e.uid = e.codigoEvento + "-" + e.cedula
                return e
            })
            let nuevogrupo = []
            nuevo.forEach(element => {
                if (!nuevogrupo.some(e => e.uid == element.uid)) {
                    nuevogrupo.push({
                        codigoEvento: element.codigoEvento,
                        concierto: element.concierto,
                        cedula: element.cedula,
                        estado: element.estado,
                        valor: element.valor,

                        fechaCreacion: element.fechaCreacion,
                        tokenPago: element.tokenPago,
                        uid: element.uid,
                        detalle: []
                    })
                }
            });
            nuevogrupo.length > 0 ? nuevo.map((elm, idex) => {
                let index = nuevogrupo.findIndex(f => f.uid == elm.uid)
                let fecha = elm.fechaCreacion
                if (!nuevogrupo[index].detalle.some(h => h.sillas === elm.sillas)) {
                    nuevogrupo[index].detalle.push({
                        sillas: elm.sillas,
                        localidad: elm.localidad, fechaCreacion: fecha,
                        cedula: elm.cedula,
                        tokenPago: elm.tokenPago,
                        estado: elm.estado,
                        uid: elm.uid,
                        valor: elm.valor, codigoEvento: elm.codigoEvento,
                    })
                }
            }) : ''
            //console.log(nuevogrupo)
            setTikes([...nuevogrupo])
        }).catch(err => {
            console.log(err)
        })*/
    },
        [])
    function suma() {
        let tikets = data.map((f) => { return parseFloat(f.valor) })
        try {
            let valo = tikets.reduce((a, b) => a + b, 0).toFixed(2)
            return valo

        } catch (error) {
            console.log(error)

        }
    }
    function Aprobarvarios(){
        usedispatch(setModal({ nombre: "Aprobar", estado: data }))
    }
    function Aprobar(e){
        //console.log(e)
        usedispatch(setModal({ nombre:"boleto",estado:e}))

    }

    return (
        <>
            {alert}
            {
            modal.nombre=="Aprobar"?
            <ModalAprobarViews />:""}
            {
                modal.nombre =="boleto"?
                <ModalBoletoApro/>:""
            }
            <ModalConfima/>
            <div className="card card-primary card-outline text-left " style={{ minHeight: '250px' }} >
                <div className="card-header pb-2">
                    Ventas por Aprobar
                </div>
                <div className="row px-3 d-none">
                    <div className="col-10 text-end  ">
                        <div className=" d-flex  justify-content-end align-items-center h-100">
                            <h5>Total de Boletos seleccionados {data.length > 1 ? "$" + suma() : "$00.00"}</h5>
                           
                        </div>


                    </div>
                    <div className="col-sm ">
                        {data.length > 1 ? <button className="btn btn-success" onClick={Aprobarvarios}> Pagar</button> : 
                        <button className="btn btn-success" disabled={true} > Pagar </button>}
                    </div>

                </div>
                <div className="card-body table-responsive">
                    <ListaderegistroView 
                    cedula={""}
                    />
                   
                    {/*
                     <MaterialReactTable
                        columns={ticketprocesoapro}
                        data={tiketslist}

                        muiTableProps={{
                            sx: {
                                tableLayout: 'flex'
                            }
                        }}
                        muiTableBodyProps={{
                            sx: { columnVisibility: { nombre: false } }
                        }}
                        renderDetailPanel={({ row }) => (
                            <div className=" ">
                                {row.original.detalle ? row.original.detalle.map((e, i) => {
                                    return (
                                        <div className="row  border-bottom pb-1 align-items-center  rounded-1" key={"cons" + i}>
                                            <div className=" d-none col-sm">
                                                <div className=" text-center">
                                                   
                                                    <input className="form-check-input" type="checkbox" name={e.sillas}
                                                        checked={data.some(f => f.sillas == e.sillas)}

                                                        onChange={() => selecion(e.uid, e)}

                                                        id="flexCheckIndeterminate" />
                                                    <label className="form-check-label" >

                                                    </label>
                                                </div>       
                                            </div>
                                            <div className="col-sm  d-flex align-items-center">
                                                <button className="btn  btn-success btn-sm"
                                                    onClick={()=>Aprobar(e)}
                                                > <i className=" fa fa-edit fa-xs"></i> </button>
                                            </div>
                                            <div className="col-2 col-md-2 ">

                                                boleto   {e.sillas}
                                            </div>
                                            <div className="col-2 col-md-3">
                                                Localidad:  {e.localidad}
                                            </div>
                                            <div className="col-sm">
                                                ${e.valor}
                                            </div>

                                            <div className="col-sm col-md-3">
                                                {e.fechaCreacion}
                                            </div>
                                            <div className="col-sm">
                                                {row.original.codigoEvento}
                                            </div>
                                            <div className=" col-sm">
                                                {row.original.estado}
                                            </div>

                                        </div>
                                    )
                                }) : ''}

                            </div>
                        )}
                        enableSelectAll={false}
                        enableMultiRowSelection={false}
                        enableRowSelection


                        positionToolbarAlertBanner="bottom"
                        displayColumnDefOptions={{
                            'mrt-row-numbers': {
                                enableHiding: true,
                            },
                        }}

                        localization={MRT_Localization_ES}

                    />
                    
                    */}
                </div>
            </div>
        </>
    );
}

