const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const RoomController = require("../controllers/RoomController");
const CategoryController = require("../controllers/CategoryController");

router.post("/userRegister", UserController.handleRegister);
router.get("/userLogin", UserController.handleLogin);
router.get("/currentUser/:id", UserController.handleGetCurrentUser);
router.get("/getUserById", UserController.handleGetUserById);

router.get("/categories", CategoryController.handleGetCategory);
router.get("/getCategoryById", CategoryController.handleGetCategoryById);

router.post("/createRoom", RoomController.handleCreate);
router.get("/getRooms", RoomController.handleGetRooms);
router.get("/getRoomsByCategory", RoomController.handleGetRoomsByCategory);
router.get("/getRoomById", RoomController.handleGetRoomsById);

module.exports = router;
