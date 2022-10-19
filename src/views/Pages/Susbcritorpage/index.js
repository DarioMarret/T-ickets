import React,{useState,useEffect} from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Badge } from "@mui/material";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { MonthPicker } from "@mui/x-date-pickers/MonthPicker";
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
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col
} from "react-bootstrap";

function Dashboardsub() {
  const [value, setValue] = React.useState( Date(y, m, d ));
   // "Mon Sep 29 2022 10:15:40 GMT-0500"
 // console.log(value)

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6" >
            <Card className="card-stats ">
              <Card.Body>
                <Row className="">
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
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
                    <div className="icon-big text-center icon-warning">
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
                    <div className="icon-big text-center icon-warning">
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
         // console.log(moment(DayComponentProps.key).format('MM/DD/YYYY'))

        // fechas.some(event => event.date ===  DayComponentProps.key).format('MM/DD/YYYY'));
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
       // shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
        </div>
        </Col>
        {/*<Col xl="4">
        <LocalizationProvider dateAdapter={AdapterMoment} >
        <MonthPicker
            date={value}
           onChange={(newDate) => setValue(newDate)}
         />

        </LocalizationProvider>
       
        </Col>*/}
      </Row>
       
        {/*<Row>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <ChartistGraph
                  className="ct-perfect-fourth"
                  data={{
                    labels: ["40", "20", "40"],
                    series: [40, 20, 40]
                  }}
                  type="Pie"
                />
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle mr-1 text-info"></i>
                  Open <i className="fas fa-circle mr-1 text-danger"></i>
                  Bounce <i className="fas fa-circle mr-1 text-warning"></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Users Behavior</Card.Title>
                <p className="card-category">24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <ChartistGraph
                  data={{
                    labels: [
                      "9:00AM",
                      "12:00AM",
                      "3:00PM",
                      "6:00PM",
                      "9:00PM",
                      "12:00PM",
                      "3:00AM",
                      "6:00AM",
                      ""
                    ],
                    series: [
                      [287, 385, 490, 492, 554, 586, 698, 695, 630],
                      [67, 152, 143, 240, 287, 335, 435, 437, 470],
                      [23, 113, 67, 108, 190, 239, 307, 308, 430]
                    ]
                  }}
                  type="Line"
                  options={{
                    low: 0,
                    high: 800,
                    showArea: false,
                    height: "245px",
                    axisX: {
                      showGrid: false
                    },
                    lineSmooth: true,
                    showLine: true,
                    showPoint: true,
                    fullWidth: true,
                    chartPadding: {
                      right: 50
                    }
                  }}
                  responsiveOptions={[
                    [
                      "screen and (max-width: 640px)",
                      {
                        axisX: {
                          labelInterpolationFnc: function (value) {
                            return value[0];
                          }
                        }
                      }
                    ]
                  ]}
                />
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle mr-1 text-info"></i>
                  Open <i className="fas fa-circle mr-1 text-danger"></i>
                  Click <i className="fas fa-circle mr-1 text-warning"></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>*/}
       
      </Container>
    </>
  );
}

export default Dashboardsub;
