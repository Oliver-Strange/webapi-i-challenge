// implement your API here

const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

const port = 3000;

server.get("/", (req, res) => {
  res.send("Hello World");
});
