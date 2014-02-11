// Connect to the db
var pg = require("pg");
var conString = "postgres://localhost:5432/charity_trivia";
var client = new pg.Client(conString);
client.connect();


// insert one row into questions
client.query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", ['Rhinos are most commonly poached for which feature?', 'horn', 'skin', 'feathers', 'urine', 1, 0, 0]);

// Print the contents of the db
var query = client.query("SELECT * FROM questions");
//fired after last row is emitted

query.on('row', function(row) {
         console.log(row);
         });

query.on('end', function() {
         client.end();
         });