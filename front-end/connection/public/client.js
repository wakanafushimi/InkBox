// /user/login
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // フォームのデフォルトの送信動作を防ぐ

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// /user/register
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  fetch("/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// /mail/new
const mailNewForm = document.getElementById("newForm");

mailNewForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const envelope = document.getElementById("envelope").value;
  const font = document.getElementById("font").value;
  const image = document.getElementById("image").value;
  const paper = document.getElementById("paper").value;
  const password = document.getElementById("password").value;
  const recipient = document.getElementById("recipient").value;
  const sendTime = document.getElementById("sendTime").value;
  const sender = document.getElementById("sender").value;
  const text = document.getElementById("text").value;
  const title = document.getElementById("title").value;

  fetch("/mail/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      envelope,
      font,
      image,
      paper,
      password,
      recipient,
      sendTime,
      sender,
      text,
      title,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// /mail/update
const updateForm = document.getElementById("updateForm");

updateForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const envelope = document.getElementById("envelope").value;
  const font = document.getElementById("font").value;
  const image = document.getElementById("image").value;
  const paper = document.getElementById("paper").value;
  const password = document.getElementById("password").value;
  const recipient = document.getElementById("recipient").value;
  const sendTime = document.getElementById("sendTime").value;
  const sender = document.getElementById("sender").value;
  const text = document.getElementById("text").value;
  const title = document.getElementById("title").value;

  fetch("/mail/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      envelope,
      font,
      image,
      paper,
      password,
      recipient,
      sendTime,
      sender,
      text,
      title,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// /mail/upload
// いったん飛ばす

// /post
const postForm = document.getElementById("postForm");
postForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const mailId = document.getElementById("mailId").value;
  const mailPreId = document.getElementById("mailPreId").value;
  const url = document.getElementById("url").value;
  const userId = document.getElementById("userId").value;

  fetch("/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mailId,
      mailPreId,
      url,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// /post/open
const postOpenForm = document.getElementById("postOpenForm");
postOpenForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const mailId = document.getElementById("mailId").value;
  const password = document.getElementById("password").value;
  const userId = document.getElementById("userId").value;

  fetch("/post/open", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mailId,
      password,
      userId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
