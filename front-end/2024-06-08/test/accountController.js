// トークンがないAPI：ログイン、受信者がメールを開く
const host = require("./host.js");
const http = require("http");

// サーバー作成
const server = http.createServer((_, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });
});

// サーバー起動
const port = 3000;
server.listen(port, function () {
  console.log("Node.js Server Started:" + port);
  loginHandle();
  registerHandle();
  exitHandle();
});

// /user/exit
function exitHandle() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`${host}/user/exit`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

// /user/login
function loginHandle() {
  const requestBody = JSON.stringify({
    email: "test@test.com",
    password: "test",
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: requestBody,
    headers: myHeaders,
  };
  fetch(`${host}/user/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

// /user/register
function registerHandle() {
  const requestBody = JSON.stringify({
    email: "test@test.com",
    password: "test",
    username: "test",
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: requestBody,
    headers: myHeaders,
  };
  fetch(`${host}/user/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}
