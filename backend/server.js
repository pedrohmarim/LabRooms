const express = require('express');
const app = express();
const routesUrls = require("./Routes/routes")
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

mongoose.connect("mongodb+srv://trilp:kaio12345@cluster0.qur6c.mongodb.net/userTest") // /userTest é o nome do banco de dados, pode criar outro com um nome que envolva toda a aplicação, e la dentro ficara todas as tabelas

app.use(express.json());
app.use(cors());
app.listen(process.env.PORT || 4000);
app.use(routesUrls)