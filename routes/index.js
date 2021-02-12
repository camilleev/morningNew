var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/users');
const { token } = require('morgan');

router.post('/sign-up', async function(req,res,next){
  var error = []
  var result = false
  var saveUser = null
  var cost = 10

  const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

  var test = test
  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }


  if(error.length == 0){
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: hash,
      token : uid2(32)
    })
  
    saveUser = await newUser.save()
  
    var token = newUser.token
    
    if(saveUser){
      result = true
    }
  }
  

  res.json({result, saveUser, error, token })
})

router.post('/sign-in', async function(req,res,next){
  try {
    var result = false
    var user = null
    var error = []
  
    var password = req.body.passwordFromFront
    
    //empeche champs vides
    if(req.body.emailFromFront == ''
    || req.body.passwordFromFront == ''
    ){
      error.push('champs vides')
    }
  
    //recherche exist user
    if(error.length == 0){
      const user = await userModel.findOne({
        email: req.body.emailFromFront
      })
    
      if(user){
  
        if (bcrypt.compareSync(password, user.password)) {
          result = true
          var token = user.token
  
          res.json({result, error, token});
  
         }else {
          error.push('mot de passe incorrect')
  
          res.json({result, error });
        }
      } else {
        error.push('mail incorrect')
        res.json({result, error });
      }
      
  }
 
  } catch (err) {
    console.log(err)
    res.json({err});
  }
  
})

module.exports = router;
