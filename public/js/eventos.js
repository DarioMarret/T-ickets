
/*function disableIE() {
  if (document.all) {
    return false;
  }
}
function disableNS(e) {
  if (document.layers || (document.getElementById && !document.all)) {
    if (e.which == 2 || e.which == 3) {
      return false;
    }
  }
}
if (document.layers) {
  document.captureEvents(Event.MOUSEDOWN);
  document.onmousedown = disableNS;
}
else {
  document.onmouseup = disableNS;
  document.oncontextmenu = disableIE;
}
function detectDevTools() {
  const devtools = /./;
  devtools.toString = function () {
    if (!console._commandLineAPI) {
      return 'Herramientas de desarrollador abiertas';
    }
  };
  console.log(devtools);
}
detectDevTools();*/

document.oncontextmenu = new Function("return false");
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 4) {
      document.querySelector('.navbar').classList.add('fixed-top');
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.querySelector('.navbar').classList.remove('fixed-top')
      document.body.style.paddingTop = '0';
    }
  });
});

