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
    else if (req.url == "/servicesForm") {
        s = mySess.getMySession();
        myModule.getEmployee(res, s, myModule.navigateToServicesForm);

    }
    else {
        // Login page.
        myModule.login(res);
    }
}).listen(8080);