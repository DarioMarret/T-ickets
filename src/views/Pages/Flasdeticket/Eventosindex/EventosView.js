import React from 'react';

const EventoView = React.memo(({ e, abrir, Dias }) => {
    return (
        <div className="col-12 mx-auto my-3" id={"evento" + e.id} key={e.id}>
            <a id={"headingThree" + e.id} className="collapsed eventos eventoss"
                data-toggle="collapse"
                data-target={"#collapseid" + e.id}
                aria-controls={"#collapseid" + e.id} aria-expanded="false"
            >
                {/* CONTENIDO DEL EVENTO */}
                <div className="container rounded-7 d-flex justify-content-center px-0">
                    <i className="text-info btn-hover" style={{
                        position: "absolute",
                        margin: "auto",
                        bottom: -2,
                        width: 40,
                    }}>
                        <svg className="seudtres" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1"
                            style={{ filter: "drop-shadow(1px 1px 3px #888)" }}
                            viewBox="0 0 21000 15700">
                            {/* SVG CONTENT */}
                        </svg>
                    </i>
                    <button className="d-none btn btn-outline-info rounded-7 btn-hover"
                        style={{
                            position: "absolute",
                            margin: "auto",
                            right: 25,
                            bottom: 25,
                            zIndex: 2
                        }}
                    >
                        <i className="bi bi-cart-fill"></i>
                        COMPRAR
                    </button>
                    <img loading="lazy" src={e.imagenConcierto} className="img-fluid rounded-7 shadow-md btn-hover img-evento" alt="" />
                </div>
            </a>

            <div className="collapse float-end container mt-4 px-0"
                aria-labelledby={"headingThree" + e.id} id={"collapseid" + e.id} data-parent="#accordion">
                <div className="card row d-flex flex-row card-body rounded-7 py-5">
                    <div className="container col-12 col-md-6">
                        {/* INFORMACIÓN DETALLADA DEL EVENTO */}
                        <h1><span id="artista">{e.nombreConcierto}</span></h1>
                        <h4><span id="tour">{e.descripcionConcierto}</span></h4>
                        <p><b>Fecha:</b> {Dias[new Date(e.fechaConcierto).getDay()]} {e.fechaConcierto}</p>
                        <p><b>Hora:</b> {e.horaConcierto}</p>
                        <p><b>Lugar:</b> {e.lugarConcierto}</p>
                        <button className="btn btn-primary" onClick={() => abrir(e)}>Comprar Entrada</button>
                    </div>
                    <div className="container col-12 col-md-6 rounded-7 px-0">
                        <img loading="lazy" src={e.codigoEvento === "9EGM42" ? "https://api.t-ickets.com/store/img/whatsapp%20image%202023-01-30%20at%2019.51.02.jpeg" : e.mapaConcierto} className="img-fluid rounded-7 shadow-md" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default EventoView;
