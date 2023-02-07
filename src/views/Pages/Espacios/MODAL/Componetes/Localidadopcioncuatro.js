import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Box, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Edit, Delete } from '@mui/icons-material';
import { Listarlocalidadid, localidaandespacio } from '../../../../../utils/Querypanel';
import { ListarLocalidad } from 'utils/LocalidadesQuery';
import { columnespacio } from 'utils/ColumnTabla';
import { EliminarLocalidad } from '../../../../../utils/Querypanel';
import { useSelector, useDispatch } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { listarLocalidadaEspeci } from 'utils/Querypanelsigui';

const LocalidadesagreViews = (props) => {
  let usedispatch = useDispatch()
  const { localidaname, show, SetDataloca, datalocalidad } = props
  const [alert, setAlert] = React.useState(null)
  const [datas, setData] = useState([])
  async function ObtenLocalidad() {
    try {
      const datos = await ListarLocalidad("")
      //const datos2 = await Listarlocalidadid(localidaname.id)
      console.log(datos, localidaname.id)
      const { success, data } = datos
      if (success) {
        const filtrado = datos.data.filter(e => e.id_espacio == localidaname.id)
        console.log(filtrado)
        const obten = filtrado.map((e, i) => {
          let dato = JSON.parse(e.mesas_array)
          return { ...e, tipo: dato.Typo }
        })
        setData(obten)
        if (filtrado.length > 0) $('[href*="seleclocalidad"]').removeClass("d-none"), $('[href*="listas"]').removeClass("d-none")
        else $('[href*="seleclocalidad"').addClass("d-none"), $('[href*="listas"').addClass("d-none"), $("#listas").removeClass("active")
      }
    } catch (error) {
      console.log(error)
    }
  }
  async function Eliminar(parms) {
    console.log({ "id": parms })
    try {
      const accion = await EliminarLocalidad(parms)
      const { success } = accion
      if (success) {
        await ObtenLocalidad()
        successDelete()
      }
    } catch (error) {
      console.log(error)
    }
  }
  function Editar(parms) {
    //export const localidaandespacio = async (parms, id) => {
    console.log(localidaname.id, parms)
    localidaandespacio(localidaname.id, parms.id).then(ouput => {
      console.log(ouput)
      //    console.log(ouput.data.find(e => e.typo == "fila"))
      let nuevoObjeto = []
      if (ouput.data.find(e => e.typo == "fila")) {
        ouput.data.forEach(x => {
          if (!nuevoObjeto.some(e => e.fila == x.fila)) {
            nuevoObjeto.push({ fila: x.fila, asientos: [{ silla: x.silla, estado: x.estado, idsilla: x.id }] })
          }
          else {
            let indixe = nuevoObjeto.findIndex(e => e.fila == x.fila)
            nuevoObjeto[indixe].asientos.push({
              silla: x.silla, estado: x.estado, idsilla: x.id
            })
          }
        })
        console.log(nuevoObjeto)
        SetDataloca({ typo: 'fila', nombre: parms.nombre, description: parms.descripcion, id: parms.id, array: nuevoObjeto })
        $("#listas").removeClass("active")
        $("#filas").addClass("active")
        $('[href*="filas"]').addClass('active');
        $('[href*="listas"]').removeClass('active');
      }
      else if (ouput.data.find(e => e.typo == "mesa")) {
        ouput.data.forEach(x => {
          if (!nuevoObjeto.some(e => e.fila == x.fila)) {
            nuevoObjeto.push({ fila: x.fila, Mesas: [] })
          }
        })
        nuevoObjeto.length > 0 ? ouput.data.forEach(x => {
          let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
          if (nuevoObjeto[index].Mesas.findIndex(z => z.mesa == x.mesa) == -1) {
            nuevoObjeto[index].Mesas.push({ mesa: x.mesa, asientos: [] })
          }
        }) : ''
        nuevoObjeto.length > 0 ? ouput.data.forEach(x => {
          let index = nuevoObjeto.findIndex(z => z.fila == x.fila)
          let sillas = nuevoObjeto[index].Mesas.findIndex(y => y.mesa == x.mesa)
          nuevoObjeto[index].Mesas[sillas].asientos.push({
            silla: x.silla, estado: x.estado, idsilla: x.id
          })
        }) : ''
        SetDataloca({ typo: 'mesa', nombre: parms.nombre, description: parms.descripcion, id: parms.id, array: nuevoObjeto })
        $("#listas").removeClass("active")
        $("#mesas").addClass("active")
        $('[href*="mesas"]').addClass('active');
        $('[href*="listas"]').removeClass('active');
      }
      else if (ouput.data.find(e => e.typo == "correlativo")) {
        console.log({ typo: 'correlativo', nombre: parms.nombre, description: parms.descripcion, id: parms.id, array: { cantidad: ouput.data.length, inicio: 1 } })
        SetDataloca({ typo: 'correlativo', nombre: parms.nombre, description: parms.descripcion, id: parms.id, array: { cantidad: ouput.data.length, inicio: 1 } })
        $("#listas").removeClass("active")
        $("#correlativos").addClass("active")
        $('[href*="correlativos"]').addClass('active');
        $('[href*="listas"]').removeClass('active');
      }


    }
    ).catch(err =>
      console.log(err))
    let tipo = JSON.parse(parms.mesas_array)
    //console.log(tipo.Typo)
    /* if (tipo.Typo == "fila") {
       SetDataloca({ typo: 'fila', nombre: parms.nombre, description: parms.descripcion, id: parms.id, array: tipo.datos })
       $("#listas").removeClass("active")
       $("#filas").addClass("active")
       $('[href*="filas"]').addClass('active');
       $('[href*="listas"]').removeClass('active');
     } else if (tipo.Typo == "mesa") {
       SetDataloca({ typo: 'mesa', nombre: parms.nombre, description: parms.descripcion, id: parms.id, array: tipo.datos })
       $("#listas").removeClass("active")
       $("#mesas").addClass("active")
       $('[href*="mesas"]').addClass('active');
       $('[href*="listas"]').removeClass('active');
     } else if (tipo.Typo == "correlativo") {
       SetDataloca({ typo: 'correlativo', nombre: parms.nombre, description: parms.descripcion, id: parms.id, array: tipo.datos })
       $("#listas").removeClass("active")
       $("#correlativos").addClass("active")
       $('[href*="correlativos"]').addClass('active');
       $('[href*="listas"]').removeClass('active');
     }*/
  }

  useEffect(() => {
    (async () => {
      await ObtenLocalidad()
    })()

  }, [datalocalidad])
  const successAlert = (e) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Estas Seguro?"
        onConfirm={() => Eliminar(e)}
        onCancel={() => cancelDetele()}
        confirmBtnBsStyle="success"
        cancelBtnBsStyle="danger"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        showCancel
      >
        Esta seguro de eliminar esta localidad
      </SweetAlert>
    );
  };
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
        La Localidad se elimino correctamenta
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
  const hideAlert = () => {
    setAlert(null);
  };

  return (


    <div className="container-fluid">
      {alert}
      <MaterialReactTable
        columns={columnespacio}
        data={datas}


        initialState={
          {
            columnVisibility: { mesas_array: false }
          }
        }
        muiTableBodyProps={{
          sx: { columnVisibility: { nombre: false } }
        }}

        enableRowActions
        renderRowActions={({ row }) => (
          <Box >
            <div className={row.original.id ? 'd-flex flex-row' : ''}>
              <IconButton
                color="primary"
                onClick={() => Editar(row.original)}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => successAlert(row.original.id)}
              >
                <Delete />
              </IconButton>
            </div>


          </Box>
        )}
        positionToolbarAlertBanner="bottom"
        displayColumnDefOptions={{
          'mrt-row-numbers': {
            enableHiding: true,
          },
        }}
        localization={MRT_Localization_ES}

      />
    </div>)

}

export default LocalidadesagreViews