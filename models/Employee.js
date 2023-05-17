const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  pendingFeedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  givenFeedbacks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
