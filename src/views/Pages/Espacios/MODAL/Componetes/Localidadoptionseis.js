import { Form } from "react-bootstrap"
import { ProvinciasMap } from "utils/Mapassvg"
import { useState, useEffect, useMemo } from "react"
import { cargarMapa, guardarMapar, eliminaMapa, editarMapa } from "utils/MapaQuery"
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch } from "react-redux"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
const OpctionLocalidadView = (props) => {
        const { localidaname, datalocalidad, SetDataloca } = props
        let usedispatch = useDispatch()
        const [ciudadname, setCiudad] = useState([])
        const [provincia, setProvincia] = useState("")
        const [mapaselet, setMapaselec] = useState("")
        const [alert, setAlert] = useState(null);
        const [mapaRegstro, setMaparegistro] = useState({
                id: "",
                localidad: [],
                nombre_espacio: "",
                nombre_mapa: "",
                pathmap: []
        })
        async function getMapa() {
                try {
                        let mapas = await cargarMapa()

                        let datos = mapas.data.filter((e) => e.nombre_espacio == localidaname.nombre)
                        if (datos.length > 0) {
                                console.log(datos[0])
                                setMaparegistro({ ...datos[0] })
                                filterNames(datos[0].nombre_mapa.split("-")[0])
                                setMapaselec(datos[0].nombre_mapa.split("-")[0])
                                $('[href*="mapa"]').removeClass('d-none');
                                $("#" + datos[0].nombre_mapa).addClass("seleccionmap")
                        } else {
                                setMaparegistro({
                                        id: "",
                                        localidad: [],
                                        nombre_espacio: "",
                                        nombre_mapa: "",
                                        pathmap: []
                                })
                                $('[href*="mapa"]').addClass('d-none');
                        }

                } catch (error) {
                        console.log(error)

                }
        }
        function HandelProvincia(e) {
                let Valor = []
                let provincias = e.value ? "." + e.value : ""
                let NewArrai = ProvinciasMap.filter((f) => f.provincia === e.value)
                setProvincia(provincias)
                $('.grid').isotope({
                        filter: provincias
                });
                NewArrai.length > 0 ? NewArrai[0].mapas.map((e) => {
                        if (Valor.findIndex(pd => pd.ciudad === e.ciudad) === -1) {
                                Valor.push({ ciudad: e.ciudad })
                        }
                }) : []
                setCiudad(Valor)
        }
        function HandelCiudad(e) {
                let ciudad = e.value ? "." + e.value : provincia
                //setVoter(ciudad)
                $('.grid').isotope({
                        filter: ciudad
                });
        }
        const filterNames = (nombre) => {
                $('.grid').isotope({
                        filter: function () {
                                var name = $(this).find('.nombre').text();
                                //   console.log(name)
                                return (name.indexOf(nombre.toLowerCase()) > -1);
                        }
                })
        };
        const GuardarSeleccion = async () => {
                if (mapaselet == "") {
                        return
                }
                let valores = {
                        "mapasvg": mapaselet + "-" + Math.random().toString(36).slice(-10),
                        "nombre_espacio": localidaname.nombre,
                        "pathmap": JSON.stringify([]),
                        "localidad": JSON.stringify([]),
                }
                try {
                        if (mapaRegstro.id == '') {
                                let datos = await guardarMapar(valores)
                                if (datos.success) {
                                        usedispatch(setToastes({ show: true, message: 'Asignacion de localidades Guardadas correctamente', color: 'bg-success', estado: 'Datos Guardado' }))
                                        console.log(datos)
                                        await getMapa()
                                        SetDataloca({
                                                typo: '',
                                                nombre: '',
                                                description: '',
                                                id: '',
                                                array: ''
                                        })
                                        //$('[href*="mapa"]').removeClass('d-none'); 
                                        window.location.reload()
                                        hideAlert()
                                }
                                else
                                        usedispatch(setToastes({ show: true, message: 'Hubo un error', color: 'bg-danger', estado: 'No se Guardo el mapa' }))
                                hideAlert()

                        }
                        else {
                                let updatedatos = await editarMapa({ ...valores, id: "" + mapaRegstro.id })
                                usedispatch(setToastes({ show: true, message: 'Asignacion de localidades Actualizada correctamente', color: 'bg-success', estado: 'Datos Actualizados' }))
                                // console.log(updatedatos)
                                await getMapa()
                                hideAlert()
                                SetDataloca({
                                        typo: '',
                                        nombre: '',
                                        description: '',
                                        id: '',
                                        array: ''
                                })
                                window.location.reload()
                        }
                } catch (error) {
                        console.log(error)
                        usedispatch(setToastes({ show: true, message: 'No se pudo completar la accción', color: 'bg-danger', estado: 'Hubo un error' }))
                        hideAlert()
                }

        }
        const EliminarMapados = async () => {
                try {
                        let eliminar = await eliminaMapa(mapaRegstro.id)
                        await getMapa()
                        hideAlert()
                        setMapaselec("")
                        filterNames("e")
                } catch (error) {
                        console.log(error)
                        usedispatch(setToastes({ show: true, message: 'No se pudo completar la accción', color: 'bg-danger', estado: 'Hubo un error' }))

                        hideAlert()
                }

        }
        useEffect(() => {
                (async () => {
                        await getMapa()
                })()

        }, [localidaname])
        const AlerGuarda = () => {
                setAlert(
                        <SweetAlert
                                warning
                                style={{ display: "block", marginTop: "-100px" }}
                                title="Confirmar"
                                onConfirm={() => GuardarSeleccion()}
                                onCancel={() => hideAlert()}
                                confirmBtnBsStyle="success"
                                cancelBtnBsStyle="danger"
                                confirmBtnText={"Si, Guardar"}
                                cancelBtnText="Cancelar"

                                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                                showCancel
                        >
                                Estas seguro de {mapaRegstro.id != '' ? "Actualizar ,perderas el registro anterior" : "guardar la Selecccion del mapa"}
                        </SweetAlert>
                );
        };
        const Elimna = () => {
                setAlert(
                        <SweetAlert
                                warning
                                style={{ display: "block", marginTop: "-100px" }}
                                title="Confirmar"
                                onConfirm={() => EliminarMapados()}
                                onCancel={() => hideAlert()}
                                confirmBtnBsStyle="success"
                                cancelBtnBsStyle="danger"
                                confirmBtnText="Si, Elimniar"
                                cancelBtnText="Cancelar"

                                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                                showCancel
                        >
                                Estas seguro de eliminar el mapa creado
                        </SweetAlert>
                );
        };
        const hideAlert = () => {
                setAlert(null);
        };
        return (
                <>
                        {alert}
                        <h4 className=" text-capitalize"> {mapaselet ? "Mapa Selecionado: " + mapaselet : 'Lista de Mapas'} </h4>
                        <div className="row">

                                <div className="col-12" >
                                        <div className="d-flex flex-wrap"
                                        >
                                                <div>
                                                        <Form.Select className="form-control" name="provincia"
                                                                onChange={(e) => HandelProvincia(e.target)}
                                                        >
                                                                <option value={""}>Selecione una Provincias</option>
                                                                {ProvinciasMap.length > 0 ?
                                                                        ProvinciasMap.map((e, i) => {
                                                                                return (
                                                                                        <option key={"index" + i} value={e.provincia} >{e.provincia}</option>
                                                                                )
                                                                        })
                                                                        : ''
                                                                }
                                                        </Form.Select>
                                                </div>
                                                <div className=" px-3">

                                                        <Form.Select className="form-control" name="ciudad"
                                                                disabled={!(ciudadname.length > 0)}
                                                                onChange={(e) => HandelCiudad(e.target)}
                                                        >
                                                                <option value={""}>Seleccione una ciudad</option>
                                                                {ciudadname.length > 0 ?
                                                                        ciudadname.map((e, i) => {
                                                                                return (
                                                                                        <option key={"index" + i} value={e.ciudad} >{e.ciudad}</option>
                                                                                )

                                                                        }) : ''
                                                                }


                                                        </Form.Select>

                                                </div>
                                                <div className="col-4">
                                                        <Form.Control
                                                                placeholder="Ingrese nombre"
                                                                onChange={(e) => filterNames(e.target.value)}
                                                                type="text"
                                                        >

                                                        </Form.Control>

                                                </div>
                                                <div className="col-sm  d-flex flex-row"  >
                                                        <button className="btn btn-primary mx-3"
                                                                disabled={!(mapaselet)}
                                                                onClick={AlerGuarda}> {
                                                                        !mapaRegstro.id ? "Guardar" : "Actualizar"} </button>
                                                        {
                                                                mapaRegstro.id ?
                                                                        <button className="btn btn-danger " onClick={Elimna} >Eliminar</button> : ''}
                                                </div>
                                        </div>


                                </div>
                                <div className="col-12  pt-3">
                                        <div className="grid d-flex flex-wrap">
                                                {
                                                        ProvinciasMap.length > 0 ?
                                                                ProvinciasMap.map((provincias, i) =>
                                                                        provincias.mapas.length > 0 ?
                                                                                provincias.mapas.map((mapa, i) => {
                                                                                        return (
                                                                                                <div id={mapa.nombre}
                                                                                                        onClick={() => setMapaselec(mapa.nombre)}
                                                                                                        className={"border rounded-2 text-center   m-3 esquema grid-item element-item transition justify-content-center  " + mapa.ciudad + " " + provincias.provincia} key={"pla" + i} style={{ width: "200px", height: '250px' }} >

                                                                                                        <h4 className="nombre text-capitalize d-none " style={{ fontSize: '0.9em' }} >{mapa.nombre}</h4>
                                                                                                        <div style={{ alignItems: 'stretch', lineHeight: '1', fontSize: '0.9em' }} >
                                                                                                                <h4 className="nombre text-capitalize pb-0 pt-2 " style={{ fontSize: '1.0em' }}


                                                                                                                >{mapa.nombre}</h4>
                                                                                                                <span className="text-capitalize " style={{ fontSize: '1.2em' }} >

                                                                                                                        {mapa.ciudad}
                                                                                                                </span>
                                                                                                        </div>

                                                                                                        <div >{mapa.plantilla}</div>

                                                                                                </div>

                                                                                        )
                                                                                }) : ''

                                                                )
                                                                : ''
                                                }
                                        </div>



                                </div>


                        </div>

                </>
        )
}

export default OpctionLocalidadView