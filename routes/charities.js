var charities = require("../models/charities.js");
var utils = require("../models/utils.js");

module.exports = function(app, passport) {

  app.get("/charity_login", function(req, res) {
    res.render("charity_login", {session: req.session,  message: req.flash("loginMessage"), user: req.user});
  });
  
  app.post("/charity_login", passport.authenticate("charity-login", {
    successRedirect: "/questions",
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
  
  app.get("/charity_profile", utils.charityIsLoggedIn, function(req, res) {
    res.render("charity_profile", {session: req.session, user: req.user});
  });
  
  app.get("/edit_charity_profile", utils.charityIsLoggedIn, function(req, res) {
    res.render("edit_charity_profile", {session: req.session, user: req.user, message: req.flash("charityProfileMessage")});
  });
  
  app.post("/edit_charity_profile", utils.charityIsLoggedIn, function(req, res) {
    
    console.log("Updating Charity Profile: ", req.body);
    
    // validate the email
    if (!utils.validateEmail(req.body.email)) {
      req.flash("charityProfileMessage", "The email you provided is not valid. Please try again.");
      res.redirect("/edit_charity_profile");
    }
    
    // validate the password and update the password
    if (req.body.password !== "") {
    
      if (req.body.password !== req.body.second_password) {
        req.flash("charityProfileMessage", "The passwords you provided do not match. Please try again.");
        res.redirect("/edit_charity_profile");
        
      } else {
        charities.updateCharityPassword(req.body.password, req.body.charity_id, function(err) {
            if (err !== null) {
              req.flash("charityProfileMessage", "There was an error updating your password. Please try again.");
              res.redirect("/edit_charity_profile");
            }
        });
      }
    }
    
    // update the charity profile
    charities.updateCharity(req.body, function(err) {
      
      if (err !== null) {
        req.flash("charityProfileMessage", "There was an error updating your profile. Please try again.");
        res.redirect("/edit_charity_profile");
      }
      res.redirect("/charity_profile");
    });
  });
  
}

