///////////////////////////////////////////////////////////////////////////////////////////////////
//ページ共通ナビゲーション関連のスクリプト


'use strict'; /* 厳格にエラーをチェック */

document.addEventListener('DOMContentLoaded', function() {
  // DOM取得
  const tabMenus = document.querySelectorAll('.tab__menu-item');

  // イベント付加
  tabMenus.forEach((tabMenu) => {
    tabMenu.addEventListener('click', tabSwitch);
  });

  // イベントの処理
  function tabSwitch(e) {
    // クリックされた要素のデータ属性を取得
    const tabTargetData = e.currentTarget.dataset.tab;
    // クリックされた要素の親要素と、その子要素を取得
    const tabList = e.currentTarget.closest('.tab__menu');
    const tabItems = tabList.querySelectorAll('.tab__menu-item');
    // クリックされた要素の親要素の兄弟要素の子要素を取得
    const tabPanelItems = tabList.nextElementSibling.querySelectorAll('.tab__panel-box');

    // クリックされたtabの同階層のmenuとpanelのクラスを削除
    tabItems.forEach((tabItem) => {
      tabItem.classList.remove('is-active');
    });
    tabPanelItems.forEach((tabPanelItem) => {
      tabPanelItem.classList.remove('is-show');
    });

    // クリックされたmenu要素にis-activeクラスを付加
    e.currentTarget.classList.add('is-active');
    // クリックしたmenuのデータ属性と等しい値を持つパネルにis-showクラスを付加
    tabPanelItems.forEach((tabPanelItem) => {
      if (tabPanelItem.dataset.panel === tabTargetData) {
        tabPanelItem.classList.add('is-show');
      }
    });
  }
});

 $(document).ready(function() {
  // タイトルのフェードイン
  setTimeout(function() {
    $('#page-title').addClass('fade-in');
  }, 500); // タイトルのフェードインを500ms遅らせる
  setTimeout(function() {
    $('.envelope').addClass('is-open');
  }, 1000);
});

///////////////////////////////////////////////////////////////////////////////////////////
//共通ヘッダーナビゲーション

$(function(){
  $('#switch').on('change', function(){
    var st = $(window).scrollTop();
    if($(this).prop("checked") == true) {
      $('html').addClass('scroll-prevent');
      $('html').css('top', -(st) + 'px');
      $('#switch').on('change', function(){
        if($(this).prop("checked") !== true) {
          $('html').removeClass('scroll-prevent');
          $(window).scrollTop(st);
        }
      });
    }
  });
  $('.header_menu a[href]').on('click', function(event) {
    $('#switch').prop('checked', false);
  });
  $('.header_menu a').on('click', function(){
    var st = $(window).scrollTop();
      $('html').removeClass('scroll-prevent');
      $('html').css('top', -(st) + 'px');
      $('.header_menu a').on('change', function(){
      });
  });
});

// ページがリロードされてフェードインする
// ページが完全に読み込まれたことを検知し、そのタイミングでアニメーションを開始するため
document.addEventListener("DOMContentLoaded", function() {
  document.body.style.opacity = '1';
});

//////////////////////////////////////////////////////////////////////////////
//アコーディオンに関するJS

$(document).ready(function(){

  function isTitleOutsideViewport(titleElement) {
    var titleTop = titleElement.offset().top;
    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    
    return (titleTop < scrollTop || titleTop > scrollTop + windowHeight);
  }

  // アコーディオンをクリックした時の動作
  $('.title').on('click', function() {
      var $this = $(this);
      var $box = $this.next('.box');
      
      if (!$this.hasClass('close')) {
          // 閉じる動作
          $('.box').slideUp(500);
          $('.title').removeClass('close');
          
          $box.slideDown(500);
          $this.addClass('close');
          
          // アコーディオンが完全に開いた後にスクロールして、そのアコーディオンのトップを画面に表示
          setTimeout(function() {
              var offset = $this.offset().top - 100; 
              $('html, body').animate({
                  scrollTop: offset
              }, 500);
          }, 500);
      } else {
          // 開く動作
          $box.slideUp(500, function() {
              $this.removeClass('close');
          });
      }
  });

  // ページが読み込まれた際に全てのアコーディオンを閉じる
  $('.accordion-area section').removeClass("open"); 
  $(".box").hide(); 
  $('.title').removeClass('close'); 

  // フォントのセクションに適用
  $('.accordion-area section .title-wrapper').on('click', function() {
      var $this = $(this);
      var $box = $this.next('.box');
      
      if (!$this.hasClass('close')) {
          $('.box').slideUp(500);
          $('.title-wrapper').removeClass('close');
          $('.title-wrapper .title').removeClass('close');
          
          $box.slideDown(500);
          $this.addClass('close');
          $this.find('.title').addClass('close');
          
          // アコーディオンが完全に開いた後にスクロールして、そのアコーディオンのトップを画面に表示
          setTimeout(function() {
              var offset = $this.offset().top - 100; 
              $('html, body').animate({
                  scrollTop: offset
              }, 500);
          }, 500); 
      } else {
          // 開く動作
          $box.slideUp(500, function() {
              $this.removeClass('close');
              $this.find('.title').removeClass('close');
          });
      }
  });

  // ラジオボタンが変更されたときの処理
  $('input[type="radio"]').on('change', function() {
      var selectedText = $(this).parent().text(); 
      $(this).closest('section').find('.selected-text').text(selectedText); 
  });
}); 

//////////////////////////////////////////////////////////////////////////////
  // 添付画像に関するJS


  document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('image-upload');
    const uploadLabel = document.getElementById('upload-label');
    const imageShow = document.getElementById('image-preview');
    const fileNameDisplay = document.getElementById('file-name');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
  
    imageUpload.addEventListener('change', function() {
      const file = this.files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          imageShow.innerHTML = ''; 
          imageShow.appendChild(img);
          uploadLabel.textContent = '画像を削除';
          fileNameDisplay.textContent = file.name; 
          uploadLabel.id = 'delete-label';
        };
        reader.readAsDataURL(file);
      }
    });
  
    uploadLabel.addEventListener('click', function() {
      if (this.id === 'delete-label') {
        imageUpload.value = ''; 
        imageShow.innerHTML = ''; 
        fileNameDisplay.textContent = ''; 
        this.textContent = '画像をアップロード';
        this.id = 'upload-label'; 
      }
    });
  
    // プレビューをクリックしたときの処理
    imageShow.addEventListener('click', function() {
      if (imageShow.querySelector('img')) {
        modalImage.src = imageShow.querySelector('img').src;
        modal.style.display = 'flex';
      }
    });
  
    // モーダルウィンドウをクリックしたときに非表示にする処理
    modal.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  });

//////////////////////////////////////////////////////////////////////////////
///topページに飛ぶボタンのアニメーション

  //スクロールした際の動きを関数でまとめる
  function PageTopAnime() {

    var scroll = $(window).scrollTop(); //スクロール値を取得
    if (scroll >= 200){
      $('#page-top').removeClass('DownMove');  
      $('#page-top').addClass('UpMove');      
    }else{
      if($('#page-top').hasClass('UpMove')){
        $('#page-top').removeClass('UpMove'); 
        $('#page-top').addClass('DownMove'); 
      }
    }
    
    var wH = window.innerHeight; 
    var footerPos =  $('#footer').offset().top; 
    if(scroll+wH >= (footerPos+10)) {
      var pos = (scroll+wH) - footerPos+10 
      $('#page-top').css('bottom',pos); 
    }else{
      if($('#page-top').hasClass('UpMove')){
        $('#page-top').css('bottom','10px');
      }
    }
    }
    
    // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(() => {
    PageTopAnime(); });
    
    // ページが読み込まれたらすぐに動かしたい場合の記述
    $(window).on('load', () => {
    PageTopAnime(); });
    
    // #page-topをクリックした際の設定
    $('#page-top').click(() => {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;//リンク自体の無効化
    });

    document.addEventListener("DOMContentLoaded", function() {
      var modal = document.getElementById("logoutModal");
      var homeMenu = document.querySelector(".home-menu");
      var logoutBtn = document.getElementById("logout");
      var cancelBtn = document.getElementById("cancelBtn");
      var confirmLogoutBtn = document.getElementById("confirmLogoutBtn");
      var confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
      var switchSections = document.getElementsByClassName("switch-section");
  
      logoutBtn.onclick = function() {
          modal.style.display = "block";
          homeMenu.classList.add("fade-out");
      }

      cancelBtn.onclick = function() {
        modal.style.display = 'none';
        homeMenu.classList.remove("fade-out");
      }
  
      confirmLogoutBtn.onclick = function() {
        // 実際のログアウト処理をここに追加
        alert("ログアウトしました");
        modal.style.display = "none";
        homeMenu.classList.remove("fade-out");
        window.location.href = 'index.html'; 
    }
    
    confirmDeleteBtn.onclick = function() {
        // 実際のアカウント削除処理をここに追加
        alert("アカウントが削除されました");
        modal.style.display = "none";
        homeMenu.classList.remove("fade-out");
        window.location.href = 'index.html';
    }
    
  
      for (var i = 0; i < switchSections.length; i++) {
          switchSections[i].onclick = function() {
              var targetId = this.getAttribute("data-target");
              var currentSection = this.parentElement;
              var targetSection = document.getElementById(targetId);
  
              currentSection.classList.add("hidden");
              targetSection.classList.remove("hidden");
              targetSection.classList.add("slide-in");
          }
      }
  
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
              homeMenu.classList.remove("fade-out");
          }
      }
  });
  
