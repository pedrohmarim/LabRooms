const express = require("express");
const router = express.Router();

const UserRegisterController = require("../controllers/UserController");
const RoomRegisterController = require("../controllers/RoomController");

router.post("/userRegister", UserRegisterController.handleRegister);
router.get("/userLogin", UserRegisterController.handleLogin);
router.get("/currentUser/:id", UserRegisterController.handleGetCurrentUser);

router.get("/categories", RoomRegisterController.handleGetCategory);
router.post("/createRoom", RoomRegisterController.handleCreate);
router.get("/getRooms", RoomRegisterController.handleGetRooms);

module.exports = router;
