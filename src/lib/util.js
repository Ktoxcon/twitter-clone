exports.CommandParser = (req) => {
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

exports.CommandMatcher = (reqCommand) => {
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

    const commandMatched = COMMANDS.filter((command) => {
        command === reqCommand.command.toUpperCase() ? command : undefined;
    }).join();

    return commandMatched;
}



