// load the required strategy
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user.js");
var Charity = require("../models/charities.js");
var utils = require("../models/utils.js");

module.exports = function(passport) {
  
  // =====================================================================
  // passport session setup ==============================================
  // =====================================================================
  
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    if (user.user_id !== undefined) {
      done(null, JSON.stringify({id: user.user_id, email: user.email}));
    } else {
      done(null, JSON.stringify({id: user.charity_id, email: user.email}));
    }
  });

  // used to deserialize the user
  passport.deserializeUser(function(user_string, done) {
      var user_data = JSON.parse(user_string);
      User.findByIDAndEmail(user_data.id, user_data.email, function(err, user) {
        if (user !== null) {
          done(err, user);
        } else {
          Charity.findByIDAndEmail(user_data.id, user_data.email, function(err, charity) {
            done(err, charity);
          });
        }
      });
  });
  
  // =====================================================================
  // passport user login setup ===========================================
  // =====================================================================

  // Use the LocalStrategy within Passport.
  //  Strategies in passport require a `verify` function, which accept
  //  credentials (in this case, an email and password), and invoke a
  //  callback with a user object.
  
  // handle the user sign up
  passport.use("user-signup", new LocalStrategy(
    { usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
      
        // validate the email
        if (!utils.validateEmail(email)) {
          return done(null, false, req.flash("signupMessage", "The email you provided is not valid. Please try again."));
        }
        
        // validate the password
        if (req.body.password !== req.body.second_password) {
          return done(null, false, req.flash("signupMessage", "The passwords you provided do not match. Please try again."));
        }
        
        User.findByEmail(email, function(err, user) {
          
          if (err)
            return done(err);
          
          if (user) {
            return done(null, false, req.flash("signupMessage", "That email is already registered with an account."));
          } else {
            
            // create the new user
            User.newUser(req.body.name, email, utils.generateHash(password), function(err, user) {
              if (err) {
                console.log(err);
                throw err;
              }
              
              User.findByEmail(email, function(err, newUser) {
                if (err)
                  throw err;
                
                console.log("New User: ", newUser);
                return done(null, newUser);
              });
            });
          }
        });
      });
    }
  ));
  
  // handle the user login
  passport.use("user-login", new LocalStrategy(
    { usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
    
      // asynchronous verification
      process.nextTick(function() {
      
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findByEmail(email, function(err, user) {

          if (err) {
            return done(err);
          }
          
          if (!user) {
            return done(null, false, req.flash("loginMessage", "Incorrect Email."));
          }
          console.log("Verifying with password: ", password);
          utils.validatePassword(user.user_id, "users", password, function(res) {
            if (res !== true) {
              return done(null, false, req.flash("loginMessage", "Invalid password." ));
            }
          
            console.log("User has been successfully loged in!");
            return done(null, user);
          });
        });
      });
    }
  ));
  
  // =====================================================================
  // passport charity login setup ========================================
  // =====================================================================
  
  // handle the charity sign up
  passport.use("charity-signup", new LocalStrategy(
    { usernameField: "charity_email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
      
        // validate the email
        if (!utils.validateEmail(email)) {
          return done(null, false, req.flash("signupMessage", "The email you provided is not valid. Please try again."));
        }
        
        // validate the password
        if (req.body.password !== req.body.second_password) {
          return done(null, false, req.flash("signupMessage", "The passwords you provided do not match. Please try again."));
        }
        
        Charity.findByEmail(email, function(err, charity) {
          
          if (err)
            return done(err);
          
          if (charity) {
            return done(null, false, req.flash("signupMessage", "That email is already registered with an account."));
          } else {
            
            // create the new user
            Charity.newCharity(req.body, utils.generateHash(password), req.files.logo, function(err, user) {
              if (err) {
                console.log(err);
                throw err;
              }
              
              Charity.findByEmail(email, function(err, newCharity) {
                if (err)
                  throw err;
                
                console.log("New Charity: ", newCharity);
                return done(null, newCharity);
              });
            });
          }
        });
      });
    }
  ));
  
  // handle the charity login
  passport.use("charity-login", new LocalStrategy(
    { usernameField: "charity_email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      ''
      // asynchronous verification
      process.nextTick(function() {
      
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Charity.findByEmail(email, function(err, charity) {

          if (err) {
            return done(err);
          }
          
          if (!charity) {
            return done(null, false, req.flash("loginMessage", "Incorrect Email."));
          }
          
          utils.validatePassword(charity.charity_id, "charities", password, function(res) {
          
            if (res !== true) {
              return done(null, false, req.flash("loginMessage", "Invalid password." ));
            }
            
            console.log(req.user);
            console.log(charity);
          
            console.log("Charity was successfully logged in!");
            return done(null, charity);
          });
        });
      });
    }
  ));
}
