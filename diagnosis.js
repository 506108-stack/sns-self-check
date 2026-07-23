function getRadioValue(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? Number(checked.value) : 0;
}

function diagnosis() {

  // 質問の点数
  const angry = getRadioValue("angry");
  const sad = getRadioValue("sad");
  const tired = getRadioValue("tired");
  const compare = getRadioValue("compare");
  const focus = getRadioValue("focus");
  const past = getRadioValue("past");
  const lonely = getRadioValue("lonely");
  const approval = getRadioValue("approval");

  // 24点満点
  let questionScore =
    angry +
    sad +
    tired +
    compare +
    (3 - focus) +   // 集中できるほどリスクが下がる
    past +
    lonely +
    approval;

  // 60点満点に変換
  questionScore = Math.round(questionScore / 24 * 60);

  // 表情スコア（face.jsから受け取る）
  const faceScore = window.faceScore || 0;

  // 合計100点
  const totalScore = questionScore + faceScore;

  const result = document.getElementById("result");

  result.innerHTML = `
    <h2>${totalScore} / 100</h2>
    <p>
      SNSリスクスコア<br>
      <small>Social Media Risk Score</small>
    </p>
  `;

  if (totalScore < 30) {
    result.innerHTML += `
      <p>
        😊 安心してSNSを利用できそうです。<br>
        <small>You seem ready to use social media.</small>
      </p>`;
  }
  else if (totalScore < 60) {
    result.innerHTML += `
      <p>
        😌 少し休憩してから見るのがおすすめです。<br>
        <small>Taking a short break first may help.</small>
      </p>`;
  }
  else if (totalScore < 80) {
    result.innerHTML += `
      <p>
        ⚠️ 今はSNSが気分に影響する可能性があります。<br>
        <small>Social media may affect your mood right now.</small>
      </p>`;
  }
  else {
    result.innerHTML += `
      <p>
        🚫 今日はSNSを控えることをおすすめします。<br>
        <small>It may be better to avoid social media for now.</small>
      </p>`;
  }
}
