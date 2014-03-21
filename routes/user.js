
module.exports = function(app, passport) {

  app.get("/login", function(req, res) {
    res.render("login", {title: "Charity Trivia", session: req.session,  message: req.flash("loginMessage")});
  });

  app.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  }));

  app.get("/signup", function(req, res) {
    res.render("signup", {title: "Charity Trivia", session: req.session, message: req.flash("signupMessage")});
  });
  
  app.post("/signup", passport.authenticate("signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  }));

  app.get("/user_profile/:user_id", isLoggedIn, function(req, res) {
    res.render("user_profile", {title: "Charity Trivia", session: req.session});
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

};

function isLoggedIn(req, res, next) {
  
  if (req.isAuthenticated()) {
    return next();
  }
  
  res.redirect("/");
}