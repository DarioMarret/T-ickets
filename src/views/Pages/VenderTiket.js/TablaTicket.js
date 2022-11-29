import React, { useEffect, useRef, useState } from "react"
import $ from 'jquery'
import { columns } from "utils/ColumnTabla";
import "./tabla.css"
import ModalCarritoadmin from "./Modal/ModalCarritoadmin";
export default function TableTikwtWiev(props) {
    const [show, setShow] = useState(true)
    $.DataTable = require('datatables.net-bs4')
    require('datatables.net-responsive-bs4')
    const tableRef = useRef()
    const tableName = "table1"
    useEffect(() => {
        //    console.log(props.data)
        const table = $(`#${tableName}`).DataTable(
            {
                data: props.data,
                dataType: "json",
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",

                },
                "info": false,
                responsive: true,
                columns: [
                    { "data": "username", "title": "Username", },
                    { "data": "email", "title": "Email", },
                    { "data": "fecha_creacion", "title": "Registro", },
                    { "data": "id", "visible": false, },
                    { "data": "name", "title": "Nombre", },
                    { "data": "perfil", "title": "Perfil", },
                    { "data": "password", "visible": false, },
                    { "data": "action", "title": "acciones" }
                ],
                "columnDefs": [
                    { responsivePriority: 1, targets: 0 },
                    { responsivePriority: 2, targets: 4 }
                ],
                destroy: true,
            }
        )
        return function () {
            table.destroy()
        }
    }, [])
    return (
        <div>
            <div className="col-12">
                {/*   <table className=" responsive display nowrap " width="100%" id="table1" ref={tableRef}>
                </table>*/}

            </div>


        </div>

    )
}

