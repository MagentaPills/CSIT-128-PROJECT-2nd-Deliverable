var http = require('http');
var url = require('url');
var fs = require('fs');
var myModule = require('./myModule')
var mySess = require('./mySession')
querystring = require('querystring');

 // The purpose of this method and this Nod.js file is to run the Node.js project
// @author Dr. Haitham Yaish
// @date 11 June 2023
http.createServer(function (req, res) {
    var body = '';
    var s;

    if (req.url == "/login") {

        // read chunks of POST data
        req.on('data', chunk => {
            body += chunk.toString();
        });
        // when complete POST data is received
        req.on('end', () => {
            // use parse() method
            body = querystring.parse(body);

            // Authonticate user credentials.
            myModule.authenticateUser(res,body,mySess, myModule.preAuthentication);  //.then(result => console.log(result));
        });

    }
    else if (req.url == "/signup") {
        myModule.navigateToSignUp(res);
        if (req.method == "POST") {
            var body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                var formData = querystring.parse(body);
                myModule.handleSignup(res, formData);
            });
        }

    }
    else if (req.url == "/profile") {
     } else if (req.url == "/profile") {
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.getEmployee(res, s, myModule.navigateToUserProfile);                 
            }
        } else {
            // Redirect to the login page.
            myModule.login(res);
        }
    } 
    else if (req.url == "/logout") {
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                mySess.deleteSession();
            }
        } else {
            // Redirect to the login page.
            myModule.login(res);
        }
        myModule.logout(res);     
    } else if (req.url == "/Home") { 
            
        s = mySess.getMySession();
        console.log(s);
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                console.log(mySess.getMySession.username);
                myModule.navigateToHome(res);
            }
        } else {
            // Redirect to the login page.
            myModule.login(res);
        }
    } else if (req.url == "/About") {
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.getEmployee(res, s, myModule.navigateToAbout);
            }
        } else {
            // Redirect to the login page.
            myModule.login(res);
        }
    }
    else if (req.url == "/Services") {
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.getEmployee(res, s, myModule.navigateToServices);
            }
        } else {
            // Redirect to the login page.
            myModule.login(res);
        }
    }
    else if (req.url == "/Contact") {
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.getEmployee(res, s, myModule.navigateToContact);
            }
        } else {
            // Redirect to the login page.
            myModule.login(res);
        }
    }
    else if (req.url == "/my-services" || req.url == "/my-services?" ) { 
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.getServices(res, s, myModule.navigateToMyServices);
            }
        }
    } else if (req.url == "/servicesForm") {  
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.navigateToServicesForm(res, s);
            }
        }
    } else if (req.url.indexOf("/add_service_record") >= 0) {        
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                var q = url.parse(req.url, true).query;
                myModule.addBooking(res, s, q.serviceDesc, q.serviceDate, q.serviceTime, myModule.navigateToServicesForm);
            }
        }
    }
    else if (req.url == "/servicesOrder") {  
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.navigateToProductsForm(res, s);
            }
        }
    } else if (req.url.indexOf("/add_product_record") >= 0) {        
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                var q = url.parse(req.url, true).query;
                myModule.addProduct(res, s, q.productDesc, q.productQuantity, myModule.navigateToProductsForm);
            }
        }
    }
    else if (req.url == "/my-products" || req.url == "/my-products?" ) { 
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.getProducts(res, s, myModule.navigateToMyProducts);
            }
        }
    }
    else if (req.url == "/contact") {  
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                myModule.navigateToContact(res, s);
            }
        }
    } else if (req.url.indexOf("/add_contact_record") >= 0) {        
        s = mySess.getMySession();
        if (s !== undefined) {
            if (s.email != "" && s.email !== undefined) {
                var q = url.parse(req.url, true).query;
                myModule.addMessage(res, s, q.messageName, q.messagePhone, q.messageEmail, q.messageText, myModule.navigateToContact);
            }
        }
    }
    else {
        // Login page.
        myModule.login(res);
    }
}).listen(8081);