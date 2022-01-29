const express = require("express");
const router = express.Router();

const userRegisterController = require("../controllers/UserController");

router.post("/userRegister", userRegisterController.handleRegister);
router.get("/userLogin", userRegisterController.handleLogin);

module.exports = router;
