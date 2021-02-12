var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var uid2 = require('uid2');

var userModel = require('../models/users');
var wishListModel = require('../models/wishLists')

router.post('/sign-up', async function(req,res,next){
  var error = []
  var result = false
  var saveUser = null
  var cost = 10
  var token = null

  const hash = bcrypt.hashSync(req.body.passwordFromFront, cost);

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
      token : uid2(32), 
      langage: 'fr'
    })
  
    saveUser = await newUser.save()
  
    
    if(saveUser){
      result = true
      token = newUser.token
    }
  }
  

  res.json({result, saveUser, error, token })
})

router.post('/sign-in', async function(req,res,next){
  try {
    var result = false
    var user = null
    var error = []
    var token = null

  
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
          token = user.token
    
         }else {
          error.push('mot de passe incorrect')
          }
      } else {
        error.push('mail incorrect')
      }

      res.json({result, error, token });

      
  }
 
  } catch (err) {
    console.log(err)
    res.json({err});
  }
  
})

//Enregistrement BB wishlist
router.post('/wishlist', async function(req, res, next) {

  var user = await userModel.findOne({
    token: req.body.token
  })
  
     user.wishList.push({
    title: req.body.title,
    img: req.body.img,
    content: req.body.content
  })

  var userSaved = await user.save();
 
  var result = false
  if(userSaved){
    result = true
  }
 console.log(userSaved);
  res.json({result, userSaved})
});

router.post('/save-articles', async function(req, res, next){
  
  var wishList = await userModel.findOne({
    token: req.body.token
  })
 
  var result = false
  if(wishList){
    result = true
  }
  res.json({result, wishList})

})

router.delete('/delete-articles/:title', async function(req, res, next) {

  var deleteArticle = await userModel.deleteOne({ title: req.params.title})

  var result = false
  if(deleteArticle){
    result = true
  }

  res.json({result})
});



router.post('/change-langage', async function(req,res,next){
  var updateLangage = await userModel.updateOne(
    { token: req.body.token},
    { langage: req.body.langage }
 
 );
  res.json({})
})

module.exports = router;
