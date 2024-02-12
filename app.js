const botaoPlayPause = document.querySelector(".play-pause");
const botaoAvancar = document.querySelector(".next");
const botaoVoltar = document.querySelector(".back");
const audioCapitulo = document.querySelector(".audio");
const nomeCapitulo = document.querySelector(".informacao");
const seekBar = document.querySelector(".seek-bar");

const numeroCapitulos = 10;
let tocando = false;
let capituloAtual = 1;

function tocarFaixa() {
    audioCapitulo.play();
    botaoPlayPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
}

function pausarFaixa() {
    audioCapitulo.pause();
    botaoPlayPause.innerHTML = '<ion-icon name="musical-notes-outline"></ion-icon>';
}

function tocarOuPausar() {
    if (tocando === false) {
        tocarFaixa();
        tocando = true;
    } else {
        pausarFaixa();
        tocando = false;
    }
}

function trocarNomeFaixa() {
    nomeCapitulo.innerHTML = `Capítulo ${capituloAtual}`
}

function proximaFaixa() {
    if (capituloAtual === numeroCapitulos) {
        capituloAtual = 1;
    } else {
        capituloAtual++;
    }

    audioCapitulo.src = `books/dom-casmurro/${capituloAtual}.mp3`;
    tocarFaixa();
    tocando = true;
    trocarNomeFaixa();
}

function voltarFaixa() {
    if (capituloAtual === 1) {
        capituloAtual = numeroCapitulos;
    } else {
        capituloAtual--;
    }

    audioCapitulo.src = `books/dom-casmurro/${capituloAtual}.mp3`;
    tocarFaixa();
    tocando = true;
    trocarNomeFaixa();
}

function updateSeekBar(event) {
    const rect = seekBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    audioCapitulo.currentTime = percentage * audioCapitulo.duration;
}

seekBar.addEventListener('mousedown', function (event) {
    updateSeekBar(event);
    document.addEventListener('mousemove', updateSeekBar);
});

document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', updateSeekBar);
});

audioCapitulo.addEventListener('timeupdate', function () {
    const value = audioCapitulo.currentTime;
    seekBar.value = (value / audioCapitulo.duration) * 100;
});

seekBar.addEventListener('input', function () {
    const percentage = seekBar.value / 100;
    audioCapitulo.currentTime = percentage * audioCapitulo.duration;
});

botaoPlayPause.addEventListener("click", tocarOuPausar);
botaoAvancar.addEventListener("click", proximaFaixa);
botaoVoltar.addEventListener("click", voltarFaixa);
