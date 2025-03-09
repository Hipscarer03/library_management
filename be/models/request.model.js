const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  request_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  request_type: {
    type: String,
    enum: ["extend_time", "reserve_book", "suggest_book"],
    required: true,
  },
  details: {
    new_due_date: {
      type: Date,
      required: function () {
        return this.request_type === "extend_time";
      },
    },
    book_suggestion: {
      title: {
        type: String,
      },
      author: {
        type: String,
      },
      reason: {
        type: String,
      },
      required: function () {
        return this.request_type === "suggest_book";
      },
    },
    pickup_date: {
      type: Date,
      required: function () {
        return this.request_type === "reserve_book";
      },
    },
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model từ schema
const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
