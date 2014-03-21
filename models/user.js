// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

var bcrypt = require("bcrypt-nodejs");

// Insert a new user
exports.newUser = function(name, email, password, next) {
  
  query("INSERT INTO users(name, email, password) values($1, $2, $3)", [name, email, password], function(err, rows, result) {
        if (err !== null) {
          console.log(err);
        }
        else {
          console.log("New user in the db!");
        }
        return next(err);
  });
}

// Find a user record by user_id
exports.findByID = function(user_id, next) {
  
  query("SELECT * FROM users WHERE user_id=$1", [user_id], function (err, rows, result) {
  
      if (err !== null || rows.length == 0)
        return next(err, null);
      
      return next(err, rows[0]);
  });
}

// Find a user record by email
exports.findByEmail = function(email, next) {

  query("SELECT * FROM users WHERE email=$1", [email], function (err, rows, result) {
  
      if (err !== null || rows.length == 0)
        return next(err, null);
      
      return next(err, rows[0]);
  });
}

exports.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

exports.validatePassword = function(user_id, password) {
  query("SELECT password FROM users WHERE user_id=$1", [user_id], function(err, rows, result) {
    
    if (err !== null) {
      throw err;
    }
    console.log(bcrypt.compareSync(password, rows[0].password));
    return bcrypt.compareSync(password, rows[0].password);
  });
};