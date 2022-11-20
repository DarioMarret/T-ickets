import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined } from '@mui/icons-material';
import { GetUserList, GetRoles } from "utils/Querypanel.js";
import { columnsTicket } from "utils/ColumnTabla";
import TableWiev from "./TableFunc.js"
function Example() {
  const [data, setData] = React.useState([]);
  const [tiketslist, setTikes] = useState([])

  async function ListarUsuarios() {
    try {


      //console.log(Roles)
      // console.log(dataSet)
      const data = await GetUserList()
      const valors = data.users.map((e, i) => {
        return {
          ...e,
          action: "<button class='btn btn-danger' onclick='console.log(" + e.id + ")'> <i class='fa fa-edit' /></button>",

        }


      })
      setTikes([...valors])
      console.log(data)

    } catch (error) {
      console.log(error)

    }


  }

  useEffect(() => {
    (async () => {
      await ListarUsuarios()
    })()
    console.log(tiketslist)

  },
    [])
  return (
    <>

      <div className="card card-primary card-outline text-left " style={{ minHeight: '250px' }} >
        <div className="card-header pb-2">
          Tikets
        </div>
        <div className="card-body table-responsive">

          {/*tiketslist.length > 0 ?
            <TableWiev data={tiketslist} /> : ''*/}
        </div>
      </div>
    </>
  );
}

export default Example;