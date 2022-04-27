const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/auth");

const UserController = require("../controllers/UserController");
const RoomController = require("../controllers/RoomController");
const CategoryController = require("../controllers/CategoryController");
const CandidaciesController = require("../controllers/CandidaciesController");

router.post("/userRegister", UserController.handleRegister);
router.get("/userLogin", UserController.handleLogin);
router.get("/currentUser", checkAuth, UserController.handleGetCurrentUser);
router.get("/getUsers", UserController.handleGetUsers);
router.get("/getUserById", UserController.handleGetUserById);
router.post("/updateUserInfo", checkAuth, UserController.handleUpdateUser);
router.get("/getUsersByCategory", UserController.handleGetUsersByCategory);

router.get("/categories", CategoryController.handleGetCategory);
router.get("/getCategoryById", CategoryController.handleGetCategoryById);

router.post("/createRoom", checkAuth, RoomController.handleCreate);
router.get("/getRooms", RoomController.handleGetRooms);
router.get(
  "/getRecomendedRooms",
  checkAuth,
  RoomController.handleGetRecomendedRooms
);
router.get(
  "/getRecomendedUsers",
  checkAuth,
  RoomController.handleGetRecomendedUsers
);
router.get("/getRoomsByCategory", RoomController.handleGetRoomsByCategory);
router.get("/getRoomsByOwnerId", RoomController.handleGetRoomsByOwnerId);
router.get("/getRoomById", RoomController.handleGetRoomsById);
router.post("/updateRoom", checkAuth, RoomController.handleUpdateRoom);
router.post("/lockProject", checkAuth, RoomController.handleLockProject);
router.post("/deleteRoom", checkAuth, RoomController.handleDeleteRoom);

router.get("/apply", checkAuth, CandidaciesController.handleApply);

module.exports = router;
