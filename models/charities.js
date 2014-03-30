// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

var bcrypt = require("bcrypt-nodejs");

exports.getAllCharities = function(next) {
  query("SELECT * FROM charities", function(err, rows, result) {
    if (err !== null || rows.length == 0) {
      console.log("There are no charities signed up.");
      return next(err, null);
    }
    console.log("List of charities being returned.");
    return next(err, rows);
    });
}

exports.newCharity = function(params, password, next) {
  query("INSERT INTO charities(logo, link, ein_number, name, email, password) values($1, $2, $3, $4, $5, $6)", [params.logo, params.link, params.ein_number, params.name, params.email, password], function(err, rows, result) {
      if (err !== null) {
        console.log("Error adding new charity: ", err);
      }
      else {
        console.log("New user in the db!");
      }
      return next(err);
   });
}

// Find a charity record by charity_id
exports.findByID = function(charity_id, next) {
  query("SELECT * FROM charities WHERE charity_id=$1", [charity_id], function(err, rows, result) {

      if (err !== null || rows.length == 0) {
        return next(err, null);
      }
      return next(err, rows[0]);
  });
}

exports.findByEmail = function(email, next) {
  query("SELECT * FROM charities WHERE email=$1", [email], function(err, rows, result) {

      if (err !== null || rows.length == 0) {
        return next(err, null);
      }
      return next(err, rows[0]);
  });
}

exports.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
}

exports.validatePassword = function(charity_id, password) {
  query("SELECT password FROM charities WHERE charity_id=$1", [charity_id], function(err, rows, result) {

    if (err !== null) {
      throw err;
    }

    return bcrypt.compareSync(password, rows[0].password);
  });
};
