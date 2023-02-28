
import { useEffect } from "react"

import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { ticketsboletos } from "utils/columnasub";
import { Consiliaregistro } from "utils/columnasub";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import axios from "axios";
import { ConsolidarReporte } from "utils/pagos/Queripagos";
export const NuevosRegistro=()=>{
    let datos = JSON.parse( sessionStorage.getItem("datoscompras"))
    if(datos!=null){
        return datos
    }
    return []
}
 const ConsolidacionView=()=> {
    let usedispatch = useDispatch()
    const [lista,setLista]=useState([])
    useEffect(()=>{
        console.log("datos")
        $.ajax({
            type: "GET",
            url: "https://brisana.netbot.ec/js/listar.php?id=",
            success: function (success) {
                if (success.status) {
                    //  let info = success.
                    setLista([...success.result])
                   
                    console.log(success)
                    // console.log(datos)  (async () => {
                 let datos=  success.result.map(async (f) => {
                  
                    /* NuevosRegistro().map(async(g)=>{
                         if (g.id == f.id_registro){
                             
                         await (await ConsolidarReporte({
                             "id_registraCompra": f.id_registro,
                             "estado": "Consolidado"
                         }))
                             console.log(f.id_registro, (g.id == f.id_registro))
                        
                        }
                     })*/
                       /* await (await ConsolidarReporte({
                            "id_registraCompra": f.id_registro,
                            "estado": "Sin Consolidar"
                        }))*/
                    }) 
                    console.log(datos)
                }
              
                else {
                    console.log(success)
                }
            },
            error: function (error) {
                usedispatch(setToastes({
                    show: true,
                    message: "Para poder acceder a la información",
                    color: 'bg-danger',
                    estado: "Habilitar la extensión de cors"
                }))
                console.log(error)

            }
        })
        
          
      
        
    },[])
    function recargar(){
        $.ajax({
            type: "GET",
            url: "https://brisana.netbot.ec/js/listar.php?id=",
            success: function (success) {
                if (success.status) {
                    //  let info = success.result
                    setLista(success.result)
                    console.log(success)
                }
                else {
                    console.log(success)
                }
            },
            error: function (error) {
                usedispatch(setToastes({
                    show: true,
                    message: "Para poder acceder a la información",
                    color: 'bg-danger',
                    estado: "Habilitar la extensión de cors"
                }))
                console.log(error)

            }
        })
    }

    return (
        <div className=" container">
            <div className="d-flex justify-content-end py-2  px-3">
       
                    <a className="  rounded-circle btn-success mx-2 p-2 text-white"
                        data-toggle="tooltip" data-placement="top" title="Consolidar Deposito"
                    onClick={recargar}
                    >
                    <i className="fa fa-spinner">  </i>
                    </a> 
            </div>
            <div className="card">
                <MaterialReactTable
                    columns={Consiliaregistro}
                    data={lista}
                    muiTableProps={{
                        sx: {
                            tableLayout: 'flex'
                        }
                    }}
                   
                    positionToolbarAlertBanner="bottom"

                    localization={MRT_Localization_ES}
                />
            </div>
        </div>
    )
}
export default ConsolidacionView;