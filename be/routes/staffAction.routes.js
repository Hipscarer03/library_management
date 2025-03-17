const express = require("express");

const {getAllStaffActions, createStaffAction}  = require("../controllers/staffAction.controller");
const {
  authenticateToken,
  vertifyRole,
} = require("../middleware/auth.middleware");

const staffActionRouter = express.Router();

staffActionRouter.post(
  "/",
  // authenticateToken,
  // vertifyRole("staff"),
  createStaffAction
);
staffActionRouter.get(
  "/",
  // authenticateToken,
  // vertifyRole("staff"),
  getAllStaffActions
);

module.exports = staffActionRouter;
