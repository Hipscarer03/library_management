const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // liên kết với model User
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  review_date: {
    type: Date,
    required: true,
  },
});

const bookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  pageNumber: {
    type: Number,
  },
  publisher: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  total_copies: {
    type: Number,
    required: true,
    min: 1,
  },
  available_copies: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [reviewSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Tạo model từ schema
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
