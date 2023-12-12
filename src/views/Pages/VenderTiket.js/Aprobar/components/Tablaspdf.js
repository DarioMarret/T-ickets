import { useEffect, useState } from 'react';
// import { QRCodeCanvas } from "qrcode.react";
import QRCode from "react-qr-code";
//import { staticimg } from "./imagenstatic";
import { decode } from 'js-base64';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import "./Pdfwie.css"
import { useParams, useHistory } from "react-router";
import axios from '../../../../../../node_modules/axios/index';
//import "Pdfwie.css"
//import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

/*let {
    imprimir, armas, mascotas, mascarilla, bebidas, card, cedula, comidas, desiectante, social, tc
} = staticimg*/

function Bingo_tablas(props) {
    let { Bingo, cedula,ID } = props
   
    const [loader, setLoader] = useState(true)
    const [datos, setDatos] = useState([])
    const [data, setData] = useState(
        {
            "estado": "",
            "id": 0,
            "nombreConcierto": "",
            "fechaConcierto": "",
            "horaConcierto": "",
            "lugarConcierto": " ",
            "cuidadConcert": "",
            "descripcionConcierto": "",
            "imagenConcierto": "",
            "idUsuario": 0,
            "codigoEvento": "",
            "mapaConcierto": "",
            "fechaCreacion": "",
            "iva": "",
            "botNumber": "",
            "cedula": "",
            "nombreCompleto": "",
            "email": "",
            "password": "",
            "movil": "",
            "enable": 0,
            "ciudad": "",
            "direccion": "",
            "bingos": [
            ]

        })

    async function CargarBoletos() {
        try {
            let params = {
                "cedula": cedula,
                "Codigoevento": "5UY4DT",
                "codigos": JSON.stringify(Bingo.map(elm => { return elm.id })),
                "Bingo": "string"
            }
            console.log(params)
            let { data } = await axios.put("https://api.t-ickets.com/mikroti/Boleteria/bingos/", params)

            if (data.estado == "ACTIVO") {
                console.log(data)
                let datos = data.bingos.map(e => {
                    Bingo = JSON.parse(e.Bingo)
                    return { ...e, Bingo: Bingo }
                })
                function toDataURL(src, callback) {
                    var image = new Image();
                    image.crossOrigin = 'Anonymous';

                    image.onload = function () {
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = this.naturalHeight;
                        canvas.width = this.naturalWidth;
                        context.drawImage(this, 0, 0);
                        var dataURL = canvas.toDataURL('image/jpeg');
                        callback(dataURL);
                    };
                    image.src = src;
                    // let imagens = document.getElementById('imagenContainer');
                    //imagens.src = src
                }
                toDataURL(data.imagenConcierto, function (dataURL) {
                    //console.log(dataURL);
                    //let imagen = document.getElementById('imagenContainer');
                    setData({ ...data, imagenConcierto: dataURL, bingos: datos })
                    imagen.src = dataURL
                })

                // console.log({})
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        CargarBoletos()


    }, [true])

    const dataQr = (dat) => {
        let info = {
            nombre: dat.nombreCompleto,
            id: dat.id,
            sillas: dat.sillas,
            fecha: dat.fechaConcierto,
            hora: dat.horaConcierto,
            lugar: dat.lugarConcierto,
            cuidad: dat.cuidadConcert,
            localidad: dat.localidad,
            valor: dat.valor,
            fechaCompra: dat.fechaCompra,
            imagen: dat.imagenConcierto
        }
        setQr(dat.email)
    }
    function imprime(elm,e) {
        e.target.disabled = true;
        console.log(e)
        const elementsToPrint = [...elm];
        let pdf = new jsPDF('p', 'mm', 'a4');
       
        elm.forEach((elementId, index) => {
            const element = document.getElementById(`printe${elementId.id}`);
            html2canvas(element, { scale: 0.8 }).then(canvas => {
                var imgWidth = 180;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                const contentDataURL = canvas.toDataURL('image/png')
                // a5 size page of PDF
                var position = 10;
                if (index == 0) {
                    pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight);

                } else {
                    pdf.addPage();
                    pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight);
                }

                // Si es el último elemento, guardar el PDF
                if (index === elementsToPrint.length - 1) {
                    //pdf.save('new-file.pdf');
                    window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
                    e.target.disabled = false;
                }


            })
        })
    }
    function compartir() {
        html2canvas(document.querySelector("#printe"), { scale: 0.5 }).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // a5 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            var pdfs = new File([pdf.output('blob')], "doc_name" + ".pdf", { type: "application/pdf" });
            var filesToShare = [pdfs];
            try {
                navigator.share({ title: "reporte" + ".pdf", files: filesToShare });
            } catch (error) {
                console.log(error)
            }
        })
    }
    if (!loader) return (<div></div>)
    return (
        <div>
            <div className="w-100 text-center py-2 ">
                <div className=' '>
                    <button className="btn btn-default "  onClick={(e)=>imprime(data.bingos,e)} >Imprimir PDF <i className=" fa  fa-file-pdf text-danger"></i></button>

                </div>
            </div>

            <div className=' d-flex justify-content-center flex-column text-' style={{
                position: "absolute"
            }} >

                {
                    data.bingos.length > 0 ?
                        data.bingos.map((elem, id) => {
                            return (
                                
                                <div id={"printe" + elem.id} className="   "
                                        style={{
                                            position: "",
                                            width: '200mm',
                                            height: "auto",
                                            backgroundColor: "#f75900"

                                        }}>
                                        <div className=' d-flex flex-row justify-content-end align-items-center   text-white  px-3 py-3' style={{
                                            height: "60px",
                                            display: "grid",
                                            backgroundColor: "#2e3192",
                                            position: "relative"
                                        }} >
                                            <p className=' d-flex align-items-center fw-bold grid-item' style={{
                                                fontSize: "0.7em",

                                                marginTop: "auto",
                                                marginBottom: "auto"

                                            }}>RUC 0923980742001 <img src='/img/ruc.png' style={{ height: "20px" }} className='' /> </p>
                                            <p className=' d-flex align-items-center px-2 fw-bold grid-item' style={{
                                                fontSize: "0.7em",

                                                marginTop: "auto",
                                                marginBottom: "auto"

                                            }}>www.tickets.com.ec <img src='/img/web.png' style={{ height: "20px" }} className='' /> </p>
                                            <p className=' d-flex align-items-center fw-bold grid-item' style={{
                                                fontSize: "0.7em",

                                                marginTop: "auto",
                                                marginBottom: "auto"

                                            }}>
                                                <div className=' fw-bold d-flex flex-column px-1 text-end'>
                                                    <span> Edificio City Office, Piso 3,</span>
                                                    <span> Oficina 310</span>
                                                </div>

                                                <img src='/img/direccion.png' style={{ height: "20px" }} className='' /> </p>

                                        </div>
                                        <div className='w-100 d-flex justify-content-center align-items-center  '>
                                            <div className='d-flex  justify-content-center py-3   w-100 align-items-center'>
                                                <div className='col-8 col-lg-6  pr-0 ' style={{
                                                    paddingLeft: "10%"
                                                }}>
                                                    <img src='/img/ticket.png' className=' rounded-circle border-ticket' style={{
                                                        height: "120px",
                                                        position: "absolute",
                                                        zIndex: "2",
                                                        marginTop: "-10%",
                                                    }}
                                                    />
                                                    <div className='align-items-center text-white pl-5 pr-1' style={{
                                                        backgroundColor: "#2e3192",
                                                        borderTopRightRadius: "10px",
                                                        borderBottomRightRadius: "10px",
                                                        paddingTop: 5,
                                                        marginLeft: "20%",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        position: "absolute"
                                                    }}>
                                                        <h3 style={{ fontSize: "0.8em" }} className='p-1'>TABLA DE BINGO #{elem.id}</h3></div>
                                                </div>
                                                <div className='col-4 col-lg-6 d-flex justify-content-end   pl-0' style={{
                                                    paddingRight: "0px"
                                                }}>
                                                    <div className='d-flex justify-content-center align-items-center px-5 pr-0' style={{
                                                        backgroundColor: "#fff",
                                                        color: "#f75800",
                                                        borderTopLeftRadius: "10px",
                                                        borderBottomLeftRadius: "10px",
                                                        paddingTop: 5,
                                                        marginRight: "-5px",
                                                        paddingLeft: "15px",
                                                        position: "absolute"
                                                    }}><img src='/img/whastapp.png' style={{ height: "20px" }} className='' /><h3 style={{ fontSize: "0.8em", color: "#f75800" }}>0980008000 </h3></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' bg-light m-4  rounded-5   justify-content-center '
                                            style={{ height: '270mm', }}>
                                            <div className='p-3 px-5 text-end'>
                                                <h3 className=' text-secondary fw-bold text-uppercase' style={{ fontSize: "1.3em" }}> VENDEDOR: {data.nombreCompleto}</h3>
                                                <div className='d-flex  justify-content-end'>
                                                <p className=' text-secondary fw-bold text-uppercase' style={{ fontSize: "1em" }}> Fecha: 2024-01-31</p>
                                                    <p className=' text-secondary fw-bold text-uppercase px-4' style={{ fontSize: "1em" }}> Premios: ARRIZOS 5PRO</p>
                                                </div>
                                                <p className=' text-secondary fw-bold text-uppercase px-4' style={{ fontSize: "1em" }}> Lugar: Transmisión en Vivo-Facebook @tickets.com.ec</p>
                                            </div>
                                            <div className="col-12 px-lg-5    eventos ">
                                                <img id='imagenContainer' src={data.imagenConcierto} style={{
                                                    width: "100% !important;",
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat"
                                                }} className=" rounded-7 shadow-md  eventos-asb " alt="" />

                                            </div>
                                            <div className='d-flex'>
                                            </div>
                                            <div className='pt-2 '>
                                                <div className='row  pt-3 m-1'>
                                                    <div className='col-6 '>
                                                        <div className=' p-0  text-center  justify-content-end '>
                                                            <div className=' pb-2 bg-primary d-flex px-0 justify-content-center  border-top rounded-7 '  >
                                                                <table className='tablesta text-center   '>
                                                                    <thead className=' pb-3 bg-primary'>
                                                                        <tr>
                                                                            <th className=''
                                                                                style={{
                                                                                    fontSize: "2rem"
                                                                                }}
                                                                            >B</th>
                                                                            <th className=''
                                                                                style={{
                                                                                    fontSize: "2rem"
                                                                                }}>I</th>
                                                                            <th className=' '
                                                                                style={{
                                                                                    fontSize: "2rem"
                                                                                }}>N</th>
                                                                            <th className=''
                                                                                style={{
                                                                                    fontSize: "2rem"
                                                                                }}>G</th>
                                                                            <th className=''
                                                                                style={{
                                                                                    fontSize: "2rem"
                                                                                }}>O</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            //let nuevodd = JSON.parse( [[[2,5,9,13,14],[17,19,24,27,30],[34,38,"",41,45],[46,47,49,50,56],[62,63,69,70,73]]])[0]
                                                                            elem.Bingo[0].map((e, i) => {
                                                                                return (<tr style={{
                                                                                    fontSize: "2rem"
                                                                                }}>
                                                                                    <td style={{
                                                                                        margin: "3px"
                                                                                    }} >{elem.Bingo[0][0][i]}</td>
                                                                                    <td style={{
                                                                                        margin: "3px"
                                                                                    }} >{elem.Bingo[0][1][i]}</td>
                                                                                    <td style={{
                                                                                        margin: "3px"
                                                                                    }} >{i == 2 ? <img style={{
                                                                                        height: "25px"
                                                                                    }} className=' img-fluid' src='/img/estrella.png' /> : elem.Bingo[0][2][i]}</td>
                                                                                    <td style={{
                                                                                        margin: "3px"
                                                                                    }} >{elem.Bingo[0][3][i]}</td>
                                                                                    <td style={{
                                                                                        borderBottomLeftRadius: "10px;"
                                                                                    }} >{elem.Bingo[0][4][i]}</td>
                                                                                </tr>)
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className=' d-flex  flex-row align-items-center  justify-content-center '>
                                                                <div className='p-3 '>
                                                                    <QRCode value={elem.cedula} size={110} style={{
                                                                        maxHeight: "50%",
                                                                    }}
                                                                    />
                                                                </div>
                                                                <div className='col-6 d-flex  flex-column justify-content-center'>
                                                                    <div>
                                                                        <span className="text-danger">  <strong> INFORMACIÓN IMPORTANTE</strong> </span>
                                                                    </div>
                                                                    <div style={{
                                                                        fontSize: "7px"
                                                                    }}> <span>  <strong>

                                                                        Esta tabla de bingo es de un solo uso, no compartir la imformación del mismo con nadie, es de responsabilidad del cliente. cualquier duplicado o venta de este bleto se dara por no valido el mismo</strong></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-6  px-0  ' >
                                                        <div className='d-flex  flex-column align-items-center p-0 '
                                                            style={{

                                                            }}>
                                                            <img style={{
                                                                position: "relative",
                                                                paddingLeft: "-25px"
                                                            }} className=' img-fluid' src='/img/recursotickte.png' />
                                                            <img className=' img-fluid'
                                                                src='/img/terminosasb.png'
                                                                style={{
                                                                    height: "290px"
                                                                }} />
                                                        </div>
                                                        <div className='d-flex  flex-column pt-5'>
                                                            <div className=' text-center'>
                                                            <p>Comprobante # {ID}</p>
                                                                <p className=' fw-bold'> DATOS DEL BENEFICIARIO </p>
                                                            </div>
                                                            <div className=''>
                                                                <p>Nombre:</p>
                                                                <hr></hr>
                                                            </div>
                                                            <div className=''>
                                                                <p>Cedula:</p>
                                                                <hr></hr>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                            <div className=''>
                                                <img src='/img/asbinfo.png' className=' img-fluid' />
                                            </div>
                                        </div>
                                    </div>
                                
                            )

                        })
                        : ""
                }



            </div >
        </div>




    );
}

export default Bingo_tablas;