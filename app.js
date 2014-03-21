var express = require("express");
var app = express();

var passport = require("passport");
var flash = require("connect-flash");

require("./config/passport")(passport);

// Include the routes for the app
var questions = require("./routes/questions");

app.configure(function(){

  app.use(express.cookieParser());  // read cookies
  app.use(express.bodyParser());    // get info from HTML forms
        
  // configure EJS for templating
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/views");
  app.use(express.static(__dirname + '/public'));
  
  app.use(express.session({secret: '1234567890QWERTY'})); // TODO: change this string
  app.use(passport.initialize());
  app.use(passport.session());      // persistent login sessions
  app.use(flash());                 // use flash messages stored in the sesion

});

//require("./routes/questions")(app);
require("./routes/user")(app, passport);



// Load the home page
app.get("/", questions.answerQuestion);

// Load the about page
app.get("/about", function(req, res) {
        res.render("about", {"title": "Charity Trivia", session: req.session});
});

// Questions Portal
app.get("/questions", questions.showQuestions);
app.post("/questions", questions.addQuestion);

// Edit Questions Page
app.get("/edit_question", questions.editQuestion);
app.post("/edit_question", questions.updateQuestion);

// Asynchronously update the db for this question
app.get("/update_analytics/:question_id/:correct", questions.updateQuestionAnalytics);

// launch the app
app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
