import React from "react";
import "jquery/dist/jquery.slim"
import JSZip from "jszip";
import "datatables.net/js/jquery.dataTables"
import "datatables.net-bs5/js/dataTables.bootstrap5"
import "datatables.net-buttons/js/dataTables.buttons"
import "datatables.net-buttons/js/buttons.html5.min.mjs"
import "datatables.net-responsive-bs5/js/responsive.bootstrap5.min.mjs"
import "datatables.net-responsive-bs5"
import $ from "jquery"
window.JSZip= JSZip;

class DataTableBos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            estdo: ""
        };
    }
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users").then(response => response.json())
            .then(response => {
                this.setState({ data: response })

                if ($.fn.dataTable.isDataTable('#doc')) {
                    $('#table').DataTable().clear();
                    $('#table').DataTable().destroy();
                    $('#table').empty();
                    $('#table').css("width", "100%")
                }
                if (!$.fn.DataTable.isDataTable("#doc")) {
                    $(document).ready(function () {
                        var table = $("#doc").dataTable({
                            pageLength: 10,
                            stateSave: true,
                            responsive: true,
                            "searching": true,
                            "bDestroy": true,
                            "language": {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
                                "info": "Mostrando page _PAGE_ de _PAGES_",
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

                        });
                    })

                }
                this.setState({ estdo: "d-none" })

            }
            ).catch(err => console.log(err))

    }
    showDatos = () => {

        try {
            return this.state.data.map((item, index) => {
                return (
                    <tr key={index}>
                    
                        <td className="text-xs font-weight-bold">{item.name}</td>
                        <td className="text-xs font-weight-bold">{item.phone}</td>
                        <td className="text-xs font-weight-bold">{item.username}</td>
                        <td className="text-xs font-weight-bold">{item.website}</td>

                    </tr>
                )
            });
        } catch (error) { }
    }
    render() {
        return (
            <>
                <div className=" container w-100 h-100  " style={{
                    display: "fixed",
                    height: "100%",
                    width: "100%",
                    zIndex: 1000,
                    background: "black"

                }}>

                </div>
                <div className="container ">
                 
                    <div className="bg-white border">
                       
                        <div className="p-2">
                            <div className={"  p-0 pb-2"}

                            >
                                <table id="doc" className="table table-striped table-bordered nowrap"
                                    style={{
                                        width: "100%",

                                    }}
                                >
                                    <thead className="border pt-2">
                                        <tr className="border pt-2">
                                            <th >Nombre</th>
                                            <th >Celular</th>
                                            <th >user</th>
                                            <th >wbesite</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.showDatos()}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>

                    <div className={this.state.estdo}
                        style={{
                            display: 'none',
                            position: 'fixed',
                            height: "100%",
                            left: '0',
                            bottom: '0',
                            width: '100%',
                            backgroundColor: '#fff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: '3'
                        }}
                    ></div>

                </div>

            </>)
    }

}
export default DataTableBos