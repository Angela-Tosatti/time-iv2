const cardSectionElement = document.getElementById('card-section');

function buscarTimezones() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://worldtimeapi.org/api/timezone")

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const timezones = JSON.parse(this.responseText)
            for (var i = 0; i < 12; i++) {
                var index = Math.floor(Math.random() * timezones.length)
                var timezone = timezones[index]
                buscarDetalhesTimezone(timezone);
            }
        }
    }
    xhr.send();
}

function buscarDetalhesTimezone(timezone) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://worldtimeapi.org/api/timezone/" + timezone)

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const detalhes = JSON.parse(this.responseText)
            let timezoneName = detalhes.timezone;
            let datetime = new Date(detalhes.datetime);
            let utc_datetime = new Date(detalhes.utc_datetime);
            criarCardTimezone(timezoneName, datetime.toLocaleString(), utc_datetime.toUTCString());
        }
    }
    xhr.send();
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

buscarTimezones();