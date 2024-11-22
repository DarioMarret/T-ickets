import React from "react";
import { Stylesilla } from "./style";
const MesadoceView = ({ text, list, obtenerid, alert, succesSilla, Estado, MesaEstado, enviarsillas }) => {

    return (
        <div style={{ padding: '0.7px' }}>
            {alert}
            <div className="d-flex ">
                <div className=" " style={{ margin: '0.1px', height: '5px', width: '15px', borderRadius: '5px' }}>
                </div>

                <a id={obtenerid(text + "-s-1")}
                    data-toggle="tooltip" data-placement="top"
                    onClick={() => succesSilla(text + "-s-1")}
                    className={text + "-s-1 sillas   " + Estado(text + "-s-1") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                    <span className="" style={{
                        fontSize: '0.6rem',
                    }}>1</span>
                </a>

                <a id={obtenerid(text + "-s-2")}
                    data-toggle="tooltip" data-placement="top"
                    onClick={() => succesSilla(text + "-s-2")}
                    className={text + "-s-2 sillas  " + Estado(text + "-s-2") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                    <span className="" style={{
                        fontSize: '0.6rem',
                    }}>2</span>
                </a>
                <a id={obtenerid(text + "-s-3")}
                    data-toggle="tooltip" data-placement="top"
                    onClick={() => succesSilla(text + "-s-3")}
                    className={text + "-s-3 sillas  " + Estado(text + "-s-3") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                    <span className="" style={{
                        fontSize: '0.6rem',
                    }}>3</span>
                </a>
            </div>
            <div className=" d-flex  align-items-center">
                <div className="d-flex flex-column">
                    <a id={obtenerid(text + "-s-4")}
                        onClick={() => succesSilla(text + "-s-4")}
                        className={text + "-s-4 sillas  " + Estado(text + "-s-4") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                        <span className="" style={{
                            fontSize: '0.6rem',
                        }}>4</span>
                    </a>
                    <a id={obtenerid(text + "-s-5")}
                        data-toggle="tooltip" data-placement="top"
                        onClick={() => succesSilla(text + "-s-5")}
                        className={text + "-s-5 sillas  " + Estado(text + "-s-5") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                        <span className="" style={{
                            fontSize: '0.6rem',
                        }}>5</span>
                    </a>
                </div>
                <div id={text} className={text + " " + list.length + " Mesa  txt-white d-flex p-1 " + MesaEstado(text)}
                    onClick={() => enviarsillas(text)}
                    style={Stylesilla.mesas}>
                    {text}
                </div>
                <div className="d-flex flex-column">
                    <a id={obtenerid(text + "-s-6")}
                        data-toggle="tooltip" data-placement="top"
                        onClick={() => succesSilla(text + "-s-6")}
                        className={text + "-s-6 sillas  " + Estado(text + "-s-6") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                        <span className="" style={{
                            fontSize: '0.6rem',
                        }}>6</span>
                    </a>
                    <a id={obtenerid(text + "-s-7")}
                        data-toggle="tooltip" data-placement="top"
                        onClick={() => succesSilla(text + "-s-7")}
                        className={text + "-s-7 sillas  " + Estado(text + "-s-7") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                        <span className="" style={{
                            fontSize: '0.6rem',
                        }}>7</span>
                    </a>
                </div>
            </div>

            <div className="d-flex ">
                <div className=" " style={{ margin: '0.1px', height: '5px', width: '15px', borderRadius: '5px' }}>
                </div>
                <a id={obtenerid(text + "-s-8")}
                    data-toggle="tooltip" data-placement="top"
                    onClick={() => succesSilla(text + "-s-8")}
                    className={text + "-s-8 sillas  " + Estado(text + "-s-8") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                    <span className="" style={{
                        fontSize: '0.6rem',
                    }}>8</span>
                </a>
                <a id={obtenerid(text + "-s-9")}
                    onClick={() => succesSilla(text + "-s-9")}
                    className={text + "-s-9 sillas  " + Estado(text + "-s-9") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                    <span className="" style={{
                        fontSize: '0.6rem',
                    }}>9</span>
                </a>
                <a id={obtenerid(text + "-s-10")}
                    onClick={() => succesSilla(text + "-s-10")}
                    className={text + "-s-10 sillas  " + Estado(text + "-s-10") + " d-flex justify-content-center text-white  align-items-center"} style={Stylesilla.asientos}>
                    <span className="" style={{
                        fontSize: '0.5rem',
                    }}>10</span>
                </a>
            </div>
        </div >


    )

}

export default MesadoceView;