function diagnosis(){

let score = 0;

if(document.getElementById("angry").checked) score++;
if(document.getElementById("sad").checked) score++;
if(document.getElementById("tired").checked) score++;
if(document.getElementById("compare").checked) score++;

let message="";

if(score==0){
    message="😊 良い状態です！SNSを楽しみましょう！";
}
else if(score<=2){
    message="🙂 少し疲れているかも。深呼吸してからSNSを開いてみよう。";
}
else{
    message="🌿 今日は少し休憩してからSNSを見ることをおすすめします。";
}

document.getElementById("result").innerHTML=message;

}
