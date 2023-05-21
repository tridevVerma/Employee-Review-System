const Feedback = require("../models/Feedback");
const Employee = require("../models/Employee");

// Render Home Page
module.exports.UI = async (req, res) => {
  let allFeedbacks = [];
  if (req.user && req.user.employee !== null) {
    const employee = await Employee.findOne({
      _id: req.user.employee._id,
    }).populate({
      path: "feedbacks",
      model: "Feedback",
      populate: [
        {
          path: "assignedBy",
          model: "Employee",
          select: {
            feedbacks: 0,
          },
          populate: {
            path: "user",
            model: "User",
            select: {
              password: 0,
            },
          },
        },
        {
          path: "reviewer",
          model: "Employee",
          select: {
            feedbacks: 0,
          },
          populate: {
            path: "user",
            model: "User",
            select: {
              password: 0,
            },
          },
        },
        {
          path: "reviewee",
          model: "Employee",
          select: {
            feedbacks: 0,
          },
          populate: {
            path: "user",
            model: "User",
            select: {
              password: 0,
            },
          },
        },
      ],
    });

    allFeedbacks = employee.feedbacks;
  }
  return res.render("Home", {
    title: "Home",
    allFeedbacks,
  });
};
