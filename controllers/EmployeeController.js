const User = require("../models/User");
const Employee = require("../models/Employee");

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

    if (user.employee !== null) {
    }

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
        newEmployee,
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

module.exports.addToAdmin = async (req, res) => {
  try {
    const { empID } = req.params;
    const employee = await Employee.findById(empID).populate({
      path: "user",
      model: "User",
    });
    console.log("employee:", employee);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found !!",
      });
    }

    employee.isAdmin = true;
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
