import React from 'react';

function Footer(props) {
    const { logofla } = props;
    return (
        <div className=" container-fluid h-55 bg-black footer-fluid"
            style={{
                position: 'static',
                bottom: 0
            }}
        >
            <div className=" container-fluid ">
                <div className="container  justify-content-center p-2">
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
                <div className="container border border-bottom mb-3"></div>
                <div className="container-fluid   d-flex justify-content-center">
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
                <div className="container-fluid d-flex align-items-center justify-content-center flex-column">
                    <div className="mb-4 text-white text-center">
                        <p><span style={{ fontSize: '0.7em' }}> COPYRIGHT © 2022 TICKETS ECUADOR S.A - TODOS LOS DERECHOS RESERVADOS</span>
                        </p>
                    </div>
                    <div className=" d-flex justify-content-center">
                        <a href=""><img className="" src={logofla} style={{ height: '30px' }} alt="" /></a>
                    </div>
                    <div className="mb-4 text-white">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;