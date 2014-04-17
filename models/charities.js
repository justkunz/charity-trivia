// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://charitytrivia:cheeseburger@aa1s4508xmf19hs.cqcp9ut8xkl3.us-east-1.rds.amazonaws.com:5432/ebdb";

var bcrypt = require("bcrypt-nodejs");
var fs = require("fs");
var utils = require("../models/utils.js");

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

exports.newCharity = function(params, password, logo, next) {

  // move the logo to the file system
  exports.uploadLogo(logo, function(err, logo_path) {

    // insert all of the charity info into the db
    query("INSERT INTO charities(logo, link, ein_number, name, email, password) values($1, $2, $3, $4, $5, $6)", [logo_path, params.link, params.ein_number, params.name, params.charity_email, password], function(err, rows, result) {

        if (err !== null) {
          console.log("Error adding new charity: ", err);
        }
        else {
          console.log("New user in the db!");
        }

        return next(err);

     });
  });
}

// Upload the logo to the server file system and return the path
exports.uploadLogo = function(logo, next) {

  if (logo === undefined || logo === null || logo.size === 0) {
    return next(null, null);
  }

  // get the temporary location of the file
  var tmp_path = logo.path;
  // set where the file should actually exists - in this case it is in the "images" directory
  var target_path = "img/" + logo.name;

  // move the file from the temporary location to the intended location
  fs.rename(tmp_path, ("./public/" + target_path), function(err) {

      if (err) {
        utils.printError(err, "Charities.uploadLogo Rename: ");
        return next(err, null);
      }

      // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
      fs.unlink(tmp_path, function(err) {

          if (err) {
            utils.printError(err, "Charities.uploadLogo Unlink: ");
          }

          console.log("File uploaded to: " + target_path + " - " + logo.size + " bytes");
          return next(null, target_path);
      });
  });
};

exports.removeLogo = function(old_logo_path, next) {
  console.log("Removing: ", old_logo_path);
  if (old_logo_path === undefined || old_logo_path === null || old_logo_path === "") {
    return next(null);
  }
  
  // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
  fs.unlink(("./public/" + old_logo_path), function(err) {

      if (err) {
        utils.printError(err, "Charities.removeLogo Unlink: ");
      }

      console.log("File deleted: " + old_logo_path);
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
      console.log("Charity Found: ", rows[0].name);
      return next(err, rows[0]);
  });
}

exports.findByIDAndEmail = function(charity_id, charity_email, next) {
  query("SELECT * FROM charities WHERE charity_id=$1 and email=$2", [charity_id, charity_email], function(err, rows, result) {

      if (err !== null || rows.length == 0) {
        return next(err, null);
      }
      return next(err, rows[0]);
  });
}

exports.updateCharity = function(params, logo_path, next) {

  // first update all of the typical params
  if (logo_path !== undefined && logo_path !== null) {
    query("UPDATE charities SET name=$1, email=$2, link=$3, ein_number=$4, logo=$5 WHERE charity_id=$6", [params.name, params.charity_email, params.link, params.ein_number, logo_path, params.charity_id], function(err, rows, result) {

      utils.printError(err, "Charities.updateCharity Error: ");
      return next(err);

    });
  }
  else {
    query("UPDATE charities SET name=$1, email=$2, link=$3, ein_number=$4 WHERE charity_id=$5", [params.name, params.charity_email, params.link, params.ein_number, params.charity_id], function(err, rows, result) {

      utils.printError(err, "Charities.updateCharity Error: ");
      return next(err);

    });
  }


}

exports.updateCharityPassword = function(password, next) {
  query("UPDATE charities SET password=$1", [utils.generateHash(password)], function(err, rows, result) {

    utils.printError(err, "Charities.updateCharity Error: ");

  });
}
