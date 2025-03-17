const express = require("express");
const {
  createFine,
  getFine,
  updateFine,
  getFineById,
  payFine,
} = require("../controllers/fine.controller");
const { authenticateToken, vertifyRole } = require("../middleware/auth.middleware");

const fineRouter = express.Router();

fineRouter.post("/", createFine);
fineRouter.get("/", authenticateToken, vertifyRole("staff"), getFine);
fineRouter.get("/:id", authenticateToken, vertifyRole("staff"), getFineById);
fineRouter.put("/:id", authenticateToken, vertifyRole("staff"), updateFine);
fineRouter.patch("/pay/:id", authenticateToken, vertifyRole("staff"), payFine);

module.exports = fineRouter;