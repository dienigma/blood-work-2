const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/bwa")

module.exports.User = require('./users')