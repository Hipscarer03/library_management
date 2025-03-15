const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8 ,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    enum: ["student", "staff"],
    default: "student",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  borrowed_books: [{ type: mongoose.Schema.Types.ObjectId, ref: "BorrowInfo" }],
  fines: [{ type: mongoose.Schema.Types.ObjectId, ref: "Fine" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
