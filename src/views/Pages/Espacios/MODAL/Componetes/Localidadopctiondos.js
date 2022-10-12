import React, { useState, useEffect } from "react"
import { Modal, ProgressBar, OverlayTrigger, Tooltip, Button, Form } from "react-bootstrap"
import { GuardarLocalidad ,AptualizarLocalida} from 'utils/Querypanel';
import MesasView from 'views/Pages/Mesas';
import MesacerView from 'views/Pages/Mesas/Plantillas/Mesacer';
import Select from "react-select";
import { Letras } from "utils/constantes";
import Accordion from 'react-bootstrap/Accordion';
const TabdosView = (props) => {
     const{datalocalidad,SetDataloca,localidanames}=props
    
    let ejemplo = [1, 2, 3, 4, 5]
    let ListadeMesas = []
    //array de la localidad
    const [FilasLocalidad, SetFilaLocalidad] = useState([])
    const [Mesas, SetMesasLocalidad] = useState([])



    const [listaFilasConsillas, setFilasSillas] = useState([])
    const [visible,SetVisible]=useState(false)


    //lista para selecionar mesa especifica
    const [ListaMesa, setMesas] = useState([])
    const [selet, Fila] = useState([])
   
    const [singleSelect, setSingleSelect] = React.useState({value: "",label: "",});
    const [singleSelecttwo, setSingleSelectwo] = React.useState({value: "",label: "",});
    const [multipleSelect, setMultipleSelect] = React.useState({value: "",label: "",});
    const [singleSelecttres, setSingleSelectres] = React.useState({value: "",label: "",});
    const [Mesass, setMesass] = useState({
        me_cantidad: 'todas',
        me_inicial: '',
        mesas: '',
        filas: 1
    })
    const [SillasMesas, SetSillasmes] = useState({
        Fila: '',
        Mesa: '',
        cantidad: ''
    })
    const [localidaname, setLocalidad] = useState({
        nombre: '',
        description: '',
        id:''
    })
    function cambiaFila(value) {
        setSingleSelectwo(value)
        var index = FilasLocalidad.filter(obj => obj.Fila == value.value)
        //console.log(index)
        setMultipleSelect("")
       
        SetMesasLocalidad(index.length>0? [...index[0].Mesas]:[])
    }
    const AgregarFilas = () => {
        let fila = parseInt(Mesass.filas)-1
        const data = Letras.slice(0, fila).map((e, i) => {
            return { Fila: e, Mesas: [] }
        })
        SetFilaLocalidad(data)
        const datos = data.map((e, i) => {
            return { value: e.Fila, label: e.Fila }
        })
        Fila(datos)        
        setSingleSelect("")

    }
    const AgregasMesas = () => {
        if(singleSelect.value!="" &&  singleSelect.value=="Todas" && Mesass.me_inicial !=""){
            ListadeMesas = FilasLocalidad
            let sillas = []           
           for(var i=0;i<ListadeMesas.length;i++){
            //console.log(i)
            var letra = ListadeMesas[i].Fila
                    for(var f=0; f< parseInt( Mesass.me_inicial); f++){    
                       let valor= parseInt(f)+1    
                        sillas[f] ={ mesa: letra + "" +valor , sillas: 0, asientos: [] }                       
                    }
                    ListadeMesas[i].Mesas=[...sillas]
            }
            console.log(ListadeMesas)  
            SetFilaLocalidad([])
            setTimeout(function(){
                SetFilaLocalidad(ListadeMesas)   
                setSingleSelect({value: "",label: "",})
            },90);
                           
        }else if(singleSelect.value!="" && Mesass.me_inicial !=""){
            ListadeMesas = FilasLocalidad
            SetFilaLocalidad([])
            let sillas = []
            var index = ListadeMesas.findIndex(obj => obj.Fila == singleSelect.value);
             console.log(index, ListadeMesas[index].Fila)
           var letra = ListadeMesas[index].Fila
           console.log(letra)
            const repeticiones =  parseInt(Mesass.me_inicial)          
            for (var i = 0; i < repeticiones; i++) {
                let valor= parseInt(i)+1 
                sillas.push({ mesa: letra + "" + valor, sillas: repeticiones, asientos: [] });
            }
            ListadeMesas[index].Mesas=[...sillas]
            console.log(ListadeMesas)            
            setTimeout(function(){
                SetFilaLocalidad(ListadeMesas)
                setSingleSelect({value: "",label: "",})
            },90);
        }

    }
    const AgregasSillasMesa = () => {
         //Todas las filas Todas las mesas
         if(multipleSelect.value=="Todas"&& singleSelecttwo.value=="Todas"&& singleSelecttres.value!=""){ 
        ListadeMesas = FilasLocalidad
        for(var i=0;i<ListadeMesas.length;i++){
            for(var j=0;j<ListadeMesas[i].Mesas.length;j++){            
                for(var f=0; f< parseInt(singleSelecttres.value) ; f++ ){                   
                    let valor= parseInt(f)+1             
                    ListadeMesas[i].Mesas[j]["asientos"][f]={silla:ListadeMesas[i].Mesas[j].mesa+"-s-"+valor,estado:"disponible"};                         
                }  
            }
           // console.log(ListadeMesas[i].Mesas)           
        }
       console.log(ListadeMesas)
       SetFilaLocalidad([])
            setTimeout(function(){
                SetFilaLocalidad(ListadeMesas)   
                setSingleSelectwo({value: "",label: "",})
       setMultipleSelect({value: "",label: "",})
       setSingleSelectres({value: "",label: "",})
            },90);
       
    }else if(multipleSelect.value!=""&& singleSelecttwo.value!=""&& multipleSelect.value=="Todas"&& singleSelecttwo.value!="Todas"&& singleSelecttres.value!=""){
         //Fila especifica Todas las mesas   
         console.log(multipleSelect.value,singleSelecttwo.value,singleSelecttres.value) 
       ListadeMesas = FilasLocalidad
        console.log(ListadeMesas)        
        var index = ListadeMesas.findIndex(obj => obj.Fila==singleSelecttwo.value);       
        let fila = ListadeMesas[index].Mesas
        if(fila.length>0)
        {for(var i=0;  i< fila.length; i++){
                var numfila =fila[i].mesa
                //aqui poner la cantidad de sillas 
            for(var f=0; f< parseInt(singleSelecttres.value); f++ ){   
                let valor= parseInt(f)+1                              
                fila[i]["asientos"][f]={silla:numfila+"-s-"+valor,estado:"disponible"};                         
            }  
         }
         ListadeMesas[index].Mesas=fila
         console.log(ListadeMesas)
         SetFilaLocalidad([])
            setTimeout(function(){
                SetFilaLocalidad(ListadeMesas)   
                setSingleSelectwo({value: "",label: "",})
       setMultipleSelect({value: "",label: "",})
       setSingleSelectres({value: "",label: "",})
            },90);
        }
        }else if(multipleSelect.value!=""&& singleSelecttwo.value!=""&& multipleSelect.value!="Todas"&& singleSelecttwo.value!="Todas"&& singleSelecttres.value!=""){

         //Fila especifica mesa especifica 
         ListadeMesas = FilasLocalidad
         var index = ListadeMesas.findIndex(obj => obj.Fila==singleSelecttwo.value); 
         var fila = ListadeMesas[index].Mesas.findIndex(obj => obj.mesa==multipleSelect.value); 
         var numfila = "A0"
         for(var f=0; f< parseInt(singleSelecttres.value); f++ ){    
            let valor= parseInt(f)+1                            
            ListadeMesas[index].Mesas[fila]["asientos"][f]={silla:numfila+"-s-"+valor,estado:"disponible"};                         
        }  
        console.log(ListadeMesas)
        SetFilaLocalidad([])
            setTimeout(function(){
                SetFilaLocalidad(ListadeMesas)   
                setSingleSelectwo({value: "",label: "",})
       setMultipleSelect({value: "",label: "",})
       setSingleSelectres({value: "",label: "",})
            },90);

    }
        



    }
    
    function handelchangeMesa(e) {
        setMesass({
            ...Mesass,
            [e.name]: e.value
        })
        // SetSillasmes({ sillas: '', cantidad: '' })
    }
    function handelchangelocalidad(e) {
        setLocalidad({
            ...localidaname,
            [e.name]: e.value
        })
    }
    async function agregaLocaliad(){
        if(localidaname.nombre=="" || localidaname.description==""|| ListaMesa.length<0) {alert("Complete los datos y localidad creada") }
       else{
         try {
            const guarda = await GuardarLocalidad({"espacio":localidanames.nombre,"descripcion":localidaname.description,"nombre":localidaname.nombre,"mesas_array":JSON.stringify({Typo:'mesa',datos: FilasLocalidad})})
            console.log(guarda)
            if(guarda.success){
                SetDataloca({typo:'',
                    nombre:'',
                    description:'',
                    id:'',
                    array:''})
                alert("Localidad Guardada")
                SetFilaLocalidad([])
                setLocalidad({nombre: '',
                description: '',
                id:''})
                console.log({"espacio":localidanames.nombre,"descripcion":localidaname.description,"nombre":localidaname.nombre,"mesas_array":JSON.stringify({Typo:'mesa',datos: FilasLocalidad})})
       
            }
           
        } catch (error) {
            console.log(error)
            
        }
        
    }
     

    }
    async function actualizalocalidad (){
        if(localidaname.nombre=="" || localidaname.description==""|| ListaMesa.length<0) {alert("Complete los datos y localidad creada") }
        else{
            try {
                const actualiza =await AptualizarLocalida({"id":localidaname.id,"espacio":localidanames.nombre,"descripcion":localidaname.description,"nombre":localidaname.nombre,"mesas_array":JSON.stringify({Typo:'mesa',datos: FilasLocalidad})})
               
                if(actualiza.success){
                    SetDataloca({typo:'',
                    nombre:'',
                    description:'',
                    id:'',
                    array:''})
                    SetFilaLocalidad([])
                    setLocalidad({nombre: '',
                    description: '',
                    id:''})
                    alert("Localidad actualizada")
                }
                //console.log({"id":localidaname.id,"espacio":localidanames.nombre,"descripcion":localidaname.description,"nombre":localidaname.nombre,"mesas_array":JSON.stringify({Typo:'mesa',datos: FilasLocalidad})})
           
                
            } catch (error) {
                console.log(error)
            }
            }

    }

    useEffect(()=>{
        if(datalocalidad.typo=="mesa"){
          
           
            setLocalidad({
                nombre:datalocalidad.nombre,
                description:datalocalidad.description,
                id:datalocalidad.id
            })
            console.log(datalocalidad)
            SetFilaLocalidad(  datalocalidad.array)
        }
       

    },[datalocalidad])
    return (
        <>
            <div className="d-flex flex-column">
                <div className="row col-12 pt-2">
                    <div className="col-sm-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className="form-label"><b>Nombre</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fa fa-bookmark"></i></span>
                                            </div>
                                            <input type="text" className="form-control" id="nombre" name="nombre"
                                                value={localidaname.nombre}
                                                onChange={(e) => handelchangelocalidad(e.target)}
                                                placeholder="Ingrese el nombre del espacio" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-12">
                                        <label className="form-label"><b>Descripción</b></label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text"><i className="fas fa-quote-right"></i></span>
                                            </div>
                                            <input type="text" className="form-control" id="descripcion" name="description"
                                                value={localidaname.description}
                                                onChange={(e) => handelchangelocalidad(e.target)}
                                                placeholder="Ingresa una descripción de la seccion" />

                                        </div>
                                    </div>
                                </div>
                                
                                <div className="d-flex text-end row">
                                {localidaname.id!==""? <button   className="btn btn-primary col-12" onClick={actualizalocalidad}>Actualizar</button>:''}
                                             
                                                <button className="btn btn-success" onClick={agregaLocaliad}>Guardar</button>
                                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7  container" id="mesas">
                        <Accordion flush>
                            <Accordion.Item eventKey="0">
                                < Accordion.Header>Agregar Fila</Accordion.Header>
                                <Accordion.Body>
                                    <div className='row'>
                                        <div className="row col-12 col-sm-12 col-md-12 col-lg-6">
                                            <div className='col-12 col-md-6'>
                                                <label className="form-label"><b>Filas </b></label>

                                                <Form.Control
                                                    className="form-control"
                                                    type="number"
                                                    name="filas"
                                                    min={1}
                                                    max={28}
                                                    value={Mesass.filas}
                                                    onChange={(e)=>handelchangeMesa(e.target)}
                                                />
                                            </div>

                                            <div className='col-12 col-md-6'>
                                                <label className="form-label" style={{ color: 'white' }}><b>.</b></label><br />
                                                <button className="btn btn-info"  onClick={AgregarFilas}>Crear</button>


                                            </div>
                                        </div>
                                    
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                            {FilasLocalidad.length > 0 ?
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Agergar Mesas</Accordion.Header>
                                    <Accordion.Body>
                                        <div className='row'>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                <label className="form-label"><b>Filas</b></label>
                                                <Select
                                                    className="react-select primary"
                                                    classNamePrefix="react-select"
                                                    name="singleSelect"
                                                    value={singleSelect}
                                                    onChange={(value) => setSingleSelect(value)}
                                                    options={[
                                                        {
                                                            value: "",
                                                            label: "Seleccione una Opcion",
                                                            isDisabled: true,
                                                        },
                                                        {
                                                            value: "Todas",
                                                            label: "Todas",
                                                        },
                                                        ...FilasLocalidad.map((e, i) => {
                                                            return { value: e.Fila, label: e.Fila }
                                                        })

                                                    ]}
                                                    placeholder="Seleccione "
                                                />


                                            </div>
                                            <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                                                <label className="form-label"><b>Mesas x Fila</b></label>


                                                <Form.Control type="number" name="me_inicial"
                                                    value={Mesass.me_inicial}
                                                    onChange={(e) => handelchangeMesa(e.target)}
                                                    className="form-control" id="numero_partida" placeholder="10" />

                                            </div>
                                          

                                            <div className="col-12 col-md-2 text-left">
                                                <label className="form-label" style={{ color: 'white' }}><b>.</b></label><br />
                                                <button className="btn btn-info" onClick={AgregasMesas}>Agregar</button>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item> : ''}
                            {FilasLocalidad.length > 0 ?
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        Agregar sillas </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='row  '>
                                            <div className="d-flex px-0 flex-column col-6">
                                                <div className="col-12">
                                                    <label className="form-label"><b>Seleccione Fila</b></label>
                                                    <Select
                                                        className="react-select primary"
                                                        classNamePrefix="react-select"
                                                        name="singleSelecttwo"
                                                        value={singleSelecttwo}
                                                        onChange={(value) => cambiaFila(value)}
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Seleccione una Opcion",
                                                                isDisabled: true,
                                                            },
                                                            {
                                                                value: "Todas",
                                                                label: "Todas",
                                                            },
                                                            ...FilasLocalidad.map((e, i) => {
                                                                return { value: e.Fila, label: e.Fila }
                                                            })

                                                        ]}
                                                        placeholder="Selecione"
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label"><b>Selecciona Mesa</b></label>
                                                    <Select
                                                        className="react-select info"
                                                        classNamePrefix="react-select"
                                                        placeholder="Mesas"
                                                        name="multipleSelect"
                                                        
                                                        value={multipleSelect}
                                                        onChange={(value) => setMultipleSelect(value)

                                                        }
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Seleccione Mesa",
                                                                isDisabled: true,
                                                            },
                                                            FilasLocalidad? {
                                                                value: "Todas",
                                                                label: "Todas",
                                                               
                                                            }:{
                                                                value: "",
                                                                label: "Todas",
                                                                isDisabled: true,                                                               
                                                            },
                                                            ...Mesas.map((e, i) => {
                                                                return { value: e.mesa, label: e.mesa }
                                                            })
                                                        ]}
                                                    />
                                                </div>

                                            </div>
                                            <div className="col-6">
                                                <div className="col-12 ">
                                                                <label className="form-label"><b># de Sillas </b></label>                                                                
                                                                <Select  className="react-select primary"
                                                        classNamePrefix="react-select"
                                                        name="singleSelecttres"
                                                        value={singleSelecttres}
                                                        onChange={(value) => setSingleSelectres(value)}
                                                        options={[
                                                            {
                                                                value: "",
                                                                label: "Seleccione una Opcion",
                                                                isDisabled: true,
                                                            },
                                                            {
                                                                value: 2,
                                                                label: "2 Sillas",
                                                            },
                                                            {
                                                                value: 4,
                                                                label: "4 Sillas",
                                                            },
                                                            {
                                                                value: 6,
                                                                label: "6 Sillas",
                                                            },
                                                            {
                                                                value: 8,
                                                                label: "8 Sillas",
                                                            },{
                                                                value: 10,
                                                                label: "10 Sillas",
                                                            },

                                                        ]}
                                                        placeholder="Selecione"/>
                                                                
                                                 </div> 
                                                 <div className="col-12 ">
                                                <label className="form-label" style={{ color: 'white' }}><b>.</b></label><br />
                                                <button className="btn btn-info"  onClick={AgregasSillasMesa}>Agregar</button>
                                                </div> 
                                            </div>
                                            
                                        </div>

                                    </Accordion.Body>


                                </Accordion.Item> : ''}
                        </Accordion>
                    </div>
                </div>

                <div className="col-sm-12  text-center ">
                    <div className="col-sm-12 text-center " style={{ height: '400px', overflowY: 'hide', overflowX: 'auto', }}>
                        {
                        FilasLocalidad.length>0?
                        FilasLocalidad.map((e,index)=>{
                            return(
                                <div className='d-flex  px-3 align-items-center' key={index}>
                                        <div className='d-flex pb-2'>
                                            <MesacerView
                                                text={e.Fila}
                                            />
                                        </div>
                                        <div className='d-flex  pb-2' >
                                            {e.Mesas.length>0?
                                            e.Mesas.map((e, i) => {
                                                return (
                                                    <div key={i}>
                                                        <MesasView
                                                            status={e.asientos.length}
                                                            text={e.mesa} />
                                                    </div>

                                                )
                                            }):''}
                                        </div>
                                </div>

                            )
                        }):''
                        }
                        {/*.length > 0 ?
                            ejemplo.map((e, index) => {
                                return (
                                    <div className='d-flex  px-3 align-items-center' key={index}>
                                        <div className='d-flex pb-2'>
                                            <MesacerView
                                                text={index}
                                            />
                                        </div>

                                        <div className='d-flex  pb-2' >
                                            {ListaMesa.map((e, i) => {
                                                return (
                                                    <div key={i}>
                                                        <MesasView
                                                            status={e.asientos.length}
                                                            text={e.mesa + "" + index} />
                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>)

                            }) : ""*/}
                    </div>
                </div>



            </div>
        </>
    )


}

export default TabdosView