const Tweet = require("../models/tweet.model");
const Reaction = require("../models/reaction.model");
const { findOne } = require("../models/reaction.model");

const addTweet = async (user, args) => {
  try {
    let newTweet = new Tweet();
    let reactions = new Reaction();
    newTweet.creator = user.sub;
    newTweet.date = new Date();
    newTweet.content = args[0];

    const newTweetAdded = await (await newTweet.save())
      .populate("creator", "-password -following -followers -name -email")
      .execPopulate();
    if (!newTweetAdded) return { message: "Error adding new tweet" };
    else {
      reactions.tweet = newTweetAdded._id;
      const reactionSaved = await reactions.save();

      if (!reactionSaved)
        return {
          message:
            "Error, this tweet doesn't has an interaction object to save its likes",
        };
      else return newTweetAdded;
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal server error" };
  }
};

const switchUpdateDelete = async (user, args, operation) => {
  try {
    let resultTweet;
    let tweetFound;
    if (operation === 0) tweetFound = await Tweet.findById(args[1]);
    else tweetFound = await Tweet.findById(args[0]);

    if (!tweetFound) return { message: "The tweet with that id doesn't exist" };
    else {
      if (String(user.sub) !== String(tweetFound.creator)) {
        return { message: " Sorry you can't manage this tweet" };
      } else {
        if (operation === 0) {
          resultTweet = await Tweet.findByIdAndUpdate(
            args[1],
            { content: args[0] },
            { new: true }
          );
        } else {
          resultTweet = await Tweet.findByIdAndRemove(args[0]);
        }
        if (!resultTweet)
          return { message: "An error has ocurred, try again." };
        else {
          if (operation === 0) return resultTweet;
          else return { message: "Tweet deleted" };
        }
      }
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal Server Error" };
  }
};

const viewTweets = async (args) => {
  try {
    if (args[0] === "*") {
      const allTweets = await Tweet.find({}).populate(
        "creator",
        "-password -following -followers -name -email"
      );
      if (!allTweets) return { message: "Unable to get tweets" };
      else return allTweets;
    } else {
      const userFound = await User.findOne({ username: args[0] });
      if (!userFound)
        return { message: "The user with that username doesn't exist" };
      else {
        const tweets = await Tweet.find({ creator: userFound._id }).populate(
          "creator",
          "username"
        );
        if (!tweets) return { message: "Unable to get tweets" };
        else if (tweets.length === 0)
          return { message: `${userFound.username} doesn't have tweets yet.` };
        else return tweets;
      }
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal server Error" };
  }
};

const doLike = async (tweetId, userId) => {
  try {
    const liked = await Reaction.findOneAndUpdate(
      { tweet: tweetId },
      { $push: { interactors: userId }, $inc: { likes: 1 } }
    );
    if (!liked) return { message: "Error trying to like this tweet" };
    else return { message: "You like this tweet" };
  } catch (err) {
    console.log(err);
    return { message: "Internal server error" };
  }
};

const dislike = async (tweetId, userId) => {
  try {
    const disliked = await Reaction.findOneAndUpdate(
      { tweet: tweetId },
      { $pull: { interactors: userId }, $inc: { likes: -1 } }
    );
    if (!disliked) return { message: "Error trying to dislike this tweet" };
    else return { message: "You don't like this tweet anymore" };
  } catch (err) {
    console.log(err);
    return { message: "Internal server error" };
  }
};

const like = async (user, args) => {
  try {
    const tweet = await Tweet.findById(args[0]);
    if (!tweet) return { message: "Sorry that tweet doesn't exists" };
    else {
      const previusReactions = await Reaction.findOne({
        $and: [{ tweet: tweet._id }, { interactors: { _id: user.sub } }],
      });
      if (!previusReactions) return await doLike(tweet._id, user.sub);
      else return await dislike(tweet._id, user.sub);
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal serverv error" };
  }
};

module.exports = {
  addTweet,
  switchUpdateDelete,
  viewTweets,
  like,
};
