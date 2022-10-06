import React, { useEffect, useState } from "react";
import { ListarTikets } from "utils/Querypanel";
import ReactTable from "components/ReactTable/ReactTable.js";
import { Button } from "react-bootstrap";
const EventosViews =()=>{
    const [TiktesList,setTikes]=useState([])
        async function ConsultarTikets(){
            try {
                const Datos = await ListarTikets()
                const infor = Datos.data.map((e,i)=>{
                    return {
                        id: e.id,
                        nombre: e.nombre,
                        cedula: e.cedula,
                        celular:e.celular,
                        fecha:e.actual,
                        ciudad: e.cuidadconcert,
                        concierto: e.nombreconcert,
                        protocolo:e.protocol,
                        link:e.link,
                        qr:e.qr,
                        actions: (
                            <div className="container actions-right pl-2">                             
                              <Button
                                onClick={() => {
                                  let obj = e.id;
                                  alert(
                                    "Se selecciono a: " +e.nombre + " Tabla de prueba"
                                  );
                                }}
                                variant="warning"
                                size="sm"
                                className="text-warning btn-link edit"
                              >
                                <i className="fa fa-edit" />
                              </Button>{" "}
                              
                              <Button
                                variant="danger"
                                size="sm"
                                className="btn-link remove text-danger"
                              >
                                <i className="fa fa-times" />
                              </Button>{" "}
                            
                            </div>
                          ),
                       
                      };
                })
                setTikes(infor)
            } catch (error) {
                console.log(error)
                
            }
         
        }
       

    useEffect(()=>{
        (async()=>{
            await ConsultarTikets()
        })()
       // console.log(TiktesList)

    },[])
return(
    <div className="container-fluid">
                
<div className="row">
    <div className="col-md-12">
      
        <div className="card text-left">
            <div className="card-header">
                Mis Tickets
            </div>
            <div className="card-body">

                <div className="collapse.show container mt-4 px-0" id="collapseExample">
                    <div className="card card-body rounded-7 py-5">
                      <div className="container">
                        <h1 style={{fontSize: '1.6em'}}><span id="artista" className="fw-bold">Daddy Yankee</span> | <span id="tour">Tour Legendaddy</span></h1>
                        <div className="col-12 border border-bottom my-3"></div>
                        <p style={{fontSize: '1.2em'}}><b>Fecha:</b><span id="fechaEvento"> Miercoles 28-10-2022</span></p>
                        <p style={{fontSize: '1.2em'}}><b>Lugar:</b><span id="lugarEvento"> Estadio Alberto Spencer</span></p>
                        <p style={{fontSize: '1.2em'}}><b>Hora:</b><span id="horaEvento"> 22:30</span></p>
                        <a  className="btn btn-primary fw-bold px-3 py-2 rounded-6">Comprar Entrada</a>
                      </div>
                    </div>
                  </div>
                  <ReactTable
      data={TiktesList}
     
      columns={[
        {
          Header: "Nombre",
          accessor: "nombre",
          isVisible: true,
        },
        {
          Header: "Cédula",
          accessor: "cedula",
          isVisible: true,
        },
        {
          Header: "Fecha",
          accessor: "fecha",
          isVisible: true,
        },
        {
          Header: "Lugar",
          accessor: "ciudad",
          isVisible: true
          
        },
        {
          Header: "Concierto",
          accessor: "concierto",
          isVisible: true
          
        }, {
            Header: "Protocolo",
            accessor: "protocolo",
            isVisible: true
            
          },
           {
            Header: "Qr",
            accessor: "qr",
            isVisible: true
            
          }, {
            Header: "Link",
            accessor: "link",
            isVisible: true
            
          },
        {
          Header: "Acciones",
          accessor: "actions",
          isVisible: true,
          sortable: false,
          filterable: false,
        },
      ]}     
      
      
      
      /*
        You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
      
      className="-striped -highlight success-pagination"*/
    /> 

                {/*<table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th scope="col">Evento</th>
                            <th scope="col">Ticket</th>
                            <th scope="col">Forma de pago</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Descargar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Evento 1</th>
                            <td>1</td>
                            <td>Otto</td>
                            <td><span className="badge me-1 bg-success text-white">Emitido</span></td>
                            <td><a href="#">Descargar</a></td>
                        </tr>
                        <tr>
                            <th scope="row">Evento 2</th>
                            <td>2</td>
                            <td>Thornton</td>
                            <td><span className="badge me-1 bg-danger text-white">Usado</span></td>
                            <td><a href="#">Descargar</a></td>
                        </tr>
                        <tr>
                            <th scope="row">Evento 3</th>
                            <td>3</td>
                            <td>Thornton</td>
                            <td><span className="badge me-1 bg-dark text-white">Anulado</span></td>
                            <td><a href="#">Descargar</a></td>
                        </tr>
                    </tbody>
                </table>*/}
            </div>
        </div>
    </div>
</div>
            </div>
)
}

export default EventosViews;