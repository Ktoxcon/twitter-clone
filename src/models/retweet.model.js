const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const ReTweetSchema = Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "user" },
    title: String,
  },
  {
    versionKey: false,
  }
);

module.exports = Mongoose.model("retweet", ReTweetSchema);
