// implement your API here

const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

const port = 3000;

// GET
server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

// server.get('/users/:id', (req, res) => {
//   const { id } = req.params;
//   db.find(id)
//     .then()
// })

// POST
server.post("/users", (req, res) => {
  const body = req.body;
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status.apply(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }
  db.insert(body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

// PUT

// DELETE

server.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
