var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

var bcrypt = require("bcrypt-nodejs");

// print an error, if any exists
exports.printError = function(err, prompt) {

  if (err !== null) {
    
    if (prompt !== null) {
      console.log(prompt, err);
    } else {
      console.log(prompt);
    }
  }
}

exports.charityIsLoggedIn = function(req, res, next) {
  
  console.log("charityIsLoggedIn User: ", req.user);
  if (req.isAuthenticated() && req.user.charity_id) {
    return next();
  }
  
  res.redirect("/charity_login");
}

exports.userIsLoggedIn = function(req, res, next) {
  
  if (req.isAuthenticated()) {
    console.log("User isLoggedIn: ", req.user);
    return next();
  }
  
  res.redirect("/login");
}

exports.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
}

exports.validatePassword = function(id, table, password, next) {

  if (table === "charities") {
    query("SELECT password FROM charities WHERE charity_id=$1", [id], function(err, rows, result) {
      
      if (err !== null) {
        throw err;
      }else if (rows.length === 0) {
        throw ("Charity " + id + " not found!");
      }
      
      return next(bcrypt.compareSync(password, rows[0].password));
    });
  } else if (table === "users") {
    query("SELECT password FROM users WHERE user_id=$1", [id], function(err, rows, result) {
      
      if (err !== null) {
        throw err;
      } else if (rows.length === 0) {
        throw ("User " + id + " not found!");
      }

      return next(bcrypt.compareSync(password, rows[0].password));
    });
  } else {
    throw "That table does not exist!";
  }
};

exports.validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 