import { Form } from "react-bootstrap"
import { ProvinciasMap } from "utils/Mapassvg"
import { useState, useEffect, useMemo } from "react"
import { cargarMapa, guardarMapar, eliminaMapa, editarMapa } from "utils/MapaQuery"
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch } from "react-redux"
import { setToastes } from "StoreRedux/Slice/ToastSlice"

import SvgselectView from "views/Pages/Svgviewa/svgseleccion.js"
import { Listar_preciolocalidad } from "utils/EventosQuery";
import { getMapacolor } from "utils/Localidadmap";
import { getLocalidadmapa } from "utils/Localidadmap";
import { insertLocalidad } from "utils/Localidadmap";
import { GetlistPrecios } from "utils/EventosQuery/mpalocal";
const OpctionLocalidadView = () => {
       // const { localidaname, datalocalidad, SetDataloca } = props
        let usedispatch = useDispatch()
        const [ciudadname, setCiudad] = useState([])
        const [provincia, setProvincia] = useState("")
        const [mapaselet, setMapaselec] = useState("")
        const [alert, setAlert] = useState(null);
        const [list,setList]=useState(false)
        const [mapaRegstro, setMaparegistro] = useState({
                id: "",
                localidad: [],
                nombre_espacio: "",
                nombre_mapa: "",
                pathmap: []
        })
        const [mapa, setmapa] = useState([])
        const [localidadmap, setselection] = useState({
                id: '',
                name: "",
                color: '#A12121',
        })
        function handelChange(e) {
                setselection({
                        ...localidadmap,
                        [e.name]: e.value
                })

        }
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
        let [precios,setprecios]=useState([])
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
        function Seleccionarmapa(e){
                console.log(e)
                setMapaselec(e.nombre)
        }
        /*const GuardarSeleccion = async () => {
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

        }*/
        /*const EliminarMapados = async () => {
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
        */
        const AlerGuarda = () => {
                console.log(getLocalidadmapa())
                console.log(getMapacolor())
                let valores = {
                        "id_evento": "estadio",
                        "nombre_espacio": "localidaname.nombre",
                        "pathmap": JSON.stringify(getMapacolor()),
                        "localidad": JSON.stringify(getLocalidadmapa()),
                }
                console.log(valores)
                //438106
                setList(true)
                /*setAlert(
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
                );*/
        };
        /*
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
        };*/
        function agergaraALarray(dato, id, color) {
               // settimer(!timer)
                let array = getMapacolor()

                var index = array.findIndex(obj => obj.path == dato);
                if (index == -1) {
                      //  console.log(mapaselet)
                        array.push({ path: dato, id: id, fill: color,  });

                } else {
                        do {
                                array.splice(index, 1);
                                index = array.indexOf({ path: dato, id: id, fill: color });
                        } while (index != -1);
                }
                insertLocalidad(array, { path: dato, id: id, fill: color })
                cargarcolores()
        }
        function listadecolores() {
                let nuevo = getLocalidadmapa()
                let colores = getMapacolor()
                const valorDuplicadas = [];
                nuevo.length > 0 && colores.length > 0 ? colores.forEach(p => {
                        if (valorDuplicadas.findIndex(pd => pd.id === p.id) === -1) {
                                let index = nuevo.findIndex((e) => parseInt(e.id) === parseInt(p.id))
                                valorDuplicadas.push({ id: p.id, nombre: nuevo[index] ? nuevo[index].nombre : '', color: p.fill});
                        }
                }) : ''
                nuevo.length > 0 && colores.length > 0 ? nuevo.map((L) => {
                        if (valorDuplicadas.findIndex((e) => parseInt(e.id) === parseInt(L.id)) != -1) {
                                $("#precios" + L.id).css('background', valorDuplicadas[valorDuplicadas.findIndex((e) => parseInt(e.id) === parseInt(L.id))].color);
                                L.color = valorDuplicadas[valorDuplicadas.findIndex((e) => parseInt(e.id) === parseInt(L.id))].color;
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
                                console.log(this.getAttribute('id'), id, co)
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
                        console.log(this.getAttribute('id'))
                        agergaraALarray(this.getAttribute('id'), '', '')
                       // console.log(this.getAttribute('id'))
                        this.removeAttribute("class", "seleccion")
                        this.setAttribute("class", "none")
                        $("#titel" + this.getAttribute('id')).remove();
                }
        })
        useEffect(() => {
                
                setprecios(GetlistPrecios())
               /* Listar_preciolocalidad(0).then(ouput => {
                        console.log(ouput)
                        if (ouput.success) {
                                 setprecios(ouput.data)
                                //setPrecios(ouput.data)
                                console.log(ouput.data)
                                const filtrado = ouput.data
                                const obten = filtrado.map((e, i) => {
                                       
                                        return { id: e.id, nombre: e.nombre_localidad,  color: '' }
                                })
                // console.log("localidada",obten)
                //setLocalidad(filtrado)
                //setmapa(obten)
                  sessionStorage.localidad = JSON.stringify(obten)
                        }
                }).catch(err => {
                        console.log(err)
                })*/
        }, [])
        return (
                <>
                        {alert}
                        <h4 className=" text-capitalize"> {mapaselet ? "Mapa Selecionado: " + mapaselet : 'Lista de Mapas'} </h4>
                        {list ?"":<div className="row">

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
                                                                onClick={AlerGuarda}
                                                                
                                                                > {
                                                                        !mapaRegstro.id ? "Continuar" : "Actualizar"} </button>
                                                        {/*
                                                                mapaRegstro.id ?
                                                                        <button className="btn btn-danger " onClick={Elimna} >Eliminar</button> : ''*/}
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
                                                                                                        onClick={() => Seleccionarmapa(mapa) }
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


                        </div>}
                        {!list? "":<div className="container-fluid col-12 col-sm-8 d-flex flex-column " style={{ height: 'auto', width: '100%', overflowX: 'auto' }}>
                           <div className="d-flex justify-content-center align-items-center pb-2">
                                                <div className="col-6">
                                                        <label className="form-label">Selecione localidad  </label>
                                                        <Form.Select className="form-control" value={localidadmap.name} name="name" id="names" onChange={(e) => handelChange(e.target)}>
                                                                <option value={""}></option>
                                                        {precios.length > 0 ?
                                                                precios.map((e, i) => {
                                                                                return (
                                                                                        <option key={"index" + i} value={e.id} >{e.nombre_localidad}</option>
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
                                                                        <button className="btn btn-success"  >Recargar mapa</button> : ''}
                                                        </div>
                                                        <div>
                                                                <label className="form-label text-white " >.</label>
                                                                {!localidadmap.id ?
                                                                <button className="btn btn-primary" onClick={AlerGuarda} >Guardar </button> :
                                                                <button className="btn btn-primary" onClick={() => setList(false)} >Actualizar </button>}
                                                        <button className="btn btn-primary" onClick={() => setList(false)} >Regresar </button>
                                                        </div>

                                                </div>
                                        </div>    
                                <div className="d-flex justify-content-center" >

                                        <SvgselectView text={mapaselet} />



                                        {/*estadio=="grado"?<EcenarioGradoView localidaname={localidaname}/>:''*/}
                                </div>

                        </div>}

                </>
        )
}

export default OpctionLocalidadView