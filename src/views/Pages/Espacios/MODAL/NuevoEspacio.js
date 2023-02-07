import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { GuardarEspacio, ActualizarEspacio } from "utils/EspaciosQuery/index.js"
import { useDispatch } from "react-redux"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
const NewEspacioView = (props) => {
    const { showNuevo, SetShownuev, localidaname, estado } = props
    let usedispatch = useDispatch()

    const [espacio, setEspacio] = useState({
        id: '',
        nombre: '',
        descripcion: ''
    })
    function handelchange(e) {
        setEspacio({
            ...espacio,
            [e.name]: e.value
        }
        )
        //console.log(e)

    }
    async function Guardar() {
        let datos = {
            nombre: espacio.nombre,
            descripcion: espacio.descripcion
        }

        if (!Object.values(datos).every(e => e)) return
        try {
            const espaci = await GuardarEspacio(espacio)
            const { success } = espaci
            if (success) {
                usedispatch(setToastes({ show: true, message: 'Evento guardado correctamente', color: 'bg-success', estado: 'Guardado' }))
                SetShownuev(false)
            }
        } catch (error) {
            console.log(error)
            usedispatch(setToastes({ show: true, message: 'Hubo un error intente nuevamente', color: 'bg-error', estado: 'Error' }))
        }
    }
    async function Editar() {
        try {
            const actualiza = await ActualizarEspacio(espacio)
            const { success } = actualiza
            if (success) {

                SetShownuev(false)
            }
        } catch (error) {
            console.log("error")

        }
    }
    useEffect(() => {
        setEspacio({ ...localidaname })

    }, [showNuevo])
    return (
        <Modal
            show={showNuevo}
            onHide={() => SetShownuev(false)}
        >

            <div className="modal-content ">
                <div className="modal-header py-3">
                    <h5 className="modal-title" id="espacioModal">{estado != "" ? "Actualizar espacio" : "Registar espacio"}</h5>
                    <button type="button" className="close"
                        onClick={() => SetShownuev(false)}>
                        ×
                    </button>
                </div>


                <div className="modal-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <label className="form-label"><b>Nombre</b></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                </div>
                                <input type="text" className="form-control"
                                    name="nombre"
                                    value={espacio.nombre}
                                    onChange={(e) => handelchange(e.target)}
                                    placeholder="Ingrese el nombre del espacio" />
                            </div>
                        </div>
                    </div>



                    <div className="row">
                        <div className="col-sm-12">
                            <label className="form-label"><b>Descripción</b></label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-quote-right"></i></span>
                                </div>
                                <textarea className="form-control"
                                    name="descripcion" id="descripcion"
                                    value={espacio.descripcion}
                                    onChange={(e) => handelchange(e.target)} cols="30" rows="4" placeholder="Ingresa una descripción del espacio"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">

                    <button type="button" className="btn btn-secondary close-btn" data-dismiss="modal">Salir</button>
                    {estado == "update" ? <button
                        onClick={Editar}
                        className="btn btn-primary close-modal" >Editar</button> :
                        <button
                            onClick={Guardar}
                            className="btn btn-primary close-modal" >Grabar</button>
                    }
                </div>

            </div>


        </Modal>
    )

}

export default NewEspacioView