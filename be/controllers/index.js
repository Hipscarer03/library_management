const BookController = require("./book.controller");
const UserController = require("./user.controller");
const CategoryController = require("./category.controller");
const BorrowInfoController = require("./borrowInfo.controller");
const FineController = require("./fine.controller");
const RequestController = require("./request.controller");
const StaffActionController = require("./staffAction.controller");

module.exports = {
    BookController,
    UserController,
    CategoryController,
    BorrowInfoController,    
    FineController,
    RequestController,
    StaffActionController
}