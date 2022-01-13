const express = require("express");
const app = express();
const routesUrls = require("./backRoutes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://trilp:luispedro@cluster0.qur6c.mongodb.net/SPROY_TCC_DataBase"
)

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 4000);
app.use(routesUrls);
