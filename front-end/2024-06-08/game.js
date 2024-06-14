/////////////////////////////////////////////////////////////////////////////////////////////
///index.html全体のアニメーション: 下に自動でスクロール

 document.addEventListener("DOMContentLoaded", function() {
  const animationDuration = 2800; 

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
  $(window).on('load', function() {
      $('html, body').animate({ scrollTop: $(document).height() }, 3000); 
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////
//ゲーム

document.addEventListener('DOMContentLoaded', (event) => {
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

  const logoTop = document.getElementById('logo-top');
  logoTop.classList.add('fade-in');
  
  setTimeout(() => {
      logoTop.classList.remove('fade-in');
      logoTop.classList.add('fade-out');
      logoTop.addEventListener('animationend', () => {
          logoTop.style.display = 'none';
      });

      const showLater = document.getElementById('show-later');
      showLater.style.display = 'block'; 
      showLater.classList.add('fade-in');
      const howToPlayButton = document.getElementById('howToPlayButton');
      howToPlayButton.style.display = 'block';
      howToPlayButton.classList.add('fade-in');
  }, 1500); 
});

// ゲーム変数
let target; // 手紙
let scoreDisplay;
let score;
let timeLeft;
let timer;
let firstClick = true; 

const modal = document.getElementById('howToPlayModal');
const howToPlayButton = document.getElementById('howToPlayButton');
const closeButton = document.getElementsByClassName('close')[0];

howToPlayButton.onclick = function() {
  modal.style.display = 'block';
}

closeButton.onclick = function() {
  modal.style.display = 'none';
  setupGame(); 
  document.getElementById('score').style.display = 'block';
  document.getElementById('result').style.display = 'block';
  document.getElementById('boundary').style.display = 'block'; 
}

window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = 'none';
  }
}

function setupGame() {
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

  let formattedTimeLeft = timeLeft.toString().padStart(2, '0');
  scoreDisplay.textContent = '00 : ' + formattedTimeLeft;
}

function endGame() {
  scoreDisplay.textContent = '時間切れ！拾得 ' + score + '件';
  target.style.display = 'none';
}

document.getElementById('target').addEventListener('click', function() {
  score++;
  if (firstClick) {
      firstClick = false; 
      positionTarget();
  } else {
      positionTarget(); 
  }
  updateScore();
});

function positionTarget() {
const boundary = document.getElementById('boundary');
const target = document.getElementById('target');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');
const boundaryRect = boundary.getBoundingClientRect();
const targetWidth = target.offsetWidth;
const targetHeight = target.offsetHeight;

const minX = boundaryRect.left;
const maxX = boundaryRect.right - targetWidth;
const minY = boundaryRect.top;
const maxY = boundaryRect.bottom - targetHeight;

let targetX, targetY;
do {
    targetX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
    targetY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  } while (
    (targetX < scoreElement.getBoundingClientRect().right && targetX + targetWidth > scoreElement.getBoundingClientRect().left &&
    targetY < scoreElement.getBoundingClientRect().bottom && targetY + targetHeight > scoreElement.getBoundingClientRect().top) ||
    (targetX < resultElement.getBoundingClientRect().right && targetX + targetWidth > resultElement.getBoundingClientRect().left &&
    targetY < resultElement.getBoundingClientRect().bottom && targetY + targetHeight > resultElement.getBoundingClientRect().top)
);

target.style.left = targetX + 'px';
target.style.top = targetY + 'px';
}


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





