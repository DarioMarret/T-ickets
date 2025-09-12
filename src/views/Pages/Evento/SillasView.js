import { useState } from "react";


export const SillasView = ({ mapa, succesLimit }) => {
    const [alet, setAlert] = useState(null)
    function MoveTooltip(e, silla) {
        if (silla.estado == "Disponible" || silla.estado == 'none') return
        const rect = e.target.getBoundingClientRect();

        // ajusta la posición relativa al elemento
        const top = rect.top + window.scrollY; // 10px arriba
        const left = rect.left + window.scrollX + rect.width; // a la derecha

        setAlert(
            <div
                id="tooltip"
                style={{
                    position: "absolute",
                    top: `${top}px`,
                    left: `${left}px`,
                    width: "135px",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    padding: "8px",
                }}
            >
                <div className="text-center border-bottom pb-1 mb-1">
                    <strong id="nomLocalidad">Stand {silla.silla} </strong>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="mt-1" id="prelocalidad">
                        {silla.id_registraCompra}

                    </p>
                    <p className="m-1">
                        user:  {silla.cedula}
                    </p>
                </div>
            </div>
        );
    }



    return (<>
        {mapa.asientos.map((silla, index) => {
            let numero = String(silla.silla).split("-")[2];
                
            return (
                <div key={"silla" + index}
                    onMouseEnter={(e) => MoveTooltip(e, silla)}
                    onMouseLeave={() => setAlert(null)}
                    onClick={() => silla.estado !== "none" && succesLimit(silla.idsilla, String(silla.silla), silla.cedula, silla.estado, silla.id_registraCompra)}
                    className={`d-flex  ${silla.estado == "RESERVADO" ?"bg-warning":silla.estado == "none" ? "bg-none" : silla.estado == "Ocupado" ? "bg-danger" : "bg-success"}   rounded-5 text-center  justify-content-center align-items-center `}
                    style={{ height: '30px', width: '30px', marginLeft: '1px' }} >
                    {silla.estado !== "none" && (<div className={'px-3 ' + silla.silla + 'd-flex   text-white justify-content-center  '} >
                        <div className="d-flex justify-content-center">
                            <span style={{ fontSize: '0.7em' }}>    {numero} </span>
                        </div>
                    </div>)}
                </div>
            );
        })}
        {alet}
    </>)
}