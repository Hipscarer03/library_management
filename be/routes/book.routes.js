const express = require("express");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/book.controller");

const {
  authenticateToken,
  vertifyRole,
} = require("../middleware/auth.middleware");

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", authenticateToken, vertifyRole("staff"), createBook);
bookRouter.put("/:id", updateBook); //nho them lai middleware
bookRouter.delete("/:id", deleteBook);
bookRouter.post("/:id/review",  createReview);
bookRouter.put("/:id/review/:reviewId", updateReview);
bookRouter.delete("/:id/review/:reviewId", deleteReview);


module.exports = bookRouter;
