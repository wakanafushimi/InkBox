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

//以下修正なし
// /user/login
app.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  const requestBody = JSON.stringify({ email, password });
  const myHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    body: requestBody,
    headers: myHeaders,
  };
  fetch(`${host}/user/login`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("login");
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// /user/exit
app.get("/user/exit", (req, res) => {
  const myHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  fetch(`${host}/user/exit`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("exit");
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// /user/register
app.post("/user/register", (req, res) => {
  const { email, password, username } = req.body;
  const requestBody = JSON.stringify({ email, password, username });
  const myHeaders = {
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    body: requestBody,
    headers: myHeaders,
  };
  fetch(`${host}/user/register`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("register");
      console.log(result);
      res.json(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
