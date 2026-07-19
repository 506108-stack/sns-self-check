import {
  FaceLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs";

console.log("✅ MediaPipe読み込み成功");

const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"
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
numFaces: 1,
       outputFaceBlendshapes: true
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
console.log("ここまで来た");

  console.log("動画サイズ", video.videoWidth, video.videoHeight);
}
startCamera().then(() => {
  console.log("video:", video);
  console.log("readyState:", video.readyState);
  console.log("videoWidth:", video.videoWidth);
console.log("detectFaceを呼びます");
  detectFace();   // ←この1行を追加！
});
function detectFace() {

  const result = faceLandmarker.detectForVideo(
    video,
    performance.now()
  );

  const blendshapes = result.faceBlendshapes[0].categories;
console.log(blendshapes);
  const smile = blendshapes.find(x => x.categoryName === "mouthSmileLeft")?.score || 0;
  const frown = blendshapes.find(x => x.categoryName === "mouthFrownLeft")?.score || 0;
  const brow = blendshapes.find(x => x.categoryName === "browDownLeft")?.score || 0;

  const emotion = document.getElementById("emotion");

  if (smile > 0.5) {
    emotion.textContent = "😊 笑顔ですね！";
  }
  else if (brow > 0.4) {
    emotion.textContent = "😠 少しイライラしているかも";
  }
  else if (frown > 0.4) {
    emotion.textContent = "😢 少し落ち込んでいるかも";
  }
  else {
    emotion.textContent = "😐 普通の表情です";
  }

  requestAnimationFrame(detectFace);
}
