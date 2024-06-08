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
    alert('すべての必須項目を入力してください。');
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