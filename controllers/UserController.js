const User = require("../models/User");
const bcrypt = require("bcrypt");

// render signup page
module.exports.signupUI = (req, res) => {
  if (req.isAuthenticated()) {
    // If signed in redirect to Home page
    return res.redirect("/");
  }
  return res.render("SignUp", {
    title: "SignUp",
  });
};

// render signin page
module.exports.signinUI = (req, res) => {
  if (req.isAuthenticated()) {
    // If signed in redirect to Home page
    return res.redirect("/");
  }
  return res.render("SignIn", {
    title: "SignIn",
  });
};

// create new user
module.exports.signup = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    // password not matched to confirm password
    req.flash("error", "password and confirm password didn't match");
    return res.redirect("back");
  }

  try {
    // Find user with email in DB
    const user = await User.findOne({ email });
    if (!user) {
      //encrypt the password before saving in DB
      const encryptedPwd = await bcrypt.hash(password, 10);

      // If user don't exist create it
      await User.create({
        firstname,
        lastname,
        email,
        password: encryptedPwd,
      });
      req.flash("success", "User created Successfully");
    } else {
      // Error => User already exists
      req.flash("error", "User already exists");
    }
    return res.redirect("/users/signin");
  } catch (err) {
    console.log(err);
    req.flash("error", err);
    return res.redirect("back");
  }
};

// logout user
module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "You have logged out!!");
    res.redirect("/");
  });
};
