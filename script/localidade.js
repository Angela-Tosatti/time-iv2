const continentesElement = document.getElementById('continentes');
const locaisElement = document.getElementById('locais');
const cardSectionElement = document.getElementById('card-section');
const loader = document.getElementById('loader');


function buscarTimezones() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://worldtimeapi.org/api/timezone")

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const timezones = JSON.parse(this.responseText)
            let continentes = []
            for (let index = 0; index < timezones.length; index++) {
                const timezone = timezones[index];
                let timezoneArray = timezone.split('/');
                let nomeContinente = timezoneArray[0];
                if (continentes.indexOf(nomeContinente) == -1) {
                    continentes.push(nomeContinente);
                }
            }

            for (let index = 0; index < continentes.length; index++) {
                const continente = continentes[index];
                criarOpcaoContinente(continente);
            }
        }
    }
    xhr.send();
}


function buscarTimezonesPorContinente() {

    let continente = continentesElement.selectedOptions[0].value;

    limparSelectLocais();

    if (continente != '') {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://worldtimeapi.org/api/timezone/" + continente)

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const timezones = JSON.parse(this.responseText)
                for (let index = 0; index < timezones.length; index++) {
                    const timezone = timezones[index];
                    criarOpcaoLocal(timezone);
                }

            }
        }
        xhr.send();
    }
}


function buscarDetalhesTimezone() {
    let timezone = locaisElement.selectedOptions[0].value;

    removerCardTimezone();

    if (timezone != '') {
        loader.classList.add('visible');

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://worldtimeapi.org/api/timezone/" + timezone)

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const detalhes = JSON.parse(this.responseText)
                let timezoneName = detalhes.timezone;
                let datetime = new Date(detalhes.datetime);
                let utc_datetime = new Date(detalhes.utc_datetime);
                criarCardTimezone(timezoneName, datetime.toLocaleString(), utc_datetime.toUTCString());
                loader.classList.remove('visible');
            }
        }
        xhr.send();
    }
}

function removerCardTimezone() {
    let cardTimezone = document.getElementsByClassName('card-timezone');
    if (cardTimezone.length > 0) {
        cardTimezone[0].remove();
    }
}

function criarCardTimezone(nome, dataHoraAtual, dataHoraUtc) {
    let cardTimezone = document.createElement('div');
    cardTimezone.classList.add('card-timezone');

    let cardTimezoneName = document.createElement('div');
    cardTimezoneName.classList.add('card-timezone-name');
    cardTimezoneName.innerText = nome;

    let cardTimezoneDatetime = document.createElement('div');
    cardTimezoneDatetime.classList.add('card-timezone-datetime');
    cardTimezoneDatetime.innerText = dataHoraAtual;

    let cardTimezoneDatetimeUtc = document.createElement('div');
    cardTimezoneDatetimeUtc.classList.add('card-timezone-datetime');
    cardTimezoneDatetimeUtc.innerText = dataHoraUtc;

    cardTimezone.appendChild(cardTimezoneName);
    cardTimezone.appendChild(cardTimezoneDatetime);
    cardTimezone.appendChild(cardTimezoneDatetimeUtc);

    cardSectionElement.appendChild(cardTimezone);
}

function limparSelectLocais() {
    var elements = [];
    for (let index = 0; index < locaisElement.childNodes.length; index++) {
        const element = locaisElement.childNodes[index];
        if (element.value != '') {
            elements.push(element);
        }
    }
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index];
        element.remove();
    }
}

function criarOpcaoLocal(nomeLocal) {
    let optionElement = document.createElement('option');
    optionElement.value = nomeLocal;
    optionElement.innerText = nomeLocal;
    locaisElement.appendChild(optionElement);
}

function criarOpcaoContinente(nomeContinente) {
    let optionElement = document.createElement('option');
    optionElement.value = nomeContinente;
    optionElement.innerText = nomeContinente;
    continentesElement.appendChild(optionElement);
}




buscarTimezones();