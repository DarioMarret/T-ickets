import { useEffect } from "react";
import { carrusel } from "../Flasdeticket/imagenstatctic";
let { tercero } = carrusel
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
export function DiseñoViewtickes() {

    function imprime() {

        html2canvas(document.querySelector("#ticktes")).then(canvas => {
            console.log(canvas)
            var imgWidth = 90;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            //   alert(imgHeight)
            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jsPDF('p', 'mm', 'a5'); // A4 size page of PDF
            var position = 10;
            pdf.addImage(contentDataURL, 'PNG', 5, position, imgWidth, imgHeight);
            //  window.open(pdf.output('bloburl', { filename: 'new-file.pdf' }), '_blank');

            // doc.save('comprobante.pdf');
            pdf.autoPrint();
            //doc.output('bloburl')
            document.getElementById('main-iframe').setAttribute('src', pdf.output('bloburl'));
        });
        //hideAlert()
        //usedispatch(setModal({ nombre: '', estado: '' }))
    }

    return (
        <div className="container">
            <iframe className='d-none' id="main-iframe" ></iframe>
            <div className="row">

                <div className="card">
                    <div className=" card-body row">
                        <div className=" col-4 d-flex align-items-center ">
                            <span>Seleccione el evento</span>
                        </div>
                        <div className="col-6">
                            <select className=" form-select">
                                <option>Evento 1</option>
                                <option>Evento 2 </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row card">
                <div className=" card-body">
                    <button className=" btn btn-success" onClick={imprime}> Imprimir </button>
                    <div className=" container row  mx-auto ">
                        <div className="col-sm mx-1 text-center border ">
                            <h4> Sección 1</h4>
                        </div>
                        <div className="col-sm mx-1 text-center border ">
                            <h4> Sección 2</h4>
                        </div>
                        <div className="col-sm mx-1 text-center border ">
                            <h4> Sección 3 </h4>
                        </div>
                        <div className="col-sm mx-1 text-center border ">
                            <h4> Sección 4</h4>
                        </div>
                    </div>
                    <div className=" row mx-auto  ">
                        <div className="d-flex  mx-auto justify-content-center" style={{
                            height: 400
                        }}>
                            <div className="pt-3">
                                <div id="ticktes" className="border bg-info " style={{
                                    position: "relative",
                                    width: "17.05cm",
                                    height: "5.5cm"
                                }}>
                                    {/**primer cuadro a la izquierda */}
                                    <div className=" d-flex 
                                     
                                    " style={{
                                            height: "4.5cm"
                                        }}>
                                        {/** seccion principal izquierda */}
                                        <div className=""
                                            style={{
                                                height: "100%",
                                                width: "9.5cm"
                                            }}
                                        >
                                            <div className="pl-2  pt-2"
                                                style={{

                                                }}>
                                                <h5 style={{
                                                    fontSize: "0.7em",
                                                    fontWeight: "bold",
                                                    lineHeight: 0,
                                                }} className="pt-1 pb-0"> <span>ESTADIO VOLTER PALADIINES </span> MIEL SAN MARCOS  </h5>
                                                <p className=" pl-3 pt-1 pb-0" style={{ fontSize: "0.68em", fontWeight: "bold", lineHeight: 0, }} >Guayaquil 20 de diciembre 2022 19:00 </p>
                                            </div>
                                            <div className="row px-0">
                                                <div className="col-4">
                                                    <div className=" pb-0 pt-3 text-center">
                                                        <p style={{
                                                            fontSize: "0.9em",
                                                            fontWeight: "bold",
                                                            lineHeight: 0
                                                        }}>Preventa </p>
                                                        <QRCodeCanvas value="Ayuda XD"
                                                            style={{
                                                                width: "2.3cm",
                                                                height: "2.3cm",
                                                                padding: 0,
                                                                paddingLeft: 2
                                                            }}
                                                        />
                                                    </div>
                                                    <div className=" bg-danger pt-0" >

                                                    </div>
                                                </div>
                                                <div className="col-8 d-flex pl-0">
                                                    <div style={{
                                                        height: "4.7cm"
                                                    }}>
                                                        <div className="" style={{
                                                            height: "2cm",
                                                            width: "4.5cm",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            backgroundImage: 'url("' + tercero + '")',
                                                            backgroundSize: "cover"
                                                        }}>
                                                            <img src={tercero} className="img-fluid"

                                                                style={{
                                                                    WebkitFilter: "grayscale(100%)",
                                                                    filter: "grayscale(100%)"
                                                                }}>
                                                            </img>

                                                        </div>
                                                        <div className="text-center bg pt-1" >
                                                            <p className=" pt-3"
                                                                style={{
                                                                    fontSize: "0.8em",
                                                                    fontWeight: "bold",
                                                                    lineHeight: 0,
                                                                }}
                                                            > Jessi Uribe & Francy  </p>
                                                            <p style={{
                                                                lineHeight: 0,
                                                                paddingTop: -5,
                                                                fontSize: "0.8em",
                                                                fontWeight: "bold"
                                                            }}>
                                                                valor $30.00
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className=""
                                                        style={{
                                                            height: "3.2cm",
                                                            width: "1.5cm",
                                                        }}
                                                    >


                                                        <div
                                                            className="d-flex"
                                                        >

                                                            <img src={tercero}
                                                                style={{
                                                                    WebkitFilter: "grayscale(100%)",
                                                                    filter: "grayscale(100%)",
                                                                    transformOrigin: "left",
                                                                    transform: "translate(25px,45px) rotate(" + 270 + "deg) ",
                                                                    height: "1cm",
                                                                    marginTop: 35,
                                                                    width: "2.5cm"
                                                                }}>
                                                            </img>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                        {/**segundo cuado iquierda */}
                                        <div className=" "
                                            style={{
                                                height: "100%",
                                                width: "2cm"
                                            }}>
                                            <div className="d-flex w-100 h-100">
                                                <div className=""
                                                    style={{

                                                    }}
                                                >
                                                    <div className="d-flex align-items-center justify-content-center"
                                                        style={
                                                            {
                                                                height: "2cm",
                                                                width: "2cm"
                                                            }
                                                        }
                                                    >
                                                        <QRCodeCanvas value="Ayuda XD"
                                                            style={{
                                                                width: "1.5cm",
                                                                height: "1.5cm",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="  "
                                                        style={
                                                            {
                                                                height: "2.40cm",
                                                                width: "2.4cm"
                                                            }
                                                        }>

                                                        <div className="d-flex flex-column text-center pb-1"

                                                        >
                                                            <span className=" px-0 " style={{
                                                                transform: "translate(-41px,35px) rotate(" + 270 + "deg) ",
                                                                fontSize: "0.7em"
                                                            }}> VALOR $30.00 </span>
                                                            <span
                                                                style={{
                                                                    transform: "translate(-20px,15px) rotate(" + 270 + "deg) ",
                                                                    fontSize: "0.8em"
                                                                }}> Ticket # 982 </span>
                                                            <span style={{
                                                                transform: "translate(0px,-5px) rotate(" + 270 + "deg) ",
                                                                fontSize: "0.7em"

                                                            }}> PREFERENCIAL</span>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                        {/** tercera donde esta el codigo del barra */}
                                        <div className=" bg-light"
                                            style={{
                                                height: "100%",
                                                width: "1.5cm"
                                            }}
                                        >
                                        </div>
                                        {/**seccion final */}
                                        <div className="  d-flex align-items-center"
                                            style={{
                                                height: "100%",
                                                width: "4cm"
                                            }}>

                                            <div className="row ">
                                                <div className="col-12 pb-0 mb-0 text-center"
                                                    style={{
                                                        fontWeight: "bold"
                                                    }}>
                                                    <span> TICKET #982</span>
                                                </div>



                                                <div className="col-2">
                                                    <div className="d-flex text-center "
                                                        style={{
                                                            width: "3cm"
                                                        }}
                                                    >
                                                        <span style={{
                                                            transform: "translate(-15px,30px) rotate(" + 270 + "deg) ",
                                                            fontSize: "0.7em",
                                                            fontWeight: "bold"
                                                        }}> DORIS JOJOA </span>
                                                    </div>
                                                </div>
                                                <div className="col-7">
                                                    <QRCodeCanvas value="Ayuda XD"
                                                        style={{
                                                            width: "2.5cm",
                                                            height: "2cm",
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-2">
                                                    <div className=" "
                                                        style={{
                                                            display: "flex",
                                                            width: "3cm"
                                                        }}
                                                    >
                                                        <span style={{
                                                            transform: "translate(-35px,30px) rotate(" + 270 + "deg) ",
                                                            fontSize: "0.7em",
                                                            fontWeight: "bold"

                                                        }}> VALOR $30.00 </span>
                                                    </div>
                                                    <div className=" d-none pb-1"
                                                        style={{
                                                            fontSize: "0.7em",
                                                            writingMode: "vertical-lr",
                                                            transform: "translate(2px) rotate(180deg)",
                                                        }}
                                                    >
                                                        <span> VALOR $30.00 </span>
                                                    </div>
                                                </div>
                                                <div className="col-12 PT-0 text-center" style={{
                                                    fontWeight: "bold"
                                                }}>
                                                    PREFERENCIAL
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    {/**pie de pagina */}
                                    <div className=" bg-success border ">

                                    </div>

                                </div>

                            </div>
                            <div className="pt-3  d-none ">
                                <div className="  " style={{
                                    position: "relative",
                                    width: "17.05cm",
                                    height: "4.5cm"
                                }}>
                                    <div className="row w-100  h-100 mx-auto">
                                        <div className="col-8  border border-danger">
                                            <div className="row">
                                                <div className="col-9 border">
                                                    <div className="  pt-2" >
                                                        <h5 style={{
                                                            fontSize: "0.8em",
                                                            lineHeight: 0,
                                                        }} className="pt-1 pb-0"> MIEL SAN MARCOS </h5>
                                                        <p className="pt-1 pb-0" style={{ fontSize: "0.65em", lineHeight: 0, }} >Guayaquil 20 de diciembre 2022 19:00 </p>
                                                    </div>
                                                </div>
                                                <div className=" border col-sm"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center"
                                                    }}>
                                                    <QRCodeCanvas value="Ayuda XD"
                                                        style={{
                                                            width: "60%",
                                                            height: "70%",
                                                            padding: 0,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row" style={{
                                                height: "2.9cm"
                                            }}>
                                                <div className=" border col-3" style={{
                                                    display: "flex"
                                                    , justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                    <QRCodeCanvas value="Ayuda XD"
                                                        style={{
                                                            width: "80%",
                                                            height: "80%",
                                                            padding: 0,
                                                        }}
                                                    />

                                                </div>
                                                <div className=" border row  col-9 px-0" style={{

                                                }}>
                                                    <div className="col-sm">
                                                        <div className=" pt-1 pr-0 border rounded-4"
                                                            style={{
                                                                height: "2cm",
                                                                width: "4cm"
                                                            }}>
                                                        </div>
                                                        <div>
                                                            sdfsd
                                                        </div>
                                                    </div>
                                                    <div className="col-5 border h-100">

                                                    </div>


                                                </div>
                                            </div>
                                            {/**
                                         * 
                                         * .texto-vertical-2 {
                                            writing-mode: vertical-lr;
                                            transform: rotate(180deg);
                                        }
                                        */}
                                        </div>
                                        <div className=" col-sm  border border-info">
                                        </div>
                                        <div className="d-flex  col-3 border border-primary">
                                            <div className="row">
                                                <div className="col-sm pl-1">
                                                    <div>
                                                        <div className=""
                                                            style={{

                                                                writingMode: "vertical-lr",
                                                                transform: "rotate(180deg)",

                                                                height: "3.5cm"
                                                            }}
                                                        >   DORIS JOJOA
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="col-9   px-0 d-flex flex-column   justify-content-center align-items-center btn-group-vertical">
                                                    <div style={{
                                                        fontSize: "0.8em"
                                                    }}>
                                                        TICKET #000000
                                                    </div>
                                                    <div className=" " style={{
                                                        height: "2cm",
                                                        width: "2cm"
                                                    }}>
                                                        <QRCodeCanvas value="Ayuda XD"
                                                            style={{
                                                                height: "2cm",
                                                                width: "2.1cm",
                                                                padding: 0,
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{
                                                        fontSize: "0.8em"
                                                    }}>
                                                        PREFERENCIAL
                                                    </div>

                                                </div>
                                                <div className="col-sm px-0">
                                                    <div>
                                                        <div className=" mx-auto"
                                                            style={{

                                                                writingMode: "vertical-lr",
                                                                transform: "rotate(180deg)",

                                                                height: "3.5cm"
                                                            }}
                                                        >  Valor $ 25
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>



                                            <div className="d-none d-flex bg-danger col-sm">
                                                <div style={{
                                                    position: "relative",

                                                    transform: "rotate(" + 30 + "deg)",
                                                }}>
                                                    <i id="codigoqr"
                                                        style={{
                                                            position: "absolute",
                                                            left: 100
                                                        }} className="bi bi-qr-code-scan fa-2x moverdos"></i>

                                                </div>
                                            </div>
                                            <div className=" col-sm" >
                                                <div className="">

                                                </div>

                                            </div>








                                        </div>
                                    </div>
                                    <div className="  border  bg-success " style={{

                                        height: 40,
                                        width: "100%",

                                    }}>
                                    </div>
                                </div>




                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}
