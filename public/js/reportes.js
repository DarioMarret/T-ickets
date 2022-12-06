

$(document).ready(function () {
  //console.log(window.innerWidth)
  if (window.innerWidth === 732) {
    const element = document.querySelector(".modal-fullscreen-md-down")
    element.classList.remove("modal-dialog")
  }
  window.addEventListener('resize', () => {
    const element = document.querySelector(".modal-fullscreen-md-down")
    //setWidth(window.innerWidth)
    // setHeight(window.innerHeight)
    //console.log('width', window.innerWidth)
    //console.log('height', window.innerWidth)
    if (window.innerWidth === 732) {
      //element.classList.remove("modal-dialog")
      //console.log(element)
    }
  })
})

//publicidad agregar lin para publicidar
// eventos agregar 
