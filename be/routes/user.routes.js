const express = require("express");
const { getProfile } = require("../controllers/user.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

const userRouter = express.Router();

userRouter.get("/profile", authenticateToken, getProfile);

module.exports = userRouter;
