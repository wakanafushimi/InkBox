//////////////////////////////////////////////////////////////////////////////////////////////
 // パスワードの表示/非表示をアイコンボタンで切り替える関数

 function togglePasswordVisibility(inputId, iconId) {
  var passwordInput = document.getElementById(inputId);
  var toggleIcon = document.getElementById(iconId);

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.setAttribute('name', 'eye');
  } else {
    passwordInput.type = 'password';
    toggleIcon.setAttribute('name', 'eye-off');
  }}

document.getElementById('toggleLetterPassword').addEventListener('click', function() {
  togglePasswordVisibility('password', 'password');
});

document.addEventListener('DOMContentLoaded', function() {
  const recipientRadios = document.getElementsByName('recipient');
  const passwordChoiceRadios = document.getElementsByName('password-choice');
  const sendToSenderDiv = document.getElementById('send-to-sender');
  const sendToReceiverDiv = document.getElementById('send-to-receiver');
  const passwordContainerDiv = document.getElementById('password-container');

  recipientRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (radio.id === 'receiver') {
        sendToSenderDiv.style.display = 'none';
        sendToReceiverDiv.style.display = 'block';
      } else if (radio.id === 'self') {
        sendToSenderDiv.style.display = 'block';
        sendToReceiverDiv.style.display = 'none';
      }
    });
  });

  passwordChoiceRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (radio.id === 'yes') {
        passwordContainerDiv.style.display = 'block';
      } else if (radio.id === 'no') {
        passwordContainerDiv.style.display = 'none';
      }
    });
  });

  // パスワードの初期表示状態を設定
  const initialPasswordChoice = document.querySelector('input[name="password-choice"]:checked');
  if (initialPasswordChoice && initialPasswordChoice.id === 'no') {
    passwordContainerDiv.style.display = 'none';
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  // 既存のコード...

  // 文字数カウント用のコード
  const letterContent = document.getElementById('letter-content');
  const charCount = document.getElementById('char-count');

  letterContent.addEventListener('input', () => {
    const currentLength = letterContent.value.length;
    charCount.textContent = `[ ${currentLength}/400 ]`;
    
    if (currentLength > 400) {
      alert('400文字を超える入力はできません。');
      letterContent.value = letterContent.value.substring(0, 400);
      charCount.textContent = `[ 400/400 ]`;
     
    }
  });
});

document.getElementById('save-preview').addEventListener('click', function(event) {
  // フォームが送信されるのを防ぐ
  event.preventDefault();

  const letterContent = document.getElementById('letter-content').value;
  const selectedFontElement = document.querySelector('input[name="font"]:checked');
  const selectedLetterOption = document.querySelector('input[name="letter"]:checked').value;

  if (selectedFontElement) {
    const selectedFont = selectedFontElement.nextElementSibling.className;
                
    // ローカルストレージに保存
    localStorage.setItem('letterContent', letterContent);
    localStorage.setItem('selectedFont', selectedFont);
    localStorage.setItem('selectedLetterOption', selectedLetterOption);
  }

  const letterForm = document.getElementById('letterForm');

  if (!letterForm.checkValidity()) {
    // フォームが無効な場合はアラートを表示
    alert('すべての必須項目を入力した後にプレビューにお進みください。');
  } else {
    // フォームが有効な場合はデータを取得してプレビューに遷移

    const title = document.getElementById('letter-title').value;
    const sender = document.getElementById('sender-name').value;
    const receiver = document.getElementById('receiver-name').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;
    const date = document.getElementById('send-date').value;
    const time = document.getElementById('send-time').value;
    const content = document.getElementById('letter-content').value;
    const envelope = document.querySelector('input[name="envelope"]:checked');
    const envelopeSrc = envelope ? envelope.nextElementSibling.querySelector('img').src : '';
    const letter = document.querySelector('input[name="letter"]:checked');
    const letterSrc = letter ? letter.nextElementSibling.querySelector('img').src : '';
    const font = document.querySelector('input[name="font"]:checked');
    const fontClass = font ? font.nextElementSibling.className.split(' ')[0] : '';
    const fontText = font ? font.nextElementSibling.innerText : '';
    const image = document.getElementById('image-preview').querySelector('img').src;

    // 送信者のメールアドレスを取得
    const senderAddress = document.getElementById('sender-address').innerText;

    // Save to local storage
    localStorage.setItem('previewTitle', title);
    localStorage.setItem('previewSender', sender);
    localStorage.setItem('previewReceiver', receiver);
    localStorage.setItem('previewPassword', password);
    localStorage.setItem('previewAddress', address);
    localStorage.setItem('previewContent', content);
    localStorage.setItem('previewDate', date);
    localStorage.setItem('previewTime', time);
    localStorage.setItem('previewEnvelope', envelopeSrc);
    localStorage.setItem('previewLetter', letterSrc);
    localStorage.setItem('previewFontClass', fontClass);
    localStorage.setItem('previewFontText', fontText);
    localStorage.setItem('previewImage', image);
  
    // 送信者のメールアドレスを保存
    localStorage.setItem('previewSenderAddress', senderAddress);

    // Redirect to preview page
    window.location.href = 'preview.html';
  }
});


 $(document).ready(function() {
  // ページ内リンクのアニメーション
  $('#g-navi a').on('click', function(event) {
    // aタグのデフォルトの動作をキャンセル
    event.preventDefault();
    
    // リンク先のハッシュを取得
    var target = $(this).attr('href');
    
    // スムーズにスクロール
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 500); // 500ミリ秒かけてスクロール
  });

  // 文字数カウント用のコード
  const letterContent = document.getElementById('letter-content');
  const charCount = document.getElementById('char-count');
  const selectedLetterInfo = document.getElementById('selected-letter-info');

  letterContent.addEventListener('input', () => {
    const currentLength = letterContent.value.length;
    charCount.textContent = `[ ${currentLength}/400 ]`;

    if (currentLength > 400) {
      alert('400文字を超える入力はできません。');
      letterContent.value = letterContent.value.substring(0, 400);
      charCount.textContent = `[ 400/400 ]`;
    }
  });

  // 便箋の選択に応じて情報を更新するコード
  const letterOptions = document.querySelectorAll('input[name="letter"]');
  letterOptions.forEach(option => {
    option.addEventListener('change', () => {
      const selectedLabel = option.nextElementSibling;
      const letterName = selectedLabel.querySelector('span').textContent;
      const maxChars = option.dataset.maxChars;
      selectedLetterInfo.textContent = `貴方が選択した便箋「${letterName}」の最適文字数は「MAX${maxChars}」字です。`;
      letterContent.setAttribute('maxlength', maxChars);
      charCount.textContent = `[ 0/${maxChars} ]`;
      letterContent.value = ''; // テキストエリアをクリア
    });
  });

  // ランダムテーマ提案機能
  const themes = [
    '感謝の気持ち',
    '未来の自分へ',
    '家族への愛',
    '友人との思い出',
    'もし魔法が使えるなら',
    'BIG LOVE♡',
    '人生の目標',
    '感動した出来事',
    '誰にも言えない秘密',
    '旅行の思い出',
    '貴方の黒歴史',
    '夢や希望',
    '美味しかったご飯',
    '後悔の気持ち',
    'ありがとうの言葉',
    '困難を乗り越えた経験'
  ];

  $('#random-theme-btn').on('click', function() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    const randomTheme = themes[randomIndex];
    $('#random-theme-result').text(`${randomTheme}`);
  });
});
