var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amine0506!!", // provide your own password.
    database: "csit128_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
   
    var insert = "INSERT INTO service (service_desc, service_date, service_time, cus_id) VALUES " +
        "('Annual Physicals', '1999-07-31','12:30:23', 1), " +
        "('Blood Testings', '2000-05-13','13:40:20', 1), " +
        "('Vaccination', '2005-04-13','04:24:30', 1);";

    con.query(insert, function (err, result) {
        if (err) throw err;
        console.log("Data inserted");
    });
});