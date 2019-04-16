const router = require('express').Router()

router.get('/',(req,res) =>{
    res.render('reports')
})


module.exports = router