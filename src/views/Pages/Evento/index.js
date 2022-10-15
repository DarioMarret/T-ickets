import React ,{useEffect,useState}from "react";
import { Card,Col,Row ,Modal } from "react-bootstrap";
import ModalNewEvento from "./MODAL/ModalnewEvento";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit,Delete,Visibility } from '@mui/icons-material';
import {ListarLocalidad,ListarEspacios,ListarEventos } from "utils/Querypanel.js";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Columnevento } from "utils/ColumnTabla";
import { EliminarEvento } from "utils/Querypanel";
import { useHistory } from "react-router";

const EventosViews =()=>{
  let history = useHistory()
  const[show,setShow] = useState(false)
  const [eventoslist,setEventos]=useState([])
  const [alert,setAlert] = React.useState(null)

 function nuevoevento(){
  setShow(true)
 }  
  
 async function GetEventos(){
  try {
    const lista = await ListarEventos("PROCESO")
    if(lista.success){
      let arr = []
      console.log(lista)
      arr.push(lista.data)
      setEventos(arr)
      console.log(arr)
    }
   // console.log(lista)
  } catch (error) {
    
  }
 }
 async function Elimna(e){
  try {
    /*
   const elimina = await EliminarEvento(e)*/
   console.log(e)
   successDelete()
   
  } catch (error) {
    
  }
 }


 const successAlert = (e) => {
  setAlert(
    <SweetAlert
      warning
      style={{ display: "block", marginTop: "-100px" }}
      title="Estas Seguro?"
      onConfirm={() => Elimna(e)}
      onCancel={() => cancelDetele()}
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      confirmBtnText="Confirmar"
      cancelBtnText="Cancelar"
      showCancel
    >
      Esta seguro de eliminar este evento
    </SweetAlert>
  );
};
const successDelete = () => {
  setAlert(
    <SweetAlert
      success
      style={{ display: "block", marginTop: "-100px" }}
      title="Eliminado!"
      onConfirm={() => hideAlert()}
      onCancel={() => hideAlert()}
      confirmBtnBsStyle="success"
    >
      El evento se elimino correctamenta
    </SweetAlert>
  );
};
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
const hideAlert = () => {
  setAlert(null);
};

 useEffect(()=>{
        (async()=>{
          await GetEventos()
                
        })()

 },[show])
    return(
      
        <div className="container-fluid">
          {alert}
          <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Number</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <Card.Title as="h4">+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          </Row>
          <div className="row">             
                    <div className="col-md-12">
                        <button  className="btn btn-success" onClick={nuevoevento}><i className="mr-2 fa fa-plus"></i> Nuevo evento</button>
                        <br/><br/>
                        <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Eventos
                            </div>                            
                            <div className="">
                            <MaterialReactTable
                                    columns={Columnevento}
                                    data={eventoslist}                                  
                                    muiTableProps={{
                                      sx:{
                                        tableLayout:'flex'
                                      }
                                    }}                                           
                                    enableRowActions
                                    renderDetailPanel={({row})=>(
                                      <Box 
                                      sx={{
                                        display: 'grid',
                                        margin: 'auto',
                                        gridTemplateColumns: '1fr 1fr',
                                        width: '100%',
                                      }}
                                      >
                                       
                                        <Typography>Estado : {row.original.estado} </Typography>
                                        <Typography>Ciudad : {row.original.cuidadConcert} </Typography>
                                        <Typography>Descripción : {row.original.descripcionConcierto} </Typography>                        
                                        <Typography>Total Localidad : {row.original.LocalodadPrecios.length} </Typography>                        
                                      
                                        
                
                                      </Box>
                                    )}
                                    renderRowActions={({ row }) => (
                                      <Box sx={{ display: 'flex' }}>
                                      <IconButton  
                                      color="error"
                                      aria-label="Bloquear" 
                                      onClick={()=>successAlert(row.original.codigoEvento)}
                                      >
                                      <Delete/>
                                      </IconButton>
                                      <IconButton  
                                      color="primary"
                                      aria-label="Ver" 
                                      onClick={()=>history.push("/admin/Eventos/"+row.original.codigoEvento)}
                                      >
                                      <Visibility/>
                                      </IconButton>
                                      
                                      
                                    </Box>                                  
                                      )}
                                    positionToolbarAlertBanner="bottom"                                  
                                    localization={MRT_Localization_ES }                                    
                                />
                                
                            </div>
                        </div>
                    </div>
                </div>
                <ModalNewEvento
              show={show}
              Setshow={setShow}
              />
            </div>
    )

}
export default EventosViews;