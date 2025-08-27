import { useSearchParams } from "react-router-dom";
import NavbarView from "../../views/Pages/Flasdeticket/Navbarindex/index.js";
import { carrusel } from "../../views/Pages/Flasdeticket/imagenstatctic.js";
import { useEffect, useState } from "react";
let { icon, } = carrusel
export default function Compras() {
    const [searchParams] = useSearchParams();

    const entries = [...searchParams.entries()]; // Convierte a array de pares clave-valor

    const [seleccion, SetSeleccion] = useState("");

    const [visible, setVisible] = useState(false)
    const salir = () => {
        sessionStorage.removeItem(DatosUsuariocliente)
        sessionStorage.removeItem(DatosUsuarioLocalStorang)
        usedispatch(deletesuscrito({ ...userauthi }))
        SetSeleccion("")
    }
    useEffect(() => {
        const superpuesto = document.getElementById('superpuesto');
        superpuesto.classList.add("d-none")
    }, [])
    return (
        <div className="vh-100">
            <NavbarView
                icon={icon}
                setVisible={setVisible}
                visible={visible}
                SetSeleccion={SetSeleccion}
                salir={salir}
            />
            {seleccion === "Compras" ?
                <div>
                    <h1>Compras</h1>
                </div>
                :
                <div className=" d-flex justify-content-center align-items-center mx-auto vh-100">
                  
                </div>
            }
        </div>
    );
}
