import { useEffect } from "react";

import { QRCodeCanvas } from "qrcode.react";
export function DiseñoViewtickes() {
    return (
        <div className="container">
            <div className="row">

                <div className="card">
                    <div className=" card-body row">
                        <div className=" col-4 d-flex align-items-center ">
                            <span>Seleccione el evento</span>
                        </div>
                        <div className="col-6">
                            <select className=" form-select">
                                <option > Evemto 1</option>
                                <option>Ecento 2 </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row card">
                <div className=" card-body">
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
                        <div className=" d-flex justify-content-center" style={{
                            height: 400
                        }}>
                            <div className="pt-3  ">
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
        </div>
    )
}
