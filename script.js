function diagnosis() {

    let score = 0;

    if(document.getElementById("angry").checked){
        score++;
    }

    if(document.getElementById("sad").checked){
        score++;
    }

    if(document.getElementById("tired").checked){
        score++;
    }

    if(document.getElementById("compare").checked){
        score++;
    }

    let message = "";

    if(score == 0){
        message = "🌸 今は落ち着いてSNSを楽しめそうです！";
    }
    else if(score <= 2){
        message = "💛 少し疲れているかもしれません。深呼吸してからSNSを見てみましょう。";
    }
    else{
        message = "💙 今はSNSを開く前に少し休憩するのがおすすめです☕";
    }

    document.getElementById("result").innerHTML = message;

}
