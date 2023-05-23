const router = require("express").Router();
const passport = require("passport");
const FeedbackController = require("../controllers/FeedbackController");

// Render assign task page (Only accessible to admins)
router.get(
  "/assign-task",
  passport.checkAdminAuthentication,
  FeedbackController.assignTaskUI
);

// Render Feedback page (Only accessible to admins)
router.get(
  "/",
  passport.checkAdminAuthentication,
  FeedbackController.feedbacks
);

// Assign a task (incomplete on creation)
// (Only accessible to admins)
router.post(
  "/assign-task",
  passport.checkAdminAuthentication,
  FeedbackController.create
);

// Review feedback (complete the previously created feedback with rating and message)
// It is accessible to both admin and employee
router.post(
  "/write-review",
  passport.checkAuthentication,
  FeedbackController.writeFeedback
);

// Edit review given by any employee (only accessible to admins)
router.post(
  "/edit-review",
  passport.checkAdminAuthentication,
  FeedbackController.editFeedback
);

// Delete review given by any employee (Only accessible to admins)
router.get(
  "/delete-review/:feedID",
  passport.checkAdminAuthentication,
  FeedbackController.deleteFeedback
);

module.exports = router;
