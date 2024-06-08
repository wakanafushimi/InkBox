/////////////////////////////////////////////////////////////////////////////////////////////
///index.html全体のアニメーション: 下に自動でスクロール

 document.addEventListener("DOMContentLoaded", function() {
  const animationDuration = 2000; 

  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, animationDuration);

  const observerOptions = {
    root: null, 
    rootMargin: "0px",
    threshold: 1 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  const elementsToAnimate = document.querySelectorAll(".animate");
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});


/////////////////////////////////////////////////////////////////////////////////////////////
///ログイン新規登録画面

$(document).ready(function() {
  $('.message a').click(function(event){
      event.preventDefault();
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });
});


$(document).ready(function() {
  // ページの読み込みが完了したら、一番下にゆっくりとスクロール
  $(window).on('load', function() {
      $('html, body').animate({ scrollTop: $(document).height() }, 4000); //スクロール
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////
//ゲーム

let target; // 手紙
let scoreDisplay;
let score;
let timeLeft;
let timer;

const modal = document.getElementById('howToPlayModal');
const howToPlayButton = document.getElementById('howToPlayButton');
const closeButton = document.getElementsByClassName('close')[0];

howToPlayButton.onclick = function() {
  modal.style.display = 'block';
}

closeButton.onclick = function() {
  modal.style.display = 'none';
  setupGame(); // closeButtonをクリックした後にゲームを開始する
  // スコア、結果、ターゲットを表示
  document.getElementById('score').style.display = 'block';
  document.getElementById('result').style.display = 'block';
  document.getElementById('target').style.display = 'block';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

//vanta.js 鳥の設定
function setupGame() {
  VANTA.BIRDS({
    el: "#bird",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    scale: 1.00,
    scaleMobile: 1.00,
    backgroundColor: 0x110f20,
    color1: 0x568dac,
    color2: 0x9473b3,
    birdSize: 1,
    separation: 70.00
  });

  target = document.getElementById('target');
  scoreDisplay = document.getElementById('score');
  score = 0;
  timeLeft = 30; 
  updateScore();
  clearInterval(timer);
  timer = setInterval(updateTime, 1000);
  target.style.display = 'block';
}

function updateScore() {
  scoreDisplay.textContent = score + '件 拾得';
}

function updateTime() {
  timeLeft--;
  if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
      return;
  }
  
  // Pad the seconds value with leading zero if less than 10
  let formattedTimeLeft = timeLeft.toString().padStart(2, '0');
  
  scoreDisplay.textContent = '00 : ' + formattedTimeLeft;
}

function endGame() {
scoreDisplay.textContent = '時間切れ！拾得 ' + score + '件';
target.style.display = 'none';
}

document.getElementById('target').addEventListener('click', function() {
  score++;
  target.style.top = Math.floor(Math.random() * (window.innerHeight - target.offsetHeight)) + 'px';
  target.style.left = Math.floor(Math.random() * (window.innerWidth - target.offsetWidth)) + 'px';
  updateScore();
});

// 初回のゲームセットアップ
setupGame();


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//index.html のパスワード入力

'use strict'; 

      // 新規登録フォームのパスワード切り替えアイコンをクリックした時のイベントリスナーを設定
      document.getElementById('toggleRegisterPassword').addEventListener('click', function() {
        togglePasswordVisibility('registerPasswordInput', 'toggleRegisterPassword');
      });
    
      // ログインフォームのパスワード切り替えアイコンをクリックした時のイベントリスナーを設定
      document.getElementById('toggleLoginPassword').addEventListener('click', function() {
        togglePasswordVisibility('loginPasswordInput', 'toggleLoginPassword');
      });

      // ログインフォームのパスワード切り替えアイコンをクリックした時のイベントリスナーを設定
      document.getElementById('toggleLetterPassword').addEventListener('click', function() {
        togglePasswordVisibility('letterPasswordInput', 'toggleLetterPassword');
      });





