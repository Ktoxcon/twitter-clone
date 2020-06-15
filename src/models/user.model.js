const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const UserSchema = Schema({
    name:String,
    email:String,
    username:String,
    password:String,
    followers:[{type:Schema.Types.ObjectId,ref:'user'}],
    following:[{type:Schema.Types.ObjectId,ref:'user'}]
},{
    versionKey:false
});

module.exports = Mongoose.model('user',UserSchema);