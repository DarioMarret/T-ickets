import React from 'react';
import { carrusel } from 'views/Pages/Flasdeticket/imagenstatctic';
let { android, ios, face, insta, tick, youtube, nombre, nombrepage } = carrusel
import { useSelector } from 'react-redux';

export default function Footer(props) {
    const { logofla } = props;
    const datos = useSelector(state => state.SuscritorSlice)
    // console.log(datos)
    return (
        <div className=" container-fluid h-55  footer-fluid px-0"
            style={{
                position: 'static',
                bottom: 0,
                backgroundColor: "#311C7C",

            }}
        >       <div className=" container-fluid  pt-3">
                <div className=" d-none container d-none justify-content-center p-2">
                    <div className="row text-center p-2">
                        <div className="col-12 col-lg-3">
                            <li className=" unlisted nav-item" href="#!" ><a className="nav-link text-white"
                                href="#!">Quiénes Somos</a> </li>
                        </div>
                        <div className="col-12 col-lg-3">
                            <li className="unlisted nav-item" ><a
                                className="nav-link text-white"  >Términos y condiciones</a>
                            </li>
                        </div>
                        <div className="col-12 col-lg-3">
                            <li className="unlisted nav-item" >
                                <a className="nav-link text-white"
                                    href="#!">Puntos de venta</a> </li>
                        </div>
                        <div className="col-12 col-lg-3">
                            <li className="unlisted nav-item" ><a className="nav-link text-white" >Contáctanos</a> </li>
                        </div>
                    </div>
                </div>
                <div className="  d-none container border border-bottom mb-3"></div>
                <div className=" d-none container-fluid    justify-content-center">
                    <div className=" mb-4 ">
                        <a rel="stylesheet" className="btn btn-outline-light mx-1" aria-label="facebook"
                            href="#!" target="_blank" role="button">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a className="btn btn-outline-light" aria-label="fa-instagram"
                            href="#!" target="_blank" role="button">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className='d-flex flex-wrap pt-2 px-0 justify-content-between ' >
                    <div className='col-12 col-sm-12 col-md-12 col-lg-3 ml-n1  d-flex justify-content-center justify-content-lg-between px-0 pb-2'          >
                        <div className='d-flex flex-column justify-content-center justify-content-md-between align-content-between'>
                            <div className=''>
                                <div className='d-flex flex-column mb-3'>
                                    <span className=" d-none text-white" style={{ fontFamily: '', }} >Donde pagar nuestras cuntas </span>

                                </div>
                                <div className="d-flex  flex-column" style={{ alignItems: 'stretch', lineHeight: '2', minWidth: '120px', maxWidth: '' }} >
                                    <h5 className=" text-white" style={{ fontFamily: '', }} > <img src={nombrepage} style={{ height: 20 }} ></img> </h5>
                                    <span className=" text-white" style={{ fontFamily: '', }} >Descarga nuestra aplicación </span>
                                </div>
                                <h5 className='d-none text-white' style={{ fontFamily: ',bold,' }}>  </h5>
                                <div className='d-flex py-2  flex-row'>
                                    <div className=' pr-1' >
                                        <img src={android} className='img-fluid' style={{ height: 40, cursor: 'pointer' }} />
                                    </div>
                                    <div className=' pl-1 ' >
                                        <img src={ios} className='img-fluid' style={{ height: 40, cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <div className="d-flex  flex-column" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '120px', maxWidth: '' }} >
                                    <span className=" text-white" style={{ fontFamily: '', }} >Síguenos en nuestras Redes  </span>
                                </div>
                                <div className='d-flex pt-2  pb-5 flex-row' >
                                    <div className=' pl-2   ' >
                                        <a href="https://www.facebook.com/tickets.com.ec?mibextid=LQQJ4d" target="_black">
                                            <img src={face} target="_black" className='img-fluid shadow  ' style={{
                                                height: 40,
                                                cursor: 'pointer'
                                            }} />
                                        </a>
                                    </div>
                                    <div className=' pl-2 ' >
                                        <a href="https://instagram.com/tickets.com.ec?igshid=YmMyMTA2M2Y=" target="_black">
                                            <img src={insta} className='img-fluid  shadow-lg ' style={{ height: 40, cursor: 'pointer' }} />

                                        </a>
                                    </div>
                                    <div className=' pl-2' >
                                        <a href="https://www.tiktok.com/@tickets.com.ec?_t=8Z2G1FTansT&_r=1" target="_black">
                                            <img src={tick} className='img-fluid' style={{ height: 40, cursor: 'pointer' }} />
                                        </a>
                                    </div>
                                    <div className='  pl-2 '
                                    >
                                        <img src={youtube} className='img-fluid' style={{ height: 40, cursor: 'pointer' }} />

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='col-12 col-md-9  d-flex px-0  container-fluid pb-2 '

                    >
                        <div className='d-flex flex-column  px-0  container-fluid   '>
                            <div className='d-flex flex-column pb-5 px-0'>
                                <div className='pb-5 d-flex flex-wrap  justify-content-center  justify-content-md-between '
                                    style={{ fontSize: '0.8em', lineHeight: 1 }}
                                >
                                    <div className=' col-sm-6 txt-white  p-1' style={{ width: '225px', maxWidth: 225 }}>
                                        <h6 className='text-capitalize font-weight-bold '

                                        >Habla con Nosotros</h6>
                                        <a href='https://t-ickets.net/3FynwiC' target="_blank" className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i className="bi bi-whatsapp"></i>
                                            <span className=" text-white" style={{ fontFamily: '', }} > 593 96 920 0247  </span>
                                        </a>
                                        <a
                                            href="tel:043585652" target="_blank"
                                            className='d-none nav-link link-light px-0 txt-white nav-icons ' >
                                            <i className="bi bi-telephone-fill"></i>
                                            <span className=" text-white" style={{ fontFamily: '', }} > 043585652  </span>
                                        </a>
                                        <a href="mailto:info@t-ickets.com?Subject=Comunicate%20con%20nosotros%20-%20t-ickets"
                                            target="_blank"
                                            className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i className="bi bi-envelope"> </i>
                                            <span className=" text-white" style={{ fontFamily: '', }} > info@t-ickets.com  </span>
                                        </a>
                                        <a href='https://goo.gl/maps/NvfDLJ9D6r1QNeFu5' target="_blank" className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i className="bi bi-geo-alt-fill"> </i>
                                            <span className=" text-white" style={{ fontFamily: '', }} >City Office Piso 3 Oficina L310 </span>
                                        </a>
                                    </div>
                                    <div className='d-none  txt-white p-1' style={{ width: '225px', maxWidth: 225 }}>
                                        <h6 className='text-capitalize font-weight-bold '> Puntos de ventas </h6>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Guayaquil</span>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Quito </span>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Santo Domingo</span>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Cuenca</span>
                                        </a>
                                    </div>
                                    <div className='d-none d-sm-none d-md-block  txt-white p-1' style={{ width: '225px', maxWidth: 225 }}>
                                        <h6 className='text-capitalize font-weight-bold '>Nuestra empresa  </h6>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Quiénes Somos</span>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Visión</span>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Trabaja con Nosotros</span>
                                        </a>

                                    </div>
                                    <div className=' d-none d-sm-none d-md-block txt-white px-1' style={{ width: '225px', maxWidth: 225 }}>
                                        <h6 className='text-capitalize font-weight-bold '>Área de Clientes</h6>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Reclamos </span>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <span className=" text-white" style={{ fontFamily: '', }} >Vender con Nosotros</span>

                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >

                                            <span className=" text-white" style={{ fontFamily: '', }} >Descargar Factura Electrónica</span>
                                        </a>
                                        {datos.login ? <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >

                                            <span className=" text-white" style={{ fontFamily: '', }} >{datos.subscritor.enable == 1 ? "Cancelar Suscripción" : "Habilitar Suscripción"}</span>
                                        </a> : ''}

                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>

                </div>
                <div className='row  '>
                    <div className="col-12 text-center px-1 flex-column  pb-2" style={{ minWidth: '120px', maxWidth: '' }} >
                        <span className=" text-white" style={{ fontSize: '0.7em', }} >
                            Al permanecer en esta página, usted acuerda aceptar nuestros
                            <a className="unlisted link-light nav-item px-1" href='#!' data-toggle="modal" data-target="#terminosModalModal" aria-label="terminos">
                                Términos y condiciones
                            </a> </span>
                    </div>
                    <div className="col-12 text-center px-1 d-flex  flex-column pb-2" style={{ minWidth: '120px', maxWidth: '' }} >
                        <span className=" text-white" style={{ fontSize: '0.65em', }} >COPYRIGHT © 2022 TICKETS ECUADOR S.A | COMPUTECNICSNET S.A | TODOS LOS DERECHOS RESERVADOS </span>
                    </div>


                </div>

            </div>
        </div>
    );
}

