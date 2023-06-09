const passport = require("passport");
const UserController = require("../controllers/UserController");
const router = require("express").Router();

router.get("/signup", UserController.signupUI);
router.get("/signin", UserController.signinUI);
router.post("/signup", UserController.signup);
router.get(
  "/logout",
  passport.checkAuthentication,
  UserController.destroySession
);
// sign in and create session for the user
router.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  function (req, res) {
    req.flash("success", "Logged in successfully!!");
    return res.redirect("/");
  }
);
module.exports = router;
