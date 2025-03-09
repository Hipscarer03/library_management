const mongoose = require('mongoose');

const borrowInfoSchema = new mongoose.Schema({
  borrow_info_id: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrow_date: {
    type: Date,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  return_date: {
    type: Date,
    default: null
  },
  gid: {
    type: Number,
    default: 4,
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned', 'overdue'],
    default: 'borrowed'
  }
});

const borrowInfo = mongoose.model('borrowInfo', borrowInfoSchema);

module.exports = borrowInfo;
