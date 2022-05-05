require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const routesUrls = require("./backRoutes/routes");
const cors = require("cors");

connection();

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 4000);
app.use(routesUrls);
