var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",   // provide your own password.
    database: "csit128_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Create employee table.
    var sql_table = "CREATE TABLE customer (cus_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
    "cus_name VARCHAR(50)," +
    "cus_email  VARCHAR(255)," +
    "cus_password VARCHAR(50))";
    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Customer Table created");
    });
});
