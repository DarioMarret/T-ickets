import moment from "moment";
import "moment"
import 'moment/locale/es';
import { useState } from "react"
import { useEffect } from "react"
import { Tab, Tabs } from "react-bootstrap"
import { PhotoProvider, PhotoView } from "react-photo-view"
import "react-photo-view/dist/react-photo-view.css"
import { useHistory, useParams } from "react-router"
import { buscarcliente } from "utils/Querypanelsigui"
import { useSelector } from "react-redux";
export default function DetalleCompraView() {
    let { id } = useParams()
    let history = useHistory()
    let nombres = useSelector((state) => state.SuscritorSlice.subscritor)
    const [usuario, setUser] = useState({
        "id": "",
        "cedula": "",
        "nombreCompleto": "",
        "email": "",
        "password": "",
        "movil": "",
        "fechaCreacion": "",
        "enable": "",
        "ciudad": "",
        "direccion": ""
    })
    let estado = {
        "reservado": "warning",
        "NO": "Generar",
        "SI": "Generado",
        "null": "Sin generar",
        "Expirado": "Expirado",
        "Pendiente":"label label-primary"
    }

    useEffect(() => {
        console.log(nombres)
        buscarcliente({
            "cedula": nombres.cedula,
            "email": ""
        }).then(ouput => {
            if (ouput.success) setUser({ ...ouput.data })
            console.log(ouput)
        }).catch(erro => {
            console.log(erro)
        })
    }, [])
    return (
        <PhotoProvider>
            <div>

                <div className="row ">
                    <h1></h1>
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Reporte de Boleto">
                            <div className="row ">
                                <div className="col-12">
                                    <div className=" px-0 py-2 w-100  bg-white ">
                                        <div className=" d-flex flex-wrap flex-wrap-reverse">
                                            <div className="  col-12 col-md-6 ">
                                                <div className="px-3 d-flex align-items-center ">
                                                    <h4 className="px-2  "
                                                        style={{
                                                            fontWeight: "bold"
                                                        }}
                                                    >{usuario.nombreCompleto}</h4>
                                                    <div>
                                                        {nombres.estado_pago === "Expirado" ?
                                                            <span className="label label-danger"> {nombres.estado_pago}</span> :
                                                            <span className={estado[nombres.estado_pago ]}>
                                                                {nombres.estado_pago}
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 d-flex  text-center justify-content-md-end  align-items-center">
                                                <div className="px-2">
                                                    <div className="btn-group" >
                                                        {
                                                            nombres.pdf == "SI" ? <a className=" btn btn-default btn-sm"><i className="bi bi-file-earmark-pdf text-danger"></i>
                                                                {estado[nombres.pdf]}
                                                            </a>:""
                                                        }
                                                        {nombres.estado_pago == "Pagado" ? <a className=" btn btn-default btn-sm"><i className="bi bi-printer"></i> Imprimir </a> : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 bg-secondary-sm">
                                    <div className="d-flex flex-wrap pt-3 datos px-0 ">
                                        <div className="col-12 col-md-4 border-bottom p-3">
                                            <div className="invoice-from">
                                                <small>De</small>
                                                <div className="m-t-5 m-b-5">
                                                    <strong className="text-inverse">COMNET - SPEED - T-ICKETS  (COMPUTECNICSNET S.A)</strong>
                                                    <small>
                                                        <br></br>
                                                        Edificio City Officce Oficina 301 <br></br>
                                                        Indentificación: 092782129001<br></br>
                                                        Teléfono: 0980850287 / 042599100<br></br>
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 border-bottom p-3" >
                                            <div className="invoice-from">
                                                <small>Para</small>
                                                <div className="m-t-5 m-b-5">
                                                    <strong className="text-inverse">{usuario.nombreCompleto}</strong><br></br>
                                                    <small>
                                                        {"Email: " + usuario.email}<br></br>
                                                        {"Cédula: " + usuario.cedula}<br></br>
                                                        {"Teléfono " + usuario.movil}<br></br>
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4 text-md-end border-bottom p-3 ">
                                            <div className="invoice-date">
                                                <small>Registro</small>
                                                <div className="m-t-5 m-b-5">
                                                    <small className="text-inverse">
                                                        Fecha de creación</small><br></br>
                                                    {nombres.fechaCreacion} <br></br>
                                                    #{id.padStart(8, 0)} <br></br>
                                                    {nombres.forma_pago }<br></br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="d-flex col-12  flex-wrap   ">
                                    <div className="col-12 col-md-6 p-3" >
                                        <div className="invoice-from">
                                            <small>Informacion de Pago</small>
                                            {nombres.forma_pago != "Tarjeta" ?<div className="m-t-5 m-b-5">
                                                <strong className="text-inverse">{nombres.banco == null ? "No hay Deposito reportado" : nombres.banco}</strong><br></br>
                                                <small>
                                                    Comprobante# {nombres.numerTransacion.padStart(10, 0)} <br></br>
                                                    <br></br>
                                                    <br></br>
                                                </small>
                                            </div>:
                                            
                                            <div className="m-t-5 m-b-5">
                                                <strong className="text-inverse">Pago con Tarjeta</strong><br></br>
                                                <small>
                                                     <br></br>
                                                    <br></br>
                                                    <br></br>
                                                </small>
                                            </div>}
                                        </div>
                                    </div>
                                    {nombres.forma_pago != "Tarjeta"?<div className="col-12  col-md-6 text-md-end p-3 text-center ">
                                        <div className="invoice-from text-center ">
                                            <small>Comprobante</small>
                                            <div className="m-t-5 m-b-5 rounded-4  ">

                                            </div>
                                            <PhotoView src={nombres.link_comprobante == null ? "data:image/png;base64,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" : link_comprobante}>
                                                <img className="img-fluid" src={nombres.link_comprobante == null ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAARVBMVEX///+wsbHu8PH39/jy9PSsra2ys7PExcXv7+/s7Oz7+/uqq6u4ubnT1NTGx8e0tbXn5+fb29u8vb3U1dXMzc3h4eGkpaXPa21KAAAHrElEQVR4nO2di5qcKBBGIYDITS5Cv/+jbhVqXyadTTZr98xo/V+mnSitcgSqgMJhjETqsvLMsp2B+PHZ9/GJ+rEx+MxS+MkiBsQARQyIAYoYEAMUMSAGKGJADFDEgBigiAExQBEDYoAiBsQARQyIAYoYEAMUMSAGKGJADFDEgBigiAExQBEDYoAiBsQARQyIAYoYEAMUMSAGKGJADFDEgBigiMEXZSDHTfYdl/uKDGQZVvH0jut9RQZj5KsUMSAG52bAnepy7rQM7Bw2yXdc740MbNB/qOkqPb/BOr6RQVX8v0vV10N4H4Nx+AsEnA+vrw7vY2D+ksH48jsjBp/LoNu/MzNQFz+FPNfi3MN+d9XRGSg/i3W/beXuQGxbl9H4YzNQtbf20vQM2nw74q9mwBZ1YAbKgwssc+ntgQ8j9pbVEwZHLgcR8pk9NocDNowxWCb0uRhEw+yk1FDbKGSaAUYRTPi1CZzbqnzg9kBlZsFtnrYHLgJHCGarKFcd2C4U7DmocHckD0rDTv5Uh2TQmFGqPhzKWDjkeRhAsa8ufugMauXh4ywMoBLICE/9UWlwhrWnfvMRGWTWunF8VFEzG89SDgbDgis/jYtMamLSn4QBBwaXD2NDNbAZLMOpGcTCwqkYJDZ/qAsWLOWp6kJvEx/zNbvEPOw3zxAckkGF5w1G4KYUi03cSZbPYhuxYwg+0jaAwiD7agQfCTzo8gzBIRmoBl6xm/plbQvFeQNWAZqJ8fnQ4hEZcPCK57XDMC5jatBdmM7VZ8LGoDpXElxZQp0w0IsEQ9GeIzgmAzSPtirHNQ6fpjoopwUT8VwMMKogFe4uKKdiuw85OAkDjrkWbSqRR68zdKCM/+Vcy1EZgF3AnFk59lfayn+bkT4sA66GmhYfwZo5/tuE23EZQFFQvtRai+fuF7k/PgNOc65/LGJwMAbPhwt/z+BIsTgsOPXf5ebfn/j/6p2xefP0p8F5tyi9j6Pwr9BXjNF8t4gBMUARA2KAIgZfiIEYxe8TvUZvZJA8uL22dt+3LoszxLTOOKUyxKFITFQ8KLDWPQNZ2utv7J0MLgYuxDFTdpjXXUtvIKuY24whe81p6FHXzDJHJ1n+FKrwAr2TgQMGxmn89TL1XdrV5chWHoDB2kdqF0x4SAZN4RzTfOnTrqP3fcZJ82vH6MbA8XxQBnVQjdkSe67nkhxmNE7XRM21sUfwZp65OSaDMpWJGTXjClYbZxahxBveI/X60t7mhoFjyFZWMhR7RAYihsRFiNLPS7kPTmwMLg7+D+XAJGCFDGypgh+PgVFNxKYnBv+YhkZhhAc9LnVB5s5gbQ+AAUtQH47HoMHPFMEIhmhH7sEKDgCicLEk+MCABeWOx2CG3DYMT4YswjMGVZVYXkxk+4mBLZeDMQAfSXso81j9k2p+sQY4DT+50lIunUFAMsgFLUc6WjmIo9XY+qGjLMrkF3+5FvjIZRi8bpgIXWVfWVtWMoRjMbCQqT6/KPqHlLfd8DmaZbv8WUmx7mb2DT2pL9Nv/EQRA2KAIgbEAEUM9mewnG61aGNrtxlTa4xZ3/m0GMfUMBRFwu71j0wzs6W/JetnwjTi7ryw7drp9RA7MxAa+3zg52PwoVbD3XssGk6hxoz5GqYehhWdtstMbEF3qafnmD5p/JIFT4kFcK5HjNbonafil3NlxXecj92ZgfXo9S0MimrjOLttfKSpbNJ0qSsD741MDTPZTPMYruc5pA+YwPRewo2BCsZUfEfOlQHPuAx0p9CEvctBueDDQQZN9SHhsL3jqPVfZtc6g3HrCAQMMBBRw7PtCStPzDg13jPog01DuGOwa2TG7gxiNAuDaVnAtw6QbAyE0p2B3JY4dgasFKt9r+xGzcDAQ4/6kQEONHwPBnDfebDIwA56ObNftisDW+JSF6pbZho6AxnrNqhouQYGqdT7ulBTK8jsVhdCnvNeb8zZncFkfUAGQq15Knq5xMKA6Wg7A1GVqgIzmcakXZLDWjCGAgyMUYbd2kRfPA/ivk0chqHs1Z3anwEU3TYDA/6UwbUcwMMPDor/7LhysUF9XxvPoZcDNg/ysT2I3t7VhWT3sowvYcBqrNza9X7HuD7ftT3gZWMAWYHMBZ4TGn+xshp57Qys1w8M2Hwx36U9mJa3eFhWVXcV2jY6vjBokJ8rAwHlP2yBZ5X39BnMCTKAxtQ9MGiX9I0Y4MJ2C3nok2VxW9/dGSReJLPY/GFRTsDnymDss3BjhPrRGbDuKlwZWO3k92CAhp5hGJ5FV6CEyq+vA22uTN71uWdoKqz3c8XB1aC27NzSm0tvOnq9UsigzLUvhiuqR6vJ7Apud5qT3rsc1F7ylzn1pH2p1wdmpmmqza6JbIaD2NS3em3er+lH3b+VwLNocCZZ8atYU8LyMj2Zlu3XZLBp6zrZh332/uh28C6Jtfb+632z/jyeaD3DTjdLfWdigCIGxABFDIgBihgQAxQxIAYoYkAMUMSAGKCIATFAEQNigCIGxABFDIgBihgQAxQxIAYoYkAMUMSAGKCIATFAEQNigCIGxABFDIgBihgQAxQxIAYoYkAMUMSAGKCIATFAEQNigCIGxABFDO4YnFnbKrwza7fV46Tvrn8A2Mt2m9dX3zgAAAAASUVORK5CYII=" : link_comprobante} alt="" />
                                            </PhotoView>
                                        </div>
                                    </div>:""}
                                </div>
                                <div className=" d-flex col-12  pb-3 border-top pt-2">
                                    <div className=" invoice-from col-12">
                                        <smal>Asunto</smal>
                                        <div className=" mt-2 mb-2  ">
                                            <textarea className=" col-12 form-control">

                                            </textarea>
                                        </div>
                                        {
                                            nombres.forma_pago != "Tarjeta" ?<div className=" text-center">
                                            <button className="btn  btn-danger col-6">
                                                REPORTAR
                                            </button>
                                        </div>:""}




                                    </div>
                                </div>
                                <div className="mt-2 pt-2  border-top text-center ">
                                    <span > CONTACTANOS </span>
                                    <div className="d-flex justify-content-center align-items-center pb-2">
                                        <a className=' nav-link  px-0 mx-1  nav-icons  text-black' >
                                            <i className="bi bi-phone"></i>
                                            <span className=" " style={{ fontFamily: '', }} > T:0980850287 / 042599100 </span>
                                        </a><div> </div>
                                        <a className=' nav-link  px-0  mx-1 nav-icons  text-black' >
                                            <i className="bi bi-envelope"></i>
                                            <span className=" " style={{ fontFamily: '', }} > facturacion@comnet.ec </span>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </Tab>
                    </Tabs>

                </div>
                <div className=" fixed-bottom  d-flex justify-content-end align-items-end p-3">
                    <a className=" rounded-circle btn-primary p-2 text-white"
                        onClick={() => history.push("/admin/Aprobar-Ventas")}
                    >
                        <i className=" fa fa-arrow-left"></i>
                    </a>

                </div>
            </div>
        </PhotoProvider>
    )
}