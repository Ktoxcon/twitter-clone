module.exports.CommandParser = (req) => {
    const toParse = req.body.command
                    .trim().split(' ').filter(arg => arg.trim());
    const command = toParse.shift();
    const args = toParse;
    
    const parsed = {
        command:command,
        data:args
    };
    
    return parsed;
}

exports.CommandMatcher = ({command}) => {
    const COMMANDS = [
        "ADD_TWEET",
        "DELETE_TWEET",
        "EDIT_TWEET",
        "VIEW_TWEETS",
        "FOLLOW",
        "UNFOLLOW",
        "PROFILE",
        "LOGIN",
        "REGISTER"
    ];

    const commandMatched = COMMANDS.filter(match => 
        match === String(command).toUpperCase()
    ).join(); 

    if(commandMatched !== ""){
        return commandMatched;
    }else{
        return "Unrecognized command";
    }

}



