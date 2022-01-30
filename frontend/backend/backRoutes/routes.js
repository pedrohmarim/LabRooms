const express = require("express");
const router = express.Router();

const userRegisterController = require("../controllers/UserController");

router.post("/userRegister", userRegisterController.handleRegister);
router.get("/userLogin", userRegisterController.handleLogin);
router.get("/currentUser/:id", userRegisterController.handleGetCurrentUser);

module.exports = router;
