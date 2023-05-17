module.exports.signupUI = (req, res) => {
  return res.render("SignUp", {
    title: "SignUp",
  });
};

module.exports.signinUI = (req, res) => {
  return res.render("SignIn", {
    title: "SignIn",
  });
};
