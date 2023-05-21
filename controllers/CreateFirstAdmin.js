const User = require("../models/User");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

module.exports.main = async (req, res, next) => {
  const adminExist = await User.findOne({ email: "admin@gmail.com" });
  if (adminExist) {
    return next();
  }
  const encryptedPwd = await bcrypt.hash("admin123", 10);

  const admin = await User.create({
    email: "admin@gmail.com",
    password: encryptedPwd,
    firstname: "admin",
    lastname: "",
  });

  const adminEmployee = await Employee.create({
    user: admin._id,
    isAdmin: true,
  });

  admin.employee = adminEmployee._id;
  await admin.save();

  return next();
};
