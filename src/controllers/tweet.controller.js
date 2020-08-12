const Tweet = require("../models/tweet.model");
const Reaction = require("../models/reaction.model");

const addTweet = async (user, args) => {
  try {
    let newTweet = new Tweet();
    let reactions = new Reaction();
    newTweet.creator = user.sub;
    newTweet.date = new Date();
    newTweet.content = args[0];

    const reactionSaved = await reactions.save();
    if (!reactionSaved) {
      return {
        message:
          "Error, this tweet doesn't has an interaction object to save its likes",
      };
    } else {
      newTweet.likes = reactionSaved._id;
      const newTweetAdded = await (await newTweet.save())
        .populate("creator", "-password -following -followers -name -email")
        .populate("likes", "-_id -interactors")
        .execPopulate();
      if (!newTweetAdded) return { message: "Error adding new tweet" };
      else {
        return newTweetAdded;
      }
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

const doLike = async (id, userId) => {
  try {
    const liked = await Reaction.findOneAndUpdate(
      { _id: id },
      { $push: { interactors: userId }, $inc: { likes: 1 } }
    );
    if (!liked) return { message: "Error trying to like this tweet" };
    else return { message: "You like this tweet" };
  } catch (err) {
    console.log(err);
    return { message: "Internal server error" };
  }
};

const dislike = async (id, userId) => {
  try {
    const disliked = await Reaction.findOneAndUpdate(
      { _id: id },
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
        $and: [{ _id: tweet.likes }, { interactors: { _id: user.sub } }],
      });
      if (!previusReactions) {
        const toLike = await Reaction.findById(tweet.likes);
        return await doLike(toLike._id, user.sub);
      } else return await dislike(previusReactions._id, user.sub);
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal serverv error" };
  }
};

module.exports = {
  addTweet,
  switchUpdateDelete,
  like,
};
