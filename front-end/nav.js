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



$(document).ready(function() {
  // アコーディオンをクリックした時の動作
  $('.title').on('click', function() { // タイトル要素をクリックしたら
      $('.box').slideUp(500); // クラス名.boxがついたすべてのアコーディオンを閉じる
      
      var findElm = $(this).closest('section').find('.box'); // タイトル直後のアコーディオンを行うエリアを取得
      
      if ($(this).hasClass('close')) { // タイトル要素にクラス名closeがあれば
          $(this).removeClass('close'); // クラス名を除去    
      } else { // それ以外は
          $('.close').removeClass('close'); // クラス名closeを全て除去した後
          $(this).addClass('close'); // クリックしたタイトルにクラス名closeを付与し
          $(findElm).slideDown(500); // アコーディオンを開く
      }
  });

  // ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
  $(window).on('load', function() {
      $('.accordion-area li:first-of-type section').addClass("open"); // accordion-areaのはじめのliにあるsectionにopenクラスを追加
      $(".open").each(function(index, element) { // openクラスを取得
          var Title = $(element).children('.title'); // openクラスの子要素のtitleクラスを取得
          $(Title).addClass('close'); // タイトルにクラス名closeを付与し
          var Box = $(element).children('.box'); // openクラスの子要素boxクラスを取得
          $(Box).slideDown(500); // アコーディオンを開く
      });
  });

  // ラジオボタンが変更されたときの処理
  $('input[type="radio"]').on('change', function() {
      var selectedText = $(this).parent().text(); // ラジオボタンの親要素（label）のテキストを取得
      $(this).closest('section').find('.selected-text').text(selectedText); // 同じセクション内の .selected-text 要素にテキストを表示
  });
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




