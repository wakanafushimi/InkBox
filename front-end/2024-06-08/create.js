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

  // テーマと背景色のペア
const themeColors = [
  { theme: '感謝の気持ち', color: '#FFDDC1' },
  { theme: '未来の自分へ', color: '#FFD1DC' },
  { theme: '家族への愛', color: '#FF9AA2' },
  { theme: '友人との大切な思い出', color: '#FFB7B2' },
  { theme: 'もし魔法が使えるなら', color: '#FFDAC1' },
  { theme: 'BIG LOVE♡', color: '#E2F0CB' },
  { theme: '人生の目標', color: '#B5EAD7' },
  { theme: '感動した話', color: '#C7CEEA' },
  { theme: '言えない秘密', color: '#B5B9FF' },
  { theme: '旅行の思い出', color: '#bae1e6' },
  { theme: '黒歴史★', color: '#b7b7dd' },
  { theme: '夢や希望', color: '#A2E2FF' },
  { theme: '美味しかったご飯', color: '#e8c4e6' },
  { theme: '後悔の気持ち', color: '#bed9bb' },
  { theme: '挫折した経験', color: '#daecc8' },
  { theme: '乗り越えた困難', color: '#FFD1A2' }
];

$('#random-theme-btn').on('click', function() {
  const randomIndex = Math.floor(Math.random() * themeColors.length);
  const randomTheme = themeColors[randomIndex].theme;
  const randomColor = themeColors[randomIndex].color;
  $('#random-theme-result').text(`${randomTheme}`);
  $('#random-theme-btn').css('background-color', randomColor);
});


});
