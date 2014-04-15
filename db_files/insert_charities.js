// connect to the postgres db
var query = require("pg-query");
query.connectionParameters = "postgres://charitytrivia:cheeseburger@aa1s4508xmf19hs.cqcp9ut8xkl3.us-east-1.rds.amazonaws.com:5432/charity_trivia";

var utils = require("../models/utils.js");

// create the charity table - if does not exist
query("CREATE TABLE IF NOT EXISTS charities(charity_id bigserial primary key, logo varchar(1024), link varchar(256) NOT NULL, ein_number bigint NOT NULL, name varchar(64) NOT NULL, email varchar(256) NOT NULL, password varchar(256) NOT NULL)", function(err, rows, result) {

  utils.printError(err);



  // insert example charities

  // Animal Welfare Institute - 1
  query("INSERT INTO charities(name, email, logo, link, ein_number, password) values($1, $2, $3, $4, $5, $6)", ['Animal Welfare Institute', 'charity1@fake.com', 'img/animal-welfare-institute-logo.png', 'http://www.awionline.org/', '1234', utils.generateHash('1234')], function(err, rows, result) {

    utils.printError(err);
  });

  // Friends of Animals - 2
  query("INSERT INTO charities(name, email, logo, link, ein_number, password) values($1, $2, $3, $4, $5, $6)", ['Friends of Animals', 'charity2@fake.com', 'img/friends-of-animals-logo.jpg', 'http://friendsofanimals.org/', '1234', utils.generateHash('1234')], function(err, rows, result) {

    utils.printError(err);
  });

  // Earthworks - 3
  query("INSERT INTO charities(name, email, logo, link, ein_number, password) values($1, $2, $3, $4, $5, $6)", ['Earthworks', 'charity3@fake.com', 'img/earthworks-logo.jpg', 'http://www.earthworksaction.org/', '1234', utils.generateHash('1234')], function(err, rows, result) {

    utils.printError(err);
  });

  // Wildlife Conservation Society - 4
  query("INSERT INTO charities(name, email, logo, link, ein_number, password) values($1, $2, $3, $4, $5, $6)", ['Wildlife Conservation Society', 'charity4@fake.com', 'img/wildlife-conservation-society.png', 'http://www.wcs.org/', '1234', utils.generateHash('1234')], function(err, rows, result) {

    utils.printError(err);
  });

  query("SELECT * FROM charities", function(err, rows, result) {

    utils.printError(err);
    console.log(rows);
  });
});