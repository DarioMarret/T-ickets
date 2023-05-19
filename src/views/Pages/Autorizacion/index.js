import { useEffect, useState } from "react";
import { listarpreciolocalidad } from "utils/Querypanel";
import { EventosActivos } from "utils/Querypanel";
import ModalPromotor from "./ModalPromotor";
import Table from "components/ReactTable/ReactTable";
import ReactTables from "views/Tables/ReactTables";
import { listar_promotores } from "utils/PromotorQuerys";
import { useHistory } from "react-router";
import { removeDatosUsuario } from "utils/DatosUsuarioLocalStorag";
import "jquery/dist/jquery.slim"
import JSZip from "jszip";
import "datatables.net/js/jquery.dataTables"
import "datatables.net-bs5/js/dataTables.bootstrap5"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-buttons/js/buttons.html5.min.mjs"
import "datatables.net-responsive-bs5/js/responsive.bootstrap5.min.mjs"
import "datatables.net-responsive-bs5"
import $ from "jquery"
import { useDispatch } from "react-redux";
import { setToastes } from "StoreRedux/Slice/ToastSlice";

export default function AutorizacionView() {
    let history = useHistory()
    let usedispatch= useDispatch()
    const [Eventos, setEventos] = useState([])
    const [Promotor, setPromotor] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        listar_promotores().then(ouput => {
            console.log(ouput)
            if (ouput.success) {
                setPromotor(ouput.message)
                setTimeout(function () {
                    var table = $("#example").dataTable({
                        pageLength: 10,
                        stateSave: true,
                        responsive: true,
                        "searching": true,
                        "bDestroy": true,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
                            "info": "Mostrando page _PAGE_ de _PAGES_",
                            "search": "",
                            'paginate': {
                                'previous': '<span class="prev-icon"><i class="bi bi-arrow-left-square"> </i> </span>',
                                'next': '<span class="next-icon"> <i class="bi bi-arrow-right-square"> </i></span>'
                            }
                        },

                        select: {
                            style: "single",
                        },
                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {
                                className: 'dtr-control',
                                orderable: false,
                                targets: 0,

                            }],
                        order: [1, 'asc'],

                    })
                }, 1000)

            }
            if (!ouput.success && ouput.error != "jwt expired") {
                usedispatch(setToastes({ show: true, message: ouput.message, color: 'bg-danger', estado: 'Error' }))
            }
            if (!ouput.success && ouput.error == "jwt expired") {
                usedispatch(setToastes({ show: true, message: "sessión caducada", color: 'bg-danger', estado: 'Error' }))
                removeDatosUsuario()
                history.push("/")
            }
        }).catch(err => {
            console.log(err)
        })


    }, [])
    return (
        <>
            <ModalPromotor
                show={show}
                setShow={setShow}
            />
            <div className=" container-fluid">
                <div className="mb-2">
                    <button className="btn  btn-success" onClick={() => setShow(true)}> <i className=" fa fa-plus"></i> Agregar Promotor</button>
                </div>
                <div className=" container-fluid">
                    <table className="table table-bordered" id="example">
                        <thead>
                            <tr>
                                <th> </th>
                                <th>Acciones </th>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Promotor.length > 0 ?
                                Promotor.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>
                                               
                                            </th>
                                            <th>
                                                <button className=" btn btn-sm btn-success">
                                                    Editar
                                                </button>
                                            </th>
                                            <th scope="row">{e.id}</th>
                                            <td>{e.promotor}</td>
                                            <td>{e.responsable}</td>
                                            <td>{e.ruc}</td>
                                            <td>{e.telefono} </td>
                                            <td>{e.web}</td>
                                        </tr>
                                    )
                                })
                                : <tr>

                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                    <td ></td>
                                </tr>}


                        </tbody>
                    </table>

                </div>

            </div>
        </>
    )
}