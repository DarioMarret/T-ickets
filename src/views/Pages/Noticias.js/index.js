import { useState } from "react"
import { Container, Row } from "react-bootstrap"
import Wizard from "views/Forms/Wizard/Wizard"
export default function NoticiasView() {
    const [Tipo, setTipo] = useState("Evento")
    const handelchange = (e) => {
        setTipo(e.value)

    }
    return (
        <>
            <Container>
                <Row>
                    <div className="">
                        <div className="card">
                            <form className="container" >
                                <div className="row">
                                    <form className="row ">
                                        <div className="col-md-12">
                                            <div className="col-6 px-0">
                                                <label className="form-label">Tipo de noticia </label>
                                                <select className="form-select" value={Tipo} onChange={(e) => handelchange(e.target)} required>
                                                    <option selected disabled value="">Seleccione el tipo </option>
                                                    <option value="Evento">Evento </option>
                                                    <option value={"informativo"}>Informativo</option>
                                                </select>
                                            </div>
                                        </div>
                                        {Tipo != "Evento" ? <div className="row">
                                            <div className="col-6">
                                                <label className="form-label">Encabezado </label>

                                                <div className="input-group mb-3">

                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="fab fa-leanpub"></i></span>
                                                    </div>

                                                    <input id="cedula" type="text"
                                                        className="form-control numero"
                                                        name="cedula"
                                                        minLength={10}
                                                        maxLength={10}
                                                    />  </div>
                                            </div>
                                            <div className="col-6">
                                                <label className="form-label" >Breve descripción </label>
                                                <div className=" input-group mb-3">
                                                    <div className="   input-group-append ">
                                                        <span className=" input-group-text" > <i className="fab fa-leanpub "></i></span>
                                                    </div>
                                                    <input className=" form-control"></input>

                                                </div>
                                            </div>
                                            <div>

                                            </div>

                                        </div> :
                                            <div className="row m-1">
                                                <div className="row col-12">
                                                    <div className="col-6 px-0">
                                                        <label className="form-label">Selesione un evento </label>

                                                        <div className="input-group mb-3">

                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fa fa-search"></i></span>
                                                            </div>

                                                            <select className="form-select" required>
                                                                <option selected disabled value="">Seleccione el el evento </option>
                                                                <option >Evento </option>
                                                                <option >Informativo</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row col-12" >
                                                    <div className="col-6">
                                                        <label className="form-label">Encabezado </label>

                                                        <div className="input-group mb-3">

                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fab fa-leanpub"></i></span>
                                                            </div>

                                                            <input id="cedula" type="text"
                                                                className="form-control numero"
                                                                name="cedula"
                                                                minLength={10}
                                                                maxLength={10}
                                                            />  </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <label className="form-label" >Breve descripción </label>
                                                        <div className=" input-group mb-3">
                                                            <div className="   input-group-append ">
                                                                <span className=" input-group-text" > <i className="fab fa-leanpub "></i></span>
                                                            </div>
                                                            <input className=" form-control"></input>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div>

                                                </div>

                                            </div>
                                        }
                                        <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-primary" type="submit">Submit form</button>
                                        </div>
                                    </form>


                                </div>
                            </form>
                        </div>

                    </div>
                </Row>
                <Row>

                </Row>
            </Container>
        </>
    )

}