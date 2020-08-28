const cardSectionElement = document.getElementById('card-section');
const loader = document.getElementById('loader');

function obterTimezonePorIp() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.ipify.org/")

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            buscarDetalhesTimezone(this.responseText);
        }
    }
    xhr.send();
}


function buscarDetalhesTimezone(ip) {

    removerCardTimezone();

    if (ip != '') {
        loader.classList.add('visible');

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://worldtimeapi.org/api/ip/" + ip)

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    const detalhes = JSON.parse(this.responseText)
                    let timezoneName = detalhes.timezone;
                    let datetime = new Date(detalhes.datetime);
                    let utc_datetime = new Date(detalhes.utc_datetime);
                    criarCardTimezone(timezoneName, datetime.toLocaleString(), utc_datetime.toUTCString(), ip);

                } else {
                    criarCardTimezone('---', 'Localidade não encontrada', null, ip);
                }
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

function criarCardTimezone(nome, dataHoraAtual, dataHoraUtc, ip) {
    let cardTimezone = document.createElement('div');
    cardTimezone.classList.add('card-timezone');

    let cardTimezoneName = document.createElement('div');
    cardTimezoneName.classList.add('card-timezone-name');
    cardTimezoneName.innerText = nome;
    let cardTimezoneIp = document.createElement('div');
    cardTimezoneIp.classList.add('card-timezone-datetime');
    cardTimezoneIp.innerText = ip;

    let cardTimezoneDatetime = document.createElement('div');
    cardTimezoneDatetime.classList.add('card-timezone-datetime');
    cardTimezoneDatetime.innerText = dataHoraAtual;

    let cardTimezoneDatetimeUtc = document.createElement('div');
    cardTimezoneDatetimeUtc.classList.add('card-timezone-datetime');
    cardTimezoneDatetimeUtc.innerText = dataHoraUtc;

    cardTimezone.appendChild(cardTimezoneName);
    cardTimezone.appendChild(cardTimezoneIp);
    cardTimezone.appendChild(cardTimezoneDatetime);
    cardTimezone.appendChild(cardTimezoneDatetimeUtc);

    cardSectionElement.appendChild(cardTimezone);
}

obterTimezonePorIp();