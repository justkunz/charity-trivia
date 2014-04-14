var express = require("express");
var app = express();

var passport = require("passport");
var flash = require("connect-flash");

require("./config/passport")(passport);


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

// This is where the homepage, questions page, edit questions page live
require("./routes/questions")(app);

// this is where the user login/signup live
require("./routes/user")(app, passport);

// this is where the charity login/signup live
require("./routes/charities")(app, passport);

// this is where hte sponsor page lives
require("./routes/about_partner_charities")(app);

// Load the about pages
app.get("/about_charity_trivia", function(req, res) {
        res.render("about_charity_trivia", {session: req.session, user: req.user});
});

app.get("/about_contact_us", function(req, res) {
        res.render("about_contact_us", {session: req.session, user: req.user});
});
app.get("/about_partner_with_us", function(req, res) {
        res.render("about_partner_with_us", {session: req.session, user: req.user});
});

// launch the app
app.listen(80);

console.log('Server running at http://127.0.0.1:1337/');
