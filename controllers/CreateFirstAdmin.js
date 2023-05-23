const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const env = require("../configs/environment");

// Only called once with creation of project
module.exports.main = async (req, res, next) => {
  // If admin exist proceed to next middleware
  const adminExist = await User.findOne({ email: env.admin_email });
  if (adminExist) {
    return next();
  }

  // If admin don't exist
  // Encrypt password
  const encryptedPwd = await bcrypt.hash(env.admin_password, 10);

  // Create User with admin details
  const admin = await User.create({
    email: env.admin_email,
    password: encryptedPwd,
    firstname: "admin",
    lastname: "",
  });

  // Add admin to employees
  const adminEmployee = await Employee.create({
    user: admin._id,
    isAdmin: true,
  });

  admin.employee = adminEmployee._id;
  await admin.save();

  return next();
};
