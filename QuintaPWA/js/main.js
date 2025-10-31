if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            let reg;
            reg = await navigator.serviceWorker.register('/sw.js', { type: 'module' });

            console.log('Service worker registrada!', reg);
        } catch (err) {
            console.log('Service worker registro falhou:', err);
        }
    });
}

var constrains = { video: { facinMode: 'user' }, audio: false };

const cameraView = document.getElementById('camera--view');
const cameraOutput = document.getElementById('camera--output');
const cameraSensor = document.getElementById('camera--sensor');
const cameraTrigger = document.getElementById('camera--trigger');

function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constrains)
        .then(function (stream) {
            let track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (err) {
            console.error('Ocorreu um erro.', err);
        })
}

cameraTrigger.onclick = function () {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext('2d').drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL('image/webp');
    cameraOutput.classList.add('taken');
};

window.addEventListener('load', cameraStart, false);