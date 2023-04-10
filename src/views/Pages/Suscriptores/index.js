import React, { useEffect, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Pagination, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { Card, Col, Row } from "react-bootstrap";
import { GetSuscritores, EliminarSuscrito } from "utils/SuscritorQuery";
import ModalSuscritoView from "./ModalSuscritor";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Columnasubcrito } from "utils/ColumnTabla";
import ResgistroView from "../Flasdeticket/ModalLogin/registro";
import { useDispatch } from "react-redux";
import { setModal } from "StoreRedux/Slice/SuscritorSlice";
import ModalTickte from "./ModalSuscritor/agregarTickte";

const SuscritorViews = () => {
  let usehistory = useHistory()
  let usedispatch = useDispatch()
  const [show, setshow] = useState(false)
  const [suscritores, setsuscritor] = useState([])
  const [paginasu, setpagina] = useState({
    "init": 0,
    "size": 500,
    "total": 0,
    page: 0
  })
  const [suscritor, setSuscri] = useState({})

  const [estado, setEstado] = useState("")
  const [cantidad, setCantidad] = useState(0)
  const [alert, setAlert] = React.useState(null)
  const newsuscrito = () => {
    setEstado("")
    setshow(true)
  }
  const selelccionasuscrito = (e) => {
    setEstado("update")
    setSuscri(e)
    setshow(true)
  }
  const nuevoevento = async () => {
    try {
      const data = await GetSuscritores(paginasu.init,paginasu.size)
      if (data.users.length > 0) {
        //  console.log(data.users)
        setsuscritor(data.users)
        setCantidad(data.total)
        setpagina({
          ...paginasu,
          "init": data.init,
          "size": data.size,
          "total": data.total,
        })
        // console.log(data.users.filter(f => f.id == "6670"))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const nuevoeventos = async (ini,fin,paga) => {
    try {
      const data = await GetSuscritores(ini, fin)
      if (data.users.length > 0) {
        //  console.log(data.users)
        setsuscritor(data.users)
        setCantidad(data.total)
        setpagina({
          page: paga,
          "init": data.init,
          "size": data.size,
          "total": data.total,
        })
        // console.log(data.users.filter(f => f.id == "6670"))
      }
    } catch (error) {
      console.log(error)
    }
  }
  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Eliminado!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
      >
        El suscritor se elimino correctamenta
      </SweetAlert>
    );
  };
  const cancelDetele = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelado"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="success"
      >
        Se a cancelado la acción
      </SweetAlert>
    );
  };
  const abbrir = (row) => {
    sessionStorage.setItem("Suscritorid", JSON.stringify(row.original))
    usehistory.push("/admin/suscritor/" + row.original.id + "")
  }
  const hideAlert = () => {
    setAlert(null);
  };
  function regsitronew() {
    //console.log("modal")
    usedispatch(setModal({ nombre: 'registro', estado: "" }))
  }
  React.useEffect(() => {
    (async () => {
      await nuevoevento()
    })()
  }, [])
  const handleChange = (event, value) => {
  //  console.log(value,event)
    if (value == 1) {
      // usedispatch(setPagination({ inicio: 0, final: 4, page: value }))
      setpagina({...paginasu,
        page: value

      })
      nuevoeventos(ini, 500, value)
      return
    }
    let principio = (parseInt(value)-1) * 500
    
    nuevoeventos(principio, 500, value)
    return
    // usedispatch(setPagination({ inicio: parseInt(principio) - 4, final: parseInt(principio) / 2 + 4, page: value }))
  };
  return (
    <div className="container-fluid">
      {alert}
      <Row>

        <Col lg="3" sm="6">
          <Card className="card-stats d-none">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-light-3 text-success"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Revenue</p>
                    <Card.Title as="h4">$ 1,345</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="far fa-calendar-alt mr-1"></i>
                Last day
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats d-none">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-vector text-danger"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Errors</p>
                    <Card.Title as="h4">23</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="far fa-clock-o mr-1"></i>
                In the last hour
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats d-none">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Followers</p>
                    <Card.Title as="h4">+45K</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Update now
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="4">
                  <div className="icon-big text-center icon-warning">
                    <i className=" fa fa-users text-warning"></i>
                  </div>
                </Col>
                <Col xs="8">
                  <div className="numbers">
                    <p className="card-category">Total Suscritores</p>
                    <Card.Title as="h4">{cantidad}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Update Now
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
     
      <div className="row">
        <div className="col-md-12">
          <button className="btn btn-success" onClick={regsitronew}><i className="mr-2 fa fa-plus"></i> Nuevo Suscritores</button>
          <br /><br />
          <div className=" container-fluid m-auto">
            <Pagination
              count={Math.round(paginasu.total / 500)}
              size="large"
              boundaryCount={5}
              page={paginasu.page}
              onChange={handleChange}
            />
          </div>
          <div className="card card-primary card-outline text-left">
            <div className="card-header">
              Suscritos
            </div>
            <div className="">
              <MaterialReactTable
                columns={Columnasubcrito}
                data={suscritores}
                muiTableProps={{
                  sx: {
                    tableLayout: 'fixed'
                  }
                }}
                enableRowActions
                renderRowActions={({ row }) => (
                  <Box sx={{ display: 'flex' }}>
                    <IconButton
                      color="error"
                      onClick={() => abbrir(row)}
                    >
                      <Visibility />
                    </IconButton>
                  </Box>
                )}
                positionToolbarAlertBanner="bottom"
                localization={MRT_Localization_ES}
              />
            </div>
          </div>
        </div>
      </div>

      <ModalSuscritoView
        show={show}
        setshow={setshow}
        estado={estado}
        datosperson={suscritor}
      />

      <ResgistroView />
    </div>
  )

}
export default SuscritorViews;