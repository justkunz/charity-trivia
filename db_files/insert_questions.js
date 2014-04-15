// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://charitytrivia:cheeseburger@aa1s4508xmf19hs.cqcp9ut8xkl3.us-east-1.rds.amazonaws.com:5432/ebdb";

var utils = require("../models/utils.js");

var animal_welfare_id = 1;
var friends_of_animals_id = 2;
var earthworks_id = 3;
var wildlife_conservation_id = 4;

// // create the questions table - if it does not exist 
query("CREATE TABLE IF NOT EXISTS questions(question_id bigserial primary key, question text NOT NULL, answer varchar(64) NOT NULL, fake_answer_1 varchar(64) NOT NULL, fake_answer_2 varchar(64) NOT NULL, fake_answer_3 varchar(64) NOT NULL, charity_id bigint NOT NULL, total_attempts bigint NOT NULL, correct_attempts bigint NOT NULL)", function(err, rows, result) {
      
  utils.printError(err, "Question Table Create Error: ");

  // insert one row into questions
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Rhinos are most commonly poached for which feature?', 'Horn', 'Skin', 'Feathers', 'Urine', animal_welfare_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Which type of animal has the most extinct species?', 'Snails and Slugs', 'Mammals', 'Reptiles', 'Amphibians', animal_welfare_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What portion of open ocean sharks are threatened with extinction?', '1/3', '1/2', '1/4', '1/5', friends_of_animals_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What percentage of the total global land area is protected?', '75%', '25%', '50%', '100%', earthworks_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What percent of coral reefs are rated as threatened?', '3%', '1%', '2%', '5%', earthworks_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['How many greyhounds are killed every year after they are considered "too slow to race"?', '20,000', '5,000', '10,000', '15,000', friends_of_animals_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['How much higher is the methane concentration in drinking water wells near fracking sites?', '17x', '7x', '12x', '22x', earthworks_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['How many animals are trapped yearly for their pelts?', '9 million', '3 million', '6 million', '12 million', friends_of_animals_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['How many minks does it take to make knee-length fur coat?', '60', '15', '45', '90', friends_of_animals_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Nitrogen-rich fertilizers create "dead zones" in marine environments, where the oxygen is depleted and can no longer support marine life. How many "dead zones" have been identified around the world?', '400', '200', '300', '500', animal_welfare_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['How many elephants are killed each year in Africa for their tusks?', '35,000', '15,000', '25,000', '45,000', wildlife_conservation_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("SELECT * FROM questions", function(err, rows, result) {
        console.log("Questions: ", rows);
  });
});