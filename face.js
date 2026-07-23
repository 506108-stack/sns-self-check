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

const browInner =
  blendshapes.find(x => x.categoryName === "browInnerUp")?.score || 0;

const mouthShrug =
  (blendshapes.find(x => x.categoryName === "mouthShrugLower")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "mouthShrugUpper")?.score || 0);

const eyeBlink =
  (blendshapes.find(x => x.categoryName === "eyeBlinkLeft")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "eyeBlinkRight")?.score || 0);

const eyeSquint =
  (blendshapes.find(x => x.categoryName === "eyeSquintLeft")?.score || 0) +
  (blendshapes.find(x => x.categoryName === "eyeSquintRight")?.score || 0);

const mouthPucker =
  blendshapes.find(x => x.categoryName === "mouthPucker")?.score || 0;

// ---------- 感情スコア ----------
const smileScore = smile;

const sadScore =
  browInner * 0.4 +
  mouthShrug * 0.3 +
  eyeSquint * 0.3;

const angryScore =
  eyeSquint * 0.5 +
  mouthPucker * 0.5;

const tiredScore =
  eyeBlink * 0.6 +
  eyeSquint * 0.4;

  // ---------- 表情リスクスコア（40点満点） ----------
const faceScore = Math.round(
  Math.min(Math.max(sadScore, angryScore, tiredScore), 1) * 40
);

window.faceScore = faceScore;

// デバッグ
console.log({
  smileScore,
  sadScore,
  angryScore,
  tiredScore
});

// ---------- 一番高い感情を表示 ----------
const emotion = document.getElementById("emotion");

const maxScore = Math.max(
  smileScore,
  sadScore,
  angryScore,
  tiredScore
);

if (maxScore < 0.35) {
emotion.innerHTML =
"😐 <b>普通の表情です</b><br><small>Your expression looks neutral.</small>";
}
else if (maxScore === smileScore) {
emotion.innerHTML =
"😊 <b>笑顔ですね！</b><br><small>You look happy!</small>";
}
else if (maxScore === sadScore) {
emotion.innerHTML =
"😢 <b>少し落ち込んでいるかも</b><br><small>You may be feeling a little down.</small>";
}
else if (maxScore === angryScore) {
 emotion.innerHTML =
"😠 <b>少しイライラしているかも</b><br><small>You may be feeling irritated.</small>";
}
else {
 emotion.innerHTML =
"🥱 <b>少し疲れているかも</b><br><small>You may be feeling tired.</small>";
}
requestAnimationFrame(detectFace);

}
