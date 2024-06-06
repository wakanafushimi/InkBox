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
              var offset = $this.offset().top - 100; // アコーディオンのトップを画面上部から100px上に配置する
              $('html, body').animate({
                  scrollTop: offset
              }, 500);
          }, 500); // スクロールを開始する前に500ミリ秒待機
      } else {
          // 開く動作
          $box.slideUp(500, function() {
              $this.removeClass('close');
          });
      }
  });

  // ページが読み込まれた際に全てのアコーディオンを閉じる
  $('.accordion-area section').removeClass("open"); // openクラスを削除
  $(".box").hide(); // ボックスを非表示にする
  $('.title').removeClass('close'); // 閉じるクラスを削除

  // フォントのセクションに適用
  $('.accordion-area section .title-wrapper').on('click', function() {
      var $this = $(this);
      var $box = $this.next('.box');
      
      if (!$this.hasClass('close')) {
          // 閉じる動作
          $('.box').slideUp(500);
          $('.title-wrapper').removeClass('close');
          $('.title-wrapper .title').removeClass('close');
          
          $box.slideDown(500);
          $this.addClass('close');
          $this.find('.title').addClass('close');
          
          // アコーディオンが完全に開いた後にスクロールして、そのアコーディオンのトップを画面に表示
          setTimeout(function() {
              var offset = $this.offset().top - 100; // アコーディオンのトップを画面上部から100px上に配置する
              $('html, body').animate({
                  scrollTop: offset
              }, 500);
          }, 500); // スクロールを開始する前に500ミリ秒待機
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
      var selectedText = $(this).parent().text(); // ラジオボタンの親要素（label）のテキストを取得
      $(this).closest('section').find('.selected-text').text(selectedText); // 同じセクション内の .selected-text 要素にテキストを表示
  });
}); 

//////////////////////////////////////////////////////////////////////////////
  // 添付画像に関するJS
    // プレビューをクリックしたときの処理
    document.getElementById('image-preview').addEventListener('click', function() {
      var modal = document.getElementById('modal');
      var modalImg = document.getElementById('modal-image');
      // クリックされたプレビュー画像のソースURLを取得してモーダルウィンドウに表示
      modalImg.src = this.querySelector('img').src;
      modal.style.display = 'block';
  });

  // モーダルウィンドウをクリックしたときに非表示にする処理
  document.getElementById('modal').addEventListener('click', function() {
      this.style.display = 'none';
  });

  // 画像を選択したときの処理
  document.getElementById('image-upload').addEventListener('change', function(event) {
      var preview = document.getElementById('image-preview');
      var clearButton = document.getElementById('clear-image');
      preview.innerHTML = ''; // プレビューを初期化
      var file = event.target.files[0];
      if (file) {
          var reader = new FileReader();
          reader.onload = function(e) {
              var img = document.createElement('img');
              img.src = e.target.result;
              preview.appendChild(img); // 選択した画像をプレビューに追加
              clearButton.style.display = 'inline-block'; // 選択したらボタンを表示
          }
          reader.readAsDataURL(file);
      }
  });

  // 選択した画像を解除する処理
  document.getElementById('clear-image').addEventListener('click', function() {
      document.getElementById('image-upload').value = ''; // input[type="file"] の値をクリア
      document.getElementById('image-preview').innerHTML = ''; // プレビューをクリア
      this.style.display = 'none'; // ボタンを非表示にする
  });




$(document).ready(function() {
  // 画像ファイルが選択された時の処理
  $('#image-upload').on('change', function() {
      var input = this;
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
              var img = new Image();
              img.src = e.target.result;
              img.onload = function() {
                  var width = this.width;
                  var height = this.height;
                  // 画像のサイズを指定
                  var maxWidth = 300; // 例として、最大幅を300pxに設定
                  var maxHeight = 200; // 例として、最大高さを200pxに設定
                  if (width > maxWidth || height > maxHeight) {
                      if (width / height > maxWidth / maxHeight) {
                          if (width > maxWidth) {
                              height *= maxWidth / width;
                              width = maxWidth;
                          }
                      } else {
                          if (height > maxHeight) {
                              width *= maxHeight / height;
                              height = maxHeight;
                          }
                      }
                  }
                  $('#image-preview').html('<img src="' + e.target.result + '" width="' + width + '" height="' + height + '">');
              }
          }
          reader.readAsDataURL(input.files[0]);
      }
  });
});

//////////////////////////////////////////////////////////////////////////////
///topページに飛ぶボタンのアニメーション

  //スクロールした際の動きを関数でまとめる
  function PageTopAnime() {

    var scroll = $(window).scrollTop(); //スクロール値を取得
    if (scroll >= 200){//200pxスクロールしたら
      $('#page-top').removeClass('DownMove');   // DownMoveというクラス名を除去して
      $('#page-top').addClass('UpMove');      // UpMoveというクラス名を追加して出現
    }else{//それ以外は
      if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
        $('#page-top').removeClass('UpMove'); //  UpMoveというクラス名を除去し
        $('#page-top').addClass('DownMove');  // DownMoveというクラス名を追加して非表示
      }
    }
    
    var wH = window.innerHeight; //画面の高さを取得
    var footerPos =  $('#footer').offset().top; //footerの位置を取得
    if(scroll+wH >= (footerPos+10)) {
      var pos = (scroll+wH) - footerPos+10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
      $('#page-top').css('bottom',pos); //#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
    }else{//それ以外は
      if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名がついていたら
        $('#page-top').css('bottom','10px');// 下から10pxの位置にページリンクを指定
      }
    }
    }
    
    // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
    });
    
    // ページが読み込まれたらすぐに動かしたい場合の記述
    $(window).on('load', function () {
    PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
    });
    
    // #page-topをクリックした際の設定
    $('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
    });


//////////////////////////////////////////////////////////////////////////////
//タブに関するJS


'use strict'; /* 厳格にエラーをチェック */

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


