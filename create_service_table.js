
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root", // provide your own password.
    database: "csit128_db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    
    var sql_table = "CREATE TABLE `csit128_db`.`service` (" +
        "`service_id` INT NOT NULL AUTO_INCREMENT, " +
        "`service_desc` VARCHAR(45) NULL, " +
        "`service_date` DATE NULL, " +
        "`service_time` TIME NULL, " +
        "`cus_id` INT NULL, " +
        "PRIMARY KEY(`service_id`), " +
        "INDEX `cus_id_idx` (`cus_id` ASC) VISIBLE, " +
        "CONSTRAINT `cus_id` " +
        "FOREIGN KEY(`cus_id`) " +
        "REFERENCES `csit128_db`.`customer`(`cus_id`) " +
        "ON DELETE NO ACTION " +
        "ON UPDATE NO ACTION);";

    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
