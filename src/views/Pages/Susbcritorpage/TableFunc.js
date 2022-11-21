import React, { useEffect, useRef } from "react"

import $ from 'jquery'
import { columns } from "utils/ColumnTabla";
import "./tabla.css"
export default function TableWiev(props) {

    $.DataTable = require('datatables.net-bs4')
    require('datatables.net-responsive-bs4')
    const tableRef = useRef()
    const tableName = "table1"
    useEffect(() => {
        console.log(props.data)
        const table = $(`#${tableName}`).DataTable(
            {
                data: props.data,
                dataType: "json",
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
                    "decimal": ",",
                    "thousands": ".",
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "zeroRecords": "No se encontraron resultados",
                    "info": " Registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "infoEmpty": "Registros del 0 al 0 de un total de 0 registros",
                    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sSearch": "Buscar:",
                },

                responsive: true,
                columns: [
                    { "data": "username", "title": "Username", },
                    { "data": "email", "title": "Email", },
                    { "data": "fecha_creacion", "title": "Registro", },
                    { "data": "id", "visible": false, },
                    { "data": "name", "title": "Nombre", },
                    { "data": "perfil", "title": "Perfil", },
                    { "data": "password", "visible": false, },
                    { "data": "action", "title": "acciones", "className": "col-12" }
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
                <table className=" responsive display nowrap table  table-bordered cell-border" width="100%" id="table1" ref={tableRef}>
                </table>
            </div>


        </div>

    )
}

