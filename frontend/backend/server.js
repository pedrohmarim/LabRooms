require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const routesUrls = require("./backRoutes/routes");
const cors = require("cors");
const path = require("path");

connection();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
console.log(path.join(__dirname, "/uploads"));
app.use(express.json());
app.use(cors());
app.listen(process.env.PORT);
app.use(routesUrls);
