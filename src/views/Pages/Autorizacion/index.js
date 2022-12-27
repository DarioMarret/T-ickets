import { useEffect, useState } from "react";
import { listarpreciolocalidad } from "utils/Querypanel";
import { EventosActivos } from "utils/Querypanel";

export default function AutorizacionView() {
    const [Eventos, setEventos] = useState([])
    const [Precios, setPrecios] = useState([])
    function handelChange(e) {
        listarpreciolocalidad(e.value).then(oupt => {
            setPrecios(oupt.data)
            //console.log(oupt)
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        EventosActivos().then(oupt => {
            setEventos(oupt.data)
            //   console.log(oupt)
        }).catch(err => console.log(err))
    }, [])
    return (
        <>
            <div className=" container">

                <div className=" row">
                    <div className="card">
                        <div className=" card-body">
                            <div className="col-md-12">
                                <label for="validationCustom04" className="form-label">Seleccionar Evento</label>
                                <select className="form-select" id="validationCustom04" onChange={(e) => handelChange(e.target)} required>

                                    <option selected value="" >Eventos</option>
                                    {Eventos.length > 0 ?
                                        Eventos.map((e, i) => {
                                            return (
                                                <option key={i} value={e.codigoEvento}> {e.nombreConcierto}  </option>
                                            )
                                        }) : ''

                                    }

                                </select>
                            </div>

                        </div>


                    </div>

                </div>
                <div className="row card">
                    <div className=" card-header">
                        <h5>Datos del Promotor</h5>

                    </div>
                    <div className="col-12 card-body d-flex flex-row" style={{

                    }}>

                        <div className="">
                            <div className="row ">

                                <div className="col-md-4">
                                    <label for="validationCustom01" className="form-label">Nombre </label>
                                    <input type="text" className="form-control" id="validationCustom01" required />

                                </div>
                                <div className="col-md-4">
                                    <label for="validationCustom02" className="form-label">Ruc</label>
                                    <input type="text" className="form-control" id="validationCustom02" required />
                                    <div className="valid-feedback">
                                        Looks good!
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <label for="validationCustomUsername" className="form-label">Correo</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                        <input type="text" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required />
                                        <div className="invalid-feedback">
                                            Please choose a username.
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label for="validationCustom03" className="form-label">Dirección</label>
                                    <input type="text" className="form-control" id="validationCustom03" required />
                                    <div className="invalid-feedback">
                                        Please provide a valid city.
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label for="validationCustom04" className="form-label">telefono</label>
                                    <input className=" form-control" />
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>
                                </div>

                                <div className="col-12 py-3 d-flex  justify-content-end ">
                                    <button className="btn btn-primary" type="submit">Actualizar </button>
                                </div>


                            </div>
                        </div>

                        <div className="d-none pt-1">
                            <h5>Ruc:100215445555</h5>
                            <h5>Nombre</h5>
                            <h5>Direccion</h5>
                        </div>
                        <div className=" d-none px-1 mx-1">
                            <h5>Dato adicional</h5>
                        </div>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="card">
                        <div className=" card-body">
                            <div className="row">

                                <div className="col-md-12 py-3">
                                    <label for="validationCustom01" className="form-label">Precio</label>
                                    {
                                        Precios.length > 0 ?
                                            Precios.map((e, i) => {
                                                return (
                                                    <div className="row" key={i}>
                                                        <div className="col-12 col-md-4 d-flex align-items-center">

                                                            {e.localidad + " $" + e.precio_normal}
                                                        </div>
                                                        <div className=" col-12 col-md-8 row">
                                                            <div className="col-6 col-md-4"><label className="form-label">Autorización SRI</label>
                                                                <input className="form-control"></input></div>
                                                            <div className="col-6 col-md-2">
                                                                <label className="form-label">Boletaje</label>
                                                                <input className="form-control"></input>

                                                            </div>
                                                            <div className="col-6 col-md-3">
                                                                <label className="form-label">Fecha de Solicitud</label>
                                                                <input className="form-control"
                                                                    type="date"
                                                                ></input>

                                                            </div>
                                                            <div className="col-6 col-md-2">
                                                                <label className="  form-label">Boletos final</label>
                                                                <label>200</label>


                                                            </div>



                                                        </div>
                                                    </div>
                                                )

                                            })

                                            : ''}
                                </div>

                                <div className="col-12 pt-2 d-flex justify-content-end">
                                    <button className="btn btn-primary" type="submit">Submit form</button>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}