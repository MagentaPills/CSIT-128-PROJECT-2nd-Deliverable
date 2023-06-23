var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amine0506!!" 
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql_database = "CREATE DATABASE csit128_db";
    con.query(sql_database, function (err, result) {
        if (err) throw err;
        console.log("csit128_db Database Created");
    });
});
