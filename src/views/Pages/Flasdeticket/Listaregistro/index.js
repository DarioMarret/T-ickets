import { useEffect, useState } from "react"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Chip, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";

import { useDispatch,useSelector } from "react-redux";
import { listaRegistro } from "utils/columnasub";
import { listarRegistropanel } from "utils/pagos/Queripagos";

export default function ListaderegistroView(){    

    const [datos,setDatos]= useState([])
    useEffect(()=>{
        listarRegistropanel({ "cedula": "" }).then(
            e=>{
                console.log(e)
                setDatos(e.data)
            
            }
        ).catch(err=>console.log(err))

         },[])
    
    return(
        <>
        <div className=" container">

            <div className="card">
                <>
                Registro
                </>
                <div className="card-body">
                        <div className="card-body table-responsive">
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
                                localization={MRT_Localization_ES}
                            />
                        </div>
                </div>
            </div>

        </div>
        </>
    )
}