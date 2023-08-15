import TablasViwe from "layouts/Tablasdoc";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { logs } from "utils/userQuery";
import ReactTables from "views/Tables/ReactTables";


export default function ListarLogs() {
   let [logsinfo,setLogst]=useState([])
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
                        <td className="text-xs text-center">{moment(item.fecha).format('L')}</td>
                    </tr>
                )
            });
        } catch (error) { }
    }
    useEffect(()=>{
        logs().then(salida=>{
            setLogst(salida.data)
            console.log(salida)
        }).catch(err=>{
            console.log(err)
        })

    },[])
   return (<>
    <div>      
          
           <TablasViwe
               number={3}
               thead={theads}
               showDatos={ShowFoder}
               Titel={"nuevo"}/>
               {/*<ReactTables/>*/}

    </div>

    </>)
}