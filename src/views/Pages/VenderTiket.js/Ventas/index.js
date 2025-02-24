import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { GetMetodo, GetValores, getVerTienda, TiendaIten, TotalSelecion } from "utils/CarritoLocalStorang";
import { mikroAxios } from "utils/index";
import { buscarcliente, correlativosadd } from "utils/Querypanelsigui";
import { useDispatch } from "react-redux"
import { clienteInfo, DatosUsuariosLocalStorag, getCedula, getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag";
import { DatosUsuariocliente, Eventolocalidad, Metodos } from "utils/constantes";
function ventasView() {
    let usedispatch = useDispatch()
    let [datos, setDausuario] = useState({
        nombreCompleto: '',
        ciudad: '',
        email: '',
        movil: '',
        resgistro: '',
        password: ''
    })

    const [check, setCheck] = useState(true)
    const [checked, setChecked] = useState({
        Efectivo: "",
        Fisico: "",
        Tarjeta: "",
        Deposito: "",
        Transferencia: ""
    })
    const [select, setSelecte] = useState("")
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
        let nombre = $('#cedula').val()
        let informacion = {
            "cedula": !isNaN(nombre.trim()) ? nombre.trim() : '',
            "email": isNaN(nombre.trim()) ? nombre.trim().replace(/"/g, '@') : ''
        }

        buscarcliente({ ...informacion }).then(ouput => {
            //  console.log(ouput)
            if (!ouput.success) {
                getCedula(nombre).then(salida => {
                    console.log(salida)
                    if (salida.success) {
                        usedispatch(setToastes({
                            show: true, message: ouput.message
                            , color: 'bg-warning', estado:
                                "No hubo ninguna coincidencia"
                        }))
                        setDausuario({
                            nombreCompleto: "",
                        })
                        return
                    }
                    else {
                        setDausuario({
                            ...datos,
                            nombreCompleto: salida.name,
                            email: salida.email != "null" ? salida.email : String(salida.name).replaceAll(" ", "") + "@gmail.com",
                            ciudad: id,
                            movil: salida.telefono ? salida.telefono : "0999999999",
                        })
                        DatosUsuariosLocalStorag({
                            ...datos,
                            nombreCompleto: salida.name,
                            email: salida.email ? salida.email : String(salida.name).replaceAll(" ", "") + "@gmail.com",
                            ciudad: id,
                            movil: salida.telefono ? salida.telefono : "0999999999",
                            password: salida.cedula
                        })
                        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({
                            ...datos,
                            nombreCompleto: salida.name,
                            email: salida.email ? salida.email : String(salida.name).replaceAll(" ", "") + "@gmail.com",
                            ciudad: id,
                            movil: salida.telefono ? salida.telefono : "0999999999",
                            password: salida.cedula
                        }))
                        //$('#movil').val("")
                        $("#search").addClass("d-none")
                    }
                }).catch(erro => {
                    console.log(erro)
                })


                return
            }
            else {
                setDausuario({
                    ...ouput.data
                })
                DatosUsuariosLocalStorag({ ...ouput.data })
            }

        }).catch(erro => {
            console.log(erro)
        })
    }
    const valores = JSON.parse(sessionStorage.getItem(Eventolocalidad))

    function restaprecio(e) {
        console.log("valores", valores)
        let mapath = { precio: valores.find(el => el.ideprecio == e.ideprecio) }
        console.log(mapath, e.ideprecio)

        let user = getDatosUsuariosLocalStorag()
        let producto = {
            cantidad: -1,
            localidad: mapath.precio.localidad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            fila: 0,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto"),
        }
        console.log(producto)
        //return

        getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": "protoco", tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })
                          // TiendaIten({ ...producto, "protocol": "", tipo: "correlativo" }) //: TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["id"] == mapath.precio.id).protocol, tipo: "correlativo" })
        //setDetalle(getVerTienda().filter(e => e.id == mapath.precio.id))
        console.log(getVerTienda())
        console.log(GetValores())
        ListaPrecioset(GetValores())
            
    }
    function agregar(e) {
        let user = getDatosUsuariosLocalStorag()
        console.log("valores", valores)
        let mapath = { precio: valores.find(el => el.ideprecio == e.ideprecio) }
        console.log(mapath, e.ideprecio)
        /*if (sleccionlocalidad.disponibles == 0) {
             usedispatch(setToastes({
                 show: true,
                 message: "No hay más disponibilida en la localidad",
                 color: 'bg-danger',
                 estado: "Localidad llena"
             }))
             return
         }
         if ((sleccionlocalidad.pagados + TotalSelecion()) == 100) {
             succesLimit()
             return
         }*/
        let protoco = moment().format("YYYYMMDDHHMMSS")
        let producto = {
            cantidad: 1,
            localidad: mapath.precio.localidad,
            localidaEspacio: mapath.precio,
            id: mapath.precio.idcolor,
            tipo: "correlativo",
            fila: 0,
            discapacidad: mapath.precio.precio_discapacidad,
            valor: mapath.precio.precio_normal,
            nombreConcierto: sessionStorage.getItem("consierto") ? sessionStorage.getItem("consierto") : '',
        }
        console.log(producto)
        //return
        if (TotalSelecion() < 100) {
            //setDisable(true)
            // usedispatch(setSpinersli({ spiner: false }))

            /* window.gtag("event", "add_to_cart", {
                 currency: "USD",
                 value: mapath.precio.precio_normal,
                 items: [
                     {
                         item_id: mapath.precio.id,
                         item_name: mapath.precio.localidad,
                         affiliation: "Mas",
                         index: 0,
                         item_brand: "Google",
                         price: mapath.precio.precio_normal,
                         "cantidad": 1
                     }
                 ]
             });*/
                getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor) == undefined ? TiendaIten({ ...producto, "protocol": protoco, tipo: "correlativo" }) : TiendaIten({ ...producto, protocol: getVerTienda().find(e => e.localidaEspacio["idcolor"] == mapath.precio.idcolor).protocol, tipo: "correlativo" })
                                  
//setDetalle(getVerTienda().filter(e => e.id == mapath.precio.id))
            console.log(getVerTienda())
            console.log(GetValores())
            ListaPrecioset(GetValores())
            
        }
        else {
            //setDisable(false)
            succesLimit()
        }
    }
    function handelMetodopago(target, value) {
        if (target.name == "selctmet") {
            setSelecte(value)
            let names = target.value.replace("Efectivo-Local", "Fisico")
            setChecked({
                [names]: target.value,
            })
            sessionStorage.setItem(Metodos, target.value)
            ListaPrecioset(GetValores())
        } else {
            setChecked({
                [target.name]: value,
            })
            setSelecte(value)
            sessionStorage.setItem(Metodos, value)
            setCheck(false)
            ListaPrecioset(GetValores())
        }

    }
    useEffect(() => {
        console.log(id)
        ObtenerEventos()
        let metodoPago = GetMetodo()
        metodoPago != null ?
            setChecked({
                Fisico: metodoPago == "Efectivo-Local" ? "Efectivo-Local" : "",
                Efectivo: metodoPago == "Efectivo" ? "Efectivo" : "",
                Tarjeta: metodoPago == "Tarjeta" ? "Tarjeta" : "",
                Deposito: metodoPago == "Deposito" ? "Deposito" : "",
                Transferencia: metodoPago == "Transferencia" ? "Transferencia" : ""
            }) : handelMetodopago({ name: 'Transferencia' }, "Transferencia")
            metodoPago!=null?
                setSelecte(metodoPago) : ""
        ListaPrecioset(GetValores())

    }, [])
    return (
        <>
            <div className=" container-fluid">
                <div className="">
                    <div className="col-12 mb-3">
                        <div className=" d-flex  justify-content-end">

                            <button className="btn btn-danger mx-3" onClick={buscarsuscritor}> <i className=" fa fa-search"></i> Buscar cliente </button>
                            {
                                !datos.resgistro ? <button className="d-none btn btn-success "  ><i className="fa fa-search "></i> Buscar cédula </button> : ''
                            }
                            {!datos.resgistro ? <button className="btn btn-success ml-3 d-none"  ><i className=" fa fa-plus-circle"></i> CREAR </button> :
                                <button className="btn btn-primary"  > <i className=" fa fa-check-circle"></i> </button>}
                        </div>
                    </div>
                    <form id="register" onSubmit={(e) => e.preventDefault()}  >
                        <div className="row">


                            <div className="co-6 ">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input id="cedula" type="text"
                                        className="form-control numero"
                                        name="cedula"
                                        minLength={10}

                                        placeholder={"Ingrese su número de identificación"} required />
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
                                        value={datos.nombreCompleto}
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
                                            value={datos.movil}
                                            required
                                            onChange={(e) => handelChange(e.target)}
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
                                        Ingrese ciudad

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
                <div className=" ">
                    <div>
                        <strong> Método de pago</strong>
                        <select className=" form-select form-select-lg" name="selctmet" value={select}
                            onChange={(e) => handelMetodopago(e.target)}
                        >
                            <option value={"Tarjeta"}>
                                Tarjeta credito
                            </option>
                            <option value={"Transferencia"}>
                                Transferencia
                            </option>
                            {clienteInfo().perfil == "vendedores" ? "" : <option value={"Efectivo-Local"}>
                                Efectivo-Local
                            </option>}
                            {clienteInfo().perfil == "vendedores" ? "" : <option value={"Tarjeta-Local"}>
                                Tarjeta-Local
                            </option>}
                            {clienteInfo().perfil == "vendedores" ? "" : <option value={"Efectivo-QR"}>
                                Efectivo-QR
                            </option>}
                            <option className=" d-none" value={"Recaidacion Terceros"}>
                                Recaidacion Terceros
                            </option>
                            <option className="" value={"Efectivo"}>Efectivo Speed</option>
                        </select>
                    </div>
                </div>
                <div className=" table-responsive">


                    <table className=" resumen-table  table  " width={"100%"}>
                        <thead>
                            <tr className="text-black">
                                <th scope="col" className="text-black">CONCIERTO</th>
                                <th className="text-black">LOCALIDAD</th>

                                <th className="text-black" scope="col">Disponible</th>

                                <th className="text-black text-end " scope="col">Cantidad</th>
                                <th className="text-black text-end " scope="col">Valor</th>
                                <th className="text-black text-end " scope="col">TOTAL</th>
                                <th className="text-black text-end" scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                evento.length > 0 ?
                                    evento.map((item, index) => {
                                        let tipo = String(item.mesas_array).replace('""', "")
                                        return (
                                            <tr key={index}>
                                                <td className="align-self-center">{item.nombreConcierto}</td>
                                                <td className="align-self-center">{item.nombre}</td>

                                                <td className="align-self-center">{item.total}</td>
                                                <td className=" text-end">{getVerTienda().length == 0 ? 0 : getVerTienda().find(ele => ele.id == item.id_localidad) ? getVerTienda().find(ele => ele.id == item.id_localidad).cantidad:0}</td>
                                                <td className=" text-end">${parseFloat(item.precio_normal) - parseInt(item.comision_boleto)}+${parseInt(item.comision_boleto)}</td>
                                                <td className=" text-end">{getVerTienda().length == 0 ? 0 : getVerTienda().find(ele => ele.id == item.id_localidad) ? parseFloat(parseInt(getVerTienda().find(ele => ele.id == item.id_localidad).cantidad)*(parseFloat(item.precio_normal) - parseInt(item.comision_boleto)) ): 0}</td>
                                                <td className="align-self-center text-end">
                                                    {
                                                        (tipo == 'correlativo') ?
                                                            <div>
                                                                <div className="btn-group btn-group-sm" role="group">

                                                                    <button className="suma   btn-success " onClickCapture={() => restaprecio(item)}

                                                                    >
                                                                        <i className="fa fa-minus"></i>
                                                                    </button>
                                                                    <button className="suma   btn-danger " onClickCapture={() => agregar(item)}

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
                </div>
                <div className=" container-fluid">
                    <table className="table table-borderless " style={{
                        lineHeight: 1
                    }}>
                        <tbody>
                            <tr>
                                <th scope="row"></th>
                                <td className='text-end' >Subtotal:</td>
                                <td className='text-end'>${parseFloat(listaPrecio.subtotal).toFixed(2)}</td>
                            </tr>
                            <tr className={"hidecomision"}>
                                <th scope="row"></th>
                                <td className={"hidecomision" + " text-end"} >Comisión Bancaria:</td>
                                <td className={"hidecomision" + " text-end"}>${parseFloat(listaPrecio.comision_bancaria).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th scope="row"></th>
                                <td className='text-end' >Servicio Em. por Boleto:</td>
                                <td className='text-end'>${parseFloat(listaPrecio.comision).toFixed(2)}</td>
                            </tr>
                            <tr className=''>
                                <th scope="row"></th>
                                <td className='text-end' >Iva %:</td>
                                <td className='text-end'>${parseFloat(listaPrecio.iva).toFixed(2)}</td>
                            </tr>
                            <tr className=''>
                                <th scope="row"></th>
                                <td className='text-end' >Comision Bancaria:</td>
                                <td className='text-end'>${String(GetMetodo()).includes("Tarjeta") ? parseFloat(listaPrecio.comision_bancaria).toFixed(2):"0.00"}</td>
                            </tr>
                            <tr>

                                <th scope="row"></th>
                                <td className='text-end' >Total</td>
                                <td className='text-end'>${String(GetMetodo()).includes("Tarjeta") ? parseFloat(listaPrecio.total).toFixed(2) : (parseFloat(listaPrecio.subtotal) + parseFloat(listaPrecio.comision)).toFixed(2)}</td>
                            </tr >

                        </tbody>
                    </table>
                    <div className=" container-fluid px-0 text-end">

                        <button className="btn btn-success">Pagar</button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default ventasView