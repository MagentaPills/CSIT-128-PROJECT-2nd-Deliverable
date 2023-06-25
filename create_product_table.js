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
    
    var sql_table = "CREATE TABLE `csit128_db`.`product` (" +
        "`product_id` INT NOT NULL AUTO_INCREMENT, " +
        "`product_desc` VARCHAR(45) NULL, " +
        "`product_quantity` INT NULL, " +
        "`cus_id` INT NULL, " +
        "PRIMARY KEY(`product_id`), " +
        "INDEX `cus_id_idx` (`cus_id` ASC) VISIBLE, " +
        "CONSTRAINT `prod_cus_id` " +
        "FOREIGN KEY(`cus_id`) " +
        "REFERENCES `csit128_db`.`customer`(`cus_id`) " +
        "ON DELETE NO ACTION " +
        "ON UPDATE NO ACTION);";

    con.query(sql_table, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});