import TablasViwe from "layouts/Tablasdoc";
import { useEffect } from "react";
import { useState } from "react";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { logs } from "utils/userQuery";
import { logWithCallback } from "utilsstile.js/style";

import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';
export default function ListarLogs() {
    let [logsinfo, setLogst] = useState([])
    const theads = () => {
        return (
            <thead className="">
                <tr className="border ">
                    <th  >#</th>
                    <th  >Ip</th>
                    <th className="text-xs text-center"  >Usuario</th>
                    <th className="text-xs text-center"  >Operador</th>
                    <th className="text-xs text-center"  >Acción</th>
                    <th className="text-xs text-center">Fecha</th>
                </tr>
            </thead>
        )
    }
    const ShowFoder = () => {
        try {
            return logsinfo.map((item, index) => {

                return (
                    <tr key={index}>
                        <td className="text-xs text-center">{item.id}</td>
                        <td className="text-xs text-center">{item.ip}</td>
                        <td className="text-xs text-center">{item.usuario}</td>
                        <td className="text-xs text-center ">{item.operador}</td>
                        <td className="text-xs text-center ">{item.accion}</td>
                        <td className="text-xs text-center">{item.fecha}</td>
                    </tr>
                )
            });
        } catch (error) { }
    }
    useEffect(() => {
        logs().then(salida => {
            setLogst(salida.data)
        }).catch(err => {
            logWithCallback(err)
        })

    }, [])
     const COLUMNAS = [
        {
            accessorKey: "ip",
            header: "ip"
        },
        {
            accessorKey: "usuario",
            header: "Usuario"
        },
        {
            accessorKey: "operador",
            header: "Operador",
         }, {
            accessorKey: "accion",
             header: "Accion",
         },
        {
            accessorKey: "fecha",
            header: "Fecha",
        }
    ]
    return (<>
        <div>
            <MaterialReactTable
                columns={COLUMNAS}
                data={logsinfo}

                muiTableProps={{
                    sx: {
                        tableLayout: 'fixed'
                    }
                }}
                localization={MRT_Localization_ES}
            />

            {/* <TablasViwe
                number={3}
                thead={theads}
                showDatos={ShowFoder}
                Titel={"nuevo"} /> */}
            {/*<ReactTables/>*/}

        </div>

    </>)
}