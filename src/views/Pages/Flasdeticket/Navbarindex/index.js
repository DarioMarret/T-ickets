import { useDispatch, useSelector } from "react-redux"
import { setModal } from "StoreRedux/Slice/SuscritorSlice"

export default function NavbarView({ ...props }) {
    let userauthi = useSelector((state) => state.SuscritorSlice)
    let usedispatch = useDispatch()
    const modal = (e) => {
        console.log(e, props.visible)
        let visible = props.visible
        e.preventDefault();
        props.setVisible(!visible)
    }
    return (
        <>

            <nav className="navbar border-bottom border-dark shadow navbar-expand-lg  navbar-dark    py-1"
                style={{
                    backgroundColor: "#311C7C"
                }}
            >
                <div className="container-fluid col-lg-8 py-0   ">
                    <a className="navbar-brand py-1  " aria-label="TICKETS" href="#">
                        <img src={props.icon} className="img-fluid p-0" alt="" style={{
                            height: 70
                        }} />
                    </a>
                    <div className=" d-flex flex-column justify-content-end align-items-end text-end">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="staticBackdrop">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {/*  <button className="navbar-toggler text-center " data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            onClick={modal}
                            aria-label="Toggle navigation" type="button">
                            <span className="navbar-toggler-icon"></span>
                            
                        </button>*/}
                        <p className=" text-white d-block d-sm-block d-md-none">Menú</p>
                        {/*<div className="d-none  d-flex flex-column justify-content-end align-items-end text-end"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            onClick={modal}
                            aria-label="Toggle navigation"
                        >

                            
                            <p className=" text-white d-block d-sm-block d-md-none">Menú</p>

                    </div>*/}
                    </div>


                    <div className=" collapse navbar-collapse d-none   " id="navbarSupportedContent"
                    >
                        <ul className=" navbar-nav  mb-2 mb-lg-0 navbar-nav  ml-md-auto  align-items-lg-center">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#" onClick={() => props.SetSeleccion("")}>Inicio</a>
                            </li>
                            {userauthi.login ?
                                <li className="nav-item active" aria-current="page" onClick={() => props.SetSeleccion("Tickets")} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <a className="nav-link " href="#">Tickets</a>
                                </li> : ""
                            }
                            <li className="nav-item active  py-0 mx-lg-1" aria-current="page" onClick={() => props.SetSeleccion("")} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <a className=" nav-link" href="#nuevoseventos"
                                    style={{ height: 70 }}>Eventos</a>
                            </li>
                            {userauthi.login ?
                                <li className="nav-item active " aria-current="page" onClick={() => props.SetSeleccion("Datos")} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <a className="nav-link " >Datos</a>
                                </li> : ""
                            }

                            {!userauthi.login ? <li className="  nav-item">
                                <a className=" btn btn-outline-nuevo  rounded-7 " href="#" onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: null }))}> Mi Cuenta <i>
                                    <img src={props.avatar} className=" img-fluid"
                                        style={{
                                            height: 25
                                        }} />
                                </i> </a>
                            </li> : <li className="  nav-item">
                                <a className=" btn btn-outline-nuevo rounded-7  " href="#" onClick={props.salir}> Salir <i className="fa fa-window-close"></i> </a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-top" data-bs-backdrop="static" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel" style={{
                backgroundColor: "#311C7C"
            }}>
                <div className="offcanvas-header">
                    <a className="navbar-brand py-1  " aria-label="TICKETS" href="#">
                        <img src={props.icon} className="img-fluid p-0" alt="" style={{
                            height: 50
                        }} />
                    </a>
                    <button type="button" className="btn-close text-white" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                </div>
                <div className="offcanvas-body small">
                    <div className="  navbar-collapse    " id="navbarSupportedContent"
                    >
                        <ul className=" navbar-nav  mb-2 mb-lg-0 navbar-nav  ml-md-auto  align-items-lg-center">
                            <li className="nav-item active" data-bs-dismiss="offcanvas">
                                <a className="nav-link active" aria-current="page" href="#" onClick={() => props.SetSeleccion("")}>Inicio</a>
                            </li>
                            {userauthi.login ?
                                <li className="nav-item active" aria-current="page" onClick={() => props.SetSeleccion("Tickets")} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <a className="nav-link " data-bs-dismiss="offcanvas"  href="#">Tickets</a>
                                </li> : ""
                            }
                            
                            <li className="nav-item active" data-bs-dismiss="offcanvas">
                                <a className="nav-link active" aria-current="page" href="#nuevoseventos" onClick={() => props.SetSeleccion("")}>Eventos</a>
                            </li>
                            {userauthi.login ?
                                <li className="nav-item active " aria-current="page" data-bs-dismiss="offcanvas" onClick={() => props.SetSeleccion("Datos")} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <a className="nav-link " data-bs-dismiss="offcanvas" >Datos</a>
                                </li> : ""
                            }

                            {!userauthi.login ? <li className="  nav-item" data-bs-dismiss="offcanvas">
                                <a className=" btn btn-outline-nuevo  rounded-7 " href="#" onClick={() => usedispatch(setModal({ nombre: 'loginpage', estado: null }))}> Mi Cuenta <i>
                                    <img src={props.avatar} className=" img-fluid"
                                        style={{
                                            height: 25
                                        }} />
                                </i> </a>
                            </li> : <li className="  nav-item" data-bs-dismiss="offcanvas">
                                <a className=" btn btn-outline-nuevo rounded-7  " href="#" onClick={props.salir}> Salir <i className="fa fa-window-close"></i> </a>
                            </li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}