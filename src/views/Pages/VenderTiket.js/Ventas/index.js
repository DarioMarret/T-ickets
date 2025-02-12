import { useState } from "react"

function ventasView() {
    let [datos, setDausuario]= useState({
        nombreCompleto: '',
        ciudad: '',
        email: '',
        movil: '',
        resgistro: '',
        password: ''
    })
    function handelChange(e) {
        console.log(e)
    }
    function buscarsuscritor(){

    }
    return (
        <>
            <div className=" container-fluid">
                <div className="">
                    <form id="register" className=" needs-validation  " onSubmit={(e) => e.preventDefault()}  >
                        <div className="row">
                            <div className="col-12 mb-3">
                                <div className=" d-flex  justify-content-end">

                                    <button className="btn btn-danger mx-3" onClick={buscarsuscritor}> <i className=" fa fa-search"></i> Buscar cliente </button>
                                    {
                                        !datos.resgistro ? <button className="d-none btn btn-success "  ><i className="fa fa-search "></i> Buscar cédula </button> : ''
                                    }
                                    {!datos.resgistro ? <button className="btn btn-success ml-3"  ><i className=" fa fa-plus-circle"></i> CREAR </button> :
                                        <button className="btn btn-primary"  > <i className=" fa fa-check-circle"></i> </button>}
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className=" input-group mb-3" >
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-address-card"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 py-sm-2">
                                <input id="cedula" type="text"
                                    className="form-control numero"
                                    name="cedula"
                                    minLength={10}
                                    onChange={() => setDausuario({
                                        nombreCompleto: '',
                                        ciudad: '',
                                        email: '',
                                        movil: '',
                                        resgistro: '',
                                        password: ''
                                    })}
                                    placeholder={("code" == "cedula") ? "Ingrese cédula" : "Ingrese su número de identificación"} required />
                            </div>


                            <div className="col-lg-12">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                                    </div>
                                    <input type="text"
                                        className="form-control"
                                        id="nombreCompleto"
                                        value={""}
                                        name="nombreCompleto"
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Ingrese su nombres completos" required />
                                    <div className="invalid-feedback">
                                        Ingrese sus nombres

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6  ">
                                <div className="input-group mb-3  px-0 d-flex justify-content-center ">
                                    <input
                                        name="movil" type="tel"
                                        className="m-0 form-control form-control-sm" id="movil"
                                        size={100}

                                        required

                                        placeholder="999 999 999" />
                                    <div className="invalid-feedback">
                                        Ingrese un numero de Whatsapp
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-lg-6">
                                <div className="input-group mb-3" >
                                    <div className=" input-group-prepend">
                                        <span className=" input-group-text"> <i className="fa fa-map-marker"></i> </span>
                                    </div>
                                    <input type="text"
                                        className="form-control form-control-sm"
                                        id="ciudad"
                                        name="ciudad"
                                        maxLength={255}
                                        required
                                        value={datos.ciudad}
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Ingrese su dirección"
                                    />
                                    <div className="invalid-feedback">
                                        Ingrese una direccion

                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                    </div>

                                    <input id="email" type="email" className="form-control" name="email"
                                        value={datos.email}
                                        onChange={(e) => handelChange(e.target)}
                                        placeholder="Email" />
                                    <div className="invalid-feedback">
                                        Correo incompleto

                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-6" >
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>

                                    <input type="password"

                                        id="password"
                                        name='password'

                                        minLength={7}
                                        placeholder="contraseña"
                                        className="form-control"
                                        value={datos.password}
                                        onChange={(e) => handelChange(e.target)}
                                    />
                                    <div className="invalid-feedback">
                                        La contraseña debe ser mayor de 7 caracteres
                                    </div>

                                </div>
                            </div>

                        </div>




                    </form>
                </div>

            </div>
        </>
    )
}
export default ventasView