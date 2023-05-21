const router = require("express").Router();
const passport = require("passport");
const FeedbackController = require("../controllers/FeedbackController");

// Render assign task page
router.get(
  "/assign-task",
  passport.checkAdminAuthentication,
  FeedbackController.assignTaskUI
);

// Render Feedback page
router.get(
  "/",
  passport.checkAdminAuthentication,
  FeedbackController.feedbacks
);

router.post(
  "/assign-task",
  passport.checkAdminAuthentication,
  FeedbackController.create
);

router.post(
  "/write-review",
  passport.checkAuthentication,
  FeedbackController.writeFeedback
);

module.exports = router;
