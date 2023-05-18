// Development Mode
const development = {
  name: "development",
  domain: "localhost",
  mongodb_URI: "mongodb://127.0.0.1:27017/ers_dev",
  db_name: "ers_dev",
  server_port: 3000,
  asset_path: "assets",
  views_path: "./views",
  session_secret_key: "44ED63516724B",
  admin_email: "admin23@gmail.com",
  admin_pwd: "admin123",
};

// Production Mode
const production = {
  name: "production",
  domain: "localhost",
  mongodb_URI: `mongodb+srv://${process.env.ISSUE_TRACKER_DB_USERNAME}:${process.env.ISSUE_TRACKER_DB_PASSWORD}@cluster0.bljbc4x.mongodb.net/${process.env.ISSUE_TRACKER_DB_NAME}?retryWrites=true&w=majority`,
  db_name: process.env.ISSUE_TRACKER_DB_NAME,
  server_port: process.env.PORT,
  asset_path: process.env.ASSET_PATH,
  views_path: "./views",
};

module.exports =
  eval(process.env.NODE_ENV) == undefined
    ? development
    : eval(process.env.NODE_ENV);
