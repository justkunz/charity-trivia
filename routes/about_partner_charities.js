var charities = require("../models/charities.js");
var user = require("../models/user.js");

module.exports = function(app, passport) {

  app.get("/about_partner_charities", function(req, res) {
    console.log("getting charities");

    // get all of the charities from the db
    charities.getAllCharities(function(err, rows) {
      res.render("about_partner_charities", { charities: rows, session: req.session, user: req.user });
    });
  });
}
