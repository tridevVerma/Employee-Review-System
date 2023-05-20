const User = require("../models/User");
const Employee = require("../models/Employee");

module.exports.addEmployeeUI = async (req, res) => {
  try {
    const registeredUsers = await User.find({ employee: null });
    return res.render("AddEmployee", {
      title: "Add Employee",
      registeredUsers,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addEmployee = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found !!",
      });
    }

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

module.exports.allEmployeesUI = async (req, res) => {
  try {
    const allEmployees = await Employee.find({}).populate({
      path: "user",
      model: "User",
    });
    return res.render("AllEmployees", {
      title: "All Employees",
      allEmployees,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { empID } = req.params;
    const employee = await Employee.findById(empID).populate({
      path: "user",
      model: "User",
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found !!",
      });
    } else if (!employee.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Only Admins can update employees !!",
      });
    }

    console.log(req.body);
    await employee.save();

    return res.status(201).json({
      success: true,
      data: {
        newAdmin: employee,
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

module.exports.remove = async (req, res) => {
  try {
    const { empID } = req.params;
    const employee = await Employee.findById(empID).populate({
      path: "user",
      model: "User",
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found !!",
      });
    } else if (!employee.isAdmin) {
      return res.status(401).json({
        success: false,
        message: "Only Admins can remove employees !!",
      });
    }

    console.log(req.body);
    await employee.save();

    return res.status(201).json({
      success: true,
      data: {
        newAdmin: employee,
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
