const express = require("express");
const app = express();
const routesUrls = require("./backRoutes/routes");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PSW}@cluster0.qur6c.mongodb.net/LabRoomsDataBase`
);

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 4000);
app.use(routesUrls);
