import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { QRCodeCanvas } from 'qrcode.react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Edit, Delete, FileDownload, Share, Send } from '@mui/icons-material';
import { ListarTikets, FiltrarConcierto } from "utils/Querypanel";
import { ExportToCsv } from 'export-to-csv';
import { Swiper, SwiperSlide } from 'swiper/react';
import { columnsTicket } from 'utils/ColumnTabla';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from 'StoreRedux/Slice/SuscritorSlice';
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import CederView from './Susbcritorpage/Modal/CederView';
const EventosViews = () => {
  let usedispatch = useDispatch()
  const [TiktesList, setTikes] = useState([])
  const [DatosGlobal, setDatosGloabl] = useState([])
  const [Evento, setEvento] = useState([])
  const [slidetitem, SetSlidet] = useState([])
  async function ConsultarTikets() {
    try {
      const Datos = await ListarTikets()
      const infor = Datos.data.map((e, i) => {
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
      setDatosGloabl(infor)
      const Filtrar = Datos.data.map((e, i) => {
        return { nombre: e.nombreconcert, ciudad: e.cuidadconcert, fecha: e.actual }
      })
      const ids = Filtrar.map(o => o.nombre)
      const filtered = Filtrar.filter(({ nombre }, index) => !ids.includes(nombre, index + 1))
      setEvento(filtered)
      //  console.log(filtered)
      await Concietos(filtered[0].nombre)
    } catch (error) {
      console.log(error)
    }

  }
  async function Concietos(e) {
    try {
      const datos = await FiltrarConcierto(e)
      const infor = datos.map((e, i) => {
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
      setTikes(infor)
    } catch (error) {
      console.log(error)
    }

  }
  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    filename: 'Ticket vendidos',
    useKeysAsHeaders: false,

  };

  const csvExporter = new ExportToCsv(csvOptions);
  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };
  const handleExportData = () => {
    csvExporter.generateCsv(TiktesList);
  };
  const abrirceder = (e) => { usedispatch(setModal({ nombre: 'ceder', estado: e })) }
  useEffect(() => {
    (async () => {
      await ConsultarTikets()
    })()
    console.log(slidetitem)
  }, [])
  return (
    <div className="container-fluid">
      <CederView />
      <div className="row">
        <div className="col-md-12">
          <div className="card text-left">
            <div className="card-header">
              Eventos y Tickets
            </div>
            <div className="card-body">
              <Swiper navigation={true} modules={[Navigation]}
                onSlideChange={async (swiperCore) => {
                  const {
                    activeIndex,
                    snapIndex,
                    previousIndex,
                    realIndex,
                  } = swiperCore;
                  //console.log(Evento[realIndex].no mbre)
                  var arraycopia = DatosGlobal
                  //const concierto = arraycopia.filter(e => e.concierto == Evento[realIndex].nombre)
                  Concietos(Evento[realIndex].nombre)
                }}
                onSwiper={e => {
                  const {
                    activeIndex,
                    snapIndex,
                    previousIndex,
                    realIndex,
                  } = e

                }}
                className="mySwiper">
                {Evento.length > 0 ?
                  Evento.map((e, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className=" container-fluid mt-4 px-0">
                          <div className="card card-body rounded-7 py-5">
                            <div className="container">
                              <h1 style={{ fontSize: '1.6em' }}><span id="artista" className="fw-bold">{e.nombre}</span> </h1>
                              <div className="col-12 border border-bottom my-3"></div>

                              <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento">{e.fecha.split(" ")[0]}</span></p>
                              <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento"> {e.ciudad} </span></p>
                              <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span id="horaEvento"> {e.fecha.split(" ")[1]} </span></p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })
                  : ""}

              </Swiper>
              <MaterialReactTable
                columns={columnsTicket}
                data={TiktesList}
                enableRowSelection
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
                    <Tooltip title="Ceder ticket" placement='top'>
                      <IconButton
                        color='success'
                        onClick={() => abrirceder(row.original)}
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
                renderTopToolbarCustomActions={({ table }) => (
                  <Box
                    sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
                  >
                    <Button
                      color="primary"
                      disabled={table.getPrePaginationRowModel().rows.length === 0}
                      onClick={handleExportData}
                      startIcon={<FileDownloadIcon />}
                    >
                      Export Todos los Datos
                    </Button>
                    <Button
                      disabled={table.getPrePaginationRowModel().rows.length === 0}
                      onClick={() =>
                        handleExportRows(table.getPrePaginationRowModel().rows)
                      }
                      startIcon={<FileDownloadIcon />}
                    >
                      Export Todas las filas
                    </Button>
                    <Button
                      disabled={table.getRowModel().rows.length === 0}
                      onClick={() => handleExportRows(table.getRowModel().rows)}
                      startIcon={<FileDownloadIcon />}
                    >
                      Export Filas de página
                    </Button>
                    <Button
                      disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                      onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                      startIcon={<FileDownloadIcon />}
                    >
                      Export Fila Seleccionada
                    </Button>
                  </Box>
                )}
                localization={MRT_Localization_ES}

              />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventosViews;