import axios from "axios"
import { useState, useEffect } from "react"
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { DatosUsuariocliente } from "utils/constantes"
import { getDatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { DatosUsuariosLocalStorag } from "utils/DatosUsuarioLocalStorag"
import { getCedula } from "utils/DatosUsuarioLocalStorag"
import { Authsucrito } from "utils/Query"
import { ValidarWhatsapp } from "utils/Query"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"

import logo from "../../../../assets/imagen/logo-inicio.png";
const ResgistroView = (prop) => {
    const { setDatoToas } = prop
    let usedispatch = useDispatch()
    let modal = useSelector((state) => state.SuscritorSlice.modal)
    const [spinervi, setspine] = useState("d-none")
    const [datosPerson, setPerson] = useState({
        cedula: '',
        name: '',
        email: '',
        edad: '',
        movil: '',
        discapacidad: '',
        genero: '',
        direccion: '',
        password: '',
    })

    async function hanbleOnchange(e) {
        const usuario = getDatosUsuariosLocalStorag()
        setPerson({
            ...datosPerson,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "cedula" && e.target.value.length == 10) {
            // console.log("nuevo")
            // setspiner("")
            try {
                const datos = await getCedula(e.target.value)
                const { name, email, direccion, whatsapp, discapacidad } = datos
                console.log(datos)
                if (name) {
                    setPerson({
                        nombreCompleto: datosPerson.name,
                        whatsapp: datosPerson.movil, ...datos
                    })

                    DatosUsuariosLocalStorag({
                        ...usuario,
                        ...datos
                    })

                }
                else {
                    setPerson({
                        ...datosPerson,
                        cedula: '',
                    })
                    DatosUsuariosLocalStorag({
                        email: '',
                        edad: '',
                        movil: '',
                        discapacidad: '',
                        genero: '',
                        direccion: '',
                        password: '',
                    })
                }

                //  sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(client))


            } catch (error) {

            }

        }
        else if (e.target.name == "movil") {
            DatosUsuariosLocalStorag({
                ...datosPerson,
                whatsapp: e.target.value
            })
        }

    }
    async function Registeruser(e) {
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        e.preventDefault();
        let datos = {
            nombreCompleto: datosPerson.name,
            email: datosPerson.email,
            password: datosPerson.password,
            movil: datosPerson.movil,
            ciudad: datosPerson.direccion,
            cedula: datosPerson.cedula
        }
        const form = new FormData(e.target)
        const { nombreCompleto, email, password, movil, ciudad, cedula } = Object.fromEntries(form.entries())
        if (!Object.values(Object.fromEntries(form.entries())).some(e => e)) {
            console.log(Object.values(Object.fromEntries(form.entries())).some(e => e))
            return
        }
        if (!emailRegex.test(email)) {
            console.log(emailRegex.test(email))
            return
        }
        if (password.length < 7) {
            console.log("aqui")
            return
        }
        else {
            try {
                let nuemro = await ValidarWhatsapp()
                if (nuemro == null) {
                    setDatoToas({
                        show: true,
                        message: "Ingrese un numero de Whatsapp",
                        color: 'bg-danger',
                        estado: "Numero " + datosPerson.movil + " Invalido",
                    })
                    console.log("AQUI")
                    return
                }
                else {
                    const { data } = axios.post("https://rec.netbot.ec/ms_login/api/v1/crear_suscriptor", datos, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
                        }
                    })
                    console.log(data)
                    if (data) {
                        let usuario = await getDatosUsuariosLocalStorag()
                        const { data } = Authsucrito(email, password)
                        var hoy = new Date();
                        let users = {
                            ...usuario,
                            cedula: data.cedula, direccion: data.ciudad, whatsapp: data.movil,
                            telefono: data.movil, name: data.nombreCompleto,
                            email: data.email, hora: String(hoy),
                            enable: data.enable, id: data.id,
                        }
                        DatosUsuariosLocalStorag({ ...usuario, ...users })
                        sessionStorage.setItem(DatosUsuariocliente, JSON.stringify(users))
                        usedispatch(setModal({ nombre: '', estado: '' }))
                        //usedispatch(addususcritor({ users }))
                        // sessionStorage.setItem(DatosUsuariocliente, JSON.stringify({ ...datosPerson }))
                        //sessionStorage.setItem(DatosUsuarioLocalStorang, JSON.stringify(datosPerson))

                    }
                }

            } catch (error) {

            }

        }
        console.log(Object.values(Object.fromEntries(form.entries())))
    }
    $(document).ready(function () {
        $(".numero").keypress(function (e) {
            var n = (e = e || window.event).keyCode || e.which,
                t = -1 != "0123456789".indexOf(String.fromCharCode(n));
            (t = 8 == n || n >= 35 && n <= 40 || 46 == n || t) || (e.returnValue = !1, e.preventDefault && e.preventDefault())
        })
    });
    return (
        <>
            <Modal
                show={modal.nombre == "registro" ? true : false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                size='lg'
                onHide={() => usedispatch(setModal({ nombre: '', estado: '' }))}
            >
                <Modal.Header>
                    <button type="button" className="close"
                        onClick={() => usedispatch(setModal({ nombre: '', estado: '' }))}>
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column ">
                        <div className="container text-center">
                            <img src={logo} className="mb-4 img-fluid " style={{ height: '80px', color: 'black' }} alt="" />
                        </div>
                        <div className="container-fluid row "  >
                            <div className="col-12 p-0 d-flex flex-column">
                                <div>

                                    <form className="" onSubmit={(e) => Registeruser(e)} method="post">

                                        <div className="row">
                                            <div className="d-flex justify-content-center" >
                                                <div className="col-md-8">
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text"><i className="fa fa-search"></i></span>
                                                        </div>

                                                        <input id="cedula" type="text"
                                                            className="form-control numero"
                                                            name="cedula"
                                                            value={datosPerson.cedula}
                                                            minLength={0}
                                                            maxLength={10}
                                                            onChange={(e) => hanbleOnchange(e)}
                                                            placeholder="cédula" required />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                                    </div>

                                                    <input type="text"
                                                        className="form-control"
                                                        id="name"

                                                        name="name"
                                                        value={datosPerson.name}
                                                        onChange={(e) => hanbleOnchange(e)}
                                                        placeholder="Ingrese su nombre completo" required />
                                                    <div className="invalid-feedback">
                                                        Ingrese sus nombres

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">


                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fab fa-whatsapp"></i></span>
                                                    </div>

                                                    <input
                                                        className="numero form-control"
                                                        id="movil"
                                                        name="movil"
                                                        minLength={10}
                                                        maxLength={10}
                                                        required
                                                        value={datosPerson.movil}
                                                        onChange={(e) => hanbleOnchange(e)}
                                                        placeholder="Ingrese su número de whatsapp" />
                                                    <div className="invalid-feedback">
                                                        Ingrese un numero de Whatsapp

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="input-group mb-3" >
                                                    <div className=" input-group-prepend">
                                                        <span className=" input-group-text"> <i className="fa fa-map-marker"></i> </span>
                                                    </div>
                                                    <input type="text"
                                                        className="form-control form-control-sm"
                                                        id="direccion"
                                                        name="direccion"
                                                        maxLength={255}
                                                        required
                                                        value={datosPerson.direccion}
                                                        onChange={(e) => hanbleOnchange(e)}
                                                        placeholder="Ingrese su dirección"
                                                    />
                                                    <div className="invalid-feedback">
                                                        Ingrese una direccion

                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                                    </div>

                                                    <input id="email" type="email" className="form-control" name="email"
                                                        value={datosPerson.email}
                                                        onChange={(e) => hanbleOnchange(e)}
                                                        placeholder="Email" />
                                                    <div className="invalid-feedback">
                                                        Correo incompleto

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-6" >
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                                    </div>

                                                    <input type="password"

                                                        id="password"
                                                        name='password'
                                                        required
                                                        minLength={7}
                                                        placeholder="contraseña"
                                                        className="form-control"
                                                        onChange={(e) => hanbleOnchange(e)} />
                                                    <div className="invalid-feedback">
                                                        La contraseña debe ser mayor de 7 caracteres
                                                    </div>

                                                </div>
                                            </div>

                                        </div>



                                        <div className="row">
                                            <div className="col-md-12">
                                                <button className="btn btn-block btn-success" type="submit">Crear Cuenta</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>


                        </div>


                    </div>
                    <div className={spinervi}
                        style={{
                            display: 'none',
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: '1000'
                        }}
                    >

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '10px',
                            padding: '10px',
                        }}>
                            <Spinner animation="border" variant="light" size='120'></Spinner>
                            <h4 className='text-light'>Consultando datos ...</h4>


                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )


}

export default ResgistroView