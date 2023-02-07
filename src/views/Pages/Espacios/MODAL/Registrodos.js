import React, { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js"
import TabtresView from './Componetes/Localidadopctiontres'
import TabunoViews from './Componetes/Localidadopctionuno'
import TabdosViews from './Componetes/Localidadopctiondos'
import LocalidadesagreViews from "./Componetes/Localidadopcioncuatro"
import MapadelocalidadViews from "./Componetes/Localidadopctioncinco"
import OpctionLocalidadView from "./Componetes/Localidadoptionseis"
const RegistroViwstab = (props) => {
    const { show, setShowToast, localidaname } = props
    //console.log(localidaname)
    const [mapaset, setMapas] = useState(false)
    const [datalocalidad, SetDataloca] = useState({
        id: '',
        typo: '',
        nombre: '',
        description: '',
        array: []
    })
    async function ObtenLocalidad() {
        try {
            const datos = await ListarLocalidad("")
            const { success, data } = datos
            console.log(datos)
            if (success) {
                console.log(datos)
                const filtrado = data.filter(e => e.espacio == localidaname.nombre)
                const obten = filtrado.map((e, i) => {
                    let dato = JSON.parse(e.mesas_array)
                    return { id: e.id, nombre: e.nombre, tipo: dato.Typo, color: '' }
                })
                // console.log("localidada",obten)
                //setLocalidad(filtrado)
                //setmapa(obten)
                //  sessionStorage.localidad = JSON.stringify(obten)
                //sessionStorage.localidadrespaldo = JSON.stringify(obten)

            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        (async () => {
            //await ObtenLocalidad()
        })()
        SetDataloca({
            id: '',
            typo: '',
            nombre: '',
            description: '',
            array: []
        })
    }, [show])

    return (
        <>
            <Modal
                show={show}
                fullscreen={true}
                onHide={() => setShowToast(false)}
            >
                <Modal.Header className="py-4">
                    <h5> Registro de Localidades en Espacion {localidaname.nombre}</h5>
                    <button type="button" className="close"
                        onClick={() => setShowToast(false)}>
                        ×
                    </button>
                </Modal.Header>
                <Modal.Body>

                    <div className='container-fluid row p-0'>
                        <div className='col-12'>
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href="#filas"
                                    >Filas y Asientos</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link " data-toggle="tab" href="#mesas"
                                    >Mesas y sillas</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#correlativos">Números Correlativos</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link " data-toggle="tab" href="#listas"
                                    >Localidades Agregadas</a>
                                </li>
                                <li className="nav-item  ">
                                    <a className="nav-link  d-none" data-toggle="tab" href="#seleclocalidad"
                                    >Seleccionar locación</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#mapa"
                                        onClick={() => setMapas(!mapaset)}
                                    >Diseñar Mapa</a>
                                </li>

                            </ul>
                        </div>
                        <div className="tab-content col-sm-12">
                            <div className="tab-pane active container " id="filas">
                                <TabunoViews localidaname={localidaname}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                    setShowToast={setShowToast}
                                />
                            </div>
                            <div className="tab-pane  container " id="mesas">
                                <TabdosViews
                                    localidanames={localidaname}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                    setShowToast={setShowToast}
                                />

                            </div>
                            <div className="tab-pane  container " id="correlativos">
                                <TabtresView
                                    espacioname={localidaname}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                    setShowToast={setShowToast}
                                />
                            </div>


                            <div className="tab-pane  container " id="listas">
                                <LocalidadesagreViews
                                    show={show}
                                    SetDataloca={SetDataloca}
                                    datalocalidad={datalocalidad}
                                    localidaname={localidaname} />

                            </div>
                            <div className="tab-pane container" id="seleclocalidad" >
                                <OpctionLocalidadView
                                    localidaname={localidaname}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                />
                            </div>
                            <div className="tab-pane  container-fluid " id="mapa">
                                <MapadelocalidadViews
                                    show={show}
                                    mapaset={mapaset}
                                    datalocalidad={datalocalidad}
                                    SetDataloca={SetDataloca}
                                    ObtenLocalidad={ObtenLocalidad}
                                    localidaname={localidaname} />

                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )

}
export default RegistroViwstab