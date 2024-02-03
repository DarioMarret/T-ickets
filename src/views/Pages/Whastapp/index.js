import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { useEffect, useState } from 'react';
import { DeleteQrCuenta, EliminarMasivo, Imporcontactos, ListarMasivos, NuevaConexiopnQR, ObtenerContactos, ProgramarQR, getQrLista, postQRGenerado } from './utils/index';
import TablasViwe from 'layouts/Tablasdoc';
import { Modal } from 'react-bootstrap';
import { Obtenerlinkimagen } from 'utils/Querypanel';
import "./index.css"

const WhatsAppViewmal = () => {
    let [listaQr, setQrList] = useState([])
    let [file, setFiles] = useState(undefined)
    let [show, setMensaje] = useState(false)
    let [masivos, setMasivos] = useState([])
    let [contactos, setContactos] = useState([])
    let [cuentaId, setCuenta] = useState({
        "cuentaId": "",
        "nombre": ""
    })

    let [envios, setEmvios] = useState({
        "cuentaId": "",
        "nombre": "",
        "mensaje": "",
        "imagen": "",
        "video": "",
        "fecha_envio": "",
        "hora_envio": ""
    })

    async function Enviosmasivo() {
        // console.log(envios)
        let { cuentaId, mensaje, fecha_envio, hora_envio } = envios
        if (!Object.values([cuentaId, mensaje, fecha_envio, hora_envio]).every(e => e)) {
            console.log(envios)
            $.alert("Complete los campos requeridos")
            return
        }
        console.log(file)
        if (file) {
            const mapa = await Obtenerlinkimagen(file)
            if (mapa == null) {

            } else {
                let parms = {
                    ...envios,
                    "imagen": mapa
                }
                console.log("con imagen ", parms)
                ProgramarQR(parms).then(ouput => {
                    console.log(ouput)
                    setMensaje(false)
                    $.alert(JSON.stringify(ouput))
                }).catch(err => {
                    $.alert(err.message)
                });
            }
        } else {
            let parms = {
                ...envios,
            }
            console.log("Sin imagen", parms)
            ProgramarQR(parms).then(ouput => {
                console.log(ouput)
                $.alert(JSON.stringify(ouput))
            }).catch(err => {
                $.alert(err.message)
            });
        }
    }
    async function BorrarMasivos(e){
        $.confirm({
            title: 'Eliminar Masivo id'+e,
            content: '',
            buttons: {
                formSubmit: {
                    text: 'Aceptar',
                    btnClass: 'btn-blue',
                    action: async function () {
                        EliminarMasivo(e).then(ouput => {
                            if (ouput.status==200){
                                ObtenerMasivos(0)
                                $.alert("Masivo Eliminados")
                            }
                            return true
                        }).catch(err => {
                            
                            return true
                        })
                        return false;
                    }
                },
                cancel: function () {
                    // Acción a realizar si se cancela
                },
            },
        });
       
    }
    function eliminarcuenta(e) {
        //return
        DeleteQrCuenta(e).then(ouput => {
            console.log(ouput)
            let nuevo = listaQr.filter(elemen => elemen.id != e)
            setQrList(nuevo)
        }).catch(err => {
            $.alert('Error al Eliminar Cuenta: ' + err);
        })

    }
    useEffect(() => {
        getQrLista().then(ouput => {
            console.log(ouput)
            if (ouput.length) {
                setQrList(ouput);
            }
        }).catch(error => {
            console.log(error)
        })
        //ObtenerMasivos(0)
    }, [])

    function handleChange(e) {
        setEmvios({
            ...envios,
            [e.target.name]: e.target.value
        })
    }
    async function ObtenerMasivos(e) {
        $('#contact-tab').tab('show');
        try {
            if (e.id == 0) {
                setCuenta({
                    "cuentaId": "",
                    "nombre": "Todos"
                })
                let data = await ListarMasivos(e.id)
                if (data.status == 200) {

                    setMasivos(data.data)
                }
                return data
            } else {
                let data = await ListarMasivos(e.id)
                if (data.status == 200) {
                    setMasivos(data.data)
                    setCuenta({
                        "cuentaId": e.cuentaId,
                        "nombre": e.nombre
                    })
                }
                return data
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async function ObtenerlistaContactos(e) {
        $('#profile-tab').tab('show');
        try {
            if (e.id == 0) {
                let data = await ObtenerContactos(e.id)
                if (data.status == 200) {
                    console.log(data)
                    setContactos(data.data)
                    setCuenta({
                        "cuentaId": "",
                        "nombre": "Todos"
                    })
                }
                return data
            } else {
                let data = await ObtenerContactos(e.id)
                if (data.status == 200) {
                    console.log(data)
                    setContactos(data.data)
                    setCuenta({
                        "cuentaId": e.cuentaId,
                        "nombre": e.nombre
                    })
                }
                return data
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
    function imegenes(e) {
        console.log(e.files[0])
        setFiles(e.files[0])
    }
    function QRCode() {
        /*content: '' +
            '<form action="" class="formName">' +
            '<div class="container form-group">' +
            '<label></label>' +
            '<input  type="text" placeholder="" value="' + e.cedula + '" class="form-control name" required />' +
            '</div>' +
            '</form>',*/
        //var name = this.$content.find('.name').val();
        $.confirm({
            title: 'Agregar nombre de sessión',
            content: '<form action="" class="formName">' +
                '<div class="container form-group">' +
                '<label class="form-label">Nombre</label>' +
                '<input  type="text" placeholder="" value="" class="form-control name" required />' +
                '<label class="form-label">Telefono</label>' +
                '<input  type="text" placeholder="" value="" class="form-control telefono" required />' +

                '</div>' +
                '</form>',
            //theme: 'supervan',
            buttons: {
                agregar: {
                    text: 'Agregar ',
                    action: function () {
                        var name = this.$content.find('.name').val();
                        var telefono = this.$content.find('.telefono').val();
                        console.log(name)
                        if (name != "" && telefono != "") {
                            postQRGenerado({ "nombre": name, "numero": telefono }).then((data) => {
                                console.log(data)
                            }).catch(err => {
                                console.log(err)
                            })
                        } else {
                            $.alert('Complete toda la información');
                        }
                        //$.alert('Shift or Alt was pressed');
                    }
                },
                cancel: {
                    text: 'Cancelar',
                    action: function () {
                        // $.alert('A or B was pressed');
                    }
                }
            }
        });
    }
    const theads = () => {
        return (
            <thead className="">
                <tr className="border ">
                    <th  >#</th>
                    <th className="text-xs text-center">Id</th>
                    <th className="text-xs text-center">Número</th>
                    <th className="text-xs text-center">Nombre</th>
                    <th className="text-xs text-center">Estado</th>
                    <th className="text-xs text-center">Link</th>
                </tr>
            </thead>
        )
    }
    const ShowFoder = () => {
        try {
            return listaQr.map((item, index) => {

                return (
                    <tr key={index}>
                        <th  >#</th>
                        <td className="text-xs text-center">{item.id}</td>
                        <td className="text-xs text-center">{item.numero}</td>
                        <td className="text-xs text-center">{item.nombre}</td>
                        <td className="text-xs text-center ">{item.estado}</td>
                        <td className="text-xs text-center ">
                            <div class="btn-group" role="group" >
                                <button class=" btn-sm btn btn-default contenedor" onClick={() => ShowModal(item)}> <span className='mostrarEnHover'>Crear Masivos</span>  <i className='fa fa-send'></i> </button>
                                <a class=" btn-sm btn btn-default contenedor" href={item.url_qr} target="_blank"><span className='mostrarEnHover'>Scanear</span> <i className='fa fa-link'></i> </a>
                                <button class=" btn-sm btn btn-default contenedor" onClick={() => eliminarcuenta(item.id)}><span className='mostrarEnHover'>Borrar</span>  <i className='fa fa-trash'></i> </button>
                                <button class=" btn-sm btn btn-default contenedor" onClick={() => console.log(item.id)}> <span className='mostrarEnHover'>Importar</span> <i className='fa fa-paperclip'></i> </button>
                                <button class=" btn-sm btn btn-default contenedor" onClick={() => ObtenerlistaContactos(item)}><span className='mostrarEnHover'>ver contactos</span>  <i className='fa fa-user'></i> </button>
                                <button className=' btn-sm btn btn-default contenedor' onClick={() => ObtenerMasivos(item)}

                                ><span className=' mostrarEnHover'> Ver Masivos</span> <i className=' fa fa-paper-plane'></i> </button>
                            </div>
                        </td>
                    </tr>
                )
            });
        } catch (error) { }
    }
    const theadMasivos = () => {
        return (
            <thead className="">
                <tr className="border ">
                    <th  >#</th>
                    <th className="text-xs text-center">IdMasivo</th>
                    <th className="text-xs text-center">IdCuenta</th>
                    <th className="text-xs text-center">Mensaje</th>
                    <th className=" text-xs text-center">fecha_creacion</th>
                    <th className=' text-xs text-center'>fecha_ultimo_envio</th>
                    <th className=' text-xs text-center'>estado</th>
                    <th className="text-xs text-center">Link</th>
                </tr>
            </thead>
        )
    }
    const ShowFoderMasivos = () => {
        try {

            return masivos.map((item, index) => {

                return (
                    <tr key={index}>
                        <th  >#</th>
                        <td className="text-xs text-center">{item.id}</td>
                        <td className="text-xs text-center">{item.cuentaId}</td>
                        <td className="text-xs text-center">{item.mensaje}</td>
                        <td className='text-xs text-center'>{item.fecha_creacion}</td>
                        <td className='text-xs text-center'>{item.fecha_ultimo_envio} </td>
                        <td className="text-xs text-center ">{item.estado}</td>
                        <td className="text-xs text-center ">
                            <div class="btn-group" role="group" >
                                {item.estado == "finalizado" ? "" : <button class=" btn-sm btn btn-default contenedor" onClick={() => ImportarContactos(item)}><span className='mostrarEnHover'> Importar contactos  Masivos</span>  <i className='fa fa-send'></i> </button>}
                                <button class=" btn-sm btn btn-default contenedor d-none" onClick={() => console.log(item.url_qr)}> <i className='fa fa-link'></i> </button>
                                <button class=" btn-sm btn btn-default contenedor" onClick={() => BorrarMasivos(item.id)}> <i className='fa fa-trash'></i> </button>
                            </div>
                        </td>
                    </tr>
                )
            });
        } catch (error) { }
    }
    const theadContactios = () => {
        return (
            <thead className="">
                <tr className="border ">
                    <th  >#</th>
                    <th className="text-xs text-center">Idnumero</th>
                    <th className="text-xs text-center">IdCuenta</th>
                    <th className="text-xs text-center">Número</th>
                    <th className="text-xs text-center">Estado</th>
                    <th className="text-xs text-center">Link</th>
                </tr>
            </thead>
        )
    }
    const ShowFoderContactos = () => {
        try {

            return contactos.map((item, index) => {

                return (
                    <tr key={index}>
                        <th  >#</th>
                        <td className="text-xs text-center">{item.id}</td>
                        <td className="text-xs text-center">{item.cuentaId}</td>
                        <td className="text-xs text-center">{item.numero}</td>
                        <td className="text-xs text-center ">{item.estado}</td>
                        <td className="text-xs text-center ">
                            <div class="btn-group" role="group" >
                                <button class=" btn-sm btn btn-default" onClick={() => console.log(item.nombre)}> <i className='fa fa-refresh'></i> </button>
                                <button class=" btn-sm btn btn-default" onClick={() => console.log(item.estado)}> <i className='fa fa-trash'></i> </button>
                            </div>
                        </td>
                    </tr>
                )
            });
        } catch (error) { }
    }

    const ShowModal = (item) => {
        console.log(item)
        setEmvios({
            "cuentaId": item.id,
            "nombre": item.nombre,
            "mensaje": "",
            "imagen": "",
            "video": "",
            "fecha_envio": "",
            "hora_envio": ""
        })
        setMensaje(!show);

    }
    const ImportarContactos = (item) => {
        $.confirm({
            title: 'Importar Contacto',
            content: '' +
                '<form action="" class="formFile">' +
                '<div class="form-group">' +
                '<label>Subir Archivo:</label>' +
                '<input type="file" name="fileToUpload" id="fileToUpload" class="form-control" required accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>' +
                '</div>' +
                '</form>',
            buttons: {
                formSubmit: {
                    text: 'Submit',
                    btnClass: 'btn-blue',
                    action: async function () {
                        // Aquí puedes realizar alguna acción con el archivo seleccionado
                        var fileInput = this.$content.find('#fileToUpload')[0];
                        var selectedFile = fileInput.files[0];
                        console.log('File Selected:', selectedFile);
                        Imporcontactos(item.id, item.cuentaId, selectedFile).then(ouput => {
                           // { "status": 200, "message": "Contactos importados correctamente" }
                            if (ouput.status == 200) {
                                $.alert(ouput.message)
                            }
                            return true
                        }).catch(err => {
                            $.alert("Error al importar los contactos" + err)
                        })
                        // Si necesitas enviar el archivo a través de una petición AJAX, puedes hacerlo aquí

                        // Devuelve false para evitar que el cuadro de diálogo se cierre automáticamente
                        return false;
                    }
                },
                cancel: function () {
                    // Acción a realizar si se cancela
                },
            },
        });

    }
    return (
        <div className=' container-fluid'>

            <Modal show={show} >
                <Modal.Body>
                    <div className='row'>
                        <div className=' row'>
                            <div className='col-6'>
                                <label className=' form-label'>Bot :{envios.nombre} </label>
                            </div>
                            <div className='col-6  text-end'>
                                <button className='close text-dark' onClick={() => setMensaje(false)}>x</button>
                            </div>
                        </div>
                        <div className=' form-group'>
                            <label className=' form-label'>Titulo</label>
                            <input className=' form-control' type="text"></input>
                        </div>
                        <div className='form-group d-flex px-0'>
                            <div className='col-8 form-group'>
                                <label className=' form-label'>Fecha </label>
                                <input className=' form-control' type="date"
                                    name='fecha_envio' value={envios.fecha_envio}

                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label className=' form-label'>Hora </label>
                                <input className=' form-control' type="time"
                                    name='hora_envio' value={envios.hora_envio}

                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                        <div className=' form-group'>
                            <label className=' form-label'>Mensaje</label>
                            <textarea name='mensaje' value={envios.mensaje}

                                onChange={(e) => handleChange(e)}
                                className=' form-control' rows={4} cols={30}></textarea>
                        </div>
                        <div className=' form-group'>
                            <label className=' form-label' >Imagen </label>
                            <input className=' form-control' accept="image/*" type="file"
                                id='imagen' name='imagen'
                                onChange={(e) => imegenes(e.target)}
                            ></input>
                        </div>
                    </div>
                    <botton className="col-12 btn  btn-secondary" onClick={Enviosmasivo}>Programar</botton>

                </Modal.Body>
            </Modal>
            <button className='btn btn-success' onClick={QRCode}>Agregar numero  <i className='fa fa-plus'></i></button>

            <div className="card card-primary  card-outline text-left">
                <div className="card-header">

                </div>
                <div className="p-3">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Números</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"
                                onClick={() => ObtenerlistaContactos({ id: 0 })}
                            >Contactos</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false"
                                onClick={() => ObtenerMasivos({ id: 0 })}
                            >Masivos Creados</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <TablasViwe
                                number={5}
                                thead={theads}
                                showDatos={ShowFoder}
                                Titel={""}
                                nombre={"numeros"}
                            />
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                            <div className=' container-fluid'>
                                <p>Cuenta: {cuentaId.nombre}</p>
                            </div>
                            {contactos.length > 0 ? <TablasViwe
                                number={4}
                                thead={theadContactios}
                                showDatos={ShowFoderContactos}
                                Titel={"Cuenta" + cuentaId.nombre}
                                nombre={"contactos"}
                            />
                                : <div className=' container-fluid text-center'>
                                    <p>No hay Datos a mostrar</p>
                                </div>}

                        </div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                            <div className=' container-fluid'>
                                <p>Cuenta: {cuentaId.nombre}</p>
                            </div>
                            {masivos.length > 0 ? <TablasViwe
                                number={7}
                                thead={theadMasivos}
                                showDatos={ShowFoderMasivos}
                                Titel={""}
                                nombre={"masivo"}
                            /> :
                                <div className=' container-fluid text-center'>
                                    <p>No hay Datos a mostrar</p>
                                </div>
                            }

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WhatsAppViewmal;