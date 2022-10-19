import React, { useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit,Delete,Visibility } from '@mui/icons-material';
import { columnsTicket } from "utils/ColumnTabla";



function Example() {
  const [data, setData] = React.useState([]);
  const [tiketslist,setTikes]=useState([])
  return (
    <>
    
    <div className="card card-primary card-outline text-left " style={{minHeight:'250px'}} >
                            <div className="card-header pb-2">
                                Tikets 
                            </div>
                            <MaterialReactTable
                                    columns={columnsTicket}
                                    data={[]}
                                  
                                    muiTableProps={{
                                      sx:{
                                        tableLayout:'fixed'
                                      }
                                    }}
                                            
                                    enableRowActions
                                    renderRowActions={({ row }) => (
                                        <Box sx={{ display: 'flex' }}>
                                          <IconButton 
                                          color="error"  
                                            >
                                            <Delete/>
                                          </IconButton>
                                         
                                          
                                        </Box>
                                      )}
                                    positionToolbarAlertBanner="bottom"
                                  
                                    localization={MRT_Localization_ES }
                                />   
                            {/*<div className="card-body table-responsive">

                                <table className="table table-hover text-center ">
                                    <thead>
                                        <tr>
                                        <th scope="col">Concierto</th>
                                            <th scope="col">Cantidad</th>
                                            
                                            <th scope="col">Localidad</th>
                                            <th scope="col">Valor</th>
                                            <th scope="col">Estado</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        tiketslist.length>0?
                                        tiketslist.map((e,i)=>{
                                            return(
                                              <tr>
                                              <th scope="row">{e.concierto}</th>
                                              <td>{e.cantidad}</td>
                                              <td>{e.valor}</td>
                                             
                                              <td> {e.localidad} </td>
                                              <td><span className="badge me-1 bg-success text-white">{e.estado}</span></td>
                                              <th>
                                              <a className="btn btn-primary btn-sm mx-1" data-toggle="tooltip" title="Ver tickets"><i className="fa fa-eye"></i></a>
                                              <a className="btn btn-primary btn-sm mx-1"  data-toggle="tooltip" title="Enviar"><i className="fa fa-paper-plane"></i></a> 
                                       
                                              </th>
                                          </tr>
                                            )
                                        }): 
                                        <tr>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <td >No hay datos</td>
                                        <th scope="row"></th>
                                        <th scope="row"></th> 
                                        <th scope="row"></th>
                                      </tr>
                                      }
                                       
                                       
                                    </tbody>
                                </table>
                            </div>*/}
                        </div>
    </>
  );
}

export default Example;