var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", function(req, res) {
        res.render("hello", {"greet": "Hello world!"});
        }).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
