const router = require("express").Router();
const EmployeeController = require("../controllers/EmployeeController");

// Add user to employees
router.get("/add-employee", EmployeeController.addEmployeeUI); // Add employee page
router.get("/add/:userID", EmployeeController.addEmployee); // Add user to employee

// All employees
router.get("/all-employees", EmployeeController.allEmployeesUI); // All employees page
router.get("/remove/:empID", EmployeeController.remove);
router.post("/update/:empID", EmployeeController.update); // Update employees
module.exports = router;
