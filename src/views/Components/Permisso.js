import React from "react";

const Evento =()=>{
    return(
        <div className="container-fluid">
                
<div className="row">
    <div className="col-md-8">
        <div className="card text-left">
            <div className="card-header">
                Mis Datos
            </div>
            <div className="card-body">
                <form action="">
                    <div className="row">
                    <div className="col-md-12">        
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-address-card"></i></span>
                                </div>
             
                                <input id="name" type="text" disabled="" className="form-control" name="name" value="" placeholder="cédula" required />
             
                                
                            </div>
                        </div>
                        <div className="col-md-12">        
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-user"></i></span>
                                </div>
             
                                <input id="name" type="text" className="form-control" name="name" value="Reba Koss" placeholder="Full name" required />
             
                                                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-birthday-cake"></i></span>
                                </div>
             
                                <input id="fecha_nacimiento" type="date" className="form-control" name="fecha_nacimiento" value="" required/>
             
                                                            </div>
                        </div>
                        
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-sort-numeric-up-alt"></i></span>
                                </div>
             
                                <input id="edad" type="number" className="form-control" name="edad" value="" placeholder="Edad" required/>
             
                                                            </div>
                        </div>
                    </div>
             
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                </div>
             
                                <input id="email" type="email" className="form-control" name="email" value="mcclure.karen@example.com" placeholder="Email"/>
             
                                                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fab fa-whatsapp"></i></span>
                                </div>
             
                                <input id="phone" type="telefono" className="form-control" name="telefono" value="" placeholder="Ingrese su numero de whatsapp"/>
             
                                                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                                </div>
             
                                <input id="direccion" type="text" className="form-control" name="direccion" value="" placeholder="Dirección de domicilio"/>
             
                                                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-primary close-modal">Actualizar</button>
            </div>
        </div>
    </div>

    <div className="col-md-4">
        <div className="card text-left">
            <div className="card-header">
                Contraseña
            </div>
            <div className="card-body">
                <form action="">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                </div>
             
                                <input id="password" type="password" className="form-control" placeholder="Contraseña actual" name="password"/>
             
                                                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                </div>
             
                                <input id="password" type="password" className="form-control" placeholder="Contraseña nueva" name="password"/>
             
                                                            </div>
                        </div>
             
                        <div className="col-md-12">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-redo"></i></span>
                                </div>
             
                                <input id="password-confirm" type="password" className="form-control" name="password_confirmation" placeholder="Repita contraseña nueva" required/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="card-footer">
                <button type="submit" className="btn btn-primary close-modal">Actualizar</button>
            </div>
        </div>
    </div>

</div>

            </div>
    )

}
export default Evento;