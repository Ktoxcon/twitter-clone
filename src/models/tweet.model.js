const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const TweetSchema = Schema({
    creator:{type:Schema.Types.ObjectId,ref:'user'},
    date:Date,
    content:String
},{
    versionKey:false
});

module.exports = Mongoose.model('tweet',TweetSchema);