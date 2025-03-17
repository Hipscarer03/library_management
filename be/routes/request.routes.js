const express = require("express");
const {
  createRequest,
  getRequest,
  getRequestByUserId,
  updateRequest,
  deleteRequest,
} = require("../controllers/request.controller");
const {
  authenticateToken,
  vertifyRole,
} = require("../middleware/auth.middleware");

const requestRouter = express.Router();

requestRouter.post(
  "/",
  // , authenticateToken
  // , vertifyRole("student")
  createRequest
); ////
requestRouter.get("/", authenticateToken, getRequest);
requestRouter.get("/:user_id/:request_type", authenticateToken, getRequestByUserId);
requestRouter.put("/:id", authenticateToken, updateRequest);
requestRouter.delete("/:id", deleteRequest);

module.exports = requestRouter;
