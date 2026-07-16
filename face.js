const video = document.getElementById("webcam");

async function startCamera(){

const stream =
await navigator.mediaDevices.getUserMedia({

video:true

});

video.srcObject = stream;

}

startCamera();
