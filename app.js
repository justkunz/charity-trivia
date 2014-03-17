var express = require("express");
var app = express();

// Connect to the db
var questions = require("./routes/questions");

app.configure(function(){
        app.use(express.bodyParser());
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));

// Load the home page
app.get("/", questions.answerQuestion);

// Load the about page
app.get("/about", function(req, res) {
        res.render("about", {"title": "Charity Trivia"});
});

// Load the Add Questions page
app.get("/questions", questions.showQuestions);

// Handle the Add Questions form data
app.post("/questions", questions.addQuestion);

app.get("/edit_question", questions.editQuestion);
app.post("/edit_question", questions.updateQuestion);

app.get("/update_analytics/:question_id/:correct", questions.updateQuestionAnalytics);

app.listen(1337);



console.log('Server running at http://127.0.0.1:1337/');
