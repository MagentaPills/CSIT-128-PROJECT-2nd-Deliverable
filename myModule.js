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
        if (err) {
            throw err;
        }
        var txt = data.toString();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(txt);
        res.write("<script>");
        if (result !== undefined) {
            res.write("document.getElementById(\"record_added\").innerHTML = 'The booking has been added successfully';");
        }
        res.write("</script>");

        return res.end();
    });
};

exports.addBooking = function (res, mySess, serviceDesc, serviceDate, serviceTime, myCallback) {
    var sql = "INSERT INTO service (service_desc, service_date, service_time, cus_id) values ( '" +
        serviceDesc + "','" + serviceDate + "','" + serviceTime + "'," + mySess.cusId + ")";
    con.query(sql, function (err, result) {
        if (err) throw err;
        myCallback(res, mySess, result); // result - employee titles object
    });
};

exports.getServices = function (res, mySess, myCallback) {
    var sql = "SELECT * from service WHERE cus_id = " + mySess.cusId;
    con.query(sql, function (err, result) {
        if (err) throw err;
        myCallback(res, result, mySess); // result - employee titles object
    });
};
exports.navigateToMyServices = function (res, cusObj, mySess) {
    fs.readFile("profile-services.html", function (err, data) {
        if (err) {
            throw err;
        }

        var txt = data.toString();
        var profileServiceContent="";
        for (var i = 0; i < cusObj.length; i++) {
            var serviceDate = JSON.stringify(cusObj[i].service_date).substring(1, 11);
            var serviceTime = JSON.stringify(cusObj[i].service_time).substring(1, 11);
           profileServiceContent += "<p>" + cusObj[i].service_desc + "      " + serviceDate +  "      " + serviceTime + "</p>";
        }


        txt = txt.replace("<p id=\"display_my_services\" class=\"txt_center\"></p>", profileServiceContent);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(txt);
        return res.end();
    });
};

exports.navigateToProductsForm = function (res, mySess, result) {
    fs.readFile("services-order.html", function (err, data) {
        if (err) {
            throw err;
        }
        var txt = data.toString();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(txt);
        res.write("<script>");
        if (result !== undefined) {
            res.write("document.getElementById(\"record_added\").innerHTML = 'The Product has been successfully Ordered';");
        }
        res.write("</script>");

        return res.end();
    });
};

exports.addProduct = function (res, mySess, productDesc, productQuantity, myCallback) {
    var sql = "INSERT INTO product (product_desc, product_quantity, cus_id) values ( '" +
        productDesc + "','" + productQuantity + "'," + mySess.cusId + ")";
    con.query(sql, function (err, result) {
        if (err) throw err;
        myCallback(res, mySess, result); // result - employee titles object
    });
};
   
exports.getProducts = function (res, mySess, myCallback) {
    var sql = "SELECT * from product WHERE cus_id = " + mySess.cusId;
    con.query(sql, function (err, result) {
        if (err) throw err;
        myCallback(res, result, mySess); // result - employee titles object
    });
}; 
exports.navigateToMyProducts = function (res, cusObj, mySess) {
    fs.readFile("profile-products.html", function (err, data) {
        if (err) {
            throw err;
        }

        var txt = data.toString();
        var profileProductContent="";
        for (var i = 0; i < cusObj.length; i++) {
            var productQuantity = JSON.stringify(cusObj[i].product_quantity).substring(1, 11);
           profileProductContent += "<p>" + cusObj[i].product_desc + "      " + productQuantity + "</p>";
        }


        txt = txt.replace("<p id=\"display_my_products\" class=\"txt_center\"></p>", profileProductContent);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(txt);
        return res.end();
    });
};
exports.navigateToContact = function (res, mySess, result) {
    fs.readFile("Contact.html", function (err, data) {
        if (err) {
            throw err;
        }
        var txt = data.toString();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(txt);
        res.write("<script>");
        if (result !== undefined) {
            res.write("document.getElementById(\"record_added\").innerHTML = 'The Message has been successfully Sent';");
        }
        res.write("</script>");

        return res.end();
    });
};

exports.addMessage = function (res, mySess, messageName, messagePhone, messageEmail, messageText, myCallback) {
    var sql = "INSERT INTO message (message_name, message_phone, message_email, message_text, cus_id) values ( '" +
        messageName + "','" + messagePhone + "','" + messageEmail + "','" + messageText + "'," +  mySess.cusId + ")";
    con.query(sql, function (err, result) {
        if (err) throw err;
        myCallback(res, mySess, result); // result - employee titles object
    });
};
exports.navigateToSignUp = function (res, mySess, result) {
    fs.readFile("signup.html", function (err, data) {
        if (err) {
            throw err;
        }
        var txt = data.toString();
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(txt);
        res.write("<script>");
        if (result !== undefined) {
            res.write("document.getElementById(\"demo_error_message\").innerHTML = 'User has been Successfully Registered!';");
        }
        res.write("</script>");

        return res.end();
    });
};

exports.handleSignup = function (res, formData) {
    var name = formData.name;
    console.log(name);
    var email = formData.email;
    var password = formData.password;

    var con = this.connectToDB();
    con.connect(function (err) {
        if (err) throw err;
        var sql = "INSERT INTO customer (cus_name, cus_email, cus_password) VALUES('" + name + "', '" + email + "', '" + password + "');";
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
};