var express = require('express');
var router = express.Router();
const passport = require('passport');
const db = require('../models')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
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
  res.redirect('/users/reports')
})

router.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/')
})
router.get('/reports',(req,res) =>{
  db.Report.find()
  .then(data => {
    console.log(data)
    res.render('reports',{data:data})})
  .catch(err => res.send(err))
})

router.get('/upload-report',(req,res)=>{
  res.render('upload-report')
})

router.post('/upload-report',upload.single('report'),(req,res)=> {
  console.log(req.file)
  db.Report.create({data:req.file.path})
  .then(res.send("Success"))
  .catch(err => res.send(err))
})

router.get('/account', function (req,res){
  res.render('account')
})
module.exports = router;
