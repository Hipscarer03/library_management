const mongoose = require("mongoose");
const User = require("./user.model");
const Book = require("./book.model");
const BorrowInfo = require("./borrowInfo.model");
const Fine = require("./fine.model");
const Request = require("./request.model");
const StaffAction = require("./staffAction.model");
const Category = require("./category.model");

const Db = {}; // Đối tượng đại diện cho DB chứa các Entity và phương thức kết nối

Db.User = User;
Db.Book = Book;
Db.BorrowInfo = BorrowInfo;
Db.Fine = Fine;
Db.Request = Request;
Db.StaffAction = StaffAction;
Db.Category = Category;

Db.connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Connected to MongoDB successfully"));
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

module.exports = Db;
