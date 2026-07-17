// Face Landmarkerはここから作っていく！
console.log("face.js 読み込み成功！");
const video = document.getElementById("webcam");
const canvas = document.getElementById("output_canvas");
const ctx = canvas.getContext("2d");
// カメラを起動
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true
  });

  video.srcObject = stream;
}

startCamera();
console.log(video);
console.log(canvas);
