const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

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
        }
        const verifyPassword = await bcrypt.compare(password, user.password);

        if (!verifyPassword) {
          userError = true;
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
    const user = await User.findById(id);
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

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    /** req.user contains the current signed in user from the session cookie
       and we are just sending this to the locals for the views */
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
