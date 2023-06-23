var mysql = require('mysql');
var fs = require('fs');
var con;

// This method is used to connect to the Database
// @author Dr. Haitham Yaish
// @date 11 June 2023
// return con
exports.connectToDB = function () {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Amine0506!!", // provide your own password.
        database: "csit128_db"
    });
    return con;
};
// The purpose of this method is to create the sessions and authorize the user.
// @author Dr. Haitham Yaish
// @date 11 June 2023
// @param res
// @param mySess
// @param empId
// body
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


// This method is used to login the user in the web application.
// @author Dr. Haitham Yaish
// @date 11 June 2023
// @param res
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

// This method is used to logout the user from the web application.
// @author Dr. Haitham Yaish
// @date 11 June 2023
// @param res
exports.logout = function (res) {
    fs.readFile("login.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        con.destroy();
        return res.end();
    });
};

// This method navigates the user to the Home page.
// @author Dr. Haitham Yaish
// @param res
exports.navigateToHome = function (res) {
    fs.readFile("Home.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

// This method navigates the user to the about page.
// @author Dr. Haitham Yaish
// @param res
exports.navigateToAbout = function (res) {
    fs.readFile("About.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

// This method navigates the user to the services page.
// @author Dr. Haitham Yaish
// @param res
exports.navigateToServices = function (res) {
    fs.readFile("Services.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

// This method navigates the user to the contact page.
// @author Dr. Haitham Yaish
// @param res
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



// This method navigates the user to the UserProfile page.
// @author Dr. Haitham Yaish
// @date 11 June 2023
// @param res
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

// This method authenticates user credentials
// @author Dr. Haitham Yaish
// @date 11 June 2023
// @param empUsername
// @param empPassword
// @param myCallback
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

// This method gets an employee record
// @author Dr. Haitham Yaish
// @date 11 June 2023
// @param res
// @param empId
// @param myCallback
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