import React from "react";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Badge } from "@mui/material";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { PickersDay } from "@mui/x-date-pickers";
import TextField from '@mui/material/TextField';
import moment from "moment";
// react component used to creat
// react-bootstrap components
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate()+2;
import {
  Card,
  Container,
  Row,
  Col
} from "react-bootstrap";

function Dashboardsub() {
  const [value, setValue] = React.useState( Date(y, m, d ));

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6" >
            <Card className="card-stats ">
              <Card.Body>
                <Row className="">
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-headphones-2 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Boletos</p>
                      <Card.Title as="h4">150</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-music mr-1"></i>
                  Boletos
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-cart-simple text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Compras</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Total Compras
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                <Col xs="7">
                    <div className="">
                    <Card.Title as="h4">Bienvenido a su Panel </Card.Title>
                      <p className="card-category">Nombre de usuario </p>
                      
                    </div>
                  </Col>
                  <Col xs="5">
                    <div className="icon-big text-center ">
                      <i className="nc-icon nc-satisfied text-danger"></i>
                    </div>
                  </Col>
                 
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock mr-1"></i>
                  Hora de inicio Sección 26/09/2022 19:00
                </div>
              </Card.Footer>
            </Card>
          </Col>
         
        </Row>
       <Row>
        <Col md="8" sm="12" xl="6" xs="12" className="pb-2">
        <div className="header text-center ">
        <LocalizationProvider dateAdapter={AdapterMoment} >
        <StaticDatePicker
        orientation="landscape"
        label={"Nuevos Eventos"}
        openTo="day"
        value={value}
        minDate={new Date()}
        hideTabs={false}componentsProps={{
          actionBar: {
            actions: [''],
          },
        }}
        minDateTime={today}
        renderDay={(day,value,DayComponentProps)=>{
          const isDate =moment(DayComponentProps.key).format('MM/DD/YYYY')=== moment("Thu Sep 29 2022 00:00:00 GMT-0500").format('MM/DD/YYYY');
            return(
              <Badge key={day.toString()}
              overlap="circular"
              badgeContent={isDate? '' :''}              
              >
             
                <PickersDay {...DayComponentProps}/>
                <span hidden={!isDate} className="position-absolute bottom-0 start-50 translate-middle p-1 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">New alerts</span>
                </span>
               
              </Badge>
              
            )

                }

        }
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
        </div>
        </Col>
      </Row>
       
       
       
      </Container>
    </>
  );
}

export default Dashboardsub;
