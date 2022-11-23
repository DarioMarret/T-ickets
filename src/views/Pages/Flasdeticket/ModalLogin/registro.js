import { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"

const ResgistroView = () => {
    return (
        <>
            <Modal>
                <Modal.Header>

                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-conten-cneter ">
                        <form onSubmit={(e) => handleSubmit(e)}  >
                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                </div>
                                <input id="email" type="text" className="form-control"
                                    name="email"
                                    placeholder="Usuario" />
                            </div>
                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-lock"></i></span>
                                </div>
                                <input id="password" type="password" className="form-control"
                                    name="password"

                                    placeholder="Contraseña" />
                            </div>
                            <div className="row text-center">
                                <div className="col-12">
                                    <button className="btn btn-primary px-4" type="submit">ENTAR</button>
                                </div>
                                <div className="col-12">
                                    <a className="btn btn-link  nav-link px-4" href="#">I forgot my password</a>
                                </div>
                            </div>
                        </form>
                    </div>

                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )


}

export default ResgistroView