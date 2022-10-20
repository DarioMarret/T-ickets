import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Accordion, Badge } from "react-bootstrap"
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Edit,Delete,Share } from '@mui/icons-material';
import { ExportToCsv } from 'export-to-csv';
import { columnsTicket } from "utils/ColumnTabla";
import { EliminareventoLocalidad,listarpreciolocalidad,ListarEventos } from "utils/Querypanel"
import Modalupdate from "./ModalupdateEvento"
import { useDispatch } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import PreciosViews from "./ModalPrecios";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Dias } from "utils/constantes";
import { ActualizaEstadoLocalidad } from "utils/Querypanelsigui";
import Collapse from 'react-bootstrap/Collapse';

const EventoEspecifico=()=>{
    let {id} =useParams()
    let dispatch= useDispatch()   
    const[show,setShow] = useState(false)
    const [alert,setAlert] = useState(null)    
    const [showpr,setShowpr]=useState(false)
    const [precios,SetPrecios]=useState([])
    const [open, setOpen] = useState(false);
    const [valores,setvalores]=useState({localodad:'',
    precio_normal:'',
    precio_discapacidad:'',
    precio_tarjeta:'',
    precio_descuento:'',
    codigoEvento: "",
    id: '',
    localodad: '',
    habilitar_cortesia:''})
    const [evento,SetEvento] = useState({
        id: '',
        nombreConcierto: '',
        fechaConcierto: '',
        horaConcierto: '',
        lugarConcierto:'',
        cuidadConcert: '',
       descripcionConcierto: '',
        imagenConcierto: '',
        idUsuario:'',
        estado: '',
        codigoEvento: '',
        fechaCreacion: '',
        LocalodadPrecios: []
    })    
    async function Eliminar(e,f){
       const elimnar = await EliminareventoLocalidad(e,f)
        if(elimnar.success){
          hideAlert()
       console.log(elimnar,e,f)
       await Evento()}

       
    }
    function GetDay(e){
      var da= new Date(e).getDay()
     // console.log(Dias[da])
      return Dias[da]
    }
    function EditarPrecios(e){
      setvalores({...e})
     // console.log(e)
      setShowpr(true)
    }
    async function Evento(){
        try {
          // tres consultas para verificar si exites ACTIVO DESACTIVO CANCALADO y unir las respuestas 
          //validar en los dos lados evento especifico y global
          //hacer plantilla de boleto 
            const cargar = await ListarEventos("PROCESO")
            const precio = await listarpreciolocalidad(id)
            if(cargar.success){ 
              let datos = cargar.data.filter((e)=>e.codigoEvento==id)
              //console.log(datos[0])
              SetEvento({...datos[0],LocalodadPrecios:precio.data})
            SetPrecios(precio.data)            
        }
        } catch (error) {
          dispatch(setToastes({show:true,message:'Hubo un error en el procceso',color:'bg-danger', estado:'Error'}))             
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
        //csvExporter.generateCsv(data);
      };
    async  function  Cambiar  (i){
        let info = {
          estado:i
        }
        try{
          const update= await ActualizaEstadoLocalidad(id,info)
          if(update.success){
          //  console.log(update)
            hideAlert()
            dispatch(setToastes({show:true,message:'Evento actualizado correctamente',color:'bg-success', estado:'Exito'})) 
              await Evento()
          }
        }catch(error){
          console.log(error)
          dispatch(setToastes({show:true,message:'Hubo un error intente mas tarde',color:'bg-danger', estado:'Error'})) 
        }
       
      }
    useEffect(()=>{
        (async()=>{
            await Evento()
        })()
    },[show])
    
 const successAlert = (i) => {
  setAlert(
    <SweetAlert
      warning
      style={{ display: "block", marginTop: "-100px" }}
      title="Estas Seguro?"
      onConfirm={() => Cambiar(i)}
      onCancel={() => cancelDetele()}
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      confirmBtnText="Confirmar"
      cancelBtnText="Cancelar"
      showCancel
    >
      Esta seguro de actualizar el estado de este evento
    </SweetAlert>
  );
};
const successAlertElimna =(e,i)=>{
  setAlert(
    <SweetAlert
      warning
      style={{ display: "block", marginTop: "-100px" }}
      title="Estas Seguro?"
      onConfirm={() => Eliminar(e,i)}
      onCancel={() => cancelDetele()}
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      confirmBtnText="Confirmar"
      cancelBtnText="Cancelar"
      showCancel
    >
      Esta seguro de Eliminar esta Localidad
    </SweetAlert>
  );
}

const cancelDetele = () => {
  setAlert(
    <SweetAlert
      danger
      style={{ display: "block", marginTop: "-100px" }}
      title="Cancelado"
      onConfirm={() => hideAlert()}
      onCancel={() => hideAlert()}
      confirmBtnBsStyle="success"
    >
     Se a cancelado la acción 
    </SweetAlert>
  );
};
let color = {
  "ACTIVO":"success",
  "PROCESO":"secondary",
  "CANCELAR":"dager"
}
const hideAlert = () => {
  setAlert(null);
};
        return(
            <>
            <PreciosViews
            showpr={showpr}
            setShowpr={setShowpr}
            valores={valores}
            />
              {alert}
            <div className="d-flex  justify-content-between  ">
              <h5 style={{fontSize:'1.5em'}}>Evento {evento.nombreConcierto} <Badge bg={color[evento.estado?evento.estado:"danger"]}>{evento.estado}</Badge>  </h5> 
              <div className="d-flex flex-row">
              <button className="btn btn-warning txt-white" onClick={()=>successAlert("ACTIVO")} >ACTIVAR </button>
              <button className="btn btn-secondary txt-white mx-1" onClick={()=>successAlert("PROCESO")} >PROCESO</button>
              {evento.codigoEvento!="CANCELAR"?<button className="btn btn-danger txt-white mx-1" onClick={()=>successAlert("CANCELADO")} >Cancelar</button>:""}
              </div>

            </div>
            <div className="conatiner row">
            <div className="row mx-auto p-0">
                <div className="col-12 col-md-6 col-lg-4 col-xl-4 mx-auto my-5" id="evento2">
                <a href="#" onClick={()=>setOpen(!open)}>
                    <div className="container rounded-7 shadow-md px-0">
                      <img src={evento.imagenConcierto?evento.imagenConcierto:''} className="img-fluid rounded-7 shadow-md " alt="" />
                    </div>
                  </a>
                  <Collapse in={open} >
                  <div className=" container mt-4 px-0" id="collapseExample2">
                    <div className="card card-body rounded-7 py-5">
                      <div className="container">
                        <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold"> {evento.nombreConcierto}</span> </h1>
                        <h4 style={{ fontSize: '1.4em' }}><span id="tour">{evento.descripcionConcierto} </span></h4>
                        <div className="col-12 border border-bottom my-3"></div>
                        <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento"> {GetDay(evento.fechaConcierto) +' '+ evento.fechaConcierto}</span></p>
                        <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento">{evento.lugarConcierto}</span></p>
                        <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span >{evento.horaConcierto}</span></p>
                        <button className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => setShow(true)} >Editar</button>
                      </div>
                    </div>
                  </div>
                  </Collapse>

                </div>
                <div className="col-12 col-lg-8 mx-auto my-5" id="evento4">
                     <Accordion defaultActiveKey="0" flush>
                        {precios.length>0?
                        precios.map((e,i)=>{
                            return(
                            <Accordion.Item eventKey={i} key={i}>
                            <Accordion.Header>Localidad: {e.localodad}</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex flex-row  justify-content-between">
                                <div className="d-flex flex-column">
                                <div>
                                    <h5 >
                                        Precio normal : {e.precio_normal}
                                    </h5>
                                </div>
                                <div>
                                    <h5>
                                        Precio discapacida : {e.precio_discapacidad}
                                    </h5>
                                </div>
                                <div>                            
                                    <h5>
                                        Precio TC/TD : {e.precio_tarjeta}
                                    </h5>
                                </div>
                                <div>
                                <h5>
                                    Precio Descuento : {e.precio_descuento}
                                </h5>
                                </div>
                                <div>
                                    <h5>
                                    Habilitar Cortesia : {e.habilitar_cortesia}
                                    </h5>
                                 </div>    
                                </div>
                                <div className="d-flex flex-column ">
                                    <button className="btn btn-danger"
                                    onClick={()=>successAlertElimna(e.codigoEvento,e.localodad)}
                                    >Eliminar </button>                                    
                                </div>
                                </div>
                                
                          
                            </Accordion.Body>
                        </Accordion.Item>                      

                            )
                        })
                        :''
                        
                        }
                        
                        </Accordion>
                </div>
              </div>
            </div>
            <div className="card">
                <div className="card-header pb-2">
                    <h5>Tickets</h5>
                </div>
            <MaterialReactTable
                    columns={columnsTicket}
                    data={[]}
                    enableRowSelection
                    muiTableProps={{
                      sx:{
                        tableLayout:'flex'
                      }
                    }}
                    initialState={
                      {
                        columnVisibility:{ciudad:false,concierto:false,protocol:false,link:false,qr:false}
                      }
                    }
                    muiTableBodyProps={{
                      sx:{ columnVisibility:{nombre:false}}
                    }}
                    renderDetailPanel={({row})=>(
                      <Box 
                      sx={{
                        display:'flex flex-column',
                        margin:'auto',
                        gridTemplateColumns:'1fr 1fr',
                        width:'100%',
                      }}
                      >
                       
                        <Typography>ciudad : {row.original.ciudad} </Typography>
                        <Typography>Concierto : {row.original.concierto} </Typography>
                        <Typography>Protocolo : {row.original.protocolo} </Typography>                        
                        <Typography>link : {row.original.link} </Typography>
                        <Typography>QR : {row.original.qr} </Typography>
                        

                      </Box>
                    )}
                   
                    enableRowActions
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex' }}>
                          <IconButton 
                          color="success"     
                          arial-label="Enviar"                     
                          >
                            <Share/>
                          </IconButton>
                          <IconButton  
                          color="error"
                          aria-label="Bloquear" 
                          >
                          <Delete/>
                          </IconButton>
                          
                        </Box>
                      )}
                    positionToolbarAlertBanner="bottom"
                    displayColumnDefOptions={{
                        'mrt-row-numbers': {
                          enableHiding: true, //now row numbers are hidable too
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
                          disabled={
                            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                          }
                           onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                          startIcon={<FileDownloadIcon />}
                          
                        >
                          Export Fila Seleccionada
                        </Button>
                      </Box>
                    )}
                    localization={MRT_Localization_ES }                    
                />
             </div>

            <Modalupdate
             show={show}
             Setshow={setShow}
             evento={evento}
            />

            </>
        )


}

export default EventoEspecifico