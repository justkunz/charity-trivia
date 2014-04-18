// psql -h aa1s4508xmf19hs.cqcp9ut8xkl3.us-east-1.rds.amazonaws.com -d ebdb -U charitytrivia -p 5432 -W

var utils = require("../models/utils.js");

// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://charitytrivia:cheeseburger@aa1s4508xmf19hs.cqcp9ut8xkl3.us-east-1.rds.amazonaws.com:5432/ebdb";

var animal_welfare_id = 1;
var friends_of_animals_id = 2;
var earthworks_id = 3;
var wildlife_conservation_id = 4;

// // create the questions table - if it does not exist 
query("CREATE TABLE IF NOT EXISTS questions(question_id bigserial primary key, question text NOT NULL, answer varchar(64) NOT NULL, fake_answer_1 varchar(64) NOT NULL, fake_answer_2 varchar(64) NOT NULL, fake_answer_3 varchar(64) NOT NULL, charity_id bigint NOT NULL, total_attempts bigint NOT NULL, correct_attempts bigint NOT NULL, answer_descriptor text, link varchar(256))", function(err, rows, result) {
      
  utils.printError(err, "Question Table Create Error: ");

  // insert one row into questions
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['Rhinos are most commonly poached for which feature?', 'Horn', 'Skin', 'Feathers', 'Urine', animal_welfare_id, 0, 0, "Rhino horns are used in traditional Chinese medicine which makes them a high comodity on the black market.", "http://www.stoprhinopoaching.com/default.aspx"], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor) values($1, $2, $3, $4, $5, $6, $7, $8, $9)", ['Which type of animal has the most extinct species?', 'Snails and Slugs', 'Mammals', 'Reptiles', 'Amphibians', animal_welfare_id, 0, 0, "There are 444 species of gastropods (snails and slugs) that have been extinct since the 1500s, and currently 18 species that only exist in captivity."], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['What portion of open ocean sharks are threatened with extinction?', '1/3', '1/2', '1/4', '1/5', friends_of_animals_id, 0, 0, "Sharks remain virtually unprotected in the high-seas and 1/3 of the open ocean sharks are threatened, primarily by over-fishing.", "http://www.iucn.org/?3362/Third-of-open-ocean-sharks-threatened-with-extinction"], function(err, rows, result) {
        utils.printError(err);
  });
/*
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['What percentage of the total global land area is protected?', '75%', '25%', '50%', '100%', earthworks_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });
*/
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['What percent of coral reefs face imminent risk of collapse through human pressures?', '24%', '10%', '14%', '20%', earthworks_id, 0, 0, "Coral reefs yield more than US$ 30 billion anually in global goods and services, but coastal development, over-fishing, and pollution have 24% of the world's reefs in imminent risk of collapse.", "http://www.globalissues.org/article/173/coral-reefs"], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['How many greyhounds in the racing industry are killed every year?', '20,000', '5,000', '10,000', '15,000', friends_of_animals_id, 0, 0, "Greyhound racing generates millions of dollars in gambling each year, but the dogs are treated like disposable running machines. Approximately 20,000 greyhounds are killed every year from heatstroke, racing injuries, or because they are considered \"too slow to race\".", "http://www.peta.org/issues/animals-in-entertainment/animals-used-entertainment-factsheets/greyhound-racing-death-fast-lane/"], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['How much higher is the methane concentration in drinking water wells near fracking sites?', '17x', '7x', '12x', '22x', earthworks_id, 0, 0, "The fracking process releases methane gas and toxic chemicals that contaminate groundwater. The methane concentration is 17x higher in wells near fracking sites, which can cause sensory, respiratory, and neurological damage.", "http://www.dangersoffracking.com/"], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['How many animals are trapped yearly for their pelts?', '9 million', '3 million', '6 million', '12 million', friends_of_animals_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });

  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['How many minks does it take to make knee-length fur coat?', '60', '15', '45', '90', friends_of_animals_id, 0, 0, "It takes 60 minks to make a knee-length fur coat. 85% of the fur industry's pelts come from animals on fur factory farms, where they live in crammed cages and are often skinned alive or killed inhumanely.", "http://www.peta.org/features/nine-shocking-fur-facts/"], function(err, rows, result) {
        utils.printError(err);
  });
/*
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Nitrogen-rich fertilizers create "dead zones" in marine environments, where the oxygen is depleted and can no longer support marine life. How many "dead zones" have been identified around the world?', '400', '200', '300', '500', animal_welfare_id, 0, 0], function(err, rows, result) {
        utils.printError(err);
  });
*/
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts, answer_descriptor, link) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", ['How many elephants are killed each year in Africa for their tusks?', '30,000', '10,000', '20,000', '40,000', wildlife_conservation_id, 0, 0, "30,000 elephants are killed per year for their ivory.", "http://www.wildaid.org/elephants"], function(err, rows, result) {
        utils.printError(err);
  });

  query("SELECT * FROM questions", function(err, rows, result) {
        console.log("Now the database has ", rows.length, " questions");
  });
});