exports.CommandParser = (req) => {
    const toParse = req.body.command.trim().split(' ');
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
    });

    return commandMatched;
}


export const getAction = (command,args) => {
    const commandResult = undefined;
    
    switch(command){
        case "ADD_TWEET":
            args.length === 1 ?
                commandResult = getNewTweet(args)
                : commandResult = "Invalid arguments";
        break;
        case "DELETE_TWEET":
            args.length === 1 ?
                commandResult = getTweetId(args)
                : commandResult = "Invalid arguments";
        break;
        case "EDIT_TEEWT":
            args.length === 2 ?
                commandResult = getEditedTweet(args)
                : commandResult = "Invalid Arguments";
        break;
    }

    return action;
}


export const getNewTweet = (tweetContent) => {
    return {
        body:tweetContent[0],
        creator:null,
        date:null
    };
}

export const getTweetId = (tweetId) => {
    return {
        id:tweetId[0]
    };
}


export const getEditedTweet = (tweet) => {
    return {
        id:tweet[0],
        body:tweet[1]
    };
}

export const getTweets = (userName) => {
    return{
        username:userName[0]
    };
}