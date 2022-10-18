import react from 'react'

const AjustesView =()=>{
    return(
        <>
        <div className="container-fluid ">
    <div className="d-flex flex-wrap justify-content-center ">
    <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle  d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="bi gear  fa-3x"></i>
            <h6>General</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="bi bi-people fa-3x"></i>
            <h6>Gestión personal </h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center ">
        <div className="border rounded-circle text-center  d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
          
          <i className="bi  fa-3x"></i>
            <h6>Facturación Electrónica </h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="bi bi-chat  fa-3x"></i>
            <h6>Mensajeria</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="bi bi-receipt fa-3x"></i>
            <h6>Faturas</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
          <i className="bi bi-dropbox fa-3x"></i>
            <h6>Cloud</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fa fa-cog  fa-3x"></i>
            <h6>Pasarela de pago</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fas fa-envelope fa-3x" aria-hidden="true"></i>

            <h6>Plantilla Configuracón</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fa fa-code  fa-3x"></i>
            <h6>Editor Plantilla</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fa fa-envelope  fa-3x"></i>
            <h6>servidor de Correo</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fab fa-google  fa-3x"></i>
            <h6>Google</h6>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fa fa-database  fa-3x"></i>
            <h6>Base de datos</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fa fa-cogs  fa-3x"></i>
            <h6>Notificacion</h6>
        </div>
      </div>
      <div className="  p-4  pb-8  d-flex flex-column justify-content-center align-items-center  ">
        <div className="border rounded-circle d-flex flex-column justify-content-center bg-white shadow-md  align-items-center"
        style={Stylestheme.img}
        >
            <i className="fa fa-info  fa-3x"></i>
            <h6>Licencia</h6>
        </div>
      </div>
      <div className="  p-4  pb-8    ">
        <div className="d-flex flex-column justify-content-center bg-white shadow-md  align-items-center border rounded-circle "
        style={Stylestheme.img}
        >
            <i className="fa fa-info  fa-3x"></i>
            <h6>Chatbox</h6>
        </div>
      </div>
    </div>

  </div>

        </>
    )

}
 const Stylestheme={
    img:{
        height:'200px',
        width: '200px',
        },
   }


export default AjustesView