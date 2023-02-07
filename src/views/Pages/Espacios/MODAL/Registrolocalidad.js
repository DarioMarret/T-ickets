import React, { useEffect, useState } from 'react';
import { Modal, ProgressBar, OverlayTrigger, Tooltip, Button } from "react-bootstrap"
import { GuardarLocalidad } from 'utils/LocalidadesQuery';
import MesasView from 'views/Pages/Mesas';
import MesacerView from 'views/Pages/Mesas/Plantillas/Mesacer';
import Accordion from 'react-bootstrap/Accordion';
const Registroseccion = (props) => {
    const { show, setShowToast, datosEs } = props
    let ejemplo = [1, 2, 3, 4, 5]
    let ListadeFilas = []
    let ListadeMesas = []
    let i = 0
    let f = 1
    let g = 0
    const [localidaname, setLocalidad] = useState({
        nombre: '',
        description: ''
    })
    const [sillaarray, setSilla] = useState([])
    const [tabactivo, setTabactive] = useState({
        tab1: '',
        tab2: 'd-none',
        tab3: 'd-none'
    })
    const [filass, setFilass] = useState({
        cantidad: '',
        inicial: '',
        fila: '',
        sillas: ''
    })
    const [Mesass, setMesass] = useState({
        me_cantidad: 'todas',
        me_inicial: '',
        mesas: '',
        me_sillas: ''
    })
    const [SillasMesas, SetSillasmes] = useState({
        sillas: '',
        cantidad: ''
    })
    const [ListaFilas, setFilas] = useState([])
    const [ListaMesa, setMesas] = useState([])
    const [listaFilasConsillas, setFilasSillas] = useState([])
    const GeneraFilas = () => {
        if (filass.inicial != " " && filass.cantidad != " ") {
            const letrafilas = filass.inicial.replace(/[0-9]+/g, "")
            const numeroinicofilas = filass.inicial.replace(/[^0-9]+/g, "");
            const repeticiones = parseInt(numeroinicofilas) + parseInt(filass.cantidad)
            for (i = numeroinicofilas; i < repeticiones; i++) {
                ListadeFilas.push({ fila: letrafilas + "" + i, sillas: 0, asientos: [] });
            }
        }
        setFilas(ListadeFilas)
    }
    const AgregasSillasFila = () => {
        ListadeFilas = ListaFilas
        // console.log(filass.fila,filass.sillas)
        let interar = parseInt(filass.sillas);
        if (filass.fila != "" && filass.sillas != "") {

            if (filass.fila === "Todas") {

                for (i = 0; i < ListadeFilas.length; i++) {
                    ListadeFilas[i]["sillas"] = interar;
                    ListadeFilas[i]["asientos"] = []
                    const numfila = ListadeFilas[i]["fila"]
                    for (f = 0; f < interar; f++) {
                        ListadeFilas[i]["asientos"][f] = { silla: numfila + "-s-" + f, estado: "disponible" };
                    }
                }
                setFilas([])
                setFilasSillas(ListadeFilas)
                setFilas(ListadeFilas)
                setFilasSillas([])

            } else {
                let sillas = []
                let interarr = parseInt(filass.sillas);
                var numero = 0
                var index = ListadeFilas.findIndex(obj => obj.fila == filass.fila);
                var letra = ListadeFilas[index].fila
                ListadeFilas[index].sillas = interarr
                for (g = 0; g < interarr; g++) {
                    numero = 1 + g
                    sillas[g] = { silla: letra + "-s-" + numero, estado: "disponible" }
                }

                ListadeFilas[index].asientos = [...sillas]



                setFilas([...ListadeFilas])

            }
        }
    }
    const GenerMesas = () => {
        if (Mesass.me_inicial != " " && Mesass.me_cantidad != " ") {
            const letrafilas = Mesass.me_inicial.replace(/[0-9]+/g, "")
            const numeroinicofilas = Mesass.me_inicial.replace(/[^0-9]+/g, "");
            const repeticiones = parseInt(numeroinicofilas) + parseInt(Mesass.me_cantidad)
            //  console.log(repeticiones)
            for (i = numeroinicofilas; i < repeticiones; i++) {
                ListadeMesas.push({ mesa: letrafilas + "" + i, sillas: 0, asientos: [] });
            }
        }
        setMesas(ListadeMesas)
        //console.log(ListadeMesas)
    }
    const AgregasSillasMesa = () => {

        if (Mesass.mesas != "" && Mesass.me_sillas != "") {
            ListadeMesas = ListaMesa
            console.log(ListadeMesas)
            let interar = parseInt(Mesass.me_sillas);
            if (Mesass.mesas === "todas") {
                console.log(interar)
                for (i = 0; i < ListadeMesas.length; i++) {
                    ListadeMesas[i]["sillas"] = interar;
                    ListadeMesas[i]["asientos"] = []
                    const nummesa = ListadeMesas[i]["mesa"]
                    for (f = 0; f < interar; f++) {
                        ListadeMesas[i]["asientos"][f] = { silla: nummesa + "-s-" + f, estado: "disponible" };
                    }
                }
                SetSillasmes({ sillas: "Todas", cantidad: interar })
                setMesas([])
                setFilasSillas(ListadeMesas)
                setMesas(ListadeMesas)
                console.log("nueva lista", ListadeMesas)
                setFilasSillas([])
                setMesass({
                    ...Mesass,
                    me_sillas: '',
                    mesas: ''
                })
            } else {
                let sillas = []
                let interarr = parseInt(Mesass.me_sillas);
                var numero = 0
                var index = ListadeMesas.findIndex(obj => obj.mesa == Mesass.mesas);
                // console.log(index,ListadeMesas[index])
                var letra = ListadeMesas[index].mesa
                setMesass({
                    ...Mesass,
                    me_sillas: '',
                    mesas: ''
                })
                for (g = 0; g < interarr; g++) {
                    numero = 1 + g
                    sillas[g] = { silla: letra + "-s-" + numero, estado: "disponible" }
                }
                ListadeMesas[index].sillas = interarr
                ListadeMesas[index].asientos = [...sillas]
                SetSillasmes({ sillas: letra, cantidad: interarr })
                /* setMesass({...Mesass,
                    me_sillas:interarr})*/

                setMesas([...ListadeMesas])

            }


        }

    }

    const cambiar = (a, b, c) => {
        setTabactive({
            tab1: a,
            tab2: b,
            tab3: c
        })

    }
    function handelchangeMesa(e) {
        setMesass({
            ...Mesass,
            [e.name]: e.value
        })
        SetSillasmes({ sillas: '', cantidad: '' })
        //console.log(Mesass)
    }
    function handelchange(e) {
        setFilass({
            ...filass,
            [e.name]: e.value

        })


    }
    async function AgregaLocalidad() {
        try {
            const agrega = await GuardarLocalidad({ "espacio": datosEs.nombre, "descripcion": localidaname.description, "nombre": localidaname.nombre, "mesas_array": JSON.stringify({ Typo: 'fila', datos: ListaFilas }) })
            console.log(agrega)
            console.log({ espacio: datosEs.nombre, description: localidaname.description, nombre: localidaname.nombre, mesas_array: JSON.stringify({ Typo: 'fila', datos: ListaFilas }) })

        } catch (error) {
            console.log(error)

        }

    }
    function handelchangelocalidad(e) {
        setLocalidad({
            ...localidaname,
            [e.name]: e.value
        })
    }





    useEffect(() => {
        console.log("modal", datosEs)
        setTabactive({
            tab1: '',
            tab2: 'd-none',
            tab3: 'd-none'
        })
        console.log(ListaFilas)
        console.log(ListaMesa)
        console.log(sillaarray)
    }, [show])
    return (
        <Modal
            show={show}
            size='lg'
            fullscreen={true}

            animation={true}
            onHide={() => setShowToast(false)}
        >
            <Modal.Header   >
                <Modal.Title>Registro de Localidad en {datosEs ? datosEs.nombre : ''} </Modal.Title>
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
                                    onClick={() => cambiar('', 'd-none', 'd-none')}
                                >Filas y Asientos</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " data-toggle="tab" href="#mesas"
                                    onClick={() => cambiar('d-none', '', 'd-none')}
                                >Mesas y sillas</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#correlativos"
                                    onClick={() => cambiar('d-none', 'd-none', '')}
                                >Números Correlativos</a>
                            </li>

                        </ul>
                    </div>
                    <div className='row col-12 pt-2'>
                        <div className="col-sm-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <label className="form-label"><b>Nombre</b></label>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                                </div>
                                                <input type="text" className="form-control" id="nombre" name="nombre"
                                                    value={localidaname.nombre}
                                                    onChange={(e) => handelchangelocalidad(e.target)}
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
                                                <input type="text" className="form-control" id="descripcion" name="description"
                                                    value={localidaname.description}
                                                    onChange={(e) => handelchangelocalidad(e.target)}
                                                    placeholder="Ingresa una descripción de la seccion" />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content col-sm-7">
                            <div className="tab-pane active container " id="filas">
                                <div className="mt-4 row">
                                    <div className="col-sm-5">
                                        <label className="form-label"><b>Cantidad de filas</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="number" minLength={1} name="cantidad"
                                                value={filass.cantidad}
                                                className="form-control" id="cantidad"
                                                onChange={(e) => handelchange(e.target)}
                                                placeholder="10" />
                                        </div>
                                    </div>


                                    <div className="col-sm-5">
                                        <label className="form-label"><b>Número inicial</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="text"
                                                name="inicial"
                                                value={filass.inicial}
                                                onChange={(e) => handelchange(e.target)}
                                                className="form-control" id="numero_inicial"
                                                placeholder="10" />
                                        </div>
                                    </div>

                                    <div className="col-sm-2 text-left">
                                        <label className="form-label" style={{ color: 'white' }}><b>.</b></label><br />
                                        <button className="btn btn-info" onClick={GeneraFilas}><i className="fa fa-plus"></i></button>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="text" name="sillas" className="form-control"
                                                id="sillas"
                                                value={filass.sillas}
                                                onChange={(e) => handelchange(e.target)}
                                                placeholder="# Sillas" />
                                        </div>
                                    </div>
                                    <div className="col-sm-5">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <select className="form-control " value={filass.fila} name='fila' aria-label="Selecione Fila" onChange={(e) => handelchange(e.target)} >
                                                <option >Seleccione una opcion</option>
                                                <option value={"Todas"}>Todas</option>
                                                {ListaFilas.length > 0 ?
                                                    ListaFilas.map((elem, i) => {
                                                        return (
                                                            <option key={i} value={elem.fila}>{elem.fila}</option>
                                                        )

                                                    }) : ""}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-success" onClick={AgregasSillasFila} >
                                            Agregar
                                        </button>
                                    </div>

                                </div>



                            </div>
                            <div className="tab-pane  container" id="mesas">
                                <Accordion defaultActiveKey="0" flush>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                                        <Accordion.Body>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                            culpa qui officia deserunt mollit anim id est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>






                            </div>
                            <div className="tab-pane container" id="correlativos">
                                <div className="mt-4 row">
                                    <div className="col-sm-6">
                                        <label className="form-label"><b>Cantidad de asientos</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="number" className="form-control" id="nc_ca" placeholder="100" />
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <label className="form-label"><b>Primer número</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="number" className="form-control" id="nc_nombre" placeholder="100" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>





                    </div>

                    {ListaFilas.length > 0 ?
                        <div className='conatiner'>
                            <div className={"col-sm-12 text-center " + tabactivo.tab1} style={{ height: '400px', overflowY: 'auto', overflowX: 'auto', }}>
                                {ListaFilas.length > 0 ?

                                    ListaFilas.map((e, i) => {

                                        {
                                            return (
                                                <div className='d-flex  px-3 pt-1' key={"lista" + i}>
                                                    <OverlayTrigger placement='right' overlay={<Tooltip id={"tooltip-disabled"}>Asientos {e.asientos.length > 0 ? e.asientos.length : ""}</Tooltip>}>
                                                        <span className="d-inline-block " disabled >
                                                            <div className="d-flex   mx-1 bg-primary text-white shadow-md  rounded-5 text-center  justify-content-center align-items-center" style={{ height: '50px', width: '50px' }} >
                                                                {e.fila}
                                                            </div>
                                                        </span>
                                                    </OverlayTrigger>


                                                    {e.asientos.length > 0 ?
                                                        <div className=' d-flex p-1 justify-content-center align-items-center ' >
                                                            {e.asientos.map((silla, index) => {
                                                                return (
                                                                    <div key={"silla" + index} className='d-flex   mx-1 bg-light shadow-md  rounded-5 text-center  justify-content-center align-items-center ' style={{ height: '50px', width: '50px' }} >
                                                                        <div className={'px-3 ' + silla.silla} >
                                                                            {index}
                                                                        </div>
                                                                    </div>)
                                                            })}
                                                        </div> : ""}



                                                </div>

                                            )
                                        }


                                    })
                                    : ""}
                            </div>
                            <div className='d-flex justify-content-end pt-2'>
                                <button className='btn btn-success float-rigth' onClick={AgregaLocalidad}>Guardar</button>
                            </div>

                        </div> : ""}
                    <div className={"col-sm-12  text-center " + tabactivo.tab2}  >





                        <div className={"col-sm-12 text-center "} style={{ height: '400px', overflowY: 'auto', overflowX: 'auto', }}>
                            {ListaMesa.length > 0 ?
                                ejemplo.map((e, index) => {
                                    return (
                                        <div className='d-flex  px-3 align-items-center' key={index}>
                                            <div className='d-flex pb-2'>
                                                <MesacerView
                                                    text={index}
                                                />
                                            </div>

                                            <div className='d-flex  pb-2' style={{ overflowX: 'auto', overflowY: 'hide' }}>
                                                {ListaMesa.map((e, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <MesasView
                                                                status={e.asientos.length}
                                                                text={e.mesa + "" + index} />
                                                        </div>

                                                    )
                                                })}
                                            </div>
                                        </div>)

                                }) : ""}
                        </div>
                    </div>
                    <div className={"container-fluid col-sm-12 " + tabactivo.tab3} >

                        <div className=' d-flex flex-wrap '>
                            <div className='col-3'>
                                <h3>
                                    General
                                </h3>
                            </div>
                            <div className='col-7'>
                                <ProgressBar
                                    style={{ height: '40px' }}
                                >
                                    <ProgressBar variant="danger" now={50} key={1} />
                                    <ProgressBar variant="success" label={"500 "} now={450} key={2} />
                                </ProgressBar>
                            </div>
                            <div className='col-2'>
                                <button className='btn btn-primary' ><i className='fa fa-edit'></i> </button>
                            </div>
                        </div>
                        <div className='d-flex flex-wrap'>
                            <div className='col-3'>
                                <h3>
                                    Vip
                                </h3>
                            </div>
                            <div className='col-7'>
                                <ProgressBar
                                    style={{ height: '40px' }}
                                >
                                    <ProgressBar variant="danger" now={50} key={1} />
                                    <ProgressBar variant="success" label={"500 "} now={450} key={2} />
                                </ProgressBar>
                            </div>
                            <div className='col-2'>
                                <button className='btn btn-primary' ><i className='fa fa-edit'></i> </button>
                            </div>
                        </div>



                    </div>
                </div>


            </Modal.Body>


            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )

}
export default Registroseccion