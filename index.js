const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const router = require("./routes/userRoutes");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
const connection = mongoose.connection;
connection.once("open", (req, res) => {
  console.log("mongo db connected successfull");
});

app.use(bodyParser.json());
app.use("/", router);

const port = 5000;
app.listen(port, (req, res) => {
  console.log(` server conected successfull ${port}`);
});
