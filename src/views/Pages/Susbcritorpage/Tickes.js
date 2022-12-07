import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility, ContactsOutlined, Share, FileDownload, Send } from '@mui/icons-material';
import SweetAlert from "react-bootstrap-sweetalert";
import { QRCodeCanvas } from 'qrcode.react';
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice.js";
import { columnsTicket } from "utils/ColumnTabla";
import TableWiev from "./TableFunc.js"
import { buscarcliente } from "utils/Querypanelsigui.js";
import { ListarTikets } from "utils/Querypanel.js";
import CederView from "./Modal/CederView.js";
import ToastViews from "views/Components/TOAST/toast.js";
function Example() {
  let usedispatch = useDispatch()

  const [data, setData] = React.useState([]);
  const [tiketslist, setTikes] = useState([])

  async function ListarUsuarios() {
    try {
      const data = await ListarTikets()
      const datos = data.data.map((e, i) => {
        return {
          id: e.id,
          nombre: e.nombre,
          cedula: e.cedula,
          celular: e.celular,
          fecha: e.actual,
          ciudad: e.cuidadconcert,
          concierto: e.nombreconcert,
          protocolo: e.protocol,
          link: e.link,
          qr: e.qr,

        };
      })
      /*const valors = data.users.map((e, i) => {
        return {
          ...e,
          action: "<button class='btn btn-danger' onclick='console.log(" + e.id + ")'> <i class='fa fa-edit' /></button>",

        }


      })*/
      // console.log(datos)
      setTikes([...datos])
      // setTikes([...valors])
      //   console.log(data)

    } catch (error) {
      //   console.log(error)

    }


  }
  const [alert, setAlert] = useState(null)
  const abrirceder = (e) => { usedispatch(setModal({ nombre: 'ceder', estado: e })), hideAlert() }
  const successAlert = (e) => {

    setAlert(
      <SweetAlert
        info
        style={{ display: "block", marginTop: "-100px" }}
        title={"Estas Seguro?"}
        onConfirm={() => abrirceder(e)}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Si, Ceder"
        cancelBtnText="Cancelar"

        closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
        showCancel
      >
        <div className="d-flex flex-row justify-content-center text-center">
          <div className="d-flex">
            <h4 style={{ fontSize: '0.9em' }} >
              Desea ceder este boleto a otro usuario</h4>
          </div>
        </div>
      </SweetAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null)
  }
  useEffect(() => {
    (async () => {
      await ListarUsuarios()
    })()
    //  console.log(tiketslist)

  },
    [])
  return (
    <>
      {alert}
      <CederView />
      <div className="card card-primary card-outline text-left " style={{ minHeight: '250px' }} >
        <div className="card-header pb-2">
          Tikets
        </div>
        <div className="card-body table-responsive">
          <MaterialReactTable
            columns={columnsTicket}
            data={tiketslist}

            muiTableProps={{
              sx: {
                tableLayout: 'flex'
              }
            }}
            muiTableBodyProps={{
              sx: { columnVisibility: { nombre: false } }
            }}
            renderDetailPanel={({ row }) => (
              <Box
                sx={{
                  display: 'grid',
                  margin: 'auto',
                  gridTemplateColumns: '1fr 1fr',
                  width: '100%',
                }}
              >

                <Typography>ciudad : {row.original.ciudad} </Typography>
                <Typography>Concierto : {row.original.concierto} </Typography>
                <Typography sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }} >
                  QR:
                  <QRCodeCanvas value={row.original.qr} />
                </Typography>
                <Typography>Protocolo : {row.original.protocolo} </Typography>
              </Box>
            )}

            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: 'flex' }}>
                <Tooltip title="Ver Ticket" placement="top">
                  <IconButton
                    color="success"
                    arial-label="Enviar"
                  >
                    <a href={row.original.link}
                      target="_blank"
                    >
                      <FileDownload />
                    </a>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Borrar" placement="top">
                  <IconButton
                    color="error"
                    aria-label="Bloquear">
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ceder ticket" placement="top-start">
                  <IconButton
                    color='success'
                    onClick={() => successAlert(row.original)}
                  >
                    <Send />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            positionToolbarAlertBanner="bottom"
            displayColumnDefOptions={{
              'mrt-row-numbers': {
                enableHiding: true,
              },
            }}

            localization={MRT_Localization_ES}

          />
          {/*tiketslist.length == 0 ?
            <TableWiev data={tiketslist} /> : ''*/}
        </div>
      </div>
    </>
  );
}

export default Example;