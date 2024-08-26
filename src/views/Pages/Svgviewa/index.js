import { array } from "prop-types"
import React, { useEffect, useState } from "react"
import { ListarLocalidad } from "utils/Querypanel"
import { insertLocalidad, getMapacolor, getLocalidadmapa } from "utils/Localidadmap"

import "./isvg.css"
import "./class.css"
import "./svg.css"
import "./cultura.css"
import ExampleDataTable from "components/ReactTable/Datatable.js/ExampleTable"
import ModalFirma from "views/Components/MODAL/Modalfirma"
const Viewssvg = () => {
	const [localidadmap, setselection] = useState({
		name: "",
		color: '#A12121',
	})
	const [mapa, setmapa] = useState([])
	const [lista, setLsita] = useState([])
	const [localidad, setLocalidad] = useState([])

	function handelChange(e) {
		setselection({
			...localidadmap,
			[e.name]: e.value
		})

	}

	/*
		function agergaraALarray(dato,id,color){
		   let array = lista       
		  // let nuevo = mapa
		 // console.log(array)
				var index = array.findIndex(obj => obj.path==dato);
			  if (index == -1) { 
				array.push({path:dato,id:id, fill:color});
			    
			  } else {
				do {
				  array.splice(index, 1);
				 index = array.indexOf({path:dato,id:id, fill:color});
				} while (index != -1);
			  }
			  setLsita(array)
			//  console.log("mpap?",nuevo) 
			insertLocalidad(array,{path:dato,id:id, fill:color})
			cargarcolores()
			listadecolores()
		    
			}
		    
			function cargarcolores (){
				let colores = getMapacolor()
				colores.length>0? setLsita(colores):''
				colores.length>0? colores.map((e,i)=>{
					$("#"+e.path).attr("class","seleccion")               
					$("#"+e.path).attr("machfilal",e.fill,"class","seleccion")        
				}):''
			}
					 $(document).on("click",".none",function(){
					let co = document.getElementById("color").value;
					let id = document.getElementById("name").value;
					if(this.classList.contains('none')){
						if(id.trim()=== "") {
						return  }
						else
					agergaraALarray(this.getAttribute('id'),id,co)   
							  this.removeAttribute("class","")       
							  this.setAttribute("class","seleccion")   
							}
					 })
					$(document).on("click",".seleccion",function(){
					 if(this.classList.contains('seleccion')){
						this.removeAttribute("machfilal")   
						agergaraALarray(this.getAttribute('id'),'','')
						this.removeAttribute("class","seleccion")   
						this.setAttribute("class","")                             
							} 
					 })
	  
	   
					 async function GetLocalidad(){
						let obtent = await ListarLocalidad()
						setLocalidad(obtent.data)
						let nuevo = obtent.data.map((e,i)=>{
							return{ id:e.id, nombre:e.nombre,color:''}
						})
						setmapa(obtent.data.map((e,i)=>{
							return{ id:e.id, nombre:e.nombre,color:''}
						}))
						//console.log("localidades",nuevo)
						sessionStorage.localidad = JSON.straingify(obtent.data)
						cargarcolores()   
					}
					async function listadecolores(){
						let nuevo = getLocalidadmapa()
					  //  console.log("Function mapa",nuevo)
						let colores = getMapacolor()
						const valorDuplicadas = [];
						nuevo.length>0 && colores.length>0 ? colores.forEach(p => {
								if(valorDuplicadas.findIndex(pd => pd.id === p.id) === -1) {       
								 let index =nuevo.findIndex((e)=>parseInt(e.id)=== parseInt(p.id))
									valorDuplicadas.push({id:p.id,nombre:nuevo[index]?nuevo[index].nombre:'',color:p.fill});
								}
								}):''     
						nuevo.length>0 && colores.length>0 ? nuevo.map((L)=>{
								if(valorDuplicadas.findIndex((e)=>parseInt(e.id)=== parseInt(L.id))!=-1){
									L.color=valorDuplicadas[valorDuplicadas.findIndex((e)=>parseInt(e.id)=== parseInt(L.id))].color;
									return L
								}else{
									return L
								}
								}):''
					   //         console.log("mutado",nuevo)  
    
							 // console.log("duplicado",valorDuplicadas)
							  nuevo.length>0 && colores.length>0?setmapa(nuevo) :''
							  nuevo.length>0 && colores.length>0? sessionStorage.localidad = JSON.straingify(nuevo):''
					}*/

	useEffect(() => {
		const paths = document.querySelectorAll(" polygon.cuadro, rect.cuadro")
		paths.forEach(e => {
			e.addEventListener("click", function () {
				var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
				var b = this.getBBox();
				console.log(b)
				console.log((b.x + b.width / 2) + " " + (b.y + b.height / 2))
				t.setAttribute("transform", "translate(" + (b.x + b.height / 8) + " " + (b.y + b.height / 2) + ")");
				t.textContent = "NOMBRE DE LOCALIDAD";
				t.setAttribute("machfilal", "white");
				t.setAttribute("font-size", (b.height / 10));
				this.parentNode.insertBefore(t, b.nextSibling);
				//  b.parentNode.insertBefore(t, b.nextSibling);

				//this.classList.add("class")   
				//this.setAttribute("machfilal","#DC2A27")
				//console.log( this)
			})
		})
		const textPaths = document.querySelectorAll("polygon.texto")

		textPaths.forEach(e => {
			e.addEventListener("click", function () {
				var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
				var b = this.getBBox();
				console.log(b)
				//console.log((b.x + b.width/2) + " " + (b.y + b.height/2))
				t.setAttribute("transform", "translate(" + (b.x + b.height / 8) + " " + (b.y + b.height) + ")");
				t.textContent = "Sillas";
				t.setAttribute("machfilal", "white");
				t.setAttribute("font-size", (b.height));
				this.parentNode.insertBefore(t, b.nextSibling);
			})
		})


		//agregar id y class
		/*
 var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
	var b = p.getBBox();
	t.setAttribute("transform", "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");
	t.textContent = "a";
	t.setAttribute("machfilal", "red");
	t.setAttribute("font-size", "14");
	p.parentNode.insertBefore(t, p.nextSibling);*/

		/*
		const path = document.querySelectorAll("path")
		  $(path).each(function(index){ 
				this.setAttribute("id", "mapas"+index)
				this.setAttribute("class", "mapas")
			   // console.log(this)
				//alert($(this).text())
			});*/


	}, [])


	return (
		<>
			<ModalFirma />
			<div className="d-flex flex-wrap">
				<div className="col-12 col-md-6">
					<form className="container">
						<div className="row">
							<div className="col-8">
								<label className="form-label">Selecione localidad elija el color de la Localidad </label>
								<select className="form-control" value={localidadmap.name} name="name" id="name" onChange={(e) => handelChange(e.target)}>
									<option value="">

									</option>


									{localidad.length > 0 ?
										localidad.map((e, i) => {
											return (
												<option key={i} value={e.id} >{e.nombre}</option>
											)
										}) : ''
									}
								</select>
							</div>
							<div className="col-sm">
								<label className="form-label" >.</label>
								<input
									className="form-control form-control-color"
									value={localidadmap.color} name="color" id="color"
									type="color"
									onChange={(e) => handelChange(e.target)}
								/>
							</div>

						</div>


					</form>

				</div>
				<div className=" d-flex flex-column text-center justify-content-center col-12 col-md-6">
					<div className="d-flex flex-wrap justify-content-center  pb-5">
						{mapa.length > 0 ?
							mapa.map((elm, i) => {
								return (
									<div className="d-flex flex-row px-3 precios align-items-center" key={i}  >
										<div className="mx-1  rounded-4" style={{ height: 20, width: 20, backgroundColor: elm.color }}></div>
										<span>{elm.nombre}</span>
									</div>
								)
							}) : ''
						}
					</div>
					<div className=" border d-flex text-center bg-azul justify-content-center" style={{ width: '100%' }}>
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" >
							<path
								id="Cube_face_-_left_9_"
								fill="#dedede"
								d="M360 876.6L1051.19 478.78 1051.19 459.73 360 857.55z"
							/>
							<path
								id="Cube_face_-_right_12_"
								fill="#bfbbb6"
								d="M30.49 686.36L360 876.6 360 857.55 30.49 667.31z"
							/>
							<defs>
								<path
									id="Cube_face_-_top_10_"
									d="M360 853.18L1051.19 455.36 721.68 265.12 30.49 662.94z"
								/>
							</defs>
							<clipPath id="Cube_face_-_top_00000160869327232036286980000001896082126119913101_">
								<use xlinkHref="#Cube_face__x002D__top_10_" overflow="visible" />
							</clipPath>
							<path
								id="Cube_face_-_left_8_"
								fill="#c1934e"
								d="M360 862.68L1051.19 464.87 1051.19 455.36 360 853.18z"
							/>
							<path
								id="Cube_face_-_right_11_"
								fill="#ac7f42"
								d="M30.49 672.44L360 862.68 360 853.18 30.49 662.94z"
							/>
							<path
								id="Cube_face_-_top_00000140713183653610391700000002145292844648103808_"
								fill="#e4e8ee"
								d="M360 853.18L1051.19 455.36 721.68 265.12 30.49 662.94z"
							/>
							<path
								id="1"
								className="none"
								d="M28.51 662.94L358.01 853.18 541.58 747.52 215.02 555.59z"
							/>
							<path
							id="2"
								className="none"
								d="M415.99 439.92L215.02 555.59 541.58 747.52 742.55 631.86z"
							/>
							<path
							    id='3'	className="none"
								d="M1049.2 455.36L719.69 265.12 415.99 439.92 742.55 631.86z"
							/>
							<g className="st8">
								<path
									className="st9"
									d="M724.96 248.98L766.8 224.99 766.56 359.69 724.69 383.65z"
								/>
								<path
									className="st10"
									d="M699.35 234.62L741.2 210.63 766.8 224.99 724.96 248.98z"
								/>
								<path
									className="st11"
									d="M724.96 248.98L724.69 383.65 699.12 369.32 699.35 234.62z"
								/>
							</g>
							<path
								fill="#01192b"
								d="M770.81 354.83L908.65 433.34 908.51 298.54 765.64 209.61z"
							/>
							<path
								className="st9"
								d="M873.63 314.55L915.26 290.05 914.82 444.85 873.19 469.36z"
							/>
							<path
								fill="#062c3f"
								d="M729.61 231.93L783.22 225.96 783.22 355.25 729.52 386.42z"
							/>
							<path
								fill="#3b5f63"
								d="M725.06 228.78L766.7 204.27 915.26 290.05 873.63 314.55z"
							/>
							<path
								className="st11"
								d="M725.06 228.78L724.69 383.65 729.52 386.42 729.92 245.85 870.68 326.9 870.28 467.46 873.19 469.36 873.63 314.55z"
							/>
							<g className="st8">
								<path
									className="st9"
									d="M903.41 353.78L945.34 329.79 945.11 462.83 903.41 486.82z"
								/>
								<path
									className="st10"
									d="M867.61 331.4L909.46 309.07 945.34 329.79 903.41 353.78z"
								/>
								<path
									className="st11"
									d="M903.41 353.78L903.41 486.82 873.22 469.36 873.45 334.66z"
								/>
							</g>
							<path
								className="st15"
								d="M728.42 271.85L729.87 271.01 729.83 284.04 728.38 284.88z"
							/>
							<path
								className="st15"
								d="M728.46 258.82L729.91 257.98 729.87 271.01 728.42 271.85z"
							/>
							<path
								className="st15"
								d="M728.5 245.79L729.94 244.95 729.91 257.98 728.46 258.82z"
							/>
							<path
								className="st15"
								d="M728.53 232.57L729.98 231.89 729.94 244.95 728.5 245.79z"
							/>
							<path
								className="st16"
								d="M872.04 458.47L873.5 457.62 873.53 457.64 872.07 458.49z"
							/>
							<path
								className="st17"
								d="M872.07 458.49L873.53 457.64 873.51 457.65 872.05 458.5z"
							/>
							<path
								className="st18"
								d="M870.09 443.98L871.55 443.13 871.55 443.36 870.09 444.2z"
							/>
							<path className="st19" d="M872.05 458.5L872.04 458.47 872.07 458.49z" />
							<path
								className="st18"
								d="M872.74 458.11L874.2 457.26 874.19 458.03 872.74 458.88z"
							/>
							<path
								className="st18"
								d="M872.75 455.62L874.21 454.77 874.2 457.26 872.74 458.11z"
							/>
							<path
								className="st17"
								d="M872.75 455.61L874.2 454.77 881.95 450.35 880.49 451.2z"
							/>
							<path
								className="st18"
								d="M872.77 446.75L874.23 445.9 874.21 470.04 872.52 470.65z"
							/>
							<path
								className="st18"
								d="M872.78 445.53L874.23 444.68 874.23 445.9 872.77 446.75z"
							/>
							<path
								className="st20"
								d="M870.09 443.98L871.55 443.13 874.23 444.68 872.78 445.53z"
							/>
							<path
								className="st18"
								d="M872.78 444.85L874.24 444 874.23 444.68 872.78 445.53z"
							/>
							<path
								className="st17"
								d="M880.49 451.2L881.95 450.35 882.29 450.16 880.83 451.01z"
							/>
							<path
								className="st21"
								d="M880.75 449.45L880.83 449.59 880.83 450.4 880.83 451.01 880.49 451.2 872.52 446.57 872.34 445.53 872.78 444.85z"
							/>
							<path
								className="st15"
								d="M880.83 451.01L882.29 450.16 882.28 452.65 880.82 453.5z"
							/>
							<path
								className="st15"
								d="M880.83 450.4L882.29 449.56 882.29 450.16 880.83 451.01z"
							/>
							<path
								className="st15"
								d="M880.83 449.59L882.29 448.75 882.29 449.56 880.83 450.4z"
							/>
							<path
								className="st18"
								d="M880.83 450.21L882.29 449.37 882.29 449.56 880.83 450.4z"
							/>
							<path
								className="st16"
								d="M872.78 444.85L874.24 444 882.21 448.6 880.75 449.45z"
							/>
							<path
								className="st22"
								d="M880.75 449.45L882.21 448.6 882.29 448.75 880.83 449.59z"
							/>
							<path
								className="st18"
								d="M872.8 435.69L874.26 434.84 874.24 444 872.78 444.85z"
							/>
							<path
								className="st20"
								d="M880.83 450.21L882.29 449.37 882.99 449.77 881.53 450.61z"
							/>
							<path className="st19" d="M881.56 450.6L881.58 450.65 881.53 450.61z" />
							<path
								className="st20"
								d="M881.53 450.61L882.99 449.77 883.04 449.8 881.58 450.65z"
							/>
							<path
								className="st17"
								d="M881.53 450.61L882.99 449.77 883.01 449.75 881.56 450.6z"
							/>
							<path
								className="st22"
								d="M881.56 450.6L883.01 449.75 883.04 449.8 881.58 450.65z"
							/>
							<path
								className="st18"
								d="M870.13 430.86L871.59 430.01 871.59 430.23 870.13 431.08z"
							/>
							<path
								className="st20"
								d="M881.58 450.65L883.04 449.8 884.98 450.92 883.52 451.76z"
							/>
							<path
								className="st18"
								d="M883.52 451.76L884.98 450.92 884.94 475.82 883.48 476.37z"
							/>
							<path
								className="st15"
								d="M880.84 447.1L882.3 446.25 882.29 448.75 880.83 449.59z"
							/>
							<path
								transform="rotate(-30.163 872.973 431.572)"
								className="st23"
								d="M872.01 431.58H873.7V431.59H872.01z"
							/>
							<path
								className="st20"
								d="M870.13 430.86L871.59 430.01 873.58 431.16 872.12 432.01z"
							/>
							<path
								className="st18"
								d="M872.81 433.19L874.27 432.34 874.26 434.84 872.8 435.69z"
							/>
							<path
								className="st22"
								d="M873.04 433.59L874.5 432.74 882.3 446.25 880.84 447.1z"
							/>
							<path
								className="st21"
								d="M873.04 433.59L880.84 447.1 880.83 449.59 880.75 449.45 872.8 435.69 872.81 433.19z"
							/>
							<path
								className="st22"
								d="M872.81 433.19L874.27 432.34 874.5 432.74 873.04 433.59z"
							/>
							<path className="st17" d="M872.12 432.01L872.13 432.01 872.13 432.02z" />
							<path
								className="st20"
								d="M872.12 432.01L873.58 431.16 874.27 431.56 872.81 432.41z"
							/>
							<path
								className="st22"
								d="M872.13 432.01L873.59 431.16 873.59 431.17 872.13 432.02z"
							/>
							<path
								className="st18"
								d="M870.16 417.74L871.62 416.89 871.62 417.11 870.16 417.96z"
							/>
							<path
								className="st18"
								d="M872.81 432.41L874.27 431.56 874.27 432.34 872.81 433.19z"
							/>
							<path
								className="st18"
								d="M872.81 431.87L874.27 431.02 874.27 431.56 872.81 432.41z"
							/>
							<path
								className="st17"
								d="M872.81 431.87L874.27 431.02 874.54 430.87 873.08 431.71z"
							/>
							<path
								className="st18"
								d="M872.82 429.37L874.28 428.52 874.27 431.02 872.81 431.87z"
							/>
							<path
								className="st15"
								d="M880.87 437.28L882.33 436.44 882.32 437.26 880.86 438.11z"
							/>
							<path
								className="st18"
								d="M880.87 437.09L882.33 436.24 882.33 436.44 880.87 437.28z"
							/>
							<path
								className="st15"
								d="M880.87 436.21L882.33 435.36 882.33 436.44 880.87 437.28z"
							/>
							<path
								className="st16"
								d="M873.08 431.71L874.54 430.87 882.33 435.36 880.87 436.21z"
							/>
							<path
								className="st21"
								d="M880.87 436.21L881.07 437.28 880.86 438.11 873.04 433.59 872.81 433.19 872.81 432.41 872.81 431.87 873.08 431.71z"
							/>
							<path
								className="st21"
								d="M872.82 429.37L880.78 424.84 880.9 424.77 880.9 427.26 873.08 431.71 872.81 431.87z"
							/>
							<path
								className="st18"
								d="M872.85 420.26L874.31 419.41 874.28 428.52 872.82 429.37z"
							/>
							<path
								className="st20"
								d="M880.87 437.09L882.33 436.24 885.01 437.79 883.55 438.64z"
							/>
							<path
								className="st21"
								d="M883.55 438.64L883.52 451.76 881.58 450.65 881.56 450.6 881.53 450.61 880.83 450.21 880.83 450.4 880.83 449.59 880.84 447.1 880.86 438.11 880.87 437.28 880.87 437.09z"
							/>
							<path
								className="st18"
								d="M883.55 438.64L885.01 437.79 884.98 450.92 883.52 451.76z"
							/>
							<path
								className="st18"
								d="M872.85 419.29L874.31 418.44 874.31 419.41 872.85 420.26z"
							/>
							<path
								className="st20"
								d="M870.16 417.74L871.62 416.89 874.31 418.44 872.85 419.29z"
							/>
							<path
								className="st18"
								d="M872.85 418.36L874.31 417.51 874.31 418.44 872.85 419.29z"
							/>
							<path
								className="st17"
								d="M872.82 429.37L874.28 428.52 882.24 423.99 880.78 424.84z"
							/>
							<path
								className="st24"
								d="M880.78 424.84L882.24 423.99 882.36 423.92 880.9 424.77z"
							/>
							<path
								className="st21"
								d="M880.61 422.84L880.91 423.35 880.91 424.16 880.9 424.77 880.78 424.84 872.85 420.26 872.85 419.29 872.85 418.36z"
							/>
							<path
								className="st15"
								d="M880.9 424.77L882.36 423.92 882.36 426.41 880.9 427.26z"
							/>
							<path
								className="st15"
								d="M880.91 424.16L882.37 423.31 882.36 423.92 880.9 424.77z"
							/>
							<path
								className="st15"
								d="M880.91 423.35L882.37 422.5 882.37 423.31 880.91 424.16z"
							/>
							<path
								className="st21"
								d="M883.59 425.52L883.55 438.64 880.87 437.09 880.87 437.28 880.87 436.21 880.9 427.26 880.9 424.77 880.91 424.16 880.91 423.97 881.6 424.37 881.66 424.41z"
							/>
							<path
								className="st16"
								d="M872.85 418.36L874.31 417.51 882.07 421.99 880.61 422.84z"
							/>
							<path
								className="st22"
								d="M880.61 422.84L882.07 421.99 882.37 422.5 880.91 423.35z"
							/>
							<path
								className="st18"
								d="M872.88 409.44L874.34 408.59 874.31 417.51 872.85 418.36z"
							/>
							<path
								className="st20"
								d="M880.91 423.97L882.37 423.12 883.06 423.52 881.6 424.37z"
							/>
							<path className="st19" d="M881.63 424.35L881.66 424.41 881.6 424.37z" />
							<path
								className="st20"
								d="M881.6 424.37L883.06 423.52 883.12 423.56 881.66 424.41z"
							/>
							<path
								className="st22"
								d="M881.63 424.35L883.09 423.5 883.12 423.56 881.66 424.41z"
							/>
							<path
								className="st17"
								d="M881.6 424.37L883.06 423.52 883.09 423.5 881.63 424.35z"
							/>
							<path
								className="st18"
								d="M870.2 404.62L871.66 403.77 871.66 403.99 870.2 404.84z"
							/>
							<path
								className="st20"
								d="M881.66 424.41L883.12 423.56 885.05 424.67 883.59 425.52z"
							/>
							<path
								className="st18"
								d="M883.59 425.52L885.05 424.67 885.01 437.79 883.55 438.64z"
							/>
							<path
								className="st15"
								d="M880.91 420.86L882.37 420.01 882.37 422.5 880.91 423.35z"
							/>
							<path
								className="st20"
								d="M870.2 404.62L871.66 403.77 873.65 404.92 872.2 405.77z"
							/>
							<path
								className="st18"
								d="M872.89 406.95L874.34 406.1 874.34 408.59 872.88 409.44z"
							/>
							<path
								className="st22"
								d="M873.19 407.48L874.65 406.64 882.37 420.01 880.91 420.86z"
							/>
							<path
								className="st21"
								d="M873.19 407.48L880.91 420.86 880.91 423.35 880.61 422.84 872.88 409.44 872.89 406.95z"
							/>
							<path
								transform="rotate(-30.197 873.884 406.79)"
								className="st22"
								d="M872.92 406.48H874.61V407.1H872.92z"
							/>
							<path
								transform="rotate(-30.186 872.858 405.336)"
								className="st23"
								d="M872.08 405.34H873.7700000000001V405.34999999999997H872.08z"
							/>
							<path className="st17" d="M872.2 405.77L872.2 405.77 872.21 405.78z" />
							<path
								className="st20"
								d="M872.2 405.77L873.65 404.92 874.35 405.32 872.89 406.17z"
							/>
							<path
								className="st22"
								d="M872.2 405.77L873.66 404.92 873.67 404.93 872.21 405.78z"
							/>
							<path
								className="st18"
								d="M872.89 406.17L874.35 405.32 874.34 406.1 872.89 406.95z"
							/>
							<path
								className="st18"
								d="M872.89 405.63L874.35 404.78 874.35 405.32 872.89 406.17z"
							/>
							<path
								className="st17"
								d="M872.89 405.63L874.35 404.78 874.54 404.67 873.08 405.52z"
							/>
							<path
								className="st18"
								d="M872.9 403.13L874.35 402.28 874.35 404.78 872.89 405.63z"
							/>
							<path
								className="st15"
								d="M880.94 411.04L882.4 410.19 882.4 411.11 880.94 411.96z"
							/>
							<path
								className="st15"
								d="M880.95 410.06L882.4 409.21 882.4 410.19 880.94 411.04z"
							/>
							<path
								className="st18"
								d="M880.94 410.85L882.4 410 882.4 410.19 880.94 411.04z"
							/>
							<path
								className="st16"
								d="M873.08 405.52L874.54 404.67 882.4 409.21 880.95 410.06z"
							/>
							<path
								className="st21"
								d="M880.95 410.06L880.94 411.04 880.94 411.96 873.19 407.48 872.89 406.95 872.89 406.17 872.89 405.63 873.08 405.52z"
							/>
							<path
								className="st18"
								d="M870.24 391.49L871.7 390.65 871.7 390.87 870.24 391.71z"
							/>
							<path
								className="st18"
								d="M872.92 394.1L874.38 393.25 874.35 402.28 872.9 403.13z"
							/>
							<path
								className="st18"
								d="M883.63 412.4L885.09 411.55 885.05 424.67 883.59 425.52z"
							/>
							<path
								className="st21"
								d="M883.63 412.4L883.59 425.52 881.66 424.41 881.63 424.35 881.6 424.37 880.91 423.97 880.91 424.16 880.91 423.35 880.91 420.86 880.94 411.96 880.94 411.04 880.94 410.85z"
							/>
							<path
								className="st20"
								d="M880.94 410.85L882.4 410 885.09 411.55 883.63 412.4z"
							/>
							<path
								className="st18"
								d="M872.92 393.04L874.38 392.2 874.38 393.25 872.92 394.1z"
							/>
							<path
								className="st20"
								d="M870.24 391.49L871.7 390.65 874.38 392.2 872.92 393.04z"
							/>
							<path
								className="st18"
								d="M872.93 392.2L874.38 391.35 874.38 392.2 872.92 393.04z"
							/>
							<path
								className="st17"
								d="M872.9 403.13L874.35 402.28 882.24 397.79 880.78 398.64z"
							/>
							<path
								className="st15"
								d="M880.98 398.52L882.44 397.67 882.43 400.17 880.97 401.02z"
							/>
							<path
								className="st21"
								d="M872.9 403.13L880.78 398.64 880.98 398.52 880.97 401.02 873.08 405.52 872.89 405.63z"
							/>
							<path
								className="st17"
								d="M880.78 398.64L882.24 397.79 882.44 397.67 880.98 398.52z"
							/>
							<path
								className="st15"
								d="M880.98 397.92L882.44 397.07 882.44 397.67 880.98 398.52z"
							/>
							<path
								className="st15"
								d="M880.98 397.11L882.44 396.26 882.44 397.07 880.98 397.92z"
							/>
							<path
								className="st18"
								d="M880.98 397.73L882.44 396.88 882.44 397.07 880.98 397.92z"
							/>
							<path
								transform="rotate(-30.16 881.586 396.499)"
								className="st22"
								d="M880.76 396.27H882.45V396.71H880.76z"
							/>
							<path
								className="st21"
								d="M880.76 396.73L880.98 397.11 880.98 397.92 880.98 398.52 880.78 398.64 872.92 394.1 872.92 393.04 872.93 392.2z"
							/>
							<path
								className="st16"
								d="M872.93 392.2L874.38 391.35 882.22 395.88 880.76 396.73z"
							/>
							<path
								className="st18"
								d="M872.95 383.2L874.41 382.35 874.38 391.35 872.93 392.2z"
							/>
							<path
								className="st20"
								d="M880.98 397.73L882.44 396.88 883.13 397.28 881.67 398.13z"
							/>
							<path
								className="st17"
								d="M881.67 398.13L883.13 397.28 883.16 397.26 881.71 398.11z"
							/>
							<path
								className="st22"
								d="M881.71 398.11L883.16 397.26 883.2 397.31 881.74 398.16z"
							/>
							<path
								className="st20"
								d="M881.74 398.16L883.2 397.31 885.13 398.43 883.67 399.28z"
							/>
							<path
								className="st15"
								d="M880.99 394.62L882.45 393.77 882.44 396.26 880.98 397.11z"
							/>
							<path
								className="st18"
								d="M872.96 380.7L874.42 379.86 874.41 382.35 872.95 383.2z"
							/>
							<path
								className="st22"
								d="M874.03 382.55L875.49 381.7 882.45 393.77 880.99 394.62z"
							/>
							<path
								transform="rotate(-30.178 874.284 381.386)"
								className="st22"
								d="M873.49 380.56H875.1800000000001V382.24H873.49z"
							/>
							<path
								className="st18"
								d="M870.27 378.37L871.73 377.53 871.73 379.61 870.27 380.46z"
							/>
							<path
								className="st22"
								d="M872.96 380.7L874.42 379.86 874.65 380.25 873.19 381.1z"
							/>
							<path
								className="st20"
								d="M870.27 378.37L871.73 377.53 873.73 378.68 872.27 379.52z"
							/>
							<path
								className="st20"
								d="M872.27 379.52L873.73 378.68 874.42 379.08 872.96 379.92z"
							/>
							<path
								className="st22"
								d="M872.28 379.52L873.74 378.67 873.74 378.68 872.28 379.53z"
							/>
							<path
								transform="rotate(-30.178 872.919 379.078)"
								className="st23"
								d="M872.16 379.1H873.85V379.11H872.16z"
							/>
							<path
								className="st18"
								d="M872.96 379.92L874.42 379.08 874.42 379.86 872.96 380.7z"
							/>
							<path
								className="st17"
								d="M873.19 381.1L874.65 380.25 875.46 379.79 874 380.64z"
							/>
							<path
								className="st18"
								d="M872.97 378.74L874.42 377.89 874.42 379.08 872.96 379.92z"
							/>
							<path
								className="st21"
								d="M881.05 374.13L881.04 376.63 874 380.64 873.19 381.1 872.96 380.7 872.96 379.92 872.97 378.74 880.83 374.26z"
							/>
							<path
								className="st21"
								d="M874.03 382.55L880.99 394.62 880.98 397.11 880.76 396.73 872.95 383.2 872.96 380.7 873.19 381.1z"
							/>
							<path
								className="st16"
								d="M875.48 379.8L874 380.64 881.02 384.69 882.48 383.84z"
							/>
							<path
								className="st15"
								d="M881.02 384.69L882.48 383.84 882.47 385.74 881.01 386.58z"
							/>
							<path
								className="st18"
								d="M881.02 384.61L882.48 383.76 882.47 385.79 881.01 386.63z"
							/>
							<path
								className="st21"
								d="M883.7 386.16L883.67 399.28 881.74 398.16 881.71 398.11 881.67 398.13 880.98 397.73 880.98 397.92 880.98 397.11 880.99 394.62 881.01 386.63 881.02 384.61z"
							/>
							<path className="st19" d="M881.71 398.11L881.74 398.16 881.67 398.13z" />
							<path className="st20" d="M881.67 398.13L881.74 398.16 881.7 398.11z" />
							<path
								className="st21"
								d="M883.67 399.28L883.63 412.4 880.94 410.85 880.94 411.04 880.95 410.06 880.97 401.02 880.98 398.52 880.98 397.92 880.98 397.73 881.67 398.13 881.74 398.16z"
							/>
							<path
								className="st18"
								d="M883.67 399.28L885.13 398.43 885.09 411.55 883.63 412.4z"
							/>
							<path className="st17" d="M872.27 379.52L872.28 379.52 872.28 379.53z" />
							<path
								className="st18"
								d="M870.31 367.12L871.77 366.27 871.77 366.49 870.31 367.34z"
							/>
							<path
								className="st21"
								d="M881.02 384.69L881.01 386.58 874.03 382.55 873.19 381.1 874 380.64z"
							/>
							<path
								className="st18"
								d="M872.99 369.73L874.45 368.89 874.42 377.89 872.97 378.74z"
							/>
							<path
								className="st20"
								d="M870.31 367.34L871.77 366.49 874.45 368.05 872.99 368.89z"
							/>
							<path
								className="st18"
								d="M872.99 368.89L874.45 368.05 874.45 368.89 872.99 369.73z"
							/>
							<path
								className="st18"
								d="M873 367.84L874.45 366.99 874.45 368.05 872.99 368.89z"
							/>
							<path
								className="st18"
								d="M883.7 386.16L885.16 385.31 885.13 398.43 883.67 399.28z"
							/>
							<path
								className="st20"
								d="M881.02 384.61L882.48 383.76 885.16 385.31 883.7 386.16z"
							/>
							<path
								className="st17"
								d="M872.97 378.74L874.42 377.89 882.29 373.41 880.83 374.26z"
							/>
							<path
								className="st15"
								d="M881.05 374.13L882.5 373.28 882.5 375.78 881.04 376.63z"
							/>
							<path
								className="st17"
								d="M880.83 374.26L882.29 373.41 882.5 373.28 881.05 374.13z"
							/>
							<path
								className="st18"
								d="M881.05 373.32L882.51 372.47 882.51 372.67 881.05 373.51z"
							/>
							<path
								className="st15"
								d="M881.05 373.32L882.51 372.47 882.5 373.28 881.05 374.13z"
							/>
							<path
								className="st25"
								d="M881.74 373.91L883.2 373.07 883.23 373.12 881.77 373.97z"
							/>
							<path
								className="st20"
								d="M881.05 373.51L882.51 372.67 883.2 373.07 881.74 373.91z"
							/>
							<path
								className="st15"
								d="M881.05 372.72L882.51 371.87 882.51 372.47 881.05 373.32z"
							/>
							<path
								className="st22"
								d="M880.85 372.37L882.31 371.52 882.51 371.87 881.05 372.72z"
							/>
							<path
								className="st21"
								d="M880.85 372.37L881.05 372.72 881.05 373.32 881.05 374.13 880.83 374.26 872.99 369.73 872.99 368.89 873 367.84z"
							/>
							<path
								className="st16"
								d="M873 367.84L874.45 366.99 882.31 371.52 880.85 372.37z"
							/>
							<path
								className="st16"
								d="M881.74 373.91L883.2 373.07 883.26 373.1 881.8 373.95z"
							/>
							<path className="st19" d="M881.74 373.91L881.8 373.95 881.77 373.97z" />
							<path
								className="st26"
								d="M881.77 373.97L883.23 373.12 883.26 373.1 881.8 373.95z"
							/>
							<path
								className="st18"
								d="M873.02 358.81L874.48 357.96 874.45 366.99 873 367.84z"
							/>
							<path
								className="st18"
								d="M870.34 354L871.8 353.15 871.8 353.37 870.34 354.22z"
							/>
							<path
								className="st21"
								d="M881.05 373.32L881.05 373.51 881.74 373.91 881.77 373.97 881.8 373.95 883.73 375.06 883.7 386.16 881.02 384.61 881.01 386.63 881.01 386.58 881.02 384.69 881.04 376.63 881.05 374.13z"
							/>
							<path
								className="st18"
								d="M883.73 375.06L885.19 374.21 885.16 385.31 883.7 386.16z"
							/>
							<path
								className="st20"
								d="M881.8 373.95L883.26 373.1 885.19 374.21 883.73 375.06z"
							/>
							<path
								className="st20"
								d="M870.34 354.22L871.8 353.37 873.8 354.53 872.34 355.37z"
							/>
							<path
								className="st20"
								d="M872.34 355.37L873.8 354.53 874.49 354.93 873.03 355.77z"
							/>
							<path
								className="st16"
								d="M872.34 355.37L873.8 354.52 873.81 354.53 872.35 355.38z"
							/>
							<path className="st17" d="M872.34 355.38L872.34 355.37 872.35 355.38z" />
							<path
								transform="rotate(-30.083 873.174 354.927)"
								className="st17"
								d="M872.23 354.95H873.9200000000001V354.96H872.23z"
							/>
							<path
								className="st15"
								d="M881.06 370.22L882.52 369.37 882.51 371.87 881.05 372.72z"
							/>
							<path
								className="st18"
								d="M873.03 356.32L874.49 355.47 874.48 357.96 873.02 358.81z"
							/>
							<path
								className="st22"
								d="M873.22 356.64L874.67 355.79 882.52 369.37 881.06 370.22z"
							/>
							<path
								className="st21"
								d="M873.03 356.31L873.22 356.64 881.06 370.22 881.05 372.72 880.85 372.37 873.02 358.81z"
							/>
							<path
								className="st22"
								d="M873.03 356.31L874.49 355.47 874.67 355.79 873.22 356.64z"
							/>
							<path
								className="st18"
								d="M873.03 355.77L874.49 354.93 874.49 355.47 873.03 356.32z"
							/>
							<path
								className="st18"
								d="M873.03 354.99L874.49 354.14 874.49 354.93 873.03 355.77z"
							/>
							<path
								className="st17"
								d="M873.03 354.99L874.49 354.14 874.8 353.97 873.34 354.81z"
							/>
							<path
								className="st18"
								d="M873.04 352.49L874.5 351.65 874.49 354.14 873.03 354.99z"
							/>
							<path
								className="st18"
								d="M881.09 360.2L882.55 359.35 882.54 359.55 881.09 360.39z"
							/>
							<path
								className="st15"
								d="M881.09 360.2L882.55 359.35 882.54 360.33 881.08 361.18z"
							/>
							<path
								className="st18"
								d="M870.38 340.88L871.84 340.03 871.84 340.25 870.38 341.1z"
							/>
							<path
								className="st21"
								d="M881.09 359.28L881.09 360.2 881.08 361.18 873.22 356.64 873.03 356.32 873.03 355.77 873.03 354.99 873.34 354.81z"
							/>
							<path
								className="st15"
								d="M881.09 359.28L882.55 358.44 882.55 359.35 881.09 360.2z"
							/>
							<path
								className="st16"
								d="M873.34 354.81L874.8 353.97 882.55 358.44 881.09 359.28z"
							/>
							<path
								className="st18"
								d="M873.06 343.58L874.52 342.73 874.5 351.65 873.04 352.49z"
							/>
							<path
								className="st20"
								d="M881.09 360.39L882.54 359.55 885.23 361.09 883.77 361.94z"
							/>
							<path
								className="st18"
								d="M883.77 361.94L885.23 361.09 885.19 374.21 883.73 375.06z"
							/>
							<path
								className="st21"
								d="M881.09 360.2L881.09 360.39 883.77 361.94 883.73 375.06 881.8 373.95 881.74 373.91 881.05 373.51 881.05 373.32 881.05 372.72 881.06 370.22 881.08 361.18z"
							/>
							<path
								className="st18"
								d="M873.07 342.65L874.53 341.8 874.52 342.73 873.06 343.58z"
							/>
							<path
								className="st20"
								d="M870.38 341.1L871.84 340.25 874.53 341.8 873.07 342.65z"
							/>
							<path
								className="st18"
								d="M873.07 341.68L874.53 340.83 874.53 341.8 873.07 342.65z"
							/>
							<path
								className="st17"
								d="M873.04 352.49L874.5 351.65 882.28 347.21 880.82 348.06z"
							/>
							<path
								className="st15"
								d="M881.12 347.89L882.58 347.04 882.57 349.53 881.12 350.38z"
							/>
							<path
								className="st17"
								d="M880.82 348.06L882.28 347.21 882.58 347.04 881.12 347.89z"
							/>
							<path
								className="st21"
								d="M880.82 348.06L881.12 347.89 881.12 350.38 873.34 354.81 873.03 354.99 873.04 352.49z"
							/>
							<path
								className="st15"
								d="M881.12 347.08L882.58 346.23 882.58 347.04 881.12 347.89z"
							/>
							<path
								className="st21"
								d="M881.01 346.26L881.13 346.47 881.12 347.08 881.12 347.89 880.82 348.06 873.06 343.58 873.07 342.65 873.07 341.68z"
							/>
							<path
								className="st21"
								d="M881.12 347.08L881.12 347.27 881.82 347.67 881.85 347.72 881.88 347.71 883.81 348.82 883.77 361.94 881.09 360.39 881.09 360.2 881.09 359.28 881.12 350.38 881.12 347.89z"
							/>
							<path
								className="st18"
								d="M881.12 347.08L882.58 346.23 882.58 346.42 881.12 347.27z"
							/>
							<path className="st19" d="M881.82 347.67L881.88 347.71 881.85 347.72z" />
							<path
								className="st20"
								d="M881.12 347.27L882.58 346.42 883.28 346.83 881.82 347.67z"
							/>
							<path
								className="st25"
								d="M881.82 347.67L883.28 346.83 883.31 346.88 881.85 347.72z"
							/>
							<path
								className="st15"
								d="M881.13 346.47L882.58 345.63 882.58 346.23 881.12 347.08z"
							/>
							<path
								className="st22"
								d="M881.01 346.26L882.46 345.41 882.58 345.63 881.13 346.47z"
							/>
							<path
								className="st16"
								d="M873.07 341.68L874.53 340.83 882.46 345.41 881.01 346.26z"
							/>
							<path
								className="st26"
								d="M881.85 347.72L883.31 346.88 883.33 346.86 881.88 347.71z"
							/>
							<path
								className="st16"
								d="M881.82 347.67L883.28 346.83 883.33 346.86 881.88 347.71z"
							/>
							<path
								className="st18"
								d="M873.1 332.57L874.55 331.72 874.53 340.83 873.07 341.68z"
							/>
							<path className="st17" d="M872.42 329.14L872.41 329.13 872.42 329.13z" />
							<path
								className="st18"
								d="M870.42 327.75L871.88 326.91 871.88 327.13 870.42 327.98z"
							/>
							<path
								className="st18"
								d="M883.81 348.82L885.27 347.97 885.23 361.09 883.77 361.94z"
							/>
							<path
								className="st20"
								d="M881.88 347.71L883.33 346.86 885.27 347.97 883.81 348.82z"
							/>
							<path
								className="st20"
								d="M870.42 327.98L871.88 327.13 873.87 328.28 872.41 329.13z"
							/>
							<path
								className="st20"
								d="M872.41 329.13L873.87 328.28 874.56 328.68 873.1 329.53z"
							/>
							<path
								className="st16"
								d="M872.41 329.13L873.87 328.28 873.88 328.29 872.42 329.13z"
							/>
							<path
								className="st15"
								d="M881.13 343.98L882.59 343.13 882.58 345.62 881.13 346.47z"
							/>
							<path
								className="st18"
								d="M873.1 330.07L874.56 329.22 874.55 331.72 873.1 332.57z"
							/>
							<path
								className="st22"
								d="M873.37 330.53L874.83 329.68 882.59 343.13 881.13 343.98z"
							/>
							<path
								transform="rotate(-30.16 874.053 329.892)"
								className="st22"
								d="M873.12 329.61H874.8100000000001V330.14H873.12z"
							/>
							<path
								className="st21"
								d="M873.1 330.07L873.37 330.53 881.13 343.98 881.13 346.47 881 346.26 873.09 332.57z"
							/>
							<path
								className="st18"
								d="M873.1 329.53L874.56 328.68 874.56 329.22 873.1 330.07z"
							/>
							<path
								className="st18"
								d="M873.11 328.75L874.57 327.9 874.56 328.68 873.1 329.53z"
							/>
							<path
								className="st17"
								d="M873.11 328.75L874.57 327.9 874.8 327.77 873.34 328.61z"
							/>
							<path
								className="st15"
								d="M881.16 333.96L882.62 333.11 882.62 334.18 881.16 335.03z"
							/>
							<path className="st18" d="M882.62 333.3v-.19.19zm-1.46.66v.19-.19z" />
							<path
								className="st18"
								d="M882.85 336.32L883.41 321.65 885.26 321.22 885.26 348.13 883.41 348.82z"
							/>
							<path
								className="st22"
								d="M872.89 457.5L874.45 456.65 882.78 470.16 881.22 471.01z"
							/>
							<path
								className="st21"
								d="M872.89 457.5L881.22 471.01 881.21 473.5 881.12 473.36 872.64 459.6 872.64 457.1z"
							/>
							<path
								className="st21"
								d="M872.52 455.77L880.49 451.2 880.83 451.01 880.82 453.5 872.52 458.19z"
							/>
							<path
								className="st21"
								d="M883.52 451.76L883.48 476.37 880.79 475.11 880.82 453.5 880.83 451.01 880.83 450.4 880.83 450.21 881.53 450.61 881.58 450.65z"
							/>
							<path
								className="st21"
								d="M870.34 354.22L870.31 367.12 870.31 367.34 870.31 367.34 870.27 380.46 870.24 391.71 870.2 404.84 870.16 417.96 870.13 431.08 870.09 444.2 870.05 469.23 872.52 470.65 872.52 470.65 872.78 444.85 872.8 435.69 872.81 433.19 872.81 432.41 872.12 432.01 870.13 430.86 872.13 432.02 872.81 432.41 872.81 431.87 872.82 429.37 872.85 420.26 872.85 419.29 872.85 418.36 872.88 409.44 872.89 406.95 872.89 406.17 872.89 405.63 872.9 403.13 872.92 394.1 872.92 393.04 872.93 392.2 872.95 383.2 872.96 380.7 872.96 379.92 872.97 378.74 872.99 369.73 872.99 368.89 873 367.84 873.02 358.81 873.03 356.32 873.03 355.77 872.34 355.37z"
							/>
							<path
								className="st21"
								d="M870.42 327.98L870.38 340.88 870.38 341.1 870.38 341.1 870.34 354 870.34 354.22 870.34 354.22 870.34 354.22 872.35 355.38 873.03 355.77 873.03 354.99 873.04 352.49 873.06 343.58 873.07 342.65 873.07 343.34 873.1 334.23 873.1 330.07 873.1 329.53 872.41 329.13z"
							/>
							<path
								className="st18"
								d="M883.01 474.75L884.87 473.74 884.86 474.56 883.01 475.57z"
							/>
							<path
								className="st18"
								d="M883.04 470.49L884.9 469.48 884.87 473.74 883.01 474.75z"
							/>
							<path
								className="st18"
								d="M880.78 465.27L881.5 463.74 881.5 464 880.78 465.53z"
							/>
							<path
								transform="rotate(-28.574 883.121 465.608)"
								className="st23"
								d="M882.05 465.61H884.16V465.62H882.05z"
							/>
							<path
								className="st20"
								d="M880.78 465.27L881.5 463.74 884.03 465.11 882.18 466.12z"
							/>
							<path
								className="st18"
								d="M883.05 467.52L884.91 466.51 884.9 469.48 883.04 470.49z"
							/>
							<path
								className="st22"
								d="M883.05 467.52L884.91 466.51 885.2 466.99 883.35 468z"
							/>
							<path className="st17" d="M882.18 466.12L882.18 466.11 882.19 466.12z" />
							<path
								className="st20"
								d="M882.18 466.12L884.03 465.11 884.91 465.58 883.06 466.59z"
							/>
							<path
								className="st22"
								d="M882.18 466.11L884.04 465.11 884.05 465.12 882.19 466.12z"
							/>
							<path
								className="st18"
								d="M880.83 449.65L881.54 448.12 881.54 448.38 880.83 449.91z"
							/>
							<path
								className="st18"
								d="M883.06 466.59L884.91 465.58 884.91 466.51 883.05 467.52z"
							/>
							<path
								className="st18"
								d="M883.06 465.94L884.91 464.94 884.91 465.58 883.06 466.59z"
							/>
							<path
								className="st17"
								d="M883.06 465.94L884.91 464.94 885.25 464.75 883.4 465.76z"
							/>
							<path
								className="st18"
								d="M883.07 462.98L884.92 461.97 884.91 464.94 883.06 465.94z"
							/>
							<path
								className="st15"
								d="M898.81 475.32L900.67 474.31 900.66 475.3 898.81 476.3z"
							/>
							<path
								className="st18"
								d="M898.81 475.09L900.67 474.08 900.67 474.31 898.81 475.32z"
							/>
							<path
								className="st15"
								d="M898.82 474.04L900.67 473.04 900.67 474.31 898.81 475.32z"
							/>
							<path
								className="st16"
								d="M883.4 465.76L885.25 464.75 900.67 473.04 898.82 474.04z"
							/>
							<path
								className="st21"
								d="M898.82 474.04L898.81 475.32 898.81 476.3 882.8 467.72 883.05 467.52 883.06 466.59 883.06 465.94 883.4 465.76z"
							/>
							<path
								className="st21"
								d="M883.07 462.97L898.7 460.5 898.86 460.42 898.85 463.38 883.4 465.76 883.06 465.94z"
							/>
							<path
								className="st18"
								d="M883.1 452.12L884.95 451.11 884.92 461.97 883.07 462.98z"
							/>
							<path
								className="st20"
								d="M898.81 475.09L900.67 474.08 903.52 475.57 901.66 476.58z"
							/>
							<path
								className="st21"
								d="M898.81 486.03L898.81 480.36 898.81 476.3 898.81 475.32 898.81 475.09 901.66 476.58 901.62 487.78z"
							/>
							<path
								className="st18"
								d="M883.1 450.97L884.96 449.96 884.95 451.11 883.1 452.12z"
							/>
							<path
								className="st20"
								d="M880.83 449.65L881.54 448.12 884.96 449.96 883.1 450.97z"
							/>
							<path
								className="st18"
								d="M883.11 449.86L884.96 448.85 884.96 449.96 883.1 450.97z"
							/>
							<path
								className="st16"
								d="M883.07 462.97L884.92 461.97 900.56 459.49 898.7 460.5z"
							/>
							<path
								className="st24"
								d="M898.7 460.5L900.56 459.49 900.71 459.41 898.86 460.42z"
							/>
							<path
								className="st21"
								d="M898.49 458.12L898.86 458.73 898.86 459.7 898.86 460.42 898.7 460.5 883.1 452.12 883.1 450.97 883.11 449.86z"
							/>
							<path
								className="st15"
								d="M898.86 460.42L900.71 459.41 900.7 462.37 898.85 463.38z"
							/>
							<path
								className="st15"
								d="M898.86 459.7L900.71 458.69 900.71 459.41 898.86 460.42z"
							/>
							<path
								className="st15"
								d="M898.86 458.73L900.72 457.72 900.71 458.69 898.86 459.7z"
							/>
							<path
								className="st21"
								d="M901.71 460.96L901.66 476.58 898.81 475.09 898.81 475.32 898.82 474.04 898.85 463.39 898.86 460.42 898.86 459.7 898.86 459.47 899.74 459.95 899.82 459.99z"
							/>
							<path className="st18" d="M898.86 459.47L898.86 459.7 898.86 459.47z" />
							<path
								className="st16"
								d="M883.11 449.86L884.96 448.85 900.34 457.11 898.49 458.12z"
							/>
							<path
								className="st22"
								d="M898.49 458.12L900.34 457.11 900.72 457.72 898.86 458.73z"
							/>
							<path
								className="st18"
								d="M883.14 439.25L884.99 438.24 884.96 448.85 883.11 449.86z"
							/>
							<path
								className="st20"
								d="M898.86 459.47L900.72 458.46 901.03 458.58 899.74 459.95z"
							/>
							<path className="st19" d="M899.78 459.92L899.82 459.99 899.74 459.95z" />
							<path
								className="st20"
								d="M899.74 459.95L901.03 458.58 901.11 458.63 899.82 459.99z"
							/>
							<path
								className="st22"
								d="M899.78 459.92L901.07 458.56 901.11 458.63 899.82 459.99z"
							/>
							<path
								className="st17"
								d="M899.74 459.95L901.03 458.58 901.07 458.56 899.78 459.92z"
							/>
							<path
								className="st18"
								d="M880.87 434.03L881.59 432.49 881.59 432.76 880.87 434.29z"
							/>
							<path
								className="st20"
								d="M899.82 459.99L901.11 458.63 903.57 459.95 901.71 460.96z"
							/>
							<path
								className="st15"
								d="M898.87 455.76L900.73 454.76 900.72 457.72 898.86 458.73z"
							/>
							<path
								className="st20"
								d="M880.87 434.03L881.59 432.49 884.13 433.87 882.27 434.87z"
							/>
							<path
								className="st18"
								d="M883.15 436.28L885 435.27 884.99 438.24 883.14 439.25z"
							/>
							<path
								className="st22"
								d="M883.54 436.91L885.39 435.9 900.73 454.76 898.87 455.76z"
							/>
							<path
								className="st21"
								d="M883.54 436.91L898.87 455.76 898.86 458.73 898.49 458.12 883.14 439.25 883.15 436.28z"
							/>
							<path
								className="st22"
								d="M883.15 436.28L885 435.27 885.39 435.9 883.54 436.91z"
							/>
							<path
								transform="rotate(-28.55 883.184 434.388)"
								className="st23"
								d="M882.15 434.36H884.26V434.37H882.15z"
							/>
							<path className="st17" d="M882.27 434.87L882.28 434.87 882.29 434.88z" />
							<path
								className="st20"
								d="M882.27 434.87L884.13 433.87 885 434.34 883.15 435.35z"
							/>
							<path
								className="st22"
								d="M882.28 434.87L884.13 433.86 884.14 433.87 882.29 434.88z"
							/>
							<path
								className="st18"
								d="M883.15 435.35L885 434.34 885 435.27 883.15 436.28z"
							/>
							<path
								className="st18"
								d="M883.15 434.7L885.01 433.69 885 434.34 883.15 435.35z"
							/>
							<path
								className="st17"
								d="M883.15 434.7L885.01 433.69 885.25 433.56 883.39 434.57z"
							/>
							<path
								className="st18"
								d="M883.16 431.73L885.02 430.72 885.01 433.69 883.15 434.7z"
							/>
							<path
								className="st15"
								d="M898.91 444.08L900.76 443.07 900.76 444.16 898.91 445.17z"
							/>
							<path
								className="st15"
								d="M898.91 442.91L900.77 441.9 900.76 443.07 898.91 444.08z"
							/>
							<path
								className="st18"
								d="M898.91 443.85L900.76 442.84 900.76 443.07 898.91 444.08z"
							/>
							<path
								className="st16"
								d="M883.39 434.57L885.25 433.56 900.77 441.9 898.91 442.91z"
							/>
							<path
								className="st21"
								d="M898.91 442.91L898.91 444.08 898.91 445.17 883.54 436.91 883.15 436.28 883.15 435.35 883.15 434.7 883.39 434.57z"
							/>
							<path
								className="st18"
								d="M880.92 418.4L881.64 416.87 881.64 417.13 880.92 418.66z"
							/>
							<path
								className="st18"
								d="M883.19 420.98L885.05 419.97 885.02 430.72 883.16 431.73z"
							/>
							<path
								className="st21"
								d="M901.76 445.34L901.71 460.96 899.82 459.99 899.78 459.92 899.74 459.95 898.86 459.47 898.86 459.7 898.86 458.73 898.87 455.76 898.91 445.17 898.91 444.08 898.91 443.85z"
							/>
							<path
								className="st20"
								d="M898.91 443.85L900.76 442.84 903.61 444.33 901.76 445.34z"
							/>
							<path
								className="st18"
								d="M883.2 419.72L885.05 418.71 885.05 419.97 883.19 420.98z"
							/>
							<path
								className="st20"
								d="M880.92 418.4L881.64 416.87 885.05 418.71 883.2 419.72z"
							/>
							<path
								className="st18"
								d="M883.2 418.72L885.05 417.71 885.05 418.71 883.2 419.72z"
							/>
							<path
								className="st16"
								d="M883.16 431.73L885.02 430.72 900.55 428.3 898.7 429.31z"
							/>
							<path
								className="st15"
								d="M898.95 429.17L900.81 428.16 900.8 431.13 898.94 432.14z"
							/>
							<path
								className="st21"
								d="M883.16 431.73L898.7 429.31 898.95 429.17 898.94 432.14 883.39 434.57 883.15 434.7z"
							/>
							<path
								className="st17"
								d="M898.7 429.31L900.55 428.3 900.81 428.16 898.95 429.17z"
							/>
							<path
								className="st15"
								d="M898.95 428.45L900.81 427.44 900.81 428.16 898.95 429.17z"
							/>
							<path
								className="st15"
								d="M898.96 427.49L900.81 426.48 900.81 427.44 898.95 428.45z"
							/>
							<path
								className="st18"
								d="M898.95 428.23L900.81 427.22 900.81 427.44 898.95 428.45z"
							/>
							<path
								className="st22"
								d="M898.68 427.04L900.53 426.03 900.81 426.48 898.96 427.49z"
							/>
							<path
								className="st21"
								d="M898.68 427.04L898.96 427.49 898.95 428.45 898.95 429.17 898.7 429.31 883.19 420.98 883.2 419.72 883.2 418.72z"
							/>
							<path
								className="st16"
								d="M883.2 418.72L885.05 417.71 900.53 426.03 898.68 427.04z"
							/>
							<path
								className="st18"
								d="M883.23 408L885.09 406.99 885.05 417.71 883.2 418.72z"
							/>
							<path
								className="st20"
								d="M898.95 428.23L900.81 427.22 901.13 427.33 899.84 428.7z"
							/>
							<path
								className="st17"
								d="M899.84 428.7L901.13 427.33 901.17 427.31 899.88 428.68z"
							/>
							<path
								className="st22"
								d="M899.88 428.68L901.17 427.31 901.21 427.38 899.92 428.74z"
							/>
							<path
								className="st20"
								d="M899.92 428.74L901.21 427.38 903.66 428.71 901.81 429.71z"
							/>
							<path
								className="st15"
								d="M898.97 424.52L900.82 423.51 900.81 426.48 898.96 427.49z"
							/>
							<path
								className="st18"
								d="M883.24 405.03L885.1 404.02 885.09 406.99 883.23 408z"
							/>
							<path
								className="st22"
								d="M884.6 407.23L886.45 406.22 900.82 423.51 898.97 424.52z"
							/>
							<path
								className="st22"
								d="M883.53 405.5L885.39 404.49 886.45 406.22 884.6 407.23z"
							/>
							<path
								className="st18"
								d="M880.97 402.78L881.68 401.24 881.68 403.73 880.96 405.27z"
							/>
							<path
								className="st22"
								d="M883.24 405.03L885.09 404.02 885.39 404.49 883.53 405.5z"
							/>
							<path
								className="st20"
								d="M880.97 402.78L881.68 401.24 884.22 402.62 882.37 403.63z"
							/>
							<path
								className="st20"
								d="M882.37 403.63L884.22 402.62 885.1 403.09 883.24 404.1z"
							/>
							<path
								className="st22"
								d="M882.37 403.62L884.23 402.61 884.23 402.62 882.38 403.63z"
							/>
							<path
								transform="rotate(-28.567 883.226 403.096)"
								className="st23"
								d="M882.24 403.12H884.35V403.13H882.24z"
							/>
							<path
								className="st18"
								d="M883.24 404.1L885.1 403.09 885.1 404.02 883.24 405.03z"
							/>
							<path
								className="st17"
								d="M883.53 405.5L885.39 404.5 886.42 403.94 884.57 404.95z"
							/>
							<path
								className="st18"
								d="M883.25 402.69L885.1 401.68 885.1 403.09 883.24 404.1z"
							/>
							<path
								className="st21"
								d="M884.6 407.23L898.97 424.52 898.96 427.49 898.68 427.03 883.23 408 883.24 405.03 883.53 405.5z"
							/>
							<path
								className="st16"
								d="M886.44 403.95L884.57 404.95 899 412.7 900.86 411.69z"
							/>
							<path
								className="st15"
								d="M899 412.7L900.86 411.69 900.85 413.95 899 414.96z"
							/>
							<path
								className="st18"
								d="M899 412.6L900.86 411.59 900.85 414.01 899 415.02z"
							/>
							<path
								className="st21"
								d="M901.85 414.09L901.81 429.71 899.92 428.74 899.88 428.68 899.84 428.7 898.95 428.23 898.95 428.45 898.96 427.49 898.97 424.52 899 415.02 899 412.6z"
							/>
							<path className="st19" d="M899.88 428.68L899.92 428.74 899.84 428.7z" />
							<path className="st20" d="M899.84 428.7L899.92 428.74 899.87 428.68z" />
							<path
								className="st21"
								d="M901.81 429.71L901.76 445.34 898.91 443.85 898.91 444.08 898.91 442.91 898.94 432.14 898.95 429.17 898.95 428.45 898.95 428.23 899.84 428.7 899.92 428.74z"
							/>
							<path className="st17" d="M882.37 403.63L882.37 403.62 882.38 403.63z" />
							<path
								className="st18"
								d="M881.01 389.38L881.73 387.85 881.73 388.11 881.01 389.64z"
							/>
							<path
								className="st21"
								d="M899 412.7L899 414.96 884.6 407.23 883.53 405.5 884.57 404.95z"
							/>
							<path
								className="st18"
								d="M883.28 391.97L885.14 390.96 885.1 401.68 883.25 402.69z"
							/>
							<path
								className="st20"
								d="M881.01 389.64L881.73 388.11 885.14 389.96 883.28 390.97z"
							/>
							<path
								className="st18"
								d="M883.28 390.97L885.14 389.96 885.14 390.96 883.28 391.97z"
							/>
							<path
								className="st18"
								d="M883.29 389.71L885.14 388.7 885.14 389.96 883.28 390.97z"
							/>
							<path
								className="st20"
								d="M899 412.6L900.86 411.59 903.71 413.08 901.85 414.09z"
							/>
							<path
								className="st16"
								d="M883.25 402.69L885.1 401.68 900.62 399.27 898.76 400.28z"
							/>
							<path
								className="st15"
								d="M899.04 400.13L900.89 399.13 900.89 402.09 899.03 403.1z"
							/>
							<path
								className="st17"
								d="M898.76 400.28L900.62 399.27 900.89 399.13 899.04 400.13z"
							/>
							<path
								className="st18"
								d="M899.04 399.17L900.9 398.16 900.9 398.39 899.04 399.39z"
							/>
							<path
								className="st15"
								d="M899.04 399.17L900.9 398.16 900.89 399.13 899.04 400.13z"
							/>
							<path
								className="st25"
								d="M899.92 399.87L901.21 398.51 901.25 398.57 899.96 399.94z"
							/>
							<path
								className="st20"
								d="M899.04 399.39L900.9 398.39 901.21 398.51 899.92 399.87z"
							/>
							<path
								className="st15"
								d="M899.05 398.45L900.9 397.44 900.9 398.16 899.04 399.17z"
							/>
							<path
								className="st22"
								d="M898.79 398.03L900.64 397.03 900.9 397.44 899.05 398.45z"
							/>
							<path
								className="st21"
								d="M898.79 398.03L899.05 398.45 899.04 399.17 899.04 400.13 898.76 400.28 883.28 391.97 883.28 390.97 883.29 389.71z"
							/>
							<path
								className="st16"
								d="M883.29 389.71L885.14 388.7 900.64 397.03 898.79 398.03z"
							/>
							<path
								className="st16"
								d="M899.92 399.87L901.21 398.51 901.29 398.55 900 399.91z"
							/>
							<path className="st19" d="M899.92 399.87L900 399.91 899.96 399.94z" />
							<path
								className="st26"
								d="M899.96 399.94L901.25 398.57 901.29 398.55 900 399.92z"
							/>
							<path
								className="st18"
								d="M883.32 378.96L885.18 377.95 885.14 388.7 883.29 389.71z"
							/>
							<path
								className="st18"
								d="M881.05 373.76L881.77 372.23 881.77 372.49 881.05 374.02z"
							/>
							<path
								className="st21"
								d="M899.04 399.17L899.04 399.39 899.92 399.87 899.96 399.94 900 399.92 901.89 400.89 901.85 414.09 899 412.6 899 415.02 899 414.96 899 412.7 899.03 403.1 899.04 400.13z"
							/>
							<path
								className="st20"
								d="M900 399.92L901.29 398.55 903.75 399.88 901.89 400.89z"
							/>
							<path
								className="st20"
								d="M881.05 374.02L881.77 372.49 884.31 373.86 882.45 374.87z"
							/>
							<path
								className="st20"
								d="M882.45 374.87L884.31 373.86 885.19 374.34 883.33 375.34z"
							/>
							<path
								className="st16"
								d="M882.45 374.87L884.31 373.86 884.32 373.87 882.47 374.88z"
							/>
							<path className="st17" d="M882.46 374.88L882.45 374.87 882.47 374.88z" />
							<path
								className="st17"
								d="M882.47 374.88L884.32 373.87 884.32 373.87 882.46 374.88z"
							/>
							<path
								className="st15"
								d="M899.05 395.48L900.91 394.47 900.9 397.44 899.05 398.45z"
							/>
							<path
								className="st18"
								d="M883.33 375.99L885.18 374.98 885.18 377.95 883.32 378.96z"
							/>
							<path
								className="st22"
								d="M883.57 376.38L885.42 375.37 900.91 394.47 899.05 395.48z"
							/>
							<path
								className="st21"
								d="M883.33 375.99L883.57 376.38 899.05 395.48 899.05 398.45 898.79 398.03 883.32 378.96z"
							/>
							<path
								className="st22"
								d="M883.33 375.99L885.18 374.98 885.42 375.37 883.57 376.38z"
							/>
							<path
								className="st18"
								d="M883.33 375.34L885.19 374.34 885.18 374.98 883.33 375.99z"
							/>
							<path
								className="st18"
								d="M883.33 374.42L885.19 373.41 885.19 374.34 883.33 375.34z"
							/>
							<path
								className="st17"
								d="M883.33 374.42L885.19 373.41 885.59 373.19 883.73 374.2z"
							/>
							<path
								className="st18"
								d="M883.34 371.44L885.2 370.43 885.19 373.41 883.33 374.42z"
							/>
							<path
								className="st18"
								d="M899.09 383.55L900.94 382.54 900.94 382.76 899.09 383.77z"
							/>
							<path
								className="st15"
								d="M899.09 383.55L900.94 382.54 900.94 383.7 899.09 384.71z"
							/>
							<path
								className="st18"
								d="M881.1 358.13L881.82 356.6 881.82 356.87 881.1 358.4z"
							/>
							<path
								className="st21"
								d="M899.09 382.45L899.09 383.55 899.09 384.71 883.57 376.38 883.33 375.99 883.33 375.34 883.33 374.42 883.73 374.2z"
							/>
							<path
								className="st15"
								d="M899.09 382.45L900.95 381.44 900.94 382.54 899.09 383.55z"
							/>
							<path
								className="st16"
								d="M883.73 374.2L885.59 373.19 900.95 381.44 899.09 382.45z"
							/>
							<path
								className="st18"
								d="M883.37 360.83L885.23 359.82 885.2 370.43 883.34 371.44z"
							/>
							<path
								className="st20"
								d="M899.09 383.77L900.94 382.76 903.8 384.26 901.94 385.27z"
							/>
							<path
								className="st21"
								d="M899.09 383.55L899.09 383.77 901.94 385.27 901.89 400.89 900 399.92 899.92 399.87 899.04 399.39 899.04 399.17 899.05 398.45 899.05 395.48 899.09 384.71z"
							/>
							<path
								className="st18"
								d="M883.38 359.72L885.23 358.71 885.23 359.82 883.37 360.83z"
							/>
							<path
								className="st20"
								d="M881.1 358.4L881.82 356.87 885.23 358.71 883.38 359.72z"
							/>
							<path
								className="st18"
								d="M883.38 358.57L885.24 357.56 885.23 358.71 883.38 359.72z"
							/>
							<path
								className="st16"
								d="M883.34 371.44L885.2 370.43 900.61 368.08 898.75 369.09z"
							/>
							<path
								className="st15"
								d="M899.13 368.89L900.99 367.88 900.98 370.85 899.13 371.85z"
							/>
							<path
								className="st17"
								d="M898.75 369.09L900.61 368.08 900.99 367.88 899.13 368.89z"
							/>
							<path
								className="st21"
								d="M898.75 369.09L899.13 368.89 899.13 371.85 883.73 374.2 883.33 374.42 883.34 371.44z"
							/>
							<path
								className="st15"
								d="M899.14 367.92L900.99 366.91 900.99 367.88 899.13 368.89z"
							/>
							<path
								className="st21"
								d="M898.99 366.95L899.14 367.2 899.14 367.92 899.13 368.89 898.75 369.09 883.37 360.83 883.38 359.72 883.38 358.57z"
							/>
							<path
								className="st21"
								d="M899.14 367.92L899.14 368.15 900.02 368.63 900.06 368.69 900.09 368.67 901.99 369.64 901.94 385.27 899.09 383.77 899.09 383.55 899.09 382.45 899.13 371.85 899.13 368.89z"
							/>
							<path
								className="st18"
								d="M899.14 367.92L900.99 366.91 900.99 367.14 899.14 368.15z"
							/>
							<path className="st19" d="M900.02 368.63L900.09 368.67 900.06 368.69z" />
							<path
								className="st20"
								d="M899.14 368.15L900.99 367.14 901.31 367.27 900.02 368.63z"
							/>
							<path
								className="st25"
								d="M900.02 368.63L901.31 367.27 901.35 367.33 900.06 368.69z"
							/>
							<path
								className="st15"
								d="M899.14 367.2L900.99 366.19 900.99 366.91 899.14 367.92z"
							/>
							<path
								className="st22"
								d="M898.99 366.95L900.84 365.94 900.99 366.19 899.14 367.2z"
							/>
							<path
								className="st16"
								d="M883.38 358.57L885.24 357.56 900.84 365.94 898.99 366.95z"
							/>
							<path
								className="st26"
								d="M900.06 368.69L901.35 367.33 901.39 367.31 900.09 368.67z"
							/>
							<path
								className="st16"
								d="M900.02 368.63L901.31 367.27 901.39 367.3 900.09 368.67z"
							/>
							<path
								className="st18"
								d="M883.41 347.72L885.27 346.71 885.24 357.56 883.38 358.57z"
							/>
							<path className="st17" d="M882.56 343.63L882.55 343.62 882.56 343.63z" />
							<path
								className="st20"
								d="M900.09 368.67L901.39 367.31 903.84 368.63 901.99 369.64z"
							/>
							<path
								className="st15"
								d="M899.15 364.23L901 363.23 900.99 366.19 899.14 367.2z"
							/>
							<path
								className="st18"
								d="M883.42 344.75L885.28 343.74 885.27 346.71 883.41 347.72z"
							/>
							<path
								className="st22"
								d="M883.76 345.29L885.61 344.29 901 363.23 899.15 364.23z"
							/>
							<path
								className="st21"
								d="M883.42 344.75L883.76 345.29 899.15 364.23 899.14 367.2 898.98 366.95 883.41 347.72z"
							/>
							<path
								className="st21"
								d="M899.18 352.3L899.63 352.59 902.04 354.02 901.99 369.64 900.09 368.67 900.02 368.63 899.14 368.15 899.14 367.92 899.14 367.2 899.15 364.23 899.18 353.57z"
							/>
							<path className="st18" d="M901.04 351.52zm-1.86.78l.2.15-.2-.15z" />
							<path
								d="M902.04 354.02c-.42 138.22-.36 120.49-.42 133.76l1.86-1.01c.07-16.17.39-123.68.42-133.76l-1.86 1.01z"
								fill="#414f56"
							/>
							<path
								className="st20"
								d="M899.49 352.36L901.04 351.52 903.89 353.01 902.04 354.02z"
							/>
							<path
								className="st21"
								d="M883.01 477.12L880.73 475.8 880.83 449.91 880.87 434.29 880.92 418.66 880.96 405.27 881.01 389.64 881.01 389.64 881.01 389.38 881.05 374.02 882.45 374.87 883.33 375.34 883.33 375.99 883.32 378.96 883.29 389.71 883.28 390.97 883.28 391.97 883.25 402.69 883.24 404.1 883.24 405.03 883.23 408 883.2 418.72 883.2 419.72 883.19 420.98 883.16 431.73 883.15 434.7 883.15 435.35 883.15 436.28 883.14 439.25 883.11 449.86 883.1 450.97 883.1 452.12 883.07 462.98 883.06 465.94 883.06 466.59 882.19 466.12 880.78 465.27 882.18 466.12 883.06 466.59 883.05 467.52 883.04 470.49 883.01 474.75 883.01 475.57 883.01 477.12z"
							/>
							<path
								className="st21"
								d="M881.15 342.78L881.1 358.13 881.1 358.4 881.1 358.4 881.05 373.76 881.05 374.02 881.05 374.02 881.05 374.02 882.47 374.88 883.33 375.34 883.33 374.42 883.34 371.44 883.37 360.83 883.38 359.72 883.38 358.57 883.41 347.72 883.42 344.75 883.43 344.1 882.55 343.62z"
							/>
							<path
								className="st21"
								d="M900.11 352.68L899.63 354.89 881.15 344.39 881.15 343.28 881.16 342.13z"
							/>
							<path
								className="st16"
								d="M883.39 342.99L885.28 342.22 903.89 353.01 902.04 354.02z"
							/>
							<path
								className="st21"
								d="M899.04 400.13L899.03 403.1 884.57 404.95 883.53 405.5 883.24 405.03 883.24 404.1 883.25 402.69 898.76 400.28z"
							/>
							<path
								className="st18"
								d="M883.01 475.57L884.98 468.5 884.98 476.21 883.01 477.12z"
							/>
							<path
								className="st18"
								d="M698.99 360.24L700.96 359.25 700.96 370.25 698.99 371.17z"
							/>
							<path className="st18" d="M698.99 369.84l1.86-.35-1.86.35z" />
							<path
								className="st20"
								d="M714.79 379.58L715.83 378.49 716.15 378.62 715.63 380.05z"
							/>
							<path className="st19" d="M715.67 380.03L715.7 380.09 715.63 380.05z" />
							<path
								className="st20"
								d="M715.63 380.05L716.15 378.62 716.23 378.65 715.7 380.09z"
							/>
							<path
								className="st17"
								d="M715.63 380.05L716.15 378.62 716.19 378.59 715.67 380.03z"
							/>
							<path
								className="st22"
								d="M715.67 380.03L716.19 378.59 716.22 378.65 715.7 380.09z"
							/>
							<path
								className="st18"
								d="M696.95 358.42L697.48 356.88 697.48 357.15 696.95 358.68z"
							/>
							<path
								className="st20"
								d="M715.7 380.09L716.23 378.65 718.68 379.99 716.87 380.42z"
							/>
							<path
								className="st15"
								d="M714.79 375.47L715.84 372.47 715.83 378.49 714.79 379.58z"
							/>
							<path
								transform="rotate(-28.654 699.14 358.78)"
								className="st23"
								d="M698.03 358.76H700.14V358.77H698.03z"
							/>
							<path
								className="st20"
								d="M696.95 358.42L697.48 356.88 700.01 358.26 698.16 359.27z"
							/>
							<path
								className="st22"
								d="M699.03 360.68L700.89 359.66 701.18 360.14 699.33 361.16z"
							/>
							<path className="st17" d="M698.16 359.27L698.17 359.27 698.17 359.28z" />
							<path
								className="st20"
								d="M698.16 359.27L700.01 358.26 700.89 358.73 699.04 359.75z"
							/>
							<path
								className="st22"
								d="M698.17 359.27L700.02 358.25 700.03 358.26 698.17 359.28z"
							/>
							<path
								className="st18"
								d="M696.95 342.75L697.52 341.21 697.52 341.48 696.95 343.02z"
							/>
							<path
								className="st18"
								d="M699.04 359.75L700.89 358.73 700.89 359.67 699.03 360.68z"
							/>
							<path
								className="st18"
								d="M699.04 359.1L700.89 358.09 700.89 358.73 699.04 359.75z"
							/>
							<path
								className="st17"
								d="M699.04 359.1L700.89 358.09 701.23 357.9 699.38 358.91z"
							/>
							<path
								className="st18"
								d="M699.05 356.12L700.9 355.11 700.89 358.09 699.04 359.1z"
							/>
							<path
								className="st15"
								d="M714.79 368.5L715.88 367.41 715.88 368.4 714.79 369.49z"
							/>
							<path
								className="st18"
								d="M714.79 368.27L715.88 367.19 715.88 367.41 714.79 368.5z"
							/>
							<path
								className="st15"
								d="M714.8 367.22L715.88 366.14 715.88 367.41 714.79 368.5z"
							/>
							<path
								className="st16"
								d="M699.38 358.91L701.23 357.9 715.88 366.14 714.8 367.22z"
							/>
							<path
								className="st21"
								d="M714.8 367.22L714.79 368.5 714.79 369.49 698.78 360.88 699.03 360.68 699.04 359.75 699.04 359.1 699.38 358.91z"
							/>
							<path
								className="st21"
								d="M699.05 356.12L714.68 353.64 714.84 353.55 714.83 356.53 699.38 358.91 699.04 359.09z"
							/>
							<path
								className="st18"
								d="M699.08 345.23L700.93 344.22 700.9 355.11 699.05 356.12z"
							/>
							<path
								className="st20"
								d="M714.79 368.27L715.88 367.19 718.73 368.68 716.87 369.7z"
							/>
							<path
								className="st21"
								d="M714.79 379.58L714.79 375.48 714.79 369.49 714.79 368.5 714.79 368.27 716.87 369.7 716.87 380.42 715.7 380.09 715.67 380.03 715.63 380.05 714.79 379.58z"
							/>
							<path
								className="st18"
								d="M716.87 369.7L718.73 368.68 718.68 379.99 716.92 380.27z"
							/>
							<path
								className="st18"
								d="M699.08 344.08L700.94 343.07 700.93 344.22 699.08 345.23z"
							/>
							<path
								className="st20"
								d="M696.95 342.75L697.52 341.21 700.94 343.07 699.08 344.08z"
							/>
							<path
								className="st18"
								d="M699.09 342.96L700.94 341.95 700.94 343.07 699.08 344.08z"
							/>
							<path
								className="st16"
								d="M699.05 356.12L700.9 355.11 715.77 352.55 714.68 353.64z"
							/>
							<path
								className="st24"
								d="M714.68 353.64L715.77 352.55 715.92 352.47 714.84 353.55z"
							/>
							<path
								className="st21"
								d="M714.47 351.25L714.84 351.86 714.84 352.83 714.84 353.55 714.68 353.64 699.08 345.23 699.08 344.08 699.09 342.96z"
							/>
							<path
								className="st15"
								d="M714.84 353.55L715.92 352.47 715.92 355.44 714.83 356.53z"
							/>
							<path
								className="st15"
								d="M714.84 352.83L715.93 351.75 715.92 352.47 714.84 353.55z"
							/>
							<path
								className="st15"
								d="M714.84 351.86L715.93 350.78 715.93 351.75 714.84 352.83z"
							/>
							<path
								className="st21"
								d="M716.92 354.03L716.87 369.7 714.79 368.27 714.79 368.5 714.8 367.22 714.83 356.53 714.84 353.55 714.84 352.83 714.84 352.6 715.72 353.08 715.8 353.12z"
							/>
							<path className="st18" d="M714.84 352.6L714.84 352.83 714.84 352.6z" />
							<path
								className="st16"
								d="M699.09 342.96L700.94 341.95 716.32 350.23 714.47 351.25z"
							/>
							<path
								className="st22"
								d="M714.47 351.25L716.32 350.23 715.93 350.78 714.84 351.86z"
							/>
							<path
								className="st18"
								d="M699.12 332.32L700.97 331.31 700.94 341.95 699.09 342.96z"
							/>
							<path
								className="st20"
								d="M714.84 352.6L715.93 351.52 716.24 351.64 715.72 353.08z"
							/>
							<path className="st19" d="M715.76 353.06L715.8 353.12 715.72 353.08z" />
							<path
								className="st20"
								d="M715.72 353.08L716.24 351.64 716.32 351.68 715.8 353.12z"
							/>
							<path
								className="st22"
								d="M715.76 353.06L716.28 351.62 716.32 351.68 715.8 353.12z"
							/>
							<path
								className="st17"
								d="M715.72 353.08L716.24 351.64 716.28 351.62 715.76 353.06z"
							/>
							<path
								className="st18"
								d="M696.95 327.08L697.57 325.55 697.57 325.81 696.95 327.35z"
							/>
							<path
								className="st20"
								d="M715.8 353.12L716.32 351.68 718.78 353.01 716.92 354.03z"
							/>
							<path
								className="st18"
								d="M716.92 354.03L718.78 353.01 718.73 368.68 716.87 369.7z"
							/>
							<path
								className="st15"
								d="M714.85 348.88L715.94 347.8 715.93 350.78 714.84 351.86z"
							/>
							<path
								className="st20"
								d="M696.95 327.08L697.57 325.55 700.11 326.92 698.25 327.93z"
							/>
							<path
								className="st18"
								d="M699.13 329.34L700.98 328.33 700.97 331.31 699.12 332.32z"
							/>
							<path
								className="st22"
								d="M699.52 329.98L701.37 328.96 715.94 347.8 714.85 348.88z"
							/>
							<path
								className="st21"
								d="M699.52 329.98L714.85 348.88 714.84 351.86 714.46 351.25 699.12 332.32 699.13 329.34z"
							/>
							<path
								className="st22"
								d="M699.13 329.34L700.98 328.33 701.37 328.96 699.52 329.98z"
							/>
							<path
								transform="rotate(-28.61 699.125 327.447)"
								className="st23"
								d="M698.13 327.42H700.24V327.43H698.13z"
							/>
							<path className="st17" d="M698.25 327.93L698.26 327.93 698.27 327.94z" />
							<path
								className="st20"
								d="M698.25 327.93L700.11 326.92 700.98 327.4 699.13 328.41z"
							/>
							<path
								className="st22"
								d="M698.26 327.93L700.11 326.92 700.12 326.93 698.27 327.94z"
							/>
							<path
								className="st18"
								d="M699.13 328.41L700.98 327.4 700.98 328.33 699.13 329.34z"
							/>
							<path
								className="st18"
								d="M699.13 327.76L700.99 326.75 700.98 327.4 699.13 328.41z"
							/>
							<path
								className="st17"
								d="M699.13 327.76L700.99 326.75 701.23 326.62 699.37 327.63z"
							/>
							<path
								className="st18"
								d="M699.14 324.78L701 323.77 700.99 326.75 699.13 327.76z"
							/>
							<path
								className="st15"
								d="M714.89 337.16L715.97 336.08 715.97 337.17 714.88 338.25z"
							/>
							<path
								className="st15"
								d="M714.89 335.99L715.98 334.9 715.97 336.08 714.89 337.16z"
							/>
							<path
								className="st18"
								d="M714.89 336.93L715.97 335.85 715.97 336.08 714.89 337.16z"
							/>
							<path
								className="st16"
								d="M699.37 327.63L701.23 326.62 715.98 334.9 714.89 335.99z"
							/>
							<path
								className="st21"
								d="M714.89 335.99L714.89 337.16 714.88 338.25 699.52 329.98 699.13 329.34 699.13 328.41 699.13 327.76 699.37 327.63z"
							/>
							<path
								className="st18"
								d="M696.95 311.41L697.62 309.87 697.62 310.14 696.95 311.67z"
							/>
							<path
								className="st18"
								d="M699.17 314L701.03 312.99 701 323.77 699.14 324.78z"
							/>
							<path
								className="st18"
								d="M716.97 338.36L718.82 337.34 718.78 353.01 716.92 354.03z"
							/>
							<path
								className="st21"
								d="M716.97 338.36L716.92 354.03 715.8 353.12 715.76 353.06 715.72 353.08 714.84 352.6 714.84 352.83 714.84 351.86 714.85 348.88 714.88 338.25 714.89 337.16 714.89 336.93z"
							/>
							<path
								className="st20"
								d="M714.89 336.93L715.97 335.85 718.82 337.34 716.97 338.36z"
							/>
							<path
								className="st18"
								d="M699.18 312.74L701.03 311.73 701.03 312.99 699.17 314z"
							/>
							<path
								className="st20"
								d="M696.95 311.41L697.62 309.87 701.03 311.73 699.18 312.74z"
							/>
							<path
								className="st18"
								d="M699.18 311.73L701.03 310.72 701.03 311.73 699.18 312.74z"
							/>
							<path
								className="st16"
								d="M699.14 324.78L700.99 323.77 715.76 321.27 714.68 322.35z"
							/>
							<path
								className="st15"
								d="M714.93 322.21L716.02 321.13 716.01 324.11 714.92 325.19z"
							/>
							<path
								className="st21"
								d="M699.14 324.78L714.68 322.35 714.93 322.21 714.92 325.19 699.37 327.63 699.13 327.76z"
							/>
							<path
								className="st17"
								d="M714.68 322.35L715.76 321.27 716.02 321.13 714.93 322.21z"
							/>
							<path
								className="st15"
								d="M714.93 321.49L716.02 320.41 716.02 321.13 714.93 322.21z"
							/>
							<path
								className="st15"
								d="M714.94 320.52L716.02 319.44 716.02 320.41 714.93 321.49z"
							/>
							<path
								className="st18"
								d="M714.94 321.26L716.02 320.18 716.02 320.41 714.93 321.49z"
							/>
							<path
								className="st22"
								d="M714.66 320.07L715.75 318.99 716.02 319.44 714.94 320.52z"
							/>
							<path
								className="st21"
								d="M714.66 320.07L714.94 320.52 714.93 321.49 714.93 322.21 714.68 322.35 699.17 314 699.18 312.74 699.18 311.73z"
							/>
							<path
								className="st16"
								d="M699.18 311.73L701.03 310.72 715.75 318.99 714.66 320.07z"
							/>
							<path
								className="st18"
								d="M699.21 300.98L701.07 299.97 701.03 310.72 699.18 311.73z"
							/>
							<path
								className="st20"
								d="M714.94 321.26L716.02 320.18 716.34 320.3 715.82 321.74z"
							/>
							<path
								className="st17"
								d="M715.82 321.74L716.34 320.3 716.38 320.28 715.86 321.72z"
							/>
							<path
								className="st22"
								d="M715.86 321.72L716.38 320.28 716.42 320.34 715.9 321.78z"
							/>
							<path
								className="st20"
								d="M715.9 321.78L716.42 320.34 718.87 321.67 717.02 322.69z"
							/>
							<path
								className="st15"
								d="M714.95 317.55L716.03 316.46 716.02 319.44 714.94 320.52z"
							/>
							<path
								className="st18"
								d="M699.22 298L701.08 296.99 701.07 299.97 699.21 300.98z"
							/>
							<path
								className="st22"
								d="M700.58 300.21L702.43 299.19 716.03 316.46 714.95 317.55z"
							/>
							<path
								className="st22"
								d="M699.51 298.47L701.37 297.46 702.43 299.19 700.58 300.21z"
							/>
							<path
								className="st18"
								d="M696.95 295.74L697.67 294.2 697.66 296.7 696.95 298.24z"
							/>
							<path
								className="st22"
								d="M699.22 298L701.08 296.99 701.37 297.46 699.51 298.47z"
							/>
							<path
								className="st20"
								d="M696.95 295.74L697.67 294.2 700.2 295.58 698.35 296.59z"
							/>
							<path
								className="st20"
								d="M698.35 296.59L700.2 295.58 701.08 296.05 699.23 297.07z"
							/>
							<path
								className="st22"
								d="M698.36 296.59L700.21 295.58 700.21 295.59 698.36 296.6z"
							/>
							<path
								className="st23"
								d="M698.35 296.59L700.2 295.58 700.21 295.58 698.36 296.59z"
							/>
							<path
								className="st18"
								d="M699.23 297.07L701.08 296.05 701.08 296.99 699.22 298z"
							/>
							<path
								className="st17"
								d="M699.51 298.47L701.37 297.46 702.4 296.91 700.55 297.92z"
							/>
							<path
								className="st18"
								d="M699.23 295.65L701.08 294.64 701.08 296.05 699.23 297.07z"
							/>
							<path
								className="st21"
								d="M700.58 300.21L714.95 317.55 714.94 320.52 714.66 320.07 699.21 300.98 699.22 298 699.51 298.47z"
							/>
							<path
								className="st16"
								d="M702.42 296.92L700.55 297.92 714.98 305.69 716.07 304.61z"
							/>
							<path
								className="st15"
								d="M714.98 305.69L716.07 304.61 716.06 306.88 714.98 307.96z"
							/>
							<path
								className="st18"
								d="M714.98 305.59L716.07 304.51 716.06 306.93 714.98 308.02z"
							/>
							<path
								className="st21"
								d="M717.06 307.02L717.02 322.69 715.9 321.78 715.86 321.72 715.82 321.74 714.94 321.26 714.93 321.49 714.94 320.52 714.95 317.55 714.98 308.02 714.98 305.59z"
							/>
							<path className="st19" d="M715.86 321.72L715.9 321.78 715.82 321.74z" />
							<path className="st20" d="M715.82 321.74L715.9 321.78 715.86 321.72z" />
							<path
								className="st21"
								d="M717.02 322.69L716.97 338.36 714.89 336.93 714.89 337.16 714.89 335.99 714.92 325.19 714.93 322.21 714.93 321.49 714.94 321.26 715.82 321.74 715.9 321.78z"
							/>
							<path
								className="st18"
								d="M717.02 322.69L718.87 321.67 718.82 337.34 716.97 338.36z"
							/>
							<path className="st17" d="M698.35 296.59L698.36 296.59 698.36 296.6z" />
							<path
								className="st18"
								d="M696.95 282.3L697.71 280.77 697.71 281.03 696.95 282.57z"
							/>
							<path
								className="st21"
								d="M714.98 305.69L714.98 307.96 700.58 300.21 699.51 298.47 700.55 297.92z"
							/>
							<path
								className="st18"
								d="M699.26 284.9L701.12 283.89 701.08 294.64 699.23 295.65z"
							/>
							<path
								className="st20"
								d="M696.95 282.57L697.71 281.03 701.12 282.88 699.26 283.89z"
							/>
							<path
								className="st18"
								d="M699.26 283.89L701.12 282.88 701.12 283.89 699.26 284.9z"
							/>
							<path
								className="st18"
								d="M699.27 282.63L701.12 281.62 701.12 282.88 699.26 283.89z"
							/>
							<path
								className="st18"
								d="M717.06 307.02L718.92 306.01 718.87 321.67 717.02 322.69z"
							/>
							<path
								className="st20"
								d="M714.98 305.59L716.07 304.51 718.92 306.01 717.06 307.02z"
							/>
							<path
								className="st16"
								d="M699.23 295.65L701.08 294.64 715.83 292.15 714.74 293.24z"
							/>
							<path
								className="st15"
								d="M715.02 293.09L716.1 292 716.1 294.98 715.01 296.07z"
							/>
							<path
								className="st17"
								d="M714.74 293.24L715.83 292.15 716.1 292 715.02 293.09z"
							/>
							<path
								className="st18"
								d="M715.02 292.12L716.11 291.04 716.11 291.26 715.02 292.35z"
							/>
							<path
								className="st15"
								d="M715.02 292.12L716.11 291.04 716.1 292 715.02 293.09z"
							/>
							<path
								className="st25"
								d="M715.9 292.83L716.43 291.39 716.46 291.45 715.94 292.89z"
							/>
							<path
								className="st20"
								d="M715.02 292.35L716.11 291.26 716.43 291.39 715.9 292.83z"
							/>
							<path
								className="st15"
								d="M715.02 291.4L716.11 290.31 716.11 291.04 715.02 292.12z"
							/>
							<path
								className="st22"
								d="M714.77 290.98L715.86 289.9 716.11 290.31 715.02 291.4z"
							/>
							<path
								className="st21"
								d="M714.77 290.98L715.02 291.4 715.02 292.12 715.02 293.09 714.74 293.24 699.26 284.9 699.26 283.89 699.27 282.63z"
							/>
							<path
								className="st16"
								d="M699.27 282.63L701.12 281.62 715.86 289.9 714.77 290.98z"
							/>
							<path
								className="st16"
								d="M715.9 292.83L716.43 291.39 716.51 291.43 715.98 292.87z"
							/>
							<path className="st19" d="M715.9 292.83L715.98 292.87 715.94 292.89z" />
							<path
								className="st26"
								d="M715.94 292.89L716.46 291.45 716.51 291.43 715.98 292.87z"
							/>
							<path
								className="st18"
								d="M699.3 271.85L701.15 270.84 701.12 281.62 699.27 282.63z"
							/>
							<path
								className="st18"
								d="M696.95 266.64L697.75 265.1 697.75 265.36 696.95 266.9z"
							/>
							<path
								className="st21"
								d="M715.02 292.12L715.02 292.35 715.9 292.83 715.94 292.89 715.98 292.87 717.1 293.77 717.06 307.02 714.98 305.59 714.98 308.02 714.98 307.96 714.98 305.69 715.01 296.07 715.02 293.09z"
							/>
							<path
								className="st18"
								d="M717.1 293.77L718.96 292.76 718.92 306.01 717.06 307.02z"
							/>
							<path
								className="st20"
								d="M715.98 292.87L716.51 291.43 718.96 292.76 717.1 293.77z"
							/>
							<path
								className="st20"
								d="M696.95 266.9L697.75 265.36 700.29 266.74 698.43 267.75z"
							/>
							<path
								className="st20"
								d="M698.43 267.75L700.29 266.74 701.17 267.22 699.31 268.23z"
							/>
							<path
								className="st16"
								d="M698.43 267.75L700.29 266.74 700.3 266.74 698.45 267.76z"
							/>
							<path className="st17" d="M698.44 267.76L698.43 267.75 698.45 267.76z" />
							<path
								className="st17"
								d="M698.45 267.76L700.3 266.74 700.3 266.75 698.44 267.76z"
							/>
							<path
								className="st15"
								d="M715.03 288.42L716.12 287.34 716.11 290.31 715.02 291.4z"
							/>
							<path
								className="st18"
								d="M699.31 268.88L701.17 267.86 701.15 270.84 699.3 271.85z"
							/>
							<path
								className="st22"
								d="M699.55 269.26L701.4 268.25 716.12 287.34 715.03 288.42z"
							/>
							<path
								className="st21"
								d="M699.31 268.87L699.55 269.26 715.03 288.42 715.02 291.4 714.77 290.98 699.3 271.85z"
							/>
							<path
								className="st22"
								d="M699.31 268.87L701.16 267.86 701.4 268.25 699.55 269.26z"
							/>
							<path
								className="st18"
								d="M699.31 268.23L701.17 267.22 701.17 267.86 699.31 268.88z"
							/>
							<path
								className="st18"
								d="M699.31 267.29L701.17 266.28 701.17 267.22 699.31 268.23z"
							/>
							<path
								className="st17"
								d="M699.31 267.29L701.17 266.28 701.57 266.07 699.71 267.08z"
							/>
							<path
								className="st18"
								d="M699.32 264.31L701.18 263.3 701.17 266.28 699.31 267.29z"
							/>
							<path
								className="st18"
								d="M715.07 276.45L716.16 275.37 716.15 275.6 715.07 276.68z"
							/>
							<path
								className="st15"
								d="M715.07 276.45L716.16 275.37 716.15 276.54 715.07 277.62z"
							/>
							<path
								className="st18"
								d="M696.95 250.96L697.8 249.43 697.8 249.69 696.95 251.23z"
							/>
							<path
								className="st21"
								d="M715.07 275.36L715.07 276.45 715.07 277.62 699.55 269.26 699.31 268.88 699.31 268.23 699.31 267.29 699.71 267.08z"
							/>
							<path
								className="st15"
								d="M715.07 275.36L716.16 274.27 716.16 275.37 715.07 276.45z"
							/>
							<path
								className="st16"
								d="M699.71 267.08L701.57 266.07 716.16 274.27 715.07 275.36z"
							/>
							<path
								className="st18"
								d="M699.36 253.67L701.21 252.65 701.18 263.3 699.32 264.31z"
							/>
							<path
								className="st20"
								d="M715.07 276.68L716.15 275.6 719.01 277.09 717.15 278.11z"
							/>
							<path
								className="st18"
								d="M717.15 278.11L719.01 277.09 718.96 292.76 717.1 293.77z"
							/>
							<path
								className="st21"
								d="M715.07 276.45L715.07 276.68 717.15 278.11 717.1 293.77 715.98 292.87 715.9 292.83 715.02 292.35 715.02 292.12 715.02 291.4 715.03 288.42 715.07 277.62z"
							/>
							<path
								className="st18"
								d="M699.36 252.55L701.21 251.54 701.21 252.65 699.36 253.67z"
							/>
							<path
								className="st20"
								d="M696.95 251.23L697.8 249.69 701.21 251.54 699.36 252.55z"
							/>
							<path
								className="st18"
								d="M699.36 251.4L701.22 250.39 701.21 251.54 699.36 252.55z"
							/>
							<path
								className="st16"
								d="M699.32 264.31L701.18 263.3 715.82 260.87 714.73 261.95z"
							/>
							<path
								className="st15"
								d="M715.11 261.75L716.2 260.66 716.19 263.64 715.11 264.72z"
							/>
							<path
								className="st17"
								d="M714.73 261.95L715.82 260.87 716.2 260.66 715.11 261.75z"
							/>
							<path
								className="st21"
								d="M714.73 261.95L715.11 261.75 715.11 264.72 699.71 267.08 699.31 267.29 699.32 264.31z"
							/>
							<path
								className="st15"
								d="M715.12 260.78L716.2 259.7 716.2 260.66 715.11 261.75z"
							/>
							<path
								className="st21"
								d="M714.97 259.81L715.12 260.06 715.12 260.78 715.11 261.75 714.73 261.95 699.36 253.67 699.36 252.55 699.36 251.4z"
							/>
							<path
								className="st21"
								d="M715.12 260.78L715.12 261.01 716 261.49 716.04 261.55 716.07 261.53 717.2 262.44 717.15 278.11 715.07 276.68 715.07 276.45 715.07 275.36 715.11 264.73 715.11 261.75z"
							/>
							<path
								className="st18"
								d="M715.12 260.78L716.2 259.7 716.2 259.93 715.12 261.01z"
							/>
							<path className="st19" d="M716 261.49L716.07 261.53 716.04 261.55z" />
							<path
								className="st20"
								d="M715.12 261.01L716.2 259.93 716.52 260.05 716 261.49z"
							/>
							<path
								className="st25"
								d="M716 261.49L716.52 260.05 716.56 260.11 716.04 261.55z"
							/>
							<path
								className="st15"
								d="M715.12 260.06L716.21 258.97 716.2 259.7 715.12 260.78z"
							/>
							<path
								className="st22"
								d="M714.97 259.81L716.05 258.72 716.21 258.97 715.12 260.06z"
							/>
							<path
								className="st16"
								d="M699.36 251.4L701.22 250.39 716.05 258.72 714.97 259.81z"
							/>
							<path
								className="st26"
								d="M716.04 261.55L716.56 260.11 716.6 260.09 716.07 261.53z"
							/>
							<path
								className="st16"
								d="M716 261.49L716.52 260.05 716.6 260.09 716.07 261.53z"
							/>
							<path
								className="st18"
								d="M699.4 240.52L701.25 239.5 701.22 250.39 699.36 251.4z"
							/>
							<path className="st17" d="M698.54 236.42L698.53 236.41 698.54 236.42z" />
							<path
								className="st18"
								d="M717.2 262.44L719.05 261.42 719.01 277.09 717.15 278.11z"
							/>
							<path
								className="st20"
								d="M716.07 261.53L716.6 260.09 719.05 261.42 717.2 262.44z"
							/>
							<path
								className="st15"
								d="M715.13 257.08L716.21 256 716.21 258.97 715.12 260.06z"
							/>
							<path
								className="st18"
								d="M699.4 237.54L701.26 236.52 701.25 239.5 699.4 240.52z"
							/>
							<path
								className="st22"
								d="M699.74 238.09L701.6 237.07 716.21 256 715.13 257.08z"
							/>
							<path
								className="st21"
								d="M699.4 237.54L699.74 238.09 715.13 257.08 715.12 260.06 714.96 259.81 699.39 240.51z"
							/>
							<path
								className="st21"
								d="M715.16 245.11L715.61 245.41 717.25 246.76 717.2 262.44 716.07 261.53 716 261.49 715.12 261.01 715.12 260.78 715.12 260.06 715.13 257.08 715.16 246.39z"
							/>
							<path className="st18" d="M716.25 244.26zm-1.09.85l.2.15-.2-.15z" />
							<path
								className="st18"
								d="M717.25 246.76L719.1 245.75 719.05 261.42 717.2 262.44z"
							/>
							<path
								className="st20"
								d="M715.47 245.17L716.25 244.26 719.1 245.75 717.25 246.76z"
							/>
							<path
								className="st21"
								d="M698.99 371.17L696.95 369.84 696.95 358.85 696.95 343.02 696.95 327.35 696.95 311.67 696.95 298.24 696.95 282.57 696.95 282.57 696.95 282.3 696.95 266.9 698.43 267.75 699.31 268.23 699.31 268.88 699.3 271.85 699.27 282.63 699.26 283.89 699.26 284.9 699.23 295.65 699.23 297.07 699.22 298 699.21 300.98 699.18 311.73 699.18 312.74 699.17 314 699.14 324.78 699.13 327.76 699.13 328.41 699.13 329.34 699.12 332.32 699.09 342.96 699.08 344.08 699.08 345.23 699.05 356.12 699.04 359.1 699.04 359.75 698.17 359.28 696.95 358.42 698.16 359.27 699.04 359.75 699.03 360.68 699.02 363.66 698.99 367.93 698.99 368.75 698.99 371.17z"
							/>
							<path
								className="st21"
								d="M696.95 235.56L696.95 250.96 696.95 251.23 696.95 251.23 696.95 266.64 696.95 266.9 696.95 266.9 696.95 266.9 698.45 267.76 699.31 268.23 699.31 267.29 699.32 264.31 699.36 253.67 699.36 252.55 699.36 251.4 699.4 240.52 699.4 237.54 699.41 236.89 698.53 236.41z"
							/>
							<path
								className="st21"
								d="M716.09 245.5L715.61 247.71 696.95 237.18 696.95 236.07 696.95 234.46z"
							/>
							<path
								className="st16"
								d="M696.95 234.46L698.66 233.8 719.1 245.75 717.25 246.76z"
							/>
							<path
								className="st21"
								d="M715.02 293.09L715.01 296.07 700.55 297.92 699.51 298.47 699.22 298 699.23 297.07 699.23 295.65 714.74 293.24z"
							/>
							<path
								className="st16"
								d="M716.73 380.74L718.18 379.9 718.21 379.91 716.76 380.76z"
							/>
							<path
								className="st17"
								d="M716.76 380.76L718.21 379.91 718.19 379.92 716.75 380.76z"
							/>
							<path
								className="st18"
								d="M714.8 366.35L716.25 365.5 716.25 365.73 714.8 366.57z"
							/>
							<path className="st19" d="M716.75 380.76L716.73 380.74 716.76 380.76z" />
							<path
								className="st18"
								d="M717.43 380.38L718.88 379.54 718.88 380.3 717.43 381.14z"
							/>
							<path
								className="st18"
								d="M717.44 377.9L718.89 377.06 718.88 379.54 717.43 380.38z"
							/>
							<path
								className="st17"
								d="M717.44 377.9L718.88 377.06 726.58 372.68 725.13 373.52z"
							/>
							<path
								className="st18"
								d="M717.46 369.09L718.91 368.25 718.89 377.06 717.44 377.9z"
							/>
							<path
								className="st18"
								d="M717.46 367.89L718.91 367.04 718.91 368.25 717.46 369.09z"
							/>
							<path
								className="st20"
								d="M714.8 366.35L716.25 365.5 718.91 367.04 717.46 367.89z"
							/>
							<path
								className="st18"
								d="M717.47 367.21L718.91 366.37 718.91 367.04 717.46 367.89z"
							/>
							<path
								className="st21"
								d="M717.44 377.9L725.13 373.52 725.46 373.33 725.45 375.8 717.43 380.38z"
							/>
							<path
								className="st17"
								d="M725.13 373.52L726.58 372.68 726.91 372.49 725.46 373.33z"
							/>
							<path
								className="st21"
								d="M725.38 371.78L725.47 371.92 725.46 372.73 725.46 373.33 725.13 373.52 717.46 369.09 717.46 367.89 717.47 367.21z"
							/>
							<path
								className="st15"
								d="M725.46 373.33L726.91 372.49 726.91 374.96 725.45 375.8z"
							/>
							<path
								className="st15"
								d="M725.46 372.73L726.91 371.89 726.91 372.49 725.46 373.33z"
							/>
							<path
								className="st15"
								d="M725.47 371.92L726.91 371.08 726.91 371.89 725.46 372.73z"
							/>
							<path
								className="st18"
								d="M725.46 372.54L726.91 371.69 726.91 371.89 725.46 372.73z"
							/>
							<path
								className="st16"
								d="M717.47 367.21L718.91 366.37 726.83 370.94 725.38 371.78z"
							/>
							<path
								className="st22"
								d="M725.38 371.78L726.83 370.94 726.91 371.08 725.47 371.92z"
							/>
							<path
								className="st18"
								d="M717.49 358.11L718.94 357.27 718.91 366.37 717.47 367.21z"
							/>
							<path
								className="st20"
								d="M725.46 372.54L726.91 371.69 727.61 372.09 726.15 372.93z"
							/>
							<path className="st19" d="M726.18 372.92L726.21 372.97 726.15 372.93z" />
							<path
								className="st20"
								d="M726.15 372.93L727.61 372.09 727.66 372.13 726.21 372.97z"
							/>
							<path
								className="st17"
								d="M726.15 372.93L727.6 372.09 727.63 372.08 726.18 372.92z"
							/>
							<path
								transform="rotate(-30.193 726.984 372.543)"
								className="st22"
								d="M726.08 372.49H727.76V372.55H726.08z"
							/>
							<path
								className="st18"
								d="M714.83 353.32L716.28 352.48 716.28 352.7 714.83 353.54z"
							/>
							<path
								className="st20"
								d="M726.21 372.97L727.66 372.13 729.58 373.23 728.13 374.07z"
							/>
							<path
								className="st21"
								d="M728.13 374.07L728.09 387.3 725.43 385.76 725.45 375.8 725.46 373.33 725.46 372.73 725.46 372.54 726.15 372.93 726.21 372.97z"
							/>
							<path
								className="st15"
								d="M728.13 374.07L729.58 373.23 729.54 386.46 728.09 387.3z"
							/>
							<path
								className="st15"
								d="M725.47 369.45L726.92 368.61 726.91 371.08 725.47 371.92z"
							/>
							<path
								transform="rotate(-30.186 717.465 354.027)"
								className="st23"
								d="M716.7 354.04H718.38V354.05H716.7z"
							/>
							<path
								className="st20"
								d="M714.83 353.32L716.28 352.48 718.27 353.62 716.82 354.46z"
							/>
							<path
								className="st18"
								d="M717.5 355.63L718.95 354.79 718.94 357.27 717.49 358.11z"
							/>
							<path
								className="st22"
								d="M717.73 356.03L719.18 355.19 726.92 368.61 725.47 369.45z"
							/>
							<path
								className="st21"
								d="M717.73 356.03L725.47 369.45 725.47 371.92 725.38 371.78 717.49 358.11 717.5 355.63z"
							/>
							<path
								transform="rotate(-30.152 718.369 355.408)"
								className="st22"
								d="M717.5 355.18H719.18V355.64H717.5z"
							/>
							<path className="st17" d="M716.82 354.46L716.82 354.46 716.83 354.47z" />
							<path
								className="st20"
								d="M716.82 354.46L718.27 353.62 718.95 354.01 717.5 354.86z"
							/>
							<path
								className="st22"
								d="M716.82 354.46L718.27 353.62 718.27 353.63 716.83 354.47z"
							/>
							<path
								className="st18"
								d="M714.87 340.29L716.32 339.45 716.32 339.67 714.87 340.51z"
							/>
							<path
								className="st18"
								d="M717.5 354.86L718.95 354.01 718.95 354.79 717.5 355.63z"
							/>
							<path
								className="st18"
								d="M717.5 354.32L718.95 353.47 718.95 354.01 717.5 354.86z"
							/>
							<path
								className="st17"
								d="M717.5 354.32L718.95 353.47 719.22 353.32 717.77 354.17z"
							/>
							<path
								className="st18"
								d="M717.51 351.84L718.96 351 718.95 353.47 717.5 354.32z"
							/>
							<path
								className="st15"
								d="M725.5 359.7L726.95 358.85 726.95 359.67 725.5 360.52z"
							/>
							<path
								className="st18"
								d="M725.5 359.51L726.95 358.66 726.95 358.85 725.5 359.7z"
							/>
							<path
								className="st15"
								d="M725.5 358.63L726.95 357.79 726.95 358.85 725.5 359.7z"
							/>
							<path
								className="st16"
								d="M717.77 354.17L719.22 353.32 726.95 357.79 725.5 358.63z"
							/>
							<path
								className="st21"
								d="M725.5 358.63L725.5 359.7 725.5 360.52 717.73 356.03 717.5 355.63 717.5 354.86 717.5 354.32 717.77 354.17z"
							/>
							<path
								className="st21"
								d="M717.51 351.84L725.42 347.33 725.54 347.27 725.53 349.74 717.77 354.17 717.5 354.32z"
							/>
							<path
								className="st18"
								d="M717.54 342.79L718.98 341.95 718.96 351 717.51 351.84z"
							/>
							<path
								className="st20"
								d="M725.5 359.51L726.95 358.66 729.62 360.21 728.17 361.05z"
							/>
							<path
								className="st21"
								d="M728.17 361.05L728.13 374.07 726.21 372.97 726.18 372.92 726.15 372.93 725.46 372.54 725.46 372.73 725.47 371.92 725.47 369.45 725.5 360.52 725.5 359.7 725.5 359.51z"
							/>
							<path
								className="st15"
								d="M728.17 361.05L729.62 360.21 729.58 373.23 728.13 374.07z"
							/>
							<path
								className="st18"
								d="M717.54 341.83L718.99 340.99 718.98 341.95 717.54 342.79z"
							/>
							<path
								className="st20"
								d="M714.87 340.29L716.32 339.45 718.99 340.99 717.54 341.83z"
							/>
							<path
								className="st18"
								d="M717.54 340.9L718.99 340.06 718.99 340.99 717.54 341.83z"
							/>
							<path
								className="st17"
								d="M717.51 351.84L718.96 351 726.86 346.49 725.42 347.33z"
							/>
							<path
								className="st24"
								d="M725.42 347.33L726.86 346.49 726.98 346.43 725.54 347.27z"
							/>
							<path
								className="st21"
								d="M725.24 345.35L725.54 345.86 725.54 346.67 725.54 347.27 725.42 347.34 717.54 342.79 717.54 341.83 717.54 340.9z"
							/>
							<path
								className="st15"
								d="M725.54 347.27L726.98 346.43 726.98 348.9 725.53 349.74z"
							/>
							<path
								className="st15"
								d="M725.54 346.67L726.99 345.82 726.98 346.43 725.54 347.27z"
							/>
							<path
								className="st15"
								d="M725.54 345.86L726.99 345.02 726.99 345.82 725.54 346.67z"
							/>
							<path
								className="st21"
								d="M728.21 348.02L728.17 361.05 725.5 359.51 725.5 359.7 725.5 358.63 725.53 349.74 725.54 347.27 725.54 346.67 725.54 346.48 726.23 346.87 726.29 346.91z"
							/>
							<path
								className="st16"
								d="M717.54 340.9L718.99 340.06 726.69 344.51 725.24 345.35z"
							/>
							<path
								className="st22"
								d="M725.24 345.35L726.69 344.51 726.99 345.02 725.54 345.86z"
							/>
							<path
								className="st18"
								d="M717.57 332.05L719.01 331.21 718.99 340.06 717.54 340.9z"
							/>
							<path
								className="st20"
								d="M725.54 346.48L726.99 345.64 727.68 346.03 726.23 346.87z"
							/>
							<path className="st19" d="M726.26 346.86L726.29 346.91 726.23 346.87z" />
							<path
								className="st20"
								d="M726.23 346.87L727.68 346.03 727.74 346.07 726.29 346.91z"
							/>
							<path
								className="st22"
								d="M726.26 346.86L727.71 346.01 727.74 346.07 726.29 346.91z"
							/>
							<path
								className="st17"
								d="M726.23 346.87L727.68 346.03 727.71 346.01 726.26 346.86z"
							/>
							<path
								className="st18"
								d="M714.91 327.26L716.36 326.42 716.36 326.64 714.91 327.48z"
							/>
							<path
								className="st20"
								d="M726.29 346.91L727.74 346.07 729.65 347.18 728.21 348.02z"
							/>
							<path
								className="st15"
								d="M728.21 348.02L729.65 347.18 729.62 360.21 728.17 361.05z"
							/>
							<path
								className="st15"
								d="M725.55 343.39L727 342.54 726.99 345.02 725.54 345.86z"
							/>
							<path
								className="st20"
								d="M714.91 327.26L716.36 326.42 718.34 327.56 716.89 328.4z"
							/>
							<path
								className="st18"
								d="M717.57 329.57L719.02 328.73 719.01 331.21 717.57 332.05z"
							/>
							<path
								className="st22"
								d="M717.88 330.1L719.33 329.26 727 342.54 725.55 343.39z"
							/>
							<path
								className="st21"
								d="M717.88 330.1L725.55 343.39 725.54 345.86 725.24 345.35 717.57 332.05 717.57 329.57z"
							/>
							<path
								className="st22"
								d="M717.57 329.57L719.02 328.73 719.33 329.26 717.88 330.1z"
							/>
							<path
								transform="rotate(-30.152 717.67 327.98)"
								className="st23"
								d="M716.78 327.98H718.4599999999999V327.99H716.78z"
							/>
							<path className="st17" d="M716.89 328.4L716.89 328.4 716.9 328.41z" />
							<path
								className="st20"
								d="M716.89 328.4L718.34 327.56 719.02 327.96 717.57 328.8z"
							/>
							<path
								className="st22"
								d="M716.89 328.4L718.34 327.56 718.35 327.57 716.9 328.41z"
							/>
							<path
								className="st18"
								d="M717.57 328.8L719.02 327.96 719.02 328.73 717.57 329.57z"
							/>
							<path
								className="st18"
								d="M717.58 328.26L719.03 327.42 719.02 327.96 717.57 328.8z"
							/>
							<path
								className="st17"
								d="M717.58 328.26L719.03 327.42 719.22 327.31 717.77 328.15z"
							/>
							<path
								className="st18"
								d="M717.58 325.78L719.03 324.94 719.03 327.42 717.58 328.26z"
							/>
							<path
								className="st15"
								d="M725.57 333.64L727.02 332.8 727.02 333.7 725.57 334.55z"
							/>
							<path
								className="st15"
								d="M725.58 332.66L727.03 331.82 727.02 332.8 725.57 333.64z"
							/>
							<path
								className="st18"
								d="M725.58 333.45L727.02 332.6 727.02 332.8 725.57 333.64z"
							/>
							<path
								className="st16"
								d="M717.77 328.15L719.22 327.31 727.03 331.82 725.58 332.66z"
							/>
							<path
								className="st21"
								d="M725.58 332.66L725.57 333.64 725.57 334.55 717.88 330.1 717.57 329.57 717.57 328.8 717.58 328.26 717.77 328.15z"
							/>
							<path
								className="st18"
								d="M714.94 314.23L716.39 313.38 716.39 313.6 714.94 314.45z"
							/>
							<path
								className="st18"
								d="M717.61 316.82L719.06 315.97 719.03 324.94 717.58 325.78z"
							/>
							<path
								className="st15"
								d="M728.24 334.99L729.69 334.14 729.65 347.18 728.21 348.02z"
							/>
							<path
								className="st21"
								d="M728.24 334.99L728.21 348.02 726.29 346.91 726.26 346.86 726.23 346.87 725.54 346.48 725.54 346.67 725.54 345.86 725.55 343.39 725.57 334.55 725.57 333.64 725.58 333.45z"
							/>
							<path
								className="st20"
								d="M725.58 333.45L727.02 332.6 729.69 334.14 728.24 334.99z"
							/>
							<path
								className="st18"
								d="M717.61 315.77L719.06 314.93 719.06 315.97 717.61 316.82z"
							/>
							<path
								className="st20"
								d="M714.94 314.23L716.39 313.38 719.06 314.93 717.61 315.77z"
							/>
							<path
								className="st18"
								d="M717.61 314.93L719.06 314.09 719.06 314.93 717.61 315.77z"
							/>
							<path
								className="st17"
								d="M717.58 325.78L719.03 324.94 726.86 320.48 725.41 321.32z"
							/>
							<path
								className="st15"
								d="M725.61 321.21L727.06 320.36 727.05 322.84 725.6 323.68z"
							/>
							<path
								className="st21"
								d="M717.58 325.78L725.41 321.32 725.61 321.21 725.6 323.68 717.77 328.15 717.58 328.26z"
							/>
							<path
								className="st17"
								d="M725.41 321.32L726.86 320.48 727.06 320.36 725.61 321.21z"
							/>
							<path
								className="st15"
								d="M725.61 320.61L727.06 319.76 727.06 320.36 725.61 321.21z"
							/>
							<path
								className="st15"
								d="M725.61 319.8L727.06 318.96 727.06 319.76 725.61 320.61z"
							/>
							<path
								className="st18"
								d="M725.61 320.41L727.06 319.57 727.06 319.76 725.61 320.61z"
							/>
							<path
								transform="rotate(-30.131 726.203 319.181)"
								className="st22"
								d="M725.39 318.97H727.0699999999999V319.40000000000003H725.39z"
							/>
							<path
								className="st21"
								d="M725.4 319.42L725.61 319.8 725.61 320.61 725.61 321.21 725.41 321.32 717.61 316.82 717.61 315.77 717.61 314.93z"
							/>
							<path
								className="st16"
								d="M717.61 314.93L719.06 314.09 726.85 318.58 725.4 319.42z"
							/>
							<path
								className="st18"
								d="M717.64 305.99L719.09 305.15 719.06 314.09 717.61 314.93z"
							/>
							<path
								className="st20"
								d="M725.61 320.41L727.06 319.57 727.75 319.97 726.3 320.81z"
							/>
							<path
								className="st17"
								d="M726.3 320.81L727.75 319.97 727.78 319.95 726.33 320.79z"
							/>
							<path
								className="st22"
								d="M726.33 320.79L727.78 319.95 727.81 320.01 726.36 320.85z"
							/>
							<path
								className="st20"
								d="M726.36 320.85L727.81 320.01 729.73 321.11 728.28 321.96z"
							/>
							<path
								className="st15"
								d="M725.62 317.33L727.07 316.48 727.06 318.96 725.61 319.8z"
							/>
							<path
								className="st18"
								d="M717.65 303.51L719.1 302.67 719.09 305.15 717.64 305.99z"
							/>
							<path
								className="st22"
								d="M718.71 305.35L720.15 304.51 727.07 316.48 725.62 317.33z"
							/>
							<path
								className="st22"
								d="M717.87 303.91L719.32 303.06 720.15 304.51 718.71 305.35z"
							/>
							<path
								className="st18"
								d="M714.98 301.2L716.43 300.36 716.43 302.43 714.98 303.27z"
							/>
							<path
								transform="rotate(-30.094 718.397 303.296)"
								className="st22"
								d="M717.65 303.06H719.3299999999999V303.51H717.65z"
							/>
							<path
								className="st20"
								d="M714.98 301.2L716.43 300.36 718.41 301.5 716.96 302.34z"
							/>
							<path
								className="st20"
								d="M716.96 302.34L718.41 301.5 719.1 301.9 717.65 302.74z"
							/>
							<path
								className="st22"
								d="M716.97 302.34L718.42 301.49 718.42 301.51 716.97 302.35z"
							/>
							<path
								transform="rotate(-30.129 717.638 301.944)"
								className="st23"
								d="M716.85 301.92H718.53V301.93H716.85z"
							/>
							<path
								className="st18"
								d="M717.65 302.74L719.1 301.9 719.1 302.67 717.65 303.51z"
							/>
							<path
								className="st17"
								d="M717.87 303.91L719.32 303.06 720.13 302.6 718.68 303.45z"
							/>
							<path
								className="st18"
								d="M717.65 301.56L719.1 300.72 719.1 301.9 717.65 302.74z"
							/>
							<path
								className="st21"
								d="M725.68 296.99L725.67 299.46 718.68 303.45 717.87 303.91 717.65 303.51 717.65 302.74 717.65 301.56 725.46 297.11z"
							/>
							<path
								className="st21"
								d="M718.71 305.35L725.62 317.33 725.61 319.8 725.4 319.42 717.64 305.99 717.65 303.51 717.87 303.91z"
							/>
							<path
								className="st16"
								d="M720.15 302.61L718.68 303.45 725.65 307.47 727.1 306.63z"
							/>
							<path
								className="st15"
								d="M725.65 307.47L727.1 306.63 727.09 308.51 725.64 309.35z"
							/>
							<path
								className="st18"
								d="M725.65 307.39L727.1 306.54 727.09 308.56 725.64 309.4z"
							/>
							<path
								className="st21"
								d="M728.32 308.93L728.28 321.96 726.36 320.85 726.33 320.79 726.3 320.81 725.61 320.41 725.61 320.61 725.61 319.8 725.62 317.33 725.64 309.4 725.65 307.39z"
							/>
							<path className="st19" d="M726.33 320.79L726.36 320.85 726.3 320.81z" />
							<path className="st20" d="M726.3 320.81L726.36 320.85 726.33 320.79z" />
							<path
								className="st21"
								d="M728.28 321.96L728.24 334.99 725.58 333.45 725.57 333.64 725.58 332.66 725.6 323.68 725.61 321.21 725.61 320.61 725.61 320.41 726.3 320.81 726.36 320.85z"
							/>
							<path
								className="st15"
								d="M728.28 321.96L729.73 321.11 729.69 334.14 728.24 334.99z"
							/>
							<path className="st17" d="M716.96 302.34L716.97 302.34 716.97 302.35z" />
							<path
								className="st18"
								d="M715.01 290.02L716.46 289.18 716.46 289.4 715.01 290.24z"
							/>
							<path
								className="st21"
								d="M725.65 307.47L725.64 309.35 718.71 305.35 717.87 303.91 718.68 303.45z"
							/>
							<path
								className="st18"
								d="M717.68 292.62L719.13 291.78 719.1 300.72 717.65 301.56z"
							/>
							<path
								className="st20"
								d="M715.01 290.24L716.46 289.4 719.13 290.94 717.68 291.78z"
							/>
							<path
								className="st18"
								d="M717.68 291.78L719.13 290.94 719.13 291.78 717.68 292.62z"
							/>
							<path
								className="st18"
								d="M717.68 290.73L719.13 289.89 719.13 290.94 717.68 291.78z"
							/>
							<path
								className="st15"
								d="M728.32 308.93L729.76 308.08 729.73 321.11 728.28 321.96z"
							/>
							<path
								className="st20"
								d="M725.65 307.39L727.1 306.54 729.76 308.08 728.32 308.93z"
							/>
							<path
								className="st17"
								d="M717.65 301.56L719.1 300.72 726.91 296.27 725.46 297.11z"
							/>
							<path
								className="st15"
								d="M725.68 296.99L727.13 296.14 727.12 298.62 725.67 299.46z"
							/>
							<path
								className="st17"
								d="M725.46 297.11L726.91 296.27 727.13 296.14 725.68 296.99z"
							/>
							<path
								className="st18"
								d="M725.68 296.18L727.13 295.34 727.13 295.53 725.68 296.37z"
							/>
							<path
								className="st15"
								d="M725.68 296.18L727.13 295.34 727.13 296.14 725.68 296.99z"
							/>
							<path
								className="st25"
								d="M726.37 296.77L727.82 295.93 727.85 295.98 726.4 296.82z"
							/>
							<path
								className="st20"
								d="M725.68 296.37L727.13 295.53 727.82 295.93 726.37 296.77z"
							/>
							<path
								className="st15"
								d="M725.68 295.58L727.13 294.74 727.13 295.34 725.68 296.18z"
							/>
							<path
								className="st22"
								d="M725.48 295.24L726.93 294.4 727.13 294.74 725.68 295.58z"
							/>
							<path
								className="st21"
								d="M725.48 295.24L725.68 295.58 725.68 296.18 725.68 296.99 725.46 297.11 717.68 292.62 717.68 291.78 717.68 290.73z"
							/>
							<path
								className="st16"
								d="M717.68 290.73L719.13 289.89 726.93 294.4 725.48 295.24z"
							/>
							<path
								className="st16"
								d="M726.37 296.77L727.82 295.93 727.88 295.96 726.43 296.8z"
							/>
							<path className="st19" d="M726.37 296.77L726.43 296.8 726.4 296.82z" />
							<path
								className="st26"
								d="M726.4 296.82L727.85 295.98 727.88 295.96 726.43 296.8z"
							/>
							<path
								className="st18"
								d="M717.71 281.77L719.16 280.93 719.13 289.89 717.68 290.73z"
							/>
							<path
								className="st18"
								d="M715.05 276.99L716.5 276.15 716.5 276.37 715.05 277.21z"
							/>
							<path
								className="st21"
								d="M725.68 296.18L725.68 296.37 726.37 296.77 726.4 296.82 726.43 296.8 728.35 297.91 728.32 308.93 725.65 307.39 725.64 309.4 725.64 309.35 725.65 307.47 725.67 299.46 725.68 296.99z"
							/>
							<path
								className="st15"
								d="M728.35 297.91L729.8 297.07 729.76 308.08 728.32 308.93z"
							/>
							<path
								className="st20"
								d="M726.43 296.8L727.88 295.96 729.8 297.07 728.35 297.91z"
							/>
							<path
								className="st20"
								d="M715.05 277.21L716.5 276.37 718.48 277.52 717.03 278.36z"
							/>
							<path
								className="st20"
								d="M717.03 278.36L718.48 277.52 719.17 277.91 717.72 278.75z"
							/>
							<path
								className="st16"
								d="M717.03 278.36L718.48 277.51 718.49 277.52 717.04 278.36z"
							/>
							<path className="st17" d="M717.04 278.37L717.03 278.36 717.04 278.36z" />
							<path
								transform="rotate(-30.147 717.782 277.955)"
								className="st17"
								d="M716.93 277.94H718.6099999999999V277.95H716.93z"
							/>
							<path
								className="st15"
								d="M725.69 293.1L727.14 292.26 727.13 294.74 725.68 295.58z"
							/>
							<path
								className="st18"
								d="M717.71 279.29L719.16 278.45 719.16 280.93 717.71 281.77z"
							/>
							<path
								className="st22"
								d="M717.9 279.62L719.35 278.77 727.14 292.26 725.69 293.1z"
							/>
							<path
								className="st21"
								d="M717.71 279.29L717.9 279.62 725.69 293.1 725.68 295.58 725.48 295.24 717.71 281.77z"
							/>
							<path
								transform="rotate(-30.197 718.58 279.02)"
								className="st22"
								d="M717.69 278.85H719.37V279.22H717.69z"
							/>
							<path
								className="st18"
								d="M717.72 278.75L719.17 277.91 719.16 278.45 717.71 279.29z"
							/>
							<path
								className="st18"
								d="M717.72 277.98L719.17 277.14 719.17 277.91 717.72 278.75z"
							/>
							<path
								className="st17"
								d="M717.72 277.98L719.17 277.14 719.48 276.96 718.03 277.8z"
							/>
							<path
								className="st18"
								d="M717.73 275.5L719.17 274.66 719.17 277.14 717.72 277.98z"
							/>
							<path
								className="st18"
								d="M725.72 283.15L727.17 282.31 727.17 282.5 725.72 283.34z"
							/>
							<path
								className="st15"
								d="M725.72 283.15L727.17 282.31 727.16 283.28 725.71 284.13z"
							/>
							<path
								className="st18"
								d="M715.09 263.96L716.54 263.12 716.54 263.34 715.09 264.18z"
							/>
							<path
								className="st21"
								d="M725.72 282.24L725.72 283.15 725.71 284.13 717.9 279.62 717.71 279.29 717.72 278.75 717.72 277.98 718.03 277.8z"
							/>
							<path
								className="st15"
								d="M725.72 282.24L727.17 281.4 727.17 282.31 725.72 283.15z"
							/>
							<path
								className="st16"
								d="M718.03 277.8L719.48 276.96 727.17 281.4 725.72 282.24z"
							/>
							<path
								className="st18"
								d="M717.75 266.65L719.2 265.81 719.17 274.66 717.73 275.5z"
							/>
							<path
								className="st15"
								d="M728.38 284.88L729.83 284.04 729.8 297.07 728.35 297.91z"
							/>
							<path
								className="st21"
								d="M725.72 283.15L725.72 283.34 728.38 284.88 728.35 297.91 726.43 296.8 726.37 296.77 725.68 296.37 725.68 296.18 725.68 295.58 725.69 293.11 725.71 284.13z"
							/>
							<path
								className="st18"
								d="M717.75 265.72L719.2 264.88 719.2 265.81 717.75 266.65z"
							/>
							<path
								className="st20"
								d="M715.09 264.18L716.54 263.34 719.2 264.88 717.75 265.72z"
							/>
							<path
								className="st18"
								d="M717.76 264.76L719.21 263.92 719.2 264.88 717.75 265.72z"
							/>
							<path
								className="st17"
								d="M717.73 275.5L719.17 274.66 726.9 270.25 725.45 271.09z"
							/>
							<path
								className="st15"
								d="M725.75 270.92L727.2 270.08 727.2 272.56 725.75 273.4z"
							/>
							<path
								className="st17"
								d="M725.45 271.09L726.9 270.25 727.2 270.08 725.75 270.92z"
							/>
							<path
								className="st21"
								d="M725.45 271.09L725.75 270.92 725.75 273.4 718.03 277.8 717.72 277.98 717.73 275.5z"
							/>
							<path
								className="st15"
								d="M725.75 270.12L727.2 269.28 727.2 270.08 725.75 270.93z"
							/>
							<path
								className="st21"
								d="M725.64 269.31L725.76 269.52 725.75 270.12 725.75 270.93 725.45 271.09 717.75 266.65 717.75 265.72 717.76 264.76z"
							/>
							<path
								className="st21"
								d="M725.75 270.12L725.75 270.31 726.44 270.71 726.47 270.76 726.5 270.74 728.42 271.85 728.38 284.88 725.72 283.34 725.72 283.15 725.72 282.24 725.75 273.4 725.75 270.93z"
							/>
							<path
								className="st18"
								d="M725.75 270.12L727.2 269.28 727.2 269.47 725.75 270.31z"
							/>
							<path className="st19" d="M726.44 270.71L726.5 270.74 726.47 270.76z" />
							<path
								className="st20"
								d="M725.75 270.31L727.2 269.47 727.89 269.87 726.44 270.71z"
							/>
							<path
								className="st25"
								d="M726.44 270.71L727.89 269.87 727.92 269.92 726.47 270.76z"
							/>
							<path
								className="st15"
								d="M725.76 269.52L727.2 268.68 727.2 269.28 725.75 270.12z"
							/>
							<path
								className="st22"
								d="M725.64 269.31L727.09 268.47 727.2 268.68 725.76 269.52z"
							/>
							<path
								className="st16"
								d="M717.76 264.76L719.21 263.92 727.09 268.47 725.64 269.31z"
							/>
							<path
								className="st26"
								d="M726.47 270.76L727.92 269.92 727.95 269.9 726.5 270.74z"
							/>
							<path
								className="st16"
								d="M726.44 270.71L727.89 269.87 727.95 269.9 726.5 270.74z"
							/>
							<path
								className="st18"
								d="M717.78 255.71L719.23 254.87 719.21 263.92 717.76 264.76z"
							/>
							<path className="st17" d="M717.11 252.3L717.11 252.3 717.12 252.3z" />
							<path
								className="st18"
								d="M715.12 250.93L716.57 250.09 716.57 250.31 715.12 251.15z"
							/>
							<path
								className="st20"
								d="M715.12 251.15L716.57 250.31 718.56 251.45 717.11 252.3z"
							/>
							<path
								className="st20"
								d="M717.11 252.3L718.56 251.45 719.24 251.85 717.79 252.69z"
							/>
							<path
								className="st16"
								d="M717.11 252.3L718.55 251.45 718.57 251.46 717.12 252.3z"
							/>
							<path
								className="st15"
								d="M725.76 267.04L727.21 266.2 727.2 268.68 725.76 269.52z"
							/>
							<path
								className="st18"
								d="M717.79 253.23L719.24 252.39 719.23 254.87 717.78 255.71z"
							/>
							<path
								className="st22"
								d="M718.05 253.69L719.5 252.85 727.21 266.2 725.76 267.04z"
							/>
							<path
								transform="rotate(-30.14 718.692 253.054)"
								className="st22"
								d="M717.81 252.77H719.4899999999999V253.3H717.81z"
							/>
							<path
								className="st21"
								d="M717.79 253.23L718.05 253.69 725.76 267.04 725.76 269.52 725.64 269.31 717.78 255.71z"
							/>
							<path
								className="st18"
								d="M717.79 252.69L719.24 251.85 719.24 252.39 717.79 253.23z"
							/>
							<path
								className="st18"
								d="M717.79 251.91L719.24 251.08 719.24 251.85 717.79 252.69z"
							/>
							<path
								className="st17"
								d="M717.79 251.91L719.24 251.08 719.47 250.94 718.02 251.78z"
							/>
							<path
								className="st18"
								d="M717.8 249.44L719.25 248.6 719.24 251.08 717.79 251.91z"
							/>
							<path
								className="st15"
								d="M725.79 257.09L727.24 256.25 727.24 257.31 725.79 258.16z"
							/>
							<path
								className="st21"
								d="M725.79 257.09L725.79 257.28 728.46 258.82 728.42 271.85 726.5 270.74 726.44 270.71 725.75 270.31 725.75 270.12 725.76 269.52 725.76 267.05 725.79 258.16z"
							/>
							<path className="st18" d="M727.24 256.44v-.19.19zm-1.45.65v.19-.19z" />
							<path
								className="st16"
								d="M718.02 251.78L719.47 250.94 727.24 255.43 725.79 256.27z"
							/>
							<path
								className="st21"
								d="M725.79 256.27L725.79 257.09 725.79 258.16 718.05 253.69 717.79 253.23 717.79 252.69 717.79 251.91 718.02 251.78z"
							/>
							<path
								className="st15"
								d="M725.79 256.27L727.24 255.43 727.24 256.25 725.79 257.09z"
							/>
							<path
								className="st18"
								d="M715.16 237.9L716.61 237.06 716.61 237.28 715.16 238.12z"
							/>
							<path
								className="st17"
								d="M717.8 249.44L719.25 248.59 727.19 244.07 725.74 244.91z"
							/>
							<path
								className="st18"
								d="M717.83 240.34L719.28 239.5 719.25 248.6 717.8 249.44z"
							/>
							<path
								className="st18"
								d="M717.83 239.66L719.28 238.82 719.28 239.5 717.83 240.34z"
							/>
							<path
								className="st20"
								d="M715.16 238.12L716.61 237.28 719.28 238.82 717.83 239.66z"
							/>
							<path
								className="st18"
								d="M717.83 238.46L719.28 237.61 719.28 238.82 717.83 239.66z"
							/>
							<path
								className="st15"
								d="M725.83 244.87L727.27 244.02 727.27 246.5 725.82 247.34z"
							/>
							<path
								className="st21"
								d="M725.74 244.91L725.83 244.87 725.82 247.34 718.02 251.78 717.79 251.91 717.8 249.44z"
							/>
							<path
								className="st17"
								d="M725.74 244.91L727.19 244.07 727.27 244.02 725.83 244.87z"
							/>
							<path
								className="st15"
								d="M725.83 244.06L727.28 243.22 727.27 244.02 725.83 244.87z"
							/>
							<path
								className="st21"
								d="M725.83 244.06L725.83 244.25 726.52 244.65 726.58 244.52 726.58 244.68 728.5 245.79 728.46 258.82 725.79 257.28 725.79 257.09 725.79 256.27 725.82 247.34 725.83 244.87z"
							/>
							<path className="st18" d="M725.83 244.06v.19-.19z" />
							<path
								className="st20"
								d="M725.83 244.25L727.28 243.41 727.96 243.81 726.52 244.65z"
							/>
							<path
								className="st15"
								d="M725.83 243.46L727.28 242.62 727.28 243.22 725.83 244.06z"
							/>
							<path
								className="st21"
								d="M725.49 242.88L725.83 243.46 725.83 244.06 725.83 244.87 725.74 244.91 717.83 240.34 717.83 239.66 717.83 238.46z"
							/>
							<path
								className="st16"
								d="M717.83 238.46L719.28 237.61 726.94 242.04 725.49 242.88z"
							/>
							<path
								className="st16"
								d="M726.52 244.65L727.96 243.81 728.03 243.84 726.58 244.68z"
							/>
							<path
								className="st26"
								d="M726.6 244.59L728 243.86 728.03 243.84 726.58 244.68z"
							/>
							<path
								className="st18"
								d="M717.86 229.65L719.3 228.81 719.28 237.61 717.83 238.46z"
							/>
							<path
								className="st20"
								d="M726.58 244.68L728.03 243.84 729.94 244.95 728.5 245.79z"
							/>
							<path
								className="st15"
								d="M725.84 240.98L727.29 240.14 727.28 242.62 725.83 243.46z"
							/>
							<path
								className="st20"
								d="M715.2 224.87L716.65 224.03 718.62 225.17 717.17 226.01z"
							/>
							<path
								className="st18"
								d="M717.86 227.17L719.31 226.33 719.3 228.81 717.86 229.65z"
							/>
							<path
								className="st21"
								d="M727.28 242.62L726.02 243.84 717.41 228.92 719.3 228.81z"
							/>
							<path
								className="st20"
								d="M717.17 226.01L718.62 225.17 718.65 225.18 717.2 226.03z"
							/>
							<path
								className="st21"
								d="M715.05 277.21L715.01 290.02 715.01 290.24 715.01 290.24 714.98 303.27 714.94 314.45 714.91 327.48 714.87 340.51 714.83 353.54 714.8 366.57 714.76 379.6 716.73 380.74 716.76 380.76 717.43 381.14 717.43 380.38 717.44 377.9 717.46 369.09 717.46 367.89 717.47 367.21 717.49 358.11 717.5 355.63 717.5 354.86 716.82 354.46 714.83 353.32 716.83 354.47 717.5 354.86 717.5 354.32 717.51 351.84 717.54 342.79 717.54 341.83 717.54 340.9 717.57 332.05 717.57 329.57 717.57 328.8 717.58 328.26 717.58 325.78 717.61 316.82 717.61 315.77 717.61 314.93 717.64 305.99 717.65 303.51 717.65 302.74 717.65 301.56 717.68 292.62 717.68 291.78 717.68 290.73 717.71 281.77 717.71 279.29 717.72 278.75 717.03 278.36z"
							/>
							<path
								className="st21"
								d="M715.12 251.15L715.09 263.96 715.09 264.18 715.09 264.18 715.05 276.99 715.05 277.21 715.05 277.21 715.05 277.21 717.04 278.36 717.72 278.75 717.72 277.98 717.73 275.5 717.75 266.65 717.75 265.72 717.76 264.76 717.78 255.71 717.79 253.23 717.79 252.69 717.11 252.3z"
							/>
							<path
								className="st21"
								d="M717.2 226.03L717.17 226.01 715.2 224.87 715.16 237.9 715.16 238.12 715.16 238.12 715.12 250.93 715.12 251.15 715.12 251.15 715.12 251.15 717.12 252.3 717.79 252.69 717.79 251.91 717.8 249.44 717.83 240.34 717.83 239.66 717.83 238.46 717.86 229.65 717.86 227.17 717.86 226.41z"
							/>
							<path
								className="st18"
								d="M717.86 226.41L719.31 225.57 719.31 226.33 717.86 227.17z"
							/>
							<path
								className="st20"
								d="M717.2 226.03L718.65 225.18 719.31 225.57 717.86 226.41z"
							/>
							<path
								className="st20"
								d="M725.86 231.03L715.21 224.87 716.68 224.03 729.98 231.52 728.68 232.57z"
							/>
							<path
								className="st21"
								d="M728.53 232.57L728.5 245.79 726.58 244.68 726.52 244.65 725.83 244.25 725.83 244.06 725.83 243.46 725.84 240.99 725.86 231.03z"
							/>
							<path
								className="st16"
								d="M727.29 240.14L727.28 242.62 719.3 228.81 719.31 227.86 720.27 227.99z"
							/>
							<g className="st8">
								<path
									fill="#292f35"
									d="M717.17 226.01L718.62 225.17 718.63 225.16 717.18 226z"
								/>
								<path
									className="st22"
									d="M717.18 226L718.63 225.16 718.65 225.18 717.2 226.02z"
								/>
								<path className="st19" d="M717.17 226.01L717.18 226 717.2 226.02z" />
							</g>
							<path
								className="st21"
								d="M881.12 320.3L881.12 320.51 883.41 321.65 883.34 348.55 881.88 347.71 881.82 347.67 881.12 347.27 881.12 347.08 881.13 346.47 881.13 343.98 881.16 335.03z"
							/>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_1_"
											className="st8"
											d="M745.29 259.43l-.57.33c-.01.01-.03.01-.03.02-.04.02-.07.04-.11.06.24-.14.57-.12.93.09l.71-.41c-.36-.2-.69-.22-.93-.09z"
										/>
									</defs>
									<clipPath id="SVGID_00000146460854133063879820000012741836197204079295_">
										<use xlinkHref="#SVGID_1_" overflow="visible" />
									</clipPath>
									<g clipPath="url(#SVGID_00000146460854133063879820000012741836197204079295_)">
										<path
											className="st30"
											d="M745.51 259.94l.71-.41c-.36-.21-.7-.23-.93-.09l-.71.41c.24-.14.57-.12.93.09z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000008844815879603636030000013992944034486456466_"
											className="st8"
											d="M746.44 263.05l.71-.41c.23-.14.38-.43.38-.84 0-.83-.58-1.85-1.31-2.27l-.71.41c.73.42 1.31 1.43 1.31 2.27 0 .41-.15.71-.38.84z"
										/>
									</defs>
									<clipPath id="SVGID_00000161614364568530199050000015050671982101133997_">
										<use
											xlinkHref="#SVGID_00000008844815879603636030000013992944034486456466_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000161614364568530199050000015050671982101133997_)">
										<path
											className="st32"
											d="M746.44 263.05l.71-.41c.23-.14.38-.43.38-.84 0-.83-.58-1.85-1.31-2.27l-.71.41c.73.42 1.31 1.43 1.31 2.27 0 .41-.15.71-.38.84z"
										/>
									</g>
								</g>
								<path
									className="st33"
									d="M745.51 259.94c-.72-.42-1.32-.08-1.32.75s.58 1.85 1.31 2.27c.73.42 1.32.08 1.32-.75 0-.84-.58-1.85-1.31-2.27z"
								/>
							</g>
							<path
								className="st34"
								d="M745.61 254.08L743.8 253.03 743.81 260.47 745.63 261.52z"
							/>
							<path
								className="st35"
								d="M741.16 259.68c-.4-.31-1.27.01-1.93.7-.67.69-.88 1.5-.48 1.8.4.31 1.26-.01 1.93-.7.67-.69.89-1.5.48-1.8z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000111903072405803326310000017642717003166853274_"
										className="st8"
										d="M738.34 265.54c.82.87 4.47 1.34 6.2-.45 1.58-1.64.91-4.69.11-5.54-.11-.1-.25-.24-.37-.33-.87-.66-2.2-.49-3.12.46.4.3.19 1.11-.48 1.8-.67.69-1.53 1-1.93.7-.4-.31-.19-1.11.48-1.8.66-.69 1.53-1 1.93-.7.91-.95 2.25-1.12 3.12-.46-3.5-2.53-8.89 2.94-5.94 6.32z"
									/>
								</defs>
								<clipPath id="SVGID_00000024705482905762666380000003286997987685023931_">
									<use
										xlinkHref="#SVGID_00000111903072405803326310000017642717003166853274_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M738.89 260.18c1.29-1.31 3.47-2.34 5.39-.96-.87-.66-2.2-.49-3.12.46-.4-.31-1.27.01-1.93.7-.67.69-.88 1.5-.48 1.8.4.31 1.26-.01 1.93-.7.67-.69.88-1.5.48-1.8.91-.95 2.25-1.12 3.12-.46.11.1.26.23.37.33.8.84 1.47 3.9-.11 5.54-1.73 1.8-5.38 1.32-6.2.45-1.76-2.01-.48-4.32.55-5.36z"
									clipPath="url(#SVGID_00000024705482905762666380000003286997987685023931_)"
									fill="#425056"
								/>
								<path
									d="M744.28 259.21c1.23.97 1.92 3.7 1 4.99-.16-1.44-3.35-.99-3.65-.31-.18.42.99 2.11 1.76 2.19-1.4 1-4.12.18-4.9-.41-1.25-.96-1.49-3.44.24-5.3 1.86-2 3.8-1.81 3.58-1.8.72.02 1.4.19 1.97.64-.87-.66-2.2-.49-3.12.46-.4-.31-1.27.01-1.93.7-.67.69-.88 1.5-.48 1.8.4.31 1.26-.01 1.93-.7.67-.69.88-1.5.48-1.8.92-.94 2.25-1.12 3.12-.46z"
									clipPath="url(#SVGID_00000024705482905762666380000003286997987685023931_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000031901898570817120760000018142283023421551748_"
										className="st8"
										d="M744.65 259.55c-.11-.1-.25-.24-.37-.33.1.07.33.29.37.33z"
									/>
								</defs>
								<clipPath id="SVGID_00000122696065196308147220000012688889389896893351_">
									<use
										xlinkHref="#SVGID_00000031901898570817120760000018142283023421551748_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M744.65 259.55c-.11-.1-.25-.24-.37-.33.1.07.33.29.37.33z"
									clipPath="url(#SVGID_00000122696065196308147220000012688889389896893351_)"
									fill="#425056"
								/>
								<path
									d="M744.51 259.42c.15.11.25.23-.04-.05l-.19-.16c.08.07.16.13.23.21z"
									clipPath="url(#SVGID_00000122696065196308147220000012688889389896893351_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000152966796885653654170000002602243773235706558_"
										className="st8"
										d="M743.81 271.14c1 .76 3.16-.02 4.83-1.74 1.58-1.64 2.14-3.54 1.34-4.38-1.37-1.44-3.97-4.04-5.33-5.48.8.84 1.47 3.9-.11 5.54-1.73 1.8-5.38 1.32-6.2.45.1.11 5.39 5.54 5.47 5.61z"
									/>
								</defs>
								<clipPath id="SVGID_00000093896018247300503950000017880320859012346784_">
									<use
										xlinkHref="#SVGID_00000152966796885653654170000002602243773235706558_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M743.67 271.01l-5.33-5.47c.61.64 3.57 1.59 5.04.54l4.1 4.31c-1.25.89-2.99 1.49-3.81.62z"
									clipPath="url(#SVGID_00000093896018247300503950000017880320859012346784_)"
									fill="#425056"
								/>
								<path
									d="M747.48 270.39l-4.1-4.31c.7-.5 1.37-1.16 1.89-1.88l4.1 4.31c-.48.69-1.14 1.36-1.89 1.88z"
									clipPath="url(#SVGID_00000093896018247300503950000017880320859012346784_)"
									fill="#b3b9bb"
								/>
								<path
									d="M749.38 268.52l-4.1-4.31c1-1.39.03-3.96-.63-4.66l5.33 5.48c.66.69.39 2.1-.6 3.49z"
									clipPath="url(#SVGID_00000093896018247300503950000017880320859012346784_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000085251991852623551050000010566092767290133916_"
										className="st8"
										d="M744.28 259.21c-3.61-2.53-8.9 3.08-5.94 6.32-.8-.84-.24-2.74 1.34-4.38 1.66-1.72 3.82-2.5 4.82-1.74-.06-.07-.14-.13-.22-.2z"
									/>
								</defs>
								<clipPath id="SVGID_00000132090124537455992290000006547342968950071454_">
									<use
										xlinkHref="#SVGID_00000085251991852623551050000010566092767290133916_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M744.28 259.21c-3.62-2.54-8.88 3.1-5.94 6.32-.8-.84-.24-2.74 1.34-4.38 1.66-1.72 3.82-2.5 4.82-1.74-.06-.07-.14-.13-.22-.2z"
									clipPath="url(#SVGID_00000132090124537455992290000006547342968950071454_)"
									fill="#425056"
								/>
								<path
									d="M738.95 262.04c.09-.3-.08-.65.61-1.33.56-.55 1.17-.55 1.28-.54 1.4-1 2.89-1.34 3.67-.75-.98-1.03-3.22-1.45-5.44.58-1.32 1.2-2.43 3.68-.73 5.54-.66-.7-.39-2.11.61-3.5z"
									clipPath="url(#SVGID_00000132090124537455992290000006547342968950071454_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000127752587922655790370000006448740830559919775_"
										className="st8"
										d="M749.98 265.02c-.11-.11-5.39-5.54-5.48-5.6 5.74 5.88 5.48 5.6 5.48 5.6z"
									/>
								</defs>
								<clipPath id="SVGID_00000114035137703548358680000003399524836833257860_">
									<use
										xlinkHref="#SVGID_00000127752587922655790370000006448740830559919775_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M749.98 265.02c-.1-.11-5.36-5.52-5.48-5.6 5.74 5.88 5.48 5.6 5.48 5.6z"
									clipPath="url(#SVGID_00000114035137703548358680000003399524836833257860_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000152242271806615770580000009413927625952556689_"
										className="st8"
										d="M738.34 265.54l5.33 5.47c-.8-.84-.24-2.74 1.34-4.38 1.66-1.72 3.82-2.5 4.83-1.74l-5.33-5.47c-1-.76-3.16.02-4.82 1.74-1.58 1.64-2.15 3.54-1.35 4.38z"
									/>
								</defs>
								<clipPath id="SVGID_00000047745454228797664150000007669228536457755270_">
									<use
										xlinkHref="#SVGID_00000152242271806615770580000009413927625952556689_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M749.84 264.89l-5.33-5.47c-.78-.6-2.27-.25-3.67.74l5.33 5.47c1.41-.99 2.89-1.33 3.67-.74z"
									clipPath="url(#SVGID_00000047745454228797664150000007669228536457755270_)"
									fill="#425056"
								/>
								<path
									d="M746.17 265.64l-5.33-5.47c-.73.51-1.39 1.18-1.89 1.88l5.33 5.47a8.03 8.03 0 011.89-1.88z"
									clipPath="url(#SVGID_00000047745454228797664150000007669228536457755270_)"
									fill="#6e8489"
								/>
								<path
									d="M744.28 267.52l-5.33-5.47c-1 1.39-1.26 2.8-.61 3.5l5.33 5.47c-.66-.7-.39-2.12.61-3.5z"
									clipPath="url(#SVGID_00000047745454228797664150000007669228536457755270_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st35"
								d="M749.84 264.89c-1-.76-3.16.02-4.83 1.74-1.66 1.72-2.2 3.74-1.2 4.5 1 .76 3.16-.02 4.83-1.74 1.66-1.72 2.2-3.73 1.2-4.5z"
							/>
							<path
								className="st44"
								d="M749.42 265.33c-.86-.66-2.72.01-4.15 1.5-1.43 1.48-1.89 3.22-1.03 3.88.86.66 2.72-.01 4.15-1.5 1.43-1.49 1.89-3.23 1.03-3.88z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000103980643432116936710000016636618887264369339_"
										className="st8"
										d="M745.22 253.22l-1.81-1.05c.24.14.39.43.39.86l1.81 1.05c0-.42-.15-.72-.39-.86z"
									/>
								</defs>
								<clipPath id="SVGID_00000075880872717659821470000005422570492966766513_">
									<use
										xlinkHref="#SVGID_00000103980643432116936710000016636618887264369339_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M745.22 253.22l-1.81-1.05c.24.14.39.43.39.86l1.81 1.05c0-.42-.15-.72-.39-.86z"
									clipPath="url(#SVGID_00000075880872717659821470000005422570492966766513_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000021096339905082529290000001643415183627367344_"
										className="st8"
										d="M745.49 252.76l-1.38-.79c-.31-.18-.74-.16-1.22.12l1.38.79c.48-.28.91-.3 1.22-.12z"
									/>
								</defs>
								<clipPath id="SVGID_00000127742195128475638500000015862448198887730870_">
									<use
										xlinkHref="#SVGID_00000021096339905082529290000001643415183627367344_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M745.49 252.76l-1.38-.79c-.31-.18-.74-.16-1.22.12l1.38.79c.48-.28.91-.3 1.22-.12z"
									clipPath="url(#SVGID_00000127742195128475638500000015862448198887730870_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st34"
								d="M740.25 257.17L738.87 256.38 738.88 263.82 740.27 264.62z"
							/>
							<path
								className="st47"
								d="M744.27 252.88L742.89 252.08 740.58 253.42 741.96 254.21z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000099620104873695016070000011942553502314471839_"
										className="st8"
										d="M741.96 254.21l-1.38-.79c-.95.55-1.71 1.87-1.71 2.96l1.38.79c0-1.09.76-2.41 1.71-2.96z"
									/>
								</defs>
								<clipPath id="SVGID_00000019639025413237922070000004196921743811741117_">
									<use
										xlinkHref="#SVGID_00000099620104873695016070000011942553502314471839_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M741.96 254.21l-1.38-.79c-.27.15-.52.37-.75.63l1.38.79c.23-.26.48-.47.75-.63z"
									clipPath="url(#SVGID_00000019639025413237922070000004196921743811741117_)"
									fill="#425056"
								/>
								<path
									d="M741.21 254.84l-1.38-.79c-.27.31-.5.67-.67 1.05l1.38.79c.17-.38.4-.74.67-1.05z"
									clipPath="url(#SVGID_00000019639025413237922070000004196921743811741117_)"
									fill="#b3b9bb"
								/>
								<path
									d="M740.55 255.89l-1.38-.79c-.19.43-.3.87-.3 1.29l1.38.79c0-.42.11-.87.3-1.29z"
									clipPath="url(#SVGID_00000019639025413237922070000004196921743811741117_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st50"
								d="M741.96 254.21c-.95.55-1.71 1.88-1.71 2.96l.02 7.45.38-.22-.02-7.45c0-.85.6-1.88 1.33-2.3l2.31-1.33c.74-.42 1.34-.08 1.34.76l-.05 6.4.38.39.06-7.01c0-1.09-.78-1.53-1.72-.98l-2.32 1.33z"
							/>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000129906499550051191180000010899528167466124960_"
											className="st8"
											d="M739.05 261.9l-.57.33c-.01.01-.03.02-.04.02-.03.02-.07.04-.11.06.24-.14.57-.12.93.09l.71-.41c-.35-.21-.68-.23-.92-.09z"
										/>
									</defs>
									<clipPath id="SVGID_00000062153666303124011010000007101976032357141436_">
										<use
											xlinkHref="#SVGID_00000129906499550051191180000010899528167466124960_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000062153666303124011010000007101976032357141436_)">
										<path
											className="st32"
											d="M739.28 262.4l.71-.41c-.36-.21-.69-.23-.93-.09l-.71.41c.23-.13.56-.11.93.09z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000126294602768627674610000013557731841173035427_"
											className="st8"
											d="M740.2 265.52l.71-.41c.24-.14.38-.43.38-.84 0-.83-.58-1.85-1.31-2.27l-.71.41c.73.42 1.31 1.44 1.31 2.27 0 .41-.14.7-.38.84z"
										/>
									</defs>
									<clipPath id="SVGID_00000016794809235466715750000004563928430569871784_">
										<use
											xlinkHref="#SVGID_00000126294602768627674610000013557731841173035427_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000016794809235466715750000004563928430569871784_)">
										<path
											className="st53"
											d="M740.2 265.52l.71-.41c.24-.14.38-.43.38-.84 0-.83-.58-1.85-1.31-2.27l-.71.41c.73.42 1.31 1.44 1.31 2.27 0 .41-.14.7-.38.84z"
										/>
									</g>
								</g>
								<path
									className="st54"
									d="M739.28 262.4c-.73-.42-1.32-.08-1.32.75s.58 1.85 1.31 2.27c.73.42 1.32.08 1.32-.75s-.59-1.85-1.31-2.27z"
								/>
							</g>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000138549781572479345430000014261935318755860138_"
											className="st8"
											d="M738.72 262.97c-.11.06-.22.13-.32.19-.01 0-.01.01-.02.01a.21.21 0 00-.06.04c.14-.08.32-.07.53.05l.4-.24c-.21-.11-.39-.12-.53-.05z"
										/>
									</defs>
									<clipPath id="SVGID_00000183243747158497078090000000787544999063528858_">
										<use
											xlinkHref="#SVGID_00000138549781572479345430000014261935318755860138_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000183243747158497078090000000787544999063528858_)">
										<path
											className="st56"
											d="M738.85 263.26l.4-.24c-.21-.12-.39-.13-.53-.05l-.4.24c.14-.08.32-.07.53.05z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000037692391411458607370000008073554171862164142_"
											className="st8"
											d="M739.37 265.02l.4-.24c.13-.08.22-.24.22-.48 0-.47-.33-1.05-.74-1.29l-.4.24c.41.24.74.81.74 1.28 0 .25-.08.41-.22.49z"
										/>
									</defs>
									<clipPath id="SVGID_00000169515732885138509790000017899017022132427664_">
										<use
											xlinkHref="#SVGID_00000037692391411458607370000008073554171862164142_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000169515732885138509790000017899017022132427664_)">
										<path
											className="st56"
											d="M739.37 265.02l.4-.24c.13-.08.22-.24.22-.48 0-.47-.33-1.05-.74-1.29l-.4.24c.41.24.74.81.74 1.28 0 .25-.08.41-.22.49z"
										/>
									</g>
								</g>
								<path
									className="st58"
									d="M738.85 263.26c-.41-.24-.74-.05-.74.43 0 .47.33 1.05.74 1.28.41.24.75.05.75-.42-.01-.48-.34-1.05-.75-1.29z"
								/>
							</g>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000071534656872970453430000003548777235361524663_"
											className="st8"
											d="M776.04 275.91l-.57.33c-.01.01-.03.02-.04.02-.04.02-.07.04-.11.06.24-.14.57-.12.93.09l.71-.42c-.36-.2-.69-.22-.92-.08z"
										/>
									</defs>
									<clipPath id="SVGID_00000054984561622230029910000011856611582812129725_">
										<use
											xlinkHref="#SVGID_00000071534656872970453430000003548777235361524663_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000054984561622230029910000011856611582812129725_)">
										<path
											className="st30"
											d="M776.26 276.41l.71-.42c-.37-.21-.7-.23-.93-.09l-.71.41c.23-.13.56-.11.93.1z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000042702212724813720930000000423443296576663472_"
											className="st8"
											d="M777.19 279.53l.71-.42c.24-.14.38-.43.38-.84 0-.84-.58-1.85-1.31-2.27l-.71.42c.73.42 1.31 1.43 1.31 2.27 0 .41-.15.7-.38.84z"
										/>
									</defs>
									<clipPath id="SVGID_00000012466716782877400790000001247012127837297282_">
										<use
											xlinkHref="#SVGID_00000042702212724813720930000000423443296576663472_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000012466716782877400790000001247012127837297282_)">
										<path
											className="st32"
											d="M777.19 279.53l.71-.42c.24-.14.38-.43.38-.84 0-.84-.58-1.85-1.31-2.27l-.71.42c.73.42 1.31 1.43 1.31 2.27 0 .41-.15.7-.38.84z"
										/>
									</g>
								</g>
								<path
									className="st33"
									d="M776.26 276.41c-.72-.42-1.32-.08-1.32.75s.59 1.85 1.31 2.27c.73.42 1.32.08 1.32-.75s-.59-1.85-1.31-2.27z"
								/>
							</g>
							<path
								className="st34"
								d="M776.36 270.55L774.54 269.5 774.56 276.95 776.37 278z"
							/>
							<path
								className="st35"
								d="M771.91 276.15c-.4-.31-1.26.01-1.93.7-.67.69-.88 1.5-.48 1.8.4.31 1.26-.01 1.93-.7.66-.69.88-1.5.48-1.8z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000000904068350929166120000006181783634709682304_"
										className="st8"
										d="M768.87 279.77c.41 1.12 3.58 3 5.88 2.03 2.1-.88 2.69-3.95 2.28-5.04-.06-.14-.14-.32-.21-.45-.54-.95-1.83-1.32-3.05-.81.25.44-.27 1.1-1.15 1.47-.88.37-1.8.32-2.05-.12-.25-.44.27-1.09 1.15-1.47.88-.37 1.8-.32 2.05.12 1.21-.51 2.51-.14 3.05.81-2.22-3.71-9.34-.8-7.95 3.46z"
									/>
								</defs>
								<clipPath id="SVGID_00000045603454299036155870000001537863884245907645_">
									<use
										xlinkHref="#SVGID_00000000904068350929166120000006181783634709682304_"
										overflow="visible"
									/>
								</clipPath>
								<g clipPath="url(#SVGID_00000045603454299036155870000001537863884245907645_)">
									<path
										className="st58"
										d="M771.49 275.06c1.7-.69 4.12-.78 5.33 1.24-.54-.95-1.83-1.32-3.05-.81-.25-.44-1.17-.49-2.05-.12-.88.37-1.4 1.03-1.15 1.47.25.44 1.16.49 2.05.12.88-.37 1.4-1.03 1.15-1.47 1.21-.51 2.51-.14 3.05.81.07.13.15.31.21.45.4 1.09-.19 4.16-2.28 5.04-2.3.97-5.46-.91-5.88-2.03-.83-2.52 1.26-4.14 2.62-4.7z"
									/>
									<path
										className="st58"
										d="M776.82 276.3c.74 1.38.31 4.15-1.05 4.97.42-1.39-2.69-2.23-3.23-1.72-.34.32.08 2.32.75 2.7-1.68.36-3.86-1.46-4.34-2.31-.77-1.37-.01-3.75 2.3-4.78 2.5-1.11 4.2-.16 4-.24.67.31 1.23.74 1.57 1.38-.54-.95-1.83-1.32-3.05-.81-.25-.44-1.17-.49-2.05-.12-.88.37-1.4 1.03-1.15 1.47.25.44 1.16.49 2.05.12.88-.37 1.4-1.03 1.15-1.47 1.22-.5 2.51-.14 3.05.81z"
									/>
								</g>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000140700427455496778200000013091928108820957323_"
										className="st8"
										d="M777.03 276.75z"
									/>
								</defs>
								<clipPath id="SVGID_00000183960313553783685890000012292909819684327858_">
									<use
										xlinkHref="#SVGID_00000140700427455496778200000013091928108820957323_"
										overflow="visible"
									/>
								</clipPath>
								<g clipPath="url(#SVGID_00000183960313553783685890000012292909819684327858_)">
									<path
										className="st58"
										d="M777.03 276.75zM776.95 276.58c.09.16.14.31-.02-.06l-.11-.22c.05.09.09.18.13.28z"
									/>
								</g>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000142894608915892819540000001322432776380109727_"
										className="st8"
										d="M771.69 287.08c.62 1.1 2.91 1.23 5.12.3 2.1-.88 3.36-2.4 2.96-3.49-.69-1.86-2.05-5.27-2.74-7.13.4 1.09-.19 4.16-2.28 5.04-2.3.97-5.46-.91-5.88-2.03.05.14 2.77 7.21 2.82 7.31z"
									/>
								</defs>
								<clipPath id="SVGID_00000099631407742835587530000011679438430354238081_">
									<use
										xlinkHref="#SVGID_00000142894608915892819540000001322432776380109727_"
										overflow="visible"
									/>
								</clipPath>
								<g clipPath="url(#SVGID_00000099631407742835587530000011679438430354238081_)">
									<path
										className="st58"
										d="M771.61 286.9l-2.74-7.13c.31.83 2.66 2.87 4.42 2.49l2.07 5.58c-1.51.32-3.34.18-3.75-.94z"
									/>
									<path
										className="st30"
										d="M775.36 287.84l-2.07-5.58c.84-.18 1.72-.52 2.48-.98l2.07 5.58c-.72.43-1.59.79-2.48.98z"
									/>
									<path
										className="st58"
										d="M777.84 286.86l-2.07-5.58c1.46-.88 1.59-3.63 1.26-4.53l2.74 7.13c.34.91-.47 2.1-1.93 2.98z"
									/>
								</g>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000049189021847393672120000007949295185378820234_"
										className="st8"
										d="M776.82 276.3c-2.32-3.75-9.39-.68-7.95 3.47-.4-1.09.86-2.61 2.96-3.49 2.21-.93 4.5-.79 5.12.3-.04-.1-.08-.19-.13-.28z"
									/>
								</defs>
								<clipPath id="SVGID_00000099633850462007334600000006300198481971377550_">
									<use
										xlinkHref="#SVGID_00000049189021847393672120000007949295185378820234_"
										overflow="visible"
									/>
								</clipPath>
								<g clipPath="url(#SVGID_00000099633850462007334600000006300198481971377550_)">
									<path
										className="st58"
										d="M776.82 276.3c-2.33-3.76-9.38-.66-7.95 3.47-.4-1.09.86-2.61 2.96-3.49 2.21-.93 4.5-.79 5.12.3-.04-.1-.08-.19-.13-.28z"
									/>
									<path
										className="st58"
										d="M770.8 276.8c.2-.23.18-.63 1.09-.98.73-.29 1.29-.05 1.39.01 1.69-.36 3.19-.09 3.67.76-.49-1.33-2.38-2.6-5.22-1.61-1.68.59-3.68 2.43-2.86 4.8-.33-.91.47-2.1 1.93-2.98z"
									/>
								</g>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000175299646878433442300000008913835841201588873_"
										className="st8"
										d="M779.77 283.89c-.05-.14-2.77-7.22-2.82-7.31 2.94 7.66 2.82 7.31 2.82 7.31z"
									/>
								</defs>
								<clipPath id="SVGID_00000052105498841277980050000001441462734292397441_">
									<use
										xlinkHref="#SVGID_00000175299646878433442300000008913835841201588873_"
										overflow="visible"
									/>
								</clipPath>
								<g clipPath="url(#SVGID_00000052105498841277980050000001441462734292397441_)">
									<path
										className="st58"
										d="M779.77 283.89c-.05-.14-2.75-7.18-2.82-7.31 2.94 7.66 2.82 7.31 2.82 7.31z"
									/>
								</g>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000030469982900026111550000001071334511379780775_"
										className="st8"
										d="M768.87 279.77l2.74 7.13c-.4-1.09.87-2.61 2.96-3.49 2.21-.93 4.5-.79 5.12.3l-2.74-7.13c-.62-1.09-2.91-1.23-5.12-.3-2.1.88-3.37 2.4-2.96 3.49z"
									/>
								</defs>
								<clipPath id="SVGID_00000108272709340872991830000011531458854276259255_">
									<use
										xlinkHref="#SVGID_00000030469982900026111550000001071334511379780775_"
										overflow="visible"
									/>
								</clipPath>
								<g clipPath="url(#SVGID_00000108272709340872991830000011531458854276259255_)">
									<path
										className="st58"
										d="M779.69 283.71l-2.74-7.13c-.48-.85-1.98-1.12-3.67-.76l2.74 7.13c1.69-.36 3.19-.09 3.67.76z"
									/>
									<path
										className="st56"
										d="M776.03 282.95l-2.74-7.13c-.87.19-1.74.53-2.48.98l2.74 7.13c.75-.46 1.63-.8 2.48-.98z"
									/>
									<path
										className="st58"
										d="M773.55 283.93l-2.74-7.13c-1.47.89-2.27 2.08-1.94 2.97l2.74 7.13c-.33-.89.47-2.08 1.94-2.97z"
									/>
								</g>
							</g>
							<path
								className="st35"
								d="M779.69 283.71c-.62-1.09-2.91-1.23-5.12-.3-2.21.93-3.5 2.57-2.88 3.67.62 1.1 2.91 1.23 5.12.3 2.21-.93 3.5-2.57 2.88-3.67z"
							/>
							<path
								className="st44"
								d="M779.14 283.95c-.53-.94-2.51-1.06-4.41-.26-1.9.8-3.01 2.21-2.48 3.15.53.95 2.51 1.06 4.41.26 1.9-.8 3.01-2.21 2.48-3.15z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000016041247561914910180000007976844773233136525_"
										className="st8"
										d="M775.97 269.7l-1.81-1.05c.24.14.39.43.39.85l1.81 1.05c-.01-.42-.15-.71-.39-.85z"
									/>
								</defs>
								<clipPath id="SVGID_00000049188945800636044540000011289508339618219906_">
									<use
										xlinkHref="#SVGID_00000016041247561914910180000007976844773233136525_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M775.97 269.7l-1.81-1.05c.24.14.39.43.39.85l1.81 1.05c-.01-.42-.15-.71-.39-.85z"
									clipPath="url(#SVGID_00000049188945800636044540000011289508339618219906_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000052796942288896686080000011524572240467293364_"
										className="st8"
										d="M776.24 269.23l-1.38-.79c-.31-.18-.75-.16-1.22.12l1.38.8c.47-.28.9-.31 1.22-.13z"
									/>
								</defs>
								<clipPath id="SVGID_00000018917428824184582590000011751668587924851866_">
									<use
										xlinkHref="#SVGID_00000052796942288896686080000011524572240467293364_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M776.24 269.23l-1.38-.79c-.31-.18-.75-.16-1.22.12l1.38.8c.47-.28.9-.31 1.22-.13z"
									clipPath="url(#SVGID_00000018917428824184582590000011751668587924851866_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st34"
								d="M771 273.65L769.61 272.85 769.63 280.3 771.01 281.09z"
							/>
							<path
								className="st47"
								d="M775.01 269.35L773.63 268.55 771.32 269.89 772.71 270.68z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000119806941450263012290000016784821184129502352_"
										className="st8"
										d="M772.71 270.68l-1.38-.8c-.95.55-1.71 1.87-1.71 2.96l1.38.8c-.01-1.08.76-2.41 1.71-2.96z"
									/>
								</defs>
								<clipPath id="SVGID_00000052100720921935254700000013146847351679318166_">
									<use
										xlinkHref="#SVGID_00000119806941450263012290000016784821184129502352_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M772.71 270.68l-1.38-.8c-.27.16-.52.37-.75.63l1.38.8c.22-.25.48-.47.75-.63z"
									clipPath="url(#SVGID_00000052100720921935254700000013146847351679318166_)"
									fill="#425056"
								/>
								<path
									d="M771.96 271.31l-1.38-.8c-.27.31-.5.67-.67 1.05l1.38.8c.17-.38.4-.74.67-1.05z"
									clipPath="url(#SVGID_00000052100720921935254700000013146847351679318166_)"
									fill="#b3b9bb"
								/>
								<path
									d="M771.29 272.36l-1.38-.8c-.19.43-.3.87-.3 1.29l1.38.8c0-.42.11-.86.3-1.29z"
									clipPath="url(#SVGID_00000052100720921935254700000013146847351679318166_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st50"
								d="M772.71 270.68c-.95.55-1.71 1.87-1.71 2.96l.02 7.45.38-.22-.02-7.45c0-.85.6-1.88 1.33-2.3l2.31-1.33c.74-.42 1.34-.08 1.34.76l-.06 6.4.38.39.05-7.01c0-1.09-.78-1.53-1.72-.98l-2.3 1.33z"
							/>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000034801959631593271240000009133589386831204231_"
											className="st8"
											d="M769.8 278.37l-.57.33c-.01.01-.03.02-.04.02-.03.02-.07.04-.11.06.24-.14.57-.12.94.09l.71-.41c-.36-.21-.69-.22-.93-.09z"
										/>
									</defs>
									<clipPath id="SVGID_00000109727822707860221500000011676633581319180700_">
										<use
											xlinkHref="#SVGID_00000034801959631593271240000009133589386831204231_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000109727822707860221500000011676633581319180700_)">
										<path
											className="st32"
											d="M770.02 278.88l.71-.41c-.37-.21-.7-.23-.94-.09l-.71.42c.25-.15.58-.13.94.08z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000062911227939351429870000009269739574780962457_"
											className="st8"
											d="M770.95 281.99l.71-.41c.24-.14.38-.43.38-.84 0-.84-.58-1.85-1.31-2.27l-.71.41c.73.42 1.31 1.44 1.31 2.27 0 .41-.14.7-.38.84z"
										/>
									</defs>
									<clipPath id="SVGID_00000088113228855663891680000007657646436805222059_">
										<use
											xlinkHref="#SVGID_00000062911227939351429870000009269739574780962457_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000088113228855663891680000007657646436805222059_)">
										<path
											className="st53"
											d="M770.95 281.99l.71-.41c.24-.14.38-.43.38-.84 0-.84-.58-1.85-1.31-2.27l-.71.41c.73.42 1.31 1.44 1.31 2.27 0 .41-.14.7-.38.84z"
										/>
									</g>
								</g>
								<path
									className="st54"
									d="M770.02 278.88c-.72-.42-1.32-.08-1.32.75s.58 1.85 1.31 2.27c.73.42 1.32.08 1.32-.75 0-.84-.58-1.85-1.31-2.27z"
								/>
							</g>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000064356113464875632660000000348218875574951597_"
											className="st8"
											d="M769.47 279.45c-.11.06-.21.13-.32.19-.01 0-.01.01-.02.01l-.06.03c.14-.08.32-.07.53.05l.4-.24c-.21-.11-.4-.12-.53-.04z"
										/>
									</defs>
									<clipPath id="SVGID_00000080908954123514908410000000870123621532033171_">
										<use
											xlinkHref="#SVGID_00000064356113464875632660000000348218875574951597_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000080908954123514908410000000870123621532033171_)">
										<path
											className="st56"
											d="M769.59 279.73l.4-.24c-.21-.12-.39-.13-.53-.05l-.4.23c.14-.07.33-.05.53.06z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000152233971713365073810000005313868218651629746_"
											className="st8"
											d="M770.12 281.5l.4-.23c.13-.08.22-.24.22-.48 0-.47-.33-1.05-.74-1.29l-.4.24c.41.24.74.81.74 1.28-.01.23-.09.4-.22.48z"
										/>
									</defs>
									<clipPath id="SVGID_00000086668399295607995500000009610708979537715329_">
										<use
											xlinkHref="#SVGID_00000152233971713365073810000005313868218651629746_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000086668399295607995500000009610708979537715329_)">
										<path
											className="st56"
											d="M770.12 281.5l.4-.23c.13-.08.22-.24.22-.48 0-.47-.33-1.05-.74-1.29l-.4.24c.41.24.74.81.74 1.28-.01.23-.09.4-.22.48z"
										/>
									</g>
								</g>
								<path
									className="st58"
									d="M769.59 279.73c-.41-.24-.74-.05-.74.43 0 .47.33 1.05.74 1.28.41.24.75.05.75-.42s-.34-1.05-.75-1.29z"
								/>
							</g>
							<path
								className="st34"
								d="M868.71 323.95L866.75 322.82 866.77 330.86 868.73 331.99z"
							/>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000044173124316756845380000005991409011120218548_"
											className="st8"
											d="M868.83 335.52c.17-.18.27-.43.3-.74.11-1.43-1.47-3.7-3.53-5.06-1.61-1.06-3.03-1.26-3.63-.61.19-.21.29-.28.45-.4.11-.08.26-.18.38-.24.31-.15.35-.17.7-.28 0 0 .26-.07.55-.1.82-.08 1.67.11 2.52.57.43.23.85.53 1.26.9.54.49.89.98.99 1.12.22.32.89 1.31.88 2.58a3.313 3.313 0 01-.52 1.8c-.1.18-.13.21-.35.46z"
										/>
									</defs>
									<clipPath id="SVGID_00000147921586033876665670000005647478681914050208_">
										<use
											xlinkHref="#SVGID_00000044173124316756845380000005991409011120218548_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000147921586033876665670000005647478681914050208_)">
										<path
											className="st76"
											d="M868.83 335.52c2.77-3.21-1.55-7.77-4.78-7.43-.56.06-1.38.28-2.09 1.02.6-.64 2.03-.45 3.63.61 2.06 1.36 3.64 3.62 3.53 5.06-.02.32-.12.56-.29.74z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000078036551981244827100000012091235344109472671_"
											className="st8"
											d="M863.03 341.57c.17-.18.27-.43.3-.74.11-1.43-1.47-3.7-3.53-5.05-1.61-1.06-3.03-1.26-3.64-.61 1.52-1.62 4.28-4.42 5.8-6.04.6-.64 2.03-.45 3.63.61 2.06 1.36 3.64 3.62 3.53 5.06-.02.32-.13.56-.3.74-1.51 1.61-4.27 4.4-5.79 6.03z"
										/>
									</defs>
									<clipPath id="SVGID_00000154416134947030905780000010962111298228519321_">
										<use
											xlinkHref="#SVGID_00000078036551981244827100000012091235344109472671_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000154416134947030905780000010962111298228519321_)">
										<path
											className="st58"
											d="M863.03 341.57l5.8-6.04c.17-.18.27-.43.3-.74.11-1.43-1.47-3.7-3.53-5.06-1.61-1.06-3.03-1.26-3.63-.61l-5.8 6.04c.6-.64 2.03-.45 3.64.61 2.06 1.36 3.64 3.62 3.53 5.05-.04.32-.14.57-.31.75z"
										/>
									</g>
								</g>
								<path
									className="st78"
									d="M859.39 340.96c-2.06-1.36-3.64-3.62-3.53-5.06.11-1.43 1.88-1.49 3.94-.13 2.06 1.36 3.64 3.62 3.53 5.05-.11 1.43-1.88 1.49-3.94.14zM867.02 331.53c-.83-.54-1.46-1.45-1.41-2.02.05-.57.75-.6 1.58-.05.82.54 1.45 1.45 1.41 2.02-.05.57-.75.59-1.58.05z"
								/>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000176022078834747275840000002724928952261197462_"
											className="st8"
											d="M868.83 335.52c-1.52 1.62-4.28 4.42-5.8 6.04-.6.65-2.03.45-3.64-.61l5.8-6.04c1.61 1.06 3.04 1.26 3.64.61z"
										/>
									</defs>
									<clipPath id="SVGID_00000174599159639790431290000006130109347720940705_">
										<use
											xlinkHref="#SVGID_00000176022078834747275840000002724928952261197462_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000174599159639790431290000006130109347720940705_)">
										<path
											className="st80"
											d="M859.39 340.96l5.8-6.04c1.61 1.06 3.03 1.26 3.64.61l-5.8 6.04c-.6.64-2.03.44-3.64-.61z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000158023684790814723600000009052444948131602820_"
											className="st8"
											d="M869.7 333.53c-.01.13-.03.31-.06.44-.02.1-.09.37-.18.58-.07.16-.14.31-.27.52-.15.23-.29.38-.36.47-.6.65-2.03.45-3.64-.61.94-1.01 1.76-2.52 1.83-3.38.82.54 1.53.52 1.57-.05.05-.57-.59-1.48-1.41-2.02-.83-.54-1.53-.52-1.58.05-.04.57.59 1.48 1.41 2.02-.07.86-.89 2.37-1.83 3.38-5-3.3-4.04 1.45-3.53-5.05.03-.32.13-.56.3-.74.11-.11.26-.26.38-.35.09-.07.27-.2.51-.32.26-.13.68-.3 1.15-.35.32-.03 1.28-.13 2.55.55a6.63 6.63 0 012.26 2.02c.22.32.9 1.31.89 2.6.02.05.02.16.01.24z"
										/>
									</defs>
									<clipPath id="SVGID_00000078031257323011164250000002696235584475545009_">
										<use
											xlinkHref="#SVGID_00000158023684790814723600000009052444948131602820_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000078031257323011164250000002696235584475545009_)">
										<path
											className="st58"
											d="M869.7 333.53c-.05.5-.19 1.26-.87 2-.6.65-2.03.45-3.64-.61.94-1.01 1.76-2.52 1.83-3.38.82.54 1.53.52 1.57-.05.05-.57-.59-1.48-1.41-2.02-.83-.54-1.53-.52-1.58.05-.04.57.59 1.48 1.41 2.02-.07.86-.89 2.37-1.83 3.38-5-3.3-4.04 1.45-3.53-5.05.03-.32.13-.56.3-.74 2.97-2.93 7.76.95 7.74 4.15.02.06.02.17.01.25z"
										/>
										<path
											className="st58"
											d="M866.86 332.24c-.86-.81-2.65-2.5-2.71-.75-.14 4.37-2.92.89 1.96 2.24-.27.43-.51 1.45-.92 1.19-3.06-1.93-3.64-4.87-3.53-5.05.28-.44.25-.7.48-.93.44-.37.96-.7 1.61-.79 3.72-.57 7.78 4.43 5.07 7.39-.6.65-2.03.45-3.64-.61 1.18-1.27.65-1.24 1.2-1.15.03-.01 1.92-.1.48-1.54.09-.26.15-.5.17-.71.82.54 1.53.52 1.57-.05.05-.57-.59-1.48-1.41-2.02-.83-.54-1.53-.52-1.58.05-.04.57.59 1.48 1.41 2.02-.01.2-.07.44-.16.71z"
										/>
									</g>
								</g>
								<g className="st8">
									<g className="st8">
										<path
											className="st80"
											d="M856.17 335.15l5.8-6.04c-.17.18-.3.43-.3.74 0 .7.39 2.81 3.53 5.05l-5.8 6.04c-2.06-1.36-3.64-3.62-3.53-5.06.02-.3.12-.54.3-.73z"
										/>
									</g>
								</g>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000081641419254072546290000015950435176184610709_"
										className="st8"
										d="M868.29 323.03l-1.95-1.13c.26.15.42.47.42.92l1.96 1.13c-.01-.45-.17-.77-.43-.92z"
									/>
								</defs>
								<clipPath id="SVGID_00000133496111289392707910000009599984571936330653_">
									<use
										xlinkHref="#SVGID_00000081641419254072546290000015950435176184610709_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M868.29 323.03l-1.95-1.13c.26.15.42.47.42.92l1.96 1.13c-.01-.45-.17-.77-.43-.92z"
									clipPath="url(#SVGID_00000133496111289392707910000009599984571936330653_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000177473671598134481350000015827248534285133989_"
										className="st8"
										d="M868.58 322.53l-1.49-.86c-.34-.2-.8-.17-1.32.13l1.49.86c.52-.3.98-.33 1.32-.13z"
									/>
								</defs>
								<clipPath id="SVGID_00000025404030107412736150000009026740013154218126_">
									<use
										xlinkHref="#SVGID_00000177473671598134481350000015827248534285133989_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M868.58 322.53l-1.49-.86c-.34-.2-.8-.17-1.32.13l1.49.86c.52-.3.98-.33 1.32-.13z"
									clipPath="url(#SVGID_00000025404030107412736150000009026740013154218126_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st34"
								d="M862.93 327.29L861.43 326.43 861.45 334.47 862.94 335.33z"
							/>
							<path
								className="st47"
								d="M867.26 322.66L865.77 321.8 863.28 323.24 864.77 324.1z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000066499646687661514160000009583523313774695320_"
										className="st8"
										d="M864.77 324.1l-1.49-.86c-1.02.59-1.85 2.02-1.85 3.2l1.49.86c0-1.18.83-2.61 1.85-3.2z"
									/>
								</defs>
								<clipPath id="SVGID_00000141452482045702687070000007929227447745767821_">
									<use
										xlinkHref="#SVGID_00000066499646687661514160000009583523313774695320_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M864.77 324.1l-1.49-.86c-.29.17-.56.4-.81.68l1.49.86c.25-.28.52-.52.81-.68z"
									clipPath="url(#SVGID_00000141452482045702687070000007929227447745767821_)"
									fill="#425056"
								/>
								<path
									d="M863.96 324.78l-1.49-.86c-.29.33-.54.72-.72 1.13l1.49.86c.19-.41.43-.8.72-1.13z"
									clipPath="url(#SVGID_00000141452482045702687070000007929227447745767821_)"
									fill="#b3b9bb"
								/>
								<path
									d="M863.24 325.91l-1.49-.86c-.21.46-.32.94-.32 1.39l1.49.86c0-.45.12-.94.32-1.39z"
									clipPath="url(#SVGID_00000141452482045702687070000007929227447745767821_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st50"
								d="M864.77 324.1c-1.02.59-1.85 2.02-1.85 3.2l.02 8.04.41-.24-.02-8.04c0-.91.64-2.03 1.44-2.49l2.49-1.44c.79-.46 1.45-.09 1.45.82l.02 6.58.41.63-.02-7.45c0-1.17-.84-1.65-1.86-1.06l-2.49 1.45z"
							/>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000157305738213992924510000015129854415854582151_"
											className="st8"
											d="M861.48 332.92c-.2.12-.4.23-.6.35-.01.01-.02.02-.04.02-.04.02-.07.04-.11.07.25-.14.59-.13.97.09l.74-.43c-.37-.23-.71-.25-.96-.1z"
										/>
									</defs>
									<clipPath id="SVGID_00000072282489141210940720000003927183552302872962_">
										<use
											xlinkHref="#SVGID_00000157305738213992924510000015129854415854582151_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000072282489141210940720000003927183552302872962_)">
										<path
											className="st87"
											d="M861.71 333.45l.74-.43c-.38-.22-.73-.24-.98-.1l-.74.43c.25-.14.6-.12.98.1z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000057868094167217968000000009039426722190172562_"
											className="st8"
											d="M862.68 336.7l.74-.43c.24-.14.4-.45.4-.88 0-.87-.61-1.93-1.37-2.37l-.74.43c.76.44 1.37 1.5 1.37 2.37 0 .43-.16.73-.4.88z"
										/>
									</defs>
									<clipPath id="SVGID_00000146476869895282669280000001542435987817659051_">
										<use
											xlinkHref="#SVGID_00000057868094167217968000000009039426722190172562_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000146476869895282669280000001542435987817659051_)">
										<path
											className="st87"
											d="M862.68 336.7l.74-.43c.24-.14.4-.45.4-.88 0-.87-.61-1.93-1.37-2.37l-.74.43c.76.44 1.37 1.5 1.37 2.37 0 .43-.16.73-.4.88z"
										/>
									</g>
								</g>
								<path
									className="st89"
									d="M861.71 333.45c-.76-.44-1.37-.09-1.38.78 0 .87.61 1.93 1.37 2.37.76.44 1.38.09 1.38-.78 0-.88-.61-1.94-1.37-2.37z"
								/>
							</g>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000124881597020317722360000010494949825100220334_"
											className="st8"
											d="M861.13 334.04c-.11.06-.22.13-.34.19-.01 0-.02.01-.02.01-.02.01-.04.02-.07.03.14-.08.34-.07.55.05l.42-.25c-.2-.1-.4-.11-.54-.03z"
										/>
									</defs>
									<clipPath id="SVGID_00000178913978097079267170000007995352102654729091_">
										<use
											xlinkHref="#SVGID_00000124881597020317722360000010494949825100220334_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000178913978097079267170000007995352102654729091_)">
										<path
											className="st56"
											d="M861.26 334.34l.42-.25c-.21-.12-.41-.13-.55-.05l-.42.24c.14-.08.34-.06.55.06z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000008132943009498082790000007041338414537978789_"
											className="st8"
											d="M861.81 336.18l.42-.24c.14-.08.23-.25.23-.5 0-.49-.35-1.09-.77-1.34l-.42.25c.43.25.78.85.78 1.34-.01.23-.1.41-.24.49z"
										/>
									</defs>
									<clipPath id="SVGID_00000041281982605061285930000004831160850653545637_">
										<use
											xlinkHref="#SVGID_00000008132943009498082790000007041338414537978789_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000041281982605061285930000004831160850653545637_)">
										<path
											className="st56"
											d="M861.81 336.18l.42-.24c.14-.08.23-.25.23-.5 0-.49-.35-1.09-.77-1.34l-.42.25c.43.25.78.85.78 1.34-.01.23-.1.41-.24.49z"
										/>
									</g>
								</g>
								<path
									className="st58"
									d="M861.26 334.34c-.43-.25-.78-.05-.78.44s.34 1.09.77 1.34.78.05.78-.44c.01-.49-.34-1.09-.77-1.34z"
								/>
							</g>
							<path
								className="st34"
								d="M838.92 311.08L840.82 309.98 840.8 317.79 838.9 318.89z"
							/>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000103223925804489720790000002994936082185420195_"
											className="st8"
											d="M839.31 316.5c.11-.22.3-.4.57-.53 1.26-.6 3.86.06 5.81 1.46 1.52 1.1 2.19 2.32 1.81 3.09.12-.25.15-.36.21-.55.04-.12.08-.3.09-.43.03-.34.03-.37.01-.74 0 0-.02-.26-.1-.53-.21-.77-.67-1.48-1.38-2.1-.36-.31-.78-.59-1.25-.84a6.7 6.7 0 00-1.36-.51c-.37-.09-1.49-.36-2.65.09-.52.2-.85.46-1.07.67-.01.01-.2.18-.38.42-.13.18-.15.22-.31.5z"
										/>
									</defs>
									<clipPath id="SVGID_00000033351414778065961420000013447281713774769316_">
										<use
											xlinkHref="#SVGID_00000103223925804489720790000002994936082185420195_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000033351414778065961420000013447281713774769316_)">
										<path
											className="st76"
											d="M839.31 316.5c1.97-3.62 7.6-1.27 8.4 1.78.14.53.22 1.35-.21 2.25.38-.77-.29-2-1.81-3.09-1.94-1.4-4.55-2.06-5.81-1.46-.27.13-.46.31-.57.52z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000103257366543613141040000003872166930894014628_"
											className="st8"
											d="M835.82 323.86c.11-.22.3-.4.57-.53 1.26-.6 3.86.06 5.81 1.46 1.52 1.09 2.19 2.32 1.81 3.09.95-1.94 2.54-5.42 3.49-7.35.38-.77-.29-2-1.81-3.09-1.94-1.4-4.55-2.06-5.81-1.46-.28.13-.47.31-.57.53-.95 1.93-2.54 5.41-3.49 7.35z"
										/>
									</defs>
									<clipPath id="SVGID_00000081610911720798659060000009951225025450894490_">
										<use
											xlinkHref="#SVGID_00000103257366543613141040000003872166930894014628_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000081610911720798659060000009951225025450894490_)">
										<path
											className="st58"
											d="M835.82 323.86l3.49-7.35c.11-.22.3-.4.57-.53 1.26-.6 3.86.06 5.81 1.46 1.52 1.1 2.19 2.32 1.81 3.09l-3.49 7.35c.38-.77-.29-2-1.81-3.09-1.94-1.4-4.55-2.06-5.81-1.46-.27.13-.46.31-.57.53z"
										/>
									</g>
								</g>
								<path
									className="st78"
									d="M837.63 326.95c1.94 1.4 4.54 2.06 5.81 1.46 1.26-.6.71-2.22-1.23-3.62s-4.55-2.06-5.81-1.46c-1.27.59-.71 2.22 1.23 3.62zM843.57 316.77c.78.56 1.82.82 2.32.59.5-.24.28-.89-.49-1.45-.78-.56-1.82-.82-2.33-.58-.5.23-.28.88.5 1.44z"
								/>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000063633668752949964120000017525659638035757992_"
											className="st8"
											d="M839.31 316.5c-.95 1.94-2.54 5.41-3.49 7.35-.38.77.29 2 1.81 3.09l3.49-7.35c-1.51-1.09-2.18-2.32-1.81-3.09z"
										/>
									</defs>
									<clipPath id="SVGID_00000017501864637221764210000005495342504319005881_">
										<use
											xlinkHref="#SVGID_00000063633668752949964120000017525659638035757992_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000017501864637221764210000005495342504319005881_)">
										<path
											className="st80"
											d="M837.63 326.95l3.49-7.35c-1.52-1.09-2.19-2.32-1.81-3.09l-3.49 7.35c-.38.77.29 1.99 1.81 3.09z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000057125762337788715860000003596770759916698785_"
											className="st8"
											d="M840.83 315.02c-.11.06-.27.14-.38.21-.08.06-.31.21-.46.36-.12.12-.23.23-.38.42-.16.21-.25.39-.3.49-.38.77.29 2 1.81 3.09.59-1.2 1.68-2.47 2.44-2.83-.78-.56-1-1.21-.5-1.45.51-.24 1.55.02 2.33.58.78.56 1 1.21.49 1.45s-1.55-.02-2.32-.59c-.76.36-1.85 1.62-2.44 2.83 4.72 3.41.08 4.17 5.81 1.46.28-.13.47-.31.58-.53.06-.14.14-.32.19-.47.03-.1.09-.32.12-.57.03-.29.04-.72-.08-1.17-.08-.3-.32-1.21-1.38-2.13a6.476 6.476 0 00-2.62-1.36c-.37-.09-1.5-.36-2.66.09-.09.05-.18.09-.25.12z"
										/>
									</defs>
									<clipPath id="SVGID_00000065755753095879996710000005929423509679728785_">
										<use
											xlinkHref="#SVGID_00000057125762337788715860000003596770759916698785_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000065755753095879996710000005929423509679728785_)">
										<path
											className="st58"
											d="M840.83 315.02c-.44.22-1.08.61-1.52 1.48-.38.77.29 2 1.81 3.09.59-1.2 1.68-2.47 2.44-2.83-.78-.56-1-1.21-.5-1.45.51-.24 1.55.02 2.33.58.78.56 1 1.21.49 1.45s-1.55-.02-2.32-.59c-.76.36-1.85 1.62-2.44 2.83 4.72 3.41.08 4.17 5.81 1.46.28-.13.47-.31.58-.53 1.64-3.71-3.54-6.72-6.44-5.6-.08.04-.17.08-.24.11z"
										/>
										<path
											className="st58"
											d="M842.98 317.16c1.04.5 3.19 1.55 1.62 2.2-3.93 1.63.2 2.96-2.71-1.01-.29.39-1.14.96-.77 1.24 2.81 2.11 5.68 1.64 5.81 1.46.31-.41.55-.47.68-.76.18-.53.3-1.11.17-1.73-.76-3.58-6.71-5.55-8.46-2.06-.38.77.29 2 1.81 3.09.74-1.51.9-1.01.63-1.48-.01-.01-.59-1.76 1.22-.95.21-.17.4-.31.58-.39-.78-.56-1-1.21-.5-1.45.51-.24 1.55.02 2.33.58.78.56 1 1.21.49 1.45s-1.55-.02-2.32-.59c-.17.09-.37.23-.58.4z"
										/>
									</g>
								</g>
								<g className="st8">
									<g className="st8">
										<path
											className="st80"
											d="M844.01 327.88l3.49-7.35c-.11.22-.29.42-.58.53-.63.24-2.69.61-5.81-1.46l-3.49 7.35c1.94 1.4 4.54 2.06 5.81 1.46.29-.13.48-.31.58-.53z"
										/>
									</g>
								</g>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000059290702420453364990000001947512260071330710_"
										className="st8"
										d="M839.33 310.18l1.9-1.1c-.25.15-.41.46-.41.9l-1.9 1.1c0-.44.16-.75.41-.9z"
									/>
								</defs>
								<clipPath id="SVGID_00000130636524678059363190000010564735849608580496_">
									<use
										xlinkHref="#SVGID_00000059290702420453364990000001947512260071330710_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M839.33 310.18l1.9-1.1c-.25.15-.41.46-.41.9l-1.9 1.1c0-.44.16-.75.41-.9z"
									clipPath="url(#SVGID_00000130636524678059363190000010564735849608580496_)"
									fill="#425056"
								/>
							</g>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000021096719334552390180000015298966773254111889_"
										className="st8"
										d="M839.04 309.7l1.45-.83c.33-.19.78-.16 1.28.13l-1.45.83c-.5-.3-.95-.33-1.28-.13z"
									/>
								</defs>
								<clipPath id="SVGID_00000023970070850065187180000015358843048370978464_">
									<use
										xlinkHref="#SVGID_00000021096719334552390180000015298966773254111889_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M839.04 309.7l1.45-.83c.33-.19.78-.16 1.28.13l-1.45.83c-.5-.3-.95-.33-1.28-.13z"
									clipPath="url(#SVGID_00000023970070850065187180000015358843048370978464_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st34"
								d="M844.54 314.32L845.99 313.49 845.97 321.3 844.52 322.13z"
							/>
							<path
								className="st47"
								d="M840.32 309.82L841.78 308.99 844.2 310.38 842.75 311.22z"
							/>
							<g className="st8">
								<defs>
									<path
										id="SVGID_00000064313870726887291170000007865886794420449927_"
										className="st8"
										d="M842.75 311.22l1.45-.83c.99.57 1.8 1.97 1.79 3.11l-1.45.83c0-1.15-.8-2.54-1.79-3.11z"
									/>
								</defs>
								<clipPath id="SVGID_00000142871068544681055370000005374281139259593628_">
									<use
										xlinkHref="#SVGID_00000064313870726887291170000007865886794420449927_"
										overflow="visible"
									/>
								</clipPath>
								<path
									d="M842.75 311.22l1.45-.83c.28.16.55.39.79.66l-1.45.83c-.25-.27-.51-.5-.79-.66z"
									clipPath="url(#SVGID_00000142871068544681055370000005374281139259593628_)"
									fill="#425056"
								/>
								<path
									d="M843.53 311.88l1.45-.83c.28.32.52.7.7 1.1l-1.45.83c-.18-.4-.42-.78-.7-1.1z"
									clipPath="url(#SVGID_00000142871068544681055370000005374281139259593628_)"
									fill="#b3b9bb"
								/>
								<path
									d="M844.23 312.97l1.45-.83c.2.45.31.92.31 1.35l-1.45.83c0-.43-.11-.9-.31-1.35z"
									clipPath="url(#SVGID_00000142871068544681055370000005374281139259593628_)"
									fill="#425056"
								/>
							</g>
							<path
								className="st50"
								d="M842.75 311.22c.99.57 1.8 1.97 1.79 3.11l-.02 7.81-.4-.23.02-7.81c0-.89-.63-1.97-1.4-2.42l-2.42-1.4c-.77-.45-1.4-.09-1.4.8l-.02 6.4-.4.61.02-7.24c0-1.14.81-1.6 1.81-1.03l2.42 1.4z"
							/>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000093894511026471053470000015192400050847844782_"
											className="st8"
											d="M845.95 319.79c.19.11.39.22.58.34.01.01.02.02.04.02.04.02.07.04.11.06-.24-.14-.58-.12-.95.09l-.72-.42c.36-.21.69-.23.94-.09z"
										/>
									</defs>
									<clipPath id="SVGID_00000013193589980235593690000004663743854208239279_">
										<use
											xlinkHref="#SVGID_00000093894511026471053470000015192400050847844782_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000013193589980235593690000004663743854208239279_)">
										<path
											className="st87"
											d="M845.72 320.3l-.72-.42c.37-.21.71-.23.95-.09l.72.42c-.24-.14-.58-.12-.95.09z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000003824755181037473320000003060162185545138363_"
											className="st8"
											d="M844.78 323.46l-.72-.42c-.24-.14-.39-.43-.39-.86 0-.85.59-1.88 1.33-2.3l.72.42c-.74.43-1.33 1.46-1.33 2.3 0 .42.15.72.39.86z"
										/>
									</defs>
									<clipPath id="SVGID_00000062173223105499795040000006264833591545101498_">
										<use
											xlinkHref="#SVGID_00000003824755181037473320000003060162185545138363_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000062173223105499795040000006264833591545101498_)">
										<path
											className="st87"
											d="M844.78 323.46l-.72-.42c-.24-.14-.39-.43-.39-.86 0-.85.59-1.88 1.33-2.3l.72.42c-.74.43-1.33 1.46-1.33 2.3 0 .42.15.72.39.86z"
										/>
									</g>
								</g>
								<path
									className="st89"
									d="M845.72 320.3c.74-.42 1.33-.08 1.34.76 0 .85-.59 1.88-1.33 2.3-.74.43-1.34.08-1.34-.76s.59-1.87 1.33-2.3z"
								/>
							</g>
							<g className="st8">
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000076585379878589527060000018337079171447643059_"
											className="st8"
											d="M846.28 320.88c.11.06.22.13.33.19.01 0 .02.01.02.01l.06.03c-.14-.08-.33-.07-.54.05l-.41-.24c.22-.11.4-.12.54-.04z"
										/>
									</defs>
									<clipPath id="SVGID_00000124132462609366362440000003461628929622639259_">
										<use
											xlinkHref="#SVGID_00000076585379878589527060000018337079171447643059_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000124132462609366362440000003461628929622639259_)">
										<path
											className="st56"
											d="M846.16 321.17l-.41-.24c.21-.12.4-.13.54-.05l.41.24c-.14-.08-.33-.07-.54.05z"
										/>
									</g>
								</g>
								<g className="st8">
									<defs>
										<path
											id="SVGID_00000062904964514855158200000010486446563343109273_"
											className="st8"
											d="M845.62 322.96l-.41-.24c-.13-.08-.22-.25-.22-.48 0-.48.34-1.06.75-1.3l.41.24c-.42.24-.75.82-.75 1.3 0 .23.09.4.22.48z"
										/>
									</defs>
									<clipPath id="SVGID_00000009553304198839534900000012583808954141837967_">
										<use
											xlinkHref="#SVGID_00000062904964514855158200000010486446563343109273_"
											overflow="visible"
										/>
									</clipPath>
									<g clipPath="url(#SVGID_00000009553304198839534900000012583808954141837967_)">
										<path
											className="st56"
											d="M845.62 322.96l-.41-.24c-.13-.08-.22-.25-.22-.48 0-.48.34-1.06.75-1.3l.41.24c-.42.24-.75.82-.75 1.3 0 .23.09.4.22.48z"
										/>
									</g>
								</g>
								<path
									className="st58"
									d="M846.16 321.17c.42-.24.75-.05.76.43 0 .48-.33 1.06-.75 1.3s-.76.05-.76-.43c-.01-.48.33-1.06.75-1.3z"
								/>
							</g>
							<g className="st8">
								<path
									className="st15"
									d="M727.6 243.95L729.09 243.09 729.09 243.15 727.6 244.01z"
								/>
								<path
									className="st20"
									d="M728.24 243.59L729.73 242.72 731.72 243.87 730.23 244.74z"
								/>
								<path
									className="st20"
									d="M738.08 252.11L739.56 251.24 739.72 251.33 738.23 252.19z"
								/>
								<path
									className="st15"
									d="M730.23 244.74L731.72 243.87 738.87 248 737.38 248.87z"
								/>
								<path
									className="st18"
									d="M738.09 249.27L739.57 248.41 739.56 251.24 738.08 252.11z"
								/>
								<path
									className="st20"
									d="M737.38 248.87L738.87 248 739.57 248.41 738.09 249.27z"
								/>
								<path
									className="st21"
									d="M738.09 249.27L738.08 252.11 738.23 252.19 727.59 246.05 727.6 244.01 727.6 243.95 727.6 243.22 728.5 243.44 730.23 244.74 737.38 248.87z"
								/>
								<path
									className="st20"
									d="M738.09 249.27L739.57 248.41 740.39 248.88 738.9 249.74z"
								/>
								<path
									className="st17"
									d="M728.5 243.44L729.73 242.72 737.15 238.49 735.66 239.36z"
								/>
								<path
									className="st21"
									d="M735.66 239.36L737.65 240.51 737.41 240.64 730.23 244.74 728.5 243.44z"
								/>
								<path
									className="st17"
									d="M737.41 240.64L738.89 239.78 739.14 239.64 737.65 240.51z"
								/>
								<path
									className="st16"
									d="M735.66 239.36L737.15 238.49 739.14 239.64 737.65 240.51z"
								/>
								<path
									className="st20"
									d="M738.09 240.76L739.57 239.89 739.75 239.99 738.26 240.86z"
								/>
								<path
									className="st16"
									d="M737.65 240.51L739.14 239.64 739.75 239.99 738.26 240.86z"
								/>
								<path
									className="st15"
									d="M738.9 249.74L740.39 248.88 747.58 253.03 746.09 253.89z"
								/>
								<path
									className="st15"
									d="M738.92 241.49L740.41 240.62 740.39 248.88 738.9 249.74z"
								/>
								<path
									className="st22"
									d="M738.71 241.12L740.2 240.25 740.41 240.62 738.92 241.49z"
								/>
								<path
									className="st16"
									d="M738.26 240.86L739.75 239.99 740.2 240.25 738.71 241.12z"
								/>
								<path
									className="st21"
									d="M738.71 241.12L738.92 241.49 738.9 249.74 738.09 249.27 737.38 248.87 737.41 240.64 737.65 240.51 738.26 240.86z"
								/>
								<path
									className="st21"
									d="M738.09 237.92L738.09 240.03 738.09 240.76 738.26 240.86 737.65 240.51 735.66 239.36 715.17 227.71 715.18 224.88z"
								/>
								<path
									className="st18"
									d="M738.09 240.03L739.58 239.17 739.57 239.89 738.09 240.76z"
								/>
								<path
									className="st17"
									d="M738.09 240.04L738.08 240.03 738.09 240.03z"
								/>
								<path
									className="st18"
									d="M738.09 237.92L739.58 237.06 739.58 239.17 738.09 240.03z"
								/>
								<path
									transform="rotate(-30.181 738.872 239.614)"
									className="st15"
									d="M737.97 239.6H739.69V239.60999999999999H737.97z"
								/>
								<path
									className="st20"
									d="M748.56 258.16L750.05 257.29 750.2 257.38 748.72 258.25z"
								/>
								<path
									className="st18"
									d="M748.57 256.12L750.06 255.25 750.05 257.29 748.56 258.16z"
								/>
								<path
									className="st25"
									d="M748.54 256.07L750.03 255.21 750.06 255.25 748.57 256.12z"
								/>
								<path
									className="st104"
									d="M748.57 256.06L750.06 255.19 750.03 255.21 748.54 256.07z"
								/>
								<path
									className="st19"
									d="M748.57 256.12L748.54 256.07 748.57 256.06z"
								/>
								<path
									className="st18"
									d="M748.57 255.33L750.06 254.46 750.06 255.19 748.57 256.06z"
								/>
								<path
									className="st17"
									d="M748.54 256.07L750.03 255.21 750.06 255.19 748.57 256.06z"
								/>
								<path
									className="st15"
									d="M748.57 256.06L750.06 255.19 750.06 255.25 748.57 256.12z"
								/>
								<path
									className="st20"
									d="M727.26 231.76L729.1 231.01 739.58 237.06 738.09 237.92z"
								/>
								<path
									className="st20"
									d="M746.09 253.89L747.58 253.03 749.56 254.18 748.08 255.04z"
								/>
								<path
									className="st22"
									d="M748 254.91L749.49 254.04 749.56 254.18 748.08 255.04z"
								/>
								<path
									className="st22"
									d="M740.7 242.27L742.19 241.4 749.49 254.04 748 254.91z"
								/>
								<path
									className="st16"
									d="M738.71 241.12L740.2 240.25 742.19 241.4 740.7 242.27z"
								/>
								<path
									className="st21"
									d="M748 254.91L748.08 255.04 746.09 253.89 738.92 241.49 738.71 241.12 740.7 242.27z"
								/>
								<path
									className="st21"
									d="M748.57 255.33L748.57 256.06 748.54 256.07 748.57 256.12 748.56 258.16 748.72 258.25 738.23 252.19 738.08 252.11 738.09 249.27 738.9 249.74 746.09 253.89 748.08 255.04z"
								/>
								<path
									className="st20"
									d="M748.08 255.04L749.56 254.18 750.06 254.46 748.57 255.33z"
								/>
								<path
									className="st20"
									d="M748.57 255.33L750.06 254.46 750.69 254.83 749.21 255.69z"
								/>
								<path
									className="st20"
									d="M749.21 255.69L750.69 254.83 752.68 255.98 751.2 256.84z"
								/>
								<path
									className="st17"
									d="M749.21 255.69L750.7 254.83 751.01 254.65 749.52 255.52z"
								/>
								<path
									className="st20"
									d="M748.57 246.81L750.06 245.95 750.24 246.05 748.75 246.91z"
								/>
								<path
									className="st16"
									d="M748.02 246.49L749.51 245.63 750.24 246.05 748.75 246.91z"
								/>
								<path
									className="st20"
									d="M758.36 263.81L759.84 262.95 760.69 263.44 759.2 264.3z"
								/>
								<path
									className="st15"
									d="M749.54 247.37L751.03 246.51 751.01 254.65 749.52 255.52z"
								/>
								<path
									className="st16"
									d="M748.75 246.91L750.24 246.05 751.03 246.51 749.54 247.37z"
								/>
								<path
									className="st21"
									d="M749.54 247.37L749.52 255.52 749.21 255.69 748.57 255.33 748.08 255.04 748 254.91 748.02 246.49 748.75 246.91z"
								/>
								<path
									className="st15"
									d="M751.2 256.84L752.68 255.98 759.36 259.83 757.87 260.7z"
								/>
								<path
									className="st18"
									d="M748.58 243.98L750.07 243.11 750.06 245.95 748.57 246.81z"
								/>
								<path
									className="st21"
									d="M748.58 243.98L748.57 246.81 748.75 246.91 748.02 246.49 740.7 242.27 738.71 241.12 738.26 240.86 738.09 240.76 738.09 240.04 738.09 237.92z"
								/>
								<path
									className="st20"
									d="M738.09 237.92L739.58 237.06 750.07 243.11 748.58 243.98z"
								/>
								<path
									className="st21"
									d="M759.21 261.47L759.2 264.3 758.36 263.81 748.72 258.25 748.56 258.16 748.57 256.12 748.57 256.06 748.57 255.33 749.21 255.69 751.2 256.84 757.87 260.7z"
								/>
								<path
									className="st18"
									d="M759.21 261.47L760.7 260.6 760.69 263.44 759.2 264.3z"
								/>
								<path
									className="st20"
									d="M757.87 260.7L759.36 259.83 760.7 260.6 759.21 261.47z"
								/>
								<path
									className="st20"
									d="M759.21 261.47L760.7 260.6 760.88 260.71 759.39 261.57z"
								/>
								<path
									className="st17"
									d="M749.52 255.52L751.01 254.65 758.12 250.6 756.63 251.46z"
								/>
								<path
									className="st17"
									d="M757.89 253.03L759.38 252.16 760.11 251.75 758.62 252.61z"
								/>
								<path
									className="st21"
									d="M749.52 255.52L756.63 251.46 758.62 252.61 757.89 253.03 751.2 256.84 749.21 255.69z"
								/>
								<path
									className="st16"
									d="M756.63 251.46L758.12 250.6 760.11 251.75 758.62 252.61z"
								/>
								<path
									className="st15"
									d="M759.39 261.57L760.88 260.71 767.86 264.74 766.38 265.61z"
								/>
								<path
									className="st15"
									d="M759.41 253.54L760.9 252.68 760.88 260.71 759.39 261.57z"
								/>
								<path
									className="st16"
									d="M758.62 252.61L760.11 251.75 760.49 251.97 759 252.83z"
								/>
								<path
									className="st21"
									d="M759 252.83L759.41 253.54 759.39 261.57 759.21 261.47 757.87 260.7 757.89 253.03 758.62 252.61z"
								/>
								<path
									transform="rotate(-30.211 759.915 252.748)"
									className="st22"
									d="M759.09 252.34H760.8100000000001V253.16H759.09z"
								/>
								<path
									className="st20"
									d="M768.84 269.87L770.33 269 770.48 269.09 768.99 269.96z"
								/>
								<path
									className="st20"
									d="M758.62 252.61L760.11 251.75 760.72 252.1 759.23 252.97z"
								/>
								<path
									className="st16"
									d="M759 252.83L760.49 251.97 762.48 253.12 760.99 253.98z"
								/>
								<path
									className="st18"
									d="M759.23 252.26L760.72 251.4 760.72 252.1 759.23 252.97z"
								/>
								<path
									className="st19"
									d="M759.23 252.22L759.25 252.25 759.23 252.26z"
								/>
								<path
									className="st18"
									d="M759.23 252.22L760.72 251.36 760.72 251.4 759.23 252.26z"
								/>
								<path
									className="st17"
									d="M759.25 252.25L760.74 251.39 760.72 251.4 759.23 252.26z"
								/>
								<path
									className="st22"
									d="M759.23 252.22L760.72 251.36 760.74 251.39 759.25 252.25z"
								/>
								<path
									className="st18"
									d="M769 267.92L770.49 267.05 770.48 269.09 768.99 269.96z"
								/>
								<path
									className="st26"
									d="M769 267.92L770.49 267.05 770.51 267.04 769.03 267.9z"
								/>
								<path className="st19" d="M769 267.85L769.03 267.9 769 267.92z" />
								<path
									className="st18"
									d="M769 267.85L770.49 266.99 770.49 267.05 769 267.92z"
								/>
								<path
									className="st21"
									d="M769 267.12L769 267.85 769 267.92 768.99 269.96 768.84 269.87 758.36 263.81 759.2 264.3 759.21 261.47 759.39 261.57 766.38 265.61 768.37 266.76z"
								/>
								<path
									className="st22"
									d="M769 267.85L770.49 266.99 770.51 267.04 769.03 267.9z"
								/>
								<path
									className="st20"
									d="M766.38 265.61L767.86 264.74 769.85 265.89 768.37 266.76z"
								/>
								<path
									transform="rotate(-30.106 769.026 266.06)"
									className="st22"
									d="M768.09 265.75H769.8100000000001V266.37H768.09z"
								/>
								<path
									className="st22"
									d="M760.99 253.98L762.48 253.12 769.54 265.36 768.06 266.22z"
								/>
								<path
									className="st21"
									d="M760.99 253.98L768.06 266.22 768.37 266.75 766.38 265.61 759.41 253.54 759 252.83z"
								/>
								<path
									className="st20"
									d="M768.37 266.76L769.85 265.89 770.49 266.26 769 267.12z"
								/>
								<path
									className="st18"
									d="M769 267.12L770.49 266.26 770.49 266.99 769 267.85z"
								/>
								<path
									className="st18"
									d="M759.24 250.13L760.73 249.27 760.72 251.36 759.23 252.22z"
								/>
								<path
									className="st21"
									d="M759.24 250.13L759.23 252.22 759.23 252.26 759.23 252.97 758.62 252.61 756.63 251.46 749.54 247.37 748.75 246.91 748.57 246.81 748.58 243.98z"
								/>
								<path
									className="st20"
									d="M748.58 243.98L750.07 243.11 760.73 249.27 759.24 250.13z"
								/>
								<path
									className="st20"
									d="M769 267.12L770.49 266.26 770.98 266.54 769.49 267.41z"
								/>
								<path
									className="st17"
									d="M769.49 267.41L770.98 266.54 771.06 266.5 769.57 267.36z"
								/>
								<path
									className="st20"
									d="M769.49 267.41L770.98 266.54 772.98 267.69 771.49 268.56z"
								/>
								<path
									className="st16"
									d="M768.08 258.08L769.57 257.21 770.36 257.67 768.87 258.53z"
								/>
								<path
									className="st16"
									d="M768.87 258.53L770.36 257.67 771.08 258.08 769.6 258.95z"
								/>
								<path
									className="st20"
									d="M768.87 258.53L770.36 257.67 770.54 257.77 769.05 258.63z"
								/>
								<path
									className="st20"
									d="M779.32 275.92L780.81 275.05 780.97 275.14 779.48 276.01z"
								/>
								<path
									className="st17"
									d="M769.57 267.36L771.06 266.5 778.41 262.31 776.92 263.18z"
								/>
								<path
									className="st15"
									d="M769.6 258.95L771.08 258.08 771.06 266.5 769.57 267.36z"
								/>
								<path
									className="st21"
									d="M769.6 258.95L769.57 267.36 769.49 267.41 769 267.12 768.37 266.76 768.06 266.22 768.08 258.08 768.87 258.53z"
								/>
								<path
									className="st15"
									d="M771.49 268.56L772.98 267.69 780.16 271.84 778.67 272.71z"
								/>
								<path
									className="st20"
									d="M759.24 250.13L760.73 249.27 770.55 254.94 769.06 255.8z"
								/>
								<path
									className="st21"
									d="M769.06 255.8L769.05 258.63 768.87 258.53 768.08 258.08 760.99 253.98 759 252.83 758.62 252.61 759.23 252.97 759.23 252.26 759.24 250.13z"
								/>
								<path
									className="st18"
									d="M769.06 255.8L770.55 254.94 770.54 257.77 769.05 258.63z"
								/>
								<path
									className="st18"
									d="M779.48 273.18L780.97 272.31 780.97 275.14 779.48 276.01z"
								/>
								<path
									className="st20"
									d="M778.67 272.71L780.16 271.84 780.97 272.31 779.48 273.18z"
								/>
								<path
									className="st21"
									d="M779.48 273.18L779.48 276.01 779.32 275.92 768.84 269.87 768.99 269.96 769 267.92 769.03 267.9 769 267.85 769 267.12 769.49 267.41 771.49 268.56 778.67 272.71z"
								/>
								<path
									className="st20"
									d="M779.48 273.18L780.97 272.31 781.68 272.72 780.19 273.58z"
								/>
								<path
									className="st17"
									d="M778.69 264.45L780.18 263.58 780.4 263.46 778.91 264.33z"
								/>
								<path
									className="st16"
									d="M776.92 263.18L778.41 262.31 780.4 263.46 778.91 264.33z"
								/>
								<path
									className="st21"
									d="M769.57 267.36L776.92 263.18 778.91 264.33 778.69 264.45 771.49 268.56 769.49 267.41z"
								/>
								<path
									className="st16"
									d="M778.91 264.33L780.4 263.46 780.84 263.72 779.35 264.58z"
								/>
								<path
									className="st20"
									d="M779.35 264.58L780.84 263.72 781.02 263.82 779.53 264.69z"
								/>
								<path
									className="st15"
									d="M780.19 273.58L781.68 272.72 788.83 276.85 787.34 277.71z"
								/>
								<path
									className="st15"
									d="M780.21 265.36L781.7 264.49 781.68 272.72 780.19 273.58z"
								/>
								<path
									className="st22"
									d="M779.97 264.94L781.46 264.07 781.7 264.49 780.21 265.36z"
								/>
								<path
									className="st20"
									d="M787.34 277.71L788.83 276.85 790.82 278 789.33 278.86z"
								/>
								<path
									className="st20"
									d="M789.81 281.97L791.3 281.11 791.45 281.19 789.96 282.06z"
								/>
								<path
									className="st18"
									d="M789.97 280.02L791.45 279.16 791.45 281.19 789.96 282.06z"
								/>
								<path
									className="st26"
									d="M789.97 280.02L791.45 279.16 791.49 279.14 790 280.01z"
								/>
								<path className="st19" d="M789.97 279.96L790 280.01 789.97 280.02z" />
								<path
									className="st18"
									d="M789.97 279.96L791.46 279.09 791.45 279.16 789.97 280.02z"
								/>
								<path
									className="st22"
									d="M789.97 279.96L791.45 279.09 791.49 279.14 790 280.01z"
								/>
								<path
									className="st22"
									d="M789.22 278.66L790.71 277.8 790.82 278 789.33 278.86z"
								/>
								<path
									className="st22"
									d="M781.96 266.09L783.45 265.22 790.71 277.8 789.22 278.66z"
								/>
								<path
									className="st18"
									d="M789.97 279.23L791.46 278.36 791.46 279.09 789.97 279.96z"
								/>
								<path
									className="st20"
									d="M789.33 278.86L790.82 278 791.46 278.36 789.97 279.23z"
								/>
								<path
									className="st20"
									d="M789.97 279.23L791.46 278.36 791.95 278.65 790.46 279.51z"
								/>
								<path
									className="st21"
									d="M790.76 271.17L790.74 279.36 790.46 279.51 789.97 279.23 789.33 278.86 789.22 278.66 789.24 270.29 789.84 270.64z"
								/>
								<path
									className="st21"
									d="M781.96 266.09L789.22 278.66 789.33 278.86 787.34 277.71 780.21 265.36 779.97 264.94z"
								/>
								<path
									className="st16"
									d="M779.35 264.58L780.84 263.72 781.46 264.07 779.97 264.94z"
								/>
								<path
									className="st18"
									d="M779.53 263.96L781.02 263.09 781.02 263.82 779.53 264.69z"
								/>
								<path
									transform="rotate(-30.152 780.225 263.517)"
									className="st22"
									d="M779.42 263.52H781.14V263.53H779.42z"
								/>
								<path
									className="st16"
									d="M779.97 264.94L781.46 264.07 783.45 265.22 781.96 266.09z"
								/>
								<path
									className="st18"
									d="M779.54 261.85L781.03 260.99 781.02 263.09 779.53 263.96z"
								/>
								<path
									className="st16"
									d="M789.24 270.29L790.73 269.43 791.33 269.77 789.84 270.64z"
								/>
								<path
									className="st20"
									d="M789.84 270.64L791.33 269.77 791.51 269.87 790.02 270.74z"
								/>
								<path
									className="st16"
									d="M789.84 270.64L791.33 269.77 792.25 270.3 790.76 271.17z"
								/>
								<path
									className="st21"
									d="M790.03 267.91L790.02 270.74 789.84 270.64 789.24 270.29 781.96 266.09 779.97 264.94 779.35 264.58 779.53 264.69 779.53 263.97 779.54 261.85z"
								/>
								<path
									className="st21"
									d="M779.53 264.69L779.35 264.58 778.91 264.33 778.69 264.45 778.67 272.71 779.48 273.18 780.19 273.58 780.21 265.36 779.97 264.94z"
								/>
								<path
									className="st17"
									d="M779.53 263.96L779.54 263.97 779.53 263.97z"
								/>
								<path
									className="st20"
									d="M769.06 255.8L770.55 254.94 781.03 260.99 779.54 261.85z"
								/>
								<path
									className="st21"
									d="M779.54 261.85L779.53 263.96 779.53 264.69 779.35 264.58 778.91 264.33 776.92 263.18 769.6 258.95 768.87 258.53 769.05 258.63 769.06 255.8z"
								/>
								<path
									className="st20"
									d="M800.29 288.03L801.78 287.16 801.94 287.25 800.45 288.11z"
								/>
								<path
									className="st21"
									d="M800.45 285.28L800.45 288.11 800.29 288.03 789.81 281.97 789.96 282.06 789.97 280.02 790 280.01 789.97 279.96 789.97 279.23 790.46 279.51 792.46 280.66 799.57 284.77z"
								/>
								<path
									className="st21"
									d="M789.97 279.23L789.97 279.96 789.97 280.02 789.96 282.06 789.81 281.97 779.32 275.92 779.48 276.01 779.48 273.18 780.19 273.58 787.34 277.71 789.33 278.86z"
								/>
								<path
									className="st20"
									d="M790.46 279.51L791.95 278.65 793.94 279.8 792.46 280.66z"
								/>
								<path
									className="st17"
									d="M790.46 279.51L791.95 278.65 792.23 278.49 790.74 279.36z"
								/>
								<path
									className="st15"
									d="M790.76 271.17L792.25 270.3 792.23 278.49 790.74 279.36z"
								/>
								<path
									className="st15"
									d="M792.46 280.66L793.94 279.8 801.06 283.91 799.57 284.77z"
								/>
								<path
									className="st18"
									d="M790.03 267.91L791.51 267.04 791.51 269.87 790.02 270.74z"
								/>
								<path
									className="st20"
									d="M779.54 261.85L781.03 260.99 791.51 267.04 790.03 267.91z"
								/>
								<path
									className="st18"
									d="M800.45 285.28L801.94 284.42 801.94 287.25 800.45 288.11z"
								/>
								<path
									className="st20"
									d="M799.57 284.77L801.06 283.91 801.94 284.42 800.45 285.28z"
								/>
								<path
									className="st20"
									d="M800.45 285.28L801.94 284.42 802.58 284.78 801.09 285.65z"
								/>
								<path
									className="st17"
									d="M790.74 279.36L792.23 278.49 799.38 274.42 797.89 275.28z"
								/>
								<path
									className="st17"
									d="M799.59 276.6L801.08 275.73 801.37 275.57 799.88 276.43z"
								/>
								<path
									className="st21"
									d="M790.74 279.36L797.89 275.28 799.88 276.43 799.59 276.6 792.46 280.66 790.46 279.51z"
								/>
								<path
									className="st16"
									d="M797.89 275.28L799.38 274.42 801.37 275.57 799.88 276.43z"
								/>
								<path
									className="st16"
									d="M799.88 276.43L801.37 275.57 801.81 275.83 800.32 276.69z"
								/>
								<path
									className="st20"
									d="M800.32 276.69L801.81 275.83 801.99 275.93 800.5 276.79z"
								/>
								<path
									className="st15"
									d="M801.09 285.65L802.58 284.78 809.8 288.95 808.31 289.82z"
								/>
								<path
									className="st15"
									d="M801.11 277.35L802.6 276.48 802.58 284.78 801.09 285.65z"
								/>
								<path
									className="st22"
									d="M800.94 277.04L802.42 276.18 802.6 276.48 801.11 277.35z"
								/>
								<path
									className="st20"
									d="M808.31 289.82L809.8 288.95 811.79 290.1 810.3 290.97z"
								/>
								<path
									className="st21"
									d="M802.93 278.19L810.12 290.65 810.3 290.97 808.31 289.82 801.11 277.35 800.93 277.04z"
								/>
								<path
									className="st21"
									d="M800.94 277.04L801.11 277.35 801.09 285.65 800.45 285.28 799.57 284.77 799.59 276.6 799.88 276.43 800.32 276.69z"
								/>
								<path
									className="st16"
									d="M800.32 276.69L801.81 275.83 802.42 276.18 800.94 277.04z"
								/>
								<path
									className="st20"
									d="M810.78 294.08L812.26 293.21 812.42 293.3 810.93 294.17z"
								/>
								<path className="st17" d="M800.5 276.07L800.51 276.07 800.5 276.08z" />
								<path
									className="st18"
									d="M800.5 276.07L801.99 275.2 801.99 275.93 800.5 276.79z"
								/>
								<path
									className="st21"
									d="M800.51 273.96L800.5 276.07 800.5 276.79 800.32 276.69 799.88 276.43 797.89 275.28 790.76 271.17 789.84 270.64 790.02 270.74 790.03 267.91z"
								/>
								<path
									transform="rotate(-30.19 801.21 275.623)"
									fill="#505d67"
									d="M800.39 275.63H802.11V275.64H800.39z"
								/>
								<path
									className="st18"
									d="M810.94 292.13L812.42 291.27 812.42 293.3 810.93 294.17z"
								/>
								<path
									className="st26"
									d="M810.94 292.13L812.42 291.27 812.45 291.25 810.97 292.12z"
								/>
								<path
									className="st19"
									d="M810.94 292.06L810.97 292.11 810.94 292.13z"
								/>
								<path
									className="st18"
									d="M810.94 292.06L812.42 291.2 812.42 291.27 810.94 292.13z"
								/>
								<path
									className="st22"
									d="M810.94 292.06L812.42 291.2 812.45 291.25 810.97 292.11z"
								/>
								<path
									transform="rotate(-30.14 811.019 290.394)"
									className="st22"
									d="M810.1 290.19H811.82V290.56H810.1z"
								/>
								<path
									className="st22"
									d="M802.93 278.19L804.42 277.33 811.61 289.78 810.12 290.65z"
								/>
								<path
									className="st16"
									d="M800.93 277.04L802.42 276.18 804.42 277.33 802.93 278.19z"
								/>
								<path
									className="st18"
									d="M800.51 273.96L802 273.1 801.99 275.2 800.5 276.07z"
								/>
								<path
									className="st20"
									d="M790.03 267.91L791.51 267.04 802 273.1 800.51 273.96z"
								/>
								<path
									className="st20"
									d="M810.3 290.97L811.79 290.1 812.43 290.47 810.94 291.33z"
								/>
								<path
									className="st18"
									d="M810.94 291.33L812.43 290.47 812.42 291.2 810.94 292.06z"
								/>
								<path
									className="st21"
									d="M810.94 291.33L810.94 292.06 810.94 292.13 810.93 294.17 810.78 294.08 800.29 288.03 800.45 288.11 800.45 285.28 801.09 285.65 808.31 289.82 810.3 290.97z"
								/>
								<path
									className="st20"
									d="M811.43 291.62L812.92 290.76 814.91 291.91 813.42 292.77z"
								/>
								<path
									className="st17"
									d="M811.43 291.62L812.92 290.76 813.12 290.64 811.63 291.5z"
								/>
								<path
									className="st20"
									d="M810.94 291.33L812.43 290.47 812.92 290.76 811.43 291.62z"
								/>
								<path
									className="st16"
									d="M810.14 282.36L811.63 281.49 812.3 281.88 810.81 282.74z"
								/>
								<path
									className="st16"
									d="M810.81 282.74L812.3 281.88 813.15 282.37 811.66 283.23z"
								/>
								<path
									className="st20"
									d="M810.81 282.74L812.3 281.88 812.48 281.98 810.99 282.85z"
								/>
								<path
									className="st20"
									d="M819.79 299.28L821.28 298.42 822.9 299.36 821.42 300.22z"
								/>
								<path
									className="st15"
									d="M811.66 283.23L813.15 282.37 813.12 290.64 811.63 291.5z"
								/>
								<path
									className="st21"
									d="M811.66 283.23L811.63 291.5 811.43 291.62 810.94 291.33 810.3 290.97 810.12 290.65 810.14 282.36 810.81 282.74z"
								/>
								<path
									className="st15"
									d="M813.42 292.77L814.91 291.91 821.33 295.61 819.84 296.47z"
								/>
								<path
									className="st21"
									d="M810.99 280.01L810.99 282.85 810.81 282.74 810.14 282.36 802.93 278.19 800.94 277.04 800.32 276.69 800.5 276.79 800.5 276.08 800.51 273.96z"
								/>
								<path
									className="st18"
									d="M810.99 280.01L812.48 279.15 812.48 281.98 810.99 282.85z"
								/>
								<path
									className="st20"
									d="M800.51 273.96L802 273.1 812.48 279.15 810.99 280.01z"
								/>
								<path
									className="st20"
									d="M819.84 296.47L821.33 295.61 822.85 296.49 821.36 297.35z"
								/>
								<path
									className="st21"
									d="M821.42 297.39L821.42 300.22 819.79 299.28 810.78 294.08 810.93 294.17 810.94 292.13 810.97 292.12 810.94 292.06 810.94 291.33 811.43 291.62 813.42 292.77 819.84 296.47 821.36 297.35z"
								/>
								<path
									className="st20"
									d="M821.36 297.35L822.85 296.49 822.91 296.52 821.42 297.39z"
								/>
								<path
									className="st18"
									d="M821.42 297.39L822.91 296.52 822.9 299.36 821.42 300.22z"
								/>
								<path
									className="st17"
									d="M811.63 291.5L813.12 290.64 820.34 286.52 818.85 287.39z"
								/>
								<path
									className="st15"
									d="M821.42 297.39L822.91 296.52 829.29 300.2 827.8 301.07z"
								/>
								<path
									className="st15"
									d="M821.38 289.95L822.87 289.08 822.85 296.49 821.36 297.35z"
								/>
								<path
									className="st22"
									d="M820.64 288.66L822.12 287.8 822.87 289.08 821.38 289.95z"
								/>
								<path
									className="st17"
									d="M819.86 289.1L821.35 288.24 822.12 287.8 820.64 288.66z"
								/>
								<path
									className="st21"
									d="M820.64 288.66L821.38 289.95 821.36 297.35 819.84 296.47 819.86 289.1z"
								/>
								<path
									className="st21"
									d="M830.28 302.5L830.28 303.24 830.25 303.25 830.28 303.3 830.28 305.34 830.43 305.42 819.79 299.28 821.42 300.22 821.42 297.39 827.8 301.07 829.79 302.22z"
								/>
								<path
									className="st20"
									d="M830.28 305.34L831.77 304.47 831.92 304.56 830.43 305.42z"
								/>
								<path
									className="st17"
									d="M820.64 288.66L822.12 287.8 822.34 287.68 820.85 288.54z"
								/>
								<path
									className="st16"
									d="M818.85 287.39L820.34 286.52 822.33 287.68 820.85 288.54z"
								/>
								<path
									className="st21"
									d="M811.63 291.5L818.85 287.39 820.85 288.54 820.64 288.66 819.86 289.1 813.42 292.77 811.43 291.62z"
								/>
								<path
									className="st16"
									d="M820.85 288.54L822.34 287.68 823.9 288.58 822.41 289.44z"
								/>
								<path
									className="st20"
									d="M820.85 288.54L822.34 287.68 822.96 288.03 821.47 288.9z"
								/>
								<path
									className="st18"
									d="M821.47 288.17L822.96 287.31 822.96 288.03 821.47 288.9z"
								/>
								<path
									className="st22"
									d="M821.47 288.17L822.96 287.31 822.97 287.31 821.48 288.18z"
								/>
								<path
									className="st20"
									d="M827.8 301.07L829.29 300.2 831.28 301.36 829.79 302.22z"
								/>
								<path
									className="st22"
									d="M822.41 289.44L823.9 288.58 831.08 301.01 829.59 301.87z"
								/>
								<path
									className="st18"
									d="M821.48 286.07L822.97 285.2 822.96 287.31 821.47 288.17z"
								/>
								<path
									className="st21"
									d="M822.41 289.44L829.59 301.87 829.79 302.22 827.8 301.07 821.38 289.95 820.64 288.66 820.85 288.54z"
								/>
								<path
									className="st20"
									d="M830.29 293.99L831.78 293.12 831.95 293.23 830.46 294.09z"
								/>
								<path
									className="st16"
									d="M829.61 293.6L831.1 292.74 831.95 293.23 830.46 294.09z"
								/>
								<path
									className="st21"
									d="M830.29 291.16L830.29 293.99 830.46 294.09 829.61 293.6 822.41 289.44 820.85 288.54 821.47 288.9 821.47 288.18 821.48 286.07z"
								/>
								<path
									className="st17"
									d="M821.47 288.17L821.48 288.18 821.47 288.18z"
								/>
								<path
									className="st18"
									d="M830.28 303.3L831.77 302.43 831.77 304.47 830.28 305.34z"
								/>
								<path
									className="st15"
									d="M830.28 303.23L831.77 302.37 831.77 302.43 830.28 303.3z"
								/>
								<path
									className="st104"
									d="M830.28 303.24L831.77 302.37 831.74 302.39 830.25 303.25z"
								/>
								<path className="st19" d="M830.28 303.3L830.25 303.25 830.28 303.23z" />
								<path
									className="st25"
									d="M830.28 303.3l1.49-.87-1.49.87zm-.03-.05l.03.05v-.06l-.03.01z"
								/>
								<path
									transform="rotate(-30.178 830.434 301.605)"
									className="st22"
									d="M829.57 301.41H831.2900000000001V301.81H829.57z"
								/>
								<path
									className="st18"
									d="M830.28 302.5L831.77 301.64 831.77 302.37 830.28 303.24z"
								/>
								<path
									className="st20"
									d="M829.79 302.22L831.28 301.36 831.77 301.64 830.28 302.5z"
								/>
								<path
									className="st20"
									d="M830.28 302.5L831.77 301.64 832.41 302.01 830.92 302.87z"
								/>
								<path
									className="st20"
									d="M830.92 302.87L832.41 302.01 834.4 303.16 832.91 304.02z"
								/>
								<path
									className="st17"
									d="M830.92 302.87L832.41 302.01 832.59 301.9 831.1 302.77z"
								/>
								<path
									className="st20"
									d="M810.99 280.01L812.48 279.15 822.97 285.2 821.48 286.07z"
								/>
								<path
									className="st21"
									d="M821.48 286.07L821.47 288.17 821.47 288.9 820.85 288.54 818.85 287.39 811.66 283.23 810.81 282.74 810.99 282.85 810.99 280.01z"
								/>
								<path
									className="st20"
									d="M840.76 311.39L842.25 310.52 842.4 310.61 840.91 311.48z"
								/>
								<path
									className="st16"
									d="M830.46 294.09L831.95 293.23 832.62 293.61 831.13 294.48z"
								/>
								<path
									className="st21"
									d="M831.13 294.48L831.1 302.77 830.92 302.87 830.28 302.5 829.79 302.22 829.59 301.87 829.61 293.6 830.46 294.09z"
								/>
								<path
									className="st17"
									d="M831.1 302.77L832.59 301.9 839.83 297.78 838.34 298.64z"
								/>
								<path
									className="st15"
									d="M831.13 294.48L832.62 293.61 832.59 301.9 831.1 302.77z"
								/>
								<path
									className="st15"
									d="M832.91 304.02L834.4 303.16 841.63 307.33 840.14 308.19z"
								/>
								<path
									className="st18"
									d="M830.29 291.16L831.78 290.29 831.78 293.12 830.29 293.99z"
								/>
								<path
									className="st20"
									d="M821.48 286.07L822.97 285.2 831.78 290.29 830.29 291.16z"
								/>
								<path
									className="st21"
									d="M840.77 308.56L840.76 311.39 840.91 311.48 830.43 305.42 830.28 305.34 830.28 303.3 830.28 303.24 830.28 302.5 830.92 302.87 832.91 304.02 840.14 308.19z"
								/>
								<path
									className="st18"
									d="M840.77 308.56L842.26 307.69 842.25 310.52 840.76 311.39z"
								/>
								<path
									className="st20"
									d="M840.14 308.19L841.63 307.33 842.26 307.69 840.77 308.56z"
								/>
								<path
									className="st20"
									d="M840.77 308.56L842.26 307.69 843.14 308.2 841.65 309.07z"
								/>
								<path
									className="st17"
									d="M840.16 299.89L841.65 299.02 841.82 298.93 840.33 299.79z"
								/>
								<path
									className="st16"
									d="M838.34 298.64L839.83 297.78 841.82 298.92 840.33 299.79z"
								/>
								<path
									className="st21"
									d="M838.34 298.64L840.33 299.79 840.16 299.89 832.91 304.02 830.92 302.87 831.1 302.77z"
								/>
								<path
									className="st21"
									d="M840.78 297.21L840.77 299.32 840.77 300.04 840.95 300.14 840.33 299.79 838.34 298.64 831.13 294.48 830.46 294.09 830.29 293.99 830.29 291.16z"
								/>
								<path
									className="st20"
									d="M840.77 300.04L842.26 299.18 842.44 299.28 840.95 300.14z"
								/>
								<path
									className="st16"
									d="M841.82 298.93L840.77 299.54 840.77 300.04 840.95 300.14 842.43 299.28z"
								/>
								<path
									className="st15"
									d="M841.65 309.07L843.14 308.2 850.26 312.31 848.77 313.18z"
								/>
								<path
									className="st15"
									d="M841.68 300.89L843.17 300.03 843.14 308.2 841.65 309.07z"
								/>
								<path
									className="st22"
									d="M841.39 300.4L842.88 299.54 843.17 300.03 841.68 300.89z"
								/>
								<path
									className="st21"
									d="M841.39 300.4L841.68 300.89 841.65 309.07 840.77 308.56 840.14 308.19 840.16 299.89 840.33 299.79 840.95 300.14z"
								/>
								<path
									className="st16"
									d="M840.95 300.14L842.44 299.28 842.88 299.54 841.39 300.4z"
								/>
								<path
									transform="rotate(-30.163 841.578 298.857)"
									className="st15"
									d="M840.65 298.88H842.37V298.89H840.65z"
								/>
								<path
									className="st17"
									d="M840.77 299.32L840.77 299.32 840.77 299.32z"
								/>
								<path
									className="st18"
									d="M840.77 299.32L842.26 298.45 842.26 299.18 840.77 300.04z"
								/>
								<path
									className="st20"
									d="M851.25 317.44L852.73 316.58 852.89 316.67 851.4 317.53z"
								/>
								<path
									className="st18"
									d="M851.25 315.41L852.74 314.54 852.73 316.58 851.25 317.44z"
								/>
								<path
									className="st21"
									d="M851.25 314.61L851.25 315.34 851.22 315.36 851.25 315.41 851.25 317.44 851.4 317.53 840.91 311.48 840.76 311.39 840.77 308.56 841.65 309.07 848.77 313.18 850.76 314.33z"
								/>
								<path
									className="st19"
									d="M851.25 315.41L851.22 315.36 851.25 315.34z"
								/>
								<path
									className="st25"
									d="M851.25 315.34L851.22 315.36 851.25 315.41 852.74 314.54 852.71 314.49 851.25 315.34z"
								/>
								<path
									className="st15"
									d="M851.25 315.34L852.74 314.47 852.74 314.54 851.25 315.41z"
								/>
								<path
									className="st17"
									d="M851.22 315.36L852.71 314.49 852.74 314.47 851.25 315.34z"
								/>
								<path
									className="st20"
									d="M830.29 291.16L831.78 290.29 842.27 296.34 840.78 297.21z"
								/>
								<path
									className="st18"
									d="M840.78 297.21L842.27 296.34 842.26 298.45 840.77 299.32z"
								/>
								<path
									className="st20"
									d="M848.77 313.18L850.26 312.31 852.25 313.46 850.76 314.33z"
								/>
								<path
									className="st22"
									d="M850.49 313.85L851.97 312.99 852.25 313.46 850.76 314.32z"
								/>
								<path
									className="st21"
									d="M850.49 313.85L850.76 314.32 848.77 313.18 841.68 300.89 841.39 300.4 843.38 301.55z"
								/>
								<path
									className="st16"
									d="M841.39 300.4L842.88 299.54 844.87 300.69 843.38 301.55z"
								/>
								<path
									className="st22"
									d="M843.38 301.55L844.87 300.69 851.97 312.99 850.49 313.85z"
								/>
								<path
									className="st18"
									d="M851.25 314.61L852.74 313.75 852.74 314.47 851.25 315.34z"
								/>
								<path
									className="st20"
									d="M850.76 314.33L852.25 313.46 852.74 313.75 851.25 314.61z"
								/>
								<path
									className="st20"
									d="M851.89 314.98L853.38 314.11 855.37 315.26 853.88 316.13z"
								/>
								<path
									className="st15"
									d="M853.88 316.13L855.37 315.26 862.52 319.39 861.03 320.26z"
								/>
								<path
									className="st17"
									d="M861.06 312.04L862.55 311.17 862.79 311.03 861.3 311.9z"
								/>
								<path
									className="st21"
									d="M859.31 310.75L861.3 311.9 861.06 312.04 853.88 316.13 851.89 314.98 852 314.91z"
								/>
								<path
									className="st20"
									d="M851.25 314.61L852.74 313.75 853.38 314.11 851.89 314.98z"
								/>
								<path
									className="st17"
									d="M851.89 314.98L853.38 314.11 853.49 314.04 852 314.91z"
								/>
								<path
									className="st20"
									d="M851.25 306.09L852.74 305.23 852.92 305.33 851.43 306.2z"
								/>
								<path
									className="st16"
									d="M850.51 305.67L852 304.8 852.92 305.33 851.43 306.2z"
								/>
								<path
									className="st18"
									d="M861.74 320.67L863.23 319.8 863.22 322.63 861.73 323.5z"
								/>
								<path
									className="st21"
									d="M872.22 326.72L872.22 327.45 872.19 327.46 872.22 327.52 872.21 329.55 872.37 329.64 861.88 323.59 861.73 323.5 861.74 320.67 862.55 321.13 869.74 325.28 871.73 326.43z"
								/>
								<path
									className="st21"
									d="M861.73 323.5l.15.09-.15-.09zm.01-2.83l-.7-.41-7.16-4.13-1.99-1.15-.64-.36v.8l-.01 2.04.16.09 10.33 5.97.01-2.85z"
								/>
								<path
									className="st15"
									d="M852.03 306.54L853.52 305.68 853.49 314.04 852 314.91z"
								/>
								<path
									className="st16"
									d="M851.43 306.2L852.92 305.33 853.52 305.68 852.03 306.54z"
								/>
								<path
									className="st21"
									d="M852.03 306.54L852 314.91 851.89 314.98 851.25 314.61 850.76 314.33 850.49 313.85 850.51 305.67 851.43 306.2z"
								/>
								<path
									className="st20"
									d="M840.78 297.21L842.27 296.34 852.75 302.4 851.26 303.26z"
								/>
								<path
									className="st21"
									d="M851.26 303.26L851.25 306.09 851.43 306.2 850.51 305.67 843.38 301.55 841.39 300.4 840.95 300.14 840.77 300.04 840.77 299.32 840.78 297.21z"
								/>
								<path
									className="st18"
									d="M851.26 303.26L852.75 302.4 852.74 305.23 851.25 306.09z"
								/>
								<path
									className="st20"
									d="M861.03 320.26L862.52 319.39 863.23 319.8 861.74 320.67z"
								/>
								<path
									className="st20"
									d="M861.74 320.67L863.23 319.8 864.04 320.27 862.55 321.13z"
								/>
								<path
									className="st17"
									d="M852 314.91L853.49 314.04 860.8 309.88 859.31 310.75z"
								/>
								<path
									className="st16"
									d="M859.31 310.75L860.8 309.88 862.79 311.03 861.3 311.9z"
								/>
								<path
									className="st20"
									d="M861.74 312.15L863.23 311.28 863.4 311.39 861.92 312.25z"
								/>
								<path
									className="st16"
									d="M861.3 311.9L862.79 311.03 863.4 311.39 861.92 312.25z"
								/>
								<path
									className="st15"
									d="M862.55 321.13L864.04 320.27 871.23 324.42 869.74 325.28z"
								/>
								<path
									className="st15"
									d="M862.58 312.88L864.06 312.01 864.04 320.27 862.55 321.13z"
								/>
								<path
									className="st22"
									d="M862.36 312.51L863.85 311.64 864.06 312.01 862.58 312.88z"
								/>
								<path
									className="st16"
									d="M861.92 312.25L863.4 311.39 863.85 311.64 862.36 312.51z"
								/>
								<path
									className="st21"
									d="M862.36 312.51L862.58 312.88 862.55 321.13 861.74 320.67 861.03 320.26 861.06 312.04 861.3 311.9 861.92 312.25z"
								/>
								<path
									className="st17"
									d="M861.74 311.43L861.73 311.42 861.74 311.42z"
								/>
								<path
									className="st21"
									d="M861.75 309.32L861.74 311.42 861.74 312.15 861.92 312.25 861.3 311.9 859.31 310.75 852.03 306.54 851.43 306.2 851.25 306.09 851.26 303.26z"
								/>
								<path
									className="st15"
									d="M861.74 311.42L863.23 310.55 863.23 310.57 861.74 311.43z"
								/>
								<path
									className="st18"
									d="M861.74 311.42L863.23 310.55 863.23 311.28 861.74 312.15z"
								/>
								<path
									className="st20"
									d="M872.21 329.55L873.7 328.69 873.86 328.77 872.37 329.64z"
								/>
								<path
									className="st18"
									d="M872.22 327.52L873.71 326.65 873.7 328.69 872.21 329.55z"
								/>
								<path
									className="st25"
									d="M872.19 327.46L873.68 326.6 873.71 326.65 872.22 327.52z"
								/>
								<path
									className="st17"
									d="M872.19 327.46L873.68 326.6 873.71 326.58 872.22 327.45z"
								/>
								<path
									className="st15"
									d="M872.22 327.45L873.71 326.58 873.71 326.65 872.22 327.51z"
								/>
								<path
									className="st104"
									d="M872.22 327.45L873.71 326.58 873.68 326.6 872.19 327.46z"
								/>
								<path
									className="st19"
									d="M872.22 327.51L872.19 327.46 872.22 327.45z"
								/>
								<path
									className="st20"
									d="M851.26 303.26L852.75 302.4 863.23 308.45 861.75 309.32z"
								/>
								<path
									className="st18"
									d="M861.75 309.32L863.23 308.45 863.23 310.55 861.74 311.42z"
								/>
								<path
									className="st20"
									d="M869.74 325.28L871.23 324.42 873.22 325.57 871.73 326.43z"
								/>
								<path
									className="st22"
									d="M871.65 326.3L873.14 325.43 873.22 325.57 871.73 326.43z"
								/>
								<path
									className="st22"
									d="M864.35 313.66L865.84 312.79 873.14 325.43 871.65 326.3z"
								/>
								<path
									className="st16"
									d="M862.36 312.51L863.85 311.64 865.84 312.79 864.35 313.66z"
								/>
								<path
									className="st21"
									d="M871.65 326.3L871.73 326.43 869.74 325.28 862.58 312.88 862.36 312.51 864.35 313.66z"
								/>
								<path
									className="st18"
									d="M872.22 326.72L873.71 325.85 873.71 326.58 872.22 327.45z"
								/>
								<path
									className="st20"
									d="M871.73 326.43L873.22 325.57 873.71 325.85 872.22 326.72z"
								/>
								<path
									className="st20"
									d="M872.22 326.72L873.71 325.85 874.35 326.22 872.86 327.08z"
								/>
								<path
									className="st20"
									d="M872.86 327.08L874.35 326.22 876.34 327.37 874.85 328.23z"
								/>
								<path
									className="st17"
									d="M872.86 327.08L874.34 326.22 874.66 326.04 873.17 326.91z"
								/>
								<path
									className="st16"
									d="M871.68 317.88L873.16 317.02 873.89 317.44 872.4 318.3z"
								/>
								<path
									className="st21"
									d="M872.23 315.37L872.22 318.2 872.4 318.3 871.68 317.88 864.35 313.66 862.36 312.51 861.92 312.25 861.74 312.15 861.74 311.43 861.75 309.32z"
								/>
								<path className="st20" d="M872.22 318.2l.18.1-.18-.1z" />
								<path
									className="st21"
									d="M873.19 318.76L873.17 326.91 872.86 327.08 872.22 326.72 871.73 326.43 871.65 326.3 871.68 317.88 872.4 318.3z"
								/>
								<path
									className="st16"
									d="M872.4 318.3L873.89 317.44 874.68 317.89 873.19 318.76z"
								/>
								<path
									className="st17"
									d="M873.17 326.91L874.66 326.04 881.77 321.99 880.28 322.85z"
								/>
								<path
									className="st15"
									d="M873.19 318.76L874.68 317.89 874.66 326.04 873.17 326.91z"
								/>
								<path
									className="st18"
									d="M872.23 315.37L873.72 314.5 873.71 317.34 872.22 318.2z"
								/>
								<path
									className="st20"
									d="M861.75 309.32L863.23 308.45 873.72 314.5 872.23 315.37z"
								/>
								<path
									className="st18"
									d="M882.86 332.86L884.35 331.99 884.34 334.83 882.85 335.69z"
								/>
								<path
									className="st15"
									d="M874.85 328.23L876.34 327.37 883.39 331.44 882.86 332.86z"
								/>
								<path
									className="st21"
									d="M882.86 332.86L882.85 335.69 872.37 329.64 872.21 329.55 872.22 327.52 872.22 327.45 872.22 326.72 872.86 327.08 874.85 328.23z"
								/>
								<path
									className="st16"
									d="M880.28 322.85L881.77 321.99 883.76 323.14 882.27 324z"
								/>
								<path
									className="st21"
									d="M873.17 326.91L880.28 322.85 882.27 324 874.85 328.23 872.86 327.08z"
								/>
								<path
									className="st18"
									d="M882.89 323.65L884.38 322.79 884.37 323.49 882.89 324.36z"
								/>
								<path className="st19" d="M882.89 323.62L882.9 323.64 882.89 323.65z" />
								<path
									className="st18"
									d="M882.89 323.62L884.38 322.75 884.38 322.79 882.89 323.65z"
								/>
								<path
									className="st17"
									d="M882.9 323.64L884.39 322.78 884.38 322.79 882.89 323.65z"
								/>
								<path
									className="st21"
									d="M882.89 321.53L882.89 323.62 882.89 323.65 882.89 324.36 882.27 324 880.28 322.85 873.19 318.76 872.4 318.3 872.22 318.2 872.23 315.37z"
								/>
								<path
									className="st22"
									d="M882.89 323.62L884.38 322.75 884.39 322.78 882.9 323.64z"
								/>
								<path
									className="st18"
									d="M882.89 321.53L884.38 320.66 884.38 322.75 882.89 323.62z"
								/>
								<path
									className="st20"
									d="M872.23 315.37L873.72 314.5 885.26 321.22 883.41 321.65z"
								/>
							</g>
							<g>
								<path
									className="st106"
									d="M705.71 346.83L683.1 333.77 699.17 324.5 721.78 337.55z"
								/>
								<path
									className="st107"
									d="M705.71 346.83L683.1 333.77 699.17 324.5 721.78 337.55z"
								/>
								<path
									className="st106"
									d="M705.71 393.04L683.1 379.98 683.1 333.77 705.71 346.83z"
								/>
								<path
									className="st108"
									d="M704.91 347.29L683.9 335.16 683.9 379.52 704.91 391.65z"
								/>
								<path
									className="st109"
									d="M699.5 383.68c-3.57-1.15-6.81-3.03-10.37-5.99-1.59-1.33-2.87-3.55-3.26-5.72-.76-4.24-.76-7.67 0-11.04.39-1.72 1.67-2.47 3.26-1.95 3.56 1.15 6.8 3.02 10.37 5.99 1.6 1.33 2.88 3.55 3.26 5.72.76 4.26.76 7.68 0 11.04-.39 1.72-1.67 2.47-3.26 1.95z"
								/>
								<path
									className="st109"
									d="M703.51 376.65c0 6.14-4.05 8.78-9.05 5.89s-9.05-10.2-9.05-16.34c0-6.14 4.05-8.78 9.05-5.89 5 2.88 9.05 10.2 9.05 16.34z"
								/>
								<path
									className="st110"
									d="M702.6 376.12c0 5.52-3.64 7.9-8.14 5.3-4.49-2.59-8.14-9.18-8.14-14.7s3.64-7.9 8.14-5.3c4.5 2.6 8.14 9.18 8.14 14.7z"
								/>
								<path
									className="st109"
									d="M697.82 371.81c0 1.37-.9 1.95-2.01 1.31-1.11-.64-2.01-2.27-2.01-3.63 0-1.37.9-1.95 2.01-1.31 1.11.64 2.01 2.27 2.01 3.63z"
								/>
								<path
									className="st111"
									d="M697.33 371.53c0 1.04-.68 1.48-1.53.99-.84-.49-1.53-1.72-1.53-2.76 0-1.04.68-1.48 1.53-.99s1.53 1.72 1.53 2.76z"
								/>
								<g>
									<path
										className="st109"
										d="M702.21 355.88c0 3.5-2.31 5-5.15 3.36-2.85-1.64-5.15-5.81-5.15-9.31s2.31-5 5.15-3.36c2.85 1.65 5.15 5.81 5.15 9.31z"
									/>
									<path
										className="st110"
										d="M701.43 355.43c0 2.96-1.95 4.23-4.36 2.84-2.41-1.39-4.36-4.92-4.36-7.88s1.95-4.23 4.36-2.84c2.4 1.39 4.36 4.91 4.36 7.88z"
									/>
									<path
										className="st109"
										d="M699.55 352.8c0 .78-.51 1.11-1.15.75-.63-.37-1.15-1.29-1.15-2.07 0-.78.51-1.11 1.15-.75.63.36 1.15 1.29 1.15 2.07z"
									/>
									<path
										className="st111"
										d="M699.27 352.64c0 .59-.39.84-.87.57-.48-.28-.87-.98-.87-1.57 0-.59.39-.84.87-.57s.87.98.87 1.57z"
									/>
								</g>
								<path
									className="st109"
									d="M689.69 353.15L686.1 351.07 686.1 343.48 689.69 345.55z"
								/>
								<path
									className="st111"
									d="M689.14 352.13L686.66 350.7 686.66 344.49 689.14 345.93z"
								/>
								<g>
									<path
										className="st112"
										d="M705.71 346.83L705.71 393.04 721.78 383.76 721.78 337.55z"
									/>
								</g>
								<g>
									<path
										className="st109"
										d="M711.5 363.55l4.48-2.59c.33-.19.59.01.59.45v4.49c0 .44-.27.95-.59 1.14l-4.48 2.59c-.33.19-.59-.01-.59-.45v-4.49c0-.44.27-.95.59-1.14z"
									/>
									<path
										className="st113"
										d="M714.55 362.35l.8-.46c.29-.17.52.01.52.39v3.58c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.38.23-.83.52-.99zM712.14 363.74l.8-.46c.29-.17.52.01.52.39v3.58c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.38.23-.82.52-.99z"
									/>
								</g>
								<g>
									<path
										className="st106"
										d="M705.71 301.97L683.1 288.91 699.17 279.64 721.78 292.69z"
									/>
									<path
										className="st107"
										d="M705.71 301.97L683.1 288.91 699.17 279.64 721.78 292.69z"
									/>
									<path
										className="st106"
										d="M705.71 348.18L683.1 335.12 683.1 288.91 705.71 301.97z"
									/>
									<path
										className="st108"
										d="M704.91 302.43L683.9 290.31 683.9 334.66 704.91 346.79z"
									/>
									<path
										className="st109"
										d="M699.5 338.83c-3.57-1.15-6.81-3.03-10.37-5.99-1.59-1.33-2.87-3.55-3.26-5.72-.76-4.24-.76-7.67 0-11.04.39-1.72 1.67-2.47 3.26-1.95 3.56 1.15 6.8 3.02 10.37 5.99 1.6 1.33 2.88 3.55 3.26 5.72.76 4.26.76 7.68 0 11.04-.39 1.71-1.67 2.46-3.26 1.95z"
									/>
									<ellipse
										transform="rotate(-26.929 694.403 326.544)"
										className="st109"
										cx={694.47}
										cy={326.56}
										rx={7.6}
										ry={13.22}
									/>
									<ellipse
										transform="rotate(-26.929 694.402 326.544)"
										className="st110"
										cx={694.47}
										cy={326.56}
										rx={6.84}
										ry={11.89}
									/>
									<path
										className="st109"
										d="M697.82 326.95c0 1.37-.9 1.95-2.01 1.31-1.11-.64-2.01-2.27-2.01-3.63 0-1.37.9-1.95 2.01-1.31 1.11.64 2.01 2.27 2.01 3.63z"
									/>
									<path
										className="st111"
										d="M697.33 326.67c0 1.04-.68 1.48-1.53.99-.84-.49-1.53-1.72-1.53-2.76 0-1.04.68-1.48 1.53-.99s1.53 1.73 1.53 2.76z"
									/>
									<g>
										<ellipse
											transform="rotate(-26.929 696.997 308.03)"
											className="st109"
											cx={697.06}
											cy={308.05}
											rx={4.33}
											ry={7.53}
										/>
										<path
											className="st110"
											d="M701.43 310.57c0 2.96-1.95 4.23-4.36 2.84-2.41-1.39-4.36-4.92-4.36-7.88s1.95-4.23 4.36-2.84c2.4 1.39 4.36 4.92 4.36 7.88z"
										/>
										<path
											className="st109"
											d="M699.55 307.94c0 .78-.51 1.11-1.15.75-.63-.37-1.15-1.29-1.15-2.07s.51-1.11 1.15-.75c.63.36 1.15 1.29 1.15 2.07z"
										/>
										<path
											className="st111"
											d="M699.27 307.78c0 .59-.39.84-.87.57-.48-.28-.87-.98-.87-1.57 0-.59.39-.84.87-.57s.87.98.87 1.57z"
										/>
									</g>
									<path
										className="st109"
										d="M689.69 308.29L686.1 306.22 686.1 298.62 689.69 300.69z"
									/>
									<path
										className="st111"
										d="M689.14 307.27L686.66 305.84 686.66 299.64 689.14 301.07z"
									/>
									<g>
										<path
											className="st112"
											d="M705.71 301.97L705.71 348.18 721.78 338.9 721.78 292.69z"
										/>
									</g>
									<g>
										<path
											className="st109"
											d="M711.5 318.69l4.48-2.59c.33-.19.59.01.59.45v4.49c0 .44-.27.95-.59 1.14l-4.48 2.59c-.33.19-.59-.01-.59-.45v-4.49c0-.44.27-.95.59-1.14z"
										/>
										<path
											className="st113"
											d="M714.55 317.49l.8-.46c.29-.17.52.01.52.39V321c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.38.23-.82.52-.99zM712.14 318.88l.8-.46c.29-.17.52.01.52.39v3.58c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.38.23-.82.52-.99z"
										/>
									</g>
								</g>
							</g>
							<g>
								<path
									className="st106"
									d="M883.79 457.06L861.18 444 877.25 434.72 899.86 447.78z"
								/>
								<path
									className="st107"
									d="M883.79 457.06L861.18 444 877.25 434.72 899.86 447.78z"
								/>
								<path
									className="st106"
									d="M883.79 503.27L861.18 490.21 861.18 444 883.79 457.06z"
								/>
								<path
									className="st108"
									d="M882.99 457.52L861.98 445.39 861.98 489.75 882.99 501.88z"
								/>
								<path
									className="st109"
									d="M877.58 493.91c-3.57-1.15-6.81-3.03-10.37-5.99-1.59-1.33-2.87-3.55-3.26-5.72-.76-4.24-.76-7.67 0-11.04.39-1.72 1.67-2.47 3.26-1.95 3.56 1.15 6.8 3.02 10.37 5.99 1.6 1.33 2.88 3.55 3.26 5.72.76 4.26.76 7.68 0 11.04-.39 1.72-1.67 2.47-3.26 1.95z"
								/>
								<path
									className="st109"
									d="M881.59 486.87c0 6.14-4.05 8.78-9.05 5.89-5-2.88-9.05-10.2-9.05-16.34 0-6.14 4.05-8.78 9.05-5.89 5 2.89 9.05 10.2 9.05 16.34z"
								/>
								<path
									className="st110"
									d="M880.68 486.35c0 5.52-3.64 7.9-8.14 5.3-4.49-2.59-8.14-9.18-8.14-14.7s3.64-7.9 8.14-5.3c4.5 2.59 8.14 9.18 8.14 14.7z"
								/>
								<path
									className="st109"
									d="M875.9 482.04c0 1.37-.9 1.95-2.01 1.31-1.11-.64-2.01-2.27-2.01-3.63 0-1.37.9-1.95 2.01-1.31 1.11.64 2.01 2.26 2.01 3.63z"
								/>
								<path
									className="st111"
									d="M875.41 481.76c0 1.04-.68 1.48-1.53.99-.84-.49-1.53-1.72-1.53-2.76 0-1.04.68-1.48 1.53-.99s1.53 1.72 1.53 2.76z"
								/>
								<g>
									<path
										className="st109"
										d="M880.29 466.11c0 3.5-2.31 5-5.15 3.36-2.85-1.64-5.15-5.81-5.15-9.31s2.31-5 5.15-3.36c2.85 1.65 5.15 5.81 5.15 9.31z"
									/>
									<path
										className="st110"
										d="M879.51 465.65c0 2.96-1.95 4.23-4.36 2.84-2.41-1.39-4.36-4.92-4.36-7.88s1.95-4.23 4.36-2.84c2.4 1.39 4.36 4.92 4.36 7.88z"
									/>
									<path
										className="st109"
										d="M877.63 463.02c0 .78-.51 1.11-1.15.75-.63-.37-1.15-1.29-1.15-2.07 0-.78.51-1.11 1.15-.75.63.37 1.15 1.3 1.15 2.07z"
									/>
									<path
										className="st111"
										d="M877.35 462.86c0 .59-.39.84-.87.57-.48-.28-.87-.98-.87-1.57 0-.59.39-.84.87-.57.48.28.87.98.87 1.57z"
									/>
								</g>
								<path
									className="st109"
									d="M867.77 463.37L864.18 461.3 864.18 453.71 867.77 455.78z"
								/>
								<path
									className="st111"
									d="M867.22 462.36L864.74 460.92 864.74 454.72 867.22 456.16z"
								/>
								<g>
									<path
										className="st112"
										d="M883.79 457.06L883.79 503.27 899.86 493.99 899.86 447.78z"
									/>
								</g>
								<g>
									<path
										className="st109"
										d="M889.58 473.78l4.48-2.59c.33-.19.59.01.59.45v4.49c0 .44-.27.95-.59 1.14l-4.48 2.59c-.33.19-.59-.01-.59-.45v-4.49c0-.44.27-.95.59-1.14z"
									/>
									<path
										className="st113"
										d="M892.63 472.58l.8-.46c.29-.17.52.01.52.39v3.58c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.39.23-.83.52-.99zM890.22 473.97l.8-.46c.29-.17.52.01.52.39v3.58c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.38.23-.83.52-.99z"
									/>
								</g>
								<g>
									<path
										className="st106"
										d="M883.79 412.2L861.18 399.14 877.25 389.86 899.86 402.92z"
									/>
									<path
										className="st107"
										d="M883.79 412.2L861.18 399.14 877.25 389.86 899.86 402.92z"
									/>
									<path
										className="st106"
										d="M883.79 458.41L861.18 445.35 861.18 399.14 883.79 412.2z"
									/>
									<path
										className="st108"
										d="M882.99 412.66L861.98 400.53 861.98 444.89 882.99 457.02z"
									/>
									<path
										className="st109"
										d="M877.58 449.05c-3.57-1.15-6.81-3.03-10.37-5.99-1.59-1.33-2.87-3.55-3.26-5.72-.76-4.24-.76-7.67 0-11.04.39-1.72 1.67-2.47 3.26-1.95 3.56 1.15 6.8 3.02 10.37 5.99 1.6 1.33 2.88 3.55 3.26 5.72.76 4.26.76 7.68 0 11.04-.39 1.72-1.67 2.47-3.26 1.95z"
									/>
									<ellipse
										transform="rotate(-26.929 872.466 436.764)"
										className="st109"
										cx={872.55}
										cy={436.79}
										rx={7.6}
										ry={13.22}
									/>
									<ellipse
										transform="rotate(-26.929 872.465 436.764)"
										className="st110"
										cx={872.55}
										cy={436.79}
										rx={6.84}
										ry={11.89}
									/>
									<path
										className="st109"
										d="M875.9 437.18c0 1.37-.9 1.95-2.01 1.31-1.11-.64-2.01-2.27-2.01-3.63 0-1.37.9-1.95 2.01-1.31 1.11.64 2.01 2.26 2.01 3.63z"
									/>
									<path
										className="st111"
										d="M875.41 436.9c0 1.04-.68 1.48-1.53.99-.84-.49-1.53-1.72-1.53-2.76 0-1.04.68-1.48 1.53-.99s1.53 1.72 1.53 2.76z"
									/>
									<g>
										<ellipse
											transform="rotate(-26.929 875.06 418.25)"
											className="st109"
											cx={875.14}
											cy={418.28}
											rx={4.33}
											ry={7.53}
										/>
										<path
											className="st110"
											d="M879.51 420.8c0 2.96-1.95 4.23-4.36 2.84-2.41-1.39-4.36-4.92-4.36-7.88s1.95-4.23 4.36-2.84c2.4 1.38 4.36 4.91 4.36 7.88z"
										/>
										<path
											className="st109"
											d="M877.63 418.16c0 .78-.51 1.11-1.15.75-.63-.37-1.15-1.29-1.15-2.07s.51-1.11 1.15-.75c.63.37 1.15 1.3 1.15 2.07z"
										/>
										<path
											className="st111"
											d="M877.35 418c0 .59-.39.84-.87.57-.48-.28-.87-.98-.87-1.57 0-.59.39-.84.87-.57.48.28.87.98.87 1.57z"
										/>
									</g>
									<path
										className="st109"
										d="M867.77 418.52L864.18 416.44 864.18 408.85 867.77 410.92z"
									/>
									<path
										className="st111"
										d="M867.22 417.5L864.74 416.07 864.74 409.86 867.22 411.3z"
									/>
									<g>
										<path
											className="st112"
											d="M883.79 412.2L883.79 458.41 899.86 449.13 899.86 402.92z"
										/>
									</g>
									<g>
										<path
											className="st109"
											d="M889.58 428.92l4.48-2.59c.33-.19.59.01.59.45v4.49c0 .44-.27.95-.59 1.14l-4.48 2.59c-.33.19-.59-.01-.59-.45v-4.49c0-.44.27-.95.59-1.14z"
										/>
										<path
											className="st113"
											d="M892.63 427.72l.8-.46c.29-.17.52.01.52.39v3.58c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.38.23-.83.52-.99zM890.22 429.11l.8-.46c.29-.17.52.01.52.39v3.58c0 .38-.23.83-.52.99l-.8.46c-.29.17-.52-.01-.52-.39v-3.58c0-.38.23-.83.52-.99z"
										/>
									</g>
								</g>
							</g>
							<g>
								<g id="_x33__00000122680560381420163460000010259066703960790711_">
									<path
										className="st114"
										d="M828.72 527.01L828.68 541.45 826.09 542.95 826.13 528.51z"
									/>
									<path
										className="st115"
										d="M826.13 528.51L826.09 542.95 808.81 532.97 808.85 518.54z"
									/>
									<path
										className="st116"
										d="M828.72 527.01L826.13 528.51 808.85 518.54 811.43 517.03z"
									/>
									<g>
										<path
											className="st114"
											d="M851.62 513.71L851.58 528.15 848.99 529.65 849.04 515.22z"
										/>
										<path
											className="st115"
											d="M849.04 515.22L848.99 529.65 831.71 519.67 831.75 505.24z"
										/>
										<path
											className="st116"
											d="M851.62 513.71L849.04 515.22 831.75 505.24 834.33 503.74z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000034090190732010186770000016139539794462233007_"
											gradientUnits="userSpaceOnUse"
											x1={810.0255}
											y1={514.5822}
											x2={822.1009}
											y2={514.5822}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M853.09 510.32c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.36 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.02-.31.02-3.89.01-4.31z"
											fill="url(#SVGID_00000034090190732010186770000016139539794462233007_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000170260970587729643580000015989032367055060378_"
											gradientUnits="userSpaceOnUse"
											x1={816.312}
											y1={511.5168}
											x2={823.134}
											y2={511.5168}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M853.59 507.08c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81V516c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79v-4.36z"
											fill="url(#SVGID_00000170260970587729643580000015989032367055060378_)"
										/>
										<path
											className="st119"
											d="M853.01 506.24l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.77.44-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000108288194140597932800000008692920982457353401_">
									<path
										className="st114"
										d="M786.28 548.34L786.24 562.78 783.65 564.28 783.69 549.84z"
									/>
									<path
										className="st115"
										d="M783.69 549.84L783.65 564.28 766.37 554.3 766.41 539.86z"
									/>
									<path
										className="st116"
										d="M786.28 548.34L783.69 549.84 766.41 539.86 768.99 538.36z"
									/>
									<g>
										<path
											className="st114"
											d="M809.18 535.04L809.14 549.48 806.55 550.98 806.6 536.54z"
										/>
										<path
											className="st115"
											d="M806.6 536.54L806.55 550.98 789.27 541 789.31 526.56z"
										/>
										<path
											className="st116"
											d="M809.18 535.04L806.6 536.54 789.31 526.56 791.89 525.06z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000154404429044556012120000009918668193361294486_"
											gradientUnits="userSpaceOnUse"
											x1={767.5856}
											y1={535.9101}
											x2={779.661}
											y2={535.9101}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M810.65 531.65c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.35 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.01-.31.01-3.9 0-4.31z"
											fill="url(#SVGID_00000154404429044556012120000009918668193361294486_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000078729649741376158910000006583933161059015054_"
											gradientUnits="userSpaceOnUse"
											x1={773.8721}
											y1={532.8447}
											x2={780.6941}
											y2={532.8447}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M811.15 528.4c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79v-4.36z"
											fill="url(#SVGID_00000078729649741376158910000006583933161059015054_)"
										/>
										<path
											className="st119"
											d="M810.57 527.57l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.17 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000150099668066712621120000004668092504345347728_">
									<path
										className="st114"
										d="M739.91 577.88L739.86 592.32 737.28 593.82 737.32 579.38z"
									/>
									<path
										className="st115"
										d="M737.32 579.38L737.28 593.82 720 583.84 720.04 569.4z"
									/>
									<path
										className="st116"
										d="M739.91 577.88L737.32 579.38 720.04 569.4 722.62 567.9z"
									/>
									<g>
										<path
											className="st114"
											d="M762.81 564.58L762.77 579.02 760.18 580.52 760.22 566.08z"
										/>
										<path
											className="st115"
											d="M760.22 566.08L760.18 580.52 742.9 570.54 742.94 556.11z"
										/>
										<path
											className="st116"
											d="M762.81 564.58L760.22 566.08 742.94 556.11 745.52 554.6z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000008112091851425919750000013087294431550035348_"
											gradientUnits="userSpaceOnUse"
											x1={721.2134}
											y1={565.451}
											x2={733.2889}
											y2={565.451}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M764.28 561.19c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.36 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.02-.31.01-3.89.01-4.31z"
											fill="url(#SVGID_00000008112091851425919750000013087294431550035348_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000129906338883539058490000002635848623474154419_"
											gradientUnits="userSpaceOnUse"
											x1={727.4999}
											y1={562.3856}
											x2={734.322}
											y2={562.3856}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M764.77 557.94c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.31.01-3.93 0-4.36z"
											fill="url(#SVGID_00000129906338883539058490000002635848623474154419_)"
										/>
										<path
											className="st119"
											d="M764.2 557.11l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
							</g>
							<g>
								<g id="_x33__00000016758207247535355930000011463283924432700549_">
									<path
										className="st114"
										d="M700.18 547.45L700.14 561.89 697.56 563.39 697.6 548.95z"
									/>
									<path
										className="st115"
										d="M697.6 548.95L697.56 563.39 680.27 553.41 680.32 538.97z"
									/>
									<path
										className="st116"
										d="M700.18 547.45L697.6 548.95 680.32 538.97 682.9 537.47z"
									/>
									<g>
										<path
											className="st114"
											d="M723.08 534.15L723.04 548.59 720.46 550.09 720.5 535.65z"
										/>
										<path
											className="st115"
											d="M720.5 535.65L720.46 550.09 703.18 540.11 703.22 525.67z"
										/>
										<path
											className="st116"
											d="M723.08 534.15L720.5 535.65 703.22 525.67 705.8 524.17z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000106839978990427197300000011294661221842620077_"
											gradientUnits="userSpaceOnUse"
											x1={681.4913}
											y1={535.0198}
											x2={693.5668}
											y2={535.0198}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M724.56 530.76c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.36 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.02-.31.01-3.9.01-4.31z"
											fill="url(#SVGID_00000106839978990427197300000011294661221842620077_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000104681455241436094680000002821137847937456803_"
											gradientUnits="userSpaceOnUse"
											x1={687.7778}
											y1={531.9544}
											x2={694.5999}
											y2={531.9544}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M725.05 527.51c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.31 0-3.93 0-4.36z"
											fill="url(#SVGID_00000104681455241436094680000002821137847937456803_)"
										/>
										<path
											className="st119"
											d="M724.48 526.68l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.17 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000122718619422051783680000014529213755403319939_">
									<path
										className="st114"
										d="M746.49 520.3L746.45 534.74 743.87 536.24 743.91 521.81z"
									/>
									<path
										className="st115"
										d="M743.91 521.81L743.87 536.24 726.58 526.26 726.62 511.83z"
									/>
									<path
										className="st116"
										d="M746.49 520.3L743.91 521.81 726.62 511.83 729.21 510.32z"
									/>
									<g>
										<path
											className="st114"
											d="M769.39 507.01L769.35 521.44 766.77 522.94 766.81 508.51z"
										/>
										<path
											className="st115"
											d="M766.81 508.51L766.77 522.94 749.48 512.96 749.52 498.53z"
										/>
										<path
											className="st116"
											d="M769.39 507.01L766.81 508.51 749.52 498.53 752.11 497.03z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000127015702156094596540000006259189505654433455_"
											gradientUnits="userSpaceOnUse"
											x1={727.7977}
											y1={507.8725}
											x2={739.8731}
											y2={507.8725}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M770.87 503.61c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.36 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.01-.31.01-3.89.01-4.31z"
											fill="url(#SVGID_00000127015702156094596540000006259189505654433455_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000010296108403591105780000008029274085772898182_"
											gradientUnits="userSpaceOnUse"
											x1={734.0842}
											y1={504.8071}
											x2={740.9062}
											y2={504.8071}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M771.36 500.37c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.32 0-3.94 0-4.36z"
											fill="url(#SVGID_00000010296108403591105780000008029274085772898182_)"
										/>
										<path
											className="st119"
											d="M770.78 499.53l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000142144095064042761470000003923565527774823821_">
									<path
										className="st114"
										d="M794.73 494.16L794.69 508.59 792.11 510.09 792.15 495.66z"
									/>
									<path
										className="st115"
										d="M792.15 495.66L792.11 510.09 774.83 500.11 774.87 485.68z"
									/>
									<path
										className="st116"
										d="M794.73 494.16L792.15 495.66 774.87 485.68 777.45 484.18z"
									/>
									<g>
										<path
											className="st114"
											d="M817.64 480.86L817.59 495.29 815.01 496.79 815.05 482.36z"
										/>
										<path
											className="st115"
											d="M815.05 482.36L815.01 496.79 797.73 486.82 797.77 472.38z"
										/>
										<path
											className="st116"
											d="M817.64 480.86L815.05 482.36 797.77 472.38 800.35 470.88z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000127030232182670098850000014759747035201752237_"
											gradientUnits="userSpaceOnUse"
											x1={776.0425}
											y1={481.7265}
											x2={788.118}
											y2={481.7265}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M819.11 477.46c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.36 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.02-.31.01-3.89.01-4.31z"
											fill="url(#SVGID_00000127030232182670098850000014759747035201752237_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000176036667673306671110000014875190667770713273_"
											gradientUnits="userSpaceOnUse"
											x1={782.3291}
											y1={478.6611}
											x2={789.1511}
											y2={478.6611}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M819.6 474.22c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.31.01-3.94 0-4.36z"
											fill="url(#SVGID_00000176036667673306671110000014875190667770713273_)"
										/>
										<path
											className="st119"
											d="M819.03 473.39l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0L819.03 475c.77-.45.77-1.17 0-1.61z"
										/>
									</g>
								</g>
							</g>
							<g>
								<g id="_x33__00000142135955056500852770000000840566757243127194_">
									<path
										className="st114"
										d="M655.44 421.7L655.4 436.14 652.82 437.64 652.86 423.21z"
									/>
									<path
										className="st115"
										d="M652.86 423.21L652.82 437.64 635.53 427.66 635.57 413.23z"
									/>
									<path
										className="st116"
										d="M655.44 421.7L652.86 423.21 635.57 413.23 638.16 411.73z"
									/>
									<g>
										<path
											className="st114"
											d="M678.34 408.41L678.3 422.84 675.72 424.34 675.76 409.91z"
										/>
										<path
											className="st115"
											d="M675.76 409.91L675.72 424.34 658.43 414.36 658.47 399.93z"
										/>
										<path
											className="st116"
											d="M678.34 408.41L675.76 409.91 658.47 399.93 661.06 398.43z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000078004550806851884650000017743880976299436950_"
											gradientUnits="userSpaceOnUse"
											x1={636.7499}
											y1={409.273}
											x2={648.8253}
											y2={409.273}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M679.82 405.01c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.35 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.01-.31 0-3.89 0-4.31z"
											fill="url(#SVGID_00000078004550806851884650000017743880976299436950_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000162314870258244117690000008847849020924786058_"
											gradientUnits="userSpaceOnUse"
											x1={643.0364}
											y1={406.2076}
											x2={649.8584}
											y2={406.2076}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M680.31 401.77c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.32 0-3.94 0-4.36z"
											fill="url(#SVGID_00000162314870258244117690000008847849020924786058_)"
										/>
										<path
											className="st119"
											d="M679.73 400.93l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.77.44-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000171704529271399444220000013319361783061449399_">
									<path
										className="st114"
										d="M613 443.03L612.96 457.47 610.38 458.97 610.42 444.53z"
									/>
									<path
										className="st115"
										d="M610.42 444.53L610.38 458.97 593.09 448.99 593.13 434.55z"
									/>
									<path
										className="st116"
										d="M613 443.03L610.42 444.53 593.13 434.55 595.72 433.05z"
									/>
									<g>
										<path
											className="st114"
											d="M635.9 429.73L635.86 444.17 633.28 445.67 633.32 431.23z"
										/>
										<path
											className="st115"
											d="M633.32 431.23L633.28 445.67 615.99 435.69 616.04 421.26z"
										/>
										<path
											className="st116"
											d="M635.9 429.73L633.32 431.23 616.04 421.26 618.62 419.75z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000169540415119685776280000014248848738974636701_"
											gradientUnits="userSpaceOnUse"
											x1={594.31}
											y1={430.6009}
											x2={606.3854}
											y2={430.6009}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M637.38 426.34c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.35 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.01-.31 0-3.89 0-4.31z"
											fill="url(#SVGID_00000169540415119685776280000014248848738974636701_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000122702985374576136280000013517633615053584539_"
											gradientUnits="userSpaceOnUse"
											x1={600.5966}
											y1={427.5355}
											x2={607.4186}
											y2={427.5355}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M637.87 423.09c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.31 0-3.93 0-4.36z"
											fill="url(#SVGID_00000122702985374576136280000013517633615053584539_)"
										/>
										<path
											className="st119"
											d="M637.29 422.26l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000151522564323411021290000007017708891541491895_">
									<path
										className="st114"
										d="M566.63 472.57L566.59 487.01 564.01 488.51 564.05 474.07z"
									/>
									<path
										className="st115"
										d="M564.05 474.07L564.01 488.51 546.72 478.53 546.76 464.1z"
									/>
									<path
										className="st116"
										d="M566.63 472.57L564.05 474.07 546.76 464.1 549.35 462.59z"
									/>
									<g>
										<path
											className="st114"
											d="M589.53 459.27L589.49 473.71 586.91 475.21 586.95 460.78z"
										/>
										<path
											className="st115"
											d="M586.95 460.78L586.91 475.21 569.62 465.23 569.66 450.8z"
										/>
										<path
											className="st116"
											d="M589.53 459.27L586.95 460.78 569.66 450.8 572.25 449.3z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000056415647614786911700000009285902285489084069_"
											gradientUnits="userSpaceOnUse"
											x1={547.9379}
											y1={460.1418}
											x2={560.0133}
											y2={460.1418}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M591.01 455.88c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.35 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78v-4.31z"
											fill="url(#SVGID_00000056415647614786911700000009285902285489084069_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000057126351958768032490000004932548551129173695_"
											gradientUnits="userSpaceOnUse"
											x1={554.2244}
											y1={457.0764}
											x2={561.0464}
											y2={457.0764}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M591.5 452.63c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.31 0-3.93 0-4.36z"
											fill="url(#SVGID_00000057126351958768032490000004932548551129173695_)"
										/>
										<path
											className="st119"
											d="M590.92 451.8l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.77.44-.77 1.17 0 1.61L563.04 468c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
							</g>
							<g>
								<g id="_x33__00000168107662761249043100000016764487497968096926_">
									<path
										className="st114"
										d="M526.91 442.14L526.87 456.58 524.28 458.08 524.32 443.64z"
									/>
									<path
										className="st115"
										d="M524.32 443.64L524.28 458.08 507 448.1 507.04 433.66z"
									/>
									<path
										className="st116"
										d="M526.91 442.14L524.32 443.64 507.04 433.66 509.62 432.16z"
									/>
									<g>
										<path
											className="st114"
											d="M549.81 428.84L549.77 443.28 547.18 444.78 547.23 430.34z"
										/>
										<path
											className="st115"
											d="M547.23 430.34L547.18 444.78 529.9 434.8 529.94 420.37z"
										/>
										<path
											className="st116"
											d="M549.81 428.84L547.23 430.34 529.94 420.37 532.52 418.86z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000150104933905537120200000007681479757556123016_"
											gradientUnits="userSpaceOnUse"
											x1={508.2158}
											y1={429.7106}
											x2={520.2912}
											y2={429.7106}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M551.28 425.45c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.36 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.02-.31.02-3.89.01-4.31z"
											fill="url(#SVGID_00000150104933905537120200000007681479757556123016_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000016064894091644157770000012249363214563323562_"
											gradientUnits="userSpaceOnUse"
											x1={514.5023}
											y1={426.6452}
											x2={521.3243}
											y2={426.6452}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M551.78 422.2c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79v-4.36z"
											fill="url(#SVGID_00000016064894091644157770000012249363214563323562_)"
										/>
										<path
											className="st119"
											d="M551.2 421.37l-17.33-10.01c-.77-.45-2.02-.45-2.79 0l-25.09 14.59c-.77.44-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000072265286111273260810000001183783936517598624_">
									<path
										className="st114"
										d="M573.21 414.99L573.17 429.43 570.59 430.93 570.63 416.5z"
									/>
									<path
										className="st115"
										d="M570.63 416.5L570.59 430.93 553.31 420.95 553.35 406.52z"
									/>
									<path
										className="st116"
										d="M573.21 414.99L570.63 416.5 553.35 406.52 555.93 405.02z"
									/>
									<g>
										<path
											className="st114"
											d="M596.12 401.7L596.07 416.13 593.49 417.63 593.53 403.2z"
										/>
										<path
											className="st115"
											d="M593.53 403.2L593.49 417.63 576.21 407.65 576.25 393.22z"
										/>
										<path
											className="st116"
											d="M596.12 401.7L593.53 403.2 576.25 393.22 578.83 391.72z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000084502783581426356190000005966718408703856545_"
											gradientUnits="userSpaceOnUse"
											x1={554.5221}
											y1={402.5634}
											x2={566.5975}
											y2={402.5634}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M597.59 398.3c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.35 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78.01-.31 0-3.89 0-4.31z"
											fill="url(#SVGID_00000084502783581426356190000005966718408703856545_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000067955198378686274480000011978801738504928911_"
											gradientUnits="userSpaceOnUse"
											x1={560.8087}
											y1={399.498}
											x2={567.6306}
											y2={399.498}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M598.08 395.06c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.31.01-3.94 0-4.36z"
											fill="url(#SVGID_00000067955198378686274480000011978801738504928911_)"
										/>
										<path
											className="st119"
											d="M597.51 394.22l-17.33-10.01c-.77-.44-2.02-.44-2.79 0L552.3 398.8c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.44.77-1.16 0-1.61z"
										/>
									</g>
								</g>
								<g id="_x33__00000066484698345635511690000007454374089910133436_">
									<path
										className="st114"
										d="M621.46 388.85L621.42 403.28 618.83 404.78 618.88 390.35z"
									/>
									<path
										className="st115"
										d="M618.88 390.35L618.83 404.78 601.55 394.81 601.59 380.37z"
									/>
									<path
										className="st116"
										d="M621.46 388.85L618.88 390.35 601.59 380.37 604.17 378.87z"
									/>
									<g>
										<path
											className="st114"
											d="M644.36 375.55L644.32 389.98 641.74 391.49 641.78 377.05z"
										/>
										<path
											className="st115"
											d="M641.78 377.05L641.74 391.49 624.45 381.51 624.49 367.07z"
										/>
										<path
											className="st116"
											d="M644.36 375.55L641.78 377.05 624.49 367.07 627.08 365.57z"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000161617993669573543650000008972029443157354159_"
											gradientUnits="userSpaceOnUse"
											x1={602.767}
											y1={376.4173}
											x2={614.8424}
											y2={376.4173}
										>
											<stop offset={0.6355} stopColor="#362e2a" />
											<stop offset={0.6577} stopColor="#3a322e" />
											<stop offset={0.7235} stopColor="#443b37" />
										</linearGradient>
										<path
											d="M645.84 372.15c0-.3-.18-.6-.57-.82l-17.13-9.89c-.76-.44-2-.44-2.76 0l-24.35 14.16c-.38.22-.57.51-.57.8v4.31c0 .29.19.58.57.8l17.13 9.89c.76.44 2 .44 2.76 0l24.35-14.16c.37-.22.56-.5.57-.78v-4.31z"
											fill="url(#SVGID_00000161617993669573543650000008972029443157354159_)"
										/>
									</g>
									<g>
										<linearGradient
											id="SVGID_00000119834518801864360880000012368590081365957033_"
											gradientUnits="userSpaceOnUse"
											x1={609.0535}
											y1={373.3519}
											x2={615.8755}
											y2={373.3519}
										>
											<stop offset={0.1381} stopColor="#ac120d" />
											<stop offset={0.1403} stopColor="#ad120d" />
											<stop offset={0.1936} stopColor="#be1816" />
											<stop offset={0.2517} stopColor="#c81c1b" />
											<stop offset={0.3238} stopColor="#cb1d1d" />
										</linearGradient>
										<path
											d="M646.33 368.91c0-.3-.18-.6-.58-.83l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.39.22-.58.51-.58.81v4.36c0 .29.19.58.58.81l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.38-.22.57-.5.58-.79.01-.31 0-3.94 0-4.36z"
											fill="url(#SVGID_00000119834518801864360880000012368590081365957033_)"
										/>
										<path
											className="st119"
											d="M645.75 368.08l-17.33-10.01c-.77-.44-2.02-.44-2.79 0l-25.09 14.59c-.77.45-.77 1.17 0 1.61l17.33 10.01c.77.45 2.02.45 2.79 0l25.09-14.59c.77-.45.77-1.17 0-1.61z"
										/>
									</g>
								</g>
							</g>
							<g>
								<path
									className="st142"
									d="M618.54 494.03c3.02-.51 5.98-.43 8.91.24 2.93.67 5.61 1.91 8.04 3.71 2.44 1.81 4.02 3.73 4.74 5.78.72 2.05.56 4.08-.51 6.08-1.07 2.01-2.99 3.86-5.77 5.57l-8.83 5.43 9.69 7.36-8.55 5.31-33.7-25.86 17.3-10.38c2.78-1.64 5.67-2.73 8.68-3.24zm10.91 12.78c.11-1.33-.62-2.58-2.2-3.76-1.57-1.17-3.33-1.79-5.29-1.85-1.96-.06-3.83.44-5.61 1.51l-8.45 5.1 10.25 7.79 8.46-5.17c1.79-1.07 2.73-2.28 2.84-3.62zM686.79 495.91l-8.79-2.87-17.22 10.63 3.59 6.18-8.87 5.51-18.06-34.61 8.7-5.22 49.36 14.97-8.71 5.41zm-37.53-12.32l7.59 13.21 11.37-6.97-18.96-6.24zM664.83 464.32l7.95-4.77 26.75 18.76 16.9-10.42 7.33 5.05-24.89 15.47-34.04-24.09zM732.72 465.43c-4.21.63-8.43.46-12.63-.5-4.19-.96-8.05-2.65-11.57-5.07-3.5-2.41-5.85-4.98-7.04-7.74-1.18-2.74-1.17-5.4.05-8 1.21-2.58 3.51-4.89 6.9-6.92 4.8-2.88 10.65-4.18 17.55-3.9l.22 6.07c-4.13-.13-7.65.69-10.57 2.45-1.96 1.18-3.25 2.53-3.88 4.04-.63 1.52-.55 3.08.23 4.68.79 1.61 2.23 3.13 4.35 4.56 2.12 1.44 4.41 2.46 6.88 3.07 2.47.6 4.92.74 7.34.42s4.62-1.09 6.58-2.3c1.55-.96 2.75-2.08 3.58-3.36.83-1.27 1.21-2.61 1.14-4l9.73.79c.13 4.56-2.28 8.39-7.25 11.48-3.53 2.18-7.4 3.6-11.61 4.23zM764.58 445.75c-4.12.62-8.26.47-12.43-.46-4.16-.93-8.03-2.59-11.63-4.97-3.58-2.37-5.99-4.87-7.25-7.51-1.25-2.62-1.3-5.19-.16-7.72 1.14-2.51 3.41-4.79 6.82-6.83 3.4-2.03 7.1-3.35 11.11-3.94 4.01-.59 8.04-.45 12.1.43 4.07.88 7.89 2.46 11.48 4.75 3.6 2.3 6.09 4.75 7.44 7.34 1.36 2.61 1.53 5.19.49 7.75-1.05 2.57-3.27 4.91-6.67 7.03-3.42 2.13-7.18 3.51-11.3 4.13zm7.7-12.84c.55-1.48.39-3-.46-4.54-.85-1.54-2.36-3.01-4.52-4.4-2.15-1.38-4.44-2.36-6.85-2.92-2.41-.56-4.79-.69-7.13-.39-2.34.3-4.46 1.03-6.36 2.17-1.9 1.15-3.13 2.45-3.7 3.9-.57 1.46-.44 2.97.37 4.52.82 1.55 2.3 3.04 4.45 4.45a21.56 21.56 0 006.9 3c2.45.58 4.86.72 7.22.42 2.36-.3 4.49-1.04 6.4-2.22 1.91-1.17 3.13-2.5 3.68-3.99z"
								/>
							</g>
							<g>
								<path
									className="st142"
									d="M470.87 565.62l9.57 5.89-58.23 16.59-9.43-6.42 29.38-33.74 8.94 5.5-9.03 10.72-11.81 13.19 22.26-6.55 18.35-5.18zM484.26 573.86l8.94 5.5-41.06 29.09-9.62-6.54 41.74-28.05zM527.79 602.86c1.44 2.37 1.91 4.81 1.4 7.34-.52 2.56-2.06 5.03-4.63 7.4a21.925 21.925 0 01-9.08 5.08c-3.47.97-7.06 1.13-10.75.48-3.7-.66-7.25-2.11-10.62-4.33l-10.5-6.93-12.24 9.64-10.06-6.84 40.39-30.1 19.2 11.82c3.17 1.95 5.47 4.1 6.89 6.44zm-19.4 10.76c2.29-.1 4.31-.9 6.03-2.4 1.71-1.48 2.43-3.04 2.2-4.67-.23-1.62-1.39-3.07-3.45-4.37l-9.65-6.06-11.66 9.18 9.89 6.39c2.11 1.39 4.33 2.03 6.64 1.93z"
								/>
							</g>
							<g>
								<path
									className="st142"
									d="M184.02 643.26l-17.17 12.33c-3.93.38-7.79.16-11.58-.67-3.78-.83-7.27-2.21-10.46-4.15-3.8-2.31-6.31-4.92-7.53-7.82-1.22-2.9-1.11-5.89.33-8.99 1.44-3.1 4.15-6.08 8.11-8.96 3.86-2.8 8.13-4.8 12.8-6.01 4.68-1.21 9.37-1.55 14.06-1 4.7.55 9.01 1.97 12.93 4.27 2.84 1.67 4.89 3.55 6.17 5.65 1.27 2.1 1.83 4.48 1.67 7.13l-10.63.79c.06-1.56-.37-3.04-1.26-4.43-.9-1.4-2.16-2.58-3.8-3.55-3.52-2.08-7.39-2.93-11.62-2.54-4.22.39-8.22 1.95-11.99 4.67-2.43 1.75-4.12 3.57-5.07 5.44-.96 1.87-1.12 3.67-.49 5.39.63 1.73 2.03 3.24 4.2 4.55 3.41 2.06 7.07 3.04 10.97 2.94l5.86-4.22-9.88-5.93 7.16-5.16 17.22 10.27zM183.59 663.08l20.54 12.4-7.71 5.48-28.8-17.5 38.71-27.74 28.77 16.94-7.72 5.49-20.19-11.96-7.9 5.65 19.03 11.35-7.4 5.27-18.96-11.37-8.37 5.99zM267.82 671.95l9.11 5.37-40.09 28.21-8.06-4.9 7.21-27.77-10.58 7.63-13.75 9.74-8.77-5.33 39.41-27.98 8.07 4.75-7.3 27.87 10.55-7.59 14.2-10zM261.98 710.42l21.74 13.13-8.02 5.59-30.48-18.52 40.26-28.27 30.46 17.94-8.03 5.6-21.37-12.66-8.22 5.76L298.46 711l-7.7 5.37-20.07-12.04-8.71 6.09zM310.92 732.88l-5.48-3.29-13.54 9.39-9.35-5.68 41.01-28.52 19.9 11.72c2.98 1.75 5.01 3.7 6.08 5.83 1.07 2.13 1.14 4.31.21 6.51-.93 2.21-2.79 4.27-5.58 6.19-3.18 2.19-6.72 3.58-10.6 4.17-3.88.59-7.77.32-11.67-.8l-2.99 16.98-11.32-6.88 3.33-15.62zm26.29-7.42c-.08-1.37-1.14-2.66-3.17-3.86l-9.27-5.49-11.62 8.06 9.22 5.51c2.06 1.23 4.13 1.82 6.23 1.78 2.1-.05 4.08-.71 5.94-2 1.86-1.29 2.75-2.62 2.67-4zM356.28 778.09l4.5-7.08-20.52-12.4-10.59 3.31-10.24-6.22L380 738.02l10.58 6.23-23.68 40.29-10.62-6.45zm19.46-30.46l-23.52 7.3 13.61 8.17 9.91-15.47zM413.89 757.98l10.15 5.98-33.98 23.02 21.66 13.07-9.15 6.16-31.51-19.14 42.83-29.09z"
								/>
							</g>
						</svg>
					</div>


				</div>

			</div >
			<div client="1" hall="2" session="0" id="rsr" className="hasSVG d-none">

				<ExampleDataTable />
			</div>
		</>
	)

}

export default Viewssvg