const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(evento) {
  evento.preventDefault();

  // validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    // hubo un error
    mostrarError("ambos campos son obligatorios");
    return;
  }

  // consultar api
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const container = document.querySelector(".container");

  if (container === "") {
  }

  // Crear alerta
  const alerta = document.createElement("DIV");
  alerta.classList.add(
    "bg-red-100",
    "border-red-400",
    "text-red-700",
    "px-4",
    "py-3",
    "rounded",
    "max-w-md",
    "mx-auto",
    "mt-6",
    "text-center"
  );

  alerta.innerHTML = `
  <strong class="font-bold">Error</strong>
  <span class="block">${mensaje}</span>`;

  container.appendChild(alerta);

  setTimeout(() => {
    alerta.remove();
  }, 5000);
}

function consultarAPI(ciudad, pais) {
  const appId = "8ee312e4dee82a2496fabe80d3c7ad32";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError("ciudad no encontrada");
        return;
      }

      // imprime la respuesta
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrado = kelvinACentigrados(temp);
  const max = kelvinACentigrados(temp_max);
  const min = kelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement("P");
  nombreCiudad.textContent = `clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrado} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("P");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("P");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("DIV");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
