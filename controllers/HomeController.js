// Render Home Page
module.exports.UI = (req, res) => {
  return res.render("Home", {
    title: "Home",
  });
};
