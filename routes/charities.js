var charities = require("../models/charities.js");

module.exports = function(app, passport) {

  app.get("/charity_login", function(req, res) {
    res.render("charity_login", {session: req.session,  message: req.flash("loginMessage")});
  });
  
  app.post("/charity_login", passport.authenticate("charity-login", {
    successRedirect: "/",
    failureRedirect: "/charity_login",
    failureFlash: true
  }));
  
  app.get("/charity_signup", function(req, res) {
    res.render("charity_signup", {session: req.session,  message: req.flash("loginMessage")});
  });
  
  app.post("/charity_signup", passport.authenticate("charity-signup", {
    successRedirect: "/questions",
    failureRedirect: "/charity_signup",
    failureFlash: true
  }));
  
}