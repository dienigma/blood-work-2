var express = require('express');
var router = express.Router();
const passport = require('passport');
const db = require('../models')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const path = require('path')
let fs = require('fs'),
PDFParser = require("pdf2json");

let pdfParser = new PDFParser();


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
  res.render('reports')
})

router.get('/upload-report',(req,res)=>{
  res.render('upload-report')
})

router.post('/upload-report',upload.single('report'),(req,res)=> {
  console.log(req.file)
  // const filepath = req.file.path
  
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
  pdfParser.on("pdfParser_dataReady", pdfData => {
      fs.writeFile("./pdf2json/F1040EZ.json", JSON.stringify(pdfData));
  });
  pdfParser.loadPDF("./pdf2json/pdf/fd/form/F1040EZ.pdf");
})

router.get('/account', function (req,res){
  res.render('account')
})
module.exports = router;
