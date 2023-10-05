const timer = document.getElementById('time');

function decremento() {
    var totalSegundo = 60;

    const intervalo = setInterval(function () {
        var minutos = parseInt(totalSegundo / 60);
        var segundos = parseInt(totalSegundo % 60);

        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;

        timer.textContent = minutos + ':' + segundos;

        if (totalSegundo > 0) {
            totalSegundo--;
        }

        if (totalSegundo <= 0) {
            creatButton();
            clearInterval(intervalo);
        }
    }, 1000);
}

function creatButton() {
    const imgReload = document.createElement('i');
    imgReload.classList = 'fa-solid fa-rotate-right';

    timer.textContent = 'Reenviar código ';

    const buttonReloadTimer = document.createElement('button');
    buttonReloadTimer.appendChild(imgReload);

    timer.appendChild(buttonReloadTimer);
}

timer.onclick = function () {
    axios
        .get('perfil/codigo-seguranca')
        .then((res) => console.log(res))
        .catch((res) => console.log(res));

    location.reload();
};
