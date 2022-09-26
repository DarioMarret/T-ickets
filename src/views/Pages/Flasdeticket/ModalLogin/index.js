import React ,{useEffect,useState}from "react";
import { Modal,Container,Toast } from "react-bootstrap";
import axios from "axios";
import logo from "../../../../assets/imagen/flash.png";
const ModalLogin =(props)=>{
    const {showLogin ,setShowLogin}=props

    const [message, setmessage] = useState("");
    const [showtoas, setShowToas] = useState(false);
    const [credenciales, setnombre] = useState({
      username: '',
      password: '',
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credenciales.email !== '' && credenciales.password !== '') {
        try {      
            const { data, status } = await axios.post("https://43d5-45-187-2-162.sa.ngrok.io/api/v1/auth_admin", credenciales, {
              headers: {
                'Authorization': 'Basic YWRtaW46YWRtaW4='
              }
            })
            const { success, tocken } = data
            if (success) {
              console.log("success-->",success)
              setDatosUser(tocken)             
              history.push('/admin')
            }
           else {
            setShowToas(true)
            setmessage("Hubo un error")
            console.log("mensage de alvertencia")
          }
        } catch (error) {
          setmessage("Hubo un error intente de nuevo o verifique mas tarde")
          console.log("error Logincredet-->",error)
        }
        setShowToas(true)
      }
      setmessage("Complete los campos requeridos")
      setShowToas(true)
    };
    const handleChange = (target) => {
        const { name, value } = target
        setnombre({
          ...credenciales,
          [name]: value
        })
        // console.log(credenciales)
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
                  <form  onSubmit={(e) => handleSubmit(e)}  method="post">
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                      </div>
                      <input id="username" type="text" className="form-control"
                        name="username"
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
        </>
    )

}

export default ModalLogin;