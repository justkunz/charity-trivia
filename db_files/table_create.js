// connect to the postgres db
var query = require("pg-query");
query.connectionParameters = "postgres://charitytrivia:cheeseburger@aa1s4508xmf19hs.cqcp9ut8xkl3.us-east-1.rds.amazonaws.com:5432/ebdb";

// create the questions table
query("CREATE TABLE IF NOT EXISTS questions(question_id bigserial primary key, question text NOT NULL, answer varchar(64) NOT NULL, fake_answer_1 varchar(64) NOT NULL, fake_answer_2 varchar(64) NOT NULL, fake_answer_3 varchar(64) NOT NULL, charity_id bigint NOT NULL, total_attempts bigint NOT NULL, correct_attempts bigint NOT NULL)", function(err, rows, result) {
      console.log(err);
      });


// create the users table
query("CREATE TABLE IF NOT EXISTS users(user_id bigserial primary key, name varchar(64)  NOT NULL, email varchar(64)  NOT NULL, password varchar(256) NOT NULL, total_attempts bigint NOT NULL, correct_attempts bigint NOT NULL)", function(err, rows, result) {
      console.log(err);
      });

// create the charity table
query("CREATE TABLE IF NOT EXISTS charities(charity_id bigserial primary key, logo varchar(1024), link varchar(256) NOT NULL, ein_number bigint NOT NULL, name varchar(64) NOT NULL, email varchar(256) NOT NULL, password varchar(256) NOT NULL)", function(err, rows, result) {
      console.log(err);
      });
