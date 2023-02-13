import React, { useEffect, useState } from "react"
import EcenarioDefView from "views/Components/MapaEcenarios/Ecenariodefalt"
import EcenarioEstaView from "views/Components/MapaEcenarios/Ecenarioestandar"
import { cargarMapa, eliminaMapa, guardarMapar, editarMapa } from "utils/MapaQuery"
import { Form } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch } from "react-redux"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
import { plantilla } from "utils/constantes"
import { insertLocalidad, getMapacolor, getLocalidadmapa } from "utils/Localidadmap"
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js"
import SvgselectView from "views/Pages/Svgviewa/svgseleccion.js"
const MapadelocalidadViews = (props) => {
        const { localidaname, mapaset, SetDataloca, ObtenLocalidad, datalocalidad } = props
        const usedispatch = useDispatch()
        const [alert, setAlert] = useState(null);
        const [localidadmap, setselection] = useState({
                id: '',
                name: "",
                color: '#A12121',
        })
console.log(localidaname)
        const [timer, settimer] = useState(false)

        const [mapa, setmapa] = useState([])
        const [estadio, SetSelecion] = useState("")
        function handelChange(e) {
                setselection({
                        ...localidadmap,
                        [e.name]: e.value
                })

        }
        function agergaraALarray(dato, id, color) {
                settimer(!timer)
                let array = getMapacolor()

                var index = array.findIndex(obj => obj.path == dato);
                if (index == -1) {
                        array.push({ path: dato, id: id, fill: color, espacio: localidaname.id });

                } else {
                        do {
                                array.splice(index, 1);
                                index = array.indexOf({ path: dato, id: id, fill: color, espacio: localidaname.id });
                        } while (index != -1);
                }
                insertLocalidad(array, { path: dato, id: id, fill: color, espacio: localidaname.id })
                cargarcolores()
        }
        async function cargardatosMapa() {
                try {
                        let listar = await ListarLocalidad("")
                        let map = await cargarMapa()
                        let datos = map.data.filter((e) => e.nombre_espacio == localidaname.nombre)
                        console.log(datos)
                        console.log(localidaname.nombre)
                        console.log(listar)
                        if (datos) {
                                let localidadcolor = JSON.parse(datos[0].localidad)
                                const filtrado = listar.data.filter(e => e.id_espacio == localidaname.id)
                                // console.log(filtrado)
                                const obten = filtrado.map((e, i) => {
                                        if (localidadcolor > 0 && localidadcolor.findIndex(e => e.id == e.id) != -1) {
                                                let dato = JSON.parse(e.mesas_array)
                                                return { id: e.id, nombre: e.nombre, tipo: dato.Typo, color: localidadcolor[localidadcolor.findIndex(e => e.id == e.id)].color }
                                        }
                                        else {
                                                let dato = JSON.parse(e.mesas_array)
                                                return { id: e.id, nombre: e.nombre, tipo: dato.Typo, color: '' }
                                        }
                                })
                                SetSelecion(datos[0].nombre_mapa)
                                sessionStorage.mapa = datos[0].pathmap
                                sessionStorage.localidad = JSON.stringify(obten)
                                setmapa(obten)
                                setselection({ ...localidadmap, id: datos[0].id })
                                $('[href*="mapa"]').removeClass('d-none');
                                //console.log("Existe")
                                setTimeout(function () {
                                        cargarcolores()
                                }, 90)
                        } else {
                                const obten = filtrado.map((e, i) => {
                                        let dato = JSON.parse(e.mesas_array)
                                        return { id: e.id, nombre: e.nombre, tipo: dato.Typo, color: '' }
                                })
                                SetSelecion("")
                                setmapa(obten)
                                setselection({
                                        id: '',
                                        name: "",
                                        color: '#A12121',
                                })
                                $('[href*="mapa"]').addClass('d-none');
                                //console.log("No Existe")
                                setTimeout(function () {
                                        cargarcolores()
                                }, 90)
                        }


                } catch (error) {
                        console.log(error)
                        $('[href*="mapa"]').addClass('d-none');

                }

        }


        const GuardarMapa = async () => {

                let valores = {
                        "mapasvg": estadio,
                        "nombre_espacio": localidaname.nombre,
                        "pathmap": JSON.stringify(getMapacolor()),
                        "localidad": JSON.stringify(getLocalidadmapa()),
                }
                try {
                        if (localidadmap.id == '') {
                                //  let datos = await guardarMapar(valores)
                                usedispatch(setToastes({ show: true, message: 'Asignacion de localidades Guardadas correctamente', color: 'bg-success', estado: 'Datos Guardado' }))
                                console.log(datos)
                                hideAlert()
                                window.location.reload()
                        }
                        else {
                                let valor = {
                                        "mapasvg": estadio,
                                        "nombre_espacio": localidaname.nombre,
                                        "pathmap": getMapacolor(),
                                        "localidad": getLocalidadmapa(),
                                }
                                console.log(valor)

                                let updatedatos = await editarMapa({ ...valores, id: localidadmap.id.toString() })
                                //console.log({ ...valores, id: localidadmap.id.toString() })
                                usedispatch(setToastes({ show: true, message: 'Asignacion de localidades Actualizada correctamente', color: 'bg-success', estado: 'Datos Actualizados' }))
                                // console.log(updatedatos)
                                hideAlert()
                                window.location.reload()
                        }
                } catch (error) {
                        console.log(error)

                }

        }
        const EliminarMapa = async () => {
                try {
                        let eliminar = await eliminaMapa(localidadmap.id)
                        await cargardatosMapa()
                        hideAlert()
                } catch (error) {
                        console.log(error)
                }

        }



        function listadecolores() {
                let nuevo = getLocalidadmapa()
                let colores = getMapacolor()
                const valorDuplicadas = [];
                nuevo.length > 0 && colores.length > 0 ? colores.forEach(p => {
                        if (valorDuplicadas.findIndex(pd => pd.id === p.id) === -1) {
                                let index = nuevo.findIndex((e) => parseInt(e.id) === parseInt(p.id))
                                valorDuplicadas.push({ id: p.id, nombre: nuevo[index] ? nuevo[index].nombre : '', color: p.fill, espacio: localidaname.id });
                        }
                }) : ''
                nuevo.length > 0 && colores.length > 0 ? nuevo.map((L) => {
                        if (valorDuplicadas.findIndex((e) => parseInt(e.id) === parseInt(L.id)) != -1) {
                                $("#precios" + L.id).css('background', valorDuplicadas[valorDuplicadas.findIndex((e) => parseInt(e.id) === parseInt(L.id))].color);
                                L.color = valorDuplicadas[valorDuplicadas.findIndex((e) => parseInt(e.id) === parseInt(L.id))].color;
                                L.espacio = localidaname.id
                                return L
                        } else {
                                $("#" + L.id).attr("background-color", '')
                                return L
                        }
                }) : ''
                sessionStorage.localidad = JSON.stringify(nuevo)
                setTimeout(function () {
                        setmapa(nuevo)
                }, 90);


        }

        function cargarcolores() {
                let colores = getMapacolor()
                //  console.log(colores)
                colores.length > 0 ? colores.map((e, i) => {
                        $("#" + e.path).attr("class", "seleccion")
                        $("#" + e.path).attr("fill", e.fill, "class", "seleccion")
                }) : ''
                colores.length > 0 ? listadecolores() : ''
        }
        $(document).on("click", ".none", function () {
                let co = document.getElementById("color").value;
                let id = document.getElementById("names").value;

                if (this.classList.contains('none')) {
                        if (id.trim() === "") {
                                usedispatch(setToastes({ show: true, message: 'Para asignar debe Seleccionar una localidad', color: 'bg-warning', estado: 'Advertencia' }))
                                return
                        }
                        else {
                                agergaraALarray(this.getAttribute('id'), id, co)
                                this.removeAttribute("class", "none")
                                this.setAttribute("class", "seleccion")
                                var t = document.createElementNS("http://www.w3.org/2000/svg", "title");
                                t.setAttribute("id", "titel" + id)
                                //t.setAttribute("class","card tooltip")                 
                                t.textContent = document.getElementById("names").text;
                                this.append(t);
                        }
                }
                return
        })
        $(document).on("click", ".seleccion", function () {
                if (this.classList.contains('seleccion')) {
                        this.removeAttribute("fill")
                        agergaraALarray(this.getAttribute('id'), '', '')
                        this.removeAttribute("class", "seleccion")
                        this.setAttribute("class", "none")
                        $("#titel" + this.getAttribute('id')).remove();
                }
        })
        useEffect(() => {

                (async () => {
                        try {
                                await cargardatosMapa()
                        } catch (erro) {
                                console.log(erro)
                        }



                })()

        }, [mapaset, localidaname])

        const Recargarvalores = async () => {
                await cargardatosMapa()
                cargarcolores()
        }
        const successAlert = () => {
                setAlert(
                        <SweetAlert
                                warning
                                style={{ display: "block", marginTop: "-100px" }}
                                title="Confirmar"
                                onConfirm={() => GuardarMapa()}
                                onCancel={() => hideAlert()}
                                confirmBtnBsStyle="success"
                                cancelBtnBsStyle="danger"
                                confirmBtnText={"Si, Guardar"}
                                cancelBtnText="Cancelar"

                                closeAnim={{ name: 'hideSweetAlert', duration: 500 }}
                                showCancel
                        >
                                Estas seguro de {localidadmap.id != '' ? "Actualizar" : "guardar"} la Asignación del mapa
                        </SweetAlert>
                );
        };
        const successElimna = () => {
                setAlert(
                        <SweetAlert
                                warning
                                style={{ display: "block", marginTop: "-100px" }}
                                title="Confirmar"
                                onConfirm={() => EliminarMapa()}
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
                        <div className="d-flex flex-wrap">
                                <div className="container-fluid col-12 col-sm-8 d-flex flex-column " style={{ height: 'auto', width: '100%', overflowX: 'auto' }}>
                                        <div className="d-flex justify-content-center align-items-center pb-2">
                                                <div className="col-6">
                                                        <label className="form-label">Selecione localidad  </label>
                                                        <Form.Select className="form-control" value={localidadmap.name} name="name" id="names" onChange={(e) => handelChange(e.target)}>
                                                                <option value={""}></option>
                                                                {mapa.length > 0 ?
                                                                        mapa.map((e, i) => {
                                                                                return (
                                                                                        <option key={"index" + i} value={e.id} >{e.nombre}</option>
                                                                                )
                                                                        })
                                                                        : ''
                                                                }
                                                        </Form.Select>
                                                </div>
                                                <div className="col-sm">
                                                        <label className="form-label text-white" >.</label>
                                                        <input
                                                                className="form-control form-control-color"
                                                                value={localidadmap.color} name="color" id="color"
                                                                type="color"
                                                                onChange={(e) => handelChange(e.target)}
                                                        />
                                                </div>
                                                <div className="col-sm d-flex flex-column align-items-center" >
                                                        <div>
                                                                <label className="form-label text-white" >.</label>
                                                                {localidadmap.id ?
                                                                        <button className="btn btn-success" onClick={Recargarvalores}  >Recargar mapa</button> : ''}
                                                        </div>
                                                        <div>
                                                                <label className="form-label text-white " >.</label>
                                                                {!localidadmap.id ?
                                                                        <button className="btn btn-primary" onClick={successAlert} >Guardar </button> :
                                                                        <button className="btn btn-primary" onClick={successAlert}>Actualizar </button>}
                                                        </div>

                                                </div>
                                        </div>
                                        <div className="d-flex flex-wrap justify-content-center  p-3 ">
                                                {mapa.length > 0 ?
                                                        mapa.map((elm, i) => {

                                                                return (
                                                                        <div className="d-flex flex-row px-3 align-items-center" key={i}  >
                                                                                <div id={"precios" + elm.id} className="mx-1 border  rounded-4" style={{ height: 20, width: 20 }}></div>
                                                                                <span>{elm.nombre}</span>
                                                                        </div>
                                                                )
                                                        }) : ''
                                                }

                                        </div>
                                        <div className="d-flex justify-content-center" >

                                                <SvgselectView text={estadio} />



                                                {/*estadio=="grado"?<EcenarioGradoView localidaname={localidaname}/>:''*/}
                                        </div>

                                </div>
                        </div>
                </>
        )

}
export default MapadelocalidadViews