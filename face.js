// Face Landmarkerはここから作っていく！
console.log("face.js 読み込み成功！");

const video = document.getElementById("webcam");
const canvas = document.getElementById("output_canvas");

console.log("video:", video);
console.log("canvas:", canvas);

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    video.srcObject = stream;
    console.log("✅ カメラ起動成功！");
  } catch (error) {
    console.error("❌ カメラ起動失敗", error);
  }
}

startCamera();
