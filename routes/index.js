const router = require("express").Router();
const HomeController = require("../controllers/HomeController");
const createFirstAdmin = require("../controllers/CreateFirstAdmin");

router.get("/", createFirstAdmin.main, HomeController.UI);
router.use("/users", require("./users"));
router.use("/employee", require("./employee"));
router.use("/feedbacks", require("./feedbacks"));

module.exports = router;
