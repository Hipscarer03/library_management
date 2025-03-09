const mongoose = require("mongoose");

const FineSchema = new mongoose.Schema(
  {
    fine_id: {
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
      required: true,
    },
    amount: { type: Number, required: true },
    reason: {
      type: String,
      enum: ["overdue", "lost", "damaged"],
      required: true,
    },
    status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
    issued_date: { type: Date, required: true },
    payment_date: { type: Date, default: null },
  },
  { timestamps: true }
);

const Fine = mongoose.model("Fine", FineSchema);

module.exports = { Fine };
