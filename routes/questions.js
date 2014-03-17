// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

exports.showQuestions = function(req, res) {
  query("SELECT * FROM questions", function(err, rows, result) {
        res.render("questions", {title: "Charity Trivia", questions: rows, form_name : "Add Question", form_action : "/questions"});
  });
};

exports.editQuestion = function(req, res) {
  console.log(req.param("question_id"));
  query("SELECT * FROM questions WHERE question_id=$1", [req.param("question_id")], function(err, rows, result) {
      console.log(rows);
      res.render("edit_question", {title: "Charity Trivia", question : rows, form_name : "Edit Question", form_action : "/edit_question"});
  });  
};

exports.addQuestion = function(req, res) {
  // insert one row into questions
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", [req.body.question, req.body.answer, req.body.fake_answer_1, req.body.fake_answer_2, req.body.fake_answer_3, 1, 0, 0], function(err, rows, result) {
        if (err !== null) {
          console.log(err);
        }
        res.redirect("/questions");
  });
};

// Updates (and possibly deletes) the provided question
exports.updateQuestion = function(req, res) {
  console.log("Updating question: ", req.body);
  
  // delete this question
  if (req.body.delete_question != undefined) {
    exports.deleteQuestion(req, res);
    return;
  }
  
  // update the question in the database
  query("UPDATE questions SET question=$1, answer=$2, fake_answer_1=$3, fake_answer_2=$4, fake_answer_3=$5, total_attempts=0, correct_attempts=0 WHERE question_id=$6", [req.body.question, req.body.answer, req.body.fake_answer_1, req.body.fake_answer_2, req.body.fake_answer_3, req.body.question_id], function(err, rows, result) {
        if (err !== null) {
          console.log(err);
        } else {
          console.log("Question updated");
        }
        res.redirect("/questions");
  });
};

// Deletes the question given from req.body.question_id and then renders /questions
exports.deleteQuestion = function(req, res) {
  console.log("Deleting Question: ", req.body.question_id);
  query("DELETE FROM questions WHERE question_id=$1", [req.body.question_id], function(err, rows, result) {
      if (err !== null) {
        console.log(err);
      } else {
        console.log("Question deleted");
      }
      res.redirect("/questions");
  });
}

// Renders the home page with a random question from the database
exports.answerQuestion = function(req, res) {
  query("SELECT * FROM questions", function(err, rows, result) {
      var num_rows = rows.length;
      var index = Math.floor(Math.random() * (num_rows));
      res.render("index", {title: "Charity Trivia", question: rows[index]});
  });
};

// Called in game.js after a user clicks on an answer
exports.updateQuestionAnalytics = function(req, res) {
  console.log("Updating analytics for: ", req.params);
  
  // update the correct attemps
  if (req.params.correct === "true") {
    query("UPDATE questions SET correct_attempts=correct_attempts+1 WHERE question_id=$1", [req.params.question_id], function(err, rows, result) {
        if (err !== null) {
          console.log(err);
        } else {
          console.log("Correct attempts updated");
        }
    });
  }
  
  // get the question info from the database
  query("UPDATE questions SET total_attempts=total_attempts+1 WHERE question_id=$1", [req.params.question_id], function(err, rows, result) {
      if (err !== null) {
        console.log(err);
      } else {
        console.log("Total attempts updated");
      }
  });

};