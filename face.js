import {
  FaceLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs";

console.log("✅ MediaPipe読み込み成功");

const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);

console.log("✅ Vision準備完了");
console.log("FaceLandmarker:", FaceLandmarker);
let faceLandmarker;

try {
  console.log("FaceLandmarker作成開始");

faceLandmarker = await FaceLandmarker.createFromOptions(
    vision,
    {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task"
      },
      runningMode: "VIDEO",
      numFaces: 1
    }
  );

  console.log("✅ FaceLandmarker作成成功");

} catch (error) {
  console.error("❌ FaceLandmarkerエラー");
  console.error(error);
}
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

  detectFace();   // ←この1行を追加！
});
function detectFace() {

  console.log("detectFace開始");

  const result = faceLandmarker.detectForVideo(
    video,
    performance.now()
  );

  console.log(result);

  requestAnimationFrame(detectFace);

}

  requestAnimationFrame(detectFace);
}

