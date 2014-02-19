// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

exports.showQuestions = function(req, res) {
  query("SELECT * FROM questions", function(err, rows, result) {
        res.render("questions", {title: "Charity Trivia", questions: rows, form_name : "Add Question"});
  });
};

exports.editQuestion = function(req, res) {
  query("SELECT * FROM questions WHERE question_id=", [req.body.question_id], function(err, rows, result) {
      res.render("edit_question", {title: "Charity Trivia", question: rows, form_name : "Edit Question"});
  });  
};

exports.addQuestion = function(req, res) {
  console.log(req.body);
  // insert one row into questions
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", [req.body.question, req.body.answer, req.body.fake_answer_1, req.body.fake_answer_2, req.body.fake_answer_3, 1, 0, 0], function(err, rows, result) {
        console.log(err);
  });
  exports.showQuestions(req, res);
};