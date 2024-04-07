
/*
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
/*
var countDDate = new Date(),
  endday = new Date(), days = 6;
countDDate.setDate(countDDate.getDate() - (countDDate.getDay() + 2) % 7);
endday.setDate(countDDate.getDate() + days);
endday.getTime();
countDiv = document.getElementById('countdown');
var x = setInterval(function () {
  var now = new Date().getTime();
  var daterest = endday - now;
  var days = Math.floor(daterest / (1000 * 60 * 60 * 24)),
    hours = Math.floor((daterest % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes = Math.floor((daterest % (1000 * 60 * 60)) / (1000 * 60)),
    seconds = Math.floor((daterest % (1000 * 60)) / 1000);

  countDiv.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
}, 1000);*

var end = new Date('01/17/2023 7:00 PM');
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var time;
function showRemaining() {
  var now = new Date();
  var distance = end - now;
  if (distance < 0) {
    clearInterval(time);
    console.log("terminio")
   document.getElementById('regeresion').innerHTML = "  " + 00 + " :  " + 00 + "  :  " + 00 + "";
    document.getElementById('regeresiondos').innerHTML = "  " + 00 + " :  " + 00 + "  :  " + 00 + "";

    return;
  }
  var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);
  //console.log(days, hours,minutes,seconds)
  document.getElementById('regeresion').innerHTML = "  " + hours + " :  " + minutes + "  :  " + seconds +"" ;
  document.getElementById('regeresiondos').innerHTML =  " " + hours + "  :  " + minutes + "  :  " + seconds;

}*/
//document.getElementById('regeresion').innerHTML = " 52555 "  ;
//document.getElementById('regeresiondos').innerHTML = "55455 ";

//time = setInterval(showRemaining, 1000);