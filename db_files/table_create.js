// connect to the postgres db
var pg = require("pg");
var conString = "postgres://localhost:5432/charity_trivia";
var client = new pg.Client(conString);
client.connect();

// create the questions table
client.query("CREATE TABLE IF NOT EXISTS questions(question_id bigserial primary key, question text NOT NULL, answer varchar(64) NOT NULL, fake_answer_1 varchar(64) NOT NULL, fake_answer_2 varchar(64) NOT NULL, fake_answer_3 varchar(64) NOT NULL, charity_id bigint NOT NULL, total_attempts bigint NOT NULL, correct_attempts bigint NOT NULL)");


// create the users table
client.query("CREATE TABLE IF NOT EXISTS users(user_id bigserial primary key, name varchar(64)  NOT NULL, email varchar(64)  NOT NULL, password bit(256) NOT NULL)");

// create the charity table
client.query("CREATE TABLE IF NOT EXISTS charities(charity_id bigserial primary key, logo OID, link varchar(256) NOT NULL, ein_number bigint NOT NULL, name varchar(64) NOT NULL, email varchar(256) NOT NULL, password bit(256) NOT NULL)");
