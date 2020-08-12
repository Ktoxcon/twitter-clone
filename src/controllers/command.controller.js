const { getAction } = require("twitter-command");
const {
  signUp,
  signIn,
  followUser,
  unfollowUser,
  profile,
} = require("./user.controller");
const {
  addTweet,
  switchUpdateDelete,
  viewTweets,
} = require("./tweet.controller");

const commands = async (req, res) => {
  try {
    res.send(await mapAction(req.user, getAction(req)));
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const mapAction = async (user, { command, args }) => {
  try {
    if (command === "invalid command") return { message: "Invalid command" };
    else if (args === "invalid arguments")
      return { message: "Invalid arguments" };
    else {
      switch (command.toLowerCase()) {
        case "register":
          return await signUp(args);
          break;
        case "login":
          return await signIn(args);
          break;
        case "add_tweet":
          return await addTweet(user, args);
          break;
        case "edit_tweet":
          return await switchUpdateDelete(user, args, 0);
          break;
        case "delete_tweet":
          return await switchUpdateDelete(user, args, 1);
          break;
        case "view_tweets":
          return await viewTweets(args);
          break;
        case "follow":
          return await followUser(user, args);
          break;
        case "unfollow":
          return await unfollowUser(user, args);
          break;
        case "profile":
          return await profile(args);
          break;
        default:
          return { message: "Invalid command try again" };
      }
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  commands,
};
