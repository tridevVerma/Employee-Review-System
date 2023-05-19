const router = require("express").Router();
const EmployeeController = require("../controllers/EmployeeController");

router.get("/add/:userID", EmployeeController.addEmployee);
router.get("/add-to-admin/:empID", EmployeeController.addToAdmin);

module.exports = router;
