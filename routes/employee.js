const router = require("express").Router();
const passport = require("passport");
const EmployeeController = require("../controllers/EmployeeController");

// Render Add Employee Page (Only accessible to admins)
router.get(
  "/add-employee",
  passport.checkAdminAuthentication,
  EmployeeController.addEmployeeUI
);

// Add User to Employee (Only accessible to admins)
router.get(
  "/add/:userID",
  passport.checkAdminAuthentication,
  EmployeeController.addEmployee
);

// Fetch all employees (Only accessible to admins)
router.get(
  "/all-employees",
  passport.checkAdminAuthentication,
  EmployeeController.allEmployeesUI
); // All employees page

// Update Employee data (includes updating admin status)
// (Only accessible to admins)
// Will not affect Root admin (the first admin)
router.post(
  "/update/:empID",
  passport.checkAdminAuthentication,
  EmployeeController.update
);

// Remove Employee (Only accessible to admins)
router.get(
  "/remove/:empID",
  passport.checkAdminAuthentication,
  EmployeeController.remove
);

module.exports = router;
