import { useEffect, useState } from 'react';
// import { QRCodeCanvas } from "qrcode.react";
import QRCode from "react-qr-code";
//import { staticimg } from "./imagenstatic";
import { decode } from 'js-base64';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import "./Pdfwie.css"
import { useParams, useHistory } from "react-router";
//import "Pdfwie.css"
//import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

/*let {
    imprimir, armas, mascotas, mascarilla, bebidas, card, cedula, comidas, desiectante, social, tc
} = staticimg*/

function BingoViewtiparamsasb() {
    // let { link, Bingo } = props
    let { id } = useParams()

    const [data, setData] = useState({
        concierto: "",
        cuidadConcert: "",
        email: "",
        estado: "",
        fechaConcierto: "",
        fechaCreacion: "",
        horaConcierto: "",
        id: "",
        imagenConcierto: "",
        localidad: "",
        lugarConcierto: "",
        movil: "",
        nombreCompleto: "",
        sillas: "",
        valor: "",
        fechaCompra: "",

    });
    const [qr, setQr] = useState("Ayuda")
    const [arr, SetArr] = useState([])
    const [loader, setLoader] = useState(true)
    function imprime() {
        html2canvas(document.querySelector("#printe")).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // a5 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            let frame = document.querySelector("#frame")
            //frame.src = pdf.output("bloburl");
            // setTimeout(function () { document.querySelector("#printe").remove() }, 1000)
            //document.querySelector("#printe").remove()
            //return
            //pdf.save()
            window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
        })
    }
    useEffect(() => {
        //if (props.split('http://localhost:3001/ticket_pdf/')[1]) {
        try {
            if (id) {
                //           console.log('entro', window.location.href.split("http://localhost:3000/ticket_pdf/")[1])
                //          console.log('entro', JSON.parse(decode(window.location.href.split("http://localhost:3000/ticket_pdf/")[1])))
                //let dat = JSON.parse(decode(props.split("http://localhost:3001/ticket_pdf/")[1]))
                let dat = JSON.parse(decode(id))
                console.log(decode(id))
                console.log(dat)

                setData(dat)
                dataQr(dat)

                let html = '';
                let cards = dat.Bingo;
                SetArr(cards[0])
                console.log(cards[0])

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
                    let imagens = document.getElementById('imagenContainer');
                    imagens.src = src
                }
                toDataURL(dat.imagenConcierto, function (dataURL) {
                    //console.log(dataURL);
                    let imagen = document.getElementById('imagenContainer');
                    imagen.src = dataURL
                })
                /* toDataURL(data.imagenConcierto, function (dataURL) {
                     //console.log(dataURL);
                     let imagen = document.getElementById('imagenContainer');
                     imagen.src = dataURL
                 })*/

                //imagenContainer.appendChild(imgElement);

                /* setTimeout(function () {
                     html2canvas(document.querySelector("#printe")).then(canvas => {
                         var imgWidth = 130;
                         var imgHeight = canvas.height * imgWidth / canvas.width;
                         const contentDataURL = canvas.toDataURL('image/png')
                         let pdf = new jsPDF('p', 'mm', 'a5'); // a5 size page of PDF
                         var position = 10;
                         pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
                         let frame = document.querySelector("#frame")
                         //frame.src = pdf.output("bloburl");
                         // setTimeout(function () { document.querySelector("#printe").remove() }, 1000)
                         //document.querySelector("#printe").remove()
                         //return
                         //pdf.save()
                          window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
                     });
                 }, 1500)*/


            } else {
                setLoader(false)
            }
        } catch (error) {
            console.log("ERROR: ", error)
            setLoader(false)
        }

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
    function imprime() {
        html2canvas(document.querySelector("#printe")).then(canvas => {
            var imgWidth = 130;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // a5 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight);
            let frame = document.querySelector("#frame")
            //frame.src = pdf.output("bloburl");
            // setTimeout(function () { document.querySelector("#printe").remove() }, 1000)
            //document.querySelector("#printe").remove()
            //return
            pdf.save('new-file.pdf')
            // window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');

        })
    }
    function compartir() {
        html2canvas(document.querySelector("#printe")).then(canvas => {
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
                    <button className="btn btn-default " onClick={imprime} >Imprimir PDF <i className=" fa  fa-file-pdf text-danger"></i></button>

                </div>
                <div className='d-none'>
                    <button className="btn btn-default " onClick={compartir}>Descargar PDF <i className=" fa  fa-file-pdf text-danger"></i></button>

                </div>
            </div>

            <div className='d-flex' style={{

                justifyContent: "center",
                overflowX: "auto"
            }}>



                <div id="printe" className="   "
                    style={{
                        position: "absolute",
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
                    <div className='w-100 d-flex justify-content-center align-items-center  '
                        style={{

                        }}
                    >
                        <div className='d-flex  justify-content-center py-3   w-100 align-items-center'
                        >
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
                                    <h3 style={{ fontSize: "0.8em" }} className='p-1'>TABLA DE BINGO #{data.id}</h3></div>

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
                            <img id='imagenContainer' style={{


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
                                                        arr.map((e, i) => {
                                                            return (<tr style={{
                                                                fontSize: "2rem"
                                                            }}>
                                                                <td style={{
                                                                    margin: "3px"
                                                                }} >{arr[0][i]}</td>
                                                                <td style={{
                                                                    margin: "3px"
                                                                }} >{arr[1][i]}</td>
                                                                <td style={{
                                                                    margin: "3px"
                                                                }} >{i == 2 ? <img style={{
                                                                    height: "25px"
                                                                }} className=' img-fluid' src='/img/estrella.png' /> : arr[2][i]}</td>
                                                                <td style={{
                                                                    margin: "3px"
                                                                }} >{arr[3][i]}</td>
                                                                <td style={{
                                                                    borderBottomLeftRadius: "10px;"
                                                                }} >{arr[4][i]}</td>
                                                            </tr>)
                                                        })

                                                    }
                                                </tbody>

                                            </table>


                                        </div>
                                        <div className=' d-flex  flex-row align-items-center  justify-content-center '
                                            style={{

                                            }}>
                                            <div className='p-3 '>


                                                <QRCode value={qr} size={110} style={{

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



            </div >
        </div>




    );
}

export default BingoViewtiparamsasb;