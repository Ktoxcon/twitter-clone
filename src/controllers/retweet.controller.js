const Retweet = require("../models/retweet.model");
const Tweet = require("../models/tweet.model");

const retweet = async (user, args) => {
  try {
    const tweetExists = await Tweet.findById(args[1]);
    if (!tweetExists) return { message: "That tweet doesn't exists" };
    else {
      const newRetweet = new Retweet();
      newRetweet.creator = user.sub;

      if (args[0] !== "") newRetweet.title = args[0];

      const retweetAdded = await newRetweet.save();
      if (!retweetAdded) return { message: "Retweet doesn't added" };
      else {
        const updateTweet = await Tweet.findByIdAndUpdate(
          tweetExists._id,
          {
            $push: { retweets: retweetAdded._id },
          },
          { new: true }
        )
          .populate("creator", "username")
          .populate("likes", "-_id -interactors")
          .populate([
            {
              path: "replies",
              select: "-_id",
              populate: {
                path: "author",
                select: "-_id -password -following -followers -name -email",
              },
            },
          ])
          .populate([
            {
              path: "retweets",
              select: "-_id",
              populate: {
                path: "creator",
                select: "-_id -password -following -followers -name -email",
              },
            },
          ]);

        return !updateTweet
          ? { message: "Unable to save retweet" }
          : updateTweet;
      }
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal Server error" };
  }
};

module.exports = { retweet };
