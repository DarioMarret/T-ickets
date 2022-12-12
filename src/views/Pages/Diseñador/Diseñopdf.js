import { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../Esquemas/index.css"
export default function DiseñoViwpdf() {
    useEffect(() => {
        var element = document.getElementById('printe');
        var opt = {

            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },

            jsPDF: { unit: 'in', format: 'letter', }
        };
        // html2pdf(element, opt);

    }, [])

    return (
        <>
            <div className="row">
                <div className="col-6 ">
                    <div id="printe" className="print "
                        style={{
                            width: '210mm',
                            height: '270mm',
                        }}>
                        <div className="imagen  "
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: 25,
                                width: "197mm",
                                height: "30mm",
                                border: "1px solid #000"
                            }}
                        >
                        </div>
                        <div className=" border datos-clientes"
                            style={{

                                margin: 25,
                                width: "197mm",

                            }}
                        >
                            <table className="table  table-striped">
                                <thead className=" text-dark table-striped">
                                    <tr>
                                        <th scope="col"><strong> Breneficiario-cliete:  Carlos Humberto Tapia Alarcon </strong>   </th>

                                        <th scope="col"><strong> Protocolo: 200000000 </strong></th>
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
                                        <th scope="col">$25</th>
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
        </>)

}