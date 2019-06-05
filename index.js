// implement your API here

const express = require("express");
const db = require("./data/db");

const server = express();

server.use(express.json());

const port = 3000;

// GET USERS LIST
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

// GET USER BY ID
server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500);
    });
});

// POST
server.post("/users", (req, res) => {
  // const body = req.body; don't need this
  const { name, bio } = req.body;
  if (!name || !bio) {
    res.status(422).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }
  db.insert({ name, bio })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database",
        error
      });
    });
});

// PUT
server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes).then(updatedUser => {
    if (updatedUser) {
      res.status(200).json({ success: true, updatedUser });
    } else {
      res.status(404).json({});
    }
  });
});

// DELETE
server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).json({
          success: true
        });
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .statusMessage(500)
        .json({
          success: false
        })
        .json({ error: "The user could not be removed" });
    });
});

server.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
