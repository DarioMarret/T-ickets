import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import header from "../../../assets/header.jpeg";
import logofla from "../../../assets/logo-flashthetickets.png";
import principal from "../../../assets/imagen/pimpinelag.jpeg";
import secundaria from "../../../assets/imagen/lamision.jpeg";
import tercero from "../../../assets/imagen/eventoprincip.jpeg"
import icon from "../../../assets/imagen/logo_Flash.png";
import evento from "../../../assets/imagen/gpiminel.jpeg";
import valla from "../../../assets/imagen/valla-proximo-evento.png";
import "../../../assets/css/animate.css";
import "../../../assets/css/bootstrap.css";
import { Modal } from "react-bootstrap"
import ModalCarrito from "views/Components/MODAL/ModalCarrito";
import ModalDetalle from "views/Components/MODAL/ModalDetalle";
import ModalPago from "views/Components/MODAL/ModalPago";
import Footer from "views/Components/Footer/Footer";


const IndexFlas = () => {
  const [lgShow, setLgShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [showDetalle, setDetalle] = useState(false)
  const [repShop, setrepShow]= useState(false);
  const [opsShow, setOpShow]= useState(false);
  const [efectShow, efectiOpShow]= useState(false);
 

  const [modalPago, setModalPago] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  

  const handleContinuar = () => {
    setShow(false)
    setDetalle(true)
  } 
  const handleDetalleColse = () => {
    setDetalle(false)
    setShow(true)
  }
  const [listaPrecio, setListaPrecio] = useState({
    total: 0,
    subtotal: 0,
    comision: 0
  })
  const [listarCarritoDetalle, setListarCarritoDetalle] = useState([])

  const [datosPerson, setPerson] = useState({
    name: '',
    email: '',
    dni: '',
    number: '',
    metodo: '',
    envio: 1
  })

  return (
    <>
      <nav className="navbar navbar-expand-lg justify-content-between navbar-dark bg-black fixed-top py-3">
        <div className="container-fluid col-lg-7    d-flex justify-content-between">
          <a className="navbar-brand " aria-label="TICKETS" href="#">
            <img src={icon} className="img-fluid" style={{ height: '50px' }} alt="" />
          </a>
          <button className="navbar-toggler justify-content-end " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className=" navbar-nav  mb-2 mb-lg-0 navbar-nav  ml-md-auto  d-md-flex">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Inicio</a>
              </li>
              <li className="nav-item active" aria-current="page">
                <a className=" nav-link" href="#nuevoseventos">Eventos</a>
              </li>
              <li className="nav-item active" aria-current="page">
                <a className="nav-link " href="#nuevoseventos">Comprar</a>
              </li>
              <li className="  nav-item">
                <a className=" btn btn-outline-light  " href="#"> Mi Cuenta <i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                </svg></i> </a>
              </li>
            </ul>
            <ul className=" navbar-nav  mb-2 mb-lg-0 navbar-nav  ml-md-1   justify-content-center ">
              <li className="  nav-item">
                <a className=" btn btn-outline-light  " href="https://api.whatsapp.com/send/?phone=593983832112&amp;text&amp;type=phone_number&amp;app_absent=0" target="_blank"> 0983832112 <i className="fab fa-whatsapp fa-lg ml-1 justify-content-center"></i> </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* header */}
      <div className="container-fluid  p-0">
        <div className="col-12 mx-auto bg-header-boleteria" style={{ height: '400px', backgroundImage: `url(${header})` }}>
          <div className="container w-100 h-100 px-0">
            <div className="container btn-group-vertical  h-100 text-center px-0">
              <h1 className="text-white mx-auto" style={{ fontSize: '3.5em' }}><img src={logofla} className="img-fluid" style={{ height: '150px' }} alt="" /></h1>
              <p className="mx-auto text-white d-none" style={{ fontSize: '1.2em' }}><b>Compra</b> tu entrada <b>fácil, rápido</b> y
                <b>seguro</b>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* carrusel */}
      <div className="container  mt-n7">
        <div className="container p-3">
          <div className="row  flex-wrap-reverse justify-content-center">
            <div className="col-12 col-lg-6">
              {/*<!--Carousel-->*/}
              <Carousel className="carousel-inner rounded-7   carousel-fade" slide={false}>
                <Carousel.Item interval={1300}>
                  <img
                    className="d-block w-100"
                    src={principal}
                    alt="First slide"
                  />
                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1300}>
                  <img
                    className="d-block w-100"
                    src={secundaria}
                    alt="Second slide"
                  />
                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={1300}>
                  <img
                    className="d-block w-100"
                    src={tercero}
                    alt="Third slide"
                  />
                  <Carousel.Caption>

                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>


            </div>


            <div className="col-12 col-lg-3 my-3">
              <div className="container bg-white shadow-md rounded-7 mt-5 mt-lg-0">
                <div className="container py-3 px-0">

                  <li className="unlisted mt-3">
                    <div className="row">
                      <div className="col-1 me-5"><a href="#nuevoseventos" aria-label="icon-star"
                        className="btn btn-dark icon-star p-3 rounded-6"></a></div>
                      <div className="col-8">
                        <h1 style={{ fontSize: '1.1em' }}>La ultima mision 2k </h1>
                        <span style={{ fontSize: '1.0em' }}>10/09/2022, Guayaquil</span>

                      </div>
                    </div>
                  </li>
                  <li className="unlisted mt-3">
                    <div className="row">
                      <div className="col-1 me-5"><a href="#nuevoseventos" aria-label="icon-star"
                        className="btn btn-dark icon-star p-3 rounded-6"></a></div>
                      <div className="col-8">
                        <h1 style={{ fontSize: '1.1em' }}>Pimpinela</h1>
                        <span style={{ fontSize: '1.0em' }}>28/10/2022, Guayaquil</span>
                      </div>
                    </div>
                  </li>
                  <li className="unlisted mt-3">
                    <div className="row">
                      <div className="col-1 me-5">
                        <a href="#nuevoseventos" aria-label="icon-star" className="btn btn-dark icon-star p-3 rounded-6"></a>
                      </div>
                      <div className="col-8">
                        <h1 style={{ fontSize: '1.1em' }}>Pimpinela</h1>
                        <span style={{ fontSize: '1.0em' }}>29/09/2022, Cuenca</span>
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* eventos */}
      <div className="container " id="nuevoseventos">
        <div className="container p-3">
          <div className="row flex-wrap-reverse justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="row mx-auto p-0">
                <div className="col-12 col-lg-6 mx-auto my-5" id="evento2">
                  <a className="" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false"
                    aria-controls="collapseExample2">
                    <div className="container rounded-7 shadow-md px-0">
                      <img src={evento} className="img-fluid rounded-7 shadow-md " alt="" />
                    </div>
                  </a>
                  <div className="collapse container mt-4 px-0" id="collapseExample2">
                    <div className="card card-body rounded-7 py-5">
                      <div className="container">
                        <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">Grupo Pimpinela</span> </h1>
                        <h4 style={{ fontSize: '1.4em' }}><span id="tour">Gira 40 Aniversario </span></h4>
                        <div className="col-12 border border-bottom my-3"></div>
                        <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento"> Viernes 28-10-2022</span></p>
                        <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento">Coliseo Voltaire Paladines
                          Polo</span></p>
                        <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span id="horaEvento"> 21:00</span></p>
                        <p data-toggle="modal" data-target="#carritocoompra" data-backdrop="static" data-keyboard="false"
                          // {/*onclick="cronometro('Grupo Pimpinela 28-10-2022','Pimpinela')" */}
                          className="evento btn btn-primary fw-bold px-3 py-2 rounded-6" onClick={() => handleShow()} >Comprar Entrada</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 mx-auto my-5" id="evento4">
                  <div className="" aria-label="coll" data-bs-toggle="collapse" role="button" aria-expanded="false"
                    aria-controls="collapseExample">
                    <div className="container  px-0">
                      <img src={valla} className="img-fluid  " alt="" />
                    </div>
                  </div>
                  <div className="collapse container mt-4 px-0" id="collapseExample4">
                    <div className="card card-body rounded-7 py-5">
                      <div className="container ">
                        <h1 style={{ fontSize: '1.4em' }}><span id="artista" className="fw-bold">Proximo evento</span> </h1>
                        <h4 style={{ fontSize: '1.4em' }}></h4>
                        <div className="col-12 border border-bottom my-3"></div>
                        <p style={{ fontSize: '1.2em' }}><b>Fecha:</b><span id="fechaEvento">Proximamente</span></p>
                        <p style={{ fontSize: '1.2em' }}><b>Lugar:</b><span id="lugarEvento"> Proximamente</span></p>
                        <p style={{ fontSize: '1.2em' }}><b>Hora:</b><span id="horaEvento"> Proximamente</span></p>
                        <p href="#" className="evento d-none btn btn-primary fw-bold px-3 py-2 rounded-6" id="comprar">
                          Proximamente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* flotter*/}
      <Footer logofla={logofla} />
      <ModalCarrito
        show={show} handleClose={handleClose}
        handleContinuar={handleContinuar}
        listaPrecio={listaPrecio}
        setListaPrecio={setListaPrecio}
        setListarCarritoDetalle={setListarCarritoDetalle}
        datosPerson={datosPerson}
        setPerson={setPerson}
      />

      <ModalDetalle
        showDetalle={showDetalle}
        setDetalle={setDetalle}
        handleDetalleColse={handleDetalleColse}
        listaPrecio={listaPrecio}
        setListaPrecio={setListaPrecio}
        listarCarritoDetalle={listarCarritoDetalle}
        datosPerson={datosPerson}
        setPerson={setPerson}
        setModalPago={setModalPago}
      />

      {
        modalPago ? <ModalPago setModalPago={setModalPago} modalPago={modalPago} /> : null
      }

      <Modal

        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </>

  )

}
export default IndexFlas;