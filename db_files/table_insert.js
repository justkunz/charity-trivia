// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";


// insert one row into questions
query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Rhinos are most commonly poached for which feature?', 'Horn', 'Skin', 'Feathers', 'Urine', 1, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Which type of animal has the most extinct species?', 'Gastropods (Snails and Slugs)', 'Mammals', 'Reptiles', 'Amphibians', 1, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What portion of open ocean sharks are threatened with extinction?', '1/3', '1/2', '1/4', '1/5', 1, 0, 0], function(err, rows, result) {
      console.log(err);
});

query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['What percent of coral reefs are rated as threatened?', '75%', '25%', '50%', '100%', 1, 0, 0], function(err, rows, result) {
      console.log(err);
});



query("SELECT * FROM questions", function(err, rows, result) {
      console.log(rows);
});