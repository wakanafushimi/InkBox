/////////////////////////////////////////////////////////////////////////////////////////////
///index.html全体のアニメーション

// game.js

 document.addEventListener("DOMContentLoaded", function() {
  // Define the duration of the fade-in animation (1.5 seconds) plus a small delay
  const animationDuration = 2000; // 2 seconds in milliseconds

  // Wait for the page load animation to complete
  setTimeout(() => {
    // Smoothly scroll to the bottom of the page
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }, animationDuration);

  // Intersection Observer to animate elements when they come into view
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px",
    threshold: 1 // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Stop observing once the animation is triggered
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
    minHeight: 500.00,
    minWidth: 200.00,
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
//タブ

'use strict'; 
    { /* ローカルスコープ */
    
    // DOM取得
    const tabMenus = document.querySelectorAll('.tab__menu-item');
    console.log(tabMenus);
    
    // イベント付加
    tabMenus.forEach((tabMenu) => {
      tabMenu.addEventListener('click', tabSwitch);
    })
    
    // イベントの処理
    function tabSwitch(e) {
    
      // クリックされた要素のデータ属性を取得
      const tabTargetData = e.currentTarget.dataset.tab;
      // クリックされた要素の親要素と、その子要素を取得
      const tabList = e.currentTarget.closest('.tab__menu');
      console.log(tabList);
      const tabItems = tabList.querySelectorAll('.tab__menu-item');
      console.log(tabItems);
      // クリックされた要素の親要素の兄弟要素の子要素を取得
      const tabPanelItems = tabList.
      nextElementSibling.querySelectorAll('.tab__panel-box');
      console.log(tabPanelItems);
    
      // クリックされたtabの同階層のmenuとpanelのクラスを削除
      tabItems.forEach((tabItem) => {
        tabItem.classList.remove('is-active');
      })
      tabPanelItems.forEach((tabPanelItem) => {
        tabPanelItem.classList.remove('is-show');
      })
    
      // クリックされたmenu要素にis-activeクラスを付加
      e.currentTarget.classList.add('is-active');
      // クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
      tabPanelItems.forEach((tabPanelItem) => {
        if (tabPanelItem.dataset.panel ===  tabTargetData) {
          tabPanelItem.classList.add('is-show');
        }
      })
    
    }
    
    }





