// Load the questions model
var question = require("../models/question.js");
var user = require("../models/user.js");
var charities = require("../models/charities.js");
var utils = require("../models/utils.js");

module.exports = function(app, passport) {

  // Renders the home page with a random question from the database
  // Load the home page
  app.get("/", function(req, res) {

    if (req.session === undefined || req.session.previouslyCorrectQuestions === undefined || req.session.lastQuestionID === undefined) {
      req.session.previouslyCorrectQuestions = [];
      req.session.lastQuestionID = -1;
    }
    
    if (req.session.user_progress === undefined) {
      req.session.user_progress = {};
      req.session.user_progress.total_attempts = 0;
      req.session.user_progress.correct_attempts = 0;
    }
    
    question.getAllQuestions(function(err, rows) {
        // render a random question that is not the same as the last question asked
        if (rows === undefined || rows === null) {
            res.render("index", { question: null, session: req.session, user: req.user, charity: null, message: req.flash("gameMessage") });
        }
        var num_rows = rows.length;
        var index = Math.floor(Math.random() * (num_rows));
        
        while (req.session.previouslyCorrectQuestions.indexOf(rows[index].question_id) !== -1 || req.session.lastQuestionID == rows[index].question_id) {
          index = Math.floor(Math.random() * (num_rows));
        }
        
        // store the id of the question that was asked last
        req.session.lastQuestionID = rows[index].question_id;
        req.session.save();
        
        charities.findByID(rows[index].charity_id, function(err, charity_info) {
        
          if (err) {
            res.redirect("/");
          }
          
          // mix up the answers & distractors
          question_info = reorder_answers(rows[index]);
          
          res.render("index", { question: question_info, session: req.session, user: req.user, charity: charity_info, message: req.flash("gameMessage") });
        });
    });
  });
  
  app.get("/questions", utils.charityIsLoggedIn, function(req, res) {

    // get all of the questions from this charity and display them in a table
    question.findByCharityID(req.user.charity_id, function(err, rows) {
      return res.render("questions", {session: req.session, user: req.user, charity_questions: rows, form_action: "/questions", message: req.flash("questionMessage")});
    });
  });

  app.get("/edit_question", function(req, res) {
    // find the question to edit, then render the edit questions page
    question.findByID(req.param("question_id"), function(err, result) {
      if (err) {
        req.flash("questionMessage", "There was an error accessing that question. Please try again later.");
        return res.redirect("/questions");
      }
      
      res.render("edit_question", { question : result, form_action : "/edit_question", session:req.session, user: req.user });
    });  
  });

  app.post("/questions", function(req, res) {
    // insert one row into questions
    question.addQuestion(req.body, function(err) {
      if (err) {
        req.flash("questionMessage", "There was an error adding your question. Please try again later.");
      }
      res.redirect("/questions");
    });
  });

  // Updates (and possibly deletes) the provided question
  app.post("/edit_question", function(req, res) {
    
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
  });
  
  // Called in game.js after a user clicks on an answer
  app.get("/:question_id/:user_answer", function(req, res) {

    question.findByID(req.params.question_id, function(err, question_info) {
    
      var correct = "";
      
      if (req.params.user_answer == hashStr(question_info.answer)) {
        
        correct = "true";
        req.flash("gameMessage", "correct");
        if (req.session.previouslyCorrectQuestions.push(question_info.question_id) > 6) {
          req.session.previouslyCorrectQuestions.shift();
        }
      }
      else {
        
        correct = "false";
        req.flash("gameMessage", "incorrect");
      }
      
      // if this is a new user - add to the sessions data
      if (req.session.user_progress === undefined) {
        req.session.user_progress = {};
        req.session.user_progress.total_attempts = 0;
        req.session.user_progress.correct_attempts = 0;
      }
      
      // update the correct attemps
      if (correct === "true") {
        req.session.user_progress.correct_attempts = Number(req.session.user_progress.correct_attempts) + 1;
      }
      
      // update the total attempts
      req.session.user_progress.total_attempts = Number(req.session.user_progress.total_attempts) + 1;
      req.session.save(); // save the session data
      
      // update the questions table 
      question.updateQuestionAnalytics(req.params.question_id, correct);
      
      // update the users table
      if (req.user !== undefined) {
        user.updateUserAnalytics(req.user.user_id, correct);
      }
    
      res.redirect("/");
      
    });
  });
}

function reorder_answers(question_info) {

  var options = [ question_info.answer, question_info.fake_answer_1, question_info.fake_answer_2, question_info.fake_answer_3 ];
  
  options.sort(natSort);
  
  question_info.answer_1 = options[0];
  question_info.answer_2 = options[1];
  question_info.answer_3 = options[2];
  question_info.answer_4 = options[3];

  return question_info;
}

// case insensitive, digits to number interpolation ("2" comes before "100")
function natSort(as, bs){
    var a, b, a1, b1, i= 0, L, rx=  /(\d+)|(\D+)/g, rd=  /\d/;
    if(isFinite(as) && isFinite(bs)) return as - bs;
    a= String(as).toLowerCase();
    b= String(bs).toLowerCase();
    if(a=== b) return 0;
    if(!(rd.test(a) && rd.test(b))) return a> b? 1: -1;
    a= a.match(rx);
    b= b.match(rx);
    L= a.length> b.length? b.length: a.length;
    while(i < L){
        a1= a[i];
        b1= b[i++];
        if(a1!== b1){
            if(isFinite(a1) && isFinite(b1)){
                if(a1.charAt(0)=== "0") a1= "." + a1;
                if(b1.charAt(0)=== "0") b1= "." + b1;
                return a1 - b1;
            }
            else return a1> b1? 1: -1;
        }
    }
    return a.length - b.length;
}

// hash a string to an int - used to hash the user answer for URL encoding
function hashStr(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}