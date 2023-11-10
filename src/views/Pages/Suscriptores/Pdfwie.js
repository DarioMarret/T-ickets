import { useEffect, useState } from 'react';
// import { QRCodeCanvas } from "qrcode.react";
import QRCode from "react-qr-code";
//import { staticimg } from "./imagenstatic";
import { decode } from 'js-base64';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import "./Pdfwie.css"
//import "Pdfwie.css"
//import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

/*let {
    imprimir, armas, mascotas, mascarilla, bebidas, card, cedula, comidas, desiectante, social, tc
} = staticimg*/

function PdfViewticketApp({...props}) {
    let { link } = props

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

    const [loader, setLoader] = useState(true)

    useEffect(() => {
        //if (props.split('http://localhost:3001/ticket_pdf/')[1]) {
        try {
            if (link.split('https://api.t-ickets.com/ticket_pdf/')[1]) {
                console.log('entro', link.split("https://api.t-ickets.com/ticket_pdf/")[1])
                console.log('entro', JSON.parse(decode(link.split("https://api.t-ickets.com/ticket_pdf/")[1])))
                //let dat = JSON.parse(decode(props.split("http://localhost:3001/ticket_pdf/")[1]))
                let dat = JSON.parse(decode(link.split("https://api.t-ickets.com/ticket_pdf/")[1]))
                console.log(dat)

                setData(dat)
                dataQr(dat)


                //const imagenContainer = document.getElementById('imagenContainer');
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
                    console.log(dataURL);
                    let imagen = document.getElementById('imagenContainer');
                    imagen.src = dataURL
                })
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

    const Bloque = () => {
        if (data.sillas.split("-")[1]) {
            let bloque = data.sillas.split("-")[1]
            return (
                <div className="row  py-3">
                    <div className="col-3 d-flex    flex-column  ">
                        <div className=" text-center">
                            <strong>BLOQUE</strong>
                        </div>
                        <div className="d-flex justify-content-center" >
                            <div className="border rounded-4" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 40,
                                width: "80%"
                            }}>
                                {data.localidad}

                            </div>
                        </div>

                    </div>
                    <div className="col-3 d-flex  flex-column ">
                        <div className=" text-center">
                            <strong>FILA</strong>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="border rounded-4" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 40,
                                width: "80%"
                            }}>
                                {data.sillas.split("-")[0]}
                            </div>
                        </div>


                    </div>
                    <div className="col-3 d-flex  flex-column ">
                        <div className=" text-center">
                            <strong>ASIENTO</strong>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="border rounded-4" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 40,
                                width: "80%"
                            }}>
                                {data.sillas.split("-")[2]}

                            </div>
                        </div>


                    </div>


                </div>
            )
        } else {
            return (
                <div className="row  py-3">
                    <div className="col-3 d-flex  flex-column ">
                        <div className=" text-center">
                            <strong>CORRELATIVO</strong>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="border rounded-4" style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 40,
                                width: "80%"
                            }}>
                                {data.sillas}

                            </div>
                        </div>


                    </div>


                </div>
            )
        }
    }
    const nuevo = () => {

        // Agrega la imagen al contenedor

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
           // window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');
        });

    }
    if (!loader) return (<div></div>)
    return (
        <div className='d-flex' style={{

            justifyContent: "center",
            overflowX: "auto"
        }}>
          

            <div id="printe" className="   "
                style={{
                    position: "absolute",
                    width: '210mm',

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
                                <h3 style={{ fontSize: "0.8em" }} className=''>BOLETO DIGITAL #{data.id}</h3></div>

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
                    style={{ height: '240mm', }}>
                    <div className='p-3 px-5 text-end'>
                        <h3 className=' text-secondary fw-bold text-uppercase' style={{ fontSize: "1.3em" }}> CONCIERTO: {data.concierto}</h3>
                    </div>
                    <div className="col-12 px-lg-5   " >
                        <img id='imagenContainer' style={{
                            background: 'url(' + data.imagenConcierto + ')',
                            height: "215px !important;",
                            width: "100% !important;",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat"
                        }} className="img-fluid rounded-7 shadow-md img-evento   " alt="" />
                    </div>
                    <div className="col-12 px-lg-5    pt-3" >
                        <div className='rounded-7 d-flex border  shadow-md  '
                            style={{
                                height: " 215px",
                                width: "100% !important;"
                            }}
                        >
                            <div className='  border-end border-secondary px-0 h-100 col-3'>
                                <p className=' text-secondary fw-bold pt-1  px-3' style={{ fontSize: "0.8em" }}>ESTADO</p>
                                <div className='bg-danger px-0 pt-1 pb-1 d-flex  align-items-center justify-content-center'>
                                    <h6 className=' fw-bold text-light '>CLIENTE:</h6>
                                </div>
                                <div className=' texte-start px-3 lineHeight' >
                                    <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.7em" }}>Fecha de cobro:</p>
                                    <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.7em" }}>Estado:</p>
                                    <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.7em" }}>Valor pagado:</p>
                                    <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.7em" }}>Fecha del Concierto:</p>
                                    <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.7em" }}>Localidad:</p>

                                </div>
                            </div>
                            <div className='  col-9 mx-0  '>
                                <div className='row px-0'>
                                    <div className='col-6 text-secondary fw-bold pt-1  px-3 pb-2'>
                                        <p className=' text-secondary fw-bold pt-1  px-3 align-items-center ' style={{ fontSize: "0.8em" }}>{data.estado}</p>
                                    </div>
                                    <div className='col-6 text-secondary fw-bold pt-1  px-3  pr-0 text-end'>
                                        <p className=' text-secondary fw-bold pt-1  px-3' style={{ fontSize: "0.8em" }}>CORRELATIVO: {data.sillas}</p>

                                    </div>
                                    <div className='bg-danger px-3 pt-1 pb-1 d-flex  align-items-center '>
                                        <h6 className=' fw-bold text-light text-uppercase '>{data.nombreCompleto}</h6>
                                    </div>
                                </div>
                                <div className='row px-3'>
                                    <div className='col-6 pl-0 pb-2'>
                                        <div className=' texte-start ' style={{
                                            lineHeight: "0.6"
                                        }}>
                                            <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.75em" }}>{data.fechaCompra}</p>
                                            <p className=' text-secondary fw-bold pt-1 text-uppercase' style={{ fontSize: "0.75em" }}>{data.estado}</p>
                                            <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.75em" }}>${data.valor}</p>
                                            <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.75em" }}>{data.fechaConcierto}</p>
                                            <p className=' text-secondary fw-bold pt-1' style={{ fontSize: "0.75em" }}>{data.localidad}</p>

                                        </div>
                                    </div>
                                    <div className='col-6   row ' style={{


                                    }}>
                                        <div className='col-12 align-items-center p-0 '
                                            style={{

                                            }}>
                                            <QRCode className='mt-2' value={qr} size={150} style={{

                                                maxHeight: "60%",
                                            }}

                                            />
                                        </div>


                                    </div>
                                    <div className='m-5' style={{
                                        transform: "rotate(270deg)",
                                        fontSize: "0.3em",
                                        maxHeight: "50px",
                                        maxWidth: "130px",
                                        position: "absolute",
                                        left: "60%"
                                    }}>
                                        <div>
                                            <span className="text-danger">  <strong> INFORMACIÓN IMPORTANTE</strong> </span>
                                        </div>
                                        <div> <span>  <strong>

                                            Este ticket es de un solo uso, no compartir la información
                                            del mismo con nadie, es de responsabilidad del cliente.
                                            El Código QR permite solamente un ingreso o un canje
                                            Cualquier duplicado o venta no autorizada de este
                                            boleto se dará por no valido el mismo</strong></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=' px-0 mt-3 col-7 d-flex  justify-content-end text-end ' style={{
                        height: "25px",
                        backgroundColor: "#f75800",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",

                    }}>
                        <div className=' fw-bold text-light px-3'>
                            <p style={{
                                fontSize: "0.8em"
                            }}> PARA CANJEAR ESTE BOLETO DIGITAL POR EL FÍSICO</p>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className='row px-3'>
                        <div className='col-6 pl-4'>
                            <p className=' pt-2 fw-bold text-secondary' style={{
                                fontSize: "0.7em",
                                lineHeight: 1
                            }}> Por medio de nuestras redes sociales, estamos anunciando las fechas del caje de boletos. Sígue las redes sociales</p>
                            <div>
                                <img src="/img/impresora.png"
                                    style={{
                                        height: 25,
                                        width: 25,
                                        paddingRight: 1
                                    }}
                                />
                                <span className=' text-secondary '
                                    style={{
                                        fontSize: 14,
                                    }}
                                > Presentar este documento impreso </span>
                            </div>
                            <div>
                                <img src="/img/cedula.png"
                                    style={{
                                        height: 25,
                                        paddingRight: 1
                                    }}
                                />
                                <span className=' text-secondary '
                                    style={{
                                        fontSize: 14,
                                    }}
                                >
                                    Presentar la cédula original
                                </span>
                            </div>
                            <div>
                                <img src="/img/tarjeta.png"
                                    style={{
                                        height: 25,
                                        paddingRight: 1
                                    }}
                                />
                                <span className=' text-secondary '
                                    style={{
                                        fontSize: 14,
                                    }}
                                >
                                    Presentar Tarjeta con la que se realizó la compra
                                </span>
                            </div>
                        </div>
                        <div className='col-6 d-flex flex-column  align-items-end '>
                            <div className='d-flex align-items-start '>
                                <i> <img style={{ height: "20px" }} src='/img/face.png' /></i><i><img style={{ height: "20px" }} src='/img/instagra.png' /></i><p className=' fw-bold '>@tickets.com.ec</p></div>
                            <div className='border border-dark rounded-2 p--2 col-8' style={{

                            }} >
                                <div className=' justify-content-end'>
                                    <div>  <p className=' fw-bold   text-secondary pt-2' style={{ lineHeight: 1 }}>IMPORTANTE</p></div>
                                    <div className='d-flex'>
                                        <img src="/img/importante.png"
                                            style={{
                                                height: 35,

                                                paddingRight: 1
                                            }}
                                        />
                                        <p className='  text-secondary' style={{
                                            lineHeight: 1,
                                            fontSize: "0.7em"
                                        }}>Para realizar el canje debes tener el VOUCHER FIRMADO por el dueño de la compra, lo encuentras en tu perfil de tickets</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row px-0 '>
                        <div className='col-6 px-0'>
                            <div className=' px-0 mt-3 col-9 d-flex  justify-content-center text-end ' style={{
                                height: "25px",
                                backgroundColor: "#f75800",
                                borderTopRightRadius: "10px",
                                borderBottomRightRadius: "10px",

                            }}>
                                <div className=' fw-bold text-light px-3'>
                                    <p style={{
                                        fontSize: "0.8em"
                                    }}>  PROHIBIDO</p>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                        <div className='col-6 px-0 d-flex justify-content-end'>
                            <div className=' px-0 mt-3 col-10 d-flex  text-end ' style={{
                                height: "25px",
                                backgroundColor: "#f75800",
                                borderTopLeftRadius: "10px",
                                borderBottomLeftRadius: "10px",

                            }}>
                                <div className=' fw-bold text-light px-3'>
                                    <p style={{
                                        fontSize: "0.8em"
                                    }}>  NORMAS DE SEGURIDAD</p>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                        <div className='col-6 pl-5'>
                            <div className="d-flex flex-column">
                                <div>
                                    <img src="/img/bebidas.png"
                                        style={{
                                            height: 25,
                                            width: 25,
                                            paddingRight: 1
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: 14,
                                        }}
                                    >Ingreso de bebidas alcohólicas </span>
                                </div>

                                <div>
                                    <img src="/img/armas.png"
                                        style={{
                                            height: 25,
                                            width: 25,
                                            paddingRight: 1
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: 14,
                                        }}
                                    >Ingreso de armas blancas y de fuego </span>
                                </div>
                                <div>
                                    <img src="/img/comida.png"
                                        style={{
                                            height: 25,
                                            width: 25,
                                            paddingRight: 1
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: 14,
                                        }}
                                    >Ingreso de alimentos perecibles </span>
                                </div>
                                <div>
                                    <img src="/img/animale.png"
                                        style={{
                                            height: 25,
                                            width: 25,
                                            paddingRight: 1
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: 14,
                                        }}
                                    >Ingreso de mascotas</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-6 justify-content-center '>
                            <div className="row pt-4 px-3 text-center">
                                <div className=' col-4'>
                                    <img src="/img/mascarilla.png"
                                        style={{
                                            height: 35,
                                            width: 35,
                                            paddingRight: 1
                                        }}
                                    />
                                </div>
                                <div className=' col-4'>
                                    <img src="/img/desinfectante.png"
                                        style={{
                                            height: 35,
                                            width: 35,
                                            paddingRight: 1
                                        }}
                                    />
                                </div>
                                <div className='col-4 '>
                                    <img src="/img/distanciamiento.png"
                                        style={{
                                            height: 35,
                                            width: 35,
                                            paddingRight: 1
                                        }}
                                    />
                                </div>
                                <div className=' col-4'>

                                    <p className=' fw-bold text-secondary'
                                        style={{
                                            fontSize: 13,

                                        }}
                                    >Utilice mascarilla</p>
                                </div>
                                <div className=' col-4 fw-bold text-secondary'>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            lineHeight: 1
                                        }}
                                    >Utilice desinfectante personal</p>
                                </div>
                                <div className='col-4  fw-bold text-secondary'>
                                    <p className='text-center'
                                        style={{
                                            fontSize: 13,
                                        }}
                                    >Distanciamiento social mascarilla</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>




            </div>



        </div >




    );
}

export default PdfViewticketApp;