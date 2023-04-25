const formulario = document.querySelector('.formulario');
const ciudad = document.querySelector('#ciudad');
const pais = document.querySelector('#pais');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    formulario.addEventListener('submit', obtenerClima);
})


function obtenerClima(e) {
    e.preventDefault();

    if(ciudad.value === '' || pais.value === ''){
        mostrarAlerta('Completa los campos');
        return;
    }

    consultarApi();
}

function consultarApi() {
    //spinner antes del fetch
    spinner();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value},${pais.value}&appid=${window.apiKey}`)
        .then(resultado => {
            return resultado.json();
        })
        .then(datos => {
            mostrarClima(datos, ciudad.value);
        })
        .catch(error => {
            mostrarAlerta('No localizado');
        })
}


function mostrarClima(objetoClima, ciudad) {
    limpiarHTML();
    const {main:{temp, feels_like, temp_max, temp_min}, weather} = objetoClima;

    //scripting
    const condicion = document.createElement('h2');
    condicion.classList.add('condicion');
    condicion.textContent = weather[0].main;

    const ciudadParrafo = document.createElement('P');
    ciudadParrafo.classList.add('ciudad-parrafo');
    ciudadParrafo.textContent = `Ciudad de ${ciudad}`;
    
    const temperatura = document.createElement('P');
    temperatura.classList.add('temperatura');
    temperatura.innerHTML = `${kelvinCelcius(temp)}&#8451;`;

    const maxima = document.createElement('P');
    maxima.classList.add('bold', 'minmax');
    maxima.textContent = 'Temperatura máxima: ';

    const maximaSpan = document.createElement('SPAN');
    maximaSpan.classList.add('minmax');
    maximaSpan.innerHTML = `${kelvinCelcius(temp_max)}&#8451;`;

    const minima = document.createElement('P');
    minima.classList.add('bold', 'minmax', 'mb');
    minima.textContent = 'Temperatura mínima: ';

    const minimaSpan = document.createElement('SPAN');
    minimaSpan.classList.add('minmax');
    minimaSpan.innerHTML = `${kelvinCelcius(temp_min)}&#8451;`;

    //appends
    maxima.appendChild(maximaSpan);
    minima.appendChild(minimaSpan);

    resultado.appendChild(condicion);
    resultado.appendChild(ciudadParrafo);
    resultado.appendChild(temperatura);
    resultado.appendChild(maxima);
    resultado.appendChild(minima);
}

function kelvinCelcius(kelvins) {
    return parseInt(kelvins -  273.15);
}

function spinner() {
    limpiarHTML();

    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    `;

    resultado.appendChild(divSpinner);
}


function mostrarAlerta(mensaje){
    const existe = document.querySelector('.alerta');
    if(existe){
        existe.remove();
    }

    const alerta = document.createElement('div');
    alerta.classList.add('alerta');
    alerta.innerHTML = `
        <p>${mensaje}</p>
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}
