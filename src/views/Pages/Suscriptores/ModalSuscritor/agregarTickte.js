import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";



export default function ModalTickte({ shows, datosperson, setshows }) {

    let [info, setInfo] = useState({
        localidad: "",
        metodo: "",
        cantidad: "",
        protocolo: ""
    })
    let [localid,setLoacli]=useState([])
    function handelchnge(e) {
        setInfo({
            ...info,
            [e.name]: e.value
        })
    }
    let [spiner, setSpiner] = useState(false);
    function Summit() {
        console.log(info)
        if (Object.values(info).some(e => e == "")) {
            $.alert("Agrega los datos faltantes");

            return
        }
        setSpiner(true)
        Reserva().then(ouput => {
            console.log(ouput)
            if (ouput[0].token_ocupadas.includes("solicita")) {
                $.alert("Localidad Agotada" + ouput[0].token_ocupadas);
                setSpiner(false)
                return
            }
            console.log(ouput[0].token_ocupadas)
            Pagartickt(ouput[0].token_ocupadas, ouput[0].total).then(salida => {
                console.log(salida[0].estado, salida[0].link_factura)
                let info = !salida[0].qr_factura ? "" : salida[0].qr_factura
                $.alert("" + salida[0].estado + " " + info);
                var win = window.open(salida[0].link_factura, '_blank');
                if (salida[0].link_factura != undefined) {
                    Endpoitnuevo({
                        "cedula": datosperson.cedula,
                        "link_external": salida[0].link_factura,
                        "observacion": "Urban fest 2 tickefacil"
                    }).then(ou => {
                        console.log(ou)
                        setshows(false)
                        win.focus();
                    }).catch(err => {
                        console.log(err)
                    })
                    return
                }
                // Cambiar el foco al nuevo tab (punto opcional)

                //$.alert("" + salida[0].link_factura);
            }).catch(err => {
                console.log(err)
                setSpiner(true)
            })


        }).catch(err => {
            console.log(err)
        })
    }
    //https://server1.ticketfacil.ec/ticket2/ajax.pventa.php?api_wts=ticketfacil_api&action=get&typedata=evento_valores&data=1102||13782||3||2"
    const Reserva = async () => {
        try {
            let { data } = await axios.get("https://server1.ticketfacil.ec/ticket2/ajax.pventa.php?api_wts=ticketfacil_api&action=get&typedata=evento_valores&data=1102||" + info.localidad + "||" + info.metodo + "||" + info.cantidad + "")

            return data
        } catch (error) {
            return error
        }
    }
    //"https://server1.ticketfacil.ec/ticket2/ajax.pventa.php?api_wts=ticketfacil_api&action=create&typedata=factura_api&data=CISNEROS LOPEZ JENIFFER ELIZABETH||jennyfer.cisneros@hotmail.com||1723444285||992877204||2023041000161||54.50||79110216819188621378254$$21||1102||13782||2"
    const Pagartickt = async (token, valor) => {
        try {
            let { data } = await axios.get("https://server1.ticketfacil.ec/ticket2/ajax.pventa.php?api_wts=ticketfacil_api&action=create&typedata=factura_api&data=" + datosperson.nombreCompleto + "||" + datosperson.email + "||" + datosperson.cedula + "||" + datosperson.movil + "||" + info.protocolo + "||" + valor + "||" + token + "||1102||" + info.localidad + "||" + info.cantidad + "")
            return data
        } catch (error) {
            return error
        }
    }
    const Endpoitnuevo = async (parms) => {
        try {
            let { data } = await axios.post("https://api.t-ickets.com/ms_login/set_link_external_tickets", parms, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='

                }
            }
            )
            return data
        } catch (error) {
            return error
        }
    }
    useEffect(() => {
        axios.get("https://api.t-ickets.com/mikroti/api/listApi/GetLocalidad").then(sali => {
            console.log(sali)
            if(sali.status==200){
                setLoacli(sali.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [shows])
    return (
        <>
            <Modal
                show={shows}
                onHide={() => setshows(false)}
            >
                <Modal.Header>
                    <h5 className="modal-title text-center py-3 justify-content-center">Agregar Urban </h5>
                    <button className="close" onClick={() => setshows(false)}>X</button>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-map"></i></span>
                                        </div>
                                        {localid.length > 0 ? <select className=" form-select" name="localidad" id="localidad"
                                            onChange={(e) => handelchnge(e.target)}
                                            value={info.localidad}
                                        >
                                            <option value="" >
                                                Seleccione la localidad
                                            </option>
                                            {localid.map(e=>{
                                                return(
                                                    <option value={e.id} key={"nmu"+e.id} disabled={(e.disponibilidad<1)}>
                                                        {e.nombre + " / " + "Dispo:" + e.disponibilidad + " $" + e.subtotal}
                                                    </option>
                                                )
                                            })}
                                          
                                        </select> :   <select className=" form-select" name="localidad" id="localidad"
                                            onChange={(e) => handelchnge(e.target)}
                                            value={info.localidad}
                                        >
                                            <option value="" >
                                                Seleccione la localidad
                                            </option>
                                            <option value="13782">
                                                GENERAL PREVENTA
                                            </option>
                                            <option value="13788">
                                                GOLDEN BOX PREVENTA
                                            </option>
                                            <option value="13780">
                                                OLD SCHOOL BOX PREVENTA
                                            </option>
                                            <option value="13789">
                                                PALCO PREVENTA
                                            </option>
                                            <option value="13802">
                                                PREFERENCIA PREVENTA
                                            </option>
                                            <option value="13806">
                                                TRIBUNA PREVENTA
                                            </option>
                                            <option value="13805">
                                                URBAN BOX PREVENTA
                                            </option>
                                        </select>}
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-money"></i></span>
                                        </div>
                                        <select className=" form-select" name="metodo" id="metodo"
                                            onChange={(e) => handelchnge(e.target)}
                                            value={info.metodo}
                                        >
                                            <option value="">
                                                Seleccione froma de pago
                                            </option>
                                            <option value="1">
                                                Tarjeta
                                            </option>
                                            <option value="3">
                                                Transferencia
                                            </option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-plus"></i></span>
                                        </div>
                                        <input
                                            id="cantidad"
                                            value={info.cantidad}
                                            onChange={(e) => handelchnge(e.target)}
                                            type="number"
                                            placeholder="Cantidad"
                                            className="form-control"
                                            name="cantidad"
                                            required />
                                    </div>
                                </div>
                                <div className="col-md-12 d-flex justify-content-center">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-search"></i></span>
                                        </div>
                                        <input id="cedula"
                                            type="text"
                                            className="form-control numero"


                                            value={datosperson.cedula}
                                            name="cedula"
                                            minLength={10}
                                            required />
                                        <div className="invalid-feedback">
                                            Ingrese una cédula
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-12">
                                    <label className="form-label"><b>Correo</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                        </div>
                                        <input id="email"
                                            value={datosperson.email}
                                            className="form-control"
                                            name="email"
                                            required />
                                        <div className="invalid-feedback is-invalid">
                                            Ingrese una Dirección de correo
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label"><b>Nombres</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input id="nombreCompleto"
                                            type="text"
                                            value={datosperson.nombreCompleto}
                                            className="form-control"
                                            name="nombreCompleto"
                                            required />
                                        <div className="invalid-feedback">
                                            Ingrese Nombre
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="form-label"><b>Celular</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                        </div>
                                        <input id="movil"
                                            value={datosperson.movil}
                                            type="text"
                                            className="form-control"
                                            name="movil"
                                            minLength={10}
                                            required />
                                        <div className="invalid-feedback">
                                            Ingrese un numero de contacto
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label"><b>Control o protocolo</b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-map"></i></span>
                                        </div>
                                        <input id="protocolo"
                                            onChange={(e) => handelchnge(e.target)}
                                            value={info.protocolo}
                                            type="text"
                                            className="form-control"
                                            name="protocolo"
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            Ingrese numero de control
                                        </div>

                                    </div>
                                </div>


                            </div>




                        </form>
                        <div className="d-flex flex-wrap  justify-content-end ">


                            {!spiner ? <button className="btn btn-success float-right" onClick={Summit} >Agregar</button> : ""}


                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}