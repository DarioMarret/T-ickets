import { useEffect, useState } from "react";
import { listarpreciolocalidad } from "utils/Querypanel";
import { EventosActivos } from "utils/Querypanel";
import ModalPromotor from "./ModalPromotor";

export default function AutorizacionView() {
    const [Eventos, setEventos] = useState([])
    const [Precios, setPrecios] = useState([])
    const [show,setShow]= useState(false)
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
        <ModalPromotor
        show={show}
        setShow={setShow}
        />
            <div className=" container-fluid">
                <div className="mb-2">
                    <button className="btn  btn-success" onClick={() => setShow(true)}> <i className=" fa fa-plus"></i> Agregar Promotor</button>
                </div>
               <div>
                
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