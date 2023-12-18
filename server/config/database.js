var mysql = require('mysql');

require('dotenv').config()

var db = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE,
  timezone: 'Asia/Ho_Chi_Minh',
});

//open the MySQL connection
db.connect(error => {
    if (error) throw error;
    console.log("DB connected");
});

 
module.exports = db;