var mysql = require('mysql');
const sqlInsert = [
    "INSERT INTO customer (cus_id, cus_name, cus_email, cus_password) VALUES(1, 'Egbert', 'Egbert@gmail.com', 'Egbert101');",
    "INSERT INTO customer (cus_id, cus_name, cus_email, cus_password) VALUES(2, 'Roxy', 'Roxy@yahoo.com', 'Kanayamylove');",
    "INSERT INTO customer (cus_id, cus_name, cus_email, cus_password) VALUES(3, 'Strider', 'dave@gmail.com', 'BroPuppet');",
    "INSERT INTO customer (cus_id, cus_name, cus_email, cus_password) VALUES(4, 'Jade', 'meow@gmail.com', 'silly');",
    "INSERT INTO customer (cus_id, cus_name, cus_email, cus_password) VALUES(5, 'John', 'Avery@gmail.com', 'Wawa');"
];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amine0506!!",
    database: "csit128_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    for (let i = 0; i < sqlInsert.length; i++) {
        const query = sqlInsert[i];
        con.query(query, function (err, result) {
            if (err) throw err;

        });
        console.log(i + 1 + " record inserted");
    }
});