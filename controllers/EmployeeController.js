const User = require("../models/User");
const Employee = require("../models/Employee");
const Feedback = require("../models/Feedback");
const env = require("../configs/environment");

// Render add employee page
module.exports.addEmployeeUI = async (req, res) => {
  try {
    // Get all registered users (signed up users)
    const registeredUsers = await User.find({ employee: null }).select(
      "-password"
    );
    return res.render("AddEmployee", {
      title: "Add Employee",
      registeredUsers,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// Add employee functionality
module.exports.addEmployee = async (req, res) => {
  try {
    // Find the user mentioned in parameters
    const { userID } = req.params;
    const user = await User.findById(userID).select("-password");

    if (!user) {
      // If user don't exist throw error
      return res.status(404).json({
        success: false,
        message: "User not found !!",
      });
    }

    // If user is not employee --> add it to employees
    if (user.employee === null) {
      const newEmployee = await Employee.create({
        user: userID,
        isAdmin: false,
        pendingFeedbacks: [],
        givenFeedbacks: [],
      });

      user.employee = newEmployee._id;
      await user.save();

      return res.status(201).json({
        success: true,
        data: {
          userID: user._id,
        },
      });
    } else {
      // If User is already employee throw error
      return res.status(400).json({
        success: false,
        message: "User is already an employee",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Render all employees page
module.exports.allEmployeesUI = async (req, res) => {
  try {
    // Find all the employees
    let employees = await Employee.find({}).populate({
      path: "user",
      model: "User",
      select: {
        password: 0,
      },
    });

    // Filter admin employee
    const allEmployees = employees.filter((emp) => {
      return emp.user.email !== env.admin_email;
    });

    // return all employees (except admin)
    return res.render("AllEmployees", {
      title: "All Employees",
      allEmployees,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};

// Update employee data
module.exports.update = async (req, res) => {
  try {
    // Find the employee from params
    const { empID } = req.params;
    const employee = await Employee.findById(empID).populate({
      path: "user",
      model: "User",
      select: {
        email: 1,
      },
    });

    // If employee don't exist throw error
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found !!",
      });
    }

    // If employee tries to update admin --> throw error
    if (employee.user.email === env.admin_email) {
      return res.status(400).json({
        success: false,
        message: "Can't Update Root Admin !!",
      });
    }

    // Get user details of that employee and update as per request body
    const user = await User.findById(employee.user);

    const { email, firstname, lastname, isAdmin } = req.body;

    if (email) {
      user.email = email;
    }
    if (firstname) {
      user.firstname = firstname;
    }
    if (lastname) {
      user.lastname = lastname;
    }

    await user.save();

    if (isAdmin === "on") {
      employee.isAdmin = true;
    } else {
      employee.isAdmin = false;
    }

    await employee.save();

    // Get new updated Employee with its user details populated
    const updatedEmployee = await Employee.findOne({ _id: empID }).populate({
      path: "user",
      model: "User",
      select: {
        password: 0,
      },
    });

    // If logged user updated his/her own email or his admin status --> logout that employee
    let logout = false;
    if (
      req.user.email === employee.user.email &&
      (req.user.email !== updatedEmployee.user.email ||
        !updatedEmployee.isAdmin)
    ) {
      logout = true;
    }

    return res.status(201).json({
      success: true,
      data: {
        updatedEmployee,
        logout,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.remove = async (req, res) => {
  try {
    // Find the employee with params
    const { empID } = req.params;
    const employee = await Employee.findById(empID).populate({
      path: "user",
      model: "User",
      select: {
        email: 1,
      },
    });

    // If employee don't exist throw error
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found !!",
      });
    }

    // If employee tries to delete admin --> throw error
    if (employee.user.email === env.admin_email) {
      return res.status(400).json({
        success: false,
        message: "Can't Delete Root Admin !!",
      });
    }

    // Delete employee
    await Employee.deleteOne({ _id: empID });

    // Update user details by setting employee value to null
    await User.updateOne({ _id: employee.user }, { $set: { employee: null } });

    // Check if any feedback exist connected to this employee
    await Feedback.deleteMany({
      assignedBy: employee._id,
    });
    await Feedback.deleteMany({ reviewer: employee._id });
    await Feedback.deleteMany({ reviewee: employee._id });

    // If employee tries to remove himself from employees list --> logout
    let logout = false;
    if (req.user.email === employee.user.email) {
      logout = true;
    }
    return res.status(200).json({
      success: true,
      data: {
        deletedEmployeeID: employee._id,
        logout,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
