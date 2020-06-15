const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Tweet = require('../models/tweet.model');
const  CommandVerificator  = require('../lib/command_verificator').getAction;

const commands = async (req,res) => {
    const action = CommandVerificator(req);
    try{
        mapAction(action).then((r) => res.send(r))
                         .catch((err) => res.send(err));
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal server error"});
    }
};

const mapAction = async ({command,args}) => {
    try{
        if(args === "null") return {message:"Invalid command"};
        else if(command === "null") return {message:"Invalid arguments"};
        else{
            switch(command){
                case "register":
                    return signUp(args).then((r) => {return r});
                break;
                default:
                    return "fuck";
            }
         }
    }catch(err){
        console.log(err);
        return err;
    }
    
};

const signUp = async ({args}) => {
    const user = User();
    try{
        let userExists = await User.findOne({$or:[{username:data.username},{email:data.email}]});
        if(userExists) return {message:'El usuario ya existe.'};
        else{
            user.name = args[0];
            user.username = args[1]
            user.email = args[2];
            const password = await bcrypt.hash(args[3]);
            if(!password) return {message:error};
            else{
                user.password = password;
                let accountCreated = await user.save();
                if(!accountCreated) return {message:'Error al crear cuenta'};
                else{
                    return accountCreated;
                }
            }
        }   
    }catch(err){
        return err;
        console.log(err);
    }
};



module.exports = {
    commands
};