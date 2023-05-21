const User = require("../models/User");
const Employee = require("../models/Employee");
const Feedback = require("../models/Feedback");

module.exports.assignTaskUI = async (req, res) => {
  try {
    const employeesList = await Employee.find({}).populate({
      path: "user",
      model: "User",
    });

    return res.render("AssignTask", {
      title: "Assign Task",
      employeesList,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.feedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({})
      .populate({
        path: "assignedBy",
        model: "Employee",
        populate: {
          path: "user",
          model: "User",
          select: {
            password: 0,
          },
        },
      })
      .populate({
        path: "reviewer",
        model: "Employee",
        populate: {
          path: "user",
          model: "User",
          select: {
            password: 0,
          },
        },
      })
      .populate({
        path: "reviewee",
        model: "Employee",
        populate: {
          path: "user",
          model: "User",
          select: {
            password: 0,
          },
        },
      });

    return res.render("Feedbacks", {
      title: "Feedbacks",
      feedbacks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.create = async (req, res) => {
  const newFeedback = await Feedback.create(req.body);
  const employee = await Employee.updateOne(
    { _id: req.body.reviewer },
    { $push: { feedbacks: newFeedback._id } }
  );
  return res.redirect("back");
};

module.exports.writeFeedback = async (req, res) => {
  console.log(req.body);
  return res.redirect("back");
};
