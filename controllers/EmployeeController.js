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
    const employee = await Employee.findById(empID);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found !!",
      });
    }

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

    const updatedEmployee = await Employee.findOne({ _id: empID }).populate({
      path: "user",
      model: "User",
    });

    return res.status(201).json({
      success: true,
      data: {
        updatedEmployee,
        logout: !updatedEmployee.isAdmin,
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
    const employee = await Employee.findByIdAndDelete(empID);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found !!",
      });
    }

    await User.updateOne({ _id: employee.user }, { $set: { employee: null } });

    return res.status(200).json({
      success: true,
      data: {
        deletedEmployeeID: employee._id,
        logout: employee.user.toString() === req.user.id,
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
