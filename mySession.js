// The purpose of this file is to manage the project sessions.
// @author Dr. Haitham Yaish
// @date 11 June 2023
const session = require('express-session');
var mySession;

exports.setMySession = function (email) {
    session.email = email;
    mySession = session;
    console.log("Session Created.");
};

exports.setUserIdSession = function (cusId) {
    session.cusId = cusId;
    mySession = session;
    console.log("Customer ID Session Created.");
};

exports.getMySession = function(){
    return mySession;
};

exports.deleteSession = function () {
    mySession = "";
    console.log("Session Deleted.");
}

