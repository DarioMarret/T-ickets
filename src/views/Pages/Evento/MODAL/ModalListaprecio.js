import { Modal } from "react-bootstrap";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { Columnasubcrito } from "utils/ColumnTabla";
import { Box, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { ColumnaLocalida } from "utils/ColumnTabla";
import { useEffect, useState } from "react";
import { Listar_preciolocalidad } from "utils/EventosQuery";
import { useDispatch,useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import MapadelocalidadViews from "views/Pages/Espacios/MODAL/Componetes/Localidadopctioncinco";
import OpctionLocalidadView from "views/Pages/Espacios/MODAL/Componetes/Localidadoptionseis";
export default function ListarPreciView(){
    let modal = useSelector(state=> state.SuscritorSlice.modal)
    let usedispatch = useDispatch()
    let [precios,setPrecios]=useState([])
    useEffect(()=>{
        Listar_preciolocalidad(0).then(ouput=>{
            console.log(ouput)
            if(ouput.success){
                setPrecios(ouput.data)
            }
        }).catch(err=>{
            console.log(err)
        })
    }, [(modal.nombre =="ListarPreciView")])
    return(
        <Modal
            show={(modal.nombre != "ListarPreciView")}
       fullscreen={true}
        >
            <Modal.Body className="">
                <OpctionLocalidadView/>
               {/* <MaterialReactTable
                    columns={ColumnaLocalida}
                    data={precios}
                    muiTableProps={{
                        sx: {
                            tableLayout: 'fixed'
                        }
                    }}
                    enableRowActions
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex' }}>
                            <IconButton
                                color="error"
                                onClick={() => console.log(row.original)}
                            >
                                <Visibility />
                            </IconButton>
                        </Box>
                    )}
                    /*
                    localization={MRT_Localization_ES}
                    *
                    positionToolbarAlertBanner="bottom"
                />*/}
            </Modal.Body>
            <Modal.Footer>
                <div className=" container-fluid d-flex ">
                    <button className=" btn btn-success" onClick={() => usedispatch(setModal({ nombre:"Modalpreciolocalidad",estado:modal.estado}))}> Regresar</button>

                </div>
            </Modal.Footer>
        </Modal>
    )
}