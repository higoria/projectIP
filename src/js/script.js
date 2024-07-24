const form = document.querySelector(".form");
const ipDoUsuario = document.querySelector(".inputPesquisa");
const btn = document.querySelector(".btn");
const spanPais = document.querySelector(".spanPais");
const spanEstado = document.querySelector(".spanEstado");
const spanCidade = document.querySelector(".spanCidade");
const spanPopulacao = document.querySelector(".spanPopulaçao");
const spanLatitude = document.querySelector(".spanLatitude");
const spanLongitude = document.querySelector(".spanLongitude");
const spanCEP = document.querySelector(".spanCEP");
const spanAvisos = document.querySelector(".spanAvisos");
const avisosConteiner = document.querySelector(".avisos");
const spanAreaDoPais = document.querySelector(".spanAreaDoPais");
const btnTema = document.querySelector(".slider");

function consumoApi() {
  form.addEventListener("submit", async (event) => {
    console.log(event);
    event.preventDefault();
    if (!ipDoUsuario.value) {
      avisosConteiner.classList.add("active");
      spanAvisos.innerHTML = "É necessario o envio de algum endereço de IP.";
    } else {
      spanAvisos.innerHTML = "";
      avisosConteiner.classList.remove("active");
    }

    const apiKey = "ca6083dade130122d298ee56a11a4d4080e0f638";
    const apiURL = `https://api.getgeoapi.com/v2/ip/${ipDoUsuario.value}?api_key=${apiKey}&format=json&filter=city,postcode,country,area,continent,currency,location&language=pt`;

    const resultados = await fetch(apiURL);
    const resultadoJSON = await resultados.json();

    if (resultadoJSON.status === "success") {
      spanPais.innerHTML = resultadoJSON.country.name;
      const areaPais = resultadoJSON.country.area_size;
      const areaPaisFormated = areaPais.toLocaleString("pt-BR");
      spanAreaDoPais.innerHTML = areaPaisFormated;
      spanEstado.innerHTML = resultadoJSON.country.capital;
      spanCidade.innerHTML = resultadoJSON.city.name;
      const population = resultadoJSON.city.population;
      const populationFormated = population.toLocaleString("pt-BR");
      spanPopulacao.innerHTML = populationFormated;
      spanLatitude.innerHTML = resultadoJSON.location.latitude;
      spanLongitude.innerHTML = resultadoJSON.location.longitude;
      spanCEP.innerHTML = resultadoJSON.postcode;
    }
  });
}

function temaEscuroClaro() {
  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("active");
  });
}

consumoApi();
temaEscuroClaro();
