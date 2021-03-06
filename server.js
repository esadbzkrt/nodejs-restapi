const pool = require("./db");
const express = require("express");
const app = express();
const queries = "./queries";
const cors = require("cors");
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // req body

//Routes

//Create a TODO

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING * ",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all TODOs

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//Get a TODO

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//UPDATE A TODO

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo updated!");
  } catch (error) {
    console.log(error.message);
  }
});

// DELETE A TODO

app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const deleteTodo= await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
    res.json("Todo deleted!")
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

pool.connect();
