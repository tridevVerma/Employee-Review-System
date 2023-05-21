const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  reviewee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  status: {
    type: String,
    enum: ["complete", "incomplete"],
    default: "incomplete",
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  text: {
    type: String,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
