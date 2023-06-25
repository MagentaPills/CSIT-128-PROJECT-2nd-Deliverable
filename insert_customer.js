var mysql = require('mysql');
const sqlInsert = [
    "INSERT INTO customer (cus_name, cus_email, cus_password) VALUES('Egbert', 'Egbert@gmail.com', 'Egbert101');",
    "INSERT INTO customer (cus_name, cus_email, cus_password) VALUES('Roxy', 'Roxy@yahoo.com', 'Kanayamylove');",
    "INSERT INTO customer (cus_name, cus_email, cus_password) VALUES('Strider', 'dave@gmail.com', 'BroPuppet');",
    "INSERT INTO customer (cus_name, cus_email, cus_password) VALUES('Jade', 'meow@gmail.com', 'silly');",
    "INSERT INTO customer (cus_name, cus_email, cus_password) VALUES('John', 'Avery@gmail.com', 'Wawa');"
];

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
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