var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amine0506!!",
    database: "csit128_db"
});

con.connect(function (err) {
    if (err) throw err;
    var sql = "ALTER TABLE service ADD CONSTRAINT UC_Service UNIQUE(service_date, service_time); ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
    });
});