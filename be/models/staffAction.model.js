const mongoose = require("mongoose");
const StaffActionSchema = new mongoose.Schema(
  {
    action_id: {
      type: String,
      required: true,
    },
    staff_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action_type: {
      type: String,
      enum: [
        "approve_reservation",
        "approve_re_extension",
        "approve_suggestion",
        "approve_return",
        "reject_reservation",
        "reject_re_extension",
        "reject_suggestion",
      ],
      required: true,
    },
    target_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    timestamp: { type: Date, required: true },
  },
  { timestamps: true }
);

const StaffAction = mongoose.model("StaffAction", StaffActionSchema);

module.exports = { StaffAction };
