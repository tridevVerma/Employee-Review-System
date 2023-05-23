const Employee = require("../models/Employee");
const Feedback = require("../models/Feedback");

// Assign task to employees (only accessible by admins)
module.exports.assignTaskUI = async (req, res) => {
  try {
    // find all the employees and populate user details inside them
    const employeesList = await Employee.find({}).populate({
      path: "user",
      model: "User",
      select: {
        password: 0,
      },
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

// Render all feedbacks page (only accessible by admins)
module.exports.feedbacks = async (req, res) => {
  try {
    // Find all feedbacks
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

// Create a feedback with reviewer, reviewee and assigner (logged admin user)
module.exports.create = async (req, res) => {
  try {
    // create feedback and add it to reviewer employee feedbacks list
    const newFeedback = await Feedback.create(req.body);
    await Employee.updateOne(
      { _id: req.body.reviewer },
      { $push: { feedbacks: newFeedback._id } }
    );
    req.flash("success", "Feedback Assigned !!");
  } catch (err) {
    console.log(err);
    req.flash("error", "Internal Server Error");
  }
  return res.redirect("back");
};

// Give review (accessible by all employees)
module.exports.writeFeedback = async (req, res) => {
  try {
    // Find the feedback and update ratings, text and status (from incomplete to complete)
    await Feedback.updateOne(
      { _id: req.body.feed },
      {
        $set: {
          rating: parseInt(req.body.ratings),
          text: req.body.reviewText,
          status: "complete",
        },
      }
    );
    req.flash("success", "Task Completed !!");
  } catch (err) {
    console.log(err);
    req.flash("error", "Internal Server Error");
  }

  return res.redirect("back");
};

// Edit feedback (only completed feedback are editable) --> (only accessible by admins)
module.exports.editFeedback = async (req, res) => {
  try {
    if (req.body.editRatings) {
      // if requested for ratings update
      await Feedback.updateOne(
        { _id: req.body.feed },
        {
          $set: {
            rating: parseInt(req.body.editRatings),
          },
        }
      );
    }

    if (req.body.editText) {
      // If requested for text(message) update
      await Feedback.updateOne(
        { _id: req.body.feed },
        {
          $set: {
            text: req.body.editText,
          },
        }
      );
    }

    req.flash("success", "Edited Feedback !!");
  } catch (err) {
    console.log(err);
    req.flash("error", "Internal Server Error");
  }

  return res.redirect("back");
};

// Delete Feedback (only accessible by admins)
module.exports.deleteFeedback = async (req, res) => {
  try {
    // find feedback and delete it
    const { feedID } = req.params;
    await Feedback.findByIdAndDelete(feedID);

    // update all employees which contain deleted feedback id
    await Employee.updateMany({ $pull: { feedbacks: feedID } });
    return res.status(200).json({
      success: true,
      data: {
        feedID,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
