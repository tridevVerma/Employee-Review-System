const router = require("express").Router();
const passport = require("passport");
const EmployeeController = require("../controllers/EmployeeController");

// Render Add Employee Page
router.get(
  "/add-employee",
  passport.checkAdminAuthentication,
  EmployeeController.addEmployeeUI
);

// Add User to Employee
router.get(
  "/add/:userID",
  passport.checkAdminAuthentication,
  EmployeeController.addEmployee
);

// Fetch all employees
router.get(
  "/all-employees",
  passport.checkAdminAuthentication,
  EmployeeController.allEmployeesUI
); // All employees page

// Update Employee data (includes updating admin status)
router.post(
  "/update/:empID",
  passport.checkAdminAuthentication,
  EmployeeController.update
);

// Remove Employee
router.get(
  "/remove/:empID",
  passport.checkAdminAuthentication,
  EmployeeController.remove
);

module.exports = router;
