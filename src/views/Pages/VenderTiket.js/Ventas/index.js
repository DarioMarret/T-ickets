import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { GetMetodo } from "utils/CarritoLocalStorang";
import { mikroAxios } from "utils/index";

function ventasView() {
    let [datos, setDausuario] = useState({
        nombreCompleto: '',
        ciudad: '',
        email: '',
        movil: '',
        resgistro: '',
        password: ''
    })
    let [evento, setEvento] = useState([])
    let { id } = useParams()
    const [listaPrecio, ListaPrecioset] = useState({
        total: 0,
        subtotal: 0,
        comision: 0,
        comision_bancaria: 0,
        desc: 0,
        iva: 0,
        desctc: 0
    })
    const [hidecomision, sethideComision] = useState("d-none")
    function handelChange(e) {
        console.log(e)
    }

    const ObtenerEventos = async () => {
        try {
            let { data } = await mikroAxios.get("Boleteria/Eventos/" + id)
            console.log(data)
            setEvento(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    function buscarsuscritor() {

    }

    useEffect(() => {
        console.log(id)
        ObtenerEventos()
    }, [])
    return (
        <>
            <div className=" container-fluid">
                <div className="">
                    <form id="register" className=" needs-validation  " onSubmit={(e) => e.preventDefault()}  >
                        <div className="row">
                            <div className="col-12 mb-3">
                                <div className=" d-flex  justify-content-end">

                                    <button className="btn btn-danger mx-3" onClick={buscarsuscritor}> <i className=" fa fa-search"></i> Buscar cliente </button>
                                    {
                                        !datos.resgistro ? <button className="d-none btn btn-success "  ><i className="fa fa-search "></i> Buscar cédula </button> : ''
                                    }
                                    {!datos.resgistro ? <button className="btn btn-success ml-3"  ><i className=" fa fa-plus-circle"></i> CREAR </button> :
                                        <button className="btn btn-primary"  > <i className=" fa fa-check-circle"></i> </button>}
                                </div>
                            </div>

                            <div className="co-6 ">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input id="cedula" type="text"
                                        className="form-control numero"
                                        name="cedula"
                                        minLength={10}
                                        onChange={() => setDausuario({
                                            nombreCompleto: '',
                                            ciudad: '',
                                            email: '',
                                            movil: '',
                                            resgistro: ''
                                        })}
                                        placeholder={ "Ingrese su número de identificación"} required />
                                </div>
                            </div>


                          
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6 ">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        id="nombreCompleto"
                                        value={""}
                                        name="nombreCompleto"
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Ingrese su nombres completos" required />
                                    <div className="invalid-feedback">
                                        Ingrese sus nombres

                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-lg-6  ">
                                <div className="input-group mb-3  px-0 d-flex justify-content-center ">
                                    <div className="input-group mb-3" >
                                        <div className=" input-group-prepend">
                                            <span className=" input-group-text"> <i className="fa fa-phone
                                            "></i> </span>
                                        </div>
                                        <input
                                            name="movil" type="tel"
                                            className="m-0 form-control form-control-sm" id="movil"
                                            size={100}

                                            required

                                            placeholder="999 999 999" />

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="input-group mb-3" >
                                    <div className=" input-group-prepend">
                                        <span className=" input-group-text"> <i className="fa fa-map-marker"></i> </span>
                                    </div>
                                    <input type="text"
                                        className="form-control form-control-sm"
                                        id="ciudad"
                                        name="ciudad"
                                        maxLength={255}
                                        required
                                        value={datos.ciudad}
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Ingrese ciudad"
                                    />
                                    <div className="invalid-feedback">
                                        Ingrese una direccion

                                    </div>
                                </div>

                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                    </div>

                                    <input id="email" type="email" className="form-control" name="email"
                                        value={datos.email}
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Email" />
                                    <div className="invalid-feedback">
                                        Correo incompleto

                                    </div>

                                </div>
                            </div>

                        </div>




                    </form>
                </div>
                <table className="resumen-table table  table-responsive">
                    <thead>
                        <tr className="text-black">
                            <th scope="col" className="text-black">CONCIERTO</th>
                            <th className="text-black">LOCALIDAD</th>

                            <th className="text-black" scope="col">Disponible</th>

                            <th className="text-black text-end " scope="col">cantidad</th>
                            <th className="text-black text-end " scope="col">TOTAL</th>
                            <th className="text-black text-end" scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            evento.length > 0 ?
                                evento.map((item, index) => {
                                    let tipo = String(item.mesas_array).replace('""',"")
                                    return (
                                        <tr key={index}>
                                            <td className="align-self-center">{item.nombreConcierto}</td>
                                            <td className="align-self-center">{item.localidad}</td>
                                            
                                            <td className="align-self-center">{item.total}</td>
                                            <td className=" text-end"><input id="" type="number" disabled="true" size={2} /></td>
                                            <td className=" text-end">{parseFloat(item.valor)*parseInt(item.cantidad)}</td>
                                            <td className="align-self-center text-end">
                                                {
                                                    (tipo =='correlativo')?
                                                    <div>
                                                            <div className="btn-group btn-group-sm" role="group">
                                                             
                                                                <button className="suma   btn-success "

                                                                >
                                                                    <i className="fa fa-plus"></i>
                                                                </button>
                                                                <button className="suma   btn-danger "

                                                                >
                                                                    <i className="fa fa-plus"></i>
                                                                </button>
                                                        </div>
                                                        </div> :
                                                    <button className=" btn-sm btn-success">Seleccionar</button>
                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                                : <tr></tr>
                        }
                    </tbody>
                </table>
                <div>
                    <table className="table table-borderless " style={{
                        lineHeight: 1
                    }}>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td className='text-end' >Subtotal:</td>
                                <td className='text-center'>${parseFloat(listaPrecio.subtotal).toFixed(2)}</td>
                            </tr>
                            <tr className={hidecomision}>
                                <th scope="row"></th>
                                <td className={hidecomision + " text-end"} >Comisión Bancaria:</td>
                                <td className={hidecomision + " text-center"}>${parseFloat(listaPrecio.comision_bancaria).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td className='text-end' >Servicio Em. por Boleto:</td>
                                <td className='text-center'>${parseFloat(listaPrecio.comision).toFixed(2)}</td>
                            </tr>
                            <tr className=''>
                                <th scope="row"></th>
                                <td className='text-end' >Iva %:</td>
                                <td className='text-center'>${parseFloat(listaPrecio.iva).toFixed(2)}</td>
                            </tr>
                            <tr>

                                <th scope="row"></th>
                                <td className='text-end' >Total</td>
                                <td className='text-center'>${parseFloat(listaPrecio.total).toFixed(2)}</td>
                            </tr >
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}
export default ventasView