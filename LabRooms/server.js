require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const routesUrls = require("./backRoutes/routes");
const path = require("path");

connection();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.listen(process.env.PORT);
app.use(routesUrls);
