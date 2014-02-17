var express = require("express");
var app = express();

// Connect to the db
var questions_table = require("./db_files/questions_table");

app.configure(function(){
        app.use(express.bodyParser());
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));

// Load the home page
app.get("/", function(req, res) {
        res.render("index", {"title": "Charity Trivia"});
});

// Load the about page
app.get("/about", function(req, res) {
        res.render("about", {"title": "Charity Trivia"});
});

// Load the Add Questions page
app.get("/add_questions", function(req, res) {
        res.render("add_questions", {"title": "Charity Trivia"});
});

// Handle the Add Questions form data
app.post("/add_questions", function(req, res) {
         // print the POST data to the console
         console.log(req.body);
         // insert the form data into the questions table
         questions_table.insert(req.body);
});

app.listen(1337);



console.log('Server running at http://127.0.0.1:1337/');
