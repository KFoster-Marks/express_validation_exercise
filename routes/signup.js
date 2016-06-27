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
  checkRequired(info, req);
  checkUsername(req, info);

  res.render('signup', info);
});

function checkUsername(req, info) {
  info.username = req.body.username;
  info.error.username = [];
  //if username less than equal to six
  if(req.body.username.length <= 6) {
    info.hasError = true;
    info.error.username.push({message: "Username is too short"});
  }
  if(req.body.username) {
    var regex = /[A-Za-z]/;
    if (!req.body.username[0].match(regex)) {
      info.hasError = true;
      info.error.username.push({message: "Username should start with a letter"});
    }
    var regex = /\W/g;
    if (req.body.username[0].match(regex)) {
      info.hasError = true;
      info.error.username.push({message: "Username should start with a letter"});
    }
  }
}

function checkRequired(info, req) {
  for(var item in req.body){
    info[item] = req.body[item];
    if(req.body[item].length <= 0)
    {
      if(!info.error[item])
      {
        info.error[item] = [];
      }
      info.hasError = true;
      info.error[item].push({message: item + " is required."});
    }
  }
}
// PRO-TIP: Write ALOT of functions to help you handle each little piece.


module.exports = router;
