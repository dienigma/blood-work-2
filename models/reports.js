const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    data:String,
    user:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    }
})

const Report = mongoose.model('Report',reportSchema)
module.exports = Report