import React from 'react';
import { carrusel } from 'views/Pages/Flasdeticket/imagenstatctic';
let { android, ios, face, insta, tick, youtube } = carrusel
export default function Footer(props) {
    const { logofla } = props;
    return (
        <div className=" container-fluid h-55 bg-black footer-fluid"
            style={{
                position: 'static',
                bottom: 0
            }}
        >
            <div className=" container-fluid  pt-3">
                <div className="container d-none justify-content-center p-2">
                    <div className="row text-center p-2">
                        <div className="col-12 col-lg-3">
                            <li className=" unlisted nav-item" href="#!" aria-label="terminos"><a className="nav-link text-white" role="link"
                                href="#!">Quiénes Somos</a> </li>
                        </div>
                        <div className="col-12 col-lg-3">
                            <li className="unlisted nav-item" data-toggle="modal" data-target="#terminosModalModal" aria-label="terminos"><a
                                className="nav-link text-white" role="link" data-target="#terminosModalLong">Términos y condiciones</a>
                            </li>
                        </div>
                        <div className="col-12 col-lg-3">
                            <li className="unlisted nav-item" aria-label="terminos"><a className="nav-link text-white" role="link"
                                href="#!">Puntos de venta</a> </li>
                        </div>
                        <div className="col-12 col-lg-3">
                            <li className="unlisted nav-item" aria-label="terminos"><a className="nav-link text-white" role="link">Contáctanos</a> </li>
                        </div>
                    </div>
                </div>
                <div className="container border d-none border-bottom mb-3"></div>
                <div className="container-fluid  d-none d-flex justify-content-center">
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
                <div className='d-flex flex-wrap pt-2 px-0 justify-content-center justify-content-md-between ' >
                    <div className='col-12 col-md-4    d-flex justify-content-center justify-content-md-between px-0 pb-2'

                    >
                        <div className='d-flex flex-column justify-content-center justify-content-md-between align-content-between'>
                            <div className=''>
                                <div className="d-flex  flex-column" style={{ alignItems: 'stretch', lineHeight: '2', minWidth: '120px', maxWidth: '' }} >
                                    <h5 className=" text-white" style={{ fontFamily: '', }} >t-ickeets.com </h5>
                                    <span className=" text-white" style={{ fontFamily: '', }} >Descarga nuestra aplicación </span>
                                </div>
                                <h5 className='d-none text-white' style={{ fontFamily: 'cursive,bold,fantasy' }}>  </h5>
                                <div className='d-flex py-2  flex-row'>
                                    <div className=' pr-1' >
                                        <img src={android} className='img-fluid' style={{ height: 40 }} />
                                    </div>
                                    <div className=' pl-1 ' >
                                        <img src={ios} className='img-fluid' style={{ height: 40 }} />

                                    </div>
                                </div>
                                <div className="d-flex  flex-column" style={{ alignItems: 'stretch', lineHeight: '1', minWidth: '120px', maxWidth: '' }} >

                                    <span className=" text-white" style={{ fontFamily: '', }} >Siguenos en nuestras Redes  </span>
                                </div>
                                <div className='d-flex pt-2  pb-5 flex-row' >
                                    <div className=' pr-1' >
                                        <img src={face} className='img-fluid' style={{ height: 40 }} />
                                    </div>
                                    <div className=' pl-1 ' >
                                        <img src={insta} className='img-fluid' style={{ height: 40 }} />
                                    </div>
                                    <div className=' pl-1 ' >
                                        <img src={tick} className='img-fluid' style={{ height: 40 }} />
                                    </div>
                                    <div className='  pl-1 '
                                    >
                                        <img src={youtube} className='img-fluid' style={{ height: 40 }} />

                                    </div>
                                </div>
                            </div>
                            <div className="d-flex  flex-column  pb-2" style={{ minWidth: '120px', maxWidth: '' }} >
                                <span className=" text-white" style={{ fontSize: '0.7em', }} >Al permanecer en esta página, usted acuerda aceptar nuestros <span> Términos y Condiciones</span> </span>
                            </div>

                        </div>

                    </div>
                    <div className='col-12 col-md-8 d-flex px-0  container-fluid pb-2'

                    >
                        <div className='d-flex flex-column  px-0  container-fluid   '>
                            <div className='d-flex flex-column pb-5 px-0'>
                                <div className='pb-5 d-flex flex-wrap  justify-content-between '
                                    style={{ fontSize: '0.8em', lineHeight: 1 }}
                                >
                                    <div className=' col-sm-6 txt-white  p-1' style={{ width: '230px', maxWidth: 270 }}>
                                        <h4>Habla con Nosotros</h4>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="bi bi-whatsapp"> 0987598750</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="bi bi-telephone-fill"> 043585652</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="bi bi-envelope"> info@t-ickets.com</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="bi bi-geo-alt-fill"> City Oficce Piso 3 </i>
                                        </a>
                                    </div>
                                    <div className='txt-white p-1' style={{ width: '230px', maxWidth: 270 }}>
                                        <h4>Puntos de ventas </h4>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class=""> Guayaquil</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="">Quito</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i >SantoDomingo</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="">Cuenca</i>
                                        </a>
                                    </div>
                                    <div className=' txt-white p-1' style={{ width: '230px', maxWidth: 270 }}>
                                        <h4>Nuestra empresa  </h4>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class=""> Quiénes Somos</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="">Vision</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i >Trabaja con Nosotros</i>
                                        </a>

                                    </div>
                                    <div className=' txt-white px-1' style={{ width: '230px', maxWidth: 270 }}>
                                        <h4>Area de Clientes</h4>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class=""> Reclamos o Devoluciones</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="">Vender con Nosotros</i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i >Descargar Factura Electronica  </i>
                                        </a>
                                        <a href='#' className=' nav-link link-light px-0 txt-white nav-icons ' >
                                            <i class="">Cuenca</i>
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div className="d-flex  flex-column pb-2" style={{ minWidth: '120px', maxWidth: '' }} >
                                <span className=" text-white" style={{ fontSize: '0.65em', }} >COPYRIGHT © 2022 TICKETS ECUADOR S.A - TODOS LOS DERECHOS RESERVADOS </span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}

