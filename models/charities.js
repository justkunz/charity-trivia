// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

var bcrypt = require("bcrypt-nodejs");

var utils = require("../models/utils.js");

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

exports.updateCharity = function(params, next) {

  // first update all of the typical params
  query("UPDATE charities SET name=$1, email=$2, link=$3, ein_number=$4 WHERE charity_id=$5", [params.name, params.email, params.link, params.ein_number, params.charity_id], function(err, rows, result) {
  
    utils.printError(err, "Charities.updateCharity Error: ");
    next(err);
    
  });
  

}

exports.updateCharityPassword = function(password, next) {
  query("UPDATE charities SET password=$1", [utils.generateHash(password)], function(err, rows, result) {

    utils.printError(err, "Charities.updateCharity Error: ");

  });
}