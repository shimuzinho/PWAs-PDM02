if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg = await navigator.serviceWorker.register('/sw.js', { type: "module"});
            
            console.log('Service worker registrada!', reg)
        } catch (err) {
            console.log('Service worker registro falhou:', err)
        }
    })
}

let posicaoAtual;

const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const sucesso = (posicao) => {
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;

    document.getElementById('gmap_canvas').src = `https://maps.google.com/maps?q=${posicaoInicial.coords.latitude},${posicaoInicial.coords.longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
};

const erro = (error) => {
    let errorMessage;
    switch (error.code) {
        case 0:
            errorMessage = "Erro desconhecido.";
        break;
        case 1:
            errorMessage = "Permissão negada!";
        break;
        case 2: 
            errorMessage = "Captura de posição indisponível!";
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!";
        break;
    }
    console.log("Ocorreu um erro: " + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
});

const buscarLocalizacao = document.getElementById('buscarLocalizacao');

buscarLocalizacao.addEventListener('click', () => {
    let latitude = document.getElementById('latitudeInput').value;
    let longitude = document.getElementById('longitudeInput').value;

    if (!latitude || !longitude) {
        alert('Todos os campos são obrigatórios!');
        return;
    }

    document.getElementById('gmap_canvas').src = `https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
});