// Load the questions model
var question = require("../models/question.js");
var user = require("../models/user.js");

exports.showQuestions = function(req, res) {
  // get all of the questions from this charity
  question.findByCharityID(function(err, rows) {
    res.render("questions", { questions: rows, form_name : "Add Question", form_action : "/questions", session: req.session, user: req.user });
  });
};

exports.editQuestion = function(req, res) {
  // find the question, then render the edit questions page
  question.findByID(req.param("question_id"), function(err, result) {
      res.render("edit_question", { question : result, form_name : "Edit Question", form_action : "/edit_question", session:req.session, user: req.user });
  });  
};

exports.addQuestion = function(req, res) {
  // insert one row into questions
  question.addQuestion(req.body, function(err) {
        res.redirect("/questions");
  });
};

// Updates (and possibly deletes) the provided question
exports.updateQuestion = function(req, res) {
  console.log("Updating question: ", req.body);
  
  // delete this question
  if (req.body.delete_question != undefined) {
    return question.deleteQuestion(req.body.question_id, function(err) {
      res.redirect("/questions");
    });
  }
  
  // update the question in the database
  question.updateQuestion(req.body, function(err) {
        res.redirect("/questions");
  });
};

// Renders the home page with a random question from the database
exports.answerQuestion = function(req, res) {

  console.log("Session: ", req.session);
  console.log("User: ", req.user);

  if (req.session === undefined || req.session.lastQuestionID === undefined) {
    req.session.lastQuestionID = -1;
  }
  
  if (req.session.user_progress === undefined) {
    req.session.user_progress = {};
    req.session.user_progress.total_attempts = 0;
    req.session.user_progress.correct_attempts = 0;
  }
  
  question.getAllQuestions(function(err, rows) {
      // render a random question that is not the same as the last question asked
      var num_rows = rows.length;
      var index = Math.floor(Math.random() * (num_rows));
      while (Number(req.session.lastQuestionID) == rows[index].question_id) {
        index = Math.floor(Math.random() * (num_rows));
      }
      
      // store the id of the question that was asked last
      req.session.lastQuestionID = rows[index].question_id;
      req.session.save();
      
      res.render("index", { question: rows[index], session: req.session, user: req.user });
  });
};

// Called in game.js after a user clicks on an answer
exports.updateQuestionAnalytics = function(req, res) {
  console.log("Updating analytics for: ", req.params);
  
  if (req.session.user_progress === undefined) {
    req.session.user_progress.total_attempts = 0;
    req.session.user_progress.correct_attempts = 0;
  }
  
  // update the correct attemps
  if (req.params.correct === "true") {
    req.session.user_progress.correct_attempts = Number(req.session.user_progress.correct_attempts) + 1;
  }
  
  // update the total attempts
  req.session.user_progress.total_attempts = Number(req.session.user_progress.total_attempts) + 1;
  req.session.save();
  
  // update the questions table 
  question.updateQuestionAnalytics(req.params.question_id, req.params.correct);
  
  // update the users table
  if (req.user !== undefined) {
    user.updateUserAnalytics(req.user.user_id, req.params.correct);
  }

};