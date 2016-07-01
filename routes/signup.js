'use strict';

var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
  res.render('signup', {
    hasError : false,
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    phone: '',
  });
});

router.post('/', function(req, res){
  console.log(req.body);
  var info = {
    hasError: false
  };
  info.error = {};

  checkUsername(req, info);
  checkPassword(req, info);
  checkEmail(info, req);
  checkRequired(info, req);
  if (info.hasError === true) {
    res.render('signup', info);
  } else {
    res.redirect('/');
  }
});


function checkRequired(info, req) {
  console.log("Entering checkRequired function");
  for( var item in req.body ) {
    info[item] = req.body[item];
    if( req.body[item] === '' ) {
      console.log("Recognized that nothing is there");
      if( !info.error[item] )  {
        info.error[item] = [];
      }
      info.hasError = true;
      info.error[item].push({message: item + " is required."});
    }
    console.log(info.error[item][0].message);
  }
}

function checkUsername(req, info) {
  info.username = req.body.username;
  info.error.username = [];
  //if username less than equal to six
  if(req.body.username.length <= 6) {
    info.hasError = true;
    info.error.username.push({message: "Username is too short."});
  }
  if(req.body.username) {
    var regex = /[A-Za-z]/;
    if (!req.body.username[0].match(regex)) {
      info.hasError = true;
      info.error.username.push({message: "Username should start with a letter."});
    }
    var regex = /\W/g;
    if (req.body.username.match(regex)) {
      info.hasError = true;
      info.error.username.push({message: "Username can't contain punctation."});
    }
  }
}

function checkPassword(req, info) {
  info.password = req.body.password;
  info.error.password = [];
  if(req.body.password.length <= 8) {
    info.hasError = true;
    info.error.password.push({message: "Password should be 9 or more characters."});
  }
  var regex = /[A-Za-z]/;
  if (!req.body.password.match(regex)) {
    info.hasError = true;
    info.error.password.push({message: "Password must contain at least one letter."});
  }
  var regex = /\W/g;
  if (!req.body.password.match(regex)) {
    info.hasError = true;
    info.error.password.push({message: "Password must contain at least one special character."});
  }
}

function checkEmail(info, req) {
  var emailString = req.body.email;
  var atFound = false;
  var dotFound = false;

  for(var i=1; i < emailString.length; i++) {
    if(emailString[i] === '@' || atFound)  {

      if(atFound && emailString[i] === '.')  {
        //This email has an @ and dot in the right order.
        dotFound = true;
      }

      atFound = true;
    }
  }

  if (atFound && dotFound) {
    info.email = req.body.email;
  } else {
    if(!info.error.email) {
      info.error.email = [];
    }
    info.hasError = true;
    info.error.email.push({message : "email is malformed."});
  }
}


module.exports = router;
