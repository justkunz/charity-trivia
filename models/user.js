// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://charitytrivia:cheeseburger@aa1s4508xmf19hs.cqcp9ut8xkl3.us-east-1.rds.amazonaws.com:5432/ebdb";

// Insert a new user
exports.newUser = function(name, email, password, next) {

  query("INSERT INTO users(name, email, password, total_attempts, correct_attempts) values($1, $2, $3, $4, $5)", [name, email, password, 0, 0], function(err, rows, result) {
        if (err !== null) {
          console.log("Error adding new user: ", err);
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

exports.findByIDAndEmail = function(id, email, next) {

  query("SELECT * FROM users WHERE user_id=$1 and email=$2", [id, email], function (err, rows, result) {
  
      if (err !== null || rows.length == 0)
        return next(err, null);
      
      return next(err, rows[0]);
  });
}

exports.updateUserAnalytics = function(user_id, correct) {
  
  if (correct === "true") {
    query("UPDATE users SET correct_attempts=correct_attempts+1 WHERE user_id=$1",[user_id], function(err, rows, result) {
      
        if (err !== null) {
          console.log(err);
        }
    });
  }
  
  query("UPDATE users SET total_attempts=total_attempts+1 WHERE user_id=$1",[user_id], function(err, rows, result) {
  
      if (err !== null)   { console.log(err); }
  });
}

exports.updateName = function(user_id, name, next) {
  query("UPDATE users SET name=$1 WHERE user_id=$2",[name, user_id], function(err, rows, result) {
  
      if (err !== null)   {
        console.log(err);
      }
      
      return next(err);
  });
}

exports.updateEmail = function(user_id, email, next) {

  query("UPDATE users SET email=$1 WHERE user_id=$2",[email, user_id], function(err, rows, result) {
  
      if (err !== null)   {
        console.log(err);
      }
    
      return next(err);
  });
}

exports.updatePassword = function(user_id, password, next) {
  query("UPDATE users SET password=$1 WHERE user_id=$2",[password, user_id], function(err, rows, result) {
  
      if (err !== null)   {
        console.log(err);
      }
  
      return next(err);
  });
}