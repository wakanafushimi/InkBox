// // トークンがないAPI：ログイン、受信者がメールを開く
// const { host, token } = require("./host.js");
// const http = require("http");

// // サーバー作成
// const server = http.createServer((_, res) => {
//   res.writeHead(200, {
//     "Content-Type": "text/html; charset=utf-8",
//   });
// });

// // サーバー起動
// const port = 3000;
// server.listen(port, function () {
//   console.log("Node.js Server Started:" + port);
//   postHandle();
//   postOpenHandle();
//   readHandle();
//   readWithPwHandle();
// });

//以下修正バージョン
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import pkg from "./host.js";

const { host, token } = pkg;

async function startHosting() {
  console.log(`Hosting on ${host} with token ${token}`);
}

startHosting();

const app = express();
app.use(bodyParser.json());
app.use(express.static("front-end")); //もえみのフォルダ名

// /post
function postHandle() {
  const requestBody = JSON.stringify({
    mailId: "",
    mailPreId: "",
    url: "",
    userId: "",
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", token);
  const requestOptions = {
    method: "POST",
    body: requestBody,
    headers: myHeaders,
  };
  fetch(`${host}/post`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("post");
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

// /post/open
function postOpenHandle() {
  const requestBody = JSON.stringify({
    mailId: "",
    password: "",
    userId: "",
  });
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", token);
  const requestOptions = {
    method: "PUT",
    body: requestBody,
    headers: myHeaders,
  };
  fetch(`${host}/post/open`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("postOpen");
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

// /read
function readHandle(id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`${host}/post/read/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("read");
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

// /post/read_with_psw
function readWithPwHandle() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("token", token);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`${host}/post/read_with_psw`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("readWithPw");
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}
