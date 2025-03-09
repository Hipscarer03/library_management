const User = require("./user.model");
const Book = require("./book.model");
const BorrowInfo = require("./borrowInfo.model");
const Fine = require("./fine.model");
const Reservation = require("./reservation.model");
const Request = require("./request.model");
const StaffAction = require("./staffAction.model");

module.exports = {
    User,
    Book,
    BorrowInfo,
    Fine,
    Reservation,
    Request,
    StaffAction
}