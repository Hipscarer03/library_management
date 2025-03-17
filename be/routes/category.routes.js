const express = require("express");
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const { authenticateToken, vertifyRole } = require("../middleware/auth.middleware");
const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;