const router = require("express").Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");

router.get("/", HomeController.UI);
router.get("/signup", UserController.signupUI);
router.get("/signin", UserController.signinUI);

module.exports = router;
