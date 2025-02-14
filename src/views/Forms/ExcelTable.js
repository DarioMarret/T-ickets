import React, { useEffect, useState } from "react";
import { HotTable } from '@handsontable/react-wrapper';

const ExcelTable = ({ data }) => {
    const [columns, setColumns] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            // Obtener claves del primer objeto como columnas
            const keys = Object.keys(data[0]);
            const columnHeaders = keys.map((key) => ({
                data: key,
                title: key.replace(/_/g, " ").toUpperCase()
            }));

            // Calcular sumas por columna
            const columnSums = {};
            keys.forEach(key => {
                columnSums[key] = data.reduce((acc, row) => {
                    const value = parseFloat(row[key]);
                    return acc + (isNaN(value) ? 0 : value);
                }, 0).toFixed(2);
            });

            // Crear fila de totales
            const totalRow = { ...columnSums, forma_pago: "Total", estado_pago: "" };

            // Agregar fila de total al final de los datos
            const updatedData = [...data, totalRow];

            setColumns(columnHeaders);
            setTableData(updatedData);
        }
    }, [data]);

    return (
        <HotTable
            data={tableData}
            colHeaders={columns.map(col => col.title)}
            columns={columns}
            rowHeaders={true}
            width="100%"
            height="auto"
            licenseKey="non-commercial-and-evaluation"
        />
    );
};

export default ExcelTable;
