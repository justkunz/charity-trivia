// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

var charity_id = 2;

// insert one row into questions
query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Rhinos are most commonly poached for which feature?', 'Horn', 'Skin', 'Feathers', 'Urine', charity_id, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Which type of animal has the most extinct species?', 'Gastropods (Snails and Slugs)', 'Mammals', 'Reptiles', 'Amphibians', charity_id, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What portion of open ocean sharks are threatened with extinction?', '1/3', '1/2', '1/4', '1/5', charity_id, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What percentage of the total global land area is protected?', '75%', '25%', '50%', '100%', charity_id, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What percent of coral reefs are rated as threatened?', '3%', '1%', '2%', '5%', charity_id, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("SELECT * FROM questions", function(err, rows, result) {
      console.log(rows);
});