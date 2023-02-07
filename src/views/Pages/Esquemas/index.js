
import { array } from "prop-types"
import React, { useEffect, useState } from "react"
import { Accordion } from "react-bootstrap"
import { ListarLocalidad } from "utils/LocalidadesQuery/index.js"
import Form from 'react-bootstrap/Form';
import './index.css'
import { QRCodeCanvas } from "qrcode.react"
import jsPDF from "jspdf"

const EsquemaViews = () => {

    let marginLetf = ''
    let marginRight = ''
    let Top = ''
    let left = ''
    let rigth = ''
    let bottom = ""
    let rotar = 'transform:rotate'
    const [localidad, setLocalidad] = useState([])
    const [dataMap, setDatosMap] = useState([])
    const [elemtoselet, setElemnto] = useState({
        nombre: "",
        tipo: "",
    })
    const [datosalterables, setDatos] = useState({
        height: '',
        width: '',
        top: '',
        left: '',
        bottom: '',
        rigth: '',
        rotar: '',
    })
    async function ObtenLocalidad() {
        try {
            const datos = await ListarLocalidad()
            const { success, data } = datos

            if (success) {
                const filtrado = data.filter(e => e.espacio == 'Recinto ferial Santo Domingo')
                const obten = data.map((e, i) => {
                    let dato = JSON.parse(e.mesas_array)
                    return { ...e, tipo: dato.Typo, arry: dato }
                })
                setLocalidad(obten)
                console.log("localidada", obten)
            }
        } catch (error) {
            console.log(error)
        }
    }
    function AgregarEspacio() {
        let arryestructuraespacio = {
            tipo: 'espacio',
            nombre: 'nombre ejemplo Tarima',
            height: '',
            width: '',
            top: '',
            left: '',
            bottom: '',
            rigth: '',
            rotar: '',
            color: '',
            marginleft: '',
            marginRight: '',
        }
        $('#ingreso').append(
            "<div className='bg-success border border-dark' style='position:relative; height:" + 50 + "px;" +
            "width:100px;'></div>")
    }
    function AgregagaLocalidad() {

    }
    const SubmitEspacio = e => {
        e.preventDefault();
        //dataMap,setDatosMap
        let mapa = dataMap
        const form = new FormData(e.target)
        const { ancho, alto, color, titel } = Object.fromEntries(form.entries())
        let agrega = {
            tipo: "espacio",
            alto: alto,
            color: color,
            nombre: titel
        }
        /*     mapa.push(agrega)
             $('#ingreso').append(
                "<div className='espacio "+ titel +"  d-flex justify-content-center align-items-center border border-dark' style='position:relative; height:"+alto+"px;" +
               "width:"+ancho+"px; background:"+color+
               "'><h5 style='font-size:1.5em; color:#ffff' >"+titel+"</h5>   </div>")
               setDatosMap(mapa)
            // console.log(form)*/
    }
    const SubmitLocalidad = e => {
        e.preventDefault();
        const form = new FormData(e.target)
        //const {ancho,alto,color,titel} = Object.fromEntries(form.entries())

    }


    $(document).on("click", "div.espacio", function () {
        //console.log(this.classList)
        setElemnto({
            nombre: this.classList[1],
            tipo: this.classList[0],
        })
    })
    /*$(document).on("click","div.localidad",function(e){
       const id = e.target.id;
      console.log(id)
       console.log(this.classList)
    })*/
    $(document).on("click", "div.disponible", function () {
        console.log(this.classList)
        $("." + this.classList).css({ "background-color": "yellow", "font-size": "200%" });
    })
    const [styletiket, setSttyle] = useState({
        bgticketespaciouni: '#D5583D',
        opacity: 0.6,
        textcolor: '#000000',
        imagen: "Imagen",
        imagenmask: '',
        mensaje: 'Mensaje breve',
        orientacio: 'mixed',
        rotar: '',
        topqr: '',

    })
    const [stylecompro, setComprobante] = useState({
        backgroundColor: ''
    })
    function handelChangeuno(e) {
        if (e.name == "opacity") {
            let valor = parseInt(e.value) / 100
            setSttyle({ ...styletiket, opacity: valor })
        }
        else if (e.name == "imagen") {
            //const primerArchivo = e.files[0];
            encodeImageFileAsURL(e)
            // const objectURL = URL.createObjectURL(primerArchivo);
            // console.log(objectURL)
            //  setSttyle({...styletiket,
            //      [e.name]:objectURL
            // })
        } else if (e.name == "imagenmask") {
            //  const primerArchivo = e.files[0];
            //  const objectURL =  URL.createObjectURL(primerArchivo);
            // console.log(objectURL)
            encodeImageFileAsURL(e)
        }
        else setSttyle({
            ...styletiket,
            [e.name]: e.value
        })
    }

    function GenerarPDF() {


        html2canvas(document.querySelector("#tickets")).then(canvas => {
            console.log(canvas)
            var imgWidth = 90;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            //   alert(imgHeight)
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // A4 size page of PDF
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            //  window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');

            // doc.save('comprobante.pdf');
            pdf.autoPrint();
            //doc.output('bloburl')
            document.getElementById('main-iframe').setAttribute('src', pdf.output('bloburl'));
        });

    }
    //convertir base 64 para que renderise imagen en pdf
    function encodeImageFileAsURL(element) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
            setSttyle({
                ...styletiket,
                [element.name]: reader.result
            })
        }
        reader.readAsDataURL(file);
    }


    $(function () {
        var sPositions = sessionStorage.positions || "{}",
            positions = JSON.parse(sPositions);
        $.each(positions, function (id, pos) {
            $("#" + id).css(pos)
        })
        $("div.mover").draggable({
            containment: "#seccionuno",
            scroll: false,
            stop: function (event, ui) {
                positions[event.target.id] = ui.position
                sessionStorage.positions = JSON.stringify(positions)
            }
        });
        $(".moverdos").draggable({
            containment: "#secciondos",
            scroll: false,
            stop: function (event, ui) {
                positions[event.target.id] = ui.position
                sessionStorage.positions = JSON.stringify(positions)
            }
        })
    });

    useEffect(() => {
        var element = document.getElementById('printe');
        var opt = {

            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },

            jsPDF: { unit: 'in', format: 'letter', }
        };
        //html2pdf(element, opt);

    }, [])


    return (
        <>
            <div className="container-fluid">

                <div className="d-flex justify-content-end">
                    <button className="btn btn-success" onClick={GenerarPDF} > Generar PDF </button>
                </div>
                <div className="row  flex-wrap-reverse  ">

                    <div className="col-12 col-md-4 ">
                        <Accordion defaultActiveKey="0" flush>

                            <Accordion.Item eventKey={0} >
                                <Accordion.Header> Seccion 1 de ticket </Accordion.Header>
                                <Accordion.Body>
                                    <div className="container-fluid row ">
                                        <h5>Editar fondo</h5>
                                        <form className="container-fluid row " onSubmit={SubmitEspacio} >
                                            <div className="col-md-6">
                                                <label className="form-label">Color de fondo</label>

                                                <input
                                                    className="form-control form-control-color"
                                                    type="color"
                                                    name="bgticketespaciouni"
                                                    value={styletiket.bgticketespaciouni}
                                                    onChange={(e) => handelChangeuno(e.target)}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Color de letra</label>
                                                <input
                                                    className="form-control form-control-color"
                                                    type="color"
                                                    name="textcolor"
                                                    value={styletiket.textcolor}
                                                    onChange={(e) => handelChangeuno(e.target)}
                                                />
                                            </div>

                                            <div className="col-12 ">
                                                <Form.Label>Opacidad de Fondo</Form.Label>
                                                <Form.Range
                                                    name="opacity"
                                                    min={30}
                                                    max={75}
                                                    value={styletiket.opacity * 100}
                                                    onChange={(e) => handelChangeuno(e.target)}
                                                />
                                            </div>
                                            <div className="col-12 col-md-12">
                                                <label>mensaje</label>
                                                <input className="form-control"
                                                    value={styletiket.mensaje}
                                                    onChange={(e) => handelChangeuno(e.target)}
                                                    maxLength={50}
                                                    name="mensaje" />
                                            </div>
                                            {/*<div className="Col-12">
                                <label   className="form-label">Orientación de mensaje</label>
                                <select value={styletiket.orientacio} name="orientacio" onChange={(e)=>handelChangeuno} className="form-control" >
                                <option value={'mixed'}>Vertical</option>
                                <option value={""}>Horizontal</option>
                                </select>
                            </div>*/}
                                            <div className="col-12" >
                                                <label className="form-label">Agregar imagen de fondo</label>
                                                <input className="form-control mb-1" type="file" accept="image/gif, image/jpeg, image/png"
                                                    onChange={(e) => handelChangeuno(e.target)}
                                                    name="imagen" />
                                                <button className="btn btn-danger float-end"
                                                    onClick={() => setSttyle({ ...styletiket, imagen: '' })}
                                                > Quitar fondo </button>
                                            </div>
                                            {/*<div className="col-12" >
                                <label className="form-label">Agregar imagen al sticker</label>
                                <input className="form-control mb-1" type="file"    
                                name="imagenmask"
                                accept="image/gif, image/jpeg, image/png"
                                onChange={(e)=>handelChangeuno(e.target)}
                                />
                                <button className="btn btn-danger float-end"
                                onClick={()=> setSttyle({...styletiket,imagenmask:''})}
                                > Quitar sticker </button>
                            </div>
                            <div className="col-12">
                                <label className="form-label">Mover </label>
                                <Form.Range
                                name="iquierdaderecha"
                                min={30}
                                max={75}/>
                                </div>*/}
                                            <div className="col-4 col-md-4">
                                                <label className="form-label" >rotar qr </label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    name="rotar"
                                                    value={styletiket.rotar}
                                                    min={0}
                                                    max={390}
                                                    onChange={(e) => handelChangeuno(e.target)}
                                                />
                                            </div>

                                        </form>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Seccion 2 del ticket
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="row">
                                        <div className="col-12">
                                            <h5 >Elemnto Seleccionado</h5>
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>

                    </div>
                    <div className="col-12  col-md-8 p-0 mb-1">
                        <div >
                            <div className="d-flex flex-wrap justify-content-between">
                                <h5>Pantilla Ticket</h5>



                            </div>

                        </div>

                        <div className=" d-flex justify-content-center container-fluid ">

                            <div id="tickets" className="border  d-flex flex-row"
                                style={{
                                    height: '275px',
                                    width: "800px",
                                    borderTopLeftRadius: "5px",
                                    borderBottomLeftRadius: "5px",
                                }}
                            >
                                <div id="seccionuno" className="d-flex justify-content-center align-items-center" style={{
                                    height: '100%', width: '70%',
                                    position: 'relative',
                                    borderTopLeftRadius: '5px',
                                    borderBottomLeftRadius: '5px'
                                }}>
                                    <div className="d-flex justify-content-center align-items-center "
                                        style={{
                                            width: '100%',
                                            zIndex: 1,
                                            borderBottomLeftRadius: '5px',
                                            borderTopLeftRadius: '5px',
                                            backgroundColor: styletiket.bgticketespaciouni,
                                            backgroundImage: `url(${styletiket.imagen})`,
                                            backgroundSize: 'contain ',
                                            opacity: styletiket.opacity,
                                            height: '100%',
                                        }}>
                                    </div>
                                    <div style={{ position: "absolute", zIndex: 2, width: "90%", height: "90%", }}>
                                        {
                                            styletiket.imagenmask ?
                                                <div id="mask1"
                                                    style={{
                                                        position: "absolute",
                                                        top: '85px',
                                                        opacity: '0.6',
                                                        right: "70px",
                                                        height: '120px'

                                                    }}
                                                >
                                                    <img
                                                        src={styletiket.imagenmask}

                                                        className="img-fluid"
                                                        style={{
                                                            height: "80px",
                                                        }}
                                                    />
                                                </div> : ''}
                                        <div>
                                            <h4
                                                style={{
                                                    position: 'relative',
                                                    top: '20px',
                                                    left: "20px",
                                                    fontSize: "1.6em",
                                                    fontFamily: "Fantasy",
                                                    color: styletiket.textcolor,
                                                    textTransform: "uppercase"
                                                }}>
                                                titulo de ticket
                                            </h4>
                                        </div>
                                        <div id="asiento" className="d-flex flex-row mover" style={{
                                            position: "absolute",
                                            top: "90px",
                                            left: "35px"
                                        }}>
                                            <div className="d-flex flex-column justify-content-center align-items-center border mx-2" style={{
                                                height: "70px",
                                                width: "70px",
                                                borderStyle: 'dashed',
                                            }}>
                                                <small style={{ color: styletiket.textcolor }}><strong> Fila A2 </strong></small>
                                                <h5 style={{ color: styletiket.textcolor }}>
                                                    S2
                                                </h5>
                                            </div>
                                            <div className="d-flex flex-column justify-content-center align-items-center border" style={{
                                                height: "70px",
                                                width: "70px",
                                                borderStyle: "dashed",
                                            }}>
                                                <small style={{ color: styletiket.textcolor }}></small>
                                                <h5 style={{ color: styletiket.textcolor }}></h5>
                                            </div>


                                        </div>
                                        <div className="d-flex flex-column" style={{
                                            position: "absolute",
                                            bottom: "25px",
                                            left: "25px",
                                        }}>
                                            <small style={{
                                                fontSize: "1.0em",
                                                fontFamily: 'fantasy',
                                                color: styletiket.textcolor,
                                            }}>
                                                Descripción  breve en el boleto

                                            </small>
                                            <small className="" style={{
                                                fontSize: '0.82em',
                                                color: styletiket.textcolor,
                                            }}>
                                                <strong> Descripción más breve del boleto
                                                </strong>
                                            </small>

                                        </div>

                                        <div id="codigo" className="mover" style={{ position: "absolute", top: 15, left: 300, color: styletiket.textcolor, transform: "rotate(" + styletiket.rotar + "deg)", }}>
                                            <i className="bi bi-qr-code fa-3x"></i>
                                        </div>
                                        <div id="mensaje" className="mover d-flex flex-wrap" style={{
                                            position: "absolute",
                                            top: 200, left: 275, color: styletiket.textcolor,
                                            fontFamily: 'Brush Script MT',
                                            width: 200,
                                            fontSize: "1.4em",
                                        }}>
                                            <small>
                                                #{styletiket.mensaje}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div id="secciondos" className="d-flex justify-content-start  align-items-center " style={{
                                    height: '100%', width: '30%',
                                    position: "relative",
                                    borderLeftColor: 'black',
                                    borderLeftStyle: 'dashed',
                                    borderTopRightRadius: "5px",
                                    borderBottomRightRadius: "5px",
                                }}>
                                    <div className="bg-danger p-1 d-flex justify-content-center bg-light align-items-center" style={{
                                        height: '100%',
                                        width: '100%',


                                    }}>
                                        <div className="d-flex flex-column text-center   txt-dark   ">

                                            <div className="d-flex flex-column justify-content-between align-items-lg-stretch p-3" >
                                                <h5 style={{
                                                    fontSize: "1.2em",
                                                    fontFamily: 'Fantasy',
                                                    textTransform: 'uppercase'
                                                }}>Evento Ticket</h5>
                                                <h5 style={{
                                                    fontSize: '1.0em',
                                                    fontFamily: 'Century Gothic'
                                                }}>Numero 32</h5>
                                            </div>
                                            <div className=" d-flex flex-column justify-content-between align-items-lg-stretch p-3" >
                                                <small className="text-muted" style={{
                                                    fontSize: '0.82em'
                                                }}>$32</small>
                                                <h5 style={{
                                                    fontSize: "1.2em",
                                                    fontFamily: 'Fantasy',
                                                    textTransform: 'uppercase'
                                                }}>Vip entre pass </h5>
                                                <small className="text-muted" style={{
                                                    fontSize: '0.82em',

                                                }}>22/12/22</small>
                                                <small className="text-muted" style={{
                                                    fontSize: '0.82em',

                                                }}>21:36</small>
                                            </div>
                                            <i id="codigoqr" style={{ transform: "rotate(" + styletiket.rotar + "deg)", }} className="bi bi-qr-code-scan fa-2x moverdos"></i>


                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="d-flex   justify-content-center pt-5">
                    <div id="printe" className="print border">
                        <div className="imagen border "
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: 25,
                                width: "197mm",
                                height: "30mm"
                            }}
                        >
                        </div>
                        <div className=" border datos-clientes"
                            style={{

                                margin: 25,
                                width: "197mm",

                            }}
                        >
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Breneficiario-cliete  Carlos Humberto Tapia Alarcon  </th>

                                        <th scope="col">Protocolo: 200000000</th>
                                    </tr>
                                </thead>
                            </table>


                        </div>
                        <div id="datos-de compra" className=" datos-de compra" style={{

                            margin: 25,
                            width: "197mm",

                        }}
                        >
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">Fecha de compra  </th>
                                        <th scope="col">Forma de Pago </th>
                                        <th scope="col">Valores Pagados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="col">Fecha de compra  </th>

                                        <th scope="col">Forma de Pago </th>
                                        <th scope="col">Valores PAgados</th>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div id="informacion del evento" className="row  d-flex  justify-content-between " style={{

                            margin: 25,
                            width: "197mm",

                        }}
                        >
                            <div className=" row col-8 ">
                                <div className=" concierto"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        paddingTop: 15,
                                    }} >
                                    <strong>Miel san Marcos Guayaquil</strong>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    padding: 15
                                }}>
                                    <div style={{
                                        padding: 5,
                                        paddingTop: 10,
                                    }}>
                                        Fecha: 20 de Diciembre dek 2022 Hora 19:00
                                    </div>
                                    <div style={{
                                        padding: 5
                                    }}>
                                        Localidad: Sillas golden
                                    </div>

                                    <div className="row  py-3">
                                        <div className="col-3 d-flex    flex-column  ">
                                            <div className=" text-center">
                                                <strong>BLOQUE</strong>
                                            </div>
                                            <div className="d-flex justify-content-center" >
                                                <div className="border rounded-5" style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: 40,
                                                    width: "60%"
                                                }}>
                                                    SEC 1

                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-3 d-flex  flex-column ">
                                            <div className=" text-center">
                                                <strong>FILA</strong>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <div className="border rounded-5" style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: 40,
                                                    width: "60%"
                                                }}>
                                                    A1

                                                </div>
                                            </div>


                                        </div>
                                        <div className="col-3 d-flex  flex-column ">
                                            <div className=" text-center">
                                                <strong>ASIENTO</strong>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <div className="border rounded-5" style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    height: 40,
                                                    width: "60%"
                                                }}>
                                                    23

                                                </div>
                                            </div>


                                        </div>


                                    </div>

                                </div>


                            </div>
                            <div className="col-4 d-flex  flex-column ">
                                <QRCodeCanvas value="Ayuda"
                                    style={{
                                        width: "100%",
                                        height: "80%",
                                        padding: 0,
                                    }}
                                />
                                <div className=" border " style={{
                                    height: 50
                                }}>
                                </div>
                            </div>


                        </div>
                        <div className="border bg-warning" style={{
                            margin: 25,
                            width: "197mm",
                            height: "5mm"
                        }}>
                        </div>
                        <div className=" d-flex flex-column" style={{
                            margin: 25,
                        }}>
                            <h5> <strong>PARA CANJEAR BOLETO DURO</strong>  </h5>
                            <div>
                                <span>Presentar este documento impreso </span>
                            </div>
                            <div>
                                <span>
                                    Copia de cédula del titular del ticket
                                </span>
                            </div>
                        </div>
                        <div id="normas" className="d-flex flex-row"
                            style={{
                                margin: 25
                            }}
                        >
                            <div className="">
                                <h5> <strong>PARA CANJEAR BOLETO DURO</strong>  </h5>
                                <div className="d-flex flex-column">
                                    <span>Presentar este documento impreso </span>
                                    <span> Ingreso de armas blancas y de fuego</span>
                                    <span>  Ingreso de alimentos perecibles</span>
                                    <span>  Ingreso de alimentos perecibles</span>
                                </div>

                            </div>
                            <div className="mx-5">
                                <h5> <strong>NORMAS DE BIOSEGURIDAD</strong>  </h5>
                                <div className="d-flex flex-column">
                                    <span>Utilice mascarilla</span>
                                    <span>Distanciamento de 1.5m</span>
                                    <span>  Presentar carnet de vacunación covid-1</span>
                                    <span> Utilice desinfectante persona</span>
                                </div>

                            </div>

                        </div>
                        <div id="consejos pt-6" className=" border "
                            style={{
                                margin: 25,

                                padding: 2
                            }}

                        >
                            <span style={{
                                fontSize: 10
                            }} >  Promotor:carlos Tapias Loor T-SHOWS S.A. Ruc: 092398074200. Direccion Guayaquil Km.8 1/2 Via a Daule MZ 8 Villa 20 Autorización SRI. 000000 Fecha de Solicitud: 000000000 Generado Por: TICKETSECUADOR S.A RUC 0923980742001
                                Direccion:Guayaquil Edificio CityOficce Piso 3 Oficina 302. Contribuyente Regimen Rimpepoppular
                            </span>
                        </div>


                    </div>

                </div>
            </div>
        </>

    )
}

export default EsquemaViews