import React, { useEffect, useState } from "react";
export default function TablasViwe({...props}){
    const [spiner,setSpiner]=useState("d-none")
    const [spinerdos, setSpinerdos] = useState("d-none")
    useEffect(()=>{
        setSpinerdos("")
        setSpiner("d-none")
        setTimeout(function(){           
            if (!$.fn.DataTable.isDataTable("#doc")) {
                $(document).ready(function () {
                    $("#doc").dataTable({
                        stateSave: true,
                        responsive: true,
                        "pageLength": 15,
                        "bDestroy": true,
                        "sSearch": false,
                        "language": {
                            "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json", "info": "Mostrando page _PAGE_ de _PAGES_",
                            "sSearch": "",
                            "searchPlaceholder": "",
                            'paginate': {
                                'previous': '<span class="prev-icon"><i class="fa fa-arrow-left"> </i> </span>',
                                'next': '<span class="next-icon"> <i class="fa fa-arrow-right"> </i></span>'
                            }
                        },
                        "oLanguage": {
                            "sSearch": ""
                        },
                        select: {
                            style: "single",
                        },
                         columnDefs: [
                             {

                                 "responsivePriority": 1,
                                 className: "",
                                 targets: 5,
                                 visible: true,
                                 "responsive": false
                             },
                             {

                                 "responsivePriority": 1,
                                 className: "",
                                 targets: 1,
                                 visible: true,
                                 "responsive": false
                             }
                           ],
                        dom: "Bfrtip",
                        buttons: [
                           

                        ],
                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                   
                        order: [[1, 'desc']],

                    });
                })
            }
            setSpiner("")
            setSpinerdos("d-none")
        },1000)
    },[])
    return(
        <>
            <div className={spiner +" table-responsive"}>
                
                   
                            <table id={"doc"} className="table table-striped table-bordered dt-responsive nowrap dataTable no-footer dtr-inline collapsed"
                                style={{
                                    width: "100%",
                                }}>
                                <props.thead/>

                                <tbody>
                                    {props.showDatos()}
                                </tbody>
                            </table>
              </div>

                  

             

            <div className={spinerdos}
                    style={{

                        
                        height: "200px",
                        left: '0',
                        bottom: '0',
                        width: '100%',
                        
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: '3'
                    }}
                >
                    <div className="spinner-border" >
                        <span className="sr-only"></span>
                    </div>
                </div>
            
        </>
    )
}