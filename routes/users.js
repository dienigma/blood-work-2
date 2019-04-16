var express = require('express');
var router = express.Router();
const passport = require('passport');
const db = require('../models')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,nex){
  res.render('register')
})

router.post('/register',function(req,res,next){
  console.log("registerting user")
  db.User.register(new db.User({username: req.body.username}),req.body.password, function(err) {
    if (err) {
      console.log('error while user registration!', err)
      return next(err);
    }

    console.log('user registered!')

    res.redirect('/')
  })
})

router.get('/login', function(req, res) {
  res.render('login', {user: req.user})
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/reports')
})

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})
router.get('/reports',(req,res) =>{
  res.render('reports')
})

router.get('/account', function (req,res){
  res.render('account')
})
module.exports = router;
