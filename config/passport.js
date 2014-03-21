// load the required strategy
var LocalStrategy = require("passport-local").Strategy;

var User = require("../models/user.js");

module.exports = function(passport) {
  
  // =====================================================================
  // passport session setup ==============================================
  // =====================================================================
  
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.user_id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findByID(id, function(err, user) {
          done(err, user);
      });
  });

  // Use the LocalStrategy within Passport.
  //  Strategies in passport require a `verify` function, which accept
  //  credentials (in this case, an email and password), and invoke a
  //  callback with a user object.
  
  // handle the sign up
  passport.use("signup", new LocalStrategy(
    { usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
      
      // validate the email
      if (!validateEmail(email)) {
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
          User.newUser(req.body.name, email, password, function(err, user) {
            if (err)
              throw err;
            
            User.findByEmail(email, function(err, newUser) {
              if (err)
                throw err;
              
              console.log(newUser);
              return done(null, newUser);
            });
          });
        }
      })
      
      })
    }
  ));
  
  // handle the login
  passport.use("login", new LocalStrategy(
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
          
          if (user.password != password) {
            return done(null, false, req.flash("loginMessage", "Invalid password" ));
          }
          
          return done(null, user);
        });
      });
    }
  ));
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
