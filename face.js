import {
  FaceLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs";

console.log("✅ MediaPipe読み込み成功");

const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);

console.log("✅ Vision準備完了");

const video = document.getElementById("webcam");

async function startCamera() {

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true
  });

  video.srcObject = stream;

  // ★追加
  await video.play();

  console.log("動画サイズ", video.videoWidth, video.videoHeight);
}
startCamera().then(() => {
  console.log("video:", video);
  console.log("readyState:", video.readyState);
  console.log("videoWidth:", video.videoWidth);
});
startCamera();
