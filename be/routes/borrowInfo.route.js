const express = require("express");
const {
  createBorrowInfo,
  extendBorrrowTime,
  returnBook,
  reExtendBorrrowTime,
  getBorrowInfoByUserId,
  getBorrowInfo
} = require("../controllers/borrowInfo.controller");
const {
  authenticateToken,
  vertifyRole,
} = require("../middleware/auth.middleware");

const borrowInfoRouter = express.Router();

borrowInfoRouter.post("/", authenticateToken, createBorrowInfo);
borrowInfoRouter.get("/", authenticateToken, vertifyRole("admin"), getBorrowInfo); //
borrowInfoRouter.get("/:id", getBorrowInfoByUserId); //
borrowInfoRouter.patch(
  "/extend/:id",
//   authenticateToken,
//   vertifyRole("admin"),
  extendBorrrowTime
);
borrowInfoRouter.patch(
  "/re-extend/:id",
//   authenticateToken,
//   vertifyRole("admin"),
  reExtendBorrrowTime
);
borrowInfoRouter.patch(
  "/return/:id",
//   authenticateToken,
//   vertifyRole("admin"),
  returnBook
);




module.exports = borrowInfoRouter;
