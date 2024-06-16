///////////////////////////////////////////////////////////////////////
//プレビュー画面に手紙の各レイアウト（CSS）を適用

        document.addEventListener('DOMContentLoaded', function() {
            const letterContainer = document.getElementById('letter-container');
            const previewLetter = document.getElementById('preview-letter');
            const previewContent = document.getElementById('preview-content');
            
            const selectedOption = localStorage.getItem('selectedLetterOption');
            const letterContent = localStorage.getItem('letterContent');
            const selectedFont = localStorage.getItem('selectedFont');
            
            if (selectedOption) {
                letterContainer.classList.add(`layout-${selectedOption.toLowerCase()}`);
                previewLetter.src = `images/letter${selectedOption.slice(-1)}.png`;
            }
            
            if (letterContent) {
                previewContent.textContent = letterContent;
            }
            
            if (selectedFont) {
                previewContent.classList.add(selectedFont);
            }
        });

       
      $(document).ready(function() {
        $('#read-letter').click(function() {
            var savedPassword = localStorage.getItem('previewPassword');
            
            if (savedPassword.trim() === '') {
                $('#letter-modal').fadeIn();
            } else {
                $('#modal').fadeIn();
            }
            
            // new-letter-box を非表示にする
            $('.new-letter-box').hide();
            $('header').fadeOut();
            $('#footer').fadeOut();
        });

        $('#cancel-modal').click(function() {
            $('#modal').fadeOut();
            // new-letter-box を再表示する
            $('.new-letter-box').show();
            $('header').fadeIn();
            $('#footer').fadeIn();
        });

        $('#close-letter-modal').click(function() {
            $('#letter-modal').fadeOut();
            // new-letter-box を再表示する
            $('.new-letter-box').show();
            $('header').fadeIn();
            $('#footer').fadeIn();
        });

    // パスワードの機能
    $('#open-letter').click(function() {
        var enteredPassword = $('#password-input').val();
        var savedPassword = localStorage.getItem('previewPassword');
        
        if (enteredPassword === savedPassword) {
            $('#modal').fadeOut();
            $('#letter-modal').fadeIn();
        } else {
            alert('パスワードが正しくありません。');
        }
    });
});








///////////////////////////////////////////////////////////////////////
//create.htmlからpreview.htmlにデータを持ってくる

document.addEventListener('DOMContentLoaded', function() {
    const title = localStorage.getItem('previewTitle');
    const sender = localStorage.getItem('previewSender');
    const receiver = localStorage.getItem('previewReceiver');
    const address = localStorage.getItem('previewAddress');
    const password = localStorage.getItem('previewPassword');
    const content = localStorage.getItem('previewContent');
    let date = localStorage.getItem('previewDate');
    const senderAddress = localStorage.getItem('previewSenderAddress'); 
  
    const envelopeSrc = localStorage.getItem('previewEnvelope');
    const letterSrc = localStorage.getItem('previewLetter');
    const fontClass = localStorage.getItem('selectedFont'); 
    const image = localStorage.getItem('previewImage');
    
    document.getElementById('preview-title').textContent = title;
    document.getElementById('preview-title2').textContent = title;
    document.getElementById('preview-sender').textContent = sender;
    document.getElementById('preview-sender2').textContent = sender;
    document.getElementById('preview-receiver').textContent = receiver;
    document.getElementById('preview-receiver2').textContent = receiver;
  
    // メールアドレス
    if (address.trim() === '') {
        document.getElementById('preview-address').textContent = senderAddress;
    } else {
        document.getElementById('preview-address').textContent = address;
    }
    if (senderAddress.trim() === '') {
        document.getElementById('preview-sender-address').style.display = 'none';
    }
  
    // パスワード
    if (password.trim() === '') {
        document.getElementById('preview-password').textContent = 'パスワード未設定';
    } else {
        document.getElementById('preview-password').textContent = password;
    }
  
    // 日付、時間
    if (date.trim() === '') {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        date = `${year}-${month}-${day}`;
    }
  
    document.getElementById('preview-date').textContent = date;
    document.getElementById('preview-date2').textContent = date;
    document.getElementById('preview-sender-address').textContent = senderAddress;
    
    const previewContent = document.getElementById('preview-content');
    previewContent.className = fontClass;
    previewContent.textContent = content;
    
    if (envelopeSrc) {
        document.getElementById('preview-envelope').src = envelopeSrc;
    } else {
        document.getElementById('preview-envelope').src = '';
    }
  
    if (letterSrc) {
        document.getElementById('preview-letter').src = letterSrc;
    } else {
        document.getElementById('preview-letter').src = '';
    }
    
     // 画像がnullの場合、デフォルトの画像を表示
    // if (image === null || image.trim() === '' || image === 'undefined') {
    //     image = '';
    // }
  
    if (image.trim() !== '') { // 画像が空でない場合のみ表示
        document.getElementById('preview-image').src = image;
        document.getElementById('preview-image').style.display = 'block';
    } else {
        document.getElementById('preview-image').style.display = 'none';
    }
  });
  
  
  $(document).ready(function() {
  
       //パスワード入力するモーダルの機能
      $('#read-letter').click(function() {
          var savedPassword = localStorage.getItem('previewPassword');
          
          if (savedPassword.trim() === '') {
              $('#letter-modal').fadeIn();
          } else {
              $('#modal').fadeIn();
          } });
  
      $('#cancel-modal').click(function() {
          $('#modal').fadeOut();
      });
  
      $('#close-letter-modal').click(function() {
          $('#letter-modal').fadeOut();
      });
  
      //パスワードの機能
      $('#open-letter').click(function() {
          var enteredPassword = $('#password-input').val();
          var savedPassword = localStorage.getItem('previewPassword');
          
          if (enteredPassword === savedPassword) {
              $('#modal').fadeOut();
              $('#letter-modal').fadeIn();
          } else {
              alert('パスワードが正しくありません。');
          } });
  });
  
  ///////////////////////////////////////////////////////////////////////
  //プレビュー画面でデータを最終的に選別＞バックにデータを送信
  
  // フォームデータを取得
  const formData = {
      title: localStorage.getItem('previewTitle'),
      sender: localStorage.getItem('previewSender'),
      receiver: localStorage.getItem('previewReceiver'),
  
      mailId: '', //空に設定
  
      image: localStorage.getItem('previewPhoto'), //nullも許可する
      password: localStorage.getItem('previewPassword'), //nullも許可する
  
      font: localStorage.getItem('selectedFont'),
      envelope: localStorage.getItem('previewEnvelope'),
      letter: localStorage.getItem('previewLetter'),
  
      // preview-date, preview-timeをsendTimeで1つにまとめる
      sendTime: '' // 空に設定
  };
  
  // preview-dateとpreview-timeの値を取得
  const previewDate = localStorage.getItem('previewDate');
  const previewTime = localStorage.getItem('previewTime');
  
  // preview-dateとpreview-timeが存在する場合にのみsendTimeを設定する
  if (previewDate && previewTime) {
      // YYYY-MM-DD HH:mm:ssの形式に整形する
      const formattedTime = previewTime.padStart(8, '0'); // 時間が1桁の場合は0でパディング
      formData.sendTime = `${previewDate} ${formattedTime}`; 
  }
  
  // preview-addressの値を取得
  const previewAddress = localStorage.getItem('address');
  
  // preview-addressが空でない場合はその値を使用、空の場合はpreview-sender-addressの値を使用
  if (previewAddress.trim() !== '') {
      formData.mailId = previewAddress;
  } else {
      formData.mailId = localStorage.getItem('previewSenderAddress');
  }
  
  // Ajaxリクエストを作成
  const xhr = new XMLHttpRequest();
  const url = 'バックエンドのエンドポイントURL';
  
  // POSTリクエストを作成
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  // レスポンスが返ってきた時の処理
  xhr.onload = function () {
      if (xhr.status === 200) {
          console.log('データが送信されました。');
      } else {
          console.error('データの送信中にエラーが発生しました。');
      }
  };
  
  // データを送信
  xhr.send(JSON.stringify(formData));
  