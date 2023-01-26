
import FileSaver from "file-saver";
import React from "react";
import { useState } from "react";
import { Triangle } from "react-loader-spinner";

import * as XLSX from "xlsx"

export default function ExportToExcel({ apiData, fileName, label }) {
    let [spiner, setSpiner] = useState("d-none")
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
      

        const ws = XLSX.utils.json_to_sheet(apiData);
        /* custom headers */
        XLSX.utils.sheet_add_aoa(ws, [[]], { origin: "A1" });
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
       
       
    };
    function Nuievos(apiData, fileName){
       // setSpiner("")
        exportToCSV(apiData, fileName)
    }

    return (
        <div className="m-2">
            <button className=" btn  btn-success  btn-sm" onClick={(e) => exportToCSV(apiData, fileName)}><i className="bi bi-filetype-exe"></i> Export {label} </button>
            <div className={spiner}
                style={{
                    display: 'none',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000'
                }}
            >

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '10px',
                }}>
                    <Triangle
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="triangle-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                    <h4 className='text-light'>Cargando  boletos  ...</h4>


                </div>
            </div>
        </div>

    );
};