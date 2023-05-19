const router = require("express").Router();
const HomeController = require("../controllers/HomeController");

router.get("/", HomeController.UI);
router.use("/users", require("./users"));
router.use("/employee", require("./employee"));

module.exports = router;
