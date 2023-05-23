const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const env = require("./environment");

// Authenticate using passport local strategy
passport.use(
  new localStrategy(
    { usernameField: "email", passReqToCallback: true },
    async function verify(req, email, password, done) {
      try {
        // Find user by email
        const user = await User.findOne({ email: email });

        let userError = false;
        // If user don't exist or password don't match
        if (!user) {
          userError = true;
        } else {
          const verifyPassword = await bcrypt.compare(password, user.password);

          if (!verifyPassword) {
            userError = true;
          }
        }

        if (userError) {
          req.flash("error", "Email or Password is invalid !!");
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log(err.message);
        return done(err, false);
      }
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  return done(null, user._id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  try {
    // Find User and populate its employee field
    const user = await User.findById(id).select("-password").populate({
      path: "employee",
      model: "Employee",
    });

    return done(null, user);
  } catch (err) {
    console.log("Error in deserializing user:", err);
    return done(err);
  }
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, then pass on the request to the next function (controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/signin");
};

// check if logged user is admin
passport.checkAdminAuthentication = function (req, res, next) {
  if (!req.isAuthenticated()) {
    // If not authenticated return to signin page
    return res.redirect("/users/signin");
  }

  // If logged user is employee and he/she is an admin --> proceed to next middleware
  if (req.user.employee !== null && req.user.employee.isAdmin) {
    return next();
  }

  // If not a employee or not admin --> show error
  req.flash("error", "Admin authentication needed !!");
  return res.redirect("back");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    /** req.user contains the current signed in user from the session cookie
       and we are just sending this to the locals for the views */

    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
