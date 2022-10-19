import React ,{useEffect,useState}from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit,Delete,Visibility } from '@mui/icons-material';
import { Card,Col,Row  } from "react-bootstrap";
import { GetSuscritores,EliminarSuscrito } from "utils/Querypanel";
import ModalSuscritoView from "./ModalSuscritor";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Columnasubcrito } from "utils/ColumnTabla";

const SuscritorViews =()=>{
  let usehistory=useHistory()
    const[show,setshow] = useState(false)
    const [suscritores,setsuscritor]=useState([])
    const[suscritor,setSuscri]=useState({})
    
    const [estado,setEstado] =useState("")

    const [alert,setAlert] = React.useState(null)
    const newsuscrito=()=>{
      setEstado("")
    setshow(true)}
    const selelccionasuscrito=(e)=>{
      
      setEstado("update")
      setSuscri(e)
      setshow(true)
    }

 const nuevoevento = async ()=>{
  try {
    const  data  = await GetSuscritores()
    if(data.users.length>0){
    //  console.log(data.users)
      setsuscritor(data.users)

    }
  } catch (error) {
    console.log(error)
  }
 }
 const Eliminasucrito=async(id)=>{
  try {
    const elimna = await EliminarSuscrito(id)
    let lista =suscritores.filter(e=>e.id!=id) 
    const { success,message} =elimna
     if(success){
    setsuscritor(lista)         
    successDelete()
  }
    
  } catch (error) {
    console.log(error)
    
  }

 }
 const successAlert = (e) => {
  setAlert(
    <SweetAlert
      warning
      style={{ display: "block", marginTop: "-100px" }}
      title="Estas Seguro?"
      onConfirm={() => Eliminasucrito(e)}
      onCancel={() => cancelDetele()}
      confirmBtnBsStyle="success"
      cancelBtnBsStyle="danger"
      confirmBtnText="Confirmar"
      cancelBtnText="Cancelar"
      showCancel
    >
      Esta seguro de eliminar este Suscritor
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
      El suscritor se elimino correctamenta
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
 React.useEffect(() => {
  (async () => {
    await nuevoevento()
  })()
}, [])
 
    return(
        <div className="container-fluid">
          {alert}            
          <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="4">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="8">
                    <div className="numbers">
                      <p className="card-category">Total Suscritores</p>
                      <Card.Title as="h4">{suscritores.length}</Card.Title>
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
                        

                        <button  className="btn btn-success" onClick={newsuscrito}><i className="mr-2 fa fa-plus"></i> Nuevo Suscritores</button>

                        <br/><br/>

                        <div className="card card-primary card-outline text-left">
                            <div className="card-header">
                                Suscritos
                            </div>
                            <div className="">
                            <MaterialReactTable
                                    columns={Columnasubcrito}
                                    data={suscritores}
                                  
                                    muiTableProps={{
                                      sx:{
                                        tableLayout:'fixed'
                                      }
                                    }}                                        
                                    enableRowActions
                                    renderRowActions={({ row }) => (
                                        <Box sx={{ display: 'flex' }}>
                                          <IconButton 
                                          color="error"  
                                          onClick={()=>usehistory.push("/admin/suscritor/"+row.original.id+"")}
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
                <ModalSuscritoView
                show={show}
                setshow={setshow}
                estado={estado}
                datosperson={suscritor}
                />
               
            </div>
    )

}
export default SuscritorViews;