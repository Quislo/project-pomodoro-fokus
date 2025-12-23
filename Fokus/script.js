const html = document.querySelector('html');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const musicPlay = new Audio('./sons/play.wav');
const musicPause = new Audio('./sons/pause.mp3');
const musicBeep = new Audio('./sons/beep.mp3');
const controlarMusica = document.querySelector('#alternar-musica');
const startPause = document.querySelector('#start-pause');
const timerElement = document.querySelector('#timer');
const stopBtn = document.querySelector('#stop-timer');
musica.loop = true; // Define a música para repetir em loop

let tempoDecorridoSegundos = 1500; // (25 minutos)
let intervaloId = null;



controlarMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();  
    } else {
        musica.pause(); 
    }
});

stopBtn.addEventListener('click', () => {
    encerrarTimer();
    alert('O temporizador foi encerrado!');
    });

focoBtn.addEventListener('click', () => {
    tempoDecorridoSegundos = 1500; // 25 minutinhos  
    mudarContexto('foco');
      focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
        tempoDecorridoSegundos = 300; // 5 minutinhos 
       mudarContexto('descanso-curto');
       curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
   tempoDecorridoSegundos = 900; // 15 minutinhos
   mudarContexto('descanso-longo');
   longoBtn.classList.add('active');
});

function mudarContexto(contexto) {
    zerar();

    botoes.forEach((function(contexto)
         {
            contexto.classList.remove('active');
         }));

    html.setAttribute('data-contexto', contexto);  
    banner.setAttribute('src',`./imagens/${contexto}.png`);
    switch(contexto) {
        case 'foco':
            tempoDecorridoSegundos = 1500; // 25 minutos
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;

        case 'descanso-curto':
            
        
            titulo.innerHTML = 
            
            
            tempoDecorridoSegundos = 300; // 5 minutos

            atualizarTimerDisplay();
            `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `


            break;

        case 'descanso-longo':
            tempoDecorridoSegundos = 900;
            atualizarTimerDisplay(); // 15 minutos
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
    }

    atualizarTimerDisplay();

    
} 

const contagemRegressiva =() => {

            if(tempoDecorridoSegundos <= 0){
                musicBeep.play();
                alert('O tempo acabou!');
                zerar();
                
                startPause.innerHTML = `
                    <img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt="">
                    <span>Começar</span>
        `;
                tempoDecorridoSegundos = 5; // resetar o temporizador
                return; 
            }
            tempoDecorridoSegundos -= 1;
            atualizarTimerDisplay();
            console.log('Temporizador: ' + tempoDecorridoSegundos);
    
}



startPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
         musicPause.play();
         musicBeep.pause();
        zerar();
        startPause.innerHTML = `
            <img class="app__card-primary-butto-icon" src="./imagens/pause.png" alt="">
            <span>Retomar</span>
        `;
        return;
    }

    intervaloId = setInterval(contagemRegressiva, 1000);
    musicPlay.play();
    startPause.innerHTML = `
        <img class="app__card-primary-butto-icon" src="./imagens/play_arrow.png" alt="">
        <span>Pausar</span>
    `;
}

function zerar(){
    clearInterval(intervaloId);
    intervaloId = null;
}

function atualizarTimerDisplay() {  
    const minutos = Math.floor(tempoDecorridoSegundos / 60);
    const segundos = tempoDecorridoSegundos % 60;
    const formatoMinutos = minutos.toString().padStart(2, '0');
    const formatoSegundos = segundos.toString().padStart(2, '0');
    document.getElementById('timer').textContent = `${formatoMinutos}:${formatoSegundos}`;
}

function encerrarTimer() {
    zerar();

    startPause.innerHTML = `
        <img class="app__card-primary-butto-icon" src="./imagens/play_arrow.png" alt="">
        <span>Começar</span>
    `;

    const contextoAtual = html.getAttribute('data-contexto');

    switch (contextoAtual) {
        case 'foco':
            tempoDecorridoSegundos = 1500;
            break;
        case 'descanso-curto':
            tempoDecorridoSegundos = 300;  
            break;
        case 'descanso-longo':
            tempoDecorridoSegundos = 900;  
            break;
    }

    atualizarTimerDisplay();
}

atualizarTimerDisplay();

