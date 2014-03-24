var user = require("../models/user.js");

module.exports = function(app, passport) {

  app.get("/login", function(req, res) {
    res.render("login", {title: "Charity Trivia", session: req.session,  message: req.flash("loginMessage")});
  });

  app.post("/login", passport.authenticate("user-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  }));

  app.get("/signup", function(req, res) {
    res.render("signup", {title: "Charity Trivia", session: req.session, message: req.flash("signupMessage")});
  });
  
  app.post("/signup", passport.authenticate("user-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  }));

  app.get("/user_profile", isLoggedIn, function(req, res) {
    res.render("user_profile", {title: "Charity Trivia", session: req.session, user: req.user});
  });

  app.get("/edit_user_profile", isLoggedIn, function(req, res) {
    res.render("edit_user_profile", {session: req.session, user: req.user, field: req.param("field"), message: ""});
  });
  
  app.post("/edit_user_profile", isLoggedIn, function(req, res) {
    console.log(req);
    if (req.body.name !== undefined) {
        user.updateName(user_id, req.body.name);
    } else if (req.body.email !== undefined) {
        user.updateEmail(user_id, req.body.email);
    } else if (req.body.password !== undefined) {
        if (req.body.password !== req.body.second_password) {
          return res.render("edit_user_profile", {session: req.session, user: req.user, field: "password", message: "Your passwords do not match. Please try again."});
        }
        user.updatePassword(req.user.user_id, user.generateHash(req.body.password));
    }
    res.render("user_profile", {title: "Charity Trivia", session: req.session, user: req.user, field: req.param("field")});
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

};

function isLoggedIn(req, res, next) {
  
  if (req.isAuthenticated()) {
    return next(req, res);
  }
  
  res.redirect("/");
}