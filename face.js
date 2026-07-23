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

  // 顔が検出されていないとき
  if (
    result.faceBlendshapes.length === 0 ||
    result.faceLandmarks.length === 0
  ) {
    requestAnimationFrame(detectFace);
    return;
  }

const blendshapes = result.faceBlendshapes[0].categories;

blendshapes.forEach(x => {
  console.log(x.categoryName, x.score);
});
  console.log(
  "smile",
  blendshapes.find(x => x.categoryName === "mouthSmileLeft")?.score,
  blendshapes.find(x => x.categoryName === "mouthSmileRight")?.score
);

console.log(
  "frown",
  blendshapes.find(x => x.categoryName === "mouthFrownLeft")?.score,
  blendshapes.find(x => x.categoryName === "mouthFrownRight")?.score
);

console.log(
  "browDown",
  blendshapes.find(x => x.categoryName === "browDownLeft")?.score,
  blendshapes.find(x => x.categoryName === "browDownRight")?.score
);

console.log(
  "eyeBlink",
  blendshapes.find(x => x.categoryName === "eyeBlinkLeft")?.score,
  blendshapes.find(x => x.categoryName === "eyeBlinkRight")?.score
);

const smile =
  (blendshapes.find(x => x.categoryName === "mouthSmileLeft")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "mouthSmileRight")?.score || 0);

const frown =
  (blendshapes.find(x => x.categoryName === "mouthFrownLeft")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "mouthFrownRight")?.score || 0);

const browDown =
  (blendshapes.find(x => x.categoryName === "browDownLeft")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "browDownRight")?.score || 0);

const eyeClose =
  (blendshapes.find(x => x.categoryName === "eyeBlinkLeft")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "eyeBlinkRight")?.score || 0);
 
  const mouthPucker =
  blendshapes.find(x => x.categoryName === "mouthPucker")?.score || 0;

const eyeSquint =
  (blendshapes.find(x => x.categoryName === "eyeSquintLeft")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "eyeSquintRight")?.score || 0);

// デバッグ用
console.log({
  smile,
  frown,
  browDown,
  eyeClose
});

// 判定
const emotion = document.getElementById("emotion");

  if (smile > 0.35 && smileR > 0.35) {

  emotion.textContent = "😊 笑顔ですね！";

}
else if (
  browInner > 0.45 &&
  eyeSquint > 0.25 &&
  mouthShrug > 0.35
) {

  emotion.textContent = "😢 少し落ち込んでいるかも";

}
else {

  emotion.textContent = "😐 普通の表情です";

}

// イライラ
else if (
  eyeSquint > 0.45 &&
  mouthPucker > 0.30
) {

  emotion.textContent = "😠 少しイライラしているかも";

}


