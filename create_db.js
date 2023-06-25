var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root" 
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
