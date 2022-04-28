const pool = require("./db");
const express = require("express");
const app = express();
const queries = "./queries";
const cors=require("cors");
const port = 3000;

// Middleware

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

pool.connect();
