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
    (3 - focus) +
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
    <h2 class="risk-score">${totalScore} / 100</h2>
    <p>
      SNSリスクスコア<br>
      <small>Social Media Risk Score</small>
    </p>
  `;

  // 0～39点
 if (totalScore < 40) {
    result.innerHTML += `
      <p class="risk-low">
        🟢 低い
      </p>
      <p>
        現在の状態では、SNSによる気分への影響は比較的小さいと考えられます。<br>
        <small>Your current state may be less likely to affect your mood when using social media.</small>
      </p>`;
  }

  else if (totalScore < 60) {
    result.innerHTML += `
      <p class="risk-medium">
        🟡 注意
      </p>
      <p>
        SNSを見る前に、今の自分の状態を少し確認してみましょう。<br>
        <small>Take a moment to check how you are feeling before using social media.</small>
      </p>`;
  }

  else {
    result.innerHTML += `
      <p class="risk-high">
        🔴 特に注意が必要
      </p>
      <p>
        現在の状態では、SNSによって気分が変化する可能性があります。<br>
        <small>Your current state may make you more likely to experience a change in mood when using social media.</small>
      </p>`;
  }
  }
}
