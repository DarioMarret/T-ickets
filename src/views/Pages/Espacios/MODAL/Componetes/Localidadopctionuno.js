import React, { useEffect, useState } from "react"
import { Modal, ProgressBar, OverlayTrigger, Tooltip, Button } from "react-bootstrap"
import { AptualizarLocalida } from "utils/Querypanel"
import { GuardarLocalidad } from "utils/LocalidadesQuery/index.js"
import { useDispatch } from "react-redux"
import { setToastes } from "StoreRedux/Slice/ToastSlice"
const TabunoView = (props) => {
    const { localidaname, datalocalidad, SetDataloca } = props
    let usedispatch = useDispatch()
    let ListadeFilas = []
    const [nmobretabuno, setLocalidad] = useState({
        nombre: '',
        description: '',
        id: ''
    })
    const [filass, setFilass] = useState({
        cantidad: '',
        inicial: '',
        fila: '',
        sillas: ''

    })
    const [ListaFilas, setFilas] = useState([])
    const [listaFilasConsillas, setFilasSillas] = useState([])
    const GeneraFilas = () => {
        if (filass.inicial != " " && filass.cantidad != " ") {
            const letrafilas = filass.inicial.replace(/[0-9]+/g, "") ? filass.inicial.replace(/[0-9]+/g, "") : 'F'
            const numeroinicofilas = filass.inicial.replace(/[^0-9]+/g, "") ? filass.inicial.replace(/[^0-9]+/g, "") : 1;
            console.log(letrafilas, numeroinicofilas)
            const repeticiones = parseInt(numeroinicofilas) + parseInt(filass.cantidad)
            for (var i = numeroinicofilas; i < repeticiones; i++) {
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

                for (var i = 0; i < ListadeFilas.length; i++) {
                    ListadeFilas[i]["sillas"] = interar;
                    ListadeFilas[i]["asientos"] = []
                    const numfila = ListadeFilas[i]["fila"]
                    for (var f = 0; f < interar; f++) {
                        numero = 1 + f
                        ListadeFilas[i]["asientos"][f] = { silla: numfila + "-s-" + numero, estado: "disponible", };
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
                for (var g = 0; g < interarr; g++) {
                    numero = 1 + g
                    sillas[g] = { silla: letra + "-s-" + numero, estado: "disponible", }
                }

                ListadeFilas[index].asientos = [...sillas]



                setFilas([...ListadeFilas])

            }
        }
    }
    function handelchange(e) {
        setFilass({
            ...filass,
            [e.name]: e.value

        })
    }
    function handelchangelocalidad(e) {
        setLocalidad({
            ...nmobretabuno,
            [e.name]: e.value
        })

    }
    //Valida la cantidad de sillas Por Filas 
    function ValidarSillas() {
        const isValido = (currentValue) => currentValue > 5;
        let asiento = []
        if (ListaFilas.length > 0) {
            ListaFilas.forEach((obj, i) => {
                asiento[i] = obj.asientos.length
            })
            console.log(asiento)
            console.log(Object.values(asiento).every(isValido))
            if (Object.values(asiento).every(isValido)) { return true }
            else return true
        }
        else
            return true
    }

    async function AgregaLocalidad() {
        console.log(localidaname)
        if (nmobretabuno.nombre == "" || nmobretabuno.description == "" || ListaFilas.length < 0 || !filass.sillas > 40) {
            usedispatch(setToastes({ show: true, message: 'Complete todos los datos antes de guaradar', color: 'bg-danger', estado: 'Datos incompletos' }))
            return
        }
       /* if (!ValidarSillas()) {
            usedispatch(setToastes({ show: true, message: 'Verifica que todas las filas tengan más de 6 sillas ', color: 'bg-danger', estado: 'Hay filas sin Asientos ' }))
            return
        }*/
        else {
            try {
                console.log(ListaFilas)
                console.log({ Typo: 'fila', datos: ListaFilas })
                const guardad = await GuardarLocalidad({ "espacio": localidaname.nombre, "descripcion": nmobretabuno.description, "id_espacio": localidaname.id, "nombre": nmobretabuno.nombre, "mesas_array": JSON.stringify({ Typo: 'fila', datos: ListaFilas }) })
                if (guardad.success) {
                    SetDataloca({
                        typo: '',
                        nombre: '',
                        description: '',
                        id: '',
                        array: ''
                    })

                    setFilas([])
                    usedispatch(setToastes({ show: true, message: 'Localidad creada correctamente', color: 'bg-success', estado: 'Datos guardados' }))
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    async function actualizalocalidad() {
        if (nmobretabuno.nombre == "" || nmobretabuno.description == "" || ListaFilas.length < 0 || !filass.sillas > 40) {
            usedispatch(setToastes({ show: true, message: 'Complete todos los datos y verifique no sobrepasar el limite de 39 sillas', color: 'bg-danger', estado: 'Datos incompletos' }))
            return
        }
        if (!ValidarSillas()) {
            usedispatch(setToastes({ show: true, message: 'Verifica que todas las filas tengan más de 5 sillas ', color: 'bg-danger', estado: 'Hay filas sin Asientos ' }))
            return
        }
        else {
            try {
                const actualiza = await AptualizarLocalida({ "id": nmobretabuno.id, "espacio": localidaname.nombre, "id_espacio": localidaname.id, "descripcion": nmobretabuno.description, "nombre": nmobretabuno.nombre, "mesas_array": JSON.stringify({ Typo: 'fila', datos: ListaFilas }) })
                if (actualiza.success) {

                    setLocalidad({
                        nombre: '',
                        description: '',
                        id: ''
                    })
                    setFilas([])
                    usedispatch(setToastes({ show: true, message: 'Localidad actualizada correctamente', color: 'bg-success', estado: 'Datos Actualizados' }))
                }

            } catch (error) {
                usedispatch(setToastes({ show: true, message: 'Hubo un error, Complete todos los datos y verifique no sobrepasar el limite de  sillas', color: 'bg-danger', estado: 'Datos incompletos' }))

                console.log(error)

            }
        }


    }
    //  console.log(ListaFilas)
    useEffect(() => {
        if (datalocalidad.typo == "fila") {
            // console.log("Filas", datalocalidad)
            setLocalidad({
                nombre: datalocalidad.nombre,
                description: datalocalidad.description,
                id: datalocalidad.id
            })
            setFilas(datalocalidad.array)
        }
    }, [datalocalidad])

    return (<>
        <div className="d-flex flex-column">
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
                                            value={nmobretabuno.nombre}
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
                                            value={nmobretabuno.description}
                                            onChange={(e) => handelchangelocalidad(e.target)}
                                            placeholder="Ingresa una descripción de la seccion" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-sm-12">
                                    <label className="form-label"><b>Alinear </b></label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><i className="fas fa-quote-right"></i></span>
                                        </div>
                                        <select className=" form-select" value={nmobretabuno.aling}
                                            name="aling"
                                            onChange={(e) => handelchangelocalidad(e.target)}>
                                            <option value={"justify-content-center"}>Centrado</option>
                                            <option value={"justify-content-star"}>Izquierda</option>
                                            <option value={"justify-content-end"}>Derecha</option>
                                        </select>
                                        <input type="text" className="form-control" id="descripcion" name="description"


                                            placeholder="Ingresa una descripción de la seccion" />
                                    </div>
                                </div>
                            </div>*/}

                            <div className="d-flex row">
                                {nmobretabuno.id !== "" ? <button onClick={actualizalocalidad} className="btn btn-primary col-12">Actualizar</button> : ''}
                                {nmobretabuno.id !== "" ? '' : <button onClick={AgregaLocalidad} className="btn btn-success col-12">Guardar</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" col-sm-7 row">
                    <div className="col-sm-5">
                        <label className="form-label"><b>Cantidad de filas</b></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                            </div>
                            <input type="number" minLength={1} name="cantidad"
                                value={filass.cantidad}
                                className="form-control" id="cantidad"
                                min={1}
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
                                size="4"
                                value={filass.inicial}
                                onChange={(e) => handelchange(e.target)}
                                className="form-control" id="numero_inicial"
                                maxLength="2"
                                placeholder="A1" />
                        </div>
                    </div>
                    <div className="col-sm-2 text-left">
                        <label className="form-label" style={{ color: 'white' }}><b>.</b></label><br />
                        <button className="btn btn-success" onClick={GeneraFilas}><i className="fa fa-plus"></i></button>
                    </div>
                    <div className="col-sm-5">
                        <label className="form-label"><b>Sillas x fila</b></label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                            </div>
                            <input type="number" name="sillas" className="form-control"
                                id="sillas"
                                value={filass.sillas}
                                max={39}
                                onChange={(e) => handelchange(e.target)}
                                placeholder="# Sillas" />
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <label className="form-label"><b>Filas</b></label>
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
                        <label className="form-label" style={{ color: 'white' }}><b>.</b></label><br />
                        <button className="btn btn-success" onClick={AgregasSillasFila} >
                            Agregar
                        </button>
                    </div>

                </div>
            </div>

            {ListaFilas.length > 0 ?
                <div className='conatiner col-12'>
                    <div className={" col-sm-12 text-center bg- "} style={{ height: '400px', overflowY: 'auto', overflowX: 'auto', }}>

                        {ListaFilas.length > 0 ?

                            ListaFilas.map((e, i) => {

                                {
                                    return (
                                        <div className={"d-flex  flex-row "} key={"lista" + i}>
                                            <OverlayTrigger placement='right' overlay={<Tooltip id={"tooltip-disabled"}>Asientos {e.asientos.length > 0 ? e.asientos.length : ""}</Tooltip>}>
                                                <span className="d-inline-block " disabled >
                                                    <div className="d-flex   mx-1 bg-primary text-white justify-content-center align-items-center rounded-5  " style={{ height: '30px', width: '30px' }} >
                                                        <div className="d-flex justify-content-center">
                                                            <span style={{ fontSize: '0.7em' }}>    {e.fila} </span>
                                                        </div>

                                                    </div>
                                                </span>
                                            </OverlayTrigger>
                                            <div className='d-flex  px-3 p-1 justify-content-ce  ' style={{ width: '' }}>

                                                {/*
                        <div key={"silla"+index}  className='d-flex  bg-success   rounded-5 text-center  justify-content-center align-items-center '
                         style={{ height:'30px', width:'30px',marginLeft:silla.marginLeft,marginRight:index==4&&i>0?'130px':'1px' }} >
                        <div className={'px-3 '+ silla.silla +'d-flex   text-white justify-content-center  '} >
                        <div className="d-flex justify-content-center">
                     <span style={{fontSize:'0.7em'}}>    {numero} </span>
                     </div>
                        </div>  
                        </div>  
                    
                    */}

                                                {e.asientos.length > 0 ?
                                                    <div className=' d-flex px-1  align-items-stretch  ' style={{ width: '' }}>
                                                        {e.asientos.map((silla, index, arr) => {
                                                            let numero = index + 1
                                                            return (
                                                                <div key={"silla" + index} className='d-flex  bg-success   rounded-5 text-center  justify-content-center align-items-center '
                                                                    style={{ height: '30px', width: '30px', marginLeft: '1px' }} >
                                                                    <div className={'px-3 ' + silla.silla + 'd-flex   text-white justify-content-center  '} >
                                                                        <div className="d-flex justify-content-center">
                                                                            <span style={{ fontSize: '0.7em' }}>    {numero} </span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            )
                                                        })}
                                                    </div> : ""}




                                            </div>
                                        </div>

                                    )
                                }


                            })
                            : ""}

                    </div>
                    <div className='d-flex justify-content-end pt-2'>

                    </div>

                </div> : ""}

        </div>
    </>)

}
export default TabunoView