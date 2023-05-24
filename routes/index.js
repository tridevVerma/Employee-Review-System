const router = require("express").Router();
const HomeController = require("../controllers/HomeController");
const createFirstAdmin = require("../controllers/CreateFirstAdmin");

router.get("/", createFirstAdmin.main, HomeController.UI);
router.use("/users", require("./users"));
router.use("/employee", require("./employee"));
router.use("/feedbacks", require("./feedbacks"));

// Return type of environment (development or production)
router.get("/env", (req, res) => {
  return res
    .status(200)
    .json(process.env.NODE_ENV ? process.env.NODE_ENV : "development");
});
module.exports = router;
