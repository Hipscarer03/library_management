const express = require("express");
const { login , register, getUserInfo } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/login" ,login);

authRouter.post("/register", register);
authRouter.get("/:token", getUserInfo);

module.exports = authRouter;
