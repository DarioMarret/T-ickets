document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      document.querySelector('.navbar').classList.add('fixed-top');
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.querySelector('.navbar').classList.remove('fixed-top')
      document.body.style.paddingTop = '0';
    }
  });
});

/*
function obtenervaariables() {
  const variables = {}
  let data = JSON.stringify("a:16:{s:6:\"olt_id\";s:1:\"2\";s:8:7:\"download_speed_profile_name\";s:10:\"PLAN-SPEED\";}")
  const procesar = JSON.parse(data).split("{")[1]
  procesar.replace("{", "").replace("}", "").split(";").forEach((element, i) => {
    if (!(i % 2 == 0)) {
      let index = procesar.replace("{", "").replace("}", "").split(";")[i - 1].replace("s:", "").split(":")[1]
      variables[index.replace(/['"]+/g, '')] = element.replace("s:", "").split(":")[1].replace(/['"]+/g, '')
    }
  });
  console.log(variables)
  return variables
}
obtenervaariables()*/