// username: charitytrivia
// password: cheeseburger

// Connect to the db
var query = require("pg-query");
query.connectionParameters = "postgres://127.0.0.1:5432/charity_trivia";

var utils = require("../models/utils.js");

// Insert a new question
// TODO: change the charity_id to the req.body, then replace the constant here
exports.addQuestion = function(params, next) {
  query("INSERT INTO questions(question, answer, fake_answer_1, fake_answer_2, fake_answer_3, charity_id, total_attempts, correct_attempts) values($1, $2, $3, $4, $5, $6, $7, $8)", [params.question, params.answer, params.fake_answer_1, params.fake_answer_2, params.fake_answer_3, params.charity_id, 0, 0], function(err, rows, result) {
  
        utils.printError(err);
        return next(err);
  });

}

// Find a question record by the question ID
exports.findByID = function(question_id, next) {
  query("SELECT * FROM questions WHERE question_id=$1", [ question_id ], function(err, rows, result) {
        
      if (rows.length == 0) {
        console.log("Question.findByID Error: No matching question for question_id ", question_id);
        return next(err, null);
      }
      utils.printError(err, "Question.findByID Error: ");
      return next(err, rows[0]);
  });
};

// Find all of the questions by the charity ID
// TODO: make it so this only gives the charity questions
exports.findByCharityID = function(charity_id, next) {
  query("SELECT * FROM questions where charity_id=$1", [charity_id], function(err, rows, result) {
      utils.printError(err, "Question.findByCharityID Error: ");
      return next(err, rows);
  });
}

// Get all of the questions in the db
exports.getAllQuestions = function(next) {
  query("SELECT * FROM questions", function(err, rows, result) {
    utils.printError(err);
    return next(err, rows);
  });
}

// Update a question record
exports.updateQuestion = function(params, next) {
  query("UPDATE questions SET question=$1, answer=$2, fake_answer_1=$3, fake_answer_2=$4, fake_answer_3=$5, total_attempts=0, correct_attempts=0 WHERE question_id=$6", [params.question, params.answer, params.fake_answer_1, params.fake_answer_2, params.fake_answer_3, params.question_id], function(err, rows, result) {
  
    utils.printError(err, "Question.updateQuestion Error: ");
    return next(err);
  });
};

// Delete a question record
exports.deleteQuestion = function(question_id, next) {
  query("DELETE FROM questions WHERE question_id=$1", [question_id], function(err, rows, result) {
    
    utils.printError(err, "Question.deleteQuestion Error:");
    return next(err);
  });
};

exports.updateQuestionAnalytics = function(question_id, correct) {
  if (correct === "true") {
    query("UPDATE questions SET correct_attempts=correct_attempts+1 WHERE question_id=$1", [question_id], function(err, rows, result) {
      
      utils.printError(err);
    });
  }
  
  query("UPDATE questions SET total_attempts=total_attempts+1 WHERE question_id=$1", [question_id], function(err, rows, result) {
    
    utils.printError(err);
  });
  
};