var mysql = require('mysql');
var fs = require('fs');
var con;

exports.connectToDB = function () {
    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "root", 
        database: "csit128_db"
    });
    return con;
};

exports.preAuthentication = function (res, mySess, cusId, body) {
    if (cusId != -1 && cusId != "" && cusId !== undefined) {
        mySess.setMySession(body.email);
        mySess.setUserIdSession(cusId);
        s = mySess.getMySession();
        if (s.email != "" && s.email !== undefined) {
            // Redirect to the Home page.
            fs.readFile("Home.html", function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }
    }
}

exports.login = function (res) {   // to display error message if there is any.
    fs.readFile("login.html", function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.signup = function (res) {
    fs.readFile("signup.html", function(err, data){
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

exports.handleSignup = function (res, formData) {
    var name = formData.name;
    console.log(name);
    var email = formData.email;
    var password = formData.password;

    var con = this.connectToDB();
    con.connect(function (err){
        if (err) throw err;
        var sql  = "INSERT INTO customer (cus_name, cus_email, cus_password) VALUES('"+ name +"', '"+ email +"', '"+ password +"');";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
}

exports.logout = function (res) {
    fs.readFile("login.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        con.destroy();
        return res.end();
    });
};

exports.navigateToHome = function (res) {
    fs.readFile("Home.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.navigateToAbout = function (res) {
    fs.readFile("About.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.navigateToServices = function (res) {
    fs.readFile("Services.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.navigateToContact = function (res) {
    fs.readFile("Contact.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.navigateToForgot = function (res) {
    fs.readFile("forgot.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

exports.navigateToUserProfile = function (res, cusObj) {
    fs.readFile("profile.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.write("<script>");
        res.write("document.getElementById(\"cus_id_display\").innerHTML = '" + cusObj[0].cus_id + "';" + "\n");        
        res.write("document.getElementById(\"cus_name_display\").innerHTML = '" + cusObj[0].cus_name + "';" + "\n");          
        res.write("document.getElementById(\"cus_email_display\").innerHTML = '" + cusObj[0].cus_email + "';" + "\n");         
        res.write("</script>");
        return res.end();
    });
};

exports.authenticateUser = function (res, body, mySess, myCallback) {
    var empEmail = body.email;
    var empPassword = body.password;
    // Connect to the database.
    con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        // Get employee record.
        var sql = "SELECT * from customer WHERE cus_email = '" + empEmail + "' AND cus_password = '" + empPassword + "'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result !== undefined && result.length > 0) {
                myCallback(res, mySess, result[0].cus_id, body);
            }
            else {
                // show error message on the login page.
                    var message = "<script>document.getElementById(\"demo_error_message\").innerHTML = \"You have entered an incorrect username or password!\";</script> ";
                    fs.readFile("login.html", function (err, data) {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data);
                        return res.end(message);                       
                    });
            }      
     });
    });
};

exports.getEmployee = function (res, mySess, myCallback) {    
    var sql = "SELECT * from customer WHERE cus_id = " + mySess.cusId;
           con.query(sql, function (err, result) {
                if (err) throw err;
                if (result !== undefined && result.length > 0) {
                    myCallback(res, result); // result - employee object
                }
            });
};

exports.navigateToServicesForm = function (res, mySess, result) {
    fs.readFile("services-form.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    
    });
};