var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/public'));

app.get("/about", function(req, res) {
  res.render("about", {"title": "Charity Trivia"});
});

app.get("/", function(req, res) {
  res.render("index", {"title": "Charity Trivia"});
});

app.listen(1337);



console.log('Server running at http://127.0.0.1:1337/');
