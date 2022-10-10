import React ,{useEffect,useState}from "react";
import { Modal,Container,Toast } from "react-bootstrap";
import { useHistory } from "react-router";
import { Host } from "utils/constantes";
import axios from "axios";
import { DatosUsuariocliente } from "utils/constantes";

import logo from "../../../../assets/imagen/flash.png";
import { useSelector,useDispatch } from "react-redux";
import { addususcritor } from "StoreRedux/Slice/SuscritorSlice";

const ModalLogin =(props)=>{
    const {showLogin ,setShowLogin,setUserauth}=props
  let histoty = useHistory()
  const  usedispatch = useDispatch()
    const [message, setmessage] = useState("");
    const [showtoas, setShowToas] = useState(false);
    const [showtoass, setShowToass] = useState(false);
    const [credenciales, setnombre] = useState({
      email: '',
      password: '',
    });
    const handleSubmit = async (event) => {
      var hoy = new Date();
        event.preventDefault();
        
        if (credenciales.email !== '' && credenciales.password !== '') {
        try {      
         // console.log(credenciales,encodedToken)
            const { data } = await axios.post("https://rec.netbot.ec/ms_login/api/v1/auth_suscriptor", credenciales, {
              headers: {                
                'Content-Type': 'application/json',
                'Authorization': 'Basic Ym9sZXRlcmlhOmJvbGV0ZXJpYQ=='
              }
            })
                                                           
           //const { success, tocken } = data
            if (data.data) {
              
              let client={
               cedula:data.data.cedula, direccion:data.data.ciudad, whatsapp:data.data.movil,
               telefono:data.data.movil, name:data.data.nombreCompleto,
               email:data.data.email, hora: String(hoy),
               enable:data.data.enable,id:data.data.id,         
              }
            localStorage.setItem(DatosUsuariocliente, JSON.stringify(client))
            usedispatch(addususcritor({...client}))
             setUserauth(true)
             setShowLogin(false)
             setShowToass(true)
             setmessage("Bienvenido ")
           
            }
           else {
            setShowToas(true)
            setmessage("Correo o contraseña invalido")
            //console.log("mensage de alvertencia")
          }
        } catch (error) {
          setShowToas(true)
          setmessage("Hubo un error Verifique correo y contraseña e intente de nuevo")
        
          //console.log("error Logincredet-->",error)
        }
        
      }    
    };
    const handleChange = (target) => {
        const { name, value } = target
        setnombre({
          ...credenciales,
          [name]: value
        })
       }
    useEffect(()=>{


    },[showLogin])

    return(
        <>
        <Modal
        show={showLogin}
        onHide={()=>setShowLogin(false)}   
        aria-labelledby="contained-modal-title-vcenter"
        centered    
         >
        <Modal.Header closeButton className="d-flex text-center">
          
                
            </Modal.Header>
            <Modal.Body>
            <Container className="d-flex flex-column justify-content-center">
           
             
                 <div className=" text-center">
                     <h5 className="">INICIA SECCIÓN</h5>
                </div>
                <div className="card-body">
                  <div className="container text-center">
                    <img src={logo} className="mb-4 img-fluid " style={{ height: '80px' ,color:'black'}} alt="" />
                  </div>
                  <form  onSubmit={(e) => handleSubmit(e)}  >
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                      </div>
                      <input id="email" type="text" className="form-control"
                        name="email"
                        value={credenciales.username}
                        onChange={(e) => handleChange(e.target)}
                        placeholder="Usuario"  />
                    </div>
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-lock"></i></span>
                      </div>
                      <input id="password" type="password" className="form-control"
                        name="password"
                        value={credenciales.password}
                        onChange={(e) => handleChange(e.target)}
                        placeholder="Contraseña"  />
                    </div>
                    <div className="row text-center">
                      <div className="col-12">
                        <button className="btn btn-primary px-4" type="submit">ENTAR</button>
                      </div>
                      <div className="col-12">
                        <a className="btn btn-link  nav-link px-4" href="#">I forgot my password</a>
                      </div>
                    </div>
                  </form>
                </div>
                   
           
          </Container>

            </Modal.Body>
        </Modal>
        <Toast
        onClose={() => setShowToas(false)} show={showtoas} delay={4000} autohide
        className="top-center"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10000
        }}
      >
       <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
      <strong className="mr-auto">Hubo un error </strong>
      <small></small>
    </Toast.Header>
        <Toast.Body className="bg-danger text-white" >{message} </Toast.Body>
      </Toast>

      <Toast
        onClose={() => setShowToass(false)} show={showtoass} delay={3000} autohide
        className="top-center"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10000
        }}
      >
       <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
      <strong className="mr-auto">Inicio Exitoso </strong>
      <small></small>
    </Toast.Header>
        <Toast.Body className="bg-success text-white" >{message} </Toast.Body>
      </Toast>
        </>
    )

}

export default ModalLogin;