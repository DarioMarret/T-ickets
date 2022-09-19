import React from "react";



const EventosViews =()=>{
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

                <table className="table table-hover text-center">
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
                </table>
            </div>
        </div>
    </div>
</div>
            </div>
)
}

export default EventosViews;