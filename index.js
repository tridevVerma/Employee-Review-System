const env = require("./configs/environment");
const path = require("path");
const express = require("express");
const app = express();
const passport = require("passport"); // to use different authentication strategies
require("./configs/localStrategyConfig"); // passport -> local strategy
const db = require("./configs/mongoose"); // mongoose connection
var expressLayouts = require("express-ejs-layouts"); // use layouts with ejs
const cookieParser = require("cookie-parser"); // cookie parser required by connect-flash
const session = require("express-session"); // express-session required by connect-flash
const connectMongoStore = require("connect-mongo");
const flash = require("connect-flash"); // to show toast messages
const { customFlash } = require("./configs/customFlashMiddleware.js"); // toast messages configuration
const port = env.server_port;

// set up body parser and path of static files
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, env.asset_path)));

// set up express-ejs-layouts
app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

// set up ejs
app.set("view engine", "ejs");
app.set("views", env.views_path);

// session to store logged user
app.use(
  session({
    name: "ER System",
    secret: env.session_secret_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // logged in for 60 minutes ~ 1 hr
    },
    store: connectMongoStore.create({ mongoUrl: env.mongodb_URI }),
  })
);

// Initialize passport and provide session to authenticate and save signed user data
app.use(passport.initialize());
app.use(passport.session());

// Set signed user info from session cookie to req.locals to be accessible by views
app.use(passport.setAuthenticatedUser);

// configure flash messages (already configured cookie-parser and express-session above)
app.use(flash());
// setup custom flash to store req.flash() toast msg by server to res.locals.flash which can be accessed by views(ejs)
app.use(customFlash);

// set up routes
app.use("/", require("./routes"));

// connecting db and starting server
db()
  .then(() => {
    app.listen(port, (err) => {
      if (err) {
        console.log("Error in starting server");
      }
      console.log("Server connected at:", port);
    });
  })
  .catch((err) => console.log(err));
