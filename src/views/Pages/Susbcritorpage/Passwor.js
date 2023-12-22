import { setToastes } from "StoreRedux/Slice/ToastSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { EditarSuscrito } from "utils/SuscritorQuery/index";
export default function ResestPassword() {
    let { id } = useParams()
    let history = useHistory()
    let usedispatch = useDispatch()
    let [datos, setDatos] = useState({
        id: "",
        ciudad: "",
        email: "",
        movil: "",
        nombreCompleto: "",
        password: ""
    })
    let [password, setPass] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    })
    function verifyFormToken(token) {
        const [header, payload, signature] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log(decodedPayload)
        if (decodedPayload.exp && decodedPayload.exp < currentTimestamp) {
            // El token ha expirado
            return false;
        }
        setDatos({
            "nombreCompleto": decodedPayload.nombreCompleto,
            "email": decodedPayload.email,
            "new_password": "",
            "movil": decodedPayload.movil,
            "ciudad": decodedPayload.ciudad,
            "id": decodedPayload.id
        })
        return true;
    }
    useEffect(() => {
        if (verifyFormToken(id)) {
            console.log('El token es válido y no ha expirado.');
            /* usedispatch(setToastes({
                 show: true,
                 message: "El token ya no es valido",
                 color: 'bg-success',
                 estado: "La sesión a expirado",
             }))*/
        } else {
            usedispatch(setToastes({
                show: true,
                message: "El token ya no es valido",
                color: 'bg-danger',
                estado: "La sesión a expirado",
            }))
            console.log('El token ha expirado o no es válido.');
        }
    }, [])
    function handleChange(e) {

        setPass({ ...password, [e.target.name]: e.target.value })
    }
    async function onSumit(e) {
        e.preventDefault();
        if (!verifyFormToken(id)) {
            usedispatch(setToastes({
                show: true,
                message: "El token ya no es valido",
                color: 'bg-danger',
                estado: "La sesión a expirado",
            }))
            setTimeout(function () {
                history.push("/")
                location.reload()
            }, 3000)
            return
        }
        if (datos.email.trim() != password.email.trim() && password.password.trim() != password.passwordConfirm.trim()) {
            console.log("aqui")
        }
        try {
            let parms = {
                "nombreCompleto": datos.nombreCompleto,
                "email": datos.email,
                "new_password": password.passwordConfirm,
                "movil": datos.movil,
                "ciudad": datos.ciudad
            }
            console.log(parms, datos.id)
            const data = await EditarSuscrito(datos.id, parms)
            console.log(data)
            const { success, message } = data

            if (success) {
                usedispatch(setToastes({
                    show: true,
                    message: "La contraseña ha sido actualizada con éxito",
                    color: 'bg-success',
                    estado: "Actualización exitosa",
                }))
                setTimeout(function () {
                    history.push("/")
                    location.reload()
                }, 3000)

            }
        } catch (error) {
            console.log(error)

        }

    }
    return (
        <div className="container vh-100 ">
            <div className="row vh-100 d-flex  justify-content-center  align-items-center">
                <div className="col-md-6 card shadow-md">
                    <h2 className="text-center py-2">Formulario de reseteo de contraseña</h2>
                    <form className=" justify-content-center p-2">
                        <div className="form-group">
                            <label for="email">Correo electrónico</label>
                            <input type="email" onChange={(e) => handleChange(e)} className="form-control" value={password.email} name="email" aria-describedby="emailHelp" placeholder="Ingrese su correo electrónico" />
                        </div>
                        <div className="form-group">
                            <label for="password">Nueva contraseña</label>
                            <input type="password" value={password.password} onChange={(e) => handleChange(e)} className="form-control" name="password" placeholder="Ingrese su nueva contraseña" />
                        </div>
                        <div className="form-group">
                            <label for="passwordConfirm">Confirmar contraseña</label>
                            <input type="password" value={password.passwordConfirm} onChange={(e) => handleChange(e)} className="form-control" name="passwordConfirm" placeholder="Confirme su nueva contraseña" />
                        </div>
                        <div className="text-center">
                            <button onClick={(e) => onSumit(e)} className="btn btn-primary">Restablecer contraseña</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}