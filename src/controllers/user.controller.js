const jwt = require("../services/jwt");
const User = require("../models/user.model");
const Tweet = require("../models/tweet.model");
const bcrypt = require("bcrypt");
const { generatePassword } = require("../util/generatePassword");

const signUp = async (args) => {
  const user = User();
  try {
    let userExists = await User.findOne({
      $or: [{ email: args[1] }, { username: args[2] }],
    });
    if (userExists) return { message: "User already exists" };
    else {
      user.name = args[0];
      user.email = args[1];
      user.username = args[2];
      const password = await generatePassword(args[3]);
      if (!password) return { message: "error creating password" };
      else {
        user.password = password;
        let accountCreated = await user.save();
        if (!accountCreated) return { message: "Error creating account" };
        else {
          return accountCreated;
        }
      }
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal server error" };
  }
};

const signIn = async (args) => {
  try {
    const userFound = await User.findOne({
      $or: [{ username: args[0] }, { email: args[0] }],
    });

    if (!userFound) return { message: "Wrong username or email" };
    else {
      const correctPassword = await bcrypt.compare(args[1], userFound.password);
      if (!correctPassword) return { message: "Wrong password" };
      else {
        return { token: jwt.createToken(userFound) };
      }
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal server error" };
  }
};

const followUser = async (user, args) => {
  try {
    const toFollow = await User.findOne({ username: args[0] });
    if (!toFollow)
      return { message: "The user with that username doesn't exist" };
    else {
      const alreadyFollowed = await User.findOne({
        $and: [{ _id: user.sub }, { following: { _id: toFollow._id } }],
      });
      if (alreadyFollowed)
        return { message: `You already follow ${toFollow.username}` };
      else {
        const addFollowing = await User.findByIdAndUpdate(
          user.sub,
          { $push: { following: toFollow } },
          { new: true }
        )
          .select("username")
          .populate(
            "following",
            "-password -following -followers -name -email"
          );
        const addFollower = await User.findByIdAndUpdate(toFollow._id, {
          $push: { followers: user.sub },
        });
        if (addFollowing && addFollower) {
          return addFollowing;
        } else {
          return { message: `error trying to follow ${toFollow.username}` };
        }
      }
    }
  } catch (err) {
    console.log(err);
    return { message: "Internal Server Error" };
  }
};

const unfollowUser = async (user, args) => {
  try {
    const toUnFollow = await User.findOne({ username: args[0] });
    if (!toUnFollow)
      return { message: "The user with that username doesn't exist" };
    else {
      const following = await User.findOne({
        $and: [{ _id: user.sub }, { following: { _id: toUnFollow._id } }],
      });
      if (!following)
        return { message: `You are not following ${toUnFollow.username}` };
      else {
        const stopFollowing = await User.findByIdAndUpdate(
          user.sub,
          { $pull: { following: toUnFollow._id } },
          { new: true }
        )
          .populate("following", "-following -password -followers -name -email")
          .select("username");

        const removeFollower = await User.findByIdAndUpdate(toUnFollow._id, {
          $pull: { followers: user.sub },
        });

        if (stopFollowing && removeFollower) {
          return stopFollowing;
        } else {
          return { message: `Error trying to unfollow ${toUnFollow.username}` };
        }
      }
    }
  } catch (err) {
    console.log(typeof err);
    return { message: "Internal Server Error" };
  }
};

const profile = async (args) => {
  try {
    const profile = await User.findOne({ username: args[0] })
      .select("_id username following followers")
      .populate("following", "-_id -name -email -password -folloing -followers")
      .populate(
        "followers",
        "-_id -name -email -password -folloing -followers -following"
      );
    if (!profile)
      return {
        message: "Unable to get the profile of that user, verify the username",
      };
    else return profile;
  } catch (err) {
    console.log(err);
    return { message: "Internal server error" };
  }
};

const viewTweets = async (args) => {
  try {
    if (args[0] === "*") {
      const allTweets = await Tweet.find({})
        .populate("creator", "-password -following -followers -name -email")
        .populate("likes", "-_id -interactors");
      if (!allTweets) return { message: "Unable to get tweets" };
      else return allTweets;
    } else {
      const userFound = await User.findOne({ username: args[0] });
      if (!userFound)
        return { message: "The user with that username doesn't exist" };
      else {
        const tweets = await Tweet.find({ creator: userFound._id })
          .populate("creator", "username")
          .populate("likes", "-_id -interactors");
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

module.exports = {
  signUp,
  signIn,
  followUser,
  unfollowUser,
  profile,
  viewTweets,
};
