const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_id: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // liên kết với model User
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  review_date: {
    type: Date,
    required: true
  }
});

const bookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  total_copies: {
    type: Number,
    required: true,
    min: 1
  },
  available_copies: {
    type: Number,
    required: true,
    min: 0
  },
  reviews: [reviewSchema]
});

// Tạo model từ schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
