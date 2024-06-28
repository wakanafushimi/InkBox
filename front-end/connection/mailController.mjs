// import express from "express";
// import bodyParser from "body-parser";
// import fetch from "node-fetch";
// import { host, token } from "./host.js";

// const app = express();
// app.use(bodyParser.json());
// app.use(express.static("public"));

// const port = 3000;
// app.listen(port, function () {
//   console.log("Node.js Server Started: " + port);
// });

// ファイルアップロード関係
// const fs = require("fs");
// const path = require("path");

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

// /mail/from/{id}
app.get("/mail/from/:id", (req, res) => {
  const { id } = req.params;
  const myHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`${host}/mail/from/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("from");
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// function fromHandle(id) {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("token", token);
//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/fromail/${id}`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("from");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }

// // /mail/new
// function newHandle() {
//   const requestBody = JSON.stringify({
//     envelope: 0,
//     font: 0,
//     image: "test",
//     paper: 0,
//     password: "test",
//     recipient: "test",
//     sendTime: "2024-12-12",
//     sender: "test",
//     text: "test",
//     title: "test",
//   });
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("token", token);
//   const requestOptions = {
//     method: "POST",
//     body: requestBody,
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/new`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("new");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }

// // /mail/open/{id}
// function openHandle(id) {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/open/${id}`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("open");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }

// // /mail/rec/{id}
// function recHandle(id) {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("token", token);
//   const requestOptions = {
//     method: "DELETE",
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/rec/${id}`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("rec");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }

// // /mail/tomail/{id}
// function toHandle(id) {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("token", token);
//   const requestOptions = {
//     method: "GET",
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/tomail/${id}`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("to");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }

// // /mail/update
// function updateHandle() {
//   const requestBody = JSON.stringify({
//     envelope: 0,
//     font: 0,
//     image: "",
//     mailId: 0,
//     paper: 0,
//     password: "",
//     recipient: "",
//     sendTime: "",
//     sender: "",
//     text: "",
//     title: "",
//   });
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("token", token);
//   const requestOptions = {
//     method: "PATCH",
//     body: requestBody,
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/update`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("update");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }

// // /mail/upload
// function uploadHandle() {
//   const filePath = path.join(__dirname, "./test.txt");

//   const form = new FormData();
//   form.append("file", fs.createReadStream(filePath));
//   const fileStream = fs.createReadStream(filePath);
//   form.append("file", fileStream);
//   // console.log(form);
//   // console.log("formの中身：" + JSON.stringify(form));
//   for (let pair of form.entries()) {
//     console.log(pair[0] + ", " + pair[1]);
//   }

//   const myHeaders = new Headers();
//   //myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("token", token);
//   const requestOptions = {
//     method: "POST",
//     body: form,
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/upload`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("upload");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }

// // /mail/{id}
// function deleteHandle(id) {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("token", token);
//   const requestOptions = {
//     method: "DELETE",
//     headers: myHeaders,
//   };
//   fetch(`${host}/mail/${id}`, requestOptions)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log("delete");
//       console.log(result);
//     })
//     .catch((error) => console.log("error", error));
// }
