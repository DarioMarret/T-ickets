import React, { useEffect } from "react"
const Viewssvg = () => {
    function addText(p)
    {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var b = p.getBBox();
        t.setAttribute("transform", "translate(" + (b.x + b.width/2) + " " + (b.y + b.height/2) + ")");
        t.textContent = "a";
        t.setAttribute("fill", "red");
        t.setAttribute("font-size", "14");
        p.parentNode.insertBefore(t, p.nextSibling);
    }
    
    var paths = document.querySelectorAll("g");
  /*  for (var p in paths)
    {
        addText(paths[p])
    }*/
    useEffect(()=>{

        var paths = document.querySelectorAll("path, rect, circle, ellipse, line, polyline, polygon");
        paths.forEach(e=>{
            e.addEventListener('click',function(e){
                console.log(e.target.id)
                e.target.setAttribute("class", "btn btn-success")
                //this.classList.toggle('btn-secondary')
                //this.setAttribute("fill", "red")
                console.log("aqui")
            })
        })
    

    },[])

    return (
        <>
        <div client="1" hall="2" session="0" id="rsr" className="hasSVG">
<svg version="1.1" width="660" 
 viewBox="0 0 660 372">
 <defs>
  {/*<style type="text/css">
   <![CDATA[
    .fil1 {fill:#2B2A29}
    .fil0 {fill:#009846;fill-opacity:0.501961}
    .fnt0 {font-weight:bold;font-size:10.9996;font-family:'Arial'}
   ]]>
  </style>/*/}

 </defs>
 <g id="Layer_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <polygon id="a1" points="296,116 297,118 343,124 375,105 366,94 339,88 320,98 319,98" level="9"/>
  <polygon points="344,126 349,130 375,137 407,126 396,108 380,111 377,106 "/>
  <path id="a12" d="M419 143l-10 -3 0 -7 -35 7c4,13 7,29 7,43l43 0c0,-12 -2,-28 -6,-40z" level="4"/>
  <path d="M419 226l-10 3 0 7 -35 -7c4,-13 7,-29 7,-43l43 0c0,12 -2,28 -6,40z"/>
  <polygon points="344,243 349,239 375,232 407,243 396,261 380,258 377,263 "/>
  <polygon points="296,253 297,251 343,245 375,264 366,275 339,281 320,271 319,271 "/>
  <polygon points="271,261 271,256 279,253 295,254 317,272 294,279 "/>
  <polygon points="271,108 271,113 279,116 295,115 317,97 294,90 "/>
  <path id="a13" d="M154 263l9 41 -1 5c-17,-4 -38,-11 -56,-20l18 -37c10,4 19,8 30,11z" level="5"/>
  <path id="a14" d="M213 275l20 41 0 5c-23,-2 -42,-6 -65,-11l1 -4 -9 -41c18,5 32,8 53,10z" level="6"/>
  <path id="a15" d="M218 276c17,2 34,3 53,3l21 15 -19 6 17 25c-19,0 -35,-1 -53,-3l0 -6 -19 -40z" level="7" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path id="a16" d="M286 302c19,-9 30,-17 36,-22l31 12 -7 7 31 23c-21,2 -49,4 -74,4l-17 -23z" level="8" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path id="a17" d="M356 295c10,-11 18,-22 26,-34l26 5 -6 11 59 32c-23,5 -47,9 -71,12l-34 -25z" level="9" fill="#3399FF" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path id="a18" d="M410 270c4,-9 7,-20 9,-31l21 -2 -3 9 61 13 -23 45 -65 -35z" level="10" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path id="a19" d="M510 265c8,-19 16,-50 16,-79l-70 0c0,11 -3,35 -9,54l55 11 -2 12 10 2z" level="11" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path id="a20" d="M507 292l10 2 9 -11 61 -35 10 -62 -62 0c0,22 -5,63 -28,105z" level="12"/>
  <path id="a21" d="M510 104c8,19 16,50 16,79l-70 0c0,-11 -3,-35 -9,-54l55 -11 -2 -12 10 -2z" level="40"/>
  <path id="a22" d="M507 77l10 -2 9 11 61 35 10 62 -62 0c0,-22 -5,-63 -28,-105z" level="41"/>
  <path d="M410 99c4,9 7,20 9,31l21 2 -3 -9 61 -13 -23 -45 -65 35z"/>
  <path d="M356 74c10,11 18,22 26,34l26 -5 -6 -11 59 -32c-23,-5 -47,-9 -71,-12l-34 25z"/>
  <path d="M286 67c19,9 30,17 36,22l31 -12 -7 -7 31 -23c-21,-2 -49,-4 -74,-4l-17 23z"/>
  <path d="M218 93c17,-2 34,-3 53,-3l21 -15 -19 -6 17 -25c-19,0 -35,1 -53,3l0 6 -19 40z"/>
  <path d="M213 94l20 -41 0 -5c-23,2 -42,6 -65,11l1 4 -9 41c18,-5 32,-8 53,-10z"/>
  <path d="M154 106l9 -41 -1 -5c-17,4 -38,11 -56,20l18 37c10,-4 19,-8 30,-11z" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path d="M101 312l17 40c17,3 34,5 51,7l-7 -38c-20,-3 -41,-6 -61,-10z"/>
  <path d="M178 360l-7 -37c40,5 79,7 119,7l0 36c-38,0 -75,-2 -112,-6z"/>
  <path d="M301 330l0 36c27,0 53,-2 80,-4l-4 -36c-25,2 -51,4 -76,4z" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <polygon points="462,314 471,349 394,360 390,324 "/>
  <path d="M477 311l9 35c30,-6 60,-13 89,-21l-15 -33c-27,7 -55,14 -83,19z"/>
  <path d="M652 263l0 37c-21,8 -42,14 -63,21l-14 -33c27,-8 52,-16 77,-24z"/>
  <path d="M652 106l0 -37c-21,-8 -42,-14 -63,-21l-14 33c27,8 52,16 77,24z"/>
  <path d="M477 58l9 -35c30,6 60,13 89,21l-15 33c-27,-7 -55,-14 -83,-19z"/>
  <polygon points="462,55 471,20 394,9 390,45 "/>
  <path d="M301 39l0 -36c27,0 53,2 80,4l-4 36c-25,-2 -51,-4 -76,-4z"/>
  <path d="M178 9l-7 37c40,-5 79,-7 119,-7l0 -36c-38,0 -75,2 -112,6z"/>
  <path d="M101 57l17 -40c17,-3 34,-5 51,-7l-7 38c-20,3 -41,6 -61,10z"/>
  <path d="M113 7l-22 52c-21,4 -41,9 -61,14l-23 -42c35,-10 71,-18 107,-25z"/>
  <path d="M113 362l-22 -52c-21,-4 -41,-9 -61,-14l-23 42c35,10 71,18 107,25z"/>
  <path d="M260 163l111 0c2,11 2,32 0,42l-111 0 0 -42z" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path d="M365 137l-18 -5 -6 -5 -46 -6 -2 -3 -41 4 8 38 110 0c-1,-7 -3,-15 -5,-22z" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
  <path d="M365 232l-18 5 -6 5 -46 6 -2 3 -41 -4 8 -38 110 0c-1,7 -3,15 -5,22z" width="200"  height="30%" stroke="rgb(0,255,255)" stroke-width="0" transform=" rotate(0,0,0)"/>
     <text>
         <textPath  startOffset="50%" text-anchor="middle">We go <tspan fill="red" dy="-30">up</tspan><tspan dy="30">,</tspan> then we go down, then up again</textPath></text>
    </g>
</svg></div>
        </>
    )

}

export default Viewssvg