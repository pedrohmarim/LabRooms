const express = require("express");
const router = express.Router();

const userRegisterController = require("../controllers/userRegisterController");
const userLoginController = require("../controllers/userLoginController");

router.post("/userRegister", userRegisterController.handleRegister);
router.get("/userLogin", userLoginController.handleLogin);

module.exports = router;
